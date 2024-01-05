import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TableContainer,
  Typography,
  useMediaQuery,
  useTheme,
  Drawer,
  TextField,
  styled,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  Popover,
  IconButton,
  DialogContent,
  DialogContentText,
  DialogActions,
  Tooltip,
  Breadcrumbs,
  Tab,
  Tabs,
  Snackbar,
  Alert
} from "@mui/material";
import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  useGetObjectiveDescriptionQuery,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useUpdateEmployeeAppraisalMutation,
  useAcceptAppraisalEmployeeMutation,
  useGetEmployeeAppraisalQuery,
  useGetRatingScaleQuery,
  useCreateEmployeeAppraisalMutation,
  useAppraiserRejectsEmployeeMutation,
  useAppraiserAcceptsEmployeeMutation,
  useAttachmentsAppraiserMutation,
  useAttachmentsEmployeeDeleteMutation,
  useAttachmentsRejectionAppraiserMutation,
  useAttachmentsRejectionAppraiserDeleteMutation,
  useAppraiserAcceptsEmployeeRatingMutation,
  useGetTalentCategoryQuery,
  // useAttachmentsAppraiserDeleteMutation
} from "../../../../service";
import Removeattnew from "../../../../assets/Images/Removeattnew.svg";
import Removeatt from "./icons/Removeatt.svg"
import Uploadatt from "../../../../assets/Images/Uploadatt.svg";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Dialog from "@mui/material/Dialog";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
// import FormLabel from '@mui/material/FormLabel';;
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import Infowhiteicon from "../../../../assets/Images/Infowhiteicon.svg";
import { EMPLOYEE_DOWNLOAD } from "../../../../constants/routes/Routing";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Close from "../../assets/Images/Close.svg";
import Newtickicon from "../../assets/Images/Newtickicon.svg";
import { useAttachmentsAppraiserDeleteMutation } from "../../../../service";
import { Scrollbar } from "react-scrollbars-custom";
import Thumsup from "../../../../assets/Images/Thumsup.svg";
import Thumsdown from "../../../../assets/Images/Thumsdown.svg";
import thumbsdown_colored from "../../../../assets/Images/Thumbsdowncolored.svg";
// import thumsup_colored from "../reviewer/appraisal_reviewer/icons/thumbsup_colored.svg";
import thumsup_colored from "../../../../assets/Images/thumsup_colored.svg";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import AlertDialogSuccess from "../../../UI/DialogSuccess";
import FeedbackQuestionnaireAppraiser from "../../FeedbackQuestionnaireAppraiser";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import CircularProgress from "@mui/material/CircularProgress";
import AlertYesNo from "../../../UI/DialogYesNo";
import { useGetEmailIdsQuery, useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { useGetEmployeeDetailsWithEmpCodeQuery } from "../../../../service/employee/previousAppraisal";
import { APPRAISER_ACCEPTS_RATING_GREATER, APPRAISER_REJECTS_EMPLOYEE } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Appraiser";
import { APPRAISER_ACCEPTS_RATING_GREATER_INFO, APPRAISER_ACCEPTS_RATING_UPTO_INFO } from "../../../../constants/AppraisalEmailContents/NotificationForInfo/Appraiser";
import { APPRAISER_VIEW_PA } from "../../../../constants/routes/Routing"
// import Eye from "../../assets/Images/Eye.svg";
import Eye from "../../../../assets/Images/Eye.svg";
import { makeStyles } from "@mui/styles";
import { EMPLOYEE_PREVIOUS_PAs } from "../../../../constants/routes/Routing";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import AlertDialogOkCancelForUnsavedChanges from "../../../UI/DialogforunsavedChangesAlert";
import { useCheckRoleLogsMutation } from "../../../../service/employee/employee";


const useStyles = makeStyles(({
  heading: {
    color: "#3E8CB5",
    fontWeight: "400",
    fontSize: "28px",
    fontFamily: "Arial",

    // @media Querry for responsive codes
    ['@media (max-width:868px)']: {
      flexWrap: "wrap",
    }
  },
  customAlert: {
    backgroundColor: '#3e8cb5',
    color: "white",
    height: '60px !important',
    alignItems: "center",
    fontSize: "1rem"
  },
  customSnackbar: {
    paddingBottom: '16px',
    paddingRight: '16px',
  },
}));

const Tf3 = styled("div")({
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    height: "15px",
    fontSize: "14px",
    fontFamily: "Arial",
    textTransform: "none",
  },
});
const RatingBackground = styled("div")({
  width: "27px",
  lineHeight: "27px",
  borderRadius: "50%",
  display: "block",
  // color: "white",  background: "red",
});
const Text = styled("div")({
  // "& .MuiButton-root": {
  //   color: "#858585",
  //   // opacity: 0.6,
  //   fontSize: "13px",
  //   fontWeight: "400",
  //   textTransform: "none",
  // },
  // paddingTop: "0px",
  // color: "#7a7a7a",
  // marginLeft: "26px",
  display: "contents",
  "& .MuiInputBase-input": {
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    fontSize: "14px",
    color: "#333333",
    // backgroundColor: "#f8f8f8",
    backgroundColor: "#ededed",
    padding: "5px",
    borderRadius: "5px",
    // minHeight: "50px",
  },
});
const Item1 = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  // ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const Contain = styled("div")({
  "& .MuiButtonBase-root": {
    color: "#333333",
    backgroundColor: "#FFFFFF",
    height: "34px",
    width: "34px",
    boxShadow: "0px 0px 1px 1px #D4D4D4",
  },

  "& .MuiButton-root": {
    border: ` 1px solid `,
    borderColor: "#D4D4D4",
    minWidth: "0px",
    borderRadius: "50px",
    width: "25px",
    height: "25px",
    "&:focus": {
      // borderColor: '#3C8BB5',
    },
  },
});
const Item2 = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  //   padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "450px",
  margin: "1rem",
  marginBottom: "0px",
  // paddingTop: "1px",
  // marginLeft: "15px",
  // marginTop: "5px",
}));
const Text1 = styled("div")({
  "& .MuiButton-root": {
    color: "#858585",
    // opacity: 0.6,
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
  },
  paddingTop: "0px",
  color: "#858585",
  marginLeft: "26px",
});
const AddButton = styled(Button)({
  fontSize: "15px",
  textTransform: "none",
  color: "#3e8cb5",
  fontFamily: "Arial",
  background: "transparent",
  borderColor: "#3e8cb5",
  // "&:hover": {
  //     borderColor: "#004C75",
  // },
  "&:disabled": {

    color: '#a9a4a4',
    borderColor: "#a9a4a4",
  },
  "&:active": {},
  "&:focus": {},
});
const Overallfeedbackss = styled("div")({
  // marginLeft: "25px",
  // marginTop: "10px",
  color: "#333333",
  fontSize: "19px",
  fontFamily: "Avenir semibold Italics",
  display: "flex",
  justifyContent: "center",
});

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const Overallrating = styled("div")({
  fontSize: "17px",
  fontFamily: "arial",
  fontWeight: 400,
  color: "#3e8cb5",
  //textAlign: 'left'
});
const Overallratingvalue = styled("div")({
  fontSize: "17px",
  fontFamily: "arial"
  // fontWeight: 400,
  // color: "#3e8cb5",
  //opacity: 0.5,
  //textAlign: 'left'
  // marginTop:'10px'
});
const Tf1 = styled("div")({
  backgroundColor: "#f8f8f8",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    padding: "4px",
  },
});
const Tf11 = styled("div")({
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign: "left"
  },
});
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  // @ts-ignore
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {

      any: any
    }
  }
  React.useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {

          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}
export default function AppraiserActionforEmployee(props: any) {
  const classes = useStyles();
  const { appraisalData } = props;
  const [navPrompt, setnavPrompt] = React.useState(false);
  console.log(navPrompt, 'navPrompt')
  const [anchorEl5, setAnchorEl5] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [talentPotential, setTalentPotential] = useState<any>("")
  const [talentRating, setTalentRating] = useState<any>(0)
  const { data: talentCategory } = useGetTalentCategoryQuery({ overall_rating: talentRating, potential: talentPotential });
  const [cancelRatingsAlert, setCancelRatingsAlert] = useState(false)
  const [disableTextAfterSubmission, setDisableTextAfterSubmission] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);
  const { data: nineBoxData } = useGetNineboxQuery("");
  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(null);
  const openPotentialInfo = Boolean(anchorE);
  const id = openPotentialInfo ? "simple-popover" : undefined;
  const [normalizedRating, setNormalizedRating] = useState(0);

  const formIsDirty = navPrompt;
  usePrompt(
    // 'Please save the changes before you leave the page.',
    "Any changes you have made will not be saved if you leave the page.",
    formIsDirty);
  const open5 = Boolean(anchorEl5);
  const handleClickOpen5 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setOpen2(true);
    setAnchorEl5(event.currentTarget);
  };


  const handleClose5 = () => {
    setAnchorEl5(null);
    // setOpen2(false);
  };

  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  // const [moveTab, setMoveTab] = useState("")
  const CustomScrollbar = Scrollbar as any;

  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [employeeAttachments, setemployeeAttachments] = useState<any>("");
  const [showTrainingRecommendation, setShowTrainingRecommendation] = useState(false)
  const [reviewedOverallFeedback, setReviewedOverallFeedback] = useState(false)
  const [sliderAppraiserComments, setSliderAppraiserComments] = useState("")
  const open6 = Boolean(anchorEl6);
  const handleClickOpen6 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2(true);
    setemployeeAttachments(
      employeeData &&
      employeeData?.data?.employee?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k.url}> {k.name} </a>
              <br />
            </div>
          );
        })
    );
    console.log(
      employeeData && employeeData?.data?.employee?.attachments,
      // .filter((i: any) => i?.objective_description === j.name._id)
      "attachments"
    );
    setAnchorEl6(event.currentTarget);
  };
  // const [popoverIndex, setPopoverIndex] = useState<any>("")
  // const [popoverIndex1, setPopoverIndex1] = useState<any>("")

  const handleClose6 = () => {
    setAnchorEl6(null);
    // setOpen2(false);
  };

  const { employee_id } = useParams();
  const { data: employeeData, refetch: fetchCancel, isLoading, isFetching: employeeDataIsFetching } =
    useGetEmployeeAppraisalQuery(employee_id);
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: employeeData?.data?.employee_code })

  const { data: ratingsData } = useGetRatingScaleQuery("");
  const { data: objectiveTitleData, isLoading: isTitleLoading } =
    useGetObjectiveTitleQuery("");
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [deleteEmployeeMutation, { isLoading: delete1, data: deleted }] =
    useAttachmentsEmployeeDeleteMutation();
  const [rating, setRating] = useState<any>("");
  const [ratingValue, setRatingValue] = useState<any>("");
  const [ratingEmployee, setratingEmployee] = useState<any>("");
  const [value, setValue] = React.useState(0);
  // appraiser rejection reason
  const [comments, setComments] = useState("");
  //  appraiser comments
  const [appraiserInitialComments, setAppraiserInitialComments] = useState("")
  const [appraiserComments, setAppraiserComments] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [showArea, setShowArea] = useState(false)
  const [overAllRating, setOverAllRating] = useState<any>(0);
  const [currentOverAllRating, setCurrentOverAllRating] = useState<any>(0)
  const [currentObjectiveDescription, setCurrentObjectiveDescription] = useState<any>([])
  const [currentObjectiveType, setCurrentObjectiveType] = useState<any>([])
  const [updateMutation, { isLoading: isUploading }] = useCreateEmployeeAppraisalMutation();
  const [updateEmployeeRating, { isLoading: isAcceptLoading }] = useAppraiserAcceptsEmployeeRatingMutation();
  const [disableAccept, setDisableAccept] = useState(false);
  const [openValidation, setOpenValidation] = useState(false);
  let navigate = useNavigate();
  const [objectiveData, setObjectiveData] = useState<any>({})
  const [acceptRatingAlert, setAcceptRatingAlert] = useState(false)
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [popoverIndex1, setPopoverIndex1] = useState<any>("");
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [appraiserAcceptsEmployee] = useAppraiserAcceptsEmployeeMutation();
  const [appraiserRejectsEmployee] = useAppraiserRejectsEmployeeMutation();
  const [appraiserUpdateRating] = useUpdateEmployeeAppraisalMutation();
  const [rejectedTitle, setRejectedTitle] = useState("");
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [name, setName] = useState<string>("");
  const [newIds, setNewIds] = useState<string[]>([]); 
    const [openReviewAlert, setOpenReviewAlert] = useState(false)
  const [openAcceptAlert, setOpenAcceptAlert] = useState(false)
  const [openRejectReviewAlert, setOpenRejectReviewAlert] = useState(false)
  const [openRejectAlert, setOpenRejectAlert] = useState(false)
  const [fileSelected, setFileSelected] = useState<any>("");
  const [sendItem, { data }] = useCreateAzureBlobMutation();
  const { data: emailData } = useGetEmailIdsQuery({ appraiser_code: employeeData?.data?.appraiser_code, reviewer_code: employeeData?.data?.reviewer_code, normalizer_code: employeeData?.data?.normalizer_code })
console.log(ratingValue,"ratingValue")
  const [attachmentsAppraiser] = useAttachmentsAppraiserMutation();
  const [rejectionAttachmentsAppraiser] = useAttachmentsRejectionAppraiserMutation();
  const [deleteRejectionAppraiserMutation, { isLoading: isRejectionDeleting, data: deleteRejection }] =
    useAttachmentsRejectionAppraiserDeleteMutation()

  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [updateLoggedRole] = useCheckRoleLogsMutation()
  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }
  const groupNAmeHandler = (name: any) => {
    if (name) {
      let tempArea = name.filter((area: any) => {
        return area[0] !== "" && area[0] !== undefined
      })
      if (tempArea && tempArea?.length > 0) {
        setShowArea(true);
        setFilterData(name);
      } else {
        setShowArea(false);
      }
    }
  };

  useEffect(() => {
    if (employeeData && employeeData.data) {
      const appraiserAreaOfImprovement =
        employeeData.data.appraisal.area_of_improvement;
      const group = _.groupBy(appraiserAreaOfImprovement, "value");
      const groupName = groupNAmeHandler(Object.entries(group));
      setAppraiserComments(employeeData?.data?.appraisal?.comments);
      setTalentPotential(employeeData?.data?.appraisal?.potential);
      setTalentRating(employeeData?.data?.employee?.employee_rating);
      setDisableTextAfterSubmission(!employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser"))
    }
  }, [employeeData]);

  // const handleChange = (event: React.SyntheticEvent, newValue: number) => {
  //   setValue(newValue);
  // };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleClickOpen = () => {
    setOpen(true);
  };

  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");

    const data = await html2canvas(
      document.getElementById("pdf") as HTMLElement
    );

    const img = data.toDataURL("image/png");

    const imgProperties = pdf.getImageProperties(img);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);

    pdf.save("Employee_Appraisal.pdf");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const theme1 = useTheme();
  const fullScreen1 = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  const [open33, setOpen33] = useState<any>(false);
  const handlemessage3 = () => {
    setOpen33(false);
  }
  // const [open3, setOpen3] = React.useState(false);
  const theme3 = useTheme();
  const fullScreen3 = useMediaQuery(theme.breakpoints.down("md"));
  const inputRef = useRef<any>(null);

  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // setratingparams("");
    // setratingEmployee("");
    setRating("");
    setRatingValue("");
  };
  // const openDrawerHandler = (objective: any) => {
  //   // setAccept("Accept");
  //   // setName("");
  //   // openDrawer();
  //   // setRejectedTitle(objective?.name?.objectiveTitle);
  //   // setComments(objective.rejection_reason);
  //   // setAppraiserInitialComments(objective.comments);
  //   // let employeeRatingValue = employeeData.data.employee.objective_description
  //   //   .filter((i: any) => i.name._id === objective?.name?._id)
  //   //   .map((k: any) => {
  //   //     if (k.ratings) return k.ratings.rating;
  //   //   })[0];
  //   // setratingEmployee(employeeRatingValue)
  //   handleAcceptRatingAlertYes()
  //   // setAcceptRatingAlert(true);
  //   // setMessage("Are you sure you wish to accept the rating ?")
  // }
  // console.log("working");
  // console.log(objective, "objectiveeeeee");
  // setAccept("Accept");
  // openDrawer();
  const handleAcceptRatingAlertYes = (objectiveData: any) => {
    setnavPrompt(false);
    setAcceptRatingAlert(false);
    setActiveObjectiveDescriptionName(objectiveData.name._id
      //   ,() =>
      // {
      //   setActiveObjectiveDescription(objective._id); 
      //   acceptHandler() 
      // }
    );
    setActiveObjectiveDescription(objectiveData._id);
    let employeeRatingValue =
      employeeData.data.employee.objective_description
        .filter(
          (i: any) => i.name._id === objectiveData.name._id
        )
        .map((k: any) => {
          if (k.ratings) return k.ratings.rating;
        })[0];
    if ((objectiveData?.comments == "" || objectiveData?.comments == undefined) && ((employeeRatingValue < 3) || (employeeRatingValue >= 4))) {
      setOpenSaved(true);
      setMessage("It is mandatory to provide a justification for the rating below 3, and 4 and above.")
    } else {
      setOpenSaved(false);
      setMessage("")
      acceptHandler(objectiveData);
    }

    // setRejectedTitle(objective?.name?.objectiveTitle);


    // setComments(objective.rejection_reason);
    // setRating(objective.ratings._id);
    // // let reviewerRatingValue = employeeData.data.employee.objective_description
    // //   .filter((i: any) => i.name._id === objective.name._id)
    // //   .map((k: any) => {
    // //     if (k.ratings) return k.ratings.rating;
    // //   })[0];
    // // setratingEmployee(reviewerRatingValue);

    // let reviewerRatingValue = employeeData.data.employee.objective_description
    //   .filter((i: any) => i.name._id === objective.name._id)
    //   .map((k: any) => {
    //     if (k.ratings) return k.ratings.rating;
    //   })[0];
    // setratingEmployee(reviewerRatingValue);
  };
  const handleAcceptRatingAlertNo = () => {
    setAcceptRatingAlert(false);
    setMessage("")
  }
  console.log(ratingEmployee, "ratingEmployee");
  // console.log(reviewerRatingValue1,"234")
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const [appraiserCommentss, setAppraiserCommentss] = useState<any>("");

  // refetch
  const CancelButtonHandler = () => {
    if (navPrompt || moveTab) {
      setOpenCancelDialog(true);
    } else if (value == 1) {
      setOpenCancelDialog(false);
      setValue(0);
    }
  }

  const rejectCancelButtonHandler = () => {
    setOpenCancelDialog(false);
  }

  const acceptCancelButtonHandler = () => {
    setMoveTab(false);
    setnavPrompt(false);
    setValue(0);
    setOpenCancelDialog(false);
    fetchCancel();
  }

  const openDrawerHandlerreject = (objective: any) => {
    console.log(objective, 'objectiveeeee')
    setAccept("Reject");
    setName("");
    setNewIds(objective?.ratings?._id)
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setRejectedTitle(objective?.name?.objectiveTitle);
    setComments(objective.rejection_reason);
    setSliderAppraiserComments(objective.comments);
    setRating(objective.ratings._id);
    setratingparams(objective.ratings.rating);

    let reviewerRatingValue = employeeData?.data?.employee?.objective_description
      ?.filter((i: any) => i.name._id === objective.name._id)
      ?.map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];

    let normalizerRating = employeeData?.data?.normalizer?.objective_description
      ?.filter((i: any) => i.name._id === objective.name._id)
      ?.map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];

    setNormalizedRating(normalizerRating);
    setratingEmployee(reviewerRatingValue);
    if (objective.rating_rejected == true || objective?.rating_resubmitted == true) {
      setRating(objective.ratings._id);
      setRatingValue(objective.ratings.rating);
    } else {
      setRating("");
      setRatingValue("");
    }
    if (objective.rating_rejected == true && objective.action_performed == true) {
      setShowWithdraw(true);
    } else {
      setShowWithdraw(false);
    }
  };

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };
  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData.data.appraisal.objective_type.find(
        (item: any) => item.name._id === id
      );
    }
  };

