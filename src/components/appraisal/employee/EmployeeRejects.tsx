import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  IconButton,
  styled,
  Tab,
  TableContainer,
  Tabs,
  TextField,
  Popover,
  Stack,
  Typography,
  Breadcrumbs,
  Select, Snackbar
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Scrollbar } from "react-scrollbars-custom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Infoicon from "../../../assets/Images/Infoicon.svg";
import Eye from "../../../assets/Images/Eye.svg";
import Infowhiteicon from "../../../assets/Images/Infowhiteicon.svg";
import { EMPLOYEE_PREVIOUS_PAs } from "../../../constants/routes/Routing";
import { useGetEmployeeDetailsWithEmpCodeQuery } from "../../../service/employee/previousAppraisal";
import { Link } from "react-router-dom";
import Removeattnew from "../../../assets/Images/Removeattnew.svg";
import Uploadatt from "../../../assets/Images/Uploadatt.svg";
import thumbsdown_colored from "../../../assets/Images/Thumbsdowncolored.svg";
import thumsup_colored from "../../../assets/Images/thumsup_colored.svg";
import Thumsup from "../../../assets/Images/Thumsup.svg";
import {
  EMPLOYEE_DOWNLOAD,
  EMPLOYEE_LANDING,
} from "../../../constants/routes/Routing";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetEmployeeAppraisalQuery,
  useGetRatingScaleQuery,
  useGetObjectiveTitleQuery,
  useEmployeeRejectionMutation,
  useUpdateEmployeeAppraisalMutation,
  useAcceptAppraisalEmployeeMutation,
  useGetTrainingRecommendationQuery,
  useAttachmentsEmployeeMutation,
  useEmployeeRejectSaveMutation,
  useAttachmentsEmployeeDeleteMutation,
  useAttachmentsAppraiserDeleteMutation,
  useEmployeeAcceptsAppraiserRatingMutation,
  useGetTalentCategoryQuery,
} from "../../../service";
import _ from "lodash";
import dayjs from "dayjs";
import Downloadss from "../../../assets/Images/Downloadss.svg";
import Blueadd from "../../../assets/Images/Blueadd.svg";
import MenuItem from "@mui/material/MenuItem";
import { FormatColorResetSharp } from "@mui/icons-material";
import Blueminus from "../../../assets/Images/Blueminus.svg";
import { Tooltip } from "@mui/material";
import { useCreateAzureBlobMutation } from "../../../service/azureblob";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import AlertYesNo from "../../UI/DialogYesNo";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import Thumsdown from "../../../assets/Images/Thumsdown.svg";
import FeedbackQuestionnaireAppraiser from "../FeedbackQuestionnaireAppraiser";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import AlertAcceptDialog from "../../UI/DialogAccept";
import { useGetEmailIdsQuery, useSendEmailNotificationMutation } from "../../../service/email/emailNotification";
import { EMPLOYEE_REJECTS_AGREED, EMPLOYEE_REJECTS_DISAGREED } from "../../../constants/AppraisalEmailContents/NotificationForAction/Employee";
import { EMPLOYEE_ACCEPTS_AGREED_INFO, EMPLOYEE_REJECTS_DISAGREED_INFO } from "../../../constants/AppraisalEmailContents/NotificationForInfo/Employee";
import { makeStyles } from "@mui/styles";
import AlertDialogOkCancelForUnsavedChanges from "../../UI/DialogforunsavedChangesAlert";
import { useCheckRoleLogsMutation } from "../../../service/employee/employee";


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

const Tf1 = styled("div")({
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign: "left",
  },
});
const RatingBackground = styled("div")({
  width: "27px",
  lineHeight: "27px",
  borderRadius: "50%",
  display: "block",
  // color: "white",  background: "red",
});
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const EmployeeText = styled("div")({
  "& .MuiInputBase-root": {
    backgroundColor: "#f8f8f8",
  },
  "& .MuiTextField-root": {
    width: "100%",
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
  },
});

const Tf3 = styled("div")({
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",

  "& .MuiInputBase-input": {
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
    textAlign: "left",
  },
});
const Tf31 = styled("div")({
  // position: "absolute",
  width: "96%",

  "& .MuiInputBase-input": {
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    fontSize: "14px",
    color: "#333333",
    backgroundColor: "#f8f8f8",
    padding: "8px",
    borderRadius: "5px",
    minHeight: "50px",
    textAlign: "left",
  },
});

const Train = styled("div")({
  "& .MuiTextField-root": {
    // color: "rgb(51 51 51/50%)",
    fontSize: "14px",
    color: "#333333",
    textTransform: "none",
    fontFamily: "Arial",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    padding: "8px",
    paddingRight: "0px",
  },
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "Arial",
    textAlign: "left",
  },
  "& .MuiInputBase-root": {
    backgroundColor: "#f8f8f8",
    padding: "3px",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#f8f8f8",
    },
    "&:hover fieldset": {
      borderColor: "#f8f8f8",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#f8f8f8",
    },
  },
});
const Typo4 = styled("div")({
  marginLeft: "25px",
  //  position: "absolute",
  //  marginTop: '305px',
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
});

const Typo5 = styled("div")({
  // marginLeft: "580px",
  // position: "absolute",
  // marginTop: '285px',
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
});
const Tf4 = styled("div")({
  // position: "absolute",
  // width: "95%",
  //  marginLeft: "580px",
  //  marginTop: "300px",
  marginTop: "10px",
  borderRadius: "5px",
  backgroundColor: "#f8f8f8",

  //opacity: 0.7,
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    // minHeight: "110px !important",
    padding: "8px",
    textAlign: "left",
  },

  "& .MuiTextField-root": {
    width: "100%",
  },
});

