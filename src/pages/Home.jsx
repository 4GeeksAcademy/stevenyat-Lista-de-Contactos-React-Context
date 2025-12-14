import ContactCard from "../components/ContactCard.jsx";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect } from "react";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const urlApi = import.meta.env.VITE_API_URL + "/contacts/";
	
	const fetchContact = async () => {
	try{
	const response = await fetch(urlApi);
	const data = await response.json();
	dispatch({ type: 'load_contacts', payload: data.contacts });
	console.log(data.contacts[0].id);
	}catch(error){
		console.error("Error fetching contacts:", error);
	}   
	};
	useEffect(() => {
		fetchContact();
	}, []);

	return (
		<div className="text-center m-3 m-md-5">
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