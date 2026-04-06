import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import type { Customer } from './types';

type CustomerFormType = {
    customer: Customer, // take the customer object from other file as props
    setCustomer: React.Dispatch<React.SetStateAction<Customer>>, // same as state
}


export default function CustomerForm(props: CustomerFormType) {
    return (
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="First Name"
                type="text"
                fullWidth
                value={props.customer.firstname}
                onChange={(e) => props.setCustomer({ ...props.customer, firstname: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Last Name"
                type="text"
                fullWidth
                value={props.customer.lastname}
                onChange={(e) => props.setCustomer({ ...props.customer, lastname: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Email"
                type="email"
                fullWidth
                value={props.customer.email}
                onChange={(e) => props.setCustomer({ ...props.customer, email: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Phone"
                type="text"
                fullWidth
                value={props.customer.phone}
                onChange={(e) => props.setCustomer({ ...props.customer, phone: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Street Address"
                type="text"
                fullWidth
                value={props.customer.streetaddress}
                onChange={(e) => props.setCustomer({ ...props.customer, streetaddress: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Postcode"
                type="text"
                fullWidth
                value={props.customer.postcode}
                onChange={(e) => props.setCustomer({ ...props.customer, postcode: e.target.value })}
            />
            <TextField
                margin="dense"
                label="City"
                type="text"
                fullWidth
                value={props.customer.city}
                onChange={(e) => props.setCustomer({ ...props.customer, city: e.target.value })}
            />
        </DialogContent>
    )
}