import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import Dashboard from "../adminDashboard/Dashboard";

const LoginYes = () => {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div>
      <div className="mainScreen">
        <div>
          <h1>Admin Page</h1>
        </div>
        <div>
          <button onClick={() => logout()}>Log Out</button>
        </div>
      </div>
      <div>
        <Dashboard />
      </div>
    </div>
  );
};

export default LoginYes;
