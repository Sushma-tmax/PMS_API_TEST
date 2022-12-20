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
// import dayjs from "dayjs";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Removeattnew from "../../assets/Images/icons/Removeattnew.svg";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  useGetObjectiveDescriptionQuery,
  useGetObjectiveTitleQuery,
  useGetObjectiveTypeQuery,
  useUpdateEmployeeAppraisalMutation,
  useAcceptAppraisalEmployeeMutation,
  useGetEmployeeAppraisalQuery,
  useGetRatingScaleQuery,
  useAttachmentsEmployeeDeleteMutation,
  useAttachmentsAppraiserDeleteMutation
} from "../../service";
import { useParams, useNavigate } from "react-router-dom";
import _ from "lodash";
import html2canvas from "html2canvas";

import { jsPDF } from "jspdf";
import { EMPLOYEE_REJECTS } from "../../constants/routes/Routing";
import dayjs from "dayjs";
import { SpaceBarRounded } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Infoicon from "./icons/Infoicon.svg";
import { useDeleteRatingScaleMutation } from "../../service/ratings/ratings";
import Popover from "@mui/material/Popover";
import { Scrollbar } from "react-scrollbars-custom";
import Downloadss from "../../assets/Images/Downloadss.svg";
import { fontFamily } from "@mui/system";

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
const Tf1 = styled("div")({
  "& .MuiInputBase-input": {
    color: "#333333",
    fontSize: "14px",
    fontFamily: "arial",
    fontWeight: "400",
    textTransform: "none",
    padding: "4px",
  },
});
export default function EmployeeDownload() {
  const { data: ratingScaleData } = useGetRatingScaleQuery("");
  console.log(ratingScaleData, "ratingScaleData");

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
  const [deleteAppraiserMutation, { isLoading: isDeleting, data: deletes }] =
    useAttachmentsAppraiserDeleteMutation();
  const [deleteEmployeeMutation, { isLoading: delete1, data: deleted }] =
    useAttachmentsEmployeeDeleteMutation();
  // console.log(data,'new')
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  console.log(objectiveDescData, "objectiveDescData");
  console.log(objectiveTitleData, "objectiveTitleData");
  console.log(filterData, "filterData");
  const [showRating, setShowRating] = useState("false");
  let todayDate = new Date();
  const [show, setShow] = useState("false");
  const [updateEmployee] = useUpdateEmployeeAppraisalMutation();
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

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [popoverIndex, setPopoverIndex] = useState<any>("")
  const [popoverIndex1, setPopoverIndex1] = useState<any>("")
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
      setEmployeeTrainingRecommendations(
        employeeData?.data?.employee?.training_recommendation
      );
      setAppraiserTrainingRecommendations(
        employeeData?.data?.appraisal?.training_recommendation
      );
      setEmployeeComments(employeeData?.data?.employee?.comments);
    }
  }, [employeeData, objectiveTitleData]);
  console.log(employeeData, "datatest");
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

  const getObjectiveTypeName = (id: any) => {
    console.log(id, " type");
    if (data) {
      return data.data.find((item: any) => {
        return id === item._id;
      });
    }
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

  const [filterData1, setFilterData1] = useState([]);
  console.group(filterData1, "filterData1");
  const groupNAmeHandler = (name: any) => {
    if (name) {
      setFilterData1(name);
    }
  };

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

  const [anchorEl6, setAnchorEl6] = React.useState<HTMLButtonElement | null>(
    null
  );
  // const [position, setPosition] = useState<any>(false);
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
    // setPosition(appraisalAttachments);
    // (employeeData &&
    //   employeeData?.data?.appraisal?.attachments
    //   .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>}))
    // setOpen2(true);

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







  useEffect(() => {
    const group = _.groupBy(objectiveDescription, "objective_type.name");
    // console.log(Object.entries(group), 'group')
    const groupName = groupNameHandler(Object.entries(group));
  }, [objectiveDescription]);

  // console.log(employeeData?.data?.normalizer?.area_of_improvement?.specific_actions?.value, 'spec')
  const [specificAction, setspecificAction] = useState([]);
  useEffect(() => {
    const specific =
      employeeData?.data?.normalizer?.area_of_improvement[0]?.specific_actions.map(
        (item: any) => {
          console.log(item, "iiiiii");
          return item.value;
        }
      );
    console.log(specific, "spec");
    setspecificAction(specific);
  }, [employeeData]);

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

  const open2 = Boolean(anchorEl);
  const id2 = open2 ? "simple-popover" : undefined;

  const [filterData2, setFilterData2] = useState([]);
  console.group(filterData2, "filterData2");
  const groupNAmeHandler2 = (name: any) => {
    console.log(name, "nameeee");
    if (name) {
      setFilterData2(name);
    }
  };
  console.log(filterData2, "filterData2");
  const [employeeAreaofImprovement, setEmployeeAreaofImprovment] =
    useState<any>([]);
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
      const employeeAreaOfImprovement =
        employeeData.data.employee.area_of_improvement;
      const group = _.groupBy(employeeAreaOfImprovement, "value");
      const groupName = groupNAmeHandler2(Object.entries(group));
    }
  }, [employeeData, employeeAreaofImprovement]);
  const [employeeTrainingRecommendations, setEmployeeTrainingRecommendations] =
    useState<any>([]);
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
  console.log(Training1, "Trainingstate1");

  const findTrainingName = (id:any) => {
    if (employeeData) {
      return employeeData?.data?.appraisal_template?.training_recommendation.find((i:any) => 
      i.name._id == id);
    }
  }

  useEffect(() => {
    if (employeeData) {
      setTraining1(() => {
        return employeeData?.data?.employee?.training_recommendation?.map(
          (i: any) => {
            console.log(i, "Training1");
            return {
              ...i,
              name: findTrainingName(i.name),
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
    if (employeeData && employeeData.data) {
      const employeeTrainingRecommendations =
        employeeData.data.employee.training_recommendation;
      const group = _.groupBy(employeeTrainingRecommendations, "value");
      const groupName = groupNAmeHandler3(Object.entries(group));
    }
  }, [appraiserAreaofImprovement]);
  const [filterData3, setFilterData3] = useState([]);
  console.group(filterData3, "filterData3");
  const groupNAmeHandler3 = (name: any) => {
    if (name) {
      setFilterData3(name);
    }
  };
  const [show1, setShow1] = useState<any>(false);

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

  const [area, setArea] = useState<any>(false);
  const [area1, setArea1] = useState<any>(false);
  const [positionHide, setpositionHide] = useState<any>(true);
  // const [trigger, setTrigger] = useState<any>(false);

  const hideAlertHandler = () => {
    setTimeout(() => {
      createPDF();
    }, 2000);
    setTimeout(() => {
      setpositionHide(true)
    }, 3000);
  };
  const handleHide = () => {
    setpositionHide(false);
    hideAlertHandler();
  };

  useEffect(() => {
    const Dataa =
      employeeData &&
      objectiveTitleData &&
      Training1?.map((j: any) => {
        console.log(j, 'jjjjjjjjjjjjj')
        if (j == undefined || j == null) {
          setArea(false);
        }
        // return(
        //   <>
        //    {j}
        //   </>
        // )
      });
    console.log(Dataa, "dataa");
  }, [employeeData]);

  console.log(Training1, ' areaaaaaaa')

  useEffect(() => {
    const Dataa1 =
      employeeData &&
      objectiveTitleData &&
      Training?.map((j: any) => {
        return <>{j}</>;
      });
    console.log(Dataa1, "dataa1");
  }, [employeeData]);

  useEffect(() => {
    const Dataa2 =
      filterData2 &&
      filterData2.map((i: any, index: any) => {
        // console.log(i, "123");
        if (i == undefined || i == null) {
          setArea1(false);
        }
        // return(
        //   <>
        //    {i}
        //   </>
        // )
      });
    console.log(Dataa2, "dataa2");
  });



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

  const [overallFeed, setOverallFeed] = useState<any>([])
  useEffect(() => {
    setOverallFeed(
      employeeData?.data?.appraisal?.feedback_questions
    )

  }, [employeeData])
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
      id="pdf"
      style={{
        backgroundColor: "#F1F1F1",
        // height: "1500px",
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
          // height: "1200px",
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
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
            paddingBottom="10px"
          >
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
                <label style={{ paddingLeft: "5px",
                cursor: "pointer",
                 }}> Download </label>
              </Button>
            )}
          </Stack>
          <Stack direction="column" alignItems="end" spacing={1}>
            {positionHide === false && <span
              style={{
                color: "#3e8cb5",
                padding: "8px",
                height: "18px",
                border: "1px solid#3e8cb5",
                fontSize: "14px",
                fontFamily: "Arial",
                borderRadius: "4px",
                paddingRight: "10px"
                // marginLeft:"90%",
                // marginTop:"10%"
                // paddingTop:"20px"
                // marginTop :"50px"
              }}
            >{`${dayjs().format("DD-MMM-YYYY")}`}</span>}
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
              <Grid item xs={10} md={8}>
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
              <Grid item xs={1} md={3}>
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
                <span
                  style={{
                    color: "#333333",
                    fontSize: "14px",
                  }}
                >
                  Download date: 30 September 2022
                </span>
              </Grid>
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
               ( `Potential Level : ${employeeData?.data?.appraisal?.potential} `)}
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
                    <b>{(employeeData?.data?.employee?.employee_rating == "" || employeeData?.data?.employee?.employee_rating == undefined) ?
                      (employeeData?.data?.normalizer?.normalizer_rating) : (employeeData?.data?.employee?.employee_rating)}</b>
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
              {/* {positionHide && (
              <Button
                variant="outlined"
                size="small"
                style={{
                  textTransform: "none",
                  fontSize: "15px",
                  fontFamily: "Arial",
                  borderColor: "#3E8CB5",
                  color: "#3E8CB5",
                  marginRight: "20px"
                }}
                onClick={() => {
                  //   setHide()
                  //  createPDF()
                  handleHide()
                  }}
              >
                <img src={Downloadss} alt="Download" />
                <label style={{ paddingLeft: "5px" }}> Download as PDF </label>
              </Button>
              )} */}
              {/* <span
                style={{
                  color: "#333333",
                  fontSize: "14px",
                  paddingRight: "10px"
                }}
              >
                Download date: {dayjs(todayDate).format('DD MMMM YYYY')}
              </span> */}
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
                </span>{" "}
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
                    dayjs(employeeData?.data.calendar.start_date).month()
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

              <Grid item xs={4}>
                <Stack paddingRight="10px" direction="row" gap="12px">
                  {employeeData?.data?.appraisal_template.potential === true && (
                    <Stack direction="column" alignItems="flex-end">
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

          <Typography
            style={{ color: "#717171", fontSize: "16px", fontFamily: "Arial" }}
          >
            <b>Ratings</b>
            <IconButton aria-describedby={id2} onClick={handleClick}>
              <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
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
                                        width: "70px",
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
                                        width: "130px",
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
                    Objective<br/> Type
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
                    Objective<br/> Title
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
                    Appraiser<br/> Ratings
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
                    Appraiser<br/> Comments
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
                </TableRow>
              </TableHead>
              <TableBody>
                {employeeData &&
                  objectiveTitleData &&
                  objectiveDescription?.map((j: any, index: any) => {
                    console.log(j.rating_rejected, "rating");
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
                            }}
                            align="left"
                          >
                            {j?.name?.objectiveTitle}
                            {/* Quality of Work */}
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
                                                <ul style={{marginTop:"0px",marginBottom:"0px"}}>
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
                                                <ul style={{marginTop:"0px",marginBottom:"0px"}}>
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
                                                <b>{
                                                    j?.name?.level_3
                                                      ?.level_definition
                                                  }</b>
                                                </span>
                                                <br />
                                                <ul style={{marginTop:"0px",marginBottom:"0px"}}>
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
                                                <ul style={{marginTop:"0px",marginBottom:"0px"}}>
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
                            }}
                            align="left"
                          >
                            <Stack
                              direction="column"
                              display="flex"
                              alignItems="center"
                            >
                              <span
                                style={{
                                  color: employeeData &&
                                    employeeData?.data?.appraisal?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000"
                                }}

                              >
                                {" "}
                                {employeeData &&
                                  employeeData?.data?.appraisal?.objective_description
                                    .filter(
                                      (i: any) => i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => {
                                      console.log(
                                        k?.ratings?.rating,
                                        "k.ratings.rating"
                                      );
                                      // setcompvalue(k.ratings.rating)
                                      if (k?.ratings) return k?.ratings?.rating;
                                    })[0]}
                              </span>

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
                              // justifyContent="space-between"
                              justifyContent="space-between"
                              alignItems="center"
                              spacing={2}
                            >
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                }}
                              >
                                {employeeData &&
                                  employeeData?.data?.appraisal?.objective_description
                                    .filter(
                                      (i: any) => i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => {
                                      console.log(
                                        k?.ratings?.rating,
                                        "k.ratings.rating"
                                      );
                                      // setcompvalue(k.ratings.rating)
                                      if (k?.comments == "" || k.comments == undefined) return k?.remarks
                                      else return k.comments;
                                    })[0]}
                              </span>

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
                                  style={{
                                    padding: "5px",
                                    fontSize: "12px",
                                    lineHeight: "20px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                  }}
                                >
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
                                            <IconButton>
                                              {/*                                               
                                              <img
                                               src={Removeatt}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                              {/* <img
                                                src={Removeattnew}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                            </IconButton>
                                          </Stack>

                                        </Stack>
                                      </>
                                    )
                                  })}
                                </div>
                              </Popover>
                            </Stack>

                          </TableCell>
                          <TableCell
                            width="10px"
                            sx={{
                              fontSize: "14px",
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
                              {/* {j.rating_rejected ? (
                                <span style={{ color: "#3E8CB5" }}>
                                  {j?.ratings?.rating}
                                </span>
                              ) : (
                                ""
                              )} */}
                              <span
                                style={{
                                  fontSize: "14px",
                                  //   color: employeeData &&

                                  //     employeeData?.data?.employee?.objective_description

                                  //       .filter(

                                  //         (i: any) =>

                                  //           i?.name?._id === j?.name?._id

                                  //       )

                                  //       .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000",
                                  // 
                                }}
                              >
                                {/* {employeeData &&
                                  employeeData?.data?.employee?.objective_description
                                    .filter(
                                      (i: any) => i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => {
                                      console.log(
                                        k?.ratings?.rating,
                                        "k.ratings.rating"
                                      );
                                      // setcompvalue(k.ratings.rating)
                                      if (k?.ratings) return k?.ratings?.rating;
                                    })[0]} */}
                                {/* {j.ratings && j.ratings.rating_scale} */}

                                {j.rating_rejected ? (
                                  <span style={{ color: "red" }}>
                                    {j.ratings && j.ratings.rating}
                                  </span>
                                ) : (j.ratings && j.ratings.rating) ?

                                  (
                                    <span
                                      style={{
                                        fontSize: "14x",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                      }}
                                    >
                                      {j.ratings && j.ratings.rating}
                                    </span>
                                  ) : (employeeData &&
                                    employeeData?.data?.appraisal?.objective_description
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
                                      })[0])


                                }
                              </span>
                            </Stack>
                          </TableCell>
                          <TableCell
                            width="250px"
                            sx={{
                              fontSize: "14px",
                              color: "#33333",
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
                              {/* {j?.comments} */}
                              <span
                                style={{
                                  fontSize: "14px",
                                  color: "#33333",
                                  fontFamily: "Arial",
                                }}
                              >
                                {employeeData &&
                                  employeeData?.data?.employee?.objective_description
                                    .filter((i: any) => i?.name?._id === j?.name?._id)
                                    .map((k: any) => {
                                      console.log(
                                        k?.ratings?.rating,
                                        "k.ratings.rating"
                                      );
                                      // setcompvalue(k.ratings.rating)
                                      if (k?.comments) return k?.comments;
                                    })[0]}
                              </span>

                              <div
                                style={{
                                  justifyContent: "end",
                                  position: "relative",
                                }}
                              >
                                {employeeData && getAttachments1(j?.name?._id)?.length > 0 &&
                                  <AttachFileIcon
                                    style={{
                                      color: "#93DCFA",
                                      height: "18px",
                                      transform: "rotate(30deg)",
                                      cursor: "pointer"
                                    }}
                                    aria-describedby={"id"}
                                    onClick={(e: any) => {
                                      handleClickOpen7(e, j)
                                      setPopoverIndex(index)
                                    }
                                    }
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
                                                <IconButton>
                                                  {/*                                               
                                              <img
                                               src={Removeatt}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                                  {/* <img
                                                    src={Removeattnew}
                                                    onClick={() => deleteEmployeeMutation({
                                                      employee_id: employee_id,
                                                      name: k.remove
                                                    })} /> */}
                                                </IconButton>
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
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
                              </div>
                            </Stack>

                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography
            style={{
              paddingTop: "20px",
              color: "#717171",
              fontSize: "16px",
              fontFamily: "Arial",
            }}
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
    {/* <Tf1>
      <TextField
        fullWidth
        multiline
        InputProps={{ readOnly: true }}
        inputProps={{ maxLength: 256 }}
        size='small'
        key={j._id}
        value={j.value}
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
               lineHeight:"23px"
             }}>
               {j.value}
             </div>
          
         </Box>
  </>
);
})}
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
              {filterData1 &&
                filterData1.map((i: any, index: any) => {
                  console.log(i, "123");
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
                          width="140px"
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            wordBreak: "break-word",
                            lineHeight:"23px"
                          }}
                        >
                          {i[0]}
                        </TableCell>
                        <TableCell
                          align="left"
                          width="450px"
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            wordBreak: "break-word",
                            lineHeight:"23px"
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

                        {/* <TableCell
                          align="justify"
                          width="300px"
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            wordBreak: "break-word",
                          }}
                        > */}
                          {/* {employeeData.data.employee.objective_description[0].comments}  */}
                          {/* {i[1][0].employee_comments} */}
                        {/* </TableCell> */}
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
          {filterData2.length > 0 && (
            <div>
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
                      console.log(i, "123");
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
                              width="140px"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight:"23px"
                              }}
                            >
                              {i[0]}
                            </TableCell>
                            <TableCell
                              align="left"
                              width="450px"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight:"23px"
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
            </div>
          )}
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
          <Table
            size="small"
            style={{ marginTop: "10px" }}
          >
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
                          width="160px"
                          align="left"
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            wordBreak: "break-word",
                            lineHeight:"23px"
                          }}
                        >
                          {j?.name?.title}
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
                          width="200px"
                          align="left"
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            wordBreak: "break-word",
                            lineHeight:"23px"
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
                            lineHeight:"23px"
                          }}
                        >
                          {j?.justification}
                        </TableCell>
                        {/* <TableCell
                          width="300px"
                          align="justify"
                          style={{
                            fontSize: "14px",
                            color: "#333333",
                            fontFamily: "Arial",
                            wordBreak: "break-word",
                          }}
                        >
                          {j.employee_comments}
                        </TableCell> */}
                      </TableRow>
                    </>
                  );
                })}
            </TableBody>
          </Table>
          {Training1.length > 0 && (
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
                              align="left"
                              width="160px"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight:"23px"
                              }}
                            >
                              {j?.name?.name?.title}
                            </TableCell>
                            <TableCell
                              width="200px"
                              align="left"
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                wordBreak: "break-word",
                                lineHeight:"23px"
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
                                lineHeight:"23px"
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
            style={{
              fontSize: "16px",
              color: "#717171",
              fontFamily: "arial",
              paddingTop: "20px",
            }}
          >
            <b>Appraiser Overall Feedback</b>
          </Typography>
          <Typography
            style={{
              fontSize: "14px",
              color: "#333333",
              fontFamily: "arial",
              paddingTop: "10px",
            }}
          >
             <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
             
             <div style={{
               color: "#333333",
               fontSize: "14px",
               fontFamily: "arial",
               fontWeight: "400",
               textTransform: "none",
              //  padding: "8px",
               textAlign: "left",
               lineHeight:"23px"
             }}>
               {employeeData?.data?.appraisal?.appraiser_overall_feedback}
             </div>
          
         </Box>
            {/* <Tf1>
              <TextField
                fullWidth
                InputProps={{readOnly: true,}}
                multiline
                inputProps={{ maxLength: 500 }}
                size="small"
                value={
                  employeeData?.data?.appraisal?.appraiser_overall_feedback
                }
              />
            </Tf1> */}
        </Typography>
        {employeeData?.data?.appraisal?.status == "completed"  && ( 
          <>
          <Typography
            style={{
              fontSize: "16px",
              color: "#717171",
              fontFamily: "arial",
              paddingTop: "20px",
            }}
          >
            <b>Normalizer meeting notes</b>
          </Typography>
          <Typography
            style={{
              fontSize: "14px",
              color: "#333333",
              fontFamily: "arial",
              paddingTop: "10px",
            }}
          >
             <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
             
             <div style={{
               color: "#333333",
               fontSize: "14px",
               fontFamily: "arial",
               fontWeight: "400",
               textTransform: "none",
              //  padding: "8px",
               textAlign: "left",
               lineHeight:"23px"
             }}>
               {employeeData?.data?.normalizer?.normalizer_meeting_notes}
             </div>
          
         </Box>            
          </Typography>
          </>
         )}
          {/* {employeeData?.data?.reviewer?.reviewer_overall_feedback !== "" && (
            <>
              <Typography
                style={{ fontSize: "16px", color: "#717171", paddingBottom: "10px", paddingTop: "20px", fontFamily: "arial", wordBreak: "break-word" }}
              >
                <b>Reviewer Overall Feedback</b>
              </Typography> */}

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
                {/* <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
             
             <div style={{
               color: "#333333",
               fontSize: "14px",
               fontFamily: "arial",
               fontWeight: "400",
               textTransform: "none",
               padding: "8px",
               textAlign: "justify",
               lineHeight:"23px"
             }}>
             {employeeData?.data?.reviewer?.reviewer_overall_feedback}
             </div>
          
         </Box>
            </>
          )} */}
          {/* {employeeData?.data?.normalizer?.normalizer_overall_feedback !== "" && (
            <>
              <Typography
                style={{ fontSize: "16px", color: "#717171", paddingBottom: "10px", paddingTop: "20px", fontFamily: "arial", wordBreak: "break-word" }}
              >
                <b>Normalizer Overall Feedback</b>
              </Typography> */}

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
               {/* <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
             
             <div style={{
               color: "#333333",
               fontSize: "14px",
               fontFamily: "arial",
               fontWeight: "400",
               textTransform: "none",
               padding: "8px",
               textAlign: "justify",
               lineHeight:"23px"
             }}>
           {employeeData?.data?.normalizer?.normalizer_overall_feedback}
             </div>
          
         </Box>
            </>
          )} */}
          <Typography
            style={{
              fontSize: "16px",
              color: "#717171",
              fontFamily: "arial",
              paddingTop: "20px",
            }}
          >
            <b>Employee Comments</b>
          </Typography>
          <Typography
            style={{
              fontSize: "14px",
              color: "#333333",
              fontFamily: "arial",
              paddingTop: "10px",

            }}
          >
              <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>
             
             <div style={{
               color: "#333333",
               fontSize: "14px",
               fontFamily: "arial",
               fontWeight: "400",
               textTransform: "none",
              //  padding: "8px",
              height:"20px",
               textAlign: "left",
               lineHeight:"23px"
             }}>
         {employeeData?.data?.employee?.comments}
             </div>
          
         </Box>
            {/* <Tf1>
              <TextField
                fullWidth
                InputProps={{readOnly: true,}}
                multiline
                inputProps={{ maxLength: 500 }}
                size="small"
                value={employeeData?.data?.employee?.comments}
              />
            </Tf1> */}
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "55px",
              paddingBottom: "30px",
            }}
          >
            {/* <Button
              style={{
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "Arial",
                borderColor: "#3E8CB5",
                background: "transparent",
                height: "35px",
                width: "70px",
                color: "#3e8cb5",
              }}
              variant="outlined"
              onClick={() => { navigate(-1) }}
            >
              Back
            </Button> */}
          </div>
        </Box>
      </Container>
    </div>
  );
}

function ratingScaleData(ratingScaleData: any, arg1: string) {
  throw new Error("Function not implemented.");
}
