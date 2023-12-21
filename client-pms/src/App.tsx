import React, { Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { MsalProvider } from '@azure/msal-react'
import ProvideAppContext from './context/AppContext';
import EmployeeRejection from './components/homepage/EmployeeRejection';
import { IPublicClientApplication } from '@azure/msal-browser';
import "./App.css";
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
  CreateAppraisal,
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
  MidYearPAReportPage,
 
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
  APPRAISER_ACTION,
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
  EXCEPTION_HANDLING
} from "./constants/routes/Routing";
import CreateCalender from "./components/Template/PACalendar";
import ProtectedRoute from "./components/ProtectedRoute";
import AppraisalNotCompleted from "./components/employeePerformance/AppraisalNotCompleted";
import NormalizerApprovalPage from "./pages/normalizer/NormalizerApprovePage";
import AppraisalNotStarted from "./components/employeePerformance/AppraisalNotStarted";
import MyTeam from "./components/reviewer/Dashboard/teamtablereview/teamreview";
import AppraiserDashboard from "./pages/dashboard/AppraiserDashboard";
import ReviewerDashboard from "./pages/dashboard/ReviewerDashboard";
import NormalizerDashboard from "./pages/dashboard/NormalizerDashboard";
import ExpandNineboxandSolidtalents from "./components/homepage/ExpandNineBoxandSolidtalents";
import MyteamtableExpandview from "./components/reviewer/Dashboard/teamtablereview/MyteamtableExpandview";
import ExceptionHandling from "./components/exceptionhandling/exceptionhandling";
import PaNotification from "./components/panotification/panotification";
import ExpandNineBoxandSolidtalentsReviewer from "./components/homepage/ExpandNineBoxandSolidtalentsReviewer";
import TopPerformersExpandedReviewer from "./components/homepage/TopPerformersExpandedReviewer";
import TopPerformersExpandedNormalizer from "./components/homepage/TopPerformersExpandedNormalizer";
import ExpandNineBoxandSolidtalentsNormalizer from "./components/homepage/ExpandNineBoxandSolidtalentsNormalizer";
import ExpandedTeamTableofReviewer from "./components/reviewerMain/teamtablereview/ExpandedTeamTableofReviewer";
import ExpandedTeamTableofNormalizer from "./components/normalizerMain/teamtablereview/ExpandedTeamTableofNormalizer";
import ExpandedTeamtableParentofNormalizer from "./components/normalizerMain/teamtablereview/ExpandedTeamtableParentofNormalizer";
import ExpandedTeamtableParentofReviewer from "./components/reviewerMain/teamtablereview/ExpandedTeamtableParentofReviewer";
// import ViewTemplatePage from "./pages/template/ViewTemplate";

// import CreateMappingNew from "./components/Template/CreateMappingNew";


const CreateMappingNew = React.lazy(() => import('./components/Template/CreateMappingNew'));
const ReviewerPage = React.lazy(() => import('./pages/reviewer/ReviewerPage'));

// import CreateTemplate1 from "./components/Template/CreateTemplate1";
const CreateTemplate1 = React.lazy(() => import('./components/Template/CreateTemplate1'));

// import ObjectiveMaster from "./components/objectiveSettings/ObjectiveMaster";
const ObjectiveMaster = React.lazy(() => import('./components/objectiveSettings/ObjectiveMaster'));

// import Feedback from "./components/Template/Feedback";
const Feedback = React.lazy(() => import('./components/Template/Feedback'));

// import CreateMappingSave from "./components/Template/CreateMappingSave";
const CreateMappingSave = React.lazy(() => import('./components/Template/CreateMappingSave'));

// import EditTemplate1 from "./components/Template/EditTemplate1";
const EditTemplate1 = React.lazy(() => import('./components/Template/EditTemplate1'));

// import LinkCalendarOpen from "./components/objectiveSettings/LinkCalendarOpen";
const LinkCalendarOpen = React.lazy(() => import('./components/objectiveSettings/LinkCalendarOpen'));

// import LinkCalendarSave from "./components/objectiveSettings/LinkCalendarSave";
const LinkCalendarSave = React.lazy(() => import('./components/objectiveSettings/LinkCalendarSave'));

