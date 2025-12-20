import { useState } from "react"
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";


const NewContact = () => {
  
  const fields = [
    { label: "Full Name", type: "text", placeholder: "Full Name", id: "name" },
    { label: "Email", type: "email", placeholder: "Enter email", id: "email" },
    { label: "Phone", type: "text", placeholder: "Enter phone", id: "phone" },
    { label: "Address", type: "text", placeholder: "Enter address", id: "address" }
  ]

  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();

  const[ newContact, setNewContact ] = useState({
    name: "",
    phone: "",
    email: "",
    address: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `${import.meta.env.VITE_API_URL}${store.agendaForName}/contacts`;
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newContact)
      });
      const data = await response.json();

      dispatch({ type: 'load_contacts', payload: data.contacts });      
      if (response.ok) {
        
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating contact:", error);
    }
  }

  const handleImput = async (e) => {
    setNewContact({
      ...newContact,
      [e.target.id]: e.target.value
    })
  }

  return (<>
  <div className="d-flex justify-content-center align-items-center flex-column container card w-50 mt-5 pb-3">
    <h1>Add New Contact</h1>
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
        className="btn btn-secondary mt-2 w-50 m-auto" 
        type="submit"
      >
        Save Contact
      </button>
    </form>
  </div>
  </>)
}

export default NewContact