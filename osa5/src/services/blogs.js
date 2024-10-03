import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = (token) => {
    const request = axios.get(baseUrl, {
        headers: {"Authorization": "Bearer " + token}
    })
    return request.then(response => response.data)
}

const createPost = (token, data) => {
    const request = axios.post(baseUrl, data, {
        headers: {"Authorization": "Bearer " + token}
    })
    return request.then(response => response.data)
}

const updatePost = (token, data) => {
    const request = axios.put(baseUrl + "/" + data.id, data, {
        headers: {"Authorization": "Bearer " + token}
    })
    return request.then(response => response.data)
}

const removePost = (token, data) => {
    const request = axios.delete(baseUrl + "/" + data.id, {
        headers: {"Authorization": "Bearer " + token}
    })
    return request.then(response => response.data)
}

export default {getAll, createPost, updatePost, removePost}