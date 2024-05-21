import { FaBars, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logo.png";

function Navbar() {
    return (
      <>
        <div className="px-4 bg-farmgreen text-white flex justify-center">
            <div className="navbar p-0 max-w-[1440px] grid-cols-3">
                <div className="flex-none">
                    <button className="btn btn-square btn-ghost">
                        <FaBars className="text-2xl"/>
                    </button>
                </div>
                <div className="m-3 min-w-fit flex-1">
                    <img src={logo} className="h-5"></img>
                </div>
                <div className="flex-none flex items-center gap-2">
                    <button className="btn btn-square btn-ghost">
                        <FaUserCircle className="text-2xl"/>
                    </button>
                    <p className="font-inter font-bold text-xl tracking-wide">Christian</p>
                    <button className="btn btn-square btn-ghost">
                        <FaSignOutAlt className="text-2xl"/>
                    </button>
                </div>
            </div>
        </div>
      </>
    );
  }
  
  export default Navbar;