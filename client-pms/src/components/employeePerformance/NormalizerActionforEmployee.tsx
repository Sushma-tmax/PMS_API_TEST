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
  Tab,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
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
  useNormalizerRejectionMutation,
  useAttachmentsNormalizerDeleteMutation,
  useAttachmentsEmployeeDeleteMutation,
  useNormalizerSubmitEmployeeRejectionMutation,
  useAttachmentsNormalizerMutation,
} from "../../service";
import Removeattnew from "../../assets/Images/icons/Removeattnew.svg";
import Uploadatt from "../../assets/Images/Uploadatt.svg"
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import html2canvas from "html2canvas";

import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";
import { useCreateAzureBlobMutation } from "../../service/azureblob";
import dayjs from "dayjs";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Dialog from "@mui/material/Dialog";
import FormLabel from "@mui/material/FormLabel";
import Infoicon from "./icons/Infoicon.svg";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Downloadss from "../../assets/Images/Downloadss.svg";
import Close from "../../assets/Images/Close.svg";
import Newtickicon from "../../assets/Images/Newtickicon.svg";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import { Scrollbar } from "react-scrollbars-custom";
import Thumsup from "../../assets/Images/icons/Thumsup.svg";
import Thumsdown from "../../assets/Images/icons/Thumsdown.svg";
import AlertDialogSuccess from "../UI/DialogSuccess";
import FeedbackQuestionnaireAppraiser from "./FeedbackQuestionnaireAppraiser";
import thumbsdown_colored from "../../assets/Images/icons/Thumbsdowncolored.svg";
import thumsup_colored from "../reviewer/appraisal_reviewer/icons/thumsup_colored.svg";
import AlertYesNo from "../UI/DialogYesNo";

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

