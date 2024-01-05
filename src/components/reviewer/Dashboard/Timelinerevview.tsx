import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import Greenplus from "../../reviewer/Dashboard/Reviewericons/Greenplus.svg";
import Verticalline from "../../reviewer/Dashboard/Reviewericons/Verticalline.svg";
import { fontSize } from "@mui/system";
import Redplus from "../../reviewer/Dashboard/Reviewericons/Redplus.svg";
import "./Timeline.css";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import {
  useGetCalenderQuery,
  useGetEmployeeAppraisalQuery,
  useGetEmployeeQuery,
  useGetEmployeeByStatusQuery,
  useGetAllAppraiserStatusQuery,
  useGetAppraisalCalenderQuery,
  useGetAllNormalizerStatusQuery,
  useGetAllReviewerStatusQuery,
  useAppraisalCalenderFiltersQuery,
  useGetEmployeeByFilterQuery,
} from "../../../service";
import dayjs from "dayjs";
import { parseISO } from "date-fns/esm/fp";
import { isAfter, isBefore, subDays } from "date-fns";
import Slider, { SliderThumb } from "@mui/material/Slider";
import SliderValueLabelProps from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
const Timeline = styled("div")({
  fontSize: "20px",
  color: "#333333",
  padding: "20px",
  // marginLeft: "20px",
  // paddingTop: "15px",

  fontFamily: "Arial",
});
const Labels = styled("div")({
  fontSize: "13px",
  // opacity: 0.64,
  // color: "#27B5D1",
  color:"#014d76",
  fontFamily: "Arial",
});
const Headings = styled("div")({
  fontSize: "12px",
  color: "#333333",
  width: "100%",
  fontFamily: "Arial",
  // marginLeft: "23px",
});

const Steppercontent = styled("div")({
  "& .MuiStepper-root": {
    marginBottom: "28px",
  },
});
const Stepperbutton = styled("div")({
  "& .MuiSvgIcon-root": {
    zIndex: "1",
  },
});

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 4,
    width: "93%",
    marginLeft: "-12px",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      // backgroundColor: "#F6C609",
      backgroundImage:
        //  'linear-gradient(79deg, rgba(255,223,96,0.9612219887955182) 0%, rgba(238,195,26,1) 52%)',
        "linear-gradient(to right, #F9C5A1, #F99B5B)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(to right, #35CFB6, #079B82)",
      //   backgroundColor: "linear-gradient(to right, #35CFB6, #079B82)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 10,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));
