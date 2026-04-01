export const fetchCustomer = () => {
    return fetch(import.meta.env.VITE_API_URL + '/customers')
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