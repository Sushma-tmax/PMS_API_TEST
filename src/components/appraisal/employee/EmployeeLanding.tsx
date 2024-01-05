import {
  Box,
  Button,
  Container,
  FormGroup,
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
  Checkbox, Snackbar, Alert,
} from "@mui/material";
import Paper, { PaperProps } from "@mui/material/Paper";

import React, { useCallback, useContext } from "react";
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
import Infoicon from "../../../assets/Images/Infoicon.svg";
import Infowhiteicon from "../../../assets/Images/Infowhiteicon.svg";
import Popover from "@mui/material/Popover";
import { Link } from "react-router-dom";
import { format } from 'date-fns'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Removeattnew from "../../../assets/Images/Removeattnew.svg";
import {
  EMPLOYEE_DOWNLOAD,
  EMPLOYEE_PREVIOUS_PA_NO_CALENDAR,
  EMPLOYEE_PREVIOUS_PAs,
  EMPLOYEE_REJECTS,
} from "../../../constants/routes/Routing";
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
  useGetTalentCategoryQuery,
  useAttachmentsEmployeeDeleteMutation,
} from "../../../service";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import { maxWidth, width } from "@mui/system";
import dayjs from "dayjs";
import Blueadd from "../../../assets/Images/Blueadd.svg";
import Blueminus from "../../../assets/Images/Blueminus.svg";
import MenuItem from "@mui/material/MenuItem";
import Downloadss from "../../../assets/Images/Downloadss.svg";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import FeedbackQuestionnaireAppraiser from "../FeedbackQuestionnaireAppraiser";
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import AlertAcceptDialog from "../../UI/DialogAccept";
import { useGetEmployeeDetailsWithEmpCodeQuery } from "../../../service/employee/previousAppraisal";
import { useGetEmailIdsQuery, useSendEmailNotificationMutation } from "../../../service/email/emailNotification";
import { EMPLOYEE_ACCEPTS_PA_INFO } from "../../../constants/AppraisalEmailContents/NotificationForInfo/Employee";
import { parseISO } from "date-fns/esm/fp";
import { NestCamWiredStandTwoTone } from "@mui/icons-material";
import Eye from "../../../assets/Images/Eye.svg";
import { makeStyles } from "@mui/styles";
import AlertDialogOkCancelForUnsavedChanges from "../../UI/DialogforunsavedChangesAlert";
import { useCheckRoleLogsMutation } from "../../../service/employee/employee";

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
const Overallrating = styled("div")({
  fontSize: "17px",
  fontFamily: "arial",
  fontWeight: 400,
  color: "#3e8cb5",
  //textAlign: 'left'
});

