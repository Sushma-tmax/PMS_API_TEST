import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import RTrecommandation from "./TrainingRecommendation";
import Checkboxs from "./FurtherRecommendation";
import Footerbuttons from "./OverallTab__FooterButtons";
import OverallFeedback from "./AppraiserMessageForEmployee";
import { Link, Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useAppraisalContext } from "../../../../context/appraiserOverviewContext";
import Closeiconred from "../../../assets/Images/Closeiconred.svg";
import {
  APPRAISER_VIEW_PA,
  CREATE_APPRAISAL,
  REVIEWER_PAGE,
} from "../../../../constants/routes/Routing";
import Divider from "@mui/material/Divider";
import Timelinerevview from "../../../reviewer/Dashboard/Timelinerevview";
import Header from "./Header";
import { positions } from "@mui/system";
import {
  Button,
  IconButton,
  Popover,
  Popper,
  TextField,
  Typography,
  Modal,
  ClickAwayListener,
  Alert,
  Snackbar,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import Infowhiteicon from "../../../../assets/Images/Infowhiteicon.svg";
import Removeatt from "./icons/Removeatt.svg";
import Removeattnew from "../../../../assets/Images/Removeattnew.svg";
import Downloadatt from "../../../../assets/Images/Downloadatt.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Uploadatt from "../../../../assets/Images/Uploadatt.svg";
import {
  useAttachmentsAppraiserDeleteMutation,
  useCreateEmployeeAppraisalMutation,
  useGetEmployeeAppraisalQuery,
  useGetObjectiveTitleQuery,
  useGetRatingScaleQuery,
  useUpdateEmployeeAppraisalMutation,
} from "../../../../service";
import Eye from "../../../../assets/Images/Eye.svg";
import { useAppraiserRejectsReviewerContext } from "../../../../context/AppraiserRejectsReviewer";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AlertDialog from "../../../UI/Dialog";
import { Scrollbar } from "react-scrollbars-custom";
import { flushSync } from "react-dom";
import {
  useAttachmentsAppraiserOverviewDeleteMutation,
  useAttachmentsAppraiserOverviewMutation,
} from "../../../../service/employee/appraisal/appraisal";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetEmailIdsQuery, useSendEmailNotificationMutation } from "../../../../service/email/emailNotification";
import { APPRAISER_SUBMITS_TO_REVIEWER } from "../../../../constants/AppraisalEmailContents/NotificationForAction/Appraiser";
import AlertAcceptDialog from "../../../UI/DialogAccept";
import _ from "lodash";
import { makeStyles } from '@mui/styles';
import Performancefeedbacksummary from "./AreasOfImprovement";
import AlertDialogOkCancelForUnsavedChanges from "../../../UI/DialogforunsavedChangesAlert";
import { useCheckRoleLogsMutation } from "../../../../service/employee/employee";
import AlertDialogSuccess from "../../../UI/DialogSuccess";

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
//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);

  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
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

//prompt -------functions

const New = styled("div")({
  "& .MuiMenuItem-root": {
    justifyContent: "center !important",
  },
});
const Text = styled("div")({
  // position: "absolute",
  width: "100%",

  "& .MuiInputBase-input": {
    fontWeight: "400",
    textTransform: "none",
    fontFamily: "Arial",
    fontSize: "14px",
    color: "#333333",
    // backgroundColor: "#f8f8f8",
    backgroundColor: "#ededed",
    padding: "5px",
    borderRadius: "5px",
    // minHeight: "50px",
  },
});
const popUp = styled("div")({
  // position: "absolute",
  // width: "96%",

  "& .MuiPopover-paper": {
    top: "85px",
  },
});
const styles = {
  noUnderline: {
    borderBottom: 'none', // Remove the bottom border
  },
  narrowColumn: {
    width: '30px', // Adjust the width of the rating column as needed
    wordWrap: 'break-word',
  },
  noWrap: {
    whiteSpace: 'nowrap', // Prevent wrapping for the Rating Title column
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
};
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});

const Train = styled("div")({
  "& .MuiInputBase-root": {
    // color: "rgb(51 51 51/50%)",
    fontSize: "14px",
    color: "#333333",
    textTransform: "none",
    fontFamily: "Arial",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    padding: "5px",
  },
});
// const Container1 = styled("div")({
//   background: "#fff",
//   // width: "96%",
//   // marginLeft: "25px",
//   // marginRight: "25px",
//   // marginTop: "20px",
//   // textTransform: "none",
// });
const Container3 = styled("div")({
  background: "#fff",
  // width: "96%",
  marginLeft: "25px",
  marginRight: "25px",
  // marginTop: "20px",
  textTransform: "none",
  position: "relative",
});
// const Container2 = styled("div")({
//   background: "rgb(0 142 151/0.05)",
//   width: "100%",
//   marginTop: "15px",
// });
const Footer = styled("div")({
  // marginLeft: "450px",
  marginTop: "120px",
  paddingBottom: "45px",
});
const Divide = styled("div")({
  marginTop: "-21px",
  marginLeft: "24px",
  marginRight: "24px",
  paddingbottom: "35px",
});

const Heading1 = styled("div")({
  fontSize: "24px",
  fontWeight: 400,
  color: "#004C75",
  marginLeft: "25px",
  // marginTop: "20px",
  fontFamily: "Arial",
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
        <Box >
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
function TabPanel2(props: TabPanelProps) {
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
        <Box >
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

const AppraiserOverview = (props: any) => {
  const { employee1Data, training1Data, other1Data, fetchCancel, fetchCancel1, fetchCancel2, fetchCancel3, ratingScaleData,
  } = props;
  // @ts-ignore
  const { appraisal, otherscheckbox, otherRecommendationothers, otherRecommendation, areaImprovement, moveTab, setMoveTab, potentialValue, reviewedOverallFeedback, setReviewedOverallFeedback, trainingRecommendationFormValues, disableTextAfterSubmission, disableButtons, setDisableButtons, checkboxIdHandler, checkboxHandler ,overallFeed, appOverallFeed} =
    useAppraisalContext();
  const classes = useStyles();
  const { employee_id } = useParams();
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);
  const CustomScrollbar = Scrollbar as any;
  const formIsDirty = navPrompt;
  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(null);
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;
  //new alert funcs
  const [successAlertTriger, setSuccessAlertTriger] = useState(false);
  const [successAlertTrigerMSG, setSuccessAlertTrigerMSG] = useState("Changes were successfully saved.");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLButtonElement | null>(null);
  const [anchorEl4, setAnchorEl4] = React.useState<HTMLButtonElement | null>(null);
  const openInfo = Boolean(anchorEl);
  const openInfo1 = Boolean(anchorEl1);
  const openInfo4 = Boolean(anchorEl4);
  const id2 = openInfo ? "simple-popover" : undefined;
  const id4 = openInfo4 ? "simple-popover" : undefined;
  const id3 = openInfo1 ? "simple-popover" : undefined;
  const [selectOpen, setSelectOpen] = React.useState(false);
  let navigate = useNavigate();
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState<any>();
  const [appraiserComments, setAppraiserComments] = useState<any>("");
  const [ratingtitle, setratingtitle] = useState<any>("");

  const [fileSelected, setFileSelected] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<any>(false);
  const [open2, setOpen2] = useState<any>(false);
  const [open3, setOpen3] = useState<any>(false);
  const [open1, setOpen1] = useState<any>(false);
  const [message, setMessage] = useState<any>("");
  const [message2, setMessage2] = useState<any>("");
  const [emptyArea, setEmptyArea] = useState(false);
  const [emptyAreaMessage, setEmptyAreaMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [popoverIndex, setPopoverIndex] = useState("");
  const [navigateDashboard, setNavigateDashboard] = useState<any>(false);
  const [appraiserRatingPreviousSubmission, setAppraiserRatingPreviousSubmission] = useState<any>("")
  const [cancelChangesAlert, setCancelChangesAlert] = useState(false);
  // mutations
  const [isCheckedothers, setisCheckedothers] = useState(false);
  const { data: employeeData, isFetching: employeeDataIsFetching, isLoading: employeeDataIsLoading } =
    useGetEmployeeAppraisalQuery(employee_id);
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const { data: ratingData } = useGetRatingScaleQuery("");
  const [updateObjectiveDescription] = useUpdateEmployeeAppraisalMutation();
  const [sendItem, { data, isLoading: isUploading }] =
    useCreateAzureBlobMutation();
  const [attachmentsAppraiser] = useAttachmentsAppraiserOverviewMutation();
  const { data: nineBoxData } = useGetNineboxQuery("");
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [sendEmailNotification] = useSendEmailNotificationMutation();
  const [showIsUploading, setShowIsUploading] = useState<any>(false)
  const { data: emailData } = useGetEmailIdsQuery({ appraiser_code: employeeData?.data?.appraiser_code, reviewer_code: employeeData?.data?.reviewer_code, normalizer_code: employeeData?.data?.normalizer_code })
  const inputRef = useRef<any>(null);
  const [value, setValue] = React.useState<any>(0);
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>([]);
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(null);
  const openInfo6 = Boolean(anchorEls);
  const id6 = openInfo6 ? "simple-popover" : undefined;
  const [updateLoggedRole] = useCheckRoleLogsMutation()

  usePrompt(
    // "Please save the changes before you leave the page.",
    "Any changes you have made will not be saved if you leave the page.",
    formIsDirty);
  //prompt ------functions

  const handleCloseSnackbar = () => {
    setSuccessAlertTriger(false)
    setSuccessAlertTrigerMSG("")
  }

  const handleClick8 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl8(event.currentTarget);
  };

  const handleClose8 = () => {
    setAnchorEl8(null);
  };

  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlemessage3 = () => {
    setOpen3(false);
  }
  const handleCloseInfo = () => {
    setAnchorEl(null);
  };

  const handleClickInfo1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl1(event.currentTarget);
    setAnchorEl1(anchorEl1 ? null : event.currentTarget);
  };

  const handleCloseInfo1 = () => {
    setAnchorEl1(null);
  };

  const handleClickInfo4 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleCloseInfo4 = () => {
    setAnchorEl4(null);
  };



  // new data values

  // states

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (moveTab === true) {
      setOpen(true);
      setMessage("Please save the changes before leaving the page.");
    } else {
      setValue(newValue);
    }
  };


  useEffect(() => {
    if (isUploading == true) {
      setShowIsUploading(true)
    } else if (isUploading == false) {
      setShowIsUploading(false)
    }
  }, [isUploading])

  const getAttachments = (id: any) => {
    return attachedFiles
      ?.filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              {(k.url == k.name) ? (k.name) : (<a href={k.url}> {k.name} </a>)}<br />

            </div>
          ),
          remove: {
            name: k.name,
            objective_description: k.objective_description,
          },
        };

        // return k.name
      });
  };


  // to close dialog

  const handleDialogClose = () => {
    setOpen(false);
    setMessage("");
    // setMoveTab(false);
    if (navigateDashboard === true) {
      navigate(`/dashboardReview`, {
        state: {
          from: 1,
        },
      });
    }
    setDisableButtons(false)
  };

  
  const handleDialogClose2 = () => {
    setOpen2(false);
    setMessage("");
    setValue(1);
    setDisableButtons(false)
  }

  //  to close submit dialog
  const handleDialogCloseYes = () => {
    setReviewedOverallFeedback(true);
    setOpen1(false);
    submitData();
    setMoveTab(false);
    setnavPrompt(false);
    setDisableSubmit(true);
    setNavigateDashboard(true);
  };

  const handleDialogCloseNo = () => {
    setOpen1(false);
    setMessage("");
    setMoveTab(false);
    setnavPrompt(false);
    setValue(1);
  };

  const cancelButtonHandler = () => {
    if (navPrompt == true || moveTab == true) {
      setCancelChangesAlert(true);     
    } else {
      setCancelChangesAlert(false);
      setMessage("");
      navigate(`/dashboardreview`, { state: { from: `${1}` } })
    }
  }

  const handleRejectChanges = () => {
    setCancelChangesAlert(false);
    setMessage("");
  }

  const handleAcceptChanges = () => {
    setMoveTab(false);
    setnavPrompt(false);
    setCancelChangesAlert(false);
    setMessage("");
    fetchCancel().then((res:any) => {
      navigate(`/dashboardreview`, { state: { from: `${1}` } })
    });    
  }

  //Function to remove attachments from object
  const removeAttachments = (fileItem: any) => {
    let files = attachedFiles.map((item: any) => {
      return item;
    });
    files.splice(
      files.findIndex(
        (item: any) =>
          item?.name == fileItem?.name &&
          item?.objective_description == fileItem?.objective_description
      ),
      1
    );
    setAttachedFiles(files);
  };

  //  to get objective data
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
              rating: i.ratings,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
              // attachments_name: getAttachments(i?.name?._id),
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
      setColorarray(objectiveType);
      setAppraiserRatingPreviousSubmission(employeeData.data.appraisal.appraiser_rating);
    }
  }, [employeeData, objectiveTitleData]);


  useEffect(() => {
    setAppraiserComments(() => {
      return employee1Data?.data?.appraisal?.objective_description?.map(
        (i: any) => {
          return {
            ...i,
            comments: i.comments,
            ratings: i?.ratings?._id,
            objective_title: findObjectiveTitleById(i?.name?.objective_title),
            objective_type: findObjectiveTypeById(i?.name?.objective_type),
            // attachments_name: getAttachments(i?.name?._id),
          };
        }
      );
    });
    // const selectedRating = ratingData?.data?.find((rating: any) => rating._id === ratingId);
    // setAppraiserComments(() => {
    //   return appraiserComments?.map((i: any) => {

    //     return i._id === j._id
    //       ? {
    //         ...i,
    //         ratings: ratingId,
    //         definition:selectedRating?.rating_scale,
    //         ratingdef: selectedRating?.definition, // Setting ratingdef here
    //         // rating_scale :selectedRating?.definition // rating_scale
    //       }
    //       : i;
    //   });
    // });
    setAttachedFiles(() => {
      return employeeData?.data?.appraisal?.attachments.filter((item: any) => {
        if (item.name != "") return item;
      });
    });
  }, [employee1Data]);

  const appraiserCommentsHandler = (e: any, j: any) => {
    // const selectedRating = ratingData?.data?.find((rating: any) => rating._id === j);
    setAppraiserComments(() => {
      return appraiserComments?.map((i: any) => {
        return i._id === j._id
          ? {
            ...i,
            comments: e.target.value,
            // rating_scale :selectedRating?.rating_scale 
          }
          : i;
      });
    });


  };

  console.log(ratingtitle, "ratingtitle")
  const appraiserRatingsHandler = (j: any, ratingId: any) => {
    const selectedRating = ratingData?.data?.find((rating: any) => rating._id === ratingId);
    setAppraiserComments(() => {
      return appraiserComments?.map((i: any) => {

        return i._id === j._id
          ? {
            ...i,
            ratings: ratingId,
            rating_scale: selectedRating?.rating_scale,
            ratingdef: selectedRating?.definition, // Setting ratingdef here
            // rating_scale :selectedRating?.definition // rating_scale
          }
          : i;
      });
    });
    console.log(appraiserComments, "appraiserComments")
    if (ratingData && ratingData?.data) {
      const selectedRating = ratingData?.data?.find((rating: any) => rating._id === ratingId);
    }
  }

  const saveData = () => {
    let files = attachedFiles.map((item: any) => {
      return {
        url: item.name,
        objective_description: item.objective_description,
      };
    });
    attachmentsAppraiser({
      id: employee_id,
      attachments: files,
    });

    let trimAppraiserComments = appraiserComments?.map((item: any) => {
      return {
        ...item,
        comments: item?.comments?.trim(),
        definition: item?.definition
      }
    });
    console.log(appraiserComments, "sappraiserComments")
    updateObjectiveDescription({
      "appraisal.objective_description": trimAppraiserComments,
      "appraisal.potential": potentialValue,
      "appraisal.appraiser_status": "draft",
      "appraisal.pa_status": "Pending with Appraiser",
      "appraisal.status": "not-started",
      "current_rating.objective_description": trimAppraiserComments,
      //  "current_rating.overall_rating" : employee1Data?.data?.appraisal?.appraiser_rating,
      id: employee_id,
    }).then((j: any) => {
      if (!j.error) {
        //setOpen(true);//commented to check new alert
        setMoveTab(false);
        setnavPrompt(false);
        //new alert 
        setSuccessAlertTrigerMSG("Changes were successfully saved.")
        setSuccessAlertTriger(true);
        setDisableButtons(false);
      }
      else {
        updateLoggedRole({
          pa_action_by: `Appraiser saved as draft from Rating Tab : ${j.error} : ${new Date()}`,
          id: employee_id
        })
        setMessage2("Something Went Wrong.")
        setOpen3(true)
      }
    });
  };


  const handleClickInfo6 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };
  const handleCloseInfo6 = () => {
    setAnchorEls(null);
  };
  const submitRatingTabData = (Status: any, Message: any) => {
    if (Status === false) {
      setOpen(false);
      let files = attachedFiles.map((item: any) => {
        return {
          url: item.name,
          objective_description: item.objective_description,
        };
      });
      attachmentsAppraiser({
        id: employee_id,
        attachments: files,
      });

      let trimAppraiserComments = appraiserComments?.map((item: any) => {
        return {
          ...item,
          comments: item?.comments?.trim()
        }
      });

      updateObjectiveDescription({
        "appraisal.objective_description": trimAppraiserComments,
        "appraisal.potential": potentialValue,
        "appraisal.appraiser_status": "draft",
        "appraisal.pa_status": "Pending with Appraiser",
        "appraisal.status": "not-started",
        "current_rating.objective_description": trimAppraiserComments,
        // "current_rating.overall_rating" : employee1Data?.data?.appraisal?.appraiser_rating,
        id: employee_id,
      }).then((j: any) => {
        if (!j.error) {
          setMoveTab(false);
          setnavPrompt(false);
        }
      });
    }
  };


  const submitData = () => {
    let files = attachedFiles.map((item: any) => {
      return {
        url: item.name,
        objective_description: item.objective_description,
      };
    });
    attachmentsAppraiser({
      id: employee_id,
      attachments: files,
    });
    let overallRating: any = "0";

    if (appraiserComments.length > 0 && employee1Data) {

      const currentObjectiveDescriptionMapped = appraiserComments?.map((i: any) => {
        const sum = (i.value * i.objective_type.value) / 10000
        let rating = ratingData?.data?.find((item: any) => item._id == i.ratings)?.rating;
        const newSum = sum * rating
        return newSum ? newSum : 0
      })
      overallRating = _.sum(currentObjectiveDescriptionMapped).toFixed(2)

      let trimAppraiserComments = appraiserComments?.map((item: any) => {
        return {
          ...item,
          comments: item?.comments?.trim()
        }
      });

      let trimOverallFeedbackQuestionnaire = overallFeed?.map((item: any) => {
        return {
          ...item,
          value: item?.value?.trim()
        }
      });

      let areaValues = areaImprovement?.filter((item: any) => item?.value?.trim() != "")?.map((item: any) => {
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

      let trainingRecommendationValues = trainingRecommendationFormValues?.filter((item: any) => item.name != "")?.map((item: any) => {
        return {
          ...item,
          training_name: item?.training_name?.trim(),
          justification: item?.justification?.trim(),
        }
      });

      let trimOtherFurtherRecommendation = otherRecommendationothers?.trim();
      let filteredOtherRecommendations = otherRecommendation?.filter((j: any) => j?.isChecked === true);

      if (filteredOtherRecommendations?.length > 0) {
        trimOtherFurtherRecommendation = "";
      }


      updateObjectiveDescription({
        "appraisal.objective_description": trimAppraiserComments,
        "appraisal.appraiser_status": "submitted",
        "appraisal.status": "in-progress",
        "appraisal.appraiser_rejected": false,
        "appraisal.show_appraiser": true,
        "appraisal.pa_status": "Pending with Reviewer",
        // "appraisal.pa_rating": employee1Data?.data?.current_rating?.overall_rating,
        "appraisal.pa_rating": overallRating,
        "appraisal.appraiser_rating": overallRating,
        "appraisal.potential": potentialValue,
        "appraisal_previous_submission.objective_description": trimAppraiserComments,
        "appraisal_previous_submission.appraiser_status": "submitted",
        "appraisal_previous_submission.status": "in-progress",
        "appraisal_previous_submission.appraiser_rating": appraiserRatingPreviousSubmission,
        "appraisal_previous_submission.pa_status": "Pending with Reviewer",
        "appraisal_previous_submission.potential": potentialValue,
        "current_rating.objective_description": trimAppraiserComments,
        "current_previous_submission.objective_description": trimAppraiserComments,
        "appraisal_previous_submission.feedback_questions": trimOverallFeedbackQuestionnaire,
        "appraisal_previous_submission.area_of_improvement": areaValues,
        "appraisal_previous_submission.training_recommendation":
          trainingRecommendationValues,
        "appraisal_previous_submission.other_recommendation": checkboxIdHandler(
          checkboxHandler(otherRecommendation)
        ),
        "appraisal_previous_submission.others_checkbox": otherscheckbox,
        "appraisal_previous_submission.other_recommendation_others": trimOtherFurtherRecommendation,
        "appraisal_previous_submission.appraiser_overall_feedback": appOverallFeed.trim(),
        // "current_rating.overall_rating" : employee1Data?.data?.appraisal?.appraiser_rating,
        "reviewer.status": "in-progress",
        "normalizer.status": "in-progress",
        reviewerIsDisabled: false,
        reviewerIsChecked: false,
        "reviewer.reviewer_status": "pending",
        "appraisal_previous_rating.objective_description": trimAppraiserComments,
        employee: {},
        id: employee_id,
      }).then((j: any) => {
        if (!j.error) {
          setnavPrompt(false);
          setDisableButtons(false);
          //  setOpen(true);
          // setMessage(
          //   "The performance appraisal was submitted to the Reviewer."
          // );
          //snackbar
          setSuccessAlertTrigerMSG("The performance appraisal was submitted to the Reviewer.")
          setSuccessAlertTriger(true)
          updateLoggedRole({
            pa_action_by: `Appraiser (Submitted) (from Rating Tab): ${new Date()}`,
            id: employee_id
          })
          let appraiserName = employee1Data?.data?.appraiser_name;
          let employeeName = employee1Data?.data?.first_name;
          let employeeCode = employee1Data?.data?.employee_code;
          let calendarName = employee1Data?.data?.calendar?.calendar_type;
          let calendarYear = employee1Data?.data?.calendar?.start_date?.slice(0, 4);
          let reviewerFirstName = emailData?.employeeData?.find((item: any) => item.employee_code === employee1Data?.data?.reviewer_code)?.firstName;

          let tempSubject = APPRAISER_SUBMITS_TO_REVIEWER?.subject;
          tempSubject = tempSubject?.replace("[year]", `${calendarYear}`);
          tempSubject = tempSubject?.replace("[calendar name]", `${calendarName}`);
          tempSubject = tempSubject?.replace("[employee name]", `${employeeName}`);
          tempSubject = tempSubject?.replace("[employee code]", `${employeeCode}`);

          let tempHtml = APPRAISER_SUBMITS_TO_REVIEWER?.html;
          tempHtml = tempHtml?.replace("[Reviewer FirstName]", `${reviewerFirstName}`);
          tempHtml = tempHtml?.replace("[year]", `${calendarYear}`);
          tempHtml = tempHtml?.replace("[calendar name]", `${calendarName}`);
          tempHtml = tempHtml?.replace("[employee name]", `${employeeName}`);
          tempHtml = tempHtml?.replace("[Appraiser name]", `${appraiserName}`);
          tempHtml = tempHtml?.replace("[employee code]", `${employeeCode}`);

          let reviewerEmail = emailData?.employeeData?.find((item: any) => item.employee_code === employee1Data?.data?.reviewer_code)?.email;
          let email = APPRAISER_SUBMITS_TO_REVIEWER?.to;
          email = email?.replace("[email]", `${reviewerEmail}`);

          sendEmailNotification(
            {
              to: email,
              subject: tempSubject,
              html: tempHtml
            }
          )
          // .then((res: any) => {

          // })
        } else {
          updateLoggedRole({
            pa_action_by: `Appraiser (Submitted) (From Rating Tab): ${j.error} : ${new Date()}`,
            id: employee_id
          })
          setMessage2("Something Went Wrong.")
          setOpen3(true)
        }
      })
      // .then((res: any) => {
      //   updateLoggedRole({
      //     pa_action_by : `Appraiser (Submitted) : ${new Date()}`,
      //     id : employee_id
      //   })
      // })
    }
  };

  const saveHandler = () => {
    setDisableButtons(true);
    saveData();
  };


  const handleClickOpen7 = (e: any, index: any) => {
    document.getElementById("photo")?.click();
  };

  const submitHandler = () => {
    setDisableButtons(true);
    if (appraiserComments) {
      let Message = "";
      let Status = false;
      appraiserComments?.forEach((i: any, index: any) => {
        if (
          employeeData?.data?.appraisal_template?.potential === true &&
          potentialValue == undefined
        ) {
          Status = true;
          Message = "Please select the Potential Level.";
          // saveData(Status, Message);
        } else if (i.ratings === "" || i.ratings === undefined) {
          Status = true;
          Message = "It is mandatory to add ratings in all fields.";
        } else if (i.ratings !== "" && i.ratings !== undefined && ratingData) {
          let rating = ratingData?.data?.find((item: any) => i.ratings == item._id).rating;
          if (((rating < 3) || (rating >= 4)) && (i.comments?.trim() == "" || i.comments?.trim() == undefined)) {
            Status = true;
            Message = `It is mandatory to provide a justification for the rating below 3, and 4 and above.`
          }
        }
        if (index == appraiserComments.length - 1) {
          console.log(employeeData?.data?.appraisal?.feedback_questions?.filter((item: any) => item.value == ""), 'checkfeedback')
          if (Status === true) {
            setOpen(true);
            setMessage(Message);
          } else {

            let specificArea = areaImprovement?.filter((item: any) => {
              return item.value?.trim() !== ""
            }).filter((item: any) => {
              return item.specific_actions[0].value?.trim() === ""
            });
            let otherrrecomendation = otherRecommendation?.filter(
              (j: any) => j.isChecked === true
            );
            let trainingRecommendationCategoryNotEmpty = employeeData?.data?.appraisal?.training_recommendation?.filter((item: any) => item.name !== "")
              .filter((item: any) => item.justification?.trim() === "" || item.training_name?.trim() === "");
            let trainingRecommendationNameNotEmpty = employeeData?.data?.appraisal?.training_recommendation?.filter((item: any) => item.training_name?.trim() !== "")
              .filter((item: any) => item.name === "" || item.justification?.trim() === "");
            let trainingRecommendationJustificationNotEmpty = employeeData?.data?.appraisal?.training_recommendation?.filter((item: any) => item.justification?.trim() !== "")
              .filter((item: any) => item.name === "" || item.training_name?.trim() === "");


            submitRatingTabData(Status, Message);
            if (
              employeeData?.data?.appraisal?.feedback_questions?.filter((item: any) => item.value?.trim() == "")?.length > 0 ||
              employeeData?.data?.appraisal?.feedback_questions?.length == 0
            ) {
              setOpen2(true);
              setMessage2("Please provide your feedback on the overall feedback questions.")
            }

            else if (specificArea?.length > 0) {
              setOpen2(true);
              setMessage2("Please add the missing details in the Areas for Improvement.")
            } else if (trainingRecommendationCategoryNotEmpty?.length > 0 || trainingRecommendationNameNotEmpty?.length > 0 || trainingRecommendationJustificationNotEmpty?.length > 0) {
              setOpen2(true);
              setMessage2("Please add the missing details in the Training Recommendations.")
            }
            else if (otherscheckbox == true && otherRecommendationothers?.trim() == "" && otherrrecomendation?.length == 0 || otherscheckbox == true && otherRecommendationothers?.trim() == undefined && otherrrecomendation?.length == 0) {
              setOpen2(true);
              setMessage2("It is mandatory to provide details when selecting \"Other\" option in Further Recommendations.")
            }
            else if (Status === false) {
              setOpen(false);
              handleDialogCloseYes();
            }
          }
        }
      });
    }
  };

  const handleImageChange = function (
    e: any
    // j: any
  ) {
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

  let ColorArray = [{
    key: "Individual Objectives", value: "rgb(167,255,226)"
  }, {
    key: "Management Competenciees", value: "rgb(235,190,245)"
  }, {
    key: "Job Objectivesssssss", value: "rgb(200,229,247)"
  }]

  const imageClick = () => {
    console.log("works", fileSelected, name);
    const newData = {
      newspic: fileSelected,
      newspicname: name,
    };
  };


  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        maxWidth: 60,
        fontSize: "14px !important",
        fontFamily: "arial !important",
        color: "#333333 !important",
      },
    },
  };


  useEffect(() => {
    setShowIsUploading(true);
    sendItem({
      // newspic: fileList[0].name,
      newspic: fileSelected,
      newspicname: name,
    })
      .then((res: any) => {
        setShowIsUploading(false);
      });
    if (name != "" && name != undefined) {
      let files = attachedFiles.map((item: any) => {
        return item;
      });
      files.push({
        url: name,
        name: name,
        objective_description: activeObjectiveDescriptionName,
      });
      setAttachedFiles(files);
    }
  }, [fileSelected]);

  useEffect(() => {
    if (employeeData) {

    if (!employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser")) {
      navigate(`${APPRAISER_VIEW_PA}/employee/${employee_id}`)
    }
    }
  },[employeeData])
  return (
    <div
      style={{
        backgroundColor: "#F1F1F1",
        height: "auto",
        minHeight: "100px",
        overflow: "hidden",
      }}>
      <Heading1>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
              }}
              color="inherit"
              to={"/dashboardreview"}
            >
              My Team Dashboard
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
            <Typography
              style={{
                fontSize: "18px",
                color: "#333333",
                fontFamily: "Arial",
              }}
            >
              Appraisal Overview
            </Typography>
          </Breadcrumbs>
        </Stack>
      </Heading1>

      <Box
        style={{ marginRight: "25px", marginLeft: "25px", background: "#fff", marginBottom: "25px" }}
      >
        <Box
          style={{
            padding: "35px",
            paddingBottom: "0px"
          }}
        >
          <div>
            <Header
              appraisalData={employee1Data}
              ratingScaleData={ratingScaleData}
              nineBoxData={nineBoxData}
              employeeDataIsFetching={employeeDataIsFetching}
              employeeDataIsLoading={employeeDataIsLoading}
              navPrompt={navPrompt}
              setnavPrompt={setnavPrompt}
            />
          </div>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              // marginLeft: "17px",
              marginRight: "33px",
              paddingTop: "12px",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                "& .MuiTabs-indicator": {
                  // display: "none",
                  backgroundColor: "#3e8cb5",
                }
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
                    <TabPanel2 value={value} index={1}>
                      <IconButton
                        sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                      // aria-describedby={id4}
                      // onClick={handleClickInfo4}
                      >
                        <img
                          style={{ width: "12px" }}
                          src={Infoicon}
                          alt="icon"
                        />
                      </IconButton>
                    </TabPanel2>
                    <TabPanel2 value={value} index={0}>
                      <IconButton
                        sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                        aria-describedby={id4}
                        onClick={handleClickInfo4}
                      >
                        <img
                          style={{ width: "12px" }}
                          src={Infowhiteicon}
                          alt="icon"
                        />

                      </IconButton>
                    </TabPanel2>
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
          <TabPanel value={value} index={0}>
            <div style={{ marginRight: "33px" }}>
              <TableContainer>
                <Table
                  sx={{
                    borderCollapse: 'separate',
                    borderSpacing: '0px 15px'
                  }}
                  size="small" aria-label="simple table">
                  <TableHead style={{ position: "sticky", zIndex: "1000" }}>
                    <TableRow
                      sx={{
                        "& td, & th": {
                          // border: "1px solid #e0e0e0",
                          bgcolor: "#eaeced",
                          whiteSpace: "pre-line",
                        },
                      }}
                    >
                      <Popover
  id={id4}
  open={openInfo4}
  anchorEl={anchorEl4}
  onClose={handleCloseInfo4}
  PaperProps={{
    style: { width: "260px", marginTop: "55px" },
  }}
>
  <TableContainer sx={{ overflowX: "hidden" }}>
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
              Ratings
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
            {/* Map through your data and render rows */}
            {ratingData &&
              ratingData.data
                .slice()
                .sort((a: any, b: any) => a.rating - b.rating)
                .map((row: any, index: any) => (
                  <TableRow key={row._id}
                  sx={{
                    "&:last-child td, &:last-child th": {
                      borderColor: "lightgrey",
                    },
                  }}>
                    <TableCell
                      align="center"
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        wordWrap: "break-word",
                      }}
                    >
                       {row.rating}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontSize: "14px",
                        color: "#333333",
                        fontFamily: "Arial",
                        wordWrap: "break-word",
                      }}
                    >
                      {row.rating_scale}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </CustomScrollbar>
    </Scroll>
  </TableContainer>
</Popover>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          borderBottom: "none"

                        }}
                      >
                        Objective<br></br>Type
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          borderBottom: "none"
                        }}
                      >
                        Objective<br></br> Title
                      </TableCell>
                      <TableCell
                        // width="8%"
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          borderBottom: "none"
                        }}
                      >
                        Objective<br></br> Level
                      </TableCell>
                      <TableCell
                        // width="5%"
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          borderBottom: "none"
                        }}
                      >
                        Rating
                      </TableCell>

                      <TableCell
                        // width="17%"
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          borderBottom: "none"
                        }}
                      >
                        Appraiser<br></br> Comments
                      </TableCell>
                      <TableCell
                        // width="5%"
                        align="center"
                        sx={{
                          fontFamily: "Arial",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                          borderBottom: "none"
                        }}
                      >
                        Attachment
                        {isUploading && (
                          <CircularProgress size={15} thickness={7} />
                        )}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employeeData &&
                      objectiveTitleData && colorarray &&
                      appraiserComments &&
                      appraiserComments?.map((j: any, index: any) => {
                        console.log(j, "jjjjjjjjjjjjjj");
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
                                width="190px"
                                align="left"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  wordBreak: "break-word",
                                  // background:"#BEECF5",
                                  backgroundColor: colorarray?.find((item: any) => item.objective_type == j?.objective_type?.name?.name) != undefined ? colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name)?.color : Colors[0],
                                  borderBottom: "none"
                                }}
                              >
                                {" "}
                                {j?.objective_type?.name?.name}
                              </TableCell>
                              <TableCell
                                width="175px"
                                align="left"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  wordBreak: "break-word",
                                  background: "#ffffff",
                                }}
                              >

                                <Stack direction="row" alignItems="center" >
                                  <IconButton
                                    style={{ padding: "4px" }}
                                    aria-describedby={id2}
                                    onClick={(e: any) => {
                                      setActiveObjectiveId(j._id);
                                      handleClickInfo(e);
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
                                  id={"id2"}
                                  open={popoverIndex === index && openInfo}
                                  anchorEl={anchorEl}
                                  onClose={handleCloseInfo}
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
                                      }}
                                    >
                                      {openInfo &&
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
                                  background: "#FBFBFB",
                                }}
                              ><Stack direction="row" alignItems="center" justifyContent="center">
                                  {(j.level_1_isChecked ||
                                    j.level_2_isChecked ||
                                    j.level_3_isChecked ||
                                    j.level_4_isChecked) && (

                                      <IconButton
                                        style={{ padding: "4px" }}
                                        aria-describedby={id3}
                                        onClick={(e: any) => {
                                          handleClickInfo1(e);
                                          setActiveObjectiveId(j._id);
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
                                    </>
                                  )}
                                  {j.level_2_isChecked && (
                                    <>
                                      <span>L2</span>
                                    </>
                                  )}
                                  {j.level_3_isChecked && (
                                    <>
                                      <span>L3</span>
                                    </>
                                  )}
                                  {j.level_4_isChecked && (
                                    <>
                                      <span>L4</span>
                                    </>
                                  )}
                                </Stack>

                                <Popover
                                  id={"id3"}
                                  // open={openInfo1}
                                  open={popoverIndex === index && openInfo1}
                                  anchorEl={anchorEl1}
                                  onClose={handleCloseInfo1}
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
                                      padding: "5px",
                                    }}
                                  >
                                    {openInfo1 &&
                                      j._id === activeObjectiveId && (
                                        <>
                                          {j.level_1_isChecked && (
                                            <>
                                              <span>L1:</span>
                                              {/* <span> */}
                                                <b>
                                                  {
                                                  j?.name?.level_1
                                                      ?.level_definition
                                                  }
                                                </b>
                                              {/* </span> */}
                                              <br />
                                              <ul
                                                style={{
                                                  marginTop: "0px",
                                                  marginBottom: "0px",
                                                }}
                                              >
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
                                                <b>
                                                  {
                                                    j?.name?.level_2
                                                      ?.level_definition
                                                  }
                                                </b>
                                              </span>
                                              {/* <br /> */}
                                              <ul
                                                style={{
                                                  marginTop: "0px",
                                                  marginBottom: "0px",
                                                }}
                                              >
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
                                                <b>
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
                                                <b>
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
                              <TableCell
                                width="6px"
                                align="center"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",

                                  // paddingLeft: "0px",
                                  // paddingRight: "0px",
                                  background: "#ffffff",
                                  // boxShadow: "1px 0px 0px 1px #80808014",
                                  // boxShadow: "0px 0px 4px 2px #8080802e",

                                }}                              >

                                <Train>
                                  <Stack sx={{
                                    display: "flex",
                                    flexDirection: "row-reverse"
                                  }}
                                    direction="row" alignItems="center" >

                                    <FormControl
                                      sx={{ minWidth: 60 }}
                                      size="small"
                                    >
                                      <Select
                                        // labelId="demo-select-small"
                                        id="demo-select-small"
                                        value={j?.ratings}
                                        onChange={(e: any) => {
                                          setActiveObjectiveId(j._id);
                                          const selectedRatingId = e.target.value;
                                        }}
                                        variant="standard"
                                        MenuProps={MenuProps}
                                        disableUnderline
                                        disabled={employeeDataIsFetching || employeeDataIsLoading}
                                      >
                                        {ratingData &&
                                          ratingData.data
                                            .slice()
                                            .sort(function (a: any, b: any) {
                                              return a.rating - b.rating;
                                            })
                                            .map((i: any, index1: any) => {
                                              console.log(i, "Anyyyy");
                                              return (
                                                <MenuItem
                                                  sx={{
                                                    fontSize: "14px",
                                                    fontFamily: "Arial",
                                                    color: "#333333",
                                                  }}
                                                  value={i._id}
                                                  onClick={() => {
                                                    appraiserRatingsHandler(
                                                      j,
                                                      i._id
                                                    );
                                                    setMoveTab(true);
                                                    setnavPrompt(true);
                                                  }}
                                                  disabled={disableTextAfterSubmission}
                                                >
                                                  {i.rating}
                                                </MenuItem>
                                              );
                                            })}

                                      </Select>
                                    </FormControl>
                                    {j?.ratingdef !== undefined && j?.ratingdef !== "" && (
                                      <div >

                                        <IconButton
                                          style={{ padding: "4px" }}
                                          onClick={(e) => {
                                            handleClickInfo6(e);
                                            setPopoverIndex(index);
                                          }}
                                        >
                                          <img width="12px" src={Infoicon} alt="icon" />
                                        </IconButton>

                                        <Popover
                                          id={id6}
                                          open={popoverIndex === index && openInfo6}
                                          anchorEl={anchorEls}
                                          onClose={handleCloseInfo6}
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
                                          <Typography
                                            style={{
                                              fontSize: "12px",
                                              fontFamily: "arial",
                                              padding: "5px",
                                            }}
                                          >
                                            <b>{j?.rating_scale}</b>:{j?.ratingdef}
                                          </Typography>
                                        </Popover>
                                      </div>
                                    )}
                                  </Stack>
                                </Train>

                              </TableCell>

                              <TableCell
                                width="400px"
                                align="center"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  background: "#FBFBFB",
                                  // boxShadow: "1px 0px 0px 1px #80808014",
                                  // boxShadow: "0px 0px 4px 2px #8080802e",
                                }}
                              >
                                <Text>
                                  <TextField
                                    disabled={employeeDataIsFetching || employeeDataIsLoading}
                                    fullWidth
                                    multiline
                                    autoComplete="off"
                                    size="small"
                                    placeholder="Add"
                                    inputProps={{ maxLength: 500 }}
                                    variant="standard"
                                    InputProps={{
                                      disableUnderline: true, // <== added this
                                      readOnly: disableTextAfterSubmission
                                    }}
                                    value={j.comments}
                                    onChange={(e) => {
                                      appraiserCommentsHandler(e, j);
                                      setMoveTab(true);
                                      setnavPrompt(true);
                                    }}

                                  />
                                </Text>
                              </TableCell>
                              <TableCell
                                width="50px"
                                align="center"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  background: "#ffffff",
                                  // boxShadow: "1px 0px 0px 1px #80808014",
                                  // boxShadow: "0px 0px 4px 2px #8080802e",

                                }}
                              >

                                <input
                                  id="photo"
                                  name="photo"
                                  type="file"
                                  ref={inputRef}
                                  multiple={true}
                                  style={{ display: "none" }}
                                  onChange={(e: any) => {
                                    console.log(e, "fileselected");
                                    setMoveTab(true);
                                    setnavPrompt(true);
                                    return handleImageChange(e);
                                  }}
                                />

                                <IconButton style={{ padding: "0px" }} disabled={showIsUploading || disableTextAfterSubmission}>
                                  <img
                                    src={Uploadatt}
                                    onClick={(e: any) => {
                                      setActiveObjectiveDescriptionName(
                                        j?.name?._id
                                      );
                                      handleClickOpen7(e, index);
                                      setPopoverIndex(index);
                                    }}
                                  />
                                </IconButton>

                                {employeeData &&
                                  getAttachments(j?.name?._id)?.length > 0 && (
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        color: "#52C8F8",
                                        fontFamily: "Arial",
                                        cursor: "pointer",
                                        textDecoration: "underline",
                                      }}
                                      aria-describedby={"id8"}
                                      onClick={(e: any) => {
                                        handleClick8(e);
                                        setPopoverIndex(index);
                                      }}

                                    >
                                      File Attached
                                    </Typography>
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
                                                  {/* {index1 + 1} */}
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
                                                  {disableTextAfterSubmission ?
                                                    <img
                                                      src={Removeattnew}
                                                      style={{
                                                        cursor: "default",
                                                      }}

                                                    /> :
                                                    <img
                                                      src={Removeattnew}
                                                      onClick={() => {
                                                        removeAttachments(
                                                          k.remove
                                                        );
                                                        setMoveTab(true);
                                                      }
                                                      }
                                                      style={{
                                                        cursor: "pointer",
                                                      }}

                                                    />
                                                  }


                                                </Stack>
                                              </Stack>
                                            </>
                                          );
                                        }
                                      )}
                                  </div>
                                </Popover>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>

              {(employeeData?.data?.appraisal?.pa_status?.includes("Pending with Appraiser") ||
                employeeData?.data?.appraisal?.status == "not-started") &&
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
                    disabled={disableButtons || employeeDataIsFetching}
                    style={{
                      borderRadius: "4px",
                      textTransform: "none",
                      fontSize: "15px",
                      fontFamily: "Arial",
                      borderColor: "#3E8CB5",
                      color: "#3E8CB5",
                      height: "35px",
                      //  width: "153px",
                      background: "transparent",
                      ...((disableButtons || disableSubmit || employeeDataIsFetching) && {
                        cursor: "not-allowed",
                        borderColor: "#ccc",
                        color: "#ccc",
                      }),
                    }}
                    variant="outlined"
                    onClick={() => {
                      saveHandler();
                      if (name && fileSelected) {
                        return imageClick();
                      }
                    }}
                  >
                    Save as Draft
                  </Button>

                  <Button
                    disabled={disableButtons || disableSubmit || employeeDataIsFetching}
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
                      ...((disableButtons || disableSubmit || employeeDataIsFetching) && {
                        cursor: "not-allowed",
                        borderColor: "#ccc",
                        color: "#ccc",
                      }),
                    }}
                    variant="outlined"
                    onClick={() => {
                      submitHandler();
                    }}
                  >
                    Save and Submit
                  </Button>

                  <Button
                    disabled={disableButtons || employeeDataIsFetching || employeeDataIsLoading}
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
                      ...((disableButtons || disableSubmit || employeeDataIsFetching || employeeDataIsLoading) && {
                        cursor: "not-allowed",
                        borderColor: "#ccc",
                        color: "#ccc",
                      }),
                    }}
                    variant="outlined"
                    onClick={() => {
                      cancelButtonHandler()
                    }}
                  >
                    Cancel
                  </Button>
                  {/* </Link> */}
                </Stack>
              }
            </div>
          </TabPanel>

          <Dialog
            open={open}
            onClose={handleDialogClose}
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
                {" "}
                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //paddingBottom: "30px",
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
                  color: "#3e8cb5"
                }}
                variant="outlined"
                autoFocus
                onClick={handleDialogClose}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open2}
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
                {" "}

                {message2}
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //paddingBottom: "30px",
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
                  color: "#3e8cb5"
                }}
                variant="outlined"
                autoFocus
                onClick={handleDialogClose2}
              >
                Ok
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={open1}
            PaperProps={{
              style: {
                boxShadow: "none",
                borderRadius: "6px",
                //marginTop: "155px",
                maxWidth: "0px",
                minWidth: "26%",
                margin: "0px",
                padding: "30px",
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
                {" "}

                {message}
              </DialogContentText>
            </DialogContent>
            <DialogActions
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                //paddingBottom: "30px",
              }}
            >
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "10px",
                  color: "#3e8cb5",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
                // onClick={handleDialogCloseYes}
                onClick={handleDialogCloseYes}
              >
                Yes
              </Button>
              <Button
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  marginRight: "10px",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                  color: "#3e8cb5",
                }}
                variant="outlined"
                autoFocus
                onClick={handleDialogCloseNo}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <AlertDialogSuccess
            isAlertOpen={open3}
            handleAlertClose={handlemessage3}
          >
            {message2}
          </AlertDialogSuccess>

          {/******************This dialog is to display the pop up : 
 * Any changes you have made will not be saved if you leave the page************ */}
          <AlertDialogOkCancelForUnsavedChanges
            isAlertOpen={cancelChangesAlert}
            handleAlertClose={handleRejectChanges}
            handleAlertIdClose={handleAcceptChanges}
          >
          </AlertDialogOkCancelForUnsavedChanges>

          <TabPanel value={value} index={1}>

            <div>
              <Performancefeedbacksummary
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
              />
              {employeeData?.data?.appraisal_template?.training_recommendation?.length > 0 && (<RTrecommandation
                training2Data={training1Data}
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
              />)}

              {employeeData?.data?.appraisal_template?.other_recommendation?.length > 0 &&
                (<Checkboxs
                  isCheckedothers={isCheckedothers}
                  setisCheckedothers={setisCheckedothers}
                  other2Data={other1Data}
                  navPrompt={navPrompt}
                  setnavPrompt={setnavPrompt}
                  moveTab={moveTab}
                  setMoveTab={setMoveTab}
                />)}
            </div>

            <div>
              <OverallFeedback 
              appraisalData={employee1Data}
              navPrompt={navPrompt}
                setnavPrompt={setnavPrompt} />
            </div>

            <Footer>
              <Footerbuttons
                isCheckedothers={isCheckedothers}
                setReviewedOverallFeedback={setReviewedOverallFeedback}
                setNavigateDashboard={setNavigateDashboard}
                disableSubmit={disableSubmit}
                setDisableSubmit={setDisableSubmit}
                appraiserComments={appraiserComments}
                employeeData={employeeData}
                ratingData={ratingData}
                reviewedOverallFeedback={reviewedOverallFeedback}
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
                value={value}
                setValue={setValue}
                moveTab={moveTab}
                setMoveTab={setMoveTab}
                fetchCancel={fetchCancel}
                fetchCancel1={fetchCancel1}
                fetchCancel2={fetchCancel2}
                fetchCancel3={fetchCancel3}
                employee1Data={employee1Data}
                appraiserRatingPreviousSubmission={appraiserRatingPreviousSubmission}
                navigateDashboard={navigateDashboard}
              />
            </Footer>

          </TabPanel>
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
    </div>
  );
};

export default AppraiserOverview;