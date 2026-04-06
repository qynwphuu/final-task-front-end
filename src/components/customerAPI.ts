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

export const deleteCustomer = (id: string) => {
    return fetch(id, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete customers');
            } else {
                return response.json();
            }
        })
}