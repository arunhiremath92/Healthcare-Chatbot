import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  { field: 'email', headerName: 'E-mail', width: 300 },
  { field: 'role', headerName: 'Role', width: 150 },

];

const rows = [
  { id: 1, lastName: 'Arun', firstName: 'Hiremath', gender: 'Male', role: 'Engineer', email: 'arungangayya.hiremath@sjsu.edu' },
  { id: 2, lastName: 'Karan', firstName: 'Singh', gender: 'Male', role: 'Engineer', email: 'karandeep.singh@sjsu.edu' },
  { id: 3, lastName: 'Yi', firstName: 'Hu', gender: 'Female', role: 'Engineer', email: 'yi.hu@sjsu.edu' },
  { id: 4, lastName: 'Yunzhe', firstName: 'Yu', gender: 'Male', role: 'Engineer', email: 'yunzhe.yu@sjsu.edu' },
  { id: 5, lastName: 'Dan', firstName: 'Harkey', gender: 'Male', role: 'Advisor & Supervisor', email: 'dan.harkey@sjsu.edu' },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}

      />
    </div>
  );
}