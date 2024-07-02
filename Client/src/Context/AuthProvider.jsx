import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import useAxiosSecure from "../Hooks/useAxiosSecure";


import axios from "axios";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import auth from "../Firebase/Firebase.config";
export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const googleProvider = new GoogleAuthProvider();
  const gitHubProvider = new GithubAuthProvider();

  const createUser = (email, pass) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const googlePopUp = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const gitHubLogIn = () => {
    return signInWithPopup(auth, gitHubProvider);
  };

  const logIn = (email, pass) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      const userEmail = currentUser?.email || user?.email;
      setUser(currentUser);
      setLoading(false);
      console.log("we are watching");

      if (currentUser) {
        
        axios
          .post("https://pha10.vercel.app/generate-token", {email: userEmail}, {
            withCredentials: true,
          })
          .then((res) => console.log('token response',res.data));
      }
      else{
        axiosSecure.post('https://pha10.vercel.app/logout', {withCredentials:true})
        .then(data=> console.log(data.data))
      }
    });
    return () => {
      unSubscribe;
    };
  }, []);

  const authInfo = {
    createUser,
    loading,
    setLoading,
    setUser,
    logIn,
    user,
    logOut,
    googlePopUp,
    gitHubLogIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
