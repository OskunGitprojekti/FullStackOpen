import axios from 'axios'

const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/persons`

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject: any) => {
    return axios.post(baseUrl, newObject).catch(e => {
        throw {message: e.response.data.error};
    });
}

const update = (id: string, newObject: any) => {
    return axios.put(`${baseUrl}/${id}`, newObject).catch(e => {
        throw {message: e.response.data.error};
    });
}

const drop = (id: string) => {
    return axios.delete(`${baseUrl}/${id}`)
}


export default {
    getAll: getAll,
    create: create,
    update: update,
    drop: drop
}