// import * as React from "react";

// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Snackbar from "@mui/material/Snackbar";
// import Paper from "@mui/material/Paper";

// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { AuthContext } from "../contexts/AuthContext";

// import { useNavigate } from "react-router-dom";

// import loginBg from "./login background.avif";

// const defaultTheme = createTheme();

// export default function Authentication() {
//   const navigate = useNavigate();

//   // Form States
//   const [username, setUsername] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [name, setName] = React.useState("");

//   // Message States
//   const [error, setError] = React.useState("");
//   const [message, setMessage] = React.useState("");

//   // 0 = Login, 1 = Register
//   const [formState, setformState] = React.useState(0);

//   // Snackbar
//   const [open, setOpen] = React.useState(false);

//   const { handleRegister, handleLogin } = React.useContext(AuthContext);

//   // Switch to Login
//   const switchToLogin = () => {
//     setformState(0);
//     setName("");
//     setUsername("");
//     setPassword("");
//     setError("");
//   };

//   // Switch to Register
//   const switchToSignup = () => {
//     setformState(1);
//     setName("");
//     setUsername("");
//     setPassword("");
//     setError("");
//   };

//   // Handle Login/Register
//   const handleAuth = async (e) => {
//     e.preventDefault();

//     try {
//       // LOGIN
//       if (formState === 0) {
//         if (!username.trim() || !password.trim()) {
//           setError("Please enter username and password");
//           return;
//         }

//         const result = await handleLogin(username.trim(), password);

//         setError("");
//         setMessage(result || "Login successful");
//         setOpen(true);

//         setUsername("");
//         setPassword("");

//         navigate("/home");
//         return;
//       }

//       // REGISTER
//       if (formState === 1) {
//         if (!name.trim() || !username.trim() || !password.trim()) {
//           setError("Please fill all fields");
//           return;
//         }

//         const result = await handleRegister(
//           name.trim(),
//           username.trim(),
//           password,
//         );

//         setMessage(result || "User registered successfully");

//         setOpen(true);

//         setName("");
//         setUsername("");
//         setPassword("");
//         setError("");

//         // Automatically switch to login
//         setformState(0);
//       }
//     } catch (err) {
//       console.error("Authentication Error:", err);

//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       {/* MAIN PAGE */}
//       <Box
//         sx={{
//           minHeight: "100vh",

//           display: "flex",

//           justifyContent: "center",

//           alignItems: "center",

//           padding: {
//             xs: "20px",
//             sm: "30px",
//           },

//           backgroundImage: `linear-gradient(
//             rgba(5, 8, 20, 0.65),
//             rgba(5, 8, 20, 0.85)
//           ), url(${loginBg})`,

//           backgroundSize: "cover",

//           backgroundPosition: "center",

//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {/* AUTH CARD */}
//         <Paper
//           elevation={0}
//           sx={{
//             width: "100%",

//             maxWidth: "440px",

//             padding: {
//               xs: "28px 20px",
//               sm: "40px",
//             },

//             borderRadius: "28px",

//             background: "rgba(15, 23, 42, 0.88)",

//             backdropFilter: "blur(18px)",

//             border: "1px solid rgba(96, 165, 250, 0.25)",

//             boxShadow: "0 20px 60px rgba(0,0,0,0.55)",

//             color: "white",
//           }}
//         >
//           {/* ICON */}
//           <Box
//             sx={{
//               display: "flex",

//               justifyContent: "center",

//               mb: 2,
//             }}
//           >
//             <Avatar
//               sx={{
//                 width: 65,

//                 height: 65,

//                 background: "linear-gradient(135deg,#2563EB,#7C3AED)",

//                 boxShadow: "0 10px 30px rgba(59,130,246,.45)",
//               }}
//             >
//               <LockOutlinedIcon fontSize="medium" />
//             </Avatar>
//           </Box>

//           {/* HEADING */}
//           <Typography
//             component="h1"
//             variant="h4"
//             sx={{
//               textAlign: "center",

//               fontWeight: 800,

//               color: "#FFFFFF",

