import { useEffect, useState } from "react";
import storeReducer from "../store";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const VistaContact = () => {

const {store} = useGlobalReducer();
const {id} = useParams();
const contact = store.contacts.find((contact) => contact.id.toString() === id);

  return (
      <div className="d-flex justify-content-center align-items-center flex-column mt-5">
        <div className="card" style={{ width: 'auto' }}>
            <img 
              src={store.imgPerson} 
              alt="Profile" 
              className="rounded-circle mx-auto mt-3" 
              style={{width: "420px", height: "420px", objectFit: "cover"}}
            />
            <div className="card-body d-flex flex-column">
              <h5 className="card-title text-center">{contact.name}</h5>
              <div className="card-text d-flex flex-column align-items-start text-muted mb-3 ms-3">
								<h6><i className="fa-solid fa-location-dot me-2"></i>{contact.address}</h6>
								<h6><i className="fa-solid fa-phone-flip me-2"></i>{contact.phone}</h6>
								<h6><i className="fa-solid fa-envelope me-2"></i>{contact.email}</h6>
              </div>
              <a href="#" className="btn btn-secondary w-50 m-auto">Hire</a>
            </div>
        </div>
      </div>
  );
};
export default VistaContact;
