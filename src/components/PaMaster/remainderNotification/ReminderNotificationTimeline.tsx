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
import "./ReminderNotificationTimeline.css";
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
    marginBottom: "30px",
    marginTop:"40px",
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
const ColorlibConnectorOffline = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 4,
    width: "93%",
    marginLeft: "-12px",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(to right, #eaeaf0, #eaeaf0)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage: "linear-gradient(to right, #eaeaf0, #eaeaf0)",
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
const calendarStatus = activeCalenderName?.status;
const colorlibConnector = calendarStatus === "Closed" ? <ColorlibConnectorOffline /> : <ColorlibConnector />;
  const [date, setDate] = React.useState("");
 
  
  //active data
  const [progress, setprogress] = React.useState(0);
  console.log(progress,"activeCalenderName",calendarStatus)
  const [calendarValues, setcalendarValues] = React.useState<any>([""]);
  const [rangeValues, setrangeValues] = React.useState<any>([]);

  //Timline active and offiline
  // React.useEffect(() => {
  //   setrangeValues(ColorlibConnectorOffline)
  // }, []);
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

      1: calendarStatus != "Closed" && icon1 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon1 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      2: calendarStatus != "Closed" && icon2 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon2 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      3: calendarStatus != "Closed" && icon3 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon3 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      4: calendarStatus != "Closed" && icon4 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon4 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      5: calendarStatus != "Closed" && icon5 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon5 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      6: calendarStatus != "Closed" && icon6 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon6 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      7: calendarStatus != "Closed" && icon7 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon7 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
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

  console.log(
    activeCalenderName === undefined,
    dayjs(activeCalenderName?.pa_launch).isBefore(dayjs()),
    `${dayjs(activeCalenderName?.pa_launch)?.format(
      "MMM DD"
    )} `,
    "activeCalenderName"
  );
   React.useEffect(() => {
    const calendarClosingDate = activeCalenderName?.calendar_closing_date;
    console.log(calendarClosingDate,"calendarStatus", dayjs(calendarClosingDate)?.isBefore(dayjs()))
    //need to save time line in backend
    if (
      activeCalenderName !== undefined &&
      activeCalenderName !== "" 
      //&& dayjs(calendarClosingDate)?.isBefore(dayjs())
     // && activeCalenderName.length > 0
    ) {
      console.log("activeCalenderName");
      if (dayjs(activeCalenderName?.pa_launch).isBefore(dayjs()) && dayjs(activeCalenderName?.pa_launch).isBefore(dayjs(calendarClosingDate)) ) {
        setprogress(1);
        setIcon1(true);
        console.log("active1");
      }
      if (
        dayjs(activeCalenderName.end_date_appraiser).isBefore(dayjs())  && dayjs(activeCalenderName?.end_date_appraiser).isBefore(dayjs(calendarClosingDate))
      ) {
        setprogress(2);
        setIcon2(true);
      }
      if (
        dayjs(activeCalenderName?.end_date_reviewer).isBefore(dayjs())  && dayjs(activeCalenderName?.end_date_reviewer).isBefore(dayjs(calendarClosingDate))
      ) {
        setprogress(3);
        setIcon3(true);
      }
      if (
        dayjs(activeCalenderName?.end_date_normalizer).isBefore(dayjs())  && dayjs(activeCalenderName?.end_date_normalizer).isBefore(dayjs(calendarClosingDate))
      ) {
        setprogress(4);
        setIcon4(true);
      }
      if (
        dayjs(
          activeCalenderName?.end_date_employee_acknowledgement
        ).isBefore(dayjs())  && dayjs(activeCalenderName?.end_date_employee_acknowledgement).isBefore(dayjs(calendarClosingDate))
      ) {
        console.log("active6");
        setprogress(5);
        setIcon5(true)
      }
      if (
        dayjs(activeCalenderName?.end_date_re_normalization).isBefore(
          dayjs()  
        ) && dayjs(activeCalenderName?.end_date_re_normalization).isBefore(dayjs(calendarClosingDate))
      ) {
        console.log("active8");
        setprogress(6);
        setIcon6(true)
      }
      if (dayjs(activeCalenderName?.end_date_closing).isBefore(dayjs())  && dayjs(activeCalenderName?.end_date_closing).isBefore(dayjs(calendarClosingDate))  ) {
        console.log("active9");
        setprogress(7);
        setIcon7(true)
      }
    } else if (
      activeCalenderName === undefined &&
      activeCalenderName === "" 
    ) {
      console.log("activeCalenderName2");
      setprogress(0);
    }
  });
  
  const today = `${dayjs(date).format("D")}`;

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
   
      <div>
       {calendarStatus && <Steppercontent>
          <Stepper
            alternativeLabel
            activeStep={progress}
            connector={colorlibConnector}
          >
            {calendarValues.map((step: any) => (
              <Step>
                <Stepperbutton>
                  <StepLabel StepIconComponent={ColorlibStepIcon}>
                    <Labels>{step.label}</Labels>
                    <Headings>{step.description}</Headings>
                  </StepLabel>
                </Stepperbutton>
              </Step>
            ))}
          </Stepper> 
        </Steppercontent>}
      </div>
  );
}