// import LinkCalendarFilter from "./components/objectiveSettings/LinkCalendarFilter";
const LinkCalendarFilter = React.lazy(() => import('./components/objectiveSettings/LinkCalendarFilter'));

// import LoginPage from "./components/UI/LoginPage";
const LoginPage = React.lazy(() => import('./components/UI/LoginPage'));

// import MappedTemplate1 from "./components/Template_old/MappedTemplate1";
const MappedTemplate1 = React.lazy(() => import('./components/Template_old/MappedTemplate1'));

// import MappedTemplate2 from "./components/Template/ViewLinkedCalendars";
const MappedTemplate2 = React.lazy(() => import('./components/Template/ViewLinkedCalendars'));

// import MappedTemplate3 from "./components/Template/MappedTemplates";
const MappedTemplate3 = React.lazy(() => import('./components/Template/MappedTemplates'));

const ViewMappedEmployee = React.lazy(() => import('./components/Template/ViewMappedEmployee'));

// import MappedTemplate3 from "./components/Template/MappedTemplates";
const ViewTemplateFromCalendar = React.lazy(() => import('./components/Template/ViewTemplateFromCalendar'));

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

// import PreviousPAReport from "./components/midyearperformanceappraisal/PreviousPAReport.tsx/PreviousPAReport";
const PreviousPAReport = React.lazy(() => import('./components/midyearperformanceappraisal/PreviousPAReport.tsx/PreviousPAReport'));

// import EmployeeRating from "./components/midyearperformanceappraisal/Rating/ReviewerRating";
const EmployeeRating = React.lazy(() => import('./components/midyearperformanceappraisal/Rating/ReviewerRating'));

// import ReviewerNineBox from "./components/reviewerMain/NineBox";
const ReviewerNineBox = React.lazy(() => import('./components/reviewerMain/NineBox'));

// import NormalizerNineBox from "./components/normalizerMain/NineBox";
const NormalizerNineBox = React.lazy(() => import('./components/normalizerMain/NineBox'));

// import PerformancePageRejected from "./pages/employee/PerformancePageRejected";
const PerformancePageRejected = React.lazy(() => import('./pages/employee/PerformancePageRejected'));

// import ViewEmployeeListPage from "./pages/employee/ViewEmployeeList";
const ViewEmployeeListPage = React.lazy(() => import('./pages/employee/ViewEmployeeList'));

// import FilteredTemplates from "./components/Template/FilteredTemplates";

const FilteredTemplates = React.lazy(() => import('./components/Template/FilteredTemplates'));

// import FilteredTemplates from "./components/Template/FilteredTemplates";

const FilteredTemplatesSingle = React.lazy(() => import('./components/Template/FilteredTemplatesSingle'));

// import EmployeeLanding from "./components/employeePerformance/EmployeeLanding";
const EmployeeLanding = React.lazy(() => import('./components/employeePerformance/EmployeeLanding'));

// import AzureBlob from "./AzureBlob";
const AzureBlob = React.lazy(() => import('./AzureBlob'));

// import EmployeeDownload from "./components/employeePerformance/EmployeeDownload";
const EmployeeDownload = React.lazy(() => import('./components/employeePerformance/EmployeeDownload'));


// import EmployeeRejects from "./components/employeePerformance/EmployeeRejects";
const EmployeeRejects = React.lazy(() => import('./components/employeePerformance/EmployeeRejects'));

// import EmployeeSelfrating from "./components/employeePerformance/EmployeeSelfrating";
const EmployeeSelfrating = React.lazy(() => import('./components/employeePerformance/EmployeeSelfrating'));

// import AppraiserActionforEmployee from "./components/employeePerformance/AppraiserActionforEmployee";
const AppraiserActionforEmployee = React.lazy(() => import('./components/employeePerformance/AppraiserActionforEmployee'));

// import NormalizerActionforEmployee from "./components/employeePerformance/NormalizerActionforEmployee";
const NormalizerActionforEmployee = React.lazy(() => import('./components/employeePerformance/NormalizerActionforEmployee'));

// import ViewPA from "./components/employeePerformance/ViewPA";
const ViewPA = React.lazy(() => import('./components/employeePerformance/ViewPA'));

