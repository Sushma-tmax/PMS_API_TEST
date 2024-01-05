import React from 'react'
import { useAppContext } from "../context/AppContext";
import { useGetEmployeeAppraisalQuery, useGetEmployeeByFilterQuery } from "../service";
import { useGetEmployeeDetailsQuery } from '../service/employee/appraisal/appraisal';



const useLoggedInUser = () => {
    const { user } = useAppContext()
    //const {data} = useGetEmployeeByFilterQuery(`?email=${user?.email}&populate=calendar`)
    const { data } = useGetEmployeeDetailsQuery(user?.email)
    const res = data?.data[0]

    return {
        data: res
    }

}

export { useLoggedInUser }

