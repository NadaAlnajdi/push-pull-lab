import React, { useState, useEffect } from "react";
import $ from "jquery";
import "../userTable.css";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch users data from the server
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:5000/users",
      success: (response) => {
        console.log("Users fetched:", response);
        setUsers(response);
        setLoading(false);
      },
      error: (xhr, status, error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users. Please try again.");
        setLoading(false);
      },
    });
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      $.ajax({
        type: "DELETE",
        url: `http://localhost:5000/users/${userId}`,
        success: (response) => {
          console.log("User deleted:", response);
          fetchUsers();
        },
        error: (xhr, status, error) => {
          console.error("Error deleting user:", error);
        },
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary">Users</h2>
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
