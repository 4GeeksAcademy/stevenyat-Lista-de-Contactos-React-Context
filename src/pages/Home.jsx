import { useState, useEffect} from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const imgPerson = "https://wallpapers.com/images/hd/placeholder-profile-icon-8qmjk1094ijhbem9.jpg";
	const [agenda, setAgenda] = useState ([])

	const urlApi = import.meta.env.VITE_API_URL+"/contacts";
  
	const fetchAgenda = async () => {
		const response = await fetch(urlApi);
		const data = await response.json();
		setAgenda(data.contacts);
	};
	useEffect(() => {
		fetchAgenda();
	}, []);

	return (
		<div className="text-center m-5">
			{agenda.map((contact) => (
				<div id="card" key={contact.id}>
					<div className="d-flex border border-secondary rounded justify-content-between px-3">
						<div className="d-flex p-2 m-2 align-items-center">
							<img 
								src={imgPerson} 
								alt="Profile" 
								className="rounded-circle p-2 me-3 " 
								style={{width: "200px"}}
							/>
							<div className="d-flex text-start flex-column p-2 m-2 text-muted">
								<h4 className="text-black pb-2">{contact.name}</h4>
								<h6><i className="fa-solid fa-location-dot me-2"></i>{contact.address}</h6>
								<h6><i className="fa-solid fa-phone-flip me-2"></i>{contact.phone}</h6>
								<h6><i className="fa-solid fa-envelope me-2"></i>{contact.email}</h6>
							</div>
						</div>
						<div className="d-flex mt-4">
							<i className="fa-solid fa-pen me-5"></i>
							<i className="fa-solid fa-trash-can me-5"></i>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}; 