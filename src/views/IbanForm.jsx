import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function IbanForm() {
  const {user,setNotification} = useStateContext()
  const navigate = useNavigate();
  let {id} = useParams();
  const [iban, setIban] = useState({
    id: null,
    iban_no: '',
    user_id: user.id
   
 
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)


  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/ibans/${id}`)
        .then(({data}) => {
          setLoading(false)
          setIban(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (iban.id) {
      axiosClient.put(`/ibans/${iban.id}`, iban)
        .then(() => {
          setNotification('iban was successfully updated')
          navigate('/ibans')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/ibans', iban)
        .then(() => {
          setNotification('iban was successfully created')
          navigate('/ibans')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {iban.id && <h1>Update IBAN: {iban.iban_no}</h1>}
      {!iban.id && <h1>New IBAN</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          <form onSubmit={onSubmit}>
            <input value={iban.iban_no} onChange={ev => setIban({...iban, iban_no: ev.target.value})} placeholder="IBAN No"/>
            <input type="hidden" value={iban.user_id} onChange={ev => setIban({...iban, user_id: ev.target.value})} placeholder="user id"/>
            <button className="btn">Validate</button>
          </form>
        )}
      </div>
    </>
  )
}
