import getAllUsers from './get-users';

const getUserByEmail = async (email: string) => {
  try {
    const users = await getAllUsers();
    
    const user = users.find((user)=> user.email === email);
    
    return user;
  } catch (error) {
    console.log("GET_USER_ERROR:", error);
    throw error 
  }
}

export default getUserByEmail