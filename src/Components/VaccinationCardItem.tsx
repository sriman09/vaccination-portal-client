import React from 'react'
import { IVaccination } from '../Model/vaccination.model';

const VaccinationCardItem = (props: any) =>{
    const {name, dateOfBirth, vaccinations} = props.patient

    const calculateAge = () =>{
        var today = new Date();
        var birthDate = new Date(dateOfBirth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    }

    const calculateDueDate = (v: IVaccination) => {
        if(v.vaccination === '2nd'){
            return 'Vaccinated'
        }
        if(v.dateAdministrated === null){
            return ''
        }
        else{
            var result = new Date(v.dateAdministrated);
            result.setDate(result.getDate() + 60);
            return result.toISOString().substring(0,10)
        }
    }
    const mapVaccination = vaccinations.map((v: IVaccination) => 
    <tr>
        <td>{name}</td>
        <td>{calculateAge()}</td>
        <td>{v.vaccination}</td>
        <td>{calculateDueDate(v)} </td>
        <td>{v.dateAdministrated}</td>
        <td>{v.vaccineBrand}</td>
    </tr>
    )


    return(
        <>
            {
                vaccinations.length < 1 ?
                <tr>
                    <td>{name}</td>
                    <td>{calculateAge()}</td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                </tr>
                :
                mapVaccination
            }
        </>
    )
}
export default VaccinationCardItem
