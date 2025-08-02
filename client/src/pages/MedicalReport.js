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
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`medical_report_${user.username}.pdf`);
    });
  };

  if (loading) return <p>Loading report...</p>;
  if (!report) return <p>No report available.</p>;

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}

      <div ref={reportRef} className="p-4 border rounded shadow-sm bg-white">
        <div className="mb-4">
          <h4 className="mb-3">Patient Information</h4>
          <p><strong>Name:</strong> {report.user.username}</p>
          <p><strong>Email:</strong> {report.user.email}</p>
          <p><strong>Phone:</strong> {report.user.phone}</p>
        </div>

        <div>
          <h4 className="mb-3">Appointments</h4>
          <table className="table table-bordered">
            <thead className="table-light">
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
                  <td>{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={handleDownload}>
          Download Report
        </button>
      </div>
    </div>
  );
}

export default MedicalReport;
