import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then((response) => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then((response) => response.data)
}

const remove = (id) => {
    if (window.confirm(`Are you sure you want to delete this person?`)) {
        const request = axios.delete(`${baseUrl}/${id}`)
        return request.then((response) => response.data)
    }
}

/*
const remove = (personObject) => {
    if (window.confirm(`Delete ${personObject.name}?`)) {
        return axios
            .delete(`${baseUrl}/${personObject.id}`)
            .then((response) => response.data)
    }
} */

export default { getAll, create, update, remove }
