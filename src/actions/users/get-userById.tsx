import axios from 'axios';

const getUserById = async (id: number) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/${id}`)

    return res;
  } catch (error) {
    console.log("GET_USER_ERROR:", error);
    throw error 
  }
}

export default getUserById