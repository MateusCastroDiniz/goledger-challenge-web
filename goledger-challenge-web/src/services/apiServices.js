import axios from 'axios';

const api = axios.create({
    baseURL: "http://ec2-50-19-36-138.compute-1.amazonaws.com/api",
    auth:{
        username: "goledger",
        password: "5NxVCAjC" 
    }
})

export async function getSchema(props){

    const payload = {
      "assetType": props
    }
    const response = await api.post("/query/getSchema/", payload)
    return response.data;
}

export async function getShowsList(){

    const payload = {
    "query": {
      "selector": {
        "@assetType": "tvShows"
      }
    }
  };

  const response = await api.post("/query/search", payload);
    return response.data.result;
}


export async function getSearchedShow(id){

    const payload = {
    "query": {
      "selector": {
        "@assetType": "tvShows",
        "@key": id
      }
    }
  };

  const response = await api.post("/query/search", payload);
    return response.data.result;
}


export async function getSeasonsShow(key){

    const payload = {
      "query": {
        "selector": {
          "@assetType": "seasons",
          "tvShow": {
            "@assetType": "tvShows",
            "@key": key
          }
        }
      }
    };

  const response = await api.post("/query/search", payload);
    return response.data.result;
}

export async function getEpisodesSeason(key){

    const payload = {
    "query": {
      "selector": {
        "@assetType": "episodes",
        "season": {
        "@assetType": "seasons",
        "@key": key
      }
      }
    }
  };

  const response = await api.post("/query/search", payload);
    return response.data.result;
}

export async function getDetailSeason(key){

    const payload = {
      "query": {
        "selector": {
          "@assetType": "episodes",
          "season": {
            "@assetType": "seasons",
            "@key": key
          }
        }
      }
    };

    const response = await api.post("/query/search", payload);
    // console.log(payload)
    return response.data.result;
}

export async function postCreateAsset(attr){
  
  const payload = JSON.stringify({
    "asset": [attr]
  })
  console.log(payload)
  await api.post("/invoke/createAsset", payload)
}

export async function putUpdateAsset(attr){
  const payload = JSON.stringify({
    "update": attr
  })
  console.log(payload)
  
  await api.put("/invoke/updateAsset", payload)
}


export async function delDeleteAsset(attr){
  const payload = JSON.stringify({
    "key": attr
  })

  console.log(payload)
  await api.post("invoke/deleteAsset/", payload);
}