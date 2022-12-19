import React, { useState } from 'react'
import AppraiserOverview from '../../components/manager/appraiserOverview/AppraiserOverview'
import {
    useCreateEmployeeAppraisalMutation,
    useGetCalenderQuery,
    useGetEmployeeAppraisalQuery,
    useGetOtherRecommendationQuery,
    useGetRatingScaleQuery,
    useGetSingleFeedBackQuery
} from '../../service'
import {useGetTrainingRecommendationQuery} from '../../service'
import {useGetFeedBackQuery} from '../../service'
import {useParams} from "react-router-dom";
import ProvidedAppraisalContextProvider from "../../context/appraiserOverviewContext";

const AppraiserOverViewPage = () => {
    const {feedback_id} = useParams()
    const {employee_id} = useParams()


    const {data: oData} = useGetOtherRecommendationQuery('')

    const {data: tData} = useGetTrainingRecommendationQuery('')

    const {data: fData} = useGetFeedBackQuery('')
    const {data:singleFeedback, isLoading:feedbackLoading} = useGetSingleFeedBackQuery(feedback_id)
    const {data: calendarData, isLoading} = useGetCalenderQuery('')
    const {data:ratingScaleData} = useGetRatingScaleQuery("")

    const {data: empData} = useGetEmployeeAppraisalQuery(employee_id)

    const [updateMutation] = useCreateEmployeeAppraisalMutation()

    console.log(oData, 'otherRecommendationData')
    console.log(tData, 'trainingRecommendationData')
    console.log(fData, 'FeedbackData')
    console.log(empData, 'Employee Data````````````````````````````````````')

    
    if(isLoading) {
        return <p>Loading... </p>
    }
    
  

    return (
        <ProvidedAppraisalContextProvider>
            <AppraiserOverview other1Data={oData} training1Data={tData}
                               feedBackData={fData}
                               mutation={updateMutation}
                               employee1Data={empData}
                               calendarData = {calendarData}
                               singleFeedback = {singleFeedback}
                               ratingScaleData = {ratingScaleData}
                               />
        </ProvidedAppraisalContextProvider>
    )
}

export default AppraiserOverViewPage
