import React, { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Context";
import VaccinationCardItem from "./VaccinationCardItem";


const VaccinationCard = () =>{
    const context = useContext(Context)
    const [toggleSort, setToggleSort] = useState<number>(1)

    const {loading} = context
    const ascendingNameSort = Object.assign([],context.patients)
    const descendingNameSort = Object.assign([],context.patients)

    useEffect(()=>{

    },[toggleSort])

    let display
    useEffect(() =>{
        console.log(loading)
    },[loading])
    ascendingNameSort.sort((a,b) =>{
        if(a['name'] > b['name']) return 1
        else if(a['name'] < b['name']) return -1
        else return 0
    })
    descendingNameSort.sort((a,b) =>{
        if(a['name'] < b['name']) return 1
        else if(a['name'] > b['name']) return -1
        else return 0
    })

    if(toggleSort === 1)
        display = ascendingNameSort.map(patient => <VaccinationCardItem key={patient['id']} patient={patient} />)
    else 
        display = descendingNameSort.map(patient => <VaccinationCardItem key={patient['id']} patient={patient} />)

    
    const handleNameSortToggle = () =>{
        if(toggleSort === 1)
            setToggleSort(2)
        else   
            setToggleSort(1)
    }
    return(
        <div className="container mt-5">
            <table className="table table-striped table-dark">
                <thead>
                    <tr>
                        <th scope="col" onClick={handleNameSortToggle}>Name</th>
                        <th scope="col">Age</th>
                        <th scope="col">Vaccination</th>
                        <th scope="col">Due date</th>
                        <th scope="col">Given On</th>
                        <th scope="col">Brand</th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
        </div>
    )
}

export default VaccinationCard