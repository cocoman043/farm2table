import { useState, useEffect } from "react";
import logo from "../../assets/logo2.png";
import Navbar from "../../components/AdminNavbar"
import { useAuth } from '../../auth/AuthProvider.jsx';

function AdminDashboard() {
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
      <Navbar />
      <div className="p-4 w-full flex flex-col items-center">
        <div className="max-w-[1440px] w-full h-[680px] flex justify-center items-center">
          <div className="w-[1000px] lg:h-96 rounded-2xl shadow-[0_0_60px_-10px_rgba(0,0,0,0.3)] flex overflow-hidden">
            
            <div className="flex-1 p-8 rounded-2xl shadow-[10px_0_60px_-15px_rgba(0,0,0,0.3)] grid gap-5 lg:gap-0 lg:flex lg:flex-col lg:justify-around">
              <h1 className="font-inter font-bold text-4xl">Good day, {user}!</h1>
              <p>
                Welcome to the new Academic Management Information System of UPLB! To start, we would like to inform you 
                first that this system is still under development. If you encounter any problems, errors or bugs please report it 
                through the AMIS Support GForm: https://forms.gle/oeJXQTC475HUvP9t7.
              </p>
              <p>
                This system is currently being co-created with UPLB Students and other stakeholders in coordination with the 
                UPLB University Student Council, units and colleges.
              </p>
            </div>

            <div className="flex-1 p-8 hidden lg:flex justify-center items-center ">
              <img className="w-3/4" src={logo} alt={"Farm to Table"}/>
            </div>

          </div>
        </div>
      </div>
    </>
  )
};

export default AdminDashboard;