const Addmore = styled("div")({
  // position: "absolute",
  // marginTop: '628px',
  // marginLeft: '45px',
  textDecoration: "underline",
  color: "#93DCFA",
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
const Overallfeedbackss = styled("div")({
  // marginLeft: "25px",
  marginTop: "10px",
  color: "#3e8cb5",
  fontSize: "20px",
  fontFamily: "Avenir semibold",
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic",
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
  fontFamily: "arial",
  // fontWeight: 400,
  // color: "#3e8cb5",
  //opacity: 0.5,
  //textAlign: 'left'
  // marginTop:'10px'
});
const Item2 = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "450px",
  margin: "1rem",
  // // paddingTop: "1px",
  // marginLeft: "15px",
  // marginTop: "5px",
}));
const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      fontSize: "14px !important",
      fontFamily: "arial !important",
      color: "#333333 !important",
    },
  },
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
const Text = styled("div")({
  "& .MuiButton-root": {
    color: "#858585",
    // opacity: 0.6,
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
  },
  paddingTop: "0px",
  color: "#858585",
  marginLeft: "-3px",
});

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
export default function EmployeeRejects(props: any) {
  const classes = useStyles();
  const { appraisalData, ratingScaleData, nineBoxData } = props;
  const [navPrompt, setnavPrompt] = React.useState(false);
  console.log(navPrompt, 'navPrompt')
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(
    null
  );
  const CustomScrollbar = Scrollbar as any;
  const formIsDirty = navPrompt;
  usePrompt(
    // 'Please save the changes before you leave the page.', 
    "Any changes you have made will not be saved if you leave the page.",
    formIsDirty);
  const open2 = Boolean(anchorEl2);
  // const id = open2 ? "simple-popover" : undefined;
  const [name, setName] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<any>("");

  const [employeeAgreevalue, setEmployeeAgreevalue] = React.useState("");

  const [sendItem] = useCreateAzureBlobMutation();

  const [attachmentsEmployee] = useAttachmentsEmployeeMutation();

  const { employee_id } = useParams();
  const { data: employeeData, refetch: fetchCancel, isLoading, isFetching: employeeDataIsFetching } =
    useGetEmployeeAppraisalQuery(employee_id);
  const { data: trainingData } = useGetTrainingRecommendationQuery("");
  const { data: ratingsData } = useGetRatingScaleQuery("");
  const { data: objectiveTitleData, isLoading: isTitleLoading } =
    useGetObjectiveTitleQuery("");
  const { data: ratingData } = useGetRatingScaleQuery("");
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [deleteEmployeeMutation, { isLoading: delete1, data: deleted }] =
    useAttachmentsEmployeeDeleteMutation();
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [displayEmployeeRating, setDisplayEmployeeRating] = useState(false);
  const [rating, setRating] = useState<any>("");
  const [ratingValue, setRatingValue] = useState<any>("");
  const [ratingDataCurrent, setRatingDataCurrent] = useState("")
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  const [rejectedTitle, setRejectedTitle] = useState<any>("");
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = useState("");
  const [employeeComments, setEmployeeComments] = useState("");
  const [message, setMessage] = useState("");

  const [overAllRating, setOverAllRating] = useState<any>(0);
  const [currentOverAllRating, setCurrentOverAllRating] = useState<any>(0)
  const [currentObjectiveDescription, setCurrentObjectiveDescription] = useState<any>([])
  const [currentObjectiveType, setCurrentObjectiveType] = useState<any>([])
  const [updateEmployee, { isLoading: isUploading }] = useEmployeeRejectionMutation();
  const [updateAppraisalRating, { isLoading: isAcceptLoading }] = useEmployeeAcceptsAppraiserRatingMutation();
  const [updateEmployeeAppraisal] = useUpdateEmployeeAppraisalMutation();
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: employeeData?.data?.employee_code })
  const [employeeUpdateRating] = useUpdateEmployeeAppraisalMutation();
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [employeeRejectionSave] = useEmployeeRejectSaveMutation();
  const [acceptRatingAlert, setAcceptRatingAlert] = useState(false)
  const [objectiveData, setObjectiveData] = useState<any>({})
  const [talentPotential, setTalentPotential] = useState<any>("")
  const [talentRating, setTalentRating] = useState<any>(0)
  const { data: talentCategory } = useGetTalentCategoryQuery
    ({ overall_rating: talentRating, potential: talentPotential });
  const navigate = useNavigate();
  const [appraiserAreaofImprovement, setAppraiserAreaofImprovement] =
    useState<any>([]);
  const [
    appraiserTrainingRecommendations,
    setAppraiserTrainingRecommendations,
  ] = useState<any>([]);

  const [showAreaofImprovement, setShowAreaofImprovement] =
    useState<any>(false);
  const [showTrainingRecommendations, setShowTrainingRecommendations] =
    useState<any>(false);
  const [showTrainingRecommendation, setShowTrainingRecommendation] =
    useState<any>(false);
  const [open33, setOpen33] = useState<any>(false);
  const [message2, setMessage2] = useState<any>("");

  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [disableButtons, setDisableButtons] = useState(false);
  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }
  const handlemessage3 = () => {
    setOpen33(false);
  }
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (moveTab == true && value == 0) {
      setOpenSaved(true);
      setMessage("Please save the ratings before leaving the page.");
    } else if (moveTab == true && value == 1) {
      setOpenSaved(true);
      setMessage("Please save the changes before leaving the page.");
    } else {
      setValue(newValue);
    }
  };


  const handleClickOpenAttachment = (e: any) => {
    document.getElementById("photo")?.click();
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployeeAgreevalue((event.target as HTMLInputElement).value);
  };
  const [open, setOpen] = React.useState(false);
  const [moveTab, setMoveTab] = useState(false);
  const [openSubmit, setOpenSubmit] = React.useState(false);
  const [openSaved, setOpenSaved] = React.useState(false);
  const [openValidation, setOpenValidation] = useState(false);
  const [openRejectValidation, setOpenRejectValidation] = useState(false);
  const [agreeSelectedOption, setAgreeSelectedOption] = useState(false)
  const [confirmSelectedOption, setConfirmSelectedOption] = useState(false)
  const [doubleConfirmSelectedOption, setDoubleConfirmSelectedOption] = useState(false)
  const [employeeAgreesWithAppraiser, setEmployeeAgreesWithAppraiser] = useState(employeeData?.data?.employee?.employee_agree);
  //slider save validation
  const [triggerUseEffect, settriggerUseEffect] = React.useState(false);
  const [copiedFinalRating, setcopiedFinalRating] = React.useState("");
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState("");
  const [valueupdateAlert, setvalueupdateAlert] = React.useState(false);
  const [compvalue, setcompvalue] = React.useState("");
  const [oneToOneMeetingDate, setOneToOneMeetingDate] = useState<any>("")
  const [meetingValidation, setMeetingValidation] = useState(false)
  const [reviewedOverallFeedback, setReviewedOverallFeedback] = useState(false)
  const inputRef = useRef<any>(null);
  const { data: emailData } = useGetEmailIdsQuery({ appraiser_code: employeeData?.data?.appraiser_code, reviewer_code: employeeData?.data?.reviewer_code, normalizer_code: employeeData?.data?.normalizer_code })
  const [cancelRatingsAlert, setCancelRatingsAlert] = useState(false)
  const [updateLoggedRole] = useCheckRoleLogsMutation()
  console.log(copiedFinalRating, "triggervalue");
  console.log(triggerUseEffect, "trigger");
  console.log(rejectAlert, "triggeralert");
  console.log(rejectAlert, "triggeralert");
  console.log(compvalue, "compvalue");
  // const handleSliderDialogClose = () ={
  //   setrejectAlert(false)
  // }
  const handleSliderDialogClose = () => {
    setrejectAlert(false);
  };
  const handlevalueupdateDialogClose = () => {
    setvalueupdateAlert(false);
  };
  useEffect(() => {
    if (triggerUseEffect === true) {
      setcopiedFinalRating(rating);
      settriggerUseEffect(false);
    }
  }, [triggerUseEffect]);
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
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);

  // refetch
  const CancelButtonHandler = () => {
    // if(navPrompt == true && moveTab == false){
    //   setOpenCancelDialog(true);
    // }else{
    //   setOpenCancelDialog(false);
    // }
    if (navPrompt == true) {
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
    setOpenCancelDialog(false);
    setMoveTab(false);
    setnavPrompt(false);
    fetchCancel().then((res: any) => setValue(0));
  }
  // useEffect(() => {
  //   const H = employeeData &&  objectiveDescription.map((j: any, index: number) => {
  //   employeeData.data.appraisal.objective_description
  //     .filter(
  //       (i: any) =>
  //         i.name._id === j.name._id
  //     )
  //     console.log(H,'hhhhhh')
  //     return H
  //    })
  // }, [employeeData])

  //slider save validation

  //Accept - dialog boxes

  const [openforAccept, setopenforAccept] = React.useState(false);
  const [openforAcceptNext, setopenforAcceptNext] = React.useState(false);
  const handleCloseOpenForAccept = () => {
    setopenforAccept(false);
  };
  const handleOpenForAccept = () => {
    setopenforAccept(true);
  };
  const handleCloseOpenForAcceptNext = () => {
    setopenforAcceptNext(false);
  };
  const handleOpenForAcceptNext = () => {
    setopenforAcceptNext(true);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
    setMessage("");
    setDisableButtons(false);
  };
  //Rating popover datas
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
  //rating popover ends
  const acceptHandler = () => {
    accept(employee_id);
    let trainingRecommendationValues = formValues
      .map((item: any) => {
        console.log(item, "newitem")
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });
    let employeeObjDesc =
      employeeData?.data?.employee?.objective_description?.map((i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      });
    let areaValues = area.filter((item: any) => item.value.trim() != "").map((item: any) => {
      let trimSpecificAction = item.specific_actions?.map((item: any) => {
        return {
          ...item,
          value: item?.value?.trim()
        }
      })
      return {
        ...item,
        value: item?.value?.trim(),
        specific_actions: trimSpecificAction
      }
    });
    employeeUpdateRating({
      "employee.objective_description":
        employeeData.data.normalizer.objective_description,
      "appraisal.pa_status": "Completed",
      "appraisal.pa_rating": employeeData?.data?.current_rating?.overall_rating,
      "talent_category": talentCategory?.data,
      // "appraisal.status": "rejected",
      id: employee_id,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": areaValues,
      "employee.comments": employeeComments?.trim(),
      // "employee.objective_description" : employeeObjDesc,
    });
    // handleClose1();
    handleClose();
  };
  //Accept - dialog boxes
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [accept, { error, isError }] = useAcceptAppraisalEmployeeMutation();

  const [textfeildError, settextfeildError] = useState(false);


  const cancelHandler = () => {
    let employeeActionPerformed = objectiveDescription?.filter((item: any) => item.action_performed)
    if (employeeActionPerformed?.length > 0) {
      setCancelRatingsAlert(true);
    } else if (moveTab || navPrompt) {
      setCancelRatingsAlert(true);
    } else {
      navigate(`${EMPLOYEE_LANDING}/employee/${employee_id}`)
    }
  }

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
      setratingdefenition("");
      setratingscaledef("");
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
  //     } else if ((item?.rating >= 2.5 && item?.rating <= 2.99) && (Overall_rating >= 2.5 && Overall_rating <= 2.99)) {
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

  const open22 = Boolean(anchorE22);
  const id22 = open22 ? "simple-popover" : undefined;
  const handleCloseCancelRatingsAlert = () => {
    setCancelRatingsAlert(false);
    setMessage("")
  }

  const handleCancelRatingsAlert = () => {
    setMoveTab(false);
    setnavPrompt(false);
    setCancelRatingsAlert(false);
    let previousData = {
      appraisal: employeeData?.data?.appraisal_previous_submission?.objective_description,
      employee: employeeData?.data?.employee_previous_submission?.objective_description?.length == 0 ?
        employeeData?.data?.current_previous_submission.objective_description :
        employeeData?.data?.employee_previous_submission.objective_description,
      current: employeeData?.data?.current_previous_submission.objective_description,
      overallRating: employeeData?.data?.current_previous_submission?.overall_rating
    }

    updateEmployeeAppraisal({
      "appraisal.objective_description": previousData?.appraisal,
      "employee.objective_description": previousData?.employee,
      "current_rating.objective_description": previousData?.current,
      "current_rating.overall_rating": previousData?.overallRating,
      id: employee_id,
    })
      .then((res: any) => {
        navigate(`${EMPLOYEE_LANDING}/employee/${employee_id}`);
      })
  }



  const handleClickOpenForSubmit = () => {
    setDisableButtons(true);
    if (employeeData?.data?.appraisal?.status !== "rejected") {
      if (!doubleConfirmSelectedOption) {
        setAgreeSelectedOption(true);
      } else {
        handleClickOpen();
      }
    }
    else {
      handleClickOpen();
    }

    // handleClickOpen();
    // if (employeeComments === "" || employeeComments === undefined) {
    //   setOpenValidation(true);
    //   setMessage("Would you like to add employee comment in the overall feedback ?");
    // } else {
    //   // setOpenRejectValidation(true);
    //   // setMessage("Are you sure you wish to reject the performance appraisal?")
    //   handleClickOpen();
    // }
  };

  const handleAgreeSelectedOptionYes = () => {
    setDoubleConfirmSelectedOption(true)
    setAgreeSelectedOption(false);
    handleClickOpen();
  }

  const handleAgreeSelectedOptionNo = () => {
    setAgreeSelectedOption(false);
    setConfirmSelectedOption(true);
  }

  const [disableTextAfterSubmission, setDisableTextAfterSubmission] = useState(false)

  const handleCloseConfirmSelectedOption = () => {
    setConfirmSelectedOption(false);
    updateEmployeeAppraisal({
      "employee.employee_agree": employeeAgreesWithAppraiser,
      id: employee_id,
    }).then((res: any) => {
      if (!res.error) {
        handleClickOpen();
      }
    }
    )

  }

  const handleCloseMeetingValidation = () => {
    setMeetingValidation(false);
    setValue(1);
    setDisableButtons(false);
  }

  const handleOneToOneMeetingDate = (e: any) => {
    setOneToOneMeetingDate(e.target.value);
  }


  useEffect(() => {
    if (employeeData) {
      setTalentPotential(employeeData?.data?.appraisal?.potential);
      setTalentRating(employeeData?.data?.employee?.employee_rating);
      setOneToOneMeetingDate(employeeData?.data?.employee?.one_to_one_meeting?.slice(0, 10));
      setDisableTextAfterSubmission(!employeeData?.data?.appraisal?.pa_status?.includes("Pending with Employee"));
      setEmployeeAgreesWithAppraiser(employeeData?.data?.employee?.employee_agree)
    }
  }, [employeeData])

  const handleRejectValidationYes = () => {
    setOpen(false);
    setOpenRejectValidation(false);
    setMessage("");
    let employeeObjDesc =
      employeeData?.data?.employee?.objective_description?.map((i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      });
    // employeeRejectionSave({
    //   "employee.comments": employeeComments?.trim(),
    //   id: employee_id,
    // }).then((data: any) => {
    /** to check training category is not empty and to remove extra spaces in training recommendation textfields */
    let trainingRecommendationValues = formValues?.filter((item: any) => item.name !== "")?.map((item: any) => {
      return {
        ...item,
        training_name: item?.training_name?.trim(),
        justification: item?.justification?.trim(),
      }
    });

    /** to check Specific area is not empty and to remove extra spaces in Area of Improvement textfields */
    let areaValues = area.filter((item: any) => item?.value?.trim() != "")?.map((item: any) => {
      let trimSpecificAction = item.specific_actions?.map((item: any) => {
        return {
          ...item,
          value: item?.value?.trim()
        }
      })
      return {
        ...item,
        value: item?.value?.trim(),
        specific_actions: trimSpecificAction
      }
    });
    setnavPrompt(false);
    setMoveTab(false);
    updateEmployeeAppraisal({
      id: employee_id,
      "employee.objective_description": employeeObjDesc,
      "employee.comments": employeeComments?.trim(),
      "employee_previous_submission.comments": employeeComments?.trim(),
      "employee.one_to_one_meeting": oneToOneMeetingDate,
      "employee_previous_submission.one_to_one_meeting": oneToOneMeetingDate,
      "employee_previous_submission.objective_description": employeeObjDesc,
      "employee_previous_submission.employee_rating": employeeData?.data?.employee?.employee_rating,
      "appraisal.show_employee": true,
      "appraisal.pa_status": employeeAgreesWithAppraiser ? "Pending with Appraiser (Employee Rejection)" : "Pending with HR Normalizer (Mediation)",
      "appraisal_previous_submission.pa_status": employeeAgreesWithAppraiser ? "Pending with Appraiser (Employee Rejection)" : "Pending with HR Normalizer (Mediation)",
      "appraisal.pa_rating": employeeData?.data?.current_rating?.overall_rating,
      "employee.employee_rating": employeeData?.data?.current_rating?.overall_rating,
      "employee.employee_rejection": true,
      "current_previous_submission.objective_description": employeeData?.data?.current_rating.objective_description,
      "appraisal_previous_submission.objective_description": employeeData?.data?.appraisal?.objective_description,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee_previous_submission.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": areaValues,
      "employee_previous_submission.area_of_improvement": areaValues,
      "employee.employee_PA_rejected": true,
      // "employee.employee_agree" : employeeAgreesWithAppraiser,
    }).then((res: any) => {
      if (!res.error) {
        employeeRejectionSave({
          id: employee_id,
        })
        navigate(`${EMPLOYEE_LANDING}/employee/${employee_id}`);
        updateLoggedRole({
          pa_action_by: `Employee (Rejected) : ${new Date()}`,
          id: employee_id
        });
        setDisableButtons(false);



        let appraiserName = employeeData?.data?.appraiser_name;
        let normalizerName = employeeData?.data?.normalizer_name;
        let employeeName = employeeData?.data?.first_name;
        let calendarName = employeeData?.data?.calendar?.calendar_type;
        let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
        let empCode = employeeData?.data?.employee_code;
        let normalizerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.firstName;
        let appraiserFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.firstName;


        if (employeeAgreesWithAppraiser == true) {
          //  setOpenSubmit(true);
          //snackbar
          setSuccessAlertTriger(true)
          /* changed message as per 6/16  */
          if (Math.abs(employeeData?.data?.current_rating?.overall_rating - employeeData?.data?.normalizer?.normalized_overallRating) >= 0.3) {
            // setMessage("The performance appraisal has been submitted to the Appraiser for re-normalization. The Employee’s overall PA rating changed after the PA meeting by more than 0.3 and must be re-normalized by the Appraiser, Reviewer and the HR Normalizer.")
            //  setMessage("The performance appraisal has been submitted to the Appraiser for re-normalization. Your overall rating was changed by more than 0.3 and must be re-normalized by the Appraiser, Reviewer and the HR Normalizer.")
            setSuccessAlertTrigerMSG("The performance appraisal has been submitted to the Appraiser for re-normalization. Your overall rating was changed by more than 0.3 and must be re-normalized by the Appraiser, Reviewer and the HR Normalizer.")
          } else {
            //  setMessage("The performance appraisal has been submitted to the Appraiser for re-normalization.")
            setSuccessAlertTrigerMSG("The performance appraisal has been submitted to the Appraiser for re-normalization.")
          }

          if (employeeData?.data?.employee?.objective_description?.filter((item: any) => item.rating_rejected)?.length === 0) {
            // Notification action Employee rejects PA (agreed with Appraiser) (for Appraiser)
            let tempSubject = EMPLOYEE_ACCEPTS_AGREED_INFO?.subject;
            tempSubject = tempSubject.replace("[year]", `${calendarYear}`);
            tempSubject = tempSubject.replace("[calendar name]", `${calendarName}`);
            tempSubject = tempSubject.replace("[employee name]", `${employeeName}`);
            tempSubject = tempSubject.replace("[employee code]", `${empCode}`);

            let tempHtml = EMPLOYEE_ACCEPTS_AGREED_INFO?.html;
            tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
            tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
            tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
            tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
            tempHtml = tempHtml?.replace("[employee code]", `${empCode}`);

            let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
            let email = EMPLOYEE_ACCEPTS_AGREED_INFO?.to;
            email = email?.replace("[email]", `${appraiserEmail}`);

            sendEmailNotification(
              {
                to: email,
                subject: tempSubject,
                html: tempHtml
              }
            )
          } else {
            // Notification action Employee rejects PA (agreed with Appraiser) (for Appraiser)
            let tempSubject = EMPLOYEE_REJECTS_AGREED?.subject;
            tempSubject = tempSubject.replace("[year]", `${calendarYear}`);
            tempSubject = tempSubject.replace("[calendar name]", `${calendarName}`);
            tempSubject = tempSubject.replace("[employee name]", `${employeeName}`);
            tempSubject = tempSubject.replace("[employee code]", `${empCode}`);

            let tempHtml = EMPLOYEE_REJECTS_AGREED?.html;
            tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
            tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
            tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
            tempHtml = tempHtml?.replaceAll("[Appraiser FirstName]", `${appraiserFirstName}`);
            tempHtml = tempHtml?.replaceAll("[Appraiser name]", `${appraiserName}`);
            tempHtml = tempHtml?.replace("[employee code]", `${empCode}`);

            let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
            let email = EMPLOYEE_REJECTS_AGREED?.to;
            email = email?.replace("[email]", `${appraiserEmail}`);

            sendEmailNotification(
              {
                to: email,
                subject: tempSubject,
                html: tempHtml
              }
            )
          }

        } else {
          //  setOpenSubmit(true);
          // setMessage("The performance appraisal was submitted to the HR Normalizer for the mediation.")
          //snackbar
          setSuccessAlertTrigerMSG("The performance appraisal was submitted to the HR Normalizer for the mediation.")
          setSuccessAlertTriger(true)

          // Notification action Employee rejects PA (disagreed with Appraiser) (for Normalizer)
          let tempSubject = EMPLOYEE_REJECTS_DISAGREED?.subject;
          tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
          tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
          tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
          tempSubject = tempSubject.replace("[employee code]", `${empCode}`);

          let tempHtml = EMPLOYEE_REJECTS_DISAGREED?.html;
          tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
          tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
          tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
          tempHtml = tempHtml.replace("[Appraiser name]", `${appraiserName}`);
          tempHtml = tempHtml?.replace("[employee code]", `${empCode}`);
          tempHtml = tempHtml?.replace("[Normalizer FirstName]", `${normalizerFirstName}`);

          let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.email
          let email = EMPLOYEE_REJECTS_DISAGREED?.to;
          email = email?.replace("[email]", `${normalizerEmail}`);

          sendEmailNotification(
            {
              to: email,
              subject: tempSubject,
              html: tempHtml
            }
          )

          // Notification info Employee rejects PA (disagreed with Appraiser) - (for Appraiser/Reviewer)
          let tempSubjectInfo = EMPLOYEE_REJECTS_DISAGREED_INFO?.subject;
          tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
          tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
          tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
          tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${empCode}`);

          let tempHtmlInfo = EMPLOYEE_REJECTS_DISAGREED_INFO?.html;
          tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
          tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
          tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
          tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer name]", `${normalizerName}`);
          tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${empCode}`);
          tempHtmlInfo = tempHtmlInfo?.replace("[Appraiser name]", `${appraiserName}`);

          let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
          let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
          let employeeEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.employee_code)?.email

          let emailInfo = EMPLOYEE_REJECTS_DISAGREED_INFO?.to;
          const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`, `${employeeEmail}`]
          emailInfo = emailInfo?.replace("[email]", `${normalizerEmail}`);

          sendEmailNotification(
            {
              to: emailInfo,
              cc: recipientEmails,
              subject: tempSubjectInfo,
              html: tempHtmlInfo
            }
          )
        }
      } else {
        updateLoggedRole({
          pa_action_by: `${res.error} : ${new Date()}`,
          id: employee_id
        })
        setMessage2("Something Went Wrong.")
        setOpen33(true)
      }
    })

  };

  const handleRejectValidationClose = () => {
    setOpenRejectValidation(false);
    setMessage("");
  };

  const handleValidationYes = () => {
    setOpenValidation(false);
    setValue(1);
    setMessage("");
  };

  const handleValidationNo = () => {
    setOpenValidation(false);
    handleRejectValidationYes()
    // setOpenRejectValidation(true);
    // setMessage(
    //   "Are you sure you wish to reject the performance appraisal? "
    // );

  };

  // useEffect(() => {
  //   if (employeeComments?.trim() == "" || employeeComments?.trim() == undefined) {
  //     setMoveTab(false);
  //   }
  // }, [employeeComments]);

  const handleClickOpen = () => {
    // setOpen(true);
    const RejectChanges = objectiveDescription
      .map((i: any) => {
        return i.rating_rejected;
      })
      .find((elements: any) => {
        return elements === true;
      });
    console.log(RejectChanges, "RejectChanges");
    let appraiserRejectedRatings = employeeData?.data?.appraisal?.objective_description?.filter((item: any) => {
      return item.rating_rejected == true
    }).map((item: any) => item?.name?._id);
    let actionPerformed = objectiveDescription?.filter((item: any) => {
      return appraiserRejectedRatings?.includes(item?.name?._id) && item?.action_performed == false
    });
    if (RejectChanges !== true && employeeData?.data?.appraisal?.status !== "rejected") {
      setOpenSaved(true);
      setMessage("You cannot submit the performance appraisal. Please reject the ratings.")
    } else if (employeeData?.data?.appraisal?.appraiser_status == "appraiser-rejected-employee" && actionPerformed?.length > 0) {
      setOpenSaved(true);
      setMessage("You cannot submit the performance appraisal. Please accept or reject the ratings.")
    }
    // else if (!reviewedOverallFeedback) {
    //   setOpen(true);
    // } 
    else {
      submitEmployeeRejection()
    }
  };

  const handleCloseSubmit = () => {
    setOpenSubmit(false);
    setOpen(false);
    setMessage("");
    navigate(`${EMPLOYEE_LANDING}/employee/${employee_id}`);
    fetchCancel();
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseNo = () => {
    setOpen(false);
    setValue(1);
  };

  const theme1 = useTheme();
  const fullScreen1 = useMediaQuery(theme.breakpoints.down("md"));


  const [open3, setOpen3] = React.useState(false);
  const theme3 = useTheme();
  const fullScreen3 = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);
  const [objectiveDescription1, setObjectiveDescription1] = useState<any>([]);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [popoverIndex1, setPopoverIndex1] = useState<any>("");
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setMoveTab(false);
    setIsDrawerOpen(false);
    setRating("");
    setRatingValue("");
    // setratingSelection(false);
  };
  const openDrawerHandler = (objective: any) => {

    console.log(objective, "objectiveeeeeeeeeeeeeeeeeeeeee");
    settriggerUseEffect(true);
    openDrawer();
    let reviewerRatingValue =
      employeeData?.data?.appraisal?.objective_description
        .filter((i: any) => i?.name?._id === objective?.name?._id)
        .map((k: any) => {
          if (k.ratings) return k.ratings.rating;
        })[0];
    setRatingAppraiser(reviewerRatingValue);
    setActiveObjectiveDescriptionName(objective?.name?._id);
    setActiveObjectiveDescription(objective._id);
    setRejectedTitle(objective?.name?.objectiveTitle);
    // setComments(objective.rating_comments);
    // setComments(objective.rating_comments);
    setComments(objective.rejection_reason);
    if (objective.rating_rejected == true && objective.action_performed == true) {
      setShowWithdraw(true);
    } else {
      setShowWithdraw(false);
    }
    if (objective.rating_rejected == true) {
      setRating(objective.ratings._id);
      setRatingValue(objective.ratings.rating);
    } else {
      setRating("");
      setRatingValue("");
    }
    // setratingparams(objective.ratings.rating);
    // if (displayEmployeeRating == false) {
    //   setRating(objective.ratings._id);
    //   setRatingDataCurrent(objective.ratings)
    //   setRatingValue(objective.ratings.rating);
    // } else if (displayEmployeeRating == true) {
    //   setRating(rating);
    //   setRatingDataCurrent(ratingDataCurrent)
    //   setRatingValue(ratingValue);
    // }
    setName("");
    resetFileInput();
  };
  // accept drawer handler

  // const openAcceptDrawerHandler = () => {
  //   handleAcceptRatingAlertYes()
  //   // setAcceptRatingAlert(true);
  //   // setMessage("Are you sure you wish to accept the rating ?")
  // }


  const handleAcceptRatingAlertYes = (objectiveData: any) => {
    setnavPrompt(false);
    setAcceptRatingAlert(false);
    let temp = employeeData.data.appraisal.objective_description
      .filter((i: any) => i.name._id === objectiveData?.name?._id)
      .map((k: any) => k.ratings?._id)[0];

    let normalizerRatingValue =
      employeeData?.data?.normalizer?.objective_description
        .filter((i: any) => i?.name?._id == objectiveData?.name?._id)
        .map((j: any) => {
          if (j?.ratings?._id !== temp) {
            return true
          } else return false
        })[0]

    let appraiser_objective_description = employeeData.data.appraisal.objective_description.map(
      (i: any) => {
        if (i.name._id === objectiveData?.name?._id)
          return {
            ...i,
            rating_rejected: false,
            rating_resubmitted: normalizerRatingValue,
          }
        else return i
      }
    )
    console.log(temp, 'temppppppp')

    const getAppraiserRating = (objId: any) => {
      return employeeData?.data?.appraisal?.objective_description?.find((item: any) => item.name._id === objId).ratings._id
    }

    let current_objective_description = employeeData?.data?.current_rating?.objective_description?.map(
      (item: any) => {
        console.log(rating, item, 'checkRating')
        // if (item.name._id === objectiveData?.name?._id) {
        if (item.name._id === objectiveData?.name?._id) {
          return {
            ...item,
            ratings: getAppraiserRating(item.name._id)
          }
        } else return item
      }
    );

    setActiveObjectiveDescriptionName(objectiveData?.name?._id);
    setActiveObjectiveDescription(objectiveData?._id);
    updateAppraisalRating({
      objective_description: objectiveData?._id,
      objective_description_name: objectiveData?.name?._id,
      ratings: temp,
      rating_rejected: false,
      action_performed: true,
      rejection_reason: "",
      current_objective_description: current_objective_description,
      appraiser_objective_description: appraiser_objective_description,
      id: employee_id,
    }).then((res: any) => {
      console.log(res, 'resssssssssssssssssss')
    })
    setRatingAppraiser("")
  };
  const handleAcceptRatingAlertNo = () => {
    setAcceptRatingAlert(false);
    setMessage("")
  }
  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };
  console.log(ratingAppraiser, "test");
  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData?.data?.normalizer?.objective_type?.find(
        (item: any) => item?.name?._id === id
      );
    }
  };
  const [attachment, setAttachment] = useState<any>([]);
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
        return employeeData?.data?.employee?.objective_description?.map(
          (i: any, index: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
              attachment: employeeData.data.employee?.attachments ? employeeData.data.employee?.attachments[index] : "",
            };
          }
        );
      });


      setCurrentObjectiveDescription(() => {
        return employeeData?.data?.current_rating?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
            };
          }
        );
      });

      setAppraiserAreaofImprovement(
        employeeData.data.appraisal.area_of_improvement
      );
      setAppraiserTrainingRecommendations(
        employeeData.data.appraisal.training_recommendation
      );

      // setEmployeeComments(employeeData?.data?.employee?.rejection_reason);

      setEmployeeComments(employeeData?.data?.employee?.comments);
      // setAttachment(employeeData?.data?.employee?.attachments[0]);
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

  console.log(employeeData, "datatest");
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setObjectiveDescription1(() => {
        return (
          employeeData?.data?.employee?.attachments
            // ?.filter((i: any) => i?.objective_description === j.name._id)
            ?.map((i: any) => {
              return {
                ...i,
                objective_title: findObjectiveTitleById(
                  i?.name?.objective_title
                ),
                objective_type: findObjectiveTypeById(i?.name?.objective_type),
              };
            })
        );
      });
    }
  }, [employeeData]);
  console.log(objectiveDescription1, "datatest1");
  console.log(attachment, "datatest2");
  const handleClickOpen9 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setObjectiveDescription1(() => {
      return employeeData?.data?.employee?.attachments?.map((i: any) => {
        return {
          ...i,
          objective_title: findObjectiveTitleById(i?.name?.objective_title),
          objective_type: findObjectiveTypeById(i?.name?.objective_type),
        };
      });
    });
  };


  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  console.log(objectiveData, 'current_objective_description')
  const ratingSubmitHandler = () => {
    setnavPrompt(false);
    // setFileSelected("")
    // if (ratingAppraiser === ratingparams) {
    console.log(rating, ratingparams, ratingAppraiser, "ratinggggg");
    // if (ratingAppraiser === ratingparams) {
    console.log(ratingValue, 'ratingValue')
    if (ratingValue === null ||
      ratingValue === "" ||
      ratingValue === undefined) {
      setrejectAlertMessage("Please select a rating to reject.");
      setrejectAlert(true);
    }
    else if (ratingAppraiser === ratingValue) {
      setrejectAlertMessage(
        // "You cannot select the same rating as the Appraiser. Please change the Rating."
        "You cannot select the same rating as the Appraiser. Please change the rating."
      );
      setrejectAlert(true);

      // if (copiedFinalRating === rating) {
      //     setrejectAlert(true);
      // setTimeout(() => {
      //   setrejectAlert(false);
      // }, 3000);
    } else if (ratingValue === null || ratingValue === "" || ratingValue === undefined) {
      setrejectAlertMessage(
        // "You cannot select the same rating as the Appraiser. Please change the Rating."
        "Please select a rating to reject!"
      );
      setrejectAlert(true);
    }
    else if (comments?.trim() == "" || comments?.trim() == undefined || comments?.trim() == "") {
      setrejectAlertMessage("Please add rejection reason.");
      setrejectAlert(true);
    } else {
      closeDrawer();
      let appraiser_objective_description = employeeData.data.appraisal.objective_description.map(
        (i: any) => {
          if (employeeData?.data?.appraisal?.appraiser_status == "appraiser-rejected-employee" && i.name._id === activeObjectiveDescriptionName)
            return { ...i, rating_rejected: true }
          else return i
        }
      )

      let current_objective_description = employeeData?.data?.current_rating?.objective_description?.map(
        (item: any) => {
          if (item.name._id === activeObjectiveDescriptionName) {
            return {
              ...item,
              // ratings: ratingDataCurrent,
              ratings: rating,
            }
          } else return item
        }
      )

      updateEmployee({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        rating_rejected: true,
        action_performed: true,
        rejection_reason: comments?.trim(),
        appraiser_objective_description: appraiser_objective_description,
        pa_status: "Pending with Employee",
        employee_status: "draft",
        current_objective_description: current_objective_description,
        // comments: "",
        // rating_comments: comments,
        employee_id,
        // "employee.training_recommendation": formValues,
        // "employee.area_of_improvement": area,
      }).then((Res: any) => {
        if (!Res.error) {
          if (name && fileSelected) {
            return imageClick();
          }
          fetchCancel()
          setnavPrompt(false)
          setMoveTab(false);
          setRating("");
          console.log(Res, 'responseeeee')
        } else {
          updateLoggedRole({
            pa_action_by: `${Res.error} : ${new Date()}`,
            id: employee_id
          })
          setMessage2("Something Went Wrong.")
          setOpen33(true)
        }
      })




      // setComments("")
      // setnavPrompt(true)
    }
  };

  const ratingWithdrawHandler = () => {
    // let temp = employeeData.data.normalizer.objective_description
    //   .filter((i: any) => i._id === activeObjectiveDescription)
    //   .map((k: any) => k.ratings._id)[0];

    // updateEmployee({
    //   objective_description: activeObjectiveDescription,
    //   objective_description_name: activeObjectiveDescriptionName,
    //   ratings: temp,
    //   rating_rejected: false,
    //   comments: "",
    //   rating_comments: comments,
    //   employee_id,
    //   "employee.training_recommendation": formValues,
    //   "employee.area_of_improvement": area,
    // });
    // setRating("");
    // setComments("");

    // setFileSelected("");
    // setName("");
    closeDrawer();
    if (employeeData) {
      let previousRatingData = employeeData?.data?.employee_previous_submission?.objective_description
        .filter((i: any) => i.name == activeObjectiveDescriptionName)
        .map((k: any) => {
          return {
            ratings: k.ratings,
            rejection_reason: k.rejection_reason ? k.rejection_reason : "",
            rating_rejected: k.rating_rejected,
          }
        })[0];
      // let tempComments = employeeData?.data?.employee_previous_submission?.objective_description
      //   .filter((i: any) => i.name == activeObjectiveDescriptionName)
      //   .map((k: any) => k.rejection_reason)[0];

      let appraiserObjectiveDescription = employeeData?.data?.appraisal?.objective_description;
      const getRatings = (id: any) => {
        let rating = appraiserObjectiveDescription.find((item: any) => item.name._id == id)
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

      updateEmployee({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: previousRatingData.ratings,
        rating_rejected: previousRatingData.rating_rejected,
        action_performed: false,
        rejection_reason: previousRatingData.rejection_reason,
        rating_comments: "",
        current_objective_description: current_objective_description,
        employee_id,
        "employee.training_recommendation": formValues,
        "employee.area_of_improvement": area,
      });
      setRating("");
      setRatingValue("")
      setComments("");
    }
  };
  console.log(fileSelected, "fileselected");

  const submitEmployeeRejection = () => {
    setReviewedOverallFeedback(true);
    let specificAreaEmployee = area?.filter((item: any) => {
      return item.value?.trim() !== ""
    }).filter((item: any) => {
      return item.specific_actions[0].value?.trim() === ""
    });

    let trainingRecommendationCategoryNotEmpty = formValues?.filter((item: any) => item.name !== "")
      .filter((item: any) => item.justification?.trim() === "" || item.training_name?.trim() === "");
    let trainingRecommendationNameNotEmpty = formValues?.filter((item: any) => item.training_name?.trim() !== "")
      .filter((item: any) => item.name === "" || item.justification?.trim() === "");
    let trainingRecommendationJustificationNotEmpty = formValues?.filter((item: any) => item.justification?.trim() !== "")
      .filter((item: any) => item.name === "" || item.training_name?.trim() === "");

    if (oneToOneMeetingDate == "" || oneToOneMeetingDate == undefined) {
      setOpen(false);
      setMeetingValidation(true);
      setMessage("Please select One-to-One Meeting Date in the overall feedback.")
    } else if (specificAreaEmployee?.length > 0) {
      setOpen(false);
      setMeetingValidation(true);
      setMessage("Please add the missing details in the Areas for Improvement.")
    } else if (trainingRecommendationCategoryNotEmpty?.length > 0 || trainingRecommendationNameNotEmpty?.length > 0 || trainingRecommendationJustificationNotEmpty?.length > 0) {
      setOpen(false);
      setMeetingValidation(true);
      setMessage("Please add the missing details in the Training Recommendations.")
    } else if ((employeeComments?.trim() === "" || employeeComments?.trim() === undefined)) {
      setOpen(false);
      setMeetingValidation(true);
      setMessage("It is mandatory to add employee comments in the overall feedback.")
    } else {
      setOpen(false);
      handleRejectValidationYes();
      handleClose();
    }
  };

  // useEffect(() => {
  //   if (objectiveDescription?.length > 0) {
  //     const objectiveDescriptionMapped: any = objectiveDescription?.map(
  //       (i: any) => {
  //         // if (i.ratings) {
  //         // console.log(i.objective_type, 'objective_type')
  //         console.log(objectiveDescription, "objectiveDescription");
  //         console.log(i, "value");
  //         const sum = (i.value * i?.objective_type?.value) / 10000;
  //         const newSum = sum * i?.ratings?.rating;
  //         console.log(i.value, "newSum");
  //         return newSum;
  //         // }
  //       }
  //     );
  //     console.log(
  //       _.sum(objectiveDescriptionMapped),
  //       "objectiveDescriptionMapped"
  //     );
  //     setOverAllRating(() => {
  //       return _.sum(objectiveDescriptionMapped).toFixed(2);
  //     });
  //   }
  // }, [objectiveDescription]);

  useEffect(() => {
    if (currentObjectiveDescription.length > 0 && employeeData) {
      const currentObjectiveDescriptionMapped = currentObjectiveDescription.map((i: any) => {
        // if (i.ratings) {
        // console.log(i,i.objective_type, 'objective_type')
        const sum = (i.value * i.objective_type?.value) / 10000
        const newSum = sum * i?.ratings?.rating
        console.log(sum, 'newSum')
        return newSum
        // }


      })

      setCurrentOverAllRating(() => {
        return _.sum(currentObjectiveDescriptionMapped).toFixed(2)
      });

    }
  }, [currentObjectiveDescription, employeeData])

  // useEffect(() => {
  //   if (overAllRating) {
  //     employeeUpdateRating({
  //       "employee.employee_rating": overAllRating,
  //       id: employee_id,
  //     });
  //   }
  // }, [overAllRating]);

  useEffect(() => {
    if (currentOverAllRating) {
      employeeUpdateRating({
        "current_rating.overall_rating": currentOverAllRating,
        id: employee_id
      })
    }
  }, [currentOverAllRating])

  //mapping area of recommendation
  const [filterData1, setFilterData1] = useState([]);
  const [showArea, setShowArea] = useState(false)
  console.group(filterData1, "filterData1");


  const groupNAmeHandler = (name: any) => {
    if (name) {
      let tempArea = name.filter((area: any) => {
        console.log(area[1]?.[0], "areaa")
        if (area[1]?.[0]?.employee_comments !== "" || area[0] == "" || area[0] == undefined) {
          setShowArea(false);
        } else {
          setShowArea(true);
          setFilterData1(name);
        }
        return area[0] !== "" && area[0] !== undefined

      })
      console.log(tempArea, "tempArea")
    }
  };

  useEffect(() => {
    if (employeeData && employeeData.data) {
      const appraiserAreaOfImprovement =
        employeeData.data.appraisal.area_of_improvement;
      const group = _.groupBy(appraiserAreaOfImprovement, "value");
      const groupName = groupNAmeHandler(Object.entries(group));
    }
  }, [appraiserAreaofImprovement]);
  //mapping area of recommendation
  //mapping training recommendations
  const [Training, setTraining] = React.useState<any>([]);
  const [formValues, setFormValues] = useState([
    { name: "", training_name: "", justification: "" },
  ]);
  console.log(Training, "Trainingstate");
  useEffect(() => {
    if (employeeData && formValues) {
      let tempTraining = employeeData.data.appraisal.training_recommendation.filter((item: any) => {
        return item.name.title !== "" || item.name.title !== undefined
      })
      if (formValues?.length == 0) {
        addFormFields();
      } else if (tempTraining && tempTraining?.length > 0) {
        setShowTrainingRecommendation(true)
      } else {
        setShowTrainingRecommendation(false)
      }
      let tempTrainingEmployee = employeeData.data.employee.training_recommendation.filter((item: any) => {
        return item.name.title !== "" || item.name.title !== undefined
      })
      if (tempTrainingEmployee && tempTrainingEmployee?.length > 0) {
        setShowTrainingRecommendations(true)
      } else {
        setShowTrainingRecommendations(false)
      }
      setTraining(() => {
        return employeeData.data.appraisal.training_recommendation.map(
          (i: any) => {
            console.log(i, "Training");
            return {
              ...i,
              name: i.name,
              justification: i.justification,
              trainingName: i.training_name,
              // objective_title: findObjectiveTitleById(i.name.objective_title),
              // objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData, formValues]);
  const [trainingSelectValue, setTrainingSelectValue] = useState<any>([])

  useEffect(() => {
    if (employeeData) {
      setTrainingSelectValue(employeeData.data.appraisal_template.training_recommendation)
    }
  }, [employeeData])
  //mapping training recommendations
  //adding -- area of improvement
  const [improvementList, setImprovementList] = useState([{ improvement: "" }]);
  const [specificActionList, setSpecificActionList] = useState([
    { specificAction: "action1", id: 1, improvement: "improvement1" },
    { specificAction: "action2", id: 2, improvement: "improvement1" },
    { specificAction: "action3", id: 3, improvement: "improvement1" },
    { specificAction: "action4", id: 4, improvement: "improvement2" },
    { specificAction: "action5", id: 5, improvement: "improvement2" },
    { specificAction: "action6", id: 6, improvement: "improvement2" },
    { specificAction: "action7", id: 7, improvement: "improvement3" },
    { specificAction: "action8", id: 8, improvement: "improvement4" },
    { specificAction: "action9", id: 9, improvement: "improvement4" },
  ]);
  const [areaImprovement, setAreaImprovement] = useState<any>([
    {
      id: Date.now(),
      value: "",
      specific_actions: [{ value: "" }, { value: "" }, { value: "" }],
    },
  ]);
  const handleImprovementAdd = () => {
    console.log("clicked");
    // setImprovementList([...improvementList, {improvement: ""}])
    // setarea([...area, {employeeAgreevalue: "", specific_actions: []}])  
    return setarea((prevState: any) => {
      console.log(...prevState, "area item");

      const toSpread = {
        id: Date.now(),
        value: "",
        specific_actions: [{ value: "" }],
      };
      const newArea = [...prevState, toSpread];
      console.log(newArea, "newArea");

      return newArea;
    });

  };
  // console.log(area, "aaaaaaaaaaaa");
  // Function to update employee comments in appraiser area of improvement
  const employeeAreaCommentsChangeHandler = (i: any, e: any) => {
    let temp = appraiserAreaofImprovement;
    temp = temp.map((item: any) => {
      console.log(i[0], item, "tester");
      return i[0]._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    console.log(temp, "testertemp");
    setAppraiserAreaofImprovement(temp);
  };

  // Function to update employee comments in appraiser training recommendations
  const employeeTrainingCommentsChangeHandler = (i: any, e: any) => {
    let temp = appraiserTrainingRecommendations;
    temp = temp.map((item: any) => {
      return i._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    setAppraiserTrainingRecommendations(temp);
  };

  const saveRecommendationsHandler = () => {
    setDisableButtons(true);
    /** to check if training category is not empty and to remove extra spaces in training recommendation textfields */
    let trainingRecommendationValues = formValues?.filter((item: any) => item.name !== "")?.map((item: any) => {
      return {
        ...item,
        training_name: item?.training_name?.trim(),
        justification: item?.justification?.trim(),
      }
    });

    /** to check specific area is not empty and to remove extra spaces in Area of Improvement textfields */
    let areaValues = area.filter((item: any) => item.value?.trim() != "").map((item: any) => {
      let trimSpecificAction = item.specific_actions?.map((item: any) => {
        return {
          ...item,
          value: item?.value?.trim()
        }
      })
      return {
        ...item,
        value: item?.value?.trim(),
        specific_actions: trimSpecificAction
      }
    });

    // if (employeeComments === "") {
    //   setOpenValidation(true);
    //   setMessage("Please add the employee comments.")
    // } else {
    settextfeildError(false);

    // if (
    //   employeeComments == null ||
    //   employeeComments == "" ||
    //   employeeComments == undefined
    // ) {
    //   setOpenSaved(true);1899
    //   setMessage("Please fill in all the mandatory fields (*).");
    // } else {
    updateEmployeeAppraisal({
      id: employee_id,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": areaValues,
      "appraisal.area_of_improvement": appraiserAreaofImprovement,
      "appraisal.training_recommendation": appraiserTrainingRecommendations,
      "employee.comments": employeeComments?.trim(),
      "employee.employee_status": "draft",
      "appraisal.pa_status": "Pending with Employee",
      "employee.one_to_one_meeting": oneToOneMeetingDate,
    }).then((res: any) => {
      setMoveTab(false);
      setnavPrompt(false);
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true);
      setDisableButtons(false);
    });
    // if (moveTab == true) {
    //   setOpenSaved(true);
    //   setMessage("Changes were successfully saved.");
    //   setMoveTab(false);
    // } else {
    //   setOpenSaved(true);
    //   setMessage("No changes were made to save.");
    //   setMoveTab(false);
    // }
    //setOpenSaved(true);
    // setMessage("Changes were successfully saved.");

    // }
  };

  const [area, setarea] = useState<any>([
    {
      id: Date.now(),
      value: "",
      specific_actions: [{ value: "" }],
    },
  ]);
  console.log(area, "areasubmit");
  useEffect(() => {
    if (area) {
      setAreaImprovement(area);
    }
  }, [area]);
  // useEffect(() => {
  //   if (employeeData) {
  //       setarea(employeeData.data.appraisal.area_of_improvement)
  //       // console.log(empData.data.appraisal.area_of_improvement, 'areaImprovement')
  //   }

  // }, [employeeData])
  const handleSpecificRemove = (index: any) => {
    if (!disableTextAfterSubmission) {
      const newAreaList = [...area];
      newAreaList.splice(index, 1);
      setarea(newAreaList);
    }
  };

  const handleSpecificAdd = (e: any) => {
    // setnavPrompt(true)
    const { name, value } = e.target;
    console.log(name, "name employeeAgreevalue");

    // @ts-ignore
    setarea((prevState: any) => {
      console.log(prevState, "prevState");
      const { specific_actions: test } = prevState[0];

      return prevState.map((item: any) => {
        console.log(item, "item");
        return {
          value: item.value,
          specific_actions: [...item.specific_actions, { value: "" }],
        };
      });
    });
  };

  //adding
  //adding training recommendation
  const [
    trainingRecommendationFormValues,
    setTrainingRecommendationFormValues,
  ] = useState<any>([]);
  const [indexnumber, setindexnumber] = useState<any>();


  // useEffect(() => {
  //   setTrainingRecommendationFormValues(formValues);
  // }, [formValues]);

  const addFormFields = () => {
    // setnavPrompt(true)
    setFormValues([
      ...formValues,
      { name: "", training_name: "", justification: "" },
    ]);
  };
  const removeFormFields = (i: any) => {
    // setnavPrompt(true)
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  const removeFormFieldsApp = () => {
    const newFormValues: any = [];
    // newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    setShowTrainingRecommendations(false)
  }

  const showEmployeeAreaApp = () => {
    let newArea: any = [];
    setarea(newArea);
    setShowAreaofImprovement(false)
  };

  // useEffect(() => {
  //   if (employeeData?.data?.appraisal?.training_recommendation.length > 0) {
  //     setFormValues(() => {
  //       return employeeData?.data?.appraisal?.training_recommendation.map((j: any) => {
  //         return {
  //           name: j.name.title,
  //           training_name: j.training_name,
  //           justification: j.justification,
  //         };
  //       });
  //     });
  //   }
  // }, [employeeData?.data?.appraisal?.training_recommendation]);
  console.log(formValues, "formValues");
  const [info, setInfo] = React.useState(false);

  const handleTrainingChange = (i: any, e: any) => {
    setnavPrompt(true)
    const newFormValues = [...formValues];
    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
    setInfo(e.target.value)
  };
  //adding training recommendation
  const handleBackButton = () => {
    if (moveTab == true && value == 1) {
      setOpenSaved(true);
      setMessage("Please save the changes before leaving the page.");
    } else {
      setValue(0);
    }
  };
  // const [open2, setOpen2] = React.useState(false);
  const handleClickOpen2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setOpen2(true);
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
    // setOpen2(false);
  };

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
      attachmentsEmployee({
        attachments: {
          url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id,
      });
    });
  };

  // function to update employee training recommendation

  const [anchorEl10, setAnchorEl10] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo7 = Boolean(anchorEl8);
  const openInfo10 = Boolean(anchorEl10);

  const id7 = openInfo7 ? "simple-popover" : undefined;
  const id10 = openInfo10 ? "simple-popover" : undefined;
  const handleClickInfo7 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl8(event.currentTarget);
  };
  const handleCloseInfo7 = () => {
    setAnchorEl8(null);
  };
  const [anchorEl20, setAnchorEl20] = React.useState<HTMLElement | null>(null);

  const open20 = Boolean(anchorEl20);
  const handlePopoverOpen20 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl20(event.currentTarget);
  };

  const handlePopoverClose20 = () => {
    setAnchorEl20(null);
  };
  useEffect(() => {
    if (employeeData) {
      console.log(
        employeeData?.data?.employee?.training_recommendation,
        "training"
      );
      setFormValues(() => {
        return employeeData?.data?.employee?.training_recommendation?.map(
          (i: any) => {
            console.log(i, "Training");
            return {
              ...i,
              name: i.name,
              justification: i.justification,
              trainingName: i.training_name,
            };
          }
        );
      });
      setarea(employeeData?.data?.employee?.area_of_improvement);
    }
  }, [employeeData]);

  // condition to display employee training recommendation

  // useEffect(() => {
  //   if (formValues && formValues.length > 0) {
  //     setShowTrainingRecommendations(true);
  //   } else {
  //     setShowTrainingRecommendations(false);
  //   }
  // }, [formValues]);

  // function to display employee area of improvement

  useEffect(() => {
    console.log(area, disableTextAfterSubmission, 'checkArea')
    if (area && area?.length == 0) {
      handleImprovementAdd();
    } else if (area && area?.length > 0) {
      setShowAreaofImprovement(true);
    } else {
      setShowAreaofImprovement(false);
    }
  }, [area]);

  //  to display action button based on the appraiser rejected objective title

  const getActionStatus = (data: any, j: any) => {
    if (data.appraisal.appraiser_status == "appraiser-rejected-employee") {
      return data?.appraisal?.objective_description
        .filter(
          (i: any) => i.name._id === j.name._id
        )
        .map((k: any) => {
          if (k.rating_rejected == true || j.action_performed == true)
            return k.ratings;
        })[0]
    } else {
      return data
    }
  }

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
  //slider validation

  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");
  // useEffect(() => {
  //   setratingparams(ratingAppraiser);
  // }, [ratingAppraiser]);

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    if (ratingAppraiser === j.rating) {
      setrejectAlert(true);
      setrejectAlertMessage(
        // "You cannot select the same rating as the Appraiser.please change the rating."
        "You cannot select the same rating as the Appraiser. Please change the rating."
      );
    }
    // else if (comments == "" || comments == undefined || comments == ""){
    //   setrejectAlert(true);
    //   setrejectAlertMessage("Please add Comments for Rejection")

    // }
    else {
      if (j) setRating(j._id);
      // setratingSelection(true);
    }
  };
  console.log(ratingparams, "ratingparams");
  console.log(ratingAppraiser, "ratingparams");
  //slider validation
  const resetFileInput = () => {
    setFileSelected("");
    setName("");

    inputRef.current.value = null;
  };
  const [positionHide, setpositionHide] = useState<any>(false);
  useEffect(() => {
    if (fileSelected !== "" && name !== "") {
      setpositionHide(true);
    } else {
      setpositionHide(false);
    }
  }, [name, fileSelected]);
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [position, setPosition] = useState<any>(false);
  const open6 = Boolean(anchorEl6);
  const handleClickOpen6 = (
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
    setPosition(appraisalAttachments);
    // (employeeData &&
    //   employeeData?.data?.appraisal?.attachments
    //   .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>}))
    // setOpen2(true);
    console.log(appraisalAttachments, "attachments");
    console.log(position, "position");
    setAnchorEl6(event.currentTarget);
  };

  const handleClose6 = () => {
    setAnchorEl6(null);
    // setOpen2(false);
  };

  const handleClose10 = () => {
    setAnchorEl10(null);
    // setOpen2(false);
  };
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [employeeAttachments, setemployeeAttachments] = useState<any>("");

  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2true);
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
    setAnchorEl7(event.currentTarget);
  };

  const handleClickOpen10 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2true);
    setemployeeAttachments(
      employeeData &&
      employeeData?.data?.appraisal?.rejection_attachments
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
    setAnchorEl10(event.currentTarget);
  };
  const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
  };

  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
  //   null
  // );
  //  setappraisalAttachments(
  //     employeeData &&
  //     employeeData?.data?.appraisal?.attachments
  //       .filter((i: any) => i?.objective_description === j.name._id)
  //       .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>})
  //   );
  //   setAnchorEl(event.currentTarget);
  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
      // opacity: open ? "1" : "0",
    },
  };
  const getAttachments = (id: any) => {
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

  const getRejectionAppraisalAttachments = (id: any) => {
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
  const getAttachments1 = (id: any) => {
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
  const handleViewPA = () => {
    window.open(`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`, "_blank");
  };
  //infoicon popover
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
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

  // to confirm the option : agree or disagree with the Appraiser
  const handleRejectRadioChange = (event: any) => {
    if (event.target.value.toLowerCase() == "true") return setEmployeeAgreesWithAppraiser(true);
    if (event.target.value.toLowerCase() == "false") return setEmployeeAgreesWithAppraiser(false);

    // navigate(`${EMPLOYEE_REJECTS}/employee/${employee_id}`);  
  };

  //  to convert date dd/mm/yyyy format to mm/dd/yyyy
  const date = new Date(employeeData?.data?.employee?.one_to_one_meeting?.slice(0, 10));
  const One_To_One_Meeting_Date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;



  //infoicon popover
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
          Employee Rejection
        </div>

        {/*@ts-ignore*/}

        <>
          {/* {rejectAlert && <Alert severity="error">
                You cannot put the same rating as the Appraiser. Please change the rating.
                </Alert>} */}
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
                {/* You cannot select the same rating as the Appraiser. Please
                  change the rating! */}
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
                    // textTransform: "none",
                    // backgroundColor: "#FFA801",
                    // fontSize: "12px",
                    // fontFamily: "sans-serif",
                    // padding: "2px 10px",
                    // marginRight: "10px",
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    // marginRight: "10px",
                    background: "transparent",
                    height: "35px",
                    width: "70px",
                  }}
                  variant="outlined"
                  autoFocus
                  onClick={() => {
                    handleSliderDialogClose();
                    setMoveTab(true);
                  }}
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

          <Item2 sx={{ width: "fitContent" }}>
            <Typography
              // style={{
              //   paddingLeft: "25px",
              //   paddingTop: "16px",
              //   //paddingBottom: "10px",
              //   //backgroundColor: "#ebf2f4",
              //   color: "#3E8CB5",
              //   fontSize: "17px",
              // }}
              style={{
                paddingLeft: "8px",
                paddingBottom: "16px",
                fontFamily: "arial",
                color: "#3E8CB5",
                fontSize: "17px",
                textAlign: "left",
                wordBreak: "break-word",
              }}
            >
              {rejectedTitle}
            </Typography>
            <div
              style={{
                textAlign: "left",
                paddingLeft: "10px",
                fontSize: "12px",
                paddingBottom: "7px",
                fontFamily: "arial",
                color: "#7A7A7A",
                // paddingTop: "13px",
              }}
            >
              Employee Rating
            </div>

            <>
              <Stack
                style={{ paddingLeft: "10px" }}
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
                              // if (ratings) setRating(ratings._id);
                              // ratingColorHandler(rating._id)
                              // setnavPrompt(true);
                              handleRatingAlert(ratings);
                              // setDisplayEmployeeRating(false);
                              setRating(ratings._id);
                              setRatingValue(ratings.rating);
                              setRatingDataCurrent(ratings);
                            }}
                            style={{
                              //@ts-ignore
                              borderColor: rating === ratings._id && "#3C8BB5",
                              backgroundColor: rating === ratings._id ? "rgb(123 210 255 / 29%)" : ""
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

                        {/* <p style={{ color: "#3C8BB5", fontSize: "10px" }}>{ratings.rating_scale}</p> */}
                      </Item1>
                    ))}
              </Stack>
              <Stack
                direction="column"
                position="relative"
              // display="flex"
              // alignItems="center"
              >
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: "10px",
                    fontSize: "12px",
                    paddingBottom: "7px",
                    paddingTop: "16px",
                    fontFamily: "arial",
                    color: "#7A7A7A",
                  }}
                >
                  Appraiser Rating
                </div>
                {/* <Contain>
                  {filterData2 &&
                          filterData2.map((i: any, index: any) => {
                            console.log(i, "123");
                            return (
                              <>
                            <span> {i[0]}</span>
                                </>
                            );
                          })}
                  </Contain> */}
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
                      marginLeft="10px"
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
                          {ratingAppraiser}
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
                        {/* {getRatingDescription(ratingAppraiser)} */}
                        {/* Very Bad Performance */}
                      </span>
                    </Stack>
                  </Contain>
                </Item1>
              </Stack>
            </>
          </Item2>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "27px",
              fontSize: "12px",
              paddingBottom: "7px",
              paddingTop: "6px",
              color: "#7A7A7A", fontFamily: "arial"
            }}
          >
            Rejection Reason<span style={{
              fontSize: "20px",
            }}>*</span>
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
            autoComplete="off"
            multiline
            style={{ paddingLeft: "28px", width: "75%" }}
            value={comments}
            inputProps={{ maxLength: 500 }}
            onChange={(e) => {
              setComments(e.target.value);
              setMoveTab(true);
              setnavPrompt(true);
            }}
          />
          <div
            style={{
              textAlign: "left",
              paddingLeft: "29px",
              fontSize: "12px",
              paddingBottom: "10px",
              paddingTop: "16px",
              color: "#7A7A7A",
              fontFamily: "arial"
            }}
          >
            Attachment
          </div>

          <Stack>
            <div style={{ paddingLeft: "20px" }}>
              <Stack direction="row" alignItems="center" gap="5px">
                <span>
                  <input
                    //@ts-ignore
                    // style={styles.colors}
                    id="photo"
                    name="photo"
                    type="file"
                    title={name}
                    ref={inputRef}
                    style={{ display: "none" }}
                    multiple={false}
                    onChange={(e) => {
                      handleImageChange(e);
                      setMoveTab(true);
                    }}
                  />
                </span>
                <IconButton>
                  <img
                    src={Uploadatt}
                    onClick={(e: any) => {
                      // setActiveObjectiveDescriptionName(j?.name?._id)
                      handleClickOpenAttachment(e);
                      // setPopoverIndex(index)
                    }}
                  />
                </IconButton>
                {/*            
                {employeeData &&
                  objectiveTitleData &&
                  objectiveDescription?.map((j: any, index: number) => {   
                  
                    return (
                      <>
                        {employeeData && getAttachments1(j?.name?._id)?.map((k: any, index1: any) => {
                          return (
                            <>
                              <Stack
                                spacing={1}
                                direction="row"
                                alignItems="center"
                                paddingLeft="5px"
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
                                      src={Removeattnew}
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
                        })}

                      </>)
                  })} */}
                {/* <Text>
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

                </Text> */}
                <Typography
                  sx={{
                    fontSize: "14px",
                    color: "#7a7a7a",
                    fontFamily: "arial",
                  }}
                >
                  {name}
                </Typography>
                <Text>
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
                </Text>
              </Stack>
            </div>
          </Stack>

          <Stack
            alignItems="left"
            direction="row"
            paddingLeft="28px"
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
                // setnavPrompt(false);
                ratingSubmitHandler();

                // if (name && fileSelected) {
                //   return imageClick();
                // }
              }}
            // variant="outlined"
            // onClick={ratingSubmitHandler}
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
                  width: "75px",
                }}
                variant="outlined"
                onClick={ratingWithdrawHandler}
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
      </Drawer>
      <div
        style={{
          backgroundColor: "#F1F1F1",
          minHeight: "100px",
          overflow: "hidden",
          height: "auto"
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
          marginLeft="35px"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={`${EMPLOYEE_LANDING}/employee/${employee_id}`}
            >
              Home
            </Link>
            <Link
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }}
              // color="inherit"
              to={""}
              state={{
                from: `${1}`,
              }}
            >
              {employeeData && employeeData?.data?.calendar?.name}
            </Link>
          </Breadcrumbs>
        </Stack>

        <Box
          sx={{
            // maxWidth: "95% !important",
            // height: "1308px",
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
            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              paddingBottom="10px"
              paddingRight="63px"
              spacing={1}


            >
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
               
                <label style={{
                  // paddingLeft: "5px",
                  cursor: "pointer",
                }} onClick={handleViewPA}>
                   <img src={Downloadss} alt="Download" />
                </label>
              </Button>
            </Stack> */}
            <Stack
              className={classes.heading}
              direction="row"
              alignItems="baseline"
              justifyContent="space-between"
              paddingBottom="10px"
              marginRight="63px"
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

              <span>
                {/* <Link to={`${EMPLOYEE_LANDING}/employee/${employee_id}`,'_blank'}> */}
                <Stack direction="row" alignItems="center" gap={3}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography
                      style={{
                        color: "#3E8CB5",
                        fontSize: "17px",
                        fontFamily: "Arial",
                      }}
                    >
                      PA Status:
                    </Typography>
                    <div
                      style={{
                        color: "#717171",
                        // fontWeight: "400",
                        fontSize: "17px",
                        fontFamily: "Arial",
                      }}
                    >
                      {employeeData?.data?.appraisal?.pa_status}
                    </div>
                  </Stack>
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
                      <Overallratingvalue style={{ fontSize: "17px" }} >
                        <span style={{
                          color: "#717171", fontSize: "17px",
                          fontFamily: "Arial",
                        }} > {(employeeData?.data?.previous_rating && employeeData?.data?.previous_rating !== 0 && employeeData?.data?.previous_rating !== undefined) ? employeeData?.data?.previous_rating?.toFixed(2) : "-"}</span>
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
                      </Link>)}

                  </Stack>
                  {/* </>
                  )} */}
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="flex-end"
                    paddingBottom="10px"
                    paddingRight="3px"
                    spacing={1}


                  >
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

                      <label style={{
                        // paddingLeft: "5px",
                        cursor: "pointer",
                      }} onClick={handleViewPA}>
                        <img src={Downloadss} alt="Download" />
                      </label>
                    </Button>
                  </Stack>
                </Stack>
                {/* </Link> */}
              </span>
            </Stack>
            {/* <Typography
              sx={{
                display: "flex",
                justifyContent: "end",
                color: "#52C8F8",
                fontSize: "13px",
                fontFamily: "Arial",
                paddingRight: "10px"
              }}
            >
          View Previous PA
            </Typography> */}
            <Box
              sx={{
                backgroundColor: "#f3fbff",
                paddingLeft: "10px",
                marginRight: "63px",
              }}
            >
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
                {/* <Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    fontFamily: "Arial",
                    paddingTop: "25px",
                    paddingBottom: "25px",
                  }}
                >
                  {employeeData?.data?.appraisal?.potential !== false && employeeData?.data?.appraisal?.potential !== undefined &&
                    (`Potential Level : ${employeeData?.data?.appraisal?.potential} `)}
                </Typography> */}
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
                            vertical: 'top',
                            horizontal: 'right',
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
                              // left:"770px !important"
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
                            <b>{ratingscaledef}</b>:
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
                        // paddingLeft: "22px",
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
                      <b>
                        {employeeData &&
                          employeeData?.data?.current_rating?.overall_rating?.toFixed(2)
                          // employeeData?.data?.employee?.employee_rating == 0 ? "Yet to be rated." :
                          // employeeData?.data.employee?.employee_rating
                        }
                      </b>
                    </div>
                    {/* <div
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            opacity: "80%",
                          }}
                        >
                           {ratingData &&
                            getRatingDescription(
                              employeeData?.data?.employee?.employee_rating
                            )} 
                          Exceeding 
                        </div> */}
                  </Stack>
                </div>
              </Stack>
            </Box>
            <Box sx={{ paddingTop: "20px", marginRight: "58px" }}>
              {/* <Grid container spacing={0}> */}
              {/* <Grid item xs={12}> */}
              <Stack
                direction="row"
                justifyContent="space-between"
                paddingBottom="20px"
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
                      dayjs(employeeData?.data?.calendar?.start_date)?.month()
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
                </Grid>
                <Grid item xs={4}>
                  {/* <Stack direction="column" alignItems="center">
                    <span
                      style={{
                        fontSize: "20px",
                        color: "#3E8CB5",
                        fontFamily: "Arial",
                      }}
                    >
                      PA Status
                    </span>
                    <Typography
                      style={{
                        color: "#717171",
                        marginTop: "8px",
                        fontSize: "16px",
                        fontFamily: "Arial",
                      }}
                    >
                      {employeeData?.data?.appraisal?.status === "in-progress" ? "In-progress" :
                      employeeData?.data?.appraisal?.status === "not-started" ? "Not-started" :
                        employeeData?.data?.appraisal?.status} 
                    
                    </Typography>
                  </Stack> */}

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

                {/* <Grid item xs={4}>
                  {employeeData?.data?.appraisal?.status != "not-started" &&
                    employeeData?.data?.appraisal_template?.potential && (

                      <Stack
                        direction="column"
                        alignItems="flex-end"
                        paddingRight="10px"
                      >
                        <span
                          style={{
                            fontSize: "17px",
                            color: "#3E8CB5",
                            fontFamily: "Arial",
                          }}
                        >
                          Potential Level
                        </span>
                        <Typography
                          style={{
                            color: "#717171",
                            marginTop: "8px",
                            fontSize: "16px",
                            fontFamily: "Arial",
                          }}
                        >
                          {employeeData?.data?.appraisal?.potential}
                        </Typography>
                      </Stack>
                    )}
                </Grid> */}
              </Stack>
              {/* </Grid> */}
              {/* </Grid> */}
            </Box>



            <Box style={{ paddingLeft: "0px" }}>
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  paddingLeft: "0px",
                  marginRight: "65px",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  sx={{
                    "& .MuiTabs-indicator": {
                      backgroundColor: "#3e8cb5",
                    },
                  }}
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
                      border: "1px solid #3e8cb59e",
                      maxHeight: "0px",
                      minHeight: "48px",
                      paddingRight: "15px",
                      paddingLeft: "20px",
                      fontWeight: "700",
                    }}
                    label="Ratings"
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
                      border: "1px solid #3e8cb59e",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      fontWeight: "700",
                    }}
                    label="Overall Feedback"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div style={{ marginRight: "65px" }}>
                  <TableContainer >
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
                            Objective <br />
                            Type
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
                            Objective <br />
                            Title
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
                            Appraiser <br /> Rating
                            {/* <IconButton aria-describedby={id2} onClick={handleClickInfo}>
                              <img src={Infoicon} alt="icon" />
                            </IconButton> */}
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
                                  <CustomScrollbar
                                    style={{ width: "100%", height: "225px" }}
                                  >
                                    <Table
                                      sx={{
                                        minWidth: 200,
                                        '& th, & td': {
                                          borderBottom: 'none', // Remove the bottom border for th and td
                                        },
                                      }}
                                      size="small"
                                      aria-label="simple table"
                                    >
                                      <TableHead
                                        style={{
                                          position: "sticky",
                                          zIndex: "1000",
                                          top: "0px",
                                        }}
                                      >
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
                                              maxWidth: "70%",
                                              fontFamily: "Arial",
                                              color: "#3E8CB5",
                                              fontSize: "14px",
                                              fontWeight: "600",  // Adjust the maxWidth as needed
                                            }}
                                          >
                                            Rating Title
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
                                                    "&:last-child td, &:last-child th":
                                                    {
                                                      borderColor:
                                                        "lightgrey",
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
                          </TableCell>
                          {employeeData?.data?.appraisal?.objective_description.filter((item: any) =>
                            item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                            (<TableCell
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "#F7F9FB",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="center"
                            >
                              Appraiser <br />
                              Comments
                            </TableCell>)}
                          {employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                            item.rating_rejected == true && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 &&
                            (<TableCell
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "#F7F9FB",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="center"
                            >
                              Appraiser <br></br>Rejection/Change Reason
                            </TableCell>)}
                          {employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                            item.rating_rejected == true).length > 0 && (
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
                                Employee
                                <br /> Rating
                              </TableCell>
                            )}
                          {employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                            item.rating_rejected == true).length > 0 && (
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
                                Employee <br />
                                Rejection Reason
                              </TableCell>
                            )}
                          {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Employee") &&
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
                              Employee <br />
                              Actions
                              {isUploading && (
                                <CircularProgress size={15} thickness={7} />
                              )}
                            </TableCell>
                          }
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {employeeData &&
                          objectiveTitleData &&
                          objectiveDescription?.map((j: any, index: number) => {
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
                                      open={
                                        popoverIndex === index && openInfo101
                                      }
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
                                      // padding: "0px 8px"
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
                                          <span>L1 </span>{" "}
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
                                      open={
                                        popoverIndex === index && openInfo102
                                      }
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
                                                      }
                                                      </b>
                                                    </span>
                                                    <br />
                                                    <ul
                                                      style={{
                                                        marginTop: "0px",
                                                        marginBottom: "0px",
                                                      }}
                                                    >
                                                      {j?.name?.level_1?.behavioral_objective.map(
                                                        (item: any) => {
                                                          return (
                                                            <li>{item}</li>
                                                          );
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
                                                      }
                                                      </b>

                                                    </span>
                                                    <br />
                                                    <ul
                                                      style={{
                                                        marginTop: "0px",
                                                        marginBottom: "0px",
                                                      }}
                                                    >
                                                      {j?.name?.level_2?.behavioral_objective.map(
                                                        (item: any) => {
                                                          return (
                                                            <li>{item}</li>
                                                          );
                                                        }
                                                      )}
                                                    </ul>
                                                  </>
                                                )}
                                                {j.level_3_isChecked && (
                                                  <>
                                                    <span>L3:</span>
                                                    <span>
                                                      <b> {
                                                        j?.name?.level_3
                                                          ?.level_definition
                                                      }
                                                      </b>

                                                    </span>
                                                    <br />
                                                    <ul
                                                      style={{
                                                        marginTop: "0px",
                                                        marginBottom: "0px",
                                                      }}
                                                    >
                                                      {j?.name?.level_3?.behavioral_objective.map(
                                                        (item: any) => {
                                                          return (
                                                            <li>{item}</li>
                                                          );
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
                                                      }
                                                      </b>
                                                    </span>
                                                    <br />
                                                    <ul
                                                      style={{
                                                        marginTop: "0px",
                                                        marginBottom: "0px",
                                                      }}
                                                    >
                                                      {j?.name?.level_4?.behavioral_objective.map(
                                                        (item: any) => {
                                                          return (
                                                            <li>{item}</li>
                                                          );
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
                                    <Stack
                                      direction="column"
                                      display="flex"
                                      alignItems="center"
                                    >
                                      <div style={{ display: "inline-flex" }}>
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
                                                {employeeData &&
                                                  employeeData?.data?.appraisal_previous_rating?.objective_description?.filter(
                                                    (i: any) =>
                                                      i?.name === j?.name?._id
                                                  )
                                                    .map((k: any) => {
                                                      console.log(k, "newkk")
                                                      if (ratingsData) {
                                                        let temp = ratingsData?.data?.find((item: any) => k.ratings == item._id)
                                                        return <span>Previous Rating:{temp?.rating}</span>
                                                      }
                                                    })[0]}
                                              </div>
                                            </Popover>
                                          )}

                                        </span>
                                      </div>
                                      {/* <span
                                          style={{
                                            fontSize: "14x",
                                            color: "#333333",
                                            fontFamily: "Arial",
                                          }}
                                        >
                                          {employeeData &&
                                            employeeData.data.appraisal.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i.name._id === j.name._id
                                              )
                                              .map((k: any) => {
                                                if (k.ratings)
                                                  return k.ratings.rating_scale;
                                              })[0]}
                                        </span> */}
                                    </Stack>
                                  </TableCell>

                                  {employeeData?.data?.appraisal?.objective_description.filter((item: any) =>
                                    item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                                    (<TableCell
                                      width="250px"
                                      sx={{
                                        fontSize: "14x",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        background: "#fbfbfb",

                                      }}
                                      align="left"
                                    >
                                      {" "}
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        // justifyContent="center"
                                        alignItems="center"
                                        spacing={2}
                                      >
                                        <span
                                          style={{
                                            fontSize: "14x",
                                            color: "#333333",
                                            fontFamily: "Arial",
                                            wordBreak: "break-word",
                                          }}
                                        >
                                          {" "}
                                          {employeeData &&
                                            employeeData?.data?.appraisal?.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )

                                              .map((k: any) => {
                                                console.log(
                                                  employeeData?.data?.appraisal
                                                    ?.objective_description,
                                                  "data"
                                                );
                                                if (k?.comments == "" || k.comments == undefined) return ""
                                                else return k.comments;
                                              })[0]
                                          }
                                        </span>
                                        {employeeData &&
                                          getAttachments(j?.name?._id)?.length >
                                          0 && (
                                            <AttachFileIcon
                                              sx={{
                                                color: "#93DCFA",
                                                height: "18px",
                                                transform: "rotate(30deg)",
                                                cursor: "pointer",
                                              }}
                                              aria-describedby={"id"}
                                              onClick={(e: any) => {
                                                handleClickOpen6(e, j);
                                                setPopoverIndex1(index);
                                              }}
                                            />
                                          )}
                                        <Popover
                                          id={"id"}
                                          open={popoverIndex1 === index && open6}
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
                                          <Typography
                                            style={{
                                              fontSize: "12px",
                                              fontFamily: "Arial",
                                              color: "#333333",
                                              // whiteSpace:"nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              width: "170px",
                                              padding: "5px",
                                            }}
                                          >
                                            {/* Attachments: {appraisalAttachments} */}
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
                                                          deleteAppraiserMutation(
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
                                          background: "#ffffff",

                                        }}
                                        align="left"
                                      >
                                        {" "}
                                        <Stack
                                          direction="row"
                                          justifyContent="space-between"
                                          // justifyContent="center"
                                          alignItems="center"
                                          spacing={2}
                                        >
                                          <span
                                            style={{
                                              fontSize: "14x",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                              wordBreak: "break-word",
                                            }}
                                          >
                                            {" "}
                                            {employeeData &&
                                              employeeData?.data?.appraisal?.objective_description
                                                .filter(
                                                  (i: any) =>
                                                    i?.name?._id === j?.name?._id
                                                )

                                                .map((k: any) => {
                                                  console.log(
                                                    employeeData?.data?.appraisal
                                                      ?.objective_description,
                                                    "data"
                                                  );
                                                  if (k?.rating_rejected == true) return k.rejection_reason;
                                                })[0]
                                            }
                                          </span>
                                          {employeeData &&
                                            getRejectionAppraisalAttachments(j?.name?._id)?.length > 0 &&
                                            (employeeData?.data?.appraisal?.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )

                                              .map((k: any) => {
                                                console.log(
                                                  employeeData?.data?.appraisal
                                                    ?.objective_description,
                                                  "data"
                                                );
                                                if (k?.rating_rejected == true) return k.rejection_reason;
                                              })[0]) && (
                                              <AttachFileIcon
                                                sx={{
                                                  color: "#93DCFA",
                                                  height: "18px",
                                                  transform: "rotate(30deg)",
                                                  cursor: "pointer",
                                                }}
                                                aria-describedby={"id"}
                                                onClick={(e: any) => {
                                                  handleClickOpen10(e, j);
                                                  setPopoverIndex1(index);
                                                }}
                                              />
                                            )}
                                          <Popover
                                            id={id10}
                                            open={popoverIndex1 === index && openInfo10}
                                            anchorEl={anchorEl10}
                                            onClose={handleClose10}
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
                                            <Typography
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Arial",
                                                color: "#333333",
                                                // whiteSpace:"nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                width: "170px",
                                                padding: "5px",
                                              }}
                                            >
                                              {/* Attachments: {appraisalAttachments} */}
                                              {employeeData &&
                                                getRejectionAppraisalAttachments(j?.name?._id)?.map(
                                                  (k: any, index1: any) => {
                                                    console.log(k, 'kkkkkkkkkkkkkkkk')
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
                                                             deleteAppraiserMutation(
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
                                          </Popover>
                                        </Stack>
                                      </TableCell>
                                    )}

                                  {employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                                    item.rating_rejected == true).length > 0 && (
                                      <TableCell
                                        width="10px"
                                        sx={{
                                          fontSize: "14x",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                          background: "#fbfbfb",
                                          padding: "0px 8px"

                                        }}
                                        align="center"

                                      >
                                        {/* <Stack
                                          direction="column"
                                          display="flex"
                                          alignItems="center"
                                        >
                                          <span>
                                            {" "}
                                            {j.ratings && j.ratings.rating}
                                          </span>
                                          <span
                                            style={{
                                              fontSize: "12px",
                                              color: "#717171",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            {j.ratings && j.ratings.rating_scale}
                                          </span>
                                        </Stack> */}

                                        <div
                                          style={{ display: "inline-flex" }}
                                        >

                                          {j.rating_rejected == true && (
                                            <RatingBackground style={{ color: "white", background: "#D2122E" }}>
                                              {j.ratings && j.ratings.rating}
                                            </RatingBackground>
                                          )
                                          }
                                          {/* {j.ratings && j.ratings.rating} */}

                                        </div>

                                      </TableCell>
                                    )}
                                  {employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                                    item.rating_rejected == true).length > 0 && (
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
                                          {j.rating_rejected ? (
                                            <span
                                              style={{
                                                fontSize: "14x",
                                                color: "#333333",
                                                fontFamily: "Arial",
                                                wordBreak: "break-word",
                                              }}
                                            >
                                              {employeeData &&
                                                employeeData.data.employee.objective_description
                                                  .filter(
                                                    (i: any) =>
                                                      i.name._id === j.name._id
                                                  )
                                                  .map((k: any) => k.rejection_reason)[0]}

                                              {/* {j?.comments} */}
                                            </span>
                                          ) : (
                                            ""
                                          )}

                                          {/* {j.rating_rejected ? ( */}

                                          {employeeData && j.rejection_reason &&
                                            getAttachments1(j?.name?._id)?.length > 0 &&
                                            (employeeData?.data?.employee?.objective_description
                                              .filter((i: any) => i?.name._id == j?.name?._id)
                                              .map((j: any) => j.rating_rejected)[0]) && (
                                              <AttachFileIcon
                                                style={{
                                                  color: "#93DCFA",
                                                  height: "18px",
                                                  transform: "rotate(30deg)",
                                                  cursor: "pointer",
                                                }}
                                                aria-describedby={"id"}
                                                onClick={(e: any) => {
                                                  handleClickOpen7(e, j);
                                                  setPopoverIndex(index);
                                                }}
                                              />
                                            )}
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
                                                  getAttachments1(
                                                    j?.name?._id
                                                  )?.map((k: any, index1: any) => {
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
                                                            {disableTextAfterSubmission ?
                                                              <img
                                                                src={Removeattnew}
                                                                style={{ cursor: "default" }}
                                                              /> :
                                                              <img
                                                                src={Removeattnew}
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() =>
                                                                  deleteEmployeeMutation(
                                                                    {
                                                                      employee_id:
                                                                        employee_id,
                                                                      objective_description: j.name._id,
                                                                      name: k.remove,
                                                                    }
                                                                  )
                                                                }
                                                              />
                                                            }

                                                            {/* </IconButton> */}
                                                          </Stack>
                                                        </Stack>
                                                      </>
                                                    );
                                                  })}
                                              </Typography>
                                              {/* {employeeData?.data?.employee?.attachments
                                             .filter((i: any) => {

                                               // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                               return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                             })
                                             .map((k: any) => {
                                               return (
                                                 <a href={k.url}> {k.name} </a>
                                               );
                                             })} */}
                                            </div>
                                          </Popover>
                                          {/* </Dialog> */}
                                        </Stack>
                                      </TableCell>
                                    )}
                                  {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Employee") &&
                                    (

                                      <TableCell
                                        width="50px"
                                        sx={{
                                          fontSize: "14x",
                                          color: "#333333",
                                          opacity: "80%",
                                          fontFamily: "arial",
                                          background: "#fbfbfb",
                                          padding: "0px 8px"

                                        }}
                                        align="center"
                                      >
                                        <Stack direction="row" justifyContent="center">

                                          {/* <Button
                                    size="small"
                                    style={{
                                      textTransform: "none",
                                      height: "20px",
                                      minWidth: "2px",
                                      textDecoration: "underline",
                                      color: j.rating_rejected
                                        ? "red"
                                        : "#93DCFA",
                                      fontSize: "14px",
                                    }}
                                    onClick={() => openDrawerHandler(j)}
                                  >
                                    {j.rating_rejected ? "Rejected" : "Reject"}
                                  </Button> */}

                                          {employeeData && getActionStatus(employeeData.data, j) && (
                                            <>
                                              {(employeeData?.data?.appraisal?.status !== "normalized") &&
                                                (j.action_performed === true && j.rating_rejected === false ?

                                                  <Tooltip title="Accepted">

                                                    <IconButton
                                                      disabled={isUploading || employeeDataIsFetching || isAcceptLoading}
                                                      onClick={() => {
                                                        handleAcceptRatingAlertYes(j);
                                                        // openAcceptDrawerHandler();
                                                        setObjectiveData(j);
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
                                                        // openAcceptDrawerHandler();
                                                        handleAcceptRatingAlertYes(j);
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
                                                  </Tooltip>)
                                              }
                                              {j.action_performed === true &&
                                                j.rating_rejected === true ? (
                                                <Tooltip title="Rejected">
                                                  <IconButton disabled={isUploading || employeeDataIsFetching || isAcceptLoading}
                                                    onClick={() => {
                                                      setObjectiveData(j);
                                                      openDrawerHandler(j);

                                                    }}
                                                  >
                                                    <img
                                                      src={thumbsdown_colored}
                                                      alt="icon"
                                                      style={{
                                                        width: "16px",
                                                        height: "16px",
                                                      }}
                                                    />
                                                  </IconButton>
                                                </Tooltip>
                                              ) : (
                                                <Tooltip title="Reject">
                                                  <IconButton disabled={isUploading || employeeDataIsFetching || isAcceptLoading}
                                                    onClick={() => {
                                                      setObjectiveData(j);
                                                      openDrawerHandler(j);

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
                                              )}
                                            </>
                                          )}

                                        </Stack>
                                      </TableCell>
                                    )}
                                </TableRow>

                                {/* <TableRow
                                                                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                                  >
                                                                      <TableCell
                                                                          sx={{
                                                                              fontSize: "14px",
                                                                              color: "#33333",
                                                                              opacity: "80%",
                                                                              // fontFamily: "regular"
                                                                          }}
                                                                          align="left"
                                                                      >
                                                                          Time Management
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
                                                                          for 2 linesDummy text for 2 linesDummy text for 2
                                                                          linesDummy text for 2 lines
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
                                                                          4
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
                                                                          <Button
                                                                              size="small"
                                                                              style={{
                                                                                  textTransform: "none",
                                                                                  height: "20px",
                                                                                  minWidth: "2px",
                                                                                  textDecoration: "underline",
                                                                                  color: "#eb3535",
                                                                                  fontSize: "13px",
                                                                              }}
                                                                          >
                                                                              Change
                                                                          </Button>
                                                                      </TableCell>
                                                                  </TableRow>
                                                                  <TableRow
                                                                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                                                  >
                                                                      <TableCell
                                                                          sx={{
                                                                              fontSize: "14px",
                                                                              color: "#33333",
                                                                              opacity: "80%",
                                                                              // fontFamily: "regular"
                                                                          }}
                                                                          align="left"
                                                                      >
                                                                          Communication Skills
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
                                                                          for 2 linesDummy text for 2 linesDummy text for 2
                                                                          linesDummy text for 2 linesDummy text for 2 lines
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
                                                                          <Button
                                                                              size="small"
                                                                              style={{
                                                                                  textTransform: "none",
                                                                                  height: "20px",
                                                                                  minWidth: "2px",
                                                                                  textDecoration: "underline",
                                                                                  color: "#93DCFA",
                                                                                  fontSize: "13px",
                                                                              }}
                                                                          >
                                                                              Reject
                                                                          </Button>
                                                                      </TableCell>
                                                                  </TableRow> */}
                              </>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>

                {/* {employeeData &&
                        objectiveTitleData &&
                        employeeAttachments.map((j: any, index: number) => {
                          return (
                            <>
                            {j.url}
                             </>
                          );
                        })} */}
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
                  {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Employee") &&
                    <>
                      <Button
                        disabled={disableButtons || employeeDataIsFetching}
                        style={{
                          borderRadius: "4px",
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          background: "transparent",
                          height: "35px",
                          // width: "70px",
                          ...((disableButtons || employeeDataIsFetching) && {
                            cursor: "not-allowed",
                            borderColor: "#ccc",
                            color: "#ccc",
                          }),
                        }}
                        variant="outlined"
                        onClick={saveRecommendationsHandler}
                      >
                        Save as Draft
                      </Button>
                      <Button
                        disabled={disableButtons || employeeDataIsFetching}
                        style={{
                          borderRadius: "4px",
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          color: "#3E8CB5",
                          background: "transparent",
                          height: "35px",
                          // width: "70px",
                          ...((disableButtons || employeeDataIsFetching) && {
                            cursor: "not-allowed",
                            borderColor: "#ccc",
                            color: "#ccc",
                          }),
                        }}
                        variant="outlined"
                        //onClick={handleClickOpen}
                        onClick={handleClickOpenForSubmit}
                      >
                        Save and Submit
                      </Button>
                      {/* <Link to={`${EMPLOYEE_LANDING}/employee/${employee_id}`}> */}
                      <Button
                        disabled={disableButtons || employeeDataIsFetching}
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
                          ...((disableButtons || employeeDataIsFetching) && {
                            cursor: "not-allowed",
                            borderColor: "#ccc",
                            color: "#ccc",
                          }),
                        }}
                        variant="outlined"
                        onClick={() => {
                          cancelHandler()
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  }
                  {/* </Link> */}

                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer sx={{ width: "100%", paddingBottom: "50px" }}>
                  <Typography
                    style={{
                      marginTop: "20px",
                      marginBottom: "20px",
                      fontSize: "20px",
                      color: "#3E8CB5",
                      fontFamily: "Arial",
                    }}
                  >
                    Performance Appraisal Summary
                  </Typography>

                  {/* <Overallfeedbackss> 
      <span 
      style={{
      fontSize:"31px",
      lineHeight:"22px",
      padding:"0px 2px",
      color:"#333333"
    }}
      >
        "
      </span>
      Please review the recommendation section and add your comments.
      <span  style={{
      fontSize:"31px",
      lineHeight:"22px",
      padding:"0px 2px",
      color:"#333333"
    }}>"</span> </Overallfeedbackss> */}
                  <div style={{ marginRight: "65px" }}>
                    <FeedbackQuestionnaireAppraiser />

                    {showArea && (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            height="20px"
                            marginBottom="10px"
                          // paddingTop="20px"
                          // paddingRight="72px"
                          >
                            <div
                              style={{
                                color: "#717171",
                                fontSize: "16px",
                                fontFamily: "Arial",
                              }}
                            >
                              <b>Areas for Improvement (Appraiser)</b>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "right",
                              }}
                            >
                              {/* {filterData1 &&
                              filterData1.map((i: any, index: any) => {
                                console.log(i, "123");
                                return ( */}
                              {/* <>

                                <IconButton
                                  size="small"
                                  style={{
                                    // textTransform: "none",
                                    // height: "20px",
                                    // minWidth: "2px",
                                    textDecoration: "underline",
                                    color: "#3E8CB5",
                                    fontSize: "15px",
                                    fontFamily: "Arial",
                                  }}
                                  onClick={() => {
                                    if (area.length == 0) handleImprovementAdd();
                                    let temp = showAreaofImprovement;
                                    setShowAreaofImprovement(!temp);
                                  }}
                                >
                                  {showAreaofImprovement ? (

                                    <Tooltip title="Delete">
                                      <Addmore
                                        style={{
                                          cursor: "pointer",
                                          color: "#3E8CB5",
                                          fontSize: "14px",
                                        }}
                                        onClick={() =>
                                          // handleSpecificRemove(index)
                                          showEmployeeAreaApp()
                                        }
                                      >
                                        <img src={Blueminus} />
                                      </Addmore>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip title="Add">
                                      <img src={Blueadd} />
                                    </Tooltip>
                                  )}
                                </IconButton>
                              </> */}
                              {/* )
                              })} */}
                            </div>
                            {/* <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "right",
                        }}
                      >
                        <Button
                          size="small"
                          style={{
                            textTransform: "none",
                            height: "20px",
                            minWidth: "2px",
                            textDecoration: "underline",
                            color: "#3E8CB5",
                            fontSize: "15px",
                            fontFamily: "Arial",
                          }}
                          onClick={() => {
                            if (area.length == 0) handleImprovementAdd();
                            let temp = showAreaofImprovement;
                            setShowAreaofImprovement(!temp);
                          }}
                        >
                          {showAreaofImprovement ? (
                            <Tooltip title="Delete">
                              <img src={Blueminus} />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Add">
                              <img src={Blueadd} />
                            </Tooltip>
                          )}
                        </Button>
                      </div> */}
                          </Stack>
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
                                    fontFamily: "Arial",
                                    border: "1px solid #e0e0e0",
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
                              fontFamily: "Arial",
                              border: "1px solid #e0e0e0",
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
                              {filterData1 &&
                                filterData1.map((i: any, index: any) => {
                                  console.log(i, "123");
                                  return (
                                    <>
                                      <TableRow
                                        sx={{
                                          "& td, & th": {
                                            border: "1px solid #e0e0e0",
                                            // whiteSpace: "nowrap",
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
                                          {/* {employeeData?.data?.normalizer?.area_of_improvement_comments} */}
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
                                          {/* {j.employeeAgreevalue} */}
                                          {filterData1 &&
                                            filterData1.map((i: any, ix: any) => {
                                              return i[1].map((j: any, jx: any) => {
                                                return j.specific_actions.map(
                                                  (k: any, ix1: any) => {
                                                    if (index === ix && k.value)
                                                      return (
                                                        <span
                                                          style={{
                                                            fontSize: "14px",
                                                            color: "#333333",
                                                            fontFamily: "Arial",
                                                            wordBreak: "break-word",
                                                          }}
                                                        >
                                                          {k.value}
                                                          <br />
                                                        </span>
                                                      );
                                                  }
                                                );
                                              });
                                            })}

                                          {/* {specificAction} */}
                                          {/* {i?.normalizer?.area_of_improvement?.specific_actions?.employeeAgreevalue} */}
                                        </TableCell>
                                        {/* <TableCell> */}
                                        {/* <div
                        style={{
                          display: "flex",
                          justifyContent: "right",
                          alignItems: "right",
                        }}
                      > */}
                                        {/* <Button
                          size="small"
                          style={{
                            // textTransform: "none",
                            // height: "20px",
                            // minWidth: "2px",
                            textDecoration: "underline",
                            color: "#3E8CB5",
                            fontSize: "15px",
                            fontFamily: "Arial",
                          }}
                          onClick={() => {
                            if (area.length == 0) handleImprovementAdd();
                            let temp = showAreaofImprovement;
                            setShowAreaofImprovement(!temp);
                          }}
                        >
                          {showAreaofImprovement ? (
                            
                            <Tooltip title="Delete">
                            <Addmore
                              style={{
                                cursor: "pointer",
                                color: "#3E8CB5",
                                fontSize: "14px",
                              }}
                              onClick={() =>
                                handleSpecificRemove(index)
                              }
                            >
                              <img src={Blueminus}  />
                              </Addmore>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Add">
                              <img src={Blueadd} />
                            </Tooltip>
                          )}
                        </Button> */}
                                        {/* </div> */}
                                        {/* </TableCell> */}
                                        {/* <TableCell width="350px">
                                    <Tf31>
                                      <TextField
                                        fullWidth
                                        autoComplete="off"
                                        multiline
                                        size="small"
                                        placeholder="Add "
                                        name="employeeAreaComments"
                                        defaultValue={i[1][0].employee_comments}
                                        inputProps={{ maxLength: 512 }}
                                        onChange={(e: any) => {
                                          employeeAreaCommentsChangeHandler(
                                            i[1],
                                            e
                                          );
                                        }}
                                        // key={index}
                                        // employeeAgreevalue={
                                        //   area[index].specific_actions[index1]
                                        //     .employeeAgreevalue
                                        // }
                                        variant="standard"
                                        InputProps={{
                                          disableUnderline: true, // <== added this
                                        }}
                                      />
                                    </Tf31>
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
                    {/* {filterData1 &&
                          filterData1.map((i: any, index: any) => {
                            console.log(i, "123");
                             return (
                              <>
                              
                                <Button
                          size="small"
                          style={{
                            // textTransform: "none",
                            // height: "20px",
                            // minWidth: "2px",
                            textDecoration: "underline",
                            color: "#3E8CB5",
                            fontSize: "15px",
                            fontFamily: "Arial",
                          }}
                          onClick={() => {
                            if (area.length == 0) handleImprovementAdd();
                            let temp = showAreaofImprovement;
                            setShowAreaofImprovement(!temp);
                          }}
                        >
                          {showAreaofImprovement ? (
                            
                            <Tooltip title="Delete">
                            <Addmore
                              style={{
                                cursor: "pointer",
                                color: "#3E8CB5",
                                fontSize: "14px",
                              }}
                              onClick={() =>
                                handleSpecificRemove(index)
                              }
                            >
                              <img src={Blueminus}  />
                              </Addmore>
                            </Tooltip>
                          ) : (
                            <Tooltip title="Add">
                              <img src={Blueadd} />
                            </Tooltip>
                          )}
                        </Button>
                              </>
                             )
                            })} */}

                  </div>
                  {/* {showAreaofImprovement && ( */}
                  {(
                    <div style={{ marginRight: "10px", marginBottom: "20px" }}>
                      {/* <div style={{ paddingTop: "10px", paddingBottom: "5px", color: "#717171" }}>
                          Employee Area(s) of Improvement
                        </div> */}

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        height="20px"
                        marginBottom="10px"
                      // paddingTop="10px"
                      >
                        <div
                          style={{
                            color: "#717171",
                            fontSize: "16px",
                            fontFamily: "Arial",
                            // color: "#3E8CB5",
                            // fontSize: "14px",
                            // fontWeight: "600",
                          }}
                        >
                          <b> Areas for Improvement (Employee)</b>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "right",
                          }}
                        >
                          {/* <Button
                            size="small"
                            style={{
                              textTransform: "none",
                              height: "20px",
                              minWidth: "2px",
                              textDecoration: "underline",
                              color: "#3E8CB5",
                              fontSize: "15px",
                              fontFamily: "Arial",
                            }}
                            onClick={() => {
                              setShowAreaofImprovement(false);
                            }}
                          >
                            Remove
                          </Button> */}
                        </div>
                      </Stack>
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
                              width="26%"
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
                              width="50%"
                              align="center"
                              style={{
                                fontFamily: "Arial",
                                border: "1px solid #e0e0e0",
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
                            fontFamily: "Arial",
                            border: "1px solid #e0e0e0",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Action
                        </TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {area &&
                            area.map(
                              (singleImprovementList: any, index: any) => (
                                <TableRow
                                  sx={{
                                    "& td, & th": {
                                      border: "1px solid #e0e0e0",
                                    },
                                  }}
                                >
                                  <TableCell>
                                    <Tf3>
                                      <TextField
                                        size="small"
                                        fullWidth
                                        autoComplete="off"
                                        multiline
                                        placeholder="Add"
                                        name="improvement"
                                        key={index}
                                        value={area[index].value}
                                        inputProps={{ maxLength: 500 }}
                                        variant="standard"
                                        InputProps={{
                                          disableUnderline: true,
                                          readOnly: disableTextAfterSubmission
                                        }}
                                        onChange={(e) => {
                                          setarea(
                                            area.map(
                                              (previousState: any, ix: any) => {
                                                console.log(area, "areaaaaaa");
                                                if (ix === index) {
                                                  return {
                                                    ...previousState,
                                                    value: e.target.value,
                                                  };
                                                }
                                                return previousState;
                                              }
                                            )
                                          );
                                          setMoveTab(true);
                                          setnavPrompt(true)
                                        }}
                                      />
                                    </Tf3>
                                  </TableCell>

                                  <TableCell
                                    style={{
                                      width: "100%",
                                      paddingBottom: "10px",
                                      paddingTop: "0px",
                                    }}
                                  >
                                    {/* <Typo5>
                            <p>Specific Actions(s)</p>
                          </Typo5> */}
                                    {area.map((i: any, mapIndex: number) => {
                                      return (
                                        <>
                                          {index === mapIndex &&
                                            area &&
                                            i.specific_actions.map(
                                              (j: any, index1: any) => {
                                                console.log(j, "console");
                                                return (
                                                  <Stack
                                                  // direction="row"
                                                  // alignItems="center"
                                                  // spacing={1}
                                                  // width="200%"
                                                  >
                                                    <Tf4>
                                                      <Box>
                                                        <TextField
                                                          // fullWidth
                                                          multiline
                                                          autoComplete="off"
                                                          // rows={1}
                                                          size="small"
                                                          placeholder="Add"
                                                          name="specificAction"
                                                          // key={index}
                                                          inputProps={{
                                                            maxLength: 500,
                                                          }}
                                                          value={
                                                            area[index]
                                                              .specific_actions[
                                                              index1
                                                            ].value
                                                          }
                                                          variant="standard"
                                                          InputProps={{
                                                            disableUnderline:
                                                              true, // <== added this
                                                            readOnly: disableTextAfterSubmission
                                                          }}
                                                          onChange={(e) => {
                                                            setarea(
                                                              area.map(
                                                                (
                                                                  previousState: any,
                                                                  ix: any
                                                                ) => {
                                                                  if (
                                                                    ix === index
                                                                  ) {
                                                                    return {
                                                                      ...previousState,
                                                                      specific_actions:
                                                                        previousState.specific_actions.map(
                                                                          (
                                                                            previousState1: any,
                                                                            ix1: any
                                                                          ) => {
                                                                            if (
                                                                              ix1 ===
                                                                              index1
                                                                            ) {
                                                                              return {
                                                                                ...previousState1,
                                                                                value:
                                                                                  e
                                                                                    .target
                                                                                    .value,
                                                                              };
                                                                            }
                                                                            return previousState1;
                                                                          }
                                                                        ),
                                                                    };
                                                                  }
                                                                  return {
                                                                    ...previousState,
                                                                    // employeeAgreevalue: e.target.employeeAgreevalue
                                                                  };
                                                                }

                                                                //     ix === index
                                                                //         ? {
                                                                //             ...i,
                                                                //             values: e.target.employeeAgreevalue,
                                                                //         }
                                                                //         : i
                                                              )
                                                            );
                                                            setMoveTab(true);
                                                            setnavPrompt(true);
                                                          }}
                                                        />
                                                      </Box>
                                                    </Tf4>

                                                    {/* {specificActionList.length -
                                                      1 ===
                                                      index &&
                                                      specificActionList.length <
                                                      6 && (
                                                        <IconButton
                                                          onClick={
                                                            handleSpecificAdd
                                                          }
                                                        >
                                                          plus
                                                        </IconButton>
                                                      )} */}
                                                    {/* {specificActionList.length !== index + 1 &&
                                                              (
                                                                  <IconButton onClick={() => handleSpecificRemove(index)}><img
                                                                      src={Bluenegative} alt='icon' /></IconButton>
                                                              )
                                                          } */}
                                                  </Stack>
                                                );
                                              }
                                            )}
                                        </>
                                      );
                                    })}
                                  </TableCell>
                                  <TableCell style={{ borderColor: "#ffffff" }}>
                                    <Stack
                                      direction="row"
                                      alignItems="center"
                                      // width="100px"
                                      // marginLeft="25px"
                                      // marginTop="18px"
                                      spacing={1}
                                    >
                                      {/* <img onClick={handleImprovementAdd} src={Blueplus} alt="icon" /> */}
                                      {area.length !== 0 && (
                                        // (<IconButton onClick={() => handleImprovementRemove(index)}><RemoveIcon />Remove</IconButton>)
                                        <Stack
                                          direction="row"
                                          alignItems="center"
                                          // width="100px"
                                          // marginLeft="25px"
                                          // // marginTop="18px"
                                          spacing={0}
                                        >
                                          {/* <IconButton onClick={() => handleSpecificRemove(index)}> */}
                                          {/* <img src={Bluenegative} alt="icon" /> */}
                                          {/* minus */}
                                          {/* </IconButton> */}
                                          <Tooltip title="Delete">
                                            <Addmore
                                              style={{
                                                cursor: "pointer",
                                                color: "#3E8CB5",
                                                fontSize: "14px",
                                              }}
                                              onClick={() =>
                                                handleSpecificRemove(index)
                                              }
                                            >
                                              {" "}
                                              <img src={Blueminus} alt="icon" style={{ cursor: disableTextAfterSubmission ? "default" : "pointer" }} />
                                            </Addmore>

                                          </Tooltip>
                                          {/* <Button
                                   style={{
                                    display: "flex",
                                    // justifyContent: "right",
                                    // alignItems: "right",
                                    textTransform: "none",
                                    height: "20px",
                                    minWidth: "2px",
                                    textDecoration: "underline",
                                    color: "#93DCFA",
                                    fontSize: "14px",
                                    marginTop: '25px'
                                  }}
                                  onClick={() => handleSpecificRemove(index)} 
                                  >
                                  Remove
                                  </Button> */}
                                        </Stack>
                                      )}
                                      {/* <Button
                                   style={{
                                    display: "flex",
                                    // justifyContent: "right",
                                    // alignItems: "right",
                                    textTransform: "none",
                                    height: "20px",
                                    minWidth: "2px",
                                    textDecoration: "underline",
                                    color: "#93DCFA",
                                    fontSize: "14px",
                                    marginTop: '25px'
                                  }}
                                  onClick={handleImprovementAdd}
                                  >
                                  Add More
                                  </Button> */}
                                    </Stack>


                                    {area.length - 1 === index && (
                                      <div>
                                        {disableTextAfterSubmission ?
                                          <Addmore
                                            style={{
                                              cursor: "default",
                                              color: "#3E8CB5",
                                              fontSize: "14px",
                                            }}
                                          >
                                            <img src={Blueadd} alt="icon" />
                                          </Addmore>
                                          :
                                          <Tooltip title="Add">
                                            <Addmore
                                              style={{
                                                cursor: "pointer",
                                                color: "#3E8CB5",
                                                fontSize: "14px",
                                              }}
                                              onClick={() => {
                                                handleImprovementAdd();
                                                setMoveTab(true);
                                              }}
                                            >
                                              <img src={Blueadd} alt="icon" />
                                            </Addmore>
                                          </Tooltip>}
                                      </div>
                                    )}


                                  </TableCell>
                                </TableRow>
                              )
                            )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  {showTrainingRecommendation && (
                    <div style={{ marginRight: "65px", marginBottom: "20px" }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        height="20px"

                        marginBottom="10px"
                      // marginRight="72px"
                      >
                        <div
                          style={{
                            color: "#717171",
                            fontSize: "16px",
                            fontFamily: "Arial",
                          }}
                        >
                          <b> Training Recommendations (Appraiser)</b>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "right",
                          }}
                        >
                          {/* {employeeData &&
                            objectiveTitleData &&
                            Training.map((j: any, index: any) => {
                              return ( */}
                          {/* <>
                            <Button
                              size="small"
                              style={{
                                textTransform: "none",
                                height: "20px",
                                minWidth: "2px",
                                textDecoration: "underline",
                                color: "#3E8CB5",
                                fontSize: "15px",
                                fontFamily: "Arial",
                              }}
                              onClick={() => {
                                if (formValues.length == 0) addFormFields();
                                let temp = showTrainingRecommendations;
                                setShowTrainingRecommendations(!temp);
                              }}
                            >
                              {showTrainingRecommendations ? (
                                <Tooltip title="Delete">
                                  <Addmore
                                    style={{
                                      cursor: "pointer",
                                      color: "#3E8CB5",
                                      fontSize: "14px",
                                    }}
                                    onClick={() =>
                                      removeFormFieldsApp()
                                      // removeFormFields(index)
                                      // handleSpecificRemove(index)
                                    }
                                  >
                                    <img src={Blueminus} />
                                  </Addmore>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Add">
                                  <img src={Blueadd} />
                                </Tooltip>
                              )}
                            </Button>
                          </> */}
                          {/* )
                            })} */}
                        </div>
                      </Stack>
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
                          {employeeData &&
                            objectiveTitleData &&
                            Training.map((j: any, index: any) => {
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
                                      width="200px"
                                      align="left"
                                      style={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word",
                                      }}
                                    > <IconButton
                                      // aria-describedby={id2}

                                      onClick={(e: any) => {
                                        handleClickInfo6(e)
                                        setPopoverIndex(index);
                                      }}
                                    // style={{marginRight:"5px"}}

                                    >
                                        <img
                                          width="12px"
                                          src={Infoicon}
                                          alt="icon"
                                        />
                                      </IconButton>
                                      {j?.name?.title}

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
                                          {j?.name?.definition}

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
                                      {j?.training_name}
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
                                      {j?.justification}
                                    </TableCell>

                                    {/* <TableCell width="350px" align="left">
                                    <Tf31>
                                      <TextField
                                        fullWidth
                                        multiline
                                        autoComplete="off"
                                        size="small"
                                        placeholder="Add comments"
                                        name="employeeTrainingComments"
                                        defaultValue={j.employee_comments}
                                        inputProps={{ maxLength: 512 }}
                                        onChange={(e: any) => {
                                          employeeTrainingCommentsChangeHandler(
                                            j,
                                            e
                                          );
                                          setMoveTab(true);
                                        }}
                                        // key={index}
                                        // employeeAgreevalue={
                                        //   area[index].specific_actions[index1]
                                        //     .employeeAgreevalue
                                        // }
                                        variant="standard"
                                        InputProps={{
                                          disableUnderline: true, // <== added this
                                        }}
                                      />
                                    </Tf31>
                                  </TableCell> */}
                                  </TableRow>
                                </>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  {/* {showTrainingRecommendations && ( */}
                  {(
                    <div style={{ marginBottom: "20px" }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        height="20px"
                        marginBottom="10px"
                      // paddingTop="10px"
                      >
                        <div
                          style={{
                            color: "#717171",
                            fontSize: "16px",
                            fontFamily: "Arial",
                          }}
                        >
                          <b> Training Recommendations (Employee)</b>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            alignItems: "right",
                          }}
                        >
                          {/* <Button
                              size="small"
                              style={{
                                textTransform: "none",
                                height: "20px",
                                minWidth: "2px",
                                textDecoration: "underline",
                                color: "#3E8CB5",
                                fontSize: "15px",
                                fontFamily: "Arial",
                              }}
                              onClick={() => {
                                setShowTrainingRecommendations(false);
                              }}
                            >
                              Remove
                            </Button> */}
                        </div>
                      </Stack>
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
                              width="33.3%"
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
                              width="33.3%"
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
                              width="33.3%"
                              style={{
                                border: "1px solid #e0e0e0",
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                            >
                              Justification
                              {/* {employeeData &&
                        objectiveTitleData &&
                        objectiveDescription1.map((j: any, index: number) => {
                          console.log(j,"jjjjj")
                          return (
                            <>
                            {j[0]}
                            
                             </>
                          );
                        })
                      } */}
                            </TableCell>
                            {/* <TableCell
                              align="center"
                              width="25%"
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
                          {formValues.map((element, index) => {
                            // console.log(element, index,'elements')
                            //  setindexnumber(index)
                            return (
                              <TableRow
                                sx={{
                                  "& td, & th": {
                                    border: "1px solid #e0e0e0",
                                  },
                                }}
                              >
                                <TableCell
                                // style={{  width: "200px" }}
                                >
                                  {/* {item.name.title} */}
                                  <Train>
                                    <Stack
                                      sx={{
                                        display: "flex",
                                        // flexDirection: "row-reverse"
                                        justifyContent: "space-between",
                                      }}
                                      direction={"row"}>
                                      {element?.name != "" && (
                                        <IconButton
                                          // aria-describedby={id7}
                                          onClick={(e: any) => {
                                            handleClickInfo7(e)
                                            setPopoverIndex(index);
                                          }}
                                        // style={{marginRight:"5px"}}
                                        >
                                          <img width="12px" src={Infoicon} alt="icon" />
                                        </IconButton>
                                      )}
                                      <Select
                                        sx={{
                                          boxShadow: "none",
                                          ".MuiOutlinedInput-notchedOutline": {
                                            border: 0,
                                          },
                                          background: "f8f8f8",
                                        }}
                                        placeholder="Select"
                                        fullWidth
                                        autoComplete="off"
                                        displayEmpty
                                        // disabled={disableTextAfterSubmission}
                                        // label="Add  Name"
                                        // label="Select"
                                        size="small"
                                        name="name"
                                        value={element.name || ""}
                                        // variant="standard"
                                        // InputProps={{
                                        //   disableUnderline: true,
                                        // }}
                                        renderValue={
                                          element.name !== ""
                                            ? undefined
                                            : () => (
                                              <div style={{ color: "#aaa" }}>
                                                Select
                                              </div>
                                            )
                                        }
                                        MenuProps={MenuProps}
                                        onChange={(e) => {
                                          handleTrainingChange(index, e);
                                          setMoveTab(true);
                                        }}
                                      >
                                        {employeeData &&
                                          employeeData.data.appraisal_template.training_recommendation.map(
                                            (training: any) => {
                                              return (
                                                <MenuItem
                                                  style={{
                                                    fontSize: "14px",
                                                    fontFamily: "arial",
                                                    color: "#333333",
                                                  }}
                                                  disabled={disableTextAfterSubmission}
                                                  value={training.name._id}
                                                >
                                                  {training.name.title}
                                                </MenuItem>
                                              );
                                            }
                                          )}
                                      </Select>

                                      <Popover
                                        id={id7}
                                        open={(popoverIndex === index) && openInfo7}
                                        anchorEl={anchorEl8}
                                        onClose={handleCloseInfo7}
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
                                          {trainingSelectValue &&
                                            trainingSelectValue.map((TrainingData: any) => {
                                              console.log(TrainingData.name._id, "TrainingData")
                                              console.log(formValues[0].name, "TrainingDatas")

                                              return (
                                                <>
                                                  {formValues &&
                                                    formValues[index]?.name === TrainingData.name._id && TrainingData?.name?.definition}
                                                </>
                                              );
                                            })}



                                        </Typography>
                                      </Popover>
                                    </Stack>
                                  </Train>
                                </TableCell>
                                <TableCell>
                                  {/* {item.training_name} */}
                                  <Tf3>
                                    <TextField
                                      // sx={{
                                      //   "& label": {
                                      //     marginLeft: "5%",
                                      //     // marginBottom: "5%",
                                      //     // "&.Mui-focused": {
                                      //     //   marginLeft: 0,
                                      //     // },
                                      //   },
                                      // }}
                                      fullWidth
                                      multiline
                                      autoComplete="off"
                                      placeholder="Add"
                                      size="small"
                                      name="training_name"
                                      value={element.training_name || ""}
                                      inputProps={{ maxLength: 500 }}
                                      variant="standard"
                                      InputProps={{
                                        disableUnderline: true,
                                        readOnly: disableTextAfterSubmission
                                      }}
                                      onChange={(e) => {
                                        handleTrainingChange(index, e);
                                        setMoveTab(true);
                                      }}
                                    />
                                  </Tf3>
                                </TableCell>
                                <TableCell>
                                  {/* {item.justification} */}
                                  <Tf3>
                                    <TextField
                                      // sx={{
                                      //   "& label": {
                                      //     marginLeft: "5%",
                                      //     // margin:"-10px",
                                      //     // marginTop:"-10px",
                                      //     // "&.Mui-focused": {
                                      //     //   marginLeft: 0
                                      //     // }
                                      //   },
                                      // }}
                                      fullWidth
                                      placeholder="Add"
                                      multiline
                                      autoComplete="off"
                                      size="small"
                                      name="justification"
                                      id="outlined-select-select"
                                      value={element.justification || ""}
                                      inputProps={{ maxLength: 500 }}
                                      variant="standard"
                                      InputProps={{
                                        disableUnderline: true,
                                        readOnly: disableTextAfterSubmission
                                      }}
                                      onChange={(e) => {
                                        handleTrainingChange(index, e);
                                        setMoveTab(true);
                                      }}

                                    ></TextField>
                                  </Tf3>
                                </TableCell>

                                {/* <TableCell>{item.comments}</TableCell> */}
                                <TableCell style={{ borderColor: "#ffffff" }}>
                                  {formValues.length !== 0 && (
                                    <Tooltip title="Delete">
                                      <Button
                                        size="small"
                                        style={{
                                          display: "flex",
                                          justifyContent: "right",
                                          alignItems: "right",
                                          textTransform: "none",
                                          height: "20px",
                                          minWidth: "2px",
                                          textDecoration: "underline",
                                          color: "#93DCFA",
                                          fontSize: "14px",
                                          marginTop: "6px",
                                        }}
                                        disabled={disableTextAfterSubmission}
                                        onClick={() => {
                                          removeFormFields(index);
                                          setMoveTab(true);
                                          setnavPrompt(true)
                                        }}
                                      >
                                        <img src={Blueminus} alt="icon" style={{ cursor: disableTextAfterSubmission ? "default" : "pointer" }} />
                                      </Button>
                                    </Tooltip>
                                  )}

                                  {/* {formValues.length !== index + 1 && ( */}


                                  {formValues.length - 1 === index &&
                                    formValues.length < 6 && (
                                      <Tooltip title="Add">
                                        <Button
                                          size="small"
                                          style={{
                                            display: "flex",
                                            justifyContent: "right",
                                            alignItems: "right",
                                            textTransform: "none",
                                            height: "20px",
                                            minWidth: "0px",
                                            textDecoration: "underline",
                                            color: "#3e8cb5",
                                            fontSize: "14px",
                                            marginTop: "6px",
                                          }}
                                          disabled={disableTextAfterSubmission}
                                          onClick={() => {
                                            addFormFields()
                                            setnavPrompt(true)
                                          }}
                                        >
                                          <img src={Blueadd} alt="icon" style={{ cursor: disableTextAfterSubmission ? "default" : "pointer" }} />
                                        </Button>
                                      </Tooltip>
                                    )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  {employeeData?.data?.appraisal?.appraiser_overall_feedback !== null &&
                    employeeData?.data?.appraisal?.appraiser_overall_feedback !== "" &&
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontFamily: "arial",
                          color: "#717171",
                          marginBottom: "10px",
                        }}
                      >
                        {" "}
                        <b>Appraiser Message for Employee</b>
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "arial",
                          color: "#333333",
                          wordBreak: "break-word",
                          marginRight: "65px",
                        }}
                      >
                        <Tf1>
                          <TextField
                            fullWidth
                            InputProps={{ readOnly: true }}
                            multiline
                            // inputProps={{ maxLength: 500 }}
                            size="small"
                            value={
                              employeeData?.data?.appraisal
                                ?.appraiser_overall_feedback
                            }
                          />
                        </Tf1>
                      </Typography>
                    </div>
                  }
                  <div>
                    <Typography
                      style={{
                        fontSize: "16px",
                        color: "#717171",
                        fontFamily: "arial",
                        marginBottom: "10px",
                      }}
                    >
                      <b>Employee Comments</b>
                      <span style={{
                        fontSize: "22px",
                      }}>*</span>
                    </Typography>

                    <div style={{ marginRight: "65px" }}>
                      <EmployeeText>
                        <TextField
                          // fullWidth
                          autoComplete="off"
                          size="small"
                          multiline
                          placeholder="Add"
                          value={employeeComments}
                          // inputProps={{ maxLength: 512 }}
                          onChange={(e) => {
                            setEmployeeComments(e.target.value);
                            setMoveTab(true);
                            setnavPrompt(true);
                          }}
                          error={!employeeComments && textfeildError}
                          helperText={
                            !employeeComments && textfeildError
                              ? "*Employee rejection reasons required."
                              : " "
                          }
                          // variant="standard"
                          InputProps={{
                            // disableUnderline: true, // <== added this
                            readOnly: disableTextAfterSubmission
                          }}
                        />
                      </EmployeeText>
                    </div>
                  </div>
                  {/* {(employeeData?.data?.employee?.one_to_one_meeting !== "" &&
               employeeData?.data?.employee?.one_to_one_meeting !== null &&
               employeeData?.data?.employee?.one_to_one_meeting !== undefined) && (   */}
                  <>
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "16px",
                          fontFamily: "arial",
                          color: "#717171",
                          marginBottom: "10px",
                        }}
                      >
                        {" "}
                        <b>One-to-One Meeting Date</b><span style={{
                          fontSize: "22px",
                        }}>*</span>
                      </Typography>
                      <div>
                        <input
                          type="date"
                          name="one_to_one_meeting_date"
                          style={{
                            width: "250px",
                            color: "#7b7b7b",
                            height: "37px",
                            border: "1px solid #c6c6c6",
                            borderRadius: "3px",
                            background: "none",

                          }}
                          value={oneToOneMeetingDate}
                          min={employeeData?.data?.normalizer?.normalized_Date?.slice(0, 10)}
                          max={new Date().toISOString().slice(0, 10)}
                          // data-date=""
                          data-date-format="DD MMMM YYYY"
                          onKeyDown={(e) => {
                            if (e.code !== "Tab") {
                              e.preventDefault();
                            }
                          }}
                          disabled={disableTextAfterSubmission}
                          onChange={(e) => {
                            handleOneToOneMeetingDate(e);
                            setnavPrompt(true);
                            setMoveTab(true);
                          }}
                        />
                      </div>
                    </div>
                    {/* <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "arial",
                      color: "#333333",
                      paddingTop: "10px",
                      wordBreak: "break-word",
                      marginRight: "65px",
                    }}
                  >
                    <Tf1>
                      <TextField
                        fullWidth
                        InputProps={{ readOnly: true }}
                        multiline
                        inputProps={{ maxLength: 500 }}
                        size="small"
                        value={
                          One_To_One_Meeting_Date
                        }
                      />
                    </Tf1>
                  </Typography> */}
                  </>
                  {/* )} */}
                  <Stack
                    direction="row"
                    spacing={2}
                    style={{
                      margin: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Employee") &&
                      <>
                        <Button
                          disabled={disableButtons || employeeDataIsFetching}
                          style={{
                            borderRadius: "4px",
                            textTransform: "none",
                            fontSize: "15px",
                            fontFamily: "Arial",
                            borderColor: "#3E8CB5",
                            color: "#3E8CB5",
                            background: "transparent",
                            height: "35px",
                            ...((disableButtons || employeeDataIsFetching) && {
                              cursor: "not-allowed",
                              borderColor: "#ccc",
                              color: "#ccc",
                            }),
                            // width: "70px",
                          }}
                          variant="outlined"
                          onClick={saveRecommendationsHandler}
                        >
                          Save as Draft
                        </Button>
                        <Button
                          disabled={disableButtons || employeeDataIsFetching}
                          style={{
                            borderRadius: "4px",
                            textTransform: "none",
                            fontSize: "15px",
                            fontFamily: "Arial",
                            borderColor: "#3E8CB5",
                            color: "#3E8CB5",
                            background: "transparent",
                            height: "35px",
                            ...((disableButtons || employeeDataIsFetching) && {
                              cursor: "not-allowed",
                              borderColor: "#ccc",
                              color: "#ccc",
                            }),
                            // width: "70px",
                          }}
                          variant="outlined"
                          //onClick={handleClickOpen}
                          onClick={handleClickOpenForSubmit}
                        >
                          Save and Submit
                        </Button>
                        {/* <Dialog
                                           aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"                     

                      open={openSaved}
                      onClose={handleCloseSaved}
                      sx={{
                        "& .MuiDialog-container": {
                          "& .MuiPaper-root": {
                            width: "40%",
                            margin: "auto",
                            textAlign: "center",
                            minHeight: "25%",
                            // paddingTop: "25px",
                          },
                        },
                      }}
                    >
                      <DialogContent style={{ padding: "0px" }}>
                        <DialogContentText
                          style={{
                            color: "#333333",
                            fontSize: "18px",
                            fontFamily: "Arial",
                            // width: "75%",
                            // padding: "25px",
                            marginLeft: "68px",
                            marginRight: "68px",
                            marginTop: "40px",
                            marginBottom: "40px",
                            textAlign: "center",
                          }}
                        >
                          Changes were successfully saved.
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
                              // textTransform: "none",
                              // backgroundColor: "#FFA801",
                              // fontSize: "12px",
                              // fontFamily: "sans-serif",
                              // padding: "2px 10px",
                              // marginRight: "10px",
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              marginRight: "10px",
                              background: "transparent",
                              height: "35px",
                              width: "70px",
                              color: "#3E8CB5",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={handleCloseSaved}
                          >
                            Ok
                          </Button>
                        </DialogActions>
                      </div>
                    </Dialog> */}

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
                            ...((disableButtons || employeeDataIsFetching) && {
                              cursor: "not-allowed",
                              borderColor: "#ccc",
                              color: "#ccc",
                            }),
                          }}
                          variant="outlined"
                          onClick={() => {
                            // saveRecommendationsHandler();
                            handleBackButton();
                          }}
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
                            ...((disableButtons || employeeDataIsFetching) && {
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
                </TableContainer>
              </TabPanel>
              <Dialog
                open={openSaved}
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
                    {/* Changes were successfully saved.*/}
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
                      style={{
                        // textTransform: "none",
                        // backgroundColor: "#FFA801",
                        // fontSize: "12px",
                        // fontFamily: "sans-serif",
                        // padding: "2px 10px",
                        // marginRight: "10px",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        // marginRight: "10px",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                        color: "#3E8CB5",
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
              <AlertYesNo
                isAlertOpen={acceptRatingAlert}
                handleAlertYes={handleAcceptRatingAlertYes}
                handleAlertClose={handleAcceptRatingAlertNo}>
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


              <AlertDialogSuccess
                isAlertOpen={meetingValidation}
                handleAlertClose={handleCloseMeetingValidation}>
                {message}
              </AlertDialogSuccess>

              {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
              <AlertDialogOkCancelForUnsavedChanges
                isAlertOpen={openCancelDialog}
                handleAlertClose={rejectCancelButtonHandler}
                handleAlertIdClose={acceptCancelButtonHandler}
              >
              </AlertDialogOkCancelForUnsavedChanges>


              <Dialog
                fullScreen={fullScreen3}
                open={open3}
                // onClose={handleClose3}
                // aria-labelledby="responsive-dialog-title"
                // BackdropProps={{
                //   style: {
                //     background: "#333333 !important",
                //     opacity: "10%",
                //   },
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
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        onChange={handleRadioChange}
                      >
                        <FormControlLabel
                          value="Agree"
                          control={<Radio />}
                          label="We met the Appraiser and agreed on the rating/s to be changed"
                        />
                        <FormControlLabel
                          value="Disagree"
                          control={<Radio />}
                          label="We met the Appraiser and disagreed on the rating/s"
                        />
                      </RadioGroup>
                    </FormControl>
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
                        // textTransform: "none",
                        // fontSize: "12px",
                        // fontFamily: "sans-serif",
                        // marginRight: "10px",
                        // color: "#010101",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        marginRight: "10px",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                        color: "#3E8CB5",
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={handleClose3}
                    >
                      Yes
                    </Button>

                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        marginRight: "10px",
                        borderColor: "#3E8CB5",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                        color: "#3E8CB5",
                      }}
                      variant="outlined"
                      onClick={handleClose3}
                      autoFocus
                    >
                      No
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
              <Dialog
                open={open}
                // onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

                // sx={{
                //   "& .Mui Dialog-container": {
                //     "& .MuiPaper-root": {
                //       width: "40%",
                //       margin: "auto",
                //       textAlign: "center",
                //       minHeight: "25%",
                //       // paddingTop: "25px",
                //     },
                //   },
                // }}
                // BackdropProps={{
                //   style: {
                //     background: "#333333 !important",
                //     opacity: "10%",
                //   },
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
                    Have you reviewed the overall feedback of the performance appraisal?
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
                        // textTransform: "none",
                        // backgroundColor: "#FFA801",
                        // fontSize: "12px",
                        // fontFamily: "sans-serif",
                        // padding: "2px 10px",
                        // marginRight: "10px",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        marginRight: "10px",
                        color: "#3E8CB5",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={submitEmployeeRejection}
                    // onClick={() => {
                    //   handleClickOpen1();
                    //   handleClose();
                    // }}
                    >
                      Yes
                    </Button>
                    <Button
                      style={{
                        // textTransform: "none",
                        // fontSize: "12px",
                        // fontFamily: "sans-serif",
                        // marginRight: "10px",
                        // color: "#010101",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        marginRight: "10px",
                        color: "#3E8CB5",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                      }}
                      variant="outlined"
                      onClick={handleCloseNo}
                      autoFocus
                    >
                      No
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
              <Dialog
                open={openSubmit}
                onClose={handleCloseSubmit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

                // sx={{
                //   "& .Mui Dialog-container": {
                //     "& .MuiPaper-root": {
                //       width: "40%",
                //       margin: "auto",
                //       textAlign: "center",
                //       minHeight: "25%",
                //       // paddingTop: "25px",
                //     },
                //   },
                // }}
                // BackdropProps={{
                //   style: {
                //     background: "#333333 !important",
                //     opacity: "10%",
                //   },
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
                    {/* Your performance appraisal rejection has been submitted successfully! */}
                    {message}
                    {/* successfully. */}
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
                        // textTransform: "none",
                        // backgroundColor: "#FFA801",
                        // fontSize: "12px",
                        // fontFamily: "sans-serif",
                        // padding: "2px 10px",
                        // marginRight: "10px",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        // marginRight: "10px",
                        color: "#3E8CB5",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={handleCloseSubmit}
                    // onClick={() => {
                    //   handleClickOpen1();
                    //   handleClose();
                    // }}
                    >
                      Ok
                    </Button>
                    {/* <Button
                          style={{
                            // textTransform: "none",
                            // fontSize: "12px",
                            // fontFamily: "sans-serif",
                            // marginRight: "10px",
                            // color: "#010101",
                            textTransform: "none",
                            fontSize: "15px",
                            fontFaymily: "Arial",
                            borderColor: "#3E8CB5",
                            marginRight: "10px",
                            color: "#3E8CB5",
                            background: "transparent",
                            height: "35px",
                            width: "70px",
                          }}
                          variant="outlined"
                          onClick={handleCloseNo}
                          autoFocus
                        >
                          No
                        </Button> */}
                  </DialogActions>
                </div>
              </Dialog>
              <Dialog
                open={openforAccept}
                // onClose={handleCloseOpenForAccept}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"

                // BackdropProps={{
                //   style: {
                //     background: "#333333 !important",
                //     opacity: "10%",
                //   },
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
                      textAlign: "center",
                    }}
                  >
                    Would you like to accept your performance appraisal?
                  </DialogContentText>
                </DialogContent>
                <div style={{ alignItems: "center" }}>
                  <DialogActions
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
                    <Button
                      style={{
                        // textTransform: "none",
                        // fontSize: "12px",
                        // fontFamily: "sans-serif",
                        // marginRight: "10px",
                        // color: "#010101",
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
                      autoFocus
                      // onClick={submitEmployeeRejection}
                      onClick={() => {
                        handleOpenForAcceptNext();
                        handleCloseOpenForAccept();
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        marginLeft: "16px",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                      }}
                      variant="outlined"
                      onClick={handleCloseOpenForAccept}
                      autoFocus
                    >
                      No
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
              <Dialog
                fullScreen={fullScreen1}
                open={openforAcceptNext}
                // onClose={handleCloseOpenForAcceptNext}
                // aria-labelledby="responsive-dialog-title"
                // BackdropProps={{
                //   style: {
                //     background: "#333333 !important",
                //     opacity: "10%",
                //   },
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
                    Are you in acceptance with the Recommendations?
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
                        // textTransform: "none",
                        // fontSize: "12px",
                        // fontFamily: "sans-serif",
                        // marginRight: "10px",
                        // color: "#010101",
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
                      autoFocus
                      onClick={() => {
                        acceptHandler();
                        handleCloseOpenForAcceptNext();
                      }}
                    >
                      Yes
                    </Button>

                    <Button
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        marginLeft: "16px",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                      }}
                      variant="outlined"
                      onClick={() => {
                        handleCloseOpenForAcceptNext();
                        handleBackButton();
                      }}
                      autoFocus
                    >
                      No
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>

              <AlertYesNo
                isAlertOpen={openValidation}
                handleAlertYes={handleValidationYes}
                handleAlertClose={handleValidationNo}
              >
                {message}
              </AlertYesNo>

              <AlertYesNo
                isAlertOpen={openRejectValidation}
                handleAlertYes={handleRejectValidationYes}
                handleAlertClose={handleRejectValidationClose}
              >
                {message}
              </AlertYesNo>

              <AlertYesNo
                isAlertOpen={agreeSelectedOption}
                handleAlertYes={handleAgreeSelectedOptionYes}
                handleAlertClose={handleAgreeSelectedOptionNo}
              >


                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    name="radio-buttons-group"

                  >
                    {employeeData?.data?.employee?.employee_agree == true && (
                      <Typography
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
                        }}

                      >Are you sure you wish to proceed with the agreed changes?</Typography>
                      // <FormControlLabel
                      //       sx={{
                      //         "& .MuiFormControlLabel-label": {
                      //           fontSize: "14px",
                      //           color: "#333333",
                      //           fontFamily: "Arial",
                      //         },
                      //       }}
                      //       // value={}
                      //       checked = {true}
                      //       control={<Radio size="small"/>}

                      //       label="I met the Appraiser and agreed on changing the ratings"
                      //       />
                    )}

                    {employeeData?.data?.employee?.employee_agree == false && (
                      <Typography style={{
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
                      }}>Are you sure you wish to reject the ratings and proceed with mediation?</Typography>
                      // <FormControlLabel
                      // sx={{
                      //   "& .MuiFormControlLabel-label": {
                      //     fontSize: "14px",
                      //     color: "#333333",
                      //     fontFamily: "Arial",
                      //   },
                      // }}
                      // // value={false}
                      // checked = {true}
                      // // onChange={(e) => {
                      // //   handleRejectRadioChange(e);
                      // // }}
                      // control={<Radio size="small" />}
                      // label="I met the Appraiser and disagreed on the ratings"
                      // />
                    )}
                    {/* <p style={{paddingLeft:"26px"}}>Are you sure you wish to proceed with the agreed changes ?</p> */}
                  </RadioGroup>
                </FormControl>
              </AlertYesNo>

              <Dialog
                fullScreen={fullScreen3}
                open={confirmSelectedOption}
                // onClose={handleClose4}
                aria-labelledby="responsive-dialog-title"
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
                      textAlign: "justify",
                      wordBreak: "break-word",
                      // height: "100px",
                      alignItems: "center",
                      overflowY: "hidden",
                    }}
                  >
                    <FormControl>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={employeeData?.data?.employee?.employee_agree}
                        name="radio-buttons-group"
                        onChange={(e) => {
                          handleRejectRadioChange(e);
                        }}
                      >
                        <FormControlLabel
                          // style={{
                          //   color: "#333333",
                          //   fontSize: "14px",
                          //   fontFamily: "Arial",
                          // }}
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          value={true}
                          control={<Radio size="small" />}
                          label="I met the Appraiser and agreed on changing the ratings"
                        />
                        <FormControlLabel
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            },
                          }}
                          value={false}
                          // onChange={(e) => {
                          //   handleRejectRadioChange(e);
                          // }}
                          control={<Radio size="small" />}
                          label="I met the Appraiser and disagreed on the ratings"
                        />
                      </RadioGroup>
                    </FormControl>
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
                        color: "#3e8cb5",
                        // marginRight: "10px",
                        background: "transparent",
                        width: "70px",
                        height: "35px",
                      }}
                      variant="outlined"
                      autoFocus
                      onClick={() => { handleCloseConfirmSelectedOption() }}
                    >
                      Ok
                    </Button>
                  </DialogActions>
                </div>
              </Dialog>
            </Box>
          </Box>
        </Box>
        <AlertDialogSuccess
          isAlertOpen={open33}
          handleAlertClose={handlemessage3}
        >
          {message2}
        </AlertDialogSuccess>
        <Snackbar
          className={classes.customSnackbar}
          open={successAlertTriger}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert
            className={classes.customAlert}
            onClose={handleCloseSnackbar}
            sx={{ width: '100%' }}
            icon={false}
          >
            <b>{successAlertTrigerMSG}</b>
          </Alert>
        </Snackbar>
      </div>
    </>
  );
}
