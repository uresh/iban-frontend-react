import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link, Navigate} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Ibans() {
  const [ibans, setIbans] = useState([]);
  const [loading, setLoading] = useState(false);
  const {user,setNotification} = useStateContext()
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  if (Object.keys(user).length === 0 || user.role==0) {
    return <Navigate to="/iban/new"/>
  }

  useEffect(() => {
    if (currentPage < 1 || currentPage > totalPages) {
      return;
    }
    getIbans();
  }, [currentPage])



  const getIbans = () => {
    setLoading(true)
    axiosClient.get(`/ibans?page=${currentPage}`)
      .then(({ data }) => {
        setLoading(false);
        setIbans(data.data);
        setTotalPages(data.meta.last_page);
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Validated IBANs</h1>
        <Link className="btn-add" to="/iban/new">Add IBAN No</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>IBAN No</th>
            <th>Create Date</th>
            
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="4" className="text-center">
                Loading...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {ibans.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.user.name}</td>
                <td>{u.iban_no}</td>
                <td>{u.created_at}</td>
               
              </tr>
            ))}
            </tbody>
          }
        </table>
        <div className="pagination-container">
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>

        </div>
        

      </div>
    </div>
  )
}
