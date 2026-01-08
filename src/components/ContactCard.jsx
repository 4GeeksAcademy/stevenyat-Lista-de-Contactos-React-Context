import React, { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";


const contactCard = () => {

	const { store, dispatch } = useGlobalReducer();
	const urlApi = `https://playground.4geeks.com/contact/agendas/${store.agendaForName}/contacts/`;

	const deleteContact = async (contact) => {
		await fetch(urlApi + contact.id, {
			method: "DELETE"
		});
		
		const response = await fetch(urlApi);
		const data = await response.json();
		dispatch({ type: 'load_contacts', payload: data.contacts });
	};

    return (<>
			{store.contacts && store.contacts.map((contact) => (
				<div className="d-flex justify-content-center px-2" key={contact.id}>
					<div id="card" className="d-flex flex-column flex-md-row border border-secondary rounded justify-content-between w-75 w-lg-75 px-2 px-md-3 mb-2">
						<div className="d-flex flex-column flex-sm-row p-2 align-items-center align-items-sm-start flex-grow-1">
							<img
								src={store.imgPerson}
								alt="Profile"
								className="rounded-circle p-2 me-0 me-sm-3 mb-3 mb-sm-0"
								style={{ width: "150px", maxWidth: "100%", height: "auto" }}
							/>
							<div className="d-flex text-center text-sm-start flex-column p-2 text-muted w-100">
								<h4 className="text-black pb-2 fs-5 fs-md-4">
									<Link
										className="text-decoration-none text-black"
										to={`/vista-contact/${contact.id}`}>
										{contact.name}
									</Link>
								</h4>
								<h6 className="mb-2 small">
									<i className="fa-solid fa-location-dot me-2"></i>
									<span className="d-inline-block text-break">
										{contact.address}
									</span>
								</h6>
								<h6 className="mb-2 small">
									<i className="fa-solid fa-phone-flip me-2"></i>
									<span className="d-inline-block text-break">
										{contact.phone}
									</span>
								</h6>
								<h6 className="mb-2 small">
									<i className="fa-solid fa-envelope me-2"></i>
									<span className="d-inline-block text-break">
										{contact.email}
									</span>
								</h6>
							</div>
						</div>
						<div className="mt-2 mt-md-4 me-0 me-md-3 d-flex justify-content-center justify-content-md-start align-items-start pb-2 pb-md-0">
							<Link to={"/edit-contact/"+ contact.id}>
								<button
									type="button"
									className="btn btn-light mx-2"
								>
									<i className="fa-solid fa-pen"></i>
								</button>
							</Link>
								<button
									type="button"
									className="btn btn-light mx-2"
									data-bs-toggle="modal" 
									data-bs-target={`#deleteModal-${contact.id}`}
									>
									<i className="fa-solid fa-trash-can"></i>
								</button>
								<div className="modal fade" id={`deleteModal-${contact.id}`} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby={`deleteModalLabel-${contact.id}`} aria-hidden="true">
									<div className="modal-dialog">
										<div className="modal-content">
											<div className="modal-header">
												<h1 className="modal-title fs-5" id={`deleteModalLabel-${contact.id}`}>Delete Contact</h1>
												<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
											</div>
											<div className="modal-body">
												Are you sure you want to delete {contact.name} contact?
											</div>
											<div className="modal-footer">
												<button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
												<button 
													onClick={() => deleteContact(contact)}
													type="button" 
													className="btn btn-danger"
													data-bs-dismiss="modal"
												>Delete
												</button>
											</div>
										</div>
									</div>
								</div>
						</div>
					</div>
				</div>
			)
			)}
    </>
    );
}
export default contactCard;