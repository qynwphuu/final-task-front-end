import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { Training } from "../types";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { deleteTraining, fetchCustomerName, fetchTrainings } from "../apis/trainingAPI";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";

type TrainingRow = Training & {
    customerName: string;
};

function TrainingList() {
    const [trainings, setTrainings] = useState<TrainingRow[]>([]);
    const columns: GridColDef<TrainingRow>[] = [
        { 
            field: 'actions', headerName: 'Actions', width: 90, sortable: false, filterable: false,
            renderCell: (params: GridRenderCellParams<TrainingRow>) => (
                <div style={{display: "flex", gap: "10px", alignItems: "center", height: "90%"}}>
                    <DeleteIcon
                        style={{ cursor: "pointer"}}
                        onClick={() => handleDelete(params.row._links.self.href)}
                    />
                </div>
            )
        },

        {
            field: 'date',
            headerName: 'Date',
            minWidth: 180,
            flex: 1,
            valueGetter: (_value, row) => dayjs(row.date).valueOf(),
            valueFormatter: (value) => dayjs(value).format('DD.MM.YYYY HH:mm'),
            sortComparator: (a, b) => a - b,
        },

        { field: 'activity', headerName: 'Activity', minWidth: 180, flex: 1.3 },
        { field: 'duration', headerName: 'Duration (min)', width: 130 },
        { field: 'customerName', headerName: 'Customer', minWidth: 220, flex: 1.2 },
    ];

    const getTrainings = () => {
        const customerNameCache = new Map<string, string>();

        fetchTrainings()
            .then(async data => {
                const rows = await Promise.all(
                    data._embedded.trainings.map(async (training) => {
                        const customerUrl = training._links.customer.href;

                        if (!customerNameCache.has(customerUrl)) {
                            const fullName = await fetchCustomerName(customerUrl).catch(() => 'Unknown customer');
                            customerNameCache.set(customerUrl, fullName);
                        }

                        return {
                            ...training,
                            customerName: customerNameCache.get(customerUrl) ?? 'Unknown customer',
                        };
                    })
                );

                setTrainings(rows);
            })
            .catch(error => console.error('Error fetching trainings:', error));
    }

    const handleDelete = (url: string) => {
        deleteTraining(url)
            .then(() => getTrainings())
            .catch(error => console.error('Error deleting training:', error));
    }

    useEffect(() => {
        getTrainings()
    }, []);

    return (
        <Box sx={{ width: '100%', height: "calc(100vh - 100px)" }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(row) => row._links.self.href}
                pageSizeOptions={[5, 10, 20]}
                showToolbar
            />
        </Box>
    );
}

export default TrainingList;