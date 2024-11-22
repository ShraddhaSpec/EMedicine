import * as React from 'react';
import react, { useEffect, useState } from 'react';
import { DataGrid, GridCloseIcon, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppBar, Button, Dialog, Input, Slide, TextField, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ProductService } from '../../services/ProductService';
import { IProduct } from '../../types/Product';
import { Product } from '../../components/user/Product';





export const Medicines = () => {

    const [open, setOpen] = React.useState(false);
    const [Products, setProducts] = useState<IProduct[]>([]);
    const [ProductDetail, setProductDetail] = useState<IProduct>();
    // const [ProductFormDetail, setProductFormDetail] = useState<IProduct>(
    //     {
    //         _id: '',
    //         name : '',
    //         description : '',
    //         manufacturer : '',
    //         unitPrice : 0,
    //         discount:0,
    //         quantity: 0,
    //         imageURL : '',
    //         status : true
    //     }
    // );

    const username = localStorage.getItem("username");
    


    React.useEffect(() => {
        ProductService.getproducts().then((data) => setProducts(data));
    }, [username]);

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'First name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'manufacturer', headerName: 'Manufacturer', width: 130 },
        { field: 'unitPrice', headerName: 'Unit Price', width: 130 },
        { field: 'discount', headerName: 'Discount', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color="primary"
                        onClick={() => handleClickOpen(params.row._id)}
                        aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => handleDelete(params.row.id)}
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];


    const paginationModel = { page: 0, pageSize: 5 };

    const handleEdit = (row: any) => {
        console.log('Edit row:', row);
        // Add edit logic here
    };

    const handleDelete = (id: any) => {
        console.log('Delete row ID:', id);
        // Add delete logic here
    };

    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement<unknown>;
        },
        ref: React.Ref<unknown>,
    ) {
        return <Slide direction="up" ref={ref} {...props} />;
    });





  

    const handleClickOpen = (id: any) => {
        setOpen(true);
        ProductService.getproductDetails(id).then((data) => setProductDetail(data));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        // setProductFormDetail({ ...ProductFormDetail, [id]: value });
      };


    return (
        <>
            <Box sx={{ flexGrow: 0, paddingTop: 3 }}>
                <Paper sx={{ width: '100%' }}>
                    <DataGrid
                        rows={Products}
                        columns={columns}
                        getRowId={(row) => row._id}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                </Paper>
            </Box>

            <Dialog
                key={open ? 'open' : 'closed'}
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <GridCloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {ProductDetail?.name}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>



                </AppBar>
                <Box sx={{ padding: '40px' }}>


                    <TextField
                        label="Product Name"
                        hiddenLabel
                        id="name"
                        variant="standard"
                        fullWidth
                        value={ProductDetail?.name || ''}
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Description"
                        hiddenLabel
                        id="description"
                        variant="standard"
                        fullWidth
                        value={ProductDetail?.description || ''}
                        onChange={() => handleInputChange}
                    />

                    <TextField
                        label="Manufacturer"
                        hiddenLabel
                        id="manufacturer"
                        variant="standard"
                        fullWidth
                        value={ProductDetail?.manufacturer || ''}
                        onChange={() => handleInputChange}
                    />

                    <TextField
                        label="Unit Price"
                        // type="number"
                        hiddenLabel
                        id="unitPrice"
                        variant="standard"
                        fullWidth
                        value={ProductDetail?.unitPrice || ''}
                        onChange={() => handleInputChange}
                    />


                    <TextField
                        label="Discount"
                        hiddenLabel
                        id="discount"
                        variant="standard"
                        fullWidth
                        value={ProductDetail?.discount || ''}
                        onChange={handleInputChange}
                    />


                    <TextField
                        label="Quantity"
                        hiddenLabel
                        id="quantity"
                        variant="standard"
                        fullWidth
                        value={ProductDetail?.quantity || ''}
                        onChange={handleInputChange}
                    /> 
                </Box>

            </Dialog>
        </>

    )
}
