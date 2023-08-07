import { useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function UserAuth({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  console.log("API KEY :", apiKey);
  const url = new URL("", apiKey);

  // Function to register a new user using local strategy
  const registerLocal = async (userData) => {
    try {
      const { data } = await axios.post(url + "auth/register", userData, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      });
      toast.success(data.msg);
    } catch (error) {
      toast.success(error.response.data.error);
    }
  };

  // Function to register a new user using local strategy
  const loginLocal = async (userData) => {
    try {
      const { data } = await axios.post(url + "auth/login", userData, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      });
      setUser(data.user);
      toast.success(data.msg);
    } catch (error) {
      toast.error(
        error.response.data.error
          ? error.response.data.error
          : error.response.data
      );
    }
  };

  // Function to authenticate with GitHub strategy
  const authenticateGitHub = async () => {
    window.open(url + "auth/github", "_self");
  };

  // Function to authenticate with GitHub strategy
  const authenticateTwitter = async () => {
    window.open(url + "auth/twitter", "_self");
  };

  // Function to authenticate with Facebook strategy
  const authenticateFacebook = async () => {
    window.open(url + "auth/facebook", "_self");
  };

  // Function to authenticate with Google strategy
  const authenticateGoogle = async () => {
    window.open(url + "auth/google", "_self");
  };

  // Function to get the user's profile
  const getProfile = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(url + "profile", {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      });
      setIsLoading(false);
      setUser(data.user);
      toast.success(data.msg);
    } catch (error) {
      setIsLoading(false);
      navigate("/login");
    }
    setIsLoading(false);
  };

  // Function to update the user's profile
  const updateProfile = async (updatedData) => {
    try {
      setProfileLoading(true);
      const response = await axios.patch(url + "profile", updatedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      setUser(response.data.user);
      toast(response.data.msg);
    } catch (error) {
      toast(error.response.data.error);
    }
    setProfileLoading(false);
  };

  // Function to update the user's profile
  const logout = async () => {
    try {
      const { data } = await axios.get(url + "auth/logout", {
        withCredentials: true,
      });
      setUser(null);
      toast.success(data.msg || data.error);
      navigate("/login");
    } catch (error) {
      toast.success(error.response.data.error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isLoading,
        profileLoading,
        user,
        registerLocal,
        loginLocal,
        authenticateGitHub,
        authenticateTwitter,
        authenticateFacebook,
        authenticateGoogle,
        getProfile,
        updateProfile,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
}

UserAuth.propTypes = {
  children: PropTypes.object,
};

export default UserAuth;