const ObjectivePreview = React.lazy(() => import('./components/Template/ObjectivePreview'));

const TeamApprove = React.lazy(() => import('./components/reviewerMain/performanceratingchart/teamapprove'));

// import LoginRoleSelectionPage from "./components/UI/LoginRoleSelectionPage";
const LoginRoleSelectionPage = React.lazy(() => import('./components/UI/LoginRoleSelectionPage'));


const ViewTemplatePage = React.lazy(() => import('./pages/template/ViewTemplate'));
const Manager = React.lazy(() => import('./components/manager/AppraiserOverviewOld'));


// import Manager from "./components/manager/AppraiserOverviewOld";
// import AppraiserOverViewPage from "./pages/dashboard/AppraiserOverviewPage";

const AppraiserOverViewPage = React.lazy(() => import('./pages/dashboard/AppraiserOverviewPage'));
// import CalenderViewList from "./components/calender/CalenderViewList";
// import SolidTalents from "./components/solidTalents";
const SolidTalents = React.lazy(() => import('./components/solidTalents'));

// import Appraiser1 from "./components/reviewer/appraiser1";
const Appraiser1 = React.lazy(() => import('./components/reviewer/appraiser1'));

// import MidyearPerformance from "./components/midyearperformanceappraisal/MidyearPerformance";
// import MidyearCheckbox from "./components/midyearperformanceappraisal/MidyearCheckbox";
// import MidyearRejectRating from "./components/midyearperformanceappraisal/MidyearRejectRating";
// import MidyearPAreport from "./components/midyearperformanceappraisal/midyearPAreport/MidyearPAreport";
// import MidyearRejectSave from "./components/midyearperformanceappraisal/MidyearRejectSave";
const MidyearRejectSave = React.lazy(() => import('./components/midyearperformanceappraisal/MidyearRejectSave'));

// import MidyearSuccess from "./components/midyearperformanceappraisal/MidyearSuccess";
const MidyearSuccess = React.lazy(() => import('./components/midyearperformanceappraisal/MidyearSuccess'));

// import Dashboardreview from "./components/reviewer/Dashboard/Dashboardreview";


// import MyTeamreviewer from "./components/Newreviewer/Myteamreviewer";
const MyTeamreviewer = React.lazy(() => import('./components/Newreviewer/Myteamreviewer'));

// import NormalizerMain from "./components/normalizerMain/Normalizer";
const NormalizerMain = React.lazy(() => import('./components/normalizerMain/Normalizer'));

// import PerformancePage from "./pages/employee/PerformancePage";
const PerformancePage = React.lazy(() => import('./pages/employee/PerformancePage'));

// import NormalizerPage from "./pages/normalizer/NormalizerPage";
const NormalizerPage = React.lazy(() => import('./pages/normalizer/NormalizerPage'));

// import EmployeeNormalizerPage from "./pages/EmployeeNormalizer/EmployeeNormalizerPage";
const EmployeeNormalizerPage = React.lazy(() => import('./pages/EmployeeNormalizer/EmployeeNormalizerPage'));

// import Objective1 from "./components/../pages/objective/Objective1";
const Objective1 = React.lazy(() => import('./components/../pages/objective/Objective1'));

// import AddObjectiveDescription1 from "./components/objective_old/AddObjectiveDescription1";
// import ViewObjectiveDescription1 from "./components/objective_old/ViewObjectiveDescription1";
const ViewObjectiveDescription1 = React.lazy(() => import('./components/objective_old/ViewObjectiveDescription1'));

// import AddLevel from "./components/objectiveSettings/AddLevel";
const AddLevel = React.lazy(() => import('./components/objectiveSettings/AddLevel'));

// import ViewAll from "./components/objective_old/Viewall";
const ViewAll = React.lazy(() => import('./components/objective_old/Viewall'));


// import EditViewall from "./components/objective_old/EditViewall";
const EditViewall = React.lazy(() => import('./components/objective_old/EditViewall'));


// import ObjectiveTitle from "./components/Template/ObjectiveTitle";
const ObjectiveTitle = React.lazy(() => import('./components/Template/ObjectiveTitle'));

// import Practice from "./components/Practice";
const Practice = React.lazy(() => import('./components/Practice'));

