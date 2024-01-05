import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { MsalProvider } from '@azure/msal-react'
import ProvideAppContext from './context/AppContext';
import EmployeeRejection from './components/homepage/MyTeamDashboardComponents/EmployeeRejection';
import { IPublicClientApplication } from '@azure/msal-browser';
import "./App.css";
import Loader from "./components/Loader/Loader";
import {
  ForgotPassword,
  Login,
  OtherRecommendationEditPage,
  OtherRecommendationPage,
  OtherRecommendationViewPage,
  RatingsPage,
  Register,
  ResetPassword,
  TrainingRecommendationPage,
  TrainingRecommendationUpdatePage,
  Verify,
  RatingUpdatePage,
  CreateTemplatePage,
  CreateMapping,
  ViewTemplate,
  RatingScaleDescriptionPage,
  // DashboardM,
  Appraiser,
  CalenderPage,
  FeedBackQuestionnairePage,
  FeedBackQuestionnaireViewPage,
  CalendarViewPage,
  CalendarUpdatePage,
  FeedBackQuestionnaireUpdatePage,
  CreateAppraisalCalender,
  ViewObjectiveDescription,
  EditTemplate,
  AddObjectiveDescription,
  EditObjectiveDescription,
  // ReviewerPage,
  EditViewTemplate,

} from "./pages";
import { Objective } from "./pages";
// import Dashboard from "./components/dashboard/Dashboard";

import {
  LOGIN,
  DASHBOARD,
  REGISTER,
  FORGOT_PASSWORD,
  VERIFY,
  RESET_PASSWORD,
  OBJECTIVE,
  ADD_OBJECTIVE_DESCRIPTION,
  VIEW_OBJECTIVE_DESCRIPTION,
  MASTER_NAV,
  CALENDER,
  ADD_EMPLOYEE,
  OTHER_RECOMMENDATION_PAGE,
  OTHER_RECOMMENDATION_EDIT_PAGE,
  RATING_SCALE_DESCRIPTION,
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
  CALENDER_UPDATE_PAGE,
  FEEDBACK_QUESTIONNAIRE_UPDATE_PAGE,
  MIDYEAR_REJECT_SAVE,
  MIDYEAR_SUCCESS,
  EDIT_TEMPLATE,
  EDIT_OBJECTIVE_DESCRIPTION,
  REVIEWER_PAGE,
  EDIT_VIEW_TEMPLATE,
  REVIEWER,
  REVIEWER_APPROVE,
  NORMALIZER,
  NORMALIZER_PAGE,
  EMPLOYEE_NORMALIZER_PAGE,
  VIEW_ALL,
  EDIT_VIEW_ALL,
  ADD_OBJECTIVE_DESCRIPTION_1,
  VIEW_OBJECTIVE_DESCRIPTION_1,
  ADD_LEVEL,
  LEVELS_VIEW_ALL,
  LEVELS_VIEW_ALL_EDIT,
  OBJECTIVE_VIEW_BUTTON,
  EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT,
  LINK_CALENDAR,
  CREATE_MAPPING_NEW,
  CREATE_TEMPLATE_1,
  OBJECTIVE_MASTER,
  EDIT_TEMPLATE_1,
  FEEDBACK,
  CREATE_MAPPING_SAVE,
  LINK_CALENDAR_OPEN,
  LINK_CALENDAR_SAVE,
  LINK_CALENDAR_FILTER,
  LOGIN_PAGE,
  MAPPED_TEMPLATE_1,
  MAPPED_TEMPLATE_2,
  MAPPED_TEMPLATE_3,
  MAPPED_TEMPLATE_EDIT,
  FILTERED_TEMPLATES,
  BOX_GRID,
  NINE_BOX,
  EMPLOYEE_COMPLETE,
  PREVIOUS_PA_REPORT,
  REVIEWER_NINE_BOX,
  NORMALIZER_NINE_BOX,
  MIDYEAR_PERFORMANCE_REJECTED,
  VIEW_EMPLOYEE_LIST,
  EMPLOYEE_LANDING,
  EMPLOYEE_DOWNLOAD,
  EMPLOYEE_REJECTS,
  EMPLOYEE_SELFRATING,
  EMPLOYEE_APPRAISER_SUBMISSION,
  NORMALIZER_ACTION,
  VIEW_PA,
  LOGIN_ROLE_SELECTION_PAGE,
  FILTERED_TEMPLATES_SINGLE,
  APPRAISAL_NOT_COMPLETED,
  VIEW_MAPPED_TEMPLATE,
  VIEW_PAST_PA,
  VIEW_PREVIOUS_PA,
  VIEW_PREVIOUS_PAA,
  TEAMAPPROVE,
  VIEW_MAPPED_EMPLOYEE,
  NORMALIZER_APPROVE,
  VIEW_CALENDAR_MAPPING,
  EDIT_CALENDAR_MAPPING,
  APPRAISAL_NOT_STARTED,
  PA_DASHBOARD,
  OBJECTIVE_PREVIEW,
  EXCEPTION_HANDLING,
  REVIEWER_APPROVE_APPRAISER_EMPLOYEEREJECTION,
  REVIEWER_REJECT_APPRAISER_EMPLOYEEREJECTION,
  REVIEWER_REJECT_APPRAISER_NORMALIZER_REJECTION,
  CALENDAR_VIEW,
  CALENDAR_READONLY,
  APPRAISER_VIEW_PA,
  REVIEWER_VIEW_PA,
  NORMALIZER_VIEW_PA,
  PREVIOUSAPPRAISAL_VIEWPA,
  REVIEWER_ACCEPT_APPRAISER_NORMALIZER_REJECTION,
  OVERALL_DASHBOARD_PAADMIN,
  MY_ACTION,
  OVERALLDASHBOARD_EXPANDTABLE,
  EMPLOYEE_PREVIOUS_PAs,
  OBJECTIVE_PREVIEW_FROM_VIEW_TEMPLATE,
  UNMAPPED_EMPLOYEES,
  EMPLOYEE_PREVIOUS_PA_NO_CALENDAR,
  REVIEWER_REJECTION,
  NORMALIZER_REJECTION,
  APPRAISER_SUBMISSION,
  CEO_ROLE,
  REMINDER_NOTIFICATION
} from "./constants/routes/Routing";
import CreateCalender from "./components/Template/PACalendar";
import ProtectedRoute from "./components/ProtectedRoute";
import AppraisalNotCompleted from "./components/appraisal/AppraisalNotCompleted";
import AppraisalNotStarted from "./components/appraisal/AppraisalNotStarted";
import MyTeam from "./components/homepage/MyTeamDashboardComponents/MyTeamTable/Appraiser/TeamTableAppraisermain";
import AppraiserDashboard from "./pages/dashboard/MyTeamDashboard/AppraiserDashboard";
import ReviewerDashboard from "./pages/dashboard/MyTeamDashboard/ReviewerDashboard";
import NormalizerDashboard from "./pages/dashboard/MyTeamDashboard/NormalizerDashboard";
import ExpandNineboxandSolidtalents from "./components/homepage/MyTeamDashboardComponents/NineBox/ExpandNineBoxandSolidtalents";
import ExpandteamtableClosed from "./components/homepage/PreviousDashboardComponents/MyTeamTable/ExpandteamtableClosed";
import MyteamtableExpandview from "./components/reviewer/Dashboard/teamtablereview/MyteamtableExpandview";
import ExceptionHandling from "./components/PaMaster/exceptionhandling/exceptionhandling";
import PaNotification from "./components/panotification/panotification";
import ExpandNineBoxandSolidtalentsReviewer from "./components/homepage/MyTeamDashboardComponents/NineBox/ExpandNineBoxandSolidtalentsReviewer";
import ExpandNineboxandSolidtalentsofClosedAppraiser from "./components/homepage/PreviousDashboardComponents/Ninebox/ExpandNineBoxandSolidtalentsofClosedAppraiser";
import ExpandNineBoxandSolidtalentsofClosedReviewer from "./components/homepage/PreviousDashboardComponents/Ninebox/ExpandNineBoxandSolidtalentsofClosedReviewer";
import TopPerformersExpandedReviewer from "./components/homepage/MyTeamDashboardComponents/TopPerformers/TopPerformersExpandedReviewer";
import TopPerformersExpandedNormalizer from "./components/homepage/MyTeamDashboardComponents/TopPerformers/TopPerformersExpandedNormalizer";
import ExpandNineBoxandSolidtalentsNormalizer from "./components/homepage/MyTeamDashboardComponents/NineBox/ExpandNineBoxandSolidtalentsNormalizer";
import ExpandedTeamTableofReviewer from "./components/reviewerMain/teamtablereview/ExpandedTeamTableofReviewer";
import ExpandedTeamTableofNormalizer from "./components/homepage/MyTeamDashboardComponents/MyTeamTable/Normalizer/ExpandedTeamTableofNormalizer";
import ExpandedTeamtableParentofNormalizer from "./components/homepage/MyTeamDashboardComponents/MyTeamTable/Normalizer/ExpandedTeamtableParentofNormalizer";
import ExpandedTeamtableParentofReviewer from "./components/reviewerMain/teamtablereview/ExpandedTeamtableParentofReviewer";
import NormalizerTeamTable from "./components/homepage/MyTeamDashboardComponents/MyTeamTable/Normalizer/TeamTableNormalizermain";
import FilteredTable from "./components/homepage/MyTeamDashboardComponents/GlobeChart/GlobeChartforAppraiser";
import FilteredTablemainofClosedAppraiser from "./components/homepage/PreviousDashboardComponents/GlobeCharts/GlobeChartforClosedAppraiser"
import FilteredTablemainofClosedReviewer from "./components/homepage/PreviousDashboardComponents/GlobeCharts/GlobeChartforClosedReviewer"
import FilteredtablemainReviewer from "./components/homepage/MyTeamDashboardComponents/GlobeChart/GlobeChartforReviewer";
import FilteredtablemainNormalizer from "./components/homepage/MyTeamDashboardComponents/GlobeChart/GlobeChartforNormalizer";
import AddEmployeefortest from "./components/employee/AddEmployeefortest";

