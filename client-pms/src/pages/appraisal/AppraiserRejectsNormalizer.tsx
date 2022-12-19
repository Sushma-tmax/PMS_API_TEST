/* eslint-disable */
import React from 'react'
import ReviewerRejection1 from '../../components/manager/NormalizerRejection/ReviewerRejection1';
import {useParams} from "react-router-dom";
import {
    useGetEmployeeAppraisalQuery,
    useGetTrainingRecommendationQuery,
    useGetRatingsQuery,
    useGetOtherRecommendationQuery
} from '../../service';
import AppraiserRejectsNormalizerProvider from "../../context/AppraiserRejectsNormalizer";

const AppraiserRejectsNormalizer = () => {



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
            <AppraiserRejectsNormalizerProvider>
                <ReviewerRejection1 employeeData={data}
                          trainingData={tData}
                          ratingData={rData}
                          otherData={oData}
                />
            </AppraiserRejectsNormalizerProvider>
        </div>
    )
}

export default AppraiserRejectsNormalizer
