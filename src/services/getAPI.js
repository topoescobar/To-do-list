import axios from 'axios'

export const getAPI = async() => {
  return axios
    .get('http://localhost:3001/api/tasks/')
    .then((response => {
      console.log('responseAPI', response.data)
      return response.data
    }))
  // fetch('https://extinct-teal-swordfish.cyclic.app/api/tasks/')
  
}