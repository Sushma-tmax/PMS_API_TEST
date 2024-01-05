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
  Tabs,
  Tab,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tooltip
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
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
} from "../../../../service";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import Infoicon from "../../../../assets/Images/Infoicon.svg";
import Infowhiteicon from "../../../../assets/Images/Infowhiteicon.svg";
import Eye from "../../../../assets/Images/Eye.svg";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useParams, useNavigate } from "react-router-dom";
// import { useParams, useNavigate } from "react-router-dom";
import FooterButoons1 from "./RatingTab__FooterButtons";
import { REVIEWER_VIEW_PA, EMPLOYEE_PREVIOUS_PAs } from "../../../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
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
const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
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
const Overallrating = styled("div")({
  fontSize: "17px",
  fontFamily: "arial",
  fontWeight: 400,
  color: "#3e8cb5",
  //textAlign: 'left'
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
const Overallratingvalue = styled("div")({
  fontSize: "17px",
  display: "flex",
  alignItems: "center",
  fontFamily: "arial"
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
const Footer = styled("div")({
  marginLeft: "120%",
  paddingTop: "20px",
  paddingBottom: "30px",
});

const RatingBackground = styled("div")({
  width: "27px",
  lineHeight: "27px",
  borderRadius: "50%",
  display: "block",
  // color: "white",  background: "red",

});
const Ratingbackgroundsubmitted = styled("div")({
  width: "27px",
  lineHeight: "27px",
  borderRadius: "50%",
  display: "block",
  // color: "white",  background: "#3e8cb5",

});
const Root = styled("div")(
  ({ theme }) => `
    table {
      // font-family: IBM Plex Sans, sans-serif;
      border-collapse: separate;
    border-spacing: 0px 15px;
      width: 100%;
    }
    td,
    th {
      // border: 1px solid #e0e0e0;
      text-align: left;
      // padding: 6px;
    }
    tr {
   
      border: 1px solid #80808014;
      box-shadow: 1px 0px 0px 1px #80808014;
      border-bottom:none;
  
  
  }
    `
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value1: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value1, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value1 !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value1 === index && (
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

export default function TeamApprove(props: any) {
  const classes = useStyles();

  const {
    navPrompt,
    setnavPrompt,
    moveTab,
    setMoveTab,
    value1,
    setValue1,
    handleChange,
  } = props;
  const { appraisalData, ratingScaleData } = props;

  // @ts-ignore
  const { normalizerOverallFeedback, setNormalizerOverallFeedback, reviewerOverallFeedComments } = useReviewerContext();
  const { employee_id } = useParams();
  const { data: employeeData } = useGetEmployeeAppraisalQuery(employee_id);
  console.log(employeeData, "employeeData");
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
  const { data: nineBoxData } = useGetNineboxQuery("");
  const { data: employeePA_Data } = useGetEmployeeDetailsWithEmpCodeQuery({ employeeCode: employeeData?.data?.employee_code })

  // @ts-ignore
  // const { empData: empData } = useReviewerContext();
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const CustomScrollbar = Scrollbar as any;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [fileSelected, setFileSelected] = useState<any>("");
  console.log("woringgggggg");
  const { data: ratingsData } = useGetRatingScaleQuery("");
  const [upDateReviewer] = useReviewerRejectionMutation();
  const [sendItem] = useCreateAzureBlobMutation();
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [ratingparams, setratingparams] = useState<any>("");
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  const [rating, setRating] = useState<any>("");
  const [comments, setComments] = useState("");
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [accept, setAccept] = useState("");
  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [ratingComments1, setRatingComments1] = useState<any>("");
  const [ratingComments, setRatingComments] = useState<any>("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [reviewerAttachments, setreviewerAttachments] = useState<any>("");
  const [anchorElReviewer, setanchorElReviewer] =
    React.useState<HTMLButtonElement | null>(null);
  const open6 = Boolean(anchorEl6);
  const openAppraiserDetails = Boolean(anchorEl);
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [popoverIndex1, setPopoverIndex1] = useState<any>("");
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open7 = Boolean(anchorEl7); const openInfo = Boolean(anchorEls);
  const id2 = openInfo ? "simple-popover" : undefined;
  const handleCloseInfo = () => {
    setAnchorEls(null);
  };
  const [anchorE22, setAnchorE22] = React.useState<HTMLButtonElement | null>(null);

  const open22 = Boolean(anchorE22);
  const id22 = open22 ? "simple-popover" : undefined;

  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open8 = Boolean(anchorEl8);
  const id8 = open8 ? "simple-popover" : undefined;
  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;// previous rating
  const [anchorPreviousRatingPopOver, setAnchorPreviousRatingPopOver] = React.useState<HTMLElement | null>(
    null
  );
  const openPreviousRating = Boolean(anchorPreviousRatingPopOver);
  const id_Previous_Rating = openPreviousRating ? "simple-popover" : undefined;
  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo101 = Boolean(anchorEl01);

  const objectiveTitleInfoId = openInfo101 ? "simple-popover" : undefined;
  const [colorarray, setColorarray] = useState<any>("");
  const [ratingdefenition, setratingdefenition] = useState<any>();
  const [ratingscaledef, setratingscaledef] = useState<any>();
  const [comments1, setComments1] = useState('');
  const [anchorE2, setAnchorE2] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl02, setAnchorEl02] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo102 = Boolean(anchorEl02);
  const openInfo2 = Boolean(anchorE2);

  const id102 = openInfo102 ? "simple-popover" : undefined;
  const id21 = openInfo2 ? "simple-popover" : undefined;
  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(null);
  const open1 = Boolean(anchorE);
  const id = open1 ? "simple-popover" : undefined;
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();


  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);
    //setAnchorEl01(anchorEl01 ? null : event.currentTarget);
  };
  const handleClose101 = () => {
    setAnchorEl01(null);
  };

  const handleClickInfo12 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl02(anchorEl02 ? null : event.currentTarget);
  };

  const handleClose102 = () => {
    setAnchorEl02(null);
  };

  const handleClose2 = () => {
    setAnchorE2(null);
  };

  const handleClose1 = () => {
    setAnchorE(null);
  };

  const handleClick1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE(event.currentTarget);
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
        .map((k: any) => {
          return (
            <div>
              <a href={k.url}> {k.name} </a>
              <br />
            </div>
          );
        })
    );

    setanchorElReviewer(event.currentTarget);
  };

  const handleClickOpen2 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setAnchorE2(event.currentTarget);
  };

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

  const handleClose = () => {
    setAnchorEl(null);
    setRatingComments1(null);
  };

  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      console.log(id, "objectiveTitleData");
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
    setNormalizerOverallFeedback(comments1)
  }, [comments1]);


  const handleCommentsChange = (e: any) => {
    // console.log(e);
    setComments1(e.target.value)
    setnavPrompt(true)
  }

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

  const handleClose22 = () => {
    setAnchorE22(null);
  };

  const handleClick22 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE22(event.currentTarget);
  };

  useEffect(() => {
    // Now you can take any action when ratingdefenition changes,
    // such as displaying it.
    console.log("Rating Definition has changed:", ratingdefenition);
  }, [ratingdefenition]);

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
        return employeeData?.data?.reviewer?.objective_description.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
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

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setratingparams("");
  };

  const acceptHandler = () => {
    setnavPrompt(true);
    closeDrawer();
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setRatingAppraiser("");
    setratingparams("");
  };

  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };

  const handleClick9 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setAnchorEl9(event.currentTarget);
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
  const handleClose9 = () => {
    setAnchorEl9(null);
  };

  const getRejectionAppraisalAttachments = (id: any) => {
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
  const getPAStatus = (data: any) => {
    if (data?.appraisal?.status == "in-progress" || data?.appraisal?.status == "normalized") {
      return "In progress";
    } else if (data?.appraisal?.status == "completed") {
      return "Completed";
    } else if (data?.appraisal?.status == "not-started") {
      return "Not started";
    }
    else if (data?.appraisal?.status == "rejected") {
      return "Employee rejected";
    }
  }

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

  const handlePreviousRatingPopOverClose = () => {
    setAnchorPreviousRatingPopOver(null)
  }

  const handlePreviousRatingPopOverOpen = (event: React.MouseEvent<HTMLElement>, j: any) => {
    setAnchorPreviousRatingPopOver(event.currentTarget);
  };

  return (
    <React.Fragment>
      <Drawer anchor={"right"} open={isDrawerOpen}>
        <p
          style={{
            paddingLeft: "33px",
            paddingTop: "10px",
            paddingBottom: "10px",
            backgroundColor: "#ebf2f4",
            color: "#3E8CB5",
            fontSize: "20px",
          }}
        >
          Reviewer Action
        </p>
        <Dialog
          open={rejectAlert}
          onClose={handleSliderDialogClose}
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
              >
                Ok
              </Button>
            </DialogActions>
          </div>
        </Dialog>
        {accept === "Accept" && (
          <>
            <p
              style={{
                paddingLeft: "33px",
                fontSize: "12px",
                color: "#7A7A7A",
                fontFamily: "Arial",
              }}
            >
              Comments
            </p>

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
      </Drawer>

      <div style={{ backgroundColor: "#F1F1F1" }}>
        <Box
          sx={{
            // maxWidth: "95% !important",
            // height: "1408px",
            marginLeft: "25px",
            marginRight: "25px",
            // height: "calc(100vh - 165px)",
            background: "#fff",
          }}
        >
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
              <Stack direction="row" alignItems="center" spacing={2} >
                <Typography
                  style={{
                    fontSize: "17px",
                    fontFamily: "Arial",
                    color: "#3e8cb5",
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
                    {employeeData && getPAStatus(employeeData?.data)}
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
                    <Overallratingvalue style={{ fontSize: "14px" }} >
                      <span style={{
                        color: "#717171",
                        fontSize: "17px",
                        fontFamily: "Arial",
                      }} > {(employeeData?.data?.previous_rating && employeeData?.data?.previous_rating !== 0  && employeeData?.data?.previous_rating !== undefined) ?  employeeData?.data?.previous_rating?.toFixed(2) : "-"}</span>
                    </Overallratingvalue>
                    {/* )} */}
                  </Overallrating>
                  {employeeData && employeePA_Data && employeeData?.data?.previous_rating && employeePA_Data?.employees[0] && employeePA_Data?.employees[0]?.overall_rating !== 0 && (
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

            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              // mr={2}
              sx={{
                // borderRadius: "5px",
                backgroundColor: "#f3fbff",
                // boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)",
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
                    {employeeData?.data?.profile_image_url != undefined ? (
                      <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={employeeData?.data?.profile_image_url} />
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

              <Item>
                <Stack direction="column" alignItems="center">
                  <Overallrating>
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

                  <Overallratingvalue>
                    {ratingdefenition?.length > 0 &&
                      <IconButton sx={{padding:"4px"}} onClick={handleClick22} >
                        <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                      </IconButton>
                    }
                    <b>
                      {employeeData &&
                        employeeData?.data?.current_rating?.overall_rating?.toFixed(2)}
                    </b>
                  </Overallratingvalue>

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
                    {employeeData?.data?.calendar?.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>

                  {employeeData?.data?.appraisal_template?.potential === true && (

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
                          </Typography>

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
                                    //color: "#3e8cb5",
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
                                  <b>High </b>: {nineBoxData?.data[0]?.potential_definitions?.high}
                                </span>
                              )}

                              {employeeData?.data?.appraisal?.potential == "Moderate" && (
                                <span><b> Moderate </b>:{nineBoxData?.data[0]?.potential_definitions?.moderate}</span>
                              )}
                              {employeeData?.data?.appraisal?.potential == "Low" && (
                                <span> <b>Low </b>:{nineBoxData?.data[0]?.potential_definitions?.low} </span>
                              )}


                            </div> */}
                          </Popover>
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
                      value={employeeData?.data?.appraisal.appraiser_rejection_reason}
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
                        size="small"
                        multiline
                        InputProps={{ readOnly: true }}
                        autoComplete="off"
                        name="comments"
                        value={normalizerOverallFeedback}
                      />

                    </Tf1>
                  </Containnn>
                </>
              )}

            {employeeData && employeeData?.data?.reviewer?.reviewer_overall_feedback !== undefined &&
              employeeData?.data?.reviewer?.reviewer_overall_feedback !== "" &&
              employeeData?.data?.reviewer?.reviewer_PA_rejected == true && (
                <>
                  <TrainingRecommendations>
                    <b>Reviewer Rejection Reason</b>
                    <span style={{
                      fontSize: "22px",
                    }}></span>
                  </TrainingRecommendations>
                  <Containnn>
                    <Tf1>

                      <TextField
                        size="small"
                        multiline
                        InputProps={{ readOnly: true }}
                        autoComplete="off"
                        name="comments"
                        value={reviewerOverallFeedComments}
                      />

                    </Tf1>
                  </Containnn>
                </>
              )}
            <Typography
              style={{
                color: "#3e8cb5",
                fontSize: "16px",
                fontFamily: "Arial",
                // paddingTop: "10px",
              }}
            >
              <Box
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  paddingLeft: "0px",
                }}
              >
                <Tabs
                  value={value1}
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
                      border: "1px solid #3e8cb59e",
                      maxHeight: "0px",
                      minHeight: "48px",
                      fontWeight: "700",
                      paddingRight: "15px",
                      paddingLeft: "20px"
                    }}
                    label="Ratings"
                    icon={
                      <>
                        <TabPanel value1={value1} index={1}>
                          <IconButton
                            sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                          // aria-describedby={id2}
                          // onClick={handleClickInfo}
                          >
                            <img width="12px" src={Infoicon} alt="icon" />
                          </IconButton>
                        </TabPanel>
                        <TabPanel value1={value1} index={0}>
                          <IconButton
                            sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                            aria-describedby={id2}
                            onClick={handleClickInfo}
                          >
                            <img width="12px" src={Infowhiteicon} alt="icon" />
                          </IconButton>
                        </TabPanel>
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
                      border: "1px solid #3e8cb59e",
                      fontWeight: "700",
                      paddingRight: "20px",
                      paddingLeft: "20px"
                    }}
                    label="Overall Feedback"
                    {...a11yProps(1)}
                  />
                </Tabs>
              </Box>
              <Popover
                id={id2}
                open={openInfo}
                anchorEl={anchorEls}
                onClose={handleCloseInfo}
                PaperProps={{
                  // style: { width: "22%", height: "41%", marginTop: "55px" },
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
                                          // width: "100px",
                                          wordWrap: "break-word",
                                        }}
                                      >
                                        {row.rating}
                                        {/* rating */}
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
                                        {/* rating scale */}
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
            </Typography>

            {value1 === 0 && (
              <Grid item xs={12}>
                <Box>
                  <TableContainer >
                    <Table
                      sx={{
                        borderCollapse: 'separate',
                        borderSpacing: '0px 15px'
                      }}
                      size="small" aria-label="simple table"
                    >
                      <TableHead
                        style={{
                          background: "#eaeced",
                          fontSize: "15px",
                          fontWeight: "400",
                        }}
                      >
                        <TableRow>
                          <TableCell
                            style={{
                              fontFamily: "Arial",
                              fontSize: "14px",
                              fontWeight: "600",
                              background: "#eaeced",
                              textAlign: "center",
                              color: "#3e8cb5",

                            }}
                          >

                            Objective <br></br>Type


                          </TableCell>
                          <TableCell
                            style={{
                              background: "#eaeced",
                              textAlign: "center",
                              // borderBottom: "1px solid #fff",
                              // padding:"6px 16px",
                              fontFamily: "Arial",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#3e8cb5",
                              // width: "11%",
                            }}
                          >

                            Objective <br></br>Title

                          </TableCell>
                          <TableCell
                            style={{
                              background: "#eaeced",
                              textAlign: "center",
                              // borderBottom: "1px solid #fff",
                              padding: "0px 8px",
                              fontFamily: "Arial",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#3e8cb5",
                              // width: "20%",
                            }}
                          >

                            Objective <br></br> Level

                          </TableCell>
                          <TableCell
                            style={{
                              background: "#eaeced",
                              textAlign: "center",
                              // borderBottom: "1px solid #fff",
                              padding: "0px 8px",
                              fontFamily: "Arial",
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#3e8cb5",
                              // width: "7%",
                            }}
                          >

                            Appraiser<br></br> Rating

                          </TableCell>

                          {employeeData?.data?.appraisal?.objective_description.filter((item: any) => item.comments !== "" && item.comments !== undefined)?.length > 0 && (
                            <TableCell
                              style={{
                                background: "#eaeced",
                                textAlign: "center",
                                // borderBottom: "1px solid #fff",
                                // padding:"6px 16px",
                                fontFamily: "Arial",
                                fontSize: "14px",
                                fontWeight: "600",
                                color: "#3e8cb5",
                                // width: "14%",
                              }}
                            >

                              Appraiser<br></br> Comments

                            </TableCell>
                          )}

                          {employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                            (item.rating_rejected == true || item.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined))?.length > 0 && (
                              <TableCell
                                style={{
                                  background: "#eaeced",
                                  textAlign: "center",
                                  //  borderBottom: "1px solid #fff",
                                  //  padding:"6px 16px",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  fontWeight: "600",
                                  color: "#3e8cb5",
                                  // width: "14%",
                                }}
                              >

                                Appraiser<br></br>  Rejection/Change Reason

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
                          objectiveDescription?.map((j: any, index: number) => {
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
                                    align="left"
                                    width="180px"
                                    // rowSpan={3}
                                    style={{
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      color: "#333333",
                                      wordBreak: "break-word",
                                      // padding:"6px 16px",
                                      lineHeight: "20px",
                                      backgroundColor: colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name) != undefined ? colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name)?.color : Colors[0],
                                      // background:"#BEECF5",
                                    }}
                                  >
                                    {j?.objective_type?.name?.name}
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    width="165px"
                                    //  width="150px"
                                    style={{
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      color: "#333333",
                                      wordBreak: "break-word",
                                      // padding:"6px 16px",
                                      lineHeight: "20px",
                                      background: "#ffffff",
                                    }}
                                  >
                                    <Stack direction="row" alignItems="center" >
                                      <IconButton
                                      sx={{padding:"4px"}}
                                        aria-describedby={objectiveTitleInfoId}
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
                                      id={"objectiveTitleInfoId"}
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
                                      paddingLeft: "5px",
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      color: "#333333",
                                      textAlign: "center",
                                      padding: "0px 8px",
                                      background: "#FBFBFB",
                                    }}
                                  >
                                    <Stack direction="row" alignItems="center" justifyContent="center">
                                    {(j.level_1_isChecked ||
                                      j.level_2_isChecked ||
                                      j.level_3_isChecked ||
                                      j.level_4_isChecked) && (
                                        <IconButton
                                          style={{ padding: "4px" }}
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
                                                    {/* <br /> */}
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
                                                    {/* <br /> */}
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
                                                    <span>L3:</span>
                                                    {/* <span> */}
                                                      <b>{
                                                        j?.name?.level_3
                                                          ?.level_definition
                                                      }</b>
                                                    {/* </span> */}
                                                    {/* <br /> */}
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
                                                    {/* <br /> */}
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
                                    align="center"
                                    style={{
                                      // paddingLeft: "20px",
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      color: "#333333",
                                      textAlign: "center",
                                      padding: "0px 8px",
                                      background: "#ffffff",
                                    }}
                                  >
                                    {/* <Tooltip title="PreviousRating" arrow placement="bottom">    */}
                                    <div
                                      style={{ display: "inline-flex" }}
                                    >

                                      {employeeData?.data?.appraisal?.objective_description
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
                                    {/* </Tooltip>  */}
                                  </TableCell>
                                  {employeeData?.data?.appraisal?.objective_description.filter((item: any) => item.comments !== "" && item.comments !== undefined)?.length > 0 && (
                                    <TableCell
                                      width="300px"
                                      style={{ textAlign: "left", padding: "6px 16px", background: "#FBFBFB", }}>
                                      <Stack
                                        direction="row"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        spacing={2}
                                      // paddingLeft="10px"
                                      // paddingRight="10px"
                                      >
                                        <Typography
                                          style={{
                                            fontFamily: "Arial",
                                            fontSize: "14px",
                                            color: "#333333",
                                            lineHeight: "20px"
                                          }}
                                        >
                                          {/*Exceeding*/}
                                          {employeeData &&
                                            employeeData?.data?.appraisal?.objective_description
                                              .filter(
                                                (i: any) =>
                                                  i?.name?._id === j?.name?._id
                                              )
                                              .map((k: any) => {
                                                if (
                                                  k?.comments === "" ||
                                                  k?.comments === undefined
                                                ) {
                                                  return "";
                                                } else {
                                                  return k?.comments;
                                                }
                                              })[0]}
                                        </Typography>

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
                                          <Typography
                                            sx={{
                                              p: 2,
                                              backgroundColor: "#f8f8ff",
                                            }}
                                          >
                                            Comments:{ratingComments1}
                                            <br />
                                            {/* Attachments: {appraisalAttachments} */}
                                          </Typography>
                                        </Popover>

                                        <Box>
                                          {employeeData &&
                                            getAttachments(j?.name?._id)?.length >
                                            0 && (
                                              <AttachFileIcon
                                                style={{
                                                  color: "#93DCFA",
                                                  height: "18px",
                                                  transform: "rotate(30deg)",
                                                  cursor: "pointer"
                                                }}
                                                aria-describedby={"id9"}
                                                onClick={(e: any) => {
                                                  handleClick9(e, j);
                                                  setPopoverIndex(index);
                                                }}
                                              />
                                            )}

                                        </Box>
                                        <Popover
                                          id={id9}
                                          open={popoverIndex === index && open9}
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


                                  {employeeData?.data?.appraisal?.objective_description?.filter((item: any) =>
                                    (item.rating_rejected == true || item.rating_resubmitted == true) && (item.rejection_reason !== "" && item.rejection_reason !== undefined))?.length > 0 && (
                                      <TableCell
                                        width="250px"
                                        style={{
                                          fontSize: "14x",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                          // padding:"6px 16px",
                                          background: "#fbfbfb",
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
                                                  if (k?.rating_rejected == true || k.rating_resubmitted == true) return k.rejection_reason
                                                })[0]
                                            }
                                          </span>
                                          {employeeData &&
                                            getRejectionAppraisalAttachments(j?.name?._id)?.length > 0 &&
                                            (employeeData?.data?.appraisal?.objective_description
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
                                                if (k?.rating_rejected == true || k.rating_resubmitted == true) return k.rejection_reason
                                              })[0]) && (
                                              <AttachFileIcon
                                                sx={{
                                                  color: "#93DCFA",
                                                  height: "18px",
                                                  transform: "rotate(30deg)",
                                                  cursor: "pointer",
                                                }}
                                                aria-describedby={"id"}
                                                onClick={(e: any) => {
                                                  handleClickOpen2(e, j);
                                                  setPopoverIndex1(index);
                                                }}
                                              />
                                            )}
                                          <Popover
                                            id={id21}
                                            open={popoverIndex1 === index && openInfo2}
                                            anchorEl={anchorE2}
                                            onClose={handleClose2}
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
                                                getRejectionAppraisalAttachments(j?.name?._id)?.map(
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
                                                        </Stack>
                                                      </>
                                                    );
                                                  }
                                                )}
                                            </Typography>
                                          </Popover>
                                        </Stack>
                                      </TableCell>
                                    )}
                                </TableRow>
                              </>
                            );
                          })}
                      </TableBody>
                    </Table>
                  </TableContainer>


                  <FooterButoons1
                    navPrompt={navPrompt}
                    setnavPrompt={setnavPrompt}
                    value1={value1}
                    setValue1={setValue1}
                    moveTab={moveTab}
                    setMoveTab={setMoveTab}
                  />
                  {/* } */}
                  {/* </Footer> */}
                </Box>
              </Grid>
            )}

          </Box>
        </Box>
      </div>
    </React.Fragment>
  );
}
// export default TeamApprove
