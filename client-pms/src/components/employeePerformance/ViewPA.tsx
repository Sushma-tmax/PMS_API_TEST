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
  styled,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Removeattnew from "../../assets/Images/icons/Removeattnew.svg";
import Uploadatt from "../../assets/Images/Uploadatt.svg";
import {
  useGetObjectiveDescriptionQuery,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useUpdateEmployeeAppraisalMutation,
  useAcceptAppraisalEmployeeMutation,
  useGetEmployeeAppraisalQuery,
  useGetRatingScaleQuery,
  useAttachmentsEmployeeDeleteMutation,
  useAttachmentsAppraiserDeleteMutation,
  useAttachmentsNormalizerDeleteMutation,
  useAttachmentsReviewerDeleteMutation
} from "../../service";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import html2canvas from "html2canvas";
import dayjs from "dayjs";
import { jsPDF } from "jspdf";
import { EMPLOYEE_REJECTS } from "../../constants/routes/Routing";
import IconButton from "@mui/material/IconButton";
import Infoicon from "./icons/Infoicon.svg";
import Popover from "@mui/material/Popover";
import { Scrollbar } from "react-scrollbars-custom";
import Downloadss from "../../assets/Images/Downloadss.svg";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useReviewerContext } from "../../context/reviewerContextContext";
const Tf1 = styled("div")({
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    padding: "8px",
    textAlign: "left"
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
  marginLeft: "-3px",
});

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },

});
const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "2px",
});
export default function ViewPA() {
  const { employee_id } = useParams();
  //@ts-ignore
  // const {overallFeed, setOverallFeed } = useReviewerContext();
  // console.log(overallFeed,"overallFeed")
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
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [deleteEmployeeMutation, { isLoading: delete1, data: deleted }] =
    useAttachmentsEmployeeDeleteMutation();
  const [deleteNormalizerMutation, { isLoading: delete2, data: deleted2 }] =
    useAttachmentsReviewerDeleteMutation();
  const [deleteReviewerMutation, { isLoading: delete3, data: deleted3 }] =
    useAttachmentsReviewerDeleteMutation();
  const [reviewerRating, setReviewerRating] = React.useState<any>([]);
  const [normalizerRating, setNormalizerRating] = React.useState<any>([]);

  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  // console.log(objectiveDescData, "objectiveDescData");
  // console.log(objectiveTitleData, "objectiveTitleData");
  // console.log(filterData, "filterData");
  const [showRating, setShowRating] = useState("false");
  const [show, setShow] = useState("false");
  const [updateEmployee] = useUpdateEmployeeAppraisalMutation();
  const [appraiserAreaofImprovement, setAppraiserAreaofImprovement] =
    useState<any>([]);
  const [employeeAreaofImprovement, setEmployeeAreaofImprovment] =
    useState<any>([]);
  const [
    appraiserTrainingRecommendations,
    setAppraiserTrainingRecommendations,
  ] = useState<any>([]);
  const [employeeTrainingRecommendations, setEmployeeTrainingRecommendations] =
    useState<any>([]);
  const [employeeRating, setEmployeeRating] = useState<any>(false);
  const [popoverIndex, setPopoverIndex] = useState<any>("")
  const [popoverIndexs, setPopoverIndexs] = useState<any>("")

  const [popoverIndex1, setPopoverIndex1] = useState<any>("")
  const [popoverIndex2, setPopoverIndex2] = useState<any>("")
  const [popoverIndex3, setPopoverIndex3] = useState<any>("")
  const [showAreaofImprovement, setShowAreaofImprovement] =
    useState<any>(false);
  const [showTrainingRecommendations, setShowTrainingRecommendations] =
    useState<any>(false);

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
        employeeData?.data?.appraisal?.area_of_improvement
      );
      setEmployeeAreaofImprovment(
        employeeData?.data?.employee?.area_of_improvement
      );
      setAppraiserTrainingRecommendations(
        employeeData?.data?.appraisal?.training_recommendation
      );
      setEmployeeComments(employeeData?.data?.employee?.comments);
      setEmployeeTrainingRecommendations(
        employeeData?.data?.employee?.training_recommendation
      );
      setEmployeeRatingComments(
        employeeData?.data?.employee?.objective_description?.comments
      );
      setEmployeeRatingScale(
        employeeData?.data?.employee?.objective_description?.ratings
      );
      setOverallFeed(
        employeeData?.data?.appraisal?.feedback_questions

      )
    }
  }, [employeeData, objectiveTitleData]);
  // console.log(overallFeed,"overallFeed")
  //console.log(employeeData, "datatest");



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
      const employeeAreaofImprovement =
        employeeData.data.employee.area_of_improvement;
      const group = _.groupBy(employeeAreaofImprovement, "value");
      const groupName = groupNAmeHandler(Object.entries(group));
    }
  }, [employeeAreaofImprovement]);
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
  const [otherRecommendation, setOtherRecommendation] = React.useState<any>([]);

  //console.log(Training1, "Trainingstate1");
  useEffect(() => {
    if (employeeData) {
      setTraining1(() => {
        return employeeData?.data?.employee?.training_recommendation?.map(
          (i: any) => {
            //console.log(i, "Training1");
            return {
              ...i,
              justification: i?.justification,
              trainingName: i?.training_name,
              // objective_title: findObjectiveTitleById(i.name.objective_title),
              // objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);
  useEffect(() => {
    if (employeeData) {
      setOtherRecommendation(() => {
        return employeeData?.data?.appraisal?.other_recommendation?.map(
          (i: any) => {
            //console.log(i, "Training1");
            return {
              ...i,
              name: i?.name,
              // trainingName: i?.training_name,
              // objective_title: findObjectiveTitleById(i.name.objective_title),
              // objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);

  const employeeAreaCommentsChangeHandler = (i: any, e: any) => {
    let temp = appraiserAreaofImprovement;
    temp = temp.map((item: any) => {
      return i[0]._id == item._id
        ? { ...item, employee_comments: e.target.value }
        : item;
    });
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
  //console.log(Training, "Trainingstate");
  useEffect(() => {
    if (employeeData) {
      setTraining(() => {
        return employeeData?.data?.appraisal?.training_recommendation?.map(
          (i: any) => {
            // console.log(i, "Training");
            return {
              ...i,
              justification: i?.justification,
              trainingName: i?.training_name,
              // objective_title: findObjectiveTitleById(i.name.objective_title),
              // objective_type: findObjectiveTypeById(i.name.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData]);

  const getObjectiveTypeName = (id: any) => {
    //console.log(id, " type");
    if (data) {
      return data.data.find((item: any) => {
        return id === item._id;
      });
    }
  };
  const findObjectiveTitleById = (id: any) => {
    if (objectiveTitleData) {
      //console.log(id, "objectiveTitleData");
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
        return employeeData?.data?.appraisal?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              comments: i?.comments,
              rating: i?.ratings,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData, objectiveTitleData]);
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setReviewerRating(() => {
        return employeeData?.data?.reviewer?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              comments: i?.comments,
              rating: i?.ratings,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData, objectiveTitleData]);
  useEffect(() => {
    if (employeeData && objectiveTitleData) {
      setNormalizerRating(() => {
        return employeeData?.data?.normalizer?.objective_description?.map(
          (i: any) => {
            return {
              ...i,
              comments: i?.comments,
              rating: i?.ratings,
              objective_title: findObjectiveTitleById(i?.name?.objective_title),
              objective_type: findObjectiveTypeById(i?.name?.objective_type),
            };
          }
        );
      });
    }
  }, [employeeData, objectiveTitleData]);

  const [filterData1, setFilterData1] = useState([]);
  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo6 = Boolean(anchorEl9);

  const id6 = openInfo6 ? "simple-popover" : undefined;
  const handleClickInfo6 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl9(event.currentTarget);
  };
  const handleCloseInfo6 = () => {
    setAnchorEl9(null);
  };
  //console.group(filterData1, "filterData1");
  const groupNAmeHandler = (name: any) => {
    if (name) {
      setFilterData1(name);
    }
  };

  const [filterData2, setFilterData2] = useState([]);
  //console.group(filterData2, "filterData2");
  const groupNAmeHandler2 = (name: any) => {
    if (name) {
      setFilterData2(name);
    }
  };
  useEffect(() => {
    if (employeeData && employeeData.data) {
      const employeeAreaOfImprovement =
        employeeData.data.employee.area_of_improvement;
      const group = _.groupBy(employeeAreaOfImprovement, "value");
      const groupName = groupNAmeHandler2(Object.entries(group));
    }
  }, [employeeAreaofImprovement]);

  const [filterData3, setFilterData3] = useState([]);
  //console.group(filterData3, "filterData3");
  const groupNAmeHandler3 = (name: any) => {
    if (name) {
      setFilterData3(name);
    }
  };
  useEffect(() => {
    if (employeeData && employeeData.data) {
      const employeeTrainingRecommendations =
        employeeData.data.employee.training_recommendation;
      const group = _.groupBy(employeeTrainingRecommendations, "value");
      const groupName = groupNAmeHandler3(Object.entries(group));
    }
  }, [appraiserAreaofImprovement]);

  const getRatingDescription = (rating: any) => {
    let ratingValue = Math.round(rating);
    let ratingDataValue = ratingData?.data?.find(
      (item: any) => item?.rating == ratingValue
    );
    if (ratingDataValue) return ratingDataValue.rating_scale;
    else return "";
  };

  const groupNameHandler = (name: any) => {
    if (name) {
      setFilterData(name);
    }
  };

  useEffect(() => {
    const group = _.groupBy(objectiveDescription, "objective_type.name");
    // console.log(Object.entries(group), 'group')
    const groupName = groupNameHandler(Object.entries(group));
  }, [objectiveDescription]);
  useEffect(() => {
    const group = _.groupBy(reviewerRating, "objective_type.name");
    // console.log(Object.entries(group), 'group')
    const groupName = groupNameHandler(Object.entries(group));
  }, [reviewerRating]);
  useEffect(() => {
    const group = _.groupBy(normalizerRating, "objective_type.name");
    // console.log(Object.entries(group), 'group')
    const groupName = groupNameHandler(Object.entries(group));
  }, [normalizerRating]);

  // console.log(employeeData?.data?.appraisal?.area_of_improvement?.specific_actions?.value, 'spec')
  const [specificAction, setspecificAction] = useState(false);
  useEffect(() => {
    if (employeeData?.data?.appraisal?.area_of_improvement[0]) {
      const specific =
        employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions.map((item: any) => {
          console.log(item, "iiiiii");
          // setspecificAction(item);
          return item.value;

        }
        );
      console.log(specific.length, "spec");
      // setspecificAction(specific);
      if (specific == "" || specific == undefined || specific == null) {
        setspecificAction(false);
      } else {
        setspecificAction(true);
      }
    }

  }, [employeeData]);
  const [specificAction1, setspecificAction1] = useState<any>(false);
  const [specificAction2, setspecificAction2] = React.useState(false);
  const [specificAction3, setspecificAction3] = React.useState(false);
  const [overallFeed, setOverallFeed] = useState<any>([])
  useEffect(() => {
    setOverallFeed(
      employeeData?.data?.appraisal?.feedback_questions
    )

  }, [employeeData])

  const [overallFeedback, setOverallFeedback] = useState<any>([]);
  const pre = (arr: any) => {
    return arr?.map((i: any) => {
      return {
        name: i?.name?._id,
        value: i?.value,
      };
    });
  };
  // useEffect(()=>{
  //   setOverallFeed(pre);
  // },[employeeData])
  console.log(overallFeed, "overallFeed")
  useEffect(() => {
    setOverallFeed(pre(overallFeedback));
  }, [overallFeedback]);
  // useEffect(()=>{
  //   setOverallFeedback(employeeData)
  // })
  console.log(overallFeedback, "overallFeedback")
  // useEffect(() => {
  //   if(employeeData?.data?.employee) {
  //   const specific1 =
  //   // employeeData?.data?.employee?.area_of_improvement[0]?.specific_actions.map((item: any) => {
  //   //       console.log(item, "iiiiii");

  //   //       return item.value;

  //   //     }
  //   //   );
  //     console.log(specific1, "spec1");

  //     if (specific1 == ''){
  //       setspecificAction1(false);
  //     }else{
  //       setspecificAction1(true);
  //     }
  // }

  // }, [employeeData]);
  useEffect(() => {
    if (employeeData?.data?.employee?.area_of_improvement) {

      if (employeeData?.data?.employee?.area_of_improvement == '' || employeeData?.data?.employee?.area_of_improvement == undefined) {
        setspecificAction1(false);
      } else {
        setspecificAction1(true);
      }
      console.log(employeeData?.data?.employee?.area_of_improvement, "areaofimprovement")
    }
  }, [employeeData])
  useEffect(() => {

    if (employeeData?.data?.employee?.training_recommendation) {

      if (employeeData?.data?.employee?.training_recommendation == '' || employeeData?.data?.employee?.training_recommendation == undefined) {
        setspecificAction2(false);
      } else {
        setspecificAction2(true);
      }

    }

  }, [employeeData])
  console.log(employeeData?.data?.employee?.training_recommendation, "trainingrecommendation")
  // console.log(employeeData?.data?.employee?.area_of_improvement[0],"areaofimprovement")

  // useEffect(() => {
  //   if( employeeData?.data?.appraisal?.training_recommendation[0]) {
  //   const specific2 = employeeData?.data?.appraisal?.training_recommendation[0]

  //     console.log(specific2, "spec2");
  //     if(specific2.training_name == "" || specific2.justification == "" || specific2.training_name == undefined || specific2.justification == undefined){
  //       setspecificAction2(false)
  //     }else{
  //       setspecificAction2(true)
  //     }
  // }

  // }, [employeeData]);
  // useEffect(() => {
  //   if( employeeData?.data?.employee?.training_recommendation[0]) {
  //   const specific3 = employeeData?.data?.employee?.training_recommendation[0]

  //     console.log(specific3, "spec3");
  //     if(specific3.training_name == "" || specific3.justification == "" || specific3.training_name == undefined || specific3.justification == undefined){
  //       setspecificAction3(false)
  //     }else{
  //       setspecificAction3(true)
  //     }
  // }

  // }, [employeeData]);




  //mapping functionalities

  const [value, setValue] = React.useState(0);
  const [employeeComments, setEmployeeComments] = useState("");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
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
    updateEmployee({
      "employee.objective_description":
        employeeData.data.normalizer.objective_description,
      "appraisal.status": "rejected",
      id: employee_id,
    });
    // setnavPrompt(false)
    navigate(`${EMPLOYEE_REJECTS}/employee/${employee_id}`);
  };

  const handleRejectRadioChange = (event: any) => {
    // setAccept(event.target.value as string);
    // navigate(`${EMPLOYEE_REJECTS}/employee/${employee_id}`);
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

  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");

    const data = await html2canvas(
      document.getElementById("pdf") as HTMLElement
    );

    const img = data.toDataURL("image/png");

    const imgProperties = pdf.getImageProperties(img);

    const pdfWidth = pdf.internal.pageSize.getWidth();

    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

    var imgWidth = 600;
    var pageHeight = 840;
    var imgHeight = data.height * imgWidth / data.width;
    var heightLeft = imgHeight;
    var position = 0;
    pdf.addImage(img, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      // position = heightLeft - pdfHeight;
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(img, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Employee_Appraisal.pdf");
  };

  const [anchorEls, setAnchorEls] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo = Boolean(anchorEls);

  const id02 = openInfo ? "simple-popover" : undefined;
  const handleClickInfo = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEls(event.currentTarget);
  };

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
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open2 = Boolean(anchorEl);
  const id2 = open2 ? "simple-popover" : undefined;

  const { data: ratingScaleData } = useGetRatingScaleQuery("");
  //console.log(ratingScaleData, "ratingScaleData");
  const [filterData4, setFilterData4] = useState([]);
  //console.group(filterData4, "filterData4");

  const groupNAmeHandler4 = (name: any) => {
    if (name) {
      setFilterData4(name);
    }
  };
  const [employeeRatingScale, setEmployeeRatingScale] = useState<any>(false);
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
  useEffect(() => {
    if (employeeData && employeeData.data) {
      const employeeRatingScale =
        employeeData?.data?.employee?.objective_description?.rating;
      const group = _.groupBy(employeeRatingScale, "value");
      const groupName = groupNAmeHandler4(Object?.entries(group));
    }
  }, [employeeRatingScale]);
  const [filterData5, setFilterData5] = useState([]);
  //console.group(filterData5, "filterData5");

  const groupNAmeHandler5 = (name: any) => {
    if (name) {
      setFilterData5(name);
    }
  };
  const [employeeRatingComments, setEmployeeRatingComments] =
    useState<any>(false);

  useEffect(() => {
    if (employeeData && employeeData.data) {
      const employeeRatingComments = employeeData.data.employee.comments;
      const group = _.groupBy(employeeRatingComments, "value");
      const groupName = groupNAmeHandler5(Object.entries(group));
    }
  }, [employeeRatingComments]);

  const [status, setStatus] = useState([]);
  useEffect(() => {
    if (employeeData && status) {
      // after mediation or after renormalization
      if (employeeData?.data?.appraisal?.status == "completed" &&
        employeeData?.data?.normalizer?.normalizer_status == "re-normalized") {
        setStatus(employeeData?.data?.normalizer?.normalizer_rating);
      }
      // after appraiser rejected or accepted employee
      else if ((employeeData?.data?.appraisal?.appraiser_status == "appraiser-rejected-employee") ||
        (employeeData?.data?.appraisal?.appraiser_status == "appraiser-accepted-employee")) {
        setStatus(employeeData?.data?.employee?.appraiser_rating);
      }
      // after employee rejects 
      else if (employeeData?.data?.appraisal?.status == "rejected") {
        setStatus(employeeData?.data?.employee?.employee_rating);
      }
      // after employee acknowledgement
      else if (employeeData?.data?.appraisal?.status == "completed") {
        setStatus(employeeData?.data?.employee?.employee_rating);
      }
      // after normalizer rejects
      else if (employeeData?.data?.normalizer?.normalizer_status == "rejected") {
        setStatus(employeeData?.data?.normalizer?.normalizer_rating);
      }
      // if (employeeData?.data?.appraisal?.appraiser_status == "completed")
      //   setStatus(employeeData?.data?.normalizer?.normalizer_rating);
      // else if (
      //   employeeData?.data?.appraisal?.appraiser_status == "employee-rejected"
      // )
      //   setStatus(employeeData?.data?.appraisal.appraiser_rating);
      // else if (employeeData?.data?.normalizer?.normalizer_status == "accepted")
      //   setStatus(employeeData?.data?.normalizer?.normalizer_rating);
      // else if (
      //   employeeData?.data?.normalizer?.normalizer_status == "rejected"
      // ) {
      //   if (employeeData?.data?.reviewer?.reviewer_status == "rejected")
      //     setStatus(employeeData?.data?.reviewer?.reviewer_rating);
      //   else setStatus(employeeData?.data?.appraisal.appraiser_rating);
      // } else if (employeeData?.data?.reviewer?.reviewer_status == "accepted")
      //   setStatus(employeeData?.data?.reviewer?.reviewer_rating);
      // else setStatus(employeeData?.data?.appraisal.appraiser_rating);
      // console.log(status, "map");
    }
  }, [status, employeeData]);
  const [appraiser, setAppraiser] = useState<any>(true);
  const [reviewer, setReviewer] = useState<any>(true);
  const [normalizer, setNormlaizer] = useState<any>(true);
  const [employee, setEmployee] = useState<any>(true);

  useEffect(() => {
    if (employeeData && status) {
      if (employeeData?.data?.appraisal?.appraiser_status == "completed") {
        // setNormlaizer(true);
        // setAppraiser(false);
        // setReviewer(false);
        // setEmployee(false);
      } else if (
        employeeData?.data?.appraisal?.appraiser_status == "employee-rejected"
      ) {
        // setAppraiser(true);
        // setNormlaizer(false);
        // setReviewer(false);
        // setEmployee(false);
      } else if (
        employeeData?.data?.normalizer?.normalizer_status == "accepted"
      ) {
        // setAppraiser(false);
        // setNormlaizer(true);
        // setReviewer(false);
        // setEmployee(false);
      } else if (
        employeeData?.data?.normalizer?.normalizer_status == "rejected"
      ) {
        if (employeeData?.data?.reviewer?.reviewer_status == "rejected") {
          // setAppraiser(true);
          // setNormlaizer(false);
          // setReviewer(true);
          // setEmployee(false);
        } else {
          // setAppraiser(true);
          // setNormlaizer(false);
          // setReviewer(false);
          // setEmployee(false);
        }
      } else if (employeeData?.data?.reviewer?.reviewer_status == "accepted") {
        // setAppraiser(false);
        // setNormlaizer(false);
        // setReviewer(true);
        // setEmployee(false);
      } else {
        // setAppraiser(true);
        // setNormlaizer(false);
        // setReviewer(false);
        // setEmployee(false);
      }
    } else if (employeeData?.data?.appraisal?.appraiser_status == "rejected") {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.data?.appraisal?.appraiser_status == "reviewer-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.data?.appraisal?.appraiser_status == "normalizer-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.data?.appraisal?.appraiser_status == "after-mediation"
    ) {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(false);
      // setEmployee(false);
    } else if (
      employeeData?.data?.appraisal?.appraiser_status == "employee-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.data?.appraisal?.appraiser_status == "employee-accepted"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.data?.reviewer?.reviewer_status == "appraiser-accepted"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(false);
    } else if (
      employeeData?.data?.reviewer?.reviewer_status == "appraiser-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(true);
      // setEmployee(false);
    } else if (employeeData?.data?.reviewer?.reviewer_status == "normalized") {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.data?.normalizer?.normalizer_status == "reviewer-accepted"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.data?.normalizer?.normalizer_status == "appraiser-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(true);
      // setEmployee(false);
    } else if (
      employeeData?.data?.normalizer?.normalizer_status == "re-normalized"
    ) {
      // setAppraiser(true);
      // setNormlaizer(true);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.data?.normalizer?.normalizer_status == "employee-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.data?.normalizer?.normalizer_status ==
      "employee-acknowledged"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.data?.reviewer?.reviewer_status == "employee-rejected"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    } else if (
      employeeData?.data?.reviewer?.reviewer_status == "employee-accepeted"
    ) {
      // setAppraiser(true);
      // setNormlaizer(false);
      // setReviewer(false);
      // setEmployee(true);
    }
  }, [employeeData]);
  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );

  // Attachments
  const [appraisalAttachments, setappraisalAttachments] = useState<any>("");
  const [reviewerAttachments, setReviewerAttachments] = useState<any>("");
  const [normalizerAttachments, setNormalizerAttachments] = useState<any>("");
  const [employeeAttachments, setEmployeeAttachments] = useState<any>("");

  const [openReviewerAttachment, setOpenReviewerAttachment] = useState<any>(false)
  const [openNormalizerAttachment, setOpenNormalizerAttachment] = useState<any>(false)
  const [openEmployeeAttachment, setOpenEmployeeAttachment] = useState<any>(false)


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
    // setOpen2(true);
    setAnchorEl6(event.currentTarget);
  };

  const handleClose6 = () => {
    setAnchorEl6(null);
    // setOpen2(false);
  };
  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );

  //  open and close reviewer attachments
  const handleOpenReviewerAttachment = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setReviewerAttachments(
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
    // setOpen2(true);
    setAnchorEl8(event.currentTarget);
    setOpenReviewerAttachment(!openReviewerAttachment)
  };

  const handleCloseReviewerAttachment = () => {
    setAnchorEl8(null);
    setOpenReviewerAttachment(false)
  };

  //  open and close Normalizer attachments
  const handleOpenNormalizerAttachment = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setNormalizerAttachments(
      employeeData &&
      employeeData?.data?.normalizer?.attachments
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
    // setOpen2(true);
    // setAnchorEl6(event.currentTarget);
    setOpenNormalizerAttachment(!openNormalizerAttachment)
  };

  const handleCloseNormalizerAttachment = () => {
    // setAnchorEl6(null);
    // setOpen2(false);
    setOpenNormalizerAttachment(false)
  };

  //  open and close Employee attachments
  const handleOpenEmployeeAttachment = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setEmployeeAttachments(
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
    // setOpen2(true);
    // setAnchorEl6(event.currentTarget);
    setOpenEmployeeAttachment(!openEmployeeAttachment)
  };


  const handleCloseEmployeeAttachment = () => {
    setOpenEmployeeAttachment(false)
    // setAnchorEl6(null);
    // setOpen2(false);
  };
  const [employeeAttachments1, setemployeeAttachments1] = useState<any>("");

  const [anchorEl7, setAnchorEl7] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open7 = Boolean(anchorEl7);
  const handleClickOpen7 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    // setOpen2true);
    setemployeeAttachments1(
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
  const [show1, setShow1] = useState<any>("");
  const [show4, setShow4] = useState<any>("");
  const New4 =
    employeeData &&
    objectiveTitleData &&
    objectiveDescription?.map((j: any) => {
      // console.log(New,"New")
      return (
        employeeData &&
        employeeData?.data?.employee?.objective_description
          ?.filter((i: any) => i?.name?._id === j?.name?._id)
          ?.map((k: any) => {
            if (k?.ratings) return k?.ratings?.rating;
          })[0]
      );
    }).length;
  // console?.log(New4, "New4");

  useEffect(() => {
    // if (New4 == 0 ) {
    if (employeeData?.data?.appraisal?.status == "rejected" || (employeeData?.data?.appraisal?.status == "completed")) {
      setShow4(true);
    } else {
      setShow4(false);
    }
  }, [New4]);

  const New =
    employeeData &&
    objectiveTitleData &&
    objectiveDescription?.map((j: any) => {
      // console.log(New,"New")
      return (
        employeeData &&
        employeeData?.data?.appraisal?.objective_description
          ?.filter((i: any) => i?.name?._id === j?.name?._id)
          ?.map((k: any) => {
            if (k?.ratings) return k?.ratings?.rating;
          })[0]
      );
    }).length;
  console.log(New, "New");

  useEffect(() => {
    if (New == 0) {
      setShow1(false);
    } else {
      setShow1(true);
    }
  }, [New]);
  console.log(show, 'disappear')
  const [show2, setShow2] = useState<any>("");
  const New2 =
    employeeData &&
    objectiveTitleData &&
    objectiveDescription?.map((j: any) => {
      // console.log(New,"New")
      return (
        employeeData &&
        employeeData?.data?.reviewer?.objective_description
          ?.filter((i: any) => i.name._id === j.name._id)
          ?.map((k: any) => {
            if (k?.ratings) return k?.ratings?.rating;
          })[0]
      );
    }).length;
  useEffect(() => {
    if (New2 == 0) {
      setShow2(false);
    } else {
      setShow2(true);
    }
  }, [New2]);

  console.log(show2, reviewer, 'newwwwwwwwww')
  const [appraisal, setAppraisal] = useState<any>("");
  const [reviewers, setReviewers] = useState<any>("");
  const [employees, setEmployees] = useState<any>("");


  useEffect(() => {
    if (employeeData?.data?.appraisal.appraisal_status == "not-started") {
      navigate(`/APPRAISAL_NOT_STARTED`);
    }
    else if (employeeData?.data?.employee.employee_status == "accepted" || employeeData?.data?.employee.employee_status == "rejected") {
      setAppraisal(true)
      setReviewers(true)
      setEmployees(true)
    } else if (employeeData?.data?.reviewer.reviewer_status == "rejected") {
      setAppraisal(true)
      setReviewers(true)
      setEmployees(false)
    } else {
      setAppraisal(true)
      setReviewers(false)
      setEmployees(false)
    }
  }, [employeeData])


  const [show3, setShow3] = useState<any>("");
  const [trainingRecom, setTrainingRecom] = useState<any>(false);
  const [trainingRecom1, setTrainingRecom1] = useState<any>("");

  const [area, setArea] = useState<any>("");
  const [area1, setArea1] = useState<any>("");

  const New3 =
    employeeData &&
    objectiveTitleData &&
    objectiveDescription?.map((j: any) => {
      // console.log(New,"New")
      return (
        employeeData &&
        employeeData?.data?.normalizer?.objective_description
          .filter((i: any) => i?.name?._id === j?.name?._id)
          .map((k: any) => {
            if (k?.ratings) return k?.ratings?.rating;
          })[0]
      );
    }).length;
  useEffect(() => {
    if (New3 == 0) {
      setShow3(false);
    } else {
      setShow3(true);
    }
  }, [New3]);
  // console.log(employeeData?.data?.appraisal?.appraiser_rating,"appraisal")
  // console.log(employeeData?.data?.reviewer?.reviewer_rating,"appraisal1")
  // console.log(employeeData?.data?.normalizer?.normalizer_rating,"appraisal2")
  // console.log(employeeData?.data?.employee?.employee_rating,"appraisal3")
  const [data1, setData1] = useState<any>("");
  const [data2, setData2] = useState<any>("");
  const [data3, setData3] = useState<any>("");
  const [data4, setData4] = useState<any>("");



  useEffect(() => {
    if (New !== 0) {
      setData1(true)
    } else if (New2 !== 0) {
      setData2(true)
    } else if (New3 !== 0) {
      setData3(true)
    } else if (New4 !== 0) {
      setData4(true)
    }
  }, [New, New2, New3, New4])
  const getAttachments = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.data?.appraisal?.attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        //console.log(k, "zzzzz");
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
    // console.log(id, "id for attachmetns ");

    return employeeData?.data?.employee?.attachments
      ?.filter((i: any) => i?.objective_description == id)
      ?.map((k: any) => {
        //console.log(k, "zzzzz");
        return {
          resp: (
            <div>
              {" "}
              <a href={k?.url}> {k?.name} </a> <br />
            </div>
          ),
          remove: k?.name,
        };
        // return k.name
      });
  };
  const getAttachments2 = (id: any) => {
    // console.log(id, "id for attachmetns ");

    return employeeData?.data?.reviewer?.attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        //console.log(k, "zzzzz");
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
  const getAttachments3 = (id: any) => {
    // console.log(id, "id for attachmetns ");
    // console.log(employeeData,"employeedata")

    return employeeData?.data?.normalizer?.attachments
      .filter((i: any) => i?.objective_description == id)
      .map((k: any) => {
        //console.log(k, "zzzzz");
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
  useEffect(() => {

    const Name = employeeData &&
      objectiveTitleData &&
      Training.map((j: any) => {
        //console.log(j,"trainingname")
        if (j == undefined || j == null) {
          setTrainingRecom(false)
        }
        // return(
        //   <>
        //   {j.training_name}

        //   </>
        // )
      })
    //console.log(Name,"nameee")
  }, [employeeData])


  useEffect(() => {
    const Newdata = employeeData &&
      objectiveTitleData &&
      Training1?.map((j: any) => {
        if (j == undefined || j == null) {
          setTrainingRecom1(false)
        }
        // return(
        //   <>
        //   {j?.training_name}
        //   </>
        // )
      })
    //console.log(Newdata,"newdata")

  }, [employeeData])

  useEffect(() => {
    const Areaof = filterData2 &&
      filterData2.map((i: any, index: any) => {
        //console.log(i, "567");
        if (i == undefined || i == null) {
          setArea(false)
        }
        // return (
        //   <>
        //   {i[0]}
        //   </>
        // )
      })
    console.log(Areaof, "Areaof")
  }, [employeeData])
  useEffect(() => {
    const Areaof1 = filterData1 &&
      filterData1.map((i: any, index: any) => {
        //console.log(i, "567");
        // if (i == undefined || i == null) {
        //   setArea1(false)
        // }
        return (
          <>
            {i[0]}
          </>
        )
      })
    console.log(Areaof1, "Areaof1")
  }, [employeeData])

  console.log(employeeData?.data?.appraisal?.area_of_improvement[0], "Appraiser");

  const [positionHide, setpositionHide] = useState<any>(true);
  const [trigger, setTrigger] = useState<any>(false);

  const hideAlertHandler = () => {
    setTimeout(() => {
      createPDF()
    }, 2000);
    setTimeout(() => {
      setpositionHide(true)
    }, 3000);
  };
  const handleHide = () => {
    setpositionHide(false)
    hideAlertHandler()
  }
  // useEffect(()=>{
  //   if(trigger){
  //     setpositionHide(false)
  //   }
  // },[trigger])

  const getOverallRating = (rating: any) => {
    if (rating?.normalizer?.normalizer_rating !== 0) {
      //setData3(true)
      return rating?.normalizer?.normalizer_rating;
    } else if (rating?.reviewer?.reviewer_rating !== 0) {
      //setData2(true)
      return rating?.reviewer?.reviewer_rating
    } else if (rating?.appraisal?.appraiser_rating !== 0) {
      //setData1(true)
      return rating?.appraisal?.appraiser_rating
    } else {
      return rating?.appraisal?.appraiser_rating
    }
  }

  return (
    <div
      id="pdf"
      style={{
        backgroundColor: "#F1F1F1",
        minHeight: "100px",
        overflow: "hidden",
      }}
    >
      <Container
        sx={{
          maxWidth: "95% !important",
          // height: "1425px",
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
          <h2
            style={{
              color: "#3E8CB5",
              fontWeight: "400",
              fontSize: "28px",
              fontFamily: "Arial",
            }}
          >
            {/* Welcome to Performance Appraisal! */}
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
              </Grid>
              <Grid item xs={1}>
                <span
                  style={{
                    color: "#b8b8b8",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  Potential Level : {employeeData?.data?.appraisal?.potential}
                </span>
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
                  onClick={createPDF}
                >
                  <img src={Downloadss} alt="Download" />
                  <label style={{ paddingLeft: "5px" }}> Download </label>
                </Button>
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
          <Stack
            direction="row"
            alignItems="baseline"
            paddingBottom="10px"
            justifyContent="end"
          >
            {/* <Typography
              style={{
                color: "#3E8CB5",
                fontWeight: "400",
                fontSize: "28px",
                fontFamily: "Arial",

              }}
            >
              Welcome to Performance Appraisal!
            </Typography> */}
            <span style={{ paddingRight: "10px" }}>
              <Stack direction="column" alignItems="end" spacing={1}>
                {/* <span
                    style={{
                      color: "#b8b8b8",
                      fontSize: "12px",
                      marginTop: "5px",
                    }}
                  >
                    Potential Level : {employeeData?.data?.appraisal?.potential}
                  </span> */}
                {positionHide && (
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
                    onClick={() => {
                      //   setHide()
                      //  createPDF()
                      handleHide()
                    }}
                  >
                    <img src={Downloadss} alt="Download" />
                    <label style={{ paddingLeft: "5px" }}> Download </label>
                  </Button>
                )}
              </Stack>
            </span>
            {positionHide === false && <span
              style={{
                color: "#3e8cb5",
                padding: "8px",
                height: "18px",
                border: "1px solid#3e8cb5",
                fontSize: "14px",
                fontFamily: "Arial",
                borderRadius: "4px"
              }}
            >{`${dayjs().format("DD-MMM-YYYY")}`}</span>}
          </Stack>
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
              {/* {employeeData?.data?.appraisal?.potential !== false &&
                employeeData?.data?.appraisal?.potential !== undefined && (<Typography
                  style={{
                    fontSize: "16px",
                    color: "#717171",
                    fontFamily: "Arial",
                    paddingTop: "25px",
                    paddingBottom: "25px",
                  }}
                >

                  Potential Level:
                  <label style={{
                    fontSize: "16px",
                    color: "#717171",
                    fontFamily: "Arial",

                  }}> {employeeData?.data?.appraisal?.potential}</label>
                </Typography>)} */}
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
                      fontFamily: "arial"

                    }}
                  >
                    <b>{employeeData && getOverallRating(employeeData?.data)}</b>

                    {/* {data1 && appraiser && (
                          <b>
                            {employeeData?.data?.appraisal?.appraiser_rating}

                          </b>)}
                        {data2 && reviewer && (
                          <b>
                            {employeeData?.data?.reviewer?.reviewer_rating}
                          </b>)}
                        {data3 && normalizer && (
                          <b>
                            {employeeData?.data?.normalizer?.normalizer_rating}
                          </b>)}
                        {data4 && employee && (
                          <b>
                            {employeeData?.data?.employee?.employee_rating}
                          </b>)} */}
                  </div>
                  {/* <div
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
                        {data1 && appraiser && ratingData && getRatingDescription(
                          employeeData?.data?.appraisal?.appraiser_rating)}
                        {data2 && reviewer && ratingData && getRatingDescription(
                          employeeData?.data?.reviewer?.reviewer_rating)}
                        {data3 && normalizer && ratingData && getRatingDescription(
                          employeeData?.data?.normalizer?.normalizer_rating)}
                        {data4 && employee && ratingData && getRatingDescription(
                          employeeData?.data?.employee?.employee_rating)}
                      </div> */}
                </Stack>
              </div>


            </Stack>
          </Box>
          <Box sx={{ paddingTop: "20px" }}>
            {/* <Grid container spacing={0}> */}
            {/* <Grid item xs={12}> */}
            <Stack
              direction="row"
              justifyContent="space-between"
              paddingBottom="20px"
            // width="90%"
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

                    }}
                  >
                    PA Status : <span>{employeeData?.data?.appraisal?.status === "in-progress" ? "In-progress" :
                      employeeData?.data?.appraisal?.status === "not-started" ? "Not-started" :
                        employeeData?.data?.appraisal?.status}</span>

                  </Typography>
                </Stack> */}
              </Grid>
              <Grid
                item
                xs={4}

              >
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
                      employeeData?.data?.appraisal?.status}</span>

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
                <Stack direction="row" gap="12px">
                  {/* <div
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
                      Overall Rating
                    </Typography>
                  </div> */}

                  {employeeData?.data?.appraisal_template.potential === true && (
                    <Stack direction="column" paddingRight="10px" alignItems="flex-end">

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
                </Stack>
              </Grid>
            </Stack>
            {/* </Grid> */}
            {/* </Grid> */}
          </Box>
          <Typography
            style={{ fontSize: "20px", color: "#3E8CB5", fontFamily: "Arial" }}
          >
            Performance Appraisal Summary
          </Typography>
          {/* <Typography
            style={{ fontSize: "16px", color: "#717171", paddingTop: "5px", wordBreak: "break-word" }}
          >
            <b>Overall Feedback</b>
          </Typography>
          <Typography
            style={{ fontSize: "14px", color: "#333333", paddingTop: "5px" }}
          >
            {employeeData?.data?.appraisal?.appraiser_overall_feedback}
          </Typography> */}
          {show4 && employee && (
            <>
              {/* <Typography
                style={{ fontSize: "16px", color: "#717171", paddingTop: "15px" }}
              >
                <b>Employee Comments</b>
              </Typography>
              <Typography
                style={{ fontSize: "14px", color: "#333333", paddingTop: "5px" }}
              >
                {employeeData?.data?.employee?.comments}
              </Typography> */}
            </>
          )}
          <Typography
            style={{ color: "#717171", fontSize: "16px", fontFamily: "Arial" }}
          >
            <b> Ratings   </b>
            <IconButton aria-describedby={id2} onClick={handleClick}>
              <img width="12px" src={Infoicon} alt="icon" />
            </IconButton>
            <Popover
              id={id2}
              open={open2}
              anchorEl={anchorEl}
              onClose={handleClose}
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
                      <TableHead
                        style={{ position: "sticky", zIndex: "1000", top: "0px" }}
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
                        {ratingScaleData &&
                          ratingScaleData.data
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
          <TableContainer sx={{ width: "100%", paddingTop: "10px" }}>
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
                    Objective <br></br> Title
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
                    Objective <br></br> Level
                  </TableCell>

                  {/* {show1 === true && ( */}
                  {appraisal && (
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
                      Appraiser<br></br>  Rating
                    </TableCell>
                  )}
                  {/* )} */}

                  {/* {show1 === true &&  ( */}
                  {appraisal && (
                    <TableCell
                      // width="25%"
                      sx={{
                        fontFamily: "Arial",
                        borderColor: "#F7F9FB",
                        color: "#3E8CB5",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                      align="center"
                    >
                      Appraiser<br></br>  Comments
                    </TableCell>
                  )}
                  {/* )} */}

                  {/* {show2 && reviewer && ( */}
                  {reviewers && (
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
                      Reviewer<br></br>  Rating
                    </TableCell>
                  )}
                  {/* )} */}
                  {/* {show2 && reviewer && ( */}
                  {reviewers && (
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
                      Reviewer<br></br>  Comments
                    </TableCell>

                  )}
                  {/* {show3 && normalizer && (
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
                      Normalizer Rating
                    </TableCell>
                  )}
                  {show3 && normalizer && (
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
                      Normalizer Comments
                    </TableCell>
                  )} */}
                  {/* {show4 && employee && ( */}
                  {employees && (
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
                  )}
                  {/* {employee && ( */}
                  {employees && (
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
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeData &&
                  objectiveTitleData &&
                  objectiveDescription?.map((j: any, index: any) => {
                    //console?.log(j, "test");
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
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak: "break-word",
                            }}
                            align="left"
                          >
                            {j?.objective_type?.name?.name}
                            {/* Knowledge of the job */}
                          </TableCell>
                          <TableCell
                            width="150px"
                            sx={{
                              fontSize: "14px",
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
                                setPopoverIndexs(index);
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
                              open={popoverIndexs === index && openInfo101}
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
                            width="50px"
                            sx={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                            }}
                            align="center"
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
                                    setPopoverIndexs(index);
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
                              open={popoverIndexs === index && openInfo102}
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
                                              <b>{
                                                j?.name?.level_1
                                                  ?.level_definition
                                              }</b>
                                            </span>
                                            <br />
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
                                            {" "}
                                            <span>L2 : </span>{" "}
                                            <span>
                                              <b>{
                                                j?.name?.level_2
                                                  ?.level_definition
                                              }</b>
                                            </span>
                                            <br />
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
                                            <span>L3 : </span>{" "}
                                            <span>
                                              <b> {
                                                j?.name?.level_3
                                                  ?.level_definition
                                              }</b>
                                            </span>
                                            <br />
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
                                            {" "}
                                            <span>L4 : </span>{" "}
                                            <span>
                                              <b> {
                                                j?.name?.level_4
                                                  ?.level_definition
                                              }</b>
                                            </span>
                                            <br />
                                            <ul style={{ marginTop: "0px", marginBottom: "0px" }} >
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
                          {/* {show1 === true &&  ( */}
                          {appraisal && (
                            <TableCell
                              width="50px"
                              sx={{
                                fontSize: "14px",
                                // color: "#333333",
                                color: employeeData &&
                                  employeeData?.data?.appraisal?.objective_description
                                    .filter(
                                      (i: any) =>
                                        i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000",
                                fontFamily: "Arial",
                              }}
                              align="center"

                            >
                              <Stack
                                direction="column"
                                display="flex"
                                alignItems="center"
                              >
                                <span> {j.ratings && j.ratings.rating}</span>
                                <span
                                  style={{
                                    fontSize: "14px",
                                    color: "#333333",
                                  }}
                                >
                                  {/* {j.ratings && j.ratings.rating_scale}{" "} */}
                                </span>
                              </Stack>
                            </TableCell>
                          )}
                          {/* {show1 === true && ( */}
                          {appraisal && (
                            <TableCell
                              width="250px"
                              sx={{
                                fontSize: "14px",
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

                                    wordBreak: "break-word",
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",


                                  }}
                                >  {(j?.comments == "" || j?.comments == undefined) ? j?.remarks : j?.comments}</span>
                                {employeeData && getAttachments(j?.name?._id)?.length > 0 &&

                                  <AttachFileIcon
                                    sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                                    aria-describedby={"id"}
                                    onClick={(e: any) => {
                                      handleClickOpen6(e, j)
                                      setPopoverIndex1(index)
                                    }}
                                  />
                                }
                                <Popover
                                  id={"id"}
                                  open={(popoverIndex1 === index) && open6}
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
                                        width: "170px"
                                      }}>
                                      {/* Attachments: {appraisalAttachments} */}
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
                                                {/* <IconButton>
{/*                                                */}
                                                {/* <img
                                               src={Removeatt}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                                {/* <img
                                                style={{cursor:"pointer"}}
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
                                    </Typography>
                                    {/* {employeeData?.data?.appraisal?.attachments
                                    .filter((i: any) => {

                                      // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                      return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                    })}
                                    .map((k: any) => {
                                    return <a href={k.url}> {k.name} </a>;
                                    })} */}
                                  </div>
                                </Popover>
                              </Stack>
                            </TableCell>
                          )}

                          {/* {show2 && reviewer && ( */}
                          {reviewers && (
                            <TableCell
                              width="50px"
                              sx={{
                                fontSize: "14px",
                                color: employeeData &&
                                  employeeData?.data?.reviewer?.objective_description
                                    .filter(
                                      (i: any) =>
                                        i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000",
                                fontFamily: "Arial",
                                textAlign: "center"
                              }}
                              align="center"
                            >

                              {employeeData &&
                                employeeData.data.reviewer.objective_description
                                  .filter(
                                    (i: any) => i.name._id === j.name._id
                                  )
                                  .map((k: any) => {
                                    if (k.ratings) return k.ratings.rating;
                                  })[0]}


                            </TableCell>
                          )}
                          {/* {show2 && reviewer && ( */}
                          {reviewers && (
                            <TableCell
                              width="250px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              <Stack
                                direction="row"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={2}
                              >
                                <span
                                  style={{

                                    wordBreak: "break-word",
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",


                                  }}
                                >  {employeeData &&
                                  employeeData.data.reviewer.objective_description
                                    .filter(
                                      (i: any) => i.name._id === j.name._id
                                    )
                                    .map((k: any) => k.comments)[0]}</span>

                                {employeeData && getAttachments2(j?.name?._id)?.length > 0 &&

                                  <AttachFileIcon
                                    sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                                    aria-describedby={"id"}
                                    onClick={(e: any) => {
                                      handleOpenReviewerAttachment(e, j)
                                      setPopoverIndex2(index)
                                    }}
                                  />
                                }

                                <Popover
                                  id={"id"}
                                  open={(popoverIndex2 === index) && openReviewerAttachment}
                                  anchorEl={anchorEl8}
                                  onClose={handleCloseReviewerAttachment}
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
                                        width: "170px"
                                      }}>
                                      {/* Attachments: {reviewerAttachments} */}
                                      {employeeData && getAttachments2(j?.name?._id)?.map((k: any, index1: any) => {
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
                                                 style={{cursor:"pointer"}}
                                                  src={Removeattnew}
                                                  onClick={() => deleteReviewerMutation({
                                                    employee_id: employee_id,
                                                    name: k.remove
                                                  })}
                                                /> */}
                                                {/* </IconButton> */}
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
                                      })}
                                    </Typography>

                                  </div>
                                </Popover>

                              </Stack>
                            </TableCell>
                          )}
                          {/* {show3 && normalizer && (
                            <TableCell
                            width="50px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="center"
                            >
                              <span>
                                {employeeData &&
                                  employeeData.data.normalizer.objective_description
                                    .filter(
                                      (i: any) => i.name._id === j.name._id
                                    )
                                    .map((k: any) => {
                                      if (k.ratings) return k.ratings.rating;
                                    })[0]}
                            
                              </span>
                            </TableCell>
                          )} */}

                          {/* {show3 && normalizer && (
                            <TableCell
                            width="170px"
                              sx={{
                                fontSize: "14px",
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
                                  width:"350px",
                                  wordBreak:"break-word",
                                  fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",


                                }}>  {employeeData &&
                                  employeeData.data.normalizer.objective_description
                                    .filter(
                                      (i: any) => i.name._id === j.name._id
                                    )
                                    .map((k: any) => k.comments)[0]}</span>
                              
                                {employeeData && getAttachments3(j?.name?._id)?.length > 0 &&
   
                                <AttachFileIcon
                                  sx={{ color: "#93DCFA", height: "18px", transform: "rotate(30deg)", }}
                                  aria-describedby={"id"}
                                  onClick={(e: any) => {handleOpenNormalizerAttachment(e, j)
                                  setPopoverIndex3(index)}}
                                />
                                }
                                <Popover
                                  id={"id"}
                                  open={(popoverIndex3 === index) && openNormalizerAttachment}
                                  
                                  onClose={handleCloseNormalizerAttachment}
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
                                   <div
                                           
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
                                        whiteSpace:"nowrap",
                                        overflow:"hidden",
                                        textOverflow:"ellipsis",
                                        width:"170px"
                                      }}>
                                  
                                    {employeeData && getAttachments3(j?.name?._id)?.map((k: any, index1: any) => {
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
                                           
                                              
                                              <img
                                               style={{cursor:"pointer"}}
                                               src={Removeattnew}
                                                onClick={() => deleteNormalizerMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })}
                                                 />
                                           
                                          </Stack>

                                        </Stack>
                                      </>
                                    )
                                  })}
                                    </Typography>
                                   
                                  </div>
                                </Popover>

                              </Stack>

                            </TableCell>
                          )} */}
                          {/* {show4 && employee && ( */}
                          {employees && (

                            <TableCell
                              width="50px"
                              sx={{
                                fontSize: "14px",
                                color: employeeData &&
                                  employeeData?.data?.employee?.objective_description
                                    .filter(
                                      (i: any) =>
                                        i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              <Stack
                                direction="column"
                                display="flex"
                                alignItems="center"
                              >
                                {employeeData &&
                                  employeeData?.data?.employee?.objective_description
                                    ?.filter(
                                      (i: any) => i?.name?._id === j?.name?._id
                                    )
                                    ?.map((k: any) => {
                                      if (k?.ratings) return k?.ratings?.rating;
                                    })[0]}
                              </Stack>
                            </TableCell>
                          )}
                          {/* {employee && ( */}
                          {employees && (
                            <TableCell
                              width="250px"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              <Stack
                                direction="row"
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                spacing={2}
                              >
                                <span
                                  style={{

                                    wordBreak: "break-word",
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",


                                  }}

                                >
                                  {employeeData &&
                                    employeeData?.data?.employee?.objective_description
                                      ?.filter(
                                        (i: any) => i?.name?._id === j?.name?._id
                                      )
                                      ?.map((k: any) => k?.comments)[0]}
                                </span>
                                {employeeData && getAttachments1(j?.name?._id)?.length > 0 &&

                                  <AttachFileIcon
                                    sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                                    aria-describedby={"id"}
                                    onClick={(e: any) => {
                                      handleClickOpen7(e, j)
                                      setPopoverIndex(index)
                                    }}
                                  />
                                }
                                <Popover
                                  id={"id"}
                                  open={(popoverIndex === index) && open7}
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
                                        width: "170px"
                                      }}>
                                      {/* Attachments: {employeeAttachments} */}

                                      {employeeData && getAttachments1(j?.name?._id)?.map((k: any, index1: any) => {
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
                                                {/*                                               
                                              <img
                                               src={Removeatt}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                                {/* <img
                                                 style={{cursor:"pointer"}}
                                                  src={Removeattnew}
                                                  onClick={() => deleteEmployeeMutation({
                                                    employee_id: employee_id,
                                                    name: k.remove
                                                  })} /> */}
                                                {/* </IconButton> */}
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
                                      })}
                                    </Typography>
                                    {/* {employeeData?.data?.appraisal?.attachments
                                    .filter((i: any) => {

                                      // return   i.objective_description ===  employeeData.data.appraisal.objective_description[index].name._id
                                      return i.objective_description === employeeData.data.appraisal.objective_description[index].name._id
                                    })}
                                    .map((k: any) => {
                                    return <a href={k.url}> {k.name} </a>;
                                    })} */}
                                  </div>
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
          <Typography
            style={{ color: "#717171", fontSize: "16px", fontFamily: "Arial", paddingTop: "20px" }}
          >

            <b>Recommendations</b>

          </Typography>

          {overallFeed && overallFeed.map((j: any, mapIndex: any) => {

            return (
              <>
                <Typography
                  style={{ fontSize: "16px", color: "#717171", paddingBottom: "10px", paddingTop: "20px", fontFamily: "arial", wordBreak: "break-word" }}
                >
                  <b>{j.name.name}</b>
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
                    {j.value}
                  </div>

                </Box>
                {/* <TextField
                    fullWidth
                    multiline
                    InputProps={{ readOnly: true }}
                    inputProps={{ maxLength: 256 }}
                    size='small'
                    key={j._id}
                    value={j.value}
                  /> */}
                {/* </Tf1> */}
              </>
            );
          })}
          {/* {specificAction && ( */}
          <div>
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

                  {/* {show4 && employee && (<TableCell
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
                    </TableCell>)} */}
                </TableRow>
              </TableHead>

              <TableBody>
                {filterData1 &&
                  filterData1.map((i: any, index: any) => {
                    //console.log(i, "123");
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
                            width="17%"
                            align="left"
                            style={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak: "break-word",
                              lineHeight: "23px"
                            }}
                          >
                            {i[0]}
                          </TableCell>
                          <TableCell
                            width="50%"
                            align="left"
                            style={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak: "break-word",
                              lineHeight: "23px"
                            }}
                          >
                            {/* <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[0]?.value}</p>
                    <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[1]?.value}</p>
                    <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[2]?.value}</p> */}
                            {filterData1 &&
                              filterData1.map((i: any, ix: any) => {
                                return i[1].map((j: any, jx: any) => {
                                  return j.specific_actions.map(
                                    (k: any, ix1: any) => {
                                      if (index === ix && k.value)
                                        return (
                                          <Typography
                                            style={{
                                              fontSize: "14px",
                                              color: "#333333",
                                              fontFamily: "Arial",
                                              whiteSpace: "pre-line",
                                              wordBreak: "break-word",
                                              lineHeight: "23px"
                                            }}
                                          >
                                            {k.value}
                                            <br />
                                          </Typography>
                                        );
                                    }
                                  );
                                });
                              })}
                          </TableCell>

                          {/* {show4 && employee && (<TableCell
                              align="justify"
                              width="350px"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word"
                              }}
                            >
                              {i.comments}                           
                            </TableCell>)} */}
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          {/* )} */}
          {/* {show4 && employee && ( */}
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
                <b>Areas of Improvement (Employee)</b>
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
                      //console.log(i, "123");
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
                              width="17%"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight: "23px"
                              }}
                            >
                              {i[0]}
                            </TableCell>
                            <TableCell
                              align="left"
                              width="50%"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight: "23px"
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
          {/* {specificAction2 && ( */}
          <div>
            <Typography
              style={{
                paddingTop: "20px",
                color: "#717171",
                fontSize: "16px",
                fontFamily: "Arial",
              }}
            >
              <b>Training Recommendations (Appraiser)</b>
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

                  {/* {show4 && employee && (<TableCell
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
                  </TableCell>)} */}
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
                            width="145px"
                            align="left"
                            style={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak: "break-word",
                              lineHeight: "23px",

                            }}
                          >
                            {j.name?.title}
                            <IconButton
                              // aria-describedby={id2}
                              onClick={handleClickInfo6}
                            // style={{marginRight:"5px"}}
                            >
                              <img width="12px" src={Infoicon} alt="icon" />
                            </IconButton>
                            <Popover
                              id={id6}
                              open={openInfo6}
                              anchorEl={anchorEl9}
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
                            width="160px"
                            align="left"
                            style={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak: "break-word",
                              lineHeight: "23px"
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
                              wordBreak: "break-word",
                              lineHeight: "23px"
                            }}
                          >
                            {j.justification}
                          </TableCell>

                          {/* {show4 && employee && (<TableCell
                            align="justify"
                            width="300px"
                            style={{
                              fontSize: "14px",
                              color: "#333333",
                              fontFamily: "Arial",
                              wordBreak: "break-word"
                            }}
                          >
                            {j.comments}
                          </TableCell>)} */}
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
          </div>
          {/* )}  */}
          {/* {trainingRecom1 && ( */}
          {specificAction2 && (
            <div>
              <Typography
                style={{
                  paddingTop: "20px",
                  color: "#717171",
                  fontSize: "16px",
                  fontFamily: "Arial",
                }}
              >
                <b>Training Recommendations (Employee)</b>
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
                    Training1?.map((j: any) => {
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
                              width="145px"
                              align="left"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight: "23px"
                              }}
                            >
                              {j?.trainingName}
                            </TableCell>
                            <TableCell
                              width="160px"
                              align="left"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight: "23px"
                              }}
                            >
                              {j?.training_name}
                            </TableCell>
                            <TableCell
                              width="300px"
                              align="left"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight: "23px"
                              }}
                            >
                              {j?.justification}
                            </TableCell>
                          </TableRow>
                        </>
                      );
                    })}
                </TableBody>
              </Table>
            </div>
          )}
          <Typography
            style={{ fontSize: "16px", color: "#717171", paddingBottom: "10px", paddingTop: "20px", fontFamily: "arial", wordBreak: "break-word" }}
          >
            <b>Other Recommendations </b>
            </Typography>
            <Typography>
              <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                {employeeData &&
                  objectiveTitleData &&
                  otherRecommendation?.map((j: any) => {
                    console.log(j, "otherRecommendation")
                    return (
                      <>
                        <Grid display="flex" item xs={2} sm={4} md={3} >
                          <Labels>
                            {j?.name?.name}
                          </Labels>
                        </Grid>
                      </>
                    );
                  })}
              </Grid>
            </Typography>
          

          <Typography
            style={{ fontSize: "16px", color: "#717171", paddingBottom: "10px", paddingTop: "20px", fontFamily: "arial", wordBreak: "break-word" }}
          >
            <b>Appraiser Overall Feedback</b>
          </Typography>
          <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

            <div style={{
              color: "#333333",
              fontSize: "14px",
              fontFamily: "arial",
              fontWeight: "400",
              textTransform: "none",
              //  padding: "8px",
              textAlign: "left",
              lineHeight: "23px"
            }}>
              {employeeData?.data?.appraisal?.appraiser_overall_feedback}
            </div>

          </Box>
          {/* <Tf1>
            <TextField
              fullWidth
              InputProps={{ readOnly: true, }}
              multiline
              inputProps={{ maxLength: 500 }}
              size="small"
              value={employeeData?.data?.appraisal?.appraiser_overall_feedback}
            />
          </Tf1> */}
          {employeeData?.data?.reviewer?.reviewer_overall_feedback !== "" && (
            <>
              <Typography
                style={{ fontSize: "16px", color: "#717171", paddingBottom: "10px", paddingTop: "20px", fontFamily: "arial", wordBreak: "break-word" }}
              >
                <b>Reviewer Overall Feedback</b>
              </Typography>

              {/* <Tf1>
                <TextField
                  fullWidth
                  InputProps={{ readOnly: true, }}
                  multiline
                  inputProps={{ maxLength: 500 }}
                  size="small"
                  value={employeeData?.data?.reviewer?.reviewer_overall_feedback}
                />
              </Tf1> */}
              <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                <div style={{
                  color: "#333333",
                  fontSize: "14px",
                  fontFamily: "arial",
                  fontWeight: "400",
                  textTransform: "none",
                  //  padding: "8px",
                  textAlign: "left",
                  lineHeight: "23px"
                }}>
                  {employeeData?.data?.reviewer?.reviewer_overall_feedback}
                </div>

              </Box>
            </>
          )}
          {employeeData?.data?.normalizer?.normalizer_overall_feedback !== "" && (
            <>
              <Typography
                style={{ fontSize: "16px", color: "#717171", paddingBottom: "10px", paddingTop: "20px", fontFamily: "arial", wordBreak: "break-word" }}
              >
                <b>Normalizer Overall Feedback</b>
              </Typography>

              {/* <Tf1>
                <TextField
                  fullWidth
                  InputProps={{ readOnly: true, }}
                  multiline
                  inputProps={{ maxLength: 500 }}
                  size="small"
                  value={employeeData?.data?.normalizer?.normalizer_overall_feedback}
                />
              </Tf1> */}
              <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                <div style={{
                  color: "#333333",
                  fontSize: "14px",
                  fontFamily: "arial",
                  fontWeight: "400",
                  textTransform: "none",
                  //  padding: "8px",
                  textAlign: "left",
                  lineHeight: "23px"
                }}>
                  {employeeData?.data?.normalizer?.normalizer_overall_feedback}
                </div>

              </Box>
            </>
          )}

          {employeeData?.data?.appraisal?.status == "completed" && (
            <>
              <Typography
                style={{ fontSize: "16px", color: "#717171", paddingBottom: "10px", paddingTop: "20px", fontFamily: "arial", wordBreak: "break-word" }}
              >
                <b>Normalizer meeting notes</b>
              </Typography>

              {/* <Tf1>
                <TextField
                  fullWidth
                  InputProps={{ readOnly: true, }}
                  multiline
                  inputProps={{ maxLength: 500 }}
                  size="small"
                  value={employeeData?.data?.normalizer?.normalizer_overall_feedback}
                />
              </Tf1> */}
              <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                <div style={{
                  color: "#333333",
                  fontSize: "14px",
                  fontFamily: "arial",
                  fontWeight: "400",
                  textTransform: "none",
                  //  padding: "8px",
                  textAlign: "left",
                  lineHeight: "23px"
                }}>
                  {employeeData?.data?.normalizer?.normalizer_meeting_notes}
                </div>

              </Box>
            </>
          )}        


          {/* <Typography
            style={{ fontSize: "14px", color: "#333333", paddingTop: "5px" }}
          >
            {employeeData?.data?.appraisal?.appraiser_overall_feedback}
          </Typography> */}
          {employees && (
            <>
              <Typography
                style={{ fontSize: "16px", color: "#717171", fontFamily: "arial", paddingBottom: "10px", paddingTop: "20px" }}
              >
                <b>Employee Comments</b>
              </Typography>
              {/* <Tf1>
                <TextField
                  fullWidth
                  InputProps={{ readOnly: true, }}
                  multiline
                  inputProps={{ maxLength: 500 }}
                  size="small"
                  value={employeeData?.data?.employee?.comments}
                />
              </Tf1> */}
              <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                <div style={{
                  color: "#333333",
                  fontSize: "14px",
                  fontFamily: "arial",
                  fontWeight: "400",
                  textTransform: "none",
                  //  padding: "8px",
                  height: "20px",
                  textAlign: "left",
                  lineHeight: "23px"
                }}>
                  {employeeData?.data?.employee?.comments}
                </div>

              </Box>

            </>
          )}



        </Box>
      </Container>
    </div>
  );
}
