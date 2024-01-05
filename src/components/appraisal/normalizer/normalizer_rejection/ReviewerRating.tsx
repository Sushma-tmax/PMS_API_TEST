import * as React from "react";
import { styled } from "@mui/material/styles";
import { Snackbar, Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  ArrowBackIosRounded,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import Eye from "../../../../assets/Images/Eye.svg";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import Closeicon from "../../../../assets/Images/Closeicon.svg";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Popover,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tabs,
  Tab,
  Tooltip,
} from "@mui/material";

import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import FormLabel from "@mui/material/FormLabel";
import Drawer from "@mui/material/Drawer";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import Infowhiteicon from "../../../../assets/Images/Infowhiteicon.svg";

// import {
//   MIDYEAR_PA_REPORT,
//   MIDYEAR_PERFORMANCE,
//   MIDYEAR_REJECT_RATING,
//   MIDYEAR_SUCCESS,
// } from "../../constants/routes/Routing";
import Command from "../../ReviewerRejection/Icons/Command.svg";

import { useEffect, useState, useRef } from "react";
import {
  useAttachmentsNormalizerMutation,
  useCreateEmployeeAppraisalMutation,
  useGetEmployeeAppraisalQuery,
  useGetEmployeeQuery,
  useGetObjectiveTitleQuery,
  useGetRatingScaleQuery,
  useReviewerRejectionMutation,
  useAttachmentsNormalizerDeleteMutation,
  useAttachmentsReviewerDeleteMutation,
  useAttachmentsAppraiserDeleteMutation,
  useUpdateEmployeeAppraisalMutation,
  useAttachmentsRejectionAppraiserMutation,
  useAttachmentsRejectionAppraiserDeleteMutation
} from "../../../../service";
import { useNormalizerContext } from "../../../../context/normalizerContext";
import { useNormalizerRejectionMutation } from "../../../../service";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import Close from "../../../assets/Images/Close.svg";
import Newtickicon from "../../../assets/Images/Newtickicon.svg";
import Thumsup from "../../../assets/Images/Thumsup.svg";
import Thumsdown from "../../../assets/Images/Thumsdown.svg";
import Closeiconred from "../../../../assets/Images/Closeiconred.svg";
import Downloadatt from "../../../assets/Images/Downloadatt.svg";
import Removeattnew from "../../../assets/Images/Removeattnew.svg";
import { Scrollbar } from "react-scrollbars-custom";
import AlertDialogSuccess from "../../../UI/DialogSuccess";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { NORMALIZER_REJECTS_PA } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Normalizer";
import { NORMALIZER_VIEW_PA, EMPLOYEE_PREVIOUS_PAs } from "../../../../constants/routes/Routing";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import { useParams, useNavigate } from "react-router-dom";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import { makeStyles } from "@mui/styles";
import { useGetEmployeeDetailsWithEmpCodeQuery } from "../../../../service/employee/previousAppraisal";
import AlertDialogOkCancelForUnsavedChanges from "../../../UI/DialogforunsavedChangesAlert";
import { useCheckRoleLogsMutation } from "../../../../service/employee/employee";


//styles for snackbar also
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

