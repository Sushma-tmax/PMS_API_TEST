import { useState, createContext, useContext, useEffect } from "react";
import ReactDOM from "react-dom";

import {
    useCreateEmployeeAppraisalMutation,
    useGetEmployeeAppraisalQuery,
    useGetFeedBackQuery,
    useGetOtherRecommendationQuery,
    useGetRatingScaleQuery,
    useGetTrainingRecommendationQuery, useUpdateEmployeeAppraisalMutation
    // @ts-ignore
} from "../service";
import { useParams } from "react-router-dom";
import _ from "lodash";
import { useGetEmailIdsQuery } from "../service/email/emailNotification";

const ReviewerContext = createContext(undefined)

export function useReviewerContext() {
    return useContext(ReviewerContext)
}


function useProvidedReviewerContext() {

    const { employee_id } = useParams()
    const { feedback_id } = useParams()

    console.log(employee_id, 'employee_id')
    const { data: oData, isLoading: oLoad } = useGetOtherRecommendationQuery('')

    const { data: tData } = useGetTrainingRecommendationQuery('')

    const { data: fData } = useGetFeedBackQuery('')

    const { data: empData, refetch : refetchEmployeeData, isFetching : employeeDataIsFetching } = useGetEmployeeAppraisalQuery(employee_id)
    const { data: ratingData } = useGetRatingScaleQuery('')

    const [updateMutation, isLoading] = useUpdateEmployeeAppraisalMutation()

    //reviewer justifications
    const [reviewerOtherRecommendationComments, setReviewerOtherRecommendationComments] = useState<any>("");
    const [reviewerTrainingRecommendationComments, setReviewerTrainingRecommendationComments] = useState<any>("");
    const [reviewerOverallFeedComments, setReviewerOverallFeedComments] = useState<any>("");
    const [reviewerAreaImprovementComments, setReviewerAreaImprovementComments] = useState<any>("");
       const [reviewerComments, setReviewerComments] = useState<any>("");
    const [moveTab, setMoveTab] = useState(false)
    const [value1, setValue1] = useState()

    const [appraiserTrainingRecommendation, setAppraiserTrainingRecommendation] = useState<any>([])
    const [appraiserOtherRecommendation, setAppraiserOtherRecommendation] = useState<any>([])
    const [OtherRecommendationothers, setOtherRecommendationothers] = useState<any>([])

    const [appraiserFeedback, setAppraiserFeedback] = useState<any>([])
    const [appraiserOverallFeedback, setAppraiserOverallFeedback] = useState<any>([])
    const [normalizerOverallFeedback, setNormalizerOverallFeedback] = useState<any>([])

    const [appraiserAreaOfImprovement, setAppraiserAreaOfImprovement] = useState<any>([])
    const [otherRecommendation, setOtherRecommendation] = useState<any>([])
    const [trainingSelectValue, setTrainingSelectValue] = useState<any>([])
    const [trainingRecommendation, setTrainingRecommendation] = useState<any>([])
    const [trainingRecommendationFormValues, setTrainingRecommendationFormValues] = useState<any>([])
    const [objectiveType, setObjectiveType] = useState<any>([])
    const [objectiveDescription, setObjectiveDescription] = useState<any>([])
    const [overAllRating, setOverAllRating] = useState<any>(0)
    const [currentOverAllRating, setCurrentOverAllRating] = useState<any>(0)
    const [currentObjectiveDescription, setCurrentObjectiveDescription] = useState<any>([])
    const [currentObjectiveType, setCurrentObjectiveType] = useState<any>([])
    const [overallFeed, setOverallFeed] = useState<any>([])
    const [appraiserOverallFeedComments, setappraiserOverallFeedComments] = useState<any>("");
    const [reviewedOverallFeedback, setReviewedOverallFeedback] = useState(false)
    const {data: emailData } = useGetEmailIdsQuery({appraiser_code : empData?.data?.appraiser_code,reviewer_code : empData?.data?.reviewer_code, normalizer_code: empData?.data?.normalizer_code})
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
    const [ disableTextAfterSubmission , setDisableTextAfterSubmission] = useState(false)
    const [disableButtons , setDisableButtons] = useState(false)


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

    useEffect(() => {
        if (empData) {
            setObjectiveType(empData.data.reviewer.objective_type);            
        }
    }, [empData])


    useEffect(() => {
        if (empData) {

            setOtherRecommendation(() => {
                const checked = empData.data.reviewer.other_recommendation.map((i: any) => {
                    console.log(empData, 'empData')
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
                return empData.data.reviewer.training_recommendation
            })
            setReviewerTrainingRecommendationComments(() => {
                return empData.data.reviewer.training_recommendation_comments
            })
            setReviewerOtherRecommendationComments(() => {
                return empData.data.reviewer.other_recommendation_comments
            })
            setReviewerOverallFeedComments(() => {
                return empData.data.reviewer.reviewer_overall_feedback
            })
            setReviewerAreaImprovementComments(() => {
                return empData.data.reviewer.area_of_improvement_comments
            })
            setReviewerComments(() => {
                return empData.data.reviewer.reviewer_comments_draft
            })
            setAppraiserTrainingRecommendation(() => {
                return empData.data.appraisal.training_recommendation
            })
            setAppraiserOtherRecommendation(() => {
                return empData.data.appraisal.other_recommendation
            })
            setAppraiserFeedback(() => {
                return empData.data.appraisal.feedback_questions
            })
            setAppraiserOverallFeedback(() => {
                return empData.data.appraisal.appraiser_overall_feedback
            })
            setNormalizerOverallFeedback(() => {
                return empData.data.normalizer.normalizer_overall_feedback
            })
            setAppraiserAreaOfImprovement(() => {
                return empData.data.appraisal.area_of_improvement
            })
            setappraiserOverallFeedComments(() => {
                return empData.data.appraisal.appraiser_rejection_reason
            })
            setOtherRecommendationothers(() => {
                return empData.data.appraisal.other_recommendation_others
            })
            setDisableTextAfterSubmission(!empData?.data?.appraisal?.pa_status?.includes("Pending with Reviewer"))

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

            setObjectiveDescription(empData?.data?.reviewer?.objective_description.map((j: any) => {
                return {
                    ...j,
                    objective_type: getObjectiveTypeValue(j?.name?.objective_type)

                }
            }))           

            setCurrentObjectiveDescription(empData?.data?.current_rating?.objective_description.map((j: any) => {
               
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
    //             // console.log(i.objective_type, 'objective_type')
    //             const sum = (i.value * i.objective_type) / 10000
    //             const newSum = sum * i?.ratings?.rating
    //             // console.log(sum, 'newSum')
    //             return newSum
    //             // }


    //         });
    //         console.log(_.sum(objectiveDescriptionMapped), 'objectiveDescriptionMapped')
    //         setOverAllRating(() => {
    //             return _.sum(objectiveDescriptionMapped).toFixed(2)
    //         });
    //     }

    // }, [objectiveDescription, empData])

    useEffect(() => {
        if (currentObjectiveDescription.length > 0 && empData) {
            const currentObjectiveDescriptionMapped = currentObjectiveDescription.map((i: any) => {
                // if (i.ratings) {
                // console.log(i.objective_type, 'objective_type')
                const sum = (i.value * i.objective_type) / 10000
                const newSum = sum * i?.ratings?.rating
                // console.log(sum, 'newSum')
                return newSum
                // }


            })
          
            setCurrentOverAllRating(() => {
                return _.sum(currentObjectiveDescriptionMapped).toFixed(2)
            });

        }
    }, [currentObjectiveDescription, empData])

    useEffect(() => {
        if (empData) {
            setarea(empData.data.reviewer.area_of_improvement)
            // console.log(empData.data.appraisal.area_of_improvement, 'areaImprovement')
        }


    }, [empData])

    // useEffect(() => {
    //     if (overAllRating) {
    //         updateMutation({
    //             "reviewer.reviewer_rating": overAllRating,
    //             id: employee_id
    //         })
    //     }
    // }, [ overAllRating])

    useEffect(() => {
        if (currentOverAllRating) {
            updateMutation({
                "current_rating.overall_rating": currentOverAllRating,
                id: employee_id
            })
        }
    }, [ currentOverAllRating])

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
        appraiserFeedback,
        setAppraiserFeedback,
        areaImprovement,
        setAreaImprovement,
        appraiserAreaOfImprovement,
        setAppraiserAreaOfImprovement,
        isLoading,
        area, setarea,
        overallFeed,
        setOverallFeed,
        empData,
        ratingData,
        reviewerOverallFeedComments,
        setReviewerOverallFeedComments,
        reviewerAreaImprovementComments,
        setReviewerAreaImprovementComments,
        reviewerComments,
        setReviewerComments,
        reviewerOtherRecommendationComments,
        setReviewerOtherRecommendationComments,
        reviewerTrainingRecommendationComments,
        setReviewerTrainingRecommendationComments,
        appraiserOverallFeedback,
        setAppraiserOverallFeedback,
        normalizerOverallFeedback,
        setNormalizerOverallFeedback,
        moveTab,
        setMoveTab,
        value1,
        setValue1,
        employeeDataIsFetching,
        reviewedOverallFeedback,
        setReviewedOverallFeedback,
        emailData,
        refetchEmployeeData,
        setappraiserOverallFeedComments,
        appraiserOverallFeedComments,
        OtherRecommendationothers,
        setOtherRecommendationothers,
        disableTextAfterSubmission,
        disableButtons , 
        setDisableButtons

    }
}

export default function ProvidedReviewerContextProvider(props: any) {
    const data = useProvidedReviewerContext()
    const { children } = props
    return (
        // @ts-ignore
        <ReviewerContext.Provider value={data}>
            {children}
        </ReviewerContext.Provider>
    )

}