import RoleException from "./components/PaMaster/exceptionhandling/RoleException";
import RoleExceptionWithMultipleEmp from "./components/PaMaster/exceptionhandling/RoleExceptionWithMultipleEmp";

import FilteredTableofAppraiserExpNineBoxClosed from "./components/homepage/PreviousDashboardComponents/Ninebox/FilteredTableofAppraiserExpNineboxClosed";
import FilteredTableofAppraiserExpNineBox from "./components/homepage/MyTeamDashboardComponents/NineBox/FilteredTableofAppraiserExpNineBox";
import FilteredTableofReviewerExpNineBox from "./components/homepage/MyTeamDashboardComponents/NineBox/FilteredTableofReviewerExpNineBox";
import FilteredTableofNormalizerExpNineBox from "./components/homepage/MyTeamDashboardComponents/NineBox/FilteredTableofNormalizerExpNineBox";

import EmployeeUpload from "./components/employeeupload/EmployeeUpload";
import FilteredtablemainofOverallDashboard from "./components/homepage/OverallDashboardComponents/GlobeChart/GlobeChartChildforOverallDashboard";
import FilteredtablemainReviewerofOverallDashboard from "./components/homepage/OverallDashboardComponents/GlobeChart/GlobeChartforRevieweroverallDashboard";
import FilteredtablemainNormalizerofOverallDashboard from "./components/homepage/OverallDashboardComponents/GlobeChart/GlobeChartforNormalizerOverallDashboard";
import ExpandNineBoxandSolidtalentsofOverallDashboard from "./components/homepage/OverallDashboardComponents/NineBox/ExpandNineBoxandSolidtalentsofOverallDashboard";
import ExpandNineBoxandSolidtalentsReviewerofOverallDashboard from "./components/homepage/OverallDashboardComponents/NineBox/ExpandNineBoxandSolidtalentsReviewerofOverallDashboard";
import ExpandNineBoxandSolidtalentsNormalizerofOverallDashboard from "./components/homepage/OverallDashboardComponents/NineBox/ExpandNineBoxandSolidtalentsNormalizerofOverallDashboard";
import AppraiserViewPA from "./components/appraisal/appraiser/AppraiserViewPA";
import ReviewerViewPA from "./components/appraisal/reviewer/ReviewerViewPA";
import NormalizerViewPA from "./components/appraisal/normalizer/NormalizerViewPA";
import RemainderNotificationParent from "./components/PaMaster/remainderNotification/RemainderNotificationParent"
import PreviousapraisalViewpa from "./components/appraisal/previousappraisalViewpa"
import OverallDashboardPAadminoverall from "./components/reviewer/Dashboard/teamtablereview/OverallDashboardExpandviewofPAadminoverall";
// import MyAction from"./components/reviewerMain/teamtablereview/MyActiontest";


import RoleExceptionforMultipleEmployee from "./components/PaMaster/exceptionhandling/RoleExceptionforMultipleEmployee";

import ClosedcalendarDashboardAppraiser from "./pages/dashboard/PreviousDashboard/ClosedcalendarDashboardAppraiser";
import ClosedcalendarDashboardReviewer from "./pages/dashboard/PreviousDashboard/ClosedcalendarDashboardReviewer";
import ClosedcalendarDashboardNormalizer from "./pages/dashboard/PreviousDashboard/ClosedcalendarDashboardNormalizer";

