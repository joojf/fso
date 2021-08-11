import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then((response) => response.data)
}

const create = async (newObject) => {
    const config = {
        headers: {
            Authorization: token,
        },
    }
    console.log(config)

    const response = axios.post(baseUrl, newObject, config)
    return response.data
}

const update = async (blogId, newObject) => {
    const request = axios.put(`${baseUrl}/${blogId}`, newObject)
    return request.then((response) => response.data)
}

export default { getAll, create, update, setToken }
