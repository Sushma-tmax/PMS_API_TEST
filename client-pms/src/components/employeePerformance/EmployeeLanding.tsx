import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Select,
  Stack,
  styled,
  Tab,
  TableContainer,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";

import React from "react";
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
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";
import { format } from 'date-fns'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {
  EMPLOYEE_DOWNLOAD,
  EMPLOYEE_REJECTS,
} from "../../constants/routes/Routing";
import { useEffect, useState } from "react";
import {
  useGetObjectiveDescriptionQuery,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useUpdateEmployeeAppraisalMutation,
  useAcceptAppraisalEmployeeMutation,
  useGetEmployeeAppraisalQuery,
  useGetRatingScaleQuery,
  useGetTrainingRecommendationQuery,
} from "../../service";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import { maxWidth, width } from "@mui/system";
import dayjs from "dayjs";
import Blueadd from "../../assets/appraiser/Reviewericons/Blueadd.svg";
import Blueminus from "../../assets/appraiser/Reviewericons/Blueminus.svg";
import MenuItem from "@mui/material/MenuItem";
import Downloadss from "../../assets/Images/Downloadss.svg";
import AlertDialogSuccess from "../UI/DialogSuccess";
import FeedbackQuestionnaireAppraiser from "./FeedbackQuestionnaireAppraiser";
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
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
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

const Text = styled("div")({

  "& .MuiInputBase-root": {

    backgroundColor: "#f8f8f8",
  },
  "& .MuiTextField-root": {
    width: "100%",
    // backgroundColor: "#f8f8f8",
    borderRadius: "5px",
  },
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "Arial",
    textTransform: "none",
    textAlign: "left"

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
    textAlign:"left"
  },
});
const Overallfeedbackss = styled("div")({
  // marginLeft: "25px",
  marginTop: "10px",
  color: "#3e8cb5",
  fontSize: "20px",

  fontFamily: 'Avenir semibold Italics',
  display: "flex",
  justifyContent: "center",
  fontStyle: "italic"
});

const Tf31 = styled("div")({
  // position: "absolute",
  width: "96%",

  // marginTop: "320px",

  "& .MuiInputBase-input": {
    // color: "rgb(51 51 51/50%)",
    fontSize: "14px",
    color: "#333333",
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    backgroundColor: "#f8f8f8",
    padding: "8px",
    borderRadius: "5px",
    minHeight: "50px",
    textAlign: "left"
  },
});

// const Train = styled("div")({
//   "& .MuiTextField-root": {
//     // color: "rgb(51 51 51/50%)",
//     fontSize: "14px",
//     color: "#333333",
//     textTransform: "none",
//     fontFamily: "Arial",
//     backgroundColor: "#f8f8f8",
//     borderRadius: "5px",
//     padding: "8px",
//     paddingRight: "0px"

//   },
// });
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
    // paddingRight:"0px",
    width:"96%"

    
  },
 "& .MuiInputBase-input": {
     color: "#333333",
   fontSize: "14px",
   fontFamily:"Arial",
     textAlign:"left",
    //  paddingRight:"8px"
   
   },
   "& .MuiInputBase-root": {
  backgroundColor:"#f8f8f8",
  padding:"3px"
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
    textAlign: "left"
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
const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
      fontSize: "14px !important",
      fontFamily: "arial !important",
      color: "#333333 !important"
    },
  },
};
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

