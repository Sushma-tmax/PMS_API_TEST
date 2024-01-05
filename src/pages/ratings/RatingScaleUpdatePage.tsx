import React, { useState } from 'react';
import { RatingScaleDescription } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleRatingScaleQuery } from "../../service/ratings/ratings";
import { useUpdateRatingScaleMutation } from "../../service/ratings/ratings";
import { useGetRatingsQuery } from "../../service";
import { RATING_SCALE_DESCRIPTION_VIEW_PAGE } from "../../constants/routes/Routing";

const RatingScaleUpdatePage = () => {
  const navigate = useNavigate();

  const { data: ratingdata } = useGetRatingsQuery('')


  const { id } = useParams();

  const { data, isLoading } = useGetSingleRatingScaleQuery(id);

  const [updateRatingScale, { isError, error,isLoading:loadingUpdate }] = useUpdateRatingScaleMutation();
  //For success alert dialog 
  const [navPrompt, setnavPrompt] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClickClose = () => {
    setnavPrompt(false)
    setOpen(false);
    navigate(RATING_SCALE_DESCRIPTION_VIEW_PAGE)
  };
  const updateRatingScaleHandler = (
    rating: any,
    rating_scale: any,
    definition: any
  ) => {
    console.log(rating[0].rating, 'rating dataaaaaa')
    updateRatingScale({

      rating: rating[0].rating,
      rating_scale: rating[0].rating_scale,
      definition: rating[0].definition,
      id,
    }).then((res: any) => {
      if (!res.error) {
        setnavPrompt(false);
        setOpen(true)
      }     
      //navigate(RATING_SCALE_DESCRIPTION_VIEW_PAGE)
    })
    // navigate(`${RATING_SCALE_DESCRIPTION_VIEW_PAGE}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(error, 'update')

  return (
    <div>
      <RatingScaleDescription
        defaultValue={data}
        onSubmit={updateRatingScaleHandler}
        ratingsData={ratingdata}
        error2={isError}
        showEditError={error}
        open={open}
        from={"Edit"}
        handleClickClose={handleClickClose}
        navPrompt={navPrompt}
        setnavPrompt={setnavPrompt}
        savingData={loadingUpdate}
      />
    </div>
  );
};

export default RatingScaleUpdatePage;
