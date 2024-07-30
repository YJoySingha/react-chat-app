import axios from "axios";

const url = process.env.URL;

const API = axios.create({ baseURL: url });


export const deleteMessage = (id) => API.delete(`/chats/${id}`);

export const getMessages = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);