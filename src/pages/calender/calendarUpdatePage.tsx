import React, { useState } from 'react';
import Calendar from '../../components/PaMaster/calender/Calender'
import {useGetSingleCalenderQuery, useUpdateCalendarMutation } from '../../service'
import { useParams,useNavigate } from 'react-router-dom'
import {CALENDER_VIEWPAGE} from '../../constants/routes/Routing'
import NewCalendar from '../../components/PaMaster/calender/newCalendar'
import CalendarView from '../../components/PaMaster/calender/calendarView';

const CalendarUpdatePage = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {data} = useGetSingleCalenderQuery(id)
 const [updateCalendar,{isError,isLoading}] = useUpdateCalendarMutation()
//save sussess
 const [open, setOpen] = useState(false);
 const handleClickClose = () => {
     setOpen(false);
     navigate(`${CALENDER_VIEWPAGE}`)
 };

 const updateCalendarHandler = 
 (name: any, start_date: any, end_date: any,
    start_date_appraiser: any, end_date_appraiser: any,
    start_date_reviewer: any, end_date_reviewer: any,
    start_date_normalizer: any, end_date_normalizer: any,
    // start_date_F2FMeeting: any, end_date_F2FMeeting: any,
    start_date_employee_acknowledgement: any, end_date_employee_acknowledgement: any,
    // start_date_mediation:any,end_date_mediation:any,
    start_date_re_normalization:any,end_date_re_normalization:any,
    start_date_closing:any,end_date_closing:any)=> {
     updateCalendar ({
         name: name[0].name,
         pa_launch:name[0].pa_launch,
         calendar_type:name[0].calendar_type,
         start_date: name[0].start_date,
         end_date: name[0].end_date,
         start_date_appraiser:name[0]. start_date_appraiser,
         end_date_appraiser:name[0].end_date_appraiser,
         start_date_reviewer: name[0].start_date_reviewer,
         end_date_reviewer:name[0].end_date_reviewer,
         start_date_normalizer:name[0]. start_date_normalizer,
         end_date_normalizer:name[0]. end_date_normalizer,
        //  start_date_F2FMeeting:name[0].start_date_F2FMeeting,
        //  end_date_F2FMeeting:name[0].end_date_F2FMeeting,
         start_date_employee_acknowledgement:name[0].start_date_employee_acknowledgement,
         end_date_employee_acknowledgement:name[0].end_date_employee_acknowledgement,
        //  start_date_mediation:name[0].start_date_mediation,
        //  end_date_mediation:name[0].end_date_mediation,
         start_date_re_normalization:name[0]. start_date_re_normalization,
         end_date_re_normalization:name[0]. end_date_re_normalization,
         start_date_closing:name[0]. start_date_closing,
         end_date_closing:name[0]. end_date_closing,
         id
     }
        )
        .then((res: any) => {
            res.error ? <> </> : 
            setOpen(true)
            //navigate(`${CALENDER_VIEWPAGE}`)
         })
        // navigate(`${CALENDER_VIEWPAGE}`)
 }

  return (
    <>
  <NewCalendar  
   defaultValue = {data} 
   onSubmit = {updateCalendarHandler}
   error2={isError}
   openSuccess={open}
   from={"Edit"}
   handleClickCloseSuccess={handleClickClose}
   savingData={isLoading}
  />

  {/* <CalendarView
  dataValue = {data} 
  onSubmit = {updateCalendarHandler}
  error2={isError}
   openSuccess={open}
   from={"view"}
   handleClickCloseSuccess={handleClickClose}
  /> */}
  </>
  )
}

export default CalendarUpdatePage
