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
  Select,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Alert from "@mui/material/Alert";
import React, { useEffect, useState, useRef } from "react";
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
import Infoicon from "./icons/Infoicon.svg";
import { Link } from "react-router-dom";
import Removeattnew from "../../assets/Images/icons/Removeattnew.svg";
import Uploadatt from "../../assets/Images/Uploadatt.svg";
import thumbsdown_colored from "../../assets/Images/icons/Thumbsdowncolored.svg";
import thumsup_colored from "../reviewer/appraisal_reviewer/icons/thumbsup_colored.svg";
import {
  EMPLOYEE_DOWNLOAD,
  EMPLOYEE_LANDING,
} from "../../constants/routes/Routing";
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
} from "../../service";
import _ from "lodash";
import dayjs from "dayjs";
import Downloadss from "../../assets/Images/Downloadss.svg";
import Blueadd from "../../assets/appraiser/Reviewericons/Blueadd.svg";
import MenuItem from "@mui/material/MenuItem";
import { FormatColorResetSharp } from "@mui/icons-material";
import Blueminus from "../../assets/appraiser/Reviewericons/Blueminus.svg";
import { Tooltip } from "@mui/material";
import { useCreateAzureBlobMutation } from "../../service/azureblob";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import Closeiconred from "../../assets/Images/Closeiconred.svg";
import AlertYesNo from "../UI/DialogYesNo";
import AlertDialogSuccess from "../UI/DialogSuccess";
import Thumsdown from "../../assets/Images/icons/Thumsdown.svg";
import FeedbackQuestionnaireAppraiser from "./FeedbackQuestionnaireAppraiser";

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