const Overallratingvalue = styled("div")({
  fontSize: "17px",
  fontFaily: "arial",
  display:"flex",
  alignItems:"center"
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
    textAlign: "left"
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
    width: "96%"


  },
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "Arial",
    textAlign: "left",
    //  paddingRight:"8px"

  },
  "& .MuiInputBase-root": {
    backgroundColor: "#f8f8f8",
    padding: "3px"
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

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  // @ts-ignore
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {

      any: any
    }
  }
  React.useEffect(() => {
    if (!when) return;
    // @ts-ignore
    const unblock = navigator.block((tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {

          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [navigator, blocker, when]);
}

export function usePrompt(message: any, when = true) {
  const blocker = useCallback(
    (tx) => {
      // eslint-disable-next-line no-alert
      if (window.confirm(message)) tx.retry();
    },
    [message]
  );

  useBlocker(blocker, when);
}

export default function EmployeeLanding(props: any) {
  const { appraisalData } = props;
  const classes = useStyles();
  const CustomScrollbar = Scrollbar as any;

  //mapping functionalities
  const { employee_id } = useParams();
  // console.log(employee_id ,'employee_id ')
  const [navPrompt, setnavPrompt] = React.useState(false);
  const formIsDirty = navPrompt;
  usePrompt(
    // 'Please save the changes before you leave the page.',
    "Any changes you have made will not be saved if you leave the page.",
    formIsDirty);
  console.log(navPrompt, "navPrompt")
  const { data } = useGetObjectiveTypeQuery("");
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const { data: objectiveDescData, isLoading: isLoadingDescription } =
    useGetObjectiveDescriptionQuery("");
  const { data: employeeData, refetch: fetchCancel, isLoading } =
    useGetEmployeeAppraisalQuery(employee_id);
  console.log(employeeData, "employeeData");

  const { data: ratingData } = useGetRatingScaleQuery("");
  // const {data:talentCategory} = useGetTalentCategoryQuery("");
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
    []
  );
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [employeeDescription, setEmployeeDescription] = useState<any>([])
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [pendingAction, setPendingAction] = useState<any>("")
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
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: appraisalData?.data?.employee_code })
  const [showAreaofImprovement, setShowAreaofImprovement] =
    useState<any>(false);
  const [showTrainingRecommendations, setShowTrainingRecommendations] =
    useState<any>(false);
  const [showTrainingRecommendation, setShowTrainingRecommendation] =
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
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [updateEmployee] = useUpdateEmployeeAppraisalMutation();
  const [moveTab, setMoveTab] = useState<any>(false)
  const [message, setMessage] = useState<any>("")
  const [talentCategoryTempData, setTalentCategoryTempData] = useState()
  const [talentPotential, setTalentPotential] = useState<any>("")
  const [talentRating, setTalentRating] = useState<any>(0)
  const { data: talentCategory } = useGetTalentCategoryQuery({ overall_rating: talentRating, potential: talentPotential });
  const { data: emailData } = useGetEmailIdsQuery({ appraiser_code: employeeData?.data?.appraiser_code, reviewer_code: employeeData?.data?.reviewer_code, normalizer_code: employeeData?.data?.normalizer_code })
  const [showRenormalizedData, setShowRenormalizedData] = useState<any>(true)
  const [oneToOneMeetingDate, setOneToOneMeetingDate] = useState<any>("")
  const [employeeCode, setEmployeeCode] = useState<any>()
  const [reviewedOverallFeedback, setReviewedOverallFeedback] = useState(false)
  const [appraiserChecked, setAppraiserChecked] = useState(false);
  const [reviewerChecked, setReviewerChecked] = useState(false);
  const [employeeChecked, setEmployeeChecked] = useState(false);
  const [hadOneToOneMeeting, setHadOneToOneMeeting] = useState(false);
  const [updateLoggedRole] = useCheckRoleLogsMutation()
  // console.log(SpecificArea, "SpecificArea");
  // console.log(employeeData, "SpecificArea");
  //new alert functions
  const [open33, setOpen33] = useState<any>(false);
  const [message2, setMessage2] = useState<any>("");
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [successAlertTrigerconfirmation, setSuccessAlertTrigerconfirmation] = useState(false);
  const [successAlertTrigerMSGconfirmation, setSuccessAlertTrigerMSGconfirmation] = useState("");
  const [employeeAttachments, setemployeeAttachments] = useState<any>("");
  const [disableButtons, setDisableButtons] = useState(false);
  const [deleteEmployeeMutation, { isLoading: delete1, data: deleted }] =
    useAttachmentsEmployeeDeleteMutation();

  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")

  }
  const handleCloseSnackbarconfirmation = () => {
    setSuccessAlertTrigerconfirmation(false)
    setSuccessAlertTrigerMSGconfirmation("")
    // window.open(`${EMPLOYEE_DOWNLOAD}/employee/${employee_id}`, '_blank')

  }
  const handlemessage3 = () => {
    setOpen33(false);
  }
  // confirmation

  // to display only re-normalized rating and comments (after mediation and renormalization)
  useEffect(() => {
    if (employeeData) {
      setEmployeeCode(employeeData?.data?.employee_code);
      setTalentPotential(employeeData?.data?.appraisal?.potential);
      setTalentRating(employeeData?.data?.normalizer?.normalizer_rating);
      if (employeeData?.data?.normalizer?.normalizer_status == "re-normalized") {
        setShowRenormalizedData(false)
      } else {
        setShowRenormalizedData(true)
      }
    }
  }, [employeeData])

  // useEffect(() => {
  //   if (employeeData) {
  //     const {data:talentCategory} = useGetTalentCategoryQuery({
  //       overall_rating : employeeData?.data?.normalizer?.normalizer_rating, 
  //       potential : employeeData?.data?.appraisal?.potential});

  //       setTalentCategoryTempData(talentCategory)
  //   }

  // },[employeeData])

  console.log(talentCategory, 'tempDataa')

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
        return employeeData.data.appraisal.objective_description.map(
          (i: any) => {
            return {
              ...i,
              comments: i.comments,
              rejection_reason: i.rejection_reason,
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

  const [Training, setTraining] = React.useState<any>([]);
  //console.log(Training, "Trainingstate");
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      let tempTraining = appraiserTrainingRecommendations.filter((item: any) => {
        return item.name.title !== "" || item.name.title !== undefined
      })
      if (tempTraining && tempTraining?.length > 0) {
        setShowTrainingRecommendation(true)
      } else {
        setShowTrainingRecommendation(false)
      }
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
  const [showArea, setShowArea] = useState(false)

  //console.group(filterData1, "filterData1");
  const groupNAmeHandler = (name: any) => {
    if (name) {
      let tempArea = name.filter((area: any) => {
        return area[0] !== "" && area[0] !== undefined
      })
      if (tempArea && tempArea?.length > 0) {
        setShowArea(true);
        setFilterData1(name);
      } else {
        setShowArea(false);
      }

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
      setMessage("Please save the changes before leaving the page.")
    }
    else {
      setValue(newValue);
    }

  };

  const backHandler = () => {
    if (moveTab == true && value == 1) {
      setOpenSaved(true);
      setMessage("Please save the changes before leaving the page.")
    } else {
      setValue(0);
    }
  }
  const RatingHandler = () => {
    setMoveTab(false)
    setValue(0);
  }
  const [open, setOpen] = React.useState(false);
  const [openReject, setOpenReject] = React.useState(false);
  const [employeeAgreesWithAppraiser, setEmployeeAgreesWithAppraiser] =
    React.useState(true);
  const [openSaved, setOpenSaved] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openValidation, setOpenValidation] = useState(false);
  const [openOneMeeting, setOpenOneMeeting] = useState(false)

  const [disableTextAfterSubmission, setDisableTextAfterSubmission] = useState(false)

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
    setDisableButtons(true);
    if (hadOneToOneMeeting || employeeData?.data?.employee?.attended_one_to_one_meeting == true) {
      handleClickOpen1()
    }
    else if (employeeData?.data?.appraisal?.status !== "rejected") {
      if (oneToOneMeetingDate == "" || oneToOneMeetingDate == undefined) {
        setOpen(true);
      } else {
        handleClickOpen1()
      }
    }
    else {
      setOpen1(true);
    }
    // if (employeeComments === "" || employeeComments == undefined) {
    //   setOpenValidation(true);
    //   setMessage("Please add employee comments in the recommendation tab.")
    // } else {
    //   setOpen(true);
    // }
  };
  const [openCancelDialog, setOpenCancelDialog] = React.useState(false);

  // refetch
  const CancelButtonHandler = () => {
    if (navPrompt  || moveTab) {
      setOpenCancelDialog(true);
    } else if (value == 1) {
      setOpenCancelDialog(false);
      setValue(0)
    }
  }
  const rejectCancelButtonHandler = () => {
    setOpenCancelDialog(false);
  }
  const acceptCancelButtonHandler = () => {
    setOpenCancelDialog(false);
    setMoveTab(false);
    setnavPrompt(false);
    fetchCancel().then((res :any) => setValue(0));  
  }


  const handleValidationClose = () => {
    setOpenValidation(false);
    setMessage("")
  }

  const handleClose = () => {
    setOpen(false);
    setOpenReject(false);
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
  const [area, setarea] = useState<any>([
    {
      id: Date.now(),
      value: "",
      specific_actions: [{ value: "" }],
    },
  ]);
  const [openReviewReject, setOpenReviewReject] = React.useState(false);
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
    setHadOneToOneMeeting(true);
    let specificAreaEmployee = area?.filter((item: any) => {
      return item.value !== ""
    }).filter((item: any) => {
      return item.specific_actions[0].value === ""
    });

    let trainingRecommendationEmployee = formValues?.filter((item: any) => item.name !== "")
      .filter((item: any) => item.justification === "" || item.training_name === "");

    console.log(oneToOneMeetingDate, specificAreaEmployee, trainingRecommendationEmployee, 'checkoneToOneMeetingDate')
    if (oneToOneMeetingDate == "" || oneToOneMeetingDate == undefined) {
      setOpenOneMeeting(true);
      setMessage("Please select One-to-One Meeting Date in the overall feedback.")
    } else if (specificAreaEmployee?.length > 0) {
      setOpenOneMeeting(true);
      setMessage("Please add the missing details in the Areas for Improvement.")
    } else if (trainingRecommendationEmployee?.length > 0) {
      setOpenOneMeeting(true);
      setMessage("Please add the missing details in the Training Recommendation.")
    }
    // else if (!reviewedOverallFeedback) {
    //   setOpen1(true);
    // } 
    else {
      acceptHandler()
    }
    // updateEmployee({
    //   "employee.attended_one_to_one_meeting": true,
    //   "employee.comments": employeeComments,
    //   id: employee_id,
    // }).then((res:any) => {

    // })

  };

  const handleCloseOneMeetingAlert = () => {
    setOpenOneMeeting(false);
    setMessage("");
    if (value == 0) {
      setValue(1);
    }
    setDisableButtons(false);
  }

  useEffect(() => {
    setDisableTextAfterSubmission(!employeeData?.data?.appraisal?.pa_status?.includes("Pending with Employee"))
    // if (employeeData?.data?.employee?.one_to_one_meeting !== undefined && employeeData?.data?.employee?.one_to_one_meeting !== "")
    setOneToOneMeetingDate(employeeData?.data?.employee?.one_to_one_meeting?.slice(0, 10))

  }, [employeeData])

  const handleClickOpenReject = () => {
    setOpen3(true);
    // if (oneToOneMeetingDate == "" || oneToOneMeetingDate == undefined) {
    //   setOpenOneMeeting(true);
    //   setMessage("Please select One-to-One Meeting Date in the overall feedback.")
    // } else {
    //   setOpen3(true);
    // }

  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
    setOpenReviewReject(false);
    setDisableButtons(false)
    // setValue(1)
  };
  const handleClose4 = () => {
    setOpen3(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setDisableButtons(false)
  };
  const [open3, setOpen3] = React.useState(false);
  const theme3 = useTheme();

  const fullScreen3 = useMediaQuery(theme.breakpoints.down("md"));
  const [accept, { error, isError }] = useAcceptAppraisalEmployeeMutation();

  const handleClickOpen3 = () => {
    setDisableButtons(true);
    if (employeeData?.data?.appraisal?.status !== "rejected") {
      if (oneToOneMeetingDate == "" || oneToOneMeetingDate == undefined) {
        setOpenReject(true);
      } else {
        handleClickOpenReject()
      }
    }
    else {
      rejectHandler();
      // setOpen3(true);
    }
    // if (employeeComments === "") {
    //   setOpenValidation(true);
    //   setMessage("It is mandatory to add the overall feedback. Please visit the Overall Feedback page.")
    // } else {
    //   setOpenReject(true);
    //   // setOpen3(true);

    // }
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

  const getRatingsfromObjectiveDescriptionIfEmployeeDataNotEmpty = (data: any) => {
    if (data.employee.objective_description.filter((i: any) => i.rating_rejected == true).length > 0) {
      return data?.employee.objective_description.map((k: any) => {
        return {
          // ratings: k.ratings,
          rating_rejected: k.rating_rejected,
          // rating_comments: "",
          // comments: ""
          name: k.name,
          rejection_reason: k.rejection_reason,
          value: k.value,
          ratings: k.ratings,
          level_1_isChecked: k.level_1_isChecked,
          level_2_isChecked: k.level_2_isChecked,
          level_3_isChecked: k.level_3_isChecked,
          level_4_isChecked: k.level_4_isChecked,
        };
      });
    } else {
      return data?.normalizer.objective_description.map((k: any) => {
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
    }

  };

  const getRatingsfromObjectiveDescriptionForAppraiser = (data: any) => {
    return data?.map((k: any) => {
      return {
        // ratings: k.ratings,
        rating_rejected: false,
        comments: k.comments,
        rejection_reason: k.rejection_reason,
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


  useEffect(() => {
    if (employeeAgreesWithAppraiser && employeeAgreesWithAppraiser == true) {
      setPendingAction("Pending with Appraiser (Employee Rejection)")
    } else if (employeeAgreesWithAppraiser == false) {
      setPendingAction("Pending with HR Normalizer (Mediation)")
    }
  }, [employeeAgreesWithAppraiser])

  const handleClose3 = () => {
    setOpen3(false);
    // setOpenReviewReject(true);
    rejectHandler();

  };

  const rejectHandler = () => {
    setOpenReviewReject(false);
    if (pendingAction && (pendingAction !== "" || pendingAction !== undefined)) {
      let trainingRecommendationValues = formValues?.filter((item: any) => item.name !== "")
        ?.map((item: any) => {
          console.log(item, "newitem")
          return {
            ...item,
            training_name: item?.training_name?.trim(),
            justification: item?.justification?.trim(),
          }
        });
      let areaValues = area.filter((item: any) => item.value.trim() != "").map((item: any) => {
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
        // "employee.objective_description": getRatingsfromObjectiveDescriptionIfEmployeeDataNotEmpty(
        //   employeeData.data
        // ),
        // "employee_previous_submission.objective_description": getRatingsfromObjectiveDescription(
        //   employeeData.data.normalizer.objective_description
        // ),
        // "employee_previous_submission.employee_rating": employeeData.data.normalizer.normalizer_rating,       
        // "appraisal.objective_description": getRatingsfromObjectiveDescriptionForAppraiser(
        //   employeeData.data.appraisal.objective_description
        // ),
        id: employee_id,
        "employee.training_recommendation": trainingRecommendationValues,
        "employee.area_of_improvement": areaValues,
        "employee.comments": employeeComments?.trim(),
        "employee.employee_agree": employeeAgreesWithAppraiser,
        "employee.one_to_one_meeting": oneToOneMeetingDate,
      }).then((res: any) => {
        if (!res.error) {
          setnavPrompt(false);
          setMoveTab(false);
          setDisableButtons(false);
          navigate(`${EMPLOYEE_REJECTS}/employee/${employee_id}`);
        }
      });
    }
  }


  const acceptHandler = () => {
    setReviewedOverallFeedback(true)
    // accept(employee_id);
    handleClose1();
    let trainingRecommendationValues = formValues?.filter((item: any) => item.name !== "")
      ?.map((item: any) => {
        console.log(item, "newitem")
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });
    let specificAreas = area.filter((item: any) => item.value !== "")
    let areaValues = area.filter((item: any) => item?.value?.trim() != "")?.map((item: any) => {
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
    let ratingValues = [];
    if (employeeData?.data?.employee?.objective_description?.length == 0) {
      let temp = employeeData?.data?.normalizer?.objective_description;
      ratingValues = temp?.map((item: any) => {
        return { ...item, rating_rejected: false };
      });
    } else ratingValues = employeeData?.data?.employee?.objective_description;

    updateEmployee({
      "employee.objective_description": getRatingsfromObjectiveDescription(
        employeeData?.data?.normalizer?.objective_description
      ),
      // "talent_category" : ""
      "appraisal.status": "completed",
      "talent_category": talentCategory?.data,
      "appraisal.pa_status": "Completed",
      "appraisal_previous_submission.pa_status": "Completed",
      "appraisal.pa_rating": employeeData?.data?.current_rating?.overall_rating,
      "appraisal.show_employee": false,
      "employee.employee_status": "accepted",
      id: employee_id,
      "employee.attended_one_to_one_meeting": true,
      "employee_previous_submission.attended_one_to_one_meeting": true,
      // "employee.employee_rating": employeeData.data.normalizer.normalizer_rating,
      "employee.training_recommendation": trainingRecommendationValues,
      "employee_previous_submission.training_recommendation": trainingRecommendationValues,
      "employee.area_of_improvement": areaValues,
      "employee_previous_submission.area_of_improvement": areaValues,
      "employee.one_to_one_meeting": oneToOneMeetingDate,
      "employee_previous_submission.one_to_one_meeting": oneToOneMeetingDate,
      "employee.comments": employeeComments?.trim(),
      "employee_previous_submission.comments": employeeComments?.trim(),
      "employee.employee_rating": employeeData?.data?.current_rating?.overall_rating,
      "current_previous_submission.objective_description": employeeData?.data?.current_rating.objective_description,
      "appraisal_previous_submission.objective_description": employeeData?.data?.appraisal?.objective_description,
      "employee_previous_submission.objective_description": getRatingsfromObjectiveDescription(
        employeeData.data.normalizer.objective_description
      ),

    }).then((res: any) => {
      if (!res.error) {
        setMoveTab(false);
        setnavPrompt(false);
        setDisableButtons(false);
        updateLoggedRole({
          pa_action_by: `Employee (Accepted) : ${new Date()}`,
          id: employee_id
        })
     
    // handleClose1();
    // handleClose();
    //  setOpenSuccess(true);// chenged due to snackbar
    //snackbar
    setSuccessAlertTrigerMSGconfirmation("The performance appraisal was completed.")
    setSuccessAlertTrigerconfirmation(true)

    // Notification info Employee accepts PA - (for Appraiser)
    let appraiserName = employeeData?.data?.appraiser_name;
    let employeeName = employeeData?.data?.first_name;
    let calendarName = employeeData?.data?.calendar?.calendar_type;
    let calendarYear = employeeData?.data?.calendar?.start_date?.slice(0, 4)
    let empCode = employeeData?.data?.employee_code;

    let tempSubjectInfo = EMPLOYEE_ACCEPTS_PA_INFO?.subject;
    tempSubjectInfo = tempSubjectInfo?.replace("[year]", `${calendarYear}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[calendar name]", `${calendarName}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[employee name]", `${employeeName}`);
    tempSubjectInfo = tempSubjectInfo?.replace("[employee code]", `${empCode}`);

    let tempHtmlInfo = EMPLOYEE_ACCEPTS_PA_INFO?.html;
    tempHtmlInfo = tempHtmlInfo?.replace("[year]", `${calendarYear}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[calendar name]", `${calendarName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[employee name]", `${employeeName}`);
    tempHtmlInfo = tempHtmlInfo?.replace("[employee code]", `${empCode}`);

    let appraiserEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.appraiser_code)?.email
    let reviewerEmail: string = emailData?.employeeData?.find((item: any) => item.employee_code === employeeData?.data?.reviewer_code)?.email
    let email = EMPLOYEE_ACCEPTS_PA_INFO?.to;
    email = email?.replace("[email]", `${appraiserEmail}`);

    sendEmailNotification(
      {
        to: email,
        cc: reviewerEmail,
        subject: tempSubjectInfo,
        html: tempHtmlInfo
      }
    )
  }else {
    updateLoggedRole({
      pa_action_by: `${res.error} : ${new Date()}`,
      id: employee_id
    })
    setMessage2("Something Went Wrong.")
    setOpen33(true)
  }
}) 
  };

  const saveRecommendationsHandler = () => {
    setDisableButtons(true);
    let trainingRecommendationValues1 = formValues?.filter((item: any) => item.name !== "")
      ?.map((item: any) => {
        console.log(item, "newitem")
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });
    console.log(trainingRecommendationValues1, "trainingRecommendationValues1")
    let specificAreas = area.filter(
      (item: any) => item.value?.trim() != ""
    );
    let areaValues = area.filter((item: any) => item.value.trim() != "").map((item: any) => {
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
    let trainingRecommendationValues = formValues.filter((item: any) => item.name.trim() != "").map((item: any) => {
      return {
        ...item,
        training_name: item?.name?.training_name?.trim(),
        justification: item?.name?.justification?.trim(),
      }
    });
    // if (employeeComments == "" || employeeComments == undefined) {
    //   setOpenSaved(true);
    //   setMessage("Please fill in all the mandatory fields (*).")
    // } else {

    updateEmployee({
      id: employee_id,
      "employee.employee_status": "draft",
      "appraisal.pa_status": "Pending with Employee",
      "employee.training_recommendation": trainingRecommendationValues1,
      // "employee.area_of_improvement": specificAreas,
      "employee.area_of_improvement": areaValues,
      "appraisal.area_of_improvement": appraiserAreaofImprovement,
      "appraisal.training_recommendation": appraiserTrainingRecommendations,
      "employee.comments": employeeComments?.trim(),
      "employee.one_to_one_meeting": oneToOneMeetingDate,
    }).then((res: any) => {
      if (!res.error) {
      setMoveTab(false);
      setnavPrompt(false);
      setDisableButtons(false);
      //new alert 
      setSuccessAlertTrigerMSG("Changes were successfully saved.")
      setSuccessAlertTriger(true)
      }else {
      updateLoggedRole({
        pa_action_by: `${res.error} : ${new Date()}`,
        id: employee_id
      })
      setMessage2("Something Went Wrong.")
      setOpen33(true)
    }
      })
    // if (moveTab == true) {
    //   setOpenSaved(true);
    //   setMoveTab(false);
    //   setMessage("Changes were successfully saved.")
    // } else {
    //   setOpenSaved(true);
    //   setMoveTab(false);
    //   setMessage("No changes were made to save.")
    // }
    // setOpenSaved(true);

    // setMessage("Changes were successfully saved.")


    // }
  };

  const handleRejectRadioChange = (event: any) => {
    if (event.target.value.toLowerCase() == "true") return setEmployeeAgreesWithAppraiser(true);
    if (event.target.value.toLowerCase() == "false") return setEmployeeAgreesWithAppraiser(false);

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
    if (!disableTextAfterSubmission) {
      const newAreaList = [...area];
      newAreaList.splice(index, 1);
      setarea(newAreaList);
    }
  };

  const handleSpecificAdd = (e: any) => {
    setnavPrompt(true)
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

  console.log(moveTab, "moveTab")
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
  const [popoverIndex5, setPopoverIndex5] = useState<any>("");

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
    //  setnavPrompt(true)
    setFormValues([
      ...formValues,
      { name: "", training_name: "", justification: "" },
    ]);
  };
  const removeFormFields = (i: any) => {
    setnavPrompt(true)
    const newFormValues = [...formValues];
    newFormValues.splice(i, 1);
    setFormValues(newFormValues);
  };

  console.log(employeeComments, oneToOneMeetingDate, 'checkdates')

  const removeFormFieldsApp = () => {
    // setnavPrompt(true)
    const newFormValues: any = [];
    // newFormValues.splice(i, 1);
    setFormValues(newFormValues);
    setShowTrainingRecommendations(false)
  };

  const showEmployeeAreaApp = () => {
    let newArea: any = [];
    setarea(newArea);
    setShowAreaofImprovement(false)
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

  useEffect(() => {
    if (employeeData) {
      setTrainingSelectValue(employeeData.data.appraisal_template.training_recommendation)
    }
  }, [employeeData])
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
    setnavPrompt(true)
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
      console.log(employeeData?.data?.employee?.training_recommendation, 'training')
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

  // useEffect(() => {
  //   if (formValues && formValues.length > 0) {
  //     setShowTrainingRecommendations(true);
  //   } else {
  //     setShowTrainingRecommendations(false);
  //   }
  // }, [formValues])

  useEffect(() => {
    if (formValues && formValues?.length == 0) {
      addFormFields();
      //  setShowTrainingRecommendations(true);
    } else if (formValues && formValues?.length > 0) {
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
      setarea(employeeData?.data?.employee?.area_of_improvement);
      setAppraiserChecked(
        employeeData?.data?.normalizer?.isAppraiserChecked
      );
      setReviewerChecked(
        employeeData?.data?.normalizer?.isReviewerChecked
      );
      setEmployeeChecked(
        employeeData?.data?.normalizer?.isEmployeeChecked
      );
    }
  }, [employeeData])

  // function to display employee area of improvement

  useEffect(() => {
    if (area && area?.length == 0) {
      handleImprovementAdd();
      // setShowAreaofImprovement(true)
    } else if (area && area?.length > 0) {
      setShowAreaofImprovement(true)
    } else {
      setShowAreaofImprovement(false)
    }
  }, [area])



  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorReject, setAnchorReject] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl10, setAnchorEl10] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open10 = Boolean(anchorEl10);
  const open8 = Boolean(anchorEl8);
  const openRejectApp = Boolean(anchorReject);
  const id10 = open10 ? "simple-popover" : undefined;
  const id8 = open8 ? "simple-popover" : undefined;
  const idReject = openRejectApp ? "simple-popover" : undefined;

  const handleClick10 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl10(event.currentTarget);
  };
  const handleClick8 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl8(event.currentTarget);
  };
  const handleClickReject = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorReject(event.currentTarget);
  };
  const handleClose10 = () => {
    setAnchorEl10(null);
  };
  const handleClose8 = () => {
    setAnchorEl8(null);
  };


  const [anchorEmployeeRejectionAttachment, setAnchorEmployeeRejectionAttachment] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openEmployeeRejectionAttachment = Boolean(anchorEmployeeRejectionAttachment);
  const handleClickOpenEmployeeRejectionAttachment = (
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
    setAnchorEmployeeRejectionAttachment(event.currentTarget);
  };

  const handleCloseEmployeeRejectionAttachment = () => {
    setAnchorEmployeeRejectionAttachment(null);
  };

  const [ratingdefenition, setratingdefenition] = useState<any>();
  const [ratingscaledef, setratingscaledef] = useState<any>();
  React.useEffect(() => {
    // const Overall_rating = (employeeData?.data?.appraisal?.status === "completed") ?
    // (employeeData?.data?.current_rating?.overall_rating?.toFixed(2)) :
    // employeeData?.data?.employee && (employeeData?.data?.employee?.employee_status == "pending" ||
    //   employeeData?.data?.employee?.employee_status == "draft") ?
    //   (employeeData?.data?.current_rating?.overall_rating?.toFixed(2)) :
    //   (employeeData?.data?.employee?.employee_rating?.toFixed(2))
    let Overall_rating :any ;

    if (employeeData?.data?.appraisal?.status === "completed") {
      Overall_rating = employeeData?.data?.current_rating?.overall_rating?.toFixed(2);
    } else if (
      employeeData?.data?.employee?.employee_status === "pending" ||
      employeeData?.data?.employee?.employee_status === "draft"
    ) {
      Overall_rating = employeeData?.data?.current_rating?.overall_rating?.toFixed(2);
    } else {
      Overall_rating = employeeData?.data?.employee?.employee_rating?.toFixed(2);
    }

    console.log("Overall_rating:", Overall_rating);
    // const Overall_rating = employeeData?.data?.current_rating?.overall_rating;
    const RatinGscale = ratingData?.data?.map((j: any) => ({
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

    if (FilteredRatingScale?.length > 0 ) {
      setratingdefenition(FilteredRatingScale[0]?.definition);
      setratingscaledef(FilteredRatingScale[0]?.rating_titile);
    } else {
      // Handle the case when FilteredRatingScale is empty
      // setratingdefenition("No rating definition found");
    }
    console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, "Overall_ratingg");
  }, [ratingData, employeeData]);
  console.log(ratingscaledef, ratingdefenition,"ratingdefenition")
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

  /*constants for opening and closing HR Meeting Notes Attachments  */
  const [anchorMeetingAttachment, setAnchorMeetingAttachment] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openMeetingAttachment = Boolean(anchorMeetingAttachment);
  const handleClickOpenMeetingAttachment = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorMeetingAttachment(event.currentTarget);
  };
  const handleCloseMeetingAttachment = () => {
    setAnchorMeetingAttachment(null);
    // setOpen2(false);
  };



  const [anchorPreviousRatingPopOver, setAnchorPreviousRatingPopOver] = React.useState<HTMLElement | null>(
    null
  );
  const [anchorPreviousOverallRatingPopOver, setAnchorPreviousOverallRatingPopOver] = React.useState<HTMLElement | null>(
    null
  );
  const openPreviousRating = Boolean(anchorPreviousRatingPopOver);
  const openPreviousOverallRating = Boolean(anchorPreviousOverallRatingPopOver);
  const id_Previous_Rating = openPreviousRating ? "simple-popover" : undefined;
  const id_PreviousOverallRating: any = openPreviousOverallRating ? "simple-popover" : undefined;


  const handlePreviousRatingPopOverClose = () => {
    setAnchorPreviousRatingPopOver(null)
  }

  const handlePreviousRatingPopOverOpen = (event: React.MouseEvent<HTMLElement>, j: any) => {
    setAnchorPreviousRatingPopOver(event.currentTarget);
  };

  const handlePreviousOverallRatingPopOverClose = () => {
    setAnchorPreviousOverallRatingPopOver(null)
  }

  const handlePreviousOverallRatingPopOverOpen = (event: any) => {
    setAnchorPreviousOverallRatingPopOver(event.currentTarget);
  }


  const handleCloseReject = () => {
    setAnchorReject(null);
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

  const getEmployeeRejectionAttachments = (id: any) => {
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

  const getAttachmentsNormalizer = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.data?.normalizer?.attachments
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

  const getAppraiserRejectionAttachments = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.rejection_attachments
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

  const handleOneToOneMeetingDate = (e: any) => {
    setOneToOneMeetingDate(e.target.value);
  }
  console.log(oneToOneMeetingDate, 'oneToOneMeetingDate')

  return (
    <div
      style={{
        backgroundColor: "#F1F1F1",
        minHeight: "100px",
        overflow: "hidden",
        height: "auto",

      }}
    >
      {/* <Container
        sx={{
          maxWidth: "96.5% !important",
          backgroundColor: "#ebf1f5",
        }}
      ></Container> */}

      {/* <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          paddingBottom="10px"
          paddingRight="63px"
          spacing={1}


        >

          <Link to={`${EMPLOYEE_PREVIOUS_PA_NO_CALENDAR}/employee/${employee_id}`} state={{ employeeCodeFromLanding: employeeCode }} >
            <Typography
              style={{
                color: "#0099FF",
                fontSize: "12px",
                fontFamily: "Arial",


              }}

            >

              Previous PA {""}
            </Typography>
          </Link>
          <Typography style={{ marginTop: "2px" }}>
            <img
              src={Eye}
              alt="Eye Icon"
            />
          </Typography>



        </Stack> */}
      <Box
        sx={{
          // maxWidth: "95% !important",
          // height: "1308px",
          background: "#fff",
          marginTop: "35px",
          minHeight: "100px",
          overflow: "hidden",
          marginLeft: "25px",
          marginRight: "25px",
          marginBottom: "25px"
        }}
      >

        <Box
          style={{
            padding: "35px",
          }}
        >
          {/* <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            paddingBottom="10px"
            paddingRight="63px"
            spacing={2}


          >

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
            > <label style={{
              // paddingLeft: "5px",
              cursor: "pointer",
            }} onClick={handleViewPA}>
              <img src={Downloadss} alt="Download" />
             
              </label>
            </Button>

          </Stack> */}
          <Stack
            className={classes.heading}
            direction="row"
            alignItems="baseline"
            justifyContent="space-between"
            paddingBottom="10px"
            marginRight="63px"
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

            <span>
              {/* <Link to={`${EMPLOYEE_LANDING}/employee/${employee_id}`,'_blank'}> */}
              <Stack direction="row" alignItems="center" gap={3}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                  <Typography
                    style={{
                      color: "#3E8CB5",
                      fontSize: "17px",
                      fontFamily: "Arial",
                    }}
                  >
                    PA Status:
                  </Typography>
                  <div
                    style={{
                      color: "#717171",
                      // fontWeight: "400",
                      fontSize: "17px",
                      fontFamily: "Arial",
                    }}
                  >
                    {employeeData?.data?.appraisal?.pa_status}
                  </div>
                </Stack>
                {/* {employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
                    <> */}
                {/* <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Overallrating style={{ display: "flex", alignItems: "center",  fontSize: "17px", }} >
                    Previous Rating:
                      <Overallratingvalue style={{ fontSize: "17px" }} >
                        <b style={{ color: "#00000099" }} > {appraisalData?.data?.previous_rating && appraisalData?.data?.previous_rating ? appraisalData?.data?.previous_rating : "-"}</b>
                      </Overallratingvalue>
                  </Overallrating>
                  {appraisalData?.data?.previous_rating && (
                    <Link
                      to={`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`}
                      state={{
                        employeeCodeFromLanding: appraisalData?.data?.employee_code,
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
                    </Link>)}

                </Stack> */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  {/* <Typography
                    style={{
                      color: "#0099FF",
                      fontSize: "12px",
                      fontFamily: "Arial",
                    }}
                  >
                    Previous Rating:
                  </Typography> */}
                  <Overallrating style={{ display: "flex", alignItems: "center",}} >
                  Previous Rating:
                  <Overallratingvalue  >
                  <span style={{ color: "#717171",fontSize: "17px",fontFamily: "Arial" }} >                
                     {employeeData?.data?.previous_rating && employeeData?.data?.previous_rating !== 0 ? 
                    employeeData?.data?.previous_rating?.toFixed(2) : "-"}
                    </span>
                    </Overallratingvalue>
                    </Overallrating>
                    {appraisalData?.data?.previous_rating && employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
                      <Link
                  to={`${EMPLOYEE_PREVIOUS_PAs}/employee/${employee_id}`}
                  state={{
                    employeeCodeFromLanding: appraisalData?.data?.employee_code,
                    calendarTypeFrom: employeePA_Data?.employees[0]?.calendar,
                    yearFrom: employeePA_Data?.employees[0]?.createdAt?.slice(0, 4)
                  }}
                ><Typography style={{ marginTop: "2px" }}>
                      <img
                        src={Eye}
                        alt="Eye Icon"
                      />
                    </Typography>
                  </Link>
                    )}

                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
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
            > <label style={{
              // paddingLeft: "5px",
              cursor: "pointer",
            }} onClick={handleViewPA}>
              <img src={Downloadss} alt="Download" />
             
              </label>
            </Button>
            </Stack>
              </Stack>
            
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
          </Typography> */}
          <Box sx={{ backgroundColor: "#f3fbff", padding: "10px", marginRight: "63px" }}>
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
                    {/* <Avatar sx={{ width: 60, height: 60 }}>A</Avatar> */}
                    {employeeData?.data?.profile_image_url != undefined ? (
                      <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={employeeData?.data?.profile_image_url} />
                    ) : (
                      <Avatar style={{ width: "55px", height: "55px" }}>
                        {appraisalData &&
                          appraisalData.data.legal_full_name.substring(0, 1)}
                      </Avatar>
                    )}
                  </Typography>
                  <Stack direction="column" spacing={1}>
                    <span
                      style={{
                        fontSize: "17px",
                        fontFamily: "Arial",
                        color: "#3E8CB5",
                      }}
                    >
                      {employeeData?.data?.first_name}
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
                      {/* <span
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
                      /> */}
                      {/* {employeeData?.data?.division} */}
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
                      Grade {employeeData?.data?.grade}{" "}
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
                  alignItems="center"
                  // gap="8px"
                  // paddingRight="10px"
                  paddingBottom="15px"
                >
                  {/* {showOverallRating && ( */}
                  {(
                    // <Typography onMouseEnter={() => setShowPreviousRating(true)}
                    //   onMouseLeave={() => setShowPreviousRating(false)}>
                    <>                      <Typography
                      style={{
                        fontSize: "17px",
                        color: "#3e8cb5",
                        fontFamily: "Arial",
                      }}

                    >
                      Overall Rating

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
                            //  left:"852px !important"
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
                    </Typography>
                      <div
                        // onClick={(e: any) => { handlePreviousOverallRatingPopOverOpen(e) }}
                        style={{
                          // paddingLeft: "42px",
                          fontSize: "16px",
                          color: "#333333",
                          paddingTop: "1px",
                          display: "flex",
                          alignItems: "center"
                        }}
                      >

                        {ratingdefenition
                          //  && ((employeeData?.data?.appraisal?.status === "completed" || employeeData?.data?.employee?.employee_status == "pending" ||
                          //  employeeData?.data?.employee?.employee_status == "draft")
                          //  &&  employeeData?.data?.current_rating?.overall_rating !== 0) 
                           // || (employeeData?.data?.employee?.employee_rating !== 0)
                            &&
                          <IconButton sx={{padding:"4px"}} onClick={handleClick22} >
                            <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                          </IconButton>
                        }<span
                          onClick={(e: any) => { handlePreviousOverallRatingPopOverOpen(e) }}
                          style={{
                            // paddingLeft: "42px",
                            fontSize: "16px",
                            color: "#333333",
                            paddingTop: "1px",
                          }}
                        >  <b>{(employeeData?.data?.appraisal?.status === "completed") ?
                          (employeeData?.data?.current_rating?.overall_rating?.toFixed(2)) :
                          employeeData?.data?.employee && (employeeData?.data?.employee?.employee_status == "pending" ||
                            employeeData?.data?.employee?.employee_status == "draft") ?
                            (employeeData?.data?.current_rating?.overall_rating?.toFixed(2)) :
                            (employeeData?.data?.employee?.employee_rating?.toFixed(2))}
                            {/* {employeeData?.data?.normalizer?.normalizer_rating} */}
                          </b> </span>
                        {/* <b>Previous Rating : {showPreviousRating && employeeData?.data?.normalizer?.normalizer_rating}</b> */}
                      </div>
                    </>

                  )}

                  {/* {showPreviousRating && ( */}
                  <>
                    <Popover
                      id={id_PreviousOverallRating}
                      open={id_PreviousOverallRating}
                      anchorEl={anchorPreviousOverallRatingPopOver}
                      onClose={handlePreviousOverallRatingPopOverClose}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                      }}
                      transformOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      PaperProps={{
                        style: {
                          backgroundColor: "FEFCF8",
                          boxShadow: "none",
                          maxWidth: "400px",
                          top: "270px !important",
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
                          padding: "3px",
                          fontSize: "10px",
                          color: "#333333",
                          fontFamily: "Arial",
                        }}
                      >
                        <div
                          style={{
                            // width: "200px",
                            padding: "3px",
                            fontSize: "13px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          <Stack direction="row" alignItems="center" spacing={1}>
                            <Typography
                              style={{
                                fontSize: "13px",
                                color: "#3e8cb5",
                                fontFamily: "Arial",
                              }}
                            >
                              Previous Rating :

                            </Typography>
                            <span style={{
                              fontSize: "13px",
                              color: "#333333",
                            }}><b>{(employeeData?.data?.appraisal?.status == "rejected") ? (employeeData?.data?.normalizer?.normalized_overallRating?.toFixed(2)) : ("-")}</b></span>
                          </Stack>                        </div>
                        {/* <Stack direction="row" alignItems="center" spacing={1}>
                          <Typography
                            style={{
                              fontSize: "10px",
                              color: "#3e8cb5",
                              fontFamily: "Arial",
                            }}
                          // onMouseEnter={() => setShowOverallRating(false)}
                          // onMouseLeave={() => setShowOverallRating(true)}
                          >
                            Previous Rating

                          </Typography>
                          <span style={{
                            fontSize: "10px",
                            color: "#333333",
                          }}><b>{(employeeData?.data?.appraisal?.status == "rejected") ? (employeeData?.data?.normalizer?.normalized_overallRating?.toFixed(2)) : ("-")}</b></span>
                        </Stack> */}

                        {/* <div
                          style={{
                            // paddingLeft: "22px",
                            fontSize: "16px",
                            color: "#333333",
                            paddingTop: "1px",
                          }}
                        >
                          <b>{employeeData?.data?.normalizer?.normalizer_rating}</b>
                        </div> */}
                      </div>
                    </Popover>

                  </>
                  {/* )} */}
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
          <Box sx={{ paddingTop: "20px", marginRight: "63px" }}>
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
                <Box sx={{ borderBottom: 1, borderColor: "divider", marginRight: "63px" }}>
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
                        border: "1px solid #3e8cb59e",
                        maxHeight: "0px",
                        minHeight: "48px",
                        paddingRight: "15px",
                        paddingLeft: "20px",
                        fontWeight: "700",
                      }}
                      icon={
                        <>
                          <TabPanel value={value} index={1}>
                            <IconButton
                              sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                            // aria-describedby={id2}
                            // onClick={handleClickInfo}
                            >
                              <img
                                style={{ width: "12px" }}
                                src={Infoicon}
                                alt="icon"
                              />
                            </IconButton>
                          </TabPanel>
                          <TabPanel value={value} index={0}>
                            <IconButton
                              sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                              aria-describedby={id2}
                              onClick={handleClickInfo}
                            >
                              <img
                                style={{ width: "12px" }}
                                src={Infowhiteicon}
                                alt="icon"
                              />
                            </IconButton>
                          </TabPanel>
                        </>
                      }
                      iconPosition="start"
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
                        border: "1px solid #3e8cb59e",
                        paddingLeft: "20px",
                        paddingRight: "20px",
                        fontWeight: "700",
                      }}
                      label="Overall Feedback"
                      {...a11yProps(1)}
                    />
                  </Tabs>
                  {/* </Color> */}
                </Box>
                <TabPanel value={value} index={0}>
                  <div style={{ marginRight: "63px" }} >
                    <TableContainer >
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
                                padding: "0px 8px"
                              }}
                              align="center"
                            >
                              Objective <br></br>Level
                            </TableCell>
                            {/* {showRenormalizedData && ( */}
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
                              Appraiser <br /> Rating
                            </TableCell>
                            {/* )} */}


                            {/* <IconButton aria-describedby={id2} onClick={handleClickInfo}>
                              <img src={Infoicon} alt="icon" />
                            </IconButton> */}
                            <Popover
                              id={id2}
                              open={openInfo}
                              anchorEl={anchorEl}
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
                                                {/* <option>Rating Scale Title</option> */}
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
                                  </CustomScrollbar>
                                </Scroll>

                              </TableContainer>
                            </Popover>
                            {/* {showRenormalizedData && ( */}
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
                                Appraiser <br></br>Comments
                              </TableCell>)}
                            {/* )} */}

                            {employeeData?.data?.normalizer?.normalizer_status !== "re-normalized" && employeeData?.data?.appraisal?.status !== "completed" &&
                              employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                                (item.rating_rejected || (item.rating_resubmitted == true &&
                                  (employeeData?.data?.appraisal?.status !== "rejected"))) && (item.rejection_reason !== "" && item.rejection_reason !== undefined))?.length > 0 &&
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
                                Appraiser <br></br>Rejection/Change Reason
                              </TableCell>)}

                            {showRenormalizedData && employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                              item.rating_rejected == true).length > 0 && (
                                <>
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
                                    Employee<br /> Rating
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
                                    Employee<br /> Rejection Reason
                                  </TableCell>
                                </>
                              )}

                            {employeeData?.data?.appraisal?.status == "completed" &&
                              employeeData?.data?.normalizer?.normalizer_status == "re-normalized" &&
                              employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
                                item.rating_resubmitted == true).length > 0 && (
                                <>
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
                                    Re-normalized<br /> Rating
                                  </TableCell>
                                  {employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
                                    item.rating_resubmitted == true).length > 0 && (
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
                                        HR Normalizer<br /> Comments
                                      </TableCell>
                                    )}
                                </>
                              )}

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
                                        border: "1px solid #80808014 ",
                                        boxShadow: "1px 0px 0px 1px #80808014",
                                        borderBottom: "none",
                                        borderLeft: "0px",
                                        borderTop: "0px"
                                      },
                                    }}
                                  >
                                    <TableCell
                                      width="150px"
                                      sx={{
                                        fontSize: "14px",
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
                                      width="150px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word",
                                        background: "#ffffff",

                                        // fontFamily: "regular"
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
                                        <Stack
                                          direction="column"
                                          padding="5px"
                                          spacing={2}
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
                                        </Stack>
                                      </Popover>
                                    </TableCell>
                                    <TableCell
                                      width="10px"
                                      align="center"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word",
                                        textAlign: "center",
                                        background: "#FBFBFB",
                                        padding: "0px 8px"
                                        // fontFamily: "regular"
                                      }}
                                    >
                                      <Stack direction="row" alignItems="center" justifyContent="center">
                                      {(j.level_1_isChecked ||
                                        j.level_2_isChecked ||
                                        j.level_3_isChecked ||
                                        j.level_4_isChecked) && (
                                          <IconButton
                                          sx={{padding:"4px"}}
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
                                          <span>L1 </span>
                                          <span>
                                            {/* {j?.name?.level_1?.level_definition} */}
                                          </span>
                                        </>
                                      )}
                                      {j.level_2_isChecked && (
                                        <>
                                          <span>L2 </span>
                                          <span>
                                            {/* {j?.name?.level_2?.level_definition} */}
                                          </span>
                                        </>
                                      )}
                                      {j.level_3_isChecked && (
                                        <>
                                          <span>L3 </span>
                                          <span>
                                            {/* {j?.name?.level_3?.level_definition} */}
                                          </span>
                                        </>
                                      )}
                                      {j.level_4_isChecked && (
                                        <>
                                          <span>L4 </span>
                                          <span>
                                            {/* {j?.name?.level_4?.level_definition} */}
                                          </span>
                                        </>
                                      )}
