/* eslint-disable */
//import React from 'react';
import React, { useState } from 'react';
import { useGetTrainingRecommendationQuery } from '../../service';
import { useCreateTrainingRecommendationMutation } from '../../service';
import { TrainingRecommendation } from "../../components";
import { useNavigate } from "react-router-dom";
import { TRAINING_VIEW } from '../../constants/routes/Routing'



const TrainingRecommendationPage = () => {

  const navigate = useNavigate()

  const { refetch } = useGetTrainingRecommendationQuery('')
  const [createTraining, { isLoading, data, error, isError }] = useCreateTrainingRecommendationMutation()
 //For success alert dialog 
 const [open, setOpen] = useState(false);
 const [successAlertTriger, setSuccessAlertTriger] = useState(false);
 const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
 const handleClickClose = () => {
   setOpen(false);
   navigate(`${TRAINING_VIEW}`)
   //add toast
 };
 const handleCloseSnackbar = () => {
  setSuccessAlertTriger(false)
  setSuccessAlertTrigerMSG("")
  navigate(`${TRAINING_VIEW}`)
}
console.log(isLoading,"isLoadingisLoading")
  const createTrainingHandler = (title: string, definition: string) => {
    console.log('Clicked')
    createTraining(
      {
        title,
        definition
      }
    )
    .then((res: any) => {
      res.error ? <> </> :
           // setOpen(true)
            setSuccessAlertTriger(true)
      // res.error ? <> </> : navigate(`${TRAINING_VIEW}`)
  })

    // .then(() => refetch())

    // if (data && isError === false) {
    //   navigate(`${TRAINING_VIEW}`)

    // }


  }
  return (<div>

    <TrainingRecommendation

      onSubmit={createTrainingHandler}
      dataError={isError}
      from={"Add"}
      open={open}
      savingData={isLoading}
      handleClickClose={handleClickClose}
      successAlertTriger={successAlertTriger}
      successAlertTrigerMSG={successAlertTrigerMSG}
      handleCloseSnackbar={handleCloseSnackbar}
    />

  </div>)
};

export default TrainingRecommendationPage;
