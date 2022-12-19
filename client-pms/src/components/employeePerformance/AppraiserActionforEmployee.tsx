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
  useAttachmentsAppraiserMutation,
  useAttachmentsEmployeeDeleteMutation,
  // useAttachmentsAppraiserDeleteMutation
} from "../../service";
import Removeattnew from "../../assets/Images/icons/Removeattnew.svg";
import Removeatt from "./icons/Removeatt.svg"
import Uploadatt from "../../assets/Images/Uploadatt.svg";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useCreateAzureBlobMutation } from "../../service/azureblob";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Dialog from "@mui/material/Dialog";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
// import FormLabel from '@mui/material/FormLabel';;
import Infoicon from "./icons/Infoicon.svg";
import { EMPLOYEE_DOWNLOAD } from "../../constants/routes/Routing";
import Downloadss from "../../assets/Images/Downloadss.svg";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Close from "../../assets/Images/Close.svg";
import Newtickicon from "../../assets/Images/Newtickicon.svg";
import { useAttachmentsAppraiserDeleteMutation } from "../../service";
import { Scrollbar } from "react-scrollbars-custom";
import Thumsup from "../../assets/Images/icons/Thumsup.svg";
import Thumsdown from "../../assets/Images/icons/Thumsdown.svg";
import thumbsdown_colored from "../../assets/Images/icons/Thumbsdowncolored.svg";
// import thumsup_colored from "../reviewer/appraisal_reviewer/icons/thumbsup_colored.svg";
import thumsup_colored from "../reviewer/appraisal_reviewer/icons/thumsup_colored.svg";

import AlertDialogSuccess from "../UI/DialogSuccess";
import FeedbackQuestionnaireAppraiser from "./FeedbackQuestionnaireAppraiser";
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
  // marginLeft: "26px",
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
    textAlign:"left"
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

