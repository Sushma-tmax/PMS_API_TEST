import React, { useState } from "react";
import { RatingScaleDescription } from "../../components";
import { useCreateRatingScaleMutation } from "../../service/ratings/ratings";
import { useGetRatingsQuery } from "../../service";
import { useNavigate } from "react-router-dom";
import { RATING_SCALE_DESCRIPTION_VIEW_PAGE } from "../../constants/routes/Routing";

const RatingScaleDescriptionPage = () => {
  const [createRatingScale, { isLoading, data, error, isError }] =
    useCreateRatingScaleMutation();
  const { data: ratingdata } = useGetRatingsQuery("");
  const [navPrompt, setnavPrompt] = useState(false);

  //For success alert dialog
  const [open, setOpen] = useState(false);
  const handleClickClose = () => {
    setnavPrompt(false);
    setOpen(false);
    navigate(RATING_SCALE_DESCRIPTION_VIEW_PAGE);
  };
  console.log(error, "error message");
  let navigate = useNavigate();
  const createRatingScaleHandler = (
    rating: string,
    rating_scale: string,
    definition: string
  ) => {
    console.log("clicked");
    createRatingScale(rating).then((res: any) => {
      res.error ? <> </> : setOpen(true);
      //navigate(RATING_SCALE_DESCRIPTION_VIEW_PAGE)
    });
  };
  console.log(isError, "isError");
  console.log(error, "add");
  return (
    <div>
      <RatingScaleDescription
        ratingsData={ratingdata}
        onSubmit={createRatingScaleHandler}
        error1={isError}
        errorShow={error}
        open={open}
        from={"Add"}
        handleClickClose={handleClickClose}
        navPrompt={navPrompt}
        setnavPrompt={setnavPrompt}
        savingData={isLoading}
      />
    </div>
  );
};

export default RatingScaleDescriptionPage;
