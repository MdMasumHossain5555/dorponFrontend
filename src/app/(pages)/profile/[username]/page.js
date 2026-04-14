import { loginUser, logoutUser } from "@/app/lib/user";
import ProfilePage from "./profilePage";
import { faceUserByID} from "@/app/lib/user";
import { cookies } from "next/headers";

async function Profile({params}) {
  
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) {
    return <div className="text-center py-10 text-red-500">Please login to view this page.</div>;
  }
  const user = await faceUserByID(token); 
  console.log(user);
  if (!user) {
    return <div className="text-center py-10 text-red-500">User not found.</div>;
  }
  return (
    <>
      <ProfilePage user={user} />
    </>
  )
}

export default Profile
