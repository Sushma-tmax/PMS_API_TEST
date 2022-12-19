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
  Avatar,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Stack,
  TextField,
  Popover,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Tabs,
  Tab,
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  border,
  width,
  color,
  textAlign,
  borderColor,
  textTransform,
} from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from '@mui/material/FormLabel';
import Infoicon from "../Icons/Infoicon.svg";
import Uploadatt from "../../../../assets/Images/Uploadatt.svg"
import thumbsdown_colored from "../../../../assets/Images/icons/Thumbsdowncolored.svg";
import thumsup_colored from "../../../reviewer/appraisal_reviewer/icons/thumsup_colored.svg";
// import {
//   MIDYEAR_PA_REPORT,
//   MIDYEAR_PERFORMANCE,
//   MIDYEAR_REJECT_RATING,
//   MIDYEAR_SUCCESS,
// } from "../../constants/routes/Routing";
import Command from "../../ReviewerRejection/Icons/Command.svg";
import Header from "../Header";
import { useEffect, useState, useRef } from "react";
import {
  useAttachmentsAppraiserMutation,
  useCreateEmployeeAppraisalMutation,
  useGetEmployeeAppraisalQuery,
  useGetEmployeeQuery,
  useGetObjectiveTitleQuery,
  useGetRatingScaleQuery,
  useUpdateEmployeeAppraisalMutation,
  useAttachmentsAppraiserDeleteMutation,
  useAttachmentsReviewerDeleteMutation,
  useEmployeeRejectSaveMutation
} from "../../../../service";
import { useAppraiserRejectsReviewerContext } from "../../../../context/AppraiserRejectsReviewer";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCreateAzureBlobMutation } from "../../../../service/azureblob";
import AttachmentPopup from "../../../attachmentpopup";
import Downloadss from "../../../../assets/Images/Downloadss.svg";
import Footerbuttons from "../Footerbuttons";
import Close from "../../../../assets/Images/Close.svg";
import Newtickicon from "../../../../assets/Images/Newtickicon.svg";
import Closeiconred from "../../../../assets/Images/Closeiconred.svg";
import { useGetNineboxQuery } from "../../../../service/ninebox/ninebox";
import Downloadatt from "../../../../assets/Images/Downloadatt.svg";
import Removeattnew from "../../../../assets/Images/icons/Removeattnew.svg";
import Thumsup from "../../../../assets/Images/icons/Thumsup.svg";
import Thumsdown from "../../../../assets/Images/icons/Thumsdown.svg";

import { Scrollbar } from "react-scrollbars-custom";

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
  paddingBottom: "5px",
});
const Overallrating = styled("div")({
  fontSize: "17px",
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
  // padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  width: "450px",
  margin: "1rem",
  marginBottom: "0px",
}));
const Footer = styled("div")({
  //marginLeft: "120%",
  paddingTop: "20px",
  paddingBottom: "30px",
});

