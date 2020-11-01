import React , {useState,useEffect}from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const SearchUser = () => {
  const [users, setUser] = useState([]);
  const [results, setResults] = useState(users)
  const[search, setSearch] = useState("");
  useEffect(() => {
    async function fetchUser() {
      await getUsers()
    }
    fetchUser()
  }, [])
  useEffect(() => {
    console.log("In Effect", users, search)
    const filteredUsers = Object.values(users).filter(user => {
      return user.name.toLowerCase().includes(search.toLowerCase())
    })

    setResults(filteredUsers)
  },[search]);
  const getUsers = async () => {
    const result = await axios.get('http://localhost:3001/users');
    console.log('SetUserCalled', result)
    setUser(result.data.reverse())
    setResults(result.data.reverse())
  };
  const deleteUser = async id => {
    await axios.delete(`http://localhost:3001/users/${id}`);
    getUsers();
  };


  const handleChange = event => {
    setSearch(event.target.value);
  };
  return(
    <div>
    <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
    <i class="fas fa-search" aria-hidden="true"></i>
    <input class="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" value = {search}
      aria-label="Search" onChange ={handleChange} />
  </form>
  <div className="container">
    <div className="py-4">
      <h1>Search Result</h1>
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
          {results.map((user, index) => (
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
   </div>
  )
}
export default SearchUser;
