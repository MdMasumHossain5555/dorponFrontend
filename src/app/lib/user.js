
// export async function registrationUser(user) {
//   const [register, {data:res , isLoading, isError}] = useRegisterMutation();
//   console.log(user)
//     try {
//         await register(user);
//         const data = await res.json();
//         if (!res.ok) {
//           console.error("Registration failed:", data.message);
//           alert(data.message);
//         } else {
//           alert("Registration successful!");
//           console.log("Registration successful:", data);
//         }
//       } catch (error) {
//         console.error("Error during registration:", error);
//       }
//     };
export async function loginUser(user) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
          credentials: "include", // IMPORTANT !!
        });
  
        const data = await res.json();
        if (!res.ok) {
          alert("Something went wrong, please try again later.");
          console.error("Login failed:", data.message);
        } else {
          // alert("Login successful!");
          console.log("Login successful:", data);
          return data;
        }
      } catch (error) {
        console.error("Error during login:", error);
      }
    }
export async function faceUserByID(token) {
  // const { req } = context;
  // const token = cookies.token;
  // console.log("fetch Token:", token); // Log the token for debugging
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        credentials: "include", // IMPORTANT !!
        });
    if (!res.ok) {
        throw new Error("Failed to fetch data")
    }
    const user = await res.json()
    return user;
    } catch (error) {
        console.error("Error fetching user by ID:", error)
        return null
    }
    
}

export async function logoutUser() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // IMPORTANT !!
        });
  
        
        if (!res.ok) {
          alert("Something went wrong, please try again later.");
          console.error("Logout failed:", data.message);
        } else {
          // alert("Logout successful!");
          const data = await res.json();
          // console.log("Logout successful:", data);
          return { ok: res.ok, ...data };
        }
      } catch (error) {
        console.error("Error during logout:", error);
        return { ok: false, message: "Logout failed due to network error." };
      }
    }
// export async function updateUserProfile(user) {
//     try {
//         const res = await fetch("http://localhost:4000/api/auth/profile", {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(user),
//           credentials: "include", // IMPORTANT !!
//         });
  
//         const data = await res.json();
//         if (!res.ok) {
//           alert("Something went wrong, please try again later.");
//           console.error("Update failed:", data.message);
//         } else {
//           alert("Update successful!");
//           console.log("Update successful:", data);
//         }
//       } catch (error) {
//         console.error("Error during update:", error);
//       }
//     }
