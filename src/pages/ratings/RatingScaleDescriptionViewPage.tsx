import React, { useState } from 'react';
import { useGetRatingScaleQuery } from "../../service";
import RatingScaleDescriptionViewList from "../../components/PaMaster/ratings/ratingScaleDescriptionViewList";
import { useDeleteRatingScaleMutation } from "../../service/ratings/ratings";
import { useNavigate} from "react-router-dom";

const RatingScaleDescriptionViewPage = () => {
  const { data } = useGetRatingScaleQuery("");
  const [deleteRatingScale, {isError, error}] = useDeleteRatingScaleMutation()
//For success alert dialog 
const [open, setOpen] = useState<any>(false);
const handleClickClose = () => {
    setOpen(false);
};
  const deleteRatingScaleHandler = (id:string) => {
    deleteRatingScale (
      id
    ).then((res: any) => {    
      res.error ? <> </> : 
      setOpen(true)
  })
  }

  let navigate = useNavigate();
  const updateRatingScaleHandler = (id:string) => {
   
    navigate(`/ratingScaleDescription/${id}`);
      
    
  }



  return (
    <div>
      <RatingScaleDescriptionViewList
        ratingScaleData={data}
        onDelete = {deleteRatingScaleHandler} 
        onUpdate = {updateRatingScaleHandler}
        error = {isError}
        displayError = {error}
        openDelSuccess={open}
        handleDelSuccessClose={handleClickClose}
      />
    </div>
  );
};

export default RatingScaleDescriptionViewPage;
