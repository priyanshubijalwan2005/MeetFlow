import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { Meeting } from "../models/meeting.model.js";


const login = async (req, res) => {
  const { username, password } = req.body;

  // Check if fields are empty
  if (!username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Username and password are required",
    });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({
        message: "User not found",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid username or password",
      });
    }

    // Generate token
    const token = crypto.randomBytes(20).toString("hex");

    user.token = token;
    await user.save();

    return res.status(httpStatus.OK).json({
      token: token,
      message: "Login Successful",
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong during login",
    });
  }
};


const register = async (req, res) => {
  const { name, username, password } = req.body;

  // Check if all fields are provided
  if (!name || !username || !password) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: "Please fill all fields",
    });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(httpStatus.CONFLICT).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    console.log("New user registered:", username);

    return res.status(httpStatus.CREATED).json({
      message: "User Registered Successfully",
    });

  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong during registration",
    });
  }
};


const getUserHistory = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid user token",
      });
    }

    const meetings = await Meeting.find({
      user_id: user.username,
    });

    return res.status(httpStatus.OK).json(meetings);

  } catch (error) {
    console.error("History Error:", error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while fetching history",
    });
  }
};


const addToHistory = async (req, res) => {
  const { token, meeting_code } = req.body;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        message: "Invalid user token",
      });
    }

    const newMeeting = new Meeting({
      user_id: user.username,
      meetingCode: meeting_code,
    });

    await newMeeting.save();

    return res.status(httpStatus.CREATED).json({
      message: "Added code to history",
    });

  } catch (error) {
    console.error("Add History Error:", error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Something went wrong while adding meeting history",
    });
  }
};


export {
  login,
  register,
  getUserHistory,
  addToHistory,
};