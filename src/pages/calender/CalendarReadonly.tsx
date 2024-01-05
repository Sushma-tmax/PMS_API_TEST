import React,{useState} from 'react'
import Calendar from '../../components/PaMaster/calender/Calender'
import {useCreateCalenderMutation, useGetSingleCalenderQuery, useUpdateCalendarMutation } from '../../service'
import { useParams,useNavigate } from 'react-router-dom'
import {CALENDER_VIEWPAGE} from '../../constants/routes/Routing'
import NewCalendar from '../../components/PaMaster/calender/newCalendar'
import CalendarView from '../../components/PaMaster/calender/calendarView'

const CalendarReanOnly = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    const {data} = useGetSingleCalenderQuery(id)
  const [createCalender,{isError}] = useCreateCalenderMutation()
 //save sussess
 const [open, setOpen] = useState(false);
 const handleClickClose = () => {
     setOpen(false);
     navigate(`${CALENDER_VIEWPAGE}`);
 };

  const createCalenderHandler =
    (name: any, start_date: any, end_date: any,
      start_date_appraiser: any, end_date_appraiser: any,
      start_date_reviewer: any, end_date_reviewer: any,
      start_date_normalizer: any, end_date_normalizer: any,
      // start_date_F2FMeeting: any, end_date_F2FMeeting: any,
      start_date_employee_acknowledgement: any, end_date_employee_acknowledgement: any,
      // start_date_mediation:any,end_date_mediation:any,
      start_date_re_normalization:any,end_date_re_normalization:any,
      start_date_closing:any,end_date_closing:any) => {
        console.log(name[0].start_date, 'nmaeeeeeeeeeeeeeeeeeeeee')
      createCalender(name)
      .then((res: any) => {
        res.error ? <> </> : 
        setOpen(true)
        //navigate(`${CALENDER_VIEWPAGE}`)
    })
      // if (name && isError === false ) {
      //   console.log(isError)
      //   //  navigate(`${CALENDER_VIEWPAGE}`)
      // }
     
    }

     return (
         <div>
            <CalendarView 
      defaultValue = {data} 
      onSubmit={createCalenderHandler} 
      error1 = {isError}
      openSuccess={open}
      from={"Add"}
      handleClickCloseSuccess={handleClickClose}
            />
         </div>

          )}

          export default CalendarReanOnly