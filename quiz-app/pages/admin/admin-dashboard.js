import { Button } from '../../components/ui/button';
import React from 'react';

const AdminDashboard = () => {
  return (
    <div>
      <Button
        variant='destructive'
        onClick={() => {
          localStorage.removeItem('isAuthenticated');
          window.location.href = '/';
        }}
      >
        Signout
      </Button>
    </div>
  );
};

export default AdminDashboard;