//               fontSize: {
//                 xs: "2rem",
//                 sm: "2.3rem",
//               },

//               mb: 1,
//             }}
//           >
//             {formState === 0 ? "Welcome Back 👋" : "Create Account 🚀"}
//           </Typography>

//           {/* SUBTITLE */}
//           <Typography
//             sx={{
//               textAlign: "center",

//               color: "#94A3B8",

//               mb: 3,

//               fontSize: "15px",
//             }}
//           >
//             {formState === 0
//               ? "Sign in to continue your meetings"
//               : "Create your account and start meeting"}
//           </Typography>

//           {/* LOGIN / REGISTER TABS */}
//           <Box
//             sx={{
//               display: "flex",

//               background: "rgba(255,255,255,0.05)",

//               border: "1px solid rgba(255,255,255,0.08)",

//               borderRadius: "14px",

//               padding: "4px",

//               mb: 3,
//             }}
//           >
//             <Button
//               fullWidth
//               onClick={switchToLogin}
//               sx={{
//                 borderRadius: "10px",

//                 textTransform: "none",

//                 fontWeight: 700,

//                 color: formState === 0 ? "white" : "#94A3B8",

//                 background:
//                   formState === 0
//                     ? "linear-gradient(90deg,#2563EB,#6366F1)"
//                     : "transparent",

//                 "&:hover": {
//                   background:
//                     formState === 0
//                       ? "linear-gradient(90deg,#1D4ED8,#4F46E5)"
//                       : "rgba(255,255,255,0.04)",
//                 },
//               }}
//             >
//               Login
//             </Button>

//             <Button
//               fullWidth
//               onClick={switchToSignup}
//               sx={{
//                 borderRadius: "10px",

//                 textTransform: "none",

//                 fontWeight: 700,

//                 color: formState === 1 ? "white" : "#94A3B8",

//                 background:
//                   formState === 1
//                     ? "linear-gradient(90deg,#2563EB,#6366F1)"
//                     : "transparent",

//                 "&:hover": {
//                   background:
//                     formState === 1
//                       ? "linear-gradient(90deg,#1D4ED8,#4F46E5)"
//                       : "rgba(255,255,255,0.04)",
//                 },
//               }}
//             >
//               Register
//             </Button>
//           </Box>

//           {/* FORM */}
//           <Box component="form" onSubmit={handleAuth}>
//             {/* FULL NAME */}
//             {formState === 1 && (
//               <TextField
//                 required
//                 fullWidth
//                 label="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 sx={textFieldStyle}
//                 margin="normal"
//               />
//             )}

//             {/* USERNAME */}
//             <TextField
//               required
//               fullWidth
//               label="Username"
//               value={username}
//               autoFocus
//               onChange={(e) => setUsername(e.target.value)}
//               sx={textFieldStyle}
//               margin="normal"
//             />

//             {/* PASSWORD */}
//             <TextField
//               required
//               fullWidth
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               sx={textFieldStyle}
//               margin="normal"
//             />

//             {/* ERROR */}
//             {error && (
//               <Typography
//                 sx={{
//                   color: "#F87171",

//                   textAlign: "center",

//                   mt: 2,

//                   fontSize: "14px",
//                 }}
//               >
//                 {error}
//               </Typography>
//             )}

