import { Route, Routes, useNavigate } from "react-router-dom"
import Home from "./pages/Home/Home"
import { ToastContainer } from 'react-toastify';

import DashboardPage from "./pages/dashboard/Dashboard"
import { ThemeProvider } from "./components/theme-provider"
import { Login } from "./pages/Auth/Login"
import { Register } from "./pages/Auth/Register"
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";
import Not_Found from "./pages/erorr_pages/Not_Found";
import AuthError from "./pages/erorr_pages/AuthError";
import MainProfile from "./pages/profile/components/page";
import SettingsLayout from "./pages/profile/layout";
import ChangePass from "./pages/profile/components/ChangePass";
import DashboardSetting from "./pages/Settings/layout";
import Category from "./pages/Settings/Components/Category";
import Services from "./pages/Settings/Components/Services";
import Users from "./pages/Settings/Components/Users";
import 'aos/dist/aos.css'; // Import AOS styles
import AOS from 'aos'; // Import AOS library
import OrdersDashboard from "./pages/Orders/OrdersDashboard";
import User_Orders from "./pages/Home/components/User_Orders";

// Initialize AOS after importing styles
AOS.init();
export default function App() {
  
  const token = localStorage.getItem("token") || null
  const userData = token ? jwtDecode(token).user_info : null
  console.log(userData)
  return (
    <>


      <ThemeProvider>

        <Routes>

          {/* Dashboard  */}
          <Route path="/dashboard" element={userData?.isAdmin ? <DashboardPage /> : <AuthError />} />
          <Route path="/dashboard/settings" element={userData?.isAdmin ? <DashboardSetting children={<Services/>} /> : <AuthError />} />
          <Route path="/dashboard/orders" element={userData?.isAdmin ? <OrdersDashboard/> : <AuthError />} />
          <Route path="/dashboard/settings/category" element={userData?.isAdmin ? <DashboardSetting children={<Category/>} /> : <AuthError />} />
          <Route path="/dashboard/settings/users" element={userData?.isAdmin ? <DashboardSetting children={<Users/>} /> : <AuthError />} />

          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          
          <Route path="/" element={<Home />} />
          <Route path="/user_order" element={userData?<User_Orders />:<Login/>} />

          
          <Route path="/profile" element={userData ?<SettingsLayout children={<MainProfile/>} />:<Login/>} />
          <Route path="/profile/changepassword" element={<SettingsLayout children={<ChangePass/>} />} />
          <Route path="/*" element={<Not_Found />} />
        </Routes>

      </ThemeProvider>
      <ToastContainer position="bottom-right" theme={localStorage.getItem("vite-ui-theme")} />
    </>
  )
}
