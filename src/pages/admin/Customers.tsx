import react, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { UserService } from '../../services/UserService';




export const Customers = () => {
const [customer, setcustomer] = useState<any[]>([])
const username = localStorage.getItem("username");

  useEffect(() => {
    UserService.getallusers().then((data) => {
        if(data && data.success == true){
        setcustomer(data.data)
        }
    })
    }, [username])

    const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', width: 70},
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'role',
        headerName: 'Role',
        width: 90,
    },
    // {
    //     field: 'totalorder',
    //     headerName: 'Full name',
    //     description: 'This column has a value getter and is not sortable.',
    //     sortable: false,
    //     width: 160,
    //     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
    // },
];



const rows: { _id: string; firstName: string; lastName: string; role: string }[] = customer.map((cust) => ({
    _id: cust._id,
    firstName: cust.firstname,
    lastName: cust.lastname,
    role: cust.role,
  }));

const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Box sx={{ flexGrow: 0, paddingTop: 3 }} >
            <Paper sx={{  width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    sx={{ border: 0 }}
                />
            </Paper>
        </Box>
    )   
}
