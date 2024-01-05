import { useState, createContext, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

import {
    useCreateEmployeeAppraisalMutation,
    useGetEmployeeAppraisalQuery,
    useGetFeedBackQuery,
    useGetRatingScaleQuery,
    useGetOtherRecommendationQuery,
    useGetTrainingRecommendationQuery, useUpdateEmployeeAppraisalMutation
    // @ts-ignore
} from "../service";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { useGetEmailIdsQuery } from "../service/email/emailNotification";

const NormalizerContext = createContext(undefined)

export function useNormalizerContext() {
    return useContext(NormalizerContext)
}


function useProvidedNormalizerContext() {

    const { employee_id } = useParams()
    const { feedback_id } = useParams()

    console.log(employee_id, 'employee_id')
    const { data: oData, isLoading: oLoad } = useGetOtherRecommendationQuery('')

    const { data: tData } = useGetTrainingRecommendationQuery('')

    const { data: fData } = useGetFeedBackQuery('')
    const { data: ratingData } = useGetRatingScaleQuery('')
    const { data: empData } = useGetEmployeeAppraisalQuery(employee_id)
    console.log(empData, 'eeeee')

    const [updateMutation, isLoading] = useUpdateEmployeeAppraisalMutation()

    const [otherRecommendation, setOtherRecommendation] = useState<any>([])
    const [appraiserTrainingRecommendation, setAppraiserTrainingRecommendation] = useState<any>([])
    const [reviewerTrainingRecommendation, setReviewerTrainingRecommendation] = useState<any>([])
    const [appraiserOtherRecommendation, setAppraiserOtherRecommendation] = useState<any>([])
    const [OtherRecommendationothers, setOtherRecommendationothers] = useState<any>([])
    const [reviewerOtherRecommendation, setReviewerOtherRecommendation] = useState<any>([])
    const [appraiserFeedback, setAppraiserFeedback] = useState<any>([])
    const [appraiserOverallFeedback, setAppraiserOverallFeedback] = useState<any>([])
    const [reviewerFeedback, setReviewerFeedback] = useState<any>([])
    const [reviewerComments, setReviewerComments] = useState<any>("");

    const [appraiserAreaOfImprovement, setAppraiserAreaOfImprovement] = useState<any>([])
    const [reviewerAreaOfImprovement, setReviewerAreaOfImprovement] = useState<any>([])
    const [trainingSelectValue, setTrainingSelectValue] = useState<any>([])
    const [trainingRecommendation, setTrainingRecommendation] = useState<any>([])
    const [trainingRecommendationFormValues, setTrainingRecommendationFormValues] = useState<any>([])
    //normalizer comments
    const [normalizerOtherRecommendationComments, setNormalizerOtherRecommendationComments] = useState<any>("");
    const [normalizerTrainingRecommendationComments, setNormalizerTrainingRecommendationComments] = useState<any>("");
    const [normalizerOverallFeedComments, setNormalizerOverallFeedComments] = useState<any>("");
    const [reviewerOverallFeedback, setReviewerOverallFeedback] = useState<any>("");
    const [reviewerReason, setReviewerReason] = useState<any>("");
    const [normalizerReason, setNormalizerReason] = useState<any>("");
    const [normalizerAreaImprovementComments, setNormalizerAreaImprovementComments] = useState<any>("");
    const [normalizerComments, setNormalizerComments] = useState<any>("");
    const {data: emailData } = useGetEmailIdsQuery({appraiser_code : empData?.data?.appraiser_code,reviewer_code : empData?.data?.reviewer_code, normalizer_code: empData?.data?.normalizer_code})
    const [objectiveType, setObjectiveType] = useState<any>([])
    const [objectiveDescription, setObjectiveDescription] = useState<any>([])

    const [overAllRating, setOverAllRating] = useState<any>(0)

    const [reviewedOverallFeedback, setReviewedOverallFeedback] = useState(false)
    const [overallFeed, setOverallFeed] = useState<any>([])
    const [areaImprovement, setAreaImprovement] = useState<any>([{
        id: Date.now(),
        value: "",
        specific_actions: [{ value: "" }, { value: "" }, { value: "" }],
    }])

    const [area, setarea] = useState<any>([{
        id: Date.now(),
        value: "",
        specific_actions: [{ value: "" }, { value: "" }, { value: "" }],
    }])


    const checkboxHandler = (checkbox: any[]) => {
        if (checkbox) {
            const res = checkbox.filter((i: any) => {
                return i.isChecked === true;
            });
            return res;
        }
    };

    const checkboxIdHandler = (res: any[]) => {
        console.log(res, '``res````')
        if (res) {
            const check = res.map((i: any) => {
                return {
                    name: i._id,
                    isChecked: i.isChecked,
                };
            });
            return check;
        }
    };

    const [ disableTextAfterSubmission , setDisableTextAfterSubmission] = useState(false);
    const [disableButtons , setDisableButtons] = useState(false)

    useEffect(() => {
        if (empData) {

            setOtherRecommendation(() => {
                const checked = empData.data.normalizer.other_recommendation.map((i: any) => {
                    console.log(i, 'iiiiiiiiiiiijjjjjj')

                    return {
                        ...i.name,
                        _id: i.name._id,
                        isChecked: i.isChecked,
                    };
                });

                const notChecked = empData.data.appraisal_template.other_recommendation.map((i: any) => {


                    return {
                        ...i.name,
                        _id: i.name._id,
                        isChecked: i.isChecked,
                    };

                })

                // console.log(checked, 'checked')
                const newArr = [...notChecked, ...checked]
                // console.log(newArr, 'newArr')
                // @ts-ignore
                let uniqueObjArray = [...new Map(newArr.map((item) => [item["_id"], item])).values()];
                console.log(newArr.map((j: any) => j.name._id), 'empData.data.appraisal_template.other_recommendation')
                // let uniqueObjArray = _.uniqBy(newArr, "_id");
                console.log(uniqueObjArray, 'uniqueObjArray')
                return uniqueObjArray
            })
            setTrainingSelectValue(empData.data.appraisal_template.training_recommendation)
            setTrainingRecommendation(() => {
                return empData.data.normalizer.training_recommendation
            })

            setAppraiserTrainingRecommendation(() => {
                return empData.data.appraisal.training_recommendation
            })

            setAppraiserOtherRecommendation(() => {
                return empData.data.appraisal.other_recommendation
            })
            setOtherRecommendationothers(() => {
                return empData.data.appraisal.other_recommendation_others
            })
            setAppraiserFeedback(() => {
                return empData.data.appraisal.feedback_questions
            })
            setAppraiserOverallFeedback(() => {
                return empData.data.appraisal.appraiser_overall_feedback
            })
            setAppraiserAreaOfImprovement(() => {
                return empData.data.appraisal.area_of_improvement
            })
            setReviewerOtherRecommendation(() => {
                return empData.data.reviewer.other_recommendation
            })
            setReviewerTrainingRecommendation(() => {
                return empData.data.reviewer.training_recommendation
            })
            setReviewerAreaOfImprovement(() => {
                return empData.data.reviewer.area_of_improvement
            })
            setReviewerFeedback(() => {
                return empData.data.reviewer.feedback_questions
            })

            setNormalizerTrainingRecommendationComments(() => {
                return empData.data.normalizer.training_recommendation_comments
            })
            setNormalizerOtherRecommendationComments(() => {
                return empData.data.normalizer.other_recommendation_comments
            })
            setNormalizerOverallFeedComments(() => {
                return empData.data.normalizer.normalizer_overall_feedback
            })
            setReviewerOverallFeedback(() => {
                return empData?.data?.reviewer?.reviewer_overall_feedback
            })
            setNormalizerAreaImprovementComments(() => {
                return empData.data.normalizer.area_of_improvement_comments
            })
            

            setReviewerComments(empData?.data?.reviewer?.reviewer_comments)

            setNormalizerComments(empData.data.normalizer.reason_for_rejection)
            setDisableTextAfterSubmission(!empData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer"))


        }
    }, [empData])

    useEffect(() => {
        if (empData) {
            setObjectiveType(empData.data.reviewer.objective_type)
        }
    }, [empData])


    useEffect(() => {
        if (empData) {
            setarea(empData.data.normalizer.area_of_improvement)
            // console.log(empData.data.appraisal.area_of_improvement, 'areaImprovement')
        }


    }, [empData])


    useEffect(() => {
        if (empData) {
            const getObjectiveTypeValue = (id: any) => {
                if (objectiveType && id) {
                    const res = objectiveType.find((item: any) => {
                        return item.name._id === id
                    })
                    // console.log(res.value, 'res')
                    if (res) {
                        return res.value
                    }
                }
            }

            setObjectiveDescription(empData.data.normalizer.objective_description.map((j: any) => {
                return {
                    ...j,
                    objective_type: getObjectiveTypeValue(j?.name?.objective_type)

                }
            }))
        }
    }, [empData, objectiveType])

    // useEffect(() => {
    //     if (objectiveDescription.length > 0 && empData) {
    //         const objectiveDescriptionMapped = objectiveDescription.map((i: any) => {
    //             // if (i.ratings) {
    //             console.log(i.objective_type, 'objective_type')
    //             const sum = (i.value * i.objective_type) / 10000
    //             const newSum = sum * i?.ratings?.rating
    //             console.log(sum, 'newSum')
    //             return newSum
    //             // }


    //         })
    //         console.log(_.sum(objectiveDescriptionMapped), 'objectiveDescriptionMapped')
    //         setOverAllRating(() => {
    //             return _.sum(objectiveDescriptionMapped).toFixed(2)
    //         })

    //     }
    // }, [objectiveDescription, empData])

    // useEffect(() => {
    //     if (overAllRating) {
    //         updateMutation({
    //             "normalizer.normalizer_rating": overAllRating,
    //             id: employee_id
    //         })
    //     }
    // }, [ overAllRating])

    return {
        otherRecommendation,
        setOtherRecommendation,
        trainingRecommendation,
        setTrainingRecommendation,
        appraiserTrainingRecommendation,
        setAppraiserTrainingRecommendation,
        tData,
        fData,
        updateMutation,
        checkboxHandler,
        checkboxIdHandler,
        employee_id,
        trainingSelectValue,
        trainingRecommendationFormValues,
        setTrainingRecommendationFormValues,
        appraiserOtherRecommendation,
        setAppraiserOtherRecommendation,
        OtherRecommendationothers,
        setOtherRecommendationothers,
        reviewerOtherRecommendation,
        setReviewerOtherRecommendation,
        reviewerTrainingRecommendation,
        appraiserFeedback,
        setAppraiserFeedback,
        reviewerFeedback,
        setReviewerFeedback,
        areaImprovement,
        setAreaImprovement,
        appraiserAreaOfImprovement,
        setAppraiserAreaOfImprovement,
        reviewerAreaOfImprovement,
        setReviewerAreaOfImprovement,
        isLoading,
        area,
        setarea,
        overallFeed,
        setOverallFeed,
        empData,
        ratingData,
        setReviewerComments,
        reviewerComments,
        normalizerComments,
        setNormalizerComments,
        normalizerAreaImprovementComments,
        setNormalizerAreaImprovementComments,
        normalizerOverallFeedComments,
        setNormalizerOverallFeedComments,
        normalizerOtherRecommendationComments,
        setNormalizerOtherRecommendationComments,
        normalizerTrainingRecommendationComments,
        setNormalizerTrainingRecommendationComments,
        appraiserOverallFeedback,
        setAppraiserOverallFeedback,
        reviewerOverallFeedback, setReviewerOverallFeedback,
        reviewedOverallFeedback,
        setReviewedOverallFeedback,
        emailData,
        disableTextAfterSubmission,
        disableButtons , 
        setDisableButtons
    }
}

export default function ProvidedNormalizerContextProvider(props: any) {
    const data = useProvidedNormalizerContext()
    const { children } = props
    return (
        // @ts-ignore
        <NormalizerContext.Provider value={data}>
            {children}
        </NormalizerContext.Provider>
    )

}
