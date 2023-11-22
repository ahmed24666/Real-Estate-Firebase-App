import axios from "axios";
const BASE_URL='https://bayut.p.rapidapi.com/'
const options = {
    url: BASE_URL,
    headers: {
      // 'X-RapidAPI-Key':'4bdc649f2dmshe1d504f52a9de22p1021f9jsna5d049bb8f43',
      // 'X-RapidAPI-Key':'bb988da4f2msh69d45e8131009e3p1eb858jsn7aa8f393d309',
      'X-RapidAPI-Key':'4f4a8633eemsh973224b0f8a4565p18f6bbjsn80a505b703a6',
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com'
    }
  };
  export const getProperties = async (url) => {
    const {data}=await axios.get(`${BASE_URL}${url}`,options)
    return data
  }