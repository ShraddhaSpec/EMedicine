import react, { useEffect, useState } from 'react';
import { DataGrid, GridCloseIcon, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppBar, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, duration, FilledTextFieldProps, Input, OutlinedTextFieldProps, Slide, StandardTextFieldProps, TextField, TextFieldVariants, Toolbar, Typography } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ProductService } from '../../services/ProductService';
import { Imedicine, IProduct } from '../../types/Product';
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
import { stat } from 'fs';


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
    const NoImageUrl = '../Images/no_image.png';
    const [medicinetobeDelete,setMedicinetobeDelete] = useState<Imedicine | null>(null);
    const [openMedicineConfirm,setOpenMedicineConfirm] = useState(false)
    const [isRender,setIsRender] = useState<boolean>(false);

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
            status: false,
            expiryDate: new Date()
        }
    );


    useEffect(() => {
        ProductService.getproducts().then((data) => setProducts(data));
    }, [username,isRender]);


    const columns: GridColDef[] = [
        { field: 'name', headerName: 'First name', width: 130 },
        { field: 'description', headerName: 'Description', width: 130 },
        { field: 'manufacturer', headerName: 'Manufacturer', width: 130 },
        { field: 'unitPrice', headerName: 'Unit Price', width: 120 },
        { field: 'discount', headerName: 'Discount', width: 100 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 120,
            valueFormatter: (params) => params ? 'Active' : 'Deactive'
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color="primary"
                        onClick={() => handleClickOpen(params.row._id)}
                        aria-label="edit">
                        <EditIcon />
                    </IconButton>
                    <Button
                    color="primary"
                    onClick={() => handleOpenDeleteConfirm(params.row._id,params.row.status)}
                    aria-label={params.row.status ? "deactivate" : "activate"}
                    sx={{textTransform: "none"}}
                    >
                        {params.row.status ? "Deactivate" : "Activate"}
                    </Button>
                </Box>
            ),
        },
    ];

    console.log("productData=>>>>",Products)
    // const rows: { _id: string; name: string; description:string;manufacturer: string; quantity: number;unitPrice:number;discount:number;status:boolean}[] = Products.map((prod) => ({
    //     _id: prod._id,
    //     name: prod.name,
    //     description: prod.description,
    //     manufacturer: prod.manufacturer,
    //     quantity: prod.quantity,
    //     unitPrice: prod.unitPrice,
    //     discount: prod.discount,
    //     status: prod.status ? "Active":"Deactive"
    // }));

    const rows = Products.map((prod) => ({
        _id: prod._id,
        name: prod.name,
        description: prod.description,
        manufacturer: prod.manufacturer,
        quantity: prod.quantity,
        unitPrice: prod.unitPrice,
        discount: prod.discount,
        status: prod.status // Keep status as boolean
    }));

    const handleOpenDeleteConfirm = (id: string,status:boolean) =>{
        setMedicinetobeDelete({Id:id,Status:status});
        setOpenMedicineConfirm(true);
    }

    const handleDelete = (id: string, status: boolean) => {
            
        let data = { Id: id, Status: !status };
        console.log("parasms=>",data)
        ProductService.statusChangeProduct(data).then((data) => {
            if (data.success === true) {
                setOpenMedicineConfirm(false);
                setIsRender(!isRender)
                toast.success("Product deleted succesfully.");// product status change to inactive(soft delete) 
                // ProductService.getproducts().then((data) => setProducts(data));
                
            }
        }).catch((err) => {
            console.log("Error=>", err)
        });
    };

    const handleClickOpen = (id: any) => {

        ProductService.getproductDetails(id).then((data) => {
            console.log("data=>==>", data)
            setProductDetail(data);
            setProductFormDetail(data); 
            setUploadedUrl(data.imageURL)// Initialize form with product details
            setOpen(true);
            setOperation('Update');
        }
        )

    };

    const handleAddOpen = () => {
        setOperation('Add');
        setOpen(true);
    }

    const handleClosemedicineDialog = () =>{
        setOpenMedicineConfirm(false);
    }

    const handleClose = () => {
        setOpen(false);
        setProductFormDetail( {
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
        }); 
        setUploadedUrl("")
    };

    const handleSaveProduct = () => {
        debugger
        setOpen(false);
        if (Operation == 'Update') {
            ProductService.updateProductDetail(ProductFormDetail).then((data) => {
                if (data.success === true) {
                    toast.success("Product Updated Successfully.");
                    ProductService.getproducts().then((data) => setProducts(data));
                    setUploadedUrl("");
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
                    // setMessage(response.data.message);
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
            <div style={{display:'flex',justifyContent:"flex-end",marginRight:'1rem' }}>
            <Button variant="contained" sx={{marginBottom:'1rem'}} onClick={() => handleAddOpen()}>Add Product</Button>
            </div>
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

           
            <Dialog
                key={open ? 'open' : 'closed'}
                // fullScreen
                open={open}
                onClose={handleClose}
                sx={{ minWidth: 320 }}
            //   TransitionComponent={Transition}
            >
                <DialogTitle id="alert-dialog-title" >
               <Typography fontWeight={'fontWeightBold'} display={'inline'}> Product Name: </Typography> {ProductDetail?.name}
                </DialogTitle>
                <DialogContent>
                <Box sx={{ padding: '1rem',minWidth:320 }}>
                <div>
                        <form onSubmit={handleSubmit}>
                            <input type="file" onChange={handleFileChange} />
                            <button type="submit">Upload</button>
                        </form>
                        {/* {message && <p>{message}</p>} */}
                        {/* {uploadedUrl && ( */}
                            <div>
                                <p>Uploaded Image:</p>
                                <img src={uploadedUrl !==""  ? uploadedUrl : NoImageUrl} alt="Uploaded" style={{ width: "200px",height:"200px" }} />
                            </div>
                        {/* )} */}
                    </div>

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

                  

                </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant='outlined'>cancel</Button>
                    <Button onClick={handleSaveProduct} variant='contained' autoFocus>
                        Save
                    </Button>
                </DialogActions>

            </Dialog>

            <Dialog open={openMedicineConfirm} onClose={handleClosemedicineDialog}>
                <DialogTitle>  {medicinetobeDelete?.Status ? "Deactivate" : "Activate"} Medicine</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Are you sure you want to {medicinetobeDelete?.Status ? "deactivate" : "activate"} this Medicine?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClosemedicineDialog} color="primary">
                        No
                    </Button>
                    <Button onClick={() => medicinetobeDelete && handleDelete(medicinetobeDelete.Id, medicinetobeDelete.Status)} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default MedicineManage