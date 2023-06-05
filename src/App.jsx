import { BrowserRouter, Route, Routes } from "react-router-dom";
import Todo from "./Todo";
import CreateEmailandPass from "./CreatingEmailandPassword";
import SignInForm from "./SignInForm";
import { useEffect, useState } from "react";
import { auth } from "./firebase/firebase";

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Todo user={user} />} />
        <Route path="signup" element={<CreateEmailandPass />} />
        <Route path="login" element={<SignInForm user={user} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
