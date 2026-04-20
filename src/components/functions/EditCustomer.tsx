import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import type { Customer } from "../types";
import CustomerForm from "../CustomerForm";
import EditIcon from "@mui/icons-material/Edit";


export default function EditCustomer({ customer, handleEdit }: {
    customer: Customer; // take the customer object from other file as props
    handleEdit: (c: Customer) => void; // update (PUT API endpoint)
}) {

    const [open, setOpen] = useState(false);
    const [edited, setEdited] = useState(customer); // copy customer to a new state for editing

    const handleSave = () => {
        handleEdit(edited); // call API
        setOpen(false); // then close the dialog
    };

    return (
        <>
            <EditIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpen(true)}
            />

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle sx={{ color: 'text.primary', fontWeight: 600 }}>Edit Customer</DialogTitle>

                {/* reuse the CustomerForm component, edited gets updated as the user types */}
                <CustomerForm customer={edited} setCustomer={setEdited} />

                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}