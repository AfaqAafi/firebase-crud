import React, { useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase/firebase";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ user }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  function signInWEAP() {
    try {
      signInWithEmailAndPassword(auth, email, password).then((cred) => {
        console.log("user logged in", cred.user);
      });
    } catch (error) {
      console.log("Error creating user", error);
    }
  }

  const onChangeHandlerE = (event) => {
    setEmail(event.target.value);
  };

  const onChangeHandlerP = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-md bg-gray-300 mx-auto my-5 p-5">
      <h1 className="text-gray-700 text-xl mb-3"> Log in </h1>
      <input
        onChange={onChangeHandlerE}
        value={email}
        type="email"
        placeholder="email"
        className="p-2 rounded-lg border-2 mb-2 border-gray-500 w-80"
      ></input>
      <br></br>
      <input
        onChange={onChangeHandlerP}
        value={password}
        type="password"
        placeholder="password"
        className="p-2 rounded-lg border-2 border-gray-500 w-80"
      ></input>
      <br />
      <button onClick={signInWEAP} className="p-2 rounded-md bg-blue-400 mt-3">
        Log In
      </button>
      <p className="text-gray-600 text-base mt-3">
        Do not Have an account?{" "}
        <a
          href=""
          className="underline text-blue-500"
          onClick={() => navigate("/signup")}
        >
          {" "}
          Signup
        </a>
      </p>
    </div>
  );
};

export default SignInForm;
