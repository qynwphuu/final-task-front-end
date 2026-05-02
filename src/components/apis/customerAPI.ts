import type { Customer } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
    throw new Error("VITE_API_URL is missing. Define it in the project root .env file.");
}

export const fetchCustomer = () => {
    return fetch(API_BASE_URL + '/customers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch customers');
            }
            return response.json();
        })
}

export type CreateCustomerPayload = Omit<Customer, '_links'>;

export const createCustomer = (customer: CreateCustomerPayload) => {
    return fetch(API_BASE_URL + '/customers', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
    }).then(response => {
        if (!response.ok) {
            throw new Error('Failed to add customer');
        }
        return response.status === 204 ? undefined : response.json();
    })
}

export const deleteCustomer = (id: string) => {
    return fetch(id, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete customers');
            }
            return response.status === 204 ? undefined : response.json();
        })
}