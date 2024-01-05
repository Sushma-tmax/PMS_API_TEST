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
  Popover,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton,
  Tooltip,
  Breadcrumbs,
  Tabs,
  Tab, Snackbar, Alert,
} from "@mui/material";
import React, { useEffect, useState, useRef, useCallback, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
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
  useNormalizerRejectionMutation,
  useAttachmentsNormalizerDeleteMutation,
  useAttachmentsEmployeeDeleteMutation,
  useNormalizerSubmitEmployeeRejectionMutation,
  useAttachmentsNormalizerMutation,
  useMeetingNotesAttachmentsNormalizerMutation,
  useGetTalentCategoryQuery,
} from "../../../../service";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox"
import CircularProgress from "@mui/material/CircularProgress";
import Removeattnew from "../../../../assets/Images/Removeattnew.svg";
import Uploadatt from "../../../../assets/Images/Uploadatt.svg"
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import html2canvas from "html2canvas";

import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import dayjs from "dayjs";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Dialog from "@mui/material/Dialog";
import FormLabel from "@mui/material/FormLabel";
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import Infowhiteicon from "../../../../assets/Images/Infowhiteicon.svg";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import Eye from "../../../../assets/Images/Eye.svg";
import Close from "../../assets/Images/Close.svg";
import Newtickicon from "../../assets/Images/Newtickicon.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import { Scrollbar } from "react-scrollbars-custom";
import Thumsup from "../../assets/Images/Thumsup.svg";
import Thumsdown from "../../assets/Images/Thumsdown.svg";
import Edit from "../../../../assets/Images/Edit.svg";
import AlertDialogSuccess from "../../../UI/DialogSuccess";
import FeedbackQuestionnaireAppraiser from "../../FeedbackQuestionnaireAppraiser";
import thumbsdown_colored from "../../assets/Images/Thumbsdowncolored.svg";
import thumsup_colored from "../reviewer/appraisal_reviewer/icons/thumsup_colored.svg";
import AlertYesNo from "../../../UI/DialogYesNo";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import AlertAcceptDialog from "../../../UI/DialogAccept";
import { NORMALIZER_MEDIATION_INFO, NORMALIZER_RENORMALIZATION_INFO } from "../../../../constants/AppraisalEmailContents/NotificationForInfo/Normalizer";
import { useGetEmailIdsQuery, useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { makeStyles } from "@mui/styles";
import { NORMALIZER_VIEW_PA, EMPLOYEE_PREVIOUS_PAs } from "../../../../constants/routes/Routing"
import { useMeetingNotesDeleteAttachmentsNormalizerMutation } from "../../../../service/employee/appraisal/appraisal";
import { useGetEmployeeDetailsWithEmpCodeQuery } from "../../../../service/employee/previousAppraisal";
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

const Overallrating = styled("div")({
  fontSize: "17px",
  fontFamily: "arial",
  fontWeight: 400,
  color: "#3e8cb5",
  //textAlign: 'left'
});

const Overallratingvalue = styled("div")({
  fontSize: "17px",
  fontFaily: "arial",
});

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
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
const Overallfeedbackss = styled("div")({
  // marginLeft: "25px",
  // marginTop: "10px",
  color: "#333333",
  fontSize: "19px",
  fontFamily: "Avenir semibold Italics",
  display: "flex",
  justifyContent: "center",
});

const Tf3 = styled("div")({
  "& .MuiInputBase-root": {
    backgroundColor: "#f8f8f8",
  },
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    height: "15px",
    fontSize: "14px",
    fontFamily: "Arial",
    textTransform: "none",
    textAlign: "left"
  },
});
const Text = styled("div")({
  "& .MuiButton-root": {
    color: "#858585",
    // opacity: 0.6,
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
  },
  paddingTop: "0px",
  color: "#7a7a7a",
  marginLeft: "26px",
});
const RatingBackground = styled("div")({
  width: "27px",
  lineHeight: "27px",
  borderRadius: "50%",
  display: "block",
  // color: "white",  background: "red",
});
const Tf1 = styled("div")({

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

export default function NormalizerActionforEmployee(props: any) {
  const classes = useStyles();

  const { appraisalData } = props;

  const [anchorEl5, setAnchorEl5] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [deleteNormalizerMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsNormalizerDeleteMutation();
  const [deleteEmployeeMutation, { isLoading: delete1, data: deleted }] =
    useAttachmentsEmployeeDeleteMutation();
  const open5 = Boolean(anchorEl5);
  const handleClickOpen5 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setOpen2(true);
    setAnchorEl5(event.currentTarget);
  };
  const { data: nineBoxData } = useGetNineboxQuery("");

  const handleClose5 = () => {
    setAnchorEl5(null);
    // setOpen2(false);
  };
  const CustomScrollbar = Scrollbar as any;

  const { employee_id } = useParams();
  const { data: employeeData, refetch: fetchCancel, isLoading, isFetching: employeeDataIsFetching } =
    useGetEmployeeAppraisalQuery(employee_id);
  const { data: ratingsData } = useGetRatingScaleQuery("");
  const { data: objectiveTitleData, isLoading: isTitleLoading } =
    useGetObjectiveTitleQuery("");
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [rating, setRating] = useState<any>("");
  const [ratingValue, setRatingValue] = useState<any>("");
  const [displayEmployeeRating, setDisplayEmployeeRating] = useState(false)
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = useState("");
  const [normalizerComments, setNormalizerComments] = useState("");
  const [meetingNotes, setMeetingNotes] = useState("");
  const [textfieldError, settextfieldError] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [showArea, setShowArea] = useState(false)
  const [overAllRating, setOverAllRating] = useState<any>(0);
  const [currentOverAllRating, setCurrentOverAllRating] = useState<any>(0)
  const [currentObjectiveDescription, setCurrentObjectiveDescription] = useState<any>([])
  const [currentObjectiveType, setCurrentObjectiveType] = useState<any>([])
  const [disableAccept, setDisableAccept] = useState(false);
  const [rejectedTitle, setRejectedTitle] = useState("");
  const [openValidation, setOpenValidation] = useState(false);
  const [updateMutation, { isLoading: isUploading }] = useNormalizerRejectionMutation();
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: employeeData?.data?.employee_code })

  const [normalizerSubmit] = useNormalizerSubmitEmployeeRejectionMutation();
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [popoverIndex1, setPopoverIndex1] = useState<any>("");
  const [normalizerUpdateRating] = useUpdateEmployeeAppraisalMutation();

  const [name, setName] = useState<string>("");
  const [meetingNoteFileName, setMeetingNoteFileName] = useState<string>("");
  const [meetingNotefileSelected, setMeetingNoteFileSelected] = useState<any>("");
  const [fileSelected, setFileSelected] = useState<any>("");
  const [showTrainingRecommendation, setShowTrainingRecommendation] = useState(false)
  const [sendItem] = useCreateAzureBlobMutation();
  const [sendMeetingNotesItem] = useCreateAzureBlobMutation();
  const [disableTextAfterSubmission, setDisableTextAfterSubmission] = useState(false)
  const [attachmentsNormalizer] = useAttachmentsNormalizerMutation();
  const [meetingAttachment] = useMeetingNotesAttachmentsNormalizerMutation();
  const [deleteMeetingNotesAttachments] = useMeetingNotesDeleteAttachmentsNormalizerMutation();
  const [navPrompt, setnavPrompt] = React.useState(false);
  const [appraiser, setAppraiser] = useState(false);
  const [reviewer, setReviewer] = useState(false);
  const [employee, setEmployee] = useState(false);
  const [normalizedRating, setNormalizedRating] = useState("")
  const [talentPotential, setTalentPotential] = useState<any>("")
  const [talentRating, setTalentRating] = useState<any>(0)
  const { data: talentCategory } = useGetTalentCategoryQuery({ overall_rating: talentRating, potential: talentPotential });
  const [reviewedOverallFeedback, setReviewedOverallFeedback] = useState(false)
  const [cancelRatingsAlert, setCancelRatingsAlert] = useState(false)
  const { data: emailData } = useGetEmailIdsQuery({ appraiser_code: employeeData?.data?.appraiser_code, reviewer_code: employeeData?.data?.reviewer_code, normalizer_code: employeeData?.data?.normalizer_code })
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [hideAppRejectionReason, setHideAppRejectionReason] = useState(false);
  const [updateLoggedRole] = useCheckRoleLogsMutation()
  const formIsDirty = navPrompt;
  usePrompt(
    // 'Please save the changes before you leave the page.',
    "Any changes you have made will not be saved if you leave the page.",
    formIsDirty);
  const inputRef = useRef<any>(null);
  console.log(navPrompt, "navPrompt")
  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [disableButtons, setDisableButtons] = useState(false);
  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }
  const handleAppraiserCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAppraiser(event.target.checked);
    setMoveTab(true);
    setnavPrompt(true)
  };
  const handleReviewerCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReviewer(event.target.checked);
    setMoveTab(true);
    setnavPrompt(true)
  };
  const handleEmployeeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmployee(event.target.checked);
    setMoveTab(true);
    setnavPrompt(true)
  };

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
      setNormalizerComments(employeeData?.data?.normalizer?.reason_for_rejection);
      setMeetingNotes(employeeData?.data?.normalizer?.normalizer_meeting_notes);
      setAppraiser(employeeData?.data?.normalizer?.isAppraiserChecked);
      setReviewer(employeeData?.data?.normalizer?.isReviewerChecked);
      setEmployee(employeeData?.data?.normalizer?.isEmployeeChecked);
      setTalentPotential(employeeData?.data?.appraisal?.potential);
      setTalentRating(employeeData?.data?.current_rating?.overall_rating);
      if (meetingNoteFileName == "") {
        setMeetingNoteFileName(employeeData?.data?.normalizer?.meetingNotesAttachments[0]?.name)
      } else {
        setMeetingNoteFileName(meetingNoteFileName)
      }
    }
  }, [employeeData]);

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
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));


  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);

  // refetch
  const CancelButtonHandler = () => {
    if (navPrompt || moveTab) {
      setOpenCancelDialog(true);
    } else {
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
    resetMeetingNoteFileInput();
  }
  const handleClickOpen = () => {
    setOpen(true);
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
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setRating("");
    setRatingValue("");
  };
  const openDrawerHandler = (objective: any) => {
    setAccept("Accept");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setRejectedTitle(objective?.name?.objectiveTitle);
    setComments(objective.rejection_reason);
    setRating(objective.ratings._id);

    let reviewerRatingValue = employeeData.data.employee.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    setRatingAppraiser(reviewerRatingValue);
  };

  const openDrawerHandlerreject = (objective: any) => {
    setFileSelected("");
    setName("");
    setAccept("Reject");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.rejection_reason);
    setRejectedTitle(objective?.name?.objectiveTitle);
    // setRating(objective.ratings._id);
    if (displayEmployeeRating == false) {
      setRating(objective.ratings._id);
      setRatingValue(objective.ratings.rating)
    } else if (displayEmployeeRating == true) {
      setRating(rating);
      setRatingValue(ratingValue)
    }
    let reviewerRatingValue = employeeData.data.employee.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];

    let normalizeRating = employeeData?.data?.normalizer_previous_submission?.objective_description
      .filter((i: any) => i.name === objective.name._id)
      .map((k: any) => {
        if (ratingsData) {
          let temp = ratingsData?.data?.find((item: any) => k.ratings == item._id)
          return temp.rating
        }
      })[0];

    setNormalizedRating(normalizeRating);
    setRatingAppraiser(reviewerRatingValue);
    if (objective.rating_resubmitted == true) {
      setRating(objective.ratings._id);
      setRatingValue(objective.ratings.rating);
    } else {
      setRating("");
      setRatingValue("");
    }
    if (objective.rating_resubmitted == true && objective.action_performed == true) {
      setShowWithdraw(true);
    }
    else {
      setShowWithdraw(false);
    }
  };

  console.log(normalizedRating, 'rrrrrrrrrrrrrrrrrrrrr')

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };
  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData.data.normalizer.objective_type.find(
        (item: any) => item.name._id === id
      );
    }
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
        return employeeData.data.normalizer.objective_description.map(
          (i: any, index: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
              objective_type: findObjectiveTypeById(i.name.objective_type),
              attachment: employeeData.data.normalizer?.attachments ? employeeData.data.normalizer?.attachments[index] : "",
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
      setDisableTextAfterSubmission(!employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer"))
    }
  }, [employeeData, objectiveTitleData]);

  useEffect(() => {
    if (employeeData) {
      let temp = employeeData.data.normalizer.objective_description.filter(
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

  const rejectHandler = () => { };

  const appraiserRejectsEmployee = (id: any) => { };
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState("");

  const [accept, setAccept] = useState("");

  const handleacceptChange = (event: any) => {
    setAccept(event.target.value as string);
  };
  const [showWithdraw, setShowWithdraw] = useState(false);


  const acceptHandler = () => {
    closeDrawer();
    let temp = employeeData.data.employee.objective_description
      .filter((i: any) => i._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];
    // setnavPrompt(true);
    // updateMutation({
    //   objective_description: activeObjectiveDescription,
    //   objective_description_name: activeObjectiveDescriptionName,
    //   ratings: temp,
    //   rating_rejected: false,
    //   action_performed :true,
    //   rating_comments: comments,
    //   employee_id: employee_id,
    // });
    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      action_performed: true,
      rejection_reason: "",
      comments: "",
      employee_id: employee_id,
    });
    setRatingAppraiser("");
  };
  const ratingWithdrawHandler = () => {
    closeDrawer();
    let previousRatingData = employeeData?.data?.normalizer_previous_submission?.objective_description
      .filter((i: any) => i.name === activeObjectiveDescriptionName)
      .map((k: any) => {
        return {
          ratings: k.ratings,
          rating_rejected: k.rating_rejected,
          rejection_reason: k.rejection_reason ? k.rejection_reason : "",
        }
      })[0];
    // setnavPrompt(true);

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

    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: previousRatingData.ratings,
      rating_rejected: previousRatingData.rating_rejected,
      rating_resubmitted: false,
      action_performed: false,
      rejection_reason: previousRatingData.rejection_reason,
      current_objective_description: current_objective_description,
      // comments: tempComments,
      employee_id: employee_id,
    });
    setRatingAppraiser("");
    setRating("");
    setRatingValue("")
    setComments("");
  }
  // const handleSliderDialogClose = () => {
  //   setrejectAlert(false);
  //   // setRatingAppraiser("");
  //   setrejectAlertMessage('')
  // };
  const ratingSubmitHandler = () => {
    // setnavPrompt(true);
    // if (ratingAppraiser === ratingparams) {
    // if (ratingAppraiser === ratingValue) {
    //   setrejectAlertMessage(
    //     // "You cannot put the same rating as the Employee. Please change the Rating."
    //     "You cannot select the same rating as the Employee. Please change the rating."

    //   );

    //   setrejectAlert(true);
    //   // setnavPrompt(true);
    // } else
    console.log(ratingValue, 'ratingValue')
    if (ratingValue === null ||
      ratingValue === "" ||
      ratingValue === undefined) {
      setrejectAlertMessage("Please select a rating to reject.");
      setrejectAlert(true);
    }
    // else if (ratingAppraiser === ratingValue) {
    //   setrejectAlertMessage(" You cannot select the same rating as the Reviewer. Please change the rating.")
    //   setrejectAlert(true);
    // }
    else if (comments?.trim() == "" || comments?.trim() == undefined) {
      setrejectAlertMessage("Please add HR Normalizer Comments.");
      setrejectAlert(true);
    } else {
      closeDrawer();
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

      updateMutation({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        rejection_reason: comments?.trim(),
        rating_resubmitted: true,
        // rating_rejected: true,
        action_performed: true,
        employee_id: employee_id,
        current_objective_description: current_objective_description,
        pa_status: employeeData?.data?.employee?.employee_agree ? "Pending with HR Normalizer (Re-normalization)" : "Pending with HR Normalizer (Mediation)",
        normalizer_status: "draft"
      });
      setnavPrompt(false);
      setRating("");
      if (name && fileSelected) {
        return imageClick();
      }
      setRatingAppraiser("");
    }
  };

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
  //     normalizerUpdateRating({
  //       "normalizer.normalizer_rating": overAllRating,
  //       id: employee_id,
  //     });
  //   }
  // }, [overAllRating]);

  useEffect(() => {
    if (currentObjectiveDescription.length > 0 && employeeData) {
      const currentObjectiveDescriptionMapped = currentObjectiveDescription.map((i: any) => {
        // if (i.ratings) {
        console.log(i.objective_type, 'objective_type')
        const sum = (i.value * i.objective_type?.value) / 10000
        const newSum = sum * i?.ratings?.rating
        console.log(newSum, 'newSum')
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
      normalizerUpdateRating({
        "current_rating.overall_rating": currentOverAllRating,
        id: employee_id
      })
    }
  }, [currentOverAllRating])


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

  const handleMeetingNotesImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    // if (!fileList) return;
    //@ts-ignore
    setMeetingNoteFileName(fileList[0].name);
    // setFileSelected(fileList[0]);
    let reader = new FileReader();
    //@ts-ignore
    reader.readAsDataURL(fileList[0]);
    reader.onload = (e) => {
      setMeetingNoteFileSelected(e.target?.result);
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
      attachmentsNormalizer({
        attachments: {
          url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id,
      });
    });
  };

  const meetingNotesImageClick = () => {
    const newData = {
      // token:tokens,
      // newstitle: newsTitle,
      // newsdesc: convertedContent,
      newspic: meetingNotefileSelected,
      newspicname: meetingNoteFileName,
    };

    sendMeetingNotesItem(newData).then((res: any) => {
      meetingAttachment({
        attachments: {
          url: meetingNoteFileName,
          // objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id,
      });
    });
  };
  const [filterData2, setFilterData2] = useState([]);
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
  useEffect(() => {
    if (employeeData && employeeData.data) {
      const employeeAreaOfImprovement =
        employeeData.data.employee.area_of_improvement;
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
  }, [employeeData, employeeData]);

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

  const resetFileInput = () => {
    setFileSelected("");
    setName("");

    inputRef.current.value = null;
  };
  const [anchorE12, setAnchorE12] = React.useState<HTMLButtonElement | null>(null);
  const handleClose12 = () => {
    setAnchorE12(null);
  };
  const handleClick12 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE12(event.currentTarget);
  };

  const open12 = Boolean(anchorE12);
  const id = open12 ? "simple-popover" : undefined;

  const resetMeetingNoteFileInput = () => {
    setMeetingNoteFileSelected("");
    setMeetingNoteFileName("");
    deleteMeetingNotesAttachments({
      id: employee_id,
      name: meetingNoteFileName || employeeData?.data?.normalizer?.meetingNotesAttachments[0]?.name,
    }).then((res: any) => {
      console.log(res, 'checkresssss')
    })

    inputRef.current.value = null;
  };

  const [positionHide, setpositionHide] = useState<any>(false);
  const [meetingAttachmentHide, setMeetingAttachmentHide] = useState<any>(false);

  useEffect(() => {
    if (fileSelected !== "" && name !== "") {
      setpositionHide(true);
    } else {
      setpositionHide(false);
    }
  }, [name, fileSelected]);


  useEffect(() => {
    console.log(meetingNotefileSelected, 'checkMeeting', meetingNoteFileName, 'checkMeeting1', employeeData?.data?.normalizer?.meetingNotesAttachments?.length !== 0, 'checkMeeting3')
    if ((meetingNotefileSelected !== "") || ((meetingNoteFileName !== "" && meetingNoteFileName !== undefined) || employeeData?.data?.normalizer?.meetingNotesAttachments?.length !== 0)) {
      setMeetingAttachmentHide(true);
    } else {
      setMeetingAttachmentHide(false);
    }
  }, [meetingNoteFileName, meetingNotefileSelected, employeeData]);


  const [NormalizerAttachments, setNormalizerAttachments] = useState<any>("");
  const [employeeAttachments, setemployeeAttachments] = useState<any>("");
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open6 = Boolean(anchorEl6);
  const handleClickOpen6 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2(true);
    setNormalizerAttachments(
      employeeData &&
      employeeData?.data?.normalizer?.attachments
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
    setAnchorEl6(event.currentTarget);
  };

  const handleClose6 = () => {
    setAnchorEl6(null);
    // setOpen2(false);
  };
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorReject, setAnchorReject] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open7 = Boolean(anchorEl7);
  const openReject = Boolean(anchorReject);
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

  const handleClickOpenReject = (
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
    setAnchorReject(event.currentTarget);
  };

  const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
  };

  const handleCloseReject = () => {
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

  //slider validation

  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [openYes, setOpenYes] = useState(false);


  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    let normalizerObjDesc = employeeData?.data?.normalizer?.objective_description?.map(
      (i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      }
    );
    console.log(talentCategory, 'talentCategory')
    normalizerSubmit({
      // reason_for_rejection: normalizerComments,
      // normalizer_meeting_notes: meetingNotes,
      current_OverAllRating: employeeData?.data?.current_rating?.overall_rating,
      talentCategory: talentCategory?.data,
      meetingNotes: meetingNotes?.trim(),
      normalizerComments: normalizerComments?.trim(),
      normalizerObjDesc: normalizerObjDesc,
      current_previous_submission: employeeData?.data?.current_rating.objective_description,
      appraisal_previous_submission: employeeData?.data?.appraisal?.objective_description,
      isAppraiserChecked: appraiser,
      isReviewerChecked: reviewer,
      isEmployeeChecked: employee,
      id: employee_id,
    }).then((res: any) => {
      if (meetingNoteFileName && meetingNotefileSelected) {
        return meetingNotesImageClick();;
      }
    }).then((res: any) => {
      setnavPrompt(false);
      setMoveTab(false);
      updateLoggedRole({
        pa_action_by: `Normalizer (Re-normalized) : ${new Date()}`,
        id: employee_id
      });
      setDisableButtons(false)
    })
    // normalizerUpdateRating({
    //   "normalizer.objective_description": normalizerObjDesc,
    //   "normalizer.reason_for_rejection": normalizerComments,
    //   "normalizer.normalizer_meeting_notes": meetingNotes,
    //   "talent_category": talentCategory,     
    //   id: employee_id,
    // });
    setOpenYes(false);
    //setMessage("The performance appraisal was re-normalized.")
    setNavigateDashboard(true);
    //setOpenSubmit(true);
    //snackbar
    setSuccessAlertTrigerMSG("The performance appraisal was re-normalized.")
    setSuccessAlertTriger(true)
    let appraiserName = employeeData?.data?.appraiser_name;
    let employeeName = employeeData?.data?.first_name;
    let normalizerName = employeeData?.data?.normalizer_name;
    let calendarName = employeeData?.data?.calendar?.calendar_type;
    let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
    let employeeCode = employeeData?.data?.employee_code;
    let renormalizedRating = employeeData?.data?.current_rating?.overall_rating

    // Notification info Re-normalization on changes completed by Normalizer after mediation (for Employee/Appraiser/Reviewer)
    // NORMALIZER_RENORMALIZATION_INFO
    if (employeeData?.data?.employee?.employee_agree === true) {
      let tempSubject1 = NORMALIZER_RENORMALIZATION_INFO?.subject;
      tempSubject1 = tempSubject1?.replace("[year]", `${calendarYear}`);
      tempSubject1 = tempSubject1?.replace("[calendar name]", `${calendarName}`);
      tempSubject1 = tempSubject1?.replace("[employee name]", `${employeeName}`);
      tempSubject1 = tempSubject1?.replace("[employee code]", `${employeeCode}`);

      let tempHtml1 = NORMALIZER_RENORMALIZATION_INFO?.html;
      tempHtml1 = tempHtml1?.replace("[year]", `${calendarYear}`);
      tempHtml1 = tempHtml1?.replace("[calendar name]", `${calendarName}`);
      tempHtml1 = tempHtml1?.replace("[employee name]", `${employeeName}`);
      tempHtml1 = tempHtml1?.replace("[employee code]", `${employeeCode}`);
      tempHtml1 = tempHtml1?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtml1 = tempHtml1?.replace("[renormalized rating]", `${renormalizedRating}`);

      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let employeeEmail = employeeData?.data?.email;
      let email = NORMALIZER_RENORMALIZATION_INFO?.to;
      const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
      email = email?.replace("[email]", `${employeeEmail}`);

      sendEmailNotification(
        {
          to: email,
          cc: recipientEmails,
          subject: tempSubject1,
          html: tempHtml1
        }
      )
    } else {
      let tempSubject = NORMALIZER_MEDIATION_INFO?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

      let tempHtml = NORMALIZER_MEDIATION_INFO?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
      tempHtml = tempHtml?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtml = tempHtml?.replace("[renormalized rating]", `${renormalizedRating}`);

      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.email
      let employeeEmail = employeeData?.data?.email;
      let email = NORMALIZER_MEDIATION_INFO?.to;
      const recipientEmails = [`${appraiserEmail}`, `${normalizerEmail}`]
      email = email?.replace("[email]", `${employeeEmail}`);

      sendEmailNotification(
        {
          to: email,
          cc: recipientEmails,
          subject: tempSubject,
          html: tempHtml
        }
      )

    }

  };
  const handleAlertNo = () => {
    // setOpenYes(false);
    setOpenYes(false);
    setMessage("");
    setValue(1);
  }
  // console.log(openYes,"")
  // useEffect(() => {
  //   setratingparams(ratingAppraiser);
  // }, [ratingAppraiser]);

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setrejectAlertMessage("");
  };

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    // if (ratingAppraiser === j.rating) {
    //   setrejectAlertMessage(
    //     // "You cannot put the same rating as the Reviewer. Please change the Rating."
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
  console.log(ratingAppraiser, "ratingparams");
  //slider validation
  // rating hower
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
  // rating hower
  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
      // opacity: open ? "1" : "0",
    },
  };


  const cancelHandler = () => {
    let normalizerActionPerformed = objectiveDescription?.filter((item: any) => item.action_performed)
    if (normalizerActionPerformed?.length > 0) {
      setCancelRatingsAlert(true);
    } else if (moveTab || navPrompt) {
      setCancelRatingsAlert(true);
    } else {
      navigate(`/normalizer`, { state: { from: `${1}` } })
    }
  }

  const handleCloseCancelRatingsAlert = () => {
    setCancelRatingsAlert(false);
    setMessage("")
  }

  const handleCancelRatingsAlert = () => {
    setnavPrompt(false);
    setMoveTab(false);
    setCancelRatingsAlert(false);
    if (employeeData?.data?.employee?.employee_agree !== true) {
      let previousData = {
        normalizer: employeeData?.data?.normalizer_previous_submission?.objective_description,
        appraisal: employeeData?.data?.appraisal_previous_submission?.objective_description,
        employee: employeeData?.data?.employee_previous_submission.objective_description,
        current: employeeData?.data?.current_previous_submission.objective_description
      }
      normalizerUpdateRating({
        "normalizer.objective_description": previousData?.normalizer,
        "appraisal.objective_description": previousData?.appraisal,
        "employee.objective_description": previousData?.employee,
        "current_rating.objective_description": previousData?.current,
        id: employee_id,
      })
        .then((res: any) => {
          if (!res.error) {
            navigate(`/normalizer`, { state: { from: `${1}` } })
          }
        })
    } else if (employeeData?.data?.employee?.employee_agree == true) {
      let previousData = {
        normalizer: employeeData?.data?.normalizer_previous_submission?.objective_description,
        appraisal: employeeData?.data?.appraisal_previous_submission?.objective_description,
        current: employeeData?.data?.current_previous_submission.objective_description,
      }
      normalizerUpdateRating({
        "normalizer.objective_description": previousData?.normalizer,
        "appraisal.objective_description": previousData?.appraisal,
        // "employee.objective_description": previousData?.employee,
        "current_rating.objective_description": previousData?.current,
        id: employee_id,
      })
        .then((res: any) => {
          if (!res.error) {
            navigate(`/normalizer`, { state: { from: `${1}` } })
          }
        })
    }



  }


  const submitHandler = () => {
    console.log(meetingNotes, 'meetingNotesmeetingNotesmeetingNotes')
    // let normalizerObjDesc =  employeeData?.data?.appraisal?.objective_description?.map(
    //   (i: any) => {
    //     return {
    //       ...i,
    //       action_performed: false,
    //     };
    //   }
    // );
    // if (normalizerComments === "" || normalizerComments === undefined) {
    //   setOpenValidation(true);
    //   setMessage("Please add Normalizer comments in the recommendation.")
    // } else {
    //   normalizerSubmit({
    //     normalizer_overall_feedback: normalizerComments,
    //     id: employee_id,
    //   });
    //   normalizerUpdateRating({
    //     "normalizer.objective_description" : normalizerObjDesc,
    //     "normalizer.normalizer_overall_feedback": normalizerComments,
    //     id: employee_id,
    //   });
    //   setMessage("The performance appraisal has been succesfully submitted.")
    //   setNavigateDashboard(true);
    //   setOpenSubmit(true);
    // }

    // if (normalizerComments === "" || normalizerComments === undefined) {
    //   setOpenValidation(true);
    //   setMessage("It is mandatory to add the overall feedback. Please visit the Overall Feedback page.")
    // } else 

    { /* If Employee agrees with the rating and if Normalizer renormalizes any rating then only
  check for the following conditions else no need. 

  { /* If Employee disgrees with the rating and goes for mediation and normalizer 
edits or doesn't edit the ratings , still need to check for the following conditions. */}
    setDisableButtons(true);
    if (employeeData?.data?.employee?.employee_agree == true && employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
      item.rating_resubmitted == true).length > 0) {
      if (appraiser == false || reviewer == false || employee == false) {
        setOpenValidation(true);
        setMessage("It is mandatory to tick all the boxes to indicate the agreement obtained during the re-normalization meeting on the overall feedback page.")
      } else if (meetingNotes?.trim() === "" || meetingNotes?.trim() === undefined) {
        setOpenValidation(true);
        setMessage("It is mandatory to include the re-normalization meeting notes on the overall feedback page.")
      } else if ((meetingNoteFileName == "" || employeeData?.data?.normalizer?.meetingNotesAttachments?.length == 0) && meetingNotefileSelected == "") {
        setOpenValidation(true);
        setMessage("It is mandatory to attach a signed performance appraisal form after the re-normalisation meeting.")
      } else {
        handleAlertYes()
      }
    }
    else if (employeeData?.data?.employee?.employee_agree !== true) {
      let employeeRejectedRatings = employeeData?.data?.employee?.objective_description?.filter((item: any) => {
        return item.rating_rejected == true
      }).map((item: any) => item?.name?._id);
      let actionPerformed = objectiveDescription?.filter((item: any) => {
        return employeeRejectedRatings?.includes(item?.name?._id) && item?.action_performed == false
      });
      if (actionPerformed?.length > 0) {
        setOpenSubmit(true);
        setMessage("You cannot submit the performance appraisal. Please submit a re-normalized rating after the mediation meeting.")
      }
      else if (appraiser == false || reviewer == false || employee == false) {
        setOpenValidation(true);
        setMessage("It is mandatory to tick all the boxes to indicate the agreement obtained during the mediation meeting in the overall feedback page.")
      } else if (meetingNotes?.trim() === "" || meetingNotes?.trim() === undefined) {
        setOpenValidation(true);
        setMessage("It is mandatory to include the mediation meeting notes in the overall feedback page.")
      } else if ((meetingNoteFileName == "" || employeeData?.data?.normalizer?.meetingNotesAttachments?.length == 0) && meetingNotefileSelected == "") {
        setOpenValidation(true);
        setMessage("It is mandatory to attach a signed performance appraisal form after the mediation meeting.")
      } else {
        handleAlertYes()
      }
    } else {
      handleAlertYes()
    }
  };

  const handleValidationClose = () => {
    setOpenValidation(false);
    setMessage("");
    setValue(1);
    setDisableButtons(false);
  }

  const saveRatingHandler = () => {

    // if (normalizerComments == "" || normalizerComments == null || normalizerComments == undefined) {
    //   setOpenSubmit(true);
    //   setMessage("Please add the Normalizer Comments on the Recommendation page.")
    // } else {

    setDisableButtons(true);
    normalizerUpdateRating({
      "normalizer.reason_for_rejection": normalizerComments?.trim(),
      "normalizer.normalizer_meeting_notes": meetingNotes?.trim(),
      "normalizer.normalizer_status": "draft",
      "appraisal.pa_status": employeeData?.data?.employee?.employee_agree ? "Pending with HR Normalizer (Re-normalization)" : "Pending with HR Normalizer (Mediation)",
      id: employee_id,
    }).then((res: any) => {
      setMoveTab(false);
      setDisableButtons(false);
      setNavigateDashboard(false);
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true)
      setnavPrompt(false);
    });
    // if (moveTab == true) {
    //   setOpenSubmit(true);
    //   setMoveTab(false);
    //   setMessage("Changes were successfully saved.")
    // } else {
    //   setOpenSubmit(true);
    //   setMoveTab(false);
    //   setMessage("No changes were made to save.")
    // }
    //setOpenSubmit(true);

    //setMessage("Changes were successfully saved.")


    // }
  };


  const saveRecommendationsHandler = () => {
    setDisableButtons(true);
    normalizerUpdateRating({
      "normalizer.reason_for_rejection": normalizerComments?.trim(),
      "normalizer.normalizer_meeting_notes": meetingNotes?.trim(),
      "normalizer.isAppraiserChecked": appraiser,
      "normalizer.isReviewerChecked": reviewer,
      "normalizer.isEmployeeChecked": employee,
      "normalizer.normalizer_status": "draft",
      "appraisal.pa_status": employeeData?.data?.employee?.employee_agree ? "Pending with HR Normalizer (Re-normalization)" : "Pending with HR Normalizer (Mediation)",
      id: employee_id,
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
    //  setOpenSaved(true);

    //  setMessage("Changes were successfully saved.")


    if (meetingNoteFileName && meetingNotefileSelected) {
      return meetingNotesImageClick();;
    }
    // if (normalizerComments == "" || normalizerComments == null || normalizerComments == undefined) {
    //   setOpenSaved(true);
    //   setMessage("Please fill in all the mandatory fields (*).")
    // } else if (meetingNotes == "" || meetingNotes == null || meetingNotes == undefined) {
    //   setOpenSaved(true);
    //   setMessage("Please fill in all the mandatory fields (*).")
    // } else {
    //   normalizerUpdateRating({
    //     "normalizer.normalizer_overall_feedback": normalizerComments,
    //     "normalizer.normalizer_meeting_notes": meetingNotes,
    //     id: employee_id,
    //   });
    //   setOpenSaved(true);
    //   setMoveTab(false);
    //   setnavPrompt(false);

    //   setMessage("Changes were successfully saved.")


    //   if (meetingNoteFileName && meetingNotefileSelected) {
    //     return meetingNotesImageClick();;
    //   }

    // }
  };

  const getPAStatus = (status: any) => {
    if (status == "in-progress" || status == "normalized") {
      return "In progress";
    } else if (status == "completed") {
      return "Completed";
    } else if (status == "not-started") {
      return "Not started";
    } else if (status == "normalized") {
      return "Normalized";
    } else if (status == "rejected") {
      return "Employee rejected";
    } else {
      return status;
    }
  };
  const getAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.attachments
      ?.filter((i: any) => i?.objective_description == id)
      ?.map((k: any) => {
        console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k?.url}> {k?.name} </a> <br />
            </div>
          ),
          remove: k?.name,
        };
        // return k.name
      });
  };

  const getAppraiserRejectionAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.rejection_attachments
      ?.filter((i: any) => i?.objective_description == id)
      ?.map((k: any) => {
        console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k?.url}> {k?.name} </a> <br />
            </div>
          ),
          remove: k?.name,
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

    return employeeData?.data?.normalizer?.attachments
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
  const [openSaved, setOpenSaved] = React.useState(false);
  const [openSubmit, setOpenSubmit] = React.useState(false);
  const [moveTab, setMoveTab] = useState<any>(false)
  const [message, setMessage] = useState<any>("")
  const [navigateDashboard, setNavigateDashboard] = useState<any>(false)
  const [specificAction1, setspecificAction1] = useState<any>(false);
  const [specificAction2, setspecificAction2] = React.useState(false);
  let navigate = useNavigate();

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
    setMessage(false)
    setNavigateDashboard(false)
  };
  const handleCloseSubmit = () => {
    setOpenSubmit(false);
    setDisableButtons(false);
    setMessage(false)
    if (navigateDashboard === true) {
      navigate(`/normalizer`, {
        state: {
          from: 1,
        }
      });
    }
    // setNavigateDashboard(false)
  };

  const handleClickOpenAttachment = (e: any) => {
    document.getElementById("photo")?.click();
  };

  const handleClickMeetingNoteOpenAttachment = (e: any) => {
    document.getElementById("photo1")?.click();
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
  console.log(employeeData, "employeeData")

  useEffect(() => {
    if (employeeData?.data?.employee?.area_of_improvement !== "") {

      if (employeeData?.data?.employee?.area_of_improvement[0] == '' || employeeData?.data?.employee?.area_of_improvement[0] == undefined) {
        setspecificAction1(false);
      } else {
        setspecificAction1(true);
      }
      console.log(employeeData?.data?.employee?.area_of_improvement, "areaofimprovement")
    }
  }, [employeeData])
  useEffect(() => {

    if (employeeData?.data?.employee?.training_recommendation !== "") {

      if (employeeData?.data?.employee?.training_recommendation[0] == '' || employeeData?.data?.employee?.training_recommendation[0] == undefined) {
        setspecificAction2(false);
      } else {
        setspecificAction2(true);
      }

    }

  }, [employeeData])

  // sushma -> to display normalizer action buttons based on appraiser rejection or employee rejection 
  const showActionButtons = (j: any) => {
    if (employeeData?.data?.employee?.employee_agree !== true) {
      return (employeeData &&
        employeeData?.data?.employee?.objective_description
          ?.filter(
            (i: any) =>
              i?.name?._id === j?.name._id
          )
          ?.map((k: any) => {
            if (k?.rating_rejected)
              return k?.ratings?.rating;
          })[0])
    } else {
      return (employeeData &&
        employeeData?.data?.appraisal?.objective_description
          ?.filter(
            (i: any) =>
              i?.name?._id === j?.name._id
          )
          ?.map((k: any) => {
            if (k?.rating_rejected || k.rating_resubmitted)
              return k?.ratings?.rating;
          })[0])
    }
  }

  const handleViewPA = () => {
    window.open(`${NORMALIZER_VIEW_PA}/employee/${employee_id}`, '_blank')
  }

  console.log(employeeData?.data?.employee?.training_recommendation, "trainingrecommendation")
  console.log(specificAction1, "specificAction1")
  console.log(specificAction2, "specificAction2")
  //infoicon popover

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
    if (!employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer")) {
      navigate(`${NORMALIZER_VIEW_PA}/employee/${employee_id}`)
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
          HR Normalizer Action
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
          </div>
        </Item2> */}



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
              <Typography
                style={{
                  paddingRight: "381px",
                  fontSize: "12px",
                  color: "#7A7A7A",
                  paddingBottom: "7px",
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
                    width: "70px",
                    background: "transparent",
                  }}
                  variant="outlined"
                  onClick={() => acceptHandler()}
                >
                  {" "}
                  Accept
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
                  paddingLeft: "5px",
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
                Re-normalized Rating
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
                                // setnavPrompt(true);
                                handleRatingAlert(ratings);
                                // setDisplayEmployeeRating(false);
                                setRating(ratings._id);
                                setRatingValue(ratings.rating);

                              }}
                              style={{
                                //@ts-ignore
                                borderColor:
                                  rating === ratings._id && "#3C8BB5",
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
                    {/* Employee Rating */}
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
                            {/* {ratingAppraiser} */}
                            {/* <span
                              style={{
                                color: "#3C8BB5",
                                fontSize: "10px",
                                // paddingLeft: "15px",
                                position: "absolute",
                                top: "95%",
                                transform: "translate(-25%, 0px)",
                                maxWidth: "50px",
                              }}
                            > */}
                            {/* {getRatingDescription(ratingAppraiser)} */}
                            {/* </span> */}
                          </p>
                        </Button>
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
            <div>
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
                    value="male"
                    control={<Radio />}
                    label="The rating was not agreed with the Employee"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="An error made by the Employee"
                  />
                </RadioGroup>
              </FormControl>
            </div> */}
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
              HR Normalizer Comments <span style={{
                fontSize: "20px"
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
              multiline
              style={{ paddingLeft: "24px", width: "75%" }}
              // inputProps={{ maxLength: 500 }}
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
                // setnavPrompt(true);
              }}
              InputProps={{
                // disableUnderline: true,
                readOnly: disableTextAfterSubmission
              }}
            //  disabled={ disableTextAfterSubmission}
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
            <div >
              <Stack direction="row" alignItems="center">
                <span>
                  <input
                    id="photo"
                    name="photo"
                    type="file"
                    title={name}
                    ref={inputRef}
                    multiple={false}
                    style={{ display: "none" }}
                    // style={styles.colors}
                    onChange={(e) => {
                      handleImageChange(e);
                      // setMoveTab(true)
                    }}
                  />
                </span>

                <Text>

                  <IconButton >
                    <img src={Uploadatt}
                      // InputProps={{
                      //   // disableUnderline: true,
                      //   readOnly: disableTextAfterSubmission
                      // }}
                      onClick={(e: any) => {
                        if (!disableTextAfterSubmission) {
                          handleClickOpenAttachment(e);
                        }
                      }}
                    />
                  </IconButton>
                  <><label style={{ fontSize: "14px", color: "#7a7a7a", fontFamily: "arial" }}>{name}</label></>
                </Text>

                {positionHide && (
                  <IconButton
                    onClick={() => {
                      // setFileSelected('')
                      // setName('')
                      if (!disableTextAfterSubmission) {
                        resetFileInput();
                      }
                    }}
                  >
                    <img src={Removeattnew} alt="icon" />
                  </IconButton>
                )}

              </Stack>
            </div>
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
                  // setnavPrompt(false);
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
                  Withdraw
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
          height: "auto"
        }}
      >
        {/* <Container
          sx={{
            maxWidth: "96.5% !important",
            backgroundColor: "#ebf1f5",
          }}
        /> */}
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
          marginLeft="25px"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={`/normalizer`}
            >
              HR Normalizer Dashboard
            </Link>
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={`/normalizer`}
              state={{
                from: `${1}`,
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
              alignItems="baseline"
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
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <div>
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
                      {/* {employeeData?.data?.appraisal?.status === "in-progress" ? "In-progress" :
                        employeeData?.data?.appraisal?.status === "not-started" ? "Not-started" :
                          employeeData?.data?.appraisal?.status} */}
                      {getPAStatus(employeeData?.data?.appraisal?.status)}
                    </span>
                  </Typography>


                </div>
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
                        color: "#717171",
                        fontSize: "17px",
                        fontFamily: "Arial",
                      }} > {(employeeData?.data?.previous_rating && employeeData?.data?.previous_rating !== 0  && employeeData?.data?.previous_rating !== undefined) ? employeeData?.data?.previous_rating?.toFixed(2) : "-"}</span>
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
                <Tooltip placement="top" arrow title="Download">
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
                    }}> <img style={{
                      cursor: "pointer",height:"15px",width:"15px"
                    }} src={Downloadss} alt="Download" />
                    {/* <img
                  src={Eye}
                    alt="Eye Icon"
                                      /> */}
                  </label>
                </Button>
                </Tooltip>
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
                        />
                        {employeeData?.data?.division} */}
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
                              // left:"915px !important"
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
                        // paddingLeft: "22px",
                        fontSize: "16px",
                        color: "#333333",
                        paddingTop: "1px",
                      }}
                    >
                      {/* <b>{employeeData?.data?.normalizer?.normalizer_rating}</b> */}
                      <b> {ratingdefenition?.length > 0 &&
                        <IconButton sx={{ padding: "4px" }} onClick={handleClick22} >
                          <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                        </IconButton>
                      }{employeeData?.data?.current_rating?.overall_rating?.toFixed(2)}</b>
                    </div>
                    {/* <div
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            opacity: "80%",
                          }}
                        >
                           {ratingsData &&
                              getRatingDescription(
                                employeeData?.data?.normalizer?.normalizer_rating
                              )} 
                          Exceeding
                        </div> */}
                  </Stack>
                </div>
                {/* <span style={{ paddingRight: "10px" }}>
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

                <Grid item xs={4}>
                  <Stack paddingRight="10px" direction="row" gap="12px">
                    {/* <div
                      style={{
                        // paddingLeft: "60%",
                        verticalAlign: "middle",
                        paddingRight: "12px",
                        borderRight: "1px solid #eaeced",
                      }}
                    >
                      <Typography
                        style={{
                          fontSize: "18px",
                          color: "#33333",
                          paddingTop: "10px",
                          fontFamily: "Arial",
                        }}
                      >
                        Overall Rating
                      </Typography>
                    </div> */}
                    {employeeData?.data?.appraisal_template?.potential == true && (
                      <Stack direction="column" alignItems="flex-end">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <span
                            style={{
                              fontSize: "17px",
                              color: "#3E8CB5",
                              fontFamily: "Arial",
                            }}
                          >
                            <IconButton sx={{ padding: "4px" }} onClick={handleClick12} >
                              <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                            </IconButton>
                            Potential Level

                            <Popover
                              id={id}
                              open={open12}
                              anchorEl={anchorE12}
                              onClose={handleClose12}
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
                                      // color: "#3e8cb5",
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
                        </div>
                      </Stack>
                    )}
                  </Stack>
                </Grid>
              </Stack>
              {/* </Grid> */}
              {/* </Grid> */}
            </Box>

            <Typography>
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
                                          width: "130px",
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
              <TableContainer sx={{ width: "100%", paddingTop: "10px" }}>
                <Table
                  size="small"
                  aria-label="simple table"
                  sx={{
                    borderCollapse: 'separate',
                    borderSpacing: '0px 15px'
                  }}
                >
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
                        Objective<br></br> Type
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
                        Objective<br></br> Title
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
                        Objective <br></br>Level
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
                        Appraiser<br></br> Rating
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
                          Appraiser<br></br> Comments
                        </TableCell>)}

                      {hideAppRejectionReason && employeeData?.data?.normalizer?.normalizer_status !== "re-normalized" &&
                        employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                          (item.rating_rejected == true || item.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
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
                            Appraiser<br></br> Rejection/Change Reason
                          </TableCell>
                        )}
                      {employeeData?.data?.employee?.employee_agree !== true && (<TableCell
                        sx={{
                          fontFamily: "Arial",
                          borderColor: "#F7F9FB",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Employee<br></br> Rating
                      </TableCell>)}
                      {employeeData?.data?.employee?.employee_agree !== true && employeeData?.data?.employee?.objective_description?.filter((item: any) =>
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
                            Employee <br></br>Rejection Reason
                          </TableCell>)}


                      {employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
                        item.rating_resubmitted == true).length > 0 && (
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
                            Re-normalized<br></br> Rating
                          </TableCell>
                        )}


                      {employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
                        item.rating_resubmitted == true).length > 0 && (
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
                            Re-normalized<br></br> Comments
                          </TableCell>
                        )}
                      {((employeeData?.data?.employee?.employee_agree !== true && employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                        item.rating_rejected == true).length > 0) ||
                        (employeeData?.data?.employee?.employee_agree == true && employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                          (item.rating_rejected == true) || (item.rating_resubmitted == true)).length > 0)) &&
                        employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer") &&
                        (
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
                            HR Normalizer <br></br>Action
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
                      objectiveDescription?.map((j: any, index: number) => {
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
                                {j?.objective_type?.name?.name}
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

                                  <IconButton sx={{ padding: "4px" }}
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
                                  padding: "0px 6px"
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
                                        sx={{ padding: "5px" }}
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
                                                <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
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
                                                <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
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
                                                <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
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
                                                <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
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
                              {/* <TableCell
                                      width="10px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word"
                                      }}
                                      align="left"
                                    >
                                      <Stack
                                        direction="column"
                                        display="flex"
                                        alignItems="center"
                                      >
                                        <span>
                                          {" "}
                                          {employeeData &&
                                            employeeData?.data?.normalizer?.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )
                                              .map((k: any) => {
                                              
                                                if (k.ratings)
                                                  return k?.ratings?.rating;
                                              })[0]}
                                        </span>
                                      
                                      </Stack>
                                    </TableCell> */}
                              <TableCell
                                width="10px"
                                sx={{
                                  fontSize: "14x",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  background: "#ffffff",
                                  padding: "0px 2px"
                                }}
                                align="center"
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-around"
                                  alignItems="center"
                                  spacing={2}
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
                                          else if (k?.ratings && k.rating_resubmitted == true)
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
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Typography
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                        color: '#333333',
                                        wordBreak: "break-word"

                                      }}
                                    >
                                      {employeeData &&
                                        employeeData?.data?.appraisal?.objective_description
                                          ?.filter(
                                            (i: any) =>
                                              i?.name?._id === j?.name?._id
                                          )
                                          ?.map((k: any) => {
                                            if (k?.comments) return k?.comments;
                                          })[0]}
                                    </Typography>

                                    {/* {employeeData &&
                                    employeeData.data.employee.objective_description
                                      .filter(
                                        (i: any) => i.name._id === j.name._id
                                      )
                                      .map((k: any) => {
                                        if (k.comments) return k.comments;
                                      })[0] && ( */}
                                    {employeeData &&
                                      getAttachments(j?.name?._id)?.length >
                                      0 && (
                                        <AttachFileIcon
                                          sx={{
                                            color: "#93DCFA",
                                            height: "18px",
                                            transform: "rotate(30deg)",
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
                                                        {index1 + 1}
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
                                      </div>
                                    </Popover>
                                  </Stack>
                                </TableCell>)}
                              {hideAppRejectionReason && employeeData?.data?.normalizer?.normalizer_status !== "re-normalized" &&
                                employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                                  ((item.rating_rejected == true) || item.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
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
                                      <Typography
                                        style={{
                                          fontSize: "14px",
                                          fontFamily: "Arial",
                                          color: '#333333',
                                          wordBreak: "break-word"

                                        }}
                                      >
                                        {employeeData &&
                                          employeeData?.data?.appraisal?.objective_description
                                            ?.filter(
                                              (i: any) =>
                                                i?.name?._id === j?.name?._id
                                            )
                                            ?.map((k: any) => {
                                              if (k?.rating_rejected || k.rating_resubmitted) return k?.rejection_reason;
                                            })[0]}
                                      </Typography>

                                      {/* {employeeData &&
                                    employeeData.data.employee.objective_description
                                      .filter(
                                        (i: any) => i.name._id === j.name._id
                                      )
                                      .map((k: any) => {
                                        if (k.comments) return k.comments;
                                      })[0] && ( */}
                                      {employeeData &&
                                        getAppraiserRejectionAttachments(j?.name?._id)?.length > 0 &&
                                        (employeeData?.data?.appraisal?.objective_description
                                          ?.filter(
                                            (i: any) =>
                                              i?.name?._id === j?.name?._id
                                          )
                                          ?.map((k: any) => {
                                            if (k?.rating_rejected || k.rating_resubmitted) return k?.rejection_reason;
                                          })[0]) && (
                                          <AttachFileIcon
                                            sx={{
                                              color: "#93DCFA",
                                              height: "18px",
                                              transform: "rotate(30deg)",
                                            }}
                                            aria-describedby={"id"}
                                            onClick={(e: any) => {
                                              handleClickOpenReject(e, j);
                                              setPopoverIndex(index);
                                            }}
                                          />
                                        )}


                                      <Popover
                                        id={"id"}
                                        open={popoverIndex === index && openReject}
                                        anchorEl={anchorReject}
                                        onClose={handleCloseReject}
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
                                                          {index1 + 1}
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
                                                        {/* <Stack direction="row"> */}
                                                        {/* <IconButton>
                                              <img src={Downloadatt} />
                                            </IconButton> */}
                                                        {/* <IconButton> */}

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
                                                        {/* </Stack> */}
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
                                        </div>
                                      </Popover>
                                    </Stack>
                                  </TableCell>
                                )}

                              {employeeData?.data?.employee?.employee_agree !== true && (
                                <TableCell
                                  width="10px"
                                  sx={{
                                    fontSize: "14x",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    background: "#ffffff",
                                    padding: "0px 2px"
                                  }}
                                  align="center"
                                >
                                  <div
                                    style={{ display: "inline-flex" }}
                                  >
                                    <span
                                      style={{
                                        // fontSize: "14x",
                                        // @ts-ignore
                                        color:
                                          employeeData &&
                                          employeeData?.data?.employee?.objective_description
                                            ?.filter(
                                              (i: any) =>
                                                i?.name?._id === j?.name?._id
                                            )
                                            ?.map((k: any) => {
                                              if (k?.rating_rejected)
                                                return <RatingBackground style={{ color: "white", background: "#D2122E" }}> {k?.rating_rejected} </RatingBackground>;
                                            })[0]

                                        // '"#333333",
                                      }}
                                    >
                                      {employeeData &&
                                        employeeData?.data?.employee?.objective_description
                                          ?.filter(
                                            (i: any) =>
                                              i?.name?._id === j?.name._id
                                          )
                                          ?.map((k: any) => {
                                            if (k?.rating_rejected)
                                              return <RatingBackground style={{ color: "white", background: "#D2122E" }}> {k?.ratings?.rating} </RatingBackground>
                                          })[0]}
                                    </span>

                                    {/* <AttachFileIcon onClick={handleClickOpen2} />
                                                           
                                                           <Dialog
                                   BackdropProps={{ style: { background: "#000000", opacity: "10%" } }}
                                                           PaperProps={{
 
                                                            style: {
                                                              boxShadow: "none",
                                                              borderRadius: "6px",
                                                            },
 
                                                          }}
                                                           sx={{
                                                             "& .MuiDialog-container": {
                                                               "& .MuiPaper-root": {
                                                                 width: "30%",
                                                                 // maxheight:" 300px",
                                         height: "35%"
                                                                 // maxWidth: "400px",
                                                                 // maxHeight: "400PX",  // Set your width here
                                                               },
                                                             },
                                                           }}
                                                           open={open2}
                                                           onClose={handleClose2}
                                                           aria-labelledby="responsive-dialog-title"
                                                           >
 
                                   {employeeData?.data?.employee?.attachments
                                   // ?.filter((i: any) => {
 
                                   //   // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                   //   return i?.objective_description === employeeData?.data?.employee?.objective_description[index]?.name?._id
                                   // })
                                                               .map((k: any) => {
                                                                   return <a href={k?.url}> {k?.name} </a>
 
                                                               })}
 
                                                            </Dialog> */}
                                  </div>
                                </TableCell>
                              )}
                              {employeeData?.data?.employee?.employee_agree !== true && employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                                item.rating_rejected == true).length > 0 && (
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
                                      <Typography
                                        style={{
                                          fontSize: "14px",
                                          fontFamily: "Arial",
                                          color: '#333333',
                                          wordBreak: "break-word"

                                        }}
                                      >
                                        {employeeData &&
                                          employeeData?.data?.employee?.objective_description
                                            ?.filter(
                                              (i: any) =>
                                                i?.name?._id === j?.name?._id
                                            )
                                            ?.map((k: any) => {
                                              if (k?.rating_rejected) return k?.rejection_reason;
                                            })[0]}
                                      </Typography>

                                      {/* {employeeData &&
                                    employeeData.data.employee.objective_description
                                      .filter(
                                        (i: any) => i.name._id === j.name._id
                                      )
                                      .map((k: any) => {
                                        if (k.comments) return k.comments;
                                      })[0] && ( */}
                                      {employeeData && showEmployeeAttachment(j?.name?._id) &&
                                        getAttachments(j?.name?._id)?.length >
                                        0 && (
                                          <AttachFileIcon
                                            sx={{
                                              color: "#93DCFA",
                                              height: "18px",
                                              transform: "rotate(30deg)",
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
                                                          {index1 + 1}
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
                                        </div>
                                      </Popover>
                                    </Stack>
                                  </TableCell>)}

                              {employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
                                item.rating_resubmitted == true).length > 0 && (
                                  <TableCell
                                    width="10px"
                                    sx={{
                                      fontSize: "14x",
                                      color: "#333333",
                                      opacity: "80%",
                                      fontFamily: "Arial",
                                      background: "#ffffff",
                                      padding: "0px 2px"
                                    }}
                                    align="center"
                                  >

                                    {" "}
                                    <div
                                      style={{ display: "inline-flex" }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "14x",
                                          // @ts-ignore
                                          // fontWeight:j.rating_rejected == true ? "700" : "400",
                                          color:
                                            j.rating_resubmitted == true ? "white" : "#333333",
                                        }}
                                      >
                                        {" "}

                                        {j.rating_resubmitted ? (<RatingBackground style={{ background: "grey" }}>{j?.ratings?.rating}</RatingBackground>) : (j?.ratings?.rating)}
                                      </span>
                                    </div>

                                  </TableCell>
                                )}

                              {employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
                                item.rating_resubmitted == true).length > 0 && (
                                  <TableCell
                                    width="250px"
                                    sx={{
                                      fontSize: "14px",
                                      color: "#33333",
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
                                      <Typography
                                        style={{
                                          fontSize: "14px",
                                          fontFamily: "Arial",
                                          color: '#333333',
                                          wordBreak: "break-word"

                                        }}> {j?.rejection_reason} </Typography>
                                      {/* {j?.rating_comments && ( */}
                                      {employeeData && j?.rating_resubmitted &&
                                        getAttachments1(j?.name?._id)?.length >
                                        0 && (
                                          <AttachFileIcon
                                            sx={{
                                              color: "#93DCFA",
                                              height: "18px",
                                              transform: "rotate(30deg)",
                                            }}
                                            aria-describedby={"id"}
                                            onClick={(e: any) => {
                                              handleClickOpen6(e, j);
                                              setPopoverIndex1(index);
                                            }}
                                          />
                                        )}
                                      {/* )} */}

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
                                            {/* Attachments: {NormalizerAttachments} */}
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
                                                          {index1 + 1}
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
                                                          {disableTextAfterSubmission ?
                                                            <img
                                                              src={Removeattnew}
                                                              style={{ cursor: "default" }}
                                                            /> :
                                                            <img
                                                              src={Removeattnew}
                                                              onClick={() =>
                                                                deleteNormalizerMutation(
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

                                                          {/* </IconButton> */}
                                                        </Stack>
                                                      </Stack>
                                                    </>
                                                  );
                                                }
                                              )}
                                          </Typography>
                                          {/* {employeeData?.data?.normalizer?.attachments
                                      .filter((i: any) => {

                                        // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                        return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                      })
                                      .map((k: any) => {
                                        return <a href={k.url}> {k.name} </a>;
                                      })} */}
                                        </div>
                                      </Popover>
                                    </Stack>
                                  </TableCell>
                                )}

                              {((employeeData?.data?.employee?.employee_agree !== true && employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                                item.rating_rejected == true).length > 0) ||
                                (employeeData?.data?.employee?.employee_agree == true && employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                                  (item.rating_rejected == true) || (item.rating_resubmitted == true)).length > 0)) &&
                                employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer") &&
                                (
                                  <TableCell width="50px" align="center" style={{ background: "#ffffff", padding: "0px 2px" }}>
                                    <Stack direction="row" justifyContent="center">
                                      {showActionButtons(j) &&
                                        (
                                          <Tooltip title="Edit">
                                            <IconButton
                                              disabled={isUploading || employeeDataIsFetching}
                                              onClick={() => openDrawerHandlerreject(j)}
                                            >
                                              <img
                                                src={Edit}
                                                alt="icon"
                                                style={{
                                                  width: "16px",
                                                  height: "16px",
                                                }}
                                              />
                                            </IconButton>
                                          </Tooltip>
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
                                  onClick={() => openDrawerHandler(j)}
                                >
                                  Accept
                                </Button> */}

                                      {/* {employeeData &&
                                    employeeData?.data?.employee?.objective_description
                                      .filter(
                                        (i: any) => i.name._id === j.name._id
                                      )
                                      .map((k: any) => {
                                        if (k.rating_rejected == true)
                                          return k.rating_rejected;
                                      })[0] &&
                                    (
                                      <>
                                        {j.action_performed === true && j.rating_rejected === false ?

                                          <Tooltip title="Accepted">

                                            <IconButton
                                              onClick={() => openDrawerHandler(j)}
                                            >
                                              <img
                                                src={thumsup_colored}
                                                alt="icon"
                                                style={{ width: "16px", height: "16px" }}
                                              />
                                            </IconButton>

                                          </Tooltip> : <Tooltip title="Accept">
                                            <IconButton
                                              onClick={() => openDrawerHandler(j)}
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
                                              onClick={() => openDrawerHandlerreject(j)}
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
                                              onClick={() => openDrawerHandlerreject(j)}
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
                                    )} */}
                                    </Stack>

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
                                  Reject{" "}
                                </Button> */}

                                    {/* <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "#929292"
                                    }}
                                  >
                                    Do you wish to change the ratings?
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
                {/* <Link to={"/normalizer"}> */}
                {employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer") &&
                  <>
                    <Button
                      // disabled={disableAccept}
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        height: "35px",
                        // width: "70px",
                        background: "transparent",
                        ...((disableButtons || employeeDataIsFetching) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),
                      }}
                      variant="outlined"
                      onClick={() => saveRatingHandler()}
                    >
                      Save as Draft
                    </Button>
                    <Button
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
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
                      onClick={() => {
                        submitHandler();
                      }}
                    >
                      Save and Submit
                    </Button>
                    {/* <Link
                  style={{
                    fontSize: "18px",
                    color: "#3e8cb5",
                    fontFamily: "Arial",
                  }}
                  color="inherit"
                  to={`/normalizer`}
                  state={{
                    from: `${1}`,
                  }}
                > */}
                    <Button
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
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

                {/* <Button
                disabled={disableAccept}
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                }}
                variant="outlined"
                onClick={() => rejectHandler()}
              >
                Accept
              </Button> */}
                {/* <Link to={"/dashboardreview"}> */}
                {/* <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                }}
                variant="outlined"
                onClick={() => appraiserRejectsEmployee(employee_id)}
              >
                Reject
              </Button> */}
              </Stack>



            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography
                style={{
                  fontSize: "20px",
                  color: "#3E8CB5",
                  fontFamily: "Arial",
                  paddingTop: "20px",
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
                                    width="140px"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word",
                                      lineHeight: "23px"
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
                                      lineHeight: "23px"
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
                      <b>Areas for Improvement (Employee)</b>
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
                                      lineHeight: "23px"
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
                                      lineHeight: "23px"
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
                    <Table size="small">
                      <TableHead style={{ backgroundColor: "#F7F9FB" }}>
                        <TableRow
                          style={{ backgroundColor: "#F7F9FB" }}
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
                                    lineHeight: "23px"
                                  }}
                                > <IconButton

                                  // aria-describedby={id2}
                                  onClick={(e: any) => {
                                    handleClickInfo6(e)
                                    setPopoverIndex(index);
                                  }}
                                // style={{marginRight:"5px"}}
                                >
                                    <img width="12px" src={Infoicon} alt="icon" />
                                  </IconButton>
                                  {" "}
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
                                    lineHeight: "23px"
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
                                    wordBreak: "break-word",
                                    lineHeight: "23px"
                                  }}
                                >
                                  {" "}
                                  {item.justification}{" "}
                                </TableCell>
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
                          Training1?.map((j: any, index: any) => {
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
                                      wordBreak: "break-word",
                                      lineHeight: "23px"
                                    }}
                                  > <IconButton
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
                                        {/* {trainingSelectValue.map((TrainingData: any) => {
                          console.log(TrainingData,"TrainingData")
                          return (
                            <>
                             {TrainingData.name.defenition}

                             </>
                            );
                        })} */}

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
                                      wordBreak: "break-word",
                                      lineHeight: "23px"
                                    }}
                                  >
                                    {j?.training_name}
                                  </TableCell>
                                  <TableCell
                                    width="300px"
                                    align="left"
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word",
                                      lineHeight: "23px"
                                    }}
                                  >
                                    {j?.justification}
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
              {employeeData?.data?.appraisal?.appraiser_overall_feedback != "" && employeeData?.data?.appraisal?.appraiser_overall_feedback != undefined && (

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
                      {" "}
                      <b>Appraiser Message for Employee</b>
                    </Typography>
                    <Typography
                      style={{
                        fontSize: "14px",
                        fontFamily: "arial",
                        color: "#333333",
                      }}
                    >
                      <Tf1>
                        <TextField
                          fullWidth
                          InputProps={{ readOnly: true, }}
                          multiline
                          inputProps={{ maxLength: 500 }}
                          size="small"
                          value={employeeData?.data?.appraisal?.appraiser_overall_feedback}
                        />
                      </Tf1>
                    </Typography>
                  </div>
                </>
              )}


              {employeeData?.data?.employee?.comments !== undefined &&
                employeeData?.data?.employee?.comments !== "" && (
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
                      <Tf1>
                        <TextField
                          fullWidth
                          InputProps={{ readOnly: true, }}
                          multiline
                          inputProps={{ maxLength: 500 }}
                          size="small"
                          value={employeeData?.data?.employee?.comments}
                        />
                      </Tf1>
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

              {/* <div style={{ marginBottom: "20px" }}> */}
              <div >
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    marginBottom: "10px",
                    fontFamily: "Arial"
                  }}
                >
                  <b>HR Normalizer Comments</b>
                  {/* <span style={{
                  fontSize: "22px",
                }}>*</span> */}
                </Typography>
                <Tf3>
                  <TextField
                    fullWidth
                    multiline
                    size="small"
                    placeholder="Add"
                    value={normalizerComments}
                    // inputProps={{ maxLength: 500 }}
                    error={!normalizerComments && textfieldError}
                    helperText={
                      !normalizerComments && textfieldError
                        ? "*HR Normalizer comments are required."
                        : " "
                    }
                    onChange={(e) => {
                      setNormalizerComments(e.target.value);
                      setMoveTab(true);
                      setnavPrompt(true);
                    }}
                    // variant="standard"
                    InputProps={{
                      // disableUnderline: true, // <== added this
                      readOnly: disableTextAfterSubmission
                    }}
                  />
                </Tf3>
              </div>
              <div style={{ marginBottom: "20px" }}>
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    // paddingTop: "20px",
                    marginBottom: "6px",
                    fontFamily: "Arial"
                  }}
                >
                  <b>HR Normalizer discussed the rating with</b><span style={{
                    fontSize: "22px",
                  }}>*</span>
                </Typography>
                {/* <span style={{
                  fontSize: "22px",
                }}>*</span> */}
                <FormGroup>
                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      },
                    }}
                    control={
                      <Checkbox
                        disabled={disableTextAfterSubmission}
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "18px !important",
                          },
                        }} checked={appraiser} name="Appraiser" onChange={handleAppraiserCheck} />
                    }
                    label="Appraiser*"
                  />
                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      },
                    }}
                    control={
                      <Checkbox
                        disabled={disableTextAfterSubmission}
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "18px !important",
                          },
                        }} checked={reviewer} name="Reviewer" onChange={handleReviewerCheck} />
                    }
                    label="Reviewer  *"
                  />
                  <FormControlLabel
                    sx={{
                      "& .MuiFormControlLabel-label": {
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                      },
                    }}
                    control={
                      <Checkbox
                        disabled={disableTextAfterSubmission}
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: "18px !important",
                          },
                        }} checked={employee} name="Employee" onChange={handleEmployeeCheck} />
                    }
                    label="Employee   *"
                  />

                </FormGroup>
              </div>


              {/* <div style={{ marginBottom: "20px" }}>  */}
              <div >
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    // paddingTop: "20px",
                    marginBottom: "10px",
                    fontFamily: "Arial"
                  }}
                >
                  <b>HR Normalizer Meeting Notes</b><span style={{
                    fontSize: "22px",
                  }}>*</span>
                </Typography>
                <Tf3>
                  <TextField
                    fullWidth
                    multiline
                    size="small"
                    placeholder="Add"
                    value={meetingNotes}
                    // inputProps={{ maxLength: 500 }}
                    error={!meetingNotes && textfieldError}
                    helperText={
                      !meetingNotes && textfieldError
                        ? "*HR Normalizer meeting notes are required."
                        : " "
                    }
                    onChange={(e) => {
                      setMeetingNotes(e.target.value);
                      setMoveTab(true);
                      setnavPrompt(true);
                    }}
                    // variant="standard"
                    InputProps={{
                      // disableUnderline: true, // <== added this
                      readOnly: disableTextAfterSubmission
                    }}
                  />
                </Tf3>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    // paddingTop: "20px",
                    marginBottom: "10px",
                    fontFamily: "Arial"
                  }}
                >
                  <b>HR Normalizer Attachment</b><span style={{
                    fontSize: "22px",
                  }}>*</span>
                </Typography>

                <Stack>
                  <div style={{ paddingLeft: "20px" }}>
                    <Stack direction="row" alignItems="center" gap="5px">
                      <span>
                        <input
                          //@ts-ignore
                          // style={styles.colors}
                          id="photo1"
                          name="photo1"
                          type="file"
                          title={meetingNoteFileName}
                          ref={inputRef}
                          style={{ display: "none" }}
                          multiple={false}
                          onChange={(e) => {
                            handleMeetingNotesImageChange(e);
                            setMoveTab(true);
                            setnavPrompt(true);
                          }}
                        />
                      </span>
                      <IconButton>
                        <img
                          src={Uploadatt}
                          onClick={(e: any) => {
                            if (!disableTextAfterSubmission) {
                              handleClickMeetingNoteOpenAttachment(e);
                            }
                          }}
                        />
                      </IconButton>

                      <Typography
                        sx={{
                          fontSize: "14px",
                          color: "#7a7a7a",
                          fontFamily: "arial",
                        }}
                      >
                        {meetingNoteFileName || employeeData?.data?.normalizer?.meetingNotesAttachments[0]?.name}
                      </Typography>
                      <Text>
                        {meetingAttachmentHide && (
                          <IconButton
                            onClick={() => {
                              // setFileSelected('')
                              // setName('')
                              if (!disableTextAfterSubmission) {
                                resetMeetingNoteFileInput();
                              }
                            }}
                            style={{ cursor: disableTextAfterSubmission ? "default" : "pointer" }}
                          >
                            <img src={Removeattnew} alt="icon" />
                          </IconButton>
                        )}
                      </Text>
                    </Stack>
                  </div>
                </Stack>
              </div>
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
                        {" "}
                        <b>One-to-One Meeting Date</b>
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "arial",
                          color: "#333333",

                        }}
                      >
                        <Tf1>
                          <TextField
                            fullWidth
                            InputProps={{ readOnly: true, }}
                            multiline
                            inputProps={{ maxLength: 500 }}
                            size="small"
                            value={One_To_One_Meeting_Date}
                          />
                        </Tf1>
                      </Typography>
                    </div>
                  </>
                )}


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
                {employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer") &&
                  <>
                    <Button
                      // disabled={disableAccept}
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        height: "35px",
                        // width: "70px",
                        background: "transparent",
                        ...((disableButtons || employeeDataIsFetching) && {
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
                    <Button
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
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
                      onClick={() => {
                        submitHandler();
                      }}
                    >
                      Save and Submit
                    </Button>
                    {/* <Link to={"/dashboardreview"}> */}
                    <Button
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        height: "35px",
                        width: "70px",
                        background: "transparent",
                        ...((disableButtons || employeeDataIsFetching) && {
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
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                        height: "35px",
                        width: "70px",
                        background: "transparent",
                        ...((disableButtons || employeeDataIsFetching) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),
                      }}
                      variant="outlined"
                      onClick={() => CancelButtonHandler()}
                    >
                      Cancel
                    </Button>
                  </>
                }
                {/* </Link> */}
              </Stack>

              {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
              <AlertDialogOkCancelForUnsavedChanges
                isAlertOpen={openCancelDialog}
                handleAlertClose={rejectCancelButtonHandler}
                handleAlertIdClose={acceptCancelButtonHandler}
              >
              </AlertDialogOkCancelForUnsavedChanges>


            </TabPanel>
            <Dialog
              // fullScreen={fullScreen}
              open={openSaved}
              // onClose={handleCloseSaved}
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
                  {/* Changes were successfully saved. */}
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
            <AlertDialogSuccess
              isAlertOpen={openValidation}
              handleAlertClose={handleValidationClose}>
              {message}
            </AlertDialogSuccess>

            <Dialog
              // fullScreen={fullScreen}
              open={openSubmit}
              // onClose={handleCloseSubmit}
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
                  {/* Changes were successfully saved. */}
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

            {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
            <AlertDialogOkCancelForUnsavedChanges
              isAlertOpen={cancelRatingsAlert}
              handleAlertClose={handleCloseCancelRatingsAlert}
              handleAlertIdClose={handleCancelRatingsAlert}
            >
            </AlertDialogOkCancelForUnsavedChanges>


            <Dialog
              open={openYes}
              // onClose={handleAlertNo}
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
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>

                <DialogContentText
                  id="alert-dialog-description"
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


              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={0}
              // paddingBottom="30px"
              >
                <DialogActions style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3E8CB5",
                      background: "transparent",
                      width: "70px",
                      height: "35px"
                    }}
                    variant="outlined"
                    onClick={handleAlertYes}
                  >
                    Yes
                  </Button>
                </DialogActions>
                <DialogActions style={{ display: "flex", justifyContent: "center" }}>

                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3E8CB5",
                      background: "transparent",
                      width: "70px",
                      height: "35px"
                    }}
                    variant="outlined"
                    onClick={handleAlertNo}
                    autoFocus
                  >

                    No

                  </Button>
                </DialogActions>
              </Stack>

            </Dialog>
          </Box>
        </Box>
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
