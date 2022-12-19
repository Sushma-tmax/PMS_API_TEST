import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link, useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Infoicon from "../Icons/Infoicon.svg";
import DialogTitle from "@mui/material/DialogTitle";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Uploadatt from "../../../../assets/Images/Uploadatt.svg"
// import {
//   MIDYEAR_PA_REPORT,
//   MIDYEAR_PERFORMANCE,
//   MIDYEAR_REJECT_RATING,
//   MIDYEAR_SUCCESS,
// } from "../../constants/routes/Routing";
import Removeattnew from "../../../../assets/Images/icons/Removeattnew.svg";
import Thumsup from "../../../../assets/Images/icons/Thumsup.svg";
import Thumsdown from "../../../../assets/Images/icons/Thumsdown.svg";
import thumbsdown_colored from "../../../../assets/Images/icons/Thumbsdowncolored.svg";
import Edit from "../../../../assets/Images/Edit.svg";
import Command from "../../ReviewerRejection/Icons/Command.svg";
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
} from "../../../../service";

import { useAppraiserRejectsNormalizerContext } from "../../../../context/AppraiserRejectsNormalizer";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import {
  useAttachmentsAppraiserDeleteMutation,
  useAttachmentsNormalizerDeleteMutation,
} from "../../../../service";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import Footerbuttons from "../Footerbuttons";
import Header from "../Header";
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
  paddingBottom: "5px",
});
const Overallrating = styled("div")({
  fontSize: "17px",
  fontFamily: "arial",
  fontWeight: 400,
  color: "#3e8cb5",
  //textAlign: 'left'
});
const Overallratingvalue = styled("div")({
  fontSize: "16px",
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
  // @ts-ignore
  const { empData: employeeData, employee_id, acceptButton, appraiserOverallFeedback, trainingRecommendationFormValues, setacceptButton, rejectButton, setrejectButton, overallFeed, areaImprovement, potentialValue, checkboxIdHandler, checkboxHandler, otherRecommendation, setPotentialValue } = useAppraiserRejectsNormalizerContext()
  const { navPrompt, setnavPrompt, value, setValue, handleChange, appraisalData, moveTab, setMoveTab } = props;
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);

  console.log(isDrawerOpen);

  const {
    employee1Data,
    training1Data,
    other1Data,
    mutation,
    calendarData,
    ratingScaleData,
  } = props;
  const { data: ratingsData } = useGetRatingScaleQuery("");
  const [addPotential] = useUpdateEmployeeAppraisalMutation();

  // const {data: employeeData} = useGetEmployeeAppraisalQuery('6204935ebca89023952f2da9')

  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  const [ratingNormalizer, setRatingNormalizer] = useState<any>("");

  console.log(employeeData, "my test");
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [acceptNormalizer] = useAppraiserAcceptNormalizerMutation();

  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [comments, setComments] = useState("");
  const [updateObjectiveDescription] = useUpdateEmployeeAppraisalMutation();
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
  const [rating, setRating] = useState<any>("");
  const [updateMutation] = useCreateEmployeeAppraisalMutation();
  const [accept, setAccept] = useState("");
  const [openYes, setOpenYes] = useState(false);
  const [openYes1, setOpenYes1] = useState(false);


  const [attachmentsAppraiser] = useAttachmentsAppraiserMutation();

  const handleacceptChange = (event: any) => {
    setAccept(event.target.value as string);
  };
  const [submit, setSubmit] = useState(false);

  const [ratingComments, setRatingComments] = useState<any>("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
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
  const [isAlertOpen1, setisAlertOpen1] = React.useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [allFeedMandatory, setAllFeedMandatory] = React.useState(false);


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
  const open8 = Boolean(anchorEl8);
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
    }
  }, [employeeData, objectiveTitleData]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // setnavPrompt(true);
    setRatingAppraiser("");
    setratingparams("");
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
    let temp = employeeData.data.reviewer.objective_description
      .filter((i: any) => i._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];

    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      action_performed: false,
      comments: "",
      rating_comments: "",
      id: employee_id,
    });
    setRating("");
    setComments("");
  };
  // console.log(c)
  //disabling button


  const [title, setTitle] = useState<any>("");
  const [showWithdraw, setShowWithdraw] = useState(false);

  const openDrawerHandler = (objective: any) => {
    let normalizerRatingValue =
      employeeData.data.reviewer.objective_description
        .filter((i: any) => i.name._id === objective.name._id)
        .map((k: any) => {
          if (k.ratings) return k.ratings.rating;
        })[0];
    setRatingNormalizer(normalizerRatingValue);
    // setnavPrompt(true);
    setName("")
    setTitle(objective?.name?.objectiveTitle);
    setAccept("Reject");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
    setratingparams(objective.ratings.rating)

    let reviewerRatingValue = employeeData.data.reviewer.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];

    setRatingAppraiser(reviewerRatingValue);
    setShowWithdraw(objective.rating_rejected);

    console.log(ratingNormalizer, "ratingNormalizer");
  };

  const openDrawerHandlerNO = (objective: any) => {
    // setnavPrompt(true);
    setAccept("Accept");
    openDrawer();
    setName("")
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
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
    setRatingAppraiser(reviewerRatingValue);
    setratingparams(reviewerRatingValue1);
  };

  const acceptHandler = () => {
    // setActiveObjectiveDescriptionName(objective.name._id)
    // setActiveObjectiveDescription(objective._id)
    // setComments(objective.comments)
    // setRating(rating)

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
      comments: comments,
      id: employee_id,
    });
    closeDrawer();
    setRatingAppraiser("");
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
      attachmentsAppraiser({
        attachments: {
          url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id,
      });
    });
  };

  console.log(ratingsData, "rating");
  //slider validation
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState("");
  const [allFieldMandatory, setAllFieldMandatory] = useState(false)

  const [ratingReviewer, setRatingReviewer] = useState<any>("");
  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");
  // const [ratingparams, setratingparams] = useState<any>("");

  const [open, setOpen] = useState<any>(false);
  const [message, setMessage] = useState<any>("");
  const [message1, setMessage1] = useState<any>("");
  const [message2, setMessage2] = useState<any>("");


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

  const open3 = Boolean(anchorE3);
  const id3 = open3 ? "simple-popover" : undefined;

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

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setrejectAlertMessage("");
    setratingparams("");
  
    // setratingparams('')
  };
  const handleSliderDialogClose1 = () => {
    setAllFeedMandatory(false);
    // setMessage2("");
    // setratingparams('')
  };
  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    console.log(ratingAppraiser, "ratingAppraiser")
    if (ratingAppraiser === j.rating) {
      setrejectAlert(true);
      setrejectAlertMessage(
        "You cannot put the same rating as the Reviewer. Please change the rating."
      );

    } else {
      if (j) setRating(j._id);
      // setratingSelection(true);
    }
  };
  const ratingSubmitHandler = () => {
    setFileSelected("")
    if (ratingAppraiser === ratingparams) {
      // setrejectAlertMessage("")
      setrejectAlertMessage(
        "You cannot put the same rating as the Reviewer. Please change the rating."
      );
      setrejectAlert(true);
    } else if (comments == null || comments == undefined || comments == "") {
      setrejectAlertMessage("Please add comments for rejection.");
      setrejectAlert(true);
    } else {
      //setnavPrompt(true)
      closeDrawer();
      updateMutation({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        comments: comments,
        rating_rejected: true,
        action_performed: true,
        id: employee_id,
      });
      if (name && fileSelected) {
        return imageClick();
      }
      setRatingAppraiser("");
      // setComments()
    }
  };
  console.log(comments, "comments");
  console.log(ratingparams, "ratingparams");
  console.log(ratingAppraiser, "ratingappraiser");
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

  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data?.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
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
  }, []);
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
  const [activeEmployee, setActiveEmployee] = useState("");
  const [potentialHide, setPotentialHide] = React.useState(true);
  const [potential, setPotential] = React.useState<any>(
    employeeData?.data?.appraisal?.potential
  );
  const [potentialArray, setPotentialArray] = React.useState<any>([
    "Low",
    "Moderate",
    "High",
  ]);
  useEffect(() => {
    if (employeeData) {
      console.log(employeeData?.data?.appraisal?.potential);
      setActiveEmployee(employeeData.data._id);
      setPotential(employeeData?.data?.appraisal?.potential);
    }
  }, [employeeData]);


  const handleAlertYes = () => {
    // acceptNormalizer({
    //     id: employee_id,
    //   })
    setisAlertOpen(false);
    setisAlertOpen1(true);
    // setNewOpen(true);
    // setMessage2("Are you sure you would like to Reject the Performance Appraisal?")



  };

  const handleAlertYes1 = () => {
    let appraiserObjDesc = employeeData?.data?.appraisal?.objective_description?.map(
      (i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      }
    );
    acceptNormalizer(
      employee_id
    )
    setAllFeedMandatory(true);

    return updateObjectiveDescription({
      "appraisal.objective_description": appraiserObjDesc,
      "appraisal.potential": potentialValue,
      id: employee_id,
    });


    // setrejectAlertMessage("dfherher")
    // navigate("/dashboardreview");



  };
  const handleAlertClose = () => {
    setisAlertOpen(false);
    setValue(1)
    // setRatingAppraiser('')
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
    // setValue(1);
  }

  const saveData = () => {
   
    return updateObjectiveDescription({
      // "appraisal.objective_description": appraiserComments,
      "appraisal.appraiser_status": "normalizer-rejected-draft",
      "appraisal.status": "in-progress",
      "reviewer.status": "in-progress",
      "normalizer.status": "in-progress",
      "appraisal.potential": potentialValue,
      // reviewerIsDisabled: false,
      // reviewerIsChecked: false,
      // "reviewer.reviewer_status": "pending",
      id: employee_id,
    });

  }
  const submitData = (Status: any, Message: any) => {
    if (Status === true) {
      setOpen(true);
      setMessage(Message);
    } else if (Status === false) {
      setOpen(true);
      updateObjectiveDescription({
        "appraisal.objective_description": appraiserComments,
        "appraisal.appraiser_status": "submitted",
        "appraisal.status": "in-progress",
        "reviewer.status": "in-progress",
        "normalizer.status": "in-progress",
        "appraisal.potential": potentialValue,
        reviewerIsDisabled: false,
        reviewerIsChecked: false,
        "reviewer.reviewer_status": "pending",
        id: employee_id,
      });
    }
  }

  const submitButtonHandler = () => {
    // acceptNormalizer({
    //   id: employee_id,
    // })
    // setOpenYes(true)
    if (appraiserOverallFeedback == null || appraiserOverallFeedback == undefined || appraiserOverallFeedback == "") {
      setMessage('Please add the rejection reasons in the Overall Feedback')
      setAllFieldMandatory(true)
    } else if (overallFeed[0]?.value == "" || overallFeed[1]?.value == "" || overallFeed[2]?.value == "") {
      setMessage("Please add Feedback Questionnaire on the Recommendation page.")
      setAllFieldMandatory(true)
    }
    //  else if (areaImprovement[0]?.value == "" || areaImprovement[0]?.specific_actions[0]?.value == "") {
    //   setMessage("Please add Area of Improvement on the Recommendation page.")
    //   setAllFieldMandatory(true)
    // } 
    else if ((trainingRecommendationFormValues.filter((i: any) => {
      return (i.name == "" || i.training_name == "" || i.justification == "")
    }).length > 0)) {
      setMessage("Please add Training Recommendation on the Recommendation page.")
      setAllFieldMandatory(true);
    }
    // else if ((checkboxIdHandler(checkboxHandler(otherRecommendation))).length === 0) {
    //   setMessage("Please add Other Recommendation on the Recommendation page.")
    //   setAllFieldMandatory(true);
    // } 
    else {
      setisAlertOpen(true);
      setnavPrompt(false)
    }

    // setMessage1("Did you review the recommendation?")
  }

