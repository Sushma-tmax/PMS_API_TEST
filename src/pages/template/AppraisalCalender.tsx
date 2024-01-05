import React from 'react';
import CreateCalender from "../../components/Template/PACalendar";
import {
    useGetAppraisalCalenderQuery,
    useStartAppraisalCalenderMutation,
    useDeleteAppraisalCalenderMutation, useAppraisalCalenderFiltersQuery,
    useAppraisalCalendarEmployeeValidationMutation,useUpdateCalendarMutation, useGetCalenderQuery
} from "../../service";
import {useUpdateAppraisalCalenderMutation} from "../../service/appraisalCalender/AppraisalCalender";
import { CALENDAR_READONLY } from '../../constants/routes/Routing';
import { useNavigate } from "react-router-dom"



const AppraisalCalenderPage = () => {

    const {data,isLoading} = useAppraisalCalenderFiltersQuery('?select=name,status,updatedAt,calendar,template,position&limit=1000&populate=calendar')
    const [ deleteAppraisalCalender,{error} ] = useDeleteAppraisalCalenderMutation ()
    const [start ] = useStartAppraisalCalenderMutation()
    const [updateCalender ]  = useUpdateAppraisalCalenderMutation()
    const [updateCalenderValidation ]  = useAppraisalCalendarEmployeeValidationMutation()
    const [updateCalendar ]  = useUpdateCalendarMutation()
    const {data:calendarData} =useGetCalenderQuery('')
    console.log(data)

    const deleteAppraisalCalenderHandler = (id: string) => {
        console.log('clicked')
        deleteAppraisalCalender(
            id
        )
        // .then(() => refetch())
      }
      let navigate = useNavigate();
      const ViewCalendarGandler =(id:string) => {
        navigate(`${CALENDAR_READONLY}/${id}`, { state: "calendarview" })
      }
    const pauseAppraisalCalenderHandler = (id: string) => {
        console.log('clicked')
        updateCalender({
            status: 'inactive',
            id
        })
        // .then(() => refetch())
    }
    return (
        <div>

            <CreateCalender 
            data ={data} 
            calendarData = {calendarData}
            isLoading={isLoading} 
            onView ={ViewCalendarGandler}
            onDelete={deleteAppraisalCalenderHandler} 
            start={start} 
            onPause={pauseAppraisalCalenderHandler}
            updateCalenderValidation={updateCalenderValidation} 
            updateCalendar={updateCalendar}
            />

        </div>
    );
};


export default AppraisalCalenderPage;