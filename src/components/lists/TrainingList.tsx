import { useEffect, useState } from "react";
import dayjs from "dayjs";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { deleteTraining, fetchTrainingsWithCustomers } from "../apis/trainingAPI";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import type { TrainingWithCustomer } from "../apis/trainingAPI";

type TrainingRow = TrainingWithCustomer;

function TrainingList() {
    const [trainings, setTrainings] = useState<TrainingRow[]>([]);
    const columns: GridColDef<TrainingRow>[] = [
        { 
            field: 'actions', headerName: 'Actions', width: 90, sortable: false, filterable: false,
            renderCell: (params: GridRenderCellParams<TrainingRow>) => (
                <div style={{display: "flex", gap: "10px", alignItems: "center", height: "90%"}}>
                    <DeleteIcon
                        style={{ cursor: "pointer"}}
                        onClick={() => handleDelete(params.row.id)}
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
        {
            field: 'customer',
            headerName: 'Customer',
            minWidth: 220,
            flex: 1.2,
            valueGetter: (_value, row) => `${row.customer.firstname} ${row.customer.lastname}`,
        },
    ];

    const getTrainings = () => {
        fetchTrainingsWithCustomers()
            .then(data => setTrainings(data))
            .catch(error => console.error('Error fetching trainings:', error));
    }

    const handleDelete = (id: number) => {
        const confirmed = window.confirm('Are you sure you want to delete this training?');
        if (!confirmed) {
            return;
        }

        deleteTraining(String(id))
            .then(() => getTrainings())
            .catch(error => console.error('Error deleting training:', error));
    }

    useEffect(() => {
        getTrainings()
    }, []);

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={trainings}
                columns={columns}
                getRowId={(row) => row.id}
                autoPageSize
                autoHeight
                showToolbar
            />
        </Box>
    );
}

export default TrainingList;