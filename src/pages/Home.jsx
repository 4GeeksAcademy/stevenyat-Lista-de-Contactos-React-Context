import ContactCard from "../components/ContactCard.jsx";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { useEffect, useState } from "react";

export const Home = () => {

	const [ isLoading, setIsLoading ] = useState(false);

	const { store, dispatch } = useGlobalReducer();


	
	const fetchContact = async () => {
		const urlApi = `https://playground.4geeks.com/contact/agendas/${store.agendaForName}/contacts/`;
		
		setIsLoading(true);
		
		try{

			if( !store || store.agendaForName === "" || !store.agendaForName){
				setIsLoading(false);
				return;
			}

			const response = await fetch(urlApi);

			if (!response.ok) {
				let resp = await crearAgenda();
				if (resp.ok) {
					console.log("Agenda created successfully");
					fetchContact();
					return;
				}
			}

			const data = await response.json();
			dispatch({ type: 'load_contacts', payload: data.contacts });

		} catch(error){
			console.error("Error fetching contacts:", error);
		} finally {
			setIsLoading(false);
		}
	};
	const crearAgenda = async () => {

		const urlApiAgenda = `https://playground.4geeks.com/contact/agendas/stevenyat/`;

		const response = await fetch(urlApiAgenda, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
	}
	useEffect(() => {
		fetchContact();
	},[store.agendaForName]);

	return (
		<div className="text-center m-3 m-md-5">

			{ isLoading && <div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">Loading...</span>
			</div> }

			<h1 id="title" className="mb-4">Contact List Of {store.agendaForName}</h1>
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