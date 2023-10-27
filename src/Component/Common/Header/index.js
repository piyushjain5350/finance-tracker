import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../Pages/Firebase";
import userSvg from "../../../assets/user.svg";
import { Switch } from "antd";
import { toast } from "react-toastify";
import "./style.css"

function Header() {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "light" ? true : false
  );

  useEffect(() => {
    if (localStorage.getItem("theme") === "light") {
      setLight();
    } else {
      setDark();
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [user]);

  function logout() {
    auth.signOut();
    navigate("/");
  }

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const changeMode = () => {
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
    const mode = localStorage.getItem("theme");
    if (mode === "dark") {
      setLight();
    } else {
      setDark();
    }
  };

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  return (
    <div className="bg-[var(--blue)] p-4 text-[var(--white)] flex justify-between items-center w-full h-[10%]">
      <div className="font-semibold text-xl ">Financely</div>
      <div className="flex gap-6">
        <div>
          <Switch defaultChecked onChange={changeMode} className="bg-[var(--white)]" colorPrimary="#f1f1f1"/>
        </div>
        {user ? (
          <p className="flex items-center text-" onClick={logout}>
            <span style={{ marginRight: "1rem" }}>
              <img
                src={user.photoURL ? user.photoURL : userSvg}
                alt="profile"
                width={user.photoURL ? "32" : "24"}
                style={{ borderRadius: "50%" }}
                className="bg-transparent"
              />
            </span>
            Logout
          </p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Header;
