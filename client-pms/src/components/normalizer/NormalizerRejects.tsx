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
} from "../../service";
import _ from "lodash";
import dayjs from "dayjs";
import Downloadss from "../../assets/Images/Downloadss.svg";
import Blueadd from "../../assets/appraiser/Reviewericons/Blueadd.svg";
import MenuItem from "@mui/material/MenuItem";
import { FormatColorResetSharp } from "@mui/icons-material";
import Blueminus from "../../assets/appraiser/Reviewericons/Blueminus.svg";
import { useCreateAzureBlobMutation } from "../../service/azureblob";
import ClearIcon from '@mui/icons-material/Clear';
import { red } from '@mui/material/colors';

const EmployeeText = styled("div")({
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
    // color: "rgb(62 140 181 / 28%)",
    fontSize: "14px",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    color: "#333333",
    padding: "8px",
    height: "110px !important",
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
    minHeight: "110px !important",
    padding: "8px",
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

  const [employeeAgreevalue, setEmployeeAgreevalue] = React.useState('');



  const [sendItem] = useCreateAzureBlobMutation();

  const [attachmentsEmployee] = useAttachmentsEmployeeMutation();

  const { employee_id } = useParams();
  const { data: employeeData, isLoading } =
    useGetEmployeeAppraisalQuery(employee_id);
  const { data: trainingData } = useGetTrainingRecommendationQuery("");
  const { data: ratingsData } = useGetRatingScaleQuery("");
  const { data: objectiveTitleData, isLoading: isTitleLoading } =
    useGetObjectiveTitleQuery("");
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [rating, setRating] = useState<any>("");

  const [ratingReviewer, setRatingReviewer] = useState<any>("");
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = useState("");
  const [employeeComments, setEmployeeComments] = useState("");

  const [overAllRating, setOverAllRating] = useState<any>(0);

  const [updateEmployee] = useEmployeeRejectionMutation();
  const [updateEmployeeAppraisal] = useUpdateEmployeeAppraisalMutation();

  const [employeeUpdateRating] = useUpdateEmployeeAppraisalMutation();
  const [employeeRejectionSave] = useEmployeeRejectSaveMutation()

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
    setValue(newValue);
  };


  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {

    setEmployeeAgreevalue((event.target as HTMLInputElement).value);
  };
  const [open, setOpen] = React.useState(false);
  const [openSaved, setOpenSaved] = React.useState(false);
  //slider save validation
  const [triggerUseEffect, settriggerUseEffect] = React.useState(false);
  const [copiedFinalRating, setcopiedFinalRating] = React.useState("");
  const [rejectAlert, setrejectAlert] = React.useState(false);
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
    employeeUpdateRating({
      "employee.objective_description":
        employeeData.data.normalizer.objective_description,
      "appraisal.status": "rejected",
      id: employee_id,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": area,
      "employee.comments": employeeComments,
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
    if (employeeComments === "") {
      settextfeildError(true);
    } else {
      handleClickOpen();
    }
  };

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
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    // setratingSelection(false);
  };
  const openDrawerHandler = (objective: any) => {
    settriggerUseEffect(true);
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    // setComments(objective.rating_comments);
    // setComments(objective.rating_comments);
    setComments(objective.comments);
    setShowWithdraw(objective.rating_rejected);
    setRating(objective.ratings._id);
    let reviewerRatingValue = employeeData.data.appraisal.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    setRatingReviewer(reviewerRatingValue);
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
      setAttachment(employeeData?.data?.employee?.attachments[0]);
    }
  }, [employeeData, objectiveTitleData]);

  console.log(employeeData, "datatest");
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setObjectiveDescription1(() => {
        return employeeData?.data?.employee?.attachments
          // ?.filter((i: any) => i?.objective_description === j.name._id)
          ?.map(
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
  }, [employeeData])
  console.log(objectiveDescription1, "datatest1");
  console.log(attachment, "datatest2");
  const handleClickOpen9 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setObjectiveDescription1(() => {
      return employeeData?.data?.employee?.attachments
        ?.map(
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

  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  const ratingSubmitHandler = () => {
    if (ratingReviewer === ratingparams) {
      setrejectAlert(true);

      // if (copiedFinalRating === rating) {
      //     setrejectAlert(true);
      // setTimeout(() => {
      //   setrejectAlert(false);
      // }, 3000);
    } else {
      closeDrawer();
      updateEmployee({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        rating_rejected: true,
        comments: comments,
        // comments: "",
        // rating_comments: comments,
        employee_id,
        "employee.training_recommendation": formValues,
        "employee.area_of_improvement": area,
      });
      setRating("");
      // setComments("")
      // setnavPrompt(true)
    }
  };

  const ratingWithdrawHandler = () => {
    closeDrawer();
    let temp = employeeData.data.normalizer.objective_description
      .filter((i: any) => i.name._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];

    updateEmployee({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      comments: "",
      rating_comments: comments,
      employee_id,
      "employee.training_recommendation": formValues,
      "employee.area_of_improvement": area,
    });
    setRating("");
    setComments("")
    // setnavPrompt(true)
  };

  const submitEmployeeRejection = () => {

    employeeRejectionSave({

      "employee.comments": employeeComments,
      "employee_id": employee_id,
    });
    navigate(`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`);
  };

  useEffect(() => {
    if (objectiveDescription.length > 0) {
      const objectiveDescriptionMapped = objectiveDescription.map((i: any) => {
        // if (i.ratings) {
        // console.log(i.objective_type, 'objective_type')
        console.log(objectiveDescription, "objectiveDescription");
        console.log(i, "value");
        const sum = (i.value * i.objective_type) / 10000;
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
      employeeUpdateRating({
        "employee?.employee_rating": overAllRating,
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
    updateEmployee({
      id: employee_id,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": area,
      "appraisal.area_of_improvement": appraiserAreaofImprovement,
      "appraisal.training_recommendation": appraiserTrainingRecommendations,
      "employee.comments": employeeComments,
    });
    setOpenSaved(true);
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
  const handleTrainingChange = (i: any, e: any) => {
    // setnavPrompt(true)
    const newFormValues = [...formValues];
    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  //adding training recommendation
  const handleBackButton = () => {
    setValue(0);
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
  useEffect(() => {
    setratingparams(ratingReviewer);
  }, [ratingReviewer]);

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    if (ratingReviewer === j.rating) {
      setrejectAlert(true);
    } else {
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
  const handleClickOpen6 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setappraisalAttachments(
      employeeData &&
      employeeData?.data?.appraisal?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
    setPosition(appraisalAttachments)
    // (employeeData &&
    //   employeeData?.data?.appraisal?.attachments
    //   .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>}))
    // setOpen2(true);
    console.log(appraisalAttachments, "attachments")
    console.log(position, "position")
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
  const handleClickOpen7 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    // setOpen2true);
    setemployeeAttachments(
      employeeData &&
      employeeData?.data?.employee?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
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
      color: fileSelected == "" ? "transparent" : "black",
      // opacity: open ? "1" : "0",
    }
  };

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
          <Item2 sx={{ width: "fitContent" }}>
            {/* {rejectAlert && <Alert severity="error">
                You cannot put the same rating as the Appraiser. Please change the rating.
                </Alert>} */}
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
                  You cannot put the same rating as the Appraiser. Please change
                  the rating.
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
            {/* <Dialog
                    
                      open={valueupdateAlert}
                      onClose={handlevalueupdateDialogClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogContent>
                        <DialogContentText   
                        style={{
                        color: "#333333",
                        fontSize: "18px",
                        fontFamily: "Arial",
                      }}>
                        Update employee rating
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
                              marginRight: "10px",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={handlevalueupdateDialogClose}
                            // onClick={() => {
                            //   handleClickOpen1();
                            //   handleClose();
                            // }}
                          >
                            Ok
                          </Button>
                        
                        </DialogActions>
                      </div>
                    </Dialog> */}
            <div
              style={{
                textAlign: "left",
                paddingLeft: "10px",
                fontSize: "12px",
                paddingBottom: "7px",
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
                height="50px"
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
                    paddingTop: "20px",
                  }}
                >
                  Final Rating
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
              paddingTop: "25px",
              color: "#7A7A7A",
            }}
          >
            Comment(s)
          </div>

          <TextField
            size="small"
            autoComplete="off"
            multiline
            rows={4}
            style={{ paddingLeft: "28px", width: "75%" }}
            value={comments}
            inputProps={{ maxLength: 512 }}
            onChange={(e) => {
              setComments(e.target.value);
              // setnavPrompt(true);
            }}
          />
          <div
            style={{
              textAlign: "left",
              paddingLeft: "29px",
              fontSize: "12px",
              paddingBottom: "10px",
              paddingTop: "25px",
              color: "#7A7A7A",
            }}
          >
            Attachment
          </div>
          {/* <div style={{ paddingLeft: "28px" }}>
                <Button
                  style={{
                    textTransform: "none",
                    fontSize: "15px",
                    fontFamily: "Arial",
                    borderColor: "#3E8CB5",
                    color: "#3E8CB5",
                    backgroundColor: "transparent",
                  }}
                  variant="outlined"
                >
                  {/* {" "}
                    Upload File{" "} */}
          {/* <img src={Blueadd} alt="icon" />    */}
          {/* Attach
                </Button>
              </div>  */}
          <div style={{ paddingLeft: "28px" }}>
            <input
              //@ts-ignore
              style={styles.colors}
              id="photo"
              name="photo"
              type="file"
              title={name}
              ref={inputRef}
              multiple={false}
              onChange={handleImageChange}
            />
            <Text>
              {positionHide && (
                <Button
                  onClick={() => {
                    // setFileSelected('')
                    // setName('')
                    resetFileInput();
                  }}
                >
                  clear<ClearIcon sx={{ color: red[500] }} />
                </Button>
              )}
            </Text>

            {/*<Button*/}
            {/*  style={{*/}
            {/*    textTransform: "none",*/}
            {/*    fontSize: "15px",*/}
            {/*    fontFamily: "Arial",*/}
            {/*    borderColor: "#3E8CB5",*/}
            {/*    color: "#3E8CB5",*/}
            {/*    backgroundColor: "transparent",*/}
            {/*  }}*/}
            {/*  variant="outlined"*/}
            {/*>*/}
            {/*  /!* {" "}*/}
            {/*  Upload File{" "} *!/*/}
            {/*  /!* <img src={Blueadd} alt="icon" />    *!/*/}
            {/*  Attach*/}
            {/*</Button>*/}
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
              }}
              variant="outlined"
              onClick={() => {
                ratingSubmitHandler();
                if (name && fileSelected) {
                  return imageClick();
                }
              }}
            // variant="outlined"
            // onClick={ratingSubmitHandler}
            >
              {" "}
              Save
            </Button>
            {showWithdraw && (
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
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
            marginTop: "25px",
            minHeight: "100px",
            overflow: "hidden",
          }}
        >
          <Box
            style={{
              paddingLeft: "35px",
              paddingRight: "35px",
              paddingTop: "35px",
            }}
          >
            <h2
              style={{
                color: "#3E8CB5",
                fontWeight: "400",
                fontSize: "28px",
                fontFamily: "Arial",
              }}
            >
              Welcome to Performance Appraisal!
            </h2>
            <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "20px" }}>
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
            </Box>
            <Box sx={{ paddingTop: "20px" }}>
              {/* <Grid container spacing={0}> */}
              {/* <Grid item xs={12}> */}
              <Stack
                direction="row"
                justifyContent="space-between"
                paddingBottom="20px"
              >
                <Grid item xs={6}>
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
                    {
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
                    {" " + dayjs(employeeData?.data?.calendar?.end_date).year()}
                    {/* {employeeData?.data?.calendar?.name} */}
                  </Typography>
                </Grid>
                {/* <Grid
                        item
                        xs={2}
                        
                      >
                         </Grid> */}

                <Grid item xs={6}>
                  <Stack direction="row" gap="12px">
                    <div
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
                        Final Rating
                      </Typography>
                    </div>
                    <div>
                      <Stack
                        direction="column"
                        display="flex"
                        alignItems="center"
                        gap="4px"
                      >
                        <div
                          style={{
                            // paddingLeft: "22px",
                            fontSize: "18px",
                            color: "#3e8cb5",
                            paddingTop: "1px",
                          }}
                        >
                          <b>
                            {employeeData?.data?.normalizer?.normalizer_rating}
                          </b>
                        </div>
                        <div
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
                          {/* Exceeding */}
                        </div>
                      </Stack>
                    </div>
                  </Stack>
                </Grid>
              </Stack>
              {/* </Grid> */}
              {/* </Grid> */}
            </Box>
            <Typography
              style={{
                fontSize: "20px",
                color: "#3E8CB5",
                fontFamily: "Arial",
              }}
            >
              Performance Appraisal Summary
            </Typography>
            <Typography
              style={{ fontSize: "16px", color: "#717171", paddingTop: "5px" }}
            >
              {" "}
              <b>Overall Feedback</b>
            </Typography>
            <Typography
              style={{ fontSize: "13px", color: "#717171", paddingTop: "5px" }}
            >
              {employeeData?.data?.appraisal?.appraiser_overall_feedback}
            </Typography>
            <Typography
              style={{ fontSize: "16px", color: "#717171", paddingTop: "15px" }}
            >
              <b>Employee Comment(s)</b>
            </Typography>
            <p>
              <EmployeeText>
                <TextField
                  fullWidth
                  autoComplete="off"
                  size="small"
                  multiline
                  placeholder="Add comments"
                  value={employeeComments}
                  inputProps={{ maxLength: 512 }}
                  onChange={(e) => {
                    setEmployeeComments(e.target.value);
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
            </p>
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
                        color: "#3e8cb5",
                      },

                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontFamily: "Arial",
                      padding: "0px",
                      paddingRight: "5px",
                      fontWeight: "700",
                    }}
                    label="Ratings"
                    icon={
                      <IconButton
                        sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                        aria-describedby={id2}
                        onClick={handleClickInfo}
                      >
                        <img src={Infoicon} alt="icon" />
                      </IconButton>
                    }
                    iconPosition="end"
                    {...a11yProps(0)}
                  />
                  <Tab
                    sx={{
                      "&.Mui-selected": {
                        color: "#3e8cb5",
                      },

                      textTransform: "capitalize",
                      fontSize: "16px",
                      fontFamily: "Arial",
                      padding: "0px",
                      fontWeight: "700",
                    }}
                    label="Recommendations"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <TableContainer sx={{ width: "100%", paddingTop: "20px" }}>
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
                          Objective Type
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
                          Objective Description
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
                          Final Rating
                          {/* <IconButton aria-describedby={id2} onClick={handleClickInfo}>
                              <img src={Infoicon} alt="icon" />
                            </IconButton> */}
                          <Popover
                            id={id2}
                            open={openInfo}
                            anchorEl={anchorEl}
                            onClose={handleCloseInfo}
                            PaperProps={{
                              style: { width: "30%", height: "41%", marginTop: "55px" },
                            }}
                          >
                            <TableContainer>
                              {/* <Scrollbar style={{ width: "100%", height: "calc(100vh - 292px)" }}> */}
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
                                      align="left"
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
                                              align="left"
                                              sx={{
                                                fontSize: "14px",
                                                color: "#333333",
                                                fontFamily: "Arial",
                                              }}
                                            >
                                              {/* <div style={{ width:'100px', wordWrap:'break-word'}} >{row.rating.toFixed(1)}</div> */}
                                              <div
                                                style={{
                                                  width: "100px",
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
                                                  width: "200px",
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
                              {/* </Scrollbar> */}
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
                          Appraiser Comment(s)
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
                          Employee Rating
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
                          Employee Comment(s)
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
                          Employee Action(s)
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeeData &&
                        objectiveTitleData &&
                        objectiveDescription.map((j: any, index: number) => {
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
                                  sx={{
                                    fontSize: "14x",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                  align="left"
                                // rowSpan={3}
                                >
                                  {j.objective_type?.name?.name}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14x",
                                    color: "#333333",
                                    fontFamily: "Arial",

                                  }}
                                  align="left"
                                >
                                  {j?.name?.objectiveTitle}
                                </TableCell>
                                <TableCell
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
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    <span>
                                      {" "}
                                      {employeeData &&
                                        employeeData?.data?.appraisal?.objective_description
                                          .filter(
                                            (i: any) =>
                                              i?.name?._id === j?.name?._id
                                          )

                                          .map((k: any) => {
                                            console.log(employeeData?.data?.appraisal?.objective_description, "data")
                                            console.log(k?.remarks, "remarks")
                                            return k?.remarks;
                                          })[0]}

                                    </span>
                                    <AttachFileIcon
                                      sx={{ color: "#93DCFA", height: "18px" }}
                                      aria-describedby={"id"}
                                      onClick={(e: any) => handleClickOpen6(e, j)}
                                    />

                                    <Popover
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
                                        Attachments: {appraisalAttachments}
                                        {/* {employeeData?.data?.appraisal?.attachments
                                          .filter((i: any) => {

                                            // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                            return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                          })
                                          .map((k: any) => {
                                            return (
                                              <a href={k.url}> {k.name} </a>
                                            );
                                          })} */}
                                      </Typography>
                                    </Popover>
                                  </Stack>
                                </TableCell>
                                <TableCell
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
                                      <span style={{ color: 'red' }} >
                                        {j.ratings && j.ratings.rating}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                    {j.rating_rejected ? (
                                      <span
                                        style={{
                                          fontSize: "14x",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                        }}
                                      >
                                        {/* {j.ratings && j.ratings.rating_scale} */}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </Stack>
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14x",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                // align="left"
                                >
                                  <Stack
                                    direction="row"
                                    justifyContent="space-around"
                                    alignItems="center"
                                    spacing={2}
                                  >
                                    {j.rating_rejected ? (
                                      <span>
                                        {
                                          employeeData &&
                                          employeeData.data.employee.objective_description
                                            .filter((i: any) => i.name._id === j.name._id)
                                            .map((k: any) => k.comments)[0]
                                        }

                                        {/* {j?.comments} */}
                                      </span>
                                    ) : (
                                      ""
                                    )}

                                    {j.rating_rejected ? (
                                      <div
                                        style={{
                                          justifyContent: "end",
                                          position: "relative",
                                        }}
                                      >
                                        <AttachFileIcon
                                          style={{ color: "#93DCFA", height: "18px" }}
                                          aria-describedby={"id"}
                                          onClick={(e: any) =>
                                            handleClickOpen7(e, j)
                                          }
                                        />

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
                                            Attachments: {employeeAttachments}
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
                                          </Typography>
                                        </Popover>
                                        {/* </Dialog> */}
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </Stack>

                                  {/* </Stack> */}
                                </TableCell>
                                <TableCell
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
                    }}
                    variant="outlined"
                    //onClick={handleClickOpen}
                    onClick={handleClickOpenForSubmit}
                  >
                    Submit
                  </Button>
                  <Dialog
                    fullScreen={fullScreen}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    sx={{
                      "& .Mui Dialog-container": {
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
                        Did you review the Appraiser recommendations?
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
                    fullScreen={fullScreen1}
                    open={open1}
                    onClose={handleClose1}
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
                  >
                    <DialogContent>
                      <DialogContentText
                        style={{
                          color: "#333333",
                          fontSize: "18px",
                          fontFamily: "Arial",
                        }}
                      >
                        Would you like to ACCEPT your performance appraisal?
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
                  >
                    <DialogContent>
                      <DialogContentText
                        style={{
                          color: "#333333",
                          fontSize: "18px",
                          fontFamily: "Arial",
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

                  <Button
                    style={{
                      borderRadius: "4px",
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3E8CB5",
                    }}
                    variant="outlined"
                    onClick={saveRecommendationsHandler}
                  >
                    Save
                  </Button>
                </Stack>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer sx={{ width: "100%", paddingBottom: "50px" }}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="baseline"
                    height="20px"
                    marginBottom="7px"
                    paddingTop="10px"
                  >
                    <div
                      style={{
                        color: "#717171",
                        fontSize: "16px",
                        fontFamily: "Arial",
                      }}
                    >
                      Area(s) of Improvement
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
                          let temp = showAreaofImprovement;
                          setShowAreaofImprovement(!temp);
                        }}
                      >
                        {showAreaofImprovement ? "Remove" : "Add"}
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
                          Specific Area(s)
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
                          Specific Action(s)
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
                          Employee Comment(s)
                        </TableCell>
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
                                    whiteSpace: "nowrap",
                                  },
                                }}
                              >
                                <TableCell
                                  align="left"
                                  width="50%"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {i[0]}
                                  {/* {employeeData?.data?.normalizer?.area_of_improvement_comments} */}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  width="25%"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
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
                                                  {ix1 + 1}.{k.value}
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
                                <TableCell>
                                  <Tf31>
                                    <TextField
                                      fullWidth
                                      autoComplete="off"
                                      multiline
                                      size="small"
                                      placeholder="Add comments"
                                      name="employeeAreaComments"
                                      value={i[1][0].employee_comments}
                                      inputProps={{ maxLength: 512 }}
                                      onChange={(e: any) => {
                                        employeeAreaCommentsChangeHandler(
                                          i[1],
                                          e
                                        );
                                      }}
                                      key={index}
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
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                  {showAreaofImprovement && (
                    <div>
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
                          Employee Area(s) of Improvement
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
                      <Table style={{ marginTop: "7px" }} size="small">
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
                              width="50%"
                              align="center"
                              style={{
                                border: "1px solid #e0e0e0",
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                            >
                              Specific Area(s)
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
                              Specific Action(s)
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
                                                          placeholder="Add Specific Actions"
                                                          name="specificAction"
                                                          // key={index}
                                                          inputProps={{ maxLength: 500 }}
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
                                      <Addmore
                                        style={{
                                          cursor: "pointer",
                                          color: "#3E8CB5",
                                          fontSize: "14px",
                                        }}
                                        onClick={handleImprovementAdd}
                                      >
                                        <img src={Blueadd} alt="icon" />
                                      </Addmore>
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
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    height="20px"
                    paddingTop="20px"
                    marginBottom="7px"
                  >
                    <div
                      style={{
                        color: "#717171",
                        fontSize: "16px",
                        fontFamily: "Arial",
                      }}
                    >
                      Training Recommendation(s)
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
                          let temp = showTrainingRecommendations;
                          setShowTrainingRecommendations(!temp);
                        }}
                      >
                        {showTrainingRecommendations ? "Remove" : "Add"}
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
                          Employee Comment(s)
                        </TableCell>
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
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {j.trainingName}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {j.training_name}
                                </TableCell>
                                <TableCell
                                  align="left"
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    whiteSpace: "pre-line",
                                  }}
                                >
                                  {j.justification}
                                </TableCell>

                                <TableCell align="left">
                                  <Tf31>
                                    <TextField
                                      fullWidth
                                      multiline
                                      autoComplete="off"
                                      size="small"
                                      placeholder="Add comments"
                                      name="employeeTrainingComments"
                                      value={j.employee_comments}
                                      inputProps={{ maxLength: 512 }}
                                      onChange={(e: any) => {
                                        employeeTrainingCommentsChangeHandler(
                                          j,
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
                                </TableCell>
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
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
                          Employee Training Recommendation(s)
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
                      <Table size="small" style={{ marginTop: "7px" }}>
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
                              width="30%"
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
                              width="30%"
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
                              width="30%"
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
                                style={{
                                  fontWeight: "400",
                                  fontSize: "12px",
                                  padding: "5px",
                                  textAlign: "left",
                                  color: "#707070",
                                  opacity: 0.8,
                                  lineHeight: "30px",
                                }}
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
                                    <TextField
                                      sx={{
                                        "& label": {
                                          marginLeft: "5%",
                                          // marginBottom:"5%",
                                          // "&.Mui-focused": {
                                          //   marginLeft: 0
                                          // }
                                        },
                                      }}
                                      select
                                      fullWidth
                                      autoComplete="off"
                                      // label="Add  Name"
                                      label="Select"
                                      size="small"
                                      name="name"
                                      value={element.name || ""}
                                      variant="standard"
                                      InputProps={{
                                        disableUnderline: true,
                                      }}
                                      onChange={(e) =>
                                        handleTrainingChange(index, e)
                                      }
                                    >
                                      {employeeData &&
                                        employeeData.data.appraisal_template.training_recommendation.map(
                                          (training: any) => {
                                            return (
                                              <MenuItem
                                                value={training.name._id}
                                              >
                                                {training.name.title}
                                              </MenuItem>
                                            );
                                          }
                                        )}
                                    </TextField>
                                  </Train>
                                </TableCell>
                                <TableCell>
                                  {/* {item.training_name} */}
                                  <Train>
                                    <TextField
                                      sx={{
                                        "& label": {
                                          marginLeft: "5%",
                                          // marginBottom: "5%",
                                          // "&.Mui-focused": {
                                          //   marginLeft: 0,
                                          // },
                                        },
                                      }}
                                      fullWidth
                                      autoComplete="off"
                                      label="Add"
                                      size="small"
                                      name="training_name"
                                      value={element.training_name || ""}
                                      inputProps={{ maxLength: 500 }}
                                      variant="standard"
                                      InputProps={{
                                        disableUnderline: true,
                                      }}
                                      onChange={(e) =>
                                        handleTrainingChange(index, e)
                                      }
                                    />
                                  </Train>
                                </TableCell>
                                <TableCell>
                                  {/* {item.justification} */}
                                  <Train>
                                    <TextField
                                      sx={{
                                        "& label": {
                                          marginLeft: "5%",
                                          // margin:"-10px",
                                          // marginTop:"-10px",
                                          // "&.Mui-focused": {
                                          //   marginLeft: 0
                                          // }
                                        },
                                      }}
                                      fullWidth
                                      label="Add Justification"
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
                                      onChange={(e) =>
                                        handleTrainingChange(index, e)
                                      }
                                    ></TextField>
                                  </Train>
                                </TableCell>

                                {/* <TableCell>{item.comments}</TableCell> */}
                                <TableCell style={{ borderColor: "#ffffff" }}>
                                  {formValues.length - 1 === index &&
                                    formValues.length < 6 && (
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
                                    )}

                                  {formValues.length !== index + 1 && (
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
                                      onClick={() => removeFormFields(index)}
                                    >
                                      <img src={Blueminus} alt="icon" />
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </div>
                  )}

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
                      }}
                      variant="outlined"
                      onClick={saveRecommendationsHandler}
                    >
                      Save
                    </Button>

                    <Dialog
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
                          The changes have been saved successfully !
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

                    <Button
                      style={{
                        borderRadius: "4px",
                        textTransform: "none",
                        fontSize: "15px",
                        fontFamily: "Arial",
                        borderColor: "#3E8CB5",
                        color: "#3E8CB5",
                      }}
                      variant="outlined"
                      onClick={() => {
                        saveRecommendationsHandler();
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
                    >
                      <DialogContent>
                        <DialogContentText>
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
                                label="We met the Appraiser and agrred on the rating/s to be changed"
                              />
                              <FormControlLabel
                                value="Disagree"
                                control={<Radio />}
                                label="We met the Appraiser and disagrred on the rating/s"
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
