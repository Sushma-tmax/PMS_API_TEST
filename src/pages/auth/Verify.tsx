import React, {useEffect, useState} from 'react'
import {useLocation, Link} from "react-router-dom";
import axios from 'axios';
import { LOGIN } from '../../constants/routes/Routing';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Verify = () => {


    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const query = useQuery();

    const verifyToken = async () => {
        setLoading(true);
        try {
            const {data} = await axios.post('/api/v1/auth/verify-email', {
                verificationToken: query.get('token'),
                email: query.get('email'),
            });
        } catch (error) {
            // console.log(error.response);
            setError(true);
        }
        setLoading(false);
    };


    useEffect(() => {
        verifyToken();

    }, [])


    return (
        <>
            <h2>Account Confirmed</h2>
            <Link to={`${LOGIN}`} className='btn'>
                Please login
            </Link>

        </>
    )


}

export default Verify