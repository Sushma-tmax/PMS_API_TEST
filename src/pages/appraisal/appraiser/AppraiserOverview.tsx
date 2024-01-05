import React, { useState } from 'react'
import {
    useCreateEmployeeAppraisalMutation,
    useGetCalenderQuery,
    useGetEmployeeAppraisalQuery,
    useGetOtherRecommendationQuery,
    useGetRatingScaleQuery,
    useGetSingleFeedBackQuery
} from '../../../service'
import {useGetTrainingRecommendationQuery} from '../../../service'
import {useGetFeedBackQuery} from '../../../service'
import {useParams} from "react-router-dom";
import ProvidedAppraisalContextProvider from "../../../context/appraiserOverviewContext";
import AppraiserOverview from '../../../components/appraisal/appraiser/appraisal_Overview/AppraiserOverview';

const AppraiserOverViewPage = () => {
    const {feedback_id} = useParams()
    const {employee_id} = useParams()


    const {data: oData,refetch:fetchCancel1} = useGetOtherRecommendationQuery('')

    const {data: tData,refetch:fetchCancel2} = useGetTrainingRecommendationQuery('')

    const {data: fData,refetch:fetchCancel3} = useGetFeedBackQuery('')
    const {data:singleFeedback, isLoading:feedbackLoading} = useGetSingleFeedBackQuery(feedback_id)
    const {data: calendarData, isLoading} = useGetCalenderQuery('')
    const {data:ratingScaleData} = useGetRatingScaleQuery("")

    const {data: empData,refetch:fetchCancel} = useGetEmployeeAppraisalQuery(employee_id)

    const [updateMutation] = useCreateEmployeeAppraisalMutation()


    
    if(isLoading) {
        return <p>Loading... </p>
    }
    
  

    return (
        <ProvidedAppraisalContextProvider>
            <AppraiserOverview other1Data={oData} training1Data={tData}
                               feedBackData={fData}
                               mutation={updateMutation}
                               employee1Data={empData}
                               fetchCancel={fetchCancel}
                               fetchCancel1={fetchCancel1}
                               fetchCancel2={fetchCancel2}
                               fetchCancel3={fetchCancel3}
                               calendarData = {calendarData}
                               singleFeedback = {singleFeedback}
                               ratingScaleData = {ratingScaleData}
                               />
        </ProvidedAppraisalContextProvider>
    )
}

export default AppraiserOverViewPage
