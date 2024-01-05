const LOGIN = "/login";
const CALENDER = "/calender";
const CALENDER_VIEWPAGE ='/calendar-view-page'
const CALENDER_UPDATE_PAGE =  "/calender/:id"
const ADD_EMPLOYEE = "/add-employee";
const ADD_OBJECTIVE_DESCRIPTION = "/objective/add-objective-description";
const EDIT_OBJECTIVE_DESCRIPTION = "/objective/edit-objective-description";
const MASTER_NAV = "/dash";
const RATING_SCALE_DESCRIPTION = "/ratingScaleDescription";
const VIEW_OBJECTIVE_DESCRIPTION = "/objective/get-objective-description";
const REGISTER = "/register";
const DASHBOARD = "/dashboard";
const FORGOT_PASSWORD = "/forgot-password";
const VERIFY = "/user/verify-email";
const RESET_PASSWORD = "/user/reset-password";
const OBJECTIVE = "/objective";
const OTHER_RECOMMENDATION_PAGE = "/otherRecommendationPage";
const OTHER_RECOMMENDATION_EDIT_PAGE = "/otherRecommendationPage/:id";
const RATING_SCALE_DESCRIPTION_VIEW_PAGE = "/rating-scale-description-ViewList";
const TRAINING_RECOMMENDATION_PAGE = "/training/training-recommendation";
const TRAINING_VIEW = "/training/view-training-recommendation";
const OTHER_RECOMMENDATION_VIEW_PAGE = "/training/view-other-recommendation";
const RATING_UPDATE_PAGE = "/ratings-page/:id";
const RATINGS_PAGE = "/ratings-page";
const TRAINING_RECOMMENDATION_UPDATE_PAGE = "/training/training-recommendation/:id"
const CREATE_TEMPLATE = '/template/create-template';
const VIEW_TEMPLATE = '/template/view-template';
const CREATE_MAPPING = '/template/create-template-mapping';
const CREATE_CALENDER = '/calender/create-calender';
const RATING_SCALE_DESCRIPTION_UPDATE_PAGE = '/ratingScaleDescription/:id';
const DASHBOARDM = '/dashboard-m';
const FEEDBACK_QUESTIONNAIRE = '/feedback-questionnaire'
const FEEDBACK_QUESTIONNAIRE_VIEW_lIST= '/feedback-questionnaire-viewlist'
const FEEDBACK_QUESTIONNAIRE_UPDATE_PAGE = '/feedback-questionnaire/:id'
const MANAGER = '/manager-appraisal';
const CREATE_APPRAISAL = '/appraisal/create-appraisal';
const MIDYEAR_PERFORMANCE = "/midyearperformanceappraisal/midyear-performance";
const MIDYEAR_PERFORMANCE_REJECTED = "/midyearperformanceappraisal/midyear-performance/Rejected";
const MIDYEAR_CHECKBOX = "/midyearperformanceappraisal/midyear-checkbox";
const MIDYEAR_REJECT_RATING = "/midyearperformanceappraisal/midyear-reject-rating";
const MIDYEAR_PA_REPORT = "/midyearperformanceappraisal/midyear-pa-report";
const PREVIOUS_PA_REPORT = "/midyearperformanceappraisal/previous-pa-report";
const MIDYEAR_REJECT_SAVE = "/midyearperformanceappraisal/midyear-reject-save";
const MIDYEAR_SUCCESS = "/midyearperformanceappraisal/midyear-success"
const EDIT_TEMPLATE = '/template/edit-template';
const REVIEWER_PAGE = '/appraisal/appraiser-reviewer'
const NORMALIZER_PAGE = '/appraisal/appraiser-normalizer'
const EMPLOYEE_NORMALIZER_PAGE = '/appraisal/employee-normalizer'
const EDIT_VIEW_TEMPLATE = '/template/ed    it-template-view'
const REVIEWER = '/reviewer'
const NORMALIZER = '/normalizer'
const VIEW_ALL = "/objective1/view-all";
const EDIT_VIEW_ALL = "/objective1/editview-all";
const ADD_OBJECTIVE_DESCRIPTION_1="/objective1/Addobjectivedescription1";
const VIEW_OBJECTIVE_DESCRIPTION_1="/objective1/Viewobjectivedescription1";
const ADD_LEVEL="/objective1/AddLevel";
const EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT="/objective1/EditviewobjectivedescriptionEdit";
const LEVELS_VIEW_ALL = "/objective1/Levels-view-all";
const LEVELS_VIEW_ALL_EDIT = "/objective1/Levels-view-all-edit";
const OBJECTIVE_VIEW_BUTTON = "/objective1/objective-view-button";
const LINK_CALENDAR = "/objective1/Link-Calendar";
const VIEW_CALENDAR_MAPPING = "/objective1/view-calendar-mapping";
const EDIT_CALENDAR_MAPPING = "/objective1/edit-calendar-mapping";
const CREATE_MAPPING_NEW = '/template/create-mapping-new';
const CREATE_TEMPLATE_1 = '/template/create-template-1';
const EDIT_TEMPLATE_1 = '/template/edit-template-1';
const OBJECTIVE_MASTER = "/objective1/Objective-Master";
const FEEDBACK = '/template/feedback';
const CREATE_MAPPING_SAVE = '/template/create-mapping-save';
const LINK_CALENDAR_OPEN = "/objective1/link-calendar-open";
const LINK_CALENDAR_SAVE = "/objective1/link-calendar-save";
const LINK_CALENDAR_FILTER = "/objective1/link-calendar-filter";
const LOGIN_PAGE = '/ui/login-page';
const LOGIN_ROLE_SELECTION_PAGE = "/"
const MAPPED_TEMPLATE_1 = '/template/mapped-template-1';
const MAPPED_TEMPLATE_2 = '/template/mapped-template-2';
const MAPPED_TEMPLATE_3 = '/template/mapped-template-3';
const VIEW_MAPPED_EMPLOYEE = '/template/view-mapped-employee';
const MAPPED_TEMPLATE_EDIT = '/template/mapped-template-edit';
const VIEW_MAPPED_TEMPLATE = '/template/edit-mapped-template'
const FILTERED_TEMPLATES = '/template/Filtered-templates';
const FILTERED_TEMPLATES_SINGLE = '/template/Filtered-templates-single';
const BOX_GRID = "/nineBox/Box-Grid";
const NINE_BOX = "/dashboard/appraiser/nine-box";
const REVIEWER_NINE_BOX = "/dashboard/reviewer/nine-box";
const NORMALIZER_NINE_BOX = "/dashboard/normalizer/nine-box";
const EMPLOYEE_COMPLETE = '/template/employee-complete';
const VIEW_EMPLOYEE_LIST = '/viewEmployees'
const EMPLOYEE_LANDING = '/employeeperformance/employee-landing'
const EMPLOYEE_DOWNLOAD = '/employeeperformance/employee-download'
const EMPLOYEE_REJECTS = '/employeeperformance/employee-rejects'
const EMPLOYEE_SELFRATING = '/employeeperformance/employee-selfrating'
const NORMALIZER_ACTION = '/employeeperformance/normalizer-action'
const VIEW_PA = '/employeeperformance/ViewPA'
const APPRAISER_VIEW_PA = '/employeeperformance/appraiser/ViewPA'
const REVIEWER_VIEW_PA = '/employeeperformance/reviewer/ViewPA'
const NORMALIZER_VIEW_PA = '/employeeperformance/normalizer/ViewPA'
const PREVIOUSAPPRAISAL_VIEWPA ='/closedcalendarappraiser/previousappraisalViewpa'
const OBJECTIVE_PREVIEW  = `/objective-preview`
const OBJECTIVE_PREVIEW_FROM_VIEW_TEMPLATE  = `/objective-preview/from/view-template`
const TEAMAPPROVE = '/reviewerMain/performanceratingchart/teamApprove'
const APPRAISAL_NOT_COMPLETED = '/employeeperformance/appraisal-notcompleted'
const APPRAISAL_NOT_STARTED = '/employeeperformance/appraisal-notStarted'
const VIEW_PAST_PA ='/reviewer/Dashboard/teamtablereview/viewpastpa'
const VIEW_PREVIOUS_PA ='/reviewer/Dashboard/teamtablereview/viewpreviouspa'
const VIEW_PREVIOUS_PAA ='/reviewer/Dashboard/teamtablereview/viewpreviouspaa'
const PA_DASHBOARD = `/PA_Dashboard`
const CEO_ROLE = `/CeoRole`
const EXCEPTION_HANDLING ='/components/exceptionhandling'
const REVIEWER_APPROVE_APPRAISER_EMPLOYEEREJECTION = '/reviewer/accept/appraiser/employeeRejection'
const REVIEWER_REJECT_APPRAISER_EMPLOYEEREJECTION = '/reviewer/reject/appraiser/employeeRejection'
const REVIEWER_REJECT_APPRAISER_NORMALIZER_REJECTION = '/reviewer/reject/appraiser/normalizerRejection'
const REVIEWER_ACCEPT_APPRAISER_NORMALIZER_REJECTION = '/reviewer/accept/appraiser/normalizerRejection'
const CALENDAR_VIEW = '/calendar'
const CALENDAR_READONLY ='/calenderreadonly'
const MY_ACTION ='/myactionfortest'
const OVERALLDASHBOARD_EXPANDTABLE = '/overalldashboardexpandtable'
// const OverallDashboardPAadminoverall
const OVERALL_DASHBOARD_PAADMIN ='/OverallDashboardPAadminoverall';
const EMPLOYEE_PREVIOUS_PAs = '/Employee/PreviousAppraisals';
const EMPLOYEE_PREVIOUS_PA_NO_CALENDAR = '/Employee/PreviousAppraisals/CalendarNotSelected';
const UNMAPPED_EMPLOYEES = '/unmappedEmployees'



