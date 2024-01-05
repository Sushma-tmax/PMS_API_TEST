import React, { useState } from 'react';
import FeedBackQuestionnaireViewList from '../../components/PaMaster/feedBackQuestionnarie/FeedBackQuestionnaireViewList'
import { useDeleteFeedBackMutation, useGetFeedBackQuery } from '../../service'
import { useNavigate } from 'react-router-dom'
import { FEEDBACK_QUESTIONNAIRE } from '../../constants/routes/Routing'

const FeedBackQuestionnaireViewPage = () => {
  const {data} = useGetFeedBackQuery('')

  const [deleteFeedBack,{error,isError}] = useDeleteFeedBackMutation()
//delete Success
const [open, setOpen] = useState(false);
const handleClickClose = () => {
    setOpen(false);
};
  const deleteFeedBackHandler = (id : string) => {
    deleteFeedBack (
      id
    ).then((res: any) => {
      res.error ? <> </> : 
      setOpen(true)
     
  })
  }
  let navigate = useNavigate();
  const updateFeedBackHandler = (id:string) => {
    navigate(`${FEEDBACK_QUESTIONNAIRE}/${id}`);
  }
  return (
    <>
    <FeedBackQuestionnaireViewList 
    FeedbackData ={data} 
    onDelete = {deleteFeedBackHandler}
    onUpdate = {updateFeedBackHandler}
    error = {isError} 
    displayError = {error}
    openDeletedSuccess={open}
    handleClickCloseDeletedSuccess={handleClickClose}
    />
    </>
  )
}

export default FeedBackQuestionnaireViewPage
