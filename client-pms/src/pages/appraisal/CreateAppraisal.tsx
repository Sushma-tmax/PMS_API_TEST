import React from 'react'
import {
  useCreateEmployeeAppraisalMutation,
  useGetEmployeeAppraisalQuery,
  useGetRatingScaleQuery,
  useGetRatingsQuery,
  useGetCalenderQuery
} from "../../service";
import { useParams } from "react-router-dom";
import CreateAppr from '../../components/appraisal/CreateAppraisal';




const CreateAppraisal = () => {
  const {employee_id} = useParams()
  console.log(employee_id, 'employee_id')
  const { data } = useGetRatingScaleQuery('')
  const { data: employeeAppraisal, isLoading } = useGetEmployeeAppraisalQuery(employee_id)
  const [updateMutation] = useCreateEmployeeAppraisalMutation()
  const {data:calendarData, isLoading:calendarDataLoading} =  useGetCalenderQuery('')
 



  if (isLoading) return <div>Loading...</div>
  if (calendarDataLoading) return <div>Loading...</div>

  

  return (
    <div>
      <CreateAppr ratings={data} appraisal={employeeAppraisal} mutation={updateMutation} calendardata= {calendarData}  />
    </div>
  )
}

export default CreateAppraisal