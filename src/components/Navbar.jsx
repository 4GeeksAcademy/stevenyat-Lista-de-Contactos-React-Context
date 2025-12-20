import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { use } from "react";

export const Navbar = () => {

	const {store, dispatch} = useGlobalReducer();
	const apiUrl = "https://playground.4geeks.com/contact/agendas"
	const fetAllAgendas = async () => {
		const response = await fetch(apiUrl);
		const data = await response.json();
		dispatch({type: 'load_agendas', payload: data.agendas});
	};
	console.log(store.agendaForName);
	useEffect(() => {
		fetAllAgendas();
	}, []);
	return (
		<nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
			<div className="container">
				<div>
				<Link className="text-black text-decoration-none" to="/">
					<span className="navbar-brand mb-0 h1">Contact List</span>
				</Link>
				</div>
				<div className="d-flex">
				<Link to="/new-contact">
					<button className="btn btn-dark mx-1" type="submit">Add New Contact</button>
				</Link>
				<div className="dropdown">
					<button className="btn btn-dark dropdown-toggle mx-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
						All Agendas
					</button>
					<ul className="dropdown-menu">
						{store.agendas && store.agendas.map((agenda) => (
							<li key={agenda.id}>
								<a
								onClick={() => dispatch({type: 'SET_AGENDA', payload: agenda.slug})}
								className="dropdown-item" 
								href="#" 
								>
									{agenda.slug}
								</a>
							</li>
						))}
					</ul>
				</div>
				</div>
			</div>
		</nav>	
);
};