import NoliveCalendar from "./pages/dashboard/NoliveCalendar";
import FilteredTableofReviewerExpNineBoxClosed from "./components/homepage/PreviousDashboardComponents/Ninebox/FilteredTableofReviewerExpNineBoxClosed";
import FilteredtablemainforCharts from "./components/homepage/PreviousDashboardComponents/GlobeCharts/GlobeChartforClosedNormalizer";
import FilteredTableofPANineBox from "./components/homepage/PreviousDashboardComponents/Ninebox/FilteredTableofPANineBox";
import ExpandedNineBoxAndSolidTalents from "./components/homepage/PreviousDashboardComponents/Ninebox/ExpandedNineBoxAndSolidTalents";
import TopPerformersExpandedView from "./components/homepage/PreviousDashboardComponents/Topperformers/TopPerformersExpandedView";
import ObjectivePreviewTemplate from "./components/Template/Objectivepreviewtemplate";
import EmployeePreviousPAs from "./components/appraisal/EmployeePreviousPAs";
import EmployeelisttableForRoles from "./components/PaMaster/employeeMaster/EmployeelisttableForRoles";
import AddEmployeeRoles from "./components/PaMaster/employeeMaster/AddEmployeeRoles";
import ObjectivePreviewFromViewTemplate from "./components/Template/ObjectivePreviewFromViewTemplate";
import ViewExceptionHandling from "./components/viewExceptionhandling/exceptionhandling";
import EditEmployeeDetails from "./components/PaMaster/employeeMaster/EditEmployeeDetails";
import NoCalendarSelected from "./components/appraisal/EmployeePACalendarNotSelected";
import Employee_ReviewerAcceptance from "./pages/appraisal/reviewer/Employee_ReviewerAcceptance";
import Employee_ReviewerRejection from "./pages/appraisal/reviewer/Employee_ReviewerRejection";
import Employee_Appraiser_Submission from "./pages/appraisal/appraiser/Employee_Appraiser_Submission";
// import ViewTemplatePage from "./pages/template/ViewTemplate";

// import CreateMappingNew from "./components/Template/CreateMappingNew";
const MyAction = React.lazy(() => import('./components/reviewerMain/teamtablereview/MyActiontest'));
const OverallDashboardExpandViewofTable = React.lazy(() => import('./components/homepage/OverallDashboardComponents/MyTeamTable/OverallDashboardExpandViewofTable'));

const CreateMappingNew = React.lazy(() => import('./components/Template/CreateMappingNew'));

// import CreateTemplate1 from "./components/Template/CreateTemplate1";
const CreateTemplate1 = React.lazy(() => import('./components/Template/CreateTemplate1'));

// import ObjectiveMaster from "./components/objectiveSettings/ObjectiveMaster";
const ObjectiveMaster = React.lazy(() => import('./components/PaMaster/objectiveSettings/ObjectiveMaster'));

// import Feedback from "./components/Template/Feedback";
const Feedback = React.lazy(() => import('./components/Template/Feedback'));

// import CreateMappingSave from "./components/Template/CreateMappingSave";
const CreateMappingSave = React.lazy(() => import('./components/Template/CreateMappingSave'));

// import EditTemplate1 from "./components/Template/EditTemplate1";
const EditTemplate1 = React.lazy(() => import('./components/Template/EditTemplate1'));

// import LinkCalendarOpen from "./components/objectiveSettings/LinkCalendarOpen";
const LinkCalendarOpen = React.lazy(() => import('./components/PaMaster/objectiveSettings/LinkCalendarOpen'));

// import LinkCalendarSave from "./components/objectiveSettings/LinkCalendarSave";
const LinkCalendarSave = React.lazy(() => import('./components/PaMaster/objectiveSettings/LinkCalendarSave'));

// import LinkCalendarFilter from "./components/objectiveSettings/LinkCalendarFilter";
const LinkCalendarFilter = React.lazy(() => import('./components/PaMaster/objectiveSettings/LinkCalendarFilter'));

// import LoginPage from "./components/UI/LoginPage";
const LoginPage = React.lazy(() => import('./components/UI/LoginPage'));

// import MappedTemplate1 from "./components/Template_old/MappedTemplate1";
const MappedTemplate1 = React.lazy(() => import('./components/Template_old/MappedTemplate1'));

// import MappedTemplate2 from "./components/Template/ViewLinkedCalendars";
const MappedTemplate2 = React.lazy(() => import('./components/Template/ViewLinkedCalendars'));

// import MappedTemplate3 from "./components/Template/MappedTemplates";
const MappedTemplate3 = React.lazy(() => import('./components/Template/EmployeeMappingCreate'));

const ViewMappedEmployee = React.lazy(() => import('./components/Template/EmployeeMappingView'));

// import MappedTemplate3 from "./components/Template/MappedTemplates";
const ViewTemplateFromCalendar = React.lazy(() => import('./components/Template/EmployeeMappingEdit'));

// import BoxGrid from "./components/nineBox/BoxGrid";
const BoxGrid = React.lazy(() => import('./components/nineBox/BoxGrid'));


// import BoxGridEdit from "./components/nineBox/BoxGridEdit";
const BoxGridEdit = React.lazy(() => import('./components/nineBox/BoxGridEdit'));


// import NineBox from "./components/dashboard/NineBox";
const NineBox = React.lazy(() => import('./components/dashboard/NineBox'));

// import EmployeeComplete from "./components/Template/EmployeeComplete";
const EmployeeComplete = React.lazy(() => import('./components/Template/EmployeeComplete'));

// import MappedTemplateEdit from "./components/Template/MappedTemplateEdit";
const MappedTemplateEdit = React.lazy(() => import('./components/Template/MappedTemplateEdit'));

// import ReviewerNineBox from "./components/reviewerMain/NineBox";
const ReviewerNineBox = React.lazy(() => import('./components/reviewerMain/NineBox'));

// import NormalizerNineBox from "./components/normalizerMain/NineBox";
const NormalizerNineBox = React.lazy(() => import('./components/normalizerMain/NineBox'));

// import FilteredTemplates from "./components/Template/FilteredTemplates";

const FilteredTemplates = React.lazy(() => import('./components/Template/FilteredTemplates'));

// import FilteredTemplates from "./components/Template/FilteredTemplates";

const FilteredTemplatesSingle = React.lazy(() => import('./components/Template/FilteredTemplatesSingle'));

// import EmployeeLanding from "./components/employeePerformance/EmployeeLanding";
const EmployeeLanding = React.lazy(() => import('./components/appraisal/employee/EmployeeLanding'));

// import AzureBlob from "./AzureBlob";
const AzureBlob = React.lazy(() => import('./AzureBlob'));

// import EmployeeDownload from "./components/employeePerformance/EmployeeDownload";
const EmployeeDownload = React.lazy(() => import('./components/appraisal/employee/EmployeeViewPA'));


