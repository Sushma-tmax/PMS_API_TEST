import React, { useState } from 'react';
import { FeedBackQuestionnaire } from '../../components'
import { useGetSingleFeedBackQuery,useUpdateFeedBackMutation } from '../../service'
import { useNavigate, useParams } from 'react-router-dom'
import { FEEDBACK_QUESTIONNAIRE_VIEW_lIST } from '../../constants/routes/Routing'


export const FeedBackQuestionnaireUpdatePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const {data} = useGetSingleFeedBackQuery(id)
  const [updateFeedback, {isError,isLoading}] = useUpdateFeedBackMutation()
   //For success alert dialog 
   const [open, setOpen] = useState(false);
   const handleClickClose = () => {
       setOpen(false);
       navigate(`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`)
   };
  const updateFeedbackHandler = (name: string) => {

    updateFeedback({
      name,
      id
    })
    .then((res: any) => {
      res.error ? <> </> : 
      setOpen(true)
      //navigate(`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`)
  })
    // if (name && isError === false) {
    //   navigate(`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`)
    // }
   
  }


  return (
    <div>
    <FeedBackQuestionnaire 
    defaultValue = {data} 
    onSubmit={updateFeedbackHandler} 
    feedbackError2={isError}
    open={open}
    from={"Edit"}
    handleClickClose={handleClickClose}
    savingData={isLoading}
    /></div>
  )
}
