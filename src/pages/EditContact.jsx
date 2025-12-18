import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useParams } from "react-router-dom";




const EditContact = () => {

  const {id} = useParams();

  const { store } = useGlobalReducer();

  
  const fields = [
    { label: "Full Name", type: "text", placeholder: "Full Name", id: "name" },
    { label: "Email", type: "email", placeholder: "Enter email", id: "email" },
    { label: "Phone", type: "text", placeholder: "Enter phone", id: "phone" },
    { label: "Address", type: "text", placeholder: "Enter address", id: "address" }
  ]

  const navigate = useNavigate();

  const contact = store.contacts.find((contact) => contact.id.toString() === id);


  const[ newContact, setNewContact ] = useState(contact)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL + "/contacts/" + id;
    
    const response = await fetch(apiUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newContact)
    })
    const data = await response.json();
    if (response.ok) {
      navigate("/")
    }
  }

  const handleImput = async (e) => {
    setNewContact({
      ...newContact,
      [e.target.id]: e.target.value
    })
  }
  useEffect(() => {

  }, [])

  return (<>
  <div className="d-flex justify-content-center align-items-center flex-column mt-5">
    <h1>Edit Contact</h1>
    <form className="d-flex flex-column w-50">
      {
        fields.map((field, index) => (
          <div className="mb-3" key={index}>
            <label htmlFor={field.id} className="form-label">{field.label}</label>
            <input 
              type={field.type} 
              className="form-control" 
              id={field.id} 
              placeholder={field.placeholder}
              value={newContact[field.id]}
              onChange={handleImput}
            />
          </div>
        ))
      }
      <button 
        onClick={handleSubmit}
        className="btn btn-outline-dark mt-2 w-50 m-auto" 
        type="submit"
      >
        Edit
      </button>
    </form>
  </div> 
  </>)
}

export default EditContact