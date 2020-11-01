import React, {useState,useEffect} from 'react'
import axios from "axios"
import { Link } from "react-router-dom"


const Home = (props) =>{
  const [users, setUser] = useState([]);

  useEffect(() => {
    getUsers();
  },[]);
  const getUsers = async () => {
    const result = await axios.get("http://localhost:3001/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    getUsers();
  };

  return (
    <div className="container">
    <div className="py-4">
      <h1>Home Page</h1>
      <table class="table border shadow">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Password</th>
            <th scope="col">Phone No.</th>

            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>
                <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                  View
                </Link>
                <Link
                  class="btn btn-outline-primary mr-2"
                  to={`/users/edit/${user.id}`}
                >
                  Edit
                </Link>
                <Link
                  class="btn btn-danger"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Home
