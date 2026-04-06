import type { Customer } from "./types.ts";
import { useState, useEffect, } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Stack } from "@mui/material";
import { deleteCustomer, fetchCustomer } from "./customerAPI";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCustomer from "./AddCustomer.tsx";

function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const columns: GridColDef<Customer>[] = [
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 120,
            renderCell: (params: GridRenderCellParams<Customer>) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        height: "100%",
                    }}
                >
                    <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(params.row)}
                    />
                    <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(params.row._links.self.href)}
                    />
                </div>
            ),
        },


        { field: 'firstname', headerName: 'First Name', width: 130},
        { field: 'lastname', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'streetaddress', headerName: 'Address', width: 200 },
        { field: 'postcode', headerName: 'Postcode', width: 120 },
        { field: 'city', headerName: 'City', width: 120 },
        { field: 'price', headerName: 'Price', width: 90 },
    ];

    const getCustomers = () => {
        fetchCustomer()
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.error('Error fetching customers:', error));
    }

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            deleteCustomer(id)
                .then(() => getCustomers())
                .catch(error => console.error('Error deleting customer:', error));
        }
    }

    const handleAdd = (newCustomer: Customer) => {
        fetch(import.meta.env.VITE_API_URL + '/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add customer');
                }
                return response.json();
            })
            .then(() => getCustomers())
            .catch(error => console.error('Error adding customer:', error));
    }

    const handleEdit = (updatedCustomer: Customer) => {
        const {
            firstname,
            lastname,
            email,
            phone,
            streetaddress,
            postcode,
            city,
        } = updatedCustomer;

        const customerWithoutLinks = {
            firstname,
            lastname,
            email,
            phone,
            streetaddress,
            postcode,
            city,
        };

        fetch(updatedCustomer._links.self.href, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customerWithoutLinks)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update customer');
                }
                return response.json();
            })
            .then(() => getCustomers())
            .catch(error => console.error('Error updating customer:', error));
    };

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
            <Stack direction="row" sx={{ mt: 2, mb: 2 }} >
                <AddCustomer handleAdd={handleAdd} />
            </Stack>
            <div style={{ width: "100%", height: 600 }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    autoPageSize
                    sx ={{ width: "100%" }}
                />
            </div>

        </>
    );
}

export default CustomerList;