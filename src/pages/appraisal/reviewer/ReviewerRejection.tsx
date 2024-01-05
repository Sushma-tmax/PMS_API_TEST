import React from 'react'
import ReviewerRejection from '../../../components/appraisal/reviewer/reviewer_rejection/Reviewer'
import { useParams } from "react-router-dom";
import {
  useGetEmployeeAppraisalQuery,
  useGetTrainingRecommendationQuery,
  useGetRatingsQuery,
  useGetOtherRecommendationQuery
} from '../../../service';
import ProvidedReviewerContextProvider from "../../../context/reviewerContextContext";


const ReviewerRejectionPage = () => {
  const { employee_id } = useParams()
  const { data, isLoading, refetch: fetchCancel } = useGetEmployeeAppraisalQuery(employee_id)
  const { data: tData } = useGetTrainingRecommendationQuery("")
  const { data: rData } = useGetRatingsQuery("")
  const { data: oData } = useGetOtherRecommendationQuery("")


  if (isLoading) {
    return <p> loading</p>
  }
  return (
    <>   
    <div>
      <ProvidedReviewerContextProvider>
        <ReviewerRejection employeeData={data}
          trainingData={tData}
          fetchCancel={fetchCancel}
          ratingData={rData}
          otherData={oData} />
      </ProvidedReviewerContextProvider>
    </div >
    </>
  )
}

export default ReviewerRejectionPage