import React, { useEffect, useState } from "react";
import { auth } from "../../firebase/firebase";
import LoginYes from "./LoginYes";
import LoginNo from "./LoginNo";

function Login() {
  const [user, setUser] = useState("");
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  return <div>{user ? <LoginYes user={user} /> : <LoginNo />}</div>;
}

export default Login;