/** Appraiser constants */
const APPRAISER = '/appraisal/appraiser-overview';
const APPRAISER_SUBMISSION = '/appraiser/submission';
const EMPLOYEE_APPRAISER_SUBMISSION = '/employeeperformance/appraiser-action'

/** Appraiser constants */

/**Reviewer constants */
const REVIEWER_APPROVE = '/reviewerMain/Approve/ReviewerApprove'
const REVIEWER_REJECTION = '/reviewerMain/reviewerRejection'
/**Reviewer constants */

/**Normalizer constants */
const NORMALIZER_APPROVE = '/normalizer/Approve/NormalizerApprove'
const NORMALIZER_REJECTION = '/normalizer/rejection/NormalizerRejection'
/**Normalizer constants */
const REMINDER_NOTIFICATION = '/PaMaster/remainderNotification'

export {
    LOGIN,
    CALENDER,
    ADD_EMPLOYEE,
    ADD_OBJECTIVE_DESCRIPTION,
    MASTER_NAV,
    RATING_SCALE_DESCRIPTION,
    VIEW_OBJECTIVE_DESCRIPTION,
    REGISTER,
    DASHBOARD,
    FORGOT_PASSWORD,
    VERIFY,
    RESET_PASSWORD,
    OBJECTIVE,
    OTHER_RECOMMENDATION_PAGE,
    OTHER_RECOMMENDATION_EDIT_PAGE,
    RATING_SCALE_DESCRIPTION_VIEW_PAGE,
    TRAINING_RECOMMENDATION_PAGE,
    TRAINING_VIEW,
    OTHER_RECOMMENDATION_VIEW_PAGE,
    RATING_UPDATE_PAGE,
    RATINGS_PAGE,
    TRAINING_RECOMMENDATION_UPDATE_PAGE,
    CREATE_TEMPLATE,
    CREATE_MAPPING,
    CREATE_CALENDER,
    VIEW_TEMPLATE,
    RATING_SCALE_DESCRIPTION_UPDATE_PAGE,
    MANAGER,
    CREATE_APPRAISAL,
    DASHBOARDM,
    APPRAISER,
    FEEDBACK_QUESTIONNAIRE,
    FEEDBACK_QUESTIONNAIRE_VIEW_lIST,
    CALENDER_VIEWPAGE,
    MIDYEAR_PERFORMANCE,
    MIDYEAR_CHECKBOX,
    MIDYEAR_REJECT_RATING,
    MIDYEAR_PA_REPORT,
    PREVIOUS_PA_REPORT,
    MIDYEAR_REJECT_SAVE,
    MIDYEAR_SUCCESS,
    CALENDER_UPDATE_PAGE,
    FEEDBACK_QUESTIONNAIRE_UPDATE_PAGE,
    EDIT_TEMPLATE,
    EDIT_OBJECTIVE_DESCRIPTION,
    REVIEWER_PAGE,
    EDIT_VIEW_TEMPLATE,
    REVIEWER,
    NORMALIZER,
    NORMALIZER_PAGE,
    EMPLOYEE_NORMALIZER_PAGE,
    VIEW_ALL,
    EDIT_VIEW_ALL,
    ADD_OBJECTIVE_DESCRIPTION_1,
    VIEW_OBJECTIVE_DESCRIPTION_1,
    ADD_LEVEL as ADD_LEVEL, 
    LEVELS_VIEW_ALL,
    LEVELS_VIEW_ALL_EDIT,
    OBJECTIVE_VIEW_BUTTON,
    EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT,
    LINK_CALENDAR,
    CREATE_MAPPING_NEW,
    CREATE_TEMPLATE_1,
    EDIT_TEMPLATE_1,
    OBJECTIVE_MASTER,
    FEEDBACK,
    CREATE_MAPPING_SAVE,
    LINK_CALENDAR_OPEN,
    LINK_CALENDAR_SAVE,
    LINK_CALENDAR_FILTER,
    LOGIN_PAGE,
    LOGIN_ROLE_SELECTION_PAGE,
    MAPPED_TEMPLATE_1,
    MAPPED_TEMPLATE_2,
    MAPPED_TEMPLATE_3,
    VIEW_MAPPED_EMPLOYEE,
    MAPPED_TEMPLATE_EDIT,
    BOX_GRID,
    NINE_BOX,
    REVIEWER_NINE_BOX,
    NORMALIZER_NINE_BOX,
    EMPLOYEE_COMPLETE,
    MIDYEAR_PERFORMANCE_REJECTED,
    VIEW_EMPLOYEE_LIST,
    FILTERED_TEMPLATES,
    FILTERED_TEMPLATES_SINGLE,
    EMPLOYEE_LANDING,
    EMPLOYEE_DOWNLOAD,
    EMPLOYEE_REJECTS,
    EMPLOYEE_SELFRATING,
    EMPLOYEE_APPRAISER_SUBMISSION,
    NORMALIZER_ACTION,
    VIEW_PA,
    APPRAISER_VIEW_PA,
    REVIEWER_VIEW_PA,
    NORMALIZER_VIEW_PA,
    APPRAISAL_NOT_COMPLETED,
    VIEW_MAPPED_TEMPLATE,
    VIEW_PAST_PA,
    VIEW_PREVIOUS_PA,
    VIEW_PREVIOUS_PAA,
    TEAMAPPROVE,
    REVIEWER_APPROVE,
    NORMALIZER_APPROVE,
    VIEW_CALENDAR_MAPPING,
    EDIT_CALENDAR_MAPPING,
    APPRAISAL_NOT_STARTED,
    PA_DASHBOARD,
    CEO_ROLE,
    OBJECTIVE_PREVIEW,
    OBJECTIVE_PREVIEW_FROM_VIEW_TEMPLATE,
    EXCEPTION_HANDLING,
    REVIEWER_APPROVE_APPRAISER_EMPLOYEEREJECTION,
    REVIEWER_REJECT_APPRAISER_EMPLOYEEREJECTION,
    REVIEWER_REJECT_APPRAISER_NORMALIZER_REJECTION,
    CALENDAR_VIEW,
    CALENDAR_READONLY,
    REVIEWER_ACCEPT_APPRAISER_NORMALIZER_REJECTION,
    OVERALL_DASHBOARD_PAADMIN,
    MY_ACTION,
    OVERALLDASHBOARD_EXPANDTABLE,
    PREVIOUSAPPRAISAL_VIEWPA,
    EMPLOYEE_PREVIOUS_PAs,
    UNMAPPED_EMPLOYEES,
    EMPLOYEE_PREVIOUS_PA_NO_CALENDAR,
    REVIEWER_REJECTION,
    NORMALIZER_REJECTION,
    APPRAISER_SUBMISSION,
    REMINDER_NOTIFICATION
};


