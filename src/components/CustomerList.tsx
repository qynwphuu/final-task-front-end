import { useEffect, useState } from "react";
import type { Customer } from "./types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {
    DataGrid,
    QuickFilter,
    QuickFilterClear,
    QuickFilterControl,
    Toolbar,
} from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { deleteCustomer, fetchCustomer } from "./customerAPI";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCustomer from "./AddCustomer";

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
                        gap: "15px",
                        height: "90%",

                    }}
                >
                    <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(params.row._links.self.href)}
                    />

                    <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(params.row)}
                    />

                </div>
            ),
        },


        { field: 'firstname', headerName: 'First name', minWidth: 130, flex: 1 },
        { field: 'lastname', headerName: 'Last name', minWidth: 130, flex: 1 },
        { field: 'email', headerName: 'Email', minWidth: 200, flex: 1.4 },
        { field: 'phone', headerName: 'Phone', minWidth: 150, flex: 1 },
        { field: 'streetaddress', headerName: 'Address', minWidth: 200, flex: 1.3 },
        { field: 'postcode', headerName: 'Postcode', minWidth: 120, flex: 0.8 },
        { field: 'city', headerName: 'City', minWidth: 120, flex: 1 },
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

    function CustomToolbar() {
        return (
            <Toolbar>
                <Box
                    sx={{
                        py: 3,
                        px: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: 1,
                        flex: 1,
                    }}
                >
                    <Typography variant="h6">
                        Customers
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <QuickFilter defaultExpanded>
                            <QuickFilterControl
                                placeholder="Search"
                                aria-label="Search customers"
                                render={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        size="small"
                                        placeholder="Search"
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />
                            <QuickFilterClear aria-label="Clear search" />
                        </QuickFilter>
                        <AddCustomer handleAdd={handleAdd} />
                    </Box>
                </Box>
            </Toolbar>
        );
    }

    return (
        <>
            <Box sx={{ flex: 1, maxHeight: "calc(100vh - 200px)" }}>

                <DataGrid
                    rows={customers}
                    columns={columns}
                    getRowId={row => row._links.self.href}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    sx={{ width: "100%" }}
                    showToolbar
                    slots={{ toolbar: CustomToolbar }}
                />
            </Box>

        </>
    );
}

export default CustomerList;