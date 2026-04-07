import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import AddBox from '@mui/icons-material/AddBox';
import type { Customer } from './types.ts';
import CustomerForm from './CustomerForm.tsx';

type AddCustomerProps = {
    handleAdd: (customer: Customer) => void;
}

export default function AddCustomer({ handleAdd }: AddCustomerProps) {
    const [open, setOpen] = useState(false);
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
            <IconButton aria-label="Add customer" onClick={handleClickOpen} size="small">
                <AddBox fontSize="small" />
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Customer</DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}