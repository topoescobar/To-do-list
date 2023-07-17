import axios from 'axios'

// const URL =  'http://localhost:3001/api/tasks/'
const URL =  'https://extinct-teal-swordfish.cyclic.app/api/tasks/'

export const postAPI = async (object) =>{
  return axios
    .post(URL, object)
    .then((response) => {
      return response.data;
    })

}