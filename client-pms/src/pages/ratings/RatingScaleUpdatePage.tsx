import React, { useState } from 'react';
import { RatingScaleDescription } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRatingScaleQuery } from "../../service/ratings/ratings";
import { useUpdateRatingScaleMutation } from "../../service/ratings/ratings";
import { useGetRatingsQuery } from "../../service";
import { RATING_SCALE_DESCRIPTION_VIEW_PAGE} from "../../constants/routes/Routing";

const RatingScaleUpdatePage = () => {
  const navigate = useNavigate();

  const {data:ratingdata} = useGetRatingsQuery('')

  
  const { id } = useParams();

  const { data, isLoading } = useGetSingleRatingScaleQuery(id);

  const [updateRatingScale,{isError,error}] = useUpdateRatingScaleMutation();
  //For success alert dialog 
 const [open, setOpen] = useState(false);
 const handleClickClose = () => {
     setOpen(false);
     navigate(RATING_SCALE_DESCRIPTION_VIEW_PAGE)
 };
  const updateRatingScaleHandler = (
    rating: any,
    rating_scale: any,
    definition: any
  ) => {
    console.log(rating[0].rating,'rating dataaaaaa')
    updateRatingScale({

      rating: rating[0].rating,
      rating_scale: rating[0].rating_scale,
      definition: rating[0].definition,
      id,
    }).then((res: any) => {
          res.error ? <> </> :
          setOpen(true)
           //navigate(RATING_SCALE_DESCRIPTION_VIEW_PAGE)
      })
    // navigate(`${RATING_SCALE_DESCRIPTION_VIEW_PAGE}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(error,'showErroredit')

  return (
    <div>
      <RatingScaleDescription
        defaultValue={data}
        onSubmit={updateRatingScaleHandler}
        ratingsData={ratingdata}
        error2 = {isError}
        showEditError = {error}
        open={open}
        from={"Edit"}
        handleClickClose={handleClickClose}
      />
    </div>
  );
};

export default RatingScaleUpdatePage;
