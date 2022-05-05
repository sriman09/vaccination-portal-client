import React, { Fragment, useContext, useState } from 'react'
import { IPaitent } from '../Model/patient.model'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { Context } from '../Context/Context'

const initialInput ={
    name: "",
    dateOfBirth: "",
    gender: "",
    placeOfBirth: "",
    bloodGroup: "",
    height: 0,
    weight: 0
}

const AddPatient = () =>{
    const [input, setInput] = useState<IPaitent>(initialInput)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const context = useContext(Context)
    const {handleRefreshChange} = context
    const {name, dateOfBirth, gender, placeOfBirth, bloodGroup, height, weight} = input

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>{
        console.log((e.target as HTMLInputElement).name)
        setInput({...input, [(e.target as HTMLInputElement).name] : (e.target as HTMLInputElement).value})
    }
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) =>{
        e.preventDefault()
        if(input.name === '' || input.dateOfBirth === ''){
            if(input.name === '') alert('Please enter the name')
            else alert('please enter the Date of Birth')
        }
        else if(context.patients.find(p => p.name === input.name)){
            alert('Patient already exist')
        }
        else{
            setLoading(true)
            await axios.post("https://vaccination-portal-backend.herokuapp.com/patients", {...input, dateOfBirth: new Date(dateOfBirth)})
            setLoading(false)
            setInput(initialInput)
            handleRefreshChange()
            handleModalShow()           
        }
    }
    const handleModalClose = () =>{
        setShowModal(false)
    }
    const handleModalShow = () =>{
        setShowModal(true)
    }
    return(
        <Fragment>
            <div className='offset-4 col-4 mt-5 bg-color'>
                <div className='card'>
                    <div className='card-header'>
                        <h3 className='text-center'>Add Patient</h3>
                    </div>
                    <div className='card-body'>
                        <form className="row g-3" onSubmit={handleSubmit}>
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" name="name" value={name} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="dateOfBirth" className="form-label">Date of Birth</label>
                                <input type="date" className="form-control" name="dateOfBirth" value={dateOfBirth} onChange={handleChange} max="2015-12-31" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select name="gender" className="form-select" value={gender} onChange= {handleChange}>
                                    <option selected>Choose...</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="placeOfBirth" className="form-label">Place of Birth</label>
                                <input type="text" className="form-control" name="placeOfBirth" value={placeOfBirth} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="bloodGroup" className="form-label">Blood Group</label>
                                <select name="bloodGroup" className="form-select" value={bloodGroup} onChange={handleChange}>
                                    <option selected>Choose...</option>
                                    <option>O+</option>
                                    <option>O-</option>
                                    <option>A+</option>
                                    <option>A-</option>
                                    <option>B+</option>
                                    <option>B-</option>
                                    <option>AB+</option>
                                    <option>AB-</option>
                                </select>
                            </div>
                            <div className="col-6">
                                <label htmlFor="height" className="form-label">Height</label>
                                <input type="number" step={0.1} className="form-control" name="height" value={height} onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="weight" className="form-label">Weight</label>
                                <input type="number" step={0.1} className="form-control" name="weight" value={weight} onChange={handleChange} />
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
                    Patient Created Successfully
                </Modal.Body>
                <Modal.Footer>
                    <Link className='btn btn-primary' to={"/"}>Ok</Link>
                </Modal.Footer>
            </Modal>

        </Fragment>
    )
}
export default AddPatient