// import MidYearCheckboxPage from "./pages/employee/MidYearCheckboxPage";
const MidYearCheckboxPage = React.lazy(() => import('./pages/employee/MidYearCheckboxPage'));

// import MidYearRejectRating from "./pages/employee/MidYearRejectRating";

const MidYearRejectRating = React.lazy(() => import('./pages/employee/MidYearRejectRating'));

// import AppraiserPAreport from "./components/Newreviewer/midYearPAreport/MidyearPAreport";
const AppraiserPAreport = React.lazy(() => import('./components/Newreviewer/midYearPAreport/MidyearPAreport'));

// import ReviewerPAreport from "./components/reviewerMain/midYearPAreport/MidyearPAreport";

const ReviewerPAreport = React.lazy(() => import('./components/reviewerMain/midYearPAreport/MidyearPAreport'));

// import ReviewerRejection1 from "./components/manager/ReviewerRejection/ReviewerRejection1";
// import ReviewerRejectionPage from "./pages/reviewer/ReviewerRejection";
// import AppraiserRejectsReviewer from "./pages/appraisal/AppraiserRejectsReviewer";
const AppraiserRejectsReviewer = React.lazy(() => import('./pages/appraisal/AppraiserRejectsReviewer'));

// import AppraiserRejectsNormalizer from "./pages/appraisal/AppraiserRejectsNormalizer";
const AppraiserRejectsNormalizer = React.lazy(() => import('./pages/appraisal/AppraiserRejectsNormalizer'));

// import New from "./components/new/New";
// import Rating from "./components/manager/ReviewerRejection/Rating/Rating";
const Rating = React.lazy(() => import('./components/manager/ReviewerRejection/Rating/Rating'));

// import NormalRating from './components/manager/NormalizerRejection/Rating/NormalRating';
// import Levelsviewall from "./components/objectiveSettings/Levelsviewall";
const Levelsviewall = React.lazy(() => import('./components/objectiveSettings/Levelsviewall'));

// import Objectiveviewbutton from "./components/objectiveSettings/Objectiveviewbutton";
const Objectiveviewbutton = React.lazy(() => import('./components/objectiveSettings/Objectiveviewbutton'));


// import EditViewObjectiveDescriptionEdit from "./components/objectiveSettings/EditLevel";
const EditViewObjectiveDescriptionEdit = React.lazy(() => import('./components/objectiveSettings/EditLevel'));

// import Levelsviewalledit from "./components/objectiveSettings/Levelsviewalledit";
const Levelsviewalledit = React.lazy(() => import('./components/objectiveSettings/Levelsviewalledit'));


// import LinkCalendar from "./components/objectiveSettings/LinkCalendar";
const LinkCalendar = React.lazy(() => import('./components/objectiveSettings/CreateCalendarMapping'));
const ViewCalendarMapping = React.lazy(()=>import('./components/objectiveSettings/ViewCalendarMapping'))
const EditCalendarMapping = React.lazy(()=>import('./components/objectiveSettings/EditCalendarMapping'))

const Dashboardreview = React.lazy(() => import('./components/reviewer/Dashboard/Dashboardreview'));
const Dashboardcopy = React.lazy(() => import('./components/reviewer/Dashboard/Dashboardcopy'));
const MasterNav = React.lazy(() => import('./components/UI/MasterNav'));
const Reviewer = React.lazy(() => import('./components/reviewer'));
const ReviewerApprove = React.lazy(() => import('./components/reviewerMain/performanceratingchart/Approve/ReviewerApprove'));
const NormalizerApprove = React.lazy(() => import('./components/normalizer/Approve/NormalizerApprove'));


