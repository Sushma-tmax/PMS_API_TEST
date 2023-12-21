import React from 'react'
import {useAppContext} from "../context/AppContext";
import {useGetEmployeeAppraisalQuery, useGetEmployeeByFilterQuery} from "../service";



const useLoggedInUser = () => {
    const {user} = useAppContext()
    const {data} = useGetEmployeeByFilterQuery(`?email=${user?.email}&populate=calendar`)

    const res = data?.data[0]

    return {
         data:res
    }

}

export  {useLoggedInUser}

