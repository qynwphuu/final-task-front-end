import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import type { Customer } from '../types.ts';
import CustomerForm from '../forms/CustomerForm';

type AddCustomerProps = {
    handleAdd: (customer: Customer) => void;
}

export default function AddCustomer({ handleAdd }: AddCustomerProps) {
    const [open, setOpen] = useState(false);

    // create a state for the new customer with empty fields
    const [customer, setCustomer] = useState<Customer>({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: '',
        _links: {
            self: { href: '' },
            trainings: { href: '' },
        }
    });

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave = () => {
        handleAdd(customer);
        setCustomer({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: '',
            _links: {
                self: { href: '' },
                trainings: { href: '' }
            }
        });
        handleClose();
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Customer
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{ color: 'text.primary', fontWeight: 600 }}>Add Customer</DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}