//             {/* SUBMIT BUTTON */}
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{
//                 mt: 3,

//                 py: 1.4,

//                 borderRadius: "14px",

//                 fontSize: "16px",

//                 fontWeight: 700,

//                 textTransform: "none",

//                 background: "linear-gradient(90deg,#2563EB,#6366F1)",

//                 boxShadow: "0 8px 25px rgba(37,99,235,.35)",

//                 "&:hover": {
//                   background: "linear-gradient(90deg,#1D4ED8,#4F46E5)",

//                   transform: "translateY(-2px)",

//                   boxShadow: "0 12px 30px rgba(37,99,235,.5)",
//                 },

//                 transition: "0.3s",
//               }}
//             >
//               {formState === 0 ? "Log In →" : "Create Account →"}
//             </Button>
//           </Box>

//           {/* BOTTOM TEXT */}
//           <Typography
//             sx={{
//               textAlign: "center",

//               mt: 3,

//               color: "#94A3B8",

//               fontSize: "14px",
//             }}
//           >
//             {formState === 0
//               ? "Don't have an account?"
//               : "Already have an account?"}

//             <Box
//               component="span"
//               onClick={formState === 0 ? switchToSignup : switchToLogin}
//               sx={{
//                 ml: 1,

//                 color: "#60A5FA",

//                 fontWeight: 700,

//                 cursor: "pointer",

//                 "&:hover": {
//                   color: "#93C5FD",
//                 },
//               }}
//             >
//               {formState === 0 ? "Register" : "Login"}
//             </Box>
//           </Typography>
//         </Paper>

//         {/* SNACKBAR */}
//         <Snackbar
//           open={open}
//           autoHideDuration={3000}
//           onClose={() => setOpen(false)}
//           message={message}
//         />
//       </Box>
//     </ThemeProvider>
//   );
// }

// /* TEXTFIELD STYLE */

// const textFieldStyle = {
//   "& .MuiInputLabel-root": {
//     color: "#94A3B8",
//   },

//   "& .MuiInputLabel-root.Mui-focused": {
//     color: "#60A5FA",
//   },

//   "& .MuiOutlinedInput-root": {
//     color: "white",

//     borderRadius: "12px",

//     background: "rgba(255,255,255,0.04)",

//     "& fieldset": {
//       borderColor: "rgba(148,163,184,0.25)",
//     },

//     "&:hover fieldset": {
//       borderColor: "#3B82F6",
//     },

//     "&.Mui-focused fieldset": {
//       borderColor: "#3B82F6",

//       borderWidth: "2px",
//     },
//   },
// };

import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Paper from "@mui/material/Paper";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { AuthContext } from "../contexts/AuthContext";

import { useNavigate } from "react-router-dom";

import loginBg from "./login background.avif";

// ==============================
// THEME
// ==============================

const defaultTheme = createTheme();

// ==============================
// AUTHENTICATION COMPONENT
// ==============================

export default function Authentication() {
  const navigate = useNavigate();

  // ==============================
  // FORM STATES
  // ==============================

  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");

  const [name, setName] = React.useState("");

  // ==============================
  // MESSAGE STATES
  // ==============================

  const [error, setError] = React.useState("");

  const [message, setMessage] = React.useState("");

  // 0 = LOGIN
  // 1 = REGISTER

  const [formState, setFormState] = React.useState(0);

  // ==============================
  // SNACKBAR
  // ==============================

  const [open, setOpen] = React.useState(false);

  const { handleRegister, handleLogin } = React.useContext(AuthContext);

  // ==============================
  // SHOW MESSAGE
  // ==============================

  const showMessage = (text) => {
    setMessage(typeof text === "string" ? text : "Something went wrong");

    setOpen(true);
  };

  // ==============================
  // SWITCH TO LOGIN
  // ==============================

  const switchToLogin = () => {
    setFormState(0);

    setName("");
    setUsername("");
    setPassword("");

    setError("");
    setMessage("");
  };

  // ==============================
  // SWITCH TO REGISTER
  // ==============================

  const switchToSignup = () => {
    setFormState(1);

    setName("");
    setUsername("");
    setPassword("");

    setError("");
    setMessage("");
  };

  // ==============================
  // HANDLE AUTHENTICATION
  // ==============================

  const handleAuth = async (e) => {
    e.preventDefault();

    // Clear previous error
    setError("");

    try {
      // ==========================
      // LOGIN
      // ==========================

      if (formState === 0) {
        if (!username.trim() || !password.trim()) {
          setError("Please enter username and password");

          return;
        }

        const result = await handleLogin(username.trim(), password);

        console.log("Login Result:", result);

        // Login failed
        if (!result?.success) {
          setError(result?.message || "Login failed");

          return;
        }

        // Login successful
        showMessage(result.message || "Login successful");

        setUsername("");
        setPassword("");

        // Navigate after successful login
        setTimeout(() => {
          navigate("/home");
        }, 500);

        return;
      }

      // ==========================
      // REGISTER
      // ==========================

      if (formState === 1) {
        if (!name.trim() || !username.trim() || !password.trim()) {
          setError("Please fill all fields");

          return;
        }

        const result = await handleRegister(
          name.trim(),
          username.trim(),
          password,
        );

        console.log("Register Result:", result);

        // Registration failed
        if (!result?.success) {
          setError(result?.message || "Registration failed");

          return;
        }

        // Registration successful
        showMessage(result.message || "User registered successfully");

        setName("");
        setUsername("");
        setPassword("");

        // Switch to login
        setTimeout(() => {
          setFormState(0);
        }, 500);
      }
    } catch (err) {
      console.error("Authentication Error:", err);

      setError(
        err?.response?.data?.message || err?.message || "Something went wrong",
      );
    }
  };

  // ==============================
  // CLOSE SNACKBAR
  // ==============================

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          minHeight: "100vh",

          display: "flex",

          justifyContent: "center",

          alignItems: "center",

          padding: {
            xs: "20px",
            sm: "30px",
          },

          backgroundImage: `
            linear-gradient(
              rgba(5, 8, 20, 0.65),
              rgba(5, 8, 20, 0.85)
            ),
            url(${loginBg})
          `,

          backgroundSize: "cover",

          backgroundPosition: "center",

          backgroundRepeat: "no-repeat",
        }}
      >
        {/* ========================= */}
        {/* AUTH CARD */}
        {/* ========================= */}

        <Paper
          elevation={0}
          sx={{
            width: "100%",

            maxWidth: "440px",

            padding: {
              xs: "28px 20px",
              sm: "40px",
            },

            borderRadius: "28px",

            background: "rgba(15, 23, 42, 0.88)",

            backdropFilter: "blur(18px)",

            border: "1px solid rgba(96, 165, 250, 0.25)",

            boxShadow: "0 20px 60px rgba(0,0,0,0.55)",

            color: "white",
          }}
        >
          {/* ========================= */}
          {/* ICON */}
          {/* ========================= */}

          <Box
            sx={{
              display: "flex",

              justifyContent: "center",

              mb: 2,
            }}
          >
            <Avatar
              sx={{
                width: 65,

                height: 65,

                background: "linear-gradient(135deg,#2563EB,#7C3AED)",

                boxShadow: "0 10px 30px rgba(59,130,246,.45)",
              }}
            >
              <LockOutlinedIcon fontSize="medium" />
            </Avatar>
          </Box>

          {/* ========================= */}
          {/* HEADING */}
          {/* ========================= */}

          <Typography
            component="h1"
            variant="h4"
            sx={{
              textAlign: "center",

              fontWeight: 800,

              color: "#FFFFFF",

              fontSize: {
                xs: "2rem",
                sm: "2.3rem",
              },

              mb: 1,
            }}
          >
            {formState === 0 ? "Welcome Back 👋" : "Create Account 🚀"}
          </Typography>

          {/* ========================= */}
          {/* SUBTITLE */}
          {/* ========================= */}

          <Typography
            sx={{
              textAlign: "center",

              color: "#94A3B8",

              mb: 3,

              fontSize: "15px",
            }}
          >
            {formState === 0
              ? "Sign in to continue your meetings"
              : "Create your account and start meeting"}
          </Typography>

          {/* ========================= */}
          {/* LOGIN / REGISTER TABS */}
          {/* ========================= */}

          <Box
            sx={{
              display: "flex",

              background: "rgba(255,255,255,0.05)",

              border: "1px solid rgba(255,255,255,0.08)",

              borderRadius: "14px",

              padding: "4px",

              mb: 3,
            }}
          >
            {/* LOGIN TAB */}

            <Button
              fullWidth
              onClick={switchToLogin}
              sx={{
                borderRadius: "10px",

                textTransform: "none",

                fontWeight: 700,

                color: formState === 0 ? "white" : "#94A3B8",

                background:
                  formState === 0
                    ? "linear-gradient(90deg,#2563EB,#6366F1)"
                    : "transparent",

                "&:hover": {
                  background:
                    formState === 0
                      ? "linear-gradient(90deg,#1D4ED8,#4F46E5)"
                      : "rgba(255,255,255,0.04)",
                },
              }}
            >
              Login
            </Button>

            {/* REGISTER TAB */}

            <Button
              fullWidth
              onClick={switchToSignup}
              sx={{
                borderRadius: "10px",

                textTransform: "none",

                fontWeight: 700,

                color: formState === 1 ? "white" : "#94A3B8",

                background:
                  formState === 1
                    ? "linear-gradient(90deg,#2563EB,#6366F1)"
                    : "transparent",

                "&:hover": {
                  background:
                    formState === 1
                      ? "linear-gradient(90deg,#1D4ED8,#4F46E5)"
                      : "rgba(255,255,255,0.04)",
                },
              }}
            >
              Register
            </Button>
          </Box>

          {/* ========================= */}
          {/* FORM */}
          {/* ========================= */}

          <Box component="form" onSubmit={handleAuth}>
            {/* FULL NAME */}

            {formState === 1 && (
              <TextField
                required
                fullWidth
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={textFieldStyle}
                margin="normal"
              />
            )}

            {/* USERNAME */}

            <TextField
              required
              fullWidth
              label="Username"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              sx={textFieldStyle}
              margin="normal"
            />

            {/* PASSWORD */}

            <TextField
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={textFieldStyle}
              margin="normal"
            />

            {/* ========================= */}
            {/* ERROR */}
            {/* ========================= */}

            {error && (
              <Typography
                sx={{
                  color: "#F87171",

                  textAlign: "center",

                  mt: 2,

                  fontSize: "14px",

                  lineHeight: 1.5,
                }}
              >
                {error}
              </Typography>
            )}

            {/* ========================= */}
            {/* SUBMIT BUTTON */}
            {/* ========================= */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,

                py: 1.4,

                borderRadius: "14px",

                fontSize: "16px",

                fontWeight: 700,

                textTransform: "none",

                background: "linear-gradient(90deg,#2563EB,#6366F1)",

                boxShadow: "0 8px 25px rgba(37,99,235,.35)",

                "&:hover": {
                  background: "linear-gradient(90deg,#1D4ED8,#4F46E5)",

                  transform: "translateY(-2px)",

                  boxShadow: "0 12px 30px rgba(37,99,235,.5)",
                },

                transition: "0.3s",
              }}
            >
              {formState === 0 ? "Log In →" : "Create Account →"}
            </Button>
          </Box>

          {/* ========================= */}
          {/* BOTTOM TEXT */}
          {/* ========================= */}

          <Typography
            sx={{
              textAlign: "center",

              mt: 3,

              color: "#94A3B8",

              fontSize: "14px",
            }}
          >
            {formState === 0
              ? "Don't have an account?"
              : "Already have an account?"}

            <Box
              component="span"
              onClick={formState === 0 ? switchToSignup : switchToLogin}
              sx={{
                ml: 1,

                color: "#60A5FA",

                fontWeight: 700,

                cursor: "pointer",

                "&:hover": {
                  color: "#93C5FD",
                },
              }}
            >
              {formState === 0 ? "Register" : "Login"}
            </Box>
          </Typography>
        </Paper>

        {/* ========================= */}
        {/* SNACKBAR */}
        {/* ========================= */}

        <Snackbar
          open={open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={message}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        />
      </Box>
    </ThemeProvider>
  );
}

// ==============================
// TEXTFIELD STYLE
// ==============================

const textFieldStyle = {
  "& .MuiInputLabel-root": {
    color: "#94A3B8",
  },

  "& .MuiInputLabel-root.Mui-focused": {
    color: "#60A5FA",
  },

  "& .MuiOutlinedInput-root": {
    color: "white",

    borderRadius: "12px",

    background: "rgba(255,255,255,0.04)",

    "& fieldset": {
      borderColor: "rgba(148,163,184,0.25)",
    },

    "&:hover fieldset": {
      borderColor: "#3B82F6",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#3B82F6",

      borderWidth: "2px",
    },
  },
};
