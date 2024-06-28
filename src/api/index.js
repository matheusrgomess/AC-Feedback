import axios from 'axios'



export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 60000,
  headers: {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
  },
})
