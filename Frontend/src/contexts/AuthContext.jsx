// import axios from "axios";
// import { createContext, useState } from "react";
// import httpStatus from "http-status";
// import server from "../environment";

// export const AuthContext = createContext({});

// const client = axios.create({
//   baseURL: `${server}/api/users`,
// });

// export const AuthProvider = ({ children }) => {
//   const [userData, setUserData] = useState(null);

//   // =========================
//   // REGISTER
//   // =========================
//   const handleRegister = async (name, username, password) => {
//     try {
//       const request = await client.post("/register", {
//         name,
//         username,
//         password,
//       });

//       console.log("Register Response:", request.data);

//       if (request.status === httpStatus.CREATED) {
//         return {
//           success: true,
//           message: request.data.message || "User registered successfully",
//         };
//       }

//       return {
//         success: false,
//         message: "Registration failed",
//       };
//     } catch (err) {
//       console.error("Register Error:", err.response?.data || err.message);

//       return {
//         success: false,
//         message:
//           err.response?.data?.message ||
//           "Something went wrong during registration",
//       };
//     }
//   };

//   // =========================
//   // LOGIN
//   // =========================
//   const handleLogin = async (username, password) => {
//     try {
//       const request = await client.post("/login", {
//         username,
//         password,
//       });

//       console.log("Login Response:", request.data);

//       if (request.status === httpStatus.OK) {
//         localStorage.setItem("token", request.data.token);

//         return {
//           success: true,
//           message: request.data.message || "Login successful",
//         };
//       }

//       return {
//         success: false,
//         message: "Login failed",
//       };
//     } catch (err) {
//       console.error("Login Error:", err.response?.data || err.message);

//       return {
//         success: false,
//         message:
//           err.response?.data?.message ||
//           "Something went wrong during login",
//       };
//     }
//   };

//   // =========================
//   // GET USER HISTORY
//   // =========================
//   const getHistoryOfUser = async () => {
//     try {
//       const request = await client.get("/get_all_activity", {
//         params: {
//           token: localStorage.getItem("token"),
//         },
//       });

//       return request.data;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   // =========================
//   // ADD MEETING TO HISTORY
//   // =========================
//   const addToUserHistory = async (meetingCode) => {
//     try {
//       const request = await client.post("/add_to_activity", {
//         token: localStorage.getItem("token"),
//         meeting_code: meetingCode,
//       });

//       return request.data;
//     } catch (err) {
//       console.error(err);
//       throw err;
//     }
//   };

//   const data = {
//     userData,
//     setUserData,
//     handleRegister,
//     handleLogin,
//     getHistoryOfUser,
//     addToUserHistory,
//   };

//   return (
//     <AuthContext.Provider value={data}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

import axios from "axios";
import { createContext, useState } from "react";
import httpStatus from "http-status";
import server from "../environment";

export const AuthContext = createContext({});

// ==============================
// AXIOS CLIENT
// ==============================

const client = axios.create({
  baseURL: `${server}/api/users`,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==============================
// AUTH PROVIDER
// ==============================

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // ==============================
  // REGISTER
  // ==============================

  const handleRegister = async (name, username, password) => {
    try {
      const response = await client.post("/register", {
        name,
        username,
        password,
      });

      console.log("Register Response:", response.data);

      if (
        response.status === httpStatus.CREATED ||
        response.status === httpStatus.OK
      ) {
        return {
          success: true,
          message: response.data?.message || "User registered successfully",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Registration failed",
      };
    } catch (error) {
      console.error("Register Error:", error.response?.data || error.message);

      // Backend not running
      if (!error.response) {
        return {
          success: false,
          message:
            "Unable to connect to the server. Please make sure the backend is running.",
        };
      }

      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Something went wrong during registration",
      };
    }
  };

  // ==============================
  // LOGIN
  // ==============================

  const handleLogin = async (username, password) => {
    try {
      const response = await client.post("/login", {
        username,
        password,
      });

      console.log("Login Response:", response.data);

      if (response.status === httpStatus.OK) {
        if (response.data?.token) {
          localStorage.setItem("token", response.data.token);
        }

        return {
          success: true,
          message: response.data?.message || "Login successful",
        };
      }

      return {
        success: false,
        message: response.data?.message || "Login failed",
      };
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);

      // Backend not running
      if (!error.response) {
        return {
          success: false,
          message:
            "Unable to connect to the server. Please make sure the backend is running.",
        };
      }

      return {
        success: false,
        message:
          error.response?.data?.message || "Something went wrong during login",
      };
    }
  };

  // ==============================
  // GET USER HISTORY
  // ==============================

  const getHistoryOfUser = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          success: false,
          message: "User is not logged in",
          data: [],
        };
      }

      const response = await client.get("/get_all_activity", {
        params: {
          token,
        },
      });

      return response.data;
    } catch (error) {
      console.error(
        "Get History Error:",
        error.response?.data || error.message,
      );

      return {
        success: false,
        message:
          error.response?.data?.message || "Unable to fetch meeting history",
        data: [],
      };
    }
  };

  // ==============================
  // ADD MEETING TO HISTORY
  // ==============================

  const addToUserHistory = async (meetingCode) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return {
          success: false,
          message: "User is not logged in",
        };
      }

      const response = await client.post("/add_to_activity", {
        token,
        meeting_code: meetingCode,
      });

      return response.data;
    } catch (error) {
      console.error(
        "Add History Error:",
        error.response?.data || error.message,
      );

      return {
        success: false,
        message:
          error.response?.data?.message || "Unable to save meeting history",
      };
    }
  };

  // ==============================
  // CONTEXT DATA
  // ==============================

  const data = {
    userData,
    setUserData,

    handleRegister,
    handleLogin,

    getHistoryOfUser,
    addToUserHistory,
  };

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
