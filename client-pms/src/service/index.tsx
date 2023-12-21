import {
    useDeleteObjectiveGroupMutation,
    useGetObjectiveGroupQuery,
    useCreateObjectiveGroupMutation,
    useUpdateObjectiveGroupMutation
} from "./Objective/ObjectiveGroup";
import {
    useUpdateObjectiveTypeMutation,
    useCreateObjectiveTypeMutation,
    useDeleteObjectiveTypeMutation,
    useGetObjectiveTypeQuery
} from "./Objective/ObjectoveType";

import {
    useCreateObjectiveTitleMutation,
    useGetObjectiveTitleQuery,
    useDeleteObjectiveTitleMutation,
    useUpdateObjectiveTitleMutation
} from './Objective/ObjectiveTitle'


import {
    useDeleteObjectiveDescriptionMutation,
    useGetObjectiveDescriptionQuery,
    useCreateObjectiveDescriptionMutation,
    useUpdateObjectiveDescriptionMutation,
    useGetSingleObjectiveDescriptionQuery
} from "./Objective/ObjectiveDescription";


import {
    useDeleteTrainingRecommendationMutation,
    useCreateOtherRecommendationMutation,
    useCreateTrainingRecommendationMutation,
    useDeleteOtherRecommendationMutation,
    useGetOtherRecommendationQuery,
    useEditOtherRecommendationMutation,
    useGetSingleOtherRecommendationQuery,
    useGetTrainingRecommendationQuery,
    useUpdateTrainingRecommendationMutation,
    useGetSingleTrainingRecommendationQuery
} from './recommendation/recommendation'

import {
    useCreateRatingsMutation,
    useGetRatingsQuery,
    useDeleteRatingsMutation,
    useGetRatingScaleQuery,
    useGetSingleRatingQuery,
    useUpdateRatingMutation,
    useAddRatingScaleValidationMutation
} from "./ratings/ratings";

import {
    useCreateTemplateMutation,
    useGetTemplateQuery,
    useDeleteTemplateMutation,
    useAddWeightageMutation,
    useGetSingleTemplateQuery,
    useCreatePositionTemplateMutation,
    useEditTemplateMutation,
    useAddCalendarMutation,
    useFilterTemplateQuery
} from './template/template'

import {
    useGetEmployeeQuery,
    useGetEmployeeByStatusQuery,
    useGetAllAppraiserStatusQuery,
    useGetAllNormalizerStatusQuery,
    useGetAllReviewerStatusQuery,
    useGetEmployeeByFilterQuery,
    useGetEmployeeUnmappedQuery,
    useGetReviewerEmployeeByFilterQuery
} from './employee/employee'

import {

    useGetEmployeeAppraisalQuery,
    useCreateEmployeeAppraisalMutation,
    useUpdateEmployeeAppraisalMutation,
    useStartEmployeeAppraisalMutation,
    useAcceptAppraisalEmployeeMutation,
    useAcceptNormalizerMutation,
    useAcceptReviewerMutation,
    useRejectReviewerAppraisalEmployeeMutation,

    useRejectNormalizerAppraisalEmployeeMutation,

    useReviewerRejectionMutation,
    useNormalizerRejectionMutation,
    useAppraiserAcceptNormalizerMutation,
    useAppraiserAcceptReviewerMutation,
    useEmployeeRejectionMutation,
    useEmployeeRejectSaveMutation,
    useNormalizerAcceptEmployeeMutation,
    useNormalizerRejectEmployeeMutation,
    useAppraiserAcceptsEmployeeMutation,
    useAppraiserRejectsEmployeeMutation,
    useNormalizerSubmitEmployeeRejectionMutation,
    useAttachmentsAppraiserMutation,
    useCalculateRatingsMutation,
    useAttachmentsNormalizerMutation,
    useAttachmentsReviewerMutation,
    useAttachmentsEmployeeMutation,
    useGetEmployeeByManagerCodeQuery,
    useAttachmentsAppraiserDeleteMutation,
    useAttachmentsReviewerDeleteMutation,
    useAttachmentsNormalizerDeleteMutation,
    useAttachmentsEmployeeDeleteMutation,
    useAttachmentsAppraiserOverviewDeleteMutation

} from './employee/appraisal/appraisal'
import
{
    useGetCalenderQuery,
    useCreateCalenderMutation,
    useDeleteCalenderMutation,
    useUpdateCalendarMutation,
    useGetSingleCalenderQuery
} from './calender/Calender'

import {
    useGetFeedBackQuery,
    useDeleteFeedBackMutation,
    useUpdateFeedBackMutation,
    useGetSingleFeedBackQuery
} from './feedBackQuestionnaire/FeedBackQuestionnaire'

