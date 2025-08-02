import React from 'react';
import AddUserForm from '../components/AddUserForm';
import UserList from '../components/UserList';

function UsersPage() {
  return (
    <div>
      <h2>Users</h2>
      <AddUserForm />
      <UserList />
    </div>
  );
}

export default UsersPage;
