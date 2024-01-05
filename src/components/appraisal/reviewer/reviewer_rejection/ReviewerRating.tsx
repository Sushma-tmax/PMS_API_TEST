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
  Button,
  Container,
  Stack,
  TextField,
  FormControl,
  FormControlLabel,
  Popover,
  Typography,
  Avatar,
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
  Popper,
  ClickAwayListener,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import CircularProgress from "@mui/material/CircularProgress";
// import {
//   usePopupState,
//   bindTrigger,
//   bindPopover,
// } from 'material-ui-popup-state/hooks';

// import {
//   MIDYEAR_PA_REPORT,
//   MIDYEAR_PERFORMANCE,
//   MIDYEAR_REJECT_RATING,
//   MIDYEAR_SUCCESS,
// } from "../../constants/routes/Routing";
import Command from "../../ReviewerRejection/Icons/Command.svg";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
// import FolderRoundedIcon from '@mui/icons/FolderRounded';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
// import AttachFileIcon from '@material-ui/icons/AttachFile';
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useEffect, useState, useRef } from "react";
import {
  useAttachmentsReviewerMutation,
  useCreateEmployeeAppraisalMutation,
  useGetEmployeeAppraisalQuery,
  useGetEmployeeQuery,
  useAppraiserRejectsEmployeeMutation,
  useGetObjectiveTitleQuery,
  useGetRatingScaleQuery,
  useReviewerRejectionMutation,
  useUpdateEmployeeAppraisalMutation,
  useAttachmentsAppraiserDeleteMutation,
  useAttachmentsReviewerDeleteMutation,
  useReviewerAcceptsAppraiserRatingMutation,
} from "../../../../service";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";

