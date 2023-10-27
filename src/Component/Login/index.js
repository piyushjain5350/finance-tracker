import React, { useState } from "react";
import { NavLink ,useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, doc, provider } from "../../Pages/Firebase";
import { toast } from "react-toastify";
import { getDoc, setDoc } from "firebase/firestore";

function LoginComponent() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading]=useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        console.log(user);
        toast.success("Logged In Successfully!");
        navigate("/dashboard");
      } catch (error) {
        toast.error(error.message);
        console.error(
          "Error signing in with email and password: ",
          error.message
        );
      }

      // const user = result.user;
      // console.log(user);
      console.log(email, password);
    } else {
      toast.error("Invalid credentials");
    }
  }
  const createUserDocument = async (user) => {
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : '',
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account Created!");
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        console.error("Error creating user document: ", error);
        setLoading(false);
      }
    }
  };

  const signInwithGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      await createUserDocument(user);
      toast.success("User Authenticated Successfully!");
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.error("Error signing in with Google: ", error.message);
    }
  };

  return (
    <div
      className="flex flex-col items-center gap-4
         shadow-2xl p-6  mt-5 sm:mt-10 rounded-2xl w-[90%] lg:w-[30%] bg-[var(--cardWhite)] text-[var(--textColor)]"
    >
      <div className="font-semibold text-xl">
        Log In on <span className="text-[var(--blue)]">Financely</span>
      </div>
      <div className="w-[100%] flex flex-col items-center gap-2">
        <form className="w-[100%]" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            placeholder="johndoe@gmail.com"
            className="input-val"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            placeholder="Text123"
            className="input-val"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            type="submit"
            value="Log In with Email and Password"
            className="w-[100%] border-[var(--blue)] border p-2 rounded hover:bg-[var(--blue)] text-[var(--blue)] hover:text-[var(--white)] cursor-pointer"
          />
        </form>
        <p>Or</p>
        <div className="w-[100%]  flex flex-col items-center gap-2">
          <button
            className="border w-[100%] border-[var(--blue)] p-2 bg-[var(--blue)] text-[var(--white)] rounded hover:bg-[var(--white)] hover:text-[var(--black)]"
            onClick={signInwithGoogle}
          >
            Log In with Google
          </button>
          <p className="text-sm sm:text-base  ">
            Or Don't Have An Account? <NavLink to="/">Click Here</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
