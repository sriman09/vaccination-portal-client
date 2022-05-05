import React from "react";
import photo from '../img/1.jpg'
const Home = () =>{
    return(
        <div className="container">
            <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div className="col-10 col-sm-8 col-lg-6">
                    <img src={photo} className="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="400" loading="lazy" />
                </div>
                <div className="col-lg-6">
                    <h1 className="display-5 fw-bold lh-1 mb-3">Better Protection to Give Strong Fight Against COVID-19</h1>
                    <p className="lead">Precaution dose is now available for 18+ years for fully vaccinated citizens. Citizens aged above 18+ years/HCW/FLW who are fully vaccinated can book an appointment at all private vaccination centers for precaution dose from 10th April 2022.</p>
                </div>
            </div>
        </div>      
    )
}
export default Home