import React, { useEffect, useState } from 'react'

const useExchangeData = () => {
    const [loading, setLoading] = useState(false);
    const [exchanges, setExchanges]= useState([])
    const [error, setError] = useState(false);
 
    useEffect(() => {
    //create the api call function
     const fetchExchanges = async () =>{
        
        const url = 'https://api.coingecko.com/api/v3/exchanges';
        try{
             setLoading(true);
             const response = await fetch(url);

             if(!response.ok){
                throw new Error("Oops, something went wrong")
             }

             const data = await response.json();
             setExchanges(data);
             setLoading(false);
        }
        catch(err){
           setError(err.message)
           setLoading(false)
        }

     }
       
    //  call the function
    fetchExchanges();
    }, [])
    
    return {loading, exchanges, error}
}

export default useExchangeData