const Root = styled("div")(
  ({ theme }) => `
  table {
    // font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    border-collapse: collapse;
    width: 100%;
    
  }

  td,
  th {
    border: 1px solid #e0e0e0;
    text-align: left;
    // padding: 6px;
   
  }

  th {
    // background-color: #f2f9fa;
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
    width: "25px",
    height: "25px",
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
  marginLeft: '26px',
});

export default function ReviewerRating(props: any) {
  // @ts-ignore
  const { empData: employeeData, employee_id, acceptButton, setacceptButton, rejectButton, setrejectButton, potentialValue, setPotentialValue } = useAppraiserRejectsReviewerContext();
  const { data: nineBoxData } = useGetNineboxQuery("");
  console.log(acceptButton, "acceptButton");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [objectiveDescription, setObjectiveDescription] = useState<any>([]);
  const { navPrompt, setnavPrompt, value, setValue, handleChange } = props;
  console.log(isDrawerOpen);
  const [addPotential] = useUpdateEmployeeAppraisalMutation();
  const { data: ratingsData } = useGetRatingScaleQuery("");
  // const {data: employeeData} = useGetEmployeeAppraisalQuery('6204935ebca89023952f2da9')
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [deleteReviewerMutation, { isLoading: isDelete, data: deleted }] =
    useAttachmentsReviewerDeleteMutation();
  console.log(objectiveDescription, "objectiveDescriptionobjectiveDescription");
  const { data: objectiveTitleData, isLoading } = useGetObjectiveTitleQuery("");
  const [activeObjectiveDescription, setActiveObjectiveDescription] =
    useState("");
  const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] =
    useState("");
  const [rating, setRating] = useState<any>("");
  const [ratingReviewer, setRatingReviewer] = useState<any>("");
  const [updateMutation] = useCreateEmployeeAppraisalMutation();
  const [comments, setComments] = useState("");
  const [objectiveType, setObjectiveType] = useState("");
  const [accept, setAccept] = useState("");

  const [open2, setOpen2] = React.useState(false);

  const [ratingRed, setRatingRed] = useState<any>(false)
  const [ratingComments1, setRatingComments1] = useState<any>("");
  const [ratingComments, setRatingComments] = useState<any>("");
  const [anchorElReviewer, setanchorElReviewer] = React.useState<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  // const [rating, setRating] = useState<any>("");
  const [ratingAppraiser, setRatingAppraiser] = useState<any>("");
  console.log(ratingAppraiser, 'ratingAppraiser')
  const [name, setName] = useState<string>('');
  const [fileSelected, setFileSelected] = useState<any>('');
  const [objTitleHeader, setobjTitleHeader] = useState<any>('');
  const [sendItem, { data }] = useCreateAzureBlobMutation();

  const [attachmentsAppraiser] = useAttachmentsAppraiserMutation()
  const inputRef = useRef<any>(null);


  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const handleClickAppraiserDetails = (event: any, j: any) => {
    console.log(j, 'jjjj')
    setRatingComments1(employeeData && employeeData.data.appraisal.objective_description
      .filter(
        (i: any) => i.name._id === j.name._id
      )
      .map((k: any) => k.comments)[0])

    setappraisalAttachments(
      employeeData &&
      employeeData?.data?.appraisal?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
    setAnchorEl(event.currentTarget);
  };

  console.log(ratingComments1, ratingComments, 'ooooo')
  //buttons disabling
  useEffect(() => {
    const disableButton = objectiveDescription.filter((i: any) => {
      return i.rating_rejected === true
    })
    //console.log(disableButton.length,'disableButton')
    if (disableButton.length > 0) {

    } else {

    }
  }, [objectiveDescription])
  //buttons disabling

  const handleClose = () => {
    setAnchorEl(null);
    setRatingComments1(null)
  };
  const openAppraiserDetails = Boolean(anchorEl);

  const [reviewerAttachments, setreviewerAttachments] = useState<any>("");
  const handleClickReviewerDetails = (event: any, j: any) => {
    console.log(j, 'jjjjr')
    setRatingComments(employeeData && employeeData.data.reviewer.objective_description
      .filter(
        (i: any) => i.name._id === j.name._id
      )
      .map((k: any) => k.comments)[0])

    setreviewerAttachments(
      employeeData &&
      employeeData?.data?.reviewer?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
    setanchorElReviewer(event.currentTarget);
  };
  const handleCloseReviewer = () => {
    setanchorElReviewer(null);
    setRatingComments(null)
  };

  const openReviewerDetails = Boolean(anchorElReviewer);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };

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


  const getAppraiserAttachments = (id: any) => {
    if (employeeData) {
      console.log(employeeData?.data?.appraisal, 'objectiveDescriptionobjectiveDescription')
      const data = employeeData?.data?.appraisal?.attachments?.filter(
        (item: any) => item?.objective_description === id
      ).map((j: any) => {
        return {
          name: j.name,
          url: j.url
        }
      })
      return data
    }
  };

  const getReviewerAttachments = (id: any) => {
    if (employeeData) {
      console.log(employeeData?.data?.reviewer, 'objectiveDescriptionobjectiveDescription')
      const data = employeeData?.data?.reviewer?.attachments?.filter(
        (item: any) => item?.objective_description === id
      ).map((j: any) => {
        return {
          name: j.name,
          url: j.url

        }
      })

      return data

      // if(data) return data
      // else return  null
    }
  };
  console.log(objectiveDescription, "start")

  const getReviewerAttachmentsName = (id: any) => {
    if (employeeData) {
      console.log(employeeData?.data?.appraisal, 'objectiveDescriptionobjectiveDescription')
      return employeeData?.data?.appraisal?.attachments?.filter(
        (item: any) => item?.objective_description === id
      ).map((j: any) => j?.name)
    }
  };
  const getAppraiserAttachmentsName = (id: any) => {
    if (employeeData) {
      console.log(employeeData?.data?.reviewer, 'objectiveDescriptionobjectiveDescription')
      return employeeData?.data?.reviewer?.attachments?.filter(
        (item: any) => item?.objective_description === id
      ).map((j: any) => j?.name)
    }
  };

  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setObjectiveDescription(() => {
        return employeeData.data.appraisal.objective_description.map(
          (i: any) => {
            return {
              ...i,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
              appraisal_attachment_url: getAppraiserAttachments(i?.name?._id),
              // attachment_name: getAppraiserAttachmentsName(i.name._id),
              reviewer_attachment_url: getReviewerAttachments(i?.name?._id),
              //  reviewer_attachment_name: getReviewerAttachmentsName(i.name._id)
            };
          }
        );
      });
    }
  }, [employeeData, objectiveTitleData]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    setnavPrompt(true);
    setIsDrawerOpen(false);
    setRatingAppraiser('')
    setratingparams('')
  };
  const [showWithdraw, setShowWithdraw] = useState(false);

  const [ratingNormalizer, setRatingNormalizer] = useState<any>("");


  const [objectiverating, setobjectiverating] = useState<any>(false);
  console.log(objectiverating, "objectiverating");
  useEffect(() => {
    let temp = objectiveDescription.filter((i: any) => {
      return i.rating_rejected === true;
    });
    if (temp?.length > 0) {
      //setobjectiverating(true)
      setacceptButton(true);
      setrejectButton(false);
    } else if (temp?.length === 0) {
      setacceptButton(false);
      setrejectButton(true);
    } else {
      //setobjectiverating(false)
      setrejectButton(false);
      setacceptButton(false);
    }
    console.log(temp.length, "temp1");
  }, [objectiveDescription]);

  useEffect(() => {

    const rejected = objectiveDescription?.map((i: any) => {

      if (i.rating_rejected === true) {
        setRatingRed(true)
      } else {
        setRatingRed(false)
      }

    });
    return rejected

  }, [objectiveDescription])

  const openDrawerHandlerreject = (objective: any) => {
    let normalizerRatingValue =
    employeeData.data.reviewer.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
  setRatingNormalizer(normalizerRatingValue);
    setFileSelected("");
    setAccept("Reject");
    openDrawer();
    setobjTitleHeader(objective.name.objectiveTitle)
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
    // setratingparams(objective.ratings.rating);
    let reviewerRatingValue = employeeData.data.reviewer.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
    let reviewerRatingValue1 = employeeData.data.reviewer.objective_description
      .filter((i: any) => i.name._id === objective.name._id)
      .map((k: any) => {
        if (k.ratings) return k.ratings.rating;
      })[0];
      console.log(normalizerRatingValue, 'normalizerRatingValue')
    // setRatingAppraiser(reviewerRatingValue);
   
    setratingparams(reviewerRatingValue1)
    setShowWithdraw(objective.rating_rejected);
  };

  const ratingWithdrawHandler = () => {
    closeDrawer();
    let temp = employeeData.data.reviewer.objective_description
      .filter((i: any) => i.name._id === activeObjectiveDescription)
      .map((k: any) => k.ratings._id)[0];

    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      action_performed: false,
      comments: "",
      rating_comments: "",
      id: employee_id,
    });
    
    setRating("");
    // setRatingReviewer("");
    setComments("");
  }

  const openDrawerHandler = (objective: any) => {
    console.log(objective, ' openDrawerHandler')
    setAccept("Accept");
    setnavPrompt(true);
    openDrawer();
    setobjTitleHeader(objective.name.objectiveTitle)
    setActiveObjectiveDescriptionName(objective.name._id);
    setActiveObjectiveDescription(objective._id);
    setComments(objective.comments);
    setRating(objective.ratings._id);
    let reviewerRatingValue =
      employeeData.data.reviewer.objective_description
        .filter(
          (i: any) => i.name._id === objective.name._id
        )
        .map((k: any) => {
          if (k.ratings) return k.ratings.rating;
        })[0];
    console.log(reviewerRatingValue, 'reviewerRatingvalue')
    //  let reviewerRatingValue = employeeData.data.appraisal.objective_description
    //   .filter((i: any) => i.name._id === objective.name._id)
    //   .map((k: any) => {
    //     if (k.ratings) return k.ratings.rating;
    //   })[0];
    setRatingAppraiser(reviewerRatingValue);
    
    // setRatingReviewer(reviewerRatingValue)
  };
  console.log(ratingNormalizer,"ratingNormalizer")

  // const acceptHandler = (objective: any, rating: any) => {
  const acceptHandler = () => {
    // setActiveObjectiveDescriptionName(objective.name._id)
    // setActiveObjectiveDescription(objective._id)
    // setComments(objective.comments)
    // setRating(rating)

    // ratingSubmitHandler()
    let temp = employeeData.data.reviewer.objective_description.filter(
      (i: any) => i.name._id === activeObjectiveDescriptionName
    ).map((k: any) => k.ratings._id)[0]
    setnavPrompt(true);
    console.log(temp, 'temppppppp')
    updateMutation({
      objective_description: activeObjectiveDescription,
      objective_description_name: activeObjectiveDescriptionName,
      ratings: temp,
      rating_rejected: false,
      action_performed: true,
      comments: comments,
      id: employee_id,
    });
    setRatingReviewer("");
    closeDrawer();

  };

  console.log(ratingsData, "rating");

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    // if (!fileList) return;
    //@ts-ignore
    setName(fileList[0].name)
    // setFileSelected(fileList[0]);
    let reader = new FileReader();
    //@ts-ignore
    reader.readAsDataURL(fileList[0])
    reader.onload = (e) => {
      setFileSelected(e.target?.result)

    }
  }


  const handleClickOpenAttachment = (e: any) => {
    document.getElementById("photo")?.click();
  };
  const imageClick = () => {
    const newData = {
      // token:tokens,
      // newstitle: newsTitle,
      // newsdesc: convertedContent,
      newspic: fileSelected,
      newspicname: name

    };

    sendItem(newData).then((res: any) => {
      attachmentsAppraiser({
        attachments: {
          url: name,
          objective_description: activeObjectiveDescriptionName,
        },
        id: employee_id
      })
    })
  }
  const resetFileInput = () => {
    setFileSelected('')
    setName('')

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

  //slider validation
  const [rejectAlert, setrejectAlert] = React.useState(false);
  const [message, setMessage] = useState("")
  // const [ratingReviewer, setRatingReviewer] = useState<any>("");
  const [ratingSelection, setratingSelection] = useState(false);
  const [ratingparams, setratingparams] = useState<any>("");

  // useEffect(() => {
  //   setratingparams(ratingAppraiser);
  // }, [ratingAppraiser]);

  const handleSliderDialogClose = () => {
    setrejectAlert(false);
    setratingparams('');
    setMessage("");
  };

  const handleRatingAlert = (j: any) => {
    console.log(j, "jjjjjjj");
    setratingparams(j.rating);
    if (ratingAppraiser === j.rating) {
      setrejectAlert(true);
      setMessage("You cannot put the same rating as the Reviewer. Please change the Rating.")
    } else {
      if (j) setRating(j._id);
      // setratingSelection(true);
    }
  };
  const ratingSubmitHandler = () => {
    if (ratingAppraiser === ratingparams) {
      setMessage(" You cannot put the same rating as the Reviewer. Please change the Rating.")
      setrejectAlert(true);
    }
    else if (comments == "" || comments == undefined) {
      setrejectAlert(true);
      setMessage("Please add comments for rejection.")
    }
    else {
      setnavPrompt(true);
      closeDrawer();
      updateMutation({
        objective_description: activeObjectiveDescription,
        objective_description_name: activeObjectiveDescriptionName,
        ratings: rating,
        comments: comments,
        rating_rejected: true,
        action_performed: true,
        id: employee_id,
      });
      if (name && fileSelected) {
          return imageClick()
        }
      setRating("");
      setRatingReviewer("")
      // setRatingAppraiser('')
    }
  };
  console.log(ratingparams, "ratingparams");
  console.log(ratingAppraiser, "ratingAppraiser");
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
  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    // setOpen2true);

    setAnchorEl7(event.currentTarget);
    setreviewerAttachments(
      employeeData &&
      employeeData?.data?.reviewer?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
  };

  const handleClose7 = () => {
    setAnchorEl7(null);
    // setOpen2(false);
  };
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open6 = Boolean(anchorEl6);
  const handleClickOpen6 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
    setappraisalAttachments(
      employeeData &&
      employeeData?.data?.appraisal?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
  };

  const handleClose6 = () => {
    setAnchorEl6(null);
    // setOpen2(false);
  };

  // const [opendropdown, setopenDropDown] = React.useState<HTMLButtonElement | null>(
  //   null
  // );
  // const handleopen = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   // console.log(j,'hhh')
  //   setopenDropDown(event.currentTarget)
  //   // if (opendropdown === true) {
  //   //   setopenDropDown(false)
  //   // }
  // }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  //  get pa status
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
  }

  //  to get description for rating
  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingsData?.data?.find(
      (item: any) => item.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  const styles = {
    colors: {
      color: fileSelected == "" ? "transparent" : "#3e8cb5",

    },
  };
  //radio button
  const [potential, setPotential] = React.useState<any>(
    employeeData?.data?.appraisal?.potential
  );

  useEffect(() => {
    if (employeeData) {
      setPotential(employeeData?.data?.appraisal?.potential);
    }
  }, [employeeData]);
  // const [anchorE2, setAnchorE2] = React.useState<HTMLButtonElement | null>(
  //   null
  // );
  // const handleClose22 = () => {
  //   setAnchorE2(null);
  // };
  // const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   //setnavPrompt(true);
  //   setAnchorE2(event.currentTarget);
  // };
  // const open22 = Boolean(anchorE2);
  // const id22 = open2 ? "simple-popover" : undefined;

  const [anchorE3, setAnchorE3] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClose3 = () => {
    setAnchorE3(null);
  };
  const handleClick3 = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE3(event.currentTarget);
  };

  const open3 = Boolean(anchorE3);
  const id3 = open3 ? "simple-popover" : undefined;

  const [anchorE, setAnchorE] = React.useState<HTMLButtonElement | null>(null);
  const handleClose1 = () => {
    setAnchorE(null);
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setnavPrompt(true);
    setAnchorE(event.currentTarget);
  };

  const open = Boolean(anchorE);
  const id = open ? "simple-popover" : undefined;
  const handleChange1 = (event: any) => {
    setPotential(event.target.value as string);
    // addPotential({
    //   "appraisal.potential": event.target.value,
    //   id: employee_id,
    // });
     setnavPrompt(true);
  };

  useEffect(() => {
    setPotentialValue(potential)
  }, [potential])

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

  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open9 = Boolean(anchorEl9);
  const id9 = open9 ? "simple-popover" : undefined;
  const handleClick9 = (event: React.MouseEvent<HTMLButtonElement>, j: any) => {
    setAnchorEl9(event.currentTarget);
    setreviewerAttachments(
      employeeData &&
      employeeData?.data?.reviewer?.attachments
        .filter((i: any) => i?.objective_description === j.name._id)
        .map((k: any) => { return <div><a href={k.url}> {k.name} </a><br /></div> })
    );
  };
  const handleClose9 = () => {
    setAnchorEl9(null);
  };
  const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo101 = Boolean(anchorEl01);

  const id101 = openInfo101 ? "simple-popover" : undefined;


  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);
    //setAnchorEl01(anchorEl01 ? null : event.currentTarget);
  };
  const handleClose101 = () => {
    setAnchorEl01(null);
  };

  const [anchorEl02, setAnchorEl02] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo102 = Boolean(anchorEl02);

  const id102 = openInfo102 ? "simple-popover" : undefined;


  const handleClickInfo12 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl02(anchorEl02 ? null : event.currentTarget);
  };
  const handleClose102 = () => {
    setAnchorEl02(null);
  };


  const getAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.attachments
      .filter((i: any) => i?.objective_description == id)
      // .filter((i: any) => i?.objective_description === j.name._id)
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
  const [popoverIndexReviewer, setPopoverIndexReviewer] = useState<any>("")
  const getAttachmentsReviewer = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.data?.reviewer?.attachments
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



  return (
    <React.Fragment>
      <Drawer
        anchor={"right"}
        open={isDrawerOpen}

      // sx={maxWidth: 300px}
      // onClose={toggleDrawer(anchor, false)}
      >

        <div
          style={{
            paddingLeft: "22px",
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

                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  // marginRight: "10px",
                  height: "35px",
                  width: "70px",
                  background: "transparent"
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

            <Item2 >
              <Typography
                style={{
                  paddingLeft: "8px",
                  // paddingTop: "16px",
                  paddingBottom: "16px",
                  fontFamily: "arial",
                  //paddingBottom: "10px",
                  //backgroundColor: "#ebf2f4",
                  color: "#3E8CB5",
                  fontSize: "17px",
                  // width:"20%"
                  textAlign: "left",
                  wordBreak: "break-word"
                }}
              >
                {objTitleHeader}
              </Typography>
              <Typography
                style={{
                  paddingRight: "373px",
                  fontSize: "12px",
                  color: "#7A7A7A",
                  fontFamily: "Arial",
                  paddingBottom: "7px",
                }}>Comments
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
                style={{ paddingRight: "94px", width: "75%" }}
                autoComplete="off"
                value={comments}
                inputProps={{ maxLength: 500 }}
                onChange={(e) => {
                  setComments(e.target.value);
                  setnavPrompt(true);
                }}
              // fullWidth
              />
              <Stack
                alignItems="left"
                direction="row"
                paddingLeft="10px"
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
                    background: "transparent"
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
                    background: "transparent"
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
                  // paddingTop: "16px",
                  paddingBottom: "16px",
                  fontFamily: "arial",
                  //paddingBottom: "10px",
                  //backgroundColor: "#ebf2f4",
                  color: "#3E8CB5",
                  fontSize: "17px",
                  // width:"20%"
                  textAlign: "left",
                  wordBreak: "break-word"
                }}
              >
                {objTitleHeader}
              </Typography>
              <div
                style={{
                  textAlign: "left",
                  paddingLeft: "10px",
                  fontSize: "12px",
                  fontFamily: "arial",
                  paddingBottom: "7px",
                  color: "#7A7A7A",
                }}>
                Appraiser Rating</div>

              <>
                <Stack
                  style={{ paddingLeft: "8px" }}
                  direction="row"
                  // height="50px"
                  spacing={1.7}>
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
                                handleRatingAlert(ratings);
                                setnavPrompt(true);
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
                              <p style={{ color: "#3C8BB5", fontSize: "10px" }}>
                                {ratings.rating_scale}
                              </p>
                            )} */}
                          </Contain>

                          {/* <p style={{ color: "#3C8BB5", fontSize: "10px" }}>{ratings.rating_scale}</p> */}
                        </Item1>
                      ))}
                </Stack>
                {/* <p style={{ textAlign: "left", paddingLeft: "10px" }}>Submit reasons of the rejections</p> */}
                <div style={{ paddingTop: "16px" }}>
                  {/* {employeeData.data.reviewer.rejection_count == 2 ? <>

                  <FormControl style={{ textAlign: "left" }}>
                    <FormLabel id="demo-radio-buttons-group-label"></FormLabel>
                    <RadioGroup aria-labelledby="demo-radio-buttons-group-label" defaultValue="female" name="radio-buttons-group" >
                      <FormControlLabel value="male" control={<Radio />} label="the rating was not agreed with the appraiser" />
                      <FormControlLabel value="other" control={<Radio />} label="An error made by the reviewer" />
                    </RadioGroup>
                  </FormControl>

                </> : */}
                  {/* {employeeData.data.reviewer.rejection_count == 1 ? "2nd Time" : "1st Time"} */}
                </div>
              </>
            </Item2>

            <Stack
              direction="column"
              position="relative"
            // display="flex"
            // alignItems="center"
            >


              <Item1
                sx={{
                  marginLeft: "2px",
                  padding: "0px",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                    paddingLeft: "23px",
                    fontSize: "12px",
                    fontFamily: "arial",
                    paddingBottom: "7px",
                    paddingTop: "16px",
                    color: "#7A7A7A",
                  }}
                >
                  Reviewer Rating
                </div>
                <Contain>
                  <Stack
                    direction="column"
                    alignItems="start"
                    display="flex"
                    marginLeft="23px"
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
                       {ratingNormalizer}
                        {/* {ratingAppraiser} */}
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

            <div
              style={{
                textAlign: "left",
                paddingLeft: "26px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial",
              }}>Comments</div>

            <TextField
              sx={{
                "& .MuiInputBase-input": {
                  fontSize: "14px",
                  fontFamily: "Arial",
                  color: "#333333",
                },
              }}
              size="small"
              style={{ paddingLeft: "28px", width: "75%" }}
              inputProps={{ maxLength: 500 }}
              // fullWidth
              multiline
              autoComplete="off"
              value={comments}
              onChange={(e) => {
                setComments(e.target.value);
                setnavPrompt(true);
              }}
            />
            <div

              style={{
                textAlign: "left",
                paddingLeft: "28px",
                fontSize: "12px",
                paddingBottom: "7px",
                paddingTop: "16px",
                color: "#7A7A7A",
                fontFamily: "arial",
              }}
            >Attachment
            </div>
            <div >
              <Stack direction="row" alignItems="left" spacing={3}>

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

                  <><label
                    style={{
                      fontSize: "14px",
                      color: "#7A7A7A",
                      fontFamily: "Arial"
                    }}

                  >{name}</label></>

                </Text>
                {
                  positionHide && (
                    <IconButton onClick={() => {
                      resetFileInput();
                    }}
                    >
                      <img src={Removeattnew} alt='icon' />
                    </IconButton>
                  )
                }
              </Stack>
              {/* {employeeData &&
                  objectiveTitleData &&
                  objectiveDescription?.map((j: any, index: number) => {   
                  
                    return (
                      <>
                        {employeeData && getAttachments(j?.name?._id)
                        //  ?.filter((i: any) => i?.objective_description === j.name._id)
                        ?.map((k: any, index1: any) => {
                          console.log(k,"kkkkkkk")
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
                                      src={Removeattnew}
                                      onClick={() => deleteAppraiserMutation({
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
            </div>
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
                  // width: "70px"
                }}
                variant="outlined"
                onClick={() => {
                  ratingSubmitHandler();
                  setnavPrompt(false);
                  // if (name && fileSelected) {
                  //   return imageClick()
                  // }
                }}              >
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
                    width: "70px"
                  }}
                  variant="outlined"
                  onClick={() => {
                    ratingWithdrawHandler();
                    setnavPrompt(false)
                  }}              >
                  {" "}
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
                  width: "70px"
                }}
                variant="outlined"
                onClick={() => {
                  closeDrawer();
                  setnavPrompt(false);
                }}
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
            // marginTop: "5px",
            // height: "1408px",
            // height: "calc(100vh - 165px)",
            background: "#fff",
          }}
        >
          {/* <div><Header /></div> */}
          {/* <Box sx={{ flexGrow: 1, paddingBottom: "20px" }}> */}
          {/* <Grid container spacing={2}>
              <Grid item xs={8}> */}
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
          {/* </Grid>
          </Box> */}
          <Box
            style={{
              padding: "35px"
            }}
          >
            {/* <h2
            style={{
              color: "#3E8CB5",
              fontWeight: "400",
              fontSize: "28px",
              fontFamily: "Arial",
            }}
          >
            Welcome to Performance Appraisal!
          </h2> */}

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
                      <label style={{ paddingLeft: "5px" }}> Download</label>
                    </Button>
              </Grid>
            </Grid>
          </Box> */}


            {/* <Typo1>  <p >Ratings</p></Typo1> */}
            <Stack
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
                Welcome to Performance Appraisal!
              </Typography>
              <Typography
                style={{
                  fontSize: "16px",
                  color: "#717171",
                  fontFamily: "Arial",
                  // paddingRight: "60px",
                }}
              >
                PA Status:{" "}
                <span
                  style={{
                    color: "#717171",
                    marginTop: "8px",
                    fontSize: "16px",
                    fontFamily: "Arial",
                  }}
                >
                  {getPAStatus(employeeData?.data)}
                </span>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="flex-start"
              justifyContent="space-between"
              // mr={2}
              sx={{
                // borderRadius: "5px",
                // boxShadow: "0px 0px 3px 3px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#f3fbff",
              }}
              // divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
            // marginRight="60px"

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
              <Item style={{ paddingTop: "0px", paddingBottom: "0px" }}>
                {/* <Stack direction="column" alignItems="center">
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
                  </Stack> */}
                {potential != false &&
                  // <Item>
                  //   <Stack direction="column" alignItems="center">
                  //     <Typography

                  //       color="#3e8cb5"
                  //       fontFamily="arial"
                  //       fontSize="17px"
                  //     >
                  //       Potential Level
                  //     </Typography>

                  //     <Typography>
                  //       <FormControl>
                  //         <RadioGroup
                  //           row
                  //           aria-labelledby="demo-row-radio-buttons-group-label"
                  //           name="row-radio-buttons-group"
                  //           value={potential}
                  //         >
                  //           <FormControlLabel
                  //             value="Low"
                  //             control={<Radio size="small" />}
                  //             label={
                  //               <span style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}>
                  //                 Low
                  //                 {/* <IconButton onClick={handleClick}>
                  //                 <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                  //               </IconButton> */}
                  //                 {/* <Popover
                  //                 id={id}
                  //                 open={open}
                  //                 anchorEl={anchorE}
                  //                 onClose={handleClose}
                  //                 anchorOrigin={{
                  //                   vertical: "bottom",
                  //                   horizontal: "left",
                  //                 }}
                  //                 PaperProps={{
                  //                   style: {
                  //                     backgroundColor: "FEFCF8",
                  //                     boxShadow: "none",
                  //                     borderRadius: 0,
                  //                   },
                  //                 }}
                  //                 sx={{
                  //                   width: "60%",
                  //                   "& .MuiPopover-paper": {
                  //                     border: "1px solid #FFCF7A",
                  //                     backgroundColor: "#f8f8ff",
                  //                   },
                  //                 }}
                  //               >
                  //                 <div
                  //                   style={{
                  //                     padding: "10px",
                  //                     fontSize: "14px",
                  //                     color: "#333333",
                  //                     fontFamily: "Arial",
                  //                   }}
                  //                 >
                  //                   {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.low}{" "}
                  //                 </div>
                  //               </Popover>{" "} */}
                  //               </span>
                  //             }
                  //             onChange={(e) => {
                  //               handleChange1(e);
                  //             }}
                  //           />
                  //           <FormControlLabel
                  //             value="Moderate"
                  //             control={<Radio size="small" />}
                  //             label={
                  //               <span style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}>
                  //                 Moderate
                  //                 {/* <IconButton onClick={handleClick2}>
                  //                 <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                  //               </IconButton> */}
                  //                 {/* <Popover
                  //                 id={id2}
                  //                 open={open2}
                  //                 anchorEl={anchorE2}
                  //                 onClose={handleClose2}
                  //                 anchorOrigin={{
                  //                   vertical: "bottom",
                  //                   horizontal: "left",
                  //                 }}
                  //                 PaperProps={{
                  //                   style: {
                  //                     backgroundColor: "FEFCF8",
                  //                     boxShadow: "none",
                  //                     borderRadius: 0,
                  //                   },
                  //                 }}
                  //                 sx={{
                  //                   width: "60%",
                  //                   "& .MuiPopover-paper": {
                  //                     border: "1px solid #FFCF7A",
                  //                     backgroundColor: "#f8f8ff",
                  //                   },
                  //                 }}
                  //               >
                  //                 <div
                  //                   style={{
                  //                     padding: "10px",
                  //                     fontSize: "14px",
                  //                     color: "#333333",
                  //                     fontFamily: "Arial",
                  //                   }}
                  //                 >
                  //                   {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.moderate}
                  //                   {" "}

                  //                 </div>
                  //               </Popover> */}
                  //               </span>
                  //             }
                  //             onChange={(e) => {
                  //               handleChange1(e);
                  //             }}
                  //           />
                  //           <FormControlLabel
                  //             value="High"
                  //             control={<Radio size="small" />}
                  //             label={
                  //               <span style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }}>
                  //                 High
                  //                 {/* <IconButton onClick={handleClick3}>
                  //                 <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                  //               </IconButton> */}
                  //                 {/* <Popover
                  //                 id={id3}
                  //                 open={open3}
                  //                 anchorEl={anchorE3}
                  //                 onClose={handleClose3}
                  //                 anchorOrigin={{
                  //                   vertical: "bottom",
                  //                   horizontal: "left",
                  //                 }}
                  //                 PaperProps={{
                  //                   style: {
                  //                     backgroundColor: "FEFCF8",
                  //                     boxShadow: "none",
                  //                     borderRadius: 0,
                  //                   },
                  //                 }}
                  //                 sx={{
                  //                   width: "60%",
                  //                   "& .MuiPopover-paper": {
                  //                     border: "1px solid #FFCF7A",
                  //                     backgroundColor: "#f8f8ff",
                  //                   },
                  //                 }}
                  //               >
                  //                 <div
                  //                   style={{
                  //                     padding: "10px",
                  //                     fontSize: "14px",
                  //                     color: "#333333",
                  //                     fontFamily: "Arial",
                  //                   }}
                  //                 >
                  //                  {nineBoxData && nineBoxData?.data[0]?.potential_definitions?.high}
                  //                  {""}
                  //                 </div>
                  //               </Popover> */}
                  //               </span>
                  //             }
                  //             onChange={(e) => {
                  //               handleChange1(e);
                  //             }}
                  //           />
                  //         </RadioGroup>
                  //       </FormControl>
                  //     </Typography>
                  //   </Stack>
                  // </Item>
                  <>
                  </>
                }
              </Item>
              {/* } */}

              <Item>
                <Stack direction="column" alignItems="flex-end"
                  paddingRight="10px" >
                  <Overallrating>Overall Rating</Overallrating>

                  <Overallratingvalue>
                    <b>
                      {employeeData &&
                        // employeeData?.data?.appraisal?.appraiser_rating == 0 ? "Yet to be rated." :
                        employeeData?.data.appraisal?.appraiser_rating}
                    </b>
                  </Overallratingvalue>
                  {/* <Overallratingcomments>
                    {employeeData &&  employeeData?.data?.appraisal?.appraiser_rating !== 0 &&
                      getRatingDescription(
                        employeeData?.data?.appraisal?.appraiser_rating
                      )}
                 Rating excefing
                  </Overallratingcomments> */}
                </Stack>
              </Item>
            </Stack>



            <Box sx={{ paddingTop: "20px", }}>

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

                    {employeeData.data.calendar.name}
                  </Typography>

                </Grid>
                <Grid item xs={4}>
                 {employeeData?.data?.appraisal_template?.potential == true &&
                 ( <Stack
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-end"
                  // paddingBottom="20px"
                  >
                    <Typography color="#3e8cb5" fontFamily="arial" fontSize="17px">
                      Potential Level
                      <IconButton onClick={handleClick3}>
                        <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                      </IconButton>
                      <Popover
                        id={id3}
                        open={open3}
                        anchorEl={anchorE3}
                        onClose={handleClose3}
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
                            maxWidth: "550px",
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
                            fontSize: "13px",
                            lineHeight: "20px",
                            color: "#333333",
                            fontFamily: "Arial",
                          }}
                        >
                          {/* <b>High :  {nineBoxData &&
                      nineBoxData?.data[0]?.potential_definitions?.low}{" "}</b>
                    <b>Medium : {nineBoxData &&
                      nineBoxData?.data[0]?.potential_definitions?.moderate}{" "}</b>
                    <b>Low : {nineBoxData &&
                      nineBoxData?.data[0]?.potential_definitions?.high}{" "}   </b> */}
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "#3e8cb5",
                              fontFamily: "Arial",
                              // paddingBottom:"10px",

                              paddingBottom: "5px",
                              borderBottom: "1px solid #d9d9d9"
                            }}
                          >
                            High:{" "}
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
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "#3e8cb5",
                              fontFamily: "Arial",
                              paddingBottom: "5px",
                              paddingTop: "5px",
                              borderBottom: "1px solid #d9d9d9"

                            }}
                          >
                            Moderate:{" "}
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {nineBoxData &&
                                nineBoxData?.data[0]?.potential_definitions?.moderate}{" "}
                            </span>
                          </Typography>
                          <Typography
                            style={{
                              fontSize: "14px",
                              color: "#3e8cb5",
                              fontFamily: "Arial",
                              paddingTop: "5px",
                            }}
                          >
                            Low:{" "}
                            <span
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                            >
                              {nineBoxData &&
                                nineBoxData?.data[0]?.potential_definitions?.low}{" "}
                            </span>
                          </Typography>

                        </div>
                      </Popover>
                    </Typography>
                    <Select sx={{
                      width: "75%",
                      "& .MuiInputBase-input": {
                        fontSize: "14px",
                        textTransform: "none",
                        fontFamily: "Arial",
                        color: "#333333",
                      },
                    }} size="small" value={potential}
                      onChange={(e) => {
                        handleChange1(e);
                      }}>

                      <MenuItem style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }} value="High">High</MenuItem>
                      <MenuItem style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }} value="Moderate">Moderate</MenuItem>
                      <MenuItem style={{ fontSize: "14px", fontFamily: "arial", color: "#333333" }} value="Low">Low</MenuItem>

                    </Select>

                  </Stack>
                  )}
                </Grid>

              </Stack>

            </Box>

            <Box style={{ paddingLeft: "0px", }}>
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
                      <IconButton
                        sx={{ "&.MuiTab-iconWrapper": { marginLeft: "0px" } }}
                        aria-describedby={id2}
                        onClick={handleClickInfo}
                      >
                        <img width="12px" src={Infoicon} alt="icon" />
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
                      fontWeight: "700",
                      paddingRight: "20px",
                    paddingLeft:"20px"
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
              paddingTop:"10px",
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
            {/* </Typography> */}

            {value === 0 &&
              <Root sx={{ paddingTop: "20px" }}>
                <table>
                  <thead
                    style={{
                      background: "#eaeced",


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
                          textAlign: "center",
                          borderBottom: "1px solid #fff",
                          color: "#3e8cb5",
                          padding: "6px 16px"
                          // width: "11%",
                        }}
                      >

                        Objective<br></br> Type

                      </th>
                      <th
                        style={{
                          fontFamily: "Arial",
                          fontSize: "14px",
                          fontWeight: "600",
                          background: "#eaeced",
                          textAlign: "center",
                          borderBottom: "1px solid #fff",
                          color: "#3e8cb5",
                          padding: "6px 16px"
                          // width: "11%",
                        }}
                      >

                        Objective<br></br> Title

                      </th>
                      <th
                        style={{
                          fontFamily: "Arial",
                          fontSize: "14px",
                          fontWeight: "600",
                          background: "#eaeced",
                          textAlign: "center",
                          borderBottom: "1px solid #fff",
                          color: "#3e8cb5",
                          padding: "6px 16px"
                          // width: "11%",
                        }}
                      >

                        Objective<br></br> Level

                      </th>
                      <th
                        style={{
                          fontFamily: "Arial",
                          fontSize: "14px",
                          fontWeight: "600",
                          background: "#eaeced",
                          textAlign: "center",
                          borderBottom: "1px solid #fff",
                          color: "#3e8cb5",
                          padding: "6px 16px"
                          // width: "11%",
                        }}
                      >


                        Appraiser<br></br> Rating


                      </th>
                      <th
                        style={{
                          fontFamily: "Arial",
                          fontSize: "14px",
                          fontWeight: "600",
                          background: "#eaeced",
                          textAlign: "center",
                          borderBottom: "1px solid #fff",
                          color: "#3e8cb5",
                          padding: "6px 16px"
                          // width: "11%",
                        }}
                      >


                        Appraiser<br></br> Comments


                      </th>
                      <th
                        style={{
                          fontFamily: "Arial",
                          fontSize: "14px",
                          fontWeight: "600",
                          background: "#eaeced",
                          textAlign: "center",
                          borderBottom: "1px solid #fff",
                          color: "#3e8cb5",
                          padding: "6px 16px"
                          // width: "11%",
                        }}
                      >



                        Reviewer<br></br> Rating


                      </th>
                      <th
                        style={{
                          fontFamily: "Arial",
                          fontSize: "14px",
                          fontWeight: "600",
                          background: "#eaeced",
                          textAlign: "center",
                          borderBottom: "1px solid #fff",
                          color: "#3e8cb5",
                          padding: "6px 16px"
                          // width: "11%",
                        }}
                      >


                        Reviewer<br></br> Comments


                      </th>
                      {/* <th
                    style={{
                      background: "#eaeced",
                      textAlign:"center",
                      borderBottom: "1px solid #fff",
                      // width: "7%",
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
                          // margin:"-5px"
                        }}
                      >
                       Reviewer Actions
                      </div>
                    </form>
                  </th> */}
                      <th
                        style={{
                          fontFamily: "Arial",
                          fontSize: "14px",
                          fontWeight: "600",
                          background: "#eaeced",
                          textAlign: "center",
                          borderBottom: "1px solid #fff",
                          color: "#3e8cb5",
                          padding: "6px 16px"
                          // width: "11%",
                        }}
                      >

                        Appraiser<br></br> Actions

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
                                width="250px"
                                // rowSpan={3}
                                style={{

                                  // paddingLeft: "20px",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  textAlign: "left",
                                  padding: "6px 16px",
                                  lineHeight:"20px",
                                  wordBreak:"break-word"
                                }}
                              >
                                {j.objective_type?.name?.name}

                              </td>
                              <td
                                width="200px"
                                style={{
                                  textAlign: "left",
                                  padding: "6px 16px",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  lineHeight:"20px",
                                  wordBreak:"break-word"
                                }}
                              >
                                {j?.name?.objectiveTitle}
                                <IconButton
                                  aria-describedby={id101}
                                  onClick={(e: any) => {
                                    setActiveObjectiveId(j._id);
                                    handleClickInfo11(e)
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
                                  open={(popoverIndex === index) && openInfo101}
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
                                      padding: "5px"
                                    }}
                                  >

                                    {openInfo101 &&
                                      activeObjectiveId &&
                                      j._id === activeObjectiveId &&
                                      j?.name?.description}
                                  </Typography>

                                </Popover>
                              </td>
                              <td
                                width="10px"
                                style={{
                                  padding: "6px 16px",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  textAlign: "center",
                                  lineHeight:"20px"
                                }}
                              >
                                <>
                                  {j.level_1_isChecked && (
                                    <>
                                      {" "}
                                      <span>L1  </span>{" "}
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
                                      <span>L3  </span>{" "}
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
                                </>
                                {(j.level_1_isChecked ||
                                  j.level_2_isChecked ||
                                  j.level_3_isChecked ||
                                  j.level_4_isChecked) && (
                                    <IconButton
                                      aria-describedby={id102}
                                      onClick={(e: any) => {
                                        setActiveObjectiveId(j._id);
                                        handleClickInfo12(e)
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
                                  open={(popoverIndex === index) && openInfo102}
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
                                      padding: "5px"
                                    }}
                                  >

                                    <div
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "arial",
                                        lineHeight: "20px",
                                      }}
                                    >

                                      {openInfo102 && j._id === activeObjectiveId && (
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
                                              {/* <br /> */}
                                              <ul style={{marginBottom:"0px",marginTop:"0px"}}>
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
                                               <b> {
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
                                              <b>{
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
                              </td>

                              <td
                                width="10px"
                                style={{
                                  padding: "6px 16px",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  textAlign: 'center',
                                  lineHeight:"20px"
                                }}
                              >
                                <Typography
                                  style={{
                                    fontSize: "14px",
                                    fontFamily: "Arial",

                                    // @ts-ignore

                                    color:
                                      j.rating_rejected === true && "#FF0000",
                                    // display: j.rating_rejected === true ? 'Block': 'none'
                                  }}
                                >
                                  {(j.rating_rejected == true) ?
                                  (j?.ratings && j?.ratings?.rating) :
                                  (employeeData &&
                                    employeeData?.data?.reviewer?.objective_description
                                      .filter(
                                        (i: any) => i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        if (k?.ratings)
                                          return k?.ratings?.rating;
                                      })[0])}
                                  {/* {j?.ratings && j?.ratings?.rating} */}
                                </Typography>
                              </td>
                              <td
                                width="250px"
                                style={{ textAlign: "left", padding: "6px 16px",lineHeight:"20px" }}>
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
                                    {(j?.comments === "" ||
                                      j?.comments === undefined
                                    ) ? j.remarks : j.comments}


                                  </Typography>

                                  <Popover
                                    id={"ReviewerComments1"}
                                    open={openAppraiserDetails}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
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
                                    <Typography sx={{ p: 2, backgroundColor: "#f8f8ff" }}>
                                      Comments : {ratingComments1}<br />
                                      {/* Attachments: {appraisalAttachments} */}
                                    </Typography>
                                  </Popover>
                                  <Box sx={{ flexGrow: 0, display: "block" }}>
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

                                      />}
                                    {/* {/* <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "#52C8F8",
                                  fontFamily: "Arial",
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                                
                              >
                                File Attached
                              </Typography> */}

                                    {/* <AttachFileIcon
                                style={{ color: "#93DCFA",height:"18px" }}
                                aria-describedby={"id"} */}
                                    {/* // onClick={(e)=>{handleopen() */}
                                    {/*  }}
                                onClick={(e: any) => handleClickOpen6(e,j)}
                              /> */}

                                    {/*              <AttachmentPopup open={open6}anchorEl={anchorEl6} onClose={handleClose6} >*/}
                                    {/*              /!* {opendropdown && *!/*/}
                                    {/*              */}
                                    {/*               <div style={{ position: 'relative',padding:"5px", backgroundColor: "#f8f8ff" }}>*/}
                                    {/*                /!* {j.appraisal_attachment_url.map((k: any) => <a href={k.url}> {k.name} </a>)} *!/*/}
                                    {/*              {employeeData?.data?.appraisal?.attachments.filter((i: any) => {*/}

                                    {/*                   return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id*/}
                                    {/*                 })*/}
                                    {/*                 .map((k: any) => {*/}
                                    {/*                   return <a href={k.url}> {k.name} </a>;*/}
                                    {/*                 })*/}
                                    {/*                 }*/}
                                    {/*                </div>*/}
                                    {/*/!* }  *!/*/}
                                    {/*/!*                </AttachmentPopup >*!/*/}

                                    {/*                      {j.appraisal_attachment_url.map((k:any) => {*/}
                                    {/*                        return (*/}
                                    {/*                            <>*/}
                                    {/* <AttachmentPopup open={open6}anchorEl={anchorEl6} onClose={handleClose6} name={employeeData?.data?.appraisal?.attachments} id ={j?.name?._id} >
                                              {/*{j?.appraisal_attachment_url[0]?.name}*/}
                                    {/* </AttachmentPopup>  */}
                                    {/*</>*/}
                                    {/*)*/}
                                    {/*})}*/}
                                  </Box>

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
                                                <img
                                                  style={{ cursor: 'pointer' }}
                                                  src={Removeattnew}
                                                  onClick={() => deleteAppraiserMutation({
                                                    employee_id: employee_id,
                                                    name: k.remove
                                                  })} />
                                                {/* </IconButton> */}
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
                                      })}
                                    </div>
                                  </Popover>
                                  {/* <Popover
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
                                  Attachments: {appraisalAttachments} */}
                                  {/*{employeeData?.data?.appraisal?.attachments*/}
                                  {/*  .filter((i: any) => {*/}

                                  {/*  //   // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id*/}
                                  {/*    return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id*/}
                                  {/*  })*/}
                                  {/*  .map((k: any) => {*/}
                                  {/*    return <a href={k.url}> {k.name} </a>;*/}
                                  {/*  })*/}
                                  {/*  }*/}
                                  {/* <a href={j.attachment_url}> {j.attachment_name} </a>
                                   */}
                                  {/* <div >
                                {j.appraisal_attachment_url.map((k: any) => <a href={k.url}> {k.name} </a>)}
                                </div> */}

                                  {/* </Typography>
                              </Popover> */}
                                </Stack>
                              </td>
                              <td
                                width="10px"
                                style={{
                                  padding: "6px 16px",
                                  fontFamily: "Arial",
                                  fontSize: "14px",
                                  color: "#333333",
                                  textAlign: 'center',
                                  lineHeight:"20px"
                                }}
                              >
                                <Typography
                                  style={{
                                    fontFamily: "Arial",
                                    fontSize: "14px",
                                    color: employeeData &&
                                      employeeData?.data?.reviewer?.objective_description
                                        .filter(
                                          (i: any) =>
                                            i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000",
                                  }}
                                >
                                  {employeeData &&
                                    employeeData?.data?.reviewer?.objective_description
                                      .filter(
                                        (i: any) => i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        console.log(employeeData,"employeeData")
                                        if(k?.ratings?.rating){
                                         return  k?.ratings?.rating
                                        }else{
                                          return  j?.ratings && j?.ratings?.rating
                                        }
                                                                  })[0]}
                                      {/* {// if (k.ratings) return k.ratings.rating;
                                        // return (
                                        //   <p
                                        //     style={{
                                        //       // @ts-ignore
                                        //       color: k?.rating_rejected === true && "#FF0000",

                                        //     }}
                                        //   >
                                            {/* {k?.ratings?.rating} */}
                                           {/* { k?.ratings =null ? (j?.ratings && j?.ratings?.rating) : (k?.ratings?.rating)} */}

                                          
{/* </p>
)}  */}
                                </Typography>
                              </td>
                              <td
                                width="250px"
                                style={{ textAlign: "left", padding: "6px 16px", lineHeight:"20px"}}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                  alignItems="center"
                                  spacing={2}
                                >


                                  <Typography
                                    style={{
                                      fontFamily: "Arial",
                                      fontSize: "14px",
                                      color: "#333333",
                                      wordBreak: "break-word",

                                    }}
                                  >
                                    {/*Exceeding*/}
                                    {employeeData &&
                                      employeeData?.data?.reviewer?.objective_description
                                        .filter(
                                          (i: any) => i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => {
                                          if (k?.ratings) return k?.comments;
                                        })[0]}
                                  </Typography>


                                  {/* <Typography
                                style={{
                                  fontSize: "14px",
                                  fontFamily:"Arial",
                                  textDecoration: "underline",
                                  color: "#93DCFA",
                                  
                                }}
                                aria-describedby={"ReviewerComments"}
                                onClick={(e: any) => { handleClickReviewerDetails(e, j) }}

                              >
                                Details
                              </Typography> */}

                                  <Popover
                                    id={"ReviewerComments"}
                                    open={openReviewerDetails}
                                    anchorEl={anchorElReviewer}
                                    onClose={handleCloseReviewer}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'center',
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
                                    <Typography sx={{ p: 2, backgroundColor: "#f8f8ff" }}>
                                      Comments : {ratingComments}<br />
                                      {/* Attachments: {reviewerAttachments} */}
                                    </Typography>
                                  </Popover>

                                  {/* Old popover starts */}
                                  {/* <AttachFileIcon
                                style={{ color: "#93DCFA",height:"18px" }}
                                aria-describedby={"id"}
                                onClick={(e: any) => handleClickOpen7(e,j)}
                              /> */}

                                  {/* <Popover
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
                              > */}
                                  {/* Comments : {ratingComments}<br/> */}
                                  {/* Attachments: {reviewerAttachments} */}
                                  {/* {employeeData?.data?.reviewer?.attachments
                                    .filter((i: any) => {
                                      console.log(employeeData.data.reviewer.objective_description[index].name, 'attachmetnsissues')

                                      // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                      return i.objective_description === employeeData.data.reviewer.objective_description[index].name._id
                                      // return "631f20f5eda452d8bfaf8844" === i.objective_description
                                    })
                                    .map((k: any) => {
                                      return <a href={k.url}> {k.name} </a>;
                                    })} */}
                                  {/* <a href={j.reviewer_attachment_url}> {j.reviewer_attachment_name} </a> */}

                                  {/* {j.reviewer_attachment_url.map((k: any) => <a href={k.url}> {k.name} </a>)} */}

                                  {/* </Typography>
                              </Popover> */}
                                  <Box>
                                    {employeeData && getAttachmentsReviewer(j?.name?._id)?.length > 0 &&
                                      <AttachFileIcon
                                        style={{
                                          color: "#93DCFA",
                                          height: "18px",
                                          transform: "rotate(30deg)",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e: any) => {
                                          handleClick9(e, j)
                                          setPopoverIndexReviewer(index)
                                        }
                                        }
                                      />}
                                    {/* {/* <Typography
                                style={{
                                  fontSize: "12px",
                                  color: "#52C8F8",
                                  fontFamily: "Arial",
                                  cursor: "pointer",
                                  textDecoration: "underline",
                                }}
                               
                              >
                                File Attached
                              </Typography> */}
                                  </Box>
                                  <Popover
                                    id={id9}
                                    open={(popoverIndexReviewer === index) && open9}
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
                                      {employeeData && getAttachmentsReviewer(j?.name?._id)?.map((k: any, index1: any) => {
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
                                                {/* <img src={Removeattnew}
                                                  onClick={() => deleteReviewerMutation({
                                                    employee_id: employee_id,
                                                    name: k.remove
                                                  })} /> */}
                                                {/* </IconButton> */}
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
                                      })}
                                      {/* <Stack
                                    spacing={1}
                                    direction="row"
                                    alignItems="center"
                                  > */}
                                      {/* <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Arial",
                                        color: "#333333",
                                        
                                        // maxWidth:"215px",
                                        // wordBreak:"break-all"
                                      }}
                                    >
                                      1
                                    </Typography> */}
                                      {/* <Typography
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
                                     Attachments: {reviewerAttachments} 
                                    </Typography> */}
                                      {/* <Stack direction="row">
                                      <IconButton>
                                        <img src={Downloadatt} />
                                      </IconButton>
                                      <IconButton>
                                        <img src={Removeatt} />
                                      </IconButton>
                                    </Stack> */}

                                      {/* </Stack> */}
                                    </div>
                                  </Popover>
                                </Stack>
                              </td>
                              {/* <td width="10px" style={{ textAlign: "center" }}>
                            {employeeData && !employeeData?.data?.reviewer?.reviewer_status?.includes("rejected") &&
                              employeeData?.data?.reviewer?.reviewer_status
                            }

                            {employeeData && employeeData?.data?.reviewer?.reviewer_status?.includes("rejected") &&
                              <>
                                <p style={{ color: "#ff5151",fontFamily:"Arial" }}>
                                  Rejected  {employeeData?.data?.reviewer?.rejection_count == 1 ? "(1st time)" : employeeData.data.reviewer.rejection_count == 2 ? "(2nd time)" : employeeData.data.reviewer.rejection_count == 3 ? "(3 rd time)" : ""}
                                </p>
                               
                              </>
                            } */}

                              {/* <p style={{ color: "#ff5151" }}>
                              Rejected (1 Time)
                            </p> */}
                              {/* <span> */}
                              {/* {employeeData.data.reviewer} */}
                              {/* </span>
                          </td> */}
                              <td width="20px" style={{ textAlign: "center" }} >
                                {/* <p style={{fontFamily:"Arial"}}>{employeeData?.data?.appraisal?.rejection_count == 2 ? "Third Time" : employeeData.data.appraisal.rejection_count == 1 ? "Second Time" : "First Time"} Rejection</p> */}

                                {employeeData &&
                                  employeeData?.data?.reviewer?.objective_description
                                    .filter(
                                      (i: any) =>
                                        i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => k?.rating_rejected == true)[0] && (
                                    <span>
                                       <Stack direction="row" justifyContent="center"
                                      >
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
                                              style={{ width: "16px", height: "16px" }}
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
                                              style={{ width: "16px", height: "16px" }}
                                            />
                                          </IconButton>
                                        </Tooltip>
                                       }
                                      </Stack>
                                    </span>

                                  )}

                                {/* <>

                                                        {
                                                            ((employeeData && employeeData.data.reviewer.objective_description.filter(
                                                                (i: any) => i.name._id === j.name._id
                                                            ).map((k: any) => {if(k?.ratings) return k?.ratings._id})[0]) !== (employeeData && employeeData?.data.appraisal?.objective_description
                                                                .filter(
                                                                    (i: any) => i.name._id === j.name._id
                                                                ).map((k: any) => k?.ratings._id)[0])) && (
                                                                <>
                                                                    <Button onClick={() => acceptHandler(j, (employeeData && employeeData.data.reviewer?.objective_description.filter(
                                                                        (i: any) => i?.name._id === j?.name._id
                                                                    ).map((k: any) => k?.ratings._id)[0]))}>Accept  </Button>
                                                                    <Button
                                                                        onClick={() => openDrawerHandler(j)}>Reject </Button>
                                                                </>
                                                            )
                                                        }


                                                    </> */}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                  </tbody>
                </table>
                {/* <Footer>
            <Footerbuttons navPrompt={navPrompt} setnavPrompt={setnavPrompt} />
          </Footer> */}
              </Root>}
            {value === 0 && <Footer>
              <Footerbuttons navPrompt={navPrompt} setnavPrompt={setnavPrompt}
                setValue={setValue} />
            </Footer>}
          </Box>
        </Container>

      </div>
    </React.Fragment>
  );
}
function setRatingComments(arg0: any) {
  throw new Error("Function not implemented.");
}