//@ts-ignore
const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#FFFFFF",
  border: "1px solid #E5E5E5",
  zIndex: 1,
  color: "#fff",
  width: 18,
  height: 18,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active &&
    {
      // border: "1px solid red",
      // boxShadow: "0px 0px 2px 2px #FEF0ED",
      //opacity: 0.13,
    }),
  ...(ownerState.completed &&
    {
      // backgroundImage:
      //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
      // backgroundColor:'#FFFFFF',
      // border: '1px solid ##008E97',
      //color: '#00B050'
    }),
}));
const ITEM_HEIGHT = 28;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxWidth: 145,
      fontSize: "14px !important",
      fontFamily: "Arial",
      color: "#333333",
    },
  },
};
export default function Timeline2(props: any) {
  // const {data: employeeData, isLoading} = useGetEmployeeQuery('')
  const {activeCalenderName} = props;
  // const { status } = useParams();
 

  //status



  //  console.log(allemployeeDatadraft,'allemployeeDataD')
  //  console.log(allemployeeDatareviewerrejected,'allemployeeDataRR')
  // const {employee_id} = useParams()
  // const {data: empData, isLoading} = useGetEmployeeAppraisalQuery(employee_id)
  const [date, setDate] = React.useState("");
  //active data
  // const [activecalData, setactivecalData] = React.useState<any>("");
  // const [statusCompleted, setstatusCompleted] = React.useState<any>(false);
  // const [reviewerstatusCompleted, setreviewerstatusCompleted] =
  //   React.useState<any>(false);
  // const [normalizerstatusCompleted, setnormalizerstatusCompleted] =
  //   React.useState<any>(false);
  
  //active data
  const [progress, setprogress] = React.useState(0);
  console.log(progress,"activeCalenderName")
  const [calendarValues, setcalendarValues] = React.useState<any>([""]);
  const [rangeValues, setrangeValues] = React.useState<any>([""]);
  //icons
  const [icon1, setIcon1] = React.useState(false);
  const [icon2, setIcon2] = React.useState(false);
  const [icon3, setIcon3] = React.useState(false);
  const [icon4, setIcon4] = React.useState(false);
  const [icon5, setIcon5] = React.useState(false);
  const [icon6, setIcon6] = React.useState(false);
  const [icon7, setIcon7] = React.useState(false);
  const [icon8, setIcon8] = React.useState(false);
  const [icon9, setIcon9] = React.useState(false);
  const [cancelicon1, setcancelIcon1] = React.useState(false);
  const [cancelicon2, setcancelIcon2] = React.useState(false);
  const [cancelicon3, setcancelIcon3] = React.useState(false);
  const [cancelicon4, setcancelIcon4] = React.useState(false);
  const [cancelicon5, setcancelIcon5] = React.useState(false);
  const [cancelicon6, setcancelIcon6] = React.useState(false);
  const [cancelicon7, setcancelIcon7] = React.useState(false);
  const [cancelicon8, setcancelIcon8] = React.useState(false);
  const [cancelicon9, setcancelIcon9] = React.useState(false);
  //icons
  function ColorlibStepIcon(props: any) {
    const { active, completed, className } = props;

    const icons = {
      // 1: <SettingsIcon />,
      // 2: <GroupAddIcon />,
      // 3: <VideoLabelIcon />,

      1: icon1 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon1 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      2: icon2 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon2 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      3: icon3 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon3 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      4: icon4 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon4 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      5: icon5 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon5 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      6: icon6 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon6 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      7: icon7 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon7 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      // 8: icon8 ? (
      //   <img src={Greenplus} alt="icon" />
      // ) : cancelicon8 ? (
      //   <img src={Redplus} alt="icon" />
      // ) : (
      //   ""
      // ),
      // 9: icon9 ? (
      //   <img src={Greenplus} alt="icon" />
      // ) : cancelicon9 ? (
      //   <img src={Redplus} alt="icon" />
      // ) : (
      //   ""
      // ),
    };

    return (
      //@ts-ignore
      <ColorlibStepIconRoot
        //@ts-ignore
        ownerState={{ completed, active }}
        className={className}
      >
        {/* @ts-ignore */}
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };
  console.log(activeCalenderName,"activeCalenderName")
  React.useEffect(() => {
    if (
      activeCalenderName != "" || activeCalenderName != undefined
    ) {
      setcalendarValues([
        {
          label: `${dayjs(activeCalenderName?.pa_launch)?.format(
            "MMM DD"
          )} `,
          description: "PA Initiation",
        },
        {
          label: `${dayjs(
            activeCalenderName?.end_date_appraiser
          )?.format("MMM DD")} `,
          description: "Appraiser",
        },
        {
          label: `${dayjs(activeCalenderName?.end_date_reviewer).format(
            "MMM DD"
          )} `,
          description: "Reviewer",
        },
        {
          label: `${dayjs(
            activeCalenderName?.end_date_normalizer
          ).format("MMM DD")} `,
          description: "Normalizer",
        },
       
        {
          label: `${dayjs(
            activeCalenderName?.end_date_employee_acknowledgement
          ).format("MMM DD")} `,
          description: "F2F Meeting & Employee Acceptance",
        },
        // {
        //   label: `${dayjs(
        //     activeCalenderName?.end_date_mediation
        //   ).format("MMM DD")} `,
        //   description: "Mediation",
        // },
        {
          label: `${dayjs(
            activeCalenderName?.end_date_re_normalization
          ).format("MMM DD")} `,
          description: "Mediation & Re-normalization",
        },
        {
          label: `${dayjs(activeCalenderName?.end_date_closing).format(
            "MMM DD"
          )} `,
          description: "PA Closing",
        },
      ]);
    } else if(activeCalenderName == undefined ||
      activeCalenderName == "" ||
      activeCalenderName?.length < 0) {
      setcalendarValues([
        { label: "", description: "PA Initiation" },
        { label: "", description: "Appraiser" },
        { label: "", description: "Reviewer" },
        { label: "", description: "Normalizer" },
        { label: "", description: "F2F Meeting" },
        { label: "", description: "Employee Acknowledgment" },
        // { label: "", description: "Mediation" },
        { label: "", description: "Re-normalization" },
        { label: "", description: "PA Closing" },
      ]);
    }
    // console.log(calendarValues,"calendervalues")
  }, [activeCalenderName]);


  // React.useEffect(() => {
  //   if (
  //     caldata !== undefined &&
  //     activecalData !== undefined &&
  //     activecalData !== "" &&
  //     activecalData.length > 0
  //   ) {
  //     setcalendarValues([
  //       {
  //         label: `${dayjs(activecalData[0]?.calendar?.pa_launch)?.format(
  //           "MMM DD"
  //         )} `,
  //         description: "PA Initiation",
  //       },
  //       {
  //         label: `${dayjs(
  //           activecalData[0]?.calendar?.end_date_appraiser
  //         )?.format("MMM DD")} `,
  //         description: "Appraiser",
  //       },
  //       {
  //         label: `${dayjs(activecalData[0]?.calendar?.end_date_reviewer).format(
  //           "MMM DD"
  //         )} `,
  //         description: "Reviewer",
  //       },
  //       {
  //         label: `${dayjs(
  //           activecalData[0]?.calendar?.end_date_normalizer
  //         ).format("MMM DD")} `,
  //         description: "Normalizer",
  //       },
       
  //       {
  //         label: `${dayjs(
  //           activecalData[0]?.calendar?.end_date_employee_acknowledgement
  //         ).format("MMM DD")} `,
  //         description: "F2F Meeting & Employee Acceptance",
  //       },
  //       {
  //         label: `${dayjs(
  //           activecalData[0]?.calendar?.end_date_mediation
  //         ).format("MMM DD")} `,
  //         description: "Mediation",
  //       },
  //       {
  //         label: `${dayjs(
  //           activecalData[0]?.calendar?.end_date_re_normalization
  //         ).format("MMM DD")} `,
  //         description: "Re-normalization",
  //       },
  //       {
  //         label: `${dayjs(activecalData[0]?.calendar?.end_date_closing).format(
  //           "MMM DD"
  //         )} `,
  //         description: "PA Closing",
  //       },
  //     ]);
  //   } else if (
  //     caldata === undefined &&
  //     activecalData === undefined &&
  //     activecalData === "" &&
  //     activecalData === "" &&
  //     activecalData.length < 0
  //   ) {
  //     setcalendarValues([
  //       { label: "", description: "PA Initiation" },
  //       { label: "", description: "Appraiser" },
  //       { label: "", description: "Reviewer" },
  //       { label: "", description: "Normalizer" },
  //       { label: "", description: "F2F Meeting" },
  //       { label: "", description: "Employee Acknowledgment" },
  //       { label: "", description: "Mediation" },
  //       { label: "", description: "Re-normalization" },
  //       { label: "", description: "PA Closing" },
  //     ]);
  //   }
  // }, [caldata, activecalData]);
  console.log(
    activeCalenderName === undefined,
    dayjs(activeCalenderName?.pa_launch).isBefore(dayjs()),
    `${dayjs(activeCalenderName?.pa_launch)?.format(
      "MMM DD"
    )} `,
    "activeCalenderName"
  );
   React.useEffect(() => {
    if (
      activeCalenderName !== undefined &&
      activeCalenderName !== "" 
     // && activeCalenderName.length > 0
    ) {
      //console.log(activeCalenderName?.pa_launch, "datejs");
      // console.log(dayjs("2022-5-25").isAfter(dayjs()), 'datejs--')
      // console.log(
      //   dayjs(activeCalenderName?.pa_launch).isBefore(dayjs()),
      //   activeCalenderName?.calendar.pa_launch,
      //   "datejs---"
      // );
      console.log("activeCalenderName");
      if (dayjs(activeCalenderName?.pa_launch).isBefore(dayjs())) {
        setprogress(1);
        setIcon1(true);
        console.log("active1");
      }
      if (
        dayjs(activeCalenderName.end_date_appraiser).isBefore(dayjs())
      ) {
        setprogress(2);
        setIcon2(true);
        // if (statusCompleted === true) {
        //   setIcon2(true);
        // } else {
        //   setIcon2(false);
        //   setcancelIcon2(true);
        // }
        // console.log("active2");
      }
      if (
        dayjs(activeCalenderName?.end_date_reviewer).isBefore(dayjs())
      ) {
        setprogress(3);
        setIcon3(true);
        // if (reviewerstatusCompleted === true) {
        //   setIcon3(true);
        // } else {
        //   setIcon3(false);
        //   setcancelIcon3(true);
        // }
       
       // console.log("active3");
      }
      if (
        dayjs(activeCalenderName?.end_date_normalizer).isBefore(dayjs())
      ) {
        setprogress(4);
        setIcon4(true);
        // if (normalizerstatusCompleted === true) {
        //   setIcon4(true);
        // } else {
        //   setIcon4(false);
        //   setcancelIcon4(true);
        // }

        // console.log("active4");
      }
      // if (
      //   dayjs(activecalData[0].calendar.end_date_F2FMeeting).isBefore(dayjs())
      // ) {
      //   console.log("active5");
      //   setprogress(5);
      //   setIcon5(true);
      // }
      if (
        dayjs(
          activeCalenderName?.end_date_employee_acknowledgement
        ).isBefore(dayjs())
      ) {
        console.log("active6");
        setprogress(5);
        setIcon5(true)
      }
      // if (
      //   dayjs(activeCalenderName?.end_date_mediation).isBefore(dayjs())
      // ) {
      //   console.log("active7");
      //   setprogress(7);
      //   setIcon7(true)
      // }
      if (
        dayjs(activeCalenderName?.end_date_re_normalization).isBefore(
          dayjs()
        )
      ) {
        console.log("active8");
        setprogress(6);
        setIcon6(true)
      }
      if (dayjs(activeCalenderName?.end_date_closing).isBefore(dayjs())) {
        console.log("active9");
        setprogress(7);
        setIcon7(true)
      }
    } else if (
      activeCalenderName === undefined &&
      activeCalenderName === "" 
      //&& activeCalenderName.length < 0
    ) {
      console.log("activeCalenderName2");
      setprogress(0);
    }
  });
  // React.useEffect(() => {
  //   if (
  //     activecalData !== undefined &&
  //     activecalData !== "" &&
  //     activecalData.length > 0
  //   ) {
  //     console.log(activecalData[0].calendar.pa_launch, "datejs");
  //     // console.log(dayjs("2022-5-25").isAfter(dayjs()), 'datejs--')
  //     console.log(
  //       dayjs(activecalData[0].calendar.pa_launch).isBefore(dayjs()),
  //       activecalData[0].calendar.pa_launch,
  //       "datejs---"
  //     );
  //     if (dayjs(activecalData[0].calendar.pa_launch).isBefore(dayjs())) {
  //       setprogress(1);
  //       setIcon1(true);
  //       console.log("active1");
  //     }
  //     if (
  //       dayjs(activecalData[0].calendar.end_date_appraiser).isBefore(dayjs())
  //     ) {
  //       setprogress(2);
  //       setIcon2(true);
  //       // if (statusCompleted === true) {
  //       //   setIcon2(true);
  //       // } else {
  //       //   setIcon2(false);
  //       //   setcancelIcon2(true);
  //       // }
  //       // console.log("active2");
  //     }
  //     if (
  //       dayjs(activecalData[0].calendar.end_date_reviewer).isBefore(dayjs())
  //     ) {
  //       setprogress(3);
  //       setIcon3(true);
  //       // if (reviewerstatusCompleted === true) {
  //       //   setIcon3(true);
  //       // } else {
  //       //   setIcon3(false);
  //       //   setcancelIcon3(true);
  //       // }
       
  //      // console.log("active3");
  //     }
  //     if (
  //       dayjs(activecalData[0].calendar.end_date_normalizer).isBefore(dayjs())
  //     ) {
  //       setprogress(4);
  //       setIcon4(true);
  //       // if (normalizerstatusCompleted === true) {
  //       //   setIcon4(true);
  //       // } else {
  //       //   setIcon4(false);
  //       //   setcancelIcon4(true);
  //       // }

  //       // console.log("active4");
  //     }
  //     // if (
  //     //   dayjs(activecalData[0].calendar.end_date_F2FMeeting).isBefore(dayjs())
  //     // ) {
  //     //   console.log("active5");
  //     //   setprogress(5);
  //     //   setIcon5(true);
  //     // }
  //     if (
  //       dayjs(
  //         activecalData[0].calendar.end_date_employee_acknowledgement
  //       ).isBefore(dayjs())
  //     ) {
  //       console.log("active6");
  //       setprogress(6);
  //       setIcon6(true)
  //     }
  //     if (
  //       dayjs(activecalData[0].calendar.end_date_mediation).isBefore(dayjs())
  //     ) {
  //       console.log("active7");
  //       setprogress(7);
  //       setIcon7(true)
  //     }
  //     if (
  //       dayjs(activecalData[0].calendar.end_date_re_normalization).isBefore(
  //         dayjs()
  //       )
  //     ) {
  //       console.log("active8");
  //       setprogress(8);
  //       setIcon8(true)
  //     }
  //     if (dayjs(activecalData[0].calendar.end_date_closing).isBefore(dayjs())) {
  //       console.log("active9");
  //       setprogress(9);
  //       setIcon9(true)
  //     }
  //   } else if (
  //     activecalData === undefined &&
  //     activecalData === "" &&
  //     activecalData.length < 0
  //   ) {
  //     setprogress(0);
  //   }
  // }, [activecalData]);

  const today = `${dayjs(date).format("D")}`;
  // const today = 22;

  const dateNow = () => {
    const showDate = new Date();
    const displayTodaysDate =
      showDate.getMonth() + 1 + "-" + showDate.getDate();
    return displayTodaysDate;
  };

  React.useEffect(() => {
    setDate(dateNow());
  }, [date, dateNow]);

  return (
    <Stack
      sx={{
        background: "#fff",
        marginLeft: "25px",
        marginRight: "25px",
        position: "relative",
        // paddingBottom: "20px",
      }}
      // spacing={4}
    >
      {/* <Timeline>Timeline</Timeline> */}
      {/* <Stack
        direction="row"
        justifyContent="space-between"
        // height="50px"
        // paddingBottom="30px"
        alignItems="center"
      >
        
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
          paddingRight="15px"
        >
          <div>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                MenuProps={MenuProps}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                  // '& .MuiOutlinedInput-root': {
                  //   // '& fieldset': {
                  //   //   borderColor: 'none',
                  //   // },
                  //   "& > fieldset": {

                  //   },
                  //   '&:hover fieldset': {
                  //     borderColor: '#cfcfcf',
                  //   },
                  //   '&.Mui-focused fieldset': {
                  //     borderColor: 'cfcfcf',
                  //   },
                  // },
                }}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Calendar
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Mid-Year
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  2021
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                MenuProps={MenuProps}
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Year
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Section
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  2021
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Section
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Corp Support ExCom
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  Corp Support - HR
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={40}
                >
                  Eng - Application and Design
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={50}
                >
                  Eng Ex-Com
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={60}
                >
                  Ops OS - ExCom
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
              }}
            >
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Sub-section
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Installation
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  Service
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={40}
                >
                  SME's
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={50}
                >
                  CAC
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={60}
                >
                  IT
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={70}
                >
                  Projects
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl
              size="small"
              sx={{
                minWidth: 140,
              }}
            >
              <Select
                sx={{
                  "& .MuiInputBase-input": {
                    fontSize: "14px",
                    textTransform: "none",
                    fontFamily: "Arial",
                    color: "#333333",
                    maxHeight: "0px",
                    minHeight: "28px",
                     padding: "6px 12px",
                  },
                  "& .MuiOutlinedInput-root": {
                    maxHeight: "0px",
                    minHeight: "28px",
                  },
                }}
                MenuProps={MenuProps}
                defaultValue={10}
              >
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={10}
                >
                  Division
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={20}
                >
                  Corporate Support
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={30}
                >
                  Engineering
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={40}
                >
                  Finance
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={50}
                >
                  Operations OS
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={60}
                >
                  Operations Finance
                </MenuItem>
                <MenuItem
                  style={{
                    fontSize: "14px",
                    color: "#333333",
                    fontFamily: "Arial",
                  }}
                  value={70}
                >
                  Sales
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </Stack>
        <span
          style={{
            color: "#3e8cb5",
            padding:"8px",
            height:"18px",
            border:"1px solid#3e8cb5",
            fontSize:"14px",
            fontFamily:"Arial",
            borderRadius:"8px"
          }}
        >{`${dayjs().format("DD-MMM-YYYY")}`}</span>
      </Stack> */}
      <div>
        {/* <div style={{ position: 'relative', background: 'skyblue', marginLeft: '6%', marginRight: '6%' }} > */}
        {/* <input
            style={{ position: 'absolute', top: '5px' }}
            type='range'
            min={minvalue}
            max={maxvalue}
            defaultValue={defvalue}
            // min={'3'}
            // max={'28'}
            //  defaultValue={}
            //defaultValue={`${dayjs(date).format('D')}`}
            id="timelinethumb"  >
          </input> */}
        {/* <div style={{position:'absolute'}} >
            jun
          </div> */}
        {/* <PrettoSlider
            sx={{ position: 'absolute' }}
            valueLabelDisplay="on"
            aria-label="pretto slider"
            // min={3}
            // max={28}
            // defaultValue={15}
           
            min={minvalue}
            max={maxvalue}
            defaultValue={defvalue}
          /> */}
        {/* </div> */}
        <Steppercontent>
          <Stepper
            alternativeLabel
            activeStep={progress}
            connector={<ColorlibConnector />}
          >
            {calendarValues.map((step: any) => (
              <Step
              //  key={step.label}
               >
                <Stepperbutton>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Labels>{step.label}</Labels>
                    <Headings>{step.description}</Headings>
                  </StepLabel>
                </Stepperbutton>
              </Step>
            ))}
          </Stepper>
          {/* <div>
            <img
              style={{ position: "absolute", top: "30%", left: "62%" }}
              src={Verticalline}
              alt="icon"
            />
            <input
              style={{
                height: "20px",
                width: "60px",
                background: "#004C75",
                color: "#F1F1F1",
                position: "absolute",
                top: "20%",
                left: "62%",
                textAlign: "center",
                fontSize: "14px"
              }}
              value={`${dayjs(date).format('DD')}`}
              type="text"

            ></input>
          </div> */}
        </Steppercontent>
      </div>
    </Stack>
  );
}
