import getUserByEmail from "@/actions/users/get-userByEmail";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "@/store/useAuthStore";

export default function UserDetailPage() {
  const params = useParams();
  const userEmail = params.email;

  const navigate = useNavigate();

  if (!userEmail) {
    navigate("/");
    return null;
  }

  const [userDetails, setUserDetails] = useState<User>();

  const fetchUserDetails = async () => {
    try {
      const data = await getUserByEmail(userEmail);

      setUserDetails(data);
    } catch (error) {
      console.log("DATA_TABLE_ERROR:", error);
      if (axios.isAxiosError(error)) {
        if (error.status === 400) {
          toast.error(error.response?.data.error);
        }
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [userEmail]);

  if (!userDetails) {
    navigate("/");
    return null;
  }

  return (
    <div>
      <div className="p-6 mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div>
            <img
              className="h-32 w-32 rounded-full object-cover"
              src={userDetails.avatar}
              alt={`${userDetails.first_name} ${userDetails.last_name}`}
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {userDetails.first_name} {userDetails.last_name}
            </h1>
            <p className="text-lg mb-1">{userDetails.email}</p>
            <p className="text-gray-600">ID: {userDetails.id}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