import Infoicon from "../../../../assets/Images/Infoicon.svg";
import Footerbuttons from "./Footerbuttons";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import Eye from "../../../../assets/Images/Eye.svg";
import Close from "../../../../assets/Images/Close.svg";
import Newtickicon from "../../../../assets/Images/Newtickicon.svg";
import Thumsup from "../../../../assets/Images/Thumsup.svg";
import thumbsdown_colored from "../../../../assets/Images/Thumbsdowncolored.svg";
// import thumbsup_colored from "../../../../assets/Images/icon/Thumbsupcolored.svg";
import thumsup_colored from "../../../../assets/Images/thumsup_colored.svg";
import Thumsdown from "../../../../assets/Images/Thumsdown.svg";
import Closeiconred from "../../../../assets/Images/Closeiconred.svg";
import Downloadatt from "../../../../assets/Images/Downloadatt.svg";
import Removeattnew from "../../../../assets/Images/Removeattnew.svg";
import { Scrollbar } from "react-scrollbars-custom";
import Uploadatt from "../../../../assets/Images/Uploadatt.svg"
import Infowhiteicon from "../../../../assets/Images/Infowhiteicon.svg";
import { useNormalizerContext } from "../../../../context/normalizerContext";
import AlertYesNo from "../../../UI/DialogYesNo";
import ProvidedReviewerContextProvider from "../../../../context/reviewerContextContext";
import { gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import { REVIEWER_VIEW_PA, EMPLOYEE_PREVIOUS_PAs } from "../../../../constants/routes/Routing";
import { makeStyles } from "@mui/styles";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import { useGetEmployeeDetailsWithEmpCodeQuery } from "../../../../service/employee/previousAppraisal";

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



}));
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
const Typo1 = styled("div")({
  // marginLeft: "25px",
  paddingTop: "20px",
  color: "#008E97",
  fontSize: "18px",
});
// const Item = styled("div")(({ theme }) => ({
//   backgroundColor: "#f2f9fa",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
//   height: "188px",
// }));
const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
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
const Containnn = styled("div")({
  // marginRight: "20px",
  marginTop: '10px',
  // width: '1200',
  paddingTop: '0px',
  paddingBottom: "20px"

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
const Item2 = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "450px",
  margin: "1rem",
  marginBottom: "0px",
}));
const Footer = styled("div")({
  marginLeft: "120%",
  paddingTop: "20px",
  paddingBottom: "30px",
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

export default function ReviewerRating(props: any) {
  const classes = useStyles();
  const {
    navPrompt,
    setnavPrompt,
    value,
    setValue,
    handleChange,
    moveTab,
    setMoveTab,
    objectiveDescription,
    setObjectiveDescription,
    fetchCancel
  } = props;
  const { appraisalData, ratingScaleData } = props;
  const { data: nineBoxData } = useGetNineboxQuery("");
  const CustomScrollbar = Scrollbar as any;

  // @ts-ignore
  const { empData: employeeData, employee_id, normalizerOverallFeedback, setNormalizerOverallFeedback, disableTextAfterSubmission, reviewerOverallFeedComments, setReviewerOverallFeedComments, employeeDataIsFetching, refetchEmployeeData, appraiserOverallFeedComments } = useReviewerContext();
  // @ts-ignore
  // const { normalizerOverallFeedComments,setNormalizerOverallFeedComments } = useNormalizerContext()
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [comments1, setComments1] = useState('');
  // const [reviewerComments, setReviewerComments] = useState(reviewerOverallFeedComments)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  // const [objectiveDescription, setObjectiveDescription] = useState<any>([]);

  const [name, setName] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<any>("");

  console.log(fileSelected, name, "augustya");

  const { data: ratingsData } = useGetRatingScaleQuery("");
  const [upDateReviewer, { isLoading: isUploading }] = useReviewerRejectionMutation();
  const [upDateAppraiserRating, { isLoading: isAcceptLoading }] = useReviewerAcceptsAppraiserRatingMutation();
  // const theme = useTheme();
  console.log(isUploading, "isUploading");

  // const fullScreen1 = useMediaQuery(theme.breakpoints.down("md"));
  const [sendItem] = useCreateAzureBlobMutation();

  // const {data: employeeData} = useGetEmployeeAppraisalQuery('6204935ebca89023952f2da9')

  console.log(employeeData, "my test");
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
  const { data: empData } = useGetEmployeeAppraisalQuery(employee_id)
  console.log(empData, "empData")
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [rating, setRating] = useState<any>("");
  const [updateMutation] = useCreateEmployeeAppraisalMutation();
  const [attachmentsReviewer] = useAttachmentsReviewerMutation();
  const [comments, setComments] = useState("");
  const [objective, setObjective] = useState<any>("");
  const [ratingRed, setRatingRed] = useState<any>(false);
  const [thumsdown, setThumsdown] = useState<any>(false);
  const [ratingValue, setRatingValue] = useState<any>("");
  const [displayEmployeeRating, setDisplayEmployeeRating] = useState(false);
  const [acceptRatingAlert, setAcceptRatingAlert] = useState(false)
  const [objectiveData, setObjectiveData] = useState<any>({})
  const [accept, setAccept] = useState("");
  const [appraiserRejectsEmployee] = useAppraiserRejectsEmployeeMutation();
  const [appraiserUpdateRating] = useUpdateEmployeeAppraisalMutation();
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [deleteReviewerMutation, { isLoading: isDelete, data: deleted }] =
    useAttachmentsReviewerDeleteMutation();
  const inputRef = useRef<any>(null);

  const [anchorElReviewer, setanchorElReviewer] =
    React.useState<HTMLButtonElement | null>(null);
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  console.log(ratingAppraiser, "ratingAppraiser");
  const [ratingComments1, setRatingComments1] = useState<any>("");
  const [ratingComments, setRatingComments] = useState<any>("");
  const [reviewerAttachments, setreviewerAttachments] = useState<any>("");
  const [reviewerAttachmentsurl, setreviewerAttachmentsurl] = useState<any>("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [appraiserRating, setAppraiserRating] = useState("");
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [objTitleHeader, setobjTitleHeader] = useState<any>("");
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: employeeData?.data?.employee_code })

  const handleClickAppraiserDetails = (event: any, j: any) => {
    console.log(j, "jjjj");
    setRatingComments1(
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
  };
  console.log(ratingComments1, ratingComments, "ooooo");
  const handleClose = () => {
    setAnchorEl(null);
    setRatingComments1(null);
  };
  const openAppraiserDetails = Boolean(anchorEl);
  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  // const open3 = Boolean(open3);

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClickOpen3 = () => {
    setOpen3(true);
  };

  const handleClose3 = () => {
    setOpen3(false);
  };

  // const handleReviewerCommentsChange = (e: any) => {
  //   console.log(e);
  //   setReviewerComments(e.target.value)
  //   setnavPrompt(true)
  // }

  // useEffect(() => { 
  //     setReviewerOverallFeedComments(reviewerComments)  
  // }, [reviewerComments]);

  const handleReviewerCommentsChange = (e: any) => {
    console.log(e);
    setReviewerOverallFeedComments(e.target.value)
    setnavPrompt(true)
  }

  // useEffect(() => { 
  //     setReviewerOverallFeedComments(reviewerOverallFeedComments)  
  // }, [reviewerOverallFeedComments]);

  useEffect(() => {
    //@ts-ignore
    // console.log(checkboxIdHandler(checkboxHandler(users)))
    setNormalizerOverallFeedback(comments1)

  }, [comments1]);
  const handleCommentsChange = (e: any) => {
    // console.log(e);
    setComments1(e.target.value)
    setnavPrompt(true)
  }
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

  let ColorArray = [{
    key: "Individual Objectives", value: "rgb(167,255,226)"
  }, {
    key: "Management Competenciees", value: "rgb(235,190,245)"
  }, {
    key: "Job Objectivesssssss", value: "rgb(200,229,247)"
  }]



  console.log(ColorArray, "ColorArray")
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
    // setreviewerAttachmentsurl(
    //   employeeData &&
    //   employeeData?.data?.reviewer?.attachments
    //     .filter((i: any) => i?.objective_description === j.name._id)
    //     .map((k: any) => k.url)
    // );

    setanchorElReviewer(event.currentTarget);
  };
  console.log(reviewerAttachments, "reviewerAttachments");
  const handleCloseReviewer = () => {
    setanchorElReviewer(null);
    setRatingComments(null);
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
  const openReviewerDetails = Boolean(anchorElReviewer);

  const handleacceptChange = (event: any) => {
    setAccept(event.target.value as string);
  };

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };

  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData.data.reviewer.objective_type.find(
        (item: any) => item.name._id === id
      );
    }
  };

  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setObjectiveDescription(() => {
        return employeeData.data.reviewer.objective_description.map(
          (i: any, index: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
              objective_type: findObjectiveTypeById(i.name.objective_type),
              attachment: employeeData.data.reviewer?.attachments ? employeeData.data.reviewer?.attachments[index] : "",
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
  const [showWithdraw, setShowWithdraw] = useState(false);

  const openDrawerHandlerreject = (objective: any) => {
    console.log(objective, "objectiveobjective")
    console.log("slideropened for reject");
    setName("");
    setFileSelected("");
    setAccept("Reject");
    openDrawer();
    setobjTitleHeader(objective?.name?.objectiveTitle);
    setActiveObjectiveDescriptionName(objective?.name?._id);
    setActiveObjectiveDescription(objective?._id);
    setComments(objective?.rejection_reason);
    // setRating(objective?.ratings?._id);
    let appraiserRatingValue =
      employeeData?.data?.appraisal?.objective_description
        .filter((i: any) => i?.name?._id === objective?.name?._id)
        .map((k: any) => {
          if (k?.ratings) return k?.ratings?.rating;
        })[0];
    let reviewerRatingVal = employeeData?.data?.reviewer?.objective_description
      .filter((i: any) => i?.name?._id === objective?.name?._id)
      .map((k: any) => {
        if (k?.ratings) return k?.ratings?.rating;
      })[0];
    setRatingAppraiser(appraiserRatingValue);
    setratingparams(reviewerRatingVal);
    if (objective.rating_rejected == true) {
      setRating(objective.ratings._id);
      setRatingValue(objective.ratings.rating);
    } else {
      setRating("");
      setRatingValue("");
    }

    if (objective.rating_rejected == true && objective.action_performed == true) {
      setShowWithdraw(true)
    }
    else {
      setShowWithdraw(false)
    }




    //setratingCheck(true)
  };

  //  to withdraw rating
  const [showReason, setShowReason] = useState(false);
  const [showReasonReviewer, setShowReasonReviewer] = useState(false);

  const getActionStatus = (data: any, j: any) => {
    if (data.appraisal.appraiser_status == "appraiser-rejected") {
      return data?.appraisal?.objective_description
        .filter(
          (i: any) => i.name._id === j.name._id
        )
        .map((k: any) => {
          if (k.rating_rejected == true || (j.action_performed === true))
            return k.rating_rejected;
        })[0]
    } else {
      return data
    }
  }


  const ratingWithdrawHandler = () => {
    closeDrawer();
    let previousRatingData = employeeData.data.reviewer_previous_submission.objective_description
      .filter((i: any) => i.name === activeObjectiveDescriptionName)
      .map((k: any) => {
        return {
          ratings: k.ratings,
          rating_rejected: k.rating_rejected,
          rejection_reason: k.rejection_reason ? k.rejection_reason : "",
        }
      })[0];

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

    // let tempComments = employeeData.data.reviewer_previous_submission.objective_description
    //   .filter((i: any) => i.name === activeObjectiveDescriptionName)
    //   .map((k: any) =>  (k.comments == "" || k.comments == undefined) ? "" : k.comments )[0];

    upDateReviewer({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: previousRatingData.ratings,
      rating_rejected: previousRatingData.rating_rejected,
      rejection_reason: previousRatingData.rejection_reason,
      action_performed: false,
      current_objective_description: current_objective_description,

      // comments: tempComments,
      // rating_comments: "",
      employee_id,
    });
    setRating("");
    setRatingValue("")
    setComments("");
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setRating("");
    setRatingValue("");
    // setRatingAppraiser("");
    // setratingparams("");
  };
  const ratingSubmitHandler = () => {
    //setnavPrompt(true)
    console.log(ratingValue, 'ratingValue')
    if (ratingValue === null ||
      ratingValue === "" ||
      ratingValue === undefined) {
      setrejectAlertMessage("Please select a rating to reject.");
      setrejectAlert(true);
    }
    else if (ratingAppraiser === ratingValue) {
      setrejectAlertMessage(
        "You cannot select the same rating as the Appraiser. Please change the rating."
      );
      setrejectAlert(true);
      // setnavPrompt(true);
    }
    else if (
      ratingparams === null ||
      ratingparams === "" ||
      ratingparams === undefined
    ) {
      setrejectAlertMessage("Please select a rating to reject.");
      setrejectAlert(true);
    }
    else if (comments == "" || comments == undefined) {
      setrejectAlertMessage("Please add rejection reason.");
      setrejectAlert(true);
    } else {
      closeDrawer();
      let appraiser_objective_description = employeeData?.data?.appraisal?.objective_description?.map(
        (i: any) => {
          if (employeeData?.data?.appraisal?.appraiser_status == "submitted") {
            if (i.name._id === objectiveData?.name?._id) {
              return {
                ...i,
                rating_rejected: false,
                rating_accepted: false
              }
            } else return i
          } else {
            if (i.name._id === objectiveData?.name?._id) {
              return {
                ...i,
                rating_rejected: true,
              }
            } else return i
          }
        })

      let current_objective_description = employeeData?.data?.current_rating?.objective_description?.map(
        (item: any) => {
          // if (item.name._id === objectiveData?.name?._id) {
          if (item.name._id === activeObjectiveDescriptionName) {
            return {
              ...item,
              ratings: rating
            }
          } else return item
        }
      )

      upDateReviewer({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        rejection_reason: comments,
        rating_rejected: true,
        action_performed: true,
        appraiser_objective_description: appraiser_objective_description,
        reviewerOverallFeedComments: reviewerOverallFeedComments,
        current_objective_description: current_objective_description,
        reviewer_status: "draft",
        pa_status: "Pending with Reviewer",
        employee_id,
      }).then((res: any) => {
        if (name && fileSelected) {
          return imageClick();
        }
        refetchEmployeeData()
      })

      setRating("");
      setRatingAppraiser("");
      setnavPrompt(false);
    }
  };

  useEffect(() => {
    const rejected = objectiveDescription?.map((i: any) => {
      if (i.rating_rejected === true) {
        setRatingRed(true);
      } else {
        setRatingRed(false);
      }
    });
    return rejected;
  }, [objectiveDescription]);

  // setThumsdown

  // const openDrawerHandler = () => {
  //   handleAcceptRatingAlertYes()
  //   // setAcceptRatingAlert(true);
  //   // setMessage("Are you sure you wish to accept the rating ?")
  // };
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
  const handleAcceptRatingAlertYes = (objectiveData: any) => {
    setnavPrompt(false);
    setAcceptRatingAlert(false);
    setMessage("")
    setAccept("Accept");
    setFileSelected("");
    setName("");
    // openDrawer();
    setobjTitleHeader(objectiveData?.name?.objectiveTitle);
    setActiveObjectiveDescriptionName(objectiveData?.name?._id);
    setActiveObjectiveDescription(objectiveData?._id);
    setComments(objectiveData?.comments);
    setRating(objectiveData?.ratings?._id);
    let reviewerRatingValue = employeeData.data.appraisal.objective_description
      .filter((i: any) => i.name._id === objectiveData?.name?._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    setRatingAppraiser(reviewerRatingValue);
    acceptHandler(objectiveData);
  }

  const handleAcceptRatingAlertNo = () => {
    setAcceptRatingAlert(false);
    setMessage("")
  }

  // const acceptHandler = (objective: any, rating: any) => {
  const acceptHandler = (objective: any) => {
    console.log("slideropened", objective);
    // setActiveObjectiveDescriptionName(objective.name._id)
    // setActiveObjectiveDescription(objective._id)
    // setComments(objective.comments)
    // setRating(rating)

    // ratingSubmitHandler()

    let temp = employeeData.data.appraisal.objective_description
      .filter((i: any) => i.name._id === objective?.name?._id)
      .map((k: any) => k.ratings._id)[0];

    let appraiser_objective_description = employeeData.data.appraisal.objective_description.map(
      (i: any) => {

        if (employeeData?.data?.normalizer?.normalizer_status == "rejected") {
          if (i.name._id === objective?.name?._id) {
            return {
              ...i,
              rating_resubmitted: true,
              rating_rejected: false
            }
          } else return i
        }
        else {
          if (i.name._id === objective?.name?._id) {
            return {
              ...i,
              rating_rejected: false,
              rating_accepted: true
            }
          } else return i
        }
      }
    )

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

    // setnavPrompt(true);
    // upDateReviewer({
    //   objective_description: activeObjectiveDescription,
    //   objective_description_name: activeObjectiveDescriptionName,
    //   ratings: temp,
    //   rating_rejected: false,
    //   action_performed:true,
    //   comments: comments,
    //   employee_id,
    // });
    // upDateReviewer({
    //   objective_description: objective._id,
    //   objective_description_name: objective.name._id,
    //   ratings: temp,
    //   rating_rejected: false,
    //   action_performed: true,
    //   rejection_reason: "",    //  
    //   employee_id,

    // });
    upDateAppraiserRating({
      objective_description: objective?._id,
      objective_description_name: objective?.name?._id,
      ratings: temp,
      rating_rejected: false,
      action_performed: true,
      // rejection_reason: "",
      current_objective_description: current_objective_description,
      appraiser_objective_description: appraiser_objective_description,
      reviewerOverallFeedComments: reviewerOverallFeedComments,
      id: employee_id,

    });
    // closeDrawer();
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
      attachmentsReviewer({
        attachments: {
          url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id,
      });
    })
  };

  console.log(ratingsData, "rating");

  const resetFileInput = () => {
    setFileSelected("");
    setName("");

    inputRef.current.value = null;
  };
  // console.log(fileSelected === "", "new");
  console.log(name === "", "new1");

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
  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2true);
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

  console.log(fileSelected, 'fileSelected')
  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
    },
  };
  //slider validation
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState("");
  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>(ratingAppraiser);
  const [message, setMessage] = useState("")
  // useEffect(() => {
  //   setratingparams(ratingAppraiser);
  // }, [ratingAppraiser]);

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setrejectAlertMessage("");
    //  setRating("");
    //  setratingparams("")
  };

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    if (ratingAppraiser === j.rating) {
      setrejectAlertMessage(
        "You cannot select the same rating as the Appraiser. Please change the rating."
      );
      setrejectAlert(true);
    } else {
      if (j) setRating(j._id);
      // setratingSelection(true);
    }
  };
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

  const [isShown, setIsShown] = useState(false);

  const handleCloseInfo = () => {
    setAnchorEls(null);
  };

  // rating hower
  //tab functions
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
  //tab functions
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data?.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  //  to get PA status 
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

  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl10, setAnchorEl10] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorPreviousRatingPopOver, setAnchorPreviousRatingPopOver] = React.useState<HTMLElement | null>(
    null
  );
  const openPreviousRating = Boolean(anchorPreviousRatingPopOver);
  const id_Previous_Rating = openPreviousRating ? "simple-popover" : undefined;
  const open8 = Boolean(anchorEl8);
  const open10 = Boolean(anchorEl10);
  const id8 = open8 ? "simple-popover" : undefined;
  const id10 = open10 ? "simple-popover" : undefined;


  const handlePreviousRatingPopOverClose = () => {
    setAnchorPreviousRatingPopOver(null)
  }

  const handlePreviousRatingPopOverOpen = (event: React.MouseEvent<HTMLElement>, j: any) => {
    setAnchorPreviousRatingPopOver(event.currentTarget);
  };


  const handleClick8 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setAnchorEl8(event.currentTarget);
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


  const handleClick10 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setAnchorEl10(event.currentTarget);
    setappraisalAttachments(
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
  };


  const handleClose8 = () => {
    setAnchorEl8(null);
  };

  const handleClose10 = () => {
    setAnchorEl10(null);
  };

  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;
  const handleClick9 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setAnchorEl9(event.currentTarget);
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
  const handleClose9 = () => {
    setAnchorEl9(null);
  };

  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
  const [popoverIndex, setPopoverIndex] = useState<any>("");
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

  const handleViewPA = () => {
    window.open(`${REVIEWER_VIEW_PA}/employee/${employee_id}`, '_blank')
  }
  const [popoverIndexReviewer, setPopoverIndexReviewer] = useState<any>("");
  const getAttachmentsReviewer = (id: any) => {
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
  const [showd, setShowd] = useState<any>("")
  const [appraiseraction, setAppraiseraction] = useState<any>("")

  const showActionStatus = (j: any) => {
    if (employeeData?.data?.appraisal?.appraiser_status == "appraiser-rejected") {
      return (employeeData?.data?.appraisal?.objective_description
        .filter(
          (i: any) =>
            i?.name?._id === j?.name?._id
        )
        .map((k: any) => k?.rating_rejected == true)[0] || (j.action_performed === true))
    } else if (employeeData?.data?.normalizer?.normalizer_status == "rejected") {
      return (employeeData?.data?.appraisal?.objective_description
        .filter(
          (i: any) =>
            i?.name?._id === j?.name?._id
        )
        .map((k: any) => k?.rating_resubmitted == true)[0] || (j.action_performed === true))
    }
    else if (employeeData?.data?.appraisal?.appraiser_status == "submitted") {
      return (employeeData?.data?.appraisal?.objective_description
        .filter(
          (i: any) =>
            i?.name?._id === j?.name?._id
        )
        .map((k: any) => k)[0])
    }
    //  return employeeData?.data?.appraisal?.appraiser_status == "appraiser-rejected" && 
    //   employeeData?.data?.appraisal?.objective_description
    //       .filter(
    //         (i: any) =>
    //           i?.name?._id === j?.name?._id
    //       )
    //       .map((k: any) => k?.rating_rejected == true)[0]) || (j.action_performed === true))
  }



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
          Reviewer Action
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
                {objTitleHeader}
              </Typography>
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
                inputProps={{ maxLength: 500 }}
                style={{ paddingRight: "100px", width: "75%" }}
                value={comments}
                autoComplete="off"
                onChange={(e) => {
                  setComments(e.target.value);
                  setnavPrompt(true);
                  setMoveTab(true);
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
                // onClick={() => acceptHandler()}
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
                {objTitleHeader}
              </Typography>
              <div
                style={{
                  textAlign: "left",
                  paddingLeft: "9px",
                  fontSize: "12px",
                  fontFamily: "arial",
                  paddingBottom: "7px",
                  color: "#7A7A7A",
                }}
              >
                Reviewer Rating
              </div>

              <>
                <Stack
                  style={{ paddingLeft: "7px" }}
                  // height="50px"
                  direction="row"
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
                                // if (ratings) setRating(ratings._id);
                                // ratingColorHandler(rating._id)
                                // setnavPrompt(true);
                                handleRatingAlert(ratings);
                                setRating(ratings._id);
                                setRatingValue(ratings.rating);
                                setDisplayEmployeeRating(false);


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
                              <p style={{ color: "#3C8BB5", fontSize: "10px" }}>
                                {ratings.rating_scale}
                              </p>
                            )} */}
                          </Contain>
                        </Item1>
                      ))}
                </Stack>
                {/* <p
                                    style={{
                                        textAlign: "left",
                                        display: "flex",
                                        alignItems: "center",
                                        paddingLeft: "10px",
                                    }}
                                >
                                    Employee Rating :
                                    <Item1
                                        sx={{
                                            marginLeft: "2px",
                                            padding: "0px",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Contain>
                                            <Button
                                                style={{
                                                    //@ts-ignore
                                                    borderColor: "#3C8BB5",
                                                }}
                                                size="small"
                                            >
                                                3
                                            </Button>
                                        </Contain>
                                    </Item1>
                                </p> */}
                {/* {employeeData.data.reviewer.rejection_count == 2 && (
                  <p style={{ textAlign: "left", paddingLeft: "10px" }}>
                    Submit reasons of the rejections
                  </p>
                )}
                <div>
                  {employeeData.data.reviewer.rejection_count == 2 && (
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
                            label="The rating was not agreed with the Appraiser"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="An error made by the Appraiser"
                          />
                        </RadioGroup>
                      </FormControl>
                    </>
                  )}

                 
                </div> */}
                {/* // ) : employeeData.data.reviewer.rejection_count == 1 ? (
                  //   "Second Time"
                  // ) : (
                  //   "First Time"
                  // )} */}
              </>
            </Item2>

            <Stack
              direction="column"
              position="relative"
            // display="flex"
            // alignItems="center"
            >
              <Item1
                sx={{
                  marginLeft: "2px",
                  padding: "0px",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: "24px",
                    fontSize: "12px",
                    fontFamily: "arial",
                    paddingBottom: "7px",
                    paddingTop: "16px",
                    color: "#7A7A7A",
                  }}
                >
                  Appraiser Rating
                </div>
                <Contain>
                  <Stack
                    direction="column"
                    alignItems="start"
                    display="flex"
                    marginLeft="24px"
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
                      {/* {getRatingDescription(ratingReviewer)} */}
                      {/* Very Bad Performance */}
                    </span>
                  </Stack>
                </Contain>
              </Item1>
            </Stack>

            <div
              style={{
                textAlign: "left",
                paddingLeft: "26px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial",
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
              multiline
              autoComplete="off"
              size="small"
              style={{ paddingLeft: "28px", width: "75%" }}
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
                paddingLeft: "28px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial"
              }}
            >
              Attachment
            </div>
            <div>
              <Stack direction="row" alignItems="center" spacing={3}>
                <span>
                  <input
                    id="photo"
                    // style={styles.colors}
                    style={{ display: "none" }}
                    name="photo"
                    type="file"
                    ref={inputRef}
                    multiple={false}
                    onChange={(e) => {
                      handleImageChange(e);
                      // setMoveTab(true)
                    }}
                  />
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
                  <><label
                    style={{
                      fontSize: "14px",
                      fontFamily: "Arial",
                      color: "#7A7A7A",
                    }}
                  >{name}
                  </label></>
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

                {/* {employeeData &&
                  objectiveTitleData &&
                  objectiveDescription?.map((j: any, index: number) => {   
                  
                    return (
                      <>
                        {employeeData && getAttachments(j?.name?._id)
                        //  ?.filter((i: any) => i?.objective_description === j.name._id)
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
                  // setMoveTab(true)
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
                    // setMoveTab(true)
                  }}
                >
                  {" "}
                  Withdraw{""}
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
        style={{
          backgroundColor: "#F1F1F1",
          height: "auto",
          minHeight: "100px",
          overflow: "hidden",
        }}>
        <Box
          sx={{
            // maxWidth: "95% !important",
            // height: "1408px",
            marginLeft: "25px",
            marginRight: "25px",
            background: "#fff",
            // marginBottom:"25px"
          }}
        >
          {/* <div><Header /></div> */}
          {/* <Box sx={{ flexGrow: 1, paddingBottom: "20px" }}> */}
          {/* <Grid container spacing={2}> */}
          {/* <Grid item xs={8}> */}
          {/*<Item>*/}
          {/*    <h2*/}
          {/*        style={{*/}
          {/*            color: "#004C75",*/}
          {/*            fontWeight: "400",*/}
          {/*            opacity: "0.9",*/}
          {/*        }}*/}
          {/*    >*/}
          {/*        Sharaban Abdullah Rating*/}
          {/*    </h2>*/}
          {/*    <h2>4.5</h2>*/}
          {/*    <p*/}
          {/*        style={{*/}
          {/*            fontSize: "13px",*/}
          {/*        }}*/}
          {/*    >*/}
          {/*        10-Jun-21*/}
          {/*    </p>*/}
          {/*    <h4 style={{fontWeight: "400"}}>Exceeds Expectations</h4>*/}
          {/*</Item>*/}
          {/* </Grid> */}
          {/*<Grid item xs={4}>*/}
          {/*    <Item1>*/}
          {/*        <h2*/}
          {/*            style={{*/}
          {/*                color: "#004C75",*/}
          {/*                fontWeight: "400",*/}
          {/*                opacity: "0.9",*/}
          {/*            }}*/}
          {/*        >*/}
          {/*            Your Rating*/}
          {/*        </h2>*/}
          {/*        <h2>3.0</h2>*/}
          {/*        <p*/}
          {/*            style={{*/}
          {/*                fontSize: "13px",*/}
          {/*            }}*/}
          {/*        >*/}
          {/*            Delivering*/}
          {/*        </p>*/}
          {/*    </Item1>*/}
          {/*</Grid>*/}
          {/* </Grid> */}
          {/* </Box> */}
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
                  <Overallrating style={{ display: "flex", alignItems: "center",  fontSize: "17px", }} >
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
                  <Stack direction="column">
                    <span
                      style={{
                        fontSize: "17px",
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                      }}
                    >
                      {employeeData?.data?.legal_full_name}
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
                      {employeeData?.data?.job_title}{" "}
                      <span
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
                      {employeeData?.data?.division}
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
                </Grid> */}
            {/* <Grid item xs={1}>
                <p>
                  <Button
                    variant="outlined"
                    size="small"
                    style={{
                      textTransform: "none",
                      fontSize: "12px",
                    }}
                  //   onClick={createPDF}
                  >
                    Download
                  </Button>
                </p>
              </Grid> */}
            {/* </Grid>
            </Box> */}
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
              {/* {employeeData?.data?.appraisal_template?.potential !== false && 
              <Item>
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
              </Item>} */}
              {/* } */}

              <Item>
                <Stack direction="column" alignItems="center">
                  <Stack direction="row" gap={1}>
                    {employeeDataIsFetching && (
                      <CircularProgress size={15} thickness={7} />
                    )}
                    <Overallrating>Overall Rating

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
                  </Stack>

                  <Overallratingvalue>
                    {ratingdefenition?.length > 0 &&
                      <IconButton sx={{padding:"4px"}} onClick={handleClick22} >
                        <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                      </IconButton>
                    }
                    <b>
                      {/* {employeeData &&
                      employeeData?.data?.appraisal?.appraiser_rating == 0
                        ? "-"
                        : employeeData?.data.appraisal?.appraiser_rating} */}
                      {employeeData &&
                        // employeeData?.data?.reviewer?.reviewer_rating == 0
                        // ? "Yet to be rated."
                        // : 
                        employeeData?.data?.current_rating?.overall_rating?.toFixed(2)}
                    </b>
                  </Overallratingvalue>
                  {/* <Overallratingcomments>
                    {employeeData &&
                      getRatingDescription(
                        employeeData?.data?.appraisal?.appraiser_rating
                      )}
                     Rating excefing 
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
                    {employeeData.data.calendar.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  {employeeData?.data?.appraisal_template?.potential ==
                    true && (
                      // <Item>
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
                                 <b>High </b> : {nineBoxData?.data[0]?.potential_definitions?.high}
                                </span>
                              )}
                             
                              {employeeData?.data?.appraisal?.potential == "Moderate" && (
                                <span> <b>Moderate </b>:{nineBoxData?.data[0]?.potential_definitions?.moderate}</span>
                              )}
                              {employeeData?.data?.appraisal?.potential == "Low" &&(
                               <span> <b>Low</b> :{nineBoxData?.data[0]?.potential_definitions?.low} </span>
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
                      // </Item>
                    )}
                </Grid>
              </Stack>
            </Box>
            {employeeData?.data?.appraisal?.appraiser_rejection_reason !== "" &&
              employeeData?.data?.appraisal?.appraiser_rejection_reason !== undefined &&
              <>
                {/* <TrainingRecommendations>
                  <b>Appraiser Rejection Reason</b>
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
                      autoComplete="off"
                      name="comments"
                      value={appraiserOverallFeedComments}
                    // onChange={e => {
                    //   handleAppraiserCommentsChange(e);
                    //   setMoveTab(true);
                    //   setnavPrompt(true);

                    // }}
                    />

                  </Tf1>
                </Containnn> */}
              </>
            }

            {(
              <>
                <TrainingRecommendations>
                  <b>Reviewer Rejection Reason</b>
                  <span style={{
                    fontSize: "22px",
                  }}>*</span>
                </TrainingRecommendations>
                <Containnn>
                  <Tf1>

                    <TextField
                      InputProps={{ readOnly: disableTextAfterSubmission }}
                      // disabled={disableTextAfterSubmission}
                      placeholder="Add"
                      size="small"
                      //  fullWidth
                      multiline
                      // inputProps={{ maxLength: 500 }}
                      autoComplete="off"
                      name="comments"
                      value={reviewerOverallFeedComments}
                      onChange={e => {
                        handleReviewerCommentsChange(e);
                        setMoveTab(true);
                        setnavPrompt(true);

                      }} />

                  </Tf1>
                </Containnn>
              </>
            )}

            {employeeData && employeeData?.data?.normalizer?.normalizer_overall_feedback !== undefined &&
              employeeData?.data?.normalizer?.normalizer_overall_feedback !== "" &&
              employeeData?.data?.normalizer?.normalizer_PA_rejected == true && (
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
                        value={normalizerOverallFeedback}
                        onChange={e => {
                          handleCommentsChange(e)
                          // setnavPrompt(true);
                          // setMoveTab(true);
                        }} />

                    </Tf1>
                  </Containnn>
                </>
              )}

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
                      // padding: "0px",
                      // paddingRight: "5px",
                      fontWeight: "700",
                      border: "1px solid #3e8cb59e",
                      maxHeight: "0px",
                      minHeight: "48px",
                      paddingRight: "15px",
                      paddingLeft: "20px"
                    }}
                    label="Ratings"
                    icon={
                      <>
                        {/* <TabPanel value={value} index={1}>  */}
                        {value == 1 && (
                          <IconButton
                            sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                          // aria-describedby={id2}
                          //  onClick={handleClickInfo}
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
                      fontWeight: "700",
                      border: "1px solid #3e8cb59e",
                      paddingRight: "20px",
                      paddingLeft: "20px"
                    }}
                    label="Overall Feedback"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
            </Box>
            {/* <Typography
              style={{
                color: "#3e8cb5",
                fontSize: "16px",
                fontFamily: "Arial",
                paddingTop: "10px",
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
                                {/* <option value="Training Title">Rating</option> */}
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
            {/* </Typography> */}
            {value === 0 && (
              <Box>
                <TableContainer>
                  <Table
                    sx={{
                      borderCollapse: 'separate',
                      borderSpacing: '0px 15px'
                    }}
                    size="small" aria-label="simple table"
                  >
                    <TableHead

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
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",

                          }}
                        >

                          Objective<br></br> Title

                        </TableCell>
                        <TableCell
                          style={{
                            background: "#eaeced",
                            textAlign: "center",
                            // borderBottom: "1px solid #fff",
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
                            // borderBottom: "1px solid #fff",
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",
                            padding: "0px 8px",
                          }}
                        >


                          Appraiser<br></br> Rating

                        </TableCell>

                        {/* { employeeData &&
                      objectiveTitleData &&
                      objectiveDescription.map((j: any, index: number) => {
                        
                      employeeData &&
                                    employeeData?.data?.appraisal?.objective_description
                                      .filter(
                                        (i: any) => i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        console.log(k?.rating_rejected,"kkkkk")
                                        if (k?.ratings)
                                          return k.rating_rejected === true;
                                      })[0] && ( */}

                        {/* )})} */}



                        {employeeData?.data?.appraisal?.objective_description.filter((item: any) => item.comments !== "" && item.comments !== undefined)?.length > 0 && (
                          <TableCell style={{
                            background: "#eaeced",
                            textAlign: "center",
                            // borderBottom: "1px solid #fff",
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",

                          }}
                          >

                            Appraiser<br></br> Comments

                          </TableCell>
                        )}

                        {employeeData?.data?.appraisal?.objective_description?.filter
                          ((item: any) => item?.rating_rejected == true && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
                            <TableCell
                              style={{
                                background: "#eaeced",
                                textAlign: "center",
                                // borderBottom: "1px solid #fff",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#3e8cb5",

                              }}
                            >


                              Appraiser<br></br>  Rejection/Change Reason

                            </TableCell>
                          )}
                        {employeeData?.data?.reviewer?.objective_description?.filter
                          ((item: any) => item?.rating_rejected == true).length > 0 && (
                            <TableCell
                              style={{
                                background: "#eaeced",
                                textAlign: "center",
                                // borderBottom: "1px solid #fff",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#3e8cb5",
                                padding: "0px 8px"
                              }}
                            >

                              Reviewer<br></br> Rating

                            </TableCell>
                          )}
                        {employeeData?.data?.reviewer?.objective_description?.filter
                          ((item: any) => item?.rating_rejected == true).length > 0 && (
                            <TableCell
                              style={{
                                background: "#eaeced",
                                textAlign: "center",
                                // borderBottom: "1px solid #fff",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#3e8cb5",

                              }}
                            >


                              Reviewer<br></br> Rejection Reason

                            </TableCell>
                          )}
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      {employeeData &&
                        objectiveTitleData && colorarray &&
                        objectiveDescription.map((j: any, index: number) => {
                          // console.log(ColorArray.find(item => item == j?.objective_type?.name?.name,"newll" ))
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
                                }}>
                                <TableCell
                                  width="240px"
                                  // rowSpan={3}
                                  // style={styles.colors}
                                  style={{
                                    backgroundColor: colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name) != undefined ? colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name)?.color : Colors[0],
                                    textAlign: "left",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    // background:`${Colors[index]}`,
                                    wordBreak: "break-word",
                                    // background:"#BEECF5",

                                  }}

                                >
                                  {j.objective_type.name.name}
                                </TableCell>
                                <TableCell
                                  width="190px"
                                  style={{
                                    textAlign: "left",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    wordBreak: "break-word",
                                    background: "#ffffff",
                                  }}
                                >
                                  <Stack direction="row" alignItems="center" >

                                    <IconButton sx={{padding:"4px"}}
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
                                  {/* <Popover
                                id={"id101"}
                                open={openInfo101}
                                anchorEl={anchorEl01}

                                // onClose={handleCloseInfo}
                                style={{
                                  //backgroundColor: "FEFCF8",
                                  // boxShadow: "none",
                                  maxWidth: "400px",
                                  borderRadius: "5px",
                                  border: "1px solid #3e8cb5",
                                  backgroundColor: "#f8f8ff",
                                }}>

                                <Typography
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "arial",
                                    // padding:"5px"
                                    lineHeight: "20px"
                                  }}>

                                  {openInfo101 &&
                                    activeObjectiveId &&
                                    j._id === activeObjectiveId &&
                                    j?.name?.description}
                                </Typography>


                              </Popover> */}
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
                                  style={{
                                    padding: "0px 8px",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                    textAlign: "center",
                                    background: "#FBFBFB",
                                  }}
                                >
                                  <Stack direction="row" alignItems="center" justifyContent="center">
                                  {(j.level_1_isChecked ||
                                    j.level_2_isChecked ||
                                    j.level_3_isChecked ||
                                    j.level_4_isChecked) && (
                                      <IconButton
                                        style={{ padding: "5px" }}
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
                                      <span>L1</span>
                                      <span>
                                        {/* {j?.name?.level_1?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_2_isChecked && (
                                    <>
                                      <span>L2</span>
                                      <span>
                                        {/* {j?.name?.level_2?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_3_isChecked && (
                                    <>
                                      <span>L3</span>
                                      <span>
                                        {/* {j?.name?.level_3?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_4_isChecked && (
                                    <>
                                      <span>L4</span>
                                      <span>
                                        {/* {j?.name?.level_4?.level_definition} */}
                                      </span>
                                    </>
                                  )}
