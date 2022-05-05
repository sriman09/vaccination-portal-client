import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const Context = createContext({
    patients: [{
        id: null,
        name: null,
        dateOfBirth: null,
        gender: null,
        placeOfBirth: null,
        bloodGroup: null,
        height: null,
        weight: null,
        vaccinations:[{
            id: null,
            vaccination: null,
            dateAdministrated: null,
            brandName: null,
            givenAt: null
        }]
    }],
    loading: false, 
    handleRefreshChange: () => {}
});

const ContextProvider = (props : any) =>{
    const [patients, setPatients] = useState<any>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [refresh, setRefresh] = useState<number>(0)

    const fetchData = async () =>{
        setLoading(true)
        const res = await axios.get("https://vaccination-portal-backend.herokuapp.com/patients")
        setPatients(res.data)
        setLoading(false)
    }

    const handleRefreshChange = () =>{
        setRefresh(prev => prev+1)
    }

    useEffect(()=>{
        fetchData()
    },[refresh])



    return(
        <Context.Provider value={{patients, loading, handleRefreshChange}}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}