const Dashboard = React.lazy(() => import('./components/dashboard/Dashboard'));
const PaDashboard =  React.lazy(() => import('./pages/dashboard/PaDashboard'));
// import Reviewer from "./components/reviewer";
// import { MasterNav, PAMaster, RatingScaleDescription } from "./components";
// import Calendar from "./components/calender/Calender";
// import Addemployee from "./components/employee/AddEmployee";
const Addemployee = React.lazy(() => import('./components/employee/AddEmployee'));
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
const TopperformersExpand= React.lazy(() => import('./components/homepage/TopperformersExpand'));

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
      <Suspense fallback={<div>Loading...</div>}>
        <ProvideAppContext>
          {/*<ProtectedRoute>*/}
            <>
              {/*First map the entire objective group */}
              {/* <NavBar /> */}
              {/* Conditional rendering */}
              {/* Removing the header navbar for login component */}
              {/* {(window.location.pathname !==`${LOGIN_PAGE}`) && (window.location.pathname != `${LOGIN_ROLE_SELECTION_PAGE}`)? <NavBar /> : null} */}
              {location.pathname !==`${LOGIN_PAGE}` && location.pathname !== `${LOGIN_ROLE_SELECTION_PAGE}` && <NavBar />}
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
                  path={`${TEAMAPPROVE}`}
                  element={<TeamApprove />}
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
                <Route
                  path={`${APPRAISER}/employee/:employee_id`}
                  element={<AppraiserOverViewPage />}
                />
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
                <Route path={`${MANAGER}`} element={<Manager />} />
                <Route path={`${CREATE_APPRAISAL}`} element={<CreateAppraisal />} />
                <Route
                  path={`${CREATE_APPRAISAL}/employee/:employee_id/objective-description/:objective_description_id/objective-description-name/:objective_description_name`}
                  element={<CreateAppraisal />}
                />
                <Route
                  path={`${CREATE_APPRAISAL}/employee/:employee_id`}
                  element={<CreateAppraisal />}
                />
                <Route path="/appriser/dashboard" element={<Dashboard />} />
                {/* <Route path="/appraiser/test" element = {<Appr/>}/> */}
                <Route
                  path={`${MIDYEAR_PERFORMANCE}/employee/:employee_id`}
                  element={<PerformancePage />}
                />
                <Route
                  path={`${MIDYEAR_PERFORMANCE_REJECTED}/employee/:employee_id`}
                  element={<PerformancePageRejected />}
                />
                <Route
                  path={`${MIDYEAR_CHECKBOX}/employee/:employee_id`}
                  element={<MidYearCheckboxPage />}
                />
                <Route
                  path={`${MIDYEAR_REJECT_RATING}/employee/:employee_id`}
                  element={<MidYearRejectRating />}
                />
                <Route
                  path={`${MIDYEAR_PA_REPORT}/employee/:employee_id`}
                  element={<MidYearPAReportPage />}
                />
                <Route
                  path={`${PREVIOUS_PA_REPORT}/employee/:employee_id`}
                  element={<PreviousPAReport />}
                />
                <Route
                  path={`${MIDYEAR_REJECT_SAVE}`}
                  element={<MidyearRejectSave />}
                />
                <Route path={`${MIDYEAR_SUCCESS}`} element={<MidyearSuccess />} />
                <Route
                  path={`${REVIEWER_PAGE}/employee/:employee_id`}
                  element={<ReviewerPage />}
                />
                <Route
                  path={`${NORMALIZER_PAGE}/employee/:employee_id`}
                  element={<NormalizerPage />}
                />
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
                <Route path={`${REVIEWER_APPROVE}/employee/:employee_id`} element={<ReviewerApprove />} />
                <Route path={`${NORMALIZER_APPROVE}/employee/:employee_id`} element={<NormalizerApprovalPage />} />

                <Route path={`${REVIEWER}/:id`} element={<ReviewerMain />} />
                <Route path={`${NORMALIZER}`} element={<NormalizerDashboard />} />
                <Route path={`${PA_DASHBOARD}`} element={<PaDashboard />} />
                <Route path={`${NORMALIZER}/:id`} element={<NormalizerMain />} />
                <Route path={`${LINK_CALENDAR}`} element={<LinkCalendar />} />
                <Route path={`${VIEW_CALENDAR_MAPPING}`} element={<ViewCalendarMapping />} />
                <Route path={`${EDIT_CALENDAR_MAPPING}/:id`} element={<EditCalendarMapping />} />
                <Route
                  path={`${CREATE_MAPPING_NEW}/:id`}
                  element={<CreateMappingNew />}
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
                  element={<ViewMappedEmployee/>}
                />

                <Route
                  path={`${VIEW_MAPPED_TEMPLATE}/:id`}
                  element={<ViewTemplateFromCalendar/>}
                />
                <Route path={`${MAPPED_TEMPLATE_EDIT}/:id`} element={<MappedTemplateEdit />}
                />

                <Route path={`${FILTERED_TEMPLATES}/:id`} element={<FilteredTemplates />}
                />
                <Route path={`${FILTERED_TEMPLATES_SINGLE}/:id`} element={<FilteredTemplatesSingle />}
                />
                <Route path="/reviewer" element={<ReviewerDashboard />} />
                <Route path="/solidTalents" element={<SolidTalents />} />
                <Route path="/appraiser1" element={<Appraiser1 />} />
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
                <Route
                  path="/reviewerrejection/employee/:employee_id"
                  element={<AppraiserRejectsReviewer />}
                />
                <Route
                  path="/appraiser/normalizer-rejection/employee/:employee_id"
                  element={<AppraiserRejectsNormalizer />}
                />
                {/* <Route path="/new" element={<New/>}/> */}
                <Route path="/rating" element={<Rating />} />
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
                <Route path={`${EMPLOYEE_LANDING}/employee/:employee_id`} element={<EmployeeLanding />} />
                <Route path={`${EMPLOYEE_DOWNLOAD}/employee/:employee_id`} element={<EmployeeDownload />} />
                <Route path={`${VIEW_PA}/employee/:employee_id`} element={<ViewPA />} />
                <Route path={`${OBJECTIVE_PREVIEW}/:id`} element={<ObjectivePreview />} />
               
                <Route
                  path={`${APPRAISAL_NOT_COMPLETED}/employee/:employee_id`} element={<AppraisalNotCompleted />}
                />
                <Route
                  path={`${APPRAISAL_NOT_STARTED}/employee/:employee_id`} element={<AppraisalNotStarted />}
                />


                <Route path={`${EMPLOYEE_REJECTS}/employee/:employee_id`} element={<EmployeeRejects />} />
                <Route path={`${EMPLOYEE_SELFRATING}`} element={<EmployeeSelfrating />} />
                <Route path={`${APPRAISER_ACTION}/employee/:employee_id`} element={<AppraiserActionforEmployee />} />
                <Route path={`${NORMALIZER_ACTION}/employee/:employee_id`} element={<NormalizerActionforEmployee />} />


                <Route path={`/employee/:employee_id`} element={<EmployeeRating />} />
                {/*<Route path={`${VIEW_EMPLOYEE_LIST}`} element={<ViewEmployeeListPage />}></Route>*/}
                <Route path="/azureblob" element={<AzureBlob />} />
                <Route path="/employeeRejection" element={<EmployeeRejection />} />

                <Route path="/appraiserDashboard" element={<AppraiserDashboard/>}></Route>
                <Route path="/reviewerDashboard" element={<ReviewerDashboard />}></Route>
                <Route path="/normalizerDashboard" element={<NormalizerDashboard />}></Route>
                <Route path="/expandnineboxsolidtalents" element={<ExpandNineboxandSolidtalents />}></Route>
                <Route path="/topperformersexpand" element={<TopperformersExpand />}></Route>
                <Route path="/myteamtableexpandview" element={<MyteamtableExpandview />}></Route>
                <Route path="/myteamtableexpandviewofReviewer" element={<ExpandedTeamtableParentofReviewer/>}></Route>
                <Route path="/myteamtableexpandviewofNormalizer" element={<ExpandedTeamtableParentofNormalizer/>}></Route>
                <Route path="/exceptionhandling" element={<ExceptionHandling />}></Route>
                <Route path="/panotification" element={<PaNotification />}></Route>
                <Route path="/expandnineboxsolidtalentsOfReviewer" element={<ExpandNineBoxandSolidtalentsReviewer />}></Route>
                <Route path="/topperformersexpandOfReviewer" element={<TopPerformersExpandedReviewer />}></Route>
                <Route path="/expandnineboxsolidtalentsOfNormalizer" element={<ExpandNineBoxandSolidtalentsNormalizer />}></Route>
                <Route path="/topperformersexpandOfNormalizer" element={<TopPerformersExpandedNormalizer />}></Route>
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