</Stack>
                                  {/* <Popper
                                id={"id102"}
                                open={openInfo102}
                                anchorEl={anchorEl02}

                                // onClose={handleCloseInfo}
                                style={{
                                  //backgroundColor: "FEFCF8",
                                  // boxShadow: "none",
                                  maxWidth: "400px",
                                  borderRadius: "5px",
                                  border: "1px solid #3e8cb5",

                                  backgroundColor: "#f8f8ff",
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
                                          {" "}
                                          <span>L1 : </span>{" "}
                                          <span>
                                            {
                                              j?.name?.level_1
                                                ?.level_definition
                                            }
                                          </span>
                                          <br />
                                          <ul>
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
                                            {
                                              j?.name?.level_2
                                                ?.level_definition
                                            }
                                          </span>
                                          <br />
                                          <ul>
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
                                            {
                                              j?.name?.level_3
                                                ?.level_definition
                                            }
                                          </span>
                                          <br />
                                          <ul>
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
                                            {
                                              j?.name?.level_4
                                                ?.level_definition
                                            }
                                          </span>
                                          <br />
                                          <ul>
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


                              </Popper> */}
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
                                                    <b>{
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
                                                    <b>{
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
                                                    <b>{
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
                                  style={{
                                    textAlign: "center",
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    padding: "0px 8px",
                                    background: "#ffffff",
                                    // @ts-ignore
                                    //  color:
                                    //  j?.rating_rejected === true && "#FF0000",
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
                                    color: "#333333",
                                  }}
                                >
                                  <div style={{ display: "inline-flex" }}>
                                    <div
                                      style={{
                                        // fontFamily: "Arial",
                                        // fontSize: "14px",
                                        // width: "30px",
                                        // lineHeight: "30px",
                                        // borderRadius: "50%",
                                        // background:"red",
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
                                      {employeeData &&
                                        employeeData?.data?.appraisal?.objective_description
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
                                        <Typography
                                          style={{
                                            fontSize: "14px",
                                            fontFamily: "Arial",
                                            color: '#333333',

                                          }}>
                                          {employeeData &&
                                            employeeData?.data?.appraisal?.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )
                                              .map((k: any, index: any) => {
                                                // if (
                                                //   k?.comments === "" ||
                                                //   k?.comments === undefined
                                                // )
                                                //  {
                                                //   return k?.remarks;
                                                // } 
                                                // else
                                                {
                                                  return k?.comments;
                                                }
                                              })[0]}
                                        </Typography>
                                        {employeeData &&
                                          getAttachments(j?.name?._id)?.length >
                                          0 && (
                                            <AttachFileIcon
                                              style={{
                                                color: "#93DCFA",
                                                height: "18px",
                                                transform: "rotate(30deg)",
                                                cursor: "pointer",
                                              }}
                                              aria-describedby={"id8"}
                                              onClick={(e: any) => {
                                                handleClick8(e, j);
                                                setPopoverIndex(index);
                                              }}
                                            />
                                          )}
                                        <Popover
                                          id={id8}
                                          open={popoverIndex === index && open8}
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
                                              getAttachments(j?.name?._id)?.map(
                                                (k: any, index1: any) => {
                                                  console.log(k, 'kkkkkkkkk')
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
                                                            width: "170px",
                                                          }}
                                                        >
                                                          {k.resp}
                                                        </Typography>
                                                        <Stack direction="row">
                                                        </Stack>
                                                      </Stack>
                                                    </>
                                                  );
                                                }
                                              )}
                                          </div>
                                        </Popover>
                                      </Stack>
                                    </TableCell>
                                  )}


                                {employeeData?.data?.appraisal?.objective_description?.filter
                                  ((item: any) => item?.rating_rejected == true && (item.rejection_reason !== "" && item.rejection_reason !== undefined)).length > 0 && (
                                    <TableCell
                                      width="250px"
                                      style={{
                                        textAlign: "left",
                                        lineHeight: "20px",
                                        background: "#fbfbfb",
                                      }}
                                    >
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                      // width="200px"
                                      >
                                        <Typography
                                          style={{
                                            fontFamily: "Arial",
                                            fontSize: "14px",
                                            color: "#333333",

                                            // width:"200px",
                                            wordBreak: "break-word"
                                          }}
                                        >
                                          {/*Exceeding*/}
                                          {employeeData &&
                                            employeeData?.data?.appraisal?.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )
                                              .map((k: any, index: any) => {
                                                console.log(k, "kkk")
                                                if (k?.rating_rejected == true)
                                                  return k?.rejection_reason
                                              })[0]}
                                          {/* {employeeData &&
                                    employeeData.data.appraisal.objective_description
                                      .filter(
                                        (i: any) => i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings)
                                          return k?.comments;
                                      })[0]} */}
                                        </Typography>

                                        {employeeData &&
                                          getAppraiserRejectionAttachments(j?.name?._id)?.length > 0 &&
                                          (employeeData?.data?.appraisal?.objective_description
                                            .filter(
                                              (i: any) =>
                                                i?.name?._id === j?.name?._id
                                            )
                                            .map((k: any, index: any) => {
                                              console.log(k, "kkk")
                                              if (k?.rating_rejected == true)
                                                return k?.rejection_reason
                                            })[0]) &&
                                          (
                                            <AttachFileIcon
                                              style={{
                                                color: "#93DCFA",
                                                height: "18px",
                                                transform: "rotate(30deg)",
                                                cursor: "pointer",
                                              }}
                                              aria-describedby={"id8"}
                                              onClick={(e: any) => {
                                                handleClick10(e, j);
                                                setPopoverIndex(index);
                                              }}
                                            />
                                          )}
                                        <Popover
                                          id={id10}
                                          open={popoverIndex === index && open10}
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
                                              getAppraiserRejectionAttachments(j?.name?._id)?.map(
                                                (k: any, index1: any) => {
                                                  console.log(k, 'kkkkkkkkkkkkkkkkkk')
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
                                                            width: "170px",
                                                          }}
                                                        >
                                                          {k.resp}
                                                        </Typography>
                                                        <Stack direction="row">
                                                        </Stack>
                                                      </Stack>
                                                    </>
                                                  );
                                                }
                                              )}
                                          </div>
                                        </Popover>


                                        {/* Old code of attachment */}
                                        {/* <AttachFileIcon
                                  style={{ color: "#93DCFA" ,height:"18px"}}
                                  aria-describedby={"id"}
                                  onClick={(e: any) => handleClickOpen7(e,j)}
                                /> */}

                                        {/* <Popover
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
                                    Attachments: {appraisalAttachments} */}


                                      </Stack>
                                    </TableCell>
                                  )}
                                {employeeData?.data?.reviewer?.objective_description?.filter
                                  ((item: any) => item?.rating_rejected == true).length > 0 && (
                                    <TableCell
                                      width="10px"
                                      style={{
                                        //paddingLeft: "20px",
                                        fontFamily: "Arial",
                                        fontSize: "14px",
                                        color: "#333333",
                                        textAlign: "center",
                                        padding: "0px 8px",
                                        lineHeight: "20px",
                                        background: "#ffffff",
                                      }}
                                    >
                                      <div style={{ display: "inline-flex" }}>
                                        <div
                                          style={{
                                            // fontSize: "14px",
                                            // fontFamily: "Arial",
                                            // width: "30px",
                                            // lineHeight: "30px",
                                            // borderRadius: "50%",
                                            // background: "red",
                                            // @ts-ignore
                                            // color:
                                            //  old style
                                            // j?.rating_rejected === true && "#FF0000",
                                            //New style
                                            // j?.rating_rejected === true && "#ffffff",
                                            // display: j?.rating_rejected === true ? 'Block' : 'none'
                                          }}
                                        >
                                          {" "}
                                          {/* {j.rating_rejected === true
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
                                      })[0]} */}
                                          {
                                            (j.rating_rejected == true) ?
                                              <RatingBackground style={{ color: "white", background: "#D2122E" }}>{j?.ratings?.rating}</RatingBackground>
                                              :
                                              ""

                                          }
                                        </div>
                                      </div>
                                    </TableCell>
                                  )}
                                {employeeData?.data?.reviewer?.objective_description?.filter
                                  ((item: any) => item?.rating_rejected == true).length > 0 && (
                                    <TableCell
                                      width="250px"
                                      style={{
                                        textAlign: "left",
                                        lineHeight: "20px",
                                        background: "#fbfbfb",
                                      }}
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
                                            color: "#333333",

                                            // width:"200px",
                                            wordBreak: "break-word"
                                          }}
                                        >
                                          {/*Exceeding*/}
                                          {j?.rating_rejected && j?.rejection_reason}
                                        </Typography>

                                        {/* <Typography
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    textDecoration: "underline",
                                    color: "#93DCFA",
                                    fontWeight: "200",
                                  }}
                                  aria-describedby={"ReviewerComments"}
                                  onClick={(e: any) => {
                                    handleClickReviewerDetails(e, j);
                                  }}
                                >
                                  Details
                                  
                                </Typography> */}

                                        <Popover
                                          id={"ReviewerComments"}
                                          open={openReviewerDetails}
                                          anchorEl={anchorElReviewer}
                                          onClose={handleCloseReviewer}
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
                                            Comments:{ratingComments}
                                            <br />
                                            {/* Attachments: {reviewerAttachments} */}
                                            {/* Attachments: <br/><a href={reviewerAttachmentsurl}> {reviewerAttachments} </a> */}
                                            {/* Att: {employeeData?.data?.reviewer?.attachments
                                      .filter((i: any) => i?.objective_description === j.name._id)
                                      .map((k: any) =>{
                                        return <a href={k.url}> {k.name} </a>
                                      })
                                     } */}
                                          </Typography>
                                        </Popover>
                                        {/* Old code starts attachment */}
                                        {/* <AttachFileIcon
                                  style={{ color: "#93DCFA",height:"18px" }}
                                  aria-describedby={"id"}
                                  onClick={(e: any) => handleClickOpen6(e,j)}
                                /> */}

                                        {/* <Popover
                                  id={"id"}
                                  open={open6}
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
                                    Attachments: {reviewerAttachments} */}
                                        {/* {employeeData?.data?.reviewer?.attachments
                                      // .filter((i: any) => {

                                      //   // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                      //   return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                      // })}
                                      .map((k: any) => {
                                        return <a href={k.url}> {k.name} </a>;
                                      })} */}
                                        {/* 11<a href={reviewerAttachmentsurl}> {reviewerAttachments} </a> */}
                                        {/* {employeeData?.data?.reviewer?.attachments
                                      .filter((i: any) => i?.objective_description === j.name._id)
                                      .map((k: any) =>{
                                        return <a href={k.url}> {k.name} </a>
                                      })
                                     } */}
                                        {/* </Typography>
                                </Popover> */}
                                        <Box>
                                          {employeeData && employeeData &&
                                            employeeData?.data?.reviewer?.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )
                                              .map((k: any) => k?.rating_rejected == true)[0] &&
                                            getAttachmentsReviewer(j?.name?._id)
                                              ?.length > 0 && (
                                              <AttachFileIcon
                                                style={{
                                                  color: "#93DCFA",
                                                  height: "18px",
                                                  transform: "rotate(30deg)",
                                                  cursor: "pointer",
                                                }}
                                                aria-describedby={"id9"}
                                                onClick={(e: any) => {
                                                  handleClick9(e, j);
                                                  setPopoverIndexReviewer(index);
                                                }}
                                              />
                                            )}
                                          {/* <Typography
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
                                        </Box>
                                        <Popover
                                          id={id9}
                                          open={
                                            popoverIndexReviewer === index && open9
                                          }
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
                                          <div
                                            style={{
                                              padding: "10px",
                                              fontSize: "12px",
                                              lineHeight: "20px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                          >
                                            {employeeData &&
                                              getAttachmentsReviewer(
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
                                                          textOverflow: "ellipsis",
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
                                                          onClick={() => {
                                                            deleteReviewerMutation({
                                                              employee_id:
                                                                employee_id,
                                                              objective_description: j.name._id,
                                                              name: k.remove,
                                                            });
                                                            // setFileSelected("")
                                                          }

                                                          }
                                                        />
                                                        {/* </IconButton> */}
                                                      </Stack>
                                                    </Stack>
                                                  </>
                                                );
                                              })}
                                            {/* <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        
                                        // maxWidth:"215px",
                                        // wordBreak:"break-all"
                                      }}
                                    >
                                      1
                                    </Typography> */}
                                            {/* <Typography
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
                                    
                                      
                                      Attachments: {reviewerAttachments} 
                                      
                                    </Typography> */}
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
                                      </Stack>
                                    </TableCell>
                                  )}
                                {/* <td 
                            width="50px"
                            style={{ textAlign: "left" }}>
                              {employeeData &&
                                !employeeData?.data?.appraisal?.appraiser_status?.includes(
                                  "rejected"
                                ) &&
                                employeeData?.data?.appraisal?.appraiser_status}

                              {employeeData &&
                                employeeData?.data?.appraisal?.appraiser_status?.includes(
                                  "rejected"
                                ) && (
                                  <>
                                    <p style={{ color: "#ff5151", fontFamily: "Arial" }}>
                                      Rejected (
                                      {employeeData?.data?.appraisal
                                        .rejection_count == 1
                                        ? "First Time"
                                        : employeeData?.data?.appraisal
                                          .rejection_count == 2
                                          ? "Second Time"
                                          : employeeData?.data?.appraisal
                                            .rejection_count == 3
                                            ? "Third Time"
                                            : ""}
                                      )
                                    </p>
                                  </>
                                )} */}

                                {/* <span>Dummy Text */}
                                {/* </span>
                            </td> */}

                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>

                  <AlertYesNo
                    isAlertOpen={acceptRatingAlert}
                    handleAlertYes={handleAcceptRatingAlertYes}
                    handleAlertClose={handleAcceptRatingAlertNo}>
                    {message}
                  </AlertYesNo>

                </TableContainer>
                {/* <Footer> */}
                <Footerbuttons
                  navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  moveTab={moveTab}
                  setMoveTab={setMoveTab}
                  value={value}
                  setValue={setValue}
                  objectiveDescription={objectiveDescription}
                  fetchCancel={fetchCancel}
                  employeeDataIsFetching={employeeDataIsFetching}
                />
                {/* </Footer> */}
              </Box>
            )}

          </Box>
        </Box>
      </div>
    </React.Fragment>
  );
}