// import EmployeeRejects from "./components/employeePerformance/EmployeeRejects";
const EmployeeRejects = React.lazy(() => import('./components/appraisal/employee/EmployeeRejects'));


// import AppraiserActionforEmployee from "./components/employeePerformance/AppraiserActionforEmployee";
const AppraiserActionforEmployee = React.lazy(() => import('./components/appraisal/appraiser/employee_appraiser_submission/employee_appraiser_submission'));

// import NormalizerActionforEmployee from "./components/employeePerformance/NormalizerActionforEmployee";
const NormalizerActionforEmployee = React.lazy(() => import('./components/appraisal/normalizer/employee_normalizer_action/NormalizerActionforEmployee'));

const ObjectivePreview = React.lazy(() => import('./components/Template/ObjectivePreview'));

// import LoginRoleSelectionPage from "./components/UI/LoginRoleSelectionPage";
const LoginRoleSelectionPage = React.lazy(() => import('./components/UI/LoginRoleSelectionPage'));


const ViewTemplatePage = React.lazy(() => import('./pages/template/ViewTemplate'));


// import Manager from "./components/manager/AppraiserOverviewOld";
// import AppraiserOverViewPage from "./pages/dashboard/AppraiserOverviewPage";

// const AppraiserOverViewPage = React.lazy(() => import('./pages/dashboard/AppraiserOverviewPage'));
// import CalenderViewList from "./components/calender/CalenderViewList";
// import SolidTalents from "./components/solidTalents";
const SolidTalents = React.lazy(() => import('./components/solidTalents'));

// import MyTeamreviewer from "./components/Newreviewer/Myteamreviewer";
const MyTeamreviewer = React.lazy(() => import('./components/Newreviewer/Myteamreviewer'));

// import NormalizerMain from "./components/normalizerMain/Normalizer";
const NormalizerMain = React.lazy(() => import('./components/normalizerMain/Normalizer'));

// import NormalizerPage from "./pages/normalizer/NormalizerPage";
// const NormalizerPage = React.lazy(() => import('./pages/normalizer/NormalizerPage'));

// import EmployeeNormalizerPage from "./pages/EmployeeNormalizer/EmployeeNormalizerPage";
const EmployeeNormalizerPage = React.lazy(() => import('./pages/EmployeeNormalizer/EmployeeNormalizerPage'));

// import Objective1 from "./components/../pages/objective/Objective1";
const Objective1 = React.lazy(() => import('./components/../pages/objective/Objective1'));

// import AddObjectiveDescription1 from "./components/objective_old/AddObjectiveDescription1";
// import ViewObjectiveDescription1 from "./components/objective_old/ViewObjectiveDescription1";
const ViewObjectiveDescription1 = React.lazy(() => import('./components/objective_old/ViewObjectiveDescription1'));

// import AddLevel from "./components/objectiveSettings/AddLevel";
const AddLevel = React.lazy(() => import('./components/PaMaster/objectiveSettings/AddLevel'));

// import ViewAll from "./components/objective_old/Viewall";
const ViewAll = React.lazy(() => import('./components/objective_old/Viewall'));


// import EditViewall from "./components/objective_old/EditViewall";
const EditViewall = React.lazy(() => import('./components/objective_old/EditViewall'));


// import ObjectiveTitle from "./components/Template/ObjectiveTitle";
const ObjectiveTitle = React.lazy(() => import('./components/Template/ObjectiveTitle'));

// import Practice from "./components/Practice";
const Practice = React.lazy(() => import('./components/Practice'));

// import AppraiserPAreport from "./components/Newreviewer/midYearPAreport/MidyearPAreport";
const AppraiserPAreport = React.lazy(() => import('./components/Newreviewer/midYearPAreport/MidyearPAreport'));

// import ReviewerPAreport from "./components/reviewerMain/midYearPAreport/MidyearPAreport";

const ReviewerPAreport = React.lazy(() => import('./components/reviewerMain/midYearPAreport/MidyearPAreport'));

// import ReviewerRejection1 from "./components/manager/ReviewerRejection/ReviewerRejection1";
// import ReviewerRejectionPage from "./pages/reviewer/ReviewerRejection";
// import AppraiserRejectsReviewer from "./pages/appraisal/AppraiserRejectsReviewer";

// import AppraiserRejectsNormalizer from "./pages/appraisal/AppraiserRejectsNormalizer";

// import New from "./components/new/New";
// import Rating from "./components/manager/ReviewerRejection/Rating/Rating";

// import NormalRating from './components/manager/NormalizerRejection/Rating/NormalRating';
// import Levelsviewall from "./components/objectiveSettings/Levelsviewall";
const Levelsviewall = React.lazy(() => import('./components/PaMaster/objectiveSettings/Levelsviewall'));

// import Objectiveviewbutton from "./components/objectiveSettings/Objectiveviewbutton";
const Objectiveviewbutton = React.lazy(() => import('./components/PaMaster/objectiveSettings/Objectiveviewbutton'));


// import EditViewObjectiveDescriptionEdit from "./components/objectiveSettings/EditLevel";
const EditViewObjectiveDescriptionEdit = React.lazy(() => import('./components/PaMaster/objectiveSettings/EditLevel'));

// import Levelsviewalledit from "./components/objectiveSettings/Levelsviewalledit";
const Levelsviewalledit = React.lazy(() => import('./components/PaMaster/objectiveSettings/Levelsviewalledit'));


// import LinkCalendar from "./components/objectiveSettings/LinkCalendar";
const LinkCalendar = React.lazy(() => import('./components/PaMaster/objectiveSettings/CreateCalendarMapping'));
const ViewCalendarMapping = React.lazy(() => import('./components/PaMaster/objectiveSettings/ViewCalendarMapping'))
const EditCalendarMapping = React.lazy(() => import('./components/PaMaster/objectiveSettings/EditCalendarMapping'))

const Dashboardreview = React.lazy(() => import('./components/reviewer/Dashboard/Dashboardreview'));
const Dashboardcopy = React.lazy(() => import('./components/reviewer/Dashboard/Dashboardcopy'));
const MasterNav = React.lazy(() => import('./components/UI/MasterNav'));
// const ReviewerApprove = React.lazy(() => import('./components/reviewerMain/performanceratingchart/Approve/ReviewerApprove'));
const NormalizerApprove = React.lazy(() => import('./components/appraisal/normalizer/normalizer_acceptance/NormalizerApprove'));


const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const PaDashboard = React.lazy(() => import('./pages/dashboard/MyTeamDashboard/PaDashboard'));
const CEORole = React.lazy(() => import('./pages/dashboard/MyTeamDashboard/CEORole'));

