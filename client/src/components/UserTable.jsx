import { useState } from "react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import UserBadge from "./UserBadge";
import EditUserModal from "./EditUserModal";

function UserTable({ tableData, setTableData }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleEditSubmit = async (event, id) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const updatedUser = {
            name: formData.get("name"),
            permissions: formData.get("type"),
        };

        try {
        const response = await fetch(`http://localhost:3000/users/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        });

        if (response.ok) {
            console.log(`Successfully edited user with ID: ${id}`);
            setTableData((prevData) =>
            prevData.map((user) => (user._id === id ? { ...user, ...updatedUser } : user))
            );
            setIsModalOpen(false);
        } else {
            console.error('Failed to edit user');
        }
        } catch (error) {
            console.error(`An error occurred while editing the user: ${error.message}`);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/users/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                console.log(`Successfully deleted user with ID: ${id}`);
                setTableData((prevData) => prevData.filter((user) => user._id !== id));
            } else {
                console.error('Failed to delete user');
            }
        } catch (error) {
            console.error(`An error occurred while deleting the user: ${error.message}`);
        }
    };

    return (
        <div className="h-max card overflow-auto border-4 border-farmgreen">
            <table className="bg-white text-neutral">
                <thead className="bg-farmgreen rounded-3xl sticky top-0">
                <tr className="*:text-left *:p-4 *:text-xl">
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Permissions</th>
                    <th>Date Created</th>
                    <th></th>
                    <th></th>
                </tr>
                </thead>
                <tbody className="h-96 overflow-auto">
                {tableData.map((data, index) => {
                    const date = new Date(data.createdAt);
                    const day = date.getDate();
                    const month = date.toLocaleString('default', { month: 'long' });
                    const year = date.getFullYear();

                    return (
                    <tr key={index} className="even:bg-neutral-200 *:p-4">
                        <td>{data._id}</td>
                        <td>{data.name}</td>
                        <td>********</td>
                        <td>
                            <UserBadge status={data.permissions} />
                        </td>
                        <td>{`${month} ${day}, ${year}`}</td>
                        <td>
                            <EditButton onClick={() => handleEdit(data)} />
                        </td>
                        <td>
                            <DeleteButton onClick={() => handleDelete(data._id)} />
                        </td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            
            {isModalOpen && selectedUser && (
                <EditUserModal
                user={selectedUser}
                edit={handleEditSubmit}
                closeModal={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}

export default UserTable;