export default function EmployeeRejects() {
  const [anchorEl2, setAnchorEl2] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open2 = Boolean(anchorEl2);
  // const id = open2 ? "simple-popover" : undefined;
  const [name, setName] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<any>("");

  const [employeeAgreevalue, setEmployeeAgreevalue] = React.useState("");

  const [sendItem] = useCreateAzureBlobMutation();

  const [attachmentsEmployee] = useAttachmentsEmployeeMutation();

  const { employee_id } = useParams();
  const { data: employeeData, isLoading } =
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
  const [ratingReviewer, setRatingReviewer] = useState<any>("");
  const [rejectedTitle, setRejectedTitle] = useState<any>("");
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = useState("");
  const [employeeComments, setEmployeeComments] = useState("");
  const [message, setMessage] = useState("");

  const [overAllRating, setOverAllRating] = useState<any>(0);

  const [updateEmployee] = useEmployeeRejectionMutation();
  const [updateEmployeeAppraisal] = useUpdateEmployeeAppraisalMutation();

  const [employeeUpdateRating] = useUpdateEmployeeAppraisalMutation();
  const [employeeRejectionSave] = useEmployeeRejectSaveMutation();

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
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (moveTab == true && value == 0) {
      setOpenSaved(true);
      setMessage("Please save the ratings before leaving the page.");
    } else if (moveTab == true && value == 1) {
      setOpenSaved(true);
      setMessage("Please save the recommendations before leaving the page.");
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

  //slider save validation
  const [triggerUseEffect, settriggerUseEffect] = React.useState(false);
  const [copiedFinalRating, setcopiedFinalRating] = React.useState("");
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [rejectAlertMessage, setrejectAlertMessage] = React.useState("");

  const [valueupdateAlert, setvalueupdateAlert] = React.useState(false);
  const [compvalue, setcompvalue] = React.useState("");
  const inputRef = useRef<any>(null);

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
    let trainingRecommendationValues = formValues.filter(
      (item: any) => item.name != ""
    );
    let employeeObjDesc =
      employeeData?.data?.employee?.objective_description?.map((i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      });
    employeeUpdateRating({
      "employee.objective_description":
        employeeData.data.normalizer.objective_description,

      // "appraisal.status": "rejected",
      id: employee_id,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": area,
      "employee.comments": employeeComments,
      // "employee.objective_description" : employeeObjDesc,
    });
    handleClose1();
    handleClose();
  };
  //Accept - dialog boxes
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [accept, { error, isError }] = useAcceptAppraisalEmployeeMutation();

  const [textfeildError, settextfeildError] = useState(false);
  const handleClickOpenForSubmit = () => {
    if (employeeComments === "" || employeeComments === undefined) {
      setOpenValidation(true);
      setMessage("Please add the employee comments in the recommendation.");
    } else {
      // setOpenRejectValidation(true);
      // setMessage("Are you sure you would like to reject the Performance Appraisal?")
      handleClickOpen();
    }
  };

  const handleRejectValidationYes = () => {
    setOpenRejectValidation(false);
    setMessage("");
    let employeeObjDesc =
      employeeData?.data?.employee?.objective_description?.map((i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      });
    employeeRejectionSave({
      "employee.comments": employeeComments,
      id: employee_id,
    }).then((data: any) => {
      updateEmployeeAppraisal({
        id: employee_id,
        "employee.objective_description": employeeObjDesc,
      });
    });
    setOpenSubmit(true);
  };

  const handleRejectValidationClose = () => {
    setOpenRejectValidation(false);
    setMessage("");
  };

  const handleValidationOk = () => {
    setOpenValidation(false);
    setValue(1);
    setMessage("");
  };

  useEffect(() => {
    if (employeeComments == "" || employeeComments == undefined) {
      setMoveTab(false);
    }
  }, [employeeComments]);

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
    if (RejectChanges === true) {
      setOpen(true);
      console.log("Rejectrrrrr");
    } else {
      console.log("submitsssss");
      setopenforAccept(true);
    }
  };

  const handleCloseSubmit = () => {
    setOpenSubmit(false);
    navigate(`${EMPLOYEE_LANDING}/employee/${employee_id}`);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseNo = () => {
    setOpen(false);
    setValue(1);
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
    // setratingSelection(false);
  };
  const openDrawerHandler = (objective: any) => {
    console.log(objective, "objectiveeeeeeeeeeeeeeeeeeeeee");
    settriggerUseEffect(true);
    openDrawer();
    let reviewerRatingValue =
      employeeData?.data?.normalizer?.objective_description
        .filter((i: any) => i?.name?._id === objective?.name?._id)
        .map((k: any) => {
          if (k.ratings) return k.ratings.rating;
        })[0];
    setRatingReviewer(reviewerRatingValue);
    setActiveObjectiveDescriptionName(objective?.name?._id);
    setActiveObjectiveDescription(objective._id);
    setRejectedTitle(objective?.name?.objectiveTitle);
    // setComments(objective.rating_comments);
    // setComments(objective.rating_comments);
    setComments(objective.comments);
    setShowWithdraw(objective.rating_rejected);
    // setratingparams(objective.ratings.rating);
    if (displayEmployeeRating == false) {
      setRating(objective.ratings._id);
      setRatingValue(objective.ratings.rating);
    } else if (displayEmployeeRating == true) {
      setRating(rating);
      setRatingValue(ratingValue);
    }
    setName("");
    resetFileInput();
  };
  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };
  console.log(ratingReviewer, "test");
  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData?.data?.normalizer?.objective_type?.find(
        (item: any) => item?.name?._id === id
      );
    }
  };
  const [attachment, setAttachment] = useState<any>([]);
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setObjectiveDescription(() => {
        return employeeData?.data?.employee?.objective_description?.map(
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

      setEmployeeComments(employeeData?.data?.employee?.comments);
      // setAttachment(employeeData?.data?.employee?.attachments[0]);
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

  const getPAStatus = (data: any) => {
    if (data?.appraisal?.status == "completed") {
      return "Completed";
    } else if (data?.appraisal?.status == "rejected") {
      return "Rejected";
    } else if (data?.employee?.employee_status == "pending") {
      return "Pending with Employee";
    } else if (
      data?.appraisal?.appraisal_status == "appraiser-accepted-employee"
    ) {
      return "Pending with Normalizer";
    } else if (data?.appraisal?.appraiser_status == "employee-rejected") {
      return "Pending with Appraiser";
    }
  };

  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  const ratingSubmitHandler = () => {
    // setFileSelected("")
    // if (ratingReviewer === ratingparams) {
    console.log(rating, ratingparams, ratingReviewer, "ratinggggg");
    // if (ratingReviewer === ratingparams) {
    if (ratingReviewer === ratingValue) {
      setrejectAlertMessage(
        "You cannot select the same rating as the Appraiser. Please change the Rating."
      );
      setrejectAlert(true);

      // if (copiedFinalRating === rating) {
      //     setrejectAlert(true);
      // setTimeout(() => {
      //   setrejectAlert(false);
      // }, 3000);
    } else if (comments == "" || comments == undefined || comments == "") {
      setrejectAlertMessage("Please add Comments for Rejection.");
      setrejectAlert(true);
    } else {
      closeDrawer();
      updateEmployee({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        rating_rejected: true,
        action_performed: true,
        comments: comments,
        // comments: "",
        // rating_comments: comments,
        employee_id,
        "employee.training_recommendation": formValues,
        "employee.area_of_improvement": area,
      });
      if (name && fileSelected) {
        return imageClick();
      }
      setRating("");
      setMoveTab(false);
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
      let temp = employeeData?.data?.normalizer?.objective_description
        .filter((i: any) => i.name._id == activeObjectiveDescriptionName)
        .map((k: any) => k.ratings._id)[0];

      console.log(temp, "temppppppppppppppp");

      updateEmployee({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: temp,
        rating_rejected: false,
        action_performed: true,
        comments: "",
        rating_comments: "",
        employee_id,
        "employee.training_recommendation": formValues,
        "employee.area_of_improvement": area,
      });
      setRating("");
      setComments("");
    }
  };
  console.log(fileSelected, "fileselected");

  const submitEmployeeRejection = () => {
    setOpenRejectValidation(true);
    setMessage(
      "Are you sure you would like to reject the Performance Appraisal? "
    );
    handleClose();
    // navigate(`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`);
  };

  useEffect(() => {
    if (objectiveDescription?.length > 0) {
      const objectiveDescriptionMapped: any = objectiveDescription?.map(
        (i: any) => {
          // if (i.ratings) {
          // console.log(i.objective_type, 'objective_type')
          console.log(objectiveDescription, "objectiveDescription");
          console.log(i, "value");
          const sum = (i.value * i?.objective_type?.value) / 10000;
          const newSum = sum * i?.ratings?.rating;
          console.log(i.value, "newSum");
          return newSum;
          // }
        }
      );
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
      employeeUpdateRating({
        "employee.employee_rating": overAllRating,
        id: employee_id,
      });
    }
  }, [overAllRating]);

  //mapping area of recommendation
  const [filterData1, setFilterData1] = useState([]);
  console.group(filterData1, "filterData1");
  const groupNAmeHandler = (name: any) => {
    if (name) {
      setFilterData1(name);
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
  console.log(Training, "Trainingstate");
  useEffect(() => {
    if (employeeData) {
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
  }, [employeeData]);
  const [trainingSelectValue, setTrainingSelectValue] = useState<any>([])

  useEffect(()=>{
    if (employeeData) {
    setTrainingSelectValue(employeeData.data.appraisal_template.training_recommendation)
    }
  },[employeeData])
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
    let trainingRecommendationValues = formValues.filter(
      (item: any) => item.name != ""
    );
    let specificAreas = area.filter((item:any) => item.value !== "")
    let employeeObjDesc =
      employeeData?.data?.employee?.objective_description?.map((i: any) => {
        return {
          ...i,
          action_performed: false,
        };
      });

    // if (employeeComments === "") {
    //   setOpenValidation(true);
    //   setMessage("Please add the employee comments.")
    // } else {
    settextfeildError(false);
    
    if (
      employeeComments == null ||
      employeeComments == "" ||
      employeeComments == undefined
    ) {
      setOpenSaved(true);
      setMessage("Please add the Comments on the Recommendation page.");
    } else {
      updateEmployeeAppraisal({
        id: employee_id,
        "employee.training_recommendation": trainingRecommendationValues,
        "employee.area_of_improvement": specificAreas,
        "appraisal.area_of_improvement": appraiserAreaofImprovement,
        "appraisal.training_recommendation": appraiserTrainingRecommendations,
        "employee.comments": employeeComments,
        // "employee.objective_description" : employeeObjDesc,
      });
      setOpenSaved(true);
      setMessage("Changes have been saved.");
      setMoveTab(false);
    }
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
    const newAreaList = [...area];
    newAreaList.splice(index, 1);
    setarea(newAreaList);
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
  const [formValues, setFormValues] = useState([
    { name: "", training_name: "", justification: "" },
  ]);

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
    // setnavPrompt(true)
    const newFormValues = [...formValues];
    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
     setInfo( e.target.value)
  };
  //adding training recommendation
  const handleBackButton = () => {
    if (moveTab == true && value == 1) {
      setOpenSaved(true);
      setMessage("Please save the recommendations before leaving the page.");
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

   const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
      null
    );
    const openInfo7 = Boolean(anchorEl8);
  
    const id7 = openInfo7 ? "simple-popover" : undefined;
    const handleClickInfo7 = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl8(event.currentTarget);
    };
    const handleCloseInfo7 = () => {
      setAnchorEl8(null);
    };

  useEffect(() => {
    if (employeeData) {
      console.log(
        employeeData?.data?.employee?.training_recommendation,
        "training"
      );
      setFormValues(() => {
        return employeeData.data.employee.training_recommendation.map(
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
    if (area && area?.length > 0) {
      setShowAreaofImprovement(true);
    } else {
      setShowAreaofImprovement(false);
    }
  }, [area]);

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
  //   setratingparams(ratingReviewer);
  // }, [ratingReviewer]);

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    if (ratingReviewer === j.rating) {
      setrejectAlert(true);
      setrejectAlertMessage(
        "You cannot select the same rating as the Appraiser.please change the rating."
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
  console.log(ratingReviewer, "ratingparams");
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
                              setDisplayEmployeeRating(false);
                              setRating(ratings._id);
                              setRatingValue(ratings.rating);
                            }}
                            style={{
                              //@ts-ignore
                              borderColor: rating === ratings._id && "#3C8BB5",
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
                  Rating
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
                          {ratingReviewer}
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
            </>
          </Item2>
          <div
            style={{
              textAlign: "left",
              paddingLeft: "27px",
              fontSize: "12px",
              paddingBottom: "7px",
              paddingTop: "6px",
              color: "#7A7A7A",
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
            autoComplete="off"
            multiline
            style={{ paddingLeft: "28px", width: "75%" }}
            value={comments}
            inputProps={{ maxLength: 500 }}
            onChange={(e) => {
              setComments(e.target.value);
              setMoveTab(true);
              // setnavPrompt(true);
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
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={""}
              state={{
                from: `${1}`,
              }}
            >
              {employeeData && employeeData?.data?.calendar?.name}
            </Link>
          </Breadcrumbs>
        </Stack>
        <Container
          sx={{
            maxWidth: "96.5% !important",
            backgroundColor: "#ebf1f5",
          }}
        ></Container>
        <Container
          sx={{
            maxWidth: "95% !important",
            // height: "1308px",
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
              justifyContent="space-between"
              paddingBottom="10px"
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

              <span style={{ paddingRight: "10px" }}>
                {/* <Link to={`${EMPLOYEE_LANDING}/employee/${employee_id}`,'_blank'}> */}
                <Button
                  variant="outlined"
                  size="small"
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    marginRight: "65px",
                  }}
                >
                  <img src={Downloadss} alt="Download" />
                  <label style={{ paddingLeft: "5px",
                  cursor: "pointer",
                   }} onClick={handleViewPA}>
                    {" "}
                    View PA{" "}
                  </label>
                </Button>
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
                paddingLeft: "20px",
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
                        {/* {employeeData?.data?.division} */}
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
                      <b>
                        {employeeData &&
                          // employeeData?.data?.employee?.employee_rating == 0 ? "Yet to be rated." :
                          employeeData?.data.employee?.employee_rating}
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
                      {getPAStatus(employeeData?.data)}
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
                  {/* Changes have been saved.*/}
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
                        <img
                          style={{ width: "12px" }}
                          src={Infoicon}
                          alt="icon"
                        />
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
              <TabPanel value={value} index={0}>
                <div style={{ marginRight: "65px" }}>
                  <TableContainer sx={{ paddingTop: "20px" }}>
                    <Table size="small" aria-label="simple table">
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
                            Rating
                            {/* <IconButton aria-describedby={id2} onClick={handleClickInfo}>
                              <img src={Infoicon} alt="icon" />
                            </IconButton> */}
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
                                  <Scrollbar
                                    style={{ width: "100%", height: "225px" }}
                                  >
                                    <Table
                                      sx={{ minWidth: 200 }}
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
                                                {/* <option employeeAgreevalue="Training Title">Rating</option> */}
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
                                  </Scrollbar>
                                </Scroll>
                              </TableContainer>
                            </Popover>
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
                            Appraiser <br />
                            Comments
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
                            Employee
                            <br /> Ratings
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
                            Employee <br />
                            Comments
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
                            Employee <br />
                            Actions
                          </TableCell>
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
                                                    {" "}
                                                    <span>L1 : </span>{" "}
                                                    <span>
                                                      <b>
                                                        {" "}
                                                        {
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
                                                    {" "}
                                                    <span>L2 : </span>{" "}
                                                    <span>
                                                      <b>
                                                        {" "}
                                                        {
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
                                                    {" "}
                                                    <span>L3 : </span>{" "}
                                                    <span>
                                                      <b>
                                                        {" "}
                                                        {
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
                                                    {" "}
                                                    <span>L4 : </span>{" "}
                                                    <span>
                                                      <b>
                                                        {" "}
                                                        {
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
                                    }}
                                    align="left"
                                  >
                                    <Stack
                                      direction="column"
                                      display="flex"
                                      alignItems="center"
                                    >
                                      <span>
                                        {employeeData &&
                                          employeeData?.data?.normalizer?.objective_description
                                            .filter(
                                              (i: any) =>
                                                i?.name?._id === j?.name?._id
                                            )
                                            .map((k: any) => {
                                              console.log(
                                                k?.ratings?.rating,
                                                "k.ratings.rating"
                                              );
                                              // setcompvalue(k.ratings.rating)
                                              if (k.ratings)
                                                return k?.ratings?.rating;
                                            })[0]}
                                        {/*{*/}
                                        {/*    employeeData && employeeData.data.normalizer.objective_description*/}
                                        {/*        .filter(*/}
                                        {/*            (i: any) => i.name._id === j.name._id*/}
                                        {/*        )*/}
                                        {/*        .map((k: any) => k.ratings.rating)[0]*/}
                                        {/*}*/}
                                      </span>
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
                                  <TableCell
                                    width="250px"
                                    sx={{
                                      fontSize: "14x",
                                      color: "#333333",
                                      fontFamily: "Arial",
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
                                              console.log(
                                                k?.remarks,
                                                "remarks"
                                              );
                                              return k?.remarks;
                                            })[0]}
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

                                    <Stack
                                      direction="column"
                                      display="flex"
                                      alignItems="center"
                                    >
                                      {j.rating_rejected ? (
                                        <span style={{ color: "red" }}>
                                          {j.ratings && j.ratings.rating}
                                        </span>
                                      ) : j.ratings && j.ratings.rating ? (
                                        <span
                                          style={{
                                            fontSize: "14x",
                                            color: "#333333",
                                            fontFamily: "Arial",
                                          }}
                                        >
                                          {j.ratings && j.ratings.rating}
                                        </span>
                                      ) : (
                                        employeeData &&
                                        employeeData?.data?.normalizer?.objective_description
                                          .filter(
                                            (i: any) =>
                                              i?.name?._id === j?.name?._id
                                          )
                                          .map((k: any) => {
                                            console.log(
                                              k?.ratings?.rating,
                                              "k.ratings.rating"
                                            );
                                            // setcompvalue(k.ratings.rating)
                                            if (k.ratings)
                                              return k?.ratings?.rating;
                                          })[0]
                                      )}

                                      {/* {j.ratings && j.ratings.rating} */}
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
                                              .map((k: any) => k.comments)[0]}

                                          {/* {j?.comments} */}
                                        </span>
                                      ) : (
                                        ""
                                      )}

                                      {/* {j.rating_rejected ? ( */}

                                      {employeeData &&
                                        getAttachments1(j?.name?._id)?.length >
                                          0 && (
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
                                  <TableCell
                                    width="50px"
                                    sx={{
                                      fontSize: "14x",
                                      color: "#333333",
                                      opacity: "80%",
                                      fontFamily: "regular",
                                    }}
                                    align="center"
                                  >
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
                                    {j.action_performed === true &&
                                    j.rating_rejected === true ? (
                                      <Tooltip title="Rejected">
                                        <IconButton
                                          onClick={() => openDrawerHandler(j)}
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
                                        <IconButton
                                          onClick={() => openDrawerHandler(j)}
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
                                  </TableCell>
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
                  <Button
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
                    }}
                    variant="outlined"
                    onClick={saveRecommendationsHandler}
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
                      background: "transparent",
                      height: "35px",
                      // width: "70px",
                    }}
                    variant="outlined"
                    //onClick={handleClickOpen}
                    onClick={handleClickOpenForSubmit}
                  >
                   Save and Submit 
                  </Button>
                  <Link to={`${EMPLOYEE_LANDING}/employee/${employee_id}`}>
                    <Button
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
                      }}
                      variant="outlined"
                      //onClick={handleClickOpen}
                      // onClick={handleClickOpenForSubmit}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
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
                    BackdropProps={{
                      style: {
                        background: "#333333 !important",
                        opacity: "10%",
                      },
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
                        Did you review the recommendations?
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
                    fullScreen={fullScreen}
                    open={openSubmit}
                    onClose={handleCloseSubmit}
                    aria-labelledby="responsive-dialog-title"
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
                    BackdropProps={{
                      style: {
                        background: "#333333 !important",
                        opacity: "10%",
                      },
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
                        {/* Your Performance Appraisal rejection has been submitted successfully! */}
                        The performance appraisal has been submitted
                        successfully.
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
                    fullScreen={fullScreen1}
                    open={open1}
                    onClose={handleClose1}
                    aria-labelledby="responsive-dialog-title"
                    BackdropProps={{
                      style: {
                        background: "#333333 !important",
                        opacity: "10%",
                      },
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
                        Confirm Submit?
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
                          onClick={handleClose1}
                          autoFocus
                        >
                          No
                        </Button>
                      </DialogActions>
                    </div>
                  </Dialog>
                  <Dialog
                    fullScreen={fullScreen}
                    open={openforAccept}
                    onClose={handleCloseOpenForAccept}
                    aria-labelledby="responsive-dialog-title"
                    BackdropProps={{
                      style: {
                        background: "#333333 !important",
                        opacity: "10%",
                      },
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
                          textAlign: "center",
                        }}
                      >
                        Would you like to ACCEPT your performance appraisal?
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
                    onClose={handleCloseOpenForAcceptNext}
                    aria-labelledby="responsive-dialog-title"
                    BackdropProps={{
                      style: {
                        background: "#333333 !important",
                        opacity: "10%",
                      },
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

                  <AlertDialogSuccess
                    isAlertOpen={openValidation}
                    handleAlertClose={handleValidationOk}
                  >
                    {message}
                  </AlertDialogSuccess>

                  <AlertYesNo
                    isAlertOpen={openRejectValidation}
                    handleAlertYes={handleRejectValidationYes}
                    handleAlertClose={handleRejectValidationClose}
                  >
                    {message}
                  </AlertYesNo>
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer sx={{ width: "100%", paddingBottom: "50px" }}>
                  <Typography
                    style={{
                      marginTop: "20px",
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
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="baseline"
                      height="20px"
                      marginBottom="10px"
                      paddingTop="10px"
                      // paddingRight="72px"
                    >
                      <div
                        style={{
                          color: "#717171",
                          fontSize: "16px",
                          fontFamily: "Arial",
                        }}
                      >
                        <b>Areas of Improvement (Appraiser)</b>
                      </div>
                      <div
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
                                                  <p>
                                                    {k.value}
                                                    <br />
                                                  </p>
                                                );
                                            }
                                          );
                                        });
                                      })}

                                    {/* {specificAction} */}
                                    {/* {i?.normalizer?.area_of_improvement?.specific_actions?.employeeAgreevalue} */}
                                  </TableCell>
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
                  {showAreaofImprovement && (
                    <div style={{ marginRight: "10px" }}>
                      {/* <div style={{ paddingTop: "10px", paddingBottom: "5px", color: "#717171" }}>
                          Employee Area(s) of Improvement
                        </div> */}

                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        height="20px"
                        // paddingBottom = "5px"
                        paddingTop="10px"
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
                          <b> Areas of Improvement (Employee)</b>
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
                      <Table style={{ marginTop: "10px" }} size="small">
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
                                                          }}
                                                        />
                                                      </Box>
                                                    </Tf4>

                                                    {specificActionList.length -
                                                      1 ===
                                                      index &&
                                                      specificActionList.length <
                                                        6 && (
                                                        <IconButton
                                                          onClick={
                                                            handleSpecificAdd
                                                          }
                                                        >
                                                          {/* <img src={Blueadd} alt="icon" /> */}
                                                          plus
                                                        </IconButton>
                                                      )}
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
                                  onClick={handleImprovementAdd}
                                  >
                                  Add More
                                  </Button> */}
                                    </Stack>
                                    {improvementList.length !== index + 1 && (
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
                                            <img src={Blueminus} alt="icon" />
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
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <div style={{ marginRight: "65px" }}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      height="20px"
                      paddingTop="20px"
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
                              <img src={Blueminus} alt="icon" />
                            </Tooltip>
                          ) : (
                            <Tooltip title="Add">
                              <img src={Blueadd} alt="icon" />
                            </Tooltip>
                          )}
                        </Button>
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
                          Training.map((j: any) => {
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
                                  >
                                    {j?.name?.title}
                                    <IconButton
                                      // aria-describedby={id2}
                                      onClick={handleClickInfo6}
                                      // style={{marginRight:"5px"}}
                                    >
                                      <img
                                        width="12px"
                                        src={Infoicon}
                                        alt="icon"
                                      />
                                    </IconButton>
                                    <Popover
                                      id={id6}
                                      open={openInfo6}
                                      anchorEl={anchorEls}
                                      onClose={handleCloseInfo6}
                                      anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "right",
                                      }}
                                      transformOrigin={{
                                        vertical: "top",
                                        horizontal: "right",
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
                  {showTrainingRecommendations && (
                    <div>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        height="20px"
                        // paddingBottom = "5px"
                        paddingTop="10px"
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
                                  <Stack direction={"row"}>
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
                                                value={training.name._id}
                                              >
                                                {training.name.title}
                                              </MenuItem>
                                            );
                                          }
                                        )}
                                    </Select>
                                     {/* {info && ( */}
                    <IconButton
                        // aria-describedby={id7}
                        onClick={handleClickInfo7}
                        // style={{marginRight:"5px"}}
                      >
                        <img width="12px"  src={Infoicon} alt="icon" />
                      </IconButton>
                    {/* )}  */}
                    <Popover
              id={id7}
              open={openInfo7}
              anchorEl={anchorEl8}
              onClose={handleCloseInfo7}
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
              {trainingSelectValue &&
                        trainingSelectValue.map((TrainingData: any) => {
                          console.log(TrainingData.name._id,"TrainingData")
                          console.log(formValues[0].name,"TrainingDatas")

                          return (
                            <>
                                  {formValues &&
                                formValues[0]?.name === TrainingData.name._id && TrainingData?.name?.definition}                  
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
                                            // marginTop: "25px",
                                          }}
                                          onClick={() => addFormFields()}
                                        >
                                          <img src={Blueadd} alt="icon" />
                                        </Button>
                                      </Tooltip>
                                    )}

                                  {formValues.length !== index + 1 && (
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
                                          // marginTop: "25px",
                                        }}
                                        onClick={() => {
                                          removeFormFields(index);
                                          setMoveTab(true);
                                        }}
                                      >
                                        <img src={Blueminus} alt="icon" />
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

                  <Typography
                    style={{
                      fontSize: "16px",
                      fontFamily: "arial",
                      color: "#717171",
                      paddingTop: "20px",
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
                          employeeData?.data?.appraisal
                            ?.appraiser_overall_feedback
                        }
                      />
                    </Tf1>
                  </Typography>

                  <Typography
                    style={{
                      fontSize: "16px",
                      color: "#717171",
                      fontFamily: "arial",
                      paddingTop: "20px",
                      paddingBottom: "10px",
                    }}
                  >
                    <b>Employee Comments</b>
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
                        inputProps={{ maxLength: 512 }}
                        onChange={(e) => {
                          setEmployeeComments(e.target.value);
                          setMoveTab(true);
                          // setnavPrompt(true);
                        }}
                        error={!employeeComments && textfeildError}
                        helperText={
                          !employeeComments && textfeildError
                            ? "*Employee comments required."
                            : " "
                        }
                        // variant="standard"
                        // InputProps={{
                        //   disableUnderline: true, // <== added this
                        // }}
                      />
                    </EmployeeText>
                  </div>
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
                    <Button
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
                      }}
                      variant="outlined"
                      onClick={saveRecommendationsHandler}
                    >
                      Save as Draft
                    </Button>

                    {/* <Dialog
                      fullScreen={fullScreen}
                      open={openSaved}
                      onClose={handleCloseSaved}
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
                          Changes have been saved.
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
                      }}
                      variant="outlined"
                      onClick={() => {
                        // saveRecommendationsHandler();
                        handleBackButton();
                      }}
                    >
                      Back
                    </Button>

                    <Dialog
                      fullScreen={fullScreen3}
                      open={open3}
                      onClose={handleClose3}
                      aria-labelledby="responsive-dialog-title"
                      BackdropProps={{
                        style: {
                          background: "#333333 !important",
                          opacity: "10%",
                        },
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
                  </Stack>
                </TableContainer>
              </TabPanel>
            </Box>
          </Box>
        </Container>
      </div>
    </>
  );
}
