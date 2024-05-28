import { useEffect, useState } from "react";
import Navbar from "../../components/AdminNavbar";
import UserTable from "../../components/UserTable";

function UserManagement() {
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        setTableData(users);
      } catch (error) {
        console.error(`An error occurred while fetching the users from the server: ${error.message}`);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex w-full p-16 justify-center text-black overflow-scroll">
        <div className="flex-row justify-center">
          <div className="text-3xl font-bold">User Management</div>
          <div className="flex gap-2 min-w-max">
            <UserTable tableData={tableData} setTableData={setTableData} setUsers={setUsers} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;