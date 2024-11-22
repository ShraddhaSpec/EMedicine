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


const MedicineManage = () => {

    const [open, setOpen] = useState(false);
    const [Products, setProducts] = useState<IProduct[]>([]);
    const [ProductDetail, setProductDetail] = useState<IProduct>();
    const username = localStorage.getItem("username");
     const [ProductFormDetail, setProductFormDetail] = useState<IProduct>(
        {
            _id: '',
            name : '',
            description : '',
            manufacturer : '',
            unitPrice : 0,
            discount:0,
            quantity: 0,
            imageURL : '',
            status : true
        }
    );


   useEffect(() => {
        ProductService.getproducts().then((data) => setProducts(data));
    }, [username]);


    const columns: GridColDef[] = [
        { field: 'name', headerName: 'First name', width: 130 },
        // { field: 'description', headerName: 'Description', width: 130 },
        { field: 'manufacturer', headerName: 'Manufacturer', width: 130 },
        // { field: 'unitPrice', headerName: 'Unit Price', width: 130 },
        // { field: 'discount', headerName: 'Discount', width: 130 },
        { field: 'quantity', headerName: 'Quantity', width: 130 },
        // { field: 'status', headerName: 'Status', width: 130 },
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

    const rows: { _id: string; name: string; manufacturer:string; quantity: number }[] = Products.map((prod) => ({
        _id: prod._id,
        name: prod.name,
        // description: prod.lastname,
        manufacturer: prod.manufacturer,
        quantity : prod.quantity
      }));

    const handleDelete = (id: any) => {
        console.log('Delete row ID:', id);
        // Add delete logic here
    };

    const handleClickOpen = (id: any) => {
       
        ProductService.getproductDetails(id).then((data) =>
            {
                console.log("data=>",data)
                setProductDetail(data);
                setProductFormDetail(data); // Initialize form with product details
                setOpen(true);
            }
        )
      
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange =  (e: React.ChangeEvent<HTMLInputElement>)  => {
        const { id, value } = e.target;
        setProductFormDetail({ ...ProductFormDetail, [id]: value });
      };

    
    const paginationModel = { page: 0, pageSize: 5 };

  return (
    <>
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
          <Dialog
          key={open ? 'open' : 'closed'}
          fullScreen
          open={open}
          onClose={handleClose}
        //   TransitionComponent={Transition}
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
                //   hiddenLabel
                  id="name"
                  variant="standard"
                  fullWidth
                  value={ProductFormDetail.name}
                  onChange={handleInputChange}
              />

              <TextField
                  label="Description"
                  hiddenLabel
                  id="description"
                  variant="standard"
                  fullWidth
                  value={ProductFormDetail.description || ''}
                  onChange={handleInputChange}
              />

              <TextField
                  label="Manufacturer"
                  hiddenLabel
                  id="manufacturer"
                  variant="standard"
                  fullWidth
                  value={ProductFormDetail.manufacturer || ''}
                  onChange={ handleInputChange}
              />

              <TextField
                  label="Unit Price"
                  // type="number"
                  hiddenLabel
                  id="unitPrice"
                  variant="standard"
                  fullWidth
                  value={ProductFormDetail.unitPrice || ''}
                  onChange={ handleInputChange}
              />


              <TextField
                  label="Discount"
                  hiddenLabel
                  id="discount"
                  variant="standard"
                  fullWidth
                  value={ProductFormDetail.discount || ''}
                  onChange={handleInputChange}
              />


              <TextField
                  label="Quantity"
                  hiddenLabel
                  id="quantity"
                  variant="standard"
                  fullWidth
                  value={ProductFormDetail.quantity || ''}
                  onChange={handleInputChange}
              /> 
          </Box>

      </Dialog>
      </>
  )
}

export default MedicineManage