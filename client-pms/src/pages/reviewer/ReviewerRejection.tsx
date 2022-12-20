/* eslint-disable */
import React from 'react'
import ReviewerRejection1 from '../../components/manager/ReviewerRejection/ReviewerRejection1';
import {useParams} from "react-router-dom";
import {
    useGetEmployeeAppraisalQuery,
    useGetTrainingRecommendationQuery,
    useGetRatingsQuery,
    useGetOtherRecommendationQuery
} from '../../service';
import ProvidedReviewerContextProvider from "../../context/reviewerContextContext";

const ReviewerRejectionPage = () => {

    const {employee_id} = useParams()
    const {data, isLoading} = useGetEmployeeAppraisalQuery(employee_id)
    const {data: tData} = useGetTrainingRecommendationQuery("")
    const {data: rData} = useGetRatingsQuery("")
    const {data: oData} = useGetOtherRecommendationQuery("")

console.log(data,'employee data')
if(isLoading) {
    return <p> loading</p>
}

    return (

        <div>
            <ProvidedReviewerContextProvider>
                <ReviewerRejection1 employeeData={data}
                          trainingData={tData}
                          ratingData={rData}
                          otherData={oData}
                />
            </ProvidedReviewerContextProvider>
        </div>
    )
}

export default ReviewerRejectionPage