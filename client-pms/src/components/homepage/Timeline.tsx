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
import Greenplus from "./icons/Greenplus.svg";

import Redplus from "./icons/Redplus.svg";


import dayjs from "dayjs";
import { parseISO } from "date-fns/esm/fp";
import { isAfter, isBefore, subDays } from "date-fns";
import Slider, { SliderThumb } from "@mui/material/Slider";
import SliderValueLabelProps from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useAppraisalCalenderFiltersQuery, useGetEmployeeByFilterQuery } from "../../service";

const TimelineDiv = styled("div")({
  fontSize: "20px",
  color: "#333333",
  padding:"20px",
  // marginLeft: "20px",
  // paddingTop: "15px",

  fontFamily: "Arial",
});
const Labels = styled("div")({
  fontSize: "9px",
  opacity: 0.64,
  color: "#333333",
  fontFamily:"Arial"
});
const Headings = styled("div")({
  fontSize: "11px",
  color: "#333333",
  width: "100%",
  fontFamily:"Arial"
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
      backgroundColor: "#F6C609",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      //   backgroundImage:
      //     'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
      backgroundColor: "#00B050",
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

export default function Timeline(props: any) {
  // const {data: employeeData, isLoading} = useGetEmployeeQuery('')
  const { status } = useParams();
  const { data: caldata } = useAppraisalCalenderFiltersQuery("?status=active&limit=1&populate=calendar");
  //status
  // appraisal.appraiser_status
  const { data: allemployeeDatapending, isLoading } =
    // useGetAllAppraiserStatusQuery("pending");
      useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_status&appraisal.appraiser_status=pending&limit=600`);

  const { data: allemployeeDatadraft } =
      // useGetAllAppraiserStatusQuery("draft");
      useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_status&appraisal.appraiser_status=draft&limit=600`);

  const { data: allemployeeDatanormalizerRejected } =
    // useGetAllAppraiserStatusQuery("normalizer-rejected");
      useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_status&appraisal.appraiser_status=normalizer-rejected&limit=600`);

  const { data: allemployeeDatareviewerRejected } =
    // useGetAllAppraiserStatusQuery("reviewer-rejected");
  useGetEmployeeByFilterQuery(`?select=appraisal.appraiser_status&appraisal.appraiser_status=reviewer-rejected&limit=600`);

  // const { data, isLoading } = useGetEmployeeByFilterQuery(`?manager_code=${user?.employee_code}&limit=600&select=appraisal.appraiser_rating`);

  const { data: allrevieweremployeeDatapending } =
      useGetEmployeeByFilterQuery(`?select=reviewer.reviewer_status&reviewer.reviewer_status=pending&limit=600`);
  const { data: allrevieweremployeeDatadraft } =
    // useGetAllReviewerStatusQuery("draft");
  useGetEmployeeByFilterQuery(`?select=reviewer.reviewer_status&reviewer.reviewer_status=draft&limit=600`);
  const { data: allrevieweremployeeDatanormalizerRejected } =
    // useGetAllReviewerStatusQuery("normalizer-rejected");
  useGetEmployeeByFilterQuery(`?select=reviewer.reviewer_status&reviewer.reviewer_status=normalizer-rejected&limit=600`);
  const { data: allrevieweremployeeDatareviewerRejected } =
    // useGetAllReviewerStatusQuery("reviewer-rejected");
      useGetEmployeeByFilterQuery(`?select=reviewer.reviewer_status&reviewer.reviewer_status=reviewer-rejected&limit=600`);


  const { data: allnormalizeremployeeDatapending } =
    // useGetAllNormalizerStatusQuery("pending");
  useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_status&normalizer.normalizer_status=pending&limit=800`);
  const { data: allnormalizeremployeeDatadraft } =
    // useGetAllNormalizerStatusQuery("draft");
      useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_status&normalizer.normalizer_status=draft&limit=800`);
  const { data: allnormalizeremployeeDatanormalizerRejected } =
    // useGetAllNormalizerStatusQuery("normalizer-rejected");
  useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_status&normalizer.normalizer_status=normalizer-rejected&limit=800`);

  const { data: allnormalizeremployeeDatareviewerRejected } =
    // useGetAllNormalizerStatusQuery("reviewer-rejected");
  useGetEmployeeByFilterQuery(`?select=normalizer.normalizer_status&normalizer.normalizer_status=reviewer-rejected&limit=800`);

  //status

  console.log(caldata, "caldata");
  console.log(allemployeeDatapending, "statusp");
  console.log(allemployeeDatadraft, "statusd");
  console.log(allemployeeDatareviewerRejected, "statusr");
  console.log(allemployeeDatanormalizerRejected, "statusn");

  //  console.log(allemployeeDatadraft,'allemployeeDataD')
  //  console.log(allemployeeDatareviewerrejected,'allemployeeDataRR')
  // const {employee_id} = useParams()
  // const {data: empData, isLoading} = useGetEmployeeAppraisalQuery(employee_id)
  const [date, setDate] = React.useState("");
  //active data
  const [activecalData, setactivecalData] = React.useState<any>("");
  const [statusCompleted, setstatusCompleted] = React.useState<any>(false);
  const [reviewerstatusCompleted, setreviewerstatusCompleted] =
    React.useState<any>(false);
  const [normalizerstatusCompleted, setnormalizerstatusCompleted] =
    React.useState<any>(false);
  React.useEffect(() => {
    if (
      allemployeeDatapending !== undefined &&
      allemployeeDatapending !== null &&
      allrevieweremployeeDatapending !== undefined &&
      allrevieweremployeeDatapending !== null &&
      allnormalizeremployeeDatapending !== undefined &&
      allnormalizeremployeeDatapending !== null
    ) {
      const pendingEmployees = allemployeeDatapending.employee;
      const draftEmployees = allemployeeDatadraft.employee;
      const normalizerRejectedEmployees =
        allemployeeDatanormalizerRejected.employee;
      const reviewerRejectedEmployees =
        allemployeeDatareviewerRejected.employee;

      const reviewerpendingEmployees = allrevieweremployeeDatapending.data;
      const reviewerdraftEmployees = allrevieweremployeeDatadraft.data;
      const reviewersnormalizerRejectedEmployees =
        allrevieweremployeeDatanormalizerRejected?.data;
      const reviewersreviewerRejectedEmployees =
        allrevieweremployeeDatareviewerRejected.data;

      const normalizerpendingEmployees =
        allnormalizeremployeeDatapending.data;
      const normalizerdraftEmployees = allnormalizeremployeeDatadraft.data;
      const normalizersnormalizerRejectedEmployees =
        allnormalizeremployeeDatanormalizerRejected.data;
      const normalizersreviewerRejectedEmployees =
        allnormalizeremployeeDatareviewerRejected.data;

      // console.log(pendingEmployees.length, "pend");
      // console.log(draftEmployees.length, "pend");
      // console.log(normalizerRejectedEmployees.length, "pend");
      // console.log(reviewerRejectedEmployees.length, "pend");

      // console.log(reviewerpendingEmployees.length, "pendr");
      // console.log(reviewerdraftEmployees.length, "pendr");
      // console.log(reviewersnormalizerRejectedEmployees.length, "pendr");
      // console.log(reviewersreviewerRejectedEmployees.length, "pendr");

      if (
        pendingEmployees?.length === 0 &&
        draftEmployees?.length === 0 &&
        normalizerRejectedEmployees?.length === 0 &&
        reviewerRejectedEmployees?.length === 0
      ) {
        setstatusCompleted(true);
      } else {
        setstatusCompleted(false);
      }
      if (
        reviewerpendingEmployees?.length === 0 &&
        reviewerdraftEmployees?.length === 0 &&
        reviewersnormalizerRejectedEmployees?.length === 0 &&
        reviewersreviewerRejectedEmployees?.length === 0
      ) {
        setreviewerstatusCompleted(true);
      } else {
        setreviewerstatusCompleted(false);
      }
      if (
        normalizerpendingEmployees?.length === 0 &&
        normalizerdraftEmployees?.length === 0 &&
        normalizersnormalizerRejectedEmployees?.length === 0 &&
        normalizersreviewerRejectedEmployees?.length === 0
      ) {
        setnormalizerstatusCompleted(true);
      } else {
        setnormalizerstatusCompleted(false);
      }
    }
    console.log(statusCompleted, "pend");
  }, [allemployeeDatapending]);

  React.useEffect(() => {
    if (caldata !== undefined && caldata !== "") {
      const activeCalender = caldata.data.filter((item: any) => {
        console.log(item, "iiiiiii");
        return item.status === "active";
      });
      setactivecalData(activeCalender);
      console.log(activeCalender, "activecalender");
    }
  }, [caldata]);
  console.log(activecalData,'activecalData')
  //active data
  const [progress, setprogress] = React.useState(0);
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
      8: icon8 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon8 ? (
        <img src={Redplus} alt="icon" />
      ) : (
        ""
      ),
      9: icon9 ? (
        <img src={Greenplus} alt="icon" />
      ) : cancelicon9 ? (
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

  React.useEffect(() => {
    if (
      caldata !== undefined &&
      activecalData !== undefined &&
      activecalData !== "" &&
      activecalData.length > 0
    ) {
      setcalendarValues([
        {
          label: `${dayjs(activecalData[0]?.calendar?.pa_launch)?.format(
            "MMM DD"
          )} `,
          description: "PA Initiation",
        },
        {
          label: `${dayjs(
            activecalData[0]?.calendar?.end_date_appraiser
          )?.format("MMM DD")} `,
          description: "Appraiser",
        },
        {
          label: `${dayjs(activecalData[0]?.calendar?.end_date_reviewer).format(
            "MMM DD"
          )} `,
          description: "Reviewer",
        },
        {
          label: `${dayjs(
            activecalData[0]?.calendar?.end_date_normalizer
          ).format("MMM DD")} `,
          description: "Normalizer",
        },
        {
          label: `${dayjs(
            activecalData[0]?.calendar?.end_date_F2FMeeting
          ).format("MMM DD")} `,
          description: "F2F Meeting",
        },
        {
          label: `${dayjs(
            activecalData[0]?.calendar?.end_date_employee_acknowledgement
          ).format("MMM DD")} `,
          description: "Employee Acknowledgment",
        },
        {
          label: `${dayjs(
            activecalData[0]?.calendar?.end_date_mediation
          ).format("MMM DD")} `,
          description: "Mediation",
        },
        {
          label: `${dayjs(
            activecalData[0]?.calendar?.end_date_re_normalization
          ).format("MMM DD")} `,
          description: "Re-normalization",
        },
        {
          label: `${dayjs(activecalData[0]?.calendar?.end_date_closing).format(
            "MMM DD"
          )} `,
          description: "PA Closing",
        },
      ]);
    } else if (
      caldata === undefined &&
      activecalData === undefined &&
      activecalData === "" &&
      activecalData === "" &&
      activecalData.length < 0
    ) {
      setcalendarValues([
        { label: "", description: "PA Initiation" },
        { label: "", description: "Appraiser" },
        { label: "", description: "Reviewer" },
        { label: "", description: "Normalizer" },
        { label: "", description: "F2F Meeting" },
        { label: "", description: "Employee Acknowledgment" },
        { label: "", description: "Mediation" },
        { label: "", description: "Re-normalization" },
        { label: "", description: "PA Closing" },
      ]);
    }
  }, [caldata, activecalData]);

  React.useEffect(() => {
    if (
      activecalData !== undefined &&
      activecalData !== "" &&
      activecalData.length > 0
    ) {
      console.log(activecalData[0].calendar.pa_launch, "datejs");
      // console.log(dayjs("2022-5-25").isAfter(dayjs()), 'datejs--')
      console.log(
        dayjs(activecalData[0].calendar.pa_launch).isBefore(dayjs()),activecalData[0].calendar.pa_launch,
        "datejs---"
      );
      if (dayjs(activecalData[0].calendar.pa_launch).isBefore(dayjs())) {
        setprogress(1);
        setIcon1(true);
        console.log("active1");
      }
      if (
        dayjs(activecalData[0].calendar.end_date_appraiser).isBefore(dayjs())
      ) {
        setprogress(2);
        if (statusCompleted === true) {
          setIcon2(true);
        } else {
          setIcon2(false);
          setcancelIcon2(true);
        }
        console.log("active2");
      }
      if (
        dayjs(activecalData[0].calendar.end_date_reviewer).isBefore(dayjs())
      ) {
        setprogress(3);
        if (reviewerstatusCompleted === true) {
          setIcon3(true);
        } else {
          setIcon3(false);
          setcancelIcon3(true);
        }
        //setIcon3(true)
        console.log("active3");
      }
      if (
        dayjs(activecalData[0].calendar.end_date_normalizer).isBefore(dayjs())
      ) {
        setprogress(4);
        if (normalizerstatusCompleted === true) {
          setIcon4(true);
        } else {
          setIcon4(false);
          setcancelIcon4(true);
        }

        console.log("active4");
      }
      if (
        dayjs(activecalData[0].calendar.end_date_F2FMeeting).isBefore(dayjs())
      ) {
        console.log("active5");
        setprogress(5);
        setIcon5(true);
      }
      if (
        dayjs(
          activecalData[0].calendar.end_date_employee_acknowledgement
        ).isBefore(dayjs())
      ) {
        console.log("active6");
        setprogress(6);
        // setIcon6(true)
      }
      if (
        dayjs(activecalData[0].calendar.end_date_mediation).isBefore(dayjs())
      ) {
        console.log("active7");
        setprogress(7);
        // setIcon7(true)
      }
      if (
        dayjs(activecalData[0].calendar.end_date_re_normalization).isBefore(
          dayjs()
        )
      ) {
        console.log("active8");
        setprogress(8);
        // setIcon8(true)
      }
      if (dayjs(activecalData[0].calendar.end_date_closing).isBefore(dayjs())) {
        console.log("active9");
        setprogress(9);
        // setIcon9(true)
      }
    } else if (
      activecalData === undefined &&
      activecalData === "" &&
      activecalData.length < 0
    ) {
      setprogress(0);
    }
  }, [activecalData]);

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
      <Stack direction="row" justifyContent="space-between" height="50px" paddingBottom="30px" >
        <TimelineDiv>Timeline</TimelineDiv>
        {/* <span
          style={{
            color: "#3e8cb5",
            padding:"8px",
            height:"18px",
            border:"1px solid#3e8cb5",
            fontSize:"14px",
            fontFamily:"Arial",
            borderRadius:"8px"
          }}
        >{`${dayjs().format("DD-MMM-YYYY")}`}</span> */}
      </Stack>
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
              <Step key={step.label}>
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
