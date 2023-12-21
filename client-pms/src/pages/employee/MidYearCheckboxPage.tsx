import React from 'react'
import MidyearCheckbox from '../../components/midyearperformanceappraisal/MidyearCheckbox'
import { useAcceptAppraisalEmployeeMutation, useGetEmployeeAppraisalQuery, useUpdateEmployeeAppraisalMutation } from '../../service'
import { useParams, useNavigate } from "react-router-dom";
import { MIDYEAR_PA_REPORT } from '../../constants/routes/Routing';

const MidYearCheckboxPage = () => {
    const { employee_id } = useParams()
    const { data, isLoading } =  useGetEmployeeAppraisalQuery(employee_id)
    const [updateId] = useUpdateEmployeeAppraisalMutation()
    const navigate = useNavigate()
  
    const updateIdHandler = (id:string) => {
        updateId({
            employee: {
                objective_description: id
            },

            id:employee_id
        })
    }

    
if(isLoading) {
    return <p>Loading...</p>
}
    return (
  
   <>    
   <MidyearCheckbox employeeData = {data}
   onSubmit = {updateIdHandler}/>
   </>
  )
}

export default MidYearCheckboxPage
