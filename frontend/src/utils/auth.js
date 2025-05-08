// /src/utils/auth.js
import { jwtDecode } from "jwt-decode";

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode(token); // decode expiration time
    return exp * 1000 > Date.now(); // check if token is still valid
  } catch (err) {
    return false;
  }
};

// Get the role of the logged-in user
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const { role } = jwtDecode(token);
    return role;
  } catch (err) {
    return null;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login"; // redirect to login
};