// import Reviewer from "./components/reviewer";
// import { MasterNav, PAMaster, RatingScaleDescription } from "./components";
// import Calendar from "./components/calender/Calender";
// import Addemployee from "./components/employee/AddEmployee";
const Addemployee = React.lazy(() => import('./components/PaMaster/employeeMaster/AddEmployee'));
// import NavBar from "./components/UI/Header";
const NavBar = React.lazy(() => import('./components/UI/Header'));
// import RatingScaleDescriptionViewPage from "./pages/ratings/RatingScaleDescriptionViewPage";
const RatingScaleDescriptionViewPage = React.lazy(() => import('./pages/ratings/RatingScaleDescriptionViewPage'));
// import TrainingView from "./pages/recommendation/TrainingRecommendationViewPage";
const TrainingView = React.lazy(() => import('./pages/recommendation/TrainingRecommendationViewPage'));
// import RatingScaleUpdatePage from "./pages/ratings/RatingScaleUpdatePage";
const RatingScaleUpdatePage = React.lazy(() => import('./pages/ratings/RatingScaleUpdatePage'));

// import ReviewerMain from "./components/reviewerMain/Reviewer";
const ReviewerMain = React.lazy(() => import('./components/reviewerMain/Reviewer'));
const ViewPastpa = React.lazy(() => import('./components/reviewer/Dashboard/teamtablereview/viewpastpa'));
const ViewPreviouspa = React.lazy(() => import('./components/reviewerMain/teamtablereview/viewpreviouspa'));
const ViewPreviouspaa = React.lazy(() => import('./components/normalizerMain/teamtablereview/viewpreviouspaa'));

const CalendarView = React.lazy(() => import('./components/PaMaster/calender/calendarView'));

const TopperformersExpand = React.lazy(() => import('./components/homepage/MyTeamDashboardComponents/TopPerformers/TopperformersExpandedAppraiser'));
const CalendarReanOnly = React.lazy(() => import('./pages/calender/CalendarReadonly'))
const UnmappedEmployees = React.lazy(() => import('./components/PaMaster/exceptionhandling/UnmappedEmployees'))


/**Appraiser imports  */
const AppraiserOverViewPage = React.lazy(() => import('./pages/appraisal/appraiser/AppraiserOverview'));
const AppraiserSubmissionPage = React.lazy(() => import('./pages/appraisal/appraiser/AppraiserSubmission'));

/**Appraiser imports  */

/** Reviewer Imports */
const ReviewerAcceptancePage = React.lazy(() => import('./pages/appraisal/reviewer/ReviewerAcceptance'));
const ReviewerRejectionPage = React.lazy(() => import('./pages/appraisal/reviewer/ReviewerRejection'));
/** Reviewer Imports */


/** Normalizer imports */
const NormalizerAcceptancePage = React.lazy(() => import('./pages/appraisal/normalizer/normalizerAcceptance'));
const NormalizerRejectionPage = React.lazy(() => import('./pages/appraisal/normalizer/normalizerRejection'));
/** Normalizer imports */

type AppProps = {
  pca: IPublicClientApplication
};

const Layout = ({ children }: any) => (
  <>
    <div>
      <NavBar />
      {children}
    </div>
  </>
)

