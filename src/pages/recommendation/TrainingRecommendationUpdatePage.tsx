import React, { useState } from 'react';
import {useNavigate, useParams} from "react-router-dom";
import { useGetTrainingRecommendationQuery } from '../../service';
import { useGetSingleTrainingRecommendationQuery } from '../../service';
import { useUpdateTrainingRecommendationMutation } from '../../service';
import {TrainingRecommendation} from "../../components";
import { TRAINING_VIEW } from '../../constants/routes/Routing';



const TrainingRecommendationUpdatePage = () => {
    const navigate = useNavigate()

    
    const {id} = useParams()
    console.log(id)

    

    const {data,refetch, isLoading} = useGetSingleTrainingRecommendationQuery(id)
    console.log(data, 'Training data')

    const [updateTraining, { isLoading: trainingLoading, data: trainingData, error ,isError}] = useUpdateTrainingRecommendationMutation()

    const [open, setOpen] = useState(false);
    const [successAlertTriger, setSuccessAlertTriger] = useState(false);
    const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
    const handleClickClose = () => {
        setOpen(false);
        navigate(`${TRAINING_VIEW}`)
    };
    const handleCloseSnackbar = () => {
        setSuccessAlertTriger(false)
        setSuccessAlertTrigerMSG("")
        navigate(`${TRAINING_VIEW}`)
      }
      console.log(isLoading,"isLoadingisLoading")
    const editHandler = (title:string,definition:string) => {

        updateTraining(
            {
                title,
                definition,
                id
            }
        )
        .then((res: any) => {
            res.error ? <> </> : 
           // setOpen(true)
           setSuccessAlertTriger(true)
            //navigate(`${TRAINING_VIEW}`)
        })
       
        // if (trainingData && isError === false) {
        //     navigate(`${TRAINING_VIEW}`)
      
        //   }
      

    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            
            <TrainingRecommendation
                defaultValue={data}
                onSubmit={editHandler}
                dataError1={isError}
                from={"Edit"}
                open={open}
                handleClickClose={handleClickClose}
                savingData={isLoading}
                successAlertTriger={successAlertTriger}
                successAlertTrigerMSG={successAlertTrigerMSG}
                handleCloseSnackbar={handleCloseSnackbar}
                />
        </div>

    );
};

export default TrainingRecommendationUpdatePage;


