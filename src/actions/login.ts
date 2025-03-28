import axios from 'axios';

interface LoginProps {
  email: string;
  password: string;
}

const login = async (values: LoginProps) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/login`, {
      "email": values.email,
      "password": values.password
    })

    return res.data.token;
  } catch (error) {
    console.log("LOGIN_ERROR:", error); 
    throw error;
  }
}

export default login;