const Containnn = styled("div")({
  // marginRight: "20px",
  marginTop: '10px',
  // width: '1200',
  paddingTop: '0px',
  paddingBottom: "20px"

});
const TrainingRecommendations = styled("div")({
  // marginLeft: "58px",
  // marginTop: '10px',
  color: "#717171",
  fontSize: '16px',
  fontFamily: "arial"
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
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});
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
  color: "#3e8cb5",
  //textAlign: 'left'
});
const Overallratingvalue = styled("div")({
  fontSize: "17px",
  display: "flex",
  alignItems: "center",
  fontFamily: "arial",

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

const Typo1 = styled("div")({
  // marginLeft: "25px",
  paddingTop: "20px",
  color: "#008E97",
  fontSize: "18px",
});

const Item = styled("div")(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Item2 = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  //   padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "450px",
  margin: "1rem",
  marginBottom: "0px",
}));


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
    border-bottom:none;
    // padding: 6px;
   
  }
  tr {
   
    border: 1px solid #80808014;
    box-shadow: 1px 0px 0px 1px #80808014;
    border-bottom:none;


}
  `
);

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

export default function NormalizerRating(props: any) {
  const classes = useStyles();
  const { setnavPrompt, navPrompt, value, setValue, handleChange, appraisalData, moveTab, setMoveTab, fetchCancel } = props;
  // @ts-ignore
  const { empData: employeeData, employee_id, normalizerOverallFeedComments, setNormalizerOverallFeedComments, normalizerOtherRecommendationComments, normalizerAreaImprovementComments, normalizerTrainingRecommendationComments, reviewedOverallFeedback, disableTextAfterSubmission, setReviewedOverallFeedback, emailData, disableButtons, setDisableButtons } = useNormalizerContext()

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);
  const CustomScrollbar = Scrollbar as any;

  const [RejectionReason, setRejectionReason] = useState<any>("")
  const [upDateNormalizer] = useNormalizerRejectionMutation()
  let navigate = useNavigate();
  const { data: nineBoxData } = useGetNineboxQuery("");

  console.log(isDrawerOpen)

  const { data: ratingsData } = useGetRatingScaleQuery('')
  const [normalizerAttachments] = useAttachmentsNormalizerMutation();
  const { data: empData } =
    useGetEmployeeAppraisalQuery(employee_id);
  //   const {data: employeeData} = useGetEmployeeAppraisalQuery('6204935ebca89023952f2da9')
  const [deleteNormalizerMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsNormalizerDeleteMutation();
  const [deleteAppraiserMutation, { isLoading: isDeleting1, data: deletes1 }] =
    useAttachmentsAppraiserDeleteMutation();
  const [deleteReviewerMutation, { isLoading: isDeletings, data: deletesss }] =
    useAttachmentsReviewerDeleteMutation();
  const [deleteRejectionAppraiserMutation, { isLoading: isRejectionDeleting, data: deleteRejection }] =
    useAttachmentsRejectionAppraiserDeleteMutation()
  console.log(employeeData, "my test");
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [comments1, setComments1] = useState('');
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: employeeData?.data?.employee_code })
  const [rating, setRating] = useState<any>("");
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [updateMutation] = useUpdateEmployeeAppraisalMutation();
  const [comments, setComments] = useState("");
  const [accept, setAccept] = useState("");
  const [objective, setObjective] = useState<any>("");
  const [ratingRed, setRatingRed] = useState<any>(false);
  const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState('');
  const [isChange, setIsChange] = useState(false)
  const [name, setName] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<any>("");
  // previous rating
  const [anchorPreviousRatingPopOver, setAnchorPreviousRatingPopOver] = React.useState<HTMLElement | null>(
    null
  );
  const openPreviousRating = Boolean(anchorPreviousRatingPopOver);
  const id_Previous_Rating = openPreviousRating ? "simple-popover" : undefined;
  const [sendItem] = useCreateAzureBlobMutation();
  const [rejectionAttachmentsAppraiser] = useAttachmentsRejectionAppraiserMutation()
  const [attachmentsNormalizer] = useNormalizerRejectionMutation();
  const [appraiserRejectionAttachmentsFiles, setAppraiserRejectionAttachmentsFiles] = useState<any>([])
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  console.log(ratingAppraiser, "ratingAppraiser");
  const [anchorElReviewer, setanchorElReviewer] =
    React.useState<HTMLButtonElement | null>(null);
  const [popoverIndex1, setPopoverIndex1] = useState("")
  const [popoverIndex2, setPopoverIndex2] = useState("")
  const [anchorElNormaliser, setanchorElNormaliser] =
    React.useState<HTMLButtonElement | null>(null);
  const [ratingComments, setRatingComments] = useState<any>("");
  const [ratingComments1, setRatingComments1] = useState<any>("");
  const inputRef = useRef<any>(null);
  const [normalizerAttachmentss, setnormalizerAttachmentss] = useState<any>("");
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  const handleClickNormaliserDetails = (event: any, j: any) => {
    console.log(j, "jjjjr");
    setRatingComments1(
      employeeData &&
      employeeData?.data?.normalizer?.objective_description
        .filter((i: any) => i.name._id === j.name._id)
        .map((k: any) => k.comments)[0]
    );
    setnormalizerAttachmentss(
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
    setanchorElNormaliser(event.currentTarget);
  };
  console.log(ratingComments1, "normalizer");
  console.log(ratingComments, "reviewer");
  const handleCloseNormaliser = () => {
    setanchorElNormaliser(null);
    setRatingComments1(null);
  };

  const isChangeHandlerClose = () => {
    setIsChange(false);
    setMessage("")
  }

  const handlePreviousRatingPopOverClose = () => {
    setAnchorPreviousRatingPopOver(null)
  }

  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);
  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }
  // refetch
  const CancelButtonHandler = () => {

    // if(moveTab == false || navPrompt == false){
    //   setOpenCancelDialog(false);
    //   // setValue(0);
    // }else
    if (navPrompt || moveTab) {
      setOpenCancelDialog(true);
    } else {     
      navigate(`/normalizer`, { state: { from: 1 } })
    }

  }
  const handlePreviousRatingPopOverOpen = (event: React.MouseEvent<HTMLElement>, j: any) => {
    setAnchorPreviousRatingPopOver(event.currentTarget);
  };

  const rejectCancelButtonHandler = () => {
    // setnavPrompt(false);
    setOpenCancelDialog(false);
    // navigate('/normalizer')
    //   setTimeout(() => {
    //   navigate(`/dashboardreview`, { state: { from: 1 } })
    // }, 1000);
  }
  const acceptCancelButtonHandler = () => {

    setMoveTab(false);
    setnavPrompt(false);
    setValue(0);
    setOpenCancelDialog(false);
    fetchCancel().then((res:any) => navigate(`/normalizer`, { state: { from: 1 } })
    );
  }
  const openNormaliserDetails = Boolean(anchorElNormaliser);
  const [reviewerAttachments, setreviewerAttachments] = useState<any>("");
  const handleClickReviewerDetails = (event: any, j: any) => {
    console.log(j, "jjjjr");
    setRatingComments(
      employeeData &&
      employeeData.data.reviewer.objective_description
        .filter((i: any) => i.name._id === j.name._id)
        .map((k: any) => k.comments)[0]
    );
    setreviewerAttachments(
      employeeData &&
      employeeData?.data?.reviewer?.attachments
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
    setanchorElReviewer(event.currentTarget);
  };
  const handleCloseReviewer = () => {
    setanchorElReviewer(null);
    setRatingComments(null);
  };

  const openReviewerDetails = Boolean(anchorElReviewer);

  const handleacceptChange = (event: any) => {
    setAccept(event.target.value as string);
  };

  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData.data.reviewer.objective_type.find(
        (item: any) => item.name._id === id
      );
    }
  };
  useEffect(() => {
    if (empData) {
      setNormalizerOverallFeedComments(() => {
        return empData?.data?.normalizer?.normalizer_overall_feedback
      });
    }
  }, [empData])

  useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)))
    setNormalizerOverallFeedComments(comments1)
    // setNormalizerComments(comments)
  }, [comments1]);


  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  const getNormalizerAttachments = (id: any) => {
    if (employeeData) {
      console.log(
        employeeData?.data?.normalizer,
        "objectiveDescriptionobjectiveDescription"
      );
      const data = employeeData?.data?.normalizer?.attachments
        ?.filter((item: any) => item?.objective_description === id)
        .map((j: any) => {
          return {
            name: j.name,
            url: j.url,
          };
        });
      return data;
    }
  };
  const getReviewerAttachments = (id: any) => {
    if (employeeData) {
      console.log(
        employeeData?.data?.reviewer,
        "objectiveDescriptionobjectiveDescription"
      );
      const data = employeeData?.data?.reviewer?.attachments
        ?.filter((item: any) => item?.objective_description === id)
        .map((j: any) => {
          return {
            name: j.name,
            url: j.url,
          };
        });

      return data;

      // if(data) return data
      // else return  null
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
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
              normalizer_attachment_url: getNormalizerAttachments(i.name._id),
              reviewer_attachment_url: getReviewerAttachments(i.name._id),
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

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // setnavPrompt(true)
    // setComments('')
    setRatingAppraiser("");
  };
  const ratingSubmitHandler = () => {
    //setnavPrompt(true)
    if (ratingAppraiser === ratingparams) {
      setrejectAlertMessage('You cannot select the same rating as the Appraiser. Please change the rating.')
      setrejectAlert(true);
      // setnavPrompt(true);
    } else if (ratingparams === null || ratingparams === '' || ratingparams === undefined) {
      setrejectAlertMessage('Please select a rating to reject!')
      setrejectAlert(true);
    } else if (comments == "" || comments == undefined) {
      setrejectAlertMessage('Please add rejection reason.')
      setrejectAlert(true);
    }
    else {
      closeDrawer();
      // setMoveTab(true);
      upDateNormalizer({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        rejection_reason: comments,
        rating_rejected: true,
        employee_id,
      });
      setRating("");
    }
  };
  const [title, setTitle] = useState<any>("");
  const openDrawerHandler = (objective: any) => {
    setAccept("Accept");
    //setnavPrompt(true);
    setTitle(objective?.name?.objectiveTitle);
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
    let temp = employeeData.data.reviewer.objective_description
      .filter((i: any) => i._id === activeObjectiveDescription)
      .map((k: any) => k.rejection_reason)[0];
    setRejectionReason(temp);
    let reviewerRatingValue = employeeData.data.reviewer.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    setRatingAppraiser(reviewerRatingValue);
  };

  const openDrawerHandlerreject = (objective: any) => {
    setAccept("Reject");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
    let reviewerRatingValue = employeeData.data.reviewer.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    setRatingAppraiser(reviewerRatingValue);
  };

  const acceptHandler = () => {
    // setActiveObjectiveDescriptionName(objective.name._id)
    // setActiveObjectiveDescription(objective._id)
    // setComments(objective.comments)
    // setRating(rating)

    // ratingSubmitHandler()
    let temp = employeeData.data.reviewer.objective_description
      .filter((i: any) => i._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];

    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      rating_rejected: false,
      ratings: temp,
      comments: comments,
      id: employee_id,
    });
    // setMoveTab(true);
    setRatingAppraiser("");
    closeDrawer();
    setComments("");
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  console.log(moveTab, "moveTab");
  console.log(employeeData, "gggg");
  console.log(ratingsData, "rating");
  console.log(employeeData.data.normalizer.objective_description, "myteam");

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
      normalizerAttachments({
        attachments: {
          url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id,
      });
    });
  };
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
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
  const open6 = Boolean(anchorEl6);
  const handleClickOpen6 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
    setreviewerAttachments(
      employeeData &&
      employeeData?.data?.reviewer?.attachments
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

  const handleClose6 = () => {
    setAnchorEl6(null);

    // setOpen2(false);
  };
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [submit, setSubmit] = useState(false);

  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2true);
    setAnchorEl7(event.currentTarget);
    setnormalizerAttachmentss(
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
  };

  const ratingWithdrawHandler = () => {
    closeDrawer();
    let temp = employeeData.data.appraisal.objective_description
      .filter((i: any) => i.name._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];

    upDateNormalizer({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      rejection_reason: comments,
      comments: "",
      rating_comments: "",
      employee_id,
    });
    setRating("");
    setComments("");
  }
  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo101 = Boolean(anchorEl01);

  const id101 = openInfo101 ? "simple-popover" : undefined;


  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);
    //setAnchorEl01(anchorEl01 ? null : event.currentTarget);
  };
  const handleClose101 = () => {
    setAnchorEl01(null);
  };
  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(null);
  const handleClose1 = () => {
    setAnchorE(null);
  };
  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE(event.currentTarget);
  };

  const open1 = Boolean(anchorE);
  const id = open1 ? "simple-popover" : undefined;
  const handleClickAway = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(anchorEl01 ? null : event.currentTarget);
  };

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
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
  const [popoverIndex, setPopoverIndex] = useState<any>("");

  const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
  };
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data?.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };
  //slider validation
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");
  const [appraiserComments, setAppraiserComments] = useState<any>("");
  const [appraiserComments1, setAppraiserComments1] = useState<any>();
  // useEffect(() => {
  //     setratingparams(ratingAppraiser);
  // }, [ratingAppraiser]);
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [message, setmessage] = React.useState("");
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    setnavPrompt(false);
    setisAlertOpen1(false);
    navigate(`/normalizer`, { state: { from: `${1}` } });
  };
  const [isAlertOpen, setisAlertOpen] = React.useState(false);
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);
  const handleAllFeedMandatory1 = () => {
    // setValue(1);
    setAllFeedMandatory1(false);
    setnavPrompt(false);
    setMoveTab(false);
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

  const open22 = Boolean(anchorE22);
  const id22 = open22 ? "simple-popover" : undefined;
  useEffect(() => {
    // Now you can take any action when ratingdefenition changes,
    // such as displaying it.
    console.log("Rating Definition has changed:", ratingdefenition);
  }, [ratingdefenition]);
  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    // setRatingAppraiser("");
    setrejectAlertMessage('')
  };
  const [isAlertOpen1, setisAlertOpen1] = React.useState(false);
  const handleAlertClose1 = () => {
    setisAlertOpen1(false);
    setisAlertOpen(false);
    setDisableButtons(false)
    // setValue(1)
    // setRatingAppraiser('')
  };

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    if (ratingAppraiser === j.rating) {
      setrejectAlertMessage('You cannot select the same rating as the Reviewer. Please change the rating.')
      setrejectAlert(true);
    } else {
      if (j) setRating(j._id);
      // setratingSelection(true);
    }
  };

  useEffect(() => {
    setAppraiserComments(() => {
      return employeeData?.data?.appraisal?.objective_description?.map(
        (i: any) => {
          return {
            ...i,
            remarks: i.remarks,
            ratings: i?.ratings?._id,
            objective_title: findObjectiveTitleById(i?.name?.objective_title),
            objective_type: findObjectiveTypeById(i?.name?.objective_type),
          };
        }
      );
    });
  }, [employeeData]);

  const [showReason, setShowReason] = useState(false);
  const [showReasonReviewer, setShowReasonReviewer] = useState(false);



  console.log(ratingparams, "ratingparams");
  console.log(ratingAppraiser, "ratingappraiser");
  //slider validation
  // rating hower
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEls);
  const id2 = openInfo ? "simple-popover" : undefined;
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEls(null);
  };
  // rating hower
  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
    },
  };
  const saveHandler = () => {
    setDisableButtons(true);
    updateMutation({
      "normalizer.objective_description": employeeData?.data?.reviewer.objective_description,
      // commented normalizer rating as it was reflecting on dashboard if status is draft.
      // "normalizer.normalizer_rating": employeeData?.data?.reviewer?.reviewer_rating,      
      "normalizer.normalizer_status": "draft",
      "appraisal.pa_status": "Pending with HR Normalizer",
      "normalizer.other_recommendation_comments":
        normalizerOtherRecommendationComments,
      "normalizer.training_recommendation_comments":
        normalizerTrainingRecommendationComments,
      "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments?.trim(),
      "normalizer.area_of_improvement_comments":
        normalizerAreaImprovementComments,
      id: employee_id,
    }).then((res: any) => {
      setMoveTab(false)
      setnavPrompt(false);
      setDisableButtons(false);
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true)
    });
    // if (moveTab == true) {
    //   setmessage("Changes were successfully saved.");
    //   setIsChange(true);
    //   setMoveTab(false)
    // } else {
    //   setmessage("No changes were made to save.");
    //   setIsChange(true);
    //   setMoveTab(false)
    // }
    //setmessage("Changes were successfully saved.");
    //setIsChange(true);

    // setisAlertOpen(true);


  };

  const handleAlertClose = () => {
    setisAlertOpen(false);
    setValue(1)
    // setRatingAppraiser('')
  };

  const handleAlertYes = () => {
    setReviewedOverallFeedback(true);
    setisAlertOpen(false);
    setisAlertOpen1(true);
    // setdisableSubmit(true);
    // setAllFeedMandatory(true);
    // setRatingAppraiser('')
  };
  const handleAlertYes1 = () => {
    setisAlertOpen1(false);
    let normalizerRating;
    if (employeeData?.data?.normalizer?.normalizer_rating == 0) {
      normalizerRating = employeeData?.data?.reviewer?.objective_description;
    } else {
      normalizerRating = employeeData?.data?.normalizer?.objective_description;
    }
    if (normalizerOverallFeedComments?.trim() == undefined || normalizerOverallFeedComments?.trim() == null || normalizerOverallFeedComments?.trim() == "") {
      setmessage('Please add rejection reason.')
      setAllFeedMandatory1(true);
    } else {
      let appraiser_objective_description = employeeData?.data?.appraisal?.objective_description?.map((item: any) => {
        return {
          ...item,
          rating_accepted: false,
          rating_rejected: false,
          rejection_reason: item.rating_resubmitted ? item.rejection_reason : ""
        }
      })
      updateMutation({
        normalizerIsChecked: true,
        normalizerIsDisabled: true,
        "normalizer.normalizer_status": "rejected",
        appraiserIsDisabled: false,
        "appraisal.appraiser_status": "normalizer-rejected",
        "appraisal.pa_status": "Pending with Appraiser (HR Normalizer Rejection)",
        "appraisal_previous_submission.pa_status": "Pending with Appraiser (HR Normalizer Rejection)",
        "appraisal.pa_rating": employeeData?.data?.current_rating?.overall_rating,
        "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments?.trim(),
        "normalizer_previous_submission.normalizer_overall_feedback": normalizerOverallFeedComments?.trim(),
        "normalizer.objective_description": normalizerRating,
        "normalizer.normalizer_rating": employeeData?.data?.current_rating?.overall_rating,
        "normalizer.normalizer_rejected": true,
        "reviewer.rejection_count": 0,
        "appraisal.objective_description": appraiser_objective_description,
        "appraisal_previous_submission.objective_description": appraiser_objective_description,
        "normalizer_previous_submission.objective_description": normalizerRating,
        "current_previous_submission.objective_description": employeeData?.data?.current_rating.objective_description,
        "normalizer.normalizer_PA_rejected": true,
        "normalizer.reason_for_rejection" : "",
        "normalizer_previous_submission.reason_for_rejection" : "",
        id: employee_id,
      }).then((res: any) => {
        updateLoggedRole({
          pa_action_by: `Normalizer (Rejected) (from Rating Tab): ${new Date()}`,
          id: employee_id
        });
        setDisableButtons(false);
        //snackbar
        setSuccessAlertTrigerMSG("The performance appraisal was submitted to the Appraiser.")
        setSuccessAlertTriger(true)
      });
      // setmessage("The performance appraisal has been successfully submitted to the Appraiser.");
      //  setmessage("The performance appraisal was submitted to the Appraiser.");
      // The performance appraisal has been submitted to the 
      //     setAllFeedMandatory(true);


      // Notification action Normalizer rejects Reviewer PA  (for Appraiser/Reviewer/Employee)
      let normalizerName = employeeData?.data?.normalizer_name;
      let employeeName = employeeData?.data?.first_name;
      let calendarName = employeeData?.data?.calendar?.calendar_type;
      let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
      let employeeCode = employeeData?.data?.employee_code

      let tempSubject = NORMALIZER_REJECTS_PA?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
      tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
      tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

      let tempHtml = NORMALIZER_REJECTS_PA?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
      tempHtml = tempHtml?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);


      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let normalizerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.normalizer_code)?.email

      let employeeEmail = employeeData?.data?.email;
      let email = NORMALIZER_REJECTS_PA?.to;
      const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
      email = email?.replace("[email]", `${appraiserEmail}`);
      const ccemail = [`${reviewerEmail}`]
      sendEmailNotification(
        {
          to: email,
          cc: ccemail,
          subject: tempSubject,
          html: tempHtml
        }
      )



    }
  };
  const [openYes, setOpenYes] = useState(false);
  const [Message, setMessage] = useState("")
  const submitHandler = () => {
    // rejectionHandler(empData.data.normalizer.rejection_count);
    // <<<<<<<<< Temporary merge branch 1



    //   if (normalizerOverallFeedComments == undefined || normalizerOverallFeedComments == null || normalizerOverallFeedComments == "") {
    //     setmessage('Please add the rejection reasons in the Overall Feedback.')
    //     setAllFeedMandatory1(true);
    //   } else {
    //     updateMutation({
    //       normalizerIsChecked: true,
    //       normalizerIsDisabled: true,
    //       "normalizer.objective_description":employeeData?.data?.reviewer.objective_description,
    //       "normalizer.normalizer_rating":employeeData?.data?.reviewer?.reviewer_rating,
    //       "normalizer.normalizer_status": "rejected",
    //       appraiserIsDisabled: false,
    //       "appraisal.appraiser_status": "normalizer-rejected",
    //       "normalizer.other_recommendation_comments":
    //         normalizerOtherRecommendationComments,
    //       "normalizer.training_recommendation_comments":
    //         normalizerTrainingRecommendationComments,
    //       "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments,
    //       "normalizer.area_of_improvement_comments":
    //         normalizerAreaImprovementComments,
    //       id: employee_id,
    //     });
    //   setmessage("The performance appraisal has been successfully submitted to the Appraiser.");
    //   // setAllFeedMandatory(true);
    //   setisAlertOpen(true);
    //   // setdisableSubmit(true);
    //   setnavPrompt(false);
    // }
    // =========
    // updateMutation({
    //   normalizerIsChecked: true,
    //   normalizerIsDisabled: true,
    //   "normalizer.normalizer_status": "rejected",
    //   appraiserIsDisabled: false,
    //   "appraisal.appraiser_status": "normalizer-rejected",
    //   "normalizer.other_recommendation_comments":
    //     normalizerOtherRecommendationComments,
    //   "normalizer.training_recommendation_comments":
    //     normalizerTrainingRecommendationComments,
    //   "normalizer.normalizer_overall_feedback": normalizerOverallFeedComments,
    //   "normalizer.area_of_improvement_comments":
    //     normalizerAreaImprovementComments,
    //   id: employee_id,
    // });
    // if (normalizerOverallFeedComments == undefined || normalizerOverallFeedComments == null || normalizerOverallFeedComments == "") {
    //   setmessage('Please add the rejection reasons in the Overall Feedback.')
    //   setAllFeedMandatory1(true);
    // } else {
    //   setmessage("The performance appraisal has been successfully submitted to the Appraiser.");
    //   // setAllFeedMandatory(true);
    //   setisAlertOpen(true);
    //   // setdisableSubmit(true);
    //   setnavPrompt(false);
    // }
    setDisableButtons(true);
    setisAlertOpen1(true);



    // >>>>>>>>> Temporary merge branch 2
  };


  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [rejectionAnchor, setRejectionAnchor] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openRejection = Boolean(rejectionAnchor)
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;
  const idRejection = openRejection ? "simple-popover" : undefined;
  const handleClickRejectionAttachments = (event: React.MouseEvent<HTMLButtonElement>) => {
    setRejectionAnchor(event.currentTarget);
  };
  const handleCloseRejectionAttachments = () => {
    setRejectionAnchor(null);
  };
  const handleClick8 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setreviewerAttachments(
      employeeData &&
      employeeData?.data?.reviewer?.attachments
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
    setAnchorEl8(event.currentTarget);
  };
  const handleClose8 = () => {
    setAnchorEl8(null);
  };

  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;
  const handleClick9 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setnormalizerAttachmentss(
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
    console.log(employeeData?.data?.normalizer?.attachments
      .filter((i: any) => i?.objective_description === j.name._id), "normalizer")
    setAnchorEl9(event.currentTarget);
  };
  const handleClose9 = () => {
    setAnchorEl9(null);
  };
  const handleViewPA = () => {
    window.open(`${NORMALIZER_VIEW_PA}/employee/${employee_id}`, '_blank')
  }
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
  const getAttachments3 = (id: any) => {
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
  const getAttachments1 = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.reviewer?.attachments
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
  const getAttachments2 = (id: any) => {
    console.log(id, "id for attachmetns ");
    console.log(employeeData, "employeedata")

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

  const handleCommentsChange = (e: any) => {
    // console.log(e);
    setNormalizerOverallFeedComments(e.target.value)
    setnavPrompt(true)
  }



  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        open={isDrawerOpen}

      // sx={maxWidth: 300px}
      // onClose={toggleDrawer(anchor, false)}
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
          HR Normalizer Action
        </div>
        <Dialog
          open={rejectAlert}
          onClose={handleSliderDialogClose}
          // aria-labelledby="responsive-dialog-title"
          // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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
              {/* You cannot put the same rating as the reviewer. Please change the
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
                  marginRight: "10px",
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
        {/* <p style={{ textAlign: "left", paddingLeft: "10px" }}>Your Action</p> */}
        {/* <p style={{ textAlign: "left", paddingLeft: "10px" }}>
                        <FormControl>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
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
                    </p> */}
        {/* </Item2> */}
        {accept === "Accept" && (
          <>
            <Typography
              style={{
                paddingLeft: "20px",
                paddingTop: "10px",
                //backgroundColor: "#ebf2f4",
                color: "#3E8CB5",
                fontSize: "17px",
                fontFamily: "arial"
              }}
            >
              {title}
            </Typography>
            <Item2>

              <Typography
                style={{
                  paddingRight: "381px",
                  fontSize: "12px",
                  color: "#7A7A7A",
                  fontFamily: "Arial",
                  paddingBottom: "7px",
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
                  // setMoveTab(true);
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
                {/* <Button
                                style={{
                                    textTransform: "none",
                                    color: "#252a2e",
                                }}
                                onClick={closeDrawer}
                            >
                                {" "}
                                Cancel{" "}
                        </Button> */}
              </Stack>
            </Item2>
          </>
        )}
        {accept === "Reject" && (
          <>
            <Typography
              style={{
                paddingLeft: "24px",
                paddingTop: "16px",
                //paddingBottom: "10px",
                //backgroundColor: "#ebf2f4",
                color: "#3E8CB5",
                fontSize: "17px",
                fontFamily: "Arial"
              }}
            >
              {title}
            </Typography>
            <Item2 sx={{ width: "fitContent" }}>


              <div
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  fontSize: "12px",
                  paddingBottom: "7px",
                  color: "#7A7A7A",
                  fontFamily: "Arial"
                }}>
                {/* Normalizer Score */}
                HR Normalizer Rating
              </div>
              <Stack
                style={{ paddingLeft: "10px" }}
                direction="row"
                //  height="50px"
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
                              // if (ratings)
                              //     setRating(ratings._id);
                              // ratingColorHandler(rating._id)
                              //setnavPrompt(true)
                              handleRatingAlert(ratings);
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
                              {ratings?.rating}
                            </p>
                          </Button>

                          {/* {rating === ratings._id && (
                                                            <p style={{ color: "#3C8BB5", fontSize: "10px" }}>
                                                                {ratings?.rating_scale}
                                                            </p>
                                                        )} */}
                        </Contain>

                        {/* <p style={{ color: "#3C8BB5", fontSize: "10px" }}>{ratings.rating_scale}</p> */}
                      </Item1>
                    ))}
              </Stack>
              <Typography style={{
                textAlign: "left",
                paddingLeft: "10px",
                fontSize: "12px",
                fontFamily: "arial",
                paddingTop: "16px",
                color: "#7A7A7A",
                paddingBottom: "7px",
              }}>Reviewer Rating
              </Typography>
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
                      <p>
                        {ratingAppraiser}

                      </p>
                    </Button>


                  </Stack>
                </Contain>
              </Item1>

              {/* <p style={{ textAlign: "left"}}>(Previous Rating)</p> */}
              {/* {RejectionReason && (
                  <div>
                    <p style={{ textAlign: "left", fontSize: "12px",
               fontFamily:"arial",paddingLeft: "10px" }}>
                      Reviewer Reason for Rejection :{" "}
                    </p>

                    <div>{RejectionReason}</div>
                  </div>
                )}
              {employeeData.data.reviewer.rejection_count == 2 && 
               (<p style={{ textAlign: "left", fontSize: "12px",
               fontFamily:"arial", paddingLeft: "10px" }}>
                  Submit reasons of the rejections
                </p>
                )}
                              {employeeData.data.reviewer.rejection_count == 2 &&
                (<div>
                  {employeeData.data.reviewer.rejection_count == 2 ? (
                    <>
                      <FormControl style={{ textAlign: "left" }}>
                        <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                        <RadioGroup
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="the rating was not agreed with the appraiser"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="An error made by the Appraiser"
                          />
                        </RadioGroup>
                      </FormControl>
                    </>
                  ) : employeeData.data.reviewer.rejection_count == 1 ? (
                    "Second Time"
                  ) : (
                    "First Time"
                  )}{" "}
                </div>)} */}

            </Item2>
            <div
              style={{
                textAlign: "left",
                paddingLeft: "26px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "Arial"
              }}>Comments</div>

            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  fontFamily: "Arial",
                  color: "#333333",
                },
              }}
              size="small"
              style={{ paddingLeft: "28px", width: "75%" }}
              // fullWidth
              multiline
              value={comments}
              inputProps={{ maxLength: 500 }}
              onChange={(e) => {
                setComments(e.target.value);
                // setMoveTab(true);
                // setnavPrompt(true);
              }}
            />
            <div

              style={{
                textAlign: "left",
                paddingLeft: "28px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "Arial"
              }}
            >Attachment
            </div>
            <div style={{ paddingLeft: "28px" }}>
              <Stack direction="row" alignItems="center">

                <span>
                  <input
                    id="photo"
                    style={styles.colors}
                    name="photo"
                    type="file"
                    ref={inputRef}
                    multiple={true}
                    onChange={handleImageChange}
                  />
                </span>

                <Text>
                  {positionHide && (
                    <IconButton
                      onClick={() => {
                        // setFileSelected('')
                        // setName('')
                        resetFileInput();
                      }}
                    >
                      <img
                        src={Closeiconred}
                        alt="icon"
                      />
                    </IconButton>
                  )}
                </Text>
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
                  width: "70px"
                }}
                variant="outlined"
                onClick={() => {
                  ratingSubmitHandler();
                  if (name && fileSelected) {
                    return imageClick();
                  }
                }}
              >
                Save{" "}
              </Button>
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
                onClick={() => {
                  ratingWithdrawHandler();
                }}
              >
                {" "}
                Withdraw{""}
              </Button>


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
                onClick={closeDrawer}
              >
                {" "}
                Cancel{" "}
              </Button>
            </Stack>
          </>
        )}
      </Drawer>
      <Box
        sx={{
          // maxWidth: "95% !important",
          //   marginTop: "5px",
          // height: "1408px",
          // height: "calc(100vh - 165px)",
          // marginLeft:"25px",
          // marginRight:"25px",
          // background: "#fff",
        }}
      >
        <Box
          style={{
            padding: "35px",
            paddingBottom: "0px"
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
              <Typography
                style={{
                  fontSize: "17px",
                  color: "#3e8cb5",
                  fontFamily: "Arial",
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
                  {/* {employeeData?.data?.appraisal?.status === "in-progress" ? "in-progress" :
                    employeeData?.data?.appraisal?.status === "not-started" ? "Not-started" :
                    employeeData?.data?.appraisal?.status}  */}
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
                <Overallrating style={{ display: "flex", alignItems: "center",fontSize: "17px", }} >
                  Previous Rating:
                  {/* {employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && ( */}
                  <Overallratingvalue style={{ fontSize: "14px" }} >
                    <span style={{
                      color: "#717171",
                      fontSize: "17px",
                      fontFamily: "Arial",
                    }} > {((employeeData?.data?.previous_rating && employeeData?.data?.previous_rating !== 0  && employeeData?.data?.previous_rating !== undefined)  && employeeData?.data?.previous_rating !== undefined) ? employeeData?.data?.previous_rating?.toFixed(2) : "-"}</span>
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
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
            // mr={2}
            sx={{
              // borderRadius: "5px",
              // boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#f3fbff",
            }}
            // divider={<Divider orientation="vertical" flexItem />}
            spacing={2}
          >
            <Item>
              <Box>
                <Stack direction="row" spacing={1}>
                  {/* <Avatar style={{ width: "50px", height: "50px" }}>
                    {employeeData?.data?.legal_full_name.substring(0, 1)}
                  </Avatar> */}
                  {empData?.data?.profile_image_url != undefined ? (
                    <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={empData?.data?.profile_image_url} />
                  ) : (
                    <Avatar style={{ width: "55px", height: "55px" }}>
                      {appraisalData &&
                        appraisalData.data.legal_full_name.substring(0, 1)}
                    </Avatar>
                  )}
                  <Box>
                    <Stack direction="row" spacing={1}>
                      <Name>{employeeData?.data?.first_name}</Name>
                      {/* <Grade>
                          (Grade{appraisalData && appraisalData.data.grade})
                        </Grade> */}
                    </Stack>
                    <Speciality>
                      {/* {appraisalData &&
                          appraisalData.data.position_long_description} */}
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
                      {/* <Pastrating>Employee Code :</Pastrating> */}
                      <Pastratingvalue>
                        {employeeData?.data?.employee_code}
                      </Pastratingvalue>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Item>
            {/* {potential != false && */}
            {/* <Item>
              <Stack direction="column" alignItems="center">
                <Typography
                  color="#3e8cb5"
                  fontFamily="arial"
                  fontSize="17px"
                >
                  Potential Level
                </Typography>

                <Typography>
                  {employeeData?.data?.appraisal?.potential}
                </Typography>
              </Stack>
            </Item> */}
            {/* } */}

            <Item >
              <Stack direction="column" alignItems="center">
                <Overallrating>Overall Rating

                  <Popover
                    id={id22}
                    open={open22}
                    anchorEl={anchorE22}
                    onClose={handleClose22}
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
                </Overallrating>

                <Overallratingvalue>
                  {ratingdefenition?.length > 0 &&
                    <IconButton sx={{padding:"4px"}} onClick={handleClick22} >
                      <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                    </IconButton>
                  }
                  <b>
                    {employeeData?.data?.current_rating?.overall_rating?.toFixed(2)}
                    {/* {employeeData &&
                      employeeData?.data?.appraisal?.appraiser_rating == 0
                      ? "-"
                      : employeeData?.data.appraisal?.appraiser_rating} */}
                  </b>
                </Overallratingvalue>
                {/* <Overallratingcomments>
                  {employeeData &&
                    getRatingDescription(
                      employeeData?.data?.appraisal?.appraiser_rating
                    )}
                </Overallratingcomments> */}
              </Stack>
            </Item>
          </Stack>
          <Box sx={{ paddingTop: "20px" }}>
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
                  {employeeData?.data?.calendar?.name}
                </Typography>

              </Grid>
              <Grid item xs={4}>
                {/* <Item> */}

                {employeeData?.data?.appraisal_template?.potential == true && (
                  <Stack direction="column" alignItems="flex-end">
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <Typography
                        color="#3e8cb5"
                        fontFamily="arial"
                        fontSize="17px"
                      >
                        <IconButton sx={{padding:"4px"}} onClick={handleClick1} >
                          <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                        </IconButton>
                        Potential Level

                        <Popover
                          id={id}
                          open={open1}
                          anchorEl={anchorE}
                          onClose={handleClose1}
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
                                  //borderBottom: "1px solid #d9d9d9",
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
                                  //  color: "#3e8cb5",
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
                )}
                {/* </Item> */}
              </Grid>

            </Stack>
          </Box>
          {/* {employeeData && employeeData?.data?.normalizer?.normalizer_status == "rejected" && ( */}
          <>
            <TrainingRecommendations>
              <b>HR Normalizer Rejection Reason</b>
              <span style={{
                fontSize: "22px",
              }}>*</span>
            </TrainingRecommendations>
            <Containnn>
              <Tf1>

                <TextField
                  // placeholder="Add"
                  size="small"
                  // disabled={disableTextAfterSubmission}
                  InputProps={{ readOnly: disableTextAfterSubmission }}
                  //  fullWidth
                  multiline
                  // InputProps={{ readOnly: true }}
                  // variant="standard"
                  autoComplete="off"
                  //   InputProps={{
                  //     disableUnderline: true,
                  //   }}
                  name="comments"
                  value={normalizerOverallFeedComments}
                  onChange={e => {
                    handleCommentsChange(e)
                    setnavPrompt(true);
                    setMoveTab(true);
                  }} />

              </Tf1>
            </Containnn>
          </>
          {/* )} */}
          <Box style={{ paddingLeft: "0px" }}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                paddingLeft: "0px",
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
                        </IconButton>)}
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
                    sx={{ minWidth: 200,
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
                              {/* <option>Rating Scale Title</option> */}
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
          <Dialog
            // fullScreen={fullScreen}
            open={allFeedMandatory1}
            // onClose={handleAllFeedMandatory1}
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
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                  wordBreak: "break-word",
                  // height: "100px",
                  // width: "300px",
                  alignItems: "center",
                  overflowY: "hidden",
                }}
              >

                {message}
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
              {/* <Link style={{
              fontSize: "18px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }} 
            color="inherit" 
            to={`/dashboardreview`}
            state={{
              from:`${1}`
            }}
           
            > */}
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
                }}
                variant="outlined"
                autoFocus
                onClick={handleAllFeedMandatory1}
              >
                Ok
              </Button>
              {/* </Link> */}
            </DialogActions>
          </Dialog>
          <Dialog
            open={isAlertOpen}
            // onClose={handleAlertClose}
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
                  onClick={handleAlertClose}
                  // onClick={handleAlertClose}
                  autoFocus
                >

                  No

                </Button>
              </DialogActions>
            </Stack>
          </Dialog>
          <Dialog
            open={isAlertOpen1}
            // onClose={handleAlertClose1}
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
                {/* Are you sure you wish to reject selected performance appraisal?  */}
                Are you sure you wish to reject the performance appraisal?
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
                  onClick={handleAlertYes1}
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
                  onClick={handleAlertClose1}
                  autoFocus
                >

                  No

                </Button>
              </DialogActions>
            </Stack>
          </Dialog>

          <AlertDialogSuccess
            isAlertOpen={isChange}
            handleAlertClose={isChangeHandlerClose}>
            {message}
          </AlertDialogSuccess>

          <Dialog
            // fullScreen={fullScreen}
            open={allFeedMandatory}
            onClose={handleAllFeedMandatory}
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
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                // textAlign: "center",
              },
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            {/* <DialogTitle
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              id="alert-dialog-title"
            >
              <IconButton onClick={handleAllFeedMandatory}>
                <img src={Closeicon} alt="icon" />
              </IconButton>
            </DialogTitle> */}
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
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // paddingBottom: "30px",
              }}
            >
              <Link style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
                color="inherit"
                to={`/normalizer`}
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

          {value === 0 && (
            <TableContainer >
              <Table sx={{
                borderCollapse: 'separate',
                borderSpacing: '0px 15px'
              }} size="small" aria-label="simple table">
                <TableHead
                  style={{
                    background: "#eaeced",
                    fontSize: "15px",
                    fontWeight: "400",
                  }}
                >
                  {/* <div style={{ backgroundColor: "#F1F1F1", }}>
            <Container
                sx={{
                    maxWidth: "96.5% !important",
                    // height: "1408px",
                    // height: "calc(100vh - 165px)",
                    background: "#fff",
                }} */}
                  <TableRow>
                    <TableCell
                      style={{
                        fontFamily: "Arial",
                        fontSize: "14px",
                        fontWeight: "600",
                        background: "#eaeced",
                        textAlign: "center",
                        // borderBottom: "1px solid #fff",
                        // padding: "6px 16px",
                        color: "#3e8cb5"

                      }}
                    >

                      Objective<br></br> Type

                    </TableCell>
                    <TableCell
                      style={{
                        background: "#eaeced",
                        textAlign: "center",
                        // borderBottom: "1px solid #fff",
                        // width: "11%",
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
                          // padding: "6px 16px"
                          // margin:"-5px"
                        }}
                      >
                        Objective<br></br> Title
                      </div>

                    </TableCell>
                    <TableCell
                      style={{
                        background: "#eaeced",
                        textAlign: "center",
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
                      style={{
                        background: "#eaeced",
                        textAlign: "center",
                        fontFamily: "Arial",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#3e8cb5",
                        padding: "0px 8px"
                      }}
                    >




                      Appraiser<br></br> Rating



                    </TableCell>

                    {employeeData?.data?.appraisal?.objective_description.filter((item: any) =>
                      item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                      (<TableCell
                        style={{
                          background: "#eaeced",
                          textAlign: "center",
                          // borderBottom: "1px solid #fff",
                          // width: "7%",
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
                            // width:'70px',
                            textAlign: 'center',
                            // padding: "6px 16px"
                            // margin:"-5px"
                          }}
                        >


                          Appraiser<br></br> Comments

                        </div>

                      </TableCell>)}


                    {employeeData?.data?.appraisal?.objective_description?.filter
                      ((item: any) => (item?.rating_rejected == true || item.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
                        <TableCell
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            // borderBottom: "1px solid #fff",
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",
                            // padding: "6px 16px"
                          }}
                        >


                          Appraiser<br></br> Rejection/Change Reason

                        </TableCell>
                      )}
                    {/* <th
                      style={{
                        background: "#eaeced",
                        textAlign: "center",
                        // borderBottom: "1px solid #fff",
                        // width: "7%",
                      }}
                    >
                      <form>
                        <div
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",
                            border: "none",
                            background: "none",
                            // width:'70px',
                            textAlign: 'center',
                            padding:"6px 16px"
                            // margin:"-5px"
                          }}
                        >


                          Reviewer<br></br> Rating

                        </div>
                      </form>
                    </th> */}
                    {/* {showReasonReviewer && (
                    <th
                      style={{
                        background: "#eaeced",
                        textAlign: "center",
                        // borderBottom: "1px solid #fff",
                        // width: "14%",
                      }}
                    >
                      <form>
                        <div
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",
                            border: "none",
                            background: "none",
                            padding:"6px 16px"
                            // margin:"-5px"
                          }}
                        >


                          Reviewer<br></br> Rejection Reason

                        </div>
                      </form>
                    </th>
                    )} */}
                    {/* <th
                      style={{
                        background: "#eaeced",
                        textAlign:"center",
                        // borderBottom: "1px solid #fff",
                        // width: "7%",
                      }}
                    >
                      <form>
                        <text
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",
                            border: "none",
                            background: "none",
                            // width:'70px',
                            textAlign:'center'
                            // margin:"-5px"
                          }}
                        >
                        
                           
                            HR Normalizer Rating
                          
                        </text>
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                        textAlign:"center",
                        // borderBottom: "1px solid #fff",
                        // width: "14%",
                      }}
                    >
                      <form>
                        <text
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
                          
                            Normalizer Comments
                          
                        </text>
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                        textAlign:"center",
                        // borderBottom: "1px solid #fff",
                        // width: "10%",
                      }}
                    >
                      <form>
                        <text
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
                          
                            Normalizer Actions
                         
                        </text>
                      </form>
                    </th> */}
                  </TableRow>
                </TableHead>

                <TableBody
                  style={{
                    fontSize: "14px",
                  }}
                >
                  {employeeData &&
                    objectiveTitleData && colorarray &&
                    objectiveDescription.map((j: any, index: any) => {
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
                              width="200px"
                              // rowSpan={3}
                              style={{


                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: "#333333",
                                textAlign: "left",
                                wordBreak: "break-word",
                                // padding: "6px 16px",
                                lineHeight: "20px",
                                backgroundColor: colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name) != undefined ? colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name)?.color : Colors[0],
                                // background: "#BEECF5",
                              }}
                            >
                              {j.objective_type?.name?.name}
                            </TableCell>
                            <TableCell
                              width="180px"
                              style={{
                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: "#333333",
                                textAlign: "left",
                                wordBreak: "break-word",
                                background: "#ffffff",
                              }}
                            >
                              <Stack direction="row" alignItems="center" >
                                <IconButton
                                sx={{padding:"4px"}}
                                  aria-describedby={id101}
                                  onClick={(e: any) => {
                                    setActiveObjectiveId(j._id);
                                    handleClickInfo11(e)
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
                                  }}>
                                  {j?.name?.objectiveTitle}
                                </Typography>
                              </Stack>
                              <Popover
                                id={"id101"}
                                open={(popoverIndex === index) && openInfo101}
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
                                    padding: "5px"
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
                              width="15px"
                              style={{
                                wordBreak: "break-word",
                                // padding: "6px 16px",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: "#333333",
                                lineHeight: "20px",
                                background: "#FBFBFB",
                                padding: "0px px"
                              }}
                              align="center"
                            >
                              {/* <> */}
                              <Stack
                                direction='row'
                                justifyContent="center"
                                alignItems="center"
                              > 
                              {(j.level_1_isChecked ||
                                j.level_2_isChecked ||
                                j.level_3_isChecked ||
                                j.level_4_isChecked) && (
                                  <IconButton
                                    style={{ padding: "4px" }}
                                    aria-describedby={id102}
                                    onClick={(e: any) => {
                                      setActiveObjectiveId2(j._id);
                                      handleClickInfo12(e)
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
                                  <span>L1  </span>{" "}
                                  <span>
                                    {/* {j?.name?.level_1?.level_definition} */}
                                  </span>
                                  <br />

                                </>
                              )}
                              {j.level_2_isChecked && (
                                <>
                                  {" "}
                                  <span>L2  </span>{" "}
                                  <span>
                                    {/* {j?.name?.level_2?.level_definition} */}
                                  </span>
                                  <br />

                                </>
                              )}
                              {j.level_3_isChecked && (
                                <>
                                  {" "}
                                  <span>L3 </span>{" "}
                                  <span>
                                    {/* {j?.name?.level_3?.level_definition} */}
                                  </span>
                                  <br />

                                </>
                              )}
                              {j.level_4_isChecked && (
                                <>
                                  {" "}
                                  <span>L4  </span>{" "}
                                  <span>
                                    {/* {j?.name?.level_4?.level_definition} */}
                                  </span>


                                </>
                              )}
                              {/* </> */}
                              </Stack> 


                              <Popover
                                id={"id102"}
                                // open={openInfo102}                               
                                open={(popoverIndex === index) && openInfo102}
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
                                    padding: "5px"
                                  }}
                                >

                                  <div
                                    style={{
                                      fontSize: "12px",
                                      fontFamily: "arial",
                                      lineHeight: "20px",
                                    }}
                                  >

                                    {openInfo102 && j._id === activeObjectiveId2 && (
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
                                              } </b>
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
                              width="15px"
                              style={{
                                fontFamily: "Arial",
                                fontSize: "14px",
                                textAlign: "center",
                                lineHeight: "20px",
                                background: "#ffffff",
                                padding: "0px 8px"
                                // color:
                                //   employeeData &&
                                //   employeeData?.data?.appraisal?.objective_description
                                //     .filter(
                                //       (i: any) => i?.name?._id === j?.name?._id
                                //     )
                                //     .map((k: any) => {
                                //       if (k?.ratings)
                                //         return k.rating_rejected === true;
                                //     })[0] && "#FF0000",
                                // color: "#333333",
                              }}
                            >
                              <div style={{ display: "inline-flex" }}>
                                <div style={{
                                  // fontFamily: "Arial",
                                  // fontSize: "14px",
                                  // width: "30px",
                                  // lineHeight: "30px",
                                  // borderRadius: "50%",
                                  // background:"red",
                                }}>


                                  {employeeData &&
                                    employeeData.data.appraisal.objective_description
                                      .filter((i: any) => i.name._id === j.name._id)
                                      .map((k: any) => {
                                        if (k?.ratings && k.rating_rejected == true)
                                          return <RatingBackground onClick={(e: any) => { handlePreviousRatingPopOverOpen(e, j); setPopoverIndex(index) }} style={{ color: "white", background: "#D2122E" }}>{k?.ratings?.rating}</RatingBackground>;
                                        else if (k?.ratings && k.rating_accepted == true || k.rating_resubmitted == true)
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
                                </div>
                              </div>
                            </TableCell>
                            {employeeData?.data?.appraisal?.objective_description.filter((item: any) =>
                              item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                              (
                              <TableCell
                                width="250px"
                                style={{
                                  textAlign: "left",
                                  // padding: "6px 16px",
                                  lineHeight: "20px",
                                  background: "#FBFBFB",
                                }}
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  // justifyContent="center"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "Arial",
                                      color: '#333333',

                                    }}
                                  >
                                    {employeeData &&
                                      employeeData?.data?.appraisal?.objective_description
                                        .filter(
                                          (i: any) =>
                                            i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any, index: any) => {
                                          if (
                                            k?.comments === "" ||
                                            k?.comments === undefined
                                          ) {
                                            return k?.remarks;
                                          }
                                          else {
                                            return k?.comments;
                                          }
                                        })[0]}
                                  </Typography>
                                  {employeeData && getAttachments3(j?.name?._id)?.length > 0 &&
                                    <AttachFileIcon
                                      style={{
                                        color: "#93DCFA",
                                        cursor: 'pointer',
                                        height: "18px",
                                        transform: "rotate(30deg)",
                                      }}
                                      aria-describedby={"id"}
                                      onClick={(e: any) => {
                                        handleClick9(e, j)
                                        setPopoverIndex1(index)
                                      }}
                                    />
                                  }
                                  <Popover
                                    id={"id9"}
                                    open={(popoverIndex1 === index) && open9}
                                    anchorEl={anchorEl9}
                                    onClose={handleClose9}
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
                                        padding: '5px',
                                        lineHeight: "20px"
                                        // maxWidth:"215px",
                                        // wordBreak:"break-all"
                                      }}
                                    >
                                      {/* Attachments: {appraisalAttachments} */}
                                      {employeeData && getAttachments3(j?.name?._id)?.map((k: any, index1: any) => {
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
                                                {/* <IconButton>
                                              <img src={Downloadatt} />
                                            </IconButton> */}
                                                <IconButton>
                                                  {/*                                               
                                              <img
                                               src={Removeatt}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                                  {/* <img
                                               src={Removeattnew}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                                </IconButton>
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
                                      })}
                                    </Typography>
                                  </Popover>
                                </Stack>
                              </TableCell>
                              )}
                            {employeeData?.data?.appraisal?.objective_description?.filter
                              ((item: any) => (item?.rating_rejected == true || item.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined))?.length > 0 && (
                                <TableCell
                                  width="250px"
                                  style={{

                                    // padding: "6px 16px",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "left",
                                    lineHeight: "20px",
                                    background: "#fbfbfb",
                                    // align="left"
                                  }}
                                >
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    // justifyContent="center"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <Typography
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                        color: '#333333',

                                      }}
                                    >
                                      {employeeData &&
                                        employeeData?.data?.appraisal?.objective_description
                                          .filter((i: any) => i?.name?._id === j?.name?._id)
                                          .map((k: any) => {
                                            console.log(
                                              k?.ratings?.rating,
                                              "k.ratings.rating"
                                            );
                                            if (k.rating_rejected == true || k.rating_resubmitted == true)
                                              return k.rejection_reason;
                                          })[0]}
                                    </Typography>
                                    <Box sx={{ flexGrow: 0, display: "block" }}>
                                      {employeeData && getAppraiserRejectionAttachments(j?.name?._id)?.length > 0 &&
                                        (employeeData?.data?.appraisal?.objective_description
                                          .filter((i: any) => i?.name?._id === j?.name?._id)
                                          .map((k: any) => {
                                            console.log(
                                              k?.ratings?.rating,
                                              "k.ratings.rating"
                                            );
                                            if (k.rating_rejected == true || k.rating_resubmitted == true)
                                              return k.rejection_reason;
                                          })[0]) &&
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
                                      {/* {/* <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "#52C8F8",
                                  fontFamily: "Arial",
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                                
                              >
                                File Attached
                              </Typography> */}

                                      {/* <AttachFileIcon
                                style={{ color: "#93DCFA",height:"18px" }}
                                aria-describedby={"id"} */}
                                      {/* // onClick={(e)=>{handleopen() */}
                                      {/*  }}
                                onClick={(e: any) => handleClickOpen6(e,j)}
                              /> */}

                                      {/*              <AttachmentPopup open={open6}anchorEl={anchorEl6} onClose={handleClose6} >*/}
                                      {/*              /!* {opendropdown && *!/*/}
                                      {/*              */}
                                      {/*               <div style={{ position: 'relative',padding:"5px", backgroundColor: "#f8f8ff" }}>*/}
                                      {/*                /!* {j.appraisal_attachment_url.map((k: any) => <a href={k.url}> {k.name} </a>)} *!/*/}
                                      {/*              {employeeData?.data?.appraisal?.attachments.filter((i: any) => {*/}

                                      {/*                   return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id*/}
                                      {/*                 })*/}
                                      {/*                 .map((k: any) => {*/}
                                      {/*                   return <a href={k.url}> {k.name} </a>;*/}
                                      {/*                 })*/}
                                      {/*                 }*/}
                                      {/*                </div>*/}
                                      {/*/!* }  *!/*/}
                                      {/*/!*                </AttachmentPopup >*!/*/}

                                      {/*                      {j.appraisal_attachment_url.map((k:any) => {*/}
                                      {/*                        return (*/}
                                      {/*                            <>*/}
                                      {/* <AttachmentPopup open={open6}anchorEl={anchorEl6} onClose={handleClose6} name={employeeData?.data?.appraisal?.attachments} id ={j?.name?._id} >
                                              {/*{j?.appraisal_attachment_url[0]?.name}*/}
                                      {/* </AttachmentPopup>  */}
                                      {/*</>*/}
                                      {/*)*/}
                                      {/*})}*/}
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
                                                  {/* <IconButton>
                                              <img src={Downloadatt} />
                                            </IconButton> */}


                                                  {/* <img
                                                      style={{ cursor: 'pointer' }}
                                                      src={Removeattnew}
                                                      onClick={() => deleteRejectionAppraiserMutation({
                                                        id: employee_id,
                                                        name: k.remove,
                                                        objective_description : j.name._id
                                          })} /> */}

                                                </Stack>

                                              </Stack>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </Popover>
                                  </Stack>

                                </TableCell>
                              )}

                            {/* <td
                              width="10px"
                              style={{

                      //  padding: "6px 16px",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: employeeData &&
                                  employeeData?.data?.reviewer?.objective_description
                                    .filter(
                                      (i: any) =>
                                        i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000",
                                textAlign: "center"
                              }}
                            >
                              {employeeData &&
                                employeeData.data.reviewer.objective_description
                                  .filter((i: any) => i.name._id === j.name._id)
                                  .map((k: any) => {
                                    if (k.ratings) return k.ratings.rating;
                                  })[0]}
                            </td> */}
                            {/* {showReasonReviewer && (
                            <td
                              width="250px" 
                              style={{ textAlign: "left",padding:"6px 16px" }}>
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
                                   
                                  }}
                                >
                                  {employeeData &&
                                    employeeData?.data?.reviewer?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings) return k?.rejection_reason;
                                      })[0]}
                                </Typography>

                                <Box>
                                  {employeeData && getAttachments1(j?.name?._id)?.length > 0 &&

                                    <AttachFileIcon
                                      style={{
                                        color: "#93DCFA",
                                        cursor:'pointer',
                                        height: "18px",
                                        transform: "rotate(30deg)",
                                      }}
                                      aria-describedby={"id8"}
                                      onClick={(e: any) => {
                                        handleClick8(e, j)
                                        setPopoverIndex1(index)
                                      }}
                                    />
                                  }
                                </Box>
                                <Popover
                                  id={id8}
                                  open={(popoverIndex1 === index) && open8}
                                  anchorEl={anchorEl8}
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
                                > */}

                            {/* <Stack
                                    spacing={1}
                                    direction="row"
                                    alignItems="center"
                                  >
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        padding:'5px',
                                        lineHeight:"20px"
                                        
                                      }}
                                    >
                                      {employeeData && getAttachments1(j?.name?._id)?.map((k: any, index1: any) => {
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
                                               
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
                                      })}
                                    </Typography>
                                     
                                  

                                  </Stack>
                                
                                </Popover>

                              </Stack>
                            </td>
                            )}
                            */}
                            {/* <td
                            width="10px"
                              style={{
                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: "#333333",
                                textAlign:'center',
                           }}
                            >
                                 <Typography
                            style={{
                              fontSize: "14px",
                              fontFamily: "Arial",
                              // @ts-ignore
                              color:
                                j.rating_rejected === true && "#FF0000",
                              // display: j.rating_rejected === true ? 'Block': 'none'
                            }}
                          >
                            {j.rating_rejected === true
                                    ? j?.ratings && j?.ratings?.rating
                                    : employeeData &&
                                      employeeData?.data?.appraisal?.objective_description
                                        .filter(
                                          (i: any) =>
                                            i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => {
                                          if (k?.ratings)
                                            return k?.ratings?.rating;
                                        })[0]}
                          </Typography>
                            </td> */}
                            {/* <td 
                            width="170px" 
                            style={{ textAlign: "center" }}>
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
                                    color:'#333333',
                                    paddingLeft:"5px"
                                  }}
                                >
                                  {employeeData &&
                                    employeeData.data.normalizer.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings) return k?.comments;
                                      })[0]}
                                </p>

                                <Popover
                                  id={"NormaliserComments"}
                                  open={openNormaliserDetails}
                                  anchorEl={anchorElNormaliser}
                                  onClose={handleCloseNormaliser}
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
                                  <Typography
                                    sx={{ p: 2, backgroundColor: "#f8f8ff" }}
                                  >
                                
                                  </Typography>
                                </Popover>
                               
                                 <Box>
                                 {employeeData && getAttachments2(j?.name?._id)?.length > 0 &&
                               <AttachFileIcon
                                style={{
                                  color: "#93DCFA",
                                  cursor:'pointer',
                                  height: "18px",
                                  transform: "rotate(30deg)",
                                }}
                                aria-describedby={"id9"}
                                onClick={(e: any) =>{handleClick9(e,j)
                                  setPopoverIndex2(index)
                                }}
                              />
                    }
                              
                              </Box>
                              <Popover
                                id={id9}
                                open={(popoverIndex2 === index) && open9}
                                anchorEl={anchorEl9}
                                onClose={handleClose9}
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
                                <div
                                  style={{
                                    padding: "5px",
                                    fontSize: "12px",
                                    lineHeight: "20px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                >
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
                                        whiteSpace:"nowrap",
                                        overflow:"hidden",
                                        textOverflow:"ellipsis",
                                        width:"170px"
                                      }}
                                    >
                                      {employeeData && getAttachments2(j?.name?._id)?.map((k: any, index1: any) => {
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
                                              textOverflow: "ellipsis",
                                              width: "170px"
                                            }}
                                          >
                                            {k.resp}
                                          </Typography>
                                          <Stack direction="row">
                                           
                                              
                                              <img
                                               src={Removeattnew}
                                                onClick={() => deleteNormalizerMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })}
                                                 />
                                          </Stack>

                                        </Stack>
                                      </>
                                    )
                                  })}
                                    </Typography>
                                    
                                  </Stack>
                                  </div>
                              </Popover>
                              </Stack>
                            </td> */}
                            {/* <td width="15px" style={{ textAlign: "center" }}>
                              <>
                                <Stack
                                  direction="row"
                                  justifyContent="center"
                                >
                                  <span>
                                    <Stack direction="row"  justifyContent="center">
                                    <Tooltip title="Accept">
                                  <IconButton
                                    onClick={() => openDrawerHandler(j)}
                                  >
                                    <img
                                      src={Thumsup}
                                      alt="icon"
                                      style={{ width: "16px", height: "16px" }}
                                    />
                                  </IconButton>
                                </Tooltip>
                                 
                                   <Tooltip title="Reject">
                                  <IconButton
                                    onClick={() => openDrawerHandlerreject(j)}
                                  >
                                    <img
                                      src={Thumsdown}
                                      alt="icon"
                                      style={{ width: "16px", height: "16px" }}
                                    />
                                  </IconButton>
                                </Tooltip> */}
                            {/* <Button
                                        size="small"
                                        style={{
                                          borderRadius: "4px",
                                          textTransform: "none",
                                          fontSize: "15px",
                                          fontFamily: "sans-serif",
                                          padding: "2px 9px",

                                          borderColor: "#004C75",
                                          color: "#004C75",
                                        }}
                                        variant="outlined"
                                        onClick={() => openDrawerHandler(j)}
                                      >
                                        Accept
                                      </Button> */}
                            {/* <Button
                                        size="small"
                                        style={{
                                          borderRadius: "4px",
                                          textTransform: "none",
                                          fontSize: "15px",
                                          fontFamily: "sans-serif",
                                          padding: "2px 9px",

                                          borderColor: "#004C75",
                                          color: "#004C75",
                                        }}
                                        variant="outlined"
                                        onClick={() =>
                                          openDrawerHandlerreject(j)
                                        }
                                      >
                                        Reject
                                      </Button> */}
                            {/* </Stack>
                                  </span>
                                </Stack>
                              </>
                            </td> */}
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
          <AlertDialogOkCancelForUnsavedChanges
            isAlertOpen={openCancelDialog}
            handleAlertClose={rejectCancelButtonHandler}
            handleAlertIdClose={acceptCancelButtonHandler}
          >
          </AlertDialogOkCancelForUnsavedChanges>

          {value === 0 && employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer") &&
            (
              <div>
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
                    disabled={disableButtons || submit}
                    style={{
                      borderRadius: "4px",
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
                    onClick={() => {
                      saveHandler();
                      // saveHandler();
                      // if (name && fileSelected) {
                      //     return imageClick();
                      // }

                      // createMutation({
                      //   objective_description : appraiserComments,
                      //   id: employee_id
                      // })
                    }}
                  >
                    Save as Draft
                  </Button>

                  <Button
                    style={{
                      borderRadius: "4px",
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
                    disabled={disableButtons || disableSubmit}
                    onClick={() => {
                      submitHandler();
                      setnavPrompt(false);
                      // submitHandler();
                      // setSubmit(true);
                      // createMutation({
                      //   objective_description : appraiserComments,
                      //   id: employee_id
                      // })
                    }}
                  >
                    Save and Submit
                  </Button>
                  {/* <Link style={{
                    fontSize: "18px",
                    color: "#3e8cb5",
                    fontFamily: "Arial",
                  }}
                    color="inherit"
                    to={`/normalizer`}
                    state={{
                      from: `${1}`
                    }}> */}
                  <Button
                    disabled={disableButtons}
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
                    // disabled={disableSubmit}
                    onClick={() => {
                      CancelButtonHandler();
                      // submitHandler();
                      // submitHandler();
                      // setSubmit(true);
                      // createMutation({
                      //   objective_description : appraiserComments,
                      //   id: employee_id
                      // })
                    }}
                  >
                    Cancel
                  </Button>
                  {/* </Link> */}
                </Stack>
              </div>
            )}
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
    </React.Fragment>
  );
}
