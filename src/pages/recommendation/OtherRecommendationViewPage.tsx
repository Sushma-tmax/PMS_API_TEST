/* eslint-disable */
import React, { useState } from 'react';
import { useGetOtherRecommendationQuery } from '../../service';
import { useDeleteOtherRecommendationMutation } from '../../service';
import { useNavigate } from "react-router-dom";
import OtherRecommendationViewList from "../../components/PaMaster/recommendation/OtherRecommendationList";
import { OTHER_RECOMMENDATION_PAGE } from '../../constants/routes/Routing';

const OtherRecommendationViewPage = () => {

    const { data , refetch } = useGetOtherRecommendationQuery('')

    const [deleteOtherRecommendation, {error,isError}] = useDeleteOtherRecommendationMutation()
    //delete Success
    const [open, setOpen] = useState(false);
    const handleClickClose = () => {
        setOpen(false);
    };
    
    const deleteOtherRecommendationHandler = (id: string) => {
        console.log('clicked')
        deleteOtherRecommendation(
            id
        ).then((res: any) => {
            res.error ? <> </> : 
            setOpen(true)
           
        })
        // .then(() => refetch())
    }

    let navigate = useNavigate();
    
    const editOtherRecommendationHandler = (id: string) => {
        console.log('clicked')
       
        navigate(`${OTHER_RECOMMENDATION_PAGE}/${id}`);

    }

    return (<div>

        <OtherRecommendationViewList otherData={data} 
        onDelete= {deleteOtherRecommendationHandler} 
        onEdit = {editOtherRecommendationHandler}
        deleteOtherAlert = {error}
        error = {isError}
        openDeletedSuccess={open}
        handleClickCloseDeletedSuccess={handleClickClose}
        />
    </div>);
};

export default OtherRecommendationViewPage;