</Stack>
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

                                        <div
                                          style={{
                                            fontSize: "12px",
                                            fontFamily: "arial",
                                            lineHeight: "20px",
                                            padding: "5px",
                                          }}
                                        >
                                          {openInfo102 &&
                                            j._id === activeObjectiveId2 && (
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
                                                    <ul style={{
                                                      marginTop: "0px",
                                                      marginBottom: "0px",
                                                    }}>
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
                                                    <ul style={{ marginBottom: "0px", marginTop: "0px" }}>
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
                                                    <ul style={{ marginBottom: "0px", marginTop: "0px" }}>
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
                                                    <ul style={{ marginBottom: "0px", marginTop: "0px" }}>
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

                                      </Popover>
                                    </TableCell>

                                    {/* {showRenormalizedData && ( */}
                                    <TableCell
                                      width="10px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word",
                                        background: "#ffffff",
                                        padding: "0px 8px"
                                      }}
                                      align="center"
                                    >
                                      <Stack
                                        direction="column"
                                        display="flex"
                                        alignItems="center"
                                      >
                                        <div style={{ display: "inline-flex" }}>
                                          {" "}
                                          {
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
                                                      // console.log(k,"kkk")
                                                      if (ratingData) {
                                                        let temp = ratingData?.data?.find((item: any) => k.ratings == item._id)
                                                        return <span>Previous Rating:{temp?.rating}</span>
                                                      }
                                                    })[0]}
                                              </div>
                                            </Popover>
                                          )}
                                        </div>

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
                                    {/* )} */}

                                    {/* {showRenormalizedData && ( */}
                                    {employeeData?.data?.appraisal?.objective_description.filter((item: any) =>
                                      item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                                      (<TableCell
                                        width="200px"
                                        sx={{
                                          fontSize: "14px",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                          wordBreak: "break-word",
                                          background: "#FBFBFB",
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
                                            {(j.comments == "" || j.comments == undefined) ? "" : j.comments}
                                          </span>
                                          {employeeData && getAttachments(j?.name?._id)?.length > 0 &&
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
                                      </TableCell>)}
                                    {/* )} */}


                                    {employeeData?.data?.normalizer?.normalizer_status !== "re-normalized" && employeeData?.data?.appraisal?.status !== "completed" &&
                                      employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                                        (item.rating_rejected == true || (item.rating_resubmitted == true &&
                                          (employeeData?.data?.appraisal?.status !== "rejected"))) && (item.rejection_reason !== "" && item.rejection_reason !== undefined))?.length > 0 && (
                                        <TableCell
                                          width="200px"
                                          sx={{
                                            fontSize: "14px",
                                            color: "#333333",
                                            fontFamily: "Arial",
                                            wordBreak: "break-word",
                                            background: "#fbfbfb",
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
                                              {(j.rating_rejected == true || j.rating_resubmitted) && j.rejection_reason}
                                            </span>
                                            {employeeData && getAppraiserRejectionAttachments(j?.name?._id)?.length > 0 &&
                                              (j.rating_rejected == true) &&
                                              <AttachFileIcon
                                                style={{
                                                  color: "#93DCFA",
                                                  height: "18px",
                                                  transform: "rotate(30deg)",
                                                  cursor: 'pointer'
                                                }}
                                                onClick={(e: any) => {
                                                  handleClickReject(e)
                                                  setPopoverIndex(index)
                                                }}
                                                aria-describedby={idReject}

                                              />
                                            }
                                            <Popover
                                              id={idReject}
                                              open={(popoverIndex === index) && openRejectApp}
                                              anchorEl={anchorReject}
                                              onClose={handleCloseReject}
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
                                                {employeeData && getAppraiserRejectionAttachments(j?.name?._id)?.map((k: any, index1: any) => {
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
                                      )}
                                    {showRenormalizedData && employeeData?.data?.employee?.objective_description?.filter((item: any) =>
                                      item.rating_rejected == true).length > 0 && (
                                        <>
                                          <TableCell
                                            width="10px"
                                            sx={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                              wordBreak: "break-word",
                                              background: "#ffffff",
                                              padding: "0px 8px"
                                            }}
                                            align="center"
                                          >
                                            <div style={{ display: "inline-flex" }}>
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
                                                    if (k?.ratings && k.rating_rejected == true)
                                                      return <RatingBackground style={{ color: "white", background: "#D2122E" }}>{k?.ratings?.rating}</RatingBackground>;
                                                    else return ""
                                                  })[0]}
                                            </div>
                                          </TableCell>
                                          <TableCell
                                            width="200px"
                                            sx={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                              wordBreak: "break-word",
                                              background: "#fffff",
                                            }}
                                            align="left"
                                          >
                                            <Stack
                                              direction="row"
                                              justifyContent="space-between"
                                              alignItems="center"
                                              spacing={2}>
                                              {employeeData &&
                                                employeeData?.data?.employee?.objective_description
                                                  .filter(
                                                    (i: any) =>
                                                      i?.name?._id === j?.name?._id
                                                  )

                                                  .map((k: any) => {
                                                    if (k.rating_rejected) return k.rejection_reason;
                                                  })[0]}

                                              {employeeData && j.rejection_reason &&
                                                getEmployeeRejectionAttachments(j?.name?._id)?.length > 0 &&
                                                (employeeData?.data?.employee?.objective_description
                                                  .filter((i: any) => i?.name._id == j?.name?._id)
                                                  .map((j: any) => j.rating_rejected)[0]) && (
                                                  <AttachFileIcon
                                                    style={{
                                                      color: "#93DCFA",
                                                      height: "18px",
                                                      transform: "rotate(30deg)",
                                                      cursor: "pointer",
                                                    }}
                                                    aria-describedby={"id"}
                                                    onClick={(e: any) => {
                                                      handleClickOpenEmployeeRejectionAttachment(e, j);
                                                      setPopoverIndex(index);
                                                    }}
                                                  />
                                                )}
                                              <Popover
                                                id={"id"}
                                                open={popoverIndex === index && openEmployeeRejectionAttachment}
                                                anchorEl={anchorEmployeeRejectionAttachment}
                                                onClose={handleCloseEmployeeRejectionAttachment}
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
                                                      getEmployeeRejectionAttachments(
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
                                                                {disableTextAfterSubmission ?
                                                                  <img
                                                                    src={Removeattnew}
                                                                    style={{ cursor: "default" }}
                                                                  /> :
                                                                  <img
                                                                    src={Removeattnew}
                                                                    style={{ cursor: "pointer" }}
                                                                    onClick={() =>
                                                                      deleteEmployeeMutation(
                                                                        {
                                                                          employee_id:
                                                                            employee_id,
                                                                          objective_description: j.name._id,
                                                                          name: k.remove,
                                                                        }
                                                                      )
                                                                    }
                                                                  />
                                                                }

                                                              </Stack>
                                                            </Stack>
                                                          </>
                                                        );
                                                      })}
                                                  </Typography>
                                                </div>
                                              </Popover>
                                            </Stack>
                                          </TableCell>
                                        </>
                                      )}
                                    {employeeData?.data?.appraisal?.status == "completed" &&
                                      employeeData?.data?.normalizer?.normalizer_status == "re-normalized" &&
                                      employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
                                        item.rating_resubmitted == true)?.length > 0 && (

                                        <>
                                          <TableCell
                                            width="10px"
                                            sx={{
                                              fontSize: "14px",
                                              // color: "#333333",
                                              // color: "#3e8cb5",
                                              fontFamily: "Arial",
                                              wordBreak: "break-word",
                                              background: "#ffffff",
                                              padding: "0px 2px"
                                            }}
                                            align="center"
                                          >
                                            <div style={{ display: "inline-flex" }}>

                                              {employeeData &&
                                                employeeData?.data?.normalizer?.objective_description
                                                  .filter(
                                                    (i: any) =>
                                                      i?.name?._id === j?.name?._id
                                                  )
                                                  .map((k: any) => {
                                                    if (k.rating_resubmitted)
                                                      return <RatingBackground style={{ color: "white", background: "grey" }}>{k?.ratings?.rating}</RatingBackground>
                                                    else return k?.ratings?.rating
                                                  })[0]}
                                            </div>
                                          </TableCell>
                                          {employeeData?.data?.normalizer?.objective_description?.filter((item: any) =>
                                            item.rating_resubmitted == true).length > 0 && (
                                              <TableCell
                                                width="200px"
                                                sx={{
                                                  fontSize: "14px",
                                                  color: "#333333",
                                                  fontFamily: "Arial",
                                                  background: "#fbfbfb",
                                                }}
                                                align="left"
                                              >
                                                <Stack
                                                  direction="row"
                                                  justifyContent="space-between"
                                                  alignItems="center"
                                                  spacing={2}
                                                ><Typography style={{
                                                  fontSize: "14px",
                                                  color: "#333333",
                                                  fontFamily: "Arial",

                                                }} >
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
                                                          return k.rating_resubmitted && k?.rejection_reason;
                                                        })[0]}
                                                  </Typography>

                                                  {employeeData && getAttachmentsNormalizer(j?.name?._id)?.length > 0 &&
                                                    (employeeData?.data?.normalizer?.objective_description
                                                      .filter(
                                                        (i: any) =>
                                                          i?.name?._id === j?.name?._id
                                                      )

                                                      .map((k: any) => {
                                                        return k?.rating_resubmitted;
                                                      })[0]) &&
                                                    <AttachFileIcon
                                                      style={{
                                                        color: "#93DCFA",
                                                        height: "18px",
                                                        transform: "rotate(30deg)",
                                                        cursor: 'pointer'
                                                      }}
                                                      onClick={(e: any) => {
                                                        handleClick10(e)
                                                        setPopoverIndex(index)
                                                      }}
                                                      aria-describedby={"id8"}

                                                    />
                                                  }
                                                  <Popover
                                                    id={id10}
                                                    open={(popoverIndex === index) && open10}
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
                                                      {employeeData && getAttachmentsNormalizer(j?.name?._id)?.map((k: any, index1: any) => {
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
                                                    </div>
                                                  </Popover>
                                                </Stack>
                                              </TableCell>
                                            )}
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
                    {employeeData &&
                      ((employeeData?.data?.employee?.employee_status == "pending" ||
                        employeeData?.data?.employee?.employee_status == "draft") ?
                        (
                          <>
                            {employeeData?.data?.appraisal?.status !== "rejected" && (
                              <Button
                                disabled={disableButtons}
                                style={{
                                  textTransform: "none",
                                  fontSize: "15px",
                                  fontFamily: "Arial",
                                  borderColor: "#3E8CB5",
                                  marginRight: "16px",
                                  background: "transparent",
                                  width: "70px",
                                  height: "35px",
                                  ...((disableButtons) && {
                                    cursor: "not-allowed",
                                    borderColor: "#ccc",
                                    color: "#ccc",
                                  }),

                                }}
                                variant="outlined"
                                onClick={handleClickOpen}
                              >
                                {" "}
                                Accept
                              </Button>
                            )}

                            {employeeData?.data?.appraisal?.status !== "rejected" && (
                              <Button
                                disabled={disableButtons}
                                style={{
                                  textTransform: "none",
                                  fontSize: "15px",
                                  fontFamily: "Arial",
                                  borderColor: "#3E8CB5",
                                  color: "#3e8cb5",
                                  background: "transparent",
                                  width: "70px",
                                  height: "35px",
                                  ...((disableButtons) && {
                                    cursor: "not-allowed",
                                    borderColor: "#ccc",
                                    color: "#ccc",
                                  }),

                                }}
                                variant="outlined"
                                onClick={handleClickOpen3}
                              >
                                Reject
                              </Button>
                            )}

                            {employeeData?.data?.appraisal?.status === "rejected" && (
                              <Button
                                disabled={disableButtons}
                                style={{
                                  textTransform: "none",
                                  fontSize: "15px",
                                  fontFamily: "Arial",
                                  borderColor: "#3E8CB5",
                                  color: "#3e8cb5",
                                  background: "transparent",
                                  // width: "70px",
                                  height: "35px",
                                  ...((disableButtons) && {
                                    cursor: "not-allowed",
                                    borderColor: "#ccc",
                                    color: "#ccc",
                                  }),

                                }}
                                variant="outlined"
                                onClick={handleClickOpen3}
                              >
                                Re-submit
                              </Button>
                            )}
                          </>
                        )
                        :
                        (employeeData?.data?.appraisal?.status == "completed" &&
                          employeeData?.data?.normalizer?.normalizer_status == "re-normalized") ?
                          // ("Your final performance appraisal rating after mediation was finalized by the HR Normalizer.") : (
                          ("Your final overall rating was re-normalized.") : (
                            employeeData?.data?.appraisal?.status == "completed" ?
                              "The performance appraisal was completed."
                              :
                              "The performance appraisal was submitted."
                          ))
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


                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>

                  <Typography
                    style={{
                      marginTop: "20px",
                      fontSize: "20px",
                      color: "#3E8CB5",
                      fontFamily: "Arial",
                      marginBottom: "20px"
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

                    <FeedbackQuestionnaireAppraiser />

                    {showArea && (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            height="20px"
                            marginBottom="10px"

                          // paddingRight="72px"
                          >
                            <div
                              style={{
                                color: "#717171",
                                fontSize: "16px",
                                fontFamily: "Arial",
                              }}
                            >
                              <b>Areas for Improvement (Appraiser)</b>
                            </div>
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "right",
                                alignItems: "right",
                              }}
                            >
                              {/* {filterData1 &&
                              filterData1.map((i: any, index: any) => {
                                console.log(i, "123");
                                return ( */}
                              {/* <>

                                <IconButton
                                  size="small"
                                  style={{
                                    // textTransform: "none",
                                    // height: "20px",
                                    // minWidth: "2px",
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
                                      <Addmore
                                        style={{
                                          cursor: "pointer",
                                          color: "#3E8CB5",
                                          fontSize: "14px",
                                        }}
                                        onClick={() =>
                                          // handleSpecificRemove(index)
                                          showEmployeeAreaApp()
                                        }
                                      >
                                        <img src={Blueminus} />
                                      </Addmore>
                                    </Tooltip>
                                  ) : (
                                    <Tooltip title="Add">
                                      <img src={Blueadd} />
                                    </Tooltip>
                                  )}
                                </IconButton>
                              </> */}
                              {/* )
                              })} */}
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
                                                        <span
                                                          style={{
                                                            fontSize: "14px",
                                                            color: "#333333",
                                                            fontFamily: "Arial",
                                                            wordBreak: "break-word"
                                                          }}
                                                        >
                                                          {k.value}
                                                          <br />
                                                        </span>
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
                      </>

                    )}

                  </div>
                  {(
                    // { (
                    <div style={{ marginRight: "10px", marginBottom: "20px" }}>
                      {/* <div style={{ paddingTop: "20px", color: "#717171", paddingBottom: "7px" }}>
                    Employee Area(s) of Improvement
                  </div> */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        height="20px"
                        marginBottom="10px"

                      >
                        <div
                          style={{
                            color: "#717171",
                            fontSize: "16px",
                            fontFamily: "Arial",
                          }}
                        >
                          <b> Areas for Improvement (Employee)</b>
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
                                          readOnly: disableTextAfterSubmission
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
                                          setnavPrompt(true)
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
                                                            readOnly: disableTextAfterSubmission
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
                                                            setnavPrompt(true)
                                                          }}
                                                        />
                                                      </Box>
                                                    </Tf4>

                                                    {/* {specificActionList.length -
                                                      1 ===
                                                      index &&
                                                      specificActionList.length <
                                                      6 && (
                                                        <IconButton
                                                        disabled = {disableTextAfterSubmission}
                                                          onClick={
                                                            handleSpecificAdd
                                                          }
                                                        >
                                                          plus
                                                        </IconButton>
                                                      )} */}
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


                                      {area.length !== 0 && (
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
                                              //  InputProps={{
                                              //   disableUnderline: true,
                                              //   readOnly: disableTextAfterSubmission
                                              // }}
                                              style={{
                                                cursor: "pointer",
                                                color: "#3E8CB5",
                                                fontSize: "14px",
                                              }}
                                              onClick={() =>
                                                handleSpecificRemove(index)
                                              }
                                            >
                                              <img src={Blueminus} alt="icon" style={{ cursor: disableTextAfterSubmission ? "default" : "pointer" }} />
                                            </Addmore>
                                          </Tooltip>
                                        </Stack>
                                      )}

                                    </Stack>
                                    {area.length - 1 === index && (
                                      <div>
                                        {disableTextAfterSubmission ?
                                          <Addmore
                                            style={{
                                              cursor: "default",
                                              color: "#3E8CB5",
                                              fontSize: "14px",
                                            }}
                                          >
                                            <img src={Blueadd} alt="icon" />
                                          </Addmore>
                                          :
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
                                          </Tooltip>}
                                      </div>
                                    )}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                        </TableBody>
                      </Table>
                    </div>
                  )}

                  {showTrainingRecommendation && (
                    <>
                      <div style={{ marginRight: "65px", marginBottom: "20px" }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="baseline"
                          height="20px"
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
                            {/* {employeeData &&
                              objectiveTitleData &&
                              Training.map((j: any, index: any) => {
                                return ( */}
                            {/* <>
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
                                    <Addmore
                                      style={{
                                        cursor: "pointer",
                                        color: "#3E8CB5",
                                        fontSize: "14px",
                                      }}
                                      onClick={() =>
                                        removeFormFieldsApp()
                                        // removeFormFields(index)
                                        // handleSpecificRemove(index)
                                      }
                                    >
                                      <img src={Blueminus} alt="icon" />
                                    </Addmore>
                                  </Tooltip>

                                ) : (
                                  <Tooltip title="Add">
                                    <img src={Blueadd} alt="icon" />
                                  </Tooltip>
                                )}
                              </Button>
                            </> */}
                            {/* )
                              })} */}
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
                            Training.map((j: any, index: any) => {
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
                                    > <IconButton
                                      // aria-describedby={id2}
                                      onClick={(e: any) => {
                                        handleClickInfo6(e)
                                        setPopoverIndex(index);
                                      }}
                                    // style={{marginRight:"5px"}}
                                    >
                                        <img width="12px" src={Infoicon} alt="icon" />
                                      </IconButton>
                                      {j.name.title}

                                      <Popover
                                        id={id6}
                                        open={(popoverIndex === index) && openInfo6}
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
                    </>
                  )}
                  {/* {showTrainingRecommendations && ( */}
                  {(

                    <div style={{ marginBottom: "20px" }}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        height="20px"
                        marginBottom="10px"
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

                      <Table size="small" >
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

                                    <Stack
                                      sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                      }}
                                      direction={"row"}
                                      spacing={2}>
                                      {element?.name != "" && (
                                        <IconButton
                                          // aria-describedby={id7}
                                          onClick={(e: any) => {
                                            handleClickInfo7(e)
                                            setPopoverIndex(index);
                                          }}
                                        // style={{marginRight:"5px"}}
                                        >
                                          <img width="12px" src={Infoicon} alt="icon" />
                                        </IconButton>
                                      )}

                                      <Select
                                        sx={{
                                          boxShadow: 'none',
                                          '.MuiOutlinedInput-notchedOutline': { border: 0 },
                                          background: "f8f8f8"
                                        }}

                                        // disabled={disableTextAfterSubmission}
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
                                                  disabled={disableTextAfterSubmission}
                                                >
                                                  {training.name.title}
                                                </MenuItem>
                                              );
                                            }
                                          )}
                                      </Select>

                                      <Popover
                                        id={id7}
                                        open={(popoverIndex === index) && openInfo7}
                                        anchorEl={anchorEl9}
                                        onClose={handleCloseInfo7}
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
                                          {trainingSelectValue &&
                                            trainingSelectValue.map((TrainingData: any) => {
                                              console.log(TrainingData.name._id, "TrainingData")
                                              console.log(formValues[0].name, "TrainingDatas")

                                              return (
                                                <>
                                                  {formValues &&
                                                    formValues[index]?.name === TrainingData.name._id && TrainingData?.name?.definition}
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
                                        readOnly: disableTextAfterSubmission
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
                                        readOnly: disableTextAfterSubmission
                                      }}
                                    ></TextField>
                                  </Tf3>
                                </TableCell>

                                {/* <TableCell>{item.comments}</TableCell> */}
                                <TableCell style={{ borderColor: "#ffffff" }}>


                                  {/* {formValues.length !== index + 1 && ( */}
                                  {formValues.length !== 0 && (
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
                                          marginTop: "6px",
                                        }}
                                        disabled={disableTextAfterSubmission}
                                        onClick={() => removeFormFields(index)}
                                      >
                                        <img src={Blueminus} alt="icon" style={{ cursor: disableTextAfterSubmission ? "default" : "pointer" }} />
                                      </Button>
                                    </Tooltip>
                                  )}

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
                                            marginTop: "6px",
                                          }}
                                          disabled={disableTextAfterSubmission}
                                          onClick={() => {
                                            addFormFields()
                                            setnavPrompt(true)
                                          }
                                          }
                                        >
                                          <img src={Blueadd} alt="icon" style={{ cursor: disableTextAfterSubmission ? "default" : "pointer" }} />
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
                  {employeeData?.data?.appraisal?.appraiser_overall_feedback !== null &&
                    employeeData?.data?.appraisal?.appraiser_overall_feedback !== "" &&
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "16px",
                          color: "#717171",
                          marginBottom: "10px",
                          fontFamily: "arial"
                        }}
                      >
                        <b>Appraiser Message for Employee</b>
                      </Typography>
                      <Typography
                        style={{
                          fontSize: "14px",
                          fontFamily: "arial",
                          color: "#333333",
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
                            // inputProps={{ maxLength: 500 }}
                            size="small"
                            value={
                              employeeData?.data?.appraisal?.appraiser_overall_feedback
                            }
                          />
                        </Tf1>

                      </Typography>
                    </div>
                  }


                  {employeeData?.data?.normalizer?.reason_for_rejection &&
                    employeeData?.data?.appraisal?.status == "completed" &&
                    employeeData?.data?.normalizer?.normalizer_status == "re-normalized" &&
                    employeeData?.data?.normalizer?.reason_for_rejection !== "" && employeeData?.data?.normalizer?.reason_for_rejection !== undefined && (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          <Typography
                            style={{
                              fontSize: "16px",
                              color: "#717171",
                              fontFamily: "arial",
                              marginBottom: "10px",
                            }}
                          >
                            <b>HR Normalizer Comments</b>
                          </Typography>

                          <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                            <div style={{
                              color: "#333333",
                              fontSize: "14px",
                              fontFamily: "arial",
                              fontWeight: "400",
                              textTransform: "none",
                              // padding: "8px",
                              textAlign: "left",
                              lineHeight: "23px"
                            }}>
                              {employeeData?.data?.normalizer?.reason_for_rejection}
                            </div>

                          </Box>
                        </div>
                      </>
                    )}


                  {employeeData?.data?.appraisal?.status == "completed" &&
                    employeeData?.data?.normalizer?.normalizer_status == "re-normalized" &&
                    (employeeData?.data?.normalizer?.isAppraiserChecked ||
                      employeeData?.data?.normalizer?.isEmployeeChecked ||
                      employeeData?.data?.normalizer?.isReviewerChecked) && (
                      <div style={{ marginBottom: "20px" }}>
                        <Typography
                          style={{
                            fontSize: "16px",
                            color: "#717171",
                            marginBottom: "10px",
                            fontFamily: "Arial"
                          }}
                        >
                          <b>HR Normalizer discussed the rating with</b>
                          {/* <span style={{
                  fontSize: "22px",
                }}>*</span>  */}
                        </Typography>
                        <FormGroup>
                          <FormControlLabel
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              },
                            }}
                            control={
                              <Checkbox sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "18px !important",
                                },
                              }} checked={appraiserChecked} name="Appraiser" />
                            }
                            label="Appraiser"
                          />
                          <FormControlLabel
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              },
                            }}
                            control={
                              <Checkbox sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "18px !important",
                                },
                              }} checked={reviewerChecked} name="Reviewer" />
                            }
                            label="Reviewer"
                          />
                          <FormControlLabel
                            sx={{
                              "& .MuiFormControlLabel-label": {
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              },
                            }}
                            control={
                              <Checkbox sx={{
                                "& .MuiSvgIcon-root": {
                                  fontSize: "18px !important",
                                },
                              }} checked={employeeChecked} name="Employee" />
                            }
                            label="Employee"
                          />

                        </FormGroup>
                      </div>
                    )}


                  {employeeData?.data?.appraisal?.status === "completed" &&
                    employeeData?.data?.normalizer?.normalizer_status == "re-normalized" &&
                    employeeData?.data?.normalizer?.normalizer_meeting_notes !== "" && (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          <Typography
                            style={{
                              fontSize: "16px",
                              color: "#717171",
                              fontFamily: "arial",
                              marginBottom: "10px",
                            }}
                          >
                            <b>HR Normalizer Meeting Notes</b>
                          </Typography>

                          <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                            <div style={{
                              color: "#333333",
                              fontSize: "14px",
                              fontFamily: "arial",
                              fontWeight: "400",
                              textTransform: "none",
                              // padding: "8px",
                              textAlign: "left",
                              lineHeight: "23px"
                            }}>
                              {employeeData?.data?.normalizer?.normalizer_meeting_notes}
                            </div>

                          </Box>
                        </div>

                        <div style={{ marginBottom: "20px" }}>
                          <Typography
                            style={{
                              fontSize: "16px",
                              color: "#717171",
                              fontFamily: "arial",
                              marginBottom: "10px",
                            }}
                          >
                            <b>HR Normalizer Attachment</b>
                          </Typography>

                          <AttachFileIcon
                            sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                            aria-describedby={"id"}
                            onClick={(e: any) => {
                              handleClickOpenMeetingAttachment(e)
                            }}
                          />
                        </div>
                        <Popover
                          id={"id"}
                          open={openMeetingAttachment}
                          anchorEl={anchorMeetingAttachment}
                          onClose={handleClose8}
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
                            {employeeData && employeeData?.data?.normalizer?.meetingNotesAttachments?.map((k: any, index1: any) => {
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
                                      <a href={k.url}>{k.name}</a>  <br />
                                    </Typography>
                                  </Stack>
                                </>
                              )
                            })}
                          </div>
                        </Popover>
                      </>
                    )}


                  {/* {employeeData && employeeData.data.employee.employee_status == "pending" && (
                  <> */}
                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                      style={{
                        fontSize: "16px",
                        color: "#717171",
                        marginBottom: "10px",
                        fontFamily: "arial"
                      }}
                    >
                      <b>Employee Comments</b><span style={{
                        fontSize: "22px",
                      }}></span>
                    </Typography>
                    <div style={{ marginRight: "65px" }}>
                      <Text>
                        <TextField
                          // sx={{maxWidth:"95%"}}
                          // fullWidth
                          autoComplete="off"
                          InputProps={{
                            disableUnderline: true,
                            readOnly: disableTextAfterSubmission
                          }}
                          size="small"
                          multiline
                          placeholder="Add"
                          value={employeeComments}
                          // inputProps={{ maxLength: 512 }}
                          onChange={(e) => {
                            setEmployeeComments(e.target.value);
                            setMoveTab(true);
                            setnavPrompt(true);
                          }}
                        // error={!employeeComments && textfeildError}
                        // helperText={
                        //   !employeeComments && textfeildError
                        //     ? "*Employee comments are required."
                        //     : " "
                        // }
                        // variant="standard"
                        // InputProps={{
                        //   disableUnderline: true, // <== added this
                        // }}
                        />
                      </Text>
                    </div>
                  </div>
                  {/* </>
                )} */}

                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                      style={{
                        fontSize: "16px",
                        color: "#717171",
                        marginBottom: "10px",
                        fontFamily: "arial"
                      }}
                    >
                      <b>One-to-One Meeting Date</b><span style={{
                        fontSize: "22px",
                      }}>*</span>
                    </Typography>
                    <div>
                      <input
                        type="date"
                        name="one_to_one_meeting_date"
                        style={{
                          width: "250px",
                          color: "#7b7b7b",
                          height: "37px",
                          border: "1px solid #c6c6c6",
                          borderRadius: "3px",
                          background: "none",

                        }}
                        disabled={disableTextAfterSubmission}
                        value={oneToOneMeetingDate}
                        // min={employeeData?.data?.calendar?.end_date_normalizer?.slice(0, 10)}
                        min={employeeData?.data?.normalizer?.normalized_Date?.slice(0, 10)}
                        max={new Date().toISOString().slice(0, 10)}
                        // data-date=""
                        data-date-format="DD MMMM YYYY"
                        onKeyDown={(e) => {
                          if (e.code !== "Tab") {
                            e.preventDefault();
                          }
                        }}
                        onChange={(e) => {
                          handleOneToOneMeetingDate(e);
                          setnavPrompt(true);
                          setMoveTab(true);
                        }}
                      />
                    </div>
                  </div>

                  {/* {employeeData && (employeeData.data.appraisal.show_employee == true && employeeData.data.employee.employee_status !== "pending") && (
                  <>
                     <Typography
                    style={{
                      fontSize: "16px",
                      color: "#717171",
                      paddingTop: "20px",
                      paddingBottom: "10px",
                      fontFamily: "arial"
                    }}
                  >
                    <b>Employee Rejection Reason</b><span style={{
                      fontSize: "22px",
                    }}></span>
                  </Typography>
                  <div style={{ marginRight: "65px" }}>
                    <Text>
                      <TextField
                        fullWidth
                        InputProps={{ readOnly: true, }}
                        multiline
                        inputProps={{ maxLength: 500 }}
                        size="small"
                        value={employeeData?.data?.employee?.rejection_reason}
                        // sx={{maxWidth:"95%"}}
                        // fullWidth
                        // autoComplete="off"
                        // size="small"
                        // multiline
                        // placeholder="Add"
                        // value={employeeComments}
                        // inputProps={{ maxLength: 512 }}
                        // onChange={(e) => {
                        //   setEmployeeComments(e.target.value);
                        //   setMoveTab(true);
                        //   setnavPrompt(true);
                        // }}
                      // error={!employeeComments && textfeildError}
                      // helperText={
                      //   !employeeComments && textfeildError
                      //     ? "*Employee comments are required."
                      //     : " "
                      // }
                      // variant="standard"
                      // InputProps={{
                      //   disableUnderline: true, // <== added this
                      // }}
                      />
                    </Text>
                  </div>
                  </>
                )} */}

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
                    {/* {(employeeData?.data?.employee?.employee_status == "pending") ? */}

                    {/* ( */}
                    {employeeData?.data?.appraisal?.pa_status?.includes("Pending with Employee") &&
                      <>
                        <Button
                          disabled={disableButtons}
                          style={{
                            textTransform: "none",
                            fontSize: "15px",
                            fontFamily: "Arial",
                            borderColor: "#3E8CB5",
                            color: "#3E8CB5",
                            marginRight: "16px",
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
                          onClick={saveRecommendationsHandler}
                        >
                          Save as Draft
                        </Button>
                        {employeeData?.data?.appraisal?.status !== "rejected" && (
                          <Button
                            disabled={disableButtons}
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              marginRight: "16px",
                              background: "transparent",
                              width: "70px",
                              height: "35px",
                              ...((disableButtons) && {
                                cursor: "not-allowed",
                                borderColor: "#ccc",
                                color: "#ccc",
                              }),

                            }}
                            variant="outlined"
                            onClick={handleClickOpen}
                          >
                            {" "}
                            Accept
                          </Button>
                        )}

                        {employeeData?.data?.appraisal?.status !== "rejected" && (
                          <Button
                            disabled={disableButtons}
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              color: "#3e8cb5",
                              marginRight: "16px",
                              background: "transparent",
                              width: "70px",
                              height: "35px",
                              ...((disableButtons) && {
                                cursor: "not-allowed",
                                borderColor: "#ccc",
                                color: "#ccc",
                              }),

                            }}
                            variant="outlined"
                            onClick={handleClickOpen3}
                          >
                            Reject
                          </Button>
                        )}

                        {employeeData?.data?.appraisal?.status === "rejected" && (
                          <Button
                            disabled={disableButtons}
                            style={{
                              textTransform: "none",
                              fontSize: "15px",
                              fontFamily: "Arial",
                              borderColor: "#3E8CB5",
                              color: "#3e8cb5",
                              marginRight: "16px",
                              background: "transparent",
                              // width: "70px",
                              height: "35px",
                              ...((disableButtons) && {
                                cursor: "not-allowed",
                                borderColor: "#ccc",
                                color: "#ccc",
                              }),

                            }}
                            variant="outlined"
                            onClick={handleClickOpen3}
                          >
                            Re-submit
                          </Button>
                        )}


                        <Button
                          disabled={disableButtons}
                          style={{
                            textTransform: "none",
                            fontSize: "15px",
                            fontFamily: "Arial",
                            borderColor: "#3E8CB5",
                            color: "#3E8CB5",
                            background: "transparent",
                            height: "35px",
                            marginRight: "16px",
                            width: "70px",
                            ...((disableButtons) && {
                              cursor: "not-allowed",
                              borderColor: "#ccc",
                              color: "#ccc",
                            }),

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
                        <Button
                          disabled={disableButtons}
                          style={{
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
                          // onClick={handleClickOpen3}
                          onClick={() => {
                            // handleClose1();
                            // setValue(0);
                            // moveTab(false);
                            CancelButtonHandler();

                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    }
                    {/* )
                      : "The performance appraisal has been already submitted."
                    } */}


                    {/* <Dialog
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
                    </Dialog> */}
                  </div>
                </TabPanel>
              </Box>
            </>
          )}
        </Box>
      </Box>
      <Dialog
        // fullScreen={fullScreen}
        open={openSaved}
        // onClose={handleCloseSaved}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
      {/* <Dialog
        // fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            Did you have One-to-One meeting with the
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
      </Dialog> */}
      {/* <Dialog
        fullScreen={fullScreen1}
        open={open1}
        // onClose={handleClose1}
        // aria-labelledby="responsive-dialog-title"
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
      </Dialog> */}

      {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
      <AlertDialogOkCancelForUnsavedChanges
        isAlertOpen={openCancelDialog}
        handleAlertClose={rejectCancelButtonHandler}
        handleAlertIdClose={acceptCancelButtonHandler}
      >
      </AlertDialogOkCancelForUnsavedChanges>

      <AlertDialogSuccess
        isAlertOpen={openValidation}
        handleAlertClose={handleValidationClose}>
        {message}
      </AlertDialogSuccess>


      {/*  Dialog for accept button*/}
      <Dialog
        // fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            Did you have One-to-One meeting with the Appraiser?
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

      {/* alert to display for one to one meeting date if not selected */}
      <AlertDialogSuccess
        isAlertOpen={openOneMeeting}
        handleAlertClose={handleCloseOneMeetingAlert}
      >
        {message}
      </AlertDialogSuccess>

      {/*  Dialog for reject button*/}
      <Dialog
        // fullScreen={fullScreen}
        open={openReject}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            Did you have One-to-One meeting with the Appraiser?
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
                handleClickOpenReject();
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

      {/* did you review for accept button */}
      <Dialog
        // fullScreen={fullScreen}
        open={open1}
        // onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            Have you reviewed the overall feedback of the performance appraisal?
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

      {/* did you review for reject button */}
      <Dialog
        // fullScreen={fullScreen}
        open={openReviewReject}
        // onClose={handleClose1}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            Have you reviewed the overall feedback of the performance appraisal?
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
              onClick={rejectHandler}
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
        // fullScreen={fullScreen}
        open={openSuccess}
        onClose={handleCloseSuccess}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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
            The performance appraisal was completed.
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
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        //  PaperComponent={PaperComponent}
        // fullScreen={fullScreen}
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
      // onClose={handleClose2}

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
            You cannot proceed with the performance appraisal. Please make sure to meet with the Appraiser in a one-on-one meeting to discuss your performance appraisal.
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
              Ok
            </Button>
          </DialogActions>
        </div>
      </Dialog>

      <Dialog
        fullScreen={fullScreen3}
        open={open3}
        // onClose={handleClose4}
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
        // BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
        PaperProps={{
          style: {
            // borderColor:'blue',
            //border:'1px solid',
            boxShadow: "none",
            borderRadius: "6px",
            //marginTop: "155px",
            maxWidth: "-1px",
            minWidth: "33%",
            // maxWidth: "0px",
            // minWidth: "26%",
            margin: "0px",
            padding: "6px",
            // padding :"30px"
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
              // whiteSpace: "nowrap",
              // paddingBottom: "12px",
              // paddingRight: "10px",
              // paddingLeft: "10px",
              whiteSpace: "nowrap",
              // overflow: "hidden",
              // textOverflow: "ellipsis",
              display: "flex",
              justifyContent: "center",
              textAlign: "justify",
              wordBreak: "break-word",
              // height: "100px",
              alignItems: "center",
              // overflowY: "hidden",
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
                  control={<Radio size="small" />}
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
                  control={<Radio size="small" />}
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
       <AlertDialogSuccess
            isAlertOpen={open33}
            handleAlertClose={handlemessage3}
          >
            {message2}
          </AlertDialogSuccess>
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
      <Snackbar
        className={classes.customSnackbar}
        open={successAlertTrigerconfirmation}
        autoHideDuration={3000}
        onClose={handleCloseSnackbarconfirmation}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          className={classes.customAlert}
          onClose={handleCloseSnackbarconfirmation}
          sx={{ width: '100%' }}
          icon={false}
        >
          <b>{successAlertTrigerMSGconfirmation}</b>
        </Alert>
      </Snackbar>
      {/* confirmation */}
    </div>
  );
}
