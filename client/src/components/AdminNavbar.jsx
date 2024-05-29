import { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo1.png";
import { useAuth } from '../auth/AuthProvider.jsx';

function Navbar() {
    const auth = useAuth();
    const userId = localStorage.getItem("userId");
    const [user, setUser] = useState("User");

    useEffect(() => {
        const getUser = async () => {
          try {
            const result = await fetch(`http://localhost:3000/user/${userId}`);
    
            const user = await result.json();
            setUser(user.name);
          } catch (error) {
            console.error(`An error occured while fetching the user: ${error.message}`);
          }
        };
    
        getUser();
      }, []);

    return (
      <>
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <div className="px-4 bg-farmgreen text-white flex justify-center">
                    <div className="navbar p-0 max-w-[1440px] flex grid-cols-3">
                        <div className="flex-none">
                            <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button"><FaBars className="text-2xl "/></label>
                        </div>
                        <div className="m-3 min-w-fit flex-1 flex justify-center md:justify-start">
                            <img src={logo} className="h-5"></img>
                        </div>
                        <div className="flex-none flex items-center gap-2">
                            {/* <button className="btn btn-square btn-ghost"> */}
                                <FaUserCircle className="mr-2 text-2xl"/>
                            {/* </button> */}
                            <p className="font-inter font-bold text-xl tracking-wide hidden md:flex">{ user.toUpperCase() }</p>
                            <button className="btn btn-square btn-ghost hidden md:flex" onClick={() => auth.logOut()}>
                                <FaSignOutAlt className="text-2xl"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div> 
            <div className="drawer-side z-10">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu px-6 py-20 w-80 min-h-full bg-farmgreen font-inter font-bold text-2xl text-white">
                    {/* Sidebar content here */}
                    <li className="border-b-white border-b"><a href="/admin" className="px-6 h-16 flex items-center">Dashboard</a></li>
                    <li className="border-b-white border-b"><a href="/admin/users" className="px-6 h-16 flex items-center">Users</a></li>
                    <li className="border-b-white border-b"><a href="/admin/products" className="px-6 h-16 flex items-center">Products</a></li>
                    <li className="border-b-white border-b"><a href="/admin/orders" className="px-6 h-16 flex items-center">Orders</a></li>
                    <li><a className="px-6 h-16 flex items-center">Sales</a></li>
                </ul>
            </div>
        </div>


        
      </>
    );
  }
  
  export default Navbar;