import {
    useGetAppraisalCalenderQuery,
    useDeleteAppraisalCalenderMutation,
    useStartAppraisalCalenderMutation,
    useAddEmpolyeAppraisalCalenderMutation,
    useGetSiAppraisalCalenderQuery,
    useRemoveEmpolyeAppraisalCalenderMutation,
    useAppraisalCalenderFiltersQuery,
    useAppraisalCalendarLaunchValidationMutation
} from "./appraisalCalender/AppraisalCalender";

import {
    useUpdateNineBoxMutation,
    useGetNineboxQuery

} from  "./ninebox/ninebox"


export {
    useDeleteObjectiveGroupMutation,
    useCreateObjectiveGroupMutation,
    useGetObjectiveGroupQuery,
    useCreateObjectiveTypeMutation,
    useUpdateObjectiveTypeMutation,
    useDeleteObjectiveTypeMutation,
    useGetObjectiveTypeQuery,
    useCreateObjectiveDescriptionMutation,
    useUpdateObjectiveDescriptionMutation,
    useGetObjectiveDescriptionQuery,
    useDeleteObjectiveDescriptionMutation,
    useDeleteTrainingRecommendationMutation,
    useGetSingleOtherRecommendationQuery,
    useGetTrainingRecommendationQuery,
    useGetRatingsQuery,
    useGetRatingScaleQuery,
    useGetOtherRecommendationQuery,
    useEditOtherRecommendationMutation,
    useDeleteRatingsMutation,
    useGetSingleRatingQuery,
    useCreateTrainingRecommendationMutation,
    useDeleteOtherRecommendationMutation,
    useCreateOtherRecommendationMutation,
    useCreateRatingsMutation,
    useGetSingleTrainingRecommendationQuery,
    useUpdateTrainingRecommendationMutation,
    useUpdateRatingMutation,
    useCreateTemplateMutation,
    useGetTemplateQuery,
    useFilterTemplateQuery,
    useDeleteTemplateMutation,
    useGetSingleTemplateQuery,
    useCreatePositionTemplateMutation,
    useAddWeightageMutation,
    useGetEmployeeQuery,

    useCreateEmployeeAppraisalMutation,
    useGetEmployeeAppraisalQuery,

    useGetCalenderQuery,
    useGetFeedBackQuery,
    useDeleteFeedBackMutation,
    useGetEmployeeByStatusQuery,
    useGetAllAppraiserStatusQuery,
    useGetAllNormalizerStatusQuery,
    useGetAllReviewerStatusQuery,
    useCreateCalenderMutation,
    useDeleteCalenderMutation,
    useUpdateCalendarMutation,
    useUpdateFeedBackMutation,
    useGetSingleCalenderQuery,
    useGetSingleFeedBackQuery,
    useGetAppraisalCalenderQuery,
    useDeleteAppraisalCalenderMutation,
    useUpdateObjectiveGroupMutation,
    useStartAppraisalCalenderMutation,
    useGetSingleObjectiveDescriptionQuery,
    useEditTemplateMutation,
    useUpdateEmployeeAppraisalMutation,
    useStartEmployeeAppraisalMutation,
    useAcceptNormalizerMutation,
    useAcceptAppraisalEmployeeMutation,
    useAcceptReviewerMutation,
    useRejectReviewerAppraisalEmployeeMutation,
    useRejectNormalizerAppraisalEmployeeMutation,
    useReviewerRejectionMutation,
    useNormalizerRejectionMutation,
    useUpdateObjectiveTitleMutation,
    useGetObjectiveTitleQuery,
    useDeleteObjectiveTitleMutation,
    useCreateObjectiveTitleMutation,
    useAddRatingScaleValidationMutation,
    useAddCalendarMutation,
    useGetEmployeeByFilterQuery,
    useGetReviewerEmployeeByFilterQuery,
    useEmployeeRejectionMutation,
    useNormalizerRejectEmployeeMutation,
    useNormalizerAcceptEmployeeMutation,
    useEmployeeRejectSaveMutation,
    useAppraiserRejectsEmployeeMutation,
    useAppraiserAcceptsEmployeeMutation,
    useNormalizerSubmitEmployeeRejectionMutation,
    useAttachmentsAppraiserMutation,
    useCalculateRatingsMutation,
    useAttachmentsNormalizerMutation,
    useAttachmentsReviewerMutation,
    useAttachmentsEmployeeMutation,
    useGetEmployeeByManagerCodeQuery,
    useAddEmpolyeAppraisalCalenderMutation,
    useGetEmployeeUnmappedQuery,
    useGetSiAppraisalCalenderQuery,
    useRemoveEmpolyeAppraisalCalenderMutation,
    useAppraisalCalenderFiltersQuery,
    useAttachmentsAppraiserDeleteMutation,
    useAttachmentsReviewerDeleteMutation,
    useAttachmentsNormalizerDeleteMutation,
    useAttachmentsEmployeeDeleteMutation,
    useAttachmentsAppraiserOverviewDeleteMutation,
    useAppraisalCalendarLaunchValidationMutation
};
