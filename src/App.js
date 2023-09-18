import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Donate from "./pages/Donate.jsx";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword.jsx";
import Profile from "./pages/Profile";
import Register from "./pages/Register";

import Layout from "./components/Layout.jsx";
import ChangePassword from "./pages/ChangePassword";
import GuestLayout from "./components/LayoutGuest.jsx";
import Messages from "./pages/Messages";
import AccountSetting from "./pages/AccountSetting";

function App() {
  return (
    <BrowserRouter>
      {/* <Container maxWidth="900" sx={{ marginTop: 2, paddingX: 3, paddingY: 3 }}>
        <Paper elevation={3} sx={{ minHeight: 400 }}> */}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/home" element={<Home />} />*/}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/account-setting" element={<AccountSetting />} />
        </Route>
        <Route path="" element={<GuestLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
      {/* </Paper>
      </Container> */}
    </BrowserRouter>
  );
}

export default App;