console.log(areaImprovement,"oooooooo")
  const allFieldMandatoryClose = () => {
    setAllFieldMandatory(false);
    setMessage("");
  }

  const saveHandler = () => {
    if (appraiserComments) {
      let Message = "";
      let Status = false;
      if (employeeData?.data?.appraisal?.potential === true) {
        Status = true;
        Message = "Please select the Potential Level.";
        if (Status === true) {
          setOpen(true);
          setMessage(Message);
        }
      } else {
        saveData().then((j: any) => {
          if (!j.error) {
            setMessage("Changes have been saved.");
            setOpen(true);
          }
        });
      }
    }
  };
  const [positionHide, setpositionHide] = useState<any>(false);
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
  };
  console.log(navPrompt, "navprompt");
  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
    },
  };
  const resetFileInput = () => {
    setFileSelected("");
    setName("");

    // inputRef.current.value = null;
  };
  // const styles = {
  //     // colors: {
  //     //   color: fileSelected == "" ? "transparent" : "#3e8cb5",

  //     // },
  //   };
  const handleChangePotential = (event: any) => {
    setPotential(event.target.value as string);
    // addPotential({
    //   "appraisal.potential": event.target.value,
    //   id: employee_id,
    // });
    // setnavPrompt(true);
  };

  useEffect(() => {
    setPotentialValue(potential)
  }, [potential])

  const getAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");


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

    if (data?.appraisal?.status == "in-progress") {
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
  const [reviewerRejected, setReviewerRejected] = useState<any>(false);

  // {j?.name?.rating_rejected == true}

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
        // return(
        //   <>
        //   {j.rating_rejected}
        //   </>
        // )
      })
    // console.log(Rejected,"Rejected")
  })
  const [openYesReject, setOpenYesReject] = useState(false);
  // const [message1, setMessage1] = useState("")

  const handleAlertNoReject = () => {
    setOpenYesReject(false);
    setMessage1("");
    setValue(1);
  }
  // })
  const handleClickOpenAttachment = (e: any) => {
    document.getElementById("photo")?.click();
  };


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
          Appraiser Action
        </div>
        <Dialog
          open={rejectAlert}
          onClose={handleSliderDialogClose}
          aria-labelledby="responsive-dialog-title"
          BackdropProps={{
            style: { background: "#333333 !important", opacity: "10%" },
          }}
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

            <Item2>
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
                {title}
              </Typography>
              {/* {employeeData && objectiveTitleData && objectiveDescription.map((j: any, index: number) => {
                                        return (

                                            <>
                                            {j?.name?.objectiveTitle}
                                            </>
                                        )
                                    })} */}

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
                autoComplete="off"
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    fontFamily: "Arial",
                    color: "#333333",
                  },
                }}
                size="small"
                multiline
                inputProps={{ maxLength: 500 }}
                style={{ paddingRight: "100px", width: "75%" }}
                // fullWidth
                value={comments}
                onChange={(e) => {
                  setComments(e.target.value);
                  // setnavPrompt(true);
                  // setComments(false);
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
        )}

        {accept === "Reject" && (
          <>

            <Item2 sx={{ width: "fitContent" }}>
              {/* <Table>
                                <TableHead></TableHead>
                                <TableBody>

                        {employeeData && objectiveTitleData && objectiveDescription.map((j: any, index: number) => {
                                        return (

                                            <>
                                            {j?.name?.objectiveTitle}
                                            </>
                                        )
                                    })}
                                    </TableBody>
                            </Table> */}
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
                }}
              >
                Appraiser Rating
              </div>

              <>
                <Stack
                  style={{ paddingLeft: "10px" }}
                  direction="row"
                  height="50px"
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
                                //if (ratings) setRating(ratings._id);
                                // ratingColorHandler(rating._id)
                                //setnavPrompt(true);
                                handleRatingAlert(ratings);
                              }}
                              style={{
                                //@ts-ignore
                                borderColor:
                                  rating === ratings._id && "#3C8BB5",
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
                                                                {ratings.rating_scale}
                                                            </p>
                                                        )} */}
                          </Contain>

                          {/* <p style={{ color: "#3C8BB5", fontSize: "10px" }}>{ratings.rating_scale}</p> */}
                        </Item1>
                      ))}
                </Stack>

                <p
                  style={{
                    textAlign: "left",
                    paddingLeft: "10px",
                    fontSize: "12px",
                    fontFamily: "arial",
                  }}
                >
                  Reviewer Rating
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
                          {ratingNormalizer}
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
                paddingTop: "20px",
                color: "#7A7A7A",
              }}
            >
              Comments
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
                // setnavPrompt(true);
              }}
            />
            <div
              style={{
                textAlign: "left",
                paddingLeft: "28px",
                fontSize: "12px",
                paddingBottom: "10px",
                paddingTop: "25px",
                color: "#7A7A7A",
              }}
            >
              Attachment
            </div>{" "}
            <div >
              {/*<Button*/}
              {/*    style={{*/}
              {/*        textTransform: "none",*/}
              {/*        borderColor: "#014D76",*/}
              {/*        fontFamily: "sans-serif",*/}
              {/*        maxWidth: "115px",*/}
              {/*        backgroundColor: "transparent",*/}
              {/*        color: "#9cc4da",*/}
              {/*    }}*/}
              {/*    variant="contained"*/}
              {/*>*/}
              {/*    {" "}*/}
              {/*    Upload File{" "}*/}
              {/*</Button>*/}
              <Stack direction="row" alignItems="center" spacing={2}>
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

                <Text>

                  <IconButton >
                    <img src={Uploadatt}
                      onClick={(e: any) => {
                        // setActiveObjectiveDescriptionName(j?.name?._id)
                        handleClickOpenAttachment(e);
                        // setPopoverIndex(index)
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

                </Text>
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
              {/* {employeeData &&
                  objectiveTitleData &&
                  objectiveDescription?.map((j: any, index: number) => {   
                  
                    return (
                      <>
                        {employeeData && getAttachments(j?.name?._id)
                        //  ?.filter((i: any) => i?.objective_description === j?.name?._id)
                        ?.map((k: any, index1: any) => {
                          console.log(k,"kkkkkkk")
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
                                      src={Removeattnew}
                                      onClick={() => deleteAppraiserMutation({
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
            </div>
            <Stack
              alignItems="left"
              direction="row"
              paddingLeft="28px"
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
                  background: "transparent",
                  height: "35px",
                  // width: "70px",
                }}
                variant="outlined"
                onClick={() => {
                  ratingSubmitHandler();
                  // setComments("")
                  // setMoveTab(true);
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
                    WithDrawHandler();
                    // ratingSubmitHandler()
                    // // setComments("")
                    // if (name && fileSelected) {
                    //     return imageClick()
                    // }
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
      <div style={{ marginTop: "5px", backgroundColor: "#F1F1F1" }}>
        <Container
          sx={{
            maxWidth: "95% !important",
            // marginTop: "25px",
            // height: "1408px",
            // height: "calc(100vh - 165px)",
            background: "#fff",
          }}
        >
          <Box
            style={{
              padding: "35px",
            }}
          >
            <Stack
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
                Welcome to Performance Appraisal!
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  color: "#717171",
                  fontFamily: "Arial",
                  // paddingRight: "60px",
                }}
              >
                PA Status:{" "}
                <span
                  style={{
                    color: "#717171",
                    marginTop: "8px",
                    fontSize: "16px",
                    fontFamily: "Arial",
                  }}
                >
                  {/* {employeeData?.data?.appraisal?.status === "in-progress"
                    ? "In-progress"
                    : employeeData?.data?.appraisal?.status === "not-started"
                    ? "Not-started"
                    : employeeData?.data?.appraisal?.status} */}
                  {getPAStatus(employeeData?.data)}
                </span>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              //   mr={2}
              sx={{
                // borderRadius: "5px",
                // boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)"
                backgroundColor: "#f3fbff",
              }}
              // divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            // marginRight="60px"
            // marginLeft={"50px"}
            >
              <Item>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <Avatar style={{ width: "50px", height: "50px" }}>
                      {employeeData?.data?.legal_full_name.substring(0, 1)}
                    </Avatar>
                    <Box>
                      <Stack direction="row" spacing={1}>
                        <Name>{employeeData?.data?.legal_full_name}</Name>
                        {/* <Grade>
                          (Grade{appraisalData && appraisalData.data.grade})
                        </Grade> */}
                      </Stack>
                      <Speciality>
                        {/* {appraisalData &&
                          appraisalData.data.position_long_description} */}
                        {employeeData?.data?.job_title}
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
                                        // position="absolute"
                                        // variant="caption"
                                        color="#3e8cb5"
                                        fontFamily="arial"
                                        fontSize="17px"
                                    // paddingTop="3px"
                                    >
                                        Potential Level
                                    </Typography>

                                    <Typography>
                                        {employeeData?.data?.appraisal?.potential}
                                    </Typography>
                                </Stack>
                            </Item> */}
              {/* } */}
              {/* {potential != false && */}
              {/*  <Item> */}
              {/* <Stack direction="column" alignItems="center"> */}
              {/* <Typography
                                                                  // position="absolute"
                                                                  // variant="caption"
                                                                  color="#3e8cb5"
                                                                  fontFamily="arial"
                                                                  fontSize="17px"
                                                          // paddingTop="3px"
                                                            >
                                                                  Potential Level
                                                            </Typography> */}

              {/* <Typography>
                                            <FormControl>
                                                <RadioGroup
                                                    row
                                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                                    name="row-radio-buttons-group"
                                                    value={potential}
                                                >
                                                    <FormControlLabel
                                                        value="Low"
                                                        control={<Radio size="small" />}
                                                        label={
                                                            <span style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}>
                                                                Low
                                                                <IconButton onClick={handleClick4}>
                                                                    <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                                                                </IconButton>
                                                                <Popover
                                                                    id={id10}
                                                                    open={open10}
                                                                    anchorEl={anchorE10}
                                                                    onClose={handleClose4}
                                                                    // open={open4}
                                                                    // anchorEl={anchorE}
                                                                    // onClose={handleClose4}
                                                                    // anchorOrigin={{
                                                                    //     vertical: "bottom",
                                                                    //     // horizontal: "left",
                                                                    // }}
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
                                                                            borderRadius: 0,
                                                                        },
                                                                    }}
                                                                   
                                                                >
                                                                    <div
                                                                        style={{
                                                                            padding: "10px",
                                                                            fontSize: "13px",
                                                                            lineHeight: "20px",
                                                                            // fontSize: "14px",
                                                                            color: "#333333",
                                                                            fontFamily: "Arial",
                                                                        }}
                                                                    >
                                                                        {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.low}{" "}
                                                                    </div>
                                                                </Popover>{" "}
                                                            </span>
                                                        }
                                                        onChange={(e) => {
                                                            handleChange1(e);
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="Moderate"
                                                        control={<Radio size="small" />}
                                                        label={
                                                            <span style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}>
                                                                Moderate
                                                                <IconButton onClick={handleClick2}>
                                                                    <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                                                                </IconButton>
                                                                <Popover
                                                                    id={id2}
                                                                    open={open2}
                                                                    anchorEl={anchorE2}
                                                                    onClose={handleClose2}
                                                                    // anchorOrigin={{
                                                                    //     // vertical: "bottom",
                                                                    //     horizontal: "center",
                                                                    // }}
                                                                    transformOrigin={{
                                                                        vertical: "top",
                                                                        horizontal: "center",
                                                                        // horizontal: "left",
                                                                    }}
                                                                    PaperProps={{
                                                                        style: {
                                                                            backgroundColor: "FEFCF8",
                                                                            boxShadow: "none",
                                                                            //   minWidth:"300px",
                                                                            maxWidth: "400px",
                                                                            borderRadius: "5px",
                                                                        },
                                                                    }}
                                                                    sx={{
                                                                        // width: "60%",
                                                                        "& .MuiPopover-paper": {
                                                                            border: "1px solid #3e8cb5",
                                                                            borderRadius: 0,
                                                                        },
                                                                    }}
                                                                    // sx={{
                                                                    //     width: "60%",
                                                                    //     "& .MuiPopover-paper": {
                                                                    //         border: "1px solid #FFCF7A",
                                                                    //         backgroundColor: "#f8f8ff",
                                                                    //     },
                                                                    // }}
                                                                >
                                                                    <div
                                                                        style={{
                                                                            padding: "10px",
                                                                            fontSize: "13px",
                                                                            lineHeight: "20px",
                                                                            // fontSize: "14px",
                                                                            color: "#333333",
                                                                            fontFamily: "Arial",
                                                                        }}
                                                                    >
                                                                        {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.moderate}
                                                                        {" "}

                                                                    </div>
                                                                </Popover>
                                                            </span>
                                                        }
                                                        onChange={(e) => {
                                                            handleChange1(e);
                                                        }}
                                                    />
                                                    <FormControlLabel
                                                        value="High"
                                                        control={<Radio size="small" />}
                                                        label={
                                                            <span style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}>
                                                                High
                                                                <IconButton onClick={handleClick3}>
                                                                    <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                                                                </IconButton>
                                                                <Popover
                                                                    id={id3}
                                                                    open={open3}
                                                                    anchorEl={anchorE3}
                                                                    onClose={handleClose3}
                                                                    anchorOrigin={{
                                                                        vertical: "bottom",
                                                                        horizontal: "center",
                                                                    }}
                                                                    transformOrigin={{
                                                                        vertical: "top",
                                                                        horizontal: "center",
                                                                        // horizontal: "left",
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
                                                                            borderRadius: 0,
                                                                        },
                                                                    }}
                                                                   
                                                                >
                                                                    <div
                                                                        style={{
                                                                            padding: "10px",
                                                                            fontSize: "13px",
                                                                            lineHeight: "20px",
                                                                            // fontSize: "14px",
                                                                            color: "#333333",
                                                                            fontFamily: "Arial",
                                                                        }}
                                                                    >
                                                                        {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.high}
                                                                        {""}
                                                                    </div>
                                                                </Popover>
                                                            </span>
                                                        }
                                                        onChange={(e) => {
                                                            handleChange1(e);
                                                        }}
                                                    />
                                                </RadioGroup>
                                            </FormControl>
                                        </Typography> */}
              {/* </Stack>
                                </Item> */}
              {/* } */}

              <Item>
                <Stack direction="column" alignItems="flex-end">
                  <Overallrating>Overall Rating</Overallrating>

                  <Overallratingvalue>
                    <b>
                      {employeeData &&
                        employeeData?.data?.appraisal?.appraiser_rating == 0
                        ? "-"
                        : employeeData?.data.appraisal?.appraiser_rating}
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

            {/* <Box sx={{ paddingTop: "20px", paddingRight: "30px" }}> */}
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
                 { employeeData?.data?.appraisal_template?.potential == true && 
                 ( <Stack
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
                      Potential Level
                      <IconButton onClick={handleClick3}>
                        <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                      </IconButton>
                      <Popover
                        id={id3}
                        open={open3}
                        anchorEl={anchorE3}
                        onClose={handleClose3}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
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
                            maxWidth: "550px",
                            borderRadius: "5px",
                          },
                        }}
                        sx={{
                          // width: "60%",
                          "& .MuiPopover-paper": {
                            border: "1px solid #3e8cb5",
                            borderRadius: 0,
                          },
                        }}

                      >
                        <div
                          style={{
                            padding: "10px",
                            fontSize: "13px",
                            lineHeight: "20px",
                            // fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "#3e8cb5",
                              fontFamily: "Arial",
                              // paddingBottom:"10px",

                              paddingBottom: "5px",
                              borderBottom: "1px solid #d9d9d9"
                            }}
                          >
                            High:{" "}
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
                              color: "#3e8cb5",
                              fontFamily: "Arial",
                              paddingBottom: "5px",
                              paddingTop: "5px",
                              borderBottom: "1px solid #d9d9d9"

                            }}
                          >
                            Moderate:{" "}
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {nineBoxData &&
                                nineBoxData?.data[0]?.potential_definitions?.moderate}{" "}
                            </span>
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "#3e8cb5",
                              fontFamily: "Arial",
                              paddingTop: "5px",
                            }}
                          >
                            Low:{" "}
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {nineBoxData &&
                                nineBoxData?.data[0]?.potential_definitions?.low}{" "}
                            </span>
                          </Typography>
                        </div>
                      </Popover>
                    </Typography>

                    <Select
                      sx={{
                        width: "75%",
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

                      <MenuItem style={{ fontSize: "14px" }} value="High">
                        High
                      </MenuItem>
                      <MenuItem style={{ fontSize: "14px" }} value="Moderate">
                        Moderate
                      </MenuItem>
                      <MenuItem style={{ fontSize: "14px" }} value="Low">
                        Low
                      </MenuItem>
                    </Select>

                  </Stack>
                  )}
                </Grid>
              </Stack>
            </Box>
            <Box>
              {/* <Box style={{ paddingLeft: "0px" }}> */}
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
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
                      border:"1px solid #3e8cb59e",
                    maxHeight:"0px",
                    minHeight:"48px",
                    paddingRight: "15px",
                    paddingLeft:"20px",
                      fontWeight: "700",
                    }}
                    label="Ratings"
                    icon={
                      <IconButton
                        sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                        aria-describedby={id2}
                        onClick={handleClickInfo}
                      >
                        <img width="12px" src={Infoicon} alt="icon" />
                      </IconButton>
                    }
                    iconPosition="end"
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
                      border:"1px solid #3e8cb59e",
                      paddingLeft:"20px",
                      paddingRight:"20px",
                      fontWeight: "700",
                    }}
                    label="Recommendations"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              {/* </Box> */}
              {/* <Typography
                            style={{
                                color: "#008E97",
                                fontSize: "16px",
                                fontFamily: "Arial",
                            }}
                        >
                            <b>Ratings</b>
                            <IconButton aria-describedby={id2} onClick={handleClickInfo}>
                                <img src={Infoicon} alt="icon" />
                            </IconButton> */}
              <Popover
                id={id2}
                open={openInfo}
                anchorEl={anchorEls}
                onClose={handleCloseInfo}
                PaperProps={{
                  style: { width: "320px", marginTop: "55px" },
                }}
              >
                <TableContainer>
                  <Scroll>
                    <Scrollbar style={{ width: "100%", height: "225px" }}>
                      <Table
                        sx={{ minWidth: 200 }}
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
                                width: "70px",
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
                                  Rating
                                  {/* <option value="Training Title">Rating</option> */}
                                </div>
                              </form>
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
                    </Scrollbar>
                  </Scroll>
                </TableContainer>
              </Popover>

              {value === 0 && (
                <Root sx={{ width: "43.3%", paddingTop: "20px" }}>
                  <table>
                    <thead
                      style={{
                        background: "#eaeced",
                        fontSize: "15px",
                        fontWeight: "400",
                        height: "50px",
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
                            color: "#3e8cb5",
                            padding: "6px 16px"
                          }}
                        >

                          Objective<br></br> Type


                        </th>
                        <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff", padding: "6px 16px"
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
                                // margin:"-5px"
                              }}
                            >
                              Objective<br></br> Title
                            </div>
                          </form>
                        </th>
                        <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
                            padding: "6px 16px"
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
                                // width:"20px",
                                background: "none",
                                // margin:"-5px"
                              }}
                            >
                              Objective<br></br> Level
                            </div>
                          </form>
                        </th>
                        <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
                            padding: "6px 16px"
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
                                textAlign: "center",
                                // m
                              }}
                            >
                              {/* <option value="Training Title">Normalizer Rating</option> */}
                              Appraiser<br></br> Rating
                            </div>
                          </form>
                        </th>
                        <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
                            padding: "6px 16px"
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
                                // margin:"-5px"
                              }}
                            >
                              Appraiser<br></br> Comments
                            </div>
                          </form>
                        </th>
                        <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
                            padding: "6px 16px"
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
                                textAlign: "center",
                                // margin:"-5px"
                              }}
                            >
                              Reviewer<br></br> Rating
                            </div>
                          </form>
                        </th>
                        <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
                            padding: "6px 16px"
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
                                // margin:"-5px"
                              }}
                            >
                              Reviewer<br></br> Comments
                            </div>
                          </form>
                        </th>
                        {/* <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
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
                                // margin:"-5px"
                              }}
                            >
                              Normalizer Rating
                            </div>
                          </form>
                        </th> */}
                        {/* <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
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
                                // margin:"-5px"
                              }}
                            >
                              Normalizer Comments
                            </div>
                          </form>
                        </th> */}
                        <th
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            borderBottom: "1px solid #fff",
                            padding: "6px 16px"
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
                                // margin:"-5px"
                              }}
                            >
                              Appraiser<br></br> Actions
                            </div>
                          </form>
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      {employeeData &&
                        objectiveTitleData &&
                        objectiveDescription?.map((j: any, index: any) => {
                          return (
                            <>
                              <tr>
                                <td
                                  width="250px"
                                  // rowSpan={3}
                                  style={{
                                    padding: "6px 16px",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "left",
                                    lineHeight:"20px",
                                    wordBreak:"break-word"
                                  }}
                                >
                                  {j?.objective_type?.name?.name}
                                </td>
                                <td
                                  width="150px"
                                  style={{
                                    padding: "6px 16px",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "left",
                                    lineHeight:"20px",
                                    wordBreak:"break-word"
                                  }}
                                >
                                  {j?.name?.objectiveTitle}
                                  <IconButton
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
                                </td>
                                <td
                                  width="10px"
                                  align="center"
                                  style={{
                                    padding: "6px 16px",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "center",
                                    lineHeight:"20px"
                                  }}
                                >
                                  <>
                                    <Stack direction="row" justifyContent="center">
                                      {j.level_1_isChecked && (
                                        <>
                                          {" "}
                                          <span>L1 </span>{" "}
                                          <span>
                                            {/* {j?.name?.level_1?.level_definition} */}
                                          </span>
                                          <br />
                                        </>
                                      )}
                                      {j.level_2_isChecked && (
                                        <>
                                          {" "}
                                          <span>L2 </span>{" "}
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
                                          <span>L4 </span>{" "}
                                          <span>
                                            {/* {j?.name?.level_4?.level_definition} */}
                                          </span>
                                          <br />
                                        </>
                                      )}

                                      {(j.level_1_isChecked ||
                                        j.level_2_isChecked ||
                                        j.level_3_isChecked ||
                                        j.level_4_isChecked) && (
                                          <IconButton
                                            style={{ marginTop: "-5px" }}
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
                                                  {" "}
                                                  <span>L1 : </span>{" "}
                                                  <span>
                                                   <b> {
                                                      j?.name?.level_1
                                                        ?.level_definition
                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul  style={{marginTop:"0px",marginBottom:"0px"}}>
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
                                                  {" "}
                                                  <span>L2 : </span>{" "}
                                                  <span>
                                                  <b> {
                                                      j?.name?.level_2
                                                        ?.level_definition
                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul  style={{marginTop:"0px",marginBottom:"0px"}}>
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
                                                  {" "}
                                                  <span>L3 : </span>{" "}
                                                  <span>
                                                  <b> {
                                                      j?.name?.level_3
                                                        ?.level_definition
                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul  style={{marginTop:"0px",marginBottom:"0px"}}>
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
                                                  {" "}
                                                  <span>L4 : </span>{" "}
                                                  <span>
                                                  <b>{
                                                      j?.name?.level_4
                                                        ?.level_definition
                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{marginTop:"0px",marginBottom:"0px"}}>
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
                                </td>
                                <td
                                  width="10px"
                                  style={{
                                    padding: "6px 16px",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "center",
                                    lineHeight: "20px",
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "Arial",
                                      // @ts-ignore
                                      color:
                                        j.rating_rejected === true && "#FF0000",
                                      // display:
                                      //   j.rating_rejected === true
                                      //     ? "Block"
                                      //     : "none",
                                    }}
                                  >
                                    {j.ratings && j.ratings.rating}
                                  </Typography>
                                </td>
                                <td width="250px" style={{ textAlign: "left", padding: "6px 16px" , lineHeight: "20px",}}>
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
                                            if (
                                              k?.comments === "" ||
                                              k?.comments === undefined
                                            ) {
                                              return k?.remarks;
                                            } else {
                                              return k?.comments;
                                            }
                                          })[0]}
                                    </Typography>

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
                                      <Typography
                                        sx={{
                                          p: 2,
                                          backgroundColor: "#f8f8ff",
                                        }}
                                      >
                                        {/* Comments : {ratingComments1}<br /> */}
                                        {/* Attachments:{normalizerAttachmentss} */}
                                      </Typography>
                                    </Popover>
                                    {employeeData &&
                                      getAttachments(j?.name?._id)?.length >
                                      0 && (
                                        <AttachFileIcon
                                          style={{
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
                                      {/* <Typography
                                                                    sx={{
                                                                        p: 2,
                                                                        backgroundColor: "#f8f8ff",
                                                                    }}
                                                                >
                                                                    Attachments:{appraisalAttachments}


                                                                </Typography> */}
                                      <div
                                        style={{
                                          padding: "5px",
                                          fontSize: "12px",
                                          lineHeight: "20px",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                        }}
                                      >
                                        {/* <Stack
                                                                        spacing={1}
                                                                        direction="row"
                                                                        alignItems="center"
                                                                    > */}

                                        <Typography
                                          style={{
                                            fontSize: "12px",
                                            fontFamily: "Arial",
                                            color: "#333333",

                                            // maxWidth:"215px",
                                            // wordBreak:"break-all"
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
                                                        {/* </IconButton> */}
                                                      </Stack>
                                                    </Stack>
                                                  </>
                                                );
                                              }
                                            )}
                                        </Typography>
                                        {/* <Stack direction="row">
                                      <IconButton>
                                        <img src={Downloadatt} />
                                      </IconButton>
                                      <IconButton>
                                        <img src={Removeatt} />
                                      </IconButton>
                                    </Stack> */}

                                        {/* </Stack> */}
                                      </div>
                                    </Popover>

                                    {/* } */}
                                  </Stack>
                                </td>

                                <td
                                  width="10px"
                                  style={{
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    lineHeight: "20px",
                                    color: employeeData &&
                                      employeeData?.data?.reviewer?.objective_description
                                        .filter(
                                          (i: any) =>
                                            i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000",
                                    textAlign: "center",
                                  }}
                                >
                                  {employeeData &&
                                    employeeData?.data?.reviewer?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => k?.ratings?.rating)[0]}
                                </td>

                                <td width="250px" style={{ textAlign: "left", padding: "6px 16px", lineHeight: "20px", }}>
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
                                      <Typography
                                        sx={{
                                          p: 2,
                                          backgroundColor: "#f8f8ff",
                                        }}
                                      >
                                        {/* Comments : {ratingComments1}<br /> */}
                                        {/* Attachments:{normalizerAttachmentss} */}
                                      </Typography>
                                    </Popover>
                                    {employeeData &&
                                      getAttachments1(j?.name?._id)?.length >
                                      0 && (
                                        <AttachFileIcon
                                          style={{
                                            color: "#93DCFA",
                                            height: "18px",
                                            transform: "rotate(30deg)",
                                          }}
                                          aria-describedby={"id"}
                                          onClick={(e: any) => {
                                            handleClickOpen8(e, j);
                                            setPopoverIndex1(index);
                                          }}
                                        />
                                      )}
                                    <Popover
                                      id={"id"}
                                      open={popoverIndex1 === index && open8}
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
                                    >
                                      {/* <Typography
                                                                    sx={{
                                                                        p: 2,
                                                                        backgroundColor: "#f8f8ff",
                                                                    }}
                                                                >
                                                                    Attachments:{reviewerAttachmentss}


                                                                </Typography> */}
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

                                              // maxWidth:"215px",
                                              // wordBreak:"break-all"
                                            }}
                                          >
                                            {/* Attachments:{reviewerAttachmentss} */}
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

                                                        <img
                                                          style={{ cursor: 'pointer' }}
                                                          src={Removeattnew}
                                                          onClick={() =>
                                                            deleteReviewerMutation(
                                                              {
                                                                employee_id:
                                                                  employee_id,
                                                                name: k.remove,
                                                              }
                                                            )
                                                          }
                                                        />
                                                        {/* </IconButton> */}
                                                      </Stack>
                                                    </Stack>
                                                  </>
                                                );
                                              })}
                                          </Typography>

                                          {/* <Stack direction="row">
                                      <IconButton>
                                        <img src={Downloadatt} />
                                      </IconButton>
                                      <IconButton>
                                        <img src={Removeatt} />
                                      </IconButton>
                                    </Stack> */}
                                        </Stack>
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
                                        // maxWidth:"215px",
                                        // wordBreak:"break-all"
                                      }}
                                    >
                                      2
                                    </Typography>
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
                                      Lorem ipsum dolor sit amet consectetur 
                                    </Typography>
                                    <Stack direction="row">
                                      <IconButton>
                                        <img src={Downloadatt} />
                                      </IconButton>
                                      <IconButton>
                                        <img src={Removeatt} />
                                      </IconButton>
                                    </Stack>
                                    
                                  </Stack> */}
                                      </div>
                                    </Popover>

                                    {/* } */}
                                  </Stack>
                                </td>

                                {/* <td
                                  width="10px"
                                  style={{
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "center",
                                  }}
                                >
                                  <Typography
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "Arial",
                                      // // @ts-ignore
                                      // color:
                                      //     j.rating_rejected === true && "#FF0000",
                                      // display: j.rating_rejected === true ? 'Block' : 'none'
                                    }}
                                  >
                                    {employeeData &&
                                      employeeData.data.normalizer.objective_description
                                        .filter(
                                          (i: any) =>
                                            i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => k?.ratings?.rating)[0]}
                                  </Typography>
                                </td> */}

                                {/* <td width="160px" style={{ textAlign: "left" }}>
                                  <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                    paddingLeft="10px"
                                  >
                                    <Typography
                                      style={{
                                        fontSize: "14px",
                                        fontFamily: "Arial",
                                        color: "#333333",
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
                                    </Typography>

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
                                      <Typography
                                        sx={{
                                          p: 2,
                                          backgroundColor: "#f8f8ff",
                                        }}
                                      >
                                       
                                      </Typography>
                                    </Popover> */}
                                {/* {employeeData &&
                                      getAttachments2(j?.name?._id)?.length >
                                        0 && (
                                        <AttachFileIcon
                                          style={{
                                            color: "#93DCFA",
                                            height: "18px",
                                            transform: "rotate(30deg)",
                                          }}
                                          aria-describedby={"id"}
                                          onClick={(e: any) => {
                                            handleClickOpen6(e, j);
                                            setPopoverIndex2(index);
                                          }}
                                        />
                                      )} */}
                                {/* <Popover
                                      id={"id"}
                                      open={popoverIndex2 === index && open6}
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
                                              whiteSpace: "nowrap",
                                              overflow: "hidden",
                                              textOverflow: "ellipsis",
                                              width: "170px",
                                            }}
                                          >
                                            {employeeData &&
                                              getAttachments2(
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
                                                       

                                                        <img
                                                         style={{cursor:'pointer'}}
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
                                                        />
                                                      </Stack>
                                                    </Stack>
                                                  </>
                                                );
                                              })}
                                          </Typography>
                                        </Stack>
                                      </div>
                                    </Popover> */}

                                {/* </Stack>
                                </td> */}
                                {/* <td> */}
                                {/* {employeeData &&
                                    employeeData?.data?.reviewer?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => k?.rating_rejected == false)[0] &&( */}
                                {/* // <h1>comments</h1> */}
                                {/* )} */}
                                {/* </td> */}
                                <td
                                  width="30px"
                                  style={{ textAlign: "center" }}
                                >

                                  <>
                                    {employeeData &&
                                      // employeeData?.data?.reviewer?.objective_description
                                      //   .filter(
                                      //     (i: any) =>
                                      //       i?.name?._id === j?.name?._id
                                      //   )
                                      //   .map((k: any) => k?.rating_rejected == true)[0] && (
                                      <span>
                                        <Stack
                                          direction="row"
                                          justifyContent="center"
                                        >
                                          {/* <Tooltip title="Accept">
                                              <IconButton
                                                onClick={() =>
                                                  openDrawerHandlerNO(j)
                                                }
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
                                            </Tooltip> */}

                                          {
                                          // j.action_performed === true && j.rating_rejected === true ?
                                          //   <Tooltip title="Rejected">
                                          //     <IconButton
                                          //       onClick={() => openDrawerHandler(j)}
                                          //     >
                                          //       <img
                                          //         src={thumbsdown_colored}
                                          //         alt="icon"
                                          //         style={{ width: "16px", height: "16px" }}
                                          //       />
                                          //     </IconButton>
                                          //   </Tooltip> :
                                            <Tooltip title="Edit">
                                              <IconButton
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
                                          {/* <Button
                                                                        variant="outlined"
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

                                                                        onClick={() => openDrawerHandlerNO(j)}
                                                                    >
                                                                        Accept
                                                                    </Button> */}
                                          {/* <Button
                                                                        variant="outlined"
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
                                                                        onClick={() => openDrawerHandler(j)}

                                                                    >
                                                                        Reject
                                                                    </Button> */}
                                        </Stack>
                                      </span>
                                    }
                                    {/* )} */}

                                    {/* </Stack> */}

                                    {
                                      // ((employeeData && employeeData.data.normalizer.objective_description.filter(
                                      //     (i: any) => i.name._id === j.name._id
                                      // ).map((k: any) => k.ratings._id)[0])
                                      //  !== (employeeData && employeeData.data.appraisal.objective_description
                                      //     .filter(
                                      //         (i: any) => i.name._id === j.name._id
                                      //     )
                                      //     .map((k: any) => k.ratings._id)[0])
                                      //     ) &&
                                      // (
                                      //     <>
                                      //         <Button onClick={() => acceptHandler(j, (employeeData && employeeData.data.normalizer.objective_description.filter(
                                      //             (i: any) => i.name._id === j.name._id
                                      //         ).map((k: any) => k.ratings._id)[0]))}>Accept  </Button>
                                      //         <Button
                                      //             onClick={() => openDrawerHandler(j)}>Reject </Button>
                                      //     </>
                                      // )
                                    }
                                    {/*<Button>Accept </Button>*/}
                                    {/*<Button onClick={() => openDrawerHandler(j)}>Reject </Button>*/}
                                  </>
                                </td>
                              </tr>
                            </>
                          );
                        })}
                    </tbody>
                  </table>
                </Root>
              )}
              {value === 0 && (
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
                    // disabled={acceptButton}
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
                    }}
                    variant="outlined"
                    onClick={() => {
                      saveHandler();
                      // setSubmit(true);
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
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      background: "transparent",
                      height: "35px",
                      // width: "70px",
                      color: "#3E8CB5",
                    }}
                    variant="outlined"
                    onClick={submitButtonHandler}
                  // onClick={() => {
                  //   submitButtonHandler();
                  // submitHandler();
                  // if (name && fileSelected) {
                  //   return imageClick();
                  // }

                  // createMutation({
                  //   objective_description : appraiserComments,
                  //   id: employee_id
                  // })
                  // }}
                  >
                   Save and Submit 
                  </Button>
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
                        background: "transparent",
                        height: "35px",
                        width: "70px",
                        color: "#3E8CB5",
                      }}
                      variant="outlined"
                    // disabled

                    >
                      Cancel
                    </Button>
                  </Link>
                </Stack>
              )}
              <Dialog
                open={open}
                // onClose={handleClose2}
                BackdropProps={{
                  style: { background: "#333333 !important", opacity: "10%" },
                }}
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
                {/* {/* <DialogTitle
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                                id="alert-dialog-title"
                            >
                                <IconButton onClick={handleDialogClose}>
                                    {/* <img src={Closeicon} alt="icon" /> */}
                {/* </IconButton> */}
                {/* </DialogTitle>  */}
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
                      // marginRight: "10px",
                      width: "70px",
                      height: "35px",
                      background: "transparent",
                      color:"#3e8cb5"
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
        </Container>
        {/* <AlertYesNo
                    isAlertOpen={openYes}
                    handleAlertClose={handleAlertNo}
                    handleAlertYes={handleAlertYes}
                >
                    {message1}
                </AlertYesNo> */}
        <AlertDialogSuccess
          isAlertOpen={allFieldMandatory}
          handleAlertClose={allFieldMandatoryClose}>
          {message}
        </AlertDialogSuccess>

        <Dialog
          open={isAlertOpen}
          onClose={handleAlertNo}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "1%" } }}
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
              Did you review the recommendations ?
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
                  width:"70px",
                  height:"35px"
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
                  width:"70px",
                  height:"35px"
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
        <Dialog
          // fullScreen={fullScreen}
          open={allFeedMandatory}
          // onClose={handleAllFeedMandatory}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
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
              The performance appraisal has been successfully submitted to the Reviewer.
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
              // onClick={handleAllFeedMandatory}
              >
                Ok
              </Button>
            </Link>
          </DialogActions>
        </Dialog>

        <Dialog
          open={isAlertOpen1}
          onClose={handleAlertNo1}
          BackdropProps={{ style: { background: "#333333 !important", opacity: "1%" } }}
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
              Are you sure you would like to submit the Performance Appraisal?
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
                  width:"70px",
                  height:"35px"
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
                  width:"70px",
                  height:"35px"
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
        {/* <AlertYesNo
                    isAlertOpen={openYes1}
                    handleAlertClose={handleAlertNo1}
                    handleAlertYes={() => {
                      handleAlertYes1();
                    }}
                >
                   Are you sure you would like to Reject the Performance Appraisal?
                </AlertYesNo> */}
      </div>
    </React.Fragment>
  );
}
