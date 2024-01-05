import React from 'react'
import ReviewerRejectsAppraiser from '../../../components/appraisal/reviewer/employee_reviewer_rejection/ReviewerRejectsAppraiser'
import { useParams } from "react-router-dom";
import {
  useGetEmployeeAppraisalQuery,
  useGetTrainingRecommendationQuery,
  useGetRatingsQuery,
  useGetOtherRecommendationQuery
} from '../../../service';
import ProvidedReviewerContextProvider from "../../../context/reviewerContextContext";


const Employee_ReviewerRejection = () => {

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
      <ProvidedReviewerContextProvider>
        <ReviewerRejectsAppraiser
          employeeData={data}
          trainingData={tData}
          fetchCancel={fetchCancel}
          ratingData={rData}
          otherData={oData} />
      </ProvidedReviewerContextProvider>
    </>
  )
}

export default Employee_ReviewerRejection