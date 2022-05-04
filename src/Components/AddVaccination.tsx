import axios from "axios"
import React , {Fragment, useContext, useEffect, useRef, useState} from "react"
import { Link } from "react-router-dom"
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
    const [patient, setPatient] = useState<any>({})
    const dateOfBirth = useRef("")
    const vaccinationOption = ""

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
            await axios.post(`http://localhost:8080/patients/${patient.id}/vaccine`,vaccineInput)
            setName("")
            setPatient({})
            setVaccineInput(initialVaccineInput)
            handleRefreshChange()
        }  
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) =>{
        console.log(patient)
        setDob()
        setVaccineInput({...vaccineInput, [(e.target as HTMLInputElement).name] : (e.target as HTMLInputElement).value})
    }

    const handleNameChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> =async (e) =>{
        setName((e.target as HTMLInputElement).value)
    }

    const setDob = () =>{
        dateOfBirth.current = patient.dateOfBirth.substring(0,10)
        console.log(dateOfBirth.current)
    }

    useEffect(() =>{
        console.log(patient)
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
                                <input type="date" className="form-control" value={dateOfBirth.current}  disabled  />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="vaccination" className="form-label">Vaccination</label>
                                <select name="vaccination" className="form-select" value={vaccination} onChange= {handleChange}>
                                    <option selected>Choose...</option>
                                    <option>1st</option>
                                    <option>2nd</option>
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
                                <input type="submit" value="Submit" className='btn btn-primary btn-block' />
                            </div>
                            <div className="col-md-6">
                                <Link className='btn btn-danger' to={'/'} >Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default AddVaccination