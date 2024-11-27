import react, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { OrderService } from '../../services/OrderService';
import { IOrderItems } from '../../types/Order';
import { toast } from "react-toastify";
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';



export const Orders = () => {
    const [orders, setOrders] = useState<any[]>([])
    const username = localStorage.getItem("username");
    const [open, setOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<IOrderItems | null>(null);
    const [orderStatus, setOrderStatus] = useState<string>('');
    const [updateOrder,setUpdateOrder] = useState<boolean>(false);
    const [openorderDialog, setOpenorderDialog] = useState(false);
    const [selectedOrderDetail, setSelectedOrderDetail] =useState<any>(null);

    useEffect(() => {
        OrderService.getAllOrder().then((data) => {
            if(data && data.success == true){
                setOrders(data.data)
            }
        })
        }, [username,updateOrder])

    const columns: GridColDef[] = [
        { field: '_id', headerName: 'ID', width: 70},
        { field: 'ProductId', headerName: 'ProductID', width: 130 },
        { field: 'UserId', headerName: 'UserId', width: 130 },
        { field: 'Quantity', headerName: 'Quantity', width: 130 },
        {
            field: 'TotalPrice',
            headerName: 'Total Price',
            type: 'number',
            width: 90,
        },
        {
            field: 'OrderStatus',
            headerName: 'Order Status',
            // description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 160,           
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 120,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton
                        color="primary"
                        onClick={() => handleUpdate(params.row)}
                        aria-label="edit"
                    >
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        color="error"
                        onClick={() => handleOrderDetail(params.row._id)}
                        aria-label="delete"
                    >
                        <VisibilityIcon color='primary' />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const rows: {
         _id: string;
          ProductId: string; 
          UserId: string; 
          Quantity:number;
          TotalPrice:number; 
          OrderStatus: number }[] = orders.map((order) => ({
            _id: order._id,
            ProductId: order.ProductId,
            UserId: order.UserId,
            Quantity: order.Quantity,
            TotalPrice:order.TotalPrice,
            OrderStatus : order.OrderStatus
    }));

 const paginationModel = { page: 0, pageSize: 5 };

    const handleUpdate = (order: any) => {
        handleClickOpen(order);
     
    };

    const handleClickOpen = (order: IOrderItems) => {
        setSelectedOrder(order);
        setOrderStatus(order.OrderStatus.toString());
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleStatusChange = (event: SelectChangeEvent) => {
        setOrderStatus(event.target.value as string);
    };

    const handleStausSave = () =>{
       
        if (selectedOrder) {
            const params = {
                orderid:selectedOrder._id,
                status: parseInt(orderStatus) 
            }
            OrderService.updateOrderStatus(params).then((data) => {
                if(data && data.success == true){                    
                    setUpdateOrder(!updateOrder);
                    toast.success(data.message)
                    handleClose();
                }
            })
        }
    }

    const handleOrderDetail = (orderid: string) =>{
        handleorderDetailOpen(orderid);
    }

    const handleorderDetailOpen=(orderid: string)=>{
        OrderService.getOrderDetail(orderid).then((data) => {
            if(data && data.success == true){
                data.data[0].UnitPrice = parseFloat(data.data[0].UnitPrice.$numberDecimal);
                data.data[0].TotalPrice = parseFloat(data.data[0].TotalPrice.$numberDecimal);

             setSelectedOrderDetail(data.data[0])
             setOpenorderDialog(true);
            }
        })
       
        
    }

    console.log("selectedorderdetail->",selectedOrderDetail)
    const handleCloseorderDialog = ()=>{
        setOpenorderDialog(false)
    }
    return (
        <>
            <Box sx={{ flexGrow: 0, paddingTop: 3 }}>
                <Paper sx={{ width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={(row) => row._id}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        sx={{ border: 0 }}
                    />
                </Paper>               
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ minWidth: 320 }}
            >
                <DialogTitle id="alert-dialog-title" >
                    {"Update Status"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ minWidth: 320,paddingTop:'10px' }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Status</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={orderStatus}
                                label="Status"
                                onChange={handleStatusChange}
                            >
                                <MenuItem value={1}>Order Placed</MenuItem>
                                <MenuItem value={2}>Shipped</MenuItem>
                                <MenuItem value={3}>Delivered</MenuItem>
                                <MenuItem value={4}>Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>cancel</Button>
                    <Button onClick={handleStausSave} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openorderDialog}
                onClose={handleCloseorderDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{ minWidth: 320 }}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Order Detail"}
                </DialogTitle>
                <DialogContent>
                <Box sx={{ minWidth: 320 }}>
                {selectedOrderDetail && (                  
                            <TableContainer component={Paper}>
                                <Table aria-label="order details table">
                                  
                                    <TableBody>
                                    <TableRow>
                                            <TableCell>Customer Name</TableCell>
                                            <TableCell>{selectedOrderDetail.username}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Order Date</TableCell>
                                            <TableCell>{selectedOrderDetail.createdAt}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>{selectedOrderDetail.productName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Order ID</TableCell>
                                            <TableCell>{selectedOrderDetail._id}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Order Status</TableCell>
                                            <TableCell>{selectedOrderDetail.OrderStatus}</TableCell>
                                        </TableRow>  
                                        <TableRow>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>{selectedOrderDetail.Quantity}</TableCell>
                                        </TableRow>                                       
                                       
                                        <TableRow>
                                            <TableCell>UnitPrice</TableCell>
                                            <TableCell>{selectedOrderDetail.UnitPrice}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Total Price</TableCell>
                                            <TableCell>{selectedOrderDetail.TotalPrice}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell>Shipping Address</TableCell>
                                            <TableCell>{selectedOrderDetail.ShippingAddress}</TableCell>
                                        </TableRow>
                                       
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseorderDialog}>cancel</Button>
                   
                </DialogActions>
            </Dialog>
        </>
    );
};