export default function EmployeeLanding() {
  //mapping functionalities
  const { employee_id } = useParams();
  // console.log(employee_id ,'employee_id ')

  const { data } = useGetObjectiveTypeQuery("");
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const { data: objectiveDescData, isLoading: isLoadingDescription } =
    useGetObjectiveDescriptionQuery("");
  const { data: employeeData, isLoading } =
    useGetEmployeeAppraisalQuery(employee_id);
  console.log(employeeData, "employeeData");
  const { data: ratingData } = useGetRatingScaleQuery("");
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
    []
  );
  const [popoverIndex, setPopoverIndex] = useState<any>("");

  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [appraiserAreaofImprovement, setAppraiserAreaofImprovement] =
    useState<any>([]);
  // console.log(appraiserAreaofImprovement, "appraiserAreaofImprovement");
  const [
    appraiserTrainingRecommendations,
    setAppraiserTrainingRecommendations,
  ] = useState<any>([]);
  // console.log(
  //   appraiserTrainingRecommendations,
  //   " appraiserTrainingRecommendations"
  // );
  const [showAreaofImprovement, setShowAreaofImprovement] =
    useState<any>(false);
  const [showTrainingRecommendations, setShowTrainingRecommendations] =
    useState<any>(false);
  console.log(objectiveDescData, "objectiveDescData");
  console.log(objectiveTitleData, "objectiveTitleData");
  console.log(filterData, "filterData");
  const [SpecificArea, setSpecificArea] = React.useState<any>([]);
  const [employeeAgreevalue, setEmployeeAgreevalue] = React.useState("");
  let today: any = new Date()
  // let date = today.getDate() + '' + parseInt(today.getMonth() + 1) + '' + today.getFullYear()
  let date = today.getDate() + '' + parseInt(today.getMonth() + 1) + '' + today.getFullYear()
  // console.log(date, 'dateeeee')
  const [updateEmployee] = useUpdateEmployeeAppraisalMutation();
  const [moveTab, setMoveTab] = useState<any>(false)
  const [message, setMessage] = useState<any>("")
  // console.log(SpecificArea, "SpecificArea");
  // console.log(employeeData, "SpecificArea");
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
  const getObjectiveTypeName = (id: any) => {
    //console.log(id, " type");
    if (data) {
      return data.data.find((item: any) => {
        return id === item._id;
      });
    }
  };

 // console.log(employeeAgreevalue, "employeeAgreevalue");



  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(employeeAgreevalue, "employeeAgreevalue");
    // console.log("employeeAgreevalue");
    setEmployeeAgreevalue((event.target as HTMLInputElement).value);
  };

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      //console.log(id, "objectiveTitleData");
      return objectiveTitleData.data.find((item: any) => item._id === id);
    }
  };
  const findObjectiveTypeById = (id: any) => {
    if (employeeData) {
      return employeeData?.data?.reviewer?.objective_type?.find(
        (item: any) => item?.name?._id === id
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
              comments: i.comments,
              rating: i.ratings,
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
      setEmployeeComments(employeeData.data.employee.comments);
    }
  }, [employeeData, objectiveTitleData]);

  const [Training, setTraining] = React.useState<any>([]);
  //console.log(Training, "Trainingstate");
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setTraining(() => {
        return appraiserTrainingRecommendations.map((i: any) => {
          //console.log(i, "Training");
          return {
            ...i,
            name: i?.name,
            justification: i?.justification,
            trainingName: i?.training_name,
            // objective_title: findObjectiveTitleById(i.name.objective_title),
            // objective_type: findObjectiveTypeById(i.name.objective_type),
          };
        });
      });
    }
  }, [employeeData, objectiveTitleData, appraiserTrainingRecommendations]);

  // useEffect(() => {
  //   if (employeeData && objectiveTitleData) {
  //     setSpecificArea(() => {
  //       return employeeData?.data?.appraisal?.area_of_improvement?.flat().map(
  //         (i: any) => {
  //           console.log(i.specific_actions,'specific_actions')
  //           return {
  //             ...i,
  //             // values: i.specific_actions.value,
  //             // rating: i.ratings,
  //             // objective_title: findObjectiveTitleById(i.name.objective_title),
  //             // objective_type: findObjectiveTypeById(i.name.objective_type),
  //           };
  //         }
  //       );
  //     });
  //   }
  // }, [employeeData, objectiveTitleData]);

  // const getRatingDescription = (rating: any) => {
  //   let ratingValue = Math.round(rating);
  //   let ratingDataValue = ratingData?.data?.find(
  //     (item: any) => item?.rating == ratingValue
  //   );
  //   if (ratingDataValue) return ratingDataValue.rating_scale;
  //   else return "";
  // };
  //specific
  const [filterData1, setFilterData1] = useState([]);
  //console.group(filterData1, "filterData1");
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
  }, [employeeData]);
  //specific
  // const groupNameHandler = (name: any) => {
  //   if (name) {
  //     setFilterData(name);
  //   }
  // };

  // useEffect(() => {
  //   const group = _.groupBy(objectiveDescription, "objective_type.name");
  //   // console.log(Object.entries(group), 'group')
  //   const groupName = groupNameHandler(Object.entries(group));
  // }, [objectiveDescription]);

  // useEffect(() => {
  //   const group = _.groupBy(Training, "objective_type.name");
  //   // console.log(Object.entries(group), 'group')
  //   //const groupName = groupNameHandler(Object.entries(group));
  // }, [Training]);

  // console.log(employeeData?.data?.normalizer?.area_of_improvement?.specific_actions?.value, 'spec')
  // const [specificAction, setspecificAction] = useState([]);
  // useEffect(() => {
  //   const specific = employeeData?.data?.normalizer?.area_of_improvement[0]?.specific_actions.map((item: any) => {
  //     console.log(item, 'iiiiii')
  //     return item

  //   })
  //   console.log(specific, 'spec')
  //   setspecificAction(specific);
  // }, [employeeData]);

  //mapping functionalities

  const [value, setValue] = React.useState(0);
  const [employeeComments, setEmployeeComments] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {

    if (moveTab == true && value == 0) {
      setOpenSaved(true);
      setMessage("Please save the ratings before leaving the page.")
    }
    //  else if (employeeComments == "" || employeeComments == undefined){
    //   setOpenSaved(true);
    //   setMessage("Please add the Comments on the Recommendation page.")
    // }
    else if (moveTab == true && value == 1) {
      setOpenSaved(true);
      setMessage("Please save the recommendations before leaving the page.")
    }
    else {
      setValue(newValue);
    }

  };

  const backHandler = () => {
    if (moveTab == true && value == 1) {
      setOpenSaved(true);
      setMessage("Please save the recommendations before leaving the page.")
    } else {
      setValue(0);
    }
  }
  const [open, setOpen] = React.useState(false);
  const [employeeAgreesWithAppraiser, setEmployeeAgreesWithAppraiser] =
    React.useState(true);
  const [openSaved, setOpenSaved] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openValidation, setOpenValidation] = useState(false);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
  const [textfeildError, settextfeildError] = useState(false);

  const handleClickOpen = () => {
    if (employeeComments === "" || employeeComments == undefined) {
      setOpenValidation(true);
      setMessage("Please add employee comments in the recommendation tab.")
    } else {
      setOpen(true);
    }
  };

  const handleValidationClose = () => {
    setOpenValidation(false);
    setMessage("")
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSaved = () => {
    setOpenSaved(false);
    setMessage(false)
  };
  const handleCloseSuccess = () => {
    setOpenSuccess(false);
    // navigate(`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`);
    window.open(`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`, '_blank')
  };
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const theme1 = useTheme();
  const fullScreen1 = useMediaQuery(theme.breakpoints.down("md"));

  //console.log(employeeAgreesWithAppraiser, "employeeAgreesWithAppraiser");

  // to get rating description 
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingData?.data?.find(
      (item: any) => item?.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    // setValue(1)
  };
  const handleClose4 = () => {
    setOpen3(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const [open3, setOpen3] = React.useState(false);
  const theme3 = useTheme();

  const fullScreen3 = useMediaQuery(theme.breakpoints.down("md"));
  const [accept, { error, isError }] = useAcceptAppraisalEmployeeMutation();

  const handleClickOpen3 = () => {
    if (employeeComments === "") {
      setOpenValidation(true);
      setMessage("Please add the employee comments in the recommendation tab.")
    } else {
      setOpen3(true);
    }
  };

  const handleViewPA = () => {
    window.open(`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`, '_blank')
  }

  const getRatingsfromObjectiveDescription = (data: any) => {
    return data?.map((k: any) => {
      return {
        // ratings: k.ratings,
        rating_rejected: false,
        // rating_comments: "",
        // comments: ""
        name: k.name,
        value: k.value,
        ratings: k.ratings,
        level_1_isChecked: k.level_1_isChecked,
        level_2_isChecked: k.level_2_isChecked,
        level_3_isChecked: k.level_3_isChecked,
        level_4_isChecked: k.level_4_isChecked,
      };
    });
  };

  const getRatingsfromObjectiveDescriptionForAppraiser = (data: any) => {
    return data?.map((k: any) => {
      return {
        // ratings: k.ratings,
        rating_rejected: false,
        remarks: k.remarks,
        comments: k.comments,
        name: k.name,
        value: k.value,
        ratings: k.ratings,
        level_1_isChecked: k.level_1_isChecked,
        level_2_isChecked: k.level_2_isChecked,
        level_3_isChecked: k.level_3_isChecked,
        level_4_isChecked: k.level_4_isChecked,
      };
    });
  };

  // console.log(
  //   employeeData?.data?.normalizer?.objective_description,
  //   "employee_landing"
  // );

  const handleClose3 = () => {

    setOpen3(false);
    let trainingRecommendationValues = formValues.filter(
      (item: any) => item.name != ""
    );
    let ratingValues = [];
    // if (employeeData.data.employee.objective_description.length == 0) {
    //   let temp = employeeData.data.normalizer.objective_description;
    //   ratingValues = temp.map((item: any) => {
    //     return { ...item, rating_rejected: false };
    //   });
    // }
    // else ratingValues = employeeData.data.employee.objective_description;

    const rate = employeeData.data.normalizer.objective_description.map(
      (j: any) => {
        return {
          ...j,
          ratings: j.ratings,
          rating_rejected: false,
          rating_comments: "",
          comments: "",
        };
      }
    );
    updateEmployee({
      "employee.objective_description": getRatingsfromObjectiveDescription(
        employeeData.data.normalizer.objective_description
      ),
      "appraisal.status": "rejected",
      // "employee.employee_status": "rejected",
      "appraisal.objective_description": getRatingsfromObjectiveDescriptionForAppraiser(
        employeeData.data.appraisal.objective_description
      ),
      id: employee_id,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": area,
      "employee.comments": employeeComments,
      "employee.employee_agree": employeeAgreesWithAppraiser,
    });
    // setnavPrompt(false)
    navigate(`${EMPLOYEE_REJECTS}/employee/${employee_id}`);
  };

  const acceptHandler = () => {
    accept(employee_id);
    handleClose1();
    let trainingRecommendationValues = formValues.filter(
      (item: any) => item.name != ""
    );
    let ratingValues = [];
    if (employeeData.data.employee.objective_description.length == 0) {
      let temp = employeeData.data.normalizer.objective_description;
      ratingValues = temp.map((item: any) => {
        return { ...item, rating_rejected: false };
      });
    } else ratingValues = employeeData.data.employee.objective_description;

    updateEmployee({
      "employee.objective_description": getRatingsfromObjectiveDescription(
        employeeData.data.normalizer.objective_description
      ),
      "appraisal.status": "completed",
      "employee.employee_status": "accepted",
      id: employee_id,
      "employee.employee_rating": employeeData.data.normalizer.normalizer_rating,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": area,
      "employee.comments": employeeComments,

    });
    // handleClose1();
    // handleClose();
    setOpenSuccess(true);
  };

  const saveRecommendationsHandler = () => {
    let trainingRecommendationValues = formValues.filter(
      (item: any) => item.name != ""
    );
    let specificAreas = area.filter(
      (item: any) => item.value != ""
    );
    
     if (employeeComments == "" || employeeComments == undefined){
        setOpenSaved(true);
        setMessage("Please add the Comments on the Recommendation page.")
      }else {
        updateEmployee({
          id: employee_id,
          "employee.training_recommendation": trainingRecommendationValues,
          "employee.area_of_improvement": specificAreas,
          "appraisal.area_of_improvement": appraiserAreaofImprovement,
          "appraisal.training_recommendation": appraiserTrainingRecommendations,
          "employee.comments": employeeComments,
        });
    setOpenSaved(true);
    setMoveTab(false);
    setMessage("Changes have been saved.")
      }
  };

  const handleRejectRadioChange = (event: any) => {
    setEmployeeAgreesWithAppraiser(event.target.value);

    // navigate(`${EMPLOYEE_REJECTS}/employee/${employee_id}`);
  };

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
    //console.log("clicked");
    // setImprovementList([...improvementList, {improvement: ""}])
    // setarea([...area, {value: "", specific_actions: []}])
    return setarea((prevState: any) => {
      //console.log(...prevState, "area item");

      const toSpread = {
        id: Date.now(),
        value: "",
        specific_actions: [{ value: "" }],
      };

      const newArea = [...prevState, toSpread];
      //console.log(newArea, "newArea");

      return newArea;
    });
  };

  const [area, setarea] = useState<any>([
    {
      id: Date.now(),
      value: "",
      specific_actions: [{ value: "" }],
    },
  ]);
  //console.log(area, "areasubmit");
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
    //console.log(name, "name value");

    // @ts-ignore
    setarea((prevState: any) => {
      //console.log(prevState, "prevState");
      const { specific_actions: test } = prevState[0];

      return prevState.map((item: any) => {
        //console.log(item, "item");
        return {
          value: item.value,
          specific_actions: [...item.specific_actions, { value: "" }],
        };
      });
    });
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
  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo7 = Boolean(anchorEl9);

  const id7 = openInfo7 ? "simple-popover" : undefined;
  const handleClickInfo7 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl9(event.currentTarget);
  };
  const handleCloseInfo7 = () => {
    setAnchorEl9(null);
  };

  const [trainingSelectValue, setTrainingSelectValue] = useState<any>([])

  useEffect(()=>{
    if (employeeData) {
    setTrainingSelectValue(employeeData.data.appraisal_template.training_recommendation)
    }
  },[employeeData])
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
  //console.log(formValues, "formValues");
  const handleTrainingChange = (i: any, e: any) => {
    // setnavPrompt(true)
    const newFormValues = [...formValues];
    //@ts-ignore
    newFormValues[i][e.target.name] = e.target.value;
    setFormValues(newFormValues);
  };
  //adding training recommendation

  // Function to update employee comments in appraiser area of improvement
  const employeeAreaCommentsChangeHandler = (i: any, e: any) => {
    let temp = appraiserAreaofImprovement;
    temp = temp.map((item: any) => {
      // console.log(i[0], item, "tester");
      return i[0]._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
    // console.log(temp, "testertemp");
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

  // function to update employee training recommendation

  useEffect(() => {
    if (employeeData) {
      // console.log(employeeData?.data?.employee?.training_recommendation, 'training')
      setFormValues(() => {
        return employeeData.data.employee.training_recommendation.map(
          (i: any) => {
            // console.log(i, "Training");
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
  }, [employeeData])

  // condition to display employee training recommendation

  useEffect(() => {
    if (formValues && formValues.length > 0) {
      setShowTrainingRecommendations(true);
    } else {
      setShowTrainingRecommendations(false);
    }
  }, [formValues])

  const showTrainingHandler = () => {
    let temp = showTrainingRecommendations;
    setShowTrainingRecommendations(!temp);
  }

  // function to update employee Areas

  useEffect(() => {
    if (employeeData) {
      // console.log(employeeData?.data?.employee?.area_of_improvement, 'training')
      setarea(employeeData?.data?.employee?.area_of_improvement)
    }
  }, [employeeData])

  // function to display employee area of improvement

  useEffect(() => {
    if (area && area?.length > 0) {
      setShowAreaofImprovement(true)
    } else {
      setShowAreaofImprovement(false)
    }
  }, [area])


  const getPAStatus = (data: any) => {
    if (data?.appraisal?.status == "completed") {
      return "Completed"
    } else if (data?.appraisal?.status == "rejected") {
      return "Rejected"
    } else if (data?.employee?.employee_status == "pending") {
      return "Pending with Employee"
    } else if (data?.appraisal?.appraisal_status == "appraiser-accepted-employee") {
      return "Pending with Normalizer"
    } else if (data?.appraisal?.appraiser_status == "employee-rejected") {
      return "Pending with Appraiser"
    }
  }
  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;
  const handleClick8 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl8(event.currentTarget);
  };
  const handleClose8 = () => {
    setAnchorEl8(null);
  };
  const getAttachments = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.attachments
      .filter((i: any) => i?.objective_description == id)
      // .filter((i: any) => i?.objective_description === j.name._id)
      .map((k: any) => {
        // console.log(k, "zzzzz");
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
    <div
      style={{
        backgroundColor: "#F1F1F1",
        minHeight: "100px",
        overflow: "hidden",
        // height:"100%"
      }}
    >
      {/* <Container
        sx={{
          maxWidth: "96.5% !important",
          backgroundColor: "#ebf1f5",
        }}
      ></Container> */}
      <Container
        sx={{
          // paddingLeft:"0px !important",
          // paddingRight:"0px !important",
          maxWidth: "95% !important",
          // height: "1308px",
          background: "#fff",
          marginTop: "35px",
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
            direction="row" alignItems="center" justifyContent="space-between" paddingBottom="10px"
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
              {/* <Link to={`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`}> */}
              <Button
                variant="outlined"
                size="small"
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  marginRight: "65px"
                }}
              >
                <img src={Downloadss} alt="Download" />
                <label style={{ paddingLeft: "5px",
                  cursor: "pointer",
                 }}
                  onClick={() => {
                    handleViewPA();
                  }}> View PA </label>
              </Button>
              {/* </Link> */}
            </span>
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
                    />{" "}
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
              </Grid>
              {employeeData?.data?.appraisal?.status != "not-started" && (
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
                      <label style={{ paddingLeft: "5px" }}> Download</label>
                    </Button>
                  </Link>
                </Grid>
              )}
            </Grid>
          </Box> */}
          <Typography
            sx={{
              display: "flex",
              justifyContent: "end",
              color: "#52C8F8",
              fontSize: "13px",
              fontFamily: "Arial",
              paddingRight: "10px",
            }}
          >
            {/* View Previous PA */}
          </Typography>
          <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "20px", marginRight: "63px" }}>
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
                      {employeeData?.data?.normalizer?.normalizer_rating}
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
                        </div> */}
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
                {/* <Stack direction="row" alignItems="baseline" gap="326px"> */}
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
                    
                  }}
                >
                  PA Status : <span>{employeeData?.data?.appraisal?.status === "in-progress" ? "In-progress" :
                    employeeData?.data?.appraisal?.status === "not-started" ? "Not-started" :
                      employeeData?.data?.appraisal?.status} </span>
                </Typography> */}
                {/* </Stack> */}
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

              </Grid>
              <Grid item xs={4}>
                {employeeData?.data?.appraisal?.status != "not-started" &&
                  employeeData?.data?.appraisal_template?.potential && (

                    <Stack direction="column" paddingRight="14px" alignItems="flex-end">
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

                  )}
              </Grid>
            </Stack>
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
          {employeeData?.data?.appraisal?.status == "not-started" && (
            <div>
              <Typography
                style={{
                  color: "#717171",
                  marginTop: "8px",
                  fontSize: "16px",
                  fontFamily: "Arial",
                }}
              >
                Performance Appraisal has not started!
              </Typography>
            </div>
          )}
          {employeeData?.data?.appraisal?.status != "not-started" && (
            <>
              <Box>
                <Box sx={{ borderBottom: 1, borderColor: "divider", marginRight: "64px" }}>
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
                        border:"1px solid #3e8cb59e",
                    maxHeight:"0px",
                    minHeight:"48px",
                    paddingRight: "15px",
                    paddingLeft:"20px",
                        fontWeight: "700",
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
                        border:"1px solid #3e8cb59e",
                    paddingLeft:"20px",
                    paddingRight:"20px",
                        fontWeight: "700",
                      }}
                      label="Recommendations"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                  {/* </Color> */}
                </Box>
                <TabPanel value={value} index={0}>
                  <div style={{ marginRight: "65px" }} >
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
                              Objective <br></br>Type
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
                              Objective <br></br>Title
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
                                    <Scrollbar style={{ width: "100%", height: "225px" }}>
                                      <Table
                                        sx={{ minWidth: 200 }}
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
                                          {ratingData &&
                                            ratingData.data
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
                              Appraiser <br></br>Comments
                            </TableCell>
                            {employeeData?.data?.appraisal?.status == "completed" &&
                              employeeData?.data?.normalizer?.normalizer_status == "re-normalized" && (
                                <>
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
                                    Employee<br/> Ratings
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
                                    Employee<br/> Comments
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
                                    Normalizer<br/> Ratings
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
                                    Normalizer<br/> Comments
                                  </TableCell>
                                </>)}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {employeeData &&
                            objectiveTitleData &&
                            objectiveDescription.map((j: any, index: any) => {
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
                                      width="150px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word"
                                      }}
                                      align="left"
                                    // rowSpan={3}
                                    >
                                      {j.objective_type?.name?.name}
                                    </TableCell>
                                    <TableCell
                                      width="150px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word"

                                        // fontFamily: "regular"
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
                                        textAlign: "center"
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
                                                <ul >
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
                                                <ul style={{marginBottom:"0px",marginTop:"0px"}}>
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
                                                <ul style={{marginBottom:"0px",marginTop:"0px"}}>
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
                                                <ul style={{marginBottom:"0px",marginTop:"0px"}}>
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
                                                // console.log(
                                                //   k?.ratings?.rating,
                                                //   "k.ratings.rating"
                                                // );
                                                // setcompvalue(k.ratings.rating)
                                                if (k.ratings)
                                                  return k?.ratings?.rating;
                                              })[0]}
                                        </span>
                                        {/* <span
                                    style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                    {j.ratings && j.ratings.rating_scale}
                                  </span> */}
                                      </Stack>
                                    </TableCell>
                                    <TableCell
                                      width="200px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word"
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
                                        fontSize: "14x",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word",
                                      }}
                                    >
                                        {(j?.comments == "" || j.comments == undefined) ? j.remarks : j.comments}
                                        </span>
                                        {employeeData && getAttachments(j?.name?._id)?.length > 0 && j.comments !== "" &&

                                          <AttachFileIcon
                                            style={{
                                              color: "#93DCFA",
                                              height: "18px",
                                              transform: "rotate(30deg)",
                                              cursor: 'pointer'
                                            }}
                                            onClick={(e: any) => {
                                              handleClick8(e)
                                              setPopoverIndex(index)
                                            }}
                                            aria-describedby={"id8"}

                                          />
                                        }
                                        <Popover
                                          id={id8}
                                          open={(popoverIndex === index) && open8}
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
                                                      {/* <IconButton> */}
                                                      {/* <img 
                                                style={{cursor:'pointer'}}
                                                src={Removeattnew}
                                                  onClick={() => deleteAppraiserMutation({
                                                    employee_id: employee_id,
                                                    name: k.remove
                                                  })} /> */}
                                                      {/* </IconButton> */}
                                                    </Stack>

                                                  </Stack>
                                                </>
                                              )
                                            })}
                                          </div>
                                        </Popover>
                                      </Stack>
                                    </TableCell>
                                    {employeeData?.data?.appraisal?.status == "completed" &&
                                      employeeData?.data?.normalizer?.normalizer_status == "re-normalized" && (

                                        <>
                                          <TableCell
                                          width="10px"
                                            sx={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                              wordBreak: "break-word",
                                            }}
                                            align="center"
                                          >
                                            {employeeData &&
                                              employeeData?.data?.employee?.objective_description
                                                .filter(
                                                  (i: any) =>
                                                    i?.name?._id === j?.name?._id
                                                )
                                                .map((k: any) => {
                                                  // console.log(
                                                  //   k?.ratings?.rating,
                                                  //   "k.ratings.rating"
                                                  // );
                                                  // setcompvalue(k.ratings.rating)
                                                  if (k.ratings)
                                                    return k?.ratings?.rating;
                                                })[0]}
                                          </TableCell>
                                          <TableCell
                                          width="200px"
                                            sx={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                              wordBreak: "break-word"
                                            }}
                                            align="left"
                                          >
                                            {employeeData &&
                                              employeeData?.data?.employee?.objective_description
                                                .filter(
                                                  (i: any) =>
                                                    i?.name?._id === j?.name?._id
                                                )

                                                .map((k: any) => {
                                                  // console.log(
                                                  //   employeeData?.data?.employee
                                                  //     ?.objective_description,
                                                  //   "data"
                                                  // );
                                                  //console.log(k?.comments, "remarks");
                                                  return k?.comments;
                                                })[0]}
                                          </TableCell>
                                          <TableCell
                                          width="10px"
                                            sx={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                              wordBreak: "break-word"
                                            }}
                                            align="center"
                                          >
                                            {employeeData &&
                                              employeeData?.data?.normalizer?.objective_description
                                                .filter(
                                                  (i: any) =>
                                                    i?.name?._id === j?.name?._id
                                                )
                                                .map((k: any) => {
                                                  // console.log(
                                                  //   k?.ratings?.rating,
                                                  //   "k.ratings.rating"
                                                  // );
                                                  // setcompvalue(k.ratings.rating)
                                                  if (k.ratings)
                                                    return k?.ratings?.rating;
                                                })[0]}
                                          </TableCell>
                                          <TableCell
                                          width="200px"
                                            sx={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                            }}
                                            align="left"
                                          >
                                            {employeeData &&
                                              employeeData?.data?.normalizer?.objective_description
                                                .filter(
                                                  (i: any) =>
                                                    i?.name?._id === j?.name?._id
                                                )

                                                .map((k: any) => {
                                                  // console.log(
                                                  //   employeeData?.data?.normalizer
                                                  //     ?.objective_description,
                                                  //   "data"
                                                  // );
                                                  //console.log(k?.comments, "remarks");
                                                  return k?.comments;
                                                })[0]}
                                          </TableCell>
                                        </>
                                      )}
                                  </TableRow>
                                </>
                              );
                            })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                
                  <div
                    style={{
                      // margin: "50px",
                      // paddingLeft: "600px",
                      display: "flex",
                      alignItems: "center",
                      // backgroundColor: "#FFFBF2",
                      justifyContent: "center",
                      // paddingTop: "33px",
                      height: "125px",
                      width: "100%",
                      // marginLeft: "auto",
                    }}
                  >
                    {/* appraisal.status != completed && appraisal.appraiser_status != "appraiser_accepted_employee" 
                    "The performance appraisal has been already submitted."
                     "Your final performance appraisal rating after mediation has been finalized by the Normalizer."*/}
                    {(employeeData?.data?.employee?.employee_status == "pending") ?
                      (
                        <>
                          <Button
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              marginRight: "16px",
                              background: "transparent",
                              width: "70px",
                              height: "35px",
                            }}
                            variant="outlined"
                            onClick={handleClickOpen}
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
                              color: "#3e8cb5",
                              background: "transparent",
                              width: "70px",
                              height: "35px",
                            }}
                            variant="outlined"
                            onClick={handleClickOpen3}
                          >
                            Reject
                          </Button>
                        </>
                      )

                      : "The performance appraisal has been already submitted."
                      // (employeeData?.data?.appraisal?.status !== "completed" &&
                      //   employeeData?.data?.normalizer?.normalizer_status == "re-normalized") ?
                      //   ("Your final performance appraisal rating after mediation has been finalized by the Normalizer.") : (
                      //     <Button
                      //       style={{
                      //         textTransform: "none",
                      //         fontSize: "15px",
                      //         fontFamily: "Arial",
                      //         borderColor: "#3E8CB5",
                      //         marginRight: "16px",
                      //         background: "transparent",
                      //         width: "70px",
                      //         height: "35px",
                      //       }}
                      //       variant="outlined"
                      //       onClick={handleClickOpen}
                      //     >
                      //       {" "}
                      //       Accept
                      //     </Button>
                      //   )

                    }

                    <AlertDialogSuccess
                      isAlertOpen={openValidation}
                      handleAlertClose={handleValidationClose}>
                      {message}
                    </AlertDialogSuccess>

                    <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
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
                    // sx={{
                    //   width: "75%",
                    //   margin: "auto",
                    //   textAlign: "center",
                    //   paddingTop: "25px",
                    // }}
                    >
                      <DialogContent >
                        {/* style={{padding:"0px"}} */}
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
                          Did you have One-on-One meeting with the Appraiser?
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
                              background: "transparent",
                              width: "70px",
                              height: "35px",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={() => {
                              handleClickOpen1();
                              handleClose();
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
                              width: "70px",
                              height: "35px",
                            }}
                            variant="outlined"
                            onClick={() => {
                              handleClickOpen2();
                              handleClose();
                            }}
                            autoFocus
                          >
                            No
                            {/* first no button */}
                          </Button>
                        </DialogActions>
                      </div>
                    </Dialog>
                    <Dialog
                      fullScreen={fullScreen}
                      open={open1}
                      onClose={handleClose1}
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
                    // sx={{
                    //   "& .MuiDialog-container": {
                    //     "& .MuiPaper-root": {
                    //       width: "34.5%",
                    //       height: " 115px",
                    //       // Width: "600px",

                    //       // maxHeight: "600PX",  // Set your width here
                    //     },
                    //   },
                    // }}
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
                            autoFocus
                            onClick={acceptHandler}
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
                              width: "70px",
                              height: "35px",
                            }}
                            variant="outlined"
                            //onClick={handleClose1}
                            onClick={() => {
                              handleClose1();
                              setValue(1);
                            }}
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </div>
                    </Dialog>
                    <Dialog
                      fullScreen={fullScreen}
                      open={openSuccess}
                      onClose={handleCloseSuccess}
                      aria-labelledby="responsive-dialog-title"
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
                    // sx={{
                    //   "& .MuiDialog-container": {
                    //     "& .MuiPaper-root": {
                    //       width: "34.5%",
                    //       height: " 115px",
                    //       // Width: "600px",

                    //       // maxHeight: "600PX",  // Set your width here
                    //     },
                    //   },
                    // }}
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
                          Your Performance Appraisal has been submitted successfully.
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
                              // marginRight: "10px",
                              color: "3E8CB5",
                              background: "transparent",
                              width: "70px",
                              height: "35px",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={handleCloseSuccess}
                          >
                            Ok
                          </Button>
                        </DialogActions>
                      </div>
                    </Dialog>
                    <Dialog
                      //  PaperComponent={PaperComponent}
                      fullScreen={fullScreen}
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
                      // sx={{
                      //   "& .MuiDialog-container": {
                      //     "& .MuiPaper-root": {
                      //       // width: "100%",
                      //       height: " 170px",
                      //       maxWidth: "550px",
                      //       // maxHeight: "600PX",  // Set your width here
                      //     },
                      //   },
                      // }}
                      open={open2}
                      onClose={handleClose2}
                      aria-labelledby="responsive-dialog-title"
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
                          Please ensure to discuss your performance rating with
                          the Appraiser.
                        </DialogContentText>
                        {/* <DialogContentText textAlign='center'>
                            <Button
                              style={{
                                textTransform: "none",
                                fontSize: "15px",
                                color: "#FFA801",

                                fontFamily: "sans-serif",
                                borderColor: "#FFA801",
                              }}
                              variant="outlined"
                              onClick={handleClose}
                            >Close</Button>
                          </DialogContentText> */}
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
                              // marginRight: "10px",
                              background: "transparent",
                              width: "70px",
                              height: "35px",
                              color: "#3e8cb5"
                            }}
                            variant="outlined"
                            autoFocus
                            // onClick={handleClose}
                            onClick={handleClose2}
                          >
                            Close
                          </Button>
                        </DialogActions>
                      </div>
                    </Dialog>

                    <Dialog
                      fullScreen={fullScreen3}
                      open={open3}
                      onClose={handleClose4}
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
                            textAlign: "justify",
                            wordBreak: "break-word",
                            // height: "100px",
                            alignItems: "center",
                            overflowY: "hidden",
                          }}
                        >
                          <FormControl>
                            <RadioGroup
                              aria-labelledby="demo-radio-buttons-group-label"
                              defaultValue={true}
                              name="radio-buttons-group"
                              onChange={(e) => {
                                handleRejectRadioChange(e);
                              }}
                            >
                              <FormControlLabel
                                // style={{
                                //   color: "#333333",
                                //   fontSize: "14px",
                                //   fontFamily: "Arial",
                                // }}
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  },
                                }}
                                value={true}
                                control={<Radio />}
                                label="I met the Appraiser and agreed on changing the ratings"
                              />
                              <FormControlLabel
                                // style={{
                                //   color: "#333333",
                                //   fontSize: "14px",
                                //   fontFamily: "Arial",
                                // }}
                                sx={{
                                  "& .MuiFormControlLabel-label": {
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  },
                                }}
                                value={false}
                                // onChange={(e) => {
                                //   handleRejectRadioChange(e);
                                // }}
                                control={<Radio />}
                                label="I met the Appraiser and disagreed on the ratings"
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
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              color: "#3e8cb5",
                              // marginRight: "10px",
                              background: "transparent",
                              width: "70px",
                              height: "35px",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={handleClose3}
                          >
                            Ok
                          </Button>

                          {/* <Button
                        style={{
                          textTransform: "none",
                          fontSize: "15px",
                          fontFamily: "Arial",
                          borderColor: "#3E8CB5",
                          marginRight: "10px",
                        }}
                        variant="outlined"
                        onClick={handleClose4}
                        autoFocus
                      >
                        No
                      </Button> */}
                        </DialogActions>
                      </div>
                    </Dialog>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>

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
                        fontSize: "31px",
                        lineHeight: "22px",
                        padding: "0px 2px",
                        color: "#333333"
                      }}
                    >
                      "
                    </span>
                    Please review the recommendation section and add your comments.
                    <span style={{
                      fontSize: "31px",
                      lineHeight: "22px",
                      padding: "0px 2px",
                      color: "#333333"
                    }}>"</span> </Overallfeedbackss> */}
                  <div style={{ marginRight: "65px" }}>

                 <FeedbackQuestionnaireAppraiser/>
                 
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="baseline"
                      height="20px"
                      marginBottom="10px"
                      paddingTop="20px"
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
                            if (area.length == 0)
                              handleImprovementAdd()
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
                          {/* <img src={Blueadd} alt="icon" />
                      <img src={Blueminus} alt="icon" /> */}
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
                            // console.log(i, "123");
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
                                      wordBreak: "break-word"
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
                                      wordBreak: "break-word"
                                    }}
                                  >
                                    {/* {j.value} */}
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
                                    {/* {i?.normalizer?.area_of_improvement?.specific_actions?.value} */}
                                  </TableCell>
                                  {/* <TableCell
                                    width="350px"
                                  >
                                    <Tf31>
                                      <TextField
                                        fullWidth
                                        autoComplete="off"
                                        multiline
                                        size="small"
                                        placeholder="Add"
                                        name="employeeAreaComments"
                                        defaultValue={i[1][0].employee_comments}
                                        inputProps={{ maxLength: 512 }}
                                        onChange={(e: any) => {
                                          employeeAreaCommentsChangeHandler(
                                            i[1],
                                            e
                                          );
                                          setMoveTab(true);
                                        }}
                                        // key={index}
                                        // value={
                                        //   area[index].specific_actions[index1]
                                        //     .value
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
                      {/* <div style={{ paddingTop: "20px", color: "#717171", paddingBottom: "7px" }}>
                    Employee Area(s) of Improvement
                  </div> */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        height="20px"
                        // paddingBottom = "5px"
                        paddingTop="20px"
                      >
                        <div
                          style={{
                            color: "#717171",
                            fontSize: "16px",
                            fontFamily: "Arial",
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
                            {/* <TableCell>

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
                                  {/* <Typo4>
                      <p> Area(s) of improvement (if any)</p>
                    </Typo4> */}
                                  <TableCell
                                  // style={{
                                  //   width: "32.5%",
                                  //   paddingTop: "0px",
                                  //   paddingLeft: "0px",
                                  //   paddingRight: "0px",
                                  //   paddingBottom: "0px",
                                  // }}
                                  >
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
                                          disableUnderline: true, // <== added this
                                        }}
                                        onChange={(e) => {
                                          setarea(
                                            area.map(
                                              (previousState: any, ix: any) => {
                                                // console.log(area, "areaaaaaa");
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
                                                // console.log(j, "console");
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
                                                          size="small"
                                                          placeholder="Add"
                                                          name="specificAction"
                                                          // key={index}
                                                          value={
                                                            area[index]
                                                              .specific_actions[
                                                              index1
                                                            ].value
                                                          }
                                                          inputProps={{
                                                            maxLength: 500,
                                                          }}
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
                                                                    // value: e.target.value
                                                                  };
                                                                }

                                                                //     ix === index
                                                                //         ? {
                                                                //             ...i,
                                                                //             values: e.target.value,
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
                                      <Tooltip title="Add" >
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
                                      </Tooltip>
                                    </Stack>
                                    {improvementList.length !== index + 1 && (
                                      // (<IconButton onClick={() => handleImprovementRemove(index)}><RemoveIcon />Remove</IconButton>)
                                      <Stack
                                        direction="row"
                                        alignItems="center"
                                        // width="100px"
                                        // marginLeft="25px"
                                        // marginTop="18px"
                                        spacing={0}
                                      >
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
                                            <img src={Blueminus} alt="icon" />
                                          </Addmore>
                                        </Tooltip>
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
                      alignItems="baseline"
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
                          justifyContent: "left",
                          alignItems: "left",
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
                            showTrainingHandler();
                            if (formValues.length == 0)
                              addFormFields()
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
                            // width="25%"
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
                            // width="25%"
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
                            // width="25%"
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
                            // width="25%"
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
                                    wordBreak: "break-word"
                                  }}
                                >
                                  {j.name.title}
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
                                    wordBreak: "break-word"
                                  }}
                                >
                                  {j.training_name}
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
                                  {j.justification}
                                </TableCell>
                                {/* <TableCell> {employeeData?.data?.normalizer?.training_recommendation[0]?.name.title}</TableCell>
                    <TableCell>{employeeData?.data?.normalizer?.training_recommendation[0]?.training_name}</TableCell>
                    <TableCell >
                      {employeeData?.data?.normalizer?.training_recommendation[0]?.justification}
                    </TableCell> */}
                                {/* <TableCell
                                  width="350px"
                                  align="left">
                                  <Tf31>
                                    <TextField
                                      fullWidth
                                      autoComplete="off"
                                      multiline
                                      size="small"
                                      placeholder="Add"
                                      name="employeeTrainingComments"
                                      value={j.employee_comments}
                                      inputProps={{ maxLength: 512 }}
                                      onChange={(e: any) => {
                                        employeeTrainingCommentsChangeHandler(
                                          j,
                                          e
                                        );
                                        setMoveTab(true);
                                      }}
                                      // key={index}
                                      // value={
                                      //   area[index].specific_actions[index1]
                                      //     .value
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
                        paddingTop="20px"
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

                      <Table size="small" style={{
                        marginTop: "10px",
                        // maxWidth: "99%" 
                      }}>
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
                                // style={{ width: "200px" }}
                                >
                                  {/* {item.name.title} */}
                                  <Train>
                                    <Stack direction={"row"}> 
                                    <Select
                                      sx={{
                                        boxShadow: 'none',
                                        '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                        background: "f8f8f8"
                                      }}


                                      // select
                                      fullWidth
                                      autoComplete="off"
                                      // label="Add  Name"
                                      // label="Select"
                                      placeholder="Select"
                                      size="small"
                                      displayEmpty
                                      // label="Select"
                                      // id="outlined-select-select"
                                      // label="Add  Name"
                                      // size="large"
                                      name="name"
                                      value={element.name || ""}
                                      renderValue={
                                        element.name !== ""
                                          ? undefined
                                          : () => <div style={{ color: "#aaa" }}>Select</div>
                                      }
                                      // variant="standard"
                                      // InputProps={{
                                      //   disableUnderline: true,
                                      // }}
                                      MenuProps={MenuProps}
                                      onChange={(e) => {
                                        handleTrainingChange(index, e);
                                        setMoveTab(true)
                                      }
                                      }
                                    >
                                      {employeeData &&
                                        employeeData.data.appraisal_template.training_recommendation.map(
                                          (training: any) => {
                                            return (
                                              <MenuItem
                                                style={{
                                                  fontSize: "14px",
                                                  fontFamily: "arial",
                                                  color: "#333333"
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
              anchorEl={anchorEl9}
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
                                      //     // marginBottom:"5%",
                                      //   },
                                      // }}
                                      multiline
                                      fullWidth
                                      autoComplete="off"
                                      placeholder="Add"
                                      // label="Add"
                                      // size="large"
                                      name="training_name"
                                      value={element.training_name || ""}
                                      inputProps={{ maxLength: 500 }}
                                      onChange={(e) => {
                                        handleTrainingChange(index, e);
                                        setMoveTab(true)
                                      }
                                      }
                                      variant="standard"
                                      InputProps={{
                                        disableUnderline: true, // <== added this
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
                                      //     // marginBottom:"5%",
                                      //     // "&.Mui-focused": {
                                      //     //   marginLeft: 0
                                      //     // }
                                      //   },
                                      // }}
                                      multiline
                                      fullWidth
                                      autoComplete="off"
                                      placeholder="Add"
                                      // label="Add"
                                      // placeholder="Add Justification"
                                      // size="large"
                                      name="justification"
                                      id="outlined-select-select"
                                      value={element.justification || ""}
                                      inputProps={{ maxLength: 500 }}
                                      onChange={(e) => {
                                        handleTrainingChange(index, e);
                                        setMoveTab(true)
                                      }
                                      }
                                      variant="standard"
                                      InputProps={{
                                        disableUnderline: true, // <== added this
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
                                            // marginTop: "15px",
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
                                          minWidth: "0px",
                                          textDecoration: "underline",
                                          color: "#3e8cb5",
                                          fontSize: "14px",
                                          // marginTop: "15px",
                                        }}
                                        onClick={() => removeFormFields(index)}
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
                      color: "#717171",
                      paddingTop: "20px",
                      fontFamily: "arial"
                    }}
                  >
                    <b>Appraiser Overall Feedback</b>
                  </Typography>
                  <Typography
                    style={{
                      fontSize: "14px",
                      fontFamily: "arial",
                      color: "#333333",
                      paddingTop: "10px",
                      wordBreak: "break-word",
                      // width: "94.6%"
                      marginRight: "65px"
                    }}
                  >

                    <Tf1>
                      <TextField
                        fullWidth
                        InputProps={{ readOnly: true, }}
                        multiline
                        inputProps={{ maxLength: 500 }}
                        size="small"
                        value={
                          employeeData?.data?.appraisal?.appraiser_overall_feedback
                        }
                      />
                    </Tf1>

                  </Typography>

                  <Typography
                    style={{
                      fontSize: "16px",
                      color: "#717171",
                      paddingTop: "20px",
                      paddingBottom: "10px",
                      fontFamily: "arial"
                    }}
                  >
                    <b>Employee Comments</b>
                  </Typography>
                  <div style={{ marginRight: "65px" }}>
                    <Text>
                      <TextField
                        // sx={{maxWidth:"95%"}}
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
                            ? "*Employee comments are required."
                            : " "
                        }
                      // variant="standard"
                      // InputProps={{
                      //   disableUnderline: true, // <== added this
                      // }}
                      />
                    </Text>
                  </div>
                  {/* <div
                style={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "right",
                }}
              >
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
                  }}
                  onClick={() => addFormFields()}
                >
                  Add
                </Button>
               
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
                  }}
                  onClick={() => addFormFields()}
                >
                  Remove
                </Button>
              </div> */}


                  <div
                    style={{
                      // fontSize: "22px",
                      fontFamily: " Arial, Helvetica, sans-serif",
                      // margin: "50px",
                      // paddingLeft: "600px",
                      display: "flex",
                      alignItems: "center",
                      // backgroundColor: "#FFFBF2",
                      justifyContent: "center",
                      // paddingTop: "33px",
                      height: "125px",
                      width: "100%",
                      // marginLeft: "auto",
                    }}
                  >
                   
                    {(employeeData?.data?.employee?.employee_status == "pending") ?

                      (
                        <>
                          <Button
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              color: "#3E8CB5",
                              marginRight: "16px",
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
                            // onClick={handleClickOpen3}
                            onClick={() => {
                              backHandler();
                              // setValue(0);
                              // saveRecommendationsHandler();
                            }}
                          >
                            Back
                          </Button>
                        </>
                      )
                      : "The performance appraisal has been already submitted."
                    }

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
                    <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
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
                          Did you have One-on-One meeting with the
                          Appraiser?
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
                              background: "transparent",
                              height: "35px",
                              width: "70px",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={handleClickOpen1}
                          >
                            Yes
                          </Button>
                          <Button
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              marginLeft: "16px",
                              borderColor: "#3E8CB5",
                              color: "#3E8CB5",
                              background: "transparent",
                              height: "35px",
                              width: "70px",
                            }}
                            onClick={handleClose}
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
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              background: "transparent",
                              height: "35px",
                              color: "#3E8CB5",
                              width: "70px",
                            }}
                            variant="outlined"
                            autoFocus
                            onClick={handleClose1}
                          >
                            Yes
                          </Button>

                          <Button
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              marginLeft: "16px",
                              borderColor: "#3E8CB5",
                              color: "#3E8CB5",
                              background: "transparent",
                              height: "35px",
                              width: "70px",
                            }}
                            onClick={handleClose1}
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </div>
                    </Dialog>

                    <Dialog
                      fullScreen={fullScreen3}
                      open={open3}
                      onClose={handleClose4}
                      aria-labelledby="responsive-dialog-title"
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
                              defaultValue="Agree"
                              name="radio-buttons-group"
                              onChange={(e: any) => handleRadioChange(e)}
                            >
                              <FormControlLabel
                                style={{
                                  color: "#333333",
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                }}
                                value="Agree"
                                control={<Radio />}
                                label="We met the Appraiser and agreed on the ratings to be changed"
                              />
                              <FormControlLabel
                                style={{
                                  color: "#333333",
                                  fontSize: "14px",
                                  fontFamily: "Arial",
                                }}
                                value="Disagree"
                                control={<Radio />}
                                label="We met the Appraiser and disagreed on the ratings"
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
                            onClick={handleClose3}
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
                            onClick={handleClose3}
                            autoFocus
                          >
                            No
                          </Button>
                        </DialogActions>
                      </div>
                    </Dialog>
                  </div>
                </TabPanel>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
}
