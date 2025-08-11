import React, { useEffect, useState, useRef } from 'react';
import api from '../api';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function MedicalReport({ user }) {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const reportRef = useRef();

  useEffect(() => {
    api.get(`/reports/patient/${user.id}`)
      .then(res => setReport(res.data))
      .catch(() => setError('Failed to load patient report.'))
      .finally(() => setLoading(false));
  }, [user.id]);

  const handleDownload = () => {
    const input = reportRef.current;
    html2canvas(input, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`medical_report_${user.username}.pdf`);
    });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading report...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="alert alert-warning text-center my-4">
        No report available.
      </div>
    );
  }

  return (
    <div className="container my-5">
      {error && (
        <div className="alert alert-danger text-center mb-4">{error}</div>
      )}

      <div ref={reportRef} className="p-5 border rounded shadow bg-light">
        <h2 className="text-center mb-4 text-primary">Medical Report</h2>

        
        <section className="mb-5">
          <h4 className="mb-3 border-bottom pb-2">Patient Information</h4>
          <div className="row">
            <div className="col-md-4"><strong>Name:</strong> {report.user.username}</div>
            <div className="col-md-4"><strong>Email:</strong> {report.user.email}</div>
            <div className="col-md-4"><strong>Phone:</strong> {report.user.phone}</div>
          </div>
        </section>

       
        <section>
          <h4 className="mb-3 border-bottom pb-2">Appointments</h4>
          {report.appointments.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle">
                <thead className="table-primary">
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {report.appointments.map((appt, index) => (
                    <tr key={index}>
                      <td>{new Date(appt.date).toLocaleDateString()}</td>
                      <td>{appt.description}</td>
                      <td>
                        <span className={`badge ${appt.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                          {appt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted">No appointments found.</p>
          )}
        </section>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-outline-primary me-2" onClick={handleDownload}>
           Download PDF
        </button>
        <button className="btn btn-outline-secondary" onClick={() => window.print()}>
           Print Report
        </button>
      </div>
    </div>
  );
}

export default MedicalReport;
