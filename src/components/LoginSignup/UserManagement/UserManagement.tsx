import React, { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const UserManagement: React.FC = () => {
    const [users, setUsers] = useState<{ _id: string; email: string }[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch users
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BACKEND_URL}/auth/users`);
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Failed to fetch users.");
        }
        setLoading(false);
    };

    // Delete user
    const deleteUser = async (userId: string) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await axios.delete(`${BACKEND_URL}/auth/users/${userId}`);
            setUsers(users.filter((user) => user._id !== userId)); // Remove user from state
            alert("User deleted successfully!");
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Failed to delete user.");
        }
    };

    return (
        <div>
            <h2>Registered Users</h2>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.email}
                            <button onClick={() => deleteUser(user._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserManagement;
