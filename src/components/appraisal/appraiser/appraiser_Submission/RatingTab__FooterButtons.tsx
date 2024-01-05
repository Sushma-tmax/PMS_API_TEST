import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import {
  ArrowBackIosRounded,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";

import {
  Avatar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tabs,
  Tab,
  Tooltip,
  Select,
  MenuItem,
  Snackbar,
  Alert
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import Infowhiteicon from "../../../../assets/Images/Infowhiteicon.svg";
import Eye from "../../../../assets/Images/Eye.svg";
import DialogTitle from "@mui/material/DialogTitle";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Uploadatt from "../../../../assets/Images/Uploadatt.svg"
// import {
//   MIDYEAR_PA_REPORT,
//   MIDYEAR_PERFORMANCE,
//   MIDYEAR_REJECT_RATING,
//   MIDYEAR_SUCCESS,
// } from "../../constants/routes/Routing";
import Removeattnew from "../../../../assets/Images/Removeattnew.svg";
import Thumsup from "../../../../assets/Images/Thumsup.svg";
import Thumsdown from "../../../../assets/Images/Thumsdown.svg";
import thumbsdown_colored from "../../../../assets/Images/Thumbsdowncolored.svg";
import Edit from "../../../../assets/Images/Edit.svg";
import Command from "../../../../assets/Images/Command.svg";
// import Header from "../Header";
import { useEffect, useState } from "react";
import {
  useAttachmentsAppraiserMutation,
  useCreateEmployeeAppraisalMutation,
  useGetEmployeeAppraisalQuery,
  useGetEmployeeQuery,
  useGetObjectiveTitleQuery,
  useGetRatingScaleQuery,
  useAttachmentsReviewerDeleteMutation,
  useUpdateEmployeeAppraisalMutation,
  useReviewerRejectionMutation,
  useAttachmentsRejectionAppraiserMutation,
  useAttachmentsRejectionAppraiserDeleteMutation
} from "../../../../service";
import { EMPLOYEE_PREVIOUS_PAs } from "../../../../constants/routes/Routing";
import { useAppraiserRejectsNormalizerContext } from "../../../../context/AppraiserRejectsNormalizer";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import {
  useAttachmentsAppraiserDeleteMutation,
  useAttachmentsNormalizerDeleteMutation,
} from "../../../../service";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import Close from "../../../../assets/Images/Close.svg";
import Newtickicon from "../../../../assets/Images/Newtickicon.svg";
import Closeiconred from "../../../../assets/Images/Closeiconred.svg";
// import Removeatt from "../../../../assets/Images/Removeatt.svg";
import Downloadatt from "../../../../assets/Images/Downloadatt.svg";
// import Removeatt from "../Icons/Removeatt.svg"
import { Scrollbar } from "react-scrollbars-custom";
import AlertYesNo from "../../../UI/DialogYesNo";
import { useAppraiserAcceptNormalizerMutation } from "../../../../service/employee/appraisal/appraisal";
import AlertDialogSuccess from "../../../UI/DialogSuccess";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { APPRAISER_RESUBMITS_REVIEWER_REJECTION, APPRAISER_RESUBMITS_NORMALIZER_REJECTION } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Appraiser";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import { APPRAISER_VIEW_PA } from "../../../../constants/routes/Routing";
import { makeStyles } from "@mui/styles";
//styles for snackbar
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

const RatingBackground = styled("div")({
  width: "27px",
  lineHeight: "27px",
  borderRadius: "50%",
  display: "block",
  // color: "white",  background: "red",
});

// import { useAppraiserAcceptNormalizerMutation} from "../../../../service";
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item2 = styled("div")(({ theme }) => ({
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "450px",
  margin: "1rem",
  marginBottom: "0px",
}));

const Footer = styled("div")({
  //marginLeft: "120%",
  paddingTop: "10px",
  paddingBottom: "30px",
});

const Root = styled("div")(
  ({ theme }) => `
  table {
    // font-family: IBM Plex Sans, sans-serif;
    border-collapse: separate;
    border-spacing: 0px 15px;
    width: 100%;
    
  }

  td,
  th {
    // border: 1px solid #e0e0e0;
    text-align: left;
    // padding: 6px;
   
  }

  tr {
   
        border: 1px solid #80808014;
        box-shadow: 1px 0px 0px 1px #80808014;
        border-bottom:none;

    
  }
  `
);
const Name = styled("div")({
  fontSize: "17px",
  fontWeight: 400,
  color: "#3e8cb5",
  fontFamily: "Arial",
  textAlign: "left",
});
const Speciality = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  color: "#333333",
  opacity: 0.5,
  textAlign: "left",
});
const Pastratingvalue = styled("div")({
  fontSize: "12px",
  fontWeight: 400,
  opacity: 0.5,
  color: "#333333",
  // paddingTop:'2px',
  textAlign: "left",
  // paddingBottom: "5px",
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
  display: "flex",
  alignItems: "center"
  // fontWeight: 400,
  // color: "#3e8cb5",
  //opacity: 0.5,
  //textAlign: 'left'
  // marginTop:'10px'
});
const Overallratingcomments = styled("div")({
  fontSize: "14px",
  fontWeight: 400,
  color: "#333333",
  opacity: 0.8,
  //textAlign: 'left'
  //marginTop:'10px'
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
const Text = styled("div")({
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
const Containnn = styled("div")({
  // marginRight: "20px",
  marginTop: '10px',
  // width: '1200',
  paddingTop: '0px',
  paddingBottom: "20px",
  paddingRight: "33px"

});
const Tf1 = styled('div')({
  // marginLeft: "58px",
  // marginRight: "58px",
  marginTop: "5px",
  fontSize: '13x',
  // width: "92.6%",
  backgroundColor: "white",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    //   width:"93%",
    fontWeight: "400",
    textTransform: "none",
    // padding: "4px",
    textAlign: "left"
  },
  "& .MuiTextField-root": {
    // color: "#333333",
    // fontSize: "13px",
    // fontWeight: "400",
    // textTransform: "none",
    // padding: "8px",
    width: "100%",
  },
});
const TrainingRecommendations = styled("div")({
  // marginLeft: "58px",
  // marginTop: '10px',
  color: "#717171",
  fontSize: '16px',
  fontFamily: "arial"
});
export default function NormalizerRating(props: any) {
  const classes = useStyles();

  // @ts-ignore
  const { empData: employeeData, employee_id, acceptButton, appraiserOverallFeedback, trainingRecommendationFormValues, setacceptButton, rejectButton, setrejectButton, overallFeed, areaImprovement, potentialValue, checkboxIdHandler, checkboxHandler, otherRecommendation, setPotentialValue, setNormalizerOverallFeedComments, normalizerOverallFeedComments, employeeDataIsFetching, keepSamePotential, setKeepSamePotential, reviewedOverallFeedback, setReviewedOverallFeedback, emailData, appraiserOverallFeedComments, setappraiserOverallFeedComments, refetchEmployeeData, disableTextAfterSubmission, OtherRecommendationothers, otherscheckbox, disableButtons, setDisableButtons } = useAppraiserRejectsNormalizerContext()
  const { navPrompt, setnavPrompt, value, setValue, handleChange, appraisalData, moveTab, setMoveTab } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  // const [objectiveDescription, setObjectiveDescription] = useState<any>([]);
  const [anchorPotentialInfo, setAnchorPotentialInfo] = React.useState<HTMLButtonElement | null>(null);
  const openPotentialInfo = Boolean(anchorPotentialInfo);
  const idPotentialInfo = openPotentialInfo ? "simple-popover" : undefined;
  const [normalizedRating, setNormalizedRating] = useState(0)
  console.log(appraisalData, employeeData, "appraisalData");

  const {
    employee1Data,
    training1Data,
    other1Data,
    mutation,
    calendarData,
    // ratingScaleData,
    objectiveDescription,
    setObjectiveDescription
  } = props;
  const { data: empData } =
    useGetEmployeeAppraisalQuery(employee_id);
  const { data: ratingsData } = useGetRatingScaleQuery("");
  const [addPotential] = useUpdateEmployeeAppraisalMutation();
  // const {data:ratingScaleData} = useGetRatingScaleQuery("")
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: empData?.data?.employee_code })

  // const {data: employeeData} = useGetEmployeeAppraisalQuery('6204935ebca89023952f2da9')
  const CustomScrollbar = Scrollbar as any;
  const [previousRating, setPreviousRating] = useState<any>("");
  const [appraiserNewRatingId, setAppraiserNewRatingId] = useState<any>("");
  const [appraiserNewRating, setAppraiserNewRating] = useState<any>("");
  console.log(employeeData, "my test");
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [acceptNormalizer] = useAppraiserAcceptNormalizerMutation();
  const [deleteRejectionAppraiserMutation, { isLoading: isRejectionDeleting, data: deleteRejection }] =
    useAttachmentsRejectionAppraiserDeleteMutation()
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [comments, setComments] = useState("");
  const [resubmissionComments, setResubmissionComments] = useState("");
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [updateObjectiveDescription , {isLoading : isUpdatingRating}] = useUpdateEmployeeAppraisalMutation();
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [deleteNormalizerMutation, { isLoading: delete1, data: deleted }] =
    useAttachmentsNormalizerDeleteMutation();
  const [deleteReviewerMutation, { isLoading: deletess, data: deleteds }] =
    useAttachmentsReviewerDeleteMutation();
  const [name, setName] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<any>("");
  const [sendItem, { data }] = useCreateAzureBlobMutation();
  const { data: nineBoxData } = useGetNineboxQuery("");

  // const [popoverIndex, setPopoverIndex] = useState("")
  const [popoverIndex1, setPopoverIndex1] = useState("");
  const [popoverIndex2, setPopoverIndex2] = useState("");
  const [upDateReviewer] = useReviewerRejectionMutation();

  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }

  const [updateMutation, { isLoading: isUploading }] = useCreateEmployeeAppraisalMutation();
  console.log(isUploading, "isUploading");
  const [accept, setAccept] = useState("");
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);

  const [appraiserRejectionAttachmentsFiles, setAppraiserRejectionAttachmentsFiles] = useState<any>([])
  const [attachmentsAppraiser] = useAttachmentsAppraiserMutation();
  const [rejectionAttachmentsAppraiser] = useAttachmentsRejectionAppraiserMutation()
  const [ratingResubmitted, setRatingResubmitted] = useState(false)
  const handleacceptChange = (event: any) => {
    setAccept(event.target.value as string);
  };
  const [submit, setSubmit] = useState(false);

  const [ratingComments, setRatingComments] = useState<any>("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  // previous rating
  const [anchorPreviousRatingPopOver, setAnchorPreviousRatingPopOver] = React.useState<HTMLElement | null>(null);
  const openPreviousRating = Boolean(anchorPreviousRatingPopOver);
  const id_Previous_Rating = openPreviousRating ? "simple-popover" : undefined;
  const [openYesReject, setOpenYesReject] = useState(false);
  const [reviewerRejected, setReviewerRejected] = useState<any>(false);
  const [positionHide, setpositionHide] = useState<any>(false);
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  const [potential, setPotential] = React.useState<any>(
    employeeData?.data?.appraisal?.potential
  );
  const [activeEmployee, setActiveEmployee] = useState("");
  const [updateLoggedRole] = useCheckRoleLogsMutation()


  const handleClickAppraiserDetails = (event: any, j: any) => {
    console.log(j, "appdetails");
    setRatingComments(
      employeeData &&
      employeeData.data.appraisal.objective_description
        .filter((i: any) => i.name._id === j.name._id)
        .map((k: any) => k.comments)[0]
    );
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
    setAnchorEl(event.currentTarget);
    // setRatingComments(j.comments)
  };
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [anchorE10, setAnchorE10] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClose = () => {
    setAnchorEl(null);
    setRatingComments(null);
  };
  const handleClose4 = () => {
    setAnchorE10(null);
  };
  // const handleClose4 = () => {
  //     setAnchorE(null)
  // };
  const handleSubmit = () => {
    setOpen(true);
  };

  const openAppraiserDetails = Boolean(anchorEl);
  const [ratingComments1, setRatingComments1] = useState<any>("");
  const [appraiserAttachmentss, setappraiserAttachmentss] = useState<any>("");
  const [reviewerAttachmentss, setreviewerAttachmentss] = useState<any>("");
  const [isAlertOpen, setisAlertOpen] = React.useState(false);
  const [changePotentialAlert, setChangePotentialAlert] = React.useState(false);
  const [isAlertOpen1, setisAlertOpen1] = React.useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [moveToRatingTab, setMoveToRatingTab] = useState(false);
  const [keepSameRatingAlert, setKeepSameRatingAlert] = useState(false)


  const [anchorElNormalizer, setAnchorElNormalizer] =
    React.useState<HTMLButtonElement | null>(null);
  const [normalizerAttachmentss, setnormalizerAttachmentss] = useState<any>("");
  const handleClickNormalizerDetails = (event: any, j: any) => {
    setRatingComments1(
      employeeData &&
      employeeData?.data?.normalizer?.objective_description
        .filter((i: any) => i?.name?._id === j?.name?._id)
        .map((k: any) => k?.comments)[0]
    );
    // setnormalizerAttachmentss(
    //     employeeData &&
    //     employeeData?.data?.normalizer?.attachments
    //         .filter((i: any) => i?.objective_description === j.name._id)
    //         .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    // );
    setAnchorElNormalizer(event.currentTarget);
  };
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open6 = Boolean(anchorEl6);
  const handleClickOpen6 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
    setnormalizerAttachmentss(
      employeeData &&
      employeeData?.data?.normalizer?.attachments
        .filter((i: any) => i?.objective_description === j?.name?._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k?.url}> {k?.name} </a>
              <br />
            </div>
          );
        })
    );
  };
  const handleClose6 = () => {
    setAnchorEl6(null);

    // setOpen2(false);
  };
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2(true);
    setAnchorEl7(event.currentTarget);
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
  };
  const handleClose7 = () => {
    setAnchorEl7(null);

    // setOpen2(false);
  };

  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [rejectionAnchor, setRejectionAnchor] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openRejection = Boolean(rejectionAnchor)
  const open8 = Boolean(anchorEl8);
  const idRejection = openRejection ? "simple-popover" : undefined;
  const handleClickRejectionAttachments = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRejectionAnchor(event.currentTarget);
  };
  const handleCloseRejectionAttachments = () => {
    setRejectionAnchor(null);
  };
  const id8 = open8 ? "simple-popover" : undefined;
  const handleClickOpen8 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2(true);
    setAnchorEl8(event.currentTarget);
    setreviewerAttachmentss(
      employeeData &&
      employeeData?.data?.reviewer?.attachments
        .filter((i: any) => i?.objective_description === j?.name?._id)
        .map((k: any) => {
          return (
            <div>
              <a href={k?.url}> {k?.name} </a>
              <br />
            </div>
          );
        })
    );
  };
  const handleClose8 = () => {
    setAnchorEl8(null);

    // setOpen2(false);
  };

  const getAppraiserRejectionAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.rejection_attachments
      .filter((i: any) => i?.objective_description == id)
      // .filter((i: any) => i?.objective_description === j.name._id)
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
  const handleCloseNormalizer = () => {
    setAnchorElNormalizer(null);
    setRatingComments1(null);
  };
  const openNormalizerDetails = Boolean(anchorElNormalizer);

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData?.data?.normalizer?.objective_type?.find(
        (item: any) => item?.name?._id === id
      );
    }
  };

  const [comments1, setComments1] = useState('');

  useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)))
    setNormalizerOverallFeedComments(comments1)

  }, [comments1]);
  const handleCommentsChange = (e: any) => {
    // console.log(e);
    setComments1(e.target.value)
    // setnavPrompt(true)
  }
  const handleAppraiserCommentsChange = (e: any) => {
    // console.log(e);
    setappraiserOverallFeedComments(e.target.value)
    // setnavPrompt(true)
  }
  console.log(appraiserOverallFeedComments, "appraiserOverallFeedComments")
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
        return employeeData?.data?.appraisal?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
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

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // setnavPrompt(true);
    // setRatingAppraiser("");
    // setratingparams("");
    setAppraiserNewRatingId("");
    setAppraiserNewRating("");
  };
  //disabling button
  useEffect(() => {
    let temp = objectiveDescription.filter((i: any) => {
      return i.rating_rejected === true;
    });
    if (temp?.length > 0) {
      //setobjectiverating(true)
      setacceptButton(true);
      setrejectButton(false);
    } else if (temp?.length === 0) {
      setacceptButton(false);
      setrejectButton(true);
    } else {
      //setobjectiverating(false)
      setrejectButton(false);
      setacceptButton(false);
    }
    console.log(temp.length, "temp1");
  }, [objectiveDescription]);

  // withdrawbutton
  const WithDrawHandler = () => {
    closeDrawer();
    let previousRatingData = employeeData.data.appraisal_previous_submission.objective_description
      .filter((i: any) => i.name === activeObjectiveDescriptionName)
      .map((k: any) => {
        return {
          ratings: k.ratings,
          rating_rejected: k.rating_rejected,
          rejection_reason: k.rejection_reason ? k.rejection_reason : "",
          rating_resubmitted: k.rating_resubmitted ? k.rating_resubmitted : false,
        }
      })[0];

    let appraiserObjectiveDescription = employeeData?.data?.reviewer?.objective_description;
    const getRatings = (id: any) => {
      let rating = appraiserObjectiveDescription?.find((item: any) => item.name._id == id)
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
      // rating_resubmitted: previousRatingData.rating_resubmitted,
      action_performed: false,
      // comments: tempComments,
      rejection_reason: previousRatingData.rejection_reason,
      rating_comments: "",
      current_objective_description: current_objective_description,
      id: employee_id,
    });
    setnavPrompt(false);
    setAppraiserNewRatingId("");
    setAppraiserNewRating("")
    setComments("");
  };
  // console.log(c)
  //disabling button


  const [title, setTitle] = useState<any>("");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const openDrawerHandler = (objective: any) => {
    let previousRatingValue = employeeData?.data?.appraisal_previous_rating?.objective_description
      ?.filter((i: any) => i.name === objective.name._id)
      ?.map((k: any) => {
        let tempRating = ratingsData?.data?.find((item: any) => k?.ratings == item?._id)
        if (tempRating) return tempRating?.rating;
      })[0];

    let normalizerRating = employeeData?.data?.normalizer?.objective_description
      ?.filter((i: any) => i.name._id === objective.name._id)
      ?.map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];

    setNormalizedRating(normalizerRating);
    setPreviousRating(previousRatingValue);
    setName("")
    setTitle(objective?.name?.objectiveTitle);
    setAccept("Reject");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.rejection_reason);
    setResubmissionComments(objective.comments)
    setAppraiserNewRatingId(objective.ratings._id);
    if (objective.rating_rejected == true && objective.action_performed == true) {
      setShowWithdraw(true);
      setAppraiserNewRatingId(objective.ratings._id);
      setAppraiserNewRating(objective.ratings.rating);
    } else {
      setShowWithdraw(false);
      setAppraiserNewRatingId("");
      setAppraiserNewRating("");
    }
  };

  const [showReason, setShowReason] = useState(false);
  const [showReasonReviewer, setShowReasonReviewer] = useState(false);




  const openDrawerHandlerNO = (objective: any) => {
    // setnavPrompt(true);
    setAccept("Accept");
    openDrawer();
    setName("")
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.rejection_reason);
    setAppraiserNewRatingId(objective.ratings._id);
    let reviewerRatingValue = employeeData.data.reviewer.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    let reviewerRatingValue1 =
      employeeData.data.normalizer.objective_description
        .filter((i: any) => i.name._id === objective.name._id)
        .map((k: any) => {
          if (k.ratings) return k.ratings.rating;
        })[0];
  };

  const acceptHandler = () => {
    // setActiveObjectiveDescriptionName(objective.name._id)
    // setActiveObjectiveDescription(objective._id)
    // setComments(objective.comments)
    // setAppraiserNewRatingId(rating)

    // ratingSubmitHandler()
    let temp = employeeData.data.normalizer.objective_description
      .filter((i: any) => i._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];
    // setnavPrompt(true);
    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      action_performed: true,
      rejection_reason: comments,
      id: employee_id,
    });
    closeDrawer();
    // closeDrawer();
    setComments("");
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
      rejectionAttachmentsAppraiser({
        attachments: {
          url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id
      }).then((res: any) => {
        console.log(res, 'resssssssssssss')
      });
    });
  };

  console.log(ratingsData, "rating");
  //slider validation
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState("");
  const [allFieldMandatory, setAllFieldMandatory] = useState(false)
  const [open, setOpen] = useState<any>(false);
  const [message, setMessage] = useState<any>("");
  const [message1, setMessage1] = useState<any>("");
  const [message2, setMessage2] = useState<any>("");

  const [open33, setOpen3] = useState<any>(false);

  const [appraiserComments, setAppraiserComments] = useState<any>("");
  const [appraiserComments1, setAppraiserComments1] = useState<any>();

  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo101 = Boolean(anchorEl01);

  const id101 = openInfo101 ? "simple-popover" : undefined;

  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);
    //setAnchorEl01(anchorEl01 ? null : event.currentTarget);
  };
  const handlemessage3 = () => {
    setOpen3(false);
  }
  const handleClose101 = () => {
    setAnchorEl01(null);
  };
  const navigate = useNavigate();
  const [anchorEl02, setAnchorEl02] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo102 = Boolean(anchorEl02);

  const id102 = openInfo102 ? "simple-popover" : undefined;

  const handleClickInfo12 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl02(anchorEl02 ? null : event.currentTarget);
  };
  const handleClose102 = () => {
    setAnchorEl02(null);
  };

  const [anchorE2, setAnchorE2] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClose2 = () => {
    setAnchorE2(null);
  };
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE2(event.currentTarget);
  };
  const handleClick4 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE10(event.currentTarget);
  };
  const open2 = Boolean(anchorE2);
  const id2 = open2 ? "simple-popover" : undefined;

  const open10 = Boolean(anchorE10);
  const id10 = open10 ? "simple-popover" : undefined;

  const [anchorE3, setAnchorE3] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClose3 = () => {
    setAnchorE3(null);
  };
  const handleClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE3(event.currentTarget);
  };

  const handleClickPotentialInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorPotentialInfo(event.currentTarget);
  };

  const handleClosePotentialInfo = () => {
    setAnchorPotentialInfo(null);
  };



  console.log(moveTab, 'movetabbbb')

  const open3 = Boolean(anchorE3);
  const id3 = open3 ? "simple-popover" : undefined;

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
  //     }
  //     else if ((item?.rating >= 2.5 && item?.rating <= 2.99) && (Overall_rating >= 2.5 && Overall_rating <= 2.99)) {
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

  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(null);
  //   const handleClose = () => {
  //     setAnchorE(null);
  //   };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE(event.currentTarget);
  };

  //   const open = Boolean(anchorE);
  const id = open ? "simple-popover" : undefined;
  const open4 = Boolean(anchorE);
  // const id = open4 ? "simple-popover" : undefined;
  // useEffect(() => {
  //     setratingparams(ratingAppraiser);
  // }, [ratingAppraiser]);
  const [anchorEls6, setAnchorEls6] = React.useState<HTMLButtonElement | null>(null);
  const openInfo6 = Boolean(anchorEls6);
  const id6 = openInfo6 ? "simple-popover" : undefined;
  const handleClickInfo6 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls6(event.currentTarget);
  };
  const handleCloseInfo6 = () => {
    setAnchorEls6(null);
  };
  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setrejectAlertMessage("");
    // setratingparams("");

    // setratingparams('')
  };
  const handleSliderDialogClose1 = () => {
    setAllFeedMandatory(false);
    // setMessage2("");
    // setratingparams('')
  };
  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    if (employeeData?.data?.employee?.employee_status !== "rejected" && (previousRating === j.rating)) {
      setrejectAlert(true);
      setrejectAlertMessage(
        // "You cannot put the same rating as the Reviewer. Please change the rating."
        "You cannot select the same rating as the previous rating. Please change the rating."
      );

    } else {
      if (j) setAppraiserNewRatingId(j._id);
      // setratingSelection(true);
    }
  };
  const ratingSubmitHandler = () => {
    setFileSelected("")
    if (appraiserNewRating === null ||
      appraiserNewRating === "" ||
      appraiserNewRating === undefined) {
      setrejectAlertMessage("Please select a rating to reject.");
      setrejectAlert(true);
    }
    else if (employeeData?.data?.employee?.employee_status !== "rejected" && (previousRating == appraiserNewRating)) {
      // setrejectAlertMessage("")
      setrejectAlertMessage(
        // "You cannot put the same rating as the Reviewer. Please change the rating."
        // "You cannot select the same rating as the Reviewer. Please change the rating."
        "You cannot select the same rating as the previous rating. Please change the rating."
      );
      setrejectAlert(true);
      // } 
      // else if (resubmissionComments == null || resubmissionComments == undefined || resubmissionComments == "") {
      //   setrejectAlertMessage("Please add comments.");
      //   setrejectAlert(true);
    }
    //  else if (comments == null || comments == undefined || comments == "") {
    //   setrejectAlertMessage("Please add rejection reason.");
    //   setrejectAlert(true);
    // }
    else if ((resubmissionComments?.trim() == "" || resubmissionComments?.trim() == undefined) && ((appraiserNewRating < 3) || (appraiserNewRating >= 4))) {
      setrejectAlertMessage("It is mandatory to provide a justification for the rating below 3, and 4 and above.");
      setrejectAlert(true);
    }
    else {
      //setnavPrompt(true) 
      closeDrawer();
      setOpen(false);
      setMessage("");
      let normalizerRatingValue =
        employeeData?.data?.normalizer?.objective_description
          .filter((i: any) => i?.name?._id == activeObjectiveDescriptionName)
          .map((j: any) => {
            if (j?.ratings?.rating !== appraiserNewRatingId) {
              return true
            } else return false
          })[0]

      let current_objective_description = employeeData?.data?.current_rating?.objective_description?.map(
        (item: any) => {
          if (item.name._id === activeObjectiveDescriptionName) {
            return {
              ...item,
              ratings: appraiserNewRatingId,
            }
          } else return item
        }
      )

      //// to save all appraiser comments in every save function
      let mappedObjectiveDescription = objectiveDescription?.map((item: any) => {
        if (item.name._id === activeObjectiveDescriptionName) {
          return {
            ...item,
            ratings: appraiserNewRatingId,
            rejection_reason: comments?.trim(),
            //  comments: item.rating_resubmitted ?resubmissionComments : item.comments ,
            comments: resubmissionComments?.trim(),
            rating_rejected: true,
            action_performed: true,
            rating_accepted: false,
            // rating_resubmitted: normalizerRatingValue,
          }
        } else return item
      })

      let pendingStatus = "";
      if (employeeData?.data?.reviewer?.reviewer_status == "rejected") {
        pendingStatus = "Pending with Appraiser (Reviewer Rejection)"
      } else if (employeeData?.data?.normalizer?.normalizer_status == "rejected") {
        pendingStatus = "Pending with Appraiser (HR Normalizer Rejection)"
      } else {
        pendingStatus = "Pending with Appraiser"
      }

      updateObjectiveDescription({
        "appraisal.objective_description": mappedObjectiveDescription,
        "appraisal.pa_status": pendingStatus,
        "appraisal.appraiser_status": "draft",
        // "appraisal.appraiser_rejected": true,
        "current_rating.objective_description": current_objective_description,
        "appraisal.potential": potentialValue,
        id: employee_id,
      })
      if (name && fileSelected) {
        return imageClick();
      }
      // setRatingAppraiser("");
      // setComments()
    }
  };

  //slider validation
  // rating hower
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEls);
  // const id2 = openInfo ? "simple-popover" : undefined;
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEls(null);
  };
  // rating hower

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }


  useEffect(() => {
    setAppraiserComments(() => {
      return employeeData?.data?.appraisal?.objective_description?.map(
        (i: any) => {
          return {
            ...i,
            comments: i?.comments,
            ratings: i?.ratings?._id,
            objective_title: findObjectiveTitleById(i?.name?.objective_title),
            objective_type: findObjectiveTypeById(i?.name?.objective_type),
          };
        }
      );
    });
  }, []);


  const appraiserRatingsHandler = (j: any, ratingId: any) => {
    setAppraiserComments(() => {
      return appraiserComments.map((i: any) => {
        return i._id === j._id
          ? {
            ...i,
            ratings: ratingId,
          }
          : i;
      });
    });
    console.log(appraiserComments, "appraiserCommentsRating");
  };

  // function to change appraiser comments added on 23/2/2023

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

  useEffect(() => {
    if (employeeData) {
      console.log(employeeData?.data?.appraisal?.potential);
      setActiveEmployee(employeeData.data._id);
      setPotential(employeeData?.data?.appraisal?.potential);
      setAppraiserRejectionAttachmentsFiles(() => {
        return employeeData?.data?.appraisal?.rejection_attachments.filter((item: any) => {
          if (item.name != "") return item;
        });
      })
    }
  }, [employeeData]);


  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setisAlertOpen(false);
    setisAlertOpen1(true);
  };


  let Ratingrejected = employeeData?.data?.appraisal?.objective_description?.map((item: any) => {
    return item?.rejection_reason
  })
  let filteredRatinggs = Ratingrejected.filter((item: string) => item !== "");
  const isFilteredArrayEmpty = filteredRatinggs.length === 0 ? false : true;
  console.log(isFilteredArrayEmpty, filteredRatinggs, "Ratingrejected")

  const [anchorEls66, setAnchorEls66] = React.useState<HTMLButtonElement | null>(null);
  const openInfo66 = Boolean(anchorEls6);
  const id66 = openInfo66 ? "simple-popover" : undefined;
  const handleClickInfo66 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls66(event.currentTarget);
  };
  const handleCloseInfo66 = () => {
    setAnchorEls66(null);
  };

  const handleAlertYes1 = () => {
    setisAlertOpen1(false);
    try {
      let appraiserObjDesc = employeeData?.data?.appraisal?.objective_description?.map(
        (i: any) => {
          return {
            ...i,
            action_performed: false,
          };
        }
      );


      let previousRating = employeeData?.data?.appraisal_previous_submission?.objective_description
        .map((item: any) => item)

      let trimAppraiserObjDesc = appraiserObjDesc?.map((item: any) => {
        return {
          ...item,
          comments: item?.comments?.trim()
        }
      });
      console.log("passed trimAppraiserObjDesc")
      let trimOverallFeedbackQuestionnaire = overallFeed?.map((item: any) => {
        return {
          ...item,
          value: item?.value?.trim()
        }
      });
      console.log("areaImprovement", areaImprovement);
      console.log("trainingRecommendationFormValues", trainingRecommendationFormValues)
      console.log("appraiserOverallFeedback", appraiserOverallFeedback)
      console.log("passed trimoverallfeedback")
      let areaValues = areaImprovement?.filter((item: any) => item?.value != "")?.map((item: any) => {
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
      console.log("passed areavalues")
      let trainingRecommendationValues = trainingRecommendationFormValues?.filter((item: any) => item.name != "").map((item: any) => {
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });
      console.log("passed trainingrecommendationvalues")
      let trimOtherFurtherRecommendation = OtherRecommendationothers?.trim();
      console.log("passed trim further recommendation")
      let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === true);

      if (filteredOtherRecommendations?.length > 0) {
        trimOtherFurtherRecommendation = "";
      }
      console.log("passed check 1", appraiserOverallFeedback?.trim())
      console.log("passed check 2", appraiserOverallFeedComments?.trim())

      let pendingStatus = employeeData?.data?.employee?.employee_status == "rejected" ? "Pending with Reviewer (Employee Rejection)" : "Pending with Reviewer"
      console.log("passed all checks")
      updateObjectiveDescription({
        "appraisal.objective_description": trimAppraiserObjDesc,
        "appraisal.potential": potentialValue,
        // "appraisal.pa_status": "Pending with Reviewer",
        "appraisal.pa_status": pendingStatus,
        "appraisal.pa_rating": employeeData?.data?.current_rating?.overall_rating,
        "appraisal.appraiser_rejected": isFilteredArrayEmpty,
        "appraisal.appraisal_acceptance": false,
        "appraisal_previous_submission.objective_description": trimAppraiserObjDesc,
        "appraisal_previous_submission.appraiser_rating": employeeData?.data?.appraisal?.appraiser_rating,
        "appraisal_previous_submission.potential": potentialValue,
        "appraisal_previous_submission.pa_status": pendingStatus,
        // "appraisal_previous_rating.objective_description": employeeData?.data?.appraisal_previous_submission?.objective_description,
        "appraisal_previous_submission.feedback_questions": trimOverallFeedbackQuestionnaire,
        "appraisal_previous_submission.area_of_improvement": areaValues,
        "appraisal_previous_submission.training_recommendation": trainingRecommendationValues,
        "appraisal_previous_submission.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)),
        "appraisal_previous_submission.others_checkbox": otherscheckbox,
        "appraisal_previous_submission.other_recommendation_others": trimOtherFurtherRecommendation,
        "appraisal_previous_submission.appraiser_overall_feedback": appraiserOverallFeedback?.trim(),
        "appraisal.appraiser_status": "accepted",
        "reviewerIsDisabled": false,
        "reviewerIsChecked": false,
        "reviewer.reviewer_status": 'pending',
        "appraisal.appraiser_rating": employeeData?.data?.current_rating?.overall_rating,
        "current_previous_submission.objective_description": employeeData?.data?.current_rating?.objective_description,
        "appraisal.appraiser_rejection_reason": appraiserOverallFeedComments?.trim(),
        "reviewer_previous_submission.objective_description": employeeData?.data?.reviewer?.objective_description,
        "appraisal.appraiser_PA_rejected": true,
        id: employee_id,
      }).then((res: any) => {
        if (!res.error) {
          updateLoggedRole({
            pa_action_by: `Appraiser (Resubmitted) (from Rating Tab) : ${new Date()}`,
            id: employee_id
          });
          setDisableButtons(false);
          //snackbar
          setSuccessAlertTrigerMSG("The performance appraisal was resubmitted to the Reviewer.")
          setSuccessAlertTriger(true)
        } else {
          updateLoggedRole({
            pa_action_by: `Appraiser (Resubmitted) (from Rating Tab) : ${res.error} : ${new Date()}`,
            id: employee_id
          })
          setMessage2("Something Went Wrong.")
          setOpen3(true)
        }
      });
    } catch (error) {
      console.log(error,"error in save and submit")
    }


    // Notification action after Appraiser submits PA to Reviewer after Normalizer rejection -(for Reviewer)
    let normalizerName = employeeData?.data?.normalizer_name;
    let appraiserName = employeeData?.data?.appraiser_name;
    let reviwerName = employeeData?.data?.reviewer_name;
    let employeeName = employeeData?.data?.first_name;
    let calendarName = employeeData?.data?.calendar?.calendar_type;
    let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
    let employeeCode = employeeData?.data?.employee_code;
    let reviewerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.firstName;

    if (employeeData?.data?.normalizer?.normalizer_PA_rejected == true) {
      let tempSubject = APPRAISER_RESUBMITS_NORMALIZER_REJECTION?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);


      let tempHtml = APPRAISER_RESUBMITS_NORMALIZER_REJECTION?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
      tempHtml = tempHtml?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
      tempHtml = tempHtml?.replace("[Reviewer FirstName]", `${reviewerFirstName}`);


      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let email = APPRAISER_RESUBMITS_NORMALIZER_REJECTION?.to;
      email = email?.replace("[email]", `${reviewerEmail}`);
      console.log(reviewerEmail, "reviewerEmail emailData")
      sendEmailNotification(
        {
          to: email,
          subject: tempSubject,
          html: tempHtml
        }
      )
    } else {
      let tempSubject = APPRAISER_RESUBMITS_REVIEWER_REJECTION?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);


      let tempHtml = APPRAISER_RESUBMITS_REVIEWER_REJECTION?.html;
      tempHtml = tempHtml?.replace("[Reviewer FirstName]", `${reviewerFirstName}`);
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
      tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
      tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);


      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let email = APPRAISER_RESUBMITS_REVIEWER_REJECTION?.to;
      email = email?.replace("[email]", `${reviewerEmail}`);
      sendEmailNotification(
        {
          to: email,
          subject: tempSubject,
          html: tempHtml
        }
      )
    }
  };

  const handleAlertNo = () => {
    // setOpenYes(false);
    setisAlertOpen(false);
    setMessage("");
    setValue(1);
  }
  const handleAlertNo1 = () => {
    setisAlertOpen1(false);
    setMessage("");
    setDisableButtons(false)
    // setValue(1);
  }

  const cancelHandler = () => {
    let appraiserActionPerformed = objectiveDescription?.filter((item: any) => item.action_performed)
    if (appraiserActionPerformed?.length > 0) {
      setOpenCancelDialog(true);
    } else if (navPrompt || moveTab) {
      setOpenCancelDialog(true);
    } else {
      navigate(`/dashboardreview`, { state: { from: `${1}` } })
    }
  }

  const rejectCancelButtonHandler = () => {
    setOpenCancelDialog(false);
  }

  const acceptCancelButtonHandler = () => {
    let previousData = {
      appraisal: employeeData?.data?.appraisal_previous_submission?.objective_description,
      reviewer: employeeData?.data?.reviewer_previous_submission.objective_description,
      current: employeeData?.data?.current_previous_submission.objective_description
    }
    addPotential({
      "appraisal.objective_description": previousData?.appraisal,
      "reviewer.objective_description": previousData?.reviewer,
      "current_rating.objective_description": previousData?.current,
      id: employee_id,
    }).then((res: any) => {
      if (!res.error) {
        setnavPrompt(false);
        setMoveTab(false);
        setOpenCancelDialog(false);
        refetchEmployeeData().then((res: any) => navigate(`/dashboardreview`, { state: { from: `${1}` } }));
      }
    })
  }

  const saveData = () => {
    let pendingStatus = "";
    if (employeeData?.data?.reviewer?.reviewer_status == "rejected") {
      pendingStatus = "Pending with Appraiser (Reviewer Rejection)"
    } else if (employeeData?.data?.normalizer?.normalizer_status == "rejected") {
      pendingStatus = "Pending with Appraiser (HR Normalizer Rejection)"
    } else {
      pendingStatus = "Pending with Appraiser"
    }

    let trimObjectiveDescription = objectiveDescription?.map((item: any) => {
      return {
        ...item,
        comments: item?.comments?.trim()
      }
    });

    return updateObjectiveDescription({
      "appraisal.objective_description": trimObjectiveDescription,
      // "appraisal.appraiser_status": "normalizer-rejected-draft",
      "appraisal.appraiser_status": "draft",
      "appraisal.pa_status": pendingStatus,
      "appraisal.status": "in-progress",
      "reviewer.status": "in-progress",
      "normalizer.status": "in-progress",
      "appraisal.potential": potentialValue,
      "current_previous_submission.objective_description": empData?.data?.current_rating?.objective_description,
      "appraisal.appraiser_rejection_reason": appraiserOverallFeedComments?.trim(),
      // reviewerIsDisabled: false,
      // reviewerIsChecked: false,
      // "reviewer.reviewer_status": "pending",
      id: employee_id,
    });

  }

  console.log(overallFeed, 'checkoverallfeedd')

  const submitButtonHandler = () => {

    setDisableButtons(true);
    /***** check validation for area of improvement fields**********/
    let isSpecificActionEmpty = areaImprovement?.filter((item: any) => {
      return item.value?.trim() !== ""
    }).filter((item: any) => {
      return item.specific_actions[0]?.value?.trim() === ""
    });
    let isSpecificAreaEmpty = areaImprovement?.filter((item: any) => {
      return item.specific_actions[0].value?.trim() !== ""
    }).filter((item: any) => {
      return item?.value?.trim() === ""
    });
    /***** check validation for area of improvement fields **********/


    /**************validation to check training recommendation fields**************/
    let trainingRecommendationCategoryNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.name != "")
      .filter((item: any) => item.justification?.trim() === "" || item.training_name?.trim() === "");
    let trainingRecommendationNameNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.training_name != "")
      .filter((item: any) => item.name == "" || item.justification?.trim() === "")
    let trainingRecommendationJustificationNotEmpty = trainingRecommendationFormValues.filter((item: any) => item.justification != "")
      .filter((item: any) => item.name == "" || item.training_name?.trim() === "")
    /**************validation to check training recommendation fields**************/

    /************validation to check if any overall feedback fields are empty *********************** */
    if (overallFeed?.filter((item: any) => item.value?.trim() == "")?.length > 0 || overallFeed?.length == 0) {
      setMessage("It is mandatory to add the overall feedback. Please visit the Overall Feedback page.")
      setAllFieldMandatory(true)
    } else if (trainingRecommendationCategoryNotEmpty?.length > 0 || trainingRecommendationNameNotEmpty?.length > 0 || trainingRecommendationJustificationNotEmpty?.length > 0) {
      setAllFieldMandatory(true)
      setMessage("Please add the missing details in the Training Recommendation.");
    } else if (isSpecificActionEmpty?.length > 0 || isSpecificAreaEmpty?.length > 0) {
      setAllFieldMandatory(true)
      setMessage("Please add the missing details in the Areas for Improvement.");
    } else if ((otherscheckbox == true && OtherRecommendationothers?.trim() == "") || (otherscheckbox == true && OtherRecommendationothers?.trim() == undefined)) {
      setMessage("It is mandatory to provide details when selecting \"Other\" option in Further Recommendations.")
      setAllFieldMandatory(true)
    } else if (objectiveDescription) {
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
            setOpen(true);
            setMessage(Message);
          }
          else {
            // setMessage("Did you review the recommendations ?") 
            updateObjectiveDescription({
              "appraisal.objective_description": objectiveDescription,
              "appraisal.potential": potentialValue,
              id: employee_id,
            });
            setMoveTab(false);
            setOpen(false);
            setnavPrompt(false)
            if (objectiveDescription?.filter((item: any) => item.action_performed)?.length == 0) {
              setKeepSameRatingAlert(true);
              setMessage("Would you like to keep the same ratings?")
            } else if (!keepSamePotential && empData?.data?.appraisal_template?.potential === true && empData?.data?.employee?.employee_status !== "rejected") {
              setChangePotentialAlert(true);
              setMessage(`Would you like to keep the same potential level as ${potentialValue}?`)
            } else {
              setisAlertOpen1(true)
            }
          }
        }
      })
    }
  }

  const handlePotentialChange = () => {
    setChangePotentialAlert(false);
    setDisableButtons(false);
  }

  const handleKeepSamePotential = () => {
    setKeepSamePotential(true);
    setChangePotentialAlert(false);
    setMessage(false);
    setisAlertOpen1(true);
  }

  const handleKeepSameRatings = () => {
    setKeepSameRatingAlert(false);
    setMessage("");
    if (!keepSamePotential && empData?.data?.appraisal_template?.potential === true && empData?.data?.employee?.employee_status !== "rejected") {
      setChangePotentialAlert(true);
      setMessage(`Would you like to keep the same potential level as ${potentialValue}?`)
    } else {
      setisAlertOpen1(true);
    }
  }

  const handleRatingsChange = () => {
    setKeepSameRatingAlert(false);
    setAllFieldMandatory(true);
    setMoveToRatingTab(true);
    setMessage("Please change your ratings.");
  }

  const allFieldMandatoryClose = () => {
    if (moveToRatingTab == true) {
      setAllFieldMandatory(false);
      setMessage("");
      setValue(0);
      setDisableButtons(false);
    } else {
      setValue(1);
      setAllFieldMandatory(false);
      setMessage("");
      setDisableButtons(false)
    }
  }


  const saveHandler = () => {
    setDisableButtons(true);
    saveData().then((j: any) => {
      if (!j.error) {
        setMoveTab(false);
        setDisableButtons(false);
        setSuccessAlertTrigerMSG("Changes were successfully saved.")
        setSuccessAlertTriger(true)
      } else {
        updateLoggedRole({
          pa_action_by: `${j.error} : ${new Date()}`,
          id: employee_id
        })
        setMessage2("Something Went Wrong.")
        setOpen3(true)
      }
    });
  };

  useEffect(() => {
    if (fileSelected !== "" && name !== "") {
      setpositionHide(true);
    } else {
      setpositionHide(false);
    }
  }, [name, fileSelected]);

  const handleDialogClose = () => {
    setOpen(false);
    setMoveTab(false);
    setnavPrompt(false);
    setMessage("");
    setDisableButtons(false);
  };

  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
    },
  };

  const resetFileInput = () => {
    setFileSelected("");
    setName("");
  };

  const handleChangePotential = (event: any) => {
    setPotential(event.target.value as string);
    setMoveTab(true);
    setnavPrompt(true)
  };

  useEffect(() => {
    setPotentialValue(potential)
  }, [potential])

  const getAttachments = (id: any) => {
    return employeeData?.data?.appraisal?.attachments
      // ?.filter((i: any) => i?.objective_description === j?.name?._id)
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
  }


  const handleViewPA = () => {
    window.open(`${APPRAISER_VIEW_PA}/employee/${employee_id}`, '_blank')
  }

  useEffect(() => {
    employeeData &&
      objectiveTitleData &&
      objectiveDescription?.map((j: any, index: any) => {
        console.log(j, "jjjjj")
        if (j?.rating_rejected == true) {
          setReviewerRejected(true);
        } else {
          setReviewerRejected(false);
        }
      })
  })

  const handleClickOpenAttachment = (e: any) => {
    document.getElementById("photo")?.click();
  };

  const handlePreviousRatingPopOverClose = () => {
    setAnchorPreviousRatingPopOver(null)
  }

  const handlePreviousRatingPopOverOpen = (event: React.MouseEvent<HTMLElement>, j: any) => {
    setAnchorPreviousRatingPopOver(event.currentTarget);
  };

  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    navigate(`/dashboardreview`, { state: { from: `${1}` } });
  }

  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        open={isDrawerOpen}
      >
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
          PaperProps={{
            style: {
              boxShadow: "none",
              borderRadius: "6px",
              maxWidth: "0px",
              minWidth: "26%",
              margin: "0px",
              padding: "30px",
            },
          }}
        >
          <DialogContent>
            <DialogContentText
              style={{
                color: "#333333",
                fontSize: "14px",
                fontFamily: "Arial",
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
                  marginRight: "10px",
                  height: "35px",
                  width: "70px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleSliderDialogClose}
              >
                Ok
              </Button>
            </DialogActions>
          </div>
        </Dialog>


        {accept === "Reject" && (
          <>
            <Item2 sx={{ width: "fitContent" }}>
              <Typography
                style={{
                  paddingLeft: "8px",
                  // paddingTop: "16px",
                  paddingBottom: "16px",
                  fontFamily: "arial",
                  //paddingBottom: "10px",
                  //backgroundColor: "#ebf2f4",
                  color: "#3E8CB5",
                  fontSize: "17px",
                  // width:"20%"
                  textAlign: "left",
                  wordBreak: "break-word"
                }}
              >
                {" "}
                {title}
              </Typography>
              <div
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  fontSize: "12px",
                  fontFamily: "arial",
                  paddingBottom: "7px",
                  color: "#7A7A7A",
                }}
              >
                New Rating
              </div>

              <>
                <Stack
                  style={{ paddingLeft: "10px" }}
                  direction="row"
                  height="30px"
                  spacing={1.7}
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
                                handleRatingAlert(ratings);
                                setAppraiserNewRating(ratings.rating);
                                setAppraiserNewRatingId(ratings._id)
                              }}
                              disabled={employeeData?.data?.employee?.employee_status == "rejected" && (ratings?.rating < normalizedRating)}
                              style={{
                                //@ts-ignore
                                borderColor: appraiserNewRatingId === ratings._id && "#3C8BB5",
                                backgroundColor: appraiserNewRatingId === ratings._id ? "rgb(123 210 255 / 29%)" : "",
                                cursor: (employeeData?.data?.employee?.employee_status == "rejected" && (ratings?.rating < normalizedRating)) ? "default" : "pointer"
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
                                {ratings?.rating}
                              </p>
                            </Button>
                          </Contain>
                        </Item1>
                      ))}
                </Stack>
                {/* This one commented {Removed} for cilent feedback on 19/01/2023 sprint sheet No 162*/}
                {/*again added on 2/3/2023 for the validation that appraiser must not select same rating as of previous rating  */}
                <p
                  style={{
                    textAlign: "left",
                    paddingLeft: "10px",
                    fontSize: "12px",
                    fontFamily: "arial",
                    color: "#7A7A7A",
                  }}
                >
                  Previous Rating
                </p>
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
                      position="relative"
                      marginLeft="10px"
                    >
                      <Button
                        style={{
                          //@ts-ignore
                          borderColor: "#3C8BB5",
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
                          {previousRating}
                        </p>
                      </Button>
                    </Stack>
                  </Contain>
                </Item1>

              </>
            </Item2>

            <div
              style={{
                textAlign: "left",
                paddingLeft: "27px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial"
              }}
            >
              Rejection Reason<span style={{
                fontSize: "20px",
              }}></span>
            </div>
            <TextField
              autoComplete="off"
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  fontFamily: "Arial",
                  color: "#333333",
                },
              }}
              size="small"
              style={{ paddingLeft: "27px", width: "75%" }}
              // fullWidth
              multiline
              value={comments}
              inputProps={{ maxLength: 500 }}
              onChange={(e) => {
                // setComments("")
                setComments(e.target.value);
                setnavPrompt(true);
              }}
            />

            <div
              style={{
                textAlign: "left",
                paddingLeft: "27px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial"
              }}
            >
              Appraiser Comments<span style={{
                fontSize: "20px",
              }}></span>
            </div>
            <TextField
              autoComplete="off"
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  fontFamily: "Arial",
                  color: "#333333",
                },
              }}
              size="small"
              style={{ paddingLeft: "27px", width: "75%" }}
              // fullWidth
              multiline
              value={resubmissionComments}
              inputProps={{ maxLength: 500 }}
              onChange={(e) => {
                // setComments("")
                setResubmissionComments(e.target.value);
                setnavPrompt(true);
              }}
            />

            <div
              style={{
                textAlign: "left",
                paddingLeft: "28px",
                fontSize: "12px",
                paddingBottom: "10px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial"
              }}
            >
              Attachment
            </div>{" "}
            <div >

              <Stack direction="row" alignItems="center" spacing={3}>
                <span>
                  <input
                    id="photo"
                    // style={styles.colors}
                    name="photo"
                    type="file"
                    multiple={false}
                    style={{ display: "none" }}
                    onChange={(e) => {
                      handleImageChange(e);
                      // setMoveTab(true)
                    }} />
                </span>

                <div>

                  <IconButton >
                    <img src={Uploadatt}
                      onClick={(e: any) => {
                        handleClickOpenAttachment(e);
                      }}
                    />
                  </IconButton>
                  <>
                    <label
                      style={{
                        fontSize: "14px",
                        fontFamily: "Arial",
                        color: "#7A7A7A",
                      }}
                    >{name}
                    </label>
                  </>

                </div>
                {
                  positionHide && (
                    <IconButton onClick={() => {
                      resetFileInput();
                    }}
                    >
                      <img src={Removeattnew} alt='icon' />
                    </IconButton>
                  )
                }
              </Stack>
            </div>

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
                  ratingSubmitHandler();
                  setnavPrompt(false);
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
                    width: "74px",
                  }}
                  variant="outlined"
                  onClick={() => {
                    WithDrawHandler();
                  }}
                >
                  {" "}
                  WithDraw{""}
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
      <div style={{
        backgroundColor: "#F1F1F1", height: "auto",
        minHeight: "100px",
        overflow: "hidden",
      }}>
        <Box
          sx={{
            marginRight: "25px", marginLeft: "25px",
            background: "#fff",
          }}
        >
          <Box
            style={{
              padding: "35px",
              paddingBottom: "0px"
            }}
          >

            <Stack
              direction="row"
              alignItems="baseline"
              paddingBottom="10px"
              justifyContent="space-between"
              marginRight="33px"
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
                    // paddingRight: "60px",
                  }}
                >
                  PA Status:
                  <span
                    style={{
                      color: "#717171",
                      marginTop: "8px",
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
                        {empData?.data?.previous_rating && empData?.data?.previous_rating !== 0 ? empData?.data?.previous_rating?.toFixed(2) : "-"}
                      </span>
                    </Overallratingvalue>
                    {/* )} */}
                  </Overallrating>
                  {empData?.data?.previous_rating && employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
                    <Link
                      to={`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`}
                      state={{
                        employeeCodeFromLanding: empData?.data?.employee_code,
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
                <Tooltip title="Download" arrow placement="top">
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
                        cursor: "pointer", height: "15px", width: "15px",
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
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              marginRight="33px"

              //   mr={2}
              sx={{
                backgroundColor: "#f3fbff",
              }}
              // divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Item>
                <Box>
                  <Stack direction="row" spacing={1}>
                    {empData?.data?.profile_image_url != undefined ? (
                      <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={empData?.data?.profile_image_url} />
                    ) : (
                      <Avatar style={{ width: "55px", height: "55px" }}>
                        {empData &&
                          empData.data.legal_full_name.substring(0, 1)}
                      </Avatar>
                    )}
                    <Box>
                      <Stack direction="row" spacing={1}>
                        <Name>{employeeData?.data?.first_name}</Name>
                      </Stack>
                      <Speciality>
                        {employeeData?.data?.position_long_description}
                      </Speciality>
                      <Speciality>
                        Grade {employeeData?.data?.grade}
                      </Speciality>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="baseline"
                        textAlign="center"
                      >
                        <Pastratingvalue>
                          {employeeData?.data?.employee_code}
                        </Pastratingvalue>
                      </Stack>
                    </Box>
                  </Stack>
                </Box>
              </Item>

              <Item>
                <Stack direction="column" alignItems="center">
                  <Stack direction="row" gap={1}>
                    {employeeDataIsFetching && (
                      <CircularProgress size={15} thickness={7} />
                    )}
                    <Overallrating>Overall Rating</Overallrating>
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
                          lineHeight: "20px",
                          paddingBottom: "5px",
                          paddingTop: "5px",
                        }}
                      >
                        <b  >{ratingscaledef}</b>:
                        <span
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            paddingBottom: "5px",
                            paddingTop: "5px",
                          }}
                        >
                          {ratingdefenition}
                        </span>
                      </div>
                    </Popover>
                  </Stack>

                  <Overallratingvalue>
                    {ratingdefenition?.length > 0 &&
                      <IconButton sx={{ padding: "4px" }} onClick={handleClick22} >
                        <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                      </IconButton>
                    }
                    <b>

                      {
                        employeeData?.data?.current_rating?.overall_rating?.toFixed(2)
                      }
                    </b>
                  </Overallratingvalue>

                </Stack>
              </Item>
            </Stack>

            <Box sx={{
              paddingTop: "20px", marginRight: "33px"
            }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                paddingBottom="12px"
              >
                <Grid item xs={4}>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#3E8CB5",
                      fontFamily: "Arial",
                      // marginLeft:"50px"
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
                      // marginLeft:"50px"
                    }}
                  >
                    {employeeData?.data?.calendar?.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {/*************** Display potential if the appraisal template has a potential and 
                 * also if employee has not rejected the appraisal ******************/}
                  {employeeData?.data?.appraisal_template?.potential == true &&
                    employeeData?.data?.employee?.employee_status !== "rejected" &&
                    (<Stack
                      direction="column"
                      justifyContent="space-between"
                      alignItems="flex-end"
                    // paddingBottom="20px"
                    >
                      <Typography
                        color="#3e8cb5"
                        fontFamily="arial"
                        fontSize="17px"
                      >
                        <IconButton sx={{ padding: "4px" }} onClick={handleClick3}>
                          <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                        </IconButton>
                        Potential Level


                        <Popover
                          id={id3}
                          open={open3}
                          anchorEl={anchorE3}
                          onClose={handleClose3}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                            // horizontal: "left",
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
                            // width: "60%",
                            "& .MuiPopover-paper": {
                              border: "1px solid #3e8cb5",
                              backgroundColor: "#ffffff",
                              // borderRadius: 0,
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
                            <Typography
                               style={{
                                fontSize: "14px",
                                // color: "#333333",
                                fontFamily: "Arial",
                                paddingBottom: "5px",
                                //  paddingTop: "5px",
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
                            <Typography
                              style={{
                                fontSize: "14px",
                                //  color: "#3e8cb5",
                                fontFamily: "Arial",
                                paddingBottom: "5px",
                                paddingTop: "5px",
                                // borderBottom: "1px solid #d9d9d9"

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
                                  nineBoxData?.data[0]?.potential_definitions?.moderate}
                              </span>
                            </Typography>
                            <Typography
                              style={{
                                fontSize: "14px",
                                // color: "#3e8cb5",
                                fontFamily: "Arial",
                                paddingTop: "5px",
                                // borderBottom: "0px solid transparent"
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
                                  nineBoxData?.data[0]?.potential_definitions?.low}
                              </span>
                            </Typography>
                          </div>
                        </Popover>
                      </Typography>

                      <Select
                        sx={{
                          width: "84%",
                          "& .MuiInputBase-input": {
                            fontSize: "14px",
                            textTransform: "none",
                            fontFamily: "Arial",
                            color: "#333333",
                          },
                        }}
                        size="small"
                        value={potential}
                        onChange={(e) => {
                          handleChangePotential(e)
                          setnavPrompt(true);
                        }}>

                        <MenuItem style={{ fontSize: "14px" }} value="High" disabled={disableTextAfterSubmission}>
                          High
                        </MenuItem>
                        <MenuItem style={{ fontSize: "14px" }} value="Moderate" disabled={disableTextAfterSubmission}>
                          Moderate
                        </MenuItem>
                        <MenuItem style={{ fontSize: "14px" }} value="Low" disabled={disableTextAfterSubmission}>
                          Low
                        </MenuItem>
                      </Select>

                    </Stack>
                    )}

                  {/*************** Display potential if the appraisal template has a potential and 
                 * also if employee has rejected the appraisal ******************/}

                  {employeeData?.data?.appraisal_template?.potential === true &&
                    employeeData?.data?.employee?.employee_status == "rejected" && (
                      <Stack direction="column" alignItems="flex-end">
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                          <Typography
                            color="#3e8cb5"
                            fontFamily="arial"
                            fontSize="17px"
                          >
                            <IconButton onClick={handleClickPotentialInfo} >
                              <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                            </IconButton>
                            Potential Level

                            <Popover
                              id={idPotentialInfo}
                              open={openPotentialInfo}
                              anchorEl={anchorPotentialInfo}
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
                              {/* <div
                              style={{
                                padding: "10px",
                                fontSize: "14px",
                                lineHeight: "20px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {employeeData?.data?.appraisal?.potential === "High" && (
                                <span>
                                  <b>High </b>: {nineBoxData?.data[0]?.potential_definitions?.high}
                                </span>
                              )}

                              {employeeData?.data?.appraisal?.potential == "Moderate" && (
                                <span><b> Moderate </b>:{nineBoxData?.data[0]?.potential_definitions?.moderate}</span>
                              )}
                              {employeeData?.data?.appraisal?.potential == "Low" && (
                                <span> <b>Low </b>:{nineBoxData?.data[0]?.potential_definitions?.low} </span>
                              )}


                            </div> */}
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

                    )}
                </Grid>
              </Stack>
            </Box>


            {employeeData && employeeData?.data?.reviewer?.reviewer_overall_feedback !== undefined &&
              employeeData?.data?.reviewer?.reviewer_overall_feedback !== "" &&
              employeeData?.data?.reviewer?.reviewer_PA_rejected == true && (
                <>
                  <TrainingRecommendations>
                    <b>Reviewer Rejection Reason</b>
                    <span style={{
                      fontSize: "22px",
                    }}></span>
                  </TrainingRecommendations>
                  <Containnn>
                    <Tf1>

                      <TextField
                        size="small"
                        multiline
                        InputProps={{ readOnly: true }}
                        autoComplete="off"
                        name="comments"
                        value={employeeData?.data?.reviewer?.reviewer_overall_feedback}
                      />

                    </Tf1>
                  </Containnn>
                </>
              )}

            {employeeData && employeeData?.data?.normalizer?.normalizer_PA_rejected == true && (
              <>
                <TrainingRecommendations>
                  <b>HR Normalizer Rejection Reason</b>
                  <span style={{
                    fontSize: "22px",
                  }}></span>
                </TrainingRecommendations>
                <Containnn>
                  <Tf1>

                    <TextField
                      // placeholder="Add"
                      size="small"
                      //  fullWidth
                      multiline
                      InputProps={{ readOnly: true }}
                      // inputProps={{ maxLength: 500 }}
                      // variant="standard"
                      autoComplete="off"
                      //   InputProps={{
                      //     disableUnderline: true,
                      //   }}
                      name="comments"
                      value={normalizerOverallFeedComments}
                      onChange={e => {
                        handleCommentsChange(e)
                      }} />

                  </Tf1>
                </Containnn>
              </>
            )}
            <Box>
              {/* <Box style={{ paddingLeft: "0px" }}> */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  marginRight: "33px"

                  // paddingLeft: "52px",
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
                        {value == 1 && (
                          <IconButton
                            sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                          // aria-describedby={id2}
                          // onClick={handleClickInfo}
                          >
                            <img width="12px" src={Infoicon} alt="icon" />
                          </IconButton>)}
                        {value == 0 && (
                          <IconButton
                            sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                            aria-describedby={id2}
                            onClick={handleClickInfo}
                          >
                            <img width="12px" src={Infowhiteicon} alt="icon" />
                          </IconButton>
                        )}
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

              <Popover
                id={id2}
                open={openInfo}
                anchorEl={anchorEls}
                onClose={handleCloseInfo}
                PaperProps={{
                  style: { width: "260px", marginTop: "55px" },
                }}
              >
                <TableContainer>
                  <Scroll>
                    <CustomScrollbar style={{ width: "100%", height: "225px" }}>
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
                        <TableHead>
                          <TableRow sx={{ bgcolor: "#eaeced" }}>

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
                              Ratings
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

              {value === 0 && (
                <TableContainer >
                  <Table
                    sx={{
                      borderCollapse: 'separate',
                      borderSpacing: '0px 15px',
                      paddingRight: "33px"
                    }}
                    size="small" aria-label="simple table"
                  >
                    <TableHead
                      style={{
                        background: "#eaeced",
                        fontSize: "15px",
                        fontWeight: "400",
                      }}
                    >
                      <TableRow>
                        <TableCell
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            background: "#eaeced",
                            textAlign: "center",
                            // borderBottom: "1px solid #fff",
                            color: "#3e8cb5",

                          }}
                        >

                          Objective<br></br> Type


                        </TableCell>
                        <TableCell
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            // borderBottom: "1px solid #fff",

                          }}
                        >

                          <div
                            style={{
                              fontFamily: "Arial",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#3e8cb5",
                              border: "none",
                              background: "none",
                              // margin:"-5px"
                            }}
                          >
                            Objective<br></br> Title
                          </div>

                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",
                            padding: "0px 8px"

                          }}
                        >


                          Objective<br></br> Level


                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",
                            padding: "0px 8px"

                          }}
                        >



                          {/* <option value="Training Title">Normalizer Rating</option> */}
                          Appraiser<br></br> Rating


                        </TableCell>

                        {employeeData?.data?.appraisal?.objective_description.filter((item: any) =>
                          item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                          (<TableCell
                            style={{
                              background: "#eaeced",
                              textAlign: "center",
                              // borderBottom: "1px solid #fff",

                            }}
                          >

                            <div
                              style={{
                                fontFamily: "Arial",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#3e8cb5",
                                border: "none",
                                background: "none",
                                // margin:"-5px"
                              }}
                            >
                              Appraiser<br></br> Comments
                            </div>

                          </TableCell>)}

                        {employeeData?.data?.appraisal?.objective_description?.filter
                          ((item: any) => (item?.rating_rejected == true || item?.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
                            <TableCell
                              style={{
                                background: "#eaeced",
                                textAlign: "center",
                                // borderBottom: "1px solid #fff",

                              }}
                            >

                              <div
                                style={{
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  color: "#3e8cb5",
                                  border: "none",
                                  background: "none",
                                  // margin:"-5px"
                                }}
                              >
                                Appraiser<br></br> Rejection/Change Reason
                              </div>

                            </TableCell>
                          )}

                        {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") &&
                          <TableCell
                            align="center"
                            style={{
                              fontFamily: "Arial",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#3e8cb5",
                              textAlign: "center",
                              padding: "0px 8px"
                              // borderBottom: "1px solid #fff",

                            }}
                          >
                            Appraiser<br></br> Actions
                            {isUploading && (
                              <CircularProgress size={15} thickness={7} />
                            )}
                          </TableCell>
                        }
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      {employeeData &&
                        objectiveTitleData && colorarray &&
                        objectiveDescription?.map((j: any, index: any) => {
                          const selectedRating: any = ratingsData?.data?.find((ratings: any) => ratings?.rating === j?.ratings?.rating)
                          console.log(selectedRating, "selectedRating")
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
                                  width="250px"
                                  // rowSpan={3}
                                  style={{
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "left",
                                    lineHeight: "20px",
                                    wordBreak: "break-word",
                                    backgroundColor: colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name) != undefined ? colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name)?.color : Colors[0],

                                  }}
                                >
                                  {j?.objective_type?.name?.name}
                                </TableCell>
                                <TableCell
                                  width="150px"
                                  style={{
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "left",
                                    lineHeight: "20px",
                                    wordBreak: "break-word",
                                    background: "#ffffff",

                                  }}
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
                                        maxWidth: "450px",
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
                                  align="center"
                                  style={{
                                    // padding: "0px 8px",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "center",
                                    background: "#FBFBFB",
                                  }}
                                >
                                  <>
                                    <Stack direction="row" justifyContent="center" alignItems="center">
                                      {(j.level_1_isChecked ||
                                        j.level_2_isChecked ||
                                        j.level_3_isChecked ||
                                        j.level_4_isChecked) && (
                                          <IconButton
                                            style={{ padding: "4px" }}
                                            aria-describedby={id102}
                                            onClick={(e: any) => {
                                              setActiveObjectiveId(j._id);
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
                                          <span>L1</span>
                                          {/* <br /> */}
                                        </>
                                      )}
                                      {j.level_2_isChecked && (
                                        <>
                                          {" "}
                                          <span>L2</span>
                                          {/* <br /> */}
                                        </>
                                      )}
                                      {j.level_3_isChecked && (
                                        <>
                                          {" "}
                                          <span>L3</span>
                                          {/* <br /> */}
                                        </>
                                      )}
                                      {j.level_4_isChecked && (
                                        <>
                                          {" "}
                                          <span>L4</span>
                                          {/* <br /> */}
                                        </>
                                      )}


                                    </Stack>
                                  </>
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
                                          j._id === activeObjectiveId && (
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
                                <TableCell
                                  width="10px"
                                  style={{
                                    padding: "0px 8px",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "center",
                                    lineHeight: "20px",
                                    background: "#ffffff",
                                  }}
                                >
                                  <div style={{ display: "inline-flex", alignItems: "center" }}>
                                    <div>
                                      {/* {selectedRating?.definition !== undefined && selectedRating?.definition !== "" && ( */}
                                      <IconButton
                                        sx={{ padding: "4px" }}
                                        onClick={(e) => {
                                          handleClickInfo6(e);
                                          setPopoverIndex(index);
                                        }}
                                      >
                                        <img width="12px" src={Infoicon} alt="icon" />
                                      </IconButton>
                                      {/* )} */}

                                      {/* Popover for icon */}
                                      <Popover
                                        id={id6}
                                        open={popoverIndex === index && openInfo6}
                                        anchorEl={anchorEls6}
                                        onClose={handleCloseInfo6}
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
                                    </div>
                                    <div>
                                      {employeeData?.data?.appraisal?.objective_description
                                        .filter((i: any) => i?.name?._id === j?.name?._id)
                                        .map((k: any) => {
                                          console.log(k, "kkkkkk");
                                          let ratingElement;

                                          if (k?.ratings && k.rating_rejected === true) {
                                            ratingElement = (
                                              <RatingBackground
                                                onClick={(e: any) => {
                                                  handlePreviousRatingPopOverOpen(e, j);
                                                  setPopoverIndex(index);
                                                }}
                                                style={{ color: "white", background: "#D2122E" }}
                                                key={k._id}
                                              >
                                                {k?.ratings?.rating}
                                              </RatingBackground>
                                            );
                                          } else if (
                                            k?.ratings &&
                                            (k.rating_accepted === true || k.rating_resubmitted === true)
                                          ) {
                                            ratingElement = (
                                              <RatingBackground
                                                onClick={(e: any) => {
                                                  handlePreviousRatingPopOverOpen(e, j);
                                                  setPopoverIndex(index);
                                                }}
                                                style={{ color: "white", background: "#3e8cb5" }}
                                                key={k._id}
                                              >
                                                {k?.ratings?.rating}
                                              </RatingBackground>
                                            );
                                          } else {
                                            ratingElement = (
                                              <Stack
                                                sx={{
                                                  display: "flex",
                                                  flexDirection: "row",
                                                  justifyContent: "space-between",
                                                  alignItems: "center",
                                                }}
                                                direction="row"
                                                alignItems="center"
                                                key={k._id}
                                              >
                                                {/* {k?.ratingdef !== undefined && k?.ratingdef !== "" && (
            <div>
              <Typography
                style={{
                  fontSize: "12px",
                  fontFamily: "arial",
                  padding: "5px",
                }}
              >
                <b>{k?.rating_scale}</b> :{k?.ratingdef}
              </Typography>
            </div>
          )} */}

                                                {/* Icon in the center */}



                                                {/* Rating to the right */}
                                                <span>{k?.ratings?.rating}</span>
                                              </Stack>
                                            );
                                          }

                                          return ratingElement;
                                        })}

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
                                                ?.map((k: any) => {
                                                  console.log(k, "newkk")
                                                  if (ratingsData) {
                                                    let temp = ratingsData?.data?.find((item: any) => k?.ratings == item?._id)
                                                    return <span>Previous Rating:{temp?.rating}</span>
                                                  }
                                                })[0]}
                                          </div>
                                        </Popover>
                                      )}
                                    </div>
                                  </div>
                                </TableCell>
                                {employeeData?.data?.appraisal?.objective_description.filter((item: any) =>
                                  item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                                  (<TableCell
                                    width="250px"
                                    style={{
                                      textAlign: "left",

                                      lineHeight: "20px",
                                      background: "#FBFBFB",
                                    }}
                                  >
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      spacing={2}

                                    >
                                      <Text>
                                        <TextField
                                          style={{
                                            backgroundColor:
                                              employeeData?.data?.employee?.employee_status !== "rejected" || employeeData?.data?.appraisal?.status !== "rejected"
                                                ? "#f8f8f8"
                                                : "#ffffff",
                                          }}
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
                                            setMoveTab(true);
                                            setnavPrompt(true);
                                          }}
                                        />
                                      </Text>

                                      {employeeData &&
                                        getAttachments(j?.name?._id)?.length >
                                        0 && (
                                          <AttachFileIcon
                                            style={{
                                              color: "#93DCFA",
                                              height: "18px",
                                              cursor: 'pointer',
                                              transform: "rotate(30deg)",
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

                                            }}
                                          >
                                            {/* Attachments:{appraisalAttachments} */}
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
                                                          {/* <IconButton>
                                                         */}

                                                          {disableTextAfterSubmission ?
                                                            <img
                                                              style={{ cursor: 'default' }}
                                                              src={Removeattnew}
                                                            /> :
                                                            <img
                                                              style={{ cursor: 'pointer' }}
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

                                        </div>
                                      </Popover>
                                    </Stack>
                                  </TableCell>)}
                                {employeeData?.data?.appraisal?.objective_description?.filter
                                  ((item: any) => ((item?.rating_rejected == true || item?.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined))).length > 0 && (
                                    <TableCell width="250px" style={{ textAlign: "left", lineHeight: "20px", background: "#fbfbfb" }}>
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
                                            color: "#333333",
                                          }}
                                        >
                                          {/* {j?.remarks} */}
                                          {employeeData &&
                                            employeeData.data.appraisal.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )
                                              .map((k: any, index: any) => {

                                                return ((k.rating_rejected || k.rating_resubmitted) && k?.rejection_reason);

                                              })[0]}
                                        </Typography>
                                        <Box sx={{ flexGrow: 0, display: "block" }}>
                                          {employeeData && getAppraiserRejectionAttachments(j?.name?._id)?.length > 0 &&
                                            (j.rating_rejected == true || j.rating_resubmitted == true) && (j.rejection_reason !== "" && j.rejection_reason !== undefined) &&
                                            <AttachFileIcon
                                              style={{
                                                color: "#93DCFA",
                                                height: "18px",
                                                transform: "rotate(30deg)",
                                                cursor: 'pointer'
                                              }}
                                              onClick={(e: any) => {
                                                handleClickRejectionAttachments(e)
                                                setPopoverIndex(index)
                                              }}
                                              aria-describedby={"id8"}

                                            />}
                                        </Box>

                                        <Popover
                                          id={idRejection}
                                          open={(popoverIndex === index) && openRejection}
                                          anchorEl={rejectionAnchor}
                                          onClose={handleCloseRejectionAttachments}
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
                                            style={{
                                              padding: "5px",
                                              fontSize: "12px",
                                              lineHeight: "20px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            {employeeData && getAppraiserRejectionAttachments(j?.name._id)?.map((k: any, index1: any) => {
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
                                                      {disableTextAfterSubmission ?
                                                        <img
                                                          style={{ cursor: 'default' }}
                                                          src={Removeattnew}
                                                        /> :
                                                        <img
                                                          style={{ cursor: 'pointer' }}
                                                          src={Removeattnew}
                                                          onClick={() => deleteRejectionAppraiserMutation({
                                                            id: employee_id,
                                                            name: k.remove,
                                                            objective_description: j.name._id
                                                          })} />
                                                      }

                                                      {/* </IconButton> */}
                                                    </Stack>

                                                  </Stack>
                                                </>
                                              )
                                            })}
                                          </div>
                                        </Popover>
                                        <Popover
                                          id={"NormalizerComments"}
                                          open={openNormalizerDetails}
                                          anchorEl={anchorElNormalizer}
                                          onClose={handleCloseNormalizer}
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
                                              backgroundColor: "transparent",
                                              boxShadow: "none",
                                              borderRadius: 0,
                                            },
                                          }}
                                          sx={{
                                            "& .MuiPopover-paper": {
                                              border: "1px solid #FFCF7A",
                                              backgroundColor: "#f8f8ff",
                                            },
                                          }}
                                        >
                                        </Popover>


                                      </Stack>
                                    </TableCell>
                                  )}


                                {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") &&
                                  <TableCell
                                    width="30px"
                                    style={{ textAlign: "center", background: "#ffffff", padding: "0px 8px" }}
                                  >

                                    <>
                                      {employeeData &&
                                        <span>
                                          <Stack
                                            direction="row"
                                            justifyContent="center"
                                          >

                                            {
                                              <Tooltip title="Edit">
                                                <IconButton
                                                  disabled={isUploading || employeeDataIsFetching || isUpdatingRating}
                                                  onClick={() => openDrawerHandler(j)}
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
                                            }

                                          </Stack>
                                        </span>
                                      }

                                    </>
                                  </TableCell>
                                }
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              {value === 0 && employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") &&
                (
                  <Stack
                    direction="row"
                    spacing={2}
                    paddingTop="30px"
                    paddingBottom="30px"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      // disable ={true}
                      disabled={disableButtons || employeeDataIsFetching}
                      // style={styles.colors}
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
                        saveHandler();

                      }}
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
                        background: "transparent",
                        height: "35px",
                        // width: "70px",
                        color: "#3E8CB5",
                        ...((disableButtons || employeeDataIsFetching) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),
                      }}
                      variant="outlined"
                      onClick={submitButtonHandler}

                    >
                      Save and Submit
                    </Button>

                    <Button
                      disabled={disableButtons || employeeDataIsFetching}
                      style={{
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                        color: "#3E8CB5",
                        ...((disableButtons || employeeDataIsFetching) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),
                      }}
                      variant="outlined"
                      // disabled
                      onClick={cancelHandler}

                    >
                      Cancel
                    </Button>
                    {/* </Link> */}
                  </Stack>
                )}
              <Dialog
                open={open}
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
                      display: "flex",
                      justifyContent: "center",
                      textAlign: "center",
                      wordBreak: "break-word",
                      // height: "100px",
                      // width: "300px",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    {message}
                    {/* {Message1} */}
                  </DialogContentText>
                </DialogContent>
                <DialogActions
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // paddingBottom: "30px"
                  }}
                >
                  <Button
                    style={{
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      // marginRight: "10px",
                      width: "70px",
                      height: "35px",
                      background: "transparent",
                      color: "#3e8cb5"
                    }}
                    variant="outlined"
                    autoFocus
                    onClick={handleDialogClose}
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          </Box>
        </Box>

        <AlertDialogSuccess
          isAlertOpen={allFieldMandatory}
          handleAlertClose={allFieldMandatoryClose}>
          {message}
        </AlertDialogSuccess>
        <AlertDialogSuccess
          isAlertOpen={open33}
          handleAlertClose={handlemessage3}
        >
          {message2}
        </AlertDialogSuccess>
        <AlertYesNo
          isAlertOpen={changePotentialAlert}
          handleAlertYes={handleKeepSamePotential}
          handleAlertClose={handlePotentialChange}>
          {message}
        </AlertYesNo>

        {/* handler to keep the same ratings or change the ratings */}
        <AlertYesNo
          isAlertOpen={keepSameRatingAlert}
          handleAlertYes={handleKeepSameRatings}
          handleAlertClose={handleRatingsChange}>
          {message}
        </AlertYesNo>

        <Dialog
          open={isAlertOpen}
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
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                wordBreak: "break-word",
                // height: "100px",
                alignItems: "center",
                overflowY: "hidden",
              }}
            >
              {/* Did you review the recommendations ? */}
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
                // onClick={handleAlertYes}
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
                // onClick={handleAlertNo}
                onClick={handleAlertNo}
                autoFocus
              >

                No

              </Button>
            </DialogActions>
          </Stack>

        </Dialog>
        <Dialog
          // fullScreen={fullScreen}
          open={allFeedMandatory}
          onClose={handleAllFeedMandatory}
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
              {/* changed as per 5/4/2023 */}
              The performance appraisal was resubmitted to the Reviewer.
              {/* The performance appraisal has been successfully submitted to the Reviewer. */}
              {/* The performance appraisal was submitted to the Reviewer. */}
              {/* {message} */}
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              //paddingBottom: "30px"
            }}
          >
            <Link
              to={`/dashboardreview`}
              state={{
                from: `${1}`
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  // marginRight: "10px",
                  color: "#3e8cb5",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                onClick={handleAllFeedMandatory}
              >
                Ok
              </Button>
            </Link>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isAlertOpen1}
          // onClose={handleAlertNo1}
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
              {/* changed as per 5/4/2023 */}
              Are you sure you wish to resubmit the performance appraisal?
              {/* Are you sure you wish to submit the performance appraisal? */}
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

              {/* <Link
                to={`/dashboardreview`}
                state={{
                  from: `${1}`
                }}
              > */}
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
                onClick={handleAlertYes1}
              >
                Yes
              </Button>
              {/* </Link> */}

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
                onClick={handleAlertNo1}
                autoFocus
              >

                No

              </Button>
            </DialogActions>
          </Stack>
        </Dialog>


        {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
        <AlertDialogOkCancelForUnsavedChanges
          isAlertOpen={openCancelDialog}
          handleAlertClose={rejectCancelButtonHandler}
          handleAlertIdClose={acceptCancelButtonHandler}
        >
        </AlertDialogOkCancelForUnsavedChanges>

      </div>
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
    </React.Fragment>
  );
}
