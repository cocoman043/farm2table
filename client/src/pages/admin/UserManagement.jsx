import { useEffect, useState } from "react";
import Navbar from "../../components/AdminNavbar";
import UserTable from "../../components/UserTable";

function UserManagement() {
  const [tableData, setTableData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user');
        const users = await response.json();
        setTableData(users);
      } catch (error) {
        console.error(`An error occurred while fetching the users from the server: ${error.message}`);
      }
    }

    fetchData();
  }, []);

  const editUser = async (event, id) => {
    event.preventDefault();

    const name = event.target.name.value;
    const userType = event.target.userType.value;

    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ name, description, type, price, stock, img })
      });

      console.log('Successfully edited user');
    } catch (error) {
      console.error(`An error occurred while editing the user: ${error.message}`);
    }

    document.getElementById(id).close()
  }

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