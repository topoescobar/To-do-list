import axios from 'axios'

export const postAPI = async (object) =>{
  return axios
    .post('http://localhost:3001/api/tasks/', object)
    .then((response) => {
      return response.data;
    })

}