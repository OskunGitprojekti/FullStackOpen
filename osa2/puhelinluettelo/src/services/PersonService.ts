import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).catch(e => {
        return e;
    });
}

const create = (newObject: any) => {
    return axios.post(baseUrl, newObject);
}

const update = (id: string, newObject: any) => {
    return axios.put(`${baseUrl}/${id}`, newObject);
}

const drop = (id: string) => {
    return axios.delete(`${baseUrl}/${id}`);
}


export default {
    getAll: getAll,
    create: create,
    update: update,
    drop: drop
}