export default function NormalizerActionforEmployee() {
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

  const handleClose5 = () => {
    setAnchorEl5(null);
    // setOpen2(false);
  };

  const { employee_id } = useParams();
  const { data: employeeData, isLoading } =
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
  const [overAllRating, setOverAllRating] = useState<any>(0);
  const [disableAccept, setDisableAccept] = useState(false);
  const [rejectedTitle, setRejectedTitle] = useState("");
  const [openValidation, setOpenValidation] = useState(false);
  const [updateMutation] = useNormalizerRejectionMutation();

  const [normalizerSubmit] = useNormalizerSubmitEmployeeRejectionMutation();
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [popoverIndex1, setPopoverIndex1] = useState<any>("");
  const [normalizerUpdateRating] = useUpdateEmployeeAppraisalMutation();

  const [name, setName] = useState<string>("");
  const [meetingNoteFileName, setMeetingNoteFileName] = useState<string>("");
  const [meetingNotefileSelected, setMeetingNoteFileSelected] = useState<any>("");
  const [fileSelected, setFileSelected] = useState<any>("");

  const [sendItem] = useCreateAzureBlobMutation();
  const [sendMeetingNotesItem] = useCreateAzureBlobMutation();

  const [attachmentsNormalizer] = useAttachmentsNormalizerMutation();
  const [meetingAttachment] = useAttachmentsNormalizerMutation();

  const inputRef = useRef<any>(null);

  const groupNAmeHandler = (name: any) => {
    if (name) {
      setFilterData(name);
    }
  };
  useEffect(() => {
    if (employeeData && employeeData.data) {
      const appraiserAreaOfImprovement =
        employeeData.data.appraisal.area_of_improvement;
      const group = _.groupBy(appraiserAreaOfImprovement, "value");
      const groupName = groupNAmeHandler(Object.entries(group));
      setNormalizerComments(employeeData?.data?.normalizer?.normalizer_overall_feedback);
      setMeetingNotes(employeeData?.data?.normalizer?.normalizer_meeting_notes);
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
  };
  const openDrawerHandler = (objective: any) => {
    setAccept("Accept");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setRejectedTitle(objective?.name?.objectiveTitle);
    setComments(objective.rating_comments);
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
    setComments(objective.rating_comments);
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
    setRatingAppraiser(reviewerRatingValue);
    setShowWithdraw(objective.rating_rejected);
  };

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
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setObjectiveDescription(() => {
        return employeeData.data.normalizer.objective_description.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i.name.objective_title),
              objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
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
      rating_comments: "",
      comments: "",
      employee_id: employee_id,
    });
    setRatingAppraiser("");
  };
  const ratingWithdrawHandler = () => {
    closeDrawer();
    let temp = employeeData.data.employee.objective_description
      .filter((i: any) => i.name._id === activeObjectiveDescriptionName)
      .map((k: any) => k.ratings._id)[0];
    // setnavPrompt(true);
    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      action_performed: false,
      rating_comments: "",
      comments: "",
      employee_id: employee_id,
    });
    setRatingAppraiser("");
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
    if (ratingAppraiser === ratingValue) {
      setrejectAlertMessage(
        "You cannot put the same rating as the Employee. Please change the Rating."
      );

      setrejectAlert(true);
      // setnavPrompt(true);
    } else if (comments == "" || comments == undefined) {
      setrejectAlertMessage("Please add the comments for Rejection.");
      setrejectAlert(true);
    } else {
      closeDrawer();
      updateMutation({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        rating_comments: comments,
        rating_rejected: true,
        action_performed: true,
        employee_id: employee_id,
      });
      setRating("");
      if (name && fileSelected) {
        return imageClick();
      }
      setRatingAppraiser("");
    }
  };

  useEffect(() => {
    if (objectiveDescription.length > 0) {
      const objectiveDescriptionMapped = objectiveDescription.map((i: any) => {
        // if (i.ratings) {
        // console.log(i.objective_type, 'objective_type')
        console.log(objectiveDescription, "objectiveDescription");
        console.log(i, "value");
        const sum = (i.value * i.objective_type.value) / 10000;
        const newSum = sum * i?.ratings?.rating;
        console.log(i.value, "newSum");
        return newSum;
        // }
      });
      console.log(
        _.sum(objectiveDescriptionMapped),
        "objectiveDescriptionMapped"
      );
      setOverAllRating(() => {
        return _.sum(objectiveDescriptionMapped).toFixed(2);
      });
    }
  }, [objectiveDescription]);

  useEffect(() => {
    if (overAllRating) {
      normalizerUpdateRating({
        "normalizer.normalizer_rating": overAllRating,
        id: employee_id,
      });
    }
  }, [overAllRating]);


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
        meetingNotesAttachments: {
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

  const resetMeetingNoteFileInput = () => {
    setMeetingNoteFileSelected("");
    setMeetingNoteFileName("");

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
    if (meetingNotefileSelected !== "" && meetingNoteFileName !== "") {
      setMeetingAttachmentHide(true);
    } else {
      setMeetingAttachmentHide(false);
    }
  }, [meetingNoteFileName, meetingNotefileSelected]);


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

  const handleClose7 = () => {
    setAnchorEl7(null);
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

    let normalizerObjDesc = employeeData?.data?.appraisal?.objective_description?.map(
      (i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      }
    );
    normalizerSubmit({
      normalizer_overall_feedback: normalizerComments,
      normalizer_meeting_notes: meetingNotes,
      id: employee_id,
    });
    normalizerUpdateRating({
      "normalizer.objective_description": normalizerObjDesc,
      "normalizer.normalizer_overall_feedback": normalizerComments,
      "normalizer.normalizer_meeting_notes": meetingNotes,
      id: employee_id,
    });
    setMessage("The performance appraisal has been succesfully submitted.")
    setNavigateDashboard(true);
    setOpenSubmit(true);

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
    if (ratingAppraiser === j.rating) {
      setrejectAlertMessage(
        "You cannot put the same rating as the Reviewer. Please change the Rating."
      );
      setrejectAlert(true);
    } else {
      if (j) setRating(j._id);
      // setratingSelection(true);
    }
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
  // rating hower
  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
      // opacity: open ? "1" : "0",
    },
  };

  const submitHandler = () => {

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

    if (normalizerComments === "" || normalizerComments === undefined) {
      setOpenValidation(true);
      setMessage("Please add Normalizer comments in the recommendation.")
    } else if (meetingNotes === "" || meetingNotes === undefined) {
      setOpenValidation(true);
      setMessage("Please add Normalizer meeting notes in the recommendation.")
    } else {
      setOpenYes(true);
    }
  };

  const handleValidationClose = () => {
    setOpenValidation(false);
    setMessage("")
  }

  const saveRatingHandler = () => {

    if (normalizerComments == "" || normalizerComments == null || normalizerComments == undefined) {
      setOpenSubmit(true);
      setMessage("Please add the Normalizer Comments on the Recommendation page.")
    } else {
      normalizerUpdateRating({
        "normalizer.normalizer_overall_feedback": normalizerComments,
        "normalizer.normalizer_meeting_notes": meetingNotes,
        id: employee_id,
      });
      setOpenSubmit(true);
      setNavigateDashboard(false);
      setMoveTab(false);
      setMessage("Changes have been saved.")
    }
  };
  const saveRecommendationsHandler = () => {

    if (normalizerComments == "" || normalizerComments == null || normalizerComments == undefined) {
      setOpenSaved(true);
      setMessage("Please add the Normalizer Comments on the Recommendation page.")
    } else if (meetingNotes == "" || meetingNotes == null || meetingNotes == undefined) {
      setOpenSaved(true);
      setMessage("Please add the Normalizer meeting notes on the Recommendation page.")
    } else {
      normalizerUpdateRating({
        "normalizer.normalizer_overall_feedback": normalizerComments,
        "normalizer.normalizer_meeting_notes": meetingNotes,
        id: employee_id,
      });         
      setOpenSaved(true);
      setMoveTab(false);

      setMessage("Changes have been saved.")

    
      if (meetingNoteFileName && meetingNotefileSelected) {
        return  meetingNotesImageClick();;
      }

    }
  };

  const getPAStatus = (status: any) => {
    if (status == "in-progress") {
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

    return employeeData?.data?.employee?.attachments
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
      setMessage("Please save the recommendations before leaving the page.")
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
  console.log(employeeData?.data?.employee?.training_recommendation, "trainingrecommendation")
  console.log(specificAction1, "specificAction1")
  console.log(specificAction2, "specificAction2")
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
          Normalizer Action
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



        {accept === "Accept" && (
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
        )}

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
                Normalizer Rating
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
                                setDisplayEmployeeRating(false);
                                setRating(ratings._id);
                                setRatingValue(ratings.rating)

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
                            {ratingAppraiser}
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
                            </span>
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
              Comments
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
              inputProps={{ maxLength: 500 }}
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
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
                      onClick={(e: any) => {
                        // setActiveObjectiveDescriptionName(j?.name?._id)
                        handleClickOpenAttachment(e);
                        // setPopoverIndex(index)
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
                      resetFileInput();
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
          marginLeft="32px"
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
              Normalizer Dashboard
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
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="text.primary"
              to={""}
              aria-current="page"
            >
              {employeeData && employeeData?.data?.calendar?.name}
            </Link>
          </Breadcrumbs>
        </Stack>
        <Container
          sx={{
            maxWidth: "95% !important",
            // height: "1425px",
            background: "#fff",
            //marginTop: "35px",
            minHeight: "100px",
            overflow: "hidden",
          }}
        >
          <Box
            style={{
              padding: "35px",
            }}
          >
            <Stack
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
                Welcome to Performance Appraisal!
              </Typography>
              <div>
                <Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    fontFamily: "Arial",
                    paddingRight: "10px",
                  }}
                >
                  PA Status:{""}
                  <span
                    style={{
                      color: "#717171",
                      fontSize: "16px",
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
            <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "20px" }}>
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
                      <Avatar sx={{ width: 60, height: 60 }}>A</Avatar>
                    </Typography>
                    <Stack direction="column" spacing={1}>
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
                        {employeeData?.data?.position_long_description}{" "}
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
                    alignItems="flex-end"
                    gap="8px"
                    paddingRight="10px"
                  >
                    <Typography
                      style={{
                        fontSize: "17px",
                        color: "#3e8cb5",
                        fontFamily: "Arial",
                      }}
                    >
                      Overall Rating
                    </Typography>
                    <div
                      style={{
                        // paddingLeft: "22px",
                        fontSize: "16px",
                        color: "#333333",
                        paddingTop: "1px",
                      }}
                    >
                      <b>{employeeData?.data?.normalizer?.normalizer_rating}</b>
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
                    <Stack direction="column" alignItems="flex-end">
                      <span
                        style={{
                          fontSize: "17px",
                          color: "#3E8CB5",
                          fontFamily: "Arial",
                        }}
                      >
                        {/* Potential Level */}
                      </span>
                      <Typography
                        style={{
                          color: "#717171",
                          marginTop: "8px",
                          fontSize: "16px",
                          fontFamily: "Arial",
                        }}
                      >
                        {/* {employeeData?.data?.appraisal?.potential} */}
                      </Typography>
                    </Stack>
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
                      <IconButton
                        sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                        aria-describedby={id2}
                        onClick={handleClickInfo}
                      >
                        <img
                          style={{ width: "12px" }}
                          src={Infoicon}
                          alt="icon"
                        />
                      </IconButton>
                    }
                    iconPosition="end"
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
                    label="Recommendations"
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
                    </Scrollbar>
                  </Scroll>
                </TableContainer>
              </Popover>
            </Typography>
            <TabPanel value={value} index={0}>
              <TableContainer sx={{ width: "100%", paddingTop: "10px" }}>
                <Table
                  size="small"
                  aria-label="simple table"
                  sx={{ border: "1px solid #F7F9FB" }}
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        "& td, & th": {
                          border: "1px solid #e0e0e0",
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
                        Employee<br></br> Ratings
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
                        Employee <br></br>Comments
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
                        Re-normalized<br></br> Ratings
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
                        Normalizer <br></br>Comments
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
                        Normalizer <br></br>Actions
                      </TableCell>
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
                                  border: "1px solid #e0e0e0",
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
                                }}
                                align="left"
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
                              </TableCell>
                              <TableCell
                                width="10px"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  wordBreak: "break-word",
                                  textAlign: "center",
                                  // fontFamily: "regular"
                                }}
                                align="left"
                              >
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
                                {(j.level_1_isChecked ||
                                  j.level_2_isChecked ||
                                  j.level_3_isChecked ||
                                  j.level_4_isChecked) && (
                                    <IconButton
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
                                                {" "}
                                                <span>L1 : </span>{" "}
                                                <span>
                                                  <b> {
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
                                                {" "}
                                                <span>L2 : </span>{" "}
                                                <span>
                                                  <b>  {
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
                                                {" "}
                                                <span>L3 : </span>{" "}
                                                <span>
                                                  <b> {
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
                                                {" "}
                                                <span>L4 : </span>{" "}
                                                <span>
                                                  <b> {
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
                                }}
                                align="center"
                              >
                                <Stack
                                  direction="row"
                                  justifyContent="space-around"
                                  alignItems="center"
                                  spacing={2}
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
                                                return k?.rating_rejected;
                                            })[0]
                                          ? "red"
                                          : "#333333",
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
                                          if (k?.ratings)
                                            return k?.ratings?.rating;
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
                                </Stack>
                              </TableCell>
                              <TableCell
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

                                                      <img
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
                                                      />
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
                              </TableCell>
                              <TableCell
                                width="10px"
                                sx={{
                                  fontSize: "14x",
                                  color: "#333333",
                                  opacity: "80%",
                                  fontFamily: "Arial",
                                }}
                                align="left"
                              >
                                <Stack
                                  direction="column"
                                  display="flex"
                                  alignItems="center"
                                >
                                  {" "}
                                  <Stack
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <span
                                      style={{
                                        fontSize: "14x",
                                        // @ts-ignore
                                        color:
                                          employeeData &&
                                            employeeData?.data?.normalizer?.objective_description
                                              ?.filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )
                                              ?.map((k: any) => {
                                                if (k?.rating_rejected)
                                                  return k?.rating_rejected;
                                              })[0]
                                            ? "red"
                                            : "#333333",
                                      }}
                                    >
                                      {" "}
                                      {/* {j.ratings && j.ratings.rating} */}
                                      {/* {j.rating_rejected === true
                                    ? j.ratings && j.ratings.rating
                                    : employeeData &&
                                    employeeData?.data?.normalizer?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings)
                                          return k?.ratings?.rating;
                                      })[0]} */}
                                      {j.ratings == null || j.ratings == undefined ? employeeData &&
                                        employeeData?.data?.employee?.objective_description
                                          .filter(
                                            (i: any) => i.name._id === j.name._id
                                          )
                                          .map((k: any) => {
                                            if (k.ratings)
                                              return k.ratings.rating;
                                          })[0] : j.ratings && j.ratings.rating}
                                    </span>

                                    {/* </Dialog> */}
                                    {/* <span */}
                                    {/* style={{
            fontSize: "12px",
          }}
        >
          {j.ratings && j.ratings.rating_scale}{" "}
        </span>  */}
                                  </Stack>
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
                              <TableCell
                                width="250px"
                                sx={{
                                  fontSize: "14px",
                                  color: "#33333",
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
                                      wordBreak: "break-word"

                                    }}> {j?.rating_comments} </Typography>
                                  {/* {j?.rating_comments && ( */}
                                  {employeeData &&
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
                                                      />
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

                              <TableCell width="50px" align="center">
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

                                  {employeeData &&
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
                                    )}
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
                <Button
                  // disabled={disableAccept}
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
                  onClick={() => saveRatingHandler()}
                >
                  Save as Draft
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
                    // width: "70px",
                  }}
                  variant="outlined"
                  onClick={() => {
                    submitHandler();
                  }}
                >
                  Save and Submit
                </Button>
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
                      // submitHandler();
                    }}
                  >
                    Cancel
                  </Button>
                </Link>

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
              <AlertDialogSuccess
                isAlertOpen={openValidation}
                handleAlertClose={handleValidationClose}>
                {message}
              </AlertDialogSuccess>

              <Dialog
                fullScreen={fullScreen}
                open={openSubmit}
                onClose={handleCloseSubmit}
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
              <Dialog
                open={openYes}
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


            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography
                style={{
                  fontSize: "20px",
                  color: "#3E8CB5",
                  fontFamily: "Arial",
                  paddingTop: "20px",
                }}
              >
                Performance Appraisal Summary
              </Typography>

              <FeedbackQuestionnaireAppraiser />

              <Typography
                style={{
                  paddingTop: "20px",
                  color: "#717171",
                  fontSize: "16px",
                  fontFamily: "Arial",
                }}
              >
                <b>Areas of Improvement (Appraiser)</b>
              </Typography>
              <Table size="small" style={{ marginTop: "10px" }}>
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
                                            <p>
                                              {k.value}
                                              <br />
                                            </p>
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
              {specificAction1 && (
                <>
                  <Typography
                    style={{
                      paddingTop: "20px",
                      color: "#717171",
                      fontSize: "16px",
                      fontFamily: "Arial",
                    }}
                  >
                    <b>Areas of Improvement (Employee)</b>
                  </Typography>

                  <Table size="small" style={{ marginTop: "10px" }}>
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
                                                <p>
                                                  {k.value}
                                                  <br />
                                                </p>
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
                </>
              )}
              <Typography
                style={{
                  paddingTop: "20px",
                  color: "#717171",
                  fontSize: "16px",
                  fontFamily: "Arial",
                }}
              >
                <b> Training Recommendations (Appraiser)</b>
              </Typography>
              <Table size="small" style={{ marginTop: "10px" }}>
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
                          >
                            {" "}
                            {item.name.title}
                            <IconButton

                        // aria-describedby={id2}
                        onClick={handleClickInfo6}
                        // style={{marginRight:"5px"}}
                      >
                        <img width="12px"  src={Infoicon} alt="icon" />
                      </IconButton>
                      <Popover
              id={id6}
              open={openInfo6}
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
              {specificAction2 && (
                <>
                  <Typography
                    style={{
                      paddingTop: "20px",
                      color: "#717171",
                      fontSize: "16px",
                      fontFamily: "Arial",
                    }}
                  >
                    <b> Training Recommendations (Employee)</b>
                  </Typography>
                  <Table size="small" style={{ marginTop: "10px" }}>
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
                        Training1?.map((j: any) => {
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
                                >
                                  {j?.name?.name?.title}
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
                </>
              )}

              <Typography
                style={{
                  fontSize: "16px",
                  color: "#717171",
                  paddingTop: "20px",
                  fontFamily: "Arial"
                }}
              >
                {" "}
                <b>Appraiser Overall Feedback</b>
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "arial",
                  color: "#333333",
                  paddingTop: "10px",
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
              <Typography
                style={{
                  fontSize: "16px",
                  color: "#717171",
                  paddingTop: "20px",
                  paddingBottom: "10px",
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

              <Typography
                style={{
                  fontSize: "16px",
                  color: "#717171",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                  fontFamily: "Arial"
                }}
              >
                <b> Normalizer Overall Feedback</b>
              </Typography>
              <Tf3>
                <TextField
                  fullWidth
                  multiline
                  size="small"
                  placeholder="Add"
                  value={normalizerComments}
                  inputProps={{ maxLength: 500 }}
                  error={!normalizerComments && textfieldError}
                  helperText={
                    !normalizerComments && textfieldError
                      ? "*Normalizer comments are required."
                      : " "
                  }
                  onChange={(e) => {
                    setNormalizerComments(e.target.value);
                    setMoveTab(true);
                  }}
                // variant="standard"
                // InputProps={{
                //   disableUnderline: true, // <== added this
                // }}
                />
              </Tf3>
              <Typography
                style={{
                  fontSize: "16px",
                  color: "#717171",
                  paddingTop: "20px",
                  paddingBottom: "10px",
                  fontFamily: "Arial"
                }}
              >
                <b>Normalizer meeting notes</b>
              </Typography>
              <Tf3>
                <TextField
                  fullWidth
                  multiline
                  size="small"
                  placeholder="Add"
                  value={meetingNotes}
                  inputProps={{ maxLength: 500 }}
                  error={!meetingNotes && textfieldError}
                  helperText={
                    !meetingNotes && textfieldError
                      ? "*Normalizer meeting notes are required."
                      : " "
                  }
                  onChange={(e) => {
                    setMeetingNotes(e.target.value);
                    setMoveTab(true);
                  }}
                // variant="standard"
                // InputProps={{
                //   disableUnderline: true, // <== added this
                // }}
                />
              </Tf3>

              <div
                style={{
                  textAlign: "left",
                  paddingLeft: "29px",
                  fontSize: "12px",
                  paddingBottom: "10px",
                  paddingTop: "16px",
                  color: "#7A7A7A",
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
                        }}
                      />
                    </span>
                    <IconButton>
                      <img
                        src={Uploadatt}
                        onClick={(e: any) => {
                          handleClickMeetingNoteOpenAttachment(e);
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
                      {meetingNoteFileName}
                    </Typography>
                    <Text>
                      { meetingAttachmentHide && (
                        <IconButton
                          onClick={() => {
                            // setFileSelected('')
                            // setName('')
                            resetMeetingNoteFileInput();
                          }}
                        >
                          <img src={Removeattnew} alt="icon" />
                        </IconButton>
                      )}
                    </Text>
                  </Stack>
                </div>
              </Stack>

              <Dialog
                fullScreen={fullScreen}
                open={openSaved}
                onClose={handleCloseSaved}
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
                <Button
                  // disabled={disableAccept}
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
                  onClick={() => saveRecommendationsHandler()}
                >
                  Save as Draft
                </Button>
                {/* <Link to={"/dashboardreview"}> */}
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
                  onClick={() => backHandler()}
                >
                  Back
                </Button>
                {/* </Link> */}
              </Stack>


            </TabPanel>
          </Box>
        </Container>
      </div>
    </>
  );
}
