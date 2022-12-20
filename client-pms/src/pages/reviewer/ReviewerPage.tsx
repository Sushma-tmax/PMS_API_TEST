/* eslint-disable */
import React from 'react'
import Reviewer from '../../components/reviewer/appraisal_reviewer/Reviewer'
import ReviewerApprove from '../../components/reviewerMain/performanceratingchart/Approve/ReviewerApprove'
import {useParams} from "react-router-dom";
import {
    useGetEmployeeAppraisalQuery,
    useGetTrainingRecommendationQuery,
    useGetRatingsQuery,
    useGetOtherRecommendationQuery
} from '../../service';
import ProvidedReviewerContextProvider from "../../context/reviewerContextContext";

const ReviewerPage = () => {

    const {employee_id} = useParams()
    const {data, isLoading} = useGetEmployeeAppraisalQuery(employee_id)
    const {data: tData} = useGetTrainingRecommendationQuery("")
    const {data: rData} = useGetRatingsQuery("")
    const {data: oData} = useGetOtherRecommendationQuery("")


if(isLoading) {
    return <p> loading</p>
}

    return (

        <div>
            <ProvidedReviewerContextProvider>
                <Reviewer employeeData={data}
                          trainingData={tData}
                          ratingData={rData}
                          otherData={oData}
                />
                {/* <ReviewerApprove 
                          employeeData={data}
                          trainingData={tData}
                          ratingData={rData}
                          otherData={oData}
                /> */}
            </ProvidedReviewerContextProvider>
        </div>
    )
}

export default ReviewerPage