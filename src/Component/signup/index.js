import React, { useState } from "react";
import { NavLink , useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../Pages/Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

function SignUpComponent() {
  const navigate=useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");

  async function signUpWithEmail(e) {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "" && cnfPassword !== "") {
      if (password === cnfPassword) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("Sign Up successful");
            createDoc(user);
            navigate("/dashboard");
            setName("");
            setEmail("");
            setPassword("");
            setCnfPassword("");
          })
          .catch((err) => {
            // console.log(err.code);
            // console.log(err.message);
            toast.error(err.code);
          });
      } else {
        toast.error("Password Doesn't Match");
      }
    } else {
      toast.error("Invalid crendetials");
    }
  }

  const createDoc = async (user) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);

    if (!userData.exists()) {
      const { displayName, email, photoURL } = user;
      const createdAt = new Date();

      try {
        await setDoc(userRef, {
          name: displayName ? displayName : name,
          email,
          photoURL: photoURL ? photoURL : "",
          createdAt,
        });
        toast.success("Account Created!");
        // setLoading(false);
      } catch (error) {
        // toast.error(error.message);
        console.error("Error creating user document: ", error);
        // setLoading(false);
      }
    }
  };

  const signInwithGoogle = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log(user);
      await createDoc(user);
      
      toast.success("User Authenticated Successfully!");
      // setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      // setLoading(false);
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
        Sign Up on <span className="text-[var(--blue)]">Financely</span>
      </div>
      <div className="w-[100%] flex flex-col flex-wrap items-center gap-2">
        <form className="w-[100%]" onSubmit={signUpWithEmail}>
          <label htmlFor="name">Full Name</label>
          <br />
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Piyush Jain"
            className="input-val"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@gmail.com"
            className="input-val"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Text123"
            className="input-val"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <label htmlFor="cnfPassword">Confirm Password</label>
          <br />
          <input
            type="password"
            name="password"
            id="cnfpassword"
            placeholder="Text123"
            className="input-val"
            value={cnfPassword}
            onChange={(e) => setCnfPassword(e.target.value)}
          />
          <br />
          <input
            type="submit"
            value="Sign up with Email and Password"
            className="w-[100%] border-[var(--blue)] border p-2 rounded hover:bg-[var(--blue)] text-[var(--blue)] hover:text-[var(--white)] cursor-pointer"
          />
        </form>
        <p>Or</p>
        <div className="w-[100%]  flex flex-col items-center gap-2">
          <button
            className="border w-[100%] border-[var(--blue)] p-2 bg-[var(--blue)] text-[var(--white)] rounded hover:bg-[var(--white)] hover:text-[var(--black)] "
            onClick={signInwithGoogle}
          >
            Sign Up with Google
          </button>
          <p className="text-sm sm:text-base  ">
            Already have Account? <NavLink to="/login">Click Here</NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