//   const AppraiserRAting =employeeData?.data?.appraisal?.objective_description
//     .filter(
//       (i: any) =>
//         i?.name?._id === j?.name?._id
//     )
//     .map((k: any) => {
//       console.log(k,"newwkkk")
//         return k?.ratings?.rating
// })


  const handleClosePotentialInfo = () => {
    setAnchorE(null);
  };

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE(event.currentTarget);
  };
  const [colorarray, setColorarray] = useState<any>("");

  const Colors = [
    "#B6E9EE",
    "#C9FBEA",
    "#B1EDEE",
    "#B9E9D0",
    "#BDE3E2",
    "#B1F3F2",
    "#B7E6F7",
    "#B8EFEF",
    "#BFFBE7",
    "#B7E6F7",
    "#B1F1F0",
    "#BEECF5",
  ]
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setObjectiveDescription(() => {
        return employeeData.data.appraisal.objective_description.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
              objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });

      setCurrentObjectiveDescription(() => {
        return employeeData?.data?.current_rating?.objective_description.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
              objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });

      let objectiveType = employeeData.data.appraisal.objective_type.map((item: any, index: number) => {
        return {
          objective_type: item?.name?.name,
          color: Colors[index]
        }
      })
      console.log(objectiveType, "objectiveType")
      setColorarray(objectiveType)
    }
  }, [employeeData, objectiveTitleData]);

  const [accept, setAccept] = useState("");

  const handleacceptChange = (event: any) => {
    setAccept(event.target.value as string);
  };
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(
      employeeData &&
      objectiveTitleData &&
      objectiveDescription.map((j: any, index: number) => {
        // @ts-ignore
        return (
          <>
            {employeeData &&
              employeeData?.data?.employee?.objective_description
                .filter(
                  (i: any) => i.name._id === j.name._id
                )
                .map((k: any) => {
                  if (k.ratings)
                    return k.ratings.rating;
                })[0]}
          </>
        )
      })

    )
  }, [employeeData])
  console.log(show, "show")


  const acceptHandler = (objectiveData: any) => {
    // setMoveTab(true);
    // setnavPrompt(true);
    let temp = employeeData.data.employee.objective_description
      .filter((i: any) => i.name?._id === objectiveData?.name?._id)
      .map((k: any) => k.ratings._id)[0];

    let employee_objective_description = employeeData.data.employee.objective_description.map(
      (i: any) => {
        if (i.name?._id === objectiveData?.name?._id)
          return { ...i, rating_rejected: false }
        else return i
      }
    )
    let normalizerRatingValue =
      employeeData.data.normalizer.objective_description
        .filter((i: any) => i.name._id == activeObjectiveDescriptionName)
        .map((j: any) => {
          if (j.ratings.rating !== objectiveData?.ratings?.rating) {
            return true
          } else return false
        })[0]
    // setnavPrompt(true);   

    const getEmployeeRating = (objId: any) => {
      return employeeData?.data?.employee?.objective_description?.find((item: any) => item.name._id === objId).ratings._id
    }

    let current_objective_description = employeeData?.data?.current_rating?.objective_description?.map(
      (item: any) => {
        console.log(rating, item, 'checkRating')
        // if (item.name._id === objectiveData?.name?._id) {
        if (item.name._id === objectiveData?.name?._id) {
          return {
            ...item,
            ratings: getEmployeeRating(item.name._id)
          }
        } else return item
      }
    );

    //// to save all appraiser comments in every save function
    let mappedObjectiveDescription = objectiveDescription?.map((item: any) => {
      if (item.name._id === objectiveData?.name?._id) {
        return {
          ...item,
          ratings: temp,
          rejection_reason: comments,
          comments: item.comments ? item.comments : objectiveData?.comments,
          rating_resubmitted: true,
          rating_rejected: false,
          action_performed: true,
        }
      } else return item
    })

    appraiserUpdateRating({
      "appraisal.objective_description": mappedObjectiveDescription,
      "employee.objective_description": employee_objective_description,
      "current_rating.objective_description": current_objective_description,
      "appraisal.pa_status": "Pending with Appraiser",
      "appraisal.appraiser_status": "draft",
      id: employee_id,

    })
    setratingEmployee("");
    closeDrawer();
    setnavPrompt(false);
  };

  const ratingWithdrawHandler = () => {
    let previousRatingData = employeeData.data.appraisal_previous_submission.objective_description
      .filter((i: any) => i.name === activeObjectiveDescriptionName)
      .map((k: any) => {
        return {
          ratings: k.ratings,
          rating_rejected: k.rating_rejected,
          rejection_reason: k.rejection_reason ? k.rejection_reason : ""
        }
      })[0];

    let employeeObjectiveDescription = employeeData?.data?.employee?.objective_description;
    const getRatings = (id: any) => {
      let rating = employeeObjectiveDescription.find((item: any) => item.name._id == id)
      return rating.ratings
    }
    let current_objective_description = employeeData?.data?.current_rating?.objective_description
      .map((item: any) => {
        return item.name._id == activeObjectiveDescriptionName ?
          {
            ...item,
            ratings: getRatings(item.name._id)
          } :
          item
      })

    // setnavPrompt(true);
    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: previousRatingData.ratings,
      rating_rejected: previousRatingData.rating_rejected,
      action_performed: false,
      rating_comments: "",
      rejection_reason: previousRatingData.rejection_reason,
      current_objective_description: current_objective_description,
      id: employee_id,
    });
    setRating("");
    setRatingValue("")
    setName("");
    closeDrawer();
  }
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState("");

  const ratingSubmitHandler = () => {

    console.log(ratingValue, 'ratingValue')
    if (ratingValue === null ||
      ratingValue === "" ||
      ratingValue === undefined) {
      setrejectAlertMessage("Please select a rating to reject.");
      setrejectAlert(true);
    }
    // else if (ratingEmployee === ratingValue) {
    //   setrejectAlertMessage(
    //     // "You cannot put the same rating as the Employee. Please change the Rating."
    //     "You cannot select the same rating as the Employee. Please change the rating."

    //   );
    //   setrejectAlert(true);
    //   // setnavPrompt(true);
    //   // } else if (comments == "" || comments == undefined) {
    //   //   setrejectAlertMessage("Please add rejection reason.");
    //   //   setrejectAlert(true);
    // }
     else if ((sliderAppraiserComments?.trim() == "" || sliderAppraiserComments?.trim() == undefined) && ((ratingValue < 3) || (ratingValue >= 4))) {
      setrejectAlertMessage("It is mandatory to provide a justification for the rating below 3, and 4 and above.")
      setrejectAlert(true);
    }
    else {
      //setrejectAlert(true);
      closeDrawer();
      setnavPrompt(true);
      setMoveTab(true);
      let employee_objective_description = employeeData.data.employee.objective_description.map(
        (i: any) => {
          if (i.name._id === activeObjectiveDescriptionName)
            return { ...i, rating_rejected: true }
          else return i
        }
      )

      let current_objective_description = employeeData?.data?.current_rating?.objective_description?.map(
        (item: any) => {
          if (item.name._id === activeObjectiveDescriptionName) {
            return {
              ...item,
              ratings: rating
            }
          } else return item
        }
      )
    //     setAppraiserCommentss(() => {

    //   return objectiveDescription?.map((i: any, ratingId: any) => {
    //     const selectedRating: any = ratingsData?.data?.find((rating: any) => rating._id === ratingId);
    // console.log(selectedRating,"selectedRating")
    //     return appraiserCommentss.map((item: any) => {
    //       if (item.name._id === activeObjectiveDescriptionName) {
    //         return item._id === i._id
    //           ? {
    //               ...item,
    //               ratings: rating,
    //               rejection_reason: comments?.trim(),
    //               comments: item.comments?.trim() ? item.comments?.trim() : sliderAppraiserComments?.trim(),
    //               rating_rejected: true,
    //               ratingdef: selectedRating?.definition,
    //               rating_scale: selectedRating?.rating_scale,
    //               action_performed: true,
    //               rating_accepted: false,
    //               rating_resubmitted: false,
    //             }
    //           : item;
    //       } else return item;
    //     });
    //   });
    // });
      // const selectedRating = ratingsData?.data?.find((rating: any) => rating._id === ratingId);

      //// to save all appraiser comments in every save function
      let mappedObjectiveDescription = objectiveDescription?.map((item: any) => {
        if (item.name._id === activeObjectiveDescriptionName) {
          return {
            ...item,
            ratings: rating,
            rejection_reason: comments?.trim(),
            comments: item.comments?.trim() ? item.comments?.trim() : sliderAppraiserComments?.trim(),
            rating_rejected: true,
            action_performed: true,
            rating_accepted: false,
            rating_resubmitted: false
          }
        } else return item
      })
      // let mappedObjectiveDescription = objectiveDescription?.map((i: any, ratingId: any) => {
      //   const selectedRating: any = ratingsData?.data?.find((rating: any) => rating?.rating === ratingparams); 
      //   // Accessing the first element of the newIds array        
      //   console.log(selectedRating,rating,ratingsData?.data,activeObjectiveDescriptionName,i?.name?._id,"selectedRating")
      //   if (i.name._id === activeObjectiveDescriptionName) {
      //     return {
      //       ...i,
      //       ratings: rating,
      //       rejection_reason: comments?.trim(),
      //       comments: i.comments?.trim() ? i.comments?.trim() : sliderAppraiserComments?.trim(),
      //       rating_rejected: true,
      //       action_performed: true,
      //       rating_accepted: false,
      //       ratingdef: selectedRating?.definition || "",
      //       rating_scale: selectedRating?.rating_scale || "",
      //       rating_resubmitted: false,
      //     };
      //   } else {
      //     return i;
      //   }
      // });
      appraiserUpdateRating({
        "appraisal.objective_description": mappedObjectiveDescription,
        "employee.objective_description": employee_objective_description,
        "appraisal.pa_status": "Pending with Appraiser",
        "appraisal.appraiser_status": "draft",
        "current_rating.objective_description": current_objective_description,
        id: employee_id,
      });
      setRating("");
      if (name && fileSelected) {
        return imageClick();
      }
      setratingEmployee("");
      setMoveTab(false);
    }
  };

  console.log(objectiveDescription,ratingsData?.data?.find((rating: any) => rating._id), "activeObjectiveDescriptionName");

  // useEffect(() => {
  //   if (objectiveDescription.length > 0) {
  //     const objectiveDescriptionMapped = objectiveDescription.map((i: any) => {
  //       // if (i.ratings) {
  //       // console.log(i.objective_type, 'objective_type')
  //       console.log(objectiveDescription, "objectiveDescription");
  //       console.log(i, "value");
  //       const sum = (i.value * i.objective_type.value) / 10000;
  //       const newSum = sum * i?.ratings?.rating;
  //       console.log(i.value, "newSum");
  //       return newSum;
  //       // }
  //     });
  //     console.log(
  //       _.sum(objectiveDescriptionMapped),
  //       "objectiveDescriptionMapped"
  //     );
  //     setOverAllRating(() => {
  //       return _.sum(objectiveDescriptionMapped).toFixed(2);
  //     });
  //   }
  // }, [objectiveDescription]);

  // useEffect(() => {
  //   if (overAllRating) {
  //     appraiserUpdateRating({
  //       "appraisal.appraiser_rating": overAllRating,
  //       id: employee_id,
  //     });
  //   }
  // }, [overAllRating]);


  useEffect(() => {
    if (currentObjectiveDescription.length > 0 && employeeData) {
      const currentObjectiveDescriptionMapped = currentObjectiveDescription.map((i: any) => {
        // if (i.ratings) {
        // console.log(i.objective_type, 'objective_type')
        const sum = (i.value * i.objective_type.value) / 10000
        const newSum = sum * i?.ratings?.rating
        // console.log(sum, 'newSum')
        return newSum
        // }


      })

      setCurrentOverAllRating(() => {
        return _.sum(currentObjectiveDescriptionMapped).toFixed(2)
      });

    }
  }, [currentObjectiveDescription, employeeData])


  useEffect(() => {
    if (currentOverAllRating) {
      appraiserUpdateRating({
        "current_rating.overall_rating": currentOverAllRating,
        id: employee_id
      })
    }
  }, [currentOverAllRating])


  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    // if (!fileList) return;
    //@ts-ignore
    setName(fileList[0].name);
    // setFileSelected(fileList[0]);
    let reader = new FileReader();
    //@ts-ignore
    reader.readAsDataURL(fileList[0]);
    reader.onload = (e) => {
      setFileSelected(e.target?.result);
    };
  };

  const imageClick = () => {
    const newData = {
      // token:tokens,
      // newstitle: newsTitle,
      // newsdesc: convertedContent,
      newspic: fileSelected,
      newspicname: name,
    };

    sendItem(newData).then((res: any) => {
      rejectionAttachmentsAppraiser({
        attachments: {
          url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id,
      });
    });
  };
  const [filterData2, setFilterData2] = useState([]);
  const [otherComments1, setOtherComments1] = useState("");
  useEffect(() => {
    setOtherComments1(employeeData?.data?.appraisal?.appraiser_overall_feedback)
  }, [employeeData])
  const handleappraiserReCommentsChange = (e: any) => {
    //   setnavPrompt(true)
    console.log(e);
    setOtherComments1(e.target.value)
    // setAppraiserOverallFeedback(e.target.value)
  }
  console.group(filterData2, "filterData2");
  const groupNAmeHandler2 = (name: any) => {
    if (name) {
      setFilterData2(name);
    }
  };
  const [employeeAreaofImprovement, setEmployeeAreaofImprovment] =
    useState<any>([]);
  const employeeAreaCommentsChangeHandler1 = (i: any, e: any) => {
    let temp = employeeAreaofImprovement;
    temp = temp.map((item: any) => {
      return i[0]._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    setEmployeeAreaofImprovment(temp);
  };

  const [anchorEl1, setAnchorEl1] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo1 = Boolean(anchorEl1);
  const id3 = openInfo1 ? "simple-popover" : undefined;
  const handleClickInfo1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleCloseInfo1 = () => {
    setAnchorEl1(null);
  };
  useEffect(() => {
    if (employeeData && employeeData.data) {
      const employeeAreaOfImprovement =
        employeeData?.data?.employee?.area_of_improvement;
      const group = _.groupBy(employeeAreaOfImprovement, "value");
      const groupName = groupNAmeHandler2(Object.entries(group));
    }
  }, [employeeData, employeeAreaofImprovement]);
  const [employeeTrainingRecommendations, setEmployeeTrainingRecommendations] =
    useState<any>([]);
  const employeeTrainingCommentsChangeHandler1 = (i: any, e: any) => {
    let temp = employeeTrainingRecommendations;
    temp = temp.map((item: any) => {
      return i._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    setEmployeeTrainingRecommendations(temp);
  };
  const [Training1, setTraining1] = React.useState<any>([]);
  console.log(Training1, "Trainingstate1");

  const findTrainingName = (id: any) => {
    if (employeeData) {
      return employeeData?.data?.appraisal_template?.training_recommendation.find((i: any) =>
        i.name._id == id);
    }
  }
  const [acceptButton, setacceptButton] = React.useState(false);
  const [rejectButton, setrejectButton] = React.useState(false);

  console.log(acceptButton, rejectButton, 'acceptButton')
  useEffect(() => {
    let temp = objectiveDescription.filter((i: any) => {
      return i.rating_rejected === true;
    });
    //Condition chec to disable accept and reject buttons if any action needs to be performed for the ratings
    // let employeeRejectedRatings = employeeData?.data?.employee?.objective_description?.filter((item: any) => {
    //   return item.rating_rejected == true
    // }).map((item: any) => item?.name?._id);
    // let actionPerformed = objectiveDescription?.filter((item: any) => {
    //   return employeeRejectedRatings?.includes(item?.name?._id) && item?.action_performed == false
    // });
    // if (actionPerformed?.length > 0) {
    //   //setobjectiverating(true)
    //   setacceptButton(true);
    //   setrejectButton(true);
    // }
    // else
    if (temp?.length > 0) {
      //setobjectiverating(true)
      setacceptButton(true);
      setrejectButton(false);
    }
    // else if (temp?.length === 0) {
    //   setacceptButton(false);
    //   setrejectButton(true);
    // } 
    else {
      //setobjectiverating(false)
      setrejectButton(true);
      setacceptButton(false);
    }
    console.log(temp.length, "temp1");
  }, [objectiveDescription]);
  console.log(acceptButton, 'acceptButton')
  console.log(rejectButton, 'acceptButton1')
  useEffect(() => {
    if (employeeData) {
      setTraining1(() => {
        return employeeData?.data?.employee?.training_recommendation?.map(
          (i: any) => {
            console.log(i, "Training1");
            return {
              ...i,
              name: findTrainingName(i.name),
              justification: i.justification,
              trainingName: i.training_name,
              // objective_title: findObjectiveTitleById(i.name.objective_title),
              // objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);

  const [ratingReviewer, setRatingReviewer] = useState<any>("");

  // const [ratingSelection, setratingSelection] = useState(false);
  // const [ratingparams, setratingparams] = useState<any>("");
  // useEffect(() => {
  //   setratingparams(ratingReviewer);
  // }, [ratingReviewer]);

  // const handleRatingAlert = (j: any) => {
  //   console.log(j, "jjjjjjj");
  //   setratingparams(j.rating);
  //   if (ratingReviewer === j.rating) {
  //     setrejectAlert(true);
  //   } else {
  //     if (j) setRating(j._id);
  //     // setratingSelection(true);
  //   }
  // };
  // console.log(ratingparams, "ratingparams");
  // console.log(ratingReviewer, "ratingparams");
  const [appraiserAreaofImprovement, setAppraiserAreaofImprovement] =
    useState<any>([]);
  useEffect(() => {
    if (employeeData && employeeData.data) {
      const employeeTrainingRecommendations =
        employeeData.data.employee.training_recommendation;
      const group = _.groupBy(employeeTrainingRecommendations, "value");
      const groupName = groupNAmeHandler3(Object.entries(group));
    }
  }, [appraiserAreaofImprovement]);
  const [filterData3, setFilterData3] = useState([]);
  console.group(filterData3, "filterData3");
  const groupNAmeHandler3 = (name: any) => {
    if (name) {
      setFilterData3(name);
    }
  };
  const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open3, setOpen3] = React.useState(false);
  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };
  //slider radio button
  const [acceptReason, setAcceptReason] = useState("");
  const handlereasonChange = (event: any) => {
    setAcceptReason(event.target.value as string);
  };
  console.log(acceptReason, "acceptReason");
  // inputRef.current.value = null;
  const [positionHide, setpositionHide] = useState<any>(false);
  useEffect(() => {
    if (fileSelected !== "" && name !== "") {
      setpositionHide(true);
    } else {
      setpositionHide(false);
    }
  }, [name, fileSelected]);

  const resetFileInput = () => {
    setFileSelected("");
    setName("");
    inputRef.current.value = null;
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEl);
  const id2 = openInfo ? "simple-popover" : undefined;

  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEl(null);
  };

  const [ratingdefenition, setratingdefenition] = useState<any>();
  const [ratingscaledef, setratingscaledef] = useState<any>();
  React.useEffect(() => {
    const Overall_rating = employeeData?.data?.current_rating?.overall_rating;
    const RatinGscale = ratingsData?.data?.map((j: any) => ({
      rating: j?.rating,
      definition: j?.definition,
      rating_titile: j?.rating_scale,
    }));

    const filterRatingScale = (item: any, minRating: any, maxRating: any) => {
      return (item?.rating >= minRating && item?.rating <= maxRating) && (Overall_rating >= minRating && Overall_rating <= maxRating);
    }

    const FilteredRatingScale = RatinGscale?.filter((item: any) => {
      if (filterRatingScale(item, 1, 1.99) ||
        filterRatingScale(item, 2, 2.49) ||
        filterRatingScale(item, 2.5, 2.99) ||
        filterRatingScale(item, 3, 3.49) ||
        filterRatingScale(item, 3.5, 3.99) ||
        filterRatingScale(item, 4, 4.49) ||
        filterRatingScale(item, 4.5, 4.99) ||
        filterRatingScale(item, 5.0, 5.0)) {
        return {
          ratingScale: item?.rating_titile,
          definition: item?.definition,
          // rating: item?.rating,
        };
      }
    });

    if (FilteredRatingScale && FilteredRatingScale.length > 0) {
      setratingdefenition(FilteredRatingScale[0]?.definition);
      setratingscaledef(FilteredRatingScale[0]?.rating_titile);
    } else {
      // Handle the case when FilteredRatingScale is empty
      // setratingdefenition("No rating definition found");
    }
    console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, "Overall_ratingg");
  }, [ratingsData, employeeData]);
  // useEffect(() => {
  //   const Overall_rating = employeeData?.data?.current_rating?.overall_rating
  //   const RatinGscale = ratingsData?.data?.map((j: any) => ({
  //     rating: j?.rating,
  //     definition: j?.definition,
  //     rating_titile: j?.rating_scale,
  //   }))
  //   const FilteredRatingScale = RatinGscale?.filter((item: any) => {
  //     if ((item?.rating > 0 && item?.rating <= 1.99) && (Overall_rating > 0 && Overall_rating <= 1.99)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 2 && item?.rating <= 2.49) && (Overall_rating >= 2 && Overall_rating <= 2.49)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     }else if ((item?.rating >= 2.5 && item?.rating <= 2.99) && (Overall_rating >= 2.5 && Overall_rating <= 2.99)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 3 && item?.rating <= 3.49) && (Overall_rating >= 3 && Overall_rating <= 3.49)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 3.5 && item?.rating <= 3.99) && (Overall_rating >= 3.5 && Overall_rating <= 3.99)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 4 && item?.rating <= 4.49) && (Overall_rating >= 4 && Overall_rating <= 4.49)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 4.5 && item?.rating <= 4.99) && (Overall_rating >= 4.5 && Overall_rating <= 4.99)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     } else if ((item?.rating >= 5.0) && (Overall_rating >= 5.0)) {
  //       return {
  //         // item?.definition;
  //         ratingScale: item?.rating_titile,
  //         definition: item?.definition,
  //       }
  //     }
  //   })
  //   if (FilteredRatingScale && FilteredRatingScale.length > 0) {
  //     setratingdefenition(FilteredRatingScale[0]?.definition);
  //     setratingscaledef(FilteredRatingScale[0]?.rating_titile)
  //   } else {
  //     // Handle the case when FilteredRatingScale is empty
  //     // setratingdefenition("No rating definition found");
  //   }
  //   console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, "Overall_ratingg")

  // }, [ratingsData, employeeData])
  const [anchorE22, setAnchorE22] = React.useState<HTMLButtonElement | null>(null);
  const handleClose22 = () => {
    setAnchorE22(null);
  };
  const handleClick22 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE22(event.currentTarget);
  };

  const [anchorEls6, setAnchorEls6] = React.useState<HTMLButtonElement | null>(null);
  const openInfo66 = Boolean(anchorEls6);
  const id66 = openInfo66 ? "simple-popover" : undefined;
  const handleClickInfo66 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls6(event.currentTarget);
  };
  const handleCloseInfo66 = () => {
    setAnchorEls6(null);
  };
  const open22 = Boolean(anchorE22);
  const id22 = open22 ? "simple-popover" : undefined;
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorReject, setAnchorReject] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openReject = Boolean(anchorReject);
  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setappraisalAttachments(
      employeeData &&
      employeeData?.data?.appraisal?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k.url}> {k.name} </a>
              <br />
            </div>
          );
        })
    );
    // setOpen2true);
    setAnchorEl7(event.currentTarget);
  };

  const handleClickOpen8 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setappraisalAttachments(
    //   employeeData &&
    //   employeeData?.data?.appraisal?.attachments
    //     .filter((i: any) => i?.objective_description === j.name._id)
    //     .map((k: any) => {
    //       return (
    //         <div>
    //           <a href={k.url}> {k.name} </a>
    //           <br />
    //         </div>
    //       );
    //     })
    // );
    // setOpen2true);
    setAnchorReject(event.currentTarget);
  };

  const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
  };

  const handleClose8 = () => {
    setAnchorReject(null);
    // setOpen2(false);
  };
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };
  console.log(ratingReviewer, "test");

  //slider validation

  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");

  // useEffect(() => {
  //   setratingparams(ratingEmployee);
  // }, [ratingEmployee]);

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
  };

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    // if (ratingEmployee === j.rating) {
    //   setrejectAlertMessage(
    //     // "You cannot put the same rating as the Employee. Please change the Rating."
    //     "You cannot select the same rating as the Employee. Please change the rating."
    //   );
    //   setrejectAlert(true);
    // } else {
    //   if (j) setRating(j._id);
    //   // setratingSelection(true);
    // }
    if (j) setRating(j._id);
  };
  console.log(ratingparams, "ratingparams");
  console.log(ratingEmployee, "ratingEmployee");
  //slider validation

  useEffect(() => {
    if (employeeData) {
      let temp = employeeData.data.appraisal.objective_description.filter(
        (objDesc: any) => {
          return objDesc.rating_rejected === true;
        }
      );
      console.log(temp.length, "disableRejectedddd");
      if (temp.length > 0) {
        setDisableAccept(true);
      } else {
        setDisableAccept(false);
      }
    }
  }, [employeeData]);

  const acceptAppraisalHandler = () => {
    // if (appraiserComments == "" || appraiserComments == undefined) {
    //   setOpenValidation(true);
    //   setMessage("Please add Appraiser comments in the recommendation.")
    // } else {
    setDisableButtons(true);
    let employeeRejectedRatings = employeeData?.data?.employee?.objective_description?.filter((item: any) => {
      return item.rating_rejected == true
    }).map((item: any) => item?.name?._id);
    let actionPerformed = objectiveDescription?.filter((item: any) => {
      return employeeRejectedRatings?.includes(item?.name?._id) && item?.action_performed == false
    });
    if (actionPerformed?.length > 0) {
      setOpenSaved(true);
      setMessage("You cannot submit the performance appraisal. Please accept or reject the ratings.")
    }
    else if (objectiveDescription) {
      let Message = "";
      let Status = false;
      objectiveDescription?.forEach((i: any, index: any) => {
        if (i.ratings?.rating !== "" && i.ratings?.rating !== undefined) {
          if (((i.ratings?.rating < 3) || (i.ratings?.rating >= 4)) && (i.comments?.trim() == "" || i.comments?.trim() == undefined)) {
            Status = true;
            Message = `It is mandatory to provide a justification for the rating below 3, and 4 and above.`
          }
        }
        if (index == objectiveDescription?.length - 1) {
          if (Status === true) {
            setOpenSaved(true);
            setMessage(Message);
          }
          else {
            // setMessage("Did you review the recommendations ?") 
            updateEmployee({
              "appraisal.objective_description": objectiveDescription,
              id: employee_id,
            });
            setMoveTab(false);
            setOpenSaved(false);
            setMessage("Are you sure you wish to accept the performance appraisal?");
            setOpenAcceptAlert(true);
            // if (!reviewedOverallFeedback) {
            //   setOpenReviewAlert(true);
            //   setMessage("Have you reviewed the overall feedback of the performance appraisal?")
            // } else {
            //   setMessage("Are you sure you wish to accept the performance appraisal?");
            //   setOpenAcceptAlert(true);
            // }

          }
        }

      })
    }
    // setOpenReviewAlert(true);
    // setMessage("Have you reviewed the overall feedback of the performance appraisal?")

    // }

  };

  const saveCommentsAsDraft = () => {
    setDisableButtons(true);
    let trimObjectiveDescription = objectiveDescription?.map((item: any) => {
      return {
        ...item,
        comments: item?.comments?.trim()
      }
    });
    updateEmployee({
      "appraisal.objective_description": trimObjectiveDescription,
      "appraisal.pa_status": "Pending with Appraiser",
      "appraisal.appraiser_status": "draft",
      id: employee_id,
    }).then((res: any) => {
      if (!res.error) {
        setMoveTab(false);
        setnavPrompt(false);
        setDisableButtons(false);
        //new alert 
        setSuccessAlertTrigerMSG("Changes were successfully saved.")
        setSuccessAlertTriger(true)
      } else {
        updateLoggedRole({
          pa_action_by: `${res.error} : ${new Date()}`,
          id: employee_id
        })
        setMessage("Something Went Wrong.")
        setOpen33(true)
      }
    });
    // setOpenSaved(true);

    //setMessage("Changes were successfully saved.")

  };

  const handleValidationClose = () => {
    setOpenValidation(false);
    setMessage("")
  }

  const handleAcceptReviewAlert = () => {
    setReviewedOverallFeedback(true)
    setOpenReviewAlert(false);
    setMessage("Are you sure you wish to accept the performance appraisal?");
    setOpenAcceptAlert(true);
  }

  const handleReviewAlertClose = () => {
    setOpenReviewAlert(false);
    setMessage("");
    setValue(1);
  }

  const handleRejectReviewAlertClose = () => {
    setOpenRejectReviewAlert(false);
    setMessage("");
    setValue(1);
  }

  const handleRejectReviewAlert = () => {
    setReviewedOverallFeedback(true);
    setOpenRejectReviewAlert(false);
    setMessage("Are you sure you wish to reject the performance appraisal?");
    setOpenRejectAlert(true);
  }

  const handleAcceptAlert = () => {
    setOpenAcceptAlert(false);
    setnavPrompt(false);
    setMessage("");
    if (disableAccept === false) {

      let appraisalObjectiveDescription = employeeData?.data?.appraisal?.objective_description?.map(
        (i: any) => {
          return {
            ...i,
            action_performed: false,
            comments: i.comments?.trim(),
            rejection_reason: i.rejection_reason.trim()
          };
        }
      );

      /* As we will be showing only normalized rating as previous rating after employee rejection , no need of copying previous rating  */
      // let previousRating = employeeData?.data?.appraisal_previous_submission?.objective_description
      //   .map((item: any) => item)

      let employeeObjectiveDescription = employeeData?.data?.employee?.objective_description
        .map((item: any) => {
          return {
            ...item,
            rating_rejected: false
          }
        })

      appraiserAcceptsEmployee({
        // employee_id
        appraisalObjectiveDescription: appraisalObjectiveDescription,
        comments: appraiserComments?.trim(),
        // previousRating: previousRating,
        employeeObjectiveDescription: employeeObjectiveDescription,
        current_overallRating: employeeData?.data?.current_rating?.overall_rating,
        current_previous_submission: employeeData?.data?.current_rating.objective_description,
        employee_previous_submission: employeeObjectiveDescription,
       appraiser_overall_feedback : otherComments1?.trim(),
        // talentCategory : talentCategory,
        id: employee_id,
      }).then((res: any) => {
        if (!res.error) {
          updateLoggedRole({
            pa_action_by: `Appraiser (Accepted) : ${new Date()}`,
            id: employee_id
          });
          setDisableButtons(false)

          // appraiserUpdateRating({
          //   "appraisal.comments": appraiserComments,
          //   id: employee_id,
          // });
          // changed as per 6/13/2023
          if (Math.abs(employeeData?.data?.current_rating?.overall_rating - employeeData?.data?.normalizer?.normalized_overallRating) >= 0.3) {
            // setMessage("The performance appraisal has been submitted to the Reviewer for re-normalization.The Employee’s overall PA rating changed after the PA meeting by more than 0.3 and must be re-normalized by the Reviewer and the HR Normalizer.")
            // setMessage("The performance appraisal has been submitted to the Reviewer for re-normalization.Your overall rating was changed by more than 0.3 and must be re-normalized by the Reviewer and the HR Normalizer.")
            setSuccessAlertTriger(true)
            setSuccessAlertTrigerMSG("The performance appraisal has been submitted to the Reviewer for re-normalization.Your overall rating was changed by more than 0.3 and must be re-normalized by the Reviewer and the HR Normalizer.")
          } else {
            // setMessage("The performance appraisal has been submitted to the Reviewer for re-normalization.")
            setSuccessAlertTriger(true)
            setSuccessAlertTrigerMSG("The performance appraisal has been submitted to the Reviewer for re-normalization.")
          }
          // setMessage("The performance appraisal has been accepted and submitted for re-normalization.")
          setNavigateDashboard(true);
          // setOpenSubmit(true); //previous alert before snackbar
          //snackbar
          setSuccessAlertTriger(true)

          let appraiserName = employeeData?.data?.appraiser_name;
          let employeeName = employeeData?.data?.first_name;
          let calendarName = employeeData?.data?.calendar?.calendar_type;
          let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
          let previousRating = employeeData?.data?.normalizer?.normalizer_rating;
          let newRating = employeeData?.data?.current_rating?.overall_rating;
          let employeeCode = employeeData?.data?.employee_code;
          let employeeFirstName = employeeData?.data?.first_name;
          let employeeEmail = employeeData?.data?.email;
          let reviewerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.firstName;


          if (Math.abs(employeeData?.data?.current_rating?.overall_rating - employeeData?.data?.normalizer?.normalized_overallRating) >= 0.3) {
            // Notification action Appraiser accepts Employee rejected PA (overall rating difference greater than 0.3): (for Reviewer)
            let tempSubject = APPRAISER_ACCEPTS_RATING_GREATER?.subject;
            tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
            tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
            tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
            tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

            let tempHtml = APPRAISER_ACCEPTS_RATING_GREATER?.html;
            tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
            tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
            tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
            tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
            tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
            tempHtml = tempHtml?.replace("[previous rating]", `${previousRating}`);
            tempHtml = tempHtml?.replace("[new rating]", `${newRating}`);
            tempHtml = tempHtml?.replace("[Reviewer FirstName]", `${reviewerFirstName}`);

            let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
            let email = APPRAISER_ACCEPTS_RATING_GREATER?.to;
            email = email?.replace("[email]", `${reviewerEmail}`);

            sendEmailNotification(
              {
                to: email,
                subject: tempSubject,
                html: tempHtml
              }
            )

            // Notification info Appraiser accepts Employee rejected PA (overall rating difference greater than 0.3) - (for Employee)

            let tempSubjectInfo = APPRAISER_ACCEPTS_RATING_GREATER_INFO?.subject;
            tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
            tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
            tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
            tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);


            let tempHtmlInfo = APPRAISER_ACCEPTS_RATING_GREATER_INFO?.html;
            tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
            tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
            tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);
            tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
            tempHtmlInfo = tempHtmlInfo?.replace("[Appraiser name]", `${appraiserName}`);
            tempHtmlInfo = tempHtmlInfo?.replace("[previous rating]", `${previousRating}`);
            tempHtmlInfo = tempHtmlInfo?.replace("[new rating]", `${newRating}`);
            tempHtmlInfo = tempHtmlInfo?.replace("[Employee FirstName]", `${employeeFirstName}`);

            let email_info = APPRAISER_ACCEPTS_RATING_GREATER_INFO?.to;
            email_info = email_info?.replace("[email]", `${employeeEmail}`);

            sendEmailNotification(
              {
                to: email_info,
                subject: tempSubjectInfo,
                html: tempHtmlInfo
              }
            )
          }
          else {
            let tempSubject = APPRAISER_ACCEPTS_RATING_UPTO_INFO?.subject;
            tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
            tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
            tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
            tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

            let tempHtml = APPRAISER_ACCEPTS_RATING_UPTO_INFO?.html;
            tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
            tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
            tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
            tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
            tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
            tempHtml = tempHtml?.replace("[previous rating]", `${previousRating}`);
            tempHtml = tempHtml?.replace("[new rating]", `${newRating}`);
            tempHtml = tempHtml?.replace("[Employee FirstName]", `${employeeFirstName}`);

            let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.email;
            let employeeEmailupto = employeeData?.data?.email;
            let emailUpto = APPRAISER_ACCEPTS_RATING_UPTO_INFO?.to;
            emailUpto = emailUpto?.replace("[email]", `${employeeEmailupto}`);

            sendEmailNotification(
              {
                to: emailUpto,
                cc: normalizerEmail,
                subject: tempSubject,
                html: tempHtml
              }
            )
          }
        } else {
          updateLoggedRole({
            pa_action_by: `${res.error} : ${new Date()}`,
            id: employee_id
          })
          setMessage("Something Went Wrong.")
          setOpen33(true)
        }
      })
    }
  }

  const handleAcceptAlertClose = () => {
    setOpenAcceptAlert(false);
    setMessage("");
    setDisableButtons(false)
  }


  const handleRejectAlert = () => {
    setOpenRejectAlert(false);
    setnavPrompt(false);
    let appraiserObjDesc = employeeData?.data?.appraisal?.objective_description?.map(
      (i: any) => {
        return {
          ...i,
          action_performed: false,
          comments: i.comments?.trim(),
          rejection_reason: i.rejection_reason
        };
      }
    );

    let previousRating = employeeData?.data?.appraisal_previous_submission?.objective_description
      .map((item: any) => {
        return item
      })
    appraiserRejectsEmployee({
      // employee_id
      id: employee_id,
    });
    appraiserUpdateRating({
      "appraisal.objective_description": appraiserObjDesc,
      "appraisal.comments": appraiserComments?.trim(),
      "appraisal.appraiser_overall_feedback": otherComments1?.trim(),
      "appraisal_previous_submission.objective_description": appraiserObjDesc,
      "appraisal_previous_submission.appraiser_rating": employeeData?.data?.appraisal?.appraiser_rating,
      "appraisal_previous_submission.appraiser_overall_feedback": otherComments1?.trim(),
      "appraisal_previous_rating.objective_description": previousRating,
      "appraisal.appraiser_rating": employeeData?.data?.current_rating?.overall_rating,
      "current_previous_submission.objective_description": employeeData?.data?.current_rating.objective_description,
      "employee_previous_submission.objective_description": employeeData?.data?.employee?.objective_description,
      "appraisal.appraiser_PA_rejected": true,
      id: employee_id,
    }).then((res: any) => {
      if (!res.error) {
        updateLoggedRole({
          pa_action_by: `Appraiser (Rejected) : ${new Date()}`,
          id: employee_id
        });
        setDisableButtons(false)

        // setMessage("The performance appraisal was rejected and submitted to the Employee.")
        setNavigateDashboard(true);
        // setOpenSubmit(true);
        //snackbar
        setSuccessAlertTrigerMSG("The performance appraisal was rejected and submitted to the Employee.")
        setSuccessAlertTriger(true)
        // Notification action Appraiser rejects Employee PA (after employee rejection) -(for Employee)
        let appraiserName = employeeData?.data?.appraiser_name;
        let employeeName = employeeData?.data?.legal_full_name;
        let employeeFirstName = employeeData?.data?.first_name;
        let calendarName = employeeData?.data?.calendar?.calendar_type;
        let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4)

        let tempSubject = APPRAISER_REJECTS_EMPLOYEE?.subject;
        tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
        tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);

        let tempHtml = APPRAISER_REJECTS_EMPLOYEE?.html;
        tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
        tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
        tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
        tempHtml = tempHtml?.replace("[Employee FirstName]", `${employeeFirstName}`);

        let employeeEmail = APPRAISER_REJECTS_EMPLOYEE?.to
        let email = employeeData?.data?.email
        email = email?.replace("[email]", `${employeeEmail}`);

        sendEmailNotification(
          {
            to: email,
            subject: tempSubject,
            html: tempHtml
          }
        )
      } else {
        updateLoggedRole({
          pa_action_by: `${res.error} : ${new Date()}`,
          id: employee_id
        })
        setMessage("Something Went Wrong.")
        setOpen33(true)
      }
    });


    // navigate(`/dashboardreview`);
  }


  const handleRejectAlertClose = () => {
    setOpenRejectAlert(false);
    setMessage("");
    setDisableButtons(false)
  }

  const cancelHandler = () => {
    let appraiserActionPerformed = objectiveDescription?.filter((item: any) => item.action_performed)
    if (appraiserActionPerformed?.length > 0) {
      setCancelRatingsAlert(true);
    } else if (moveTab || navPrompt) {
      setCancelRatingsAlert(true);
    } else {
      navigate(`/dashboardreview`, { state: { from: 1 } })
    }
  }

  const handleCloseCancelRatingsAlert = () => {
    setCancelRatingsAlert(false);
    setMessage("")
  }

  const handleCancelRatingsAlert = () => {
    setnavPrompt(false);
    setCancelRatingsAlert(false);
    let previousData = {
      appraisal: employeeData?.data?.appraisal_previous_submission?.objective_description,
      employee: employeeData?.data?.employee_previous_submission.objective_description,
      current: employeeData?.data?.current_previous_submission.objective_description
    }

    appraiserUpdateRating({
      "appraisal.objective_description": previousData?.appraisal,
      "employee.objective_description": previousData?.employee,
      "current_rating.objective_description": previousData?.current,
      id: employee_id,
    })
      .then((res: any) => {
        if (!res.error) {
          fetchCancel();
          navigate(`/dashboardreview`, { state: { from: 1 } })
        }
      })
  }

  const handleViewPA = () => {
    window.open(`${APPRAISER_VIEW_PA}/employee/${employee_id}`, '_blank')
  }

  const rejectEmployeeHandler = () => {
    setDisableButtons(true);
    let employeeRejectedRatings = employeeData?.data?.employee?.objective_description?.filter((item: any) => {
      return item.rating_rejected == true
    }).map((item: any) => item?.name?._id);
    let actionPerformed = objectiveDescription?.filter((item: any) => {
      return employeeRejectedRatings?.includes(item?.name?._id) && item?.action_performed == false
    });
    if (actionPerformed?.length > 0) {
      setOpenSaved(true);
      setMessage("You cannot submit the performance appraisal. Please accept or reject the ratings.")
    }
    else if (objectiveDescription) {
      let Message = "";
      let Status = false;
      objectiveDescription?.forEach((i: any, index: any) => {
        if (i.ratings?.rating !== "" && i.ratings?.rating !== undefined) {
          if (((i.ratings?.rating < 3) || (i.ratings?.rating >= 4)) && (i.comments?.trim() == "" || i.comments?.trim() == undefined)) {
            Status = true;
            Message = `It is mandatory to provide a justification for the rating below 3, and 4 and above.`
          }
        }
        if (index == objectiveDescription?.length - 1) {
          if (Status === true) {
            setOpenSaved(true);
            setMessage(Message);
          }
          else {
            // setMessage("Did you review the recommendations ?") 
            updateEmployee({
              "appraisal.objective_description": objectiveDescription,
              id: employee_id,
            });
            setMoveTab(false);
            setOpenSaved(false);
            setMessage("Are you sure you wish to reject the performance appraisal?");
            setOpenRejectAlert(true);
            // if (!reviewedOverallFeedback) {
            //   setOpenRejectReviewAlert(true);
            //   setMessage("Have you reviewed the overall feedback of the performance appraisal?")
            // } else {
            //   setMessage("Are you sure you wish to reject the performance appraisal?");
            //   setOpenRejectAlert(true);
            // }

          }
        }

      })
    }
    // else {
    //   setOpenRejectReviewAlert(true);
    //   setMessage("Have you reviewed the overall feedback of the performance appraisal?")
    // }
  };

  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
      // opacity: open ? "1" : "0",
    },
  };

  const getPAStatus = (data: any) => {
    if (data?.appraisal?.status == "in-progress" || data?.appraisal?.status == "normalized") {
      return "In progress";
    } else if (data?.appraisal?.status == "completed") {
      return "Completed";
    } else if (data?.appraisal?.status == "not-started") {
      return "Not started";
    } else if (data?.appraisal?.status == "normalized") {
      return "Normalized";
    } else if (data?.appraisal?.status == "rejected") {
      return "Employee rejected";
    }
  };

  const handleClickOpenAttachment = (e: any) => {
    document.getElementById("photo")?.click();
  };


  const getAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.employee?.attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k.url}> {k.name} </a> <br />
            </div>
          ),
          remove: k.name,
        };
        // return k.name
      });
  };

  const showEmployeeAttachment = (id: any) => {
    return employeeData?.data?.employee?.objective_description
      .filter((i: any) => i?.name._id == id)
      .map((j: any) => j.rating_rejected)[0]
  };

  const getAttachments1 = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k.url}> {k.name} </a> <br />
            </div>
          ),
          remove: k.name,
        };
        // return k.name
      });
  };

  const getAppraiserRejectionAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.rejection_attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k.url}> {k.name} </a> <br />
            </div>
          ),
          remove: k.name,
        };
        // return k.name
      });
  };

  // function to change appraiser comments 

  const appraiserCommentsHandler = (e: any, j: any) => {
    setObjectiveDescription(() => {
      return objectiveDescription.map((item: any) => {
        return item?.name?._id == j?.name?._id ?
          {
            ...item,
            comments: e.target.value
          }
          : item;
      });
    })
  }


  const [updateEmployee] = useUpdateEmployeeAppraisalMutation();
  const [openSaved, setOpenSaved] = React.useState(false);
  const [openSubmit, setOpenSubmit] = React.useState(false);
  const [moveTab, setMoveTab] = useState<any>(false)
  const [message, setMessage] = useState<any>("")
  const [navigateDashboard, setNavigateDashboard] = useState<any>(false)
  const [appOverallFeed, setAppOverallFeed] = useState<any>("")

  useEffect(() => {
    if (employeeData) {
      setAppOverallFeed(employeeData?.data?.appraisal?.appraiser_overall_feedback);
    }
  }, [employeeData]);
  const backHandler = () => {
    if (moveTab == true && value == 1) {
      setOpenSaved(true);
      setMessage("Please save the changes before leaving the page.")
    } else {
      setValue(0);
    }
  }
  const handleCloseSaved = () => {
    setOpenSaved(false);
    setMessage(false);
    setNavigateDashboard(false);
    setDisableButtons(false)
  };
  const handleCloseSubmit = () => {
    setOpenSubmit(false);
    setMessage(false)
    setValue(1);
    if (navigateDashboard === true) {
      navigate(`/dashboardReview`, {
        state: {
          from: 1,
        }
      });
    }
    // setNavigateDashboard(false)
  };

  const saveRecommendationsHandler = () => {

    // if (otherComments1 == "" || otherComments1 == null || otherComments1 == undefined) {
    //   setOpenSaved(true);
    //   setMessage("Please fill in all the mandatory fields (*).")
    // } else {
    setDisableButtons(true);
    updateEmployee({
      id: employee_id,
      // "employee.training_recommendation": trainingRecommendationValues,
      // "employee.area_of_improvement": area,
      // "appraisal.area_of_improvement": appraiserAreaofImprovement,
      // "appraisal.training_recommendation": appraiserTrainingRecommendations,
      "appraisal.appraiser_overall_feedback": otherComments1?.trim(),
      "appraisal.pa_status": "Pending with Appraiser",
      "appraisal.appraiser_status": "draft",
      // "appraisal.comments": appraiserComments,
    }).then((res: any) => {
      setMoveTab(false);
      setnavPrompt(false);
      setDisableButtons(false);
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true)
    });
    // if (moveTab == true) {
    //   setOpenSaved(true);
    //   setMoveTab(false);
    //   setMessage("Changes were successfully saved.")
    // } else {
    //   setOpenSaved(true);
    //   setMoveTab(false);
    //   setMessage("No changes were made to save.")
    // }
    //setOpenSaved(true);

    //setMessage("Changes were successfully saved.")



    // }
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // if(navPrompt === true){
    //   setrejectAlert(true);
    // } 
    if (moveTab == true) {
      setOpenSaved(true);
      setMessage("Please save the changes before leaving the page.")
    }
    else {
      setValue(newValue);
    }


  };
  //infoicon popover
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
  const [specificAction1, setspecificAction1] = useState<any>(false);
  const [specificAction2, setspecificAction2] = React.useState(false);
  //const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl02, setAnchorEl02] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo101 = Boolean(anchorEl01);
  const openInfo102 = Boolean(anchorEl02);
  const id101 = openInfo101 ? "simple-popover" : undefined;
  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);

  };
  const handleClose101 = () => {
    setAnchorEl01(null);
  };
  const id102 = openInfo102 ? "simple-popover" : undefined;
  const handleClickInfo12 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl02(anchorEl02 ? null : event.currentTarget);
  };
  const handleClose102 = () => {
    setAnchorEl02(null);
  };
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo6 = Boolean(anchorEls);

  const id6 = openInfo6 ? "simple-popover" : undefined;
  const handleClickInfo6 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo6 = () => {
    setAnchorEls(null);
  };
  console.log(employeeData, "employeeData")
  useEffect(() => {
    if (employeeData?.data?.employee?.area_of_improvement) {

      if (employeeData?.data?.employee?.area_of_improvement[0] == '' || employeeData?.data?.employee?.area_of_improvement[0] == undefined) {
        setspecificAction1(false);
      } else {
        setspecificAction1(true);
      }
      console.log(employeeData?.data?.employee?.area_of_improvement, "areaofimprovement")
    }
  }, [employeeData])
  useEffect(() => {

    if (employeeData?.data?.employee?.training_recommendation) {

      if (employeeData?.data?.employee?.training_recommendation[0] == '' || employeeData?.data?.employee?.training_recommendation[0] == undefined) {
        setspecificAction2(false);
      } else {
        setspecificAction2(true);
      }

    }

  }, [employeeData])
  console.log(specificAction1, "specificAction1")
  console.log(specificAction2, "specificAction2")

  console.log(employeeData?.data?.employee?.training_recommendation, "trainingrecommendation")
  //infoicon popover

  useEffect(() => {
    if (employeeData) {
      let tempTraining = employeeData?.data?.appraisal?.training_recommendation.filter((item: any) => {
        return item.name.title !== "" || item.name.title !== undefined
      })
      if (tempTraining && tempTraining?.length > 0) {
        setShowTrainingRecommendation(true)
      } else {
        setShowTrainingRecommendation(false)
      }
    }
  }, [employeeData])
  // previous rating
  const [anchorPreviousRatingPopOver, setAnchorPreviousRatingPopOver] = React.useState<HTMLElement | null>(
    null
  );
  const openPreviousRating = Boolean(anchorPreviousRatingPopOver);
  const id_Previous_Rating = openPreviousRating ? "simple-popover" : undefined;

  const handlePreviousRatingPopOverClose = () => {
    setAnchorPreviousRatingPopOver(null)
  }

  const handlePreviousRatingPopOverOpen = (event: React.MouseEvent<HTMLElement>, j: any) => {
    setAnchorPreviousRatingPopOver(event.currentTarget);
  };

  //  to convert date dd/mm/yyyy format to mm/dd/yyyy
  const date = new Date(employeeData?.data?.employee?.one_to_one_meeting?.slice(0, 10));
  const One_To_One_Meeting_Date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  React.useEffect(() => {
    if (employeeData) {
    if (!employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser")) {
      navigate(`${APPRAISER_VIEW_PA}/employee/${employee_id}`)
    }
    }
  },[employeeData])
  return (
    <>
      <Drawer anchor={"right"} open={isDrawerOpen}>
        <div
          style={{
            paddingLeft: "20px",
            paddingTop: "20px",
            paddingBottom: "20px",
            backgroundColor: "#ebf2f4",
            color: "#3E8CB5",
            fontSize: "20px",
          }}
        >
          Appraiser Action

        </div>



        <Dialog
          open={rejectAlert}
          onClose={handleSliderDialogClose}
          // aria-labelledby="responsive-dialog-title"
          // BackdropProps={{
          //   style: { background: "#333333 !important", opacity: "10%" },
          // }}
          PaperProps={{
            style: {
              // borderColor:'blue',
              //border:'1px solid',
              boxShadow: "none",
              borderRadius: "6px",
              //marginTop: "155px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",
              // maxHeight:"30%"
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              // textAlign: "center",
            },
          }}
        >
          <DialogContent>
            <DialogContentText
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
                // paddingBottom: "12px",
                // paddingRight: "10px",
                // paddingLeft: "10px",
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >
              {/* You cannot put the same rating as the Appraiser. Please change the
              rating. */}
              {rejectAlertMessage}
            </DialogContentText>
          </DialogContent>
          <div style={{ alignItems: "center" }}>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  // marginRight: "10px",
                  height: "35px",
                  width: "70px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleSliderDialogClose}
              // onClick={() => {
              //   handleClickOpen1();
              //   handleClose();
              // }}
              >
                Ok
              </Button>
            </DialogActions>
          </div>
        </Dialog>

        {/*@ts-ignore*/}
        {/* <Item2> */}
        {/* <p style={{ textAlign: "left" }}>Your Action</p> */}
        {/* <div style={{ textAlign: "left", paddingLeft: "10px" }}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                defaultValue={accept}
              >
                <FormControlLabel
                  value="Accept"
                  control={<Radio size="small" />}
                  label={<span style={{ fontSize: "14px" }}>Accept</span>}
                  onChange={(e) => {
                    handleacceptChange(e);
                  }}
                />
                <FormControlLabel
                  value="Reject"
                  control={<Radio size="small" />}
                  label={<span style={{ fontSize: "14px" }}>Reject</span>}
                  onChange={(e) => {
                    handleacceptChange(e);
                  }}
                />
              </RadioGroup>
            </FormControl>
          </div> */}
        {/* </Item2> */}



        {/* {accept === "Accept" && (
          <>
            <Item2>
              <Typography
                // style={{
                //   paddingRight: "273px",
                //   paddingLeft: "20px",
                //   paddingBottom: "10px",
                //   paddingTop: "16px",
                //   //paddingBottom: "10px",
                //   //backgroundColor: "#ebf2f4",
                //   color: "#3E8CB5",
                //   fontSize: "17px",
                //   fontFamily: "arial",
                // }}
                style={{
                  paddingLeft: "8px",
                  paddingBottom: "16px",
                  fontFamily: "arial",
                  color: "#3E8CB5",
                  fontSize: "17px",
                  textAlign: "left",
                  wordBreak: "break-word"
                }}
              >
                {rejectedTitle}
              </Typography>

              <Stack direction="column" position="relative">
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: "6px",
                    fontSize: "12px",
                    fontFamily: "arial",
                    paddingBottom: "10px",
                    paddingTop: "2px",
                    color: "#7A7A7A",
                  }}
                >
                  Rating
                </div>
                <Item1
                  sx={{
                    marginLeft: "2px",
                    padding: "0px",
                    justifyContent: "center",
                  }}
                >
                  <Contain>
                    <Stack
                      direction="column"
                      alignItems="start"
                      display="flex"
                      marginLeft="4px"
                      spacing={1}
                    >
                      <Button
                        style={{
                          //@ts-ignore
                          borderColor: "#3C8BB5",
                          // marginLeft: "30px",
                        }}
                        size="small"
                      >
                        <p
                          style={{
                            fontSize: "11px",
                            color: "#333333",
                            opacity: "80%",
                          }}
                        >
                          {" "}
                          {ratingEmployee}

                        </p>
                      </Button>
                    </Stack>
                  </Contain>
                </Item1>
              </Stack>

              <Typography
                style={{
                  paddingRight: "381px",
                  fontSize: "12px",
                  color: "#7A7A7A",
                  paddingTop: "10px",
                  paddingBottom: "12px",
                  fontFamily: "arial",
                }}
              >
                Comments
              </Typography>

              <TextField
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                size="small"
                multiline
                style={{ paddingRight: "100px", width: "75%" }}
                value={appraiserInitialComments}
                inputProps={{ maxLength: 500 }}
                onChange={(e) => {
                  setAppraiserInitialComments(e.target.value);
                  // setnavPrompt(true);
                }}
              />

              <Typography
                style={{
                  paddingRight: "395px",
                  fontSize: "12px",
                  color: "#7A7A7A",
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  fontFamily: "arial",
                }}
              >
                Reason
              </Typography>

              <TextField
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                size="small"
                multiline
                style={{ paddingRight: "100px", width: "75%" }}
                value={comments}
                inputProps={{ maxLength: 500 }}
                onChange={(e) => {
                  setComments(e.target.value);
                  // setnavPrompt(true);
                }}

              // fullWidth
              />

              <Stack
                alignItems="left"
                direction="row"
                paddingLeft="8px"
                paddingTop="20px"
                spacing={2}
              >
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    height: "35px",
                    // width: "70px",
                    background: "transparent",
                  }}
                  variant="outlined"
                  // onClick={() => acceptHandler()}
                >
                  {" "}
                  Save as Draft
                </Button>
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    height: "35px",
                    width: "70px",
                    background: "transparent",
                  }}
                  variant="outlined"
                  onClick={closeDrawer}
                >
                  {" "}
                  Cancel{" "}
                </Button>
              </Stack>
            </Item2>
          </>
        )} */}

        {accept === "Reject" && (
          <>
            <Item2 sx={{ width: "fitContent" }}>
              <Typography
                style={{
                  paddingLeft: "8px",
                  paddingBottom: "16px",
                  fontFamily: "arial",
                  color: "#3E8CB5",
                  fontSize: "17px",
                  textAlign: "left",
                  wordBreak: "break-word"
                }}
              >
                {rejectedTitle}
              </Typography>
              <div
                style={{
                  textAlign: "left",
                  paddingLeft: "6px",
                  fontSize: "12px",
                  paddingBottom: "7px",
                  fontFamily: "arial",
                  color: "#7A7A7A",
                  // paddingTop: "13px",
                }}
              >
                Appraiser Rating
              </div>

              <>
                <Stack
                  style={{ paddingLeft: "4px" }}
                  direction="row"
                  spacing={1.7}
                // height="50px"
                >
                  {ratingsData &&
                    ratingsData.data
                      .slice()
                      .sort(function (a: any, b: any) {
                        return a.rating - b.rating;
                      })
                      .map((ratings: any, _id: any) => (
                        <Item1
                          sx={{
                            marginLeft: "2px",
                            padding: "0px",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          <Contain>
                            <Button
                              onClick={() => {
                                //if (ratings) setRating(ratings._id);
                                // ratingColorHandler(rating._id)
                                setnavPrompt(true);
                                handleRatingAlert(ratings);
                                // setDisplayEmployeeRating(false);
                                setRating(ratings._id);
                                setRatingValue(ratings.rating);
                              }}
                              disabled={ratings.rating < normalizedRating}
                              style={{
                                //@ts-ignore
                                borderColor:
                                  rating === ratings._id && "#3C8BB5",
                                backgroundColor: rating === ratings._id ? "rgb(123 210 255 / 29%)" : "",
                                cursor: ratings.rating < normalizedRating ? "default" : "pointer"
                              }}
                              size="small"
                            >
                              <p
                                style={{
                                  fontSize: "11px",
                                  color: "#333333",
                                  opacity: "80%",
                                }}
                              >
                                {ratings.rating}
                              </p>
                              {console.log(`Rating: ${ratings.rating}, Disabled: ${ratings.rating < 3}`)}
                            </Button>

                            {/* {rating === ratings._id && (
                              <p
                                style={{
                                  color: "#3C8BB5",
                                  fontSize: "10px",
                                  position: "absolute",
                                  left: "50%",
                                  transform: "translate(-50%, 0px)",
                                  maxWidth: "50px",
                                }}
                              >
                                {ratings.rating_scale}
                              </p>
                            )} */}
                          </Contain>
                        </Item1>
                      ))}
                </Stack>

                <Stack direction="column" position="relative">
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "6px",
                      fontSize: "12px",
                      fontFamily: "arial",
                      paddingBottom: "7px",
                      paddingTop: "16px",
                      color: "#7A7A7A",
                    }}
                  >
                    Employee Rating
                  </div>
                  <Item1
                    sx={{
                      marginLeft: "2px",
                      padding: "0px",
                      justifyContent: "center",
                    }}
                  >
                    <Contain>
                      <Stack
                        direction="column"
                        alignItems="start"
                        display="flex"
                        marginLeft="4px"
                        spacing={1}
                      >
                        <Button
                          style={{
                            //@ts-ignore
                            borderColor: "#3C8BB5",
                            // marginLeft: "30px",
                          }}
                          size="small"
                        >
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#333333",
                              opacity: "80%",
                            }}
                          >
                            {" "}
                            {ratingEmployee}
                            {/* {employeeData &&
                                      employeeData?.data?.employee?.objective_description
                                        .filter(
                                          (i: any) => i.name._id === j.name._id
                                        )
                                        .map((k: any) => {
                                          if (k.ratings)
                                            return k.ratings.rating;
                                        })[0]} */}
                          </p>
                        </Button>
                        <span
                          style={{
                            color: "#3C8BB5",
                            fontSize: "10px",
                            // paddingLeft: "15px",
                            position: "absolute",
                            top: "95%",
                            transform: "translate(-25%, 0px)",
                            maxWidth: "50px",
                          }}
                        >
                          {/* Average one
                          {getRatingDescription(ratingEmployee)} */}
                        </span>
                      </Stack>
                    </Contain>
                  </Item1>
                </Stack>

                <Stack direction="column" position="relative">
                  <div
                    style={{
                      textAlign: "left",
                      paddingLeft: "6px",
                      fontSize: "12px",
                      fontFamily: "arial",
                      paddingBottom: "7px",
                      paddingTop: "16px",
                      color: "#7A7A7A",
                    }}
                  >
                    Normalized Rating
                  </div>
                  <Item1
                    sx={{
                      marginLeft: "2px",
                      padding: "0px",
                      justifyContent: "center",
                    }}
                  >
                    <Contain>
                      <Stack
                        direction="column"
                        alignItems="start"
                        display="flex"
                        marginLeft="4px"
                        spacing={1}
                      >
                        <Button
                          style={{
                            //@ts-ignore
                            borderColor: "#3C8BB5",
                            // marginLeft: "30px",
                          }}
                          size="small"
                        >
                          <p
                            style={{
                              fontSize: "11px",
                              color: "#333333",
                              opacity: "80%",
                            }}
                          >
                            {" "}
                            {normalizedRating}
                            {/* {employeeData &&
                                      employeeData?.data?.employee?.objective_description
                                        .filter(
                                          (i: any) => i.name._id === j.name._id
                                        )
                                        .map((k: any) => {
                                          if (k.ratings)
                                            return k.ratings.rating;
                                        })[0]} */}
                          </p>
                        </Button>
                        <span
                          style={{
                            color: "#3C8BB5",
                            fontSize: "10px",
                            // paddingLeft: "15px",
                            position: "absolute",
                            top: "95%",
                            transform: "translate(-25%, 0px)",
                            maxWidth: "50px",
                          }}
                        >
                          {/* Average one
                          {getRatingDescription(ratingEmployee)} */}
                        </span>
                      </Stack>
                    </Contain>
                  </Item1>
                </Stack>

              </>
            </Item2>
            {/* <Typography
              style={{
                textAlign: "left",
                paddingLeft: "22px",
                paddingTop: "16px",
                fontSize: "12px",
                color: "#7A7A7A",
                fontFamily: "Arial",
              }}
            >
              Submit reason for rejection
            </Typography>
            <FormControl
              style={{
                textAlign: "left",
                paddingLeft: "27px",
                fontSize: "12px",
                color: "#7A7A7A",
              }}
            >
              <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
              >
                <FormControlLabel
                sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      },
                    }}
                  value="Rating was not agreed with the Employee"
                  control={<Radio />}
                  label="Rating was not agreed with the Employee"
                  onChange={(e) => {
                    handlereasonChange(e);
                  }}
                />
                <FormControlLabel
                sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      },
                    }}
                  value="An error made by the Employee"
                  control={<Radio />}
                  label="An error made by the Employee"
                  onChange={(e) => {
                    handlereasonChange(e);
                  }}
                />
              </RadioGroup>
            </FormControl> */}
            <div
              style={{
                textAlign: "left",
                paddingLeft: "22px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial",
              }}
            >
              Rejection Reason<span style={{ fontSize: "20px" }}
              ></span>
            </div>
            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  fontFamily: "Arial",
                  color: "#333333",
                },
              }}
              size="small"
              multiline
              style={{ paddingLeft: "24px", width: "75%" }}
              value={comments}
              inputProps={{ maxLength: 500 }}
              onChange={(e) => {
                setComments(e.target.value);
                // setnavPrompt(true);
              }}
            />

            <div
              style={{
                textAlign: "left",
                paddingLeft: "22px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial",
              }}
            >
              Appraiser Comments<span style={{ fontSize: "20px" }}
              ></span>
            </div>
            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  fontFamily: "Arial",
                  color: "#333333",
                },
              }}
              size="small"
              multiline
              style={{ paddingLeft: "24px", width: "75%" }}
              value={sliderAppraiserComments}
              inputProps={{ maxLength: 500 }}
              onChange={(e) => {
                setSliderAppraiserComments(e.target.value);
                // setnavPrompt(true);
              }}
            />

            <div
              style={{
                textAlign: "left",
                paddingLeft: "24px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial",
              }}
            >
              Attachment
            </div>{" "}
            <Stack>
              <div style={{ paddingLeft: "24px" }}>
                <Stack direction="row" alignItems="center" gap="5px">
                  <span>
                    <input
                      id="photo"
                      name="photo"
                      type="file"
                      ref={inputRef}
                      style={{ display: "none" }}
                      multiple={true}
                      onChange={handleImageChange}
                    />
                  </span>

                  <IconButton

                  >
                    <img src={Uploadatt}
                      onClick={(e: any) => {
                        // setActiveObjectiveDescriptionName(j?.name?._id)
                        handleClickOpenAttachment(e);
                        // setPopoverIndex(index)
                      }}
                    />
                  </IconButton>

                  <> <Text><label style={{ fontSize: "14px", color: "#7a7a7a", fontFamily: "arial" }}>{name}</label></Text></>

                  {/* {employeeData &&
                  objectiveTitleData &&
                  objectiveDescription?.map((j: any, index: number) => {   
                  
                    return (
                      <>
                        {employeeData && getAttachments1(j?.name?._id)?.map((k: any, index1: any) => {
                        
                          {
                            return (
                              <>
                                <Stack
                                  spacing={1}
                                  direction="row"
                                  alignItems="center"
                                >
  
                                  <Typography
                                    style={{
                                      fontSize: "12px",
                                      fontFamily: "Arial",
                                      color: "#333333",
  
                                      // maxWidth:"215px",
                                      // wordBreak:"break-all"
                                    }}
                                  >
                                    {index1 + 1}.
                                  </Typography>
                                  <Typography
                                    style={{
                                      fontSize: "12px",
                                      fontFamily: "Arial",
                                      color: "#333333",
                                      whiteSpace: "nowrap",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      width: "170px"
                                    }}
                                  >
                                    {k.resp}
                                  </Typography>
                                  <Stack direction="row">                              
                                    <IconButton>                                 
                                      <img
                                        src={Removeatt}
                                        onClick={() => deleteEmployeeMutation({
                                          employee_id: employee_id,
                                          name: k.remove
                                        })}
                                         />
                                    </IconButton>
                                  </Stack>
  
                                </Stack>
                              </>
                            ) 
                          }
                         
                        })}

                      </>)
                  })} */}

                  <div>
                    {positionHide && (
                      <IconButton
                        onClick={() => {
                          // setFileSelected('')
                          // setName('')
                          resetFileInput();
                        }}
                      >
                        <img src={Removeattnew} alt="icon" />
                      </IconButton>
                    )}
                  </div>
                </Stack>
              </div>
            </Stack>
            <Stack
              alignItems="left"
              direction="row"
              paddingLeft="24px"
              paddingTop="16px"
              spacing={2}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "35px",
                  // width: "70px",
                }}
                variant="outlined"
                onClick={() => {
                  ratingSubmitHandler();
                  setnavPrompt(false)
                  // if (name && fileSelected) {
                  //   return imageClick();
                  // }
                }}
              >
                {" "}
                Save as Draft
              </Button>
              {showWithdraw && (
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    background: "transparent",
                    height: "35px",
                    width: "70px",
                  }}
                  variant="outlined"
                  onClick={() => {
                    ratingWithdrawHandler();
                    // setnavPrompt(false)
                  }}
                >
                  {" "}
                  Withdraw{" "}
                </Button>
              )}
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "35px",
                  width: "70px",
                }}
                variant="outlined"
                onClick={closeDrawer}
              >
                {" "}
                Cancel{" "}
              </Button>
            </Stack>
          </>
        )}
      </Drawer>

      <div
        id="pdf"
        style={{
          backgroundColor: "#F1F1F1",
          minHeight: "100px",
          overflow: "hidden",
          height: "auto",
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
          marginLeft="25px"
        >
          <Breadcrumbs sx={{ marginTop: "5px" }} aria-label="breadcrumb">
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={`/dashboardreview`}
            >
              My Team Dashboard
            </Link>
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={`/dashboardreview`}
              state={{
                from: 1,
              }}
            >
              My Actions
            </Link>
            <Typography
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }}
            // color="text.primary"
            // to={""}
            // aria-current="page"
            >
              {/* Appraiser Action */}
              {employeeData && employeeData?.data?.calendar?.name}
            </Typography>
          </Breadcrumbs>
        </Stack>

        <Box
          sx={{
            // maxWidth: "95% !important",
            // height: "1425px",
            background: "#fff",
            //marginTop: "35px",
            minHeight: "100px",
            overflow: "hidden",
            marginLeft: "25px",
            marginRight: "25px",
            marginBottom: "25px"
          }}
        >
          <Box
            style={{
              padding: "35px",
            }}
          >

            <Stack
              className={classes.heading}
              direction="row"
              alignItems="center"
              paddingBottom="10px"
              justifyContent="space-between"
            >
              <Typography
                style={{
                  color: "#3E8CB5",
                  fontWeight: "400",
                  fontSize: "28px",
                  fontFamily: "Arial",
                }}
              >
                Welcome to Performance Appraisal
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>

                <Typography
                  style={{
                    fontSize: "17px",
                    color: "#3e8cb5",
                    fontFamily: "Arial",
                    // paddingRight: "10px",
                  }}
                >
                  PA Status:
                  <span
                    style={{
                      color: "#717171",
                      fontSize: "17px",
                      fontFamily: "Arial",
                    }}
                  >
                    {getPAStatus(employeeData?.data)}
                  </span>
                </Typography>
                {/* {employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
            <> */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Overallrating style={{ display: "flex", alignItems: "center", fontSize: "17px", }} >
                    Previous Rating:
                    {/* {employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && ( */}

                    <Overallratingvalue style={{ fontSize: "14px" }} >
                      <span style={{ color: "#717171", fontSize: "17px", fontFamily: "Arial", }} > 
                      { ( employeeData?.data?.previous_rating && employeeData?.data?.previous_rating !== 0  && employeeData?.data?.previous_rating !== undefined) ? employeeData?.data?.previous_rating?.toFixed(2) : "-"}</span>
                    </Overallratingvalue>
                    {/* )} */}
                  </Overallrating>
                  {employeeData?.data?.previous_rating && employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
                    <Link
                      to={`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`}
                      state={{
                        employeeCodeFromLanding: employeeData?.data?.employee_code,
                        calendarTypeFrom: employeePA_Data?.employees[0]?.calendar,
                        yearFrom: employeePA_Data?.employees[0]?.createdAt?.slice(0, 4)
                      }}
                    >
                      <Typography style={{ marginTop: "2px" }}>
                        <img
                          src={Eye}
                          alt="Eye Icon"
                        />
                      </Typography>
                    </Link>
                  )}
                </Stack>
                {/* </>
          )} */}

                        <Button
                              variant="outlined"
                              size="small"
                              style={{
                                textTransform: "none",
                                fontSize: "15px",
                                fontFamily: "Arial",
                                borderColor: "#3E8CB5",
                                color: "#3E8CB5",
                                // marginRight: "63px",
                              }}
                            >
                  
                  <label 
                    onClick={() => {
                      handleViewPA();
                    }}> 
                    <img style={{
                    cursor: "pointer",height:"15px",width:"15px"
                  }} src={Downloadss} alt="Download" />
                    {/* <img
                  src={Eye}
                    alt="Eye Icon"
                                      /> */}
                  </label>
                </Button>
              </Stack>
            </Stack>

            {/* <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "20px" }}>
              <Grid container spacing={0} sx={{ alignItems: "center" }}>
                <Grid item xs={1} md={0.7}>
                  <Typography
                    style={{ paddingTop: "10px", paddingBottom: "10px" }}
                  >
                    <Avatar sx={{ width: 60, height: 60 }}>A</Avatar>
                  </Typography>
                </Grid>
                <Grid item xs={9} md={10}>
                  <Stack direction="column" spacing={1}>
                    <div
                      style={{
                        fontSize: "17px",
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                      }}
                    >
                      {employeeData?.data?.legal_full_name}
                    </div>
                    <div
                      style={{
                        color: "#333333",
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        marginTop: "5px",
                      }}
                    >
                      {employeeData?.data?.position_long_description}{" "}
                      <div
                        style={{
                          borderRadius: "50%",
                          marginRight: "10px",
                          verticalAlign: "middle",
                          width: "4px",
                          height: "4px",
                          display: "inline-block",
                          background: "#999999",
                          opacity: "50%",
                          fontSize: "12px",
                          fontFamily: "Arial",
                        }}
                      />{" "}
                      {employeeData?.data?.division}
                    </div>
                    <div
                      style={{
                        opacity: "50%",
                        fontSize: "12px",
                        fontFamily: "Arial",
                        marginTop: "5px",
                      }}
                    >
                      {employeeData?.data?.employee_code}
                    </div>
                  </Stack>
                </Grid>
                <Grid item xs={1}>
                  <Link to={`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`}>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                      }}
                    >
                      <img src={Downloadss} alt="Download" />
                      <label style={{ paddingLeft: "5px" }}> Download </label>
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Box> */}
            {/* <Typography
            sx={{
              display: "flex",
              justifyContent: "end",
              color: "#52C8F8",
              fontSize: "13px",
              fontFamily: "Arial",
              paddingRight: "10px",
            }}
          >
            View Previous PA
          </Typography> */}
            <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "10px" }}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <div>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography
                      style={{ paddingTop: "10px", paddingBottom: "10px" }}
                    >
                      {/* <Avatar sx={{ width: 60, height: 60 }}>A</Avatar> */}
                      {employeeData?.data?.profile_image_url != undefined ? (
                        <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={employeeData?.data?.profile_image_url} />
                      ) : (
                        <Avatar style={{ width: "55px", height: "55px" }}>
                          {appraisalData &&
                            appraisalData.data.legal_full_name.substring(0, 1)}
                        </Avatar>
                      )}
                    </Typography>
                    <Stack direction="column" spacing={1}>
                      <span
                        style={{
                          fontSize: "17px",
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                        }}
                      >
                        {employeeData?.data?.first_name}
                      </span>
                      <span
                        style={{
                          color: "#333333",
                          opacity: "50%",
                          fontSize: "12px",
                          fontFamily: "Arial",
                          marginTop: "5px",
                        }}
                      >
                        {employeeData?.data?.position_long_description}{" "}
                        {/* <span
                          style={{
                            borderRadius: "50%",
                            marginRight: "10px",
                            verticalAlign: "middle",
                            width: "4px",
                            height: "4px",
                            display: "inline-block",
                            background: "#999999",
                            opacity: "50%",
                            fontSize: "12px",
                            fontFamily: "Arial",
                          }}
                        /> */}
                        {/* {employeeData?.data?.division} */}
                      </span>

                      <span
                        style={{
                          color: "#333333",
                          opacity: "50%",
                          fontSize: "12px",
                          fontFamily: "Arial",
                          marginTop: "5px",
                        }}
                      >
                        Grade {employeeData?.data?.grade}{" "}
                      </span>

                      <span
                        style={{
                          opacity: "50%",
                          fontSize: "12px",
                          fontFamily: "Arial",
                          marginTop: "5px",
                        }}
                      >
                        {employeeData?.data?.employee_code}
                      </span>
                    </Stack>
                  </Stack>
                </div>

                {/* {employeeData?.data?.appraisal?.potential !== false && employeeData?.data?.appraisal?.potential !== undefined && (
                  <Typography
                    style={{
                      fontSize: "16px",
                      color: "#717171",
                      fontFamily: "Arial",
                      paddingTop: "25px",
                      paddingBottom: "25px",
                    }}
                  >
                    Potentional Level:
                    <label style={{
                      fontSize: "16px",
                      color: "#717171",
                      fontFamily: "Arial",

                    }}>{employeeData?.data?.appraisal?.potential}</label>
                  </Typography>
                )} */}

                <div>
                  <Stack
                    direction="column"
                    display="flex"
                    alignItems="center"
                    // gap="8px"
                    paddingRight="10px"
                    paddingBottom="15px"
                  >
                    <Stack direction="row" gap={1}>
                      {employeeDataIsFetching && (
                        <CircularProgress size={15} thickness={7} />
                      )}
                      <Typography
                        style={{
                          fontSize: "17px",
                          color: "#3e8cb5",
                          fontFamily: "Arial",
                        }}
                      >
                        Overall Rating

                        <Popover
                          id={id22}
                          open={open22}
                          anchorEl={anchorE22}
                          onClose={handleClose22}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          PaperProps={{
                            style: {
                              backgroundColor: "FEFCF8",
                              boxShadow: "none",
                              maxWidth: "450px",
                              borderRadius: "5px",
                            },
                          }}
                          sx={{
                            "& .MuiPopover-paper": {
                              border: "1px solid #3e8cb5",
                              backgroundColor: "#ffffff",
                              // left:"840px !important"
                              // width: "30%",
                            },
                          }}
                        >
                          <div
                            style={{
                              padding: "10px",
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              paddingBottom: "5px",
                              paddingTop: "5px",
                              lineHeight: "20px",
                            }}
                          >
                            <b  >{ratingscaledef}</b>:
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {ratingdefenition}
                            </span>
                          </div>
                        </Popover>
                      </Typography>
                    </Stack>
                    <div
                      style={{
                        fontSize: "16px",
                        color: "#333333",
                        paddingTop: "1px",
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      {ratingdefenition?.length > 0 &&
                        <IconButton sx={{ padding: "4px" }} onClick={handleClick22} >
                          <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                        </IconButton>
                      }
                      <b>{employeeData?.data?.current_rating?.overall_rating?.toFixed(2)}</b>
                      {/* <b>{employeeData?.data?.appraisal?.appraiser_rating}</b> */}
                    </div>
                  </Stack>
                </div>
                {/* <span style={{ paddingRight: "10px" }}>
                  <Link to={`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`}>
                    <Button
                      variant="outlined"
                      size="small"
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                      }}
                    >
                      <img src={Downloadss} alt="Download" />
                      <label style={{ paddingLeft: "5px" }}> Download </label>
                    </Button>
                  </Link>
                </span> */}
              </Stack>
            </Box>
            <Box sx={{ paddingTop: "20px" }}>
              {/* <Grid container spacing={0}> */}
              {/* <Grid item xs={12}> */}
              <Stack
                direction="row"
                justifyContent="space-between"
                paddingBottom="20px"
              // maxWidth='88%'
              >
                <Grid item xs={4}>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#3E8CB5",
                      fontFamily: "Arial",
                    }}
                  >
                    Performance Appraisal Period
                  </span>
                  {/* <Stack direction="row" alignItems="baseline" gap="175px"> */}
                  <Typography
                    style={{
                      color: "#717171",
                      marginTop: "8px",
                      fontSize: "16px",
                      fontFamily: "Arial",
                    }}
                  >
                    {/* {
                      months[
                      dayjs(employeeData?.data?.calendar?.start_date).month()
                      ]
                    }{" "}
                    -{" "}
                    {
                      months[
                      dayjs(employeeData?.data?.calendar?.end_date).month()
                      ]
                    }
                    {" " + dayjs(employeeData?.data?.calendar?.end_date).year()} */}
                    {employeeData?.data?.calendar?.name}
                  </Typography>
                  {/* <Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    fontFamily: "Arial",
                    // paddingTop: "25px",
                    // paddingBottom: "25px",
                  }}
                >
                  PA Status:Employee Accepted
                </Typography>
                </Stack> */}
                </Grid>
                <Grid item xs={4}>
                  {/* <Typography
                    style={{
                      fontSize: "16px",
                      color: "#717171",
                      fontFamily: "Arial",
                      paddingTop: "25px",
                      paddingBottom: "25px",
                    }}
                  >
                    PA Status : <span>{employeeData?.data?.appraisal?.status === "in-progress" ? "In-progress" :
                      employeeData?.data?.appraisal?.status === "not-started" ? "Not-started" :
                        employeeData?.data?.appraisal?.status} </span>
                  </Typography> */}
                </Grid>

                {employeeData?.data?.appraisal_template?.potential == true && (
                  <Grid item xs={4}>
                    <Stack direction="column" alignItems="flex-end">
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <Typography
                          color="#3e8cb5"
                          fontFamily="arial"
                          fontSize="17px"
                        >
                          <IconButton sx={{ padding: "4px" }} onClick={handleClick1} >
                            <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                          </IconButton>
                          Potential Level

                          <Popover
                            id={id}
                            open={openPotentialInfo}
                            anchorEl={anchorE}
                            onClose={handleClosePotentialInfo}
                            anchorOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "right",
                            }}
                            PaperProps={{
                              style: {
                                backgroundColor: "FEFCF8",
                                boxShadow: "none",
                                maxWidth: "450px",
                                borderRadius: "5px",
                              },
                            }}
                            sx={{
                              "& .MuiPopover-paper": {
                                border: "1px solid #3e8cb5",
                                backgroundColor: "#ffffff",
                                // width: "30%",
                              },
                            }}
                          >
                            <div
                              style={{
                                padding: "10px",
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {employeeData?.data?.appraisal?.potential === "High" && (
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    //color: "#3e8cb5",
                                    fontFamily: "Arial",
                                    // paddingBottom: "5px",
                                    // borderBottom: "1px solid #d9d9d9",
                                  }}
                                >
                                  <b>High:</b>
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                    {nineBoxData &&
                                      nineBoxData?.data[0]?.potential_definitions?.high}
                                  </span>
                                </Typography>
                              )}

                              {employeeData?.data?.appraisal?.potential == "Moderate" && (
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    // color: "#3e8cb5",
                                    fontFamily: "Arial",
                                    // paddingBottom: "5px",
                                    // paddingTop: "5px",
                                    // borderBottom: "1px solid #d9d9d9",
                                  }}
                                >
                                  <b>Moderate:</b>
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                    {nineBoxData &&
                                      nineBoxData?.data[0]?.potential_definitions
                                        ?.moderate}{" "}
                                  </span>
                                </Typography>)}
                              {employeeData?.data?.appraisal?.potential == "Low" && (
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    // color: "#3e8cb5",
                                    fontFamily: "Arial",
                                    // paddingTop: "5px",
                                  }}
                                >
                                  <b>Low:</b>
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                    {nineBoxData &&
                                      nineBoxData?.data[0]?.potential_definitions
                                        ?.low}{" "}
                                  </span>
                                </Typography>)}
                            </div>
                          </Popover>
                        </Typography>
                        <span
                          style={{
                            color: "#717171",
                            marginTop: "8px",
                            fontSize: "16px",
                            fontFamily: "Arial",
                          }}
                        >
                          {employeeData?.data?.appraisal?.potential}
                        </span>
                      </div>
                    </Stack>
                  </Grid>
                )}
              </Stack>
              {/* </Grid> */}
              {/* </Grid> */}
            </Box>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              {/* <Color> */}
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "#ffffff",
                      background: "#3e8cb5",

                    },
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontFamily: "Arial",
                    fontWeight: "700",
                    border: "1px solid #3e8cb59e",
                    maxHeight: "0px",
                    minHeight: "48px",
                    paddingRight: "15px",
                    paddingLeft: "20px"

                  }}
                  icon={
                    <>
                      <TabPanel value={value} index={1}>
                        <IconButton
                          sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                        // aria-describedby={id2}
                        // onClick={handleClickInfo}
                        >
                          <img
                            style={{ width: "12px" }}
                            src={Infoicon}
                            alt="icon"
                          />
                        </IconButton>
                      </TabPanel>
                      <TabPanel value={value} index={0}>
                        <IconButton
                          sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                          aria-describedby={id2}
                          onClick={handleClickInfo}
                        >
                          <img
                            style={{ width: "12px" }}
                            src={Infowhiteicon}
                            alt="icon"
                          />
                        </IconButton>
                      </TabPanel>
                    </>
                  }
                  iconPosition="start"
                  label="Ratings"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{
                    "&.Mui-selected": {
                      color: "#ffffff",
                      background: "#3e8cb5",

                    },
                    textTransform: "capitalize",
                    fontSize: "16px",
                    fontFamily: "Arial",
                    fontWeight: "700",
                    border: "1px solid #3e8cb59e",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                  }}
                  label="Overall Feedback"
                  {...a11yProps(1)}
                />
              </Tabs>
              {/* </Color> */}
            </Box>


            <Typography>
              <Popover
                id={id2}
                open={openInfo}
                anchorEl={anchorEl}
                onClose={handleCloseInfo}
                PaperProps={{
                  style: { width: "260px", marginTop: "55px" },
                }}
              >
                <TableContainer>
                  <Scroll>
                    <CustomScrollbar style={{ width: "100%", height: "225px" }}>
                      <Table
                        sx={{ minWidth: 200,
                          '& th, & td': {
                            borderBottom: 'none', // Remove the bottom border for th and td
                          },
                       }}
                        size="small"
                        aria-label="simple table"
                      >
                        <TableHead style={{ position: "sticky", zIndex: "1000", top: "0px" }}>
                          <TableRow sx={{ bgcolor: "#eaeced" }}>
                            {/* <TableCell
                      align="left"
                      sx={{
                        borderColor: "#F7F9FB",
                        color: "#004C75",
                        fontSize: "12px",
                        width: "40px",
                      }}
                    >
                      {" "}
                      #
                    </TableCell> */}
                            <TableCell
                                align="center"
                                sx={{
                                  maxWidth: "30%",
                                  fontFamily: "Arial",
                                  color: "#3E8CB5",
                                  fontSize: "14px",
                                  fontWeight: "600", // Adjust the maxWidth as needed
                                }}
                            >
                                
                                  Rating
                            </TableCell>
                            <TableCell
                              align="left"
                              sx={{
                                width: "130px",
                              }}
                            >
                              <form>
                                <div
                                  style={{
                                    fontFamily: "Arial",
                                    color: "#3E8CB5",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Rating Title
                                  {/* <option>Rating Scale Title</option> */}
                                </div>
                              </form>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {ratingsData &&
                            ratingsData.data
                              .slice()
                              .sort(function (a: any, b: any) {
                                return a.rating - b.rating;
                              })
                              .map((row: any, index: any) => {
                                return (
                                  <TableRow
                                    key={row._id}
                                    sx={{
                                      "&:last-child td, &:last-child th": {
                                        borderColor: "lightgrey",
                                      },
                                    }}
                                  >
                                    {/* <TableCell
                            component="th"
                            scope="row"
                            align="left"
                            sx={{
                              fontSize: "12px",
                              color: "#014D76",
                              lineHeight: "50px",
                            }}
                          >
                            <div style={{ width:'100px', wordWrap:'break-word'}} >{index + 1}</div>
                          </TableCell> */}
                                    <TableCell
                                      align="center"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                      }}
                                    >
                                      {/* <div style={{ width:'100px', wordWrap:'break-word'}} >{row.rating.toFixed(1)}</div> */}
                                      <div
                                        style={{
                                          //width: "100px",
                                          wordWrap: "break-word",
                                        }}
                                      >
                                        {row.rating}
                                      </div>
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                      }}
                                    >
                                      <div
                                        style={{
                                          width: "147px",
                                          wordWrap: "break-word",
                                        }}
                                      >
                                        {row.rating_scale}
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                        </TableBody>
                      </Table>
                    </CustomScrollbar>
                  </Scroll>
                </TableContainer>
              </Popover>
            </Typography>
            <TabPanel value={value} index={0}>
              <TableContainer sx={{ width: "100%", }}>
                <Table sx={{
                  borderCollapse: 'separate',
                  borderSpacing: '0px 15px'
                }} size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow
                      sx={{
                        "& td, & th": {
                          // border: "1px solid #e0e0e0",
                          bgcolor: "#eaeced",
                          //   whiteSpace:"nowrap"
                        },
                      }}
                    >
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          borderColor: "#F7F9FB",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Objective <br></br> Type
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          borderColor: "#F7F9FB",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Objective<br></br>  Title
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          borderColor: "#F7F9FB",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          padding: "0px 8px"
                        }}
                        align="center"
                      >
                        Objective <br></br>Level
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Arial",
                          borderColor: "#F7F9FB",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          padding: "0px 8px"
                        }}
                        align="center"
                      >
                        Appraiser <br></br> Rating
                      </TableCell>
                      {(<TableCell
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          Appraiser <br></br> Comments
                        </TableCell>)}
                      {employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                        (item.rating_rejected == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
                          <TableCell
                            sx={{
                              fontFamily: "Arial",
                              borderColor: "#F7F9FB",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            align="center"
                          >
                            Appraiser <br></br> Rejection/Change Reason
                          </TableCell>
                        )}
                      {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          borderColor: "#F7F9FB",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          padding:"0px 2px"
                        }}
                        align="center"
                      >
                        Normalized <br></br> Rating
                      </TableCell> */}
                      {employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                        item.rating_rejected == true).length > 0 && (
                          <>
                            <TableCell
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "#F7F9FB",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                                padding: "0px 8px"
                              }}
                              align="center"
                            >
                              Employee <br></br> Rating
                            </TableCell>


                            <TableCell
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "#F7F9FB",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="center"
                            >
                              Employee<br></br> Rejection Reason
                            </TableCell>
                          </>
                        )}

                      {(employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                        item.rating_rejected == true).length > 0 ||
                        (employeeData?.data?.appraisal?.objective_description?.filter
                          ((item: any) => item?.action_performed == true).length > 0)) &&
                        employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") && (
                          <TableCell
                            sx={{
                              fontFamily: "Arial",
                              borderColor: "#F7F9FB",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                              padding: "0px 8px"
                            }}
                            align="center"
                          >
                            Appraiser<br></br>  Actions
                            {isUploading && (
                              <CircularProgress size={15} thickness={7} />
                            )}
                          </TableCell>
                        )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employeeData &&
                      objectiveTitleData &&
                      objectiveDescription.map((j: any, index: number) => {
                        console.log(j,"newjjj")
                        const selectedRating: any = ratingsData?.data?.find((ratings: any) => ratings.rating === j?.ratings?.rating);
                        console.log(selectedRating,"selectedRating")
                        // @ts-ignore
                        return (
                          <>
                            <TableRow
                              sx={{
                                "& td, & th": {
                                  border: "1px solid #80808014 ",
                                  boxShadow: "1px 0px 0px 1px #80808014",
                                  borderBottom: "none",
                                  borderLeft: "0px",
                                  borderTop: "0px"
                                },
                              }}
                            >
                              <TableCell
                                width="150px"
                                // width="22%"
                                sx={{
                                  fontSize: "14x",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  wordBreak: "break-word",
                                  backgroundColor: colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name) != undefined ? colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name)?.color : Colors[0],
                                }}
                                align="left"
                              // rowSpan={3}
                              >
                                {j.objective_type?.name?.name}
                              </TableCell>
                              <TableCell
                                width="150px"
                                sx={{
                                  fontSize: "14x",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  wordBreak: "break-word",
                                  background: "#ffffff",
                                }}
                                align="left"
                              >
                                <Stack direction="row" alignItems="center" >

                                  <IconButton
                                    sx={{ padding: "4px" }}
                                    aria-describedby={id101}
                                    onClick={(e: any) => {
                                      setActiveObjectiveId(j._id);
                                      handleClickInfo11(e);
                                      setPopoverIndex(index);
                                    }}
                                  >
                                    <img
                                      style={{ width: "12px" }}
                                      src={Infoicon}
                                      alt="icon"
                                    />
                                  </IconButton>
                                  <Typography
                                    style={{
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      color: "#333333",
                                      textAlign: "left",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {j?.name?.objectiveTitle}
                                  </Typography>
                                </Stack>
                                <Popover
                                  id={"id101"}
                                  open={popoverIndex === index && openInfo101}
                                  anchorEl={anchorEl01}
                                  onClose={handleClose101}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                  PaperProps={{
                                    style: {
                                      backgroundColor: "FEFCF8",
                                      boxShadow: "none",
                                      maxWidth: "400px",
                                      borderRadius: "5px",
                                    },
                                  }}
                                  sx={{
                                    // width: "60%",
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #3e8cb5",
                                      backgroundColor: "#ffffff",
                                      // width:"30%"
                                    },
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "12px",
                                      fontFamily: "arial",
                                      padding: "5px",
                                    }}
                                  >
                                    {openInfo101 &&
                                      activeObjectiveId &&
                                      j._id === activeObjectiveId &&
                                      j?.name?.description}
                                  </Typography>
                                </Popover>
                              </TableCell>
                              <TableCell
                                width="10px"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  wordBreak: "break-word",
                                  textAlign: "center",
                                  background: "#fbfbfb",
                                  padding: "0px 8px"
                                  // fontFamily: "regular"
                                }}
                                align="left"
                              >
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  {(j.level_1_isChecked ||
                                    j.level_2_isChecked ||
                                    j.level_3_isChecked ||
                                    j.level_4_isChecked) && (
                                      <IconButton
                                        sx={{ padding: "4px" }}
                                        aria-describedby={id102}
                                        onClick={(e: any) => {
                                          setActiveObjectiveId2(j._id);
                                          handleClickInfo12(e);
                                          setPopoverIndex(index);
                                        }}
                                      >
                                        <img
                                          style={{ width: "12px" }}
                                          src={Infoicon}
                                          alt="icon"
                                        />
                                      </IconButton>
                                    )}
                                  {j.level_1_isChecked && (
                                    <>
                                      {" "}
                                      <span>L1</span>{" "}
                                      <span>
                                        {/* {j?.name?.level_1?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_2_isChecked && (
                                    <>
                                      {" "}
                                      <span>L2 </span>{" "}
                                      <span>
                                        {/* {j?.name?.level_2?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_3_isChecked && (
                                    <>
                                      {" "}
                                      <span>L3 </span>{" "}
                                      <span>
                                        {/* {j?.name?.level_3?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_4_isChecked && (
                                    <>
                                      {" "}
                                      <span>L4 </span>{" "}
                                      <span>
                                        {/* {j?.name?.level_4?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                </Stack>
                                <Popover
                                  id={"id102"}
                                  // open={openInfo102}
                                  open={popoverIndex === index && openInfo102}
                                  anchorEl={anchorEl02}
                                  onClose={handleClose102}
                                  anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "center",
                                  }}
                                  transformOrigin={{
                                    vertical: "top",
                                    horizontal: "center",
                                  }}
                                  PaperProps={{
                                    style: {
                                      backgroundColor: "FEFCF8",
                                      boxShadow: "none",
                                      maxWidth: "400px",
                                      borderRadius: "5px",
                                    },
                                  }}
                                  sx={{
                                    // width: "60%",
                                    "& .MuiPopover-paper": {
                                      border: "1px solid #3e8cb5",
                                      backgroundColor: "#ffffff",
                                      // width:"30%"
                                    },
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "12px",
                                      fontFamily: "arial",
                                      padding: "5px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "arial",
                                        lineHeight: "20px",
                                      }}
                                    >
                                      {openInfo102 &&
                                        j._id === activeObjectiveId2 && (
                                          <>
                                            {j.level_1_isChecked && (
                                              <>
                                                <span>L1:</span>
                                                <span>
                                                  <b>{
                                                    j?.name?.level_1
                                                      ?.level_definition
                                                  }</b>
                                                </span>
                                                <br />
                                                <ul style={{ marginTop: "0px", marginBottom: "0px" }} >
                                                  {j?.name?.level_1?.behavioral_objective.map(
                                                    (item: any) => {
                                                      return <li>{item}</li>;
                                                    }
                                                  )}
                                                </ul>
                                              </>
                                            )}
                                            {j.level_2_isChecked && (
                                              <>
                                                <span>L2:</span>
                                                <span>
                                                  <b>{
                                                    j?.name?.level_2
                                                      ?.level_definition
                                                  }</b>
                                                </span>
                                                <br />
                                                <ul style={{ marginTop: "0px", marginBottom: "0px" }} >
                                                  {j?.name?.level_2?.behavioral_objective.map(
                                                    (item: any) => {
                                                      return <li>{item}</li>;
                                                    }
                                                  )}
                                                </ul>
                                              </>
                                            )}
                                            {j.level_3_isChecked && (
                                              <>
                                                <span>L3:</span>
                                                <span>
                                                  <b>{
                                                    j?.name?.level_3
                                                      ?.level_definition
                                                  }</b>
                                                </span>
                                                <br />
                                                <ul style={{ marginTop: "0px", marginBottom: "0px" }} >
                                                  {j?.name?.level_3?.behavioral_objective.map(
                                                    (item: any) => {
                                                      return <li>{item}</li>;
                                                    }
                                                  )}
                                                </ul>
                                              </>
                                            )}
                                            {j.level_4_isChecked && (
                                              <>
                                                <span>L4:</span>
                                                <span>
                                                  <b>{
                                                    j?.name?.level_4
                                                      ?.level_definition
                                                  }</b>

                                                </span>
                                                <br />
                                                <ul style={{ marginTop: "0px", marginBottom: "0px" }} >
                                                  {j?.name?.level_4?.behavioral_objective.map(
                                                    (item: any) => {
                                                      return <li>{item}</li>;
                                                    }
                                                  )}
                                                </ul>
                                              </>
                                            )}
                                          </>
                                        )}
                                    </div>
                                  </Typography>
                                </Popover>
                              </TableCell>
                              <TableCell
                                width="10px"
                                sx={{
                                  fontSize: "14x",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  background: "#ffffff",
                                  padding: "0px 8px"
                                }}
                                align="center"
                              >
                                <div style={{ display: "inline-flex" }}>
                                <Stack direction="row" alignItems="center" justifyContent="center">
                                  {selectedRating?.definition !== undefined && selectedRating?.definition != "" &&(
                                     <IconButton
                                     onClick={(e: any) => {
                                       handleClickInfo66(e)
                                       setPopoverIndex(index);
                                     }}
                                   >
                                     <img width="12px" src={Infoicon} alt="icon" />
                                   </IconButton>
                                  )}
                                    <Popover
                                          id={id66}
                                          open={popoverIndex === index && openInfo66}
                                          anchorEl={anchorEls6}
                                          onClose={handleCloseInfo66}
                                          anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                          }}
                                          transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                          }}
                                          PaperProps={{
                                            style: {
                                              backgroundColor: "FEFCF8",
                                              boxShadow: "none",
                                              maxWidth: "400px",
                                              borderRadius: "5px",
                                            },
                                          }}
                                          sx={{
                                            "& .MuiPopover-paper": {
                                              border: "1px solid #3e8cb5",
                                              backgroundColor: "#ffffff",
                                            },
                                          }}
                                        >
                                          <Typography
                                            style={{
                                              fontSize: "12px",
                                              fontFamily: "arial",
                                              padding: "5px",
                                            }}
                                          >
                                            <b>{selectedRating?.rating_scale}</b>:{selectedRating?.definition}
                                          </Typography>
                                        </Popover>
                                  <span>
                                    {" "}
                                    {employeeData?.data?.appraisal?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings && k.rating_rejected == true)
                                          return <RatingBackground onClick={(e: any) => { handlePreviousRatingPopOverOpen(e, j); setPopoverIndex(index) }} style={{ color: "white", background: "#D2122E" }}>{k?.ratings?.rating}</RatingBackground>;
                                        else if (k?.ratings && (k.rating_accepted == true || k.rating_resubmitted == true))
                                          return <RatingBackground onClick={(e: any) => { handlePreviousRatingPopOverOpen(e, j); setPopoverIndex(index) }} style={{ color: "white", background: "#3e8cb5" }}>{k?.ratings?.rating}</RatingBackground>
                                        else return k?.ratings?.rating
                                      })[0]}
                                    {employeeData?.data?.appraisal_previous_rating?.objective_description?.filter((i: any) => i.ratings).length > 0 && (
                                      <Popover
                                        id={id_Previous_Rating}
                                        open={popoverIndex === index && openPreviousRating}
                                        anchorEl={anchorPreviousRatingPopOver}
                                        onClose={handlePreviousRatingPopOverClose}
                                        anchorOrigin={{
                                          vertical: "center",
                                          horizontal: "right",
                                        }}
                                        transformOrigin={{
                                          vertical: "center",
                                          horizontal: "left",
                                        }}
                                        PaperProps={{
                                          style: {
                                            backgroundColor: "FEFCF8",
                                            boxShadow: "none",
                                            maxWidth: "400px",
                                            borderRadius: "5px",
                                          },
                                        }}
                                        sx={{
                                          "& .MuiPopover-paper": {
                                            border: "1px solid #3e8cb5",
                                            backgroundColor: "#ffffff",
                                            // width: "30%",
                                          },
                                        }}
                                      >
                                        <div
                                          style={{
                                            padding: "5px",
                                            fontSize: "12px",
                                            lineHeight: "20px",
                                            color: "#333333",
                                            fontFamily: "Arial",
                                          }}
                                        >
                                          {
                                            (employeeData?.data?.appraisal_previous_rating?.objective_description?.filter(
                                              (i: any) =>
                                                i?.name === j?.name?._id
                                            )
                                              .map((k: any) => {
                                                console.log(k, "newkk")
                                                if (ratingsData) {
                                                  let temp = ratingsData?.data?.find((item: any) => k.ratings == item._id)
                                                  return <span>Previous Rating:{temp?.rating}</span>
                                                }
                                              })[0])}
                                        </div>
                                      </Popover>
                                    )}
                                  </span>
                                  </Stack>
                                </div>
                              </TableCell>
                              {(<TableCell
                                  width="250px"
                                  sx={{
                                    fontSize: "14x",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    background: "#fbfbfb",
                                  }}
                                  align="left"
                                >
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Text>
                                      <TextField
                                        fullWidth
                                        multiline
                                        autoComplete="off"
                                        size="small"
                                        placeholder="Add"
                                        // name="employeeTrainingComments"
                                        inputProps={{ maxLength: 500 }}
                                        variant="standard"
                                        InputProps={{
                                          disableUnderline: true,
                                          readOnly: disableTextAfterSubmission
                                        }}
                                        value={j.comments}
                                        onChange={(e) => {
                                          appraiserCommentsHandler(e, j);
                                          setnavPrompt(true);
                                          setMoveTab(true);
                                        }}
                                      />
                                    </Text>
                                    {/* <span
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "Arial",
                                      color: '#333333',
                                      wordBreak: "break-word"

                                    }}
                                  >{(j?.comments == "" || j.comments == undefined) ? "" : j.comments}</span> */}
                                    {/* {j.rating_comments &&( */}
                                    {employeeData &&
                                      getAttachments1(j?.name?._id)?.length >
                                      0 && (
                                        <AttachFileIcon
                                          sx={{
                                            color: "#93DCFA",
                                            height: "18px",
                                            transform: "rotate(30deg)",
                                            cursor: "pointer"
                                          }}
                                          aria-describedby={"id"}
                                          onClick={(e: any) => {
                                            handleClickOpen7(e, j);
                                            setPopoverIndex(index);
                                          }}
                                        />
                                      )}
                                    {/* )} */}
                                    <Popover
                                      id={"id"}
                                      open={popoverIndex === index && open7}
                                      anchorEl={anchorEl7}
                                      onClose={handleClose7}
                                      anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                      }}
                                      transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center",
                                      }}
                                      PaperProps={{
                                        style: {
                                          backgroundColor: "FEFCF8",
                                          boxShadow: "none",
                                          maxWidth: "400px",
                                          borderRadius: "5px",
                                        },
                                      }}
                                      sx={{
                                        "& .MuiPopover-paper": {
                                          border: "1px solid #3e8cb5",
                                          backgroundColor: "#ffffff",
                                          // width: "30%",
                                        },
                                      }}
                                    >
                                      <div
                                        // sx={{
                                        //   p: 2,
                                        //   backgroundColor: "#f8f8ff",
                                        // }}
                                        style={{
                                          padding: "5px",
                                          fontSize: "12px",
                                          lineHeight: "20px",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                        }}
                                      >
                                        {/* {employeeData?.data?.appraisal?.attachments
                                      .filter((i: any) => {

                                        // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                        return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                      })
                                      .map((k: any) => {
                                        return <a href={k.url}> {k.name} </a>;
                                      })} */}
                                        <Typography
                                          style={{
                                            fontSize: "12px",
                                            fontFamily: "Arial",
                                            color: "#333333",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            width: "170px",
                                          }}
                                        >
                                          {/* Attachments: {appraisalAttachments} */}
                                          {employeeData &&
                                            getAttachments1(j?.name?._id)?.map(
                                              (k: any, index1: any) => {
                                                return (
                                                  <>
                                                    <Stack
                                                      spacing={1}
                                                      direction="row"
                                                      alignItems="center"
                                                    >
                                                      <Typography
                                                        style={{
                                                          fontSize: "12px",
                                                          fontFamily: "Arial",
                                                          color: "#333333",

                                                          // maxWidth:"215px",
                                                          // wordBreak:"break-all"
                                                        }}
                                                      >
                                                        {index1 + 1}.
                                                      </Typography>
                                                      <Typography
                                                        style={{
                                                          fontSize: "12px",
                                                          fontFamily: "Arial",
                                                          color: "#333333",
                                                          whiteSpace: "nowrap",
                                                          overflow: "hidden",
                                                          textOverflow:
                                                            "ellipsis",
                                                          width: "170px",
                                                        }}
                                                      >
                                                        {k.resp}
                                                      </Typography>
                                                      <Stack direction="row">
                                                        {/* <IconButton>
                                              <img src={Downloadatt} />
                                            </IconButton> */}
                                                        <IconButton>
                                                          {disableTextAfterSubmission ?
                                                            <img
                                                              src={Removeattnew}
                                                              style={{ cursor: "default" }}
                                                            /> :
                                                            <img
                                                              src={Removeattnew}
                                                              onClick={() =>
                                                                deleteAppraiserMutation(
                                                                  {
                                                                    employee_id:
                                                                      employee_id,
                                                                    name: k.remove,
                                                                  }
                                                                )
                                                              }
                                                              style={{ cursor: "pointer" }}
                                                            />
                                                          }

                                                        </IconButton>
                                                      </Stack>
                                                    </Stack>
                                                  </>
                                                );
                                              }
                                            )}
                                        </Typography>
                                      </div>
                                    </Popover>
                                  </Stack>
                                </TableCell>)}
                              {employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                                (item.rating_rejected == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
                                  <TableCell
                                    width="250px"
                                    sx={{
                                      fontSize: "14x",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      background: "#fbfbfb",
                                    }}
                                    align="left"
                                  >
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      spacing={2}
                                    >
                                      <span
                                        style={{
                                          fontSize: "14px",
                                          fontFamily: "Arial",
                                          color: '#333333',
                                          wordBreak: "break-word"

                                        }}
                                      >{(j.rating_rejected) && j.rejection_reason}</span>
                                      {/* {j.rating_comments &&( */}
                                      {employeeData &&
                                        getAppraiserRejectionAttachments(j?.name?._id)?.length > 0 &&
                                        (j.rating_rejected || j.rating_resubmitted)
                                        && (j.rejection_reason !== "" && j.rejection_reason !== undefined) && (
                                          <AttachFileIcon
                                            sx={{
                                              color: "#93DCFA",
                                              height: "18px",
                                              transform: "rotate(30deg)",
                                              cursor: "pointer"
                                            }}
                                            aria-describedby={"id"}
                                            onClick={(e: any) => {
                                              handleClickOpen8(e, j);
                                              setPopoverIndex(index);
                                            }}
                                          />
                                        )}
                                      {/* )} */}
                                      <Popover
                                        id={"id"}
                                        open={popoverIndex === index && openReject}
                                        anchorEl={anchorReject}
                                        onClose={handleClose8}
                                        anchorOrigin={{
                                          vertical: "bottom",
                                          horizontal: "center",
                                        }}
                                        transformOrigin={{
                                          vertical: "top",
                                          horizontal: "center",
                                        }}
                                        PaperProps={{
                                          style: {
                                            backgroundColor: "FEFCF8",
                                            boxShadow: "none",
                                            maxWidth: "400px",
                                            borderRadius: "5px",
                                          },
                                        }}
                                        sx={{
                                          "& .MuiPopover-paper": {
                                            border: "1px solid #3e8cb5",
                                            backgroundColor: "#ffffff",
                                            // width: "30%",
                                          },
                                        }}
                                      >
                                        <div
                                          // sx={{
                                          //   p: 2,
                                          //   backgroundColor: "#f8f8ff",
                                          // }}
                                          style={{
                                            padding: "5px",
                                            fontSize: "12px",
                                            lineHeight: "20px",
                                            color: "#333333",
                                            fontFamily: "Arial",
                                          }}
                                        >
                                          {/* {employeeData?.data?.appraisal?.attachments
                                     .filter((i: any) => {

                                       // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                       return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                     })
                                     .map((k: any) => {
                                       return <a href={k.url}> {k.name} </a>;
                                     })} */}
                                          <Typography
                                            style={{
                                              fontSize: "12px",
                                              fontFamily: "Arial",
                                              color: "#333333",
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              width: "170px",
                                            }}
                                          >
                                            {/* Attachments: {appraisalAttachments} */}
                                            {employeeData &&
                                              getAppraiserRejectionAttachments(j?.name?._id)?.map(
                                                (k: any, index1: any) => {
                                                  return (
                                                    <>
                                                      <Stack
                                                        spacing={1}
                                                        direction="row"
                                                        alignItems="center"
                                                      >
                                                        <Typography
                                                          style={{
                                                            fontSize: "12px",
                                                            fontFamily: "Arial",
                                                            color: "#333333",

                                                            // maxWidth:"215px",
                                                            // wordBreak:"break-all"
                                                          }}
                                                        >
                                                          {index1 + 1}.
                                                        </Typography>
                                                        <Typography
                                                          style={{
                                                            fontSize: "12px",
                                                            fontFamily: "Arial",
                                                            color: "#333333",
                                                            whiteSpace: "nowrap",
                                                            overflow: "hidden",
                                                            textOverflow:
                                                              "ellipsis",
                                                            width: "170px",
                                                          }}
                                                        >
                                                          {k.resp}
                                                        </Typography>
                                                        <Stack direction="row">
                                                          {/* <IconButton>
                                             <img src={Downloadatt} />
                                           </IconButton> */}
                                                          <IconButton>
                                                            {disableTextAfterSubmission ?
                                                              <img
                                                                src={Removeattnew}
                                                                style={{ cursor: "default" }}
                                                              /> :
                                                              <img
                                                                src={Removeattnew}
                                                                onClick={() =>
                                                                  deleteRejectionAppraiserMutation(
                                                                    {
                                                                      id: employee_id,
                                                                      name: k.remove,
                                                                      objective_description: j.name._id
                                                                    }
                                                                  )
                                                                }
                                                                style={{ cursor: "pointer" }}
                                                              />
                                                            }
                                                          </IconButton>
                                                        </Stack>
                                                      </Stack>
                                                    </>
                                                  );
                                                }
                                              )}
                                          </Typography>
                                        </div>
                                      </Popover>
                                    </Stack>
                                  </TableCell>
                                )}

                              {employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                                item.rating_rejected == true).length > 0 && (
                                  <>
                                    <TableCell
                                      width="10px"
                                      sx={{
                                        fontSize: "14x",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        background: "#ffffff",
                                        padding: "0px 8px"
                                      }}
                                      align="center"
                                    >
                                      <Stack
                                        direction="row"
                                        justifyContent="space-around"
                                        alignItems="center"
                                        spacing={2}
                                      >
                                        {/* <span> {j.ratings && j.ratings.rating}</span> */}

                                        <span
                                          style={{
                                            // fontSize: "14x",
                                            // @ts-ignore
                                            // color:
                                            //   employeeData &&
                                            //     employeeData?.data?.employee?.objective_description
                                            //       .filter(
                                            //         (i: any) =>
                                            //           i.name._id === j.name._id
                                            //       )
                                            //       .map((k: any) => {
                                            //         if (k.rating_rejected)
                                            //           return k.rating_rejected;
                                            //       })[0]
                                            //     ? "red"
                                            //     : "#333333",
                                            // '"#333333",
                                          }}
                                        >
                                          {employeeData &&
                                            employeeData?.data?.employee?.objective_description
                                              .filter(
                                                (i: any) => i.name._id === j.name._id
                                              )
                                              .map((k: any) => {
                                                if (k?.ratings && k.rating_rejected == true)
                                                  return <RatingBackground style={{ color: "white", background: "#D2122E" }}>
                                                    {k?.ratings?.rating}
                                                  </RatingBackground>;
                                              })[0]}
                                          {/* .map((k: any) => {
                                                if (k.ratings && k.rating_rejected == true)
                                                  return <span style={{ color: "white", background: "red" }}>
                                                    {k.ratings && k.ratings.rating}
                                                  </span>
                                                else if (j.action_performed == true) {
                                                  return <span>
                                                    {k.ratings && k.ratings.rating}
                                                  </span>
                                                }
                                              }) */}
                                        </span>
                                      </Stack>
                                    </TableCell>

                                    <TableCell
                                      width="250px"
                                      sx={{
                                        fontSize: "14x",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        background: "#ffffff",
                                      }}
                                      align="left"
                                    >
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                      >
                                        <span
                                          style={{
                                            fontSize: "14px",
                                            fontFamily: "Arial",
                                            color: '#333333',
                                            wordBreak: "break-word"

                                          }}
                                        >

                                          {employeeData &&
                                            employeeData.data.employee.objective_description
                                              .filter(
                                                (i: any) => i.name._id === j.name._id
                                              )
                                              .map((k: any) => {
                                                if (k.rating_rejected) return k.rejection_reason;
                                              })[0]}
                                        </span>
                                        {/* {employeeData &&
                                  employeeData.data.employee.objective_description
                                    .filter(
                                      (i: any) => i.name._id === j.name._id
                                    )
                                    .map((k: any) => {
                                      if (k.comments) return k.comments;
                                    })[0] &&
                                  ( */}
                                        {employeeData && showEmployeeAttachment(j?.name._id) &&
                                          getAttachments(j?.name?._id)?.length >
                                          0 && (
                                            <AttachFileIcon
                                              sx={{
                                                color: "#93DCFA",
                                                height: "18px",
                                                transform: "rotate(30deg)",
                                                cursor: "pointer"
                                              }}
                                              aria-describedby={"id"}
                                              onClick={(e: any) => {
                                                handleClickOpen6(e, j);
                                                setPopoverIndex(index);
                                              }}
                                            />
                                          )}
                                        {/* )} */}

                                        <Popover
                                          id={"id"}
                                          open={popoverIndex === index && open6}
                                          anchorEl={anchorEl6}
                                          onClose={handleClose6}
                                          anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "center",
                                          }}
                                          transformOrigin={{
                                            vertical: "top",
                                            horizontal: "center",
                                          }}
                                          PaperProps={{
                                            style: {
                                              backgroundColor: "FEFCF8",
                                              boxShadow: "none",
                                              maxWidth: "400px",
                                              borderRadius: "5px",
                                            },
                                          }}
                                          sx={{
                                            "& .MuiPopover-paper": {
                                              border: "1px solid #3e8cb5",
                                              backgroundColor: "#ffffff",
                                              // width: "30%",
                                            },
                                          }}
                                        >
                                          {/* <Box
                                                sx={{
                                                  position: "relative",
                                                  mt: "10px",
                                                  "&::before": {
                                                    backgroundColor: "#f8f8ff",
                                                    content: '""',
                                                    display: "block",
                                                    position: "absolute",
                                                    width: 12,
                                                    height: 12,
                                                    top: -6,
                                                    transform: "rotate(45deg)",
                                                    left: "calc(50% - 6px)",
                                                  },
                                                }}
                                              /> */}
                                          <div
                                            // sx={{
                                            //   p: 2,
                                            //   backgroundColor: "#f8f8ff",
                                            // }}
                                            style={{
                                              padding: "5px",
                                              fontSize: "12px",
                                              lineHeight: "20px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            <Typography
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                color: "#333333",
                                                whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: "170px",
                                              }}
                                            >
                                              {/* Attachments: {employeeAttachments} */}
                                              {employeeData &&
                                                getAttachments(j?.name?._id)?.map(
                                                  (k: any, index1: any) => {
                                                    return (
                                                      <>
                                                        <Stack
                                                          spacing={1}
                                                          direction="row"
                                                          alignItems="center"
                                                        >
                                                          <Typography
                                                            style={{
                                                              fontSize: "12px",
                                                              fontFamily: "Arial",
                                                              color: "#333333",

                                                              // maxWidth:"215px",
                                                              // wordBreak:"break-all"
                                                            }}
                                                          >
                                                            {index1 + 1}.
                                                          </Typography>
                                                          <Typography
                                                            style={{
                                                              fontSize: "12px",
                                                              fontFamily: "Arial",
                                                              color: "#333333",
                                                              whiteSpace: "nowrap",
                                                              overflow: "hidden",
                                                              textOverflow:
                                                                "ellipsis",
                                                              width: "170px",
                                                            }}
                                                          >
                                                            {k.resp}
                                                          </Typography>
                                                          <Stack direction="row">
                                                            {/* <IconButton>
                                              <img src={Downloadatt} />
                                            </IconButton> */}
                                                            {/* <IconButton> */}
                                                            {/*                                               
                                              <img
                                               src={Removeatt}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                                            {/* <img
                                                        src={Removeattnew}
                                                        onClick={() =>
                                                          deleteEmployeeMutation(
                                                            {
                                                              employee_id:
                                                                employee_id,
                                                              name: k.remove,
                                                            }
                                                          )
                                                        }
                                                      /> */}
                                                            {/* </IconButton> */}
                                                          </Stack>
                                                        </Stack>
                                                      </>
                                                    );
                                                  }
                                                )}
                                            </Typography>
                                            {/* {employeeData?.data?.employee?.attachments
                                      .filter((i: any) => {

                                        // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                        return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                      })
                                      .map((k: any) => {
                                        return <a href={k.url}> {k.name} </a>;
                                      })} */}
                                            {/* one-documents.docs */}
                                          </div>
                                        </Popover>
                                        {/* <span
                                      style={{
                                        fontSize: "14x",
                                        color: "#333333",
                                      }}
                                    >
                                      {j.ratings && j.ratings.rating_scale}{" "}
                                    </span> */}
                                      </Stack>
                                    </TableCell>
                                  </>
                                )}

                              {(employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                                item.rating_rejected == true).length > 0 ||
                                j.action_performed == true) &&
                                employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") && (
                                  <TableCell width="50px" align="center" sx={{ background: "#ffffff", padding: "0px 8px" }}>
                                    <Stack direction="row" justifyContent="center">
                                      {/* <Button
                                 style={{
                                   borderRadius: "4px",
                                   textTransform: "none",
                                   fontSize: "15px",
                                   fontFamily: "Arial",
                                   borderColor: "#3E8CB5",
                                   color: "#3E8CB5",
                                 }}
                                 variant="outlined"
                                 onClick={() => openDrawerHandler(j)}
                               >
                                 Accept
                               </Button> */}
                                      {((employeeData &&
                                        employeeData?.data?.employee?.objective_description
                                          .filter(
                                            (i: any) => i.name._id === j.name._id
                                          )
                                          .map((k: any) => {
                                            if (k.rating_rejected == true)
                                              return k.rating_rejected;
                                          })[0]) || j.action_performed == true) &&
                                        (
                                          <>
                                            {j.action_performed === true && j.rating_rejected === false ?

                                              <Tooltip title="Accepted">

                                                <IconButton
                                                  disabled={isUploading || employeeDataIsFetching || isAcceptLoading}
                                                  onClick={() => {
                                                    // openDrawerHandler(j);
                                                    handleAcceptRatingAlertYes(j)
                                                    setObjectiveData(j)
                                                  }}
                                                >
                                                  <img
                                                    src={thumsup_colored}
                                                    alt="icon"
                                                    style={{ width: "16px", height: "16px" }}
                                                  />
                                                </IconButton>

                                              </Tooltip>
                                              : <Tooltip title="Accept">
                                                <IconButton
                                                  disabled={isUploading || employeeDataIsFetching || isAcceptLoading}
                                                  onClick={() => {
                                                    // openDrawerHandler(j);
                                                    handleAcceptRatingAlertYes(j)
                                                    setObjectiveData(j)
                                                  }}
                                                >
                                                  <img
                                                    src={Thumsup}
                                                    alt="icon"
                                                    style={{
                                                      width: "16px",
                                                      height: "16px",
                                                    }}
                                                  />
                                                </IconButton>
                                              </Tooltip>
                                            }
                                            {j.action_performed === true && j.rating_rejected === true ?
                                              <Tooltip title="Rejected">
                                                <IconButton
                                                  disabled={isUploading || employeeDataIsFetching || isAcceptLoading}
                                                  onClick={() => {
                                                    openDrawerHandlerreject(j);
                                                    setObjectiveData(j)
                                                  }}
                                                >
                                                  <img
                                                    src={thumbsdown_colored}
                                                    alt="icon"
                                                    style={{ width: "16px", height: "16px" }}
                                                  />
                                                </IconButton>
                                              </Tooltip> :
                                              <Tooltip title="Reject">
                                                <IconButton
                                                  disabled={isUploading || employeeDataIsFetching || isAcceptLoading}
                                                  onClick={() => {
                                                    openDrawerHandlerreject(j);
                                                    setObjectiveData(j)
                                                  }}
                                                >
                                                  <img
                                                    src={Thumsdown}
                                                    alt="icon"
                                                    style={{
                                                      width: "16px",
                                                      height: "16px",
                                                    }}
                                                  />
                                                </IconButton>
                                              </Tooltip>
                                            }
                                          </>
                                        )}
                                      {/* <Button
                                 style={{
                                   borderRadius: "4px",
                                   textTransform: "none",
                                   fontSize: "15px",
                                   fontFamily: "Arial",
                                   borderColor: "#3E8CB5",
                                   color: "#3E8CB5",
                                 }}
                                 variant="outlined"
                                 onClick={() => openDrawerHandlerreject(j)}
                               >
                                 Reject
                               </Button> */}
                                    </Stack>
                                    {/* <Stack
                                                                 direction="row"
                                                                 justifyContent="space-between"
                                                             >
                                                                 <span
                                                                     style={{
                                                                         fontSize: "12px",
                                                                         color: "#929292",
                                                                     }}
                                                                 >
                                                                     Have you concluded with Employee?
                                                                 </span>
                                                                 <span>
                                                                     <Stack direction="row">
                                                                         <Button
                                                                             variant="contained"
                                                                             size="small"
                                                                             style={{
                                                                                 textTransform: "none",
                                                                                 backgroundColor: "#6fc9ee",
                                                                                 height: "20px",
                                                                                 minWidth: "2px",
                                                                                 textDecoration: "underline",
                                                                                 fontSize: "10px",
                                                                             }}
                                                                             onClick={() => openDrawerHandler(j)}
                                                                         >
                                                                             Yes
                                                                         </Button>
                                                                         <Button
                                                                             size="small"
                                                                             style={{
                                                                                 textTransform: "none",
                                                                                 height: "20px",
                                                                                 minWidth: "2px",
                                                                                 textDecoration: "underline",
                                                                                 color: "#93DCFA",
                                                                                 fontSize: "10px",
                                                                             }}
                                                                             onClick={() => openDrawerHandlerreject(j)}
                                                                         >
                                                                             No
                                                                         </Button>
                                                                     </Stack>
                                                                 </span>
                                                             </Stack> */}
                                    {/* <Button
                                 size="small"
                                 style={{
                                   textTransform: "none",
                                   height: "20px",
                                   minWidth: "2px",
                                   textDecoration: "underline",
                                   color: "#93DCFA",
                                   fontSize: "13px",
                                 }} onClick={() => openDrawerHandler(j)}
                               >
                                 Reject
                               </Button> */}
                                  </TableCell>
                                )}
                            </TableRow>
                          </>
                        );
                      })}
                    {/* <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#004C75",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        Knowledge of the job
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          // fontFamily: "regular"
                        }}
                        align="left"
                      >
                        Quality of Work
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        <h3>4.5</h3>
                        <p
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          Exceeding
                        </p>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="left"
                      >
                        Dummy text for 2 linesDummy text for 2 linesDummy text
                        for 2 linesDummy text for 2 linesDummy text for 2 lines
                      </TableCell>
                    </TableRow> */}
                  </TableBody>
                </Table>
              </TableContainer>
              <AlertYesNo
                isAlertOpen={acceptRatingAlert}
                handleAlertYes={handleAcceptRatingAlertYes}
                handleAlertClose={handleAcceptRatingAlertNo}>
                {message}
              </AlertYesNo>
              <Stack
                direction="row"
                spacing={2}
                style={{
                  margin: "50px",
                  // paddingLeft: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // paddingTop: "33px",
                  // marginLeft: "auto",
                }}
              >


                {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") &&
                  <>
                    <AddButton
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        height: "35px",
                        background: "transparent",
                        ...((disableButtons) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),

                      }}
                      variant="outlined"
                      onClick={() => saveCommentsAsDraft()}
                    >
                      Save as Draft
                    </AddButton>
                    {/* bydefault this button will be shown. if any of the rating is rejected then this button will be disabled */}
                    {!acceptButton && (
                      <AddButton
                        // disabled={disableAccept}
                        disabled={disableButtons || isAcceptLoading || employeeDataIsFetching || acceptButton}
                        style={{
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          // width: "70px",
                          height: "35px",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          background: "transparent",
                          ...((disableButtons) && {
                            cursor: "not-allowed",
                            borderColor: "#ccc",
                            color: "#ccc",
                          }),

                        }}
                        variant="outlined"
                        onClick={() => acceptAppraisalHandler()}
                      >
                        {/* for Accept functionality adding save and submit as per 4/28/2023 client feedback */}
                        Save and Submit
                        {/* Accept */}
                      </AddButton>
                    )}
                    {/* <Link to={"/dashboardreview"}> */}
                    {/* bydefault this button will not be shown. if all the ratings are accepted then this button will be disabled. */}
                    {!rejectButton && (
                      <AddButton
                        disabled={disableButtons || isAcceptLoading || employeeDataIsFetching || rejectButton}
                        style={{
                          // textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          height: "35px",
                          // width: "70px",
                          background: "transparent",
                          ...((disableButtons) && {
                            cursor: "not-allowed",
                            borderColor: "#ccc",
                            color: "#ccc",
                          }),

                        }}
                        variant="outlined"
                        onClick={() => rejectEmployeeHandler()}
                      >
                        {/* for Reject functionality adding save and submit as per 4/28/2023 client feedback */}
                        Save and Submit
                        {/* Reject */}
                      </AddButton>
                    )}
                    {/* <Link
                  style={{
                    fontSize: "18px",
                    color: "#3e8cb5",
                    fontFamily: "Arial",
                  }}
                  color="inherit"
                  to={`/dashboardreview`}
                  state={{
                    from: 1,
                  }}
                > */}
                    <Button
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
                        borderRadius: "4px",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        height: "35px",
                        width: "70px",
                        background: "transparent",
                        ...((disableButtons) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),

                      }}
                      variant="outlined"
                      onClick={() => { cancelHandler() }}
                    >
                      Cancel
                    </Button>
                  </>
                }
                {/* </Link> */}
              </Stack>


            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography
                style={{
                  fontSize: "20px",
                  color: "#3E8CB5",
                  fontFamily: "Arial",
                  marginTop: "20px",
                  marginBottom: "20px"
                }}
              >
                Performance Appraisal Summary
              </Typography>
              <FeedbackQuestionnaireAppraiser />
              {showArea && (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                      style={{
                        marginBottom: "10px",
                        color: "#717171",
                        fontSize: "16px",
                        fontFamily: "Arial",
                      }}
                    >
                      <b>Areas for Improvement (Appraiser)</b>
                    </Typography>
                    <Table size="small" >
                      <TableHead style={{ backgroundColor: "#F7F9FB" }}>
                        <TableRow
                          sx={{
                            "& td, & th": {
                              border: "1px solid #e0e0e0",
                              bgcolor: "#eaeced",
                            },
                          }}
                        >
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Specific Areas
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Specific Actions
                          </TableCell>
                          {/* <TableCell
                      align="center"
                      style={{
                        border: "1px solid #e0e0e0",
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Employee Comments
                    </TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filterData &&
                          filterData.map((i: any, index: any) => {
                            return (
                              <>
                                <TableRow
                                  sx={{
                                    "& td, & th": {
                                      border: "1px solid #e0e0e0",
                                    },
                                  }}
                                >
                                  <TableCell
                                    align="left"
                                    // width="25%"
                                    width="140px"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {i[0]}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    // width="50%"
                                    width="450px"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {filterData &&
                                      filterData.map((i: any, ix: any) => {
                                        return i[1].map((j: any, jx: any) => {
                                          return j.specific_actions.map(
                                            (k: any, ix1: any) => {
                                              if (index === ix)
                                                return (
                                                  <Typography
                                                    style={{
                                                      fontSize: "14px",
                                                      color: "#333333",
                                                      fontFamily: "Arial",
                                                      wordBreak: "break-word",
                                                    }}
                                                  >
                                                    {k.value}
                                                    <br />
                                                  </Typography>
                                                );
                                            }
                                          );
                                        });
                                      })}
                                  </TableCell>
                                  {/* <TableCell
                              align="justify"
                              width="350px"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                              }}
                            >                             
                              {i[1][0].employee_comments}
                            </TableCell> */}
                                </TableRow>
                              </>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
              {specificAction1 && (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                      style={{
                        marginBottom: "10px",
                        color: "#717171",
                        fontSize: "16px",
                        fontFamily: "Arial",
                      }}
                    >
                      <b> Areas for Improvement (Employee)</b>
                    </Typography>

                    <Table size="small" >
                      <TableHead>
                        <TableRow
                          sx={{
                            "& td, & th": {
                              border: "1px solid #e0e0e0",
                              bgcolor: "#eaeced",
                            },
                          }}
                        >
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Specific Areas
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Specific Actions
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {filterData2 &&
                          filterData2.map((i: any, index: any) => {
                            console.log(i, "123");
                            return (
                              <>
                                <TableRow
                                  sx={{
                                    "& td, & th": {
                                      border: "1px solid #e0e0e0",
                                    },
                                  }}
                                >
                                  <TableCell
                                    align="left"
                                    width="140px"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {i[0]}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    width="450px"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {/* <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[0]?.value}</p>
              <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[1]?.value}</p>
              <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[2]?.value}</p> */}
                                    {filterData2 &&
                                      filterData2.map((i: any, ix: any) => {
                                        return i[1].map((j: any, jx: any) => {
                                          return j.specific_actions.map(
                                            (k: any, ix1: any) => {
                                              if (index === ix && k.value)
                                                return (
                                                  <Typography
                                                    style={{
                                                      fontSize: "14px",
                                                      color: "#333333",
                                                      fontFamily: "Arial",
                                                      wordBreak: "break-word",
                                                    }}
                                                  >
                                                    {k.value}
                                                    <br />
                                                  </Typography>
                                                );
                                            }
                                          );
                                        });
                                      })}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}

              {showTrainingRecommendation && (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                      style={{
                        marginBottom: "10px",
                        color: "#717171",
                        fontSize: "16px",
                        fontFamily: "Arial",
                      }}
                    >
                      <b> Training Recommendations (Appraiser)</b>
                    </Typography>
                    <Table size="small" >
                      <TableHead >
                        <TableRow
                          // style={{ backgroundColor: "#F7F9FB" }}
                          sx={{
                            "& td, & th": {
                              border: "1px solid #e0e0e0",
                              bgcolor: "#eaeced",
                            },
                          }}
                        >
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Training Category
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Training Name
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Justification
                          </TableCell>
                          {/* <TableCell
                      align="center"
                      style={{
                        border: "1px solid #e0e0e0",
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      Employee Comments
                    </TableCell> */}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {employeeData?.data?.appraisal?.training_recommendation.map(
                          (item: any, index: any) => {
                            return (
                              <TableRow
                                sx={{
                                  "& td, & th": {
                                    border: "1px solid #e0e0e0",
                                  },
                                }}
                              >
                                <TableCell
                                  width="160px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {" "}
                                  <IconButton
                                    // aria-describedby={id2}
                                    onClick={(e: any) => {
                                      handleClickInfo6(e)
                                      setPopoverIndex(index);
                                    }}
                                  // style={{marginRight:"5px"}}
                                  >
                                    <img width="12px" src={Infoicon} alt="icon" />
                                  </IconButton>
                                  {item.name.title}

                                  <Popover
                                    id={id6}
                                    open={(popoverIndex === index) && openInfo6}
                                    anchorEl={anchorEls}
                                    onClose={handleCloseInfo6}
                                    anchorOrigin={{
                                      vertical: "bottom",
                                      horizontal: "left",
                                    }}
                                    transformOrigin={{
                                      vertical: "top",
                                      horizontal: "left",
                                    }}
                                    PaperProps={{
                                      style: {
                                        backgroundColor: "FEFCF8",
                                        boxShadow: "none",
                                        maxWidth: "400px",
                                        borderRadius: "5px",
                                      },
                                    }}
                                    sx={{
                                      // width: "60%",
                                      "& .MuiPopover-paper": {
                                        border: "1px solid #3e8cb5",
                                        backgroundColor: "#ffffff",
                                        // width:"30%"
                                      },
                                    }}
                                  >
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "arial",
                                        padding: "5px",
                                      }}
                                    >
                                      {/* {trainingSelectValue.map((TrainingData: any) => {
                          console.log(TrainingData,"TrainingData")
                          return (
                            <>
                             {TrainingData.name.defenition}

                             </>
                            );
                        })} */}
                                      {item?.name?.definition}

                                      {/* {item?.name?.definition} */}

                                    </Typography>
                                  </Popover>
                                </TableCell>
                                <TableCell
                                  width="200px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {" "}
                                  {item.training_name}
                                </TableCell>
                                <TableCell
                                  width="300px"
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    whiteSpace: "pre-line",
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {" "}
                                  {item.justification}{" "}
                                </TableCell>
                                {/* <TableCell
                            width="300px"
                            align="justify"
                            style={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak: "break-word",
                            }}
                          >
                            {item.employee_comments}
                          </TableCell> */}
                              </TableRow>
                            );
                          }
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </>


              )}
              {specificAction2 && (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                      style={{
                        marginBottom: "10px",
                        color: "#717171",
                        fontSize: "16px",
                        fontFamily: "Arial",
                      }}
                    >
                      <b> Training Recommendations (Employee)</b>
                    </Typography>
                    <Table size="small">
                      <TableHead>
                        <TableRow
                          sx={{
                            "& td, & th": {
                              border: "1px solid #e0e0e0",
                              bgcolor: "#eaeced",
                            },
                          }}
                        >
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Training Category
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Training Name
                          </TableCell>
                          <TableCell
                            align="center"
                            style={{
                              border: "1px solid #e0e0e0",
                              fontFamily: "Arial",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                          >
                            Justification
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {employeeData &&
                          objectiveTitleData &&
                          Training1.map((j: any, index: any) => {
                            return (
                              <>
                                <TableRow
                                  sx={{
                                    "& td, & th": {
                                      border: "1px solid #e0e0e0",
                                    },
                                  }}
                                >
                                  <TableCell
                                    width="160px"
                                    align="left"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word"
                                    }}
                                  >
                                    <IconButton
                                      // aria-describedby={id2}
                                      onClick={(e: any) => {
                                        handleClickInfo1(e)
                                        setPopoverIndex(index);
                                      }}

                                    // style={{marginRight:"5px"}}
                                    >
                                      <img width="12px" src={Infoicon} alt="icon" />
                                    </IconButton>
                                    {j?.name?.name?.title}

                                    <Popover
                                      id={id3}
                                      open={(popoverIndex === index) && openInfo1}
                                      anchorEl={anchorEl1}
                                      onClose={handleCloseInfo1}
                                      anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "left",
                                      }}
                                      transformOrigin={{
                                        vertical: "top",
                                        horizontal: "left",
                                      }}
                                      PaperProps={{
                                        style: {
                                          backgroundColor: "FEFCF8",
                                          boxShadow: "none",
                                          maxWidth: "400px",
                                          borderRadius: "5px",
                                        },
                                      }}
                                      sx={{
                                        // width: "60%",
                                        "& .MuiPopover-paper": {
                                          border: "1px solid #3e8cb5",
                                          backgroundColor: "#ffffff",
                                          // width:"30%"
                                        },
                                      }}
                                    >
                                      <Typography
                                        style={{
                                          fontSize: "12px",
                                          fontFamily: "arial",
                                          padding: "5px",
                                        }}
                                      >


                                        {j?.name?.name?.definition}
                                      </Typography>
                                    </Popover>
                                  </TableCell>
                                  <TableCell
                                    width="200px"
                                    align="left"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word"
                                    }}
                                  >
                                    {j.training_name}
                                  </TableCell>
                                  <TableCell
                                    width="300px"
                                    align="left"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word"
                                    }}
                                  >
                                    {j.justification}
                                  </TableCell>
                                </TableRow>
                              </>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
              <div style={{ marginBottom: "20px" }}>
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    marginBottom: "10px",
                    fontFamily: "Arial"
                  }}
                >
                  <b>Appraiser Message for Employee</b>
                </Typography>
                <Typography
                  style={{
                    fontSize: "14px",
                    fontFamily: "arial",
                    color: "#717171",
                    // paddingTop: "10px",
                  }}
                >
                  <Tf3>
                    <TextField
                      placeholder="Add"
                      fullWidth
                      // disabled
                      InputProps={{ readOnly: disableTextAfterSubmission, }}
                      multiline
                      // inputProps={{ maxLength: 500 }}
                      size="small"
                      value={otherComments1 || ""}
                      onChange={e => {
                        handleappraiserReCommentsChange(e)
                        setMoveTab(true);
                        setnavPrompt(true);
                      }}
                    />
                  </Tf3>
                </Typography>
              </div>
              {employeeData?.data?.employee?.comments != "" && employeeData?.data?.employee?.comments != undefined && (
                <>
                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                      style={{
                        fontSize: "16px",
                        color: "#717171",
                        marginBottom: "10px",
                        fontFamily: "Arial"
                      }}
                    >
                      <b>Employee Comments</b>
                    </Typography>
                    <Tf11>
                      <TextField
                        fullWidth
                        InputProps={{ readOnly: true, }}
                        multiline
                        inputProps={{ maxLength: 500 }}
                        size="small"
                        value={employeeData?.data?.employee?.comments}
                      />
                    </Tf11>
                  </div>
                </>
              )}
              {employeeData?.data?.reviewer?.reviewer_comments !== undefined &&
                employeeData?.data?.reviewer?.reviewer_comments !== "" &&
                employeeData?.data?.reviewer?.reviewer_PA_rejected !== true && (
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "16px",
                          color: "#717171",
                          marginBottom: "10px",
                          fontFamily: "Arial"
                        }}
                      >
                        <b>Reviewer Comments</b>
                      </Typography>
                      <Tf1>
                        <TextField
                          fullWidth
                          InputProps={{ readOnly: true, }}
                          multiline
                          inputProps={{ maxLength: 500 }}
                          size="small"
                          value={employeeData?.data?.reviewer?.reviewer_comments}
                        />
                      </Tf1>
                    </div>
                  </>
                )}
             {employeeData?.data?.normalizer?.reason_for_rejection &&
                employeeData?.data?.normalizer?.reason_for_rejection != "" &&
                employeeData?.data?.normalizer?.reason_for_rejection != undefined &&
                employeeData?.data?.normalizer?.normalizer_PA_rejected !== true && (
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "16px",
                          color: "#717171",
                          marginBottom: "10px",
                          fontFamily: "Arial"
                        }}
                      >
                        <b>HR Normalizer Comments</b>
                      </Typography>
                      <Tf1>
                        <TextField
                          fullWidth
                          InputProps={{ readOnly: true, }}
                          multiline
                          inputProps={{ maxLength: 500 }}
                          size="small"
                          value={employeeData?.data?.normalizer?.reason_for_rejection || ""}
                        />
                      </Tf1>
                    </div>
                  </>
                )}

              {(employeeData?.data?.employee?.one_to_one_meeting !== "" &&
                employeeData?.data?.employee?.one_to_one_meeting !== null &&
                employeeData?.data?.employee?.one_to_one_meeting !== undefined) && (
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "16px",
                          color: "#717171",
                          marginBottom: "10px",
                          fontFamily: "Arial"
                        }}
                      >
                        <b>One-to-One Meeting Date</b>
                      </Typography>
                      <Tf11>
                        <TextField
                          fullWidth
                          InputProps={{ readOnly: true, }}
                          multiline
                          inputProps={{ maxLength: 500 }}
                          size="small"
                          value={One_To_One_Meeting_Date}
                        />
                      </Tf11>
                    </div>
                  </>
                )}
              {/* <div style={{ marginBottom: "20px" }}>
              <Typography
                style={{
                  fontSize: "16px",
                  color: "#717171",
                  marginBottom: "10px",
                  fontFamily: "Arial"
                }}
              >
                <b> Appraiser Comments</b>
              </Typography> */}
              {/* <Tf3>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  placeholder="Add"
                  value={appraiserComments}
                  inputProps={{ maxLength: 512 }}
                  onChange={(e) => {
                    setAppraiserComments(e.target.value);
                   
                  }}
                
                />
              </Tf3> 
              </div>*/}
              <Stack
                direction="row"
                spacing={2}
                style={{
                  margin: "50px",
                  // paddingLeft: "600px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // paddingTop: "33px",
                  // marginLeft: "auto",
                }}
              >
                {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") &&
                  <>
                    <Button
                      disabled={disableButtons}
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        height: "35px",
                        // width: "70px",
                        background: "transparent",
                        ...((disableButtons) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),

                      }}
                      variant="outlined"
                      onClick={() => saveRecommendationsHandler()}
                    >
                      Save as Draft
                    </Button>
                    {!acceptButton && (
                      <Button
                        // disabled={disableAccept}
                        disabled={disableButtons || isAcceptLoading || employeeDataIsFetching || acceptButton}
                        style={{
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          height: "35px",
                          // width: "70px",
                          background: "transparent",
                          ...((disableButtons) && {
                            cursor: "not-allowed",
                            borderColor: "#ccc",
                            color: "#ccc",
                          }),

                        }}
                        variant="outlined"
                        onClick={() => acceptAppraisalHandler()}
                      >
                        {/* for Accept functionality adding save and submit as per 4/28/2023 client feedback */}
                        Save and Submit
                        {/* Accept */}
                      </Button>
                    )}
                    {!rejectButton && (
                      <AddButton
                        disabled={disableButtons || isAcceptLoading || employeeDataIsFetching || rejectButton}
                        style={{
                          // textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          height: "35px",
                          // width: "70px",
                          background: "transparent",
                          ...((disableButtons) && {
                            cursor: "not-allowed",
                            borderColor: "#ccc",
                            color: "#ccc",
                          }),

                        }}
                        variant="outlined"
                        onClick={() => rejectEmployeeHandler()}
                      >
                        {/* for Reject functionality adding save and submit as per 4/28/2023 client feedback */}
                        Save and Submit
                        {/* Reject */}
                      </AddButton>
                    )}
                    {/* <Link to={"/dashboardreview"}> */}
                    <Button
                      disabled={disableButtons}
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        height: "35px",
                        width: "70px",
                        background: "transparent",
                        ...((disableButtons) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),

                      }}
                      variant="outlined"
                      onClick={() => backHandler()}
                    >
                      Back
                    </Button>
                    <Button
                      disabled={disableButtons}
                      style={{
                        borderRadius: "4px",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                        ...((disableButtons) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),

                      }}
                      variant="outlined"
                      onClick={() => {
                        // saveRecommendationsHandler();
                        CancelButtonHandler();
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                }
              </Stack>

            </TabPanel>
            <Dialog
              // fullScreen={fullScreen}
              open={openSaved}
              onClose={handleCloseSaved}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              // sx={{
              //   "& .MuiDialog-container": {
              //     "& .MuiPaper-root": {
              //       width: "40%",
              //       margin: "auto",
              //       textAlign: "center",
              //       minHeight: "25%",
              //       // paddingTop: "25px",
              //     },
              //   },
              // }}
              // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
              PaperProps={{
                style: {
                  // borderColor:'blue',
                  //border:'1px solid',
                  boxShadow: "none",
                  borderRadius: "6px",
                  //marginTop: "155px",
                  maxWidth: "0px",
                  minWidth: "26%",
                  margin: "0px",
                  padding: "30px",
                  // maxHeight:"30%"
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                },
              }}
            >
              <DialogContent >
                <DialogContentText
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    // paddingBottom: "12px",
                    // paddingRight: "10px",
                    // paddingLeft: "10px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    wordBreak: "break-word",
                    // height: "100px",
                    alignItems: "center",
                    overflowY: "hidden",
                  }}
                >
                  {/* Changes were saved successfully */}
                  {message}
                </DialogContentText>
              </DialogContent>
              <div style={{ alignItems: "center" }}>
                <DialogActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    // style={{
                    //   textTransform: "none",
                    //   backgroundColor: "#FFA801",
                    //   fontSize: "12px",
                    //   fontFamily: "sans-serif",
                    //   padding: "2px 10px",
                    //   marginRight: "10px",
                    // }}
                    style={{
                      textTransform: "none",
                      // backgroundColor: "#FFA801",
                      fontSize: "15px",
                      color: "#3E8CB5",
                      fontFamily: "Arial",
                      // padding: "2px 10px",
                      borderColor: "#3E8CB5",
                      // marginRight: "10px",
                      background: "transparent",
                      height: "35px",
                      width: "70px",
                    }}
                    variant="outlined"
                    autoFocus
                    onClick={handleCloseSaved}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </div>
            </Dialog>

            {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
            <AlertDialogOkCancelForUnsavedChanges
              isAlertOpen={openCancelDialog}
              handleAlertClose={rejectCancelButtonHandler}
              handleAlertIdClose={acceptCancelButtonHandler}
            >
            </AlertDialogOkCancelForUnsavedChanges>


            <AlertDialogSuccess
              isAlertOpen={openValidation}
              handleAlertClose={handleValidationClose}>
              {message}
            </AlertDialogSuccess>
            <AlertDialogSuccess
              isAlertOpen={open33}
              handleAlertClose={handlemessage3}
            >
              {message}
            </AlertDialogSuccess>

            {/* Did you review recommendation for accept */}
            <AlertYesNo
              isAlertOpen={openReviewAlert}
              handleAlertYes={handleAcceptReviewAlert}
              handleAlertClose={handleReviewAlertClose}>
              {message}
            </AlertYesNo>

            {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
            <AlertDialogOkCancelForUnsavedChanges
              isAlertOpen={cancelRatingsAlert}
              handleAlertClose={handleCloseCancelRatingsAlert}
              handleAlertIdClose={handleCancelRatingsAlert}
            >
            </AlertDialogOkCancelForUnsavedChanges>

            {/* Would you like to accept appraisal */}
            <AlertYesNo
              isAlertOpen={openAcceptAlert}
              handleAlertYes={handleAcceptAlert}
              handleAlertClose={handleAcceptAlertClose}>
              {message}
            </AlertYesNo>

            {/* Did you review recommendation for reject */}

            <AlertYesNo
              isAlertOpen={openRejectReviewAlert}
              handleAlertYes={handleRejectReviewAlert}
              handleAlertClose={handleRejectReviewAlertClose}>
              {message}
            </AlertYesNo>

            {/*would you like to reject appraisal */}
            <AlertYesNo
              isAlertOpen={openRejectAlert}
              handleAlertYes={handleRejectAlert}
              handleAlertClose={handleRejectAlertClose}>
              {message}
            </AlertYesNo>

            <Dialog
              // fullScreen={fullScreen}
              open={openSubmit}
              onClose={handleCloseSubmit}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              // sx={{
              //   "& .MuiDialog-container": {
              //     "& .MuiPaper-root": {
              //       width: "40%",
              //       margin: "auto",
              //       textAlign: "center",
              //       minHeight: "25%",
              //       // paddingTop: "25px",
              //     },
              //   },
              // }}
              // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
              PaperProps={{
                style: {
                  // borderColor:'blue',
                  //border:'1px solid',
                  boxShadow: "none",
                  borderRadius: "6px",
                  //marginTop: "155px",
                  maxWidth: "0px",
                  minWidth: "26%",
                  margin: "0px",
                  padding: "30px",
                  // maxHeight:"30%"
                  // display: "flex",
                  // justifyContent: "center",
                  // alignItems: "center",
                  // textAlign: "center",
                },
              }}
            >
              <DialogContent >
                <DialogContentText
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                    fontFamily: "Arial",
                    // paddingBottom: "12px",
                    // paddingRight: "10px",
                    // paddingLeft: "10px",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    wordBreak: "break-word",
                    // height: "100px",
                    alignItems: "center",
                    overflowY: "hidden",
                  }}
                >
                  {/* Changes were saved successfully */}
                  {message}
                </DialogContentText>
              </DialogContent>
              <div style={{ alignItems: "center" }}>
                <DialogActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    // style={{
                    //   textTransform: "none",
                    //   backgroundColor: "#FFA801",
                    //   fontSize: "12px",
                    //   fontFamily: "sans-serif",
                    //   padding: "2px 10px",
                    //   marginRight: "10px",
                    // }}
                    style={{
                      textTransform: "none",
                      // backgroundColor: "#FFA801",
                      fontSize: "15px",
                      color: "#3E8CB5",
                      fontFamily: "Arial",
                      // padding: "2px 10px",
                      borderColor: "#3E8CB5",
                      // marginRight: "10px",
                      background: "transparent",
                      height: "35px",
                      width: "70px",
                    }}
                    variant="outlined"
                    autoFocus
                    onClick={handleCloseSubmit}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </div>
            </Dialog>
            {/* </Link> */}

            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50px",
                paddingBottom: "30px",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  background: "transparent",
                  height: "35px",
                  width: "70px"
                }}
                variant="outlined"
                onClick={() => rejectHandler()}
              >
                Submit
              </Button>
            </div> */}
            <Snackbar
              style={{
                paddingBottom: '16px',
                paddingRight: '16px',
              }}
              // className={classes.customSnackbar}
              open={successAlertTriger}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <Alert
                style={{
                  backgroundColor: '#3e8cb5',
                  color: "white",
                  height: '60px !important',
                  alignItems: "center",
                  fontSize: "1rem"
                }}
                // className={classes.customAlert}
                onClose={handleCloseSnackbar}
                sx={{ width: '100%' }}
                icon={false}
              >
                <b>{successAlertTrigerMSG}</b>
              </Alert>
            </Snackbar>

          </Box>
        </Box>
      </div >
    </>
  );
}

