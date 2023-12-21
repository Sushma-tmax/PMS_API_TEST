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
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";

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
  useAppraiserAcceptsEmployeeMutation,
  useUpdateEmployeeAppraisalMutation,
} from "../../../../service";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";

// import Infoicon from "../icons/Infoicon.svg";
// import Footerbuttons from "../Footerbuttons";
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
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
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
  paddingBottom: "5px",
});
const Overallrating = styled("div")({
  fontSize: "16px",
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
const Item2 = styled("div")(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "450px",
  margin: "1rem",
  paddingTop: "1px",
}));
const Footer = styled("div")({
  marginLeft: "120%",
  paddingTop: "20px",
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

export default function Ratings(props: any) {
  const { navPrompt, setnavPrompt, value, setValue, handleChange } = props;
  // @ts-ignore
  const { empData: employeeData, employee_id, moveTab, setMoveTab } = useReviewerContext();
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);

  const [name, setName] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<any>("");

  console.log("woringgggggg");

  const { data: ratingsData } = useGetRatingScaleQuery("");
  const [upDateReviewer] = useReviewerRejectionMutation();
  // const theme = useTheme();
  // const fullScreen1 = useMediaQuery(theme.breakpoints.down("md"));
  const [sendItem] = useCreateAzureBlobMutation();

  // const {data: employeeData} = useGetEmployeeAppraisalQuery('6204935ebca89023952f2da9')

  console.log(employeeData, "my test");
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
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

  const [accept, setAccept] = useState("");
  const [appraiserAcceptsEmployee] = useAppraiserAcceptsEmployeeMutation();
  const [appraiserRejectsEmployee] = useAppraiserRejectsEmployeeMutation();
  const [appraiserUpdateRating] = useUpdateEmployeeAppraisalMutation();

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
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
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
        .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>})
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
        .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>})
    );
    // setreviewerAttachmentsurl(
    //   employeeData &&
    //   employeeData?.data?.reviewer?.attachments
    //     .filter((i: any) => i?.objective_description === j.name._id)
    //     .map((k: any) => k.url)
    // );


    setanchorElReviewer(event.currentTarget);
  };
  console.log(reviewerAttachments, 'reviewerAttachments')
  const handleCloseReviewer = () => {
    setanchorElReviewer(null);
    setRatingComments(null);
  };

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

  const openDrawerHandlerreject = (objective: any) => {
    setAccept("Reject");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
    let reviewerRatingValue = employeeData.data.appraisal.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    setRatingAppraiser(reviewerRatingValue);
  };

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setRatingAppraiser("");
    setratingparams("");
  };
  const ratingSubmitHandler = () => {
    //setnavPrompt(true)
    if (ratingAppraiser === ratingparams) {
      setrejectAlert(true);
      // setnavPrompt(true);
    } else {
      closeDrawer();
      upDateReviewer({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        comments: comments,
        rating_rejected: true,
        employee_id,
      });
      setRating("");
      setRatingAppraiser("");
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

  const openDrawerHandler = (objective: any) => {
    setAccept("Accept");
    openDrawer();
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
    let reviewerRatingValue = employeeData.data.appraisal.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    setRatingAppraiser(reviewerRatingValue);
  };

  // const acceptHandler = (objective: any, rating: any) => {
  const acceptHandler = () => {
    // setActiveObjectiveDescriptionName(objective.name._id)
    // setActiveObjectiveDescription(objective._id)
    // setComments(objective.comments)
    // setRating(rating)

    // ratingSubmitHandler()
    let temp = employeeData.data.appraisal.objective_description
      .filter((i: any) => i._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];
    setnavPrompt(true);
    upDateReviewer({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      comments: comments,
      employee_id,
    });
    closeDrawer();
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
    });
  };

  console.log(ratingsData, "rating");

  const resetFileInput = () => {
    setFileSelected("");
    setName("");

    inputRef.current.value = null;
  };
  console.log(fileSelected === "", "new");
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
  const handleClickOpen6 = (event: React.MouseEvent<HTMLButtonElement>,j:any) => {
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
    setreviewerAttachments(
      employeeData &&
      employeeData?.data?.reviewer?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>})
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
  const handleClickOpen7 = (event: React.MouseEvent<HTMLButtonElement>,j:any) => {
    // setOpen2true);
    setAnchorEl7(event.currentTarget);
    setappraisalAttachments(
      employeeData &&
      employeeData?.data?.appraisal?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>})
    );
  };

  const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
  };
  //slider validation
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");

  // useEffect(() => {
  //   setratingparams(ratingAppraiser);
  // }, [ratingAppraiser]);

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setratingparams("");
  };

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    if (ratingAppraiser === j.rating) {
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
  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        open={isDrawerOpen}

      // sx={maxWidth: 300px}
      // onClose={toggleDrawer(anchor, false)}
      >
        <p
          style={{
            paddingLeft: "33px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "#ebf2f4",
            color: "#3E8CB5",
            fontSize: "20px"
          }}
        >
          Reviewer Action
        </p>
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
              You cannot put the same rating as the Appraiser. Please change the
              Rating.
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
            <p style={{ paddingLeft: "33px", fontSize: "12px", color: "#7A7A7A", fontFamily: "Arial" }}>Comment(s)</p>

            <TextField
              multiline
              inputProps={{ maxLength: 500 }}
              style={{ paddingLeft: "33px", width: "75%" }}
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
                setnavPrompt(true);
              }}
            // fullWidth
            />
            <Stack
              alignItems="left"
              direction="row"
              paddingLeft="33px"
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
        {accept === "Reject" && (
          <>
            <Item2 sx={{ width: "fitContent" }}>
              <p style={{ textAlign: "left", paddingLeft: "10px", fontFamily: "arial", fontSize: "12px", color: "#333333", }}>
                Your Rating
              </p>

              <>
                <Stack
                  style={{ paddingLeft: "10px" }}
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
                                borderColor:
                                  rating === ratings._id && "#3C8BB5",
                              }}
                              size="small"
                            >
                              {ratings.rating}
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
                <p style={{ textAlign: "left", paddingLeft: "10px" }}>
                  Submit reasons of the rejections
                </p>
                <div>
                  {employeeData.data.reviewer.rejection_count == 2 ? (
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
                            label="the rating was not agreed with the appraiser"
                          />
                          <FormControlLabel
                            value="other"
                            control={<Radio />}
                            label="An error made by the Appraiser"
                          />
                        </RadioGroup>
                      </FormControl>
                    </>
                  ) : employeeData.data.reviewer.rejection_count == 1 ? (
                    "Second Time"
                  ) : (
                    "First Time"
                  )}{" "}
                </div>
              </>
            </Item2>

            <p style={{ paddingLeft: "33px", fontSize: "12px", color: "#333333", fontFamily: "arial" }}>Comments</p>

            <TextField
              style={{ paddingLeft: "33px", width: "75%" }}
              value={comments}
              inputProps={{ maxLength: 512 }}
              onChange={(e) => {
                setComments(e.target.value);
                // setnavPrompt(true);
              }}
            />
            <p style={{ paddingLeft: "33px", fontSize: "12px", color: "#333333", fontFamily: "arial" }}>Attachments</p>
            <div style={{ paddingLeft: "33px" }}>
              <input
                id="photo"
                name="photo"
                type="file"
                ref={inputRef}
                multiple={true}
                onChange={handleImageChange}
              />
            </div>
            <Text>
              {positionHide && (
                <Button
                  onClick={() => {
                    // setFileSelected('')
                    // setName('')
                    resetFileInput();
                  }}
                >
                  clear
                </Button>
              )}
            </Text>
            <Stack
              alignItems="left"
              direction="row"
              paddingLeft="33px"
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
              >
                {" "}
                Reject
              </Button>
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
        )}
      </Drawer>

      <div style={{ backgroundColor: "#F1F1F1" }}>
        <Container
          sx={{
            maxWidth: "95% !important",
            // height: "1408px",
            marginTop: "25px",
            // height: "calc(100vh - 165px)",
            background: "#fff",
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
              mr={2}
              sx={{
              borderRadius: "5px",
              boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)"
              }}
              // divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            >
              <Item>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <Avatar style={{ width: "50px", height: "50px" }}>
                     
                        {employeeData?.data?.legal_full_name.substring(0, 1)}
                    </Avatar>
                    <Box>
                      <Stack direction="row" spacing={1}>
                        <Name>
                        {employeeData?.data?.legal_full_name}
                        </Name>
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
                <Item>
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
                </Item>
              {/* } */}

              <Item style={{marginRight:"20px"}}>
                <Stack direction="column" >
                  <Overallrating>Overall Rating</Overallrating>

                  <Overallratingvalue>
                    <b>
                      {employeeData &&
                      employeeData?.data?.appraisal?.appraiser_rating == 0 ? "-" :
                        employeeData?.data.appraisal?.appraiser_rating}
                    </b>
                  </Overallratingvalue>
                  <Overallratingcomments>                   
                    {employeeData &&
                      getRatingDescription(
                        employeeData?.data?.appraisal?.appraiser_rating
                      )}
                    {/* Rating excefing */}
                  </Overallratingcomments>
                </Stack>
              </Item>
            </Stack>

            {/* <Typo1>     <p >Ratings1</p></Typo1> */}
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
                        {/* <img src={Infoicon} alt="icon" /> */}i
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
                  style: { width: "22%", height: "41%", marginTop:"55px"  },
                }}
              >
                <TableContainer >
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
            {/* </Typography> */}
            {value === 0 && <Root sx={{ width: "43.3%" }}>
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
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "14%",
                      }}
                    >
                      <form>
                        <select
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
                          <option value="Training Title">Objective Type</option>
                        </select>
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "14%",
                      }}
                    >
                      <form>
                        <select
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
                          <option value="Training Title">
                            Objective Description
                          </option>
                        </select>
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                        //paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "7%",
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
                            width:'70px',
                            textAlign:'center'
                            // margin:"-5px"
                          }}
                        >
                          
                           
                            Appraiser Rating
                         
                        </div>
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                        //paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "14%",
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
                            width:'150px',
                            textAlign:'center'
                            // margin:"-5px"
                          }}
                        >
                          
                            Appraiser Comments
                          
                        </div>
                       
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                        //paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "7%",
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
                            width:'70px',
                            textAlign:'center'
                            // margin:"-5px"
                          }}
                        >
                          
                            Reviewer Rating
                         
                        </div>
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                       
                        borderBottom: "1px solid #fff",
                        width: "14%",
                      }}
                    >
                      {/* <form>
                        <select
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
                          <option value="Training Title">
                            Reviewer Comments
                          </option>
                        </select>
                      </form> */}
                       <form>
                        <div
                          style={{
                            fontFamily: "Arial",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#3e8cb5",
                            border: "none",
                            background: "none",
                            width:'150px',
                            textAlign:'center'
                            // margin:"-5px"
                          }}
                        >
                          
                            Reviewer Comments
                          
                        </div>
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "14%",
                      }}
                    >
                      <form>
                        <select
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
                          <option value="Training Title">
                            Appraiser Action
                          </option>
                        </select>
                      </form>
                    </th>
                    <th
                      style={{
                        background: "#eaeced",
                        paddingLeft: "20px",
                        borderBottom: "1px solid #fff",
                        width: "22%",
                      }}
                    >
                      <form>
                        <select
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
                          <option value="Training Title">
                            Reviewer Action
                          </option>
                        </select>
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
                    objectiveDescription.map((j: any, index: number) => {
                      return (
                        <>
                          <tr>
                            <td
                              // rowSpan={3}
                              style={{
                                paddingLeft: "20px",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: "#333333",
                              }}
                            >
                              {j.objective_type.name.name}
                            </td>
                            <td
                              style={{
                                paddingLeft: "20px",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: "#333333",
                              }}
                            >
                              {j?.name?.objectiveTitle}
                            </td>
                            <td
                              style={{
                               // paddingLeft: "20px",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: "#333333",
                                textAlign:'center'
                              }}
                            >
                              <Typography
                                  style={{
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                  }}
                                >
                                  {employeeData &&
                                    employeeData.data.appraisal.objective_description
                                      .filter(
                                        (i: any) => i.name._id === j.name._id
                                      )
                                      .map((k: any) => {
                                        if (k.ratings)
                                          return k.ratings.rating;
                                      })[0]}
                                </Typography>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Stack
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                                spacing={2}
                              >

                               
                                <p
                                  style={{
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: "#333333",
                                  }}
                                >
                                  {/*Exceeding*/}
                                  {employeeData &&
                                    employeeData.data.appraisal.objective_description
                                      .filter(
                                        (i: any) => i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings)
                                          return k?.remarks;
                                      })[0]}
                                </p>


                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    textDecoration: "underline",
                                    color: "#93DCFA",

                                  }}
                                  aria-describedby={"ReviewerComments"}
                                  onClick={(e: any) => {
                                    handleClickAppraiserDetails(e, j);
                                  }}
                                >
                                  {/* Details */}
                                </Typography>
                                <Popover
                                  id={"ReviewerComments"}
                                  open={openAppraiserDetails}
                                  anchorEl={anchorEl}
                                  onClose={handleClose}
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
                                  <Typography sx={{ p: 2,  backgroundColor: "#f8f8ff" }}>
                                    Comments : {ratingComments1}<br/>
                                    {/* Attachments: {appraisalAttachments} */}
                                  </Typography>
                                </Popover>

                                <AttachFileIcon
                                  style={{ color: "#93DCFA" }}
                                  aria-describedby={"id"}
                                  onClick={(e: any) => handleClickOpen7(e,j)}
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
                                    Attachments: {appraisalAttachments}
                                    {/* {employeeData?.data?.appraisal?.attachments
                                      // .filter((i: any) => {

                                      //   // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                      //   return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                      // })}
                                      .map((k: any) => {
                                        return <a href={k.url}> {k.name} </a>;
                                      })} */}
                                  </Typography>
                                </Popover>
                              </Stack>
                            </td>
                            <td
                              style={{
                                //paddingLeft: "20px",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                color: "#333333",
                                textAlign:'center'
                              }}
                            >
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    // @ts-ignore
                                    color:
                                      j.rating_rejected === true && "#FF0000",
                                    display: j.rating_rejected === true ? 'Block': 'none'
                                  }}
                                >
                                  {j.ratings && j.ratings.rating}
                                </Typography>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              <Stack
                                direction="row"
                                justifyContent="space-around"
                                alignItems="center"
                                spacing={2}
                              >

                              
                                <p
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",
                                    color: '#333333'
                                  }}
                                >
                                  {/*Exceeding*/}
                                  {j.ratings && j?.comments}
                                </p>


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
                                  <Typography sx={{ p: 2,  backgroundColor: "#f8f8ff"}}>
                                    Comments : {ratingComments}<br />
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
                                <AttachFileIcon
                                  style={{ color: "#93DCFA" }}
                                  aria-describedby={"id"}
                                  onClick={(e: any) => handleClickOpen6(e,j)}
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
                                    Attachments: {reviewerAttachments}
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
                                  </Typography>
                                </Popover>
                              </Stack>
                            </td>
                            <td style={{ paddingLeft: "20px" }}>
                              {employeeData &&
                                !employeeData.data.appraisal.appraiser_status.includes(
                                  "rejected"
                                ) &&
                                employeeData.data.appraisal.appraiser_status}

                              {employeeData &&
                                employeeData.data.appraisal.appraiser_status.includes(
                                  "rejected"
                                ) && (
                                  <>
                                    <p style={{ color: "#ff5151", fontFamily: "Arial" }}>
                                      Rejected (
                                      {employeeData.data.appraisal
                                        .rejection_count == 1
                                        ? "First Time"
                                        : employeeData.data.appraisal
                                          .rejection_count == 2
                                          ? "Second Time"
                                          : employeeData.data.appraisal
                                            .rejection_count == 3
                                            ? "Third Time"
                                            : ""}
                                      )
                                    </p>
                                  </>
                                )}

                              <span>{/* Dummy Text */}</span>
                            </td>
                            <td style={{ paddingLeft: "20px" }}>
                              <p style={{ fontFamily: "Arial" }}>
                                {employeeData.data.reviewer.rejection_count == 2
                                  ? "Third Time"
                                  : employeeData.data.reviewer
                                    .rejection_count == 1
                                    ? "Second Time"
                                    : "First Time"}{" "}
                                Rejection
                              </p>
                              <Stack
                                direction="row"
                                justifyContent="space-between"
                              >
                                <span>
                                  <Stack direction="row" spacing={2}>
                                    <Button
                                      size="small"
                                      style={{
                                        textTransform: "none",
                                        fontSize: "15px",
                                        fontFamily: "Arial",
                                        borderColor: "#3e8cb5",
                                        color: "#3e8cb5",
                                        background: "transparent"
                                      }}
                                      variant="outlined"
                                      onClick={() => openDrawerHandler(j)}
                                    >
                                      Accept
                                    </Button>
                                    <Button
                                      size="small"
                                      style={{
                                        textTransform: "none",
                                        fontSize: "15px",
                                        fontFamily: "Arial",
                                        borderColor: "#3e8cb5",
                                        color: "#3e8cb5",
                                        background: "transparent"
                                      }}
                                      variant="outlined"
                                      onClick={() => openDrawerHandlerreject(j)}
                                    >
                                      Reject
                                    </Button>
                                  </Stack>
                                </span>
                              </Stack>
                              {/*    <>


                                                        {
                                                            // ((employeeData && employeeData.data.reviewer.objective_description.filter(
                                                            //     (i: any) => i.name._id === j.name._id
                                                            // ).map((k: any) => {if(k.ratings) return k.ratings._id})[0]) !== (employeeData && employeeData.data.appraisal.objective_description
                                                            //     .filter(
                                                            //         (i: any) => i.name._id === j.name._id
                                                            //     ).map((k: any) => k.ratings._id)[0])) && (
                                                            //     <>
                                                            //         <Button onClick={() => acceptHandler(j, (employeeData && employeeData.data.reviewer.objective_description.filter(
                                                            //             (i: any) => i.name._id === j.name._id
                                                            //         ).map((k: any) => k.ratings._id)[0]))}>Accept  </Button>
                                                            <Button style={{paddingLeft:"25px"}}
                                                                onClick={() => openDrawerHandler(j)}>{j.rating_rejected === true? "REJECTED" : "REJECT"}</Button>
                                                            // </>
                                                            // )
                                                        }


                                                    </> */}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                </tbody>
              </table>
              <Footer>
            {/* <Footerbuttons navPrompt={navPrompt} setnavPrompt={setnavPrompt} /> */}
          </Footer>
            </Root>}
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}
