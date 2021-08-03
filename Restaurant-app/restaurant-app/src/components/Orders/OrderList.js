import React , {useState, useEffect} from 'react';
import { createAPIEndpoint , ENDPIONTS} from '../../api/index'
import Table from '../../layouts/Table';
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';
import ConfirmDialog from '../../layouts/ConfirmDialog'
import { fetchWrapper } from '../../_helpers';

const BASE_URL = 'http://localhost:5000/api';

export default function OrderList(props) {

    const {setOrderId, setOrderListVisibility, resetFormControls} = props;
    const [orderList, setOrderList]= useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    useEffect(() => {
        //createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
        fetchWrapper.get(`${BASE_URL}/${ENDPIONTS.ORDER}`)
        .then( res => {
            setOrderList(res)
        })
        .catch(err => console.log(err))
    },[])

    const updateOrderId = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }

    const deleteOrder = id => {

        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        //createAPIEndpoint(ENDPIONTS.ORDER).delete(id)
        fetchWrapper.delete(`${BASE_URL}/${ENDPIONTS.ORDER}/${id}`)
        .then( res => {
            setOrderListVisibility(false);
            setOrderId(0);
            resetFormControls();
            
        })
        .catch(err => console.log(err))
        
    }
    return(
        <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Order No.</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Payed With</TableCell>
                        <TableCell>Grand Total</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orderList.map(item => (
                            <TableRow key={item.orderMasterId}>
                                <TableCell
                                onClick= {e => updateOrderId(item.orderMasterId)}>
                                    {item.orderNumber}
                                </TableCell>
                                <TableCell
                                onClick= {e => updateOrderId(item.orderMasterId)}>
                                    {item.customer.customerName}
                                </TableCell>
                                <TableCell
                                onClick= {e => updateOrderId(item.orderMasterId)}>
                                    {item.pMethod}
                                </TableCell>
                                <TableCell
                                onClick= {e => updateOrderId(item.orderMasterId)}>
                                    {item.gTotal}
                                </TableCell>
                                <TableCell
                                    onClick= {() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record?',
                                            subTitle: "You can't undo this operation",
                                            onConfirm: () => { deleteOrder(item.orderMasterId) }
                                        })
                                    }}>
                                    <DeleteOutlineTwoToneIcon
                                        color="secondary"
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            <ConfirmDialog
            confirmDialog={confirmDialog}
            setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}