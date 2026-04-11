import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import type { Training } from './types';

type TrainingFormType = {
    training: Training, // take the training object from other file as props
    setTraining: React.Dispatch<React.SetStateAction<Training>>, // same as state
    showCustomerField?: boolean,
}

export default function TrainingForm(props: TrainingFormType) {
    return (
        <DialogContent>
            <TextField
                autoFocus
                margin="dense"
                label="Date"
                type="datetime-local"
                fullWidth
                value={props.training.date}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => props.setTraining({ ...props.training, date: e.target.value })}
            />
            <TextField
                margin="dense"
                label="Duration (minutes)"
                type="number"
                fullWidth
                value={props.training.duration}
                onChange={(e) => props.setTraining({ ...props.training, duration: parseInt(e.target.value) })}
            />
            <TextField
                margin="dense"
                label="Activity"
                type="text"
                fullWidth
                value={props.training.activity}
                onChange={(e) => props.setTraining({ ...props.training, activity: e.target.value })}
            />
            {props.showCustomerField !== false && (
                <TextField
                    margin="dense"
                    label="Customer URL"
                    type="text"
                    fullWidth
                    value={props.training._links.customer.href}
                    onChange={(e) => props.setTraining({
                        ...props.training,
                        _links: {
                            ...props.training._links,
                            customer: { href: e.target.value }
                        }
                    })}
                />
            )}
        </DialogContent>
    );
}