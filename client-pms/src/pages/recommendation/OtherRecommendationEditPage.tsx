/* eslint-disable */
import React, { useState } from 'react';
import {
    useCreateOtherRecommendationMutation,
    useGetOtherRecommendationQuery,
    useGetSingleOtherRecommendationQuery
} from '../../service';
import { useDeleteOtherRecommendationMutation } from '../../service';
import { useEditOtherRecommendationMutation } from '../../service';
import { useNavigate, useParams } from "react-router-dom";
import { OtherRecommendation } from "../../components";
import { OTHER_RECOMMENDATION_VIEW_PAGE } from '../../constants/routes/Routing';
import AlertDialogSuccess from '../../components/UI/DialogSuccess';

const OtherRecommendationEditPage = () => {
    const navigate = useNavigate()

    const { id } = useParams()
    console.log(id)
    

  //For success alert dialog 
  const [open, setOpen] = useState(false);
  const handleClickClose = () => {
    setOpen(false);
    navigate(`${OTHER_RECOMMENDATION_VIEW_PAGE}`)
  };

    const { refetch } = useGetOtherRecommendationQuery('')
    // const [createOther, {isLoading, data, error}] = useCreateOtherRecommendationMutation()
    const { data, isLoading } = useGetSingleOtherRecommendationQuery(id)
    const [editOther, { isLoading: editLoading, data: editData, error: editError, isError }] = useEditOtherRecommendationMutation()

    const editOtherHandler = (name: string, sort_value: any) => {
        console.log('Clicked', name)

        editOther(
            {
                name,
                sort_value,
                id
            }
        )
            .then((res: any) => {
                res.error ? <> </> :
                    // <>
                        {/* navigate(`${OTHER_RECOMMENDATION_VIEW_PAGE}`) */}
                       setOpen(true)
                    // </>

            })
        // .then(() => refetch())
        // if (editData && isError === false) {
        //     navigate(`${OTHER_RECOMMENDATION_VIEW_PAGE}`)
        // }

    }
    console.log(data)

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>





            <OtherRecommendation
                onSubmit={editOtherHandler}
                defaultValue={data}
                error1={isError}
                from={"Edit"}
                open={open}
                handleClickClose = {handleClickClose} />
        </div>

    );
};

export default OtherRecommendationEditPage;
