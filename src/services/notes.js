import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/notes';


// ----------------------------------------------------------
//  Función que maneja solicitudes HTTP GET a la ruta raíz
// ----------------------------------------------------------
const getAll = async () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// --------------------------------------------
//  Función que maneja solicitudes HTTP POST
// --------------------------------------------
const create = async newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data);
}

const update = async (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


export default { getAll, create, update }