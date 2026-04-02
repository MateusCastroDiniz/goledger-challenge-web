import axios from 'axios';

const api = axios.create({
    baseURL: "http://ec2-50-19-36-138.compute-1.amazonaws.com/api",
    auth:{
        username: "goledger",
        password: "5NxVCAjC" 
    }
})

export async function getSchemas(){
    const response = await api.get("/query/getSchema")
    return response.data;
}

export async function getShowsList(){

    const payload = {
    query: {
      selector: {
        "@assetType": "tvShows"
      }
    }
  };

  const response = await api.post("/query/search", payload);
    return response.data;
}
