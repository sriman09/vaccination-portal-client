import axios from "axios"
import React , {Fragment, useContext, useEffect, useState} from "react"
import { Link } from "react-router-dom"
import { Button, Modal } from 'react-bootstrap'
import { Context } from "../Context/Context"

const initialVaccineInput = {
    vaccination: "",
    dateAdministrated: "",
    vaccineBrand: "",
    givenAt: ""
}
const AddVaccination = () =>{
    const [vaccineInput, setVaccineInput] = useState(initialVaccineInput)
    const [name , setName] = useState<string>("")
    const [patient, setPatient] = useState<any>()
    const [loading, setLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)


    const context = useContext(Context)
    const {patients, handleRefreshChange} = context

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault()
        if(name === '') alert('Select Name')
        
        if(patient.vaccinations.length === 1 && vaccineInput.vaccination === '1st') alert('1st dose already taken')
        else if(vaccineInput.vaccination === '') alert('Enter Vaccination Dose')
        else if(patient.vaccinations.length === 0 && vaccineInput.vaccination === '2nd') alert('1st dose is not complete')
        else if(patient.vaccinations.length === 2) alert('Already Vaccinated')
        else{
            setLoading(true)
            await axios.post(`https://vaccination-portal-backend.herokuapp.com/patients/${patient.id}/vaccine`,vaccineInput)
            setName("")
            setLoading(false)
            setVaccineInput(initialVaccineInput)
            handleRefreshChange()
            handleModalShow()
        }  
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>{
        setVaccineInput({...vaccineInput, [(e.target as HTMLInputElement).name] : (e.target as HTMLInputElement).value})
    }

    const handleNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =async (e) =>{
        setName((e.target as HTMLInputElement).value)
    }

    const handleModalClose = () =>{
        setShowModal(false)
    }
    const handleModalShow = () =>{
        setShowModal(true)
    }

    useEffect(() =>{
        setPatient(patients.find(p => p.name === name))
    },[name])
    
    const {vaccination, dateAdministrated, vaccineBrand, givenAt} = vaccineInput

    return(
        <Fragment>
            <div className='offset-4 col-4 mt-5'>
                <div className='card'>
                    <div className='card-header'>
                        <h3 className='text-center'>Add Vaccination</h3>
                    </div>
                    <div className='card-body'>
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">Name</label>
                                <select name="name" className="form-select" value={name} onChange= {handleNameChange} required>
                                    <option>Select</option>
                                    {patients.map(p => <option>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                                <input type="date" className="form-control" value={patient === undefined? "" : patient.dateOfBirth.substring(0,10)}  disabled  />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="vaccination" className="form-label">Vaccination</label>
                                <select name="vaccination" className="form-select" value={vaccination} onChange= {handleChange}>
                                    <option selected>Choose...</option>
                                    {
                                        patient === undefined ? '' : patient.vaccinations.length === 0 ? <option>1st</option> : patient.vaccinations.length === 1 ? <option>2nd</option> : ''
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dateAdministrated" className="form-label">Date Administrated</label>
                                <input type="date" className="form-control" name="dateAdministrated" value={dateAdministrated} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="vaccineBrand" className="form-label">Brand Name</label>
                                <input type="text" className="form-control" name="vaccineBrand" value={vaccineBrand} onChange={handleChange} required />
                            </div>
                            <div className="col-12">
                                <label htmlFor="givenAt" className="form-label">Given At</label>
                                <input type="text" className="form-control" name="givenAt" value={givenAt} onChange={handleChange} />
                            </div>
                            <div className="col-6">
                                {loading === false ?
                                    <input type="submit" value="Submit" className='w-100 btn btn-primary btn-block'/>
                                    :
                                    <button className="w-100 btn btn-primary" type="button" disabled>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                }
                            </div>
                            <div className="col-md-6">
                                <Link className='w-100 btn btn-danger' to={'/'} >Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            {/* Modal */}
            <Modal show={showModal} onHide={handleModalClose} backdrop='static' keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Success!!!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Vaccine Added Successfully!!!
                </Modal.Body>
                <Modal.Footer>
                    <Button className='btn btn-primary' onClick={handleModalClose}>Ok</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}
export default AddVaccination