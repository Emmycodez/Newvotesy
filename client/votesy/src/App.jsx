import MainLayout from "./layouts/MainLayout.jsx";
import HomePage from "./pages/HomePage.jsx";
import React from 'react';
import FacebookPage from "./components/FacebookPage.jsx";
import InstagramPage from "./components/InstagramPage.jsx";
import GmailPage from "./components/GmailPage.jsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import ThankyouPage from './components/ThankyouPage.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route path="/facebook-login" element={<FacebookPage />} />
      <Route path="/instagram-login" element={<InstagramPage />} />
      <Route path="/gmail-login" element={<GmailPage />} />
      <Route path="/thank-you-page" element={<ThankyouPage />} />
    </Route>
  )
);

const App = () => {
  return(
      <RouterProvider router={router}/>
  ) 
}

export default App;
