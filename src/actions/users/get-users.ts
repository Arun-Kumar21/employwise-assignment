import axios from 'axios';

const getAllUsers = async () => {
  try {
    const firstRes = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users?page=1`);
    const totalPages = firstRes.data.total_pages;

    let allUsers = [...firstRes.data.data];

    const requests = [];
    for (let page=2; page <= totalPages; page++){
      requests.push(axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users?page=${page}`))
    }
    
    const responses = await Promise.all(requests);
    responses.forEach((res) => {
      allUsers = allUsers.concat(res.data.data);
    })

    return allUsers;

  } catch (error) {
    console.log("GET_USERS_ERROR:", error);
    throw error;   
  }
}

export default getAllUsers