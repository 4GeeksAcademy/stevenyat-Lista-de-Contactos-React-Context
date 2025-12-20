import ContactCard from "../components/ContactCard.jsx";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const urlApi = `${import.meta.env.VITE_API_URL}${store.agendaForName}/contacts/`;
	// const urlApiAgenda = import.meta.env.VITE_API_AGENDA_URL
	// const[ newAgenda, setNewAgenda ] = useState([{ "slug": "stevenyat", "id": 54321 }]);
	
	const fetchContact = async () => {
	try{
	const response = await fetch(urlApi);
	const data = await response.json();
	dispatch({ type: 'load_contacts', payload: data.contacts });
	console.log(data.contacts);
	}catch(error){
		console.error("Error fetching contacts:", error);
	}   
	};
	// const crearAgenda = async () => {
	// 	const response = await fetch(urlApiAgenda, {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(newAgenda),
	// 	});
	// 	const data = await response.json();
	// 	console.log(data);
	// }
	useEffect(() => {
		fetchContact();
	},[]);

	return (
		<div className="text-center m-3 m-md-5">
			<h1 className="mb-4">Contact List
				{store && store.contactForName } </h1>
			{store.contacts.length === 0 ? (
				<div className="d-flex flex-column align-items-center justify-content-center py-5">
					<i className="fa-solid fa-address-book fa-4x text-muted mb-4"></i>
					<h4 className="text-muted mb-3">No contacts yet</h4>
					<p className="text-muted mb-4">
						Start building your contact list by adding your first contact.
					</p>
					<Link to="/new-contact" className="btn btn-primary">
						<i className="fa-solid fa-plus me-2"></i>
						Add Your First Contact
					</Link>
				</div>
			) : (
				<ContactCard/>
			)}
		</div>
	)	
};