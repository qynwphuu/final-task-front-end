import type { Customer, Training } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_URL is missing. Define it in the project root .env file.");
}

type TrainingsResponse = {
    _embedded: {
        trainings: Training[];
    };
};

export type CreateTrainingPayload = {
    date: string;
    duration: number;
    activity: string;
    customer: string;
};

export const fetchTrainings = (): Promise<TrainingsResponse> => {
    return fetch(API_BASE_URL + '/trainings')
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch trainings');
            return res.json() as Promise<TrainingsResponse>;
        });
};

export const deleteTraining = (url: string): Promise<void> => {
    return fetch(url, { method: 'DELETE' })
        .then(res => {
            if (!res.ok) throw new Error('Failed to delete training');
        });
};

export const fetchCustomerName = (url: string): Promise<string> => {
    return fetch(url)
        .then(res => {
            if (!res.ok) throw new Error('Failed to fetch customer');
            return res.json() as Promise<Customer>;
        })
        .then(customer => `${customer.firstname} ${customer.lastname}`.trim());
};

export const addTraining = (payload: CreateTrainingPayload): Promise<void> => {
    return fetch(API_BASE_URL + '/trainings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    }).then(res => {
        if (!res.ok) throw new Error('Failed to add training');
    });
};