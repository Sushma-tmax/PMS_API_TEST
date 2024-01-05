import React from 'react'
/* eslint-disable */
import {useParams} from "react-router-dom";
import {
    useGetEmployeeAppraisalQuery,
    useGetTrainingRecommendationQuery,
    useGetRatingsQuery,
    useGetOtherRecommendationQuery
} from '../../../service';
import AppraiserRejectsNormalizerProvider from "../../../context/AppraiserRejectsNormalizer";
import AppraiserSubmission from '../../../components/appraisal/appraiser/appraiser_Submission/AppraiserResubmission';

const AppraiserSubmissionPage = () => {



    const {employee_id} = useParams()
    const {data, isLoading,refetch:fetchCancel} = useGetEmployeeAppraisalQuery(employee_id)
    const {data: tData,refetch:trainingCancel} = useGetTrainingRecommendationQuery("")
    const {data: rData,refetch:areaCancel} = useGetRatingsQuery("")
    const {data: oData,refetch:otherCancel} = useGetOtherRecommendationQuery("")

console.log(data,'employee data')
if(isLoading) {
    return <p> loading</p>
}

    return (

        <div>
            <AppraiserRejectsNormalizerProvider>
                <AppraiserSubmission employeeData={data}
                fetchCancel={fetchCancel}
                otherCancel={otherCancel}
                areaCancel={areaCancel}
                trainingCancel={trainingCancel}
                          trainingData={tData}
                          ratingData={rData}
                          otherData={oData}
                />
            </AppraiserRejectsNormalizerProvider>
        </div>
    )
}

export default AppraiserSubmissionPage
