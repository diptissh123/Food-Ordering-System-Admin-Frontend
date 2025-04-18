import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

function Navbar() {
    let auth = localStorage.getItem("user");
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate("/login-user"); // Redirect after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                    ADMIN FOOD ORDERING PORTAL
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {auth ? (
                            <>
                                <li className="nav-item">
                                <NavLink className="nav-link" to="/">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/my-customer">
                                        My Customer
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/add-food">
                                        Add Food
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/orders">
                                        Orders
                                    </NavLink>
                                </li>
                            </>
                        ) : null}
                    </ul>

                    <ul className="navbar-nav ms-auto">
                        {auth ? (
                             <li>
                             <Link onClick={logout} className="nav-link" to={'/login-user'}>Logout</Link>
                             </li>
                        ) : (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login-user">
                                    Login
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
