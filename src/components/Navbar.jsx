import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
			<div className="container">
				<Link className="text-black text-decoration-none" to="/">
					<span className="navbar-brand mb-0 h1">Contact List</span>
				</Link>
				<Link to="/new-contact">
					<button className="btn btn-dark" type="submit">Add New Contact</button>
				</Link>
			</div>
		</nav>	
);
};