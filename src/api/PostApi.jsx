

import axios from "axios";

const api = axios.create( 
    {
    baseURL:"https://jsonplaceholder.typicode.com",
});


//Create
export const postUser = (data)=>{
return api.post("/users", data);
};

//Read
export const getUser = ()=>{
    return api.get("/users");
};


//Update
export const putUser = (id, data)=>
    {
    return api.put(`/users/${id}`, data);
};

//Delete
export const deleteUser = (id)=>{
    return api.delete(`/users/${id}`);
};