export default function AppraiserActionforEmployee() {
  const [anchorEl5, setAnchorEl5] = React.useState<HTMLButtonElement | null>(
    null
  );
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

  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [employeeAttachments, setemployeeAttachments] = useState<any>("");
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
  const { data: employeeData, isLoading } =
    useGetEmployeeAppraisalQuery(employee_id);
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
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = useState("");
  const [appraiserComments, setAppraiserComments] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [overAllRating, setOverAllRating] = useState<any>(0);
  const [updateMutation] = useCreateEmployeeAppraisalMutation();
  const [disableAccept, setDisableAccept] = useState(false);
  const [openValidation, setOpenValidation] = useState(false);
  let navigate = useNavigate();
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [popoverIndex1, setPopoverIndex1] = useState<any>("");
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [appraiserAcceptsEmployee] = useAppraiserAcceptsEmployeeMutation();
  const [appraiserRejectsEmployee] = useAppraiserRejectsEmployeeMutation();
  const [appraiserUpdateRating] = useUpdateEmployeeAppraisalMutation();
  const [rejectedTitle, setRejectedTitle] = useState("");
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [name, setName] = useState<string>("");

  const [fileSelected, setFileSelected] = useState<any>("");
  const [sendItem, { data }] = useCreateAzureBlobMutation();

  const [attachmentsAppraiser] = useAttachmentsAppraiserMutation();

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
      setAppraiserComments(employeeData?.data?.appraisal?.comments);
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
    setratingparams("");
    setRatingAppraiser("");
  };
  const openDrawerHandler = (objective: any) => {
    console.log("working");
    console.log(objective, "objectiveeeeee");
    setAccept("Accept");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setRejectedTitle(objective?.name?.objectiveTitle);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
    // let reviewerRatingValue = employeeData.data.employee.objective_description
    //   .filter((i: any) => i.name._id === objective.name._id)
    //   .map((k: any) => {
    //     if (k.ratings) return k.ratings.rating;
    //   })[0];
    // setRatingAppraiser(reviewerRatingValue);

    let reviewerRatingValue = employeeData.data.employee.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    setRatingAppraiser(reviewerRatingValue);
  };
  console.log(ratingAppraiser, "ratingAppraiser");
  // console.log(reviewerRatingValue1,"234")
  const [showWithdraw, setShowWithdraw] = useState(false);

  const openDrawerHandlerreject = (objective: any) => {
    console.log(objective, 'objectiveeeee')
    setAccept("Reject");
    setName("");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setRejectedTitle(objective?.name?.objectiveTitle);
    setComments(objective.comments);
    setRating(objective.ratings._id);
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
      return employeeData.data.appraisal.objective_type.find(
        (item: any) => item.name._id === id
      );
    }
  };
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


  const acceptHandler = () => {
    let temp = employeeData.data.employee.objective_description
      .filter((i: any) => i._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];
    // setnavPrompt(true);
    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      action_performed : true,
      comments: comments,
      id: employee_id,
    });
    setRatingAppraiser("");
    closeDrawer();
  };
  const ratingWithdrawHandler = () => {
    let temp = employeeData.data.employee.objective_description
      .filter((i: any) => i.name._id === activeObjectiveDescriptionName)
      .map((k: any) => k.ratings._id)[0];
    // setnavPrompt(true);
    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      action_performed : false,
      rating_comments: "",
      comments: "",
      id: employee_id,
    });
    setRatingAppraiser("");
    setName("");
    closeDrawer();
  }
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState("");

  const ratingSubmitHandler = () => {
    if (ratingAppraiser === ratingparams) {
      setrejectAlertMessage(
        "You cannot put the same rating as the Employee. Please change the Rating."
      );
      setrejectAlert(true);
      // setnavPrompt(true);
    } else if (comments == "" || comments == undefined) {
      setrejectAlertMessage("Please add the comments for Rejection.");
      setrejectAlert(true);
    }
    else {
      //setrejectAlert(true);
      closeDrawer();
      updateMutation({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        comments: comments,
        rating_rejected: true,
        action_performed : true,
        Reason_for_rating_rejected: acceptReason,
        id: employee_id,
      });
      setRating("");
      if (name && fileSelected) {
        return imageClick();
      }
      setRatingAppraiser("");
    }
  };

  console.log(objectiveDescription, "objectiveDescription");

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
      appraiserUpdateRating({
        "appraisal.appraiser_rating": overAllRating,
        id: employee_id,
      });
    }
  }, [overAllRating]);

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

  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
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
  console.log(ratingReviewer, "test");

  //slider validation

  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");

  // useEffect(() => {
  //   setratingparams(ratingAppraiser);
  // }, [ratingAppraiser]);

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
  };

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    if (ratingAppraiser === j.rating) {
      setrejectAlertMessage(
        "You cannot put the same rating as the Employee. Please change the Rating."
      );
      setrejectAlert(true);
    } else {
      if (j) setRating(j._id);
      // setratingSelection(true);
    }
  };
  console.log(ratingparams, "ratingparams");
  console.log(ratingAppraiser, "ratingAppraiser");
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

  const rejectHandler = () => {
    // if (appraiserComments == "" || appraiserComments == undefined) {
    //   setOpenValidation(true);
    //   setMessage("Please add Appraiser comments in the recommendation.")
    // } else {
    if (disableAccept === false) {
      appraiserAcceptsEmployee({
        // employee_id
        comments: appraiserComments,
        id: employee_id,
      });
      // appraiserUpdateRating({
      //   "appraisal.comments": appraiserComments,
      //   id: employee_id,
      // });
      setMessage("The performance appraisal has been succesfully submitted.")
      setNavigateDashboard(true);
      setOpenSubmit(true);
      // navigate(`/dashboardreview`);
    }
    // }

  };

  const handleValidationClose = () => {
    setOpenValidation(false);
    setMessage("")
  }

  const rejectEmployeeHandler = () => {
    let appraiserObjDesc =  employeeData?.data?.appraisal?.objective_description?.map(
      (i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      }
    );
    if (otherComments1 == "" || otherComments1 == null || otherComments1 == undefined) {
      setMessage("Please add the Appraiser Comments on the Recommendation page.")
      setOpenSubmit(true);
    } else {
      appraiserRejectsEmployee({
        // employee_id
        id: employee_id,
      });
      appraiserUpdateRating({
        "appraisal.objective_description" : appraiserObjDesc,
        "appraisal.comments": appraiserComments,
        id: employee_id,
      });
      setMessage("The performance appraisal has been succesfully submitted.")
      setNavigateDashboard(true);
      setOpenSubmit(true);
      // navigate(`/dashboardreview`);
    }
  };

  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",
      // opacity: open ? "1" : "0",
    },
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
      navigate(`/dashboardReview`, {
        state: {
          from: 1,
        }
      });
    }
    // setNavigateDashboard(false)
  };

  const saveRecommendationsHandler = () => {
    
    if (otherComments1 == "" || otherComments1 == null || otherComments1 == undefined) {
      setOpenSaved(true);
      setMessage("Please add the Appraiser Comments on the Recommendation page.")
    } else {
      updateEmployee({
        id: employee_id,
        // "employee.training_recommendation": trainingRecommendationValues,
        // "employee.area_of_improvement": area,
        // "appraisal.area_of_improvement": appraiserAreaofImprovement,
        // "appraisal.training_recommendation": appraiserTrainingRecommendations,
        "appraisal.appraiser_overall_feedback": otherComments1,
        // "appraisal.comments": appraiserComments,
      });
      setOpenSaved(true);
      setMoveTab(false);
      setMessage("Changes have been saved.")
    }
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
          aria-labelledby="responsive-dialog-title"
          BackdropProps={{
            style: { background: "#333333 !important", opacity: "1%" },
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
                                // setnavPrompt(true);
                                handleRatingAlert(ratings);
                                // setDisplayEmployeeRating(false);
                                setRating(ratings._id);
                                // setRatingValue(ratings.rating)
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
                          {getRatingDescription(ratingAppraiser)} */}
                        </span>
                      </Stack>
                    </Contain>
                  </Item1>
                </Stack>
              </>
            </Item2>
            <Typography
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
                  value="Rating was not agreed with the Employee"
                  control={<Radio />}
                  label="Rating was not agreed with the Employee"
                  onChange={(e) => {
                    handlereasonChange(e);
                  }}
                />
                <FormControlLabel
                  value="An error made by the Employee"
                  control={<Radio />}
                  label="An error made by the Employee"
                  onChange={(e) => {
                    handlereasonChange(e);
                  }}
                />
              </RadioGroup>
            </FormControl>
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

                  <IconButton>
                    <img src={Uploadatt}
                      onClick={(e: any) => {
                        // setActiveObjectiveDescriptionName(j?.name?._id)
                        handleClickOpenAttachment(e);
                        // setPopoverIndex(index)
                      }}
                    />
                  </IconButton>

                  <> <Text><label style={{fontSize:"14px",color:"#7a7a7a",fontFamily:"arial"}}>{name}</label></Text></>

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
          //   height: "1500px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
          marginLeft="32px"
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
              PA Dashboard
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
              {/* Appraiser Action */}
              {employeeData && employeeData?.data?.calendar?.name}
            </Link>
          </Breadcrumbs>
        </Stack>
        <Container
          sx={{
            maxWidth: "96.5% !important",
            backgroundColor: "#ebf1f5",
          }}
        />
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
                    {getPAStatus(employeeData?.data)}
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
                        fontSize: "16px",
                        color: "#333333",
                        paddingTop: "1px",
                      }}
                    >
                      <b>{employeeData?.data?.appraisal?.appraiser_rating}</b>
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

                <Grid item xs={4}>
                  <Stack paddingRight="10px" direction="row" gap="12px">
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
                    border:"1px solid #3e8cb59e",
                    maxHeight:"0px",
                    minHeight:"48px",
                    paddingRight: "15px",
                    paddingLeft:"20px"
                    
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
                    border:"1px solid #3e8cb59e",
                    paddingLeft:"20px",
                    paddingRight:"20px"
                  }}
                  label="Recommendations"
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
            </Typography>
            <TabPanel value={value} index={0}>
              <TableContainer sx={{ width: "100%", paddingTop: "10px" }}>
                <Table size="small" aria-label="simple table">
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
                        Appraiser <br></br> Rating
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
                        Appraiser <br></br> Comments
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
                        Normalized <br></br> Rating
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
                        Employee<br></br>  Comments
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
                        Appraiser<br></br>  Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employeeData &&
                      objectiveTitleData &&
                      objectiveDescription.map((j: any, index: number) => {
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
                                // width="22%"
                                sx={{
                                  fontSize: "14x",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  wordBreak: "break-word",
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
                                                <b>  {
                                                    j?.name?.level_1
                                                      ?.level_definition
                                                  }</b>
                                                </span>
                                                <br />
                                                <ul style={{marginTop:"0px",marginBottom:"0px"}} >
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
                                                <ul style={{marginTop:"0px",marginBottom:"0px"}} >
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
                                                <b>  {
                                                    j?.name?.level_3
                                                      ?.level_definition
                                                  }</b>
                                                </span>
                                                <br />
                                                <ul style={{marginTop:"0px",marginBottom:"0px"}} >
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
                                                <ul style={{marginTop:"0px",marginBottom:"0px"}} >
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
                                }}
                                align="center"
                              >
                                {console.log(
                                  activeObjectiveDescriptionName,
                                  j.name,
                                  "twenty"
                                )}
                                <span
                                  style={{
                                    // fontSize: "14x",
                                    // @ts-ignore
                                    color: j.rating_rejected
                                      ? "red"
                                      : "#333333",
                                    // '"#333333",
                                  }}
                                >
                                  {/* {j?.ratings?.rating} */}
                                  {j.rating_rejected === true
                                    ? j?.ratings?.rating
                                    : employeeData &&
                                    employeeData?.data?.employee?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings)
                                          return k?.ratings?.rating;
                                      })[0]}
                                  {/* {j?.ratings?.rating == null || j?.ratings?.rating == undefined ? { show } : j?.ratings?.rating} */}
                                  {/* {j?.ratings?.rating && j.ratings.rating_scale}{" "} */}
                                  {/* {j?.ratings?.rating == null || j?.ratings?.rating == undefined ? employeeData &&
                                      employeeData?.data?.employee?.objective_description
                                        .filter(
                                          (i: any) => i.name._id === j.name._id
                                        )
                                        .map((k: any) => {
                                          if (k.ratings)
                                            return k.ratings.rating;
                                        })[0] : j?.ratings?.rating} */}

                                </span>
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
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      fontFamily: "Arial",
                                      color: '#333333',
                                      wordBreak: "break-word"

                                    }}
                                  >{(j?.comments == "" || j.comments == undefined) ? j.remarks : j.comments}</span>
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
                                                        />
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
                              <TableCell
                                width="10px"
                                sx={{
                                  fontSize: "14x",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                                align="center"
                              >
                                {console.log(
                                  activeObjectiveDescriptionName,
                                  j.name,
                                  "twenty"
                                )}
                                <span
                                  style={{
                                    // fontSize: "14x",
                                    // @ts-ignore
                                    color:  (employeeData?.data?.normalizer?.objective_description
                                    .filter(
                                      (i: any) =>
                                        i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => {
                                      if (k?.rating_rejected)
                                        return k?.rating_rejected;
                                    })[0])
                                    
                                      ? "red"
                                      : "#333333",
                                    // '"#333333",
                                  }}
                                >
                                  {/* {j?.ratings?.rating} */}
                                  {
                                    employeeData?.data?.normalizer?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings)
                                          return k?.ratings?.rating;
                                      })[0]}                                

                                </span>
                              </TableCell>
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
                                  {/* <span> {j.ratings && j.ratings.rating}</span> */}

                                  <span
                                    style={{
                                      // fontSize: "14x",
                                      // @ts-ignore
                                      color:
                                        employeeData &&
                                          employeeData?.data?.employee?.objective_description
                                            .filter(
                                              (i: any) =>
                                                i.name._id === j.name._id
                                            )
                                            .map((k: any) => {
                                              if (k.rating_rejected)
                                                return k.rating_rejected;
                                            })[0]
                                          ? "red"
                                          : "#333333",
                                      // '"#333333",
                                    }}
                                  >
                                    {employeeData &&
                                      employeeData?.data?.employee?.objective_description
                                        .filter(
                                          (i: any) => i.name._id === j.name._id
                                        )
                                        .map((k: any) => {
                                          if (k.ratings)
                                            return k.ratings.rating;
                                        })[0]}
                                  </span>
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
                                          if (k.comments) return k.comments;
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
                                  {employeeData &&
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

                                          </Tooltip>
                                          :<Tooltip title="Accept">
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
                                        </Tooltip>:
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
                <Button
                  disabled={disableAccept}
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
                  onClick={() => rejectHandler()}
                >
                  Accept
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
                  onClick={() => rejectEmployeeHandler()}
                >
                  Reject
                </Button>
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
                  // onClick={() => rejectEmployeeHandler()}
                  >
                    Cancel
                  </Button>
                </Link>
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
                    <b> Areas of Improvement (Employee)</b>
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
                        Training1.map((j: any) => {
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
                                  {j?.name?.name?.title}
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
                <b>Appraiser Overall Feedback</b>
              </Typography>
              <Typography
                style={{
                  fontSize: "14px",
                  fontFamily: "arial",
                  color: "#717171",
                  paddingTop: "10px",
                }}
              >
                <Tf3>
                  <TextField
                    placeholder="Add"
                    fullWidth
                    // disabled
                    // InputProps={{readOnly: true,}}
                    multiline
                    inputProps={{ maxLength: 500 }}
                    size="small"
                    value={otherComments1 || ""}
                    onChange={e => {
                      handleappraiserReCommentsChange(e)
                      setMoveTab(true);
                    }}
                  />
                </Tf3>
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
              {/* <Typography
                style={{
                  fontSize: "16px",
                  color: "#717171",
                  paddingTop: "20px",
                  paddingBottom: "10px",
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
              </Tf3> */}
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
            </TabPanel>
          </Box>
        </Container>
      </div>
    </>
  );
}