function App({ pca }: AppProps) {
  let location = useLocation();
  return (
    <MsalProvider instance={pca}>
      <Suspense fallback={

        <Loader />
      }>
        <ProvideAppContext>
          {/*<ProtectedRoute>*/}

          <>
            {/*First map the entire objective group */}
            {/* <NavBar /> */}
            {/* Conditional rendering */}
            {/* Removing the header navbar for login component */}
            {/* {(window.location.pathname !==`${LOGIN_PAGE}`) && (window.location.pathname != `${LOGIN_ROLE_SELECTION_PAGE}`)? <NavBar /> : null} */}
            {location.pathname !== `${LOGIN_PAGE}` && location.pathname !== `${LOGIN_ROLE_SELECTION_PAGE}` && <NavBar />}
            <Routes>
              <Route path={`${LOGIN}`} element={<Login />} />
              <Route path={`${LOGIN_PAGE}`} element={<LoginPage />} />
              <Route path={`${LOGIN_ROLE_SELECTION_PAGE}`} element={<LoginRoleSelectionPage />} />

              <Route path={`${REGISTER}`} element={<Register />} />
              <Route path={`${DASHBOARD}`} element={<Dashboard />} />
              <Route path={`${FORGOT_PASSWORD}`} element={<ForgotPassword />} />
              <Route path={`${VERIFY}`} element={<Verify />} />
              <Route path={`${RESET_PASSWORD}`} element={<ResetPassword />} />
              <Route path={`${OBJECTIVE}`} element={<Objective1 />} />
              <Route path={`${OBJECTIVE}/:id`} element={<Objective1 />} />
              <Route
                path={`${ADD_OBJECTIVE_DESCRIPTION}`}
                element={<AddObjectiveDescription />}
              />
              <Route
                path={`${EDIT_OBJECTIVE_DESCRIPTION}/:id`}
                element={<EditObjectiveDescription />}
              />
              <Route
                path={`${VIEW_PAST_PA}`}
                element={<ViewPastpa />}
              />
              <Route
                path={`${VIEW_PREVIOUS_PA}`}
                element={<ViewPreviouspa />}
              />

              <Route
                path={`${VIEW_PREVIOUS_PAA}`}
                element={<ViewPreviouspaa />}
              />
              <Route
                path={`${VIEW_OBJECTIVE_DESCRIPTION}`}
                element={<ViewObjectiveDescription />}
              />
              <Route path={`${MASTER_NAV}`} element={<MasterNav />} />
              <Route path={`${CALENDER}`} element={<CalenderPage />} />
              <Route
                path={`${CALENDER_UPDATE_PAGE}`}
                element={<CalendarUpdatePage />}
              />
              <Route path={`${CALENDER_VIEWPAGE}`} element={<CalendarViewPage />} />
              <Route path={`${CALENDAR_READONLY}/:id`} element={<CalendarReanOnly />} />
              <Route path={`${ADD_EMPLOYEE}`} element={<Addemployee />} />
              <Route
                path={`${OTHER_RECOMMENDATION_PAGE}`}
                element={<OtherRecommendationPage />}
              />
              <Route
                path={`${OTHER_RECOMMENDATION_EDIT_PAGE}`}
                element={<OtherRecommendationEditPage />}
              />
              <Route
                path={`${RATING_SCALE_DESCRIPTION}`}
                element={<RatingScaleDescriptionPage />}
              />
              <Route
                path={`${RATING_SCALE_DESCRIPTION_VIEW_PAGE}`}
                element={<RatingScaleDescriptionViewPage />}
              />
              <Route path={`${CREATE_TEMPLATE}`} element={<CreateTemplatePage />} />
              <Route path={`${TRAINING_VIEW}`} element={<TrainingView />} />
              <Route
                path={`${TRAINING_RECOMMENDATION_PAGE}`}
                element={<TrainingRecommendationPage />}
              />
              <Route
                path={`${OTHER_RECOMMENDATION_VIEW_PAGE}`}
                element={<OtherRecommendationViewPage />}
              />
              <Route path={`${RATING_UPDATE_PAGE}`} element={<RatingsPage />} />
              <Route path={`${RATINGS_PAGE}`} element={<RatingsPage />} />
              <Route
                path={`${TRAINING_RECOMMENDATION_UPDATE_PAGE}`}
                element={<TrainingRecommendationUpdatePage />}
              />
              <Route path={`${CREATE_TEMPLATE}`} element={<CreateTemplatePage />} />
              <Route path={`${CREATE_MAPPING}`} element={<CreateMapping />} />
              <Route path={`${CREATE_MAPPING}/:id`} element={<CreateMapping />} />
              <Route
                path={`${CREATE_CALENDER}`}
                element={<CreateAppraisalCalender />}
              />
              <Route path={`${VIEW_TEMPLATE}`} element={<ViewTemplatePage />} />
              <Route path={`${VIEW_TEMPLATE}/v`} element={<ViewTemplate />} />
              <Route path={`${EDIT_TEMPLATE}/:id`} element={<EditTemplate />} />
              <Route
                path={`${RATING_SCALE_DESCRIPTION_UPDATE_PAGE}`}
                element={<RatingScaleUpdatePage />}
              />{" "}
              {/*<Route path={`${DASHBOARDM}`} element={<DashboardM />} />*/}
              {/*<Route path={`${DASHBOARDM}`} element={<DashboardM />} />*/}
              {/* <Route
                path={`${APPRAISER}/employee/:employee_id`}
                element={<AppraiserOverViewPage />}
              /> */}
              <Route
                path={`${FEEDBACK_QUESTIONNAIRE}`}
                element={<FeedBackQuestionnairePage />}
              />
              <Route
                path={`${FEEDBACK_QUESTIONNAIRE_VIEW_lIST}`}
                element={<FeedBackQuestionnaireViewPage />}
              />
              <Route
                path={`${FEEDBACK_QUESTIONNAIRE_UPDATE_PAGE}`}
                element={<FeedBackQuestionnaireUpdatePage />}
              />
              <Route path="/appriser/dashboard" element={<Dashboard />} />
              {/* <Route path="/appraiser/test" element = {<Appr/>}/> */}
              <Route
                path={`${EMPLOYEE_NORMALIZER_PAGE}/employee/:employee_id`}
                element={<EmployeeNormalizerPage />}
              />

              {/*<Route path={`${EDIT_VIEW_TEMPLATE}`} element={<EditViewTemplate/>}/>*/}
              <Route
                path={`${EDIT_VIEW_TEMPLATE}/:id`}
                element={<EditViewTemplate />}
              />
              <Route path={`${EDIT_VIEW_TEMPLATE}`} element={<EditViewTemplate />} />
              <Route path={`${REVIEWER}`} element={<ReviewerDashboard />} />
              {/* <Route path={`${REVIEWER_APPROVE}/employee/:employee_id`} element={<ReviewerApprove />} /> */}
              {/* <Route path={`${NORMALIZER_APPROVE}/employee/:employee_id`} element={<NormalizerApprovalPage />} /> */}

              <Route path={`${REVIEWER}/:id`} element={<ReviewerMain />} />
              <Route path={`${NORMALIZER}`} element={<NormalizerDashboard />} />
              <Route path={`${PA_DASHBOARD}`} element={<PaDashboard />} />
              <Route path={`${CEO_ROLE}`} element={<CEORole />} />
              <Route path={`${NORMALIZER}/:id`} element={<NormalizerMain />} />
              <Route path={`${LINK_CALENDAR}`} element={<LinkCalendar />} />
              <Route path={`${VIEW_CALENDAR_MAPPING}`} element={<ViewCalendarMapping />} />
              <Route path={`${EDIT_CALENDAR_MAPPING}/:id`} element={<EditCalendarMapping />} />
              <Route
                path={`${CREATE_MAPPING_NEW}/:id`}
                element={<CreateMappingNew />}
              />
              {/* MyAction */}
              <Route
                path={`${MY_ACTION}`}
                element={<MyAction />}
              />
              <Route
                path={`${OVERALLDASHBOARD_EXPANDTABLE}`}
                element={<OverallDashboardExpandViewofTable />}
              />
              <Route path={`${CREATE_MAPPING_NEW}`} element={<CreateMappingNew />} />
              <Route path={`${CREATE_TEMPLATE_1}`} element={<CreateTemplate1 />} />
              <Route
                path={`${CREATE_TEMPLATE_1}/:id`}
                element={<CreateTemplate1 />}
              />
              <Route path={`${EDIT_TEMPLATE_1}/:id`} element={<EditTemplate1 />} />
              <Route path={`${FEEDBACK}`} element={<Feedback />} />
              <Route
                path={`${CREATE_MAPPING_SAVE}`}
                element={<CreateMappingSave />}
              />
              <Route path={`${LINK_CALENDAR_OPEN}`} element={<LinkCalendarOpen />} />
              <Route path={`${LINK_CALENDAR_SAVE}`} element={<LinkCalendarSave />} />
              <Route
                path={`${LINK_CALENDAR_FILTER}`}
                element={<LinkCalendarFilter />}
              />

              {/* <Route path={`${LOGIN_ROLE_SELECTION_PAGE}`} element={<LoginRoleSelectionPage />} /> */}
              <Route path={`${MAPPED_TEMPLATE_1}`} element={<MappedTemplate1 />} />
              <Route path={`${MAPPED_TEMPLATE_2}`} element={<MappedTemplate2 />} />
              <Route
                path={`${MAPPED_TEMPLATE_2}/:id`}
                element={<MappedTemplate2 />}
              />
              <Route path={`${MAPPED_TEMPLATE_3}`} element={<MappedTemplate3 />} />
              <Route
                path={`${MAPPED_TEMPLATE_3}/:id`}
                element={<MappedTemplate3 />}
              />

              <Route path={`${VIEW_MAPPED_EMPLOYEE}`} element={<ViewMappedEmployee />} />
              <Route
                path={`${VIEW_MAPPED_EMPLOYEE}/:id`}
                element={<ViewMappedEmployee />}
              />

              <Route
                path={`${VIEW_MAPPED_TEMPLATE}/:id`}
                element={<ViewTemplateFromCalendar />}
              />
              <Route path={`${MAPPED_TEMPLATE_EDIT}/:id`} element={<MappedTemplateEdit />}
              />

              <Route path={`${FILTERED_TEMPLATES}/:id`} element={<FilteredTemplates />}
              />
              <Route path={`${FILTERED_TEMPLATES_SINGLE}/:id`} element={<FilteredTemplatesSingle />}
              />
              <Route path="/reviewer" element={<ReviewerDashboard />} />
              <Route path="/solidTalents" element={<SolidTalents />} />
              <Route path="/dashboardreview" element={<AppraiserDashboard />} />
              <Route path="/dashboardcopy" element={<Dashboardcopy />} />
              <Route path="/myteamreviewer" element={<MyTeamreviewer />} />
              <Route path="/objective1" element={<Objective1 />} />
              {/* <Route path={`${ ADD_OBJECTIVE_DESCRIPTION_1}`} element={<AddObjectiveDescription1/>}/> */}
              <Route
                path={`${ADD_OBJECTIVE_DESCRIPTION_1}`}
                element={<AddLevel />}
              />
              <Route
                path={`${VIEW_OBJECTIVE_DESCRIPTION_1}`}
                element={<ViewObjectiveDescription1 />}
              />
              <Route
                path={`${ADD_LEVEL}`}
                element={<AddLevel />}
              />
              <Route
                path={`${EDITVIEW_OBJECTIVE_DESCRIPTION_EDIT}/:id`}
                element={<EditViewObjectiveDescriptionEdit />}
              />
              <Route
                path={`${ADD_OBJECTIVE_DESCRIPTION_1}/:id`}
                element={<AddLevel />}
              />
              <Route path={`${VIEW_ALL}`} element={<ViewAll />} />
              <Route path={`${EDIT_VIEW_ALL}`} element={<EditViewall />} />
              <Route path="/objectivetitle" element={<ObjectiveTitle />} />
              <Route path="/practice" element={<Practice />} />
              <Route
                path="appraiser/employee/:employee_id"
                element={<AppraiserPAreport />}
              />
              <Route
                path="reviewer/employee/:employee_id"
                element={<ReviewerPAreport />}
              />
              {/* <Route
                path="/reviewerrejection/employee/:employee_id"
                element={<AppraiserRejectsReviewer />}
              /> */}
              {/* <Route path="/new" element={<New/>}/> */}
              {/* <Route path="/normalrating" element={<NormalRating/>}/> */}
              <Route path={`${LEVELS_VIEW_ALL}`} element={<Levelsviewall />} />
              <Route path={`${OBJECTIVE_MASTER}`} element={<ObjectiveMaster />} />
              <Route
                path={`${LEVELS_VIEW_ALL_EDIT}`}
                element={<Levelsviewalledit />}
              />
              <Route
                path={`${OBJECTIVE_VIEW_BUTTON}`}
                element={<Objectiveviewbutton />}
              />


              <Route
                path={`${BOX_GRID}/:id`}
                element={<BoxGridEdit />}
              />

              <Route path={`${BOX_GRID}`} element={<BoxGrid />} />
              <Route path={`${NINE_BOX}`} element={<NineBox />} />
              <Route path={`${REVIEWER_NINE_BOX}`} element={<ReviewerNineBox />} />
              <Route path={`${NORMALIZER_NINE_BOX}`} element={<NormalizerNineBox />} />
              <Route path={`${EMPLOYEE_COMPLETE}`} element={<EmployeeComplete />} />
              <Route path={`${CALENDAR_VIEW}`} element={<CalendarView />} />
              {/*  */}            

              <Route path={`${OBJECTIVE_PREVIEW}/:id`} element={<ObjectivePreview />} />
              <Route path={`${OBJECTIVE_PREVIEW_FROM_VIEW_TEMPLATE}/:id`} element={<ObjectivePreviewFromViewTemplate />} />



              {/* reviewer accepts appraiser after employee rejection  */}

              {/* reviewer rejects appraiser after employee rejection  */}



              {/*<Route path={`${VIEW_EMPLOYEE_LIST}`} element={<ViewEmployeeListPage />}></Route>*/}
              <Route path="/azureblob" element={<AzureBlob />} />
              <Route path="/employeeRejection" element={<EmployeeRejection />} />

              <Route path="/appraiserDashboard" element={<AppraiserDashboard />}></Route>
              <Route path="/reviewerDashboard" element={<ReviewerDashboard />}></Route>
              <Route path="/normalizerDashboard" element={<NormalizerDashboard />}></Route>
              <Route path="/expandnineboxsolidtalents" element={<ExpandNineboxandSolidtalents />}></Route>
              <Route path="/topperformersexpand" element={<TopperformersExpand />}></Route>
              <Route path="/myteamtableexpandview" element={<MyteamtableExpandview />}></Route>
              <Route path="/myteamtableexpandviewclosedappraiser" element={<ExpandteamtableClosed />}></Route>
              <Route path="/myteamtableexpandviewofReviewer" element={<ExpandedTeamtableParentofReviewer />}></Route>
              <Route path="/myteamtableexpandviewofNormalizer" element={<ExpandedTeamtableParentofNormalizer />}></Route>
              <Route path="/exceptionhandling" element={<ExceptionHandling />}></Route>
              <Route path="/viewExceptionhandling" element={<ViewExceptionHandling />}></Route>
              <Route path="/panotification" element={<PaNotification />}></Route>
              <Route path="/ExpandNineBoxandSolidtalentsofClosedReviewer" element={<ExpandNineBoxandSolidtalentsofClosedReviewer />}></Route>
              <Route path="/ExpandNineboxandSolidtalentsofClosedAppraiser" element={<ExpandNineboxandSolidtalentsofClosedAppraiser />}></Route>
              <Route path="/expandnineboxsolidtalentsOfReviewer" element={<ExpandNineBoxandSolidtalentsReviewer />}></Route>
              <Route path="/topperformersexpandOfReviewer" element={<TopPerformersExpandedReviewer />}></Route>
              <Route path="/expandnineboxsolidtalentsOfNormalizer" element={<ExpandNineBoxandSolidtalentsNormalizer />}></Route>
              <Route path="/topperformersexpandOfNormalizer" element={<TopPerformersExpandedNormalizer />}></Route>
              <Route path="/NormalizerTeamTable" element={<NormalizerTeamTable />}></Route>
              <Route path="/filteredtable" element={<FilteredTable />}></Route>
              <Route path="/FilteredTablemainofClosedAppraiser" element={<FilteredTablemainofClosedAppraiser />}></Route>
              <Route path="/FilteredTablemainofClosedReviewer" element={<FilteredTablemainofClosedReviewer />}></Route>
              <Route path="/filteredtableReviewer" element={<FilteredtablemainReviewer />}></Route>
              <Route path="/filteredtableNormalizer" element={<FilteredtablemainNormalizer />}></Route>
              <Route path="/addemployeefortest" element={<AddEmployeefortest />}></Route>
              <Route path="/filteredTableofAppraiserExpNineBox" element={<FilteredTableofAppraiserExpNineBox />}></Route>
              <Route path="/FilteredTableofAppraiserExpNineBoxClosed" element={<FilteredTableofAppraiserExpNineBoxClosed />}></Route>
              <Route path="/FilteredTableofReviewerExpNineBoxClosed" element={<FilteredTableofReviewerExpNineBoxClosed />}></Route>
              <Route path="/filteredTableofReviewerExpNineBox" element={<FilteredTableofReviewerExpNineBox />}></Route>
              <Route path="/filteredTableofNormalizerExpNineBox" element={<FilteredTableofNormalizerExpNineBox />}></Route>
              <Route path="/roleexception" element={<RoleException />}></Route>
              <Route path="/RoleExceptionWithMultipleEmp" element={<RoleExceptionWithMultipleEmp />}></Route>
              <Route path="/roleexceptionformultipleemployee" element={<RoleExceptionforMultipleEmployee />}></Route>
              <Route path="/employeeupload" element={<EmployeeUpload />}></Route>
              <Route path="/filteredtableofOverallDashboard" element={<FilteredtablemainofOverallDashboard />}></Route>
              <Route path="/filteredtableReviewerofOverallDashboard" element={<FilteredtablemainReviewerofOverallDashboard />}></Route>
              <Route path="/filteredtableNormalizerofOverallDashboard" element={<FilteredtablemainNormalizerofOverallDashboard />}></Route>
              <Route path="/expandnineboxsolidtalentsOfOverallDashboard" element={<ExpandNineBoxandSolidtalentsofOverallDashboard />}></Route>
              <Route path="/expandnineboxsolidtalentsReviewerOfOverallDashboard" element={<ExpandNineBoxandSolidtalentsReviewerofOverallDashboard />}></Route>
              <Route path="/expandnineboxsolidtalentsNormalizerOfOverallDashboard" element={<ExpandNineBoxandSolidtalentsNormalizerofOverallDashboard />}></Route>
              <Route path="/OverallDashboardPAadminoverall" element={<OverallDashboardPAadminoverall />}></Route>
              <Route path="/ClosedcalendarDashboardAppraiser" element={<ClosedcalendarDashboardAppraiser />}></Route>
              <Route path="/ClosedcalendarDashboardReviewer" element={<ClosedcalendarDashboardReviewer />}></Route>
              <Route path="/ClosedcalendarDashboardNormalizer" element={<ClosedcalendarDashboardNormalizer />}></Route>
              <Route path="/NoliveCalendar" element={<NoliveCalendar />}></Route>
              <Route path="/ratingTableforCharts" element={<FilteredtablemainforCharts />}></Route>
              <Route path="/nineboxexpandTable" element={<FilteredTableofPANineBox />}></Route>
              <Route path="/nineboxexpandtalents" element={<ExpandedNineBoxAndSolidTalents />}></Route>
              <Route path="/TopPerformersExpandedViewofPA" element={<TopPerformersExpandedView />}></Route>
              <Route path="/ObjectivePreviewTemplate" element={<ObjectivePreviewTemplate />}></Route>
              <Route path="/RolesUpdate" element={<AddEmployeeRoles />}></Route>
              <Route path="/EditEmployeeDetails" element={<EditEmployeeDetails />}></Route>
              <Route path={`${UNMAPPED_EMPLOYEES}`} element={<UnmappedEmployees />}></Route>

             
              {/* Previous Appraisal Routes */}
              <Route path={`${EMPLOYEE_PREVIOUS_PAs}/employee/:employee_id`} element={<EmployeePreviousPAs />}></Route>
              <Route path={`${EMPLOYEE_PREVIOUS_PA_NO_CALENDAR}/employee/:employee_id`} element={<NoCalendarSelected />}/>
              <Route path={`${PREVIOUSAPPRAISAL_VIEWPA}/employee/:employee_id`} element={<PreviousapraisalViewpa />} />
              {/* Previous Appraisal Routes */}


              {/* Appraisal Routes */}
              <Route path={`${APPRAISAL_NOT_COMPLETED}/employee/:employee_id`} element={<AppraisalNotCompleted />} />
              <Route path={`${APPRAISAL_NOT_STARTED}/employee/:employee_id`} element={<AppraisalNotStarted />} />
              {/* Appraisal Routes */}


              {/* Appraiser Routes */}
              <Route path={`${APPRAISER}/employee/:employee_id`} element={<AppraiserOverViewPage />} />
              <Route path={`${APPRAISER_SUBMISSION}/employee/:employee_id`} element={<AppraiserSubmissionPage />} />
              <Route path={`${APPRAISER_VIEW_PA}/employee/:employee_id`} element={<AppraiserViewPA />} />
              <Route path={`${EMPLOYEE_APPRAISER_SUBMISSION}/employee/:employee_id`} element={<Employee_Appraiser_Submission />} />
              {/* Appraiser Routes */}


              {/* Reviewer Routes  */}
              <Route path={`${REVIEWER_APPROVE}/employee/:employee_id`} element={<ReviewerAcceptancePage />} />
              <Route path={`${REVIEWER_REJECTION}/employee/:employee_id`} element={<ReviewerRejectionPage />} />
              <Route path={`${REVIEWER_VIEW_PA}/employee/:employee_id`} element={<ReviewerViewPA />} />
              <Route path={`${REVIEWER_APPROVE_APPRAISER_EMPLOYEEREJECTION}/employee/:employee_id`} element={<Employee_ReviewerAcceptance />} />
              <Route path={`${REVIEWER_REJECT_APPRAISER_EMPLOYEEREJECTION}/employee/:employee_id`} element={<Employee_ReviewerRejection />} />
              {/* Reviewer Routes  */}


              {/* Normalizer Routes  */}
              <Route path={`${NORMALIZER_APPROVE}/employee/:employee_id`} element={<NormalizerAcceptancePage />} />
              <Route path={`${NORMALIZER_REJECTION}/employee/:employee_id`} element={<NormalizerRejectionPage />} />
              <Route path={`${NORMALIZER_VIEW_PA}/employee/:employee_id`} element={<NormalizerViewPA />} />
              <Route path={`${NORMALIZER_ACTION}/employee/:employee_id`} element={<NormalizerActionforEmployee />} />
              <Route path={`${REMINDER_NOTIFICATION}`} element={<RemainderNotificationParent />} />
             
              {/* Normalizer Routes  */}


              {/* Employee Routes */}
              <Route path={`${EMPLOYEE_LANDING}/employee/:employee_id`} element={<EmployeeLanding />} />
              <Route path={`${EMPLOYEE_DOWNLOAD}/employee/:employee_id`} element={<EmployeeDownload />} />
              <Route path={`${EMPLOYEE_REJECTS}/employee/:employee_id`} element={<EmployeeRejects />} />
              {/* Employee Routes */}
            </Routes>
          </>


          {/*</ProtectedRoute>*/}


        </ProvideAppContext>
      </Suspense>
    </MsalProvider>
  );
}
console.log(window.location.pathname)
console.log(LOGIN_ROLE_SELECTION_PAGE)

export default App;
