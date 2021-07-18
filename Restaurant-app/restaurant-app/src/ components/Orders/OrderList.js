import React , {useState, useEffect} from 'react';
import { createAPIEndpoint , ENDPIONTS} from '../../api/index'
import Table from '../../layouts/Table';
import { TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import DeleteOutlineTwoToneIcon from '@material-ui/icons/DeleteOutlineTwoTone';

export default function OrderList(props) {

    const {setOrderId, setOrderListVisibility, resetFormControls} = props;
    const [orderList, setOrderList]= useState([]);

    useEffect(() => {
        createAPIEndpoint(ENDPIONTS.ORDER).fetchAll()
        .then( res => {
            setOrderList(res.data)
        })
        .catch(err => console.log(err))
    },[])

    const updateOrderId = id => {
        setOrderId(id);
        setOrderListVisibility(false);
    }

    const deleteOrder = id => {
        if (window.confirm('Are you sure you want to delete this order')){
            createAPIEndpoint(ENDPIONTS.ORDER).delete(id)
            .then( res => {
               setOrderListVisibility(false);
               setOrderId(0);
               resetFormControls();
               
            })
            .catch(err => console.log(err))
        }
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
                                onClick= {e => deleteOrder(item.orderMasterId)}>
                                    <DeleteOutlineTwoToneIcon
                                        color="secondary"
                                    />
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}