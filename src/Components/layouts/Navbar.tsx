import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Navbar =() => {
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand offset-1" to={'/'}>Vaccination Schedule System</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item active">
                            <Link className="nav-link" to={'/addPatient'}>Add Patient</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={'/administerVaccinations'}>Administer Vaccine of Patient</Link>
                        </li>                  
                    </ul>
                </div>
            </nav>
        </div>
    )
}
export default Navbar