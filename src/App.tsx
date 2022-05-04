import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import AddPatient from './Components/AddPatient';
import AddVaccination from './Components/AddVaccination';
import Navbar from './Components/layouts/Navbar';
import VaccinationCard from './Components/VaccinationCard';
import Home from './Components/Home';
function App() {
  return (
    <Fragment>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addPatient" element= {<AddPatient />} />
        <Route path="/administerVaccinations" element={<><AddVaccination /> <VaccinationCard /></>} />
      </Routes> 
    </Fragment>
  );
}

export default App;
