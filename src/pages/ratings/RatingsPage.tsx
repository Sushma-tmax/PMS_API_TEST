import React from 'react';
import { useGetRatingsQuery } from '../../service';
import { useCreateRatingsMutation } from '../../service';
import { useDeleteRatingsMutation ,useUpdateRatingMutation} from '../../service';
import { useNavigate, useParams } from "react-router-dom";
import {Ratings} from "../../components";
import { RATINGS_PAGE } from '../../constants/routes/Routing';


const RatingsPage = () => {

    const { data: getQueryData, refetch } = useGetRatingsQuery('')

    const [deleteRating, { error }] = useDeleteRatingsMutation()

    const [createRatings, { isLoading, data, }] = useCreateRatingsMutation()

    const [updateRating] = useUpdateRatingMutation()
    
    const {id} = useParams()
    console.log(id)


    const createRatingHandler = (rating: string) => {
        console.log('clicked')

        createRatings(
            { rating }
        )
    }

    const deleteRatingHandler = (id: string) => {
        console.log('clicked')
        deleteRating(
            id
        )
    }

    let navigate = useNavigate();
    const updateRatingHandler = (rating: string) => {
        updateRating ({
            rating,
            id
          })
          navigate(RATINGS_PAGE)
    }

    console.log(data, "page")
    return (<div>

        <Ratings ratingsData={getQueryData} onSubmit={createRatingHandler} onDelete={deleteRatingHandler}  onUpdate={updateRatingHandler}/>

    </div>);
};

export default RatingsPage;