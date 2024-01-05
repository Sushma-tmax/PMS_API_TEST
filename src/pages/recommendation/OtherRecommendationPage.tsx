/* eslint-disable */
import React, { useState } from 'react';
import { useCreateOtherRecommendationMutation } from '../../service';
import { useGetOtherRecommendationQuery } from '../../service';
import { useParams, useNavigate } from "react-router-dom";
import { OtherRecommendation } from "../../components";
import { OTHER_RECOMMENDATION_VIEW_PAGE } from '../../constants/routes/Routing';

const OtherRecommendationPage = () => {

    const { id } = useParams()
    console.log(id)
    const navigate = useNavigate()

    //For success alert dialog 
    const [open, setOpen] = useState(false);
    const handleClickClose = () => {
        setOpen(false);
        navigate(`${OTHER_RECOMMENDATION_VIEW_PAGE}`)
    };

    const { refetch } = useGetOtherRecommendationQuery('')
    const [createOther, { isLoading, data, error, isError }] = useCreateOtherRecommendationMutation()
    console.log(error, isError, 'error')
    const createOtherHandler = (name: string, sort_value: number) => {
        createOther({
            name,
            sort_value,
        })
            .then((res: any) => {
                res.error ? <> </> :
                    setOpen(true)
                //  navigate(`${OTHER_RECOMMENDATION_VIEW_PAGE}`)
            })
        // .then(() => refetch())

        // if (!error) {
        //     console.log('error running')
        //     navigate(`${OTHER_RECOMMENDATION_VIEW_PAGE}`)
        // }


    }
    console.log(error, isError, 'errrorrr')


    return (
        <div>

            <OtherRecommendation
                onSubmit={createOtherHandler}
                error={isError}
                displayError={error}
                from="Add"
                open={open}
                handleClickClose={handleClickClose}
                savingData={isLoading}
            />

        </div>

    );
}

export default OtherRecommendationPage;
