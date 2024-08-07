import React, { useState } from "react";
import { Ig, googlePlay, microsoft } from "../assets";
import { useNavigate } from "react-router-dom";

const InstagramPage = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleFirstSubmit = (event) => {
    event.preventDefault();
    setIsConfirming(true);
  };

  const handleFinalSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      // Add your final submission logic here
      navigate("/thank-you-page");
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <div className="h-screen bg-white flex flex-col items-center">
      <div className="w-3/4 h-3/6 flex flex-col items-center bg-white my-4 border border-solid border-gray-300">
        <img src={Ig} alt="instagram" className="w-[200px] my-5" />
        {!isConfirming ? (
          <form className="flex flex-col items-center w-full" onSubmit={handleFirstSubmit}>
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
            <button className="h-10 w-3/4 bg-blue-600 text-white font-semibold border-solid text-sm rounded-xl pl-2 mb-4">
              Log In
            </button>
            <p className="font-thin text-sm">Forgot Password?</p>
          </form>
        ) : (
          <form className="flex flex-col items-center w-full" onSubmit={handleFinalSubmit}>
            <input
              className="h-10 w-3/4 bg-gray-50 border border-solid text-sm rounded-sm pl-2 my-4 outline-none"
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
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
