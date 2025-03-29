import axios from 'axios';

const getUserByPage = async (page: number) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users?page=${page}`)
    return res.data;
  } catch (error) {
    console.log("GET_USER_BY_PAGE_ERROR:", error);
    throw error; 
  }
}

export default getUserByPage