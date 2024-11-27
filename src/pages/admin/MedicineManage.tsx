import react, { useEffect, useState } from 'react';
import { DataGrid, GridCloseIcon, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppBar, Button, Dialog, duration, FilledTextFieldProps, Input, OutlinedTextFieldProps, Slide, StandardTextFieldProps, TextField, TextFieldVariants, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ProductService } from '../../services/ProductService';
import { IProduct } from '../../types/Product';
import { Product } from '../../components/user/Product';
import { toast } from 'react-toastify';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Padding } from '@mui/icons-material';
import { JSX } from 'react/jsx-runtime';
import axios from 'axios';
import api from '../../API/api';


const MedicineManage = () => {

    const [open, setOpen] = useState(false);
    const [Products, setProducts] = useState<IProduct[]>([]);
    const [ProductDetail, setProductDetail] = useState<IProduct>();
    const username = localStorage.getItem("username");
    const [Operation, setOperation] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [filePath, setFilePath] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [uploadedUrl, setUploadedUrl] = useState<string>("");
    const [message, setMessage] = useState("");
    const [ProductFormDetail, setProductFormDetail] = useState<IProduct>(
        {
            _id: '',
            name: '',
            description: '',
            manufacturer: '',
            unitPrice: 0,
            discount: 0,
            quantity: 0,
            imageURL: '',
            status: true,
            expiryDate: new Date()
        }
    );


    useEffect(() => {
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
                        onClick={() => handleDelete(params.row._id, !params.row.status)}
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const rows: { _id: string; name: string; manufacturer: string; quantity: number }[] = Products.map((prod) => ({
        _id: prod._id,
        name: prod.name,
        description: prod.description,
        manufacturer: prod.manufacturer,
        quantity: prod.quantity,
        unitPrice: prod.unitPrice,
        discount: prod.discount,
        status: prod.status
    }));

    const handleDelete = (id: string, status: boolean) => {
        debugger
        var data = { "Id": id, "Status": status };
        ProductService.statusChangeProduct(data).then((data) => {
            if (data.success === true) {
                toast.success("Product Status has been change.");
                ProductService.getproducts().then((data) => setProducts(data));
            }
        }).catch((err) => {
            console.log("Error=>", err)
        });
    };

    const handleClickOpen = (id: any) => {

        ProductService.getproductDetails(id).then((data) => {
            console.log("data=>", data)
            setProductDetail(data);
            setProductFormDetail(data); // Initialize form with product details
            setOpen(true);
            setOperation('Update');
        }
        )

    };

    const handleAddOpen = () => {
        setOperation('Add');
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleSaveProduct = () => {
        debugger
        setOpen(false);
        if (Operation == 'Update') {
            ProductService.updateProductDetail(ProductFormDetail).then((data) => {
                if (data.success === true) {
                    toast.success("Product Updated Successfully.");
                    ProductService.getproducts().then((data) => setProducts(data));
                }
            }).catch((err) => {
                console.log("Error=>", err)
            });
        }
        else if (Operation == 'Add') {
            ProductService.addProductDetail(ProductFormDetail).then((data) => {
                if (data.success === true) {
                    toast.success("Product Added Successfully.");
                    ProductService.getproducts().then((data) => setProducts(data));
                }
            }).catch((err) => {
                console.log("Error=>", err)
            });
        }


    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setProductFormDetail({ ...ProductFormDetail, [id]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        debugger
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {

            const r = api.post('/products/uploadproductimage', formData)
                .then(response => {
                    setMessage(response.data.message);
                    setUploadedUrl(response.data.url); // URL from the server
                    setProductFormDetail({ ...ProductFormDetail, ['imageURL']: response.data.url });
                })
                .catch((error) => console.error('Error fetching data:', error))

            

            
        } catch (error) {
            // setMessage(error.message);
        }
    };


    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <>
            <Box sx={{ flexGrow: 0, paddingTop: 3 }} >
                <Paper sx={{ width: '100%' }}>
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

            <Button variant="contained" onClick={() => handleAddOpen()}>Add Product</Button>
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
                        <Button autoFocus color="inherit" onClick={handleSaveProduct}>
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
                        onChange={handleInputChange}
                    />

                    <TextField
                        label="Unit Price"
                        // type="number"
                        hiddenLabel
                        id="unitPrice"
                        variant="standard"
                        fullWidth
                        value={ProductFormDetail.unitPrice || ''}
                        onChange={handleInputChange}
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
                    <div style={{ paddingTop: "10px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Product Expiry Date"
                                value={dayjs(ProductFormDetail.expiryDate)}

                                onChange={(newValue) => {
                                    setProductFormDetail({ ...ProductFormDetail, expiryDate: newValue ? newValue.toDate() : new Date(), });
                                }}

                            />
                        </LocalizationProvider>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit}>
                            <input type="file" onChange={handleFileChange} />
                            <button type="submit">Upload</button>
                        </form>
                        {message && <p>{message}</p>}
                        {uploadedUrl && (
                            <div>
                                <p>Uploaded Image:</p>
                                <img src={uploadedUrl} alt="Uploaded" style={{ width: "200px" }} />
                            </div>
                        )}
                    </div>

                </Box>

            </Dialog>
        </>
    )
}

export default MedicineManage