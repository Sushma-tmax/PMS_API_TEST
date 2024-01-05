import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import { Snackbar, Alert } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
  ArrowBackIosRounded,
  EditOutlined,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Avatar, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, IconButton, Popover, Radio, RadioGroup, Stack, Table, TableBody, TableCell, TableContainer, Tabs, Tab, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import Drawer from '@mui/material/Drawer';
// import Infoicon from "../Icons/Infoicon.svg";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useAppraiserRejectsReviewerContext } from "../../../../context/AppraiserRejectsReviewer";
import { useAppraiserRejectsNormalizerContext } from "../../../../context/AppraiserRejectsNormalizer";
import { useEffect, useState, useRef } from "react";
import { useAcceptNormalizerMutation, useAttachmentsAppraiserDeleteMutation, useAttachmentsNormalizerMutation, useCreateEmployeeAppraisalMutation, useGetObjectiveTitleQuery, useGetRatingScaleQuery, useGetTalentCategoryQuery, useNormalizerRejectionMutation, useUpdateEmployeeAppraisalMutation } from "../../../../service";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import Infoicon from "../../../../assets/Images/Infoicon.svg"
import Infowhiteicon from "../../../../assets/Images/Infowhiteicon.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useGetEmployeeAppraisalQuery } from "../../../../service";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNormalizerContext } from "../../../../context/normalizerContext";
import Closeicon from "../../../../assets/Images/Closeicon.svg"
// import Removeatt from "../icons/Removeatt.svg";
import { Scrollbar } from "react-scrollbars-custom";
import Removeattnew from "../../../../assets/Images/Removeattnew.svg";
import { useAcceptNormalizerGradeExceptionMutation } from "../../../../service/employee/appraisal/appraisal";
import { useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { NORMALIZER_ACCEPTS_PA } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Normalizer";
import { NORMALIZER_ACCEPTS_PA_INFO, NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION } from "../../../../constants/AppraisalEmailContents/NotificationForInfo/Normalizer";
import { useCheckRoleLogsMutation } from "../../../../service/employee/employee";

//styles for snackbar
const useStyles = makeStyles((theme) => ({
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
});

const NormalizerComments = styled("div")({
  // marginLeft: "25px",
  // marginTop: '20px',
  color: "#717171",
  fontSize: '16px',
  fontFamily: "arial"
});

const Tf = styled('div')({
  // marginLeft: "25px",
  backgroundColor: "#f8f8f8",
  borderRadius: "5px",
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
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

const Contain = styled("div")({
  // marginRight: "20px",
  marginTop: "10px",
  marginBottom: "20px"

});

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const Root = styled("div")(
  ({ theme }) => `
table {
  // font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  border-collapse: collapse;
  width: 231%;
  
}
td,
th {
  border: 1px solid #e0e0e0;
  text-align: left;
  // padding: 6px;
 
}
th {
  background-color: #f2f9fa;
}
`
);
const Container2 = styled("div")({
  background: "white",
  // marginLeft: "25px",
  // marginRight: "25px",
  // marginTop: "10px",
  textTransform: 'none'
});
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }
// }


function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
export default function NormalizerRatingN(props: any) {
  const classes = useStyles();
  // const NormalizerRatingN = (props:any) => {
  // const { empData: employeeData, employee_id, acceptButton, setacceptButton, rejectButton, setrejectButton } = useAppraiserRejectsNormalizerContext()
  const { setnavPrompt, navPrompt, employeeData, value, setValue, handleChange, ratingScaleData, moveTab, setMoveTab } = props;
  const { employee_id } = useParams();
  // const { normalizerAreaImprovementComments, normalizerOverallFeedComments, normalizerOtherRecommendationComments, normalizerTrainingRecommendationComments } = useNormalizerContext()
  //@ts-ignore
  const { normalizerOverallFeedComments, reviewedOverallFeedback, setReviewedOverallFeedback, emailData, disableButtons, setDisableButtons, normalizerComments } = useNormalizerContext()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);
  console.log(ratingScaleData, "ratingScaleData")
  const [RejectionReason, setRejectionReason] = useState<any>("")
  const [upDateNormalizer] = useNormalizerRejectionMutation()
  console.log(isDrawerOpen)
  const [popoverIndex, setPopoverIndex] = useState("")
  const [popoverIndex1, setPopoverIndex1] = useState("")
  const navigate = useNavigate();
  const CustomScrollbar = Scrollbar as any;

  // console.log(employeeData, 'my test')
  const [updateSaveNormalizer] = useUpdateEmployeeAppraisalMutation()
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
  const [normalizerAttachments] = useAttachmentsNormalizerMutation();
  const [activeObjectiveDescription, setActiveObjectiveDescription] = useState('')
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] = useState("");
  const [rating, setRating] = useState<any>("");
  const [updateMutation] = useCreateEmployeeAppraisalMutation()
  const [comments, setComments] = useState("");
  const [accept, setAccept] = useState("");
  const [objective, setObjective] = useState<any>("")
  const [ratingRed, setRatingRed] = useState<any>(false)
  const [open2, setOpen2] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [acceptNormalizer] = useAcceptNormalizerMutation();
  const [acceptNormalizerGradeException] = useAcceptNormalizerGradeExceptionMutation();
  const [name, setName] = useState<string>('');
  const [fileSelected, setFileSelected] = useState<any>('');
  const [appraiserComments, setAppraiserComments] = useState<any>()

  const [sendItem] = useCreateAzureBlobMutation();
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  console.log(ratingAppraiser, 'ratingAppraiser')
  const [anchorElReviewer, setanchorElReviewer] = React.useState<HTMLButtonElement | null>(null);
  const [attachmentsNormalizer] = useNormalizerRejectionMutation()
  const [anchorElNormaliser, setanchorElNormaliser] = React.useState<HTMLButtonElement | null>(null);
  const [ratingComments, setRatingComments] = useState<any>("");
  const [ratingComments1, setRatingComments1] = useState<any>("");
  const inputRef = useRef<any>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [openSaved, setOpenSaved] = React.useState(false);
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [talentPotential, setTalentPotential] = useState<any>("")
  const [talentRating, setTalentRating] = useState<any>(0)
  const { data: talentCategory } = useGetTalentCategoryQuery({ overall_rating: talentRating, potential: talentPotential });
  const [updateLoggedRole] = useCheckRoleLogsMutation()
  console.log(activeObjectiveDescriptionName, deletes, "activeObjectiveDescriptionName");

  //new alert functions
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }

  const handleCloseSaved = () => {
    setOpenSaved(false);
  };
  const [normalizerAttachmentss, setnormalizerAttachmentss] = useState<any>("");
  const handleCloseNormaliser = () => {
    setanchorElNormaliser(null);
    setRatingComments1(null)
  };
  const openNormaliserDetails = Boolean(anchorElNormaliser);
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [reviewerAttachments, setreviewerAttachments] = useState<any>("");
  const handleCloseReviewer = () => {
    setanchorElReviewer(null);
    setRatingComments(null)
  };
  const openReviewerDetails = Boolean(anchorElReviewer);
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");
  const handleacceptChange = (event: any) => {
    setAccept(event.target.value as string);
  };
  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData?.data?.reviewer?.objective_type?.find(
        (item: any) => item?.name?._id === id
      );
    }
  };


  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  const getNormalizerAttachments = (id: any) => {
    if (employeeData) {
      console.log(employeeData?.data?.normalizer, 'objectiveDescriptionobjectiveDescription')
      const data = employeeData?.data?.normalizer?.attachments?.filter(
        (item: any) => item?.objective_description === id
      ).map((j: any) => {
        return {
          name: j.name,
          url: j.url
        }
      })
      return data
    }
  };
  const handleClickNormaliserDetails = (event: any, j: any) => {
    console.log(j, 'jjjjr')
    setRatingComments1(employeeData && employeeData.data.normalizer.objective_description
      .filter(
        (i: any) => i.name._id === j.name._id
      )
      .map((k: any) => k.comments)[0])
    setnormalizerAttachmentss(
      employeeData &&
      employeeData?.data?.normalizer?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
    setanchorElNormaliser(event.currentTarget);
  };
  const getReviewerAttachments = (id: any) => {
    if (employeeData) {
      console.log(employeeData?.data?.reviewer, 'objectiveDescriptionobjectiveDescription')
      const data = employeeData?.data?.reviewer?.attachments?.filter(
        (item: any) => item?.objective_description === id
      ).map((j: any) => {
        return {
          name: j.name,
          url: j.url

        }
      })

      return data

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
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              normalizer_attachment_url: getNormalizerAttachments(i?.name?._id),
              reviewer_attachment_url: getReviewerAttachments(i?.name?._id),
              objective_type: findObjectiveTypeById(i?.name?.objective_type)

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
    setIsDrawerOpen(true)
  }
  const closeDrawer = () => {
    setIsDrawerOpen(false)
    // setnavPrompt(true)
    setRatingAppraiser('')
  }
  const ratingSubmitHandler = () => {
    //setnavPrompt(true)
    if (ratingAppraiser === ratingparams) {
      setrejectAlert(true);
      // setnavPrompt(true);
    } else {
      closeDrawer()

      // upDateNormalizer({
      //     objective_description: activeObjectiveDescription,
      //     objective_description_name: activeObjectiveDescriptionName,
      //     ratings: rating,
      //     comments: comments,
      //     rating_rejected: true,
      //     employee_id,
      // });
      // setRating("");
    }
  };
  const openDrawerHandler = (objective: any) => {
    setAccept("Accept");
    //setnavPrompt(true);
    openDrawer();
    // setActiveObjectiveDescriptionName(objective.name._id);
    // setActiveObjectiveDescription(objective._id);
    // setComments(objective.comments);
    // setRating(objective.ratings._id);
    // let temp = employeeData.data.reviewer.objective_description
    //     .filter((i: any) => i._id === activeObjectiveDescription)
    //     .map((k: any) => k.reason_for_rejection)[0];
    // setRejectionReason(temp);
    // let reviewerRatingValue = employeeData.data.reviewer.objective_description
    //     .filter((i: any) => i.name._id === objective.name._id)
    //     .map((k: any) => {
    //         if (k.ratings) return k.ratings.rating;
    //     })[0];
    // setRatingAppraiser(reviewerRatingValue);
  };
  const acceptHandler = () => {
    // let temp = employeeData.data.reviewer.objective_description
    //     .filter((i: any) => i._id === activeObjectiveDescription)
    //     .map((k: any) => k.ratings._id)[0];


    // updateMutation({
    //     objective_description: activeObjectiveDescription,
    //     objective_description_name: activeObjectiveDescriptionName,
    //     rating_rejected: false,
    //     ratings: temp,
    //     comments: comments,
    //     id: employee_id,
    // })
    closeDrawer();
  }
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

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setRatingAppraiser('')
  };

  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo101 = Boolean(anchorEl01);

  const id101 = openInfo101 ? "simple-popover" : undefined;

  const openInfo = Boolean(anchorEls);
  const id2 = openInfo ? "simple-popover" : undefined;
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo = () => {
    setAnchorEls(null);
  };
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);
    //setAnchorEl01(anchorEl01 ? null : event.currentTarget);
  };
  const handleClose101 = () => {
    setAnchorEl01(null);
  };
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open6 = Boolean(anchorEl6);
  const open9 = Boolean(anchorEl9);
  const handleClickOpen6 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
    setappraisalAttachments(
      employeeData &&
      employeeData?.data?.appraisal?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
  };

  const handleClickOpen9 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
    setappraisalAttachments(
      employeeData &&
      employeeData?.data?.appraisal?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
  };

  const handleClose6 = () => {
    setAnchorEl6(null);

    // setOpen2(false);
  };
  const handleClose9 = () => {
    setAnchorEl9(null);

    // setOpen2(false);
  };
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    // setOpen2true);
    setAnchorEl7(event.currentTarget);
    setnormalizerAttachmentss(
      employeeData &&
      employeeData?.data?.normalizer?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
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
  const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
  };
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);
  const [isAlertOpen, setisAlertOpen] = React.useState(false);
  const [isAlertOpen1, setisAlertOpen1] = React.useState(false);


  const [message, setmessage] = React.useState('');
  const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory = () => {
    setAllFeedMandatory(false);
    setmessage("");
    setisAlertOpen1(false);
    navigate(`/normalizer`, { state: { from: `${1}` } });
  };
  const [allFeedMandatory1, setAllFeedMandatory1] = React.useState(false);
  // const [message, setmessage] = React.useState('');
  // const [disableSubmit, setdisableSubmit] = React.useState(false);
  const handleAllFeedMandatory1 = () => {
    setAllFeedMandatory1(false);
    // setnavPrompt(false);
  };
  const saveButtonHandler = () => {
    // acceptNormalizer({
    //   id: employee_id,
    // })
    setDisableButtons(true);
    updateSaveNormalizer({
      "normalizer.normalizer_status": "draft",
      "appraisal.pa_status": "Pending with HR Normalizer",
      "normalizer.reason_for_rejection": normalizerComments?.trim(),
      "normalizer_previous_submission.reason_for_rejection": normalizerComments?.trim(),
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
    //   setMoveTab(false);
    //   setmessage('Changes were successfully saved.');
    //   setAllFeedMandatory1(true);
    // } else {
    //   setMoveTab(false);
    //   setmessage('No changes were made to save.');
    //   setAllFeedMandatory1(true);
    // }

    //setmessage('Changes were successfully saved.');
    //setAllFeedMandatory1(true);




    // setdisableSubmit(true);
    // setnavPrompt(false)
  }

  const handleAlertClose = () => {
    setisAlertOpen(false);
    setValue(1)
    // setRatingAppraiser('')
  };
  const handleAlertClose1 = () => {
    setisAlertOpen1(false);
    setDisableButtons(false);
    // setValue(1)
    // setRatingAppraiser('')
  };
  const handleAlertYes = () => {
    // setisAlertOpen1(false);
    // setdisableSubmit(true);
    // 
    setReviewedOverallFeedback(true);
    setisAlertOpen(false);
    setisAlertOpen1(true);
    // setRatingAppraiser('')
  };

  const formatDate = (date: any) => {
    const day = date ? parseInt(date[2]) : null;
    const month = date ? new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(date)) : null;
    const year = date ? parseInt(date[0]) : null;
    return date ? `${day} ${month} ${year}` : ''
  }

  const handleAlertYes1 = () => {
    let date: any = new Date()
    const normalized_Date = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    setisAlertOpen1(false);

    //variables for email notification
    let appraiserName = employeeData?.data?.appraiser_name;
    let normalizerName = employeeData?.data?.normalizer_name;
    let employeeName = employeeData?.data?.first_name;
    let calendarName = employeeData?.data?.calendar?.calendar_type;
    let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4);
    let Employee_Due_Date = employeeData ? (employeeData?.data?.calendar?.end_date_employee_acknowledgement || '').slice(0, 10).split('-') : '';
    let formatted_Employee_Due_Date = formatDate(Employee_Due_Date);; // Concatenate the parts in the desired format
    let employeeCode = employeeData?.data?.employee_code
    let employeeFirstName = employeeData?.data?.first_name;

    if (employeeData && employeeData.data.isGradeException == true) {
      acceptNormalizerGradeException({
        id: employee_id,
        talentCategory: talentCategory?.data,
        current_overallRating: employeeData?.data?.current_rating?.overall_rating,
        normalizer_comments: normalizerComments?.trim()
      }).then((res: any) => {
        updateLoggedRole({
          pa_action_by: `Normalizer (Completed) (Grade-Exception)(from Rating Tab) : ${new Date()}`,
          id: employee_id
        });
        setDisableButtons(false);
        setSuccessAlertTrigerMSG("The performance appraisal was completed.");
        setSuccessAlertTriger(true);

      });
      // setmessage('The performance appraisal was completed.')
      // setAllFeedMandatory(true);
      //snackbar

      // Normalizer accepts Reviewer PA (for Appraiser/Reviewer) for Grade 6 to 10

      let tempSubjectInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.subject;
      tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

      let tempHtmlInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.html;
      tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

      // tempHtmlInfo = tempHtmlInfo.replace("[dd/mm/yy]", `${dueDate}`);

      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let emailInfo = NORMALIZER_ACCEPTS_PA_INFO_GRADE_EXCEPTION?.to;
      // const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
      emailInfo = emailInfo?.replace("[email]", `${appraiserEmail}`);
      const ccemail = [`${reviewerEmail}`]
      sendEmailNotification(
        {
          to: emailInfo,
          cc: ccemail,
          subject: tempSubjectInfo,
          html: tempHtmlInfo
        }
      )
    } else {
      let reviewerObjectiveDescription = employeeData?.data?.reviewer?.objective_description
        .map((item: any) => {
          return {
            ...item,
            rejection_reason: ""
          }
        })
      acceptNormalizer({
        id: employee_id,
        current_overallRating: employeeData?.data?.current_rating?.overall_rating,
        reviewerObjectiveDescription: reviewerObjectiveDescription,
        normalized_Date: normalized_Date,
        current_previous_submission: employeeData?.data?.current_rating?.objective_description,
        previous_overall_rating: employeeData?.data?.current_rating?.overall_rating,
        appraisal_previous_rating: employeeData?.data?.appraisal?.objective_description,
        normalized_overallRating: employeeData?.data?.current_rating?.overall_rating,
        normalizer_comments: normalizerComments?.trim()
      }).then((res: any) => {
        updateLoggedRole({
          pa_action_by: `Normalizer (Normalized) (from Rating Tab) : ${new Date()}`,
          id: employee_id
        });
        setDisableButtons(false);
        setSuccessAlertTrigerMSG("The performance appraisal was submitted to the Employee.")
        setSuccessAlertTriger(true)
      });
      // setmessage('The performance appraisal was submitted to the Employee.')
      // setAllFeedMandatory(true);
      //snackbar


      // Notification action to Employee after Normalizer accepts PA (for Employee)
      let tempSubject = NORMALIZER_ACCEPTS_PA?.subject;
      tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
      tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);

      let tempHtml = NORMALIZER_ACCEPTS_PA?.html;
      tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
      tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
      tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
      tempHtml = tempHtml?.replace("[dd/mm/yy]", `${formatted_Employee_Due_Date}`);
      tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);
      tempHtml = tempHtml?.replace("[Employee FirstName]", `${employeeFirstName}`);

      let employeeEmail = NORMALIZER_ACCEPTS_PA?.to
      let email = employeeData?.data?.email
      email = email?.replace("[email]", `${employeeEmail}`);

      sendEmailNotification(
        {
          to: email,
          subject: tempSubject,
          html: tempHtml
        }
      )

      // Notification info after Normalizer accepts PA (for Appraiser / Reviewer)

      let tempSubjectInfo = NORMALIZER_ACCEPTS_PA_INFO?.subject;
      tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
      tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${employeeCode}`);

      let tempHtmlInfo = NORMALIZER_ACCEPTS_PA_INFO?.html;
      tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[Normalizer name]", `${normalizerName}`);
      tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${employeeCode}`);

      // tempHtmlInfo = tempHtmlInfo.replace("[dd/mm/yy]", `${dueDate}`);

      let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
      let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
      let emailInfo = NORMALIZER_ACCEPTS_PA_INFO?.to;
      // const recipientEmails = [`${appraiserEmail}`, `${reviewerEmail}`]
      emailInfo = emailInfo?.replace("[email]", `${appraiserEmail}`);
      const ccemail = [`${reviewerEmail}`]
      sendEmailNotification(
        {
          to: emailInfo,
          cc: ccemail,
          subject: tempSubjectInfo,
          html: tempHtmlInfo
        }
      )
    }


    // acceptNormalizer({
    //   id: employee_id,
    // })
    // setisAlertOpen(false);
    // setmessage('The performance appraisal has been normalized.')
    // setAllFeedMandatory(true);
    // setdisableSubmit(true);
    // setAllFeedMandatory(true);
    // setRatingAppraiser('')
  };
  const submitButtonHandler = () => {

    // setmessage('The performance appraisal has been submitted successfully to the Employee.')
    setDisableButtons(true);
    setisAlertOpen1(true);
    // setAllFeedMandatory(true);

  }
  //   const saveHandler = () => {
  //     updateMutation({

  //         "normalizer.normalizer_status": 'Draft',
  //          "normalizer.other_recommendation_comments": normalizerOtherRecommendationComments,
  //         "normalizer.training_recommendation_comments": normalizerTrainingRecommendationComments,
  //         "normalizer.feedback_questions_comments": normalizerOverallFeedComments,
  //         "normalizer.area_of_improvement_comments":normalizerAreaImprovementComments,
  //         id: employee_id,
  //     })
  //     setmessage('The recommendations are saved successfully.')
  //     setAllFeedMandatory(true);
  //  }

  const [positionHide, setpositionHide] = useState<any>(false);
  useEffect(() => {
    if (appraisalAttachments === null) {
      setpositionHide(true);
    } else {
      setpositionHide(false);
    }
  }, [appraisalAttachments]);
  const [positionHide1, setpositionHide1] = useState<any>(false);
  useEffect(() => {
    if (normalizerAttachments === null) {
      setpositionHide(true);
    } else {
      setpositionHide(false);
    }
  }, [normalizerAttachments]);


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
  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;
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
  useEffect(() => {
    setAppraiserComments(() => {
      return employeeData?.data?.appraisal?.objective_description?.map(
        (i: any) => {
          return {
            ...i,
            remarks: i?.remarks,
            ratings: i?.ratings?._id,
            objective_title: findObjectiveTitleById(i?.name?.objective_title),
            objective_type: findObjectiveTypeById(i?.name?.objective_type),
          };
        }
      );
    });
  }, [employeeData]);
  const appraiserCommentsHandler = (e: any, j: any) => {
    setAppraiserComments(() => {
      return appraiserComments.map((i: any) => {
        return i._id === j._id
          ? {
            ...i,
            remarks: e.target.value,
          }
          : i;
      });
    });
    console.log(appraiserComments, "appraiserComments");
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

  useEffect(() => {
    if (employeeData) {
      setTalentPotential(employeeData?.data?.appraisal?.potential);
      setTalentRating(employeeData?.data?.current_rating?.overall_rating);
    }
  }, [employeeData])

  return (
    <React.Fragment>
      <Drawer
        anchor={'right'}

        open={isDrawerOpen}

      // sx={maxWidth: 300px}
      // onClose={toggleDrawer(anchor, false)}
      >

        <p
          style={{
            paddingLeft: "33px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "#ebf2f4",
            color: "#005477",
            fontSize: "18px",
          }}
        >
          HR Normalizer Action
        </p>
        <Dialog
          open={rejectAlert}
          onClose={handleSliderDialogClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText
              style={{
                color: "#333333",
                fontSize: "18px",
                fontFamily: "Arial",
              }}
            >
              You cannot put the same rating as the Reviewer. Please change
              the Rating.
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
        {accept === "Accept" && (
          <>
            <p style={{ paddingLeft: "33px" }}>Comments</p>

            <TextField
              multiline
              style={{ paddingLeft: "33px", width: "75%" }}
              value={comments}
              inputProps={{ maxLength: 512 }}

              onChange={(e) => {
                setComments(e.target.value);
                // setnavPrompt(true);
              }}
            // fullWidth
            />
            <Stack
              alignItems="left"
              direction="row"
              paddingLeft="33px"
              paddingTop="20px"
              spacing={2}
            >
              <Button
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
                onClick={() => acceptHandler()}
              >
                {" "}
                Accept
              </Button>
              <Button
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
                onClick={closeDrawer}
              >
                {" "}
                Cancel{" "}
              </Button>

            </Stack>
          </>
        )}


      </Drawer>


      {employeeData?.data?.normalizer?.normalizer_overall_feedback !== undefined &&
        employeeData?.data?.normalizer?.normalizer_overall_feedback !== "" &&
        employeeData?.data?.normalizer?.normalizer_PA_rejected == true && (
          <>
            <NormalizerComments>

              {/* <b> Normalizer Overall Feedback </b> */}
              <b>HR Normalizer Rejection Reason</b>
              {/* <span style={{
fontSize:"22px",}}>*</span> */}

            </NormalizerComments>
            <Contain>
              <Tf>
                <Box>
                  <TextField
                    size="small"
                    // fullWidth
                    // placeholder='Add'
                    multiline
                    InputProps={{ readOnly: true }}
                    inputProps={{ maxLength: 500 }}
                    // variant="standard"
                    // InputProps={{
                    //     disableUnderline: true,
                    // }}
                    // name="comments"
                    // value={normalizerOverallFeedComments}
                    value={normalizerOverallFeedComments}
                  />
                </Box>
              </Tf>
            </Contain>
          </>
        )}


      <Box>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            paddingLeft: "0px",
            // marginLeft: "25px",
            // marginRight: '25px',
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
                fontWeight: "700",
                border: "1px solid #3e8cb59e",
                paddingLeft: "20px",
                paddingRight: "20px"

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
                  {ratingScaleData &&
                    ratingScaleData.data
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
      {value === 0 &&
        <div>
          <Container2>
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
                        whiteSpace: "nowrap",
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
                        padding: "0px 8px"
                      }}
                      align="center"
                    >
                      Objective<br></br> Level
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
                      Appraiser<br></br> Rating
                      {/* <IconButton aria-describedby={id2} onClick={handleClickInfo}>
                              <img src={Infoicon} alt="icon" />
                            </IconButton> */}

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
                    {employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                      ((item.rating_rejected == true) || item.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
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
                    {/* <TableCell
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                    >
                      Reviewer<br></br> Rating
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
                      Reviewer<br></br> Comments
                    </TableCell> */}
                    {/* <TableCell
                sx={{
                  fontFamily: "Arial",
                  borderColor: "#F7F9FB",
                  color: "#3E8CB5",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
                align="center"
              >
                Normalizer Action
              </TableCell> */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employeeData &&
                    objectiveTitleData &&
                    objectiveDescription.map((j: any, index: any) => {
                      return (
                        <>
                          <TableRow
                            // sx={{
                            //   "& td, & th": {
                            //     // border: "1px solid #e0e0e0",

                            //   },
                            // }}
                            sx={{
                              "& td, & th": {
                                border: "1px solid #80808014 ",
                                boxShadow: "1px 0px 0px 1px #80808014",
                                borderBottom: "none",
                                borderLeft: "0px",
                                borderTop: "0px",
                                // whiteSpace: "nowrap",
                              },
                            }}
                          >
                            <TableCell
                              width="250px"
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
                              width="180px"
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
                                sx={{padding:"4px"}}
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
                                fontSize: "14x",
                                color: "#333333",
                                fontFamily: "Arial",
                                background: "#FBFBFB",
                                // padding: "0px 8px",
                              }}
                              align="center"
                            >
                              <>
                                <Stack direction="row" alignItems="center" justifyContent="center"> 
                                {(j.level_1_isChecked ||
                                  j.level_2_isChecked ||
                                  j.level_3_isChecked ||
                                  j.level_4_isChecked) && (
                                    <IconButton
                                      style={{ padding: "5px" }}
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
                                {j?.level_1_isChecked && (
                                  <>
                                    <span>L1 </span>
                                    <span>
                                      {/* {j?.name?.level_1?.level_definition} */}
                                    </span>
                                    <br />

                                  </>
                                )}
                                {j?.level_2_isChecked && (
                                  <>
                                    <span>L2 </span>
                                    <span>
                                      {/* {j?.name?.level_2?.level_definition} */}
                                    </span>
                                    <br />

                                  </>
                                )}
                                {j?.level_3_isChecked && (
                                  <>
                                    <span>L3 </span>
                                    <span>
                                      {/* {j?.name?.level_3?.level_definition} */}
                                    </span>
                                    <br />

                                  </>
                                )}
                                {j?.level_4_isChecked && (
                                  <>
                                    <span>L4 </span>
                                    <span>
                                      {/* {j?.name?.level_4?.level_definition} */}
                                    </span>
                                    <br />

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
                                              {/* <span> */}
                                                <b>{
                                                  j?.name?.level_1
                                                    ?.level_definition
                                                }</b>
                                              {/* </span> */}
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
                                              {/* <span> */}
                                                <b>  {
                                                  j?.name?.level_2
                                                    ?.level_definition
                                                }</b>
                                              {/* </span> */}
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
                                              {/* <span> */}
                                                <b> {
                                                  j?.name?.level_3
                                                    ?.level_definition
                                                }</b>
                                              {/* </span> */}
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
                                              {/* <span> */}
                                                <b> {
                                                  j?.name?.level_4
                                                    ?.level_definition
                                                }</b>
                                              {/* </span> */}
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
                                <div
                                  style={{
                                    // width: "30px",
                                    // lineHeight:"30px",
                                    // borderRadius: "50%",
                                    // background:"red"
                                  }}
                                >
                                  <span>
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
                                                if (ratingScaleData) {
                                                  let temp = ratingScaleData?.data?.find((item: any) => k.ratings == item._id)
                                                  return <span>Previous Rating:{temp?.rating}</span>
                                                }
                                              })[0]}
                                        </div>
                                      </Popover>
                                    )}

                                  </span>
                                </div>
                              </div>
                            </TableCell>
                            {employeeData?.data?.appraisal?.objective_description.filter((item: any) =>
                              item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                              (<TableCell
                                width="250px"
                                sx={{
                                  fontSize: "14x",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  background: "#FBFBFB",
                                }}
                                align="left"
                              >
                                {" "}
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  spacing={2}
                                >
                                  <span
                                    style={{
                                      // width:"350px",
                                      wordBreak: "break-word",
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      textAlign: "left"


                                    }}
                                  >

                                    {
                                      employeeData && employeeData?.data?.appraisal?.objective_description
                                        .filter(
                                          (i: any) => i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => {
                                          if (k?.comments === '' || k?.comments === undefined) {
                                            return k?.remarks;
                                          } else {
                                            return k?.comments;
                                          }
                                        })[0]}

                                  </span>
                                  {employeeData && getAttachments(j?.name?._id)?.length > 0 &&

                                    <AttachFileIcon
                                      sx={{ color: "#93DCFA", height: "18px", transform: "rotate(30deg)", cursor: "pointer" }}
                                      aria-describedby={"id"}
                                      onClick={(e: any) => {
                                        handleClickOpen6(e, j)
                                        setPopoverIndex(index)
                                      }}
                                    />
                                  }
                                  <Popover
                                    id={"id"}
                                    open={(popoverIndex === index) && open6}
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
                                        // backgroundColor: "rgb(255 255 255 / 90%)",
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
                                        fontSize: "12px",
                                        fontFamily: "arial",
                                        lineHeight: "20px",
                                        padding: '5px'
                                      }}
                                    >
                                      {/* Attachments: {appraisalAttachments} */}
                                      {employeeData && getAttachments(j?.name?._id)?.map((k: any, index1: any) => {
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
                                                {/* <IconButton>
                                              
                                              <img
                                               src={Removeattnew}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} />
                                            </IconButton> */}
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
                                      })}

                                    </div>

                                  </Popover>

                                </Stack>
                              </TableCell>)}
                            {employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                              ((item.rating_rejected == true) || item.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
                                <>
                                  <TableCell
                                    width="250px"
                                    sx={{
                                      fontSize: "14x",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      background: "#FBFBFB",
                                    }}
                                    align="left"
                                  >
                                    {" "}
                                    <Stack
                                      direction="row"
                                      justifyContent="space-between"
                                      alignItems="center"
                                      spacing={2}
                                    >
                                      <span
                                        style={{
                                          // width:"350px",
                                          wordBreak: "break-word",
                                          fontSize: "14px",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                          textAlign: "left"


                                        }}
                                      >

                                        {
                                          employeeData && employeeData?.data?.appraisal?.objective_description
                                            .filter(
                                              (i: any) => i?.name?._id === j?.name?._id
                                            )
                                            .map((k: any) => {
                                              if (k?.rating_rejected == true || k.rating_resubmitted == true) return k.rejection_reason
                                            })[0]}

                                      </span>
                                      {employeeData && getRejectionAppraisalAttachments(j?.name?._id)?.length > 0 &&
                                        (employeeData && employeeData?.data?.appraisal?.objective_description
                                          .filter(
                                            (i: any) => i?.name?._id === j?.name?._id
                                          )
                                          .map((k: any) => {
                                            if (k?.rating_rejected == true || k.rating_resubmitted == true) return k.rejection_reason
                                          })[0]) &&

                                        <AttachFileIcon
                                          sx={{ color: "#93DCFA", height: "18px", transform: "rotate(30deg)", cursor: "pointer" }}
                                          aria-describedby={"id"}
                                          onClick={(e: any) => {
                                            handleClickOpen9(e, j)
                                            setPopoverIndex(index)
                                          }}
                                        />
                                      }
                                      <Popover
                                        id={"id"}
                                        open={(popoverIndex === index) && open9}
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
                                            // backgroundColor: "rgb(255 255 255 / 90%)",
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
                                            fontSize: "12px",
                                            fontFamily: "arial",
                                            lineHeight: "20px",
                                            padding: '5px'
                                          }}
                                        >
                                          {/* Attachments: {appraisalAttachments} */}
                                          {employeeData && getRejectionAppraisalAttachments(j?.name?._id)?.map((k: any, index1: any) => {
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
                                                    {/* <IconButton>
                                              
                                              <img
                                               src={Removeattnew}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} />
                                            </IconButton> */}
                                                  </Stack>

                                                </Stack>
                                              </>
                                            )
                                          })}

                                        </div>

                                      </Popover>

                                    </Stack>
                                  </TableCell>
                                </>
                              )}
                            {/* <TableCell
                              width="10px"
                              sx={{
                                fontSize: "14x",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="center"
                            >
                              <span>
                                {employeeData && employeeData?.data?.reviewer?.objective_description
                                  .filter(
                                    (i: any) => i?.name?._id === j?.name?._id
                                  )
                                  .map((k: any) => k?.ratings?.rating)[0]
                                }
                              </span>

                            </TableCell> */}
                            {/* <TableCell
                              width="250px"
                              sx={{
                                fontSize: "14x",
                                color: "#333333",
                                fontFamily: "Arial",
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

                                    textAlign: "left"
                                  }}
                                >
                                  {employeeData &&
                                    employeeData?.data?.reviewer?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings) return k?.comments;
                                      })[0]}
                                </Typography>

                                <Box>
                                  {employeeData && getAttachments1(j?.name?._id)?.length > 0 &&

                                    <AttachFileIcon
                                      style={{
                                        color: "#93DCFA",
                                        height: "18px",
                                        transform: "rotate(30deg)",
                                        cursor: "pointer"
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
                                  </div>
                                </Popover>

                              </Stack>

                            </TableCell> */}
                            {/* <TableCell
                              width="5px"
                              sx={{
                                fontSize: "14x",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="center"
                            >
                              <span >
                              {
                                      employeeData && employeeData.data.reviewer.objective_description
                                        .filter(
                                          (i: any) => i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => {
                                          if (k?.ratings) return k?.comments;
                                        })[0]}                              </span>
                              
                            </TableCell> */}
                            {/* <TableCell
                              width="22%"
                              sx={{
                                fontSize: "14x",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                spacing={2}
                              >
                                {j.ratings ? (
                                  <span>
                                    {
                                      employeeData && employeeData.data.normalizer.objective_description
                                        .filter(
                                          (i: any) => i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => {
                                          if (k?.ratings) return k?.comments;
                                        })[0]}

                                  </span>
                                ) : (
                                  ""
                                )}

                                {j.ratings ? (
                                  <div
                                    style={{
                                      justifyContent: "end",
                                      position: "relative",
                                    }}
                                  >
                                    {positionHide1 && (
                                      <AttachFileIcon
                                        style={{ color: "#93DCFA", height: "18px" }}
                                        aria-describedby={"id"}
                                        onClick={(e: any) =>
                                          handleClickOpen7(e, j)
                                        }
                                      />
                                    )}
                                    <Popover
                                      id={"id"}
                                      open={open7}
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
                                        sx={{
                                          p: 2,
                                          backgroundColor: "#f8f8ff",
                                        }}
                                      >
                                        Attachments: {normalizerAttachments}
                         
                                      </Typography>
                                    </Popover>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </Stack>

                            </TableCell>  */}
                            {/* <TableCell
                        sx={{
                          fontSize: "14x",
                          color: "#333333",
                          opacity: "80%",
                          fontFamily: "regular",
                        }}
                        align="center"
                      >
                        <Button
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
                        </Button>
                      </TableCell> */}
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
                {/* <Button
                  variant="outlined"
                  style={{
                    backgroundColor: "Transparent",
                    fontSize: "15px",
                    fontWeight: 400,
                    textTransform: "none",
                    color: "#3e8cb5",
                    borderColor: "#3E8CB5",
                    height: "35px",
                    width: "70px"
                  }}
                  onClick={() => {
                    // saveRecommendationsHandler();
                    // handleBackButton();
                    // saveHandler()
                  }}
                >

                  Save


                </Button> */}
                {employeeData?.data?.appraisal?.pa_status?.includes("Pending with HR Normalizer") &&
                  <>
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
                        ...((disableButtons) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),
                        // width: "70px",
                      }}
                      variant="outlined"
                      onClick={() => {
                        saveButtonHandler()
                      }}
                    >
                      Save as Draft
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
                        ...((disableButtons) && {
                          cursor: "not-allowed",
                          borderColor: "#ccc",
                          color: "#ccc",
                        }),
                        // width: "70px",
                      }}
                      variant="outlined"
                      onClick={submitButtonHandler}
                    >
                      Save and Submit
                    </Button>
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
                      // onClick={submitButtonHandler}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </>
                }
                <Dialog
                  fullScreen={fullScreen}
                  open={openSaved}
                  // onClose={handleCloseSaved}
                  aria-labelledby="responsive-dialog-title"
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
                      PA approved.
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
                          height: "35px",
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
                          height: "35px",
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
                      {/* Are you sure you wish to accept selected performance appraisal?  */}
                      Are you sure you wish to accept the performance appraisal?
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
                          height: "35px",
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
                          height: "35px",
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
                          color: "#3e8cb5",
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

              </Stack>
            </TableContainer>
          </Container2>
        </div>
      }
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
  )
}
// export default NormalizerRatingN