import { useEffect, useState } from "react";
import type { Customer } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { createCustomer, deleteCustomer, fetchCustomer } from "../apis/customerAPI";
import { addTraining } from "../apis/trainingAPI";
import { DataGrid } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import AddCustomer from "../functions/AddCustomer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCustomer from "../functions/EditCustomer";
import AddTraining from "../functions/AddTraining";
import type { CreateTrainingPayload } from "../apis/trainingAPI";

function CustomerList() {
    const [customers, setCustomers] = useState<Customer[]>([]);

    const columns: GridColDef<Customer>[] = [
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 250,

            renderCell: (params: GridRenderCellParams<Customer>) => (
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                        height: "90%",
                    }}
                >
                    {/* Delete button */}
                    <DeleteIcon
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(params.row._links.self.href)}
                    />

                    {/* Edit button */}
                    <EditCustomer
                        customer={params.row}
                        handleEdit={handleEdit}
                    />

                    <AddTraining
                        customerUrl={params.row._links.self.href}
                        handleAdd={handleAddTraining}
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
        const {
            firstname,
            lastname,
            email,
            phone,
            streetaddress,
            postcode,
            city,
        } = newCustomer;

        createCustomer({
            firstname,
            lastname,
            email,
            phone,
            streetaddress,
            postcode,
            city,
        })
            .then(() => getCustomers())
            .catch(error => console.error('Error adding customer:', error));
    }

    const handleAddTraining = (newTraining: CreateTrainingPayload) => {
        addTraining(newTraining)
            .then(() => {
                // notify other parts of the app (e.g., statistics) to refresh
                window.dispatchEvent(new Event('trainingsUpdated'));
            })
            .catch(error => console.error('Error adding training:', error));
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

            <Box sx={{ width: "100%", height: "calc(100vh - 200px)" }}>
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
                    rowSelection={false}
                    showToolbar

                    // Helps with CSV download without Actions column and with correct UTF-8 encoding
                    slotProps={{
                        toolbar: {
                            csvOptions: {
                                fields: ['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city'],
                                fileName: 'customers_export',
                                utf8WithBom: true,
                            }
                        }
                    }
                    }
                />
            </Box>

        </>
    );
}

export default CustomerList;