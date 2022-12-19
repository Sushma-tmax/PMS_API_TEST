import React from "react";
import { useGetSingleRatingQuery } from '../../service';
import { useUpdateRatingMutation } from '../../service';
import {useNavigate, useParams} from "react-router-dom";
import {Ratings} from "../../components";
import { RATINGS_PAGE } from "../../constants/routes/Routing";


const RatingUpdatePage = () => {
  const navigate = useNavigate()
  
  const {id} = useParams()
  console.log(id)


const {data,refetch,isLoading} = useGetSingleRatingQuery (id)
console.log(data, 'RatingData')

const [updateRating] = useUpdateRatingMutation()

const updateRatingsHandler = (rating : string)=> {
  updateRating ({
    rating,
    id
  })
  // navigate(`${RATINGS_PAGE}`)

}

if (isLoading) {
  return <div>Loading...</div>
}

  return ( <div>
    
      <Ratings defaultValue = {data}  onSubmit={updateRatingsHandler}/>

  </div>);
};

export default RatingUpdatePage;
