/* eslint-disable */
import React, { useState } from 'react';
import { useGetTrainingRecommendationQuery } from '../../service';
import {useDeleteTrainingRecommendationMutation } from '../../service'
import {useNavigate, useParams} from "react-router-dom";
import TrainingRecommendationViewList from "../../components/PaMaster/recommendation/TrainingRecommendationList";
import { TRAINING_RECOMMENDATION_PAGE } from '../../constants/routes/Routing';

const TrainingView = () => {
    const { data , refetch } = useGetTrainingRecommendationQuery('')

    const [ deleteTraining , {isError, error} ] = useDeleteTrainingRecommendationMutation() 
   //delete Success
    const [open, setOpen] = useState(false);
    const handleClickClose = () => {
        setOpen(false);
    };
    const deleteTrainingRecommendationHandler = (id: string) => {
      console.log('clicked')
      deleteTraining(
          id
      ).then((res: any) => {
        res.error ? <> </> : 
        setOpen(true)
       
    })
      // .then(() => refetch())
  }

  let navigate = useNavigate();

  
  const updateTrainingRecommendationHandler = (id: string) => {
    console.log('clicked')
   
  
    navigate(`${TRAINING_RECOMMENDATION_PAGE}/${id}`);

}




  console.log(typeof data, 'type')
  return <div>
    <TrainingRecommendationViewList
     trainingData={data} 
     onDelete = {deleteTrainingRecommendationHandler} 
     onUpdate = {updateTrainingRecommendationHandler}
     error = {isError}
     displayError = {error}
     openDeletedSuccess={open}
     handleClickCloseDeletedSuccess={handleClickClose}
    />
  </div>;
};

export default TrainingView;
