//React Component: CreateMapping

import React, {useEffect, useState} from 'react';
import {
    useAddWeightageMutation,
    useCreatePositionTemplateMutation,
    useGetCalenderQuery,
    useGetSingleTemplateQuery,
    useGetTemplateQuery,
    useGetOtherRecommendationQuery,
    useGetTrainingRecommendationQuery,


} from "../../service";
import {Mapping} from "../../components";
import {useParams, useNavigate} from 'react-router-dom';
import {useCreateAppraisalCalenderMutation} from "../../service/appraisalCalender/AppraisalCalender";
import { CREATE_CALENDER } from '../../constants/routes/Routing';


const CreateMapping = () => {

    const navigate = useNavigate();

    const {id} = useParams()
    console.log(id)


    const {data, isLoading} = useGetTemplateQuery('');
    const [addWeightage, {isError, isSuccess }] = useAddWeightageMutation()
    const {data: calenderData} = useGetCalenderQuery('')
    const [dataTemplate, setDataTemplate] = useState<any>('')
    const {data: OtherRecommendationData} = useGetOtherRecommendationQuery('')
    const {data: TrainingRecommendationData} = useGetTrainingRecommendationQuery('')


    const {data: singleTemplate, isLoading: load} = useGetSingleTemplateQuery(id)
    const [createPosition] = useCreatePositionTemplateMutation()

    const [createAppraisalCalender , {error:calendarError, isError:calendarIsError}] = useCreateAppraisalCalenderMutation()

    // useEffect(() => {
    //     console.log('runnnnnnnnnnn')
    //     if (data) {
    //         navigate('/template/create-template-mapping/' + data.templates[0]._id,)
    //         console.log(data.templates[0]._id, '```````````````')
    //     }
    //
    // }, [data])

    const createPositionHandler = (data: any) => {
        createPosition(
            {
                position: data.position,
                id
            }
        )
    }

    const createAppraisalCalenderHandler = (calender: string) => {
        createAppraisalCalender({
            template: id,
            calender
        }) .then((res: any) => {
            res.error ? <> </> : navigate(`${CREATE_CALENDER}`)
        })
    }

    console.log(singleTemplate, 'singleTemplate')


    useEffect(() => {
        setDataTemplate(id)
    }, [id])


    console.log(singleTemplate, 'template')

    const create = (data: any) => {
        console.log(data, 'data')
        addWeightage({
            training_recommendation: data.training_recommendation,
            id
        })
    }

    const addOtherRecommendation = (data: any) => {
        console.log(data, 'data')
        addWeightage({
            other_recommendation: data.other_recommendation,
            id
        })
    }

    const createWeightage = (data: any) => {
        console.log(data, 'data')
        addWeightage({
            weightage: data.weightage,
            id
        })
    }

    const addCaleander = (data: any) => {
        return addWeightage({

            calendar: data.calendar,
            id
        })
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (load) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Mapping
                weightageData={data}
                isLoading={isLoading}
                saveDraft={create}
                createWeightage={createWeightage}
                calenderData={calenderData}
                addCaleander={addCaleander}
                addOtherRecommendation={addOtherRecommendation}
                singleTemplateData={singleTemplate}
                onSubmit={createPositionHandler}
                otherRecommendationData={OtherRecommendationData}
                trainingRecommendationData={TrainingRecommendationData}
                createAppraisalCalenderHandler={createAppraisalCalenderHandler}
                weightageError = {isError}
                isSuccessMapping = {isSuccess}
                calendarIsError = {calendarIsError}
                calendarError = {calendarError}
            />
        </div>
    );
};


export default CreateMapping;
