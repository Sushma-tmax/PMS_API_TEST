import React, { useState } from 'react';
import { FeedBackQuestionnaire } from '../../components'
import { useCreateFeedBackMutation } from '../../service/feedBackQuestionnaire/FeedBackQuestionnaire'
import { useParams, useNavigate } from "react-router-dom";
import { FEEDBACK_QUESTIONNAIRE_VIEW_lIST } from '../../constants/routes/Routing'


const FeedBackQuestionnairePage = () => {
  const navigate = useNavigate()
  //For success alert dialog 
 const [open, setOpen] = useState(false);
 const handleClickClose = () => {
   setOpen(false);
   navigate(`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`)
 };
  console.log('feedback')

  const [createFeedBack,{isLoading,data,error,isError}] = useCreateFeedBackMutation()
  const createFeedBackHandler =  (name:string) =>{
    createFeedBack({
      name
    })
    .then((res: any) => {
      res.error ? <> </> : 
      setOpen(true)  
      //navigate(`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`);
  })
  
  }
  
  return (
    <>
    <FeedBackQuestionnaire  
    feedbackError1={isError} 
    onSubmit={createFeedBackHandler}
    open={open}
    from={"Add"}
    handleClickClose={handleClickClose}
    savingData={isLoading}
    />
    </>
  )
}

export default FeedBackQuestionnairePage