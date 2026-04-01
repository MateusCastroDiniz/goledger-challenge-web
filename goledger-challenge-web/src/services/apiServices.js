import axios from 'axios';

const api = axios.create({
    baseURL: "http://ec2-50-19-36-138.compute-1.amazonaws.com/api/",
    auth:{
        username: "goledger",
        password: "5NxVCAjC" 
    }
})

export async function getSchemas(){
    const response = await api.get("/query/getSchema")
    return response.data;
}
