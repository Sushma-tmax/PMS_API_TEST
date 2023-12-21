/* eslint-disable */
import React from 'react'
import Reviewer from '../../components/reviewer/appraisal_reviewer/Reviewer'
import {useParams} from "react-router-dom";
import {
    useGetEmployeeAppraisalQuery,
    useGetTrainingRecommendationQuery,
    useGetRatingsQuery,
    useGetOtherRecommendationQuery
} from '../../service';
import ProvidedNormalizerContextProvider from "../../context/normalizerContext";
import Normalizer from '../../components/normalizer/Normalizer';

const NormalizerPage = () => {

    const {employee_id} = useParams()
    const {data} = useGetEmployeeAppraisalQuery(employee_id)
    const {data: tData} = useGetTrainingRecommendationQuery("")
    const {data: rData} = useGetRatingsQuery("")
    const {data: oData} = useGetOtherRecommendationQuery("")


    return (

        <div>
            <ProvidedNormalizerContextProvider>
                <Normalizer employeeData={data}
                          trainingData={tData}
                          ratingData={rData}
                          otherData={oData}
                />
            </ProvidedNormalizerContextProvider>
        </div>
    )
}

export default NormalizerPage