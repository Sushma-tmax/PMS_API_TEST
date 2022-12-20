import React, { useState } from 'react';
import CalenderViewList from "../../components/calender/CalenderViewList"
import { useDeleteCalenderMutation, useGetCalenderQuery } from "../../service"
import { useNavigate } from "react-router-dom"
import { CALENDER } from "../../constants/routes/Routing"

const CalendarViewPage = () => {
  
  const {data} = useGetCalenderQuery('')

  const [deleteCalendar, {isError, error}] = useDeleteCalenderMutation()
  console.log(isError, error,'error')
  //delete Success
  const [open, setOpen] = useState(false);
  const handleClickClose = () => {
      setOpen(false);
  };
  const deleteCalendarHandler = (id:string) => {
    deleteCalendar (
      id
    ).then((res: any) => {
      res.error ? <> </> : 
      setOpen(true)
     
  })
  }
  let navigate = useNavigate();
  const updateCalendarHandler = (id:string) => {
    navigate(`${CALENDER}/${id}`);
  }
  
  console.log(data)
  return (
   <>
   <CalenderViewList 
   calendarData={data}
   onDelete = {deleteCalendarHandler}
   onUpdate = {updateCalendarHandler}
   deleteCalendarAlert= {error}
   error = {isError}
   openDeletedSuccess={open}
   handleClickCloseDeletedSuccess={handleClickClose}
   />
   </>
    )
}
export default CalendarViewPage