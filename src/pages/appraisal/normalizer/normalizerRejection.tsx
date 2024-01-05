/* eslint-disable */
import React from 'react'
import {useParams} from "react-router-dom";
import {
    useGetEmployeeAppraisalQuery,
    useGetTrainingRecommendationQuery,
    useGetRatingsQuery,
    useGetOtherRecommendationQuery
} from '../../../service';
import ProvidedNormalizerContextProvider from "../../../context/normalizerContext";
import NormalizerRejection from '../../../components/appraisal/normalizer/normalizer_rejection/Normalizer';

const NormalizerRejectionPage = () => {

    const {employee_id} = useParams()
    const {data,refetch:fetchCancel} = useGetEmployeeAppraisalQuery(employee_id)
    const {data: tData} = useGetTrainingRecommendationQuery("")
    const {data: rData} = useGetRatingsQuery("")
    const {data: oData} = useGetOtherRecommendationQuery("")


    return (

        <div>
            <ProvidedNormalizerContextProvider>
                <NormalizerRejection employeeData={data}
                fetchCancel={fetchCancel}
                          trainingData={tData}
                          ratingData={rData}
                          otherData={oData}
                />
            </ProvidedNormalizerContextProvider>
        </div>
    )
}

export default NormalizerRejectionPage