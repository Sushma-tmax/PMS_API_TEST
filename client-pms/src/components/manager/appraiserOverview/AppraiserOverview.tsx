import React, { useEffect, useState, useRef } from "react";
import { styled } from "@mui/material/styles";
import Tabcontents from "./ObjectivesTabs";
import Performancefeedbacksummary from "./Performancefeedbacksummary";
import RTrecommandation from "./TrainingRecommendation";
import Checkboxs from "./OtherRecommendation";
import Footerbuttons from "./Footerbuttons";
import OverallFeedback from "./OverallFeedback";
import { Link, Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";
import Closeiconred from "../../../assets/Images/Closeiconred.svg";
import {
  CREATE_APPRAISAL,
  REVIEWER_PAGE,
} from "./../../../constants/routes/Routing";
import Divider from "@mui/material/Divider";
import Timeline1 from "./Timeline1";
import Timelinerevview from "../../reviewer/Dashboard/Timelinerevview";
import Header from "./Header";
import { positions } from "@mui/system";
import Headleft from "../../appraisal/components/Icons/Headleft.svg";
import {
  Button,
  IconButton,
  Popover,
  Popper,
  TextField,
  Typography,
  Modal,
  ClickAwayListener,
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
import Infoicon from "./icons/Infoicon.svg";
import Infowhiteicon from "../../../assets/Images/Infowhiteicon.svg";
import Removeatt from "./icons/Removeatt.svg";
import Removeattnew from "../../../assets/Images/icons/Removeattnew.svg";
import Downloadatt from "./icons/Downloadatt.svg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Uploadatt from "../../../assets/Images/Uploadatt.svg";
import {
  useAttachmentsAppraiserDeleteMutation,
  useCreateEmployeeAppraisalMutation,
  useGetEmployeeAppraisalQuery,
  useGetObjectiveTitleQuery,
  useGetRatingScaleQuery,
  useUpdateEmployeeAppraisalMutation,
} from "../../../service";
import { useAppraiserRejectsReviewerContext } from "../../../context/AppraiserRejectsReviewer";
import { useCreateAzureBlobMutation } from "../../../service/azureblob";
import { useGetNineboxQuery } from "../../../service/ninebox/ninebox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../../assets/Images/Closeicon.svg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import AlertDialog from "../../UI/Dialog";
import { Scrollbar } from "react-scrollbars-custom";
import { flushSync } from "react-dom";
import {
  useAttachmentsAppraiserOverviewDeleteMutation,
  useAttachmentsAppraiserOverviewMutation,
} from "../../../service/employee/appraisal/appraisal";
import CircularProgress from "@mui/material/CircularProgress";

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
    backgroundColor: "#f8f8f8",
    padding: "5px",
    borderRadius: "5px",
    minHeight: "50px",
  },
});
const popUp = styled("div")({
  // position: "absolute",
  // width: "96%",

  "& .MuiPopover-paper": {
    top: "85px",
  },
});
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
  marginLeft: "35px",
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
        <Box sx={{ padding: "16px" }}>
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
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);

  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt;
  usePrompt("Please save the changes before you leave the page.", formIsDirty);
  //prompt ------functions

  //   const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(null);
  //   const open8 = Boolean(anchorEl8);
  //   const id8 = open8 ? 'simple-popover' : undefined;

  //   const handleClick8 = (event: React.MouseEvent<HTMLButtonElement>) => {

  //     setAnchorEl8(event.currentTarget);
  //   };

  //   const handleClose8 = () => {
  //     setAnchorEl8(null);
  //   };
  // console.log(anchorEl8,'Clicked')
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

  console.log(anchorEl8, "clicked");

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl1, setAnchorEl1] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl4, setAnchorEl4] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEl);
  const openInfo1 = Boolean(anchorEl1);
  const openInfo4 = Boolean(anchorEl4);
  const id2 = openInfo ? "simple-popover" : undefined;
  const id4 = openInfo4 ? "simple-popover" : undefined;
  const id3 = openInfo1 ? "simple-popover" : undefined;
  const [selectOpen, setSelectOpen] = React.useState(false);
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setOpen(false);
    setAnchorEl(null);
  };
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
  const [rating, setRating] = React.useState("");
  const inputRef = useRef<any>(null);
  const {
    employee1Data,
    training1Data,
    other1Data,
    mutation,
    calendarData,
    ratingScaleData,
  } = props;
  console.log(employee1Data, "11111");
  const { employee_id } = useParams();
  // @ts-ignore
  const { appraisal, areaImprovement, moveTab, setMoveTab, potentialValue } =
    useAppraisalContext();

  console.log(appraisal, "appraisal from overrrrrr`````````");
  const [value, setValue] = React.useState<any>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (moveTab === true) {
      setOpen(true);
      setMessage("Please save the changes before leaving the page.");
    } else {
      setValue(newValue);
    }
  };

  // new data values

  // states
  const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
    []
  );
  let navigate = useNavigate();
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState<any>();
  const [appraiserComments, setAppraiserComments] = useState<any>("");
  const [ratingValue, setRatingValue] = useState<any>();
  const [objectiveType, setActiveObjectivetType] = useState<any>("");
  const [appraiserComments1, setAppraiserComments1] = useState<any>();
  const [fileSelected, setFileSelected] = useState<any>("");
  const [name, setName] = useState<string>("");
  const [open, setOpen] = useState<any>(false);
  const [open1, setOpen1] = useState<any>(false);
  const [message, setMessage] = useState<any>("");
  const [emptyArea, setEmptyArea] = useState(false);
  const [emptyAreaMessage, setEmptyAreaMessage] = useState("");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [popoverIndex, setPopoverIndex] = useState("");
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [navigateDashboard, setNavigateDashboard] = useState<any>(false);

  console.log(fileSelected, name, "augustya");

  // mutations
  const { data: employeeData, isLoading } =
    useGetEmployeeAppraisalQuery(employee_id);
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const { data: ratingData } = useGetRatingScaleQuery("");
  const [updateObjectiveDescription] = useUpdateEmployeeAppraisalMutation();
  const [createMutation] = useCreateEmployeeAppraisalMutation();
  const [sendItem, { data, isLoading: isUploading }] =
    useCreateAzureBlobMutation();
  console.log(isUploading, "isUploading");
  const [attachmentsAppraiser] = useAttachmentsAppraiserOverviewMutation();
  const { data: nineBoxData } = useGetNineboxQuery("");
  const [attachedFiles, setAttachedFiles] = useState<any[]>([]);
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserOverviewDeleteMutation();

  console.log(
    activeObjectiveDescriptionName,
    deletes,
    "activeObjectiveDescriptionName"
  );

  const getAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");

    // return employeeData?.data?.appraisal?.attachments
    return attachedFiles
      ?.filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k.url}> {k.name} </a> <br />
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

  const specificHandler = (status: any, message: any) => {
    console.log(status, message, "message");
    if (status == true) {
      setEmptyArea(true);
      setEmptyAreaMessage(message);
    } else if (status == false) {
      setEmptyArea(false);
    }
  };

  useEffect(() => {
    if (employeeData) {
      let status = false;
      let Message = "";
      employeeData?.data?.appraisal?.area_of_improvement?.forEach(
        (i: any, index: any) => {
          console.log(i, "iiiiiiiiii");
          if (i?.value === "") {
            status = true;
            Message =
              "The Specific Area information is incomplete in Recommendations. ";
          } else if (i.specific_actions) {
            i.specific_actions.forEach((j: any, index1: any) => {
              if (j.value === "") {
                status = true;
                Message =
                  "The Specific Actions information is incomplete in Recommendations.";
              }
              if (index1 == areaImprovement.length - 1)
                specificHandler(status, Message);
            });
          }
          if (index == areaImprovement.length - 1)
            specificHandler(status, Message);
        }
      );
    }
  }, [employeeData]);

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
  };
  const handleDialogOpen = () => {
    setOpen(true);
    setMessage("");
    setMoveTab(true);
  };

  //  to close submit dialog
  const handleDialogCloseYes = () => {
    setOpen1(false);
    submitData();
    setMoveTab(false);
    setDisableSubmit(true);
    setNavigateDashboard(true);
  };

  const handleDialogCloseNo = () => {
    setOpen1(false);
    setMessage("");
    setMoveTab(false);
    setValue(1);
  };

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
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setObjectiveDescription(() => {
        return employeeData.data.appraisal.objective_description.map(
          (i: any) => {
            return {
              ...i,
              remarks: i.remarks,
              rating: i.ratings,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
              // attachments_name: getAttachments(i?.name?._id),
            };
          }
        );
      });

      //   setAppraiserAreaofImprovement(
      //     employeeData.data.appraisal.area_of_improvement
      //   );
      //   setAppraiserTrainingRecommendations(
      //     employeeData.data.appraisal.training_recommendation
      //   );
      //   setEmployeeComments(
      //     employeeData.data.employee.comments
      //   )
    }
  }, [employeeData, objectiveTitleData]);

  console.log(objectiveDescription, "ratingggg");

  //  to get the ratings

  // const ratingHandler = (j: any) => {

  //   if (j._id === activeObjectiveId) {

  //   createMutation({
  //     objective_description:
  //    j._id,
  //     objective_description_name:
  //    j.name._id,
  //     ratings: e.target.value,
  //     id: employee_id,
  // });
  //     // setRating(e.target.value)

  //   }
  // }

  useEffect(() => {
    setAppraiserComments(() => {
      return employee1Data?.data?.appraisal?.objective_description?.map(
        (i: any) => {
          return {
            ...i,
            remarks: i.remarks,
            ratings: i?.ratings?._id,
            objective_title: findObjectiveTitleById(i?.name?.objective_title),
            objective_type: findObjectiveTypeById(i?.name?.objective_type),
            // attachments_name: getAttachments(i?.name?._id),
          };
        }
      );
    });
    setAttachedFiles(() => {
      return employeeData?.data?.appraisal?.attachments.filter((item: any) => {
        if (item.name != "") return item;
      });
    });
  }, [employee1Data]);

  const appraiserCommentsHandler = (e: any, j: any) => {
    setAppraiserComments(() => {
      return appraiserComments?.map((i: any) => {
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
      return appraiserComments?.map((i: any) => {
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

  const saveData = (Status: any, Message: any) => {
    if (Status === true) {
      setOpen(true);
      setMessage(Message);
      // updateObjectiveDescription({
      //     "appraisal.objective_description": appraiserComments,
      //     "appraisal.appraiser_status": "draft",
      //     id: employee_id,
      // });
    } else if (Status === false) {
      setOpen(false);
      // attachedFiles.forEach((file:any)=>{
      //     attachmentsAppraiser({
      //         attachments : file
      //     })
      // })
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
      updateObjectiveDescription({
        "appraisal.objective_description": appraiserComments,
        "appraisal.potential": potentialValue,
        "appraisal.appraiser_status": "draft",
        "appraisal.status": "in-progress",
        id: employee_id,
      }).then((j: any) => {
        if (!j.error) {
          setOpen(true);
          setMoveTab(false);
          setnavPrompt(false);
          setMessage("Changes have been saved.");
        }
      });
    }
  };

  const submitData = () => {
    // if (Status === true) {
    //     setOpen(true);
    //     setMessage(Message);
    // } else if (Status === false) {
    //     setOpen(false);
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
    updateObjectiveDescription({
      "appraisal.objective_description": appraiserComments,
      "appraisal.appraiser_status": "submitted",
      "appraisal.status": "in-progress",
      "appraisal.potential": potentialValue,
      "reviewer.status": "in-progress",
      "normalizer.status": "in-progress",
      reviewerIsDisabled: false,
      reviewerIsChecked: false,
      "reviewer.reviewer_status": "pending",
      employee: {},
      id: employee_id,
    }).then((j: any) => {
      if (!j.error) {
        setOpen(true);
        setMessage(
          "The performance appraisal was submitted successfully to the Reviewer."
        );
        // setMoveTab(true);
        // setOpen(true);
        // setnavPrompt(false);
        // setMoveTab(false);
        // setMessage(
        //   "The performance appraisal was submitted successfully to the Reviewer."
        // );
        // setDisableSubmit(true);
      }
    });
    // }
  };

  const saveHandler = () => {
    let Message = "";
    let Status: any = false;
    if (
      employeeData?.data?.appraisal_template?.potential === true &&
      potentialValue == undefined
    ) {
      Status = true;
      Message = "Please select the Potential Level.";
      saveData(Status, Message);
    } else if (appraiserComments) {
      appraiserComments?.forEach((i: any, index: any) => {
        console.log(i, "iiiiiiiiii");

        // if (employeeData?.data?.appraisal_template?.potential === true && (employeeData?.data?.appraisal?.potential === "" || employeeData?.data?.appraisal?.potential === undefined)) {
        //     Status = true;
        //     Message = "Please select the Potential Level.";
        // }
        // else
        if (i.ratings === "" || i.ratings === undefined) {
          Status = true;
          Message = "Please add rating for all the Objective Titles.";
        }
        // else if (i.remarks === "" || i.remarks === undefined) {
        //   Status = true;
        //   Message = "Please enter comments for all the Objective Titles."
        // }
        if (index == appraiserComments.length - 1) saveData(Status, Message);
      });
    }
  };
  const handleClickOpen7 = (e: any, index: any) => {
    document.getElementById("photo")?.click();
  };

  const submitHandler = () => {
    if (appraiserComments) {
      let Message = "";
      let Status = false;
      appraiserComments?.forEach((i: any, index: any) => {
        console.log(i, "iiiiiiiiii");

        // if (employeeData?.data?.appraisal_template?.potential === true && (employeeData?.data?.appraisal?.potential === "" || employeeData?.data?.appraisal?.potential === undefined)) {
        //     Status = true;
        //     Message = "Please select the Potential Level.";
        // }
        if (
          employeeData?.data?.appraisal_template?.potential === true &&
          potentialValue == undefined
        ) {
          Status = true;
          Message = "Please select the Potential Level.";
          // saveData(Status, Message);
        } else if (i.ratings === "" || i.ratings === undefined) {
          Status = true;
          Message = "Please add rating for all the Objective Titles.";
        }
        // else if (i.remarks === "") {
        //   Status = true;
        //   Message = "Please enter comments for all the Objective Titles."
        // }
        else if (
          employeeData?.data?.appraisal?.appraiser_overall_feedback === ""
        ) {
          Status = true;
          Message = "Please add Overall Feedback and recommendations.";
        } else if (emptyArea === true) {
          Status = true;
          Message = emptyAreaMessage;
        } else if (
          employeeData?.data?.appraisal?.feedback_questions.length === 0
        ) {
          Status = true;
          Message = "Please add feedback questionnaire and recommendations.";
        } else if (
          employeeData?.data?.appraisal?.training_recommendation.length === 0
        ) {
          Status = true;
          Message = "Please add training recommendation and recommendations.";
        } 
        // else if (
        //   employeeData?.data?.appraisal?.other_recommendation.length === 0
        // ) {
        //   Status = true;
        //   Message = "Please add other recommendation and recommendations.";
        // }
        if (index == appraiserComments.length - 1) {
          if (Status === true) {
            setOpen(true);
            setMessage(Message);
          } else if (Status === false) {
            setOpen(false);
            setOpen1(true);
            setMessage("Did you review the recommendations?");
            // submitData(Status, Message);
          }
        }
      });
    }
  };

  const handleFileUploadClick = (event: any) => {
    inputRef.current.click();
  };

  const handleImageChange = function (
    e: any
    // j: any
  ) {
    console.log("attachments");

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

    // sendItem({
    //     // newspic: fileList[0].name,
    //     newspic: fileSelected,
    //     newspicname: name,
    // }).then((res: any) => {
    //     attachmentsAppraiser({
    //         attachments: {
    //             url: name,
    //             objective_description: activeObjectiveDescriptionName,
    //         },
    //         id: employee_id,
    //     });
    // });
  };

  const imageClick = () => {
    console.log("works", fileSelected, name);
    const newData = {
      // token:tokens,
      // newstitle: newsTitle,
      // newsdesc: convertedContent,
      newspic: fileSelected,
      newspicname: name,
    };

    // sendItem(newData).then((res: any) => {
    //   attachmentsAppraiser({
    //     attachments: {
    //       url: name,
    //       objective_description: activeObjectiveDescriptionName,
    //     },
    //     id: employee_id,
    //   });
    // });
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
    sendItem({
      // newspic: fileList[0].name,
      newspic: fileSelected,
      newspicname: name,
    }).then((res: any) => {
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
      // attachmentsAppraiser({
      //     attachments: {
      //         url: name,
      //         objective_description: activeObjectiveDescriptionName,
      //     },
      //     id: employee_id,
      // });
    });
  }, [fileSelected]);

  return (
    <div style={{ backgroundColor: "#F1F1F1", height: "auto" }}>
      <Heading1>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={0}
          minHeight="50px"
        >
          {/* <IconButton>
            <Link
              to={`/dashboardreview`}
              // onClick={() => startAppraisal(j._id)}
            >
              <img src={Headleft} alt="icon" />
            </Link>
          </IconButton> */}
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
                color: "#333333",
                fontFamily: "Arial",
              }}
              color="text.primary"
              to={""}
              aria-current="page"
            >
              Appraisal Overview
            </Link>
          </Breadcrumbs>
          {/* <Typography
            style={{
              paddingLeft: "5px",
              fontSize: "24px",
              color: "#3e8cb5",
              fontFamily: "Arial",
            }}
          >
            {" "}
            {employee1Data && employee1Data?.data?.calendar?.name}
          </Typography> */}

          {/* <p style={{ paddingLeft: "25px" }}>
            <img
              src={Headleft}
              alt="icon"
              height="12px"
              style={{ transform: "rotateZ(-180deg)" }}
            />
            <label
              style={{
                fontSize: "18px",
                color: "#3e8cb5",
                fontFamily: "Arial",
                paddingLeft: "15.2px",
              }}
            >
              Overview
            </label>
          </p> */}
        </Stack>
      </Heading1>
      {/* <Container3>
         <Timeline1 calendarData={calendarData} /> 
        <Timelinerevview />
      </Container3> */}
      <Box
        // style={{ marginLeft: "25px", marginRight: "25px", background: "#fff" }}
        style={{ marginRight: "34px", marginLeft: "34px", background: "#fff" }}
      >
        <Box
          style={{
            padding: "35px",
          }}
        >
          <div>
            <Header
              appraisalData={employee1Data}
              ratingScaleData={ratingScaleData}
              nineBoxData={nineBoxData}
            />
          </div>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginLeft: "17px",
              marginRight: "74px",
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
                    border:"1px solid #3e8cb59e",
                    maxHeight:"0px",
                    minHeight:"48px",
                    paddingRight: "15px",
                    paddingLeft:"20px"
                    
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
                    fontWeight: "700",
                    border:"1px solid #3e8cb59e",
                    paddingLeft:"20px",
                    paddingRight:"20px"
                    // maxHeight:"0px",
                    // minHeight:"38px"
                    // paddingRight: "5px",
                    // paddingTop: "0px",
                    // paddingBottom: "0px",
                  }}
                  label="Recommendations"
                  {...a11yProps(1)}
                />
              </Tabs>
             
          </Box>
          <TabPanel value={value} index={0}>
            <div style={{ marginRight: "58px" }}>
              <TableContainer>
                <Table size="small" aria-label="simple table">
                  <TableHead style={{ position: "sticky", zIndex: "1000" }}>
                    <TableRow
                      sx={{
                        "& td, & th": {
                          border: "1px solid #e0e0e0",
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
                          style: { width: "320px", marginTop: "55px" },
                        }}
                        // anchorOrigin={{
                        //   vertical: 'bottom',
                        //   horizontal: 'left',
                        // }}
                        // transformOrigin={{
                        //   vertical: 'top',
                        //   horizontal: 'left',
                        // }}
                        // sx={{
                        //   "& .MuiModal-root-MuiPopover-root": {
                        //     opacity: 1,
                        //     // top: "80px",

                        //   },

                        // }}
                      >
                        <TableContainer sx={{ overflowX: "hidden" }}>
                          <Scroll>
                            <Scrollbar
                              style={{ width: "100%", height: "225px" }}
                            >
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
                                              width: "30px",
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
                                                  width: "40px",
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
                            </Scrollbar>
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
                        }}
                      >
                        Attachment
                        {isUploading && (
                          <CircularProgress size={15} thickness={7} />
                        )}
                        {/* <CircularProgress size={15} thickness={7} /> */}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employeeData &&
                      objectiveTitleData &&
                      appraiserComments &&
                      appraiserComments?.map((j: any, index: any) => {
                        console.log(j, "jjjjjjjjjjjjjj");
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
                                width="190px"
                                align="left"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  wordBreak:"break-word"
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
                                  wordBreak:"break-word"
                                }}
                              >
                                {j?.name?.objectiveTitle}

                                <IconButton
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
                                {/* <Modal
                                id={"id2"}
                                //open={openInfo}
                                // anchorEl={anchorEl}
                                // onClose={handleCloseInfo}
                                open={open}
                                onClose={handleDialogClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
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

                              </Modal> */}
                                {/* <Popover
                                id={"id2"}
                                open={openInfo}
                                anchorEl={anchorEl}
                                onClose={handleCloseInfo}

                                PaperProps={{
                                  style: {
                                    // backgroundColor: "rgb(255 255 255 / 90%)",
                                    backgroundColor: "FEFCF8",
                                    boxShadow: "none",
                                    maxWidth: "400px",
                                    borderRadius: "5px",
                                    top: "0px",
                                    left: "0px",
                                    border: "1px solid #3e8cb5",
                                    //backgroundColor: "#f8f8ff",
                                  },
                                }}
                              // sx={{
                              //   "& .MuiPopover-paper": {
                              //     border: "1px solid #3e8cb5",
                              //     backgroundColor: "#f8f8ff",
                              //     top:"0px",
                              //     left:"0px"
                              //     // width:"30%"
                              //   },
                              // }}
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
                              </Popover> */}
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

                                {/* <Popper
                                id={"id2"}
                                open={(popoverIndex === index) && openInfo}
                               
                                anchorEl={anchorEl}

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

                                <Typography
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "arial",
                                    // padding:"5px"
                                    lineHeight: "20px"
                                  }}>

                                  {openInfo &&
                                    activeObjectiveId &&
                                    j._id === activeObjectiveId &&
                                    j?.name?.description}
                                </Typography>


                              </Popper> */}

                                {/* <Popover
                                id={"id2"}
                                open={openInfo}
                                anchorEl={anchorEl}
                                onClose={handleCloseInfo}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'left',
                                }}
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
                                
                              </Popover> */}
                              </TableCell>
                              <TableCell
                                width="10px"
                                align="center"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                              >
                                {j.level_1_isChecked && (
                                  <>
                                    {" "}
                                    <span>L1</span>{" "}
                                    {/* <span>
                                    {j?.name?.level_1?.level_definition}
                                  </span> */}
                                  </>
                                )}
                                {j.level_2_isChecked && (
                                  <>
                                    {" "}
                                    <span>L2</span>{" "}
                                    {/* <span>
                                    {j?.name?.level_2?.level_definition}
                                  </span> */}
                                  </>
                                )}
                                {j.level_3_isChecked && (
                                  <>
                                    {" "}
                                    <span>L3</span>{" "}
                                    {/* <span>
                                    {j?.name?.level_3?.level_definition}
                                  </span> */}
                                  </>
                                )}
                                {j.level_4_isChecked && (
                                  <>
                                    {" "}
                                    <span>L4</span>{" "}
                                    {/* <span>
                                    {j?.name?.level_4?.level_definition}
                                  </span> */}
                                  </>
                                )}

                                {(j.level_1_isChecked ||
                                  j.level_2_isChecked ||
                                  j.level_3_isChecked ||
                                  j.level_4_isChecked) && (
                                  <IconButton
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
                                              {" "}
                                              <span>L1 : </span>{" "}
                                              <span>
                                                <b>
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
                                                <b>
                                                  {" "}
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
                                {/* <Popper
                                id={"id3"}
                                open={openInfo1}
                                anchorEl={anchorEl1}

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

                                  {openInfo1 && j._id === activeObjectiveId && (
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
                              </TableCell>
                              <TableCell
                                width="10px"
                                align="center"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  // paddingLeft: "0px",
                                  // paddingRight: "0px",
                                }}
                              >
                                <Train>
                                  <FormControl
                                    sx={{ minWidth: 60 }}
                                    size="small"
                                  >
                                    <Select
                                      // labelId="demo-select-small"
                                      id="demo-select-small"
                                      value={j?.ratings}
                                      onChange={(e: any) => {
                                        // ratingHandler(e, j);
                                        setActiveObjectiveId(j._id);
                                        // setRating(e.target.value);
                                      }}
                                      variant="standard"
                                      // InputProps={{
                                      //   disableUnderline: true,
                                      // }}
                                      MenuProps={MenuProps}
                                      disableUnderline
                                    >
                                      {ratingData &&
                                        ratingData.data
                                          .slice()
                                          .sort(function (a: any, b: any) {
                                            return a.rating - b.rating;
                                          })
                                          // <MenuItem
                                          //   style={{
                                          //     fontSize: "14px",
                                          //     fontFamily: "Arial",
                                          //     color: "#333333",
                                          //   }}
                                          //   value="10"
                                          // ></MenuItem>
                                          .map((i: any, index1: any) => {
                                            console.log(i, "Anyyyy");
                                            return (
                                              <MenuItem
                                                sx={{
                                                  fontSize: "14px",
                                                  fontFamily: "Arial",
                                                  color: "#333333",

                                                  // "& .MuiButtonBase-root": {
                                                  //   justifyContent:
                                                  //     "center !important",
                                                  // },
                                                  // "& .MuiMenuItem-root": {
                                                  //   justifyContent:
                                                  //     "center  !important",
                                                  // },

                                                  // "& .MuiButtonBase-root": {
                                                  //   justifyContent:
                                                  //     "center !important",
                                                  // },
                                                  // "& .MuiMenuItem-root": {
                                                  //   justifyContent:
                                                  //     "center  !important",
                                                  // },
                                                }}
                                                value={i._id}
                                                onClick={() => {
                                                  setRatingValue(i.rating);
                                                  appraiserRatingsHandler(
                                                    j,
                                                    i._id
                                                  );
                                                  setMoveTab(true);
                                                  // createMutation(
                                                  //   {
                                                  //     objective_description:j._id,
                                                  //     objective_description_name: j.name._id,
                                                  //     ratings: i._id,
                                                  //     id: employee_id,
                                                  //   }
                                                  // )
                                                }}
                                              >
                                                {i.rating}
                                              </MenuItem>
                                            );
                                          })}
                                    </Select>
                                  </FormControl>
                                </Train>
                              </TableCell>

                              <TableCell
                                // width="350px"
                                align="center"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                              >
                                <Text>
                                  <TextField
                                    fullWidth
                                    multiline
                                    autoComplete="off"
                                    size="small"
                                    placeholder="Add"
                                    // name="employeeTrainingComments"
                                    inputProps={{ maxLength: 500 }}
                                    variant="standard"
                                    InputProps={{
                                      disableUnderline: true, // <== added this
                                    }}
                                    value={j.remarks}
                                    onChange={(e) => {
                                      appraiserCommentsHandler(e, j);
                                      setMoveTab(true);
                                      // setAppraiserComments(e.target.value)
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
                                }}
                              >
                                {/*<input*/}
                                {/*  id="inputFile"*/}
                                {/*  name="photo"*/}
                                {/*  type="file"*/}
                                {/*  ref={inputRef}*/}
                                {/*  style={{ display: "none" }}*/}
                                {/*  multiple={true}*/}
                                {/*  onChange={(e: any) => {*/}
                                {/*    handleImageChange(e, j);*/}
                                {/*    setActiveObjectiveDescriptionName(j?.name?._id);*/}
                                {/*  }}*/}
                                {/*/>*/}

                                {/* <input
                                id="photo"
                                name="photo"
                                type="file"
                                ref={inputRef}
                                multiple={true}
                                style={{ display: "none" }}
                                onChange={(e: any) => {
                                  console.log(e, 'fileselected')
                                  handleImageChange(e)
                                  setActiveObjectiveDescriptionName(j?.name?._id)
                                  if (name && fileSelected) {
                                    return imageClick();
                                  }
                                }}
                              />
                              <AttachFileIcon color="primary" 
                               onClick={(e: any) => handleClickOpen7(e)} />Upload
                              {j?.attachments_name?.map((k: any) => {
                                console.log(k, 'workssss')
                                console.log(k.resp, 'sssss')
                                return <div>
                                  <Stack direction="row" alignItems="center">
                                    <span style={{width:"160px",marginLeft:"5px",marginRight:"5px",marginTop:"5px"}}>{k.resp} </span>
                                    <span>
                                      <IconButton onClick={() => {
                                        // alert('works')
                                        deleteAppraiserMutation({
                                          employee_id: employee_id,
                                          name: k.remove
                                        })
                                      }}>
                                        <img
                                          src={Closeiconred}
                                          alt="icon"
                                        />
                                      </IconButton>
                                    </span>
                                  </Stack>
                                </div>
                              })} */}

                                {/*{j?.attachments_name?.map((k:any) => {*/}
                                {/*  console.log(k,'workssss')*/}
                                {/*  return <button onClick={() => deleteAppraiserMutation(k._id)}>delete </button>*/}
                                {/*})}*/}

                                {/* {console.log(j, 'console')} */}
                                {/*{j}*/}

                                {/*<Button*/}
                                {/*  style={{*/}
                                {/*    fontSize: "12px",*/}
                                {/*    color: "#333333",*/}
                                {/*    background: "#f8f8f8",*/}
                                {/*    textTransform: "none",*/}
                                {/*  }}*/}
                                {/*  variant="text"*/}
                                {/*  onClick={(e: any) => {*/}
                                {/*    console.log('attachments')*/}
                                {/*    handleFileUploadClick(e);*/}
                                {/*    setMoveTab(true);*/}
                                {/*    if (name && fileSelected) {*/}
                                {/*      return imageClick();*/}
                                {/*    }*/}
                                {/*  }}*/}
                                {/*>*/}
                                {/*  Upload*/}
                                {/*</Button>*/}

                                <input
                                  id="photo"
                                  name="photo"
                                  type="file"
                                  ref={inputRef}
                                  multiple={true}
                                  style={{ display: "none" }}
                                  onChange={(e: any) => {
                                    console.log(e, "fileselected");
                                    return handleImageChange(e);
                                    // setActiveObjectiveDescriptionName(j?.name?._id)
                                    // if (name && fileSelected) {
                                    //   return imageClick();
                                    // }
                                  }}
                                />
                                <IconButton disabled={isUploading === true}>
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

                                {/* <Uploadatt
                                style={{
                                  color: "#93DCFA",
                                  height: "18px",
                                  transform: "rotate(30deg)",
                                }}
                                onClick={(e: any) => {handleClickOpen7(e,index);
                                  setPopoverIndex(index)}}
                               /> */}
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
                                                  {/* <IconButton>
                                              <img src={Downloadatt} />
                                            </IconButton> */}
                                                  {/* <IconButton> */}
                                                  <img
                                                    src={Removeattnew}
                                                    // onClick={() => deleteAppraiserMutation({
                                                    //     employee_id: employee_id,
                                                    //     name: k.remove
                                                    // })}
                                                    onClick={() =>
                                                      removeAttachments(
                                                        k.remove
                                                      )
                                                    }
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                  />
                                                  {/* </IconButton> */}
                                                </Stack>
                                              </Stack>
                                            </>
                                          );
                                        }
                                      )}

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
                                    
                                  </Stack>
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
                                      3
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
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
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
                  }}
                  variant="outlined"
                  onClick={() => {
                    saveHandler();
                    if (name && fileSelected) {
                      return imageClick();
                    }

                    // createMutation({
                    //   objective_description : appraiserComments,
                    //   id: employee_id
                    // })
                  }}
                >
                  Save as Draft
                </Button>

                <Button
                  disabled={disableSubmit}
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
                  }}
                  variant="outlined"
                  onClick={() => {
                    submitHandler();
                    // createMutation({
                    //   objective_description : appraiserComments,
                    //   id: employee_id
                    // })
                  }}
                >
                  Save and Submit
                </Button>
              </Stack>
            </div>
          </TabPanel>

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
            {/* <DialogTitle
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              id="alert-dialog-title"
            >
              <IconButton onClick={handleDialogClose}>
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
                {/* {duplicateError && (
                <div>Entered Other Recommendation already exists!</div>
              )}
              {duplicateErrorEdit && (
                <div>Entered Other Recommendation already exists!</div>
              )} */}
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

          {/* Dialog for Submit button , if reviewed recommendation or not. */}
          <Dialog
            open={open1}
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
            {/* <DialogTitle
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
              id="alert-dialog-title"
            >
              <IconButton onClick={handleDialogClose}>
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
                {/* {duplicateError && (
                <div>Entered Other Recommendation already exists!</div>
              )}
              {duplicateErrorEdit && (
                <div>Entered Other Recommendation already exists!</div>
              )} */}
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
                  color:"#3e8cb5",
                  width: "70px",
                  height: "35px",
                  background: "transparent",
                }}
                variant="outlined"
                autoFocus
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
                  color:"#3e8cb5",
                }}
                variant="outlined"
                autoFocus
                onClick={handleDialogCloseNo}
              >
                No
              </Button>
            </DialogActions>
          </Dialog>

          <TabPanel value={value} index={1}>
            {/* <Container1> */}
            {/* <div style={{ paddingTop: "10px" }}>
            <Tabcontents
              employeeData={employee1Data}
              ratingScaleData={ratingScaleData}
            />
          </div> */}
            {/* <Divide>
            <Divider />
          </Divide> */}

            <div>
              <Performancefeedbacksummary
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
              />
              <RTrecommandation
                training2Data={training1Data}
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
              />
              <Checkboxs
                other2Data={other1Data}
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
              />
            </div>
            <div>
              <OverallFeedback />
            </div>

            <Footer>
              <Footerbuttons
                navPrompt={navPrompt}
                setnavPrompt={setnavPrompt}
                value={value}
                setValue={setValue}
                moveTab={moveTab}
                setMoveTab={setMoveTab}
              />
            </Footer>

            {/* </Container1> */}
          </TabPanel>
        </Box>
      </Box>
    </div>
  );
};

export default AppraiserOverview;
