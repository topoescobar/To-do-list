import axios from 'axios'

// const URL =  'http://localhost:3001/api/tasks/'
const URL =  'https://extinct-teal-swordfish.cyclic.app/api/tasks/'

export const getAPI = async() => {
  return axios
    .get(URL)
    .then((response => {
      console.log('responseAPI', response.data)
      return response.data
    }))
  // fetch('https://extinct-teal-swordfish.cyclic.app/api/tasks/')
  
}