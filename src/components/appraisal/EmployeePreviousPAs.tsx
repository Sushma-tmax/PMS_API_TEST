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
  FormGroup,
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  OutlinedInput,
  SelectChangeEvent,
} from "@mui/material";
// import dayjs from "dayjs";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Removeattnew from "../../assets/Images/Removeattnew.svg";
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
import { useParams, useNavigate, useLocation } from "react-router-dom";
import _, { indexOf } from "lodash";
import html2canvas from "html2canvas";

import { jsPDF } from "jspdf";
import { EMPLOYEE_PREVIOUS_PA_NO_CALENDAR, EMPLOYEE_REJECTS } from "../../constants/routes/Routing";
import dayjs from "dayjs";
import { SpaceBarRounded } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import Infoicon from "../../assets/Images/Infoicon.svg";
import { useDeleteRatingScaleMutation } from "../../service/ratings/ratings";
import Popover from "@mui/material/Popover";
import { Scrollbar } from "react-scrollbars-custom";
import Downloadss from "../../assets/Images/Downloadss.svg";
import { fontFamily } from "@mui/system";
import { PDFExport } from "@progress/kendo-react-pdf";
import { useGetClosedCalenderQuery } from "../../service/calender/Calender";
import { useGetPreviousAppraisalEmployeeQuery, useGetpastAppraisalDetailsofEmployeeQuery } from "../../service/employee/previousAppraisal";
import AlertDialogSuccess from "../UI/DialogSuccess";

const Labels = styled("div")({
  fontSize: "14px",
  color: "#333333",
  // opacity: 0.84,
  marginLeft: "2px",
});

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
const RatingBackground = styled("div")({
  width: "27px",
  lineHeight: "27px",
  borderRadius: "50%",
  display: "block",
  // color: "white",  background: "red",
});
export default function EmployeePreviousPAs(props: any) {
  const { appraisalData } = props;
  const location: any = useLocation();
  const { employeeCodeFromLanding, calendarTypeFrom, yearFrom, previousCalendarData } = location?.state;
  const pdfExportComponent = React.useRef<PDFExport>(null)
  const { data: ratingScaleData } = useGetRatingScaleQuery("");
  console.log(ratingScaleData, "ratingScaleData");
  console.log(employeeCodeFromLanding, calendarTypeFrom, yearFrom, "employeeCodeFromLanding");

  const { employee_id } = useParams();
  // console.log(employee_id ,'employee_id ')
  const { data } = useGetObjectiveTypeQuery("");
  const { data: objectiveTitleData } = useGetObjectiveTitleQuery("");
  const { data: objectiveDescData, isLoading: isLoadingDescription } =
    useGetObjectiveDescriptionQuery("");
  // const { data: empData, isLoading } =
  //   useGetEmployeeAppraisalQuery(employee_id);

  const { data: ratingData } = useGetRatingScaleQuery("");
  const { data: closedCalendarData } = useGetClosedCalenderQuery("")
  // const { data: employeeData } = useGetpastAppraisalDetailsofEmployeeQuery(employee_id)
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

  const CustomScrollbar = Scrollbar as any;

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

  const [popoverIndex, setPopoverIndex] = useState<any>("")
  const [popoverIndex1, setPopoverIndex1] = useState<any>("")
  const [showRenormalizedData, setShowRenormalizedData] = useState<any>(false)
  const [appraiserChecked, setAppraiserChecked] = useState(false);
  const [reviewerChecked, setReviewerChecked] = useState(false);
  const [employeeChecked, setEmployeeChecked] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number>();
  const [selectedCalendar, setSelectedCalendar] = useState<any>()
  const [viewSelectedCalendar, setViewSelectedCalendar] = useState<any>()
  const [active, setActive] = useState<any>("")
  const [employeeCode, setEmployeeCode] = useState<any>(1012);
  const [showEmployeeData, setShowEmployeeData] = useState(false);
  // const { data: employeeData } = useGetPreviousAppraisalEmployeeQuery({ employeeCode: employeeCodeFromLanding, calendarId: viewSelectedCalendar })
  const { data: employeeDataInitial } = useGetPreviousAppraisalEmployeeQuery({ employeeCode: employeeCodeFromLanding, calendarId: selectedCalendar })
  const [employeeData, setEmployeeData] = useState<any>()

  console.log(employeeData, employeeDataInitial, 'previousAppraisalData');
  console.log(employeeCodeFromLanding, viewSelectedCalendar, 'employeeCode');


  // to display only re-normalized rating and comments (after mediation and renormalization)
  useEffect(() => {
    if (employeeData) {
      if (employeeData?.employee?.normalizer?.normalizer_status == "re-normalized") {
        setShowRenormalizedData(false)
      } else {
        setShowRenormalizedData(true)
      }
      setAppraiserChecked(
        employeeData?.employee?.normalizer?.isAppraiserChecked
      );
      setReviewerChecked(
        employeeData?.employee?.normalizer?.isReviewerChecked
      );
      setEmployeeChecked(
        employeeData?.employee?.normalizer?.isEmployeeChecked
      );

    }
  }, [employeeData])
  // ratingScaleData
  const [ratingdefenition, setratingdefenition] = useState<any>();
  const [ratingscaledef, setratingscaledef] = useState<any>();

  useEffect(() => {
    const Overall_rating = employeeData?.data?.current_rating?.overall_rating
    const RatinGscale = ratingScaleData?.data?.map((j: any) => ({
      rating: j?.rating,
      definition: j?.definition,
      rating_titile: j?.rating_scale,
    }))
    const FilteredRatingScale = RatinGscale?.filter((item: any) => {
      if ((item?.rating > 0 && item?.rating <= 1.99) && (Overall_rating > 0 && Overall_rating <= 1.99)) {
        return {
          // item?.definition;
          ratingScale: item?.rating_titile,
          definition: item?.definition,
        }
      } else if ((item?.rating >= 2 && item?.rating <= 2.49) && (Overall_rating >= 2 && Overall_rating <= 2.49)) {
        return {
          // item?.definition;
          ratingScale: item?.rating_titile,
          definition: item?.definition,
        }
      } else if ((item?.rating >= 2.5 && item?.rating <= 2.99) && (Overall_rating >= 2.5 && Overall_rating <= 2.99)) {
        return {
          // item?.definition;
          ratingScale: item?.rating_titile,
          definition: item?.definition,
        }
      } else if ((item?.rating >= 3 && item?.rating <= 3.49) && (Overall_rating >= 3 && Overall_rating <= 3.49)) {
        return {
          // item?.definition;
          ratingScale: item?.rating_titile,
          definition: item?.definition,
        }
      } else if ((item?.rating >= 3.5 && item?.rating <= 3.99) && (Overall_rating >= 3.5 && Overall_rating <= 3.99)) {
        return {
          // item?.definition;
          ratingScale: item?.rating_titile,
          definition: item?.definition,
        }
      } else if ((item?.rating >= 4 && item?.rating <= 4.49) && (Overall_rating >= 4 && Overall_rating <= 4.49)) {
        return {
          // item?.definition;
          ratingScale: item?.rating_titile,
          definition: item?.definition,
        }
      } else if ((item?.rating >= 4.5 && item?.rating <= 4.99) && (Overall_rating >= 4.5 && Overall_rating <= 4.99)) {
        return {
          // item?.definition;
          ratingScale: item?.rating_titile,
          definition: item?.definition,
        }
      } else if ((item?.rating >= 5.0) && (Overall_rating >= 5.0)) {
        return {
          // item?.definition;
          ratingScale: item?.rating_titile,
          definition: item?.definition,
        }
      }
    })
    if (FilteredRatingScale && FilteredRatingScale.length > 0) {
      setratingdefenition(FilteredRatingScale[0]?.definition);
      setratingscaledef(FilteredRatingScale[0]?.rating_titile)
    } else {
      // Handle the case when FilteredRatingScale is empty
      // setratingdefenition("No rating definition found");
    }
    console.log(RatinGscale, FilteredRatingScale, ratingscaledef, ratingdefenition, "Overall_ratingg")

  }, [ratingScaleData, employeeData])
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
    if (employeeData && objectiveTitleData && objectiveDescData) {
      // setObjectiveDescription(() => {
      //   return employeeData?.employee?.objective_description?.map(
      //     (i: any) => {
      //       return {
      //         ...i,
      //         objective_title: findObjectiveTitleById(i?.name?.objective_title),
      //         objective_type: findObjectiveTypeById(i?.name?.objective_type),
      //       };
      //     }
      //   );
      // });
      setObjectiveDescription(() => {

        let findObjectiveTypeByName: any = (ObjectiveTitleName: any) => {
          return objectiveDescData?.data?.find((item: any) => item.objectiveTitle === ObjectiveTitleName)?.objective_type?.name
        }
        // employeeData?.employee?.objective_type?.find((i: any, index: any) => index == index1)?.objective_type
        // ?.objective_type?.name


        return employeeData?.employee?.objective_description?.map(
          (i: any, index1: any) => {
            return {
              ...i,
              objective_title: i.objectiveTitle,
              // objective_type: findObjectiveTypeById(index1),
              objective_type: findObjectiveTypeByName(i.objectiveTitle),
            };
          }
        );
      });
      setAppraiserAreaofImprovement(
        employeeData?.employee?.area_of_improvement
      );
      setEmployeeTrainingRecommendations(
        employeeData?.employee?.employee?.training_recommendation
      );
      setAppraiserTrainingRecommendations(
        employeeData?.employee?.appraisal?.training_recommendation
      );
      setEmployeeComments(employeeData?.employee?.employee?.comments);
      let objectiveType = employeeData?.employee?.objective_type?.map((item: any, index: number) => {
        return {
          objective_type: item?.name?.name,
          color: Colors[index]
        }
      })
      console.log(objectiveType, "objectiveType")
      setColorarray(objectiveType)
    }
  }, [employeeData, objectiveTitleData, objectiveDescData]);
  const [employeecode, setemployeecode] = useState<any>([])
  useEffect(() => {
    setemployeecode(employeeData?.employee?.employee_code)

  }, [employeeData])
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

  const [anchorEl1, setAnchorEl1] = React.useState<HTMLButtonElement | null>(
    null
  );
  const openInfo1 = Boolean(anchorEl1);
  const id3 = openInfo1 ? "simple-popover" : undefined;
  const handleClickInfo1 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleCloseInfo1 = () => {
    setAnchorEl1(null);
  };

  useEffect(() => {
    if (employeeData) {
      let areaLength = employeeData?.employee?.area_of_improvement?.length;
      if (areaLength > 0) {
        setShowArea(true)
      } else {
        setShowArea(false)
      }
    }
  }, [employeeData])


  // useEffect(() => {
  //   if (employeeData && employeeData?.employee) {
  //     const appraiserAreaOfImprovement =
  //       employeeData?.employee?.appraisal?.area_of_improvement;
  //     const group = _.groupBy(appraiserAreaOfImprovement, "value");
  //     const groupName = groupNAmeHandler(Object.entries(group));
  //   }
  // }, [appraiserAreaofImprovement]);
  //mapping area of recommendation
  //mapping training recommendations
  const [Training, setTraining] = React.useState<any>([]);
  const [showTrainingRecommendation, setShowTrainingRecommendation] = useState(false)

  console.log(Training, "Trainingstate");
  useEffect(() => {
    if (employeeData) {

      let trainingLength: any = employeeData?.employee?.training_recommendation?.length
      if (trainingLength && trainingLength > 0) {
        setShowTrainingRecommendation(true)
      } else {
        setShowTrainingRecommendation(false)
      }
      setTraining(() => {
        return employeeData?.employee?.training_recommendation?.map(
          (i: any) => {
            console.log(i, "Training");
            return {
              ...i,
              title: i.title,
              justification: i.justification,
              trainingName: i.training_name,
              definition: i.definition
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
  // const findObjectiveTypeById = (id: any) => {
  //   if (employeeData) {
  //     return employeeData?.employee?.reviewer?.objective_type.find(
  //       (item: any) => item.name._id === id
  //     );
  //   }
  // };

  const [filterData1, setFilterData1] = useState([]);
  const [showArea, setShowArea] = useState(false)

  console.group(filterData1, "filterData1");
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
  const [anchorEl9, setAnchorEl9] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl8, setAnchorEl8] = React.useState<HTMLButtonElement | null>(
    null
  );
  // const [position, setPosition] = useState<any>(false);
  const open6 = Boolean(anchorEl6);
  const open10 = Boolean(anchorEl9);
  const open8 = Boolean(anchorEl8);
  const handleClickOpen6 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {
    setappraisalAttachments(
      employeeData &&
      employeeData?.employee?.appraisal?.attachments
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


  const handleClickOpen9 = (
    event: React.MouseEvent<HTMLButtonElement>,
    j: any
  ) => {

    // setPosition(appraisalAttachments);
    // (employeeData &&
    //   employeeData?.data?.appraisal?.attachments
    //   .map((k: any) =>{ return <div><a href={k.url}> {k.name} </a><br/></div>}))
    // setOpen2(true);

    setAnchorEl9(event.currentTarget);
  };

  const handleClickOpen8 = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl8(event.currentTarget);
  };

  const handleClose6 = () => {
    setAnchorEl6(null);
    // setOpen2(false);
  };

  const handleClose9 = () => {
    setAnchorEl9(null);
    // setOpen2(false);
  };

  const handleClose8 = () => {
    setAnchorEl8(null);
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
      employeeData?.employee?.employee?.attachments
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
      employeeData?.employee?.normalizer?.area_of_improvement[0]?.specific_actions.map(
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
        employeeData?.employee?.normalizer?.objective_description,
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

    // const data = await html2canvas(
    //   document.getElementById("pdf") as HTMLElement
    // );
    const element = document.getElementById("pdf")!;
    const data = await html2canvas(element, {
      backgroundColor: "none",
      logging: true,
      useCORS: true //to enable cross origin perms
    });
    const base64image = data.toDataURL("image/png")

    const img = data.toDataURL("image/png");

    const imgProperties = pdf.getImageProperties(base64image);

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
        employeeData?.employee?.employee?.area_of_improvement;
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

  const findTrainingName = (id: any) => {
    if (employeeData) {
      return employeeData?.employee?.appraisal_template?.training_recommendation.find((i: any) =>
        i.name._id == id);
    }
  }

  useEffect(() => {
    if (employeeData) {
      setTraining1(() => {
        return employeeData?.employee?.employee?.training_recommendation?.map(
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
    if (employeeData && employeeData.employee) {
      const employeeTrainingRecommendations =
        employeeData?.employee?.employee?.training_recommendation;
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
      // createPDF();
      if (pdfExportComponent.current) {
        pdfExportComponent.current.save();
      }
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



  // const getAttachments = (id: any) => {
  //   console.log(id, "id for attachmetns ");

  //   return employeeData?.employee?.appraisal?.attachments
  //     .filter((i: any) => i?.objective_description == id)
  //     .map((k: any) => {
  //       console.log(k, "zzzzz");
  //       return {
  //         resp: (
  //           <div>
  //             {" "}
  //             <a href={k.url}> {k.name} </a> <br />
  //           </div>
  //         ),
  //         remove: k.name,
  //       };
  //       // return k.name
  //     });
  // };

  // const getAttachmentsNormalizer = (id: any) => {
  //   // console.log(id, "id for attachmetns ");

  //   return employeeData?.employee?.normalizer?.attachments
  //     .filter((i: any) => i?.objective_description == id)
  //     // .filter((i: any) => i?.objective_description === j.name._id)
  //     .map((k: any) => {
  //       // console.log(k, "zzzzz");
  //       return {
  //         resp: (
  //           <div>
  //             {" "}
  //             <a href={k.url}> {k.name} </a> <br />
  //           </div>
  //         ),
  //         remove: k.name,
  //       };
  //       // return k.name
  //     });
  // };
  const getAppraiserRejectionAttachments = (id: any) => {
    console.log(id, "id for attachmetns ");

    return employeeData?.employee?.appraisal?.rejection_attachments
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

    return employeeData?.employee?.employee?.attachments
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
      employeeData?.employee?.feedback_questions
    )

  }, [employeeData])
  //infoicon popover
  const [openValidation, setOpenValidation] = useState(false);
  const [activeObjectiveId, setActiveObjectiveId] = useState<any>();
  const [activeObjectiveId2, setActiveObjectiveId2] = useState<any>();
  //const [popoverIndex, setPopoverIndex] = useState<any>("");
  const [anchorEl01, setAnchorEl01] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl02, setAnchorEl02] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [anchorEl10, setAnchorEl10] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open11 = Boolean(anchorEl10);
  const openInfo101 = Boolean(anchorEl01);
  const openInfo102 = Boolean(anchorEl02);
  const id101 = openInfo101 ? "simple-popover" : undefined;
  const id10 = open11 ? "simple-popover" : undefined;
  const handleClickInfo11 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl01(event.currentTarget);

  };
  const handleClick10 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl10(event.currentTarget);
  };
  const handleClose101 = () => {
    setAnchorEl01(null);
  };
  const handleClose10 = () => {
    setAnchorEl10(null);
  };
  const id102 = openInfo102 ? "simple-popover" : undefined;
  const handleClickInfo12 = (event: React.MouseEvent<HTMLButtonElement>) => {
    // setAnchorEl(event.currentTarget);
    setAnchorEl02(anchorEl02 ? null : event.currentTarget);
  };
  const handleClose102 = () => {
    setAnchorEl02(null);
  };

  // previous rating
  const [anchorPreviousRatingPopOver, setAnchorPreviousRatingPopOver] = React.useState<HTMLElement | null>(
    null
  );
  const openPreviousRating = Boolean(anchorPreviousRatingPopOver);
  const id_Previous_Rating = openPreviousRating ? "simple-popover" : undefined;

  const handlePreviousRatingPopOverClose = () => {
    setAnchorPreviousRatingPopOver(null)
  }

  const handlePreviousRatingPopOverOpen = (event: React.MouseEvent<HTMLElement>, j: any) => {
    setAnchorPreviousRatingPopOver(event.currentTarget);
  };
  //infoicon popover

  const ITEM_HEIGHT = 28;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        //  maxWidth: 140,
      },
    },
  };

  // // function to take calendar input for only year
  // let CalendarDataClosedTemp = closedCalendarData?.data?.map((j: any) => {
  //   return {
  //     PAlaunch: j?.pa_launch?.substring(0, 4),
  //   }
  // }).filter((value: any, index: any, self: any) => {
  //   return self.indexOf(value) === index;
  // });

  const handleYearChange = (event: any) => {
    console.log(event.target.value, 'eventyear')
    setSelectedYear(event.target.value);
  };

  // function to select a initial calendar
  const initialYear = closedCalendarData?.data?.map((j: any) => {
    return j?.pa_launch?.substring(0, 4)
  })

  // function to select a calendar type from the dropdown
  // const filteredCalendar = closedCalendarData?.data?.filter((item: any) => {
  //   const year = item.pa_launch?.substring(0, 4);
  //   // if (selectedYear == null || selectedYear == undefined) {
  //   //   setSelectedYear(initialYear[0])
  //   // }
  //   return year === selectedYear;
  // });

  //  if no calendar year selected , then set the latest calendar year
  // useEffect(() => {
  //   if (initialYear && (selectedYear == null || selectedYear == undefined)) {
  //     setSelectedYear(initialYear[0])
  //   }
  // }, [initialYear, selectedYear])

  // if no calendar type selected then select the latest calendar type
  // useEffect(() => {
  //   if (closedCalendarData) {
  //     let tempCalendar = closedCalendarData?.data[0]?._id
  //     console.log(tempCalendar, 'tempCalendar')
  //     setSelectedCalendar(tempCalendar);  
  //     // setViewSelectedCalendar(tempCalendar)    
  //   }
  // }, [closedCalendarData])

  // useEffect(() => {
  //   if(selectedCalendar) {
  //     setViewSelectedCalendar(selectedCalendar)
  //   }
  // },[])

  /* If no calendar is selected bydefault calendarFrom will be selected */



  useEffect(() => {

    if (calendarTypeFrom) {
      setSelectedCalendar(calendarTypeFrom);
      setEmployeeData(previousCalendarData);
      setShowEmployeeData(true)
      // setViewSelectedCalendar(calendarTypeFrom);     
    }


  }, [calendarTypeFrom])

  /* If no year is selected bydefault yearFrom will be selected */

  useEffect(() => {
    if (yearFrom) {
      setSelectedYear(yearFrom);
    }
  }, [yearFrom])

  useEffect(() => {
    if (employeeData == undefined) {
      setEmployeeData(employeeDataInitial)
    }
  }, [employeeDataInitial])

  // useEffect(() => {
  //   console.log("working")
  //    if (calendarTypeFrom && employeeData?.employee?.appraisal?.status !== "completed" ) {   
  //     navigate(`${EMPLOYEE_PREVIOUS_PA_NO_CALENDAR}/employee/${employee_id}`,
  //     {state : {appraisalNotCompleted : true}})
  //   }
  // },[calendarTypeFrom, employeeData])

  const handleCalendarTypeChange = (event: SelectChangeEvent) => {
    console.log(event.target.value, 'calendarTypeee')
    setSelectedCalendar(event.target.value as string)
  };

  // navigate to other screen to view previous appraisal related to employee code and calendar Id 
  const viewPreviousAppraisal = () => {
    // if (((employeeData?.employee?.employee_code !== "" || 
    // employeeData?.employee?.employee_code !== undefined) && employeeData?.employee?.appraisal?.status === "completed") && employeeCode && selectedCalendar) {    

    if (((employeeDataInitial?.employee?.employee_code !== "" ||
      employeeDataInitial?.employee?.employee_code !== undefined) && employeeDataInitial?.employee?.appraisal?.status === "completed") && employeeCode && selectedCalendar) {
      // setViewSelectedCalendar(selectedCalendar)
      setEmployeeData(employeeDataInitial)
      setShowEmployeeData(true);
    }
    else {
      setShowEmployeeData(false);
      navigate(`${EMPLOYEE_PREVIOUS_PA_NO_CALENDAR}/employee/${employee_id}`,
        { state: { appraisalNotCompleted: true } })
    }

    // if (employeeData?.employee === undefined) {
    //   setOpenValidation(true);
    // } else {
    //   setOpenValidation(false);
    // }

    // if (employeeData?.employee === undefined) {
    //   setTimeout(() => {
    //     console.log("empty")
    //     setOpenValidation(true);
    //   }, 5000);
    // } else {
    //   setTimeout(() => {
    //     setOpenValidation(false);
    //   }, 5000);
    // }


  }
  console.log(employeeData?.employee, "kkkkkkkkkkkkkk")
  // useEffect(()=>{
  //   if(activeCalendar == "" || activeCalendar == undefined){
  //     setActive(closedCalendarData?.data[0]?.calendar_type)
  //   }else{
  //     setActive(activeCalendar)
  //   }
  //   setYear((new Date().getFullYear()))
  // },[activeCalendar,closedCalendarData])

  //  to convert date dd/mm/yyyy format to mm/dd/yyyy
  const date = new Date(employeeData?.data?.employee?.one_to_one_meeting?.slice(0, 10));
  const One_To_One_Meeting_Date = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const handleValidationClose = () => {
    setOpenValidation(false);
    // setMessage("")
  }
  return (

    <PDFExport
      paperSize="A4"
      scale={0.48}
      keepTogether="p"
      forcePageBreak=".page-break" ref={pdfExportComponent}
      fileName={`PA_${employeecode}.pdf`}>
      <div
        // id="pdf"
        style={{
          backgroundColor: "#F1F1F1",
          // height: "1500px",
          minHeight: "100px",
          overflow: "hidden",
        }}
      >

        <Box
          sx={{
            // maxWidth: "95% !important",
            // height: "1200px",
            background: "#fff",
            marginTop: "35px",
            minHeight: "100px",
            overflow: "hidden",
            marginLeft: "25px",
            marginRight: "25px"
          }}
        >
          <Box
            id="pdf"
            style={{
              padding: "35px",
            }}
          >

            {/* <Stack
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
              paddingBottom="10px"
              gap={3}
              paddingRight="10px"
            > */}
            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}> */}
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
                Welcome to Performance Appraisal
              </Typography>

              {/* </Stack> */}
              <span style={{ paddingRight: "10px" }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" gap={3}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" gap={1}>

                    <div>
                      <FormControl size="small" sx={{ minWidth: 140 }}>
                        <InputLabel
                          sx={{
                            "& .MuiInputLabel-root": {
                              fontSize: "14px !important",
                              fontFamily: "Arial !important",
                              color: "#333333 !important",
                            },
                          }}
                          id="demo-multiple-checkbox-label"
                        >
                          Year
                        </InputLabel>
                        <Select
                          labelId="demo-select-small"
                          id="demo-select-small"
                          MenuProps={MenuProps}
                          //  defaultValue={2023}
                          input={<OutlinedInput label="Year" />}
                          sx={{
                            "& .MuiInputBase-input": {
                              fontSize: "14px",
                              textTransform: "none",
                              fontFamily: "Arial",
                              color: "#333333",
                            },
                          }}
                          value={Number(selectedYear)}
                          // value={selectedYear}
                          onChange={handleYearChange}
                        >

                          {closedCalendarData && closedCalendarData.data
                            .map((j: any) => j.pa_launch.slice(0, 4))
                            .filter((value: any, index: any, self: any) => {
                              return self.indexOf(value) === index;
                            })
                            .map((j: any) => {
                              return (
                                <MenuItem
                                  sx={{
                                    padding: "0px",
                                    paddingLeft: "12px",
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",

                                  }}
                                  // value={j.pa_launch?.slice(0, 4)}
                                  value={j}
                                >
                                  {j}
                                </MenuItem>

                              );
                            })}


                        </Select>
                      </FormControl>
                    </div>
                  </Stack>
                  <div>


                    <FormControl size="small" sx={{ minWidth: 140 }}>
                      <InputLabel
                        sx={{
                          "& .MuiInputLabel-root": {
                            fontSize: "14px !important",
                            fontFamily: "Arial !important",
                            color: "#333333 !important",
                          },
                        }}
                        id="demo-multiple-checkbox-label"
                      >
                        Calendar
                      </InputLabel>


                      <Select
                        labelId="demo-select-small"
                        id="demo-select-small"
                        MenuProps={MenuProps}
                        input={<OutlinedInput label="Calendar" />}
                        sx={{
                          "& .MuiInputBase-input": {
                            fontSize: "14px",
                            textTransform: "none",
                            fontFamily: "Arial",
                            color: "#333333",
                          },
                        }}

                        value={String(selectedCalendar)}
                        onChange={handleCalendarTypeChange}
                      >

                        {closedCalendarData?.data?.map((j: any) => {
                          return (
                            <MenuItem
                              sx={{
                                padding: "0px",
                                paddingLeft: "12px",
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",

                              }}
                              value={j?._id}
                            >
                              {j?.calendar_type}
                            </MenuItem>

                          );

                        })}
                      </Select>


                    </FormControl>

                  </div>
                 

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
                      viewPreviousAppraisal()
                    }}
                  >
                    {/* <img src={Downloadss} alt="Download" /> */}
                    <label style={{
                      // paddingLeft: "5px",
                      cursor: "pointer",
                    }}> View </label>
                  </Button>
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
                          // marginRight: "63px",
                        }}
                      >
                         
                          <label 
                          onClick={() => {
                            handleHide()
                          }}>  
                          <img 
                          style={{
                            width:"15px",
                          height:"15px",
                          cursor:"pointer"
                        }} 
                          src={Downloadss} alt="Download"
                           /> 
                           </label>
                        </Button>
                      )}
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

              </span>
            </Stack>


            <AlertDialogSuccess
              isAlertOpen={openValidation}
              handleAlertClose={handleValidationClose}>
              There is no data in the chosen calendar.

            </AlertDialogSuccess>


            {showEmployeeData && employeeData?.employee !== undefined && (
              <>
                <Box sx={{ backgroundColor: "#f3fbff", paddingLeft: "10px" }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <div>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Typography
                          style={{ paddingTop: "20px", paddingBottom: "20px" }}
                        >
                          {/* <Avatar sx={{ width: 60, height: 60 }}>A</Avatar> */}
                          {employeeData?.employee?.profile_image_url != undefined ? (
                            <img style={{ width: "55px", borderRadius: "30px", height: "55px" }} src={employeeData?.employee?.profile_image_url} />
                          ) : (
                            <Avatar style={{ width: "55px", height: "55px" }}>
                              {employeeData?.employee?.first_name?.substring(0, 1)}
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
                            {employeeData?.employee?.first_name}
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
                            {employeeData?.employee?.position_long_description}{" "}
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
                            Grade {employeeData?.employee?.grade}{" "}
                          </span>


                          <span
                            style={{
                              opacity: "50%",
                              fontSize: "12px",
                              fontFamily: "Arial",
                              marginTop: "5px",
                            }}
                          >
                            {employeeData?.employee?.employee_code}
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
                        alignItems="center"
                        // gap="8px"
                        paddingRight="10px"
                        paddingBottom="15px"
                      >
                        <Typography
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
                                //  left:"840px !important"
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
                          style={{
                            // paddingLeft: "22px",
                            fontSize: "16px",
                            color: "#333333",
                            paddingTop: "1px",
                          }}
                        >
                          {/* <b>{employeeData?.data?.appraisal?.pa_rating}</b> */}
                          {/* <b>  {(employeeData?.employee?.employee?.employee_status == "pending" || 
                       employeeData?.employee?.employee?.employee_status == "draft") ? 
                      (employeeData?.employee?.current_rating?.overall_rating) :
                      (employeeData?.employee?.employee?.employee_rating) }</b> */}
                          {ratingdefenition?.length > 0 &&
                            <IconButton sx={{padding:"4px"}} onClick={handleClick22} >
                              <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                            </IconButton>
                          }
                          <b>{parseFloat(employeeData?.employee?.overall_rating)?.toFixed(2)}</b>
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
                        {/* {employeeData?.employee?.calendar?.name} */}
                        {(closedCalendarData?.data?.find((item: any) => item._id === employeeData?.employee?.calendar)?.name)}
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
                        {(employeeData?.employee?.appraisal?.potential !== "" &&
                          employeeData?.employee?.appraisal?.potential !== undefined) && (
                            <Stack direction="column" alignItems="center">
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
                                {employeeData?.employee?.appraisal?.potential}
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
                  style={{ fontSize: "20px", color: "#3E8CB5", fontFamily: "Arial", paddingBottom: "20px" }}
                >
                  Performance Appraisal Summary
                </Typography>
                <Stack direction="row" alignItems="center">
                <IconButton sx={{padding:"4px"}} aria-describedby={id2} onClick={handleClick}>
                    <img style={{ width: "12px" }} src={Infoicon} alt="icon" />
                  </IconButton>
                <Typography
                  style={{ color: "#3e8cb5", fontSize: "16px", fontFamily: "Arial" }}
                > 
                  <b>Ratings</b>
                  </Typography>
                  </Stack>
                  <Popover
                    id={id2}
                    open={open2}
                    anchorEl={anchorEl}
                    onClose={handleClose}
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
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {employeeData &&
                                employeeData?.employee?.rating_scale
                                  ?.slice()
                                  ?.sort(function (a: any, b: any) {
                                    return a.rating - b.rating;
                                  })
                                  ?.map((row: any, index: any) => {
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
                        </CustomScrollbar>
                      </Scroll>
                    </TableContainer>
                  </Popover>
                <TableContainer sx={{ width: "100%", paddingTop: "10px" }}>
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
                          width="180px"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          Objective<br /> Type
                        </TableCell>
                        <TableCell
                          width="150px"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          Objective<br /> Title
                        </TableCell>
                        <TableCell
                          width="50px"
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
                        {/* {showRenormalizedData && ( */}
                        <TableCell
                          width="50px"
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          Appraiser<br /> Rating
                        </TableCell>
                        {/* )} */}

                        {/* {showRenormalizedData && ( */}

                        {employeeData?.employee?.objective_description?.filter((item: any) =>
                          item.comments !== "" && item.comments !== undefined)?.length > 0 &&
                          (<TableCell
                            width="225px"
                            sx={{
                              fontFamily: "Arial",
                              borderColor: "#F7F9FB",
                              color: "#3E8CB5",
                              fontSize: "14px",
                              fontWeight: "600",
                            }}
                            align="center"
                          >
                            Appraiser<br /> Comments
                          </TableCell>)}
                        {/* )} */}

                        {/* {showRenormalizedData && employeeData?.employee?.appraisal?.objective_description?.filter((item: any) =>
                    (item.rating_rejected == true || (item.rating_resubmitted == true &&                      
                      employeeData?.employee?.appraisal?.status !== "rejected"))).length > 0 && ( */}
                        {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          borderColor: "#F7F9FB",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Appraiser<br /> Rejection Reason
                      </TableCell> */}
                        {/* )} */}

                        {/* {showRenormalizedData && employeeData?.employee?.employee?.objective_description?.filter((item: any) =>
                    item.rating_rejected == true).length > 0 && ( */}
                        {/* <TableCell
                        sx={{
                          fontFamily: "Arial",
                          borderColor: "#F7F9FB",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontWeight: "600",
                        }}
                        align="center"
                      >
                        Employee<br /> Rating
                      </TableCell> */}
                        {/* )} */}
                        {/* {showRenormalizedData && employeeData?.employee?.employee?.objective_description?.filter((item: any) =>
                    item.rating_rejected == true).length > 0 && ( */}
                        {/* <TableCell
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
                      </TableCell> */}
                        {/* )} */}
                        {/* {employeeData?.employee?.appraisal?.status == "completed" &&
                    employeeData?.employee?.normalizer?.normalizer_status == "re-normalized" && ( */}
                        <>
                          {/* <TableCell
                          sx={{
                            fontFamily: "Arial",
                            borderColor: "#F7F9FB",
                            color: "#3E8CB5",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                          align="center"
                        >
                          Re-normalized<br /> Rating
                        </TableCell> */}
                          {/* {employeeData?.employee?.normalizer?.objective_description?.filter((item: any) =>
                          item.rating_rejected == true).length > 0 && ( */}
                          {/* <TableCell
                              sx={{
                                fontFamily: "Arial",
                                borderColor: "#F7F9FB",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="center"
                            >
                              Normalizer<br /> Comments
                            </TableCell> */}
                          {/* )} */}
                        </>
                        {/* )} */}
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
                                    border: "1px solid #80808014 ",
                                    boxShadow: "1px 0px 0px 1px #80808014",
                                    borderBottom: "none",
                                    borderLeft: "0px",
                                    borderTop: "0px"
                                  },
                                }}
                              >
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    backgroundColor: colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name) != undefined ? colorarray.find((item: any) => item.objective_type == j?.objective_type?.name?.name)?.color : Colors[0],
                                  }}
                                  align="left"
                                >
                                  {j?.objective_type}
                                  {/* Knowledge of the job */}
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    background: "#ffffff",
                                  }}
                                  align="left"
                                >
                                  {/* Quality of Work */}
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
                                      {j?.objective_title}
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
                                    <Typography
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "arial",
                                        padding: "5px",
                                      }}
                                    >
                                      {/* {openInfo101 &&
                                        activeObjectiveId &&
                                        j._id === activeObjectiveId &&
                                        j?.name?.description} */}
                                      {j.description}
                                    </Typography>
                                  </Popover>
                                </TableCell>
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    textAlign: "center",
                                    background: "#fbfbfb",
                                    // fontFamily: "regular"
                                  }}
                                  align="left"
                                >
                                  <Stack direction="row" alignItems="center" justifyContent="center" >
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
                                      <span>L1 </span>{" "}
                                      <span>
                                        {/* {j?.name?.level_1?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_2_isChecked && (
                                    <>
                                      <span>L2 </span>{" "}
                                      <span>
                                        {/* {j?.name?.level_2?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_3_isChecked && (
                                    <>
                                      <span>L3 </span>{" "}
                                      <span>
                                        {/* {j?.name?.level_3?.level_definition} */}
                                      </span>
                                    </>
                                  )}
                                  {j.level_4_isChecked && (
                                    <>
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
                                                  <span>
                                                    <b>{
                                                      j?.level_1
                                                        ?.level_definition
                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
                                                    {j?.level_1?.behavioral_objective.map(
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
                                                      j?.level_2
                                                        ?.level_definition
                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
                                                    {j?.level_2?.behavioral_objective.map(
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
                                                      j?.level_3
                                                        ?.level_definition
                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
                                                    {j?.level_3?.behavioral_objective.map(
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
                                                      j?.level_4
                                                        ?.level_definition
                                                    }</b>
                                                  </span>
                                                  <br />
                                                  <ul style={{ marginTop: "0px", marginBottom: "0px" }}>
                                                    {j?.level_4?.behavioral_objective.map(
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
                                {/* {showRenormalizedData && ( */}
                                <TableCell
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    background: "#ffffff",
                                  }}
                                  align="center"
                                >

                                  <div
                                    style={{
                                      display: "inline-flex"
                                      //   color: employeeData &&
                                      //     employeeData?.data?.appraisal?.objective_description
                                      //       .filter(
                                      //         (i: any) =>
                                      //           i?.name?._id === j?.name?._id
                                      //       )
                                      //       .map((k: any) => k?.rating_rejected == true)[0] && "#FF0000"
                                    }}

                                  >
                                    {" "}
                                    {j.rating}
                                    {/* {employeeData?.employee?.overall_rating} */}
                                    {/* {employeeData &&
                                  employeeData?.employee?.objective_description
                                    .filter(
                                      (i: any) => i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => {
                                      if (k?.ratings && k.rating_rejected == true)
                                        return <RatingBackground onClick={(e: any) => { handlePreviousRatingPopOverOpen(e, j); setPopoverIndex(index) }} style={{ color: "white", background: "#D2122E" }}>{k?.ratings?.rating}</RatingBackground>;
                                      else if (k?.ratings && k.rating_resubmitted == true)
                                        return <RatingBackground onClick={(e: any) => { handlePreviousRatingPopOverOpen(e, j); setPopoverIndex(index) }} style={{ color: "white", background: "#3e8cb5" }}>{k?.ratings?.rating}</RatingBackground>
                                      else return k?.ratings?.rating
                                    })[0]} */}

                                    {/* {employeeData?.employee?.appraisal_previous_rating?.objective_description?.filter((i: any) => i.ratings).length > 0 && (
                                  <Popover
                                    id={id_Previous_Rating}
                                    open={popoverIndex === index && openPreviousRating}
                                    anchorEl={anchorPreviousRatingPopOver}
                                    onClose={handlePreviousRatingPopOverClose}
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
                                        employeeData?.employee?.appraisal_previous_rating?.objective_description?.filter(
                                          (i: any) =>
                                            i?.name === j?.name?._id
                                        )
                                          .map((k: any) => {
                                            console.log(k, "newkk")
                                            if (ratingData) {
                                              let temp = ratingData?.data?.find((item: any) => k.ratings == item._id)
                                              return <span>Previous Rating : {temp?.rating}</span>
                                            }
                                          })[0]}
                                    </div>
                                  </Popover>
                                )} */}
                                  </div>



                                </TableCell>
                                {/* )} */}
                                {/* {showRenormalizedData && ( */}

                                {employeeData?.employee?.objective_description?.filter((item: any) =>
                                  item.comments !== "" && item.comments !== undefined)?.length > 0 && (
                                    <TableCell
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
                                          {j.comments}
                                          {/* {employeeData &&
                                    employeeData?.employee?.objective_description
                                      .filter(
                                        (i: any) => i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {
                                        console.log(
                                          k?.ratings?.rating,
                                          "k.ratings.rating"
                                        );
                                        // setcompvalue(k.ratings.rating)
                                        if (k?.comments == "" || k.comments == undefined) return ""
                                        else return k.comments;
                                      })[0]} */}
                                        </span>

                                        {/* {employeeData && getAttachments(j?.name?._id)?.length > 0 &&
     <AttachFileIcon
       sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
       aria-describedby={"id"}
       onClick={(e: any) => {
         handleClickOpen6(e, j)
         setPopoverIndex1(index)
       }}
     />
   } */}
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
                                            {/* {employeeData && getAttachments(j?.name?._id)?.map((k: any, index1: any) => {
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
               <Stack direction="row"> */}
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
                     src={Removeattnew}
                     onClick={() => deleteAppraiserMutation({
                       employee_id: employee_id,
                       name: k.remove
                     })} /> */}
                                            {/* </IconButton>
               </Stack>

             </Stack>
           </>
         )
       })} */}
                                          </div>
                                        </Popover>
                                      </Stack>

                                    </TableCell>
                                  )}
                                {/* )} */}

                                {/* {showRenormalizedData && employeeData?.employee?.appraisal?.objective_description?.filter((item: any) =>
                            (item.rating_rejected == true || (item.rating_resubmitted == true &&                               
                              employeeData?.employee?.appraisal?.status !== "rejected"))).length > 0 && ( */}
                                {/* <TableCell
                                width="250px"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  background:"#fbfbfb",
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
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                    {employeeData &&
                                      employeeData?.employee?.appraisal?.objective_description
                                        .filter(
                                          (i: any) => i?.name?._id === j?.name?._id
                                        )
                                        .map((k: any) => {
                                          console.log(
                                            k?.ratings?.rating,
                                            "k.ratings.rating"
                                          );
                                      
                                          if (k?.rating_rejected == true || (k.rating_resubmitted == true &&                                            
                                          employeeData?.employee?.appraisal?.status !== "rejected")) 
                                       return k.rejection_reason;
                                        })[0]}
                                  </span>

                                  {employeeData && getAppraiserRejectionAttachments(j?.name?._id)?.length > 0 && 
                                  ( employeeData?.employee?.appraisal?.objective_description
                                    .filter(
                                      (i: any) => i?.name?._id === j?.name?._id
                                    )
                                    .map((k: any) => {
                                      console.log(
                                        k?.ratings?.rating,
                                        "k.ratings.rating"
                                      );
                                      
                                      if (k?.rating_rejected == true || (k.rating_resubmitted == true &&                                            
                                        employeeData?.employee?.appraisal?.status !== "rejected")) 
                                   return k.rejection_reason;
                                    })[0]) &&

                                    <AttachFileIcon
                                      sx={{ color: "#93DCFA", height: "18px", cursor: "pointer", transform: "rotate(30deg)", }}
                                      aria-describedby={"id"}
                                      onClick={(e: any) => {
                                        handleClickOpen9(e, j)
                                        setPopoverIndex1(index)
                                      }}
                                    />
                                  }
                                  <Popover
                                    id={"id"}
                                    open={(popoverIndex1 === index) && open10}
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
                                    > */}
                                {/* Attachments: {appraisalAttachments} */}
                                {/* {employeeData && getAppraiserRejectionAttachments(j?.name?._id)?.map((k: any, index1: any) => {
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
                                              <Stack direction="row"> */}
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
                                                src={Removeattnew}
                                                onClick={() => deleteAppraiserMutation({
                                                  employee_id: employee_id,
                                                  name: k.remove
                                                })} /> */}
                                {/* </IconButton>
                                              </Stack>

                                            </Stack>
                                          </>
                                        )
                                      })}
                                    </div>
                                  </Popover>
                                </Stack>

                              </TableCell> */}
                                {/* )} */}
                                {/* {showRenormalizedData && employeeData?.employee?.employee?.objective_description?.filter((item: any) =>
                            item.rating_rejected == true).length > 0 && ( */}
                                {/* <TableCell
                                width="10px"
                                sx={{
                                  fontSize: "14px",
                                  color: "#333333",
                                  fontFamily: "Arial",
                                  background:"#ffffff",
                                }}
                                align="center"
                              >
                                <Stack
                                  direction="column"
                                  display="flex"
                                  alignItems="center"
                                > */}
                                {/* <span
                                    style={{
                                      fontSize: "14px",
                                    }}
                                  >

                                    {j.rating_rejected ? (
                                      <span style={{ color: "white", background : "red" }}>
                                        {j.ratings && j.ratings.rating}
                                      </span>
                                    ) : ""
                                    }
                                  </span> */}

                                {/* <div style={{ display: "inline-flex" }}>
                                      
                                        {" "}
                                        {employeeData?.employee?.employee?.objective_description
                                          .filter(
                                            (i: any) =>
                                              i?.name?._id === j?.name?._id
                                          )
                                          .map((k: any) => {
                                            if (k?.ratings && k.rating_rejected == true)
                                              return <RatingBackground style={{ color: "white", background : "#D2122E" }}>{k?.ratings?.rating}</RatingBackground>;                                         
                                        
                                          })[0]}                                         
                                      
                                      </div>
                                </Stack>
                              </TableCell> */}
                                {/* )} */}
                                {/* {showRenormalizedData && employeeData?.employee?.employee?.objective_description?.filter((item: any) =>
                            item.rating_rejected == true).length > 0 && ( */}
                                {/* <TableCell
                                width="250px"
                                sx={{
                                  fontSize: "14px",
                                  color: "#33333",
                                  fontFamily: "Arial",
                                  background:"#fbfbfb",
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
                                {/* <span
                                    style={{
                                      fontSize: "14px",
                                      color: "#33333",
                                      fontFamily: "Arial",
                                    }}
                                  >
                                    {employeeData &&
                                      employeeData?.employee?.employee?.objective_description
                                        .filter((i: any) => i?.name?._id === j?.name?._id)
                                        .map((k: any) => {
                                          console.log(
                                            k?.ratings?.rating,
                                            "k.ratings.rating"
                                          );
                                          // setcompvalue(k.ratings.rating)
                                          if (k?.rejection_reason) return k?.rejection_reason;
                                        })[0]}
                                  </span>

                                  <div
                                    style={{
                                      justifyContent: "end",
                                      position: "relative",
                                    }}
                                  > */}
                                {/* {employeeData && getAttachments1(j?.name?._id)?.length > 0 && (j.rating_rejected) &&
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
                                          }}> */}
                                {/* Attachments: {employeeAttachments} */}
                                {/* {employeeData && getAttachments1(j?.name?._id)?.map((k: any, index1: any) => {
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
                                                    src={Removeattnew}
                                                    onClick={() => deleteEmployeeMutation({
                                                      employee_id: employee_id,
                                                      name: k.remove
                                                    })} /> */}
                                {/* </IconButton>
                                                  </Stack>

                                                </Stack>
                                              </>
                                            )
                                          })}
                                        </Typography> */}
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
                                {/* </div>
                                    </Popover> */}
                                {/* </Dialog> */}
                                {/* </div>
                                </Stack>

                              </TableCell> */}
                                {/* )} */}

                                {/* {employeeData?.employee?.appraisal?.status == "completed" &&
                            employeeData?.employee?.normalizer?.normalizer_status == "re-normalized" && ( */}

                                <>
                                  {/* <TableCell
                                  width="10px"
                                  sx={{
                                    fontSize: "14px",
                                    color: "#333333",
                                    fontFamily: "Arial",
                                    wordBreak: "break-word",
                                    background:"#ffffff",
                                  }}
                                  align="center"

                                > */}
                                  {/* <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="center"
                                    spacing={2}
                                  ><Typography>
                                      <span style={{
                                        color: "white" , background : "grey"
                                      }}> */}
                                  {/* {employeeData &&
                                          employeeData?.employee?.normalizer?.objective_description                                         
                                            .filter(
                                              (i: any) =>
                                                i?.name?._id === j?.name?._id
                                            )
                                            .map((k: any) => {
                                              
                                              if (k.ratings)
                                                return <b>{k?.ratings?.rating}</b>;
                                            })[0]}
                                      </span>
                                    </Typography> */}


                                  {/* {employeeData && getAttachmentsNormalizer(j?.name?._id)?.length > 0 && 
                                    ( employeeData?.employee?.normalizer?.objective_description
                                      .filter(
                                        (i: any) =>
                                          i?.name?._id === j?.name?._id
                                      )
                                      .map((k: any) => {                                       
                                        if (k.ratings)
                                          return <b>{k?.ratings?.rating}</b>;
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
                                    } */}
                                  {/* <Popover
                                      id={id10}
                                      open={(popoverIndex === index) && open11}
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
                                      > */}
                                  {/* {employeeData && getAttachmentsNormalizer(j?.name?._id)?.map((k: any, index1: any) => {
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
                                        })} */}
                                  {/* </div>
                                    </Popover>
                                  </Stack>
                                </TableCell> */}
                                  {/* {employeeData?.employee?.normalizer?.objective_description?.filter((item: any) =>
                                  item.rating_rejected == true).length > 0 && (
                                    <TableCell
                                      width="200px"
                                      sx={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        background:"#fbfbfb",
                                      }}
                                      align="center"
                                    >
                                      {employeeData &&
                                        employeeData?.employee?.normalizer?.objective_description
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
                                            return k.rating_rejected && k?.rejection_reason;
                                          })[0]}
                                    </TableCell>
                                  )} */}
                                </>
                                {/* )} */}
                              </TableRow>
                            </>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="page-break">
                  <Typography
                    style={{
                      paddingTop: "20px",
                      color: "#3e8cb5",
                      fontSize: "16px",
                      fontFamily: "Arial",
                      marginBottom: "20px"
                    }}
                  >
                    <b>Overall Feedback</b>
                  </Typography>
                  {overallFeed && overallFeed.map((j: any, mapIndex: any) => {

                    return (
                      <>
                        <div style={{ marginBottom: "20px" }}>
                          <Typography
                            style={{ fontSize: "16px", color: "#717171", marginBottom: "10px", fontFamily: "arial", wordBreak: "break-word" }}
                          >
                            <b>{j.name}</b>
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
                              lineHeight: "23px"
                            }}>
                              {j.value}
                            </div>

                          </Box>
                        </div>
                      </>
                    );
                  })}
                  {showArea && (
                    <>
                      <div style={{ marginBottom: "20px" }}>
                        <Typography
                          style={{
                            marginBottom: "10px",
                            color: "#717171",
                            fontSize: "16px",
                            fontFamily: "Arial",
                          }}
                        >
                          <b>Areas for Improvement (Appraiser)</b>
                        </Typography>
                        <Table size="small" >
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
                            {appraiserAreaofImprovement.map((i: any, index: any) => {
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
                                        lineHeight: "23px"
                                      }}
                                    >
                                      {i.specific_area}
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      width="450px"
                                      style={{
                                        fontSize: "14px",
                                        color: "#333333",
                                        fontFamily: "Arial",
                                        wordBreak: "break-word",
                                        lineHeight: "23px"
                                      }}
                                    >
                                      {i.specific_actions}
                                      {/* <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[0]?.value}</p>
                  <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[1]?.value}</p>
                  <p>{employeeData?.data?.appraisal?.area_of_improvement[0]?.specific_actions[2]?.value}</p> */}
                                      {/* {filterData1 &&
                                filterData1.map((i: any, ix: any) => {
                                  return i[1].map((j: any, jx: any) => {
                                    return j.specific_actions.map(
                                      (k: any, ix1: any) => {
                                        if (index === ix && k.value)
                                          return (
                                            <Typography style={{
                                      fontSize: "14px",
                                      color: "#333333",
                                      fontFamily: "Arial",
                                      wordBreak: "break-word",
                                      lineHeight: "23px"
                                    }}>
                                              {k.value}
                                              <br />
                                            </Typography>
                                          );
                                      }
                                    );
                                  });
                                })} */}
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
                      </div>

                    </>
                  )}
                  {filterData2.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          marginBottom: "10px",
                          color: "#717171",
                          fontSize: "16px",
                          fontFamily: "Arial",
                        }}
                      >
                        <b>Areas for Improvement (Employee)</b>
                      </Typography>

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
                                        lineHeight: "23px"
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
                                                    <Typography style={{
                                                      fontSize: "14px",
                                                      color: "#333333",
                                                      fontFamily: "Arial",
                                                      wordBreak: "break-word",
                                                      lineHeight: "23px"
                                                    }}>
                                                      {k.value}
                                                      <br />
                                                    </Typography>
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

                  {showTrainingRecommendation && (
                    <>
                      <div style={{ marginBottom: "20px" }}>
                        <Typography
                          style={{
                            marginBottom: "10px",
                            color: "#717171",
                            fontSize: "16px",
                            fontFamily: "Arial",
                          }}
                        >
                          <b>Training Recommendations (Appraiser)</b>
                        </Typography>
                        <Table
                          size="small"

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
                                        width="160px"
                                        align="left"
                                        style={{
                                          fontSize: "14px",
                                          color: "#333333",
                                          fontFamily: "Arial",
                                          wordBreak: "break-word",
                                          lineHeight: "23px"
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
                                        {j?.title}

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
                                            {j?.definition}

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
                      </div>
                    </>
                  )}
                  {Training1?.length > 0 && (
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          marginBottom: "10px",
                          color: "#717171",
                          fontSize: "16px",
                          fontFamily: "Arial",
                        }}
                      >
                        <b>Training Recommendations (Employee)</b>
                      </Typography>
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
                            Training1?.map((j: any, index: any) => {
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
                                        lineHeight: "23px"
                                      }}
                                    > <IconButton
                                      // aria-describedby={id2}
                                      onClick={(e: any) => {
                                        handleClickInfo1(e)
                                        setPopoverIndex(index);
                                      }}

                                    // style={{marginRight:"5px"}}
                                    >
                                        <img width="12px" src={Infoicon} alt="icon" />
                                      </IconButton>
                                      {j?.name?.name?.title}

                                      <Popover
                                        id={id3}
                                        open={(popoverIndex === index) && openInfo1}
                                        anchorEl={anchorEl1}
                                        onClose={handleCloseInfo1}
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

                                          {j?.name?.name?.definition}
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

                  {/* {employeeData?.employee?.other_recommendation?.length > 0 && (
                  <>
                  <div style={{ marginBottom: "20px" }}>
                    <Typography
                    style={{ fontSize: "16px", color: "#717171", marginBottom: "10px", fontFamily: "arial", wordBreak: "break-word" }}
                  >
                    <b>Other Recommendations </b>
                  </Typography>
                 
                  <Typography>
                    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                      {employeeData?.employee?.other_recommendation?.map((j: any) => {
                        console.log(j, "otherRecommendation")
                        return (
                          <>
                            <Grid display="flex" alignItems="center" item xs={2} sm={4} md={3} >
                              <input type="checkbox" checked />
                              <Labels>
                                {j?.name}
                              </Labels>
                            </Grid>
                          </>
                        );
                      })}
                    </Grid>
                  </Typography>
                  </div>
                  </>
                )} */}
                  {employeeData?.employee?.appraisal?.appraiser_overall_feedback !== null &&
                    employeeData?.employee?.appraisal?.appraiser_overall_feedback !== "" &&
                    <div style={{ marginBottom: "20px" }}>
                      <Typography
                        style={{
                          fontSize: "16px",
                          color: "#717171",
                          fontFamily: "arial",
                          marginBottom: "10px",
                        }}
                      >
                        <b>Appraiser Message for Employee</b>
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
                          {employeeData?.employee?.appraisal?.appraiser_overall_feedback}
                        </div>

                      </Box>
                    </div>
                  }

                  {employeeData?.employee?.appraisal?.status == "completed" &&
                    employeeData?.employee?.normalizer?.normalizer_status == "re-normalized" && (
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
                          <span style={{
                            fontSize: "22px",
                          }}>*</span>
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
                        </Typography>
                      </div>
                    )}


                  {employeeData?.employee?.appraisal?.status === "completed" &&
                    employeeData?.employee?.normalizer?.normalizer_status == "re-normalized" && (
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
                              {employeeData?.employee?.normalizer?.normalizer_meeting_notes}
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
                              handleClickOpen8(e)
                            }}
                          />
                        </div>
                        <Popover
                          id={"id"}
                          open={open8}
                          anchorEl={anchorEl8}
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
                            {/* Attachments: {appraisalAttachments} */}
                            {employeeData && employeeData?.employee?.normalizer?.meetingNotesAttachments?.map((k: any, index1: any) => {
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
                  {employeeData &&
                    employeeData?.employee?.employee?.comments !== undefined &&
                    employeeData?.employee?.employee?.comments !== "" && (
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
                            <b>Employee Comments</b>
                          </Typography>


                          <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                            <div style={{
                              color: "#333333",
                              fontSize: "14px",
                              fontFamily: "arial",
                              fontWeight: "400",
                              textTransform: "none",
                              // padding: "8px",
                              // height: "20px",
                              textAlign: "left",
                              lineHeight: "23px"
                            }}>
                              {employeeData?.employee?.employee?.comments}
                            </div>

                          </Box>

                        </div>
                      </>
                    )}

                  {employeeData &&
                    employeeData?.employee?.employee?.rejection_reason !== undefined &&
                    employeeData?.employee?.employee?.rejection_reason !== "" && (
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
                            <b>Employee Comments</b>
                            {/* <b>Employee Rejection Reason</b> */}
                          </Typography>

                          <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                            <div style={{
                              color: "#333333",
                              fontSize: "14px",
                              fontFamily: "arial",
                              fontWeight: "400",
                              textTransform: "none",
                              // padding: "8px",
                              // height: "20px",
                              textAlign: "left",
                              lineHeight: "23px"
                            }}>
                              {employeeData?.employee?.employee?.rejection_reason}
                            </div>

                          </Box>

                        </div>
                      </>
                    )}

                  {(employeeData?.employee?.employee?.one_to_one_meeting !== "" &&
                    employeeData?.employee?.employee?.one_to_one_meeting !== null &&
                    employeeData?.employee?.employee?.one_to_one_meeting !== undefined) && (
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
                            <b>One-to-One Meeting Date</b>
                          </Typography>


                          <Box sx={{ border: "1px solid #E0E0E0", padding: "8.5px 14px", borderRadius: "5px" }}>

                            <div style={{
                              color: "#333333",
                              fontSize: "14px",
                              fontFamily: "arial",
                              fontWeight: "400",
                              textTransform: "none",
                              // padding: "8px",
                              // height: "20px",
                              textAlign: "left",
                              lineHeight: "23px"
                            }}>
                              {One_To_One_Meeting_Date}
                            </div>

                          </Box>

                        </div>
                      </>
                    )}

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
                </div>
              </>
            )}
          </Box>

        </Box>
      </div>
      {/* </div> */}

    </PDFExport>

  );
}

function ratingScaleData(ratingScaleData: any, arg1: string) {
  throw new Error("Function not implemented.");
}
