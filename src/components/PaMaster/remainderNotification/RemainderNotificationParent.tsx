import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useContext,
} from "react";
import Stack from "@mui/material/Stack";
import {
  Container,
  Switch,
  Snackbar,
  Alert,
  TableHead,
  TextField,
} from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import Box, { BoxProps } from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import dayjs, { Dayjs } from "dayjs";
import RemainderNotificationTabs from "./RemainderNotificationTabs";
import RemainderNotificationSchedules from "./RemainderNotificationSchedules";
import PAMaster from "../../UI/PAMaster";
import Scrollbar from "react-scrollbars-custom";
import {
  useGetReviewerDetailsQuery,
  useGetNormalizerDetailsQuery,
  useGetReminderNotificationDataQuery,
  useGetAppraiserDetailsQuery,
  useUpdateReminderNotificationDataMutation,
  useGetReminderActiveValueQuery,
  useUpdateReminderActiveValueMutation,
  useGetActiveCalenderQuery,
  useGetCalenderQuery,
} from "../../../service";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AlertDialogSuccess from "../../UI/DialogSuccess";
import { useNavigate, useParams } from "react-router-dom";
import ReminderNotificationTimeline from "./ReminderNotificationTimeline";
import ReminderTimelineFilter from "./ReminderTimelineFilter";
import AlertYesNo from "../../UI/DialogforunsavedChangesAlert";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  customAlert: {
    backgroundColor: "#3e8cb5",
    color: "white",
    height: "60px !important",
    alignItems: "center",
    fontSize: "1rem",
  },
  customSnackbar: {
    paddingBottom: "16px",
    paddingRight: "16px",
  },
}));

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
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
export default function RemainderNotificationParent() {
  const classes = useStyles();
  //prompt ------functions
  const [navPrompt, setnavPrompt] = React.useState(false);
  const navigate = useNavigate();
  const CustomScrollbar = Scrollbar as any;
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt;
  usePrompt(
    "Any changes you have made will not be saved if you leave the page. ",
    formIsDirty
  );
  //prompt ------functions
  const { data: activecalendardata } = useGetActiveCalenderQuery("");
  console.log(activecalendardata, "activecalendardata");
  const [tabValue, setTabValue] = useState<any>(0);
  const [tabName, settabName] = useState<any>("Appraiser");
  const [saveTabValue, setSaveTabValue] = useState<any>(0);
  const [saveTabName, setSavetabName] = useState<any>("Appraiser");
  console.log(tabName, "tabName");
  const { data: reminderStatus } = useGetReminderActiveValueQuery("");
  console.log(reminderStatus, "reminderStatus");
  const [reminderStatusUpdate] = useUpdateReminderActiveValueMutation();
  const { data: appraiserDetails } = useGetAppraiserDetailsQuery("");
  const { data: reviewerDetails } = useGetReviewerDetailsQuery("");
  const { data: normalizerDetails } = useGetNormalizerDetailsQuery("");
  const { data: reminderNotificationData } =
    useGetReminderNotificationDataQuery(tabName);
  const [updateRemainderNotificationDetails] =
    useUpdateReminderNotificationDataMutation();
  console.log(appraiserDetails, "appraiserDetails");
  console.log(reviewerDetails, "appraiserDetails");
  console.log(normalizerDetails, "appraiserDetails");
  console.log(reminderNotificationData, "reminderNotificationData");

  const [reminderActiveStatus, setReminderActiveStatus] = useState<any>("");
  const [toggleActiveID, setToggleActiveID] = useState<string>("");
  console.log(
    reminderActiveStatus,
    toggleActiveID,
    reminderStatus?.data[0]?.reminderNotificationStatus,
    "reminderStatus"
  );
  //success dialog
  const [reminderDetailConfirmation, setReminderDetailConfirmation] =
    useState<any>(false);
  const [reminderDetailsave, setReminderDetailSave] = useState<any>(false);
  const [reminderDetailConfirmationMSG, setReminderDetailConfirmationMSG] =
    useState<any>("");
  const handleCloseDialog = () => {
    setReminderDetailConfirmation(false);
    setReminderDetailConfirmationMSG("");
  };
  const handleCloseSnackbar = () => {
    setReminderDetailSave(false);
    //setReminderDetailConfirmationMSG("");
  };
  //Remainder schedule before timeline
  const [reminderStartDate, setReminderStartDate] = useState<Dayjs | null>(
    dayjs("2022-04-17")
  );
  const [reminderfrequency, setReminderfrequency] = useState<any>("");
  const [reminderSubject, setReminderSubject] = useState<any>("");
  const [reminderEmailContent, setReminderEmailContent] = useState<any>("");
  console.log(reminderSubject, reminderEmailContent, "reminderEmailContent");
  //for validation
  const [tabChangeAlert, setTabChangeAlert] = useState(false);
  const [tabChangeAlertMSG, setTabChangeAlertMSG] = useState("");
  //for timeline filter
  const [activeCalenderName, setactiveCalenderName] = React.useState<any>("");
  const [calendarName, setCalendarName] = React.useState("");
  const handleChangeCalendarName = (event: SelectChangeEvent) => {
    setCalendarName(event.target.value as string);
  };
  const { data: calenderData, isLoading } = useGetCalenderQuery("");
  const [calNames, setCalNames] = useState<any>(["hello"]);
  console.log(calenderData, "calanderData");
  console.log(calNames, "calNames");
  useEffect(() => {
    const calData = calenderData?.data?.filter((i: any) => {
      return i?.status !== "completed";
    });
    setCalNames(calData);
    const calDataToShow = calData?.filter((i: any) => {
      return i?.name == calendarName;
    });

    if (calDataToShow) {
      setactiveCalenderName(calDataToShow[0]);
    }
  }, [calenderData, calendarName]);
  //for timeline filter
  //Remainder schedule after timeline
  const [reminderStartDateAfter, setReminderStartDateAfter] = useState<
    Dayjs | null | Date
  >(dayjs("2022-04-17"));
  const [reminderfrequencyAfter, setReminderfrequencyAfter] = useState<any>("");
  const [reminderSubjectAfter, setReminderSubjectAfter] = useState<any>("");
  const [reminderEmailContentAfter, setReminderEmailContentAfter] =
    useState<any>("");
  //for drop down
  const names = ["Appraiser", "Reviewer", "HR Normalizer", "Employee"];
  const [selectedroleName, setSelectedroleName] = React.useState<string[]>([]);
  const handleChangeSelectingRoles = (
    event: SelectChangeEvent<typeof selectedroleName>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedroleName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  console.log(selectedroleName, "selectedroleName");
  const [selectedCategory, setSelectedCategory] = React.useState<string[]>([]);
  const handleChangeSelectedCategory = (
    event: SelectChangeEvent<typeof selectedCategory>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  //onChange of textfeilds
  const handleReminderActiveStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReminderActiveStatus(event.target.checked);
    reminderStatusUpdate(event.target.checked);
    reminderStatusUpdate({
      reminderStatus: event.target.checked,
      id: toggleActiveID,
    });
  };
  const handleReminderStartDate = (e: any) => {
    // const currentDate = new Date();
    // const selectedDate = new Date(e);
    //  const currentDate = dayjs();
    // const selectedDate = dayjs(e);
    // console.log(e,currentDate, "dataSelected",activeCalenderName?.start_date,activeCalenderName?.end_date);
    // if (
    //   selectedDate.isSameOrAfter(activeCalenderName?.start_date) &&
    //   selectedDate.isSameOrBefore(activeCalenderName?.end_date)
    // ) {
    //   console.log("Selected properly");
    //   setReminderStartDate(e);
    //   setnavPrompt(true);
    // } else {
    //show validation
    //@ts-ignore
    //  setReminderStartDate(reminderNotificationData?.data[0]?.startDate);
    //  setReminderDetailConfirmationMSG("The reminder start date must be within the calendar start and end date.")
    //  setReminderDetailConfirmation(true)
    // }
    console.log(calendarName, reminderStartDate, e, "eeeeeeeeeeeee");
    setReminderStartDate(e);
    setnavPrompt(true);
  };
  const handlereminderfrequency = (e: any) => {
    setReminderfrequency(e.target.value);
    setnavPrompt(true);
  };
  const handleReminderSubject = (e: any) => {
    setReminderSubject(e.target.value);
    setnavPrompt(true);
  };
  const handleReminderEmailContent = (e: any) => {
    setReminderEmailContent(e.target.value);
    setnavPrompt(true);
  };
  const handleReminderStartDateAfter = (e: any) => {
    setReminderStartDateAfter(e);
    setnavPrompt(true);
  };
  const handlereminderfrequencyAfter = (e: any) => {
    setReminderfrequencyAfter(e.target.value);
    setnavPrompt(true);
  };
  const handleReminderSubjectAfter = (e: any) => {
    setReminderSubjectAfter(e.target.value);
    setnavPrompt(true);
  };
  const handleReminderEmailContentAfter = (e: any) => {
    setReminderEmailContentAfter(e.target.value);
    setnavPrompt(true);
  };
  function stripHTMLTagsUsingDOMParser(input: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(input, "text/html");
    return doc.body.textContent || "";
  }
  const handleClickSaveButton = () => {
    const stringWithTags = reminderEmailContent;
    const textWithoutTags = stripHTMLTagsUsingDOMParser(stringWithTags);
    const currentDate = dayjs();
    const selectedDate = dayjs(reminderStartDate);

    if (
      selectedDate.isSameOrAfter(activeCalenderName?.start_date) &&
      selectedDate.isSameOrBefore(activeCalenderName?.end_date)
    ) {
      if (reminderSubject == "") {
        setReminderDetailConfirmationMSG("The reminder subject is required.");
        setReminderDetailConfirmation(true);
      } else {
        if (textWithoutTags == "") {
          setReminderDetailConfirmationMSG("The reminder content is required.");
          setReminderDetailConfirmation(true);
        } else {
          //save function
          updateRemainderNotificationDetails({
            reminderType: tabName,
            startDate: reminderStartDate,
            occurance: reminderfrequency,
            subject: reminderSubject,
            content: reminderEmailContent,
            //sendMailTo: selectedroleName,
            reminderTimeline: "Before timeline",
            sendMailTo: tabName,
          }).then((res: any) => {
            res.error ? (
              <> </>
            ) : (
              setReminderDetailConfirmationMSG(
                "Changes have been saved successfully"
              )
            );
            //old alert
            //setReminderDetailConfirmation(true);
            setReminderDetailSave(true);
            setnavPrompt(false);
          });
        }
      }
    } else {
      setReminderDetailConfirmationMSG(
        "The reminder start date must be within the calendar start and end date."
      );
      setReminderDetailConfirmation(true);
    }
    //after schedule
    // updateRemainderNotificationDetails({
    // reminderType: tabName,
    // startDate: reminderStartDateAfter,
    // occurance: reminderfrequencyAfter,
    // subject: reminderSubjectAfter,
    // content: reminderEmailContentAfter,
    // sendMailTo: selectedCategory,
    // reminderTimeline: "After timeline",
    //  sendMailTo:tabName
    //})
  };

  console.log(
    reminderStartDate,
    reminderfrequency,
    reminderSubject,
    reminderEmailContent,
    reminderActiveStatus,
    reminderfrequencyAfter,
    reminderSubjectAfter,
    reminderEmailContentAfter,
    "states"
  );
  //useEffect for setting the default values of textfeilds
  React.useEffect(() => {
    if (reminderStatus) {
      if (calendarName) {
        setReminderActiveStatus(
          reminderStatus?.data[0]?.reminderNotificationStatus
        );
        setToggleActiveID(reminderStatus?.data[0]?._id);
      } else {
        //for disabling when there iis no active calendar
        setReminderActiveStatus(false);
      }
    }
    //initializing variable
    let reminder_startdate = "";
    let reminder_frequency = "";
    let reminder_Subject = "";
    let reminder_EmailContent = "";
    let reminder_StartDateAfter = "";
    let reminder_frequencyAfter = "";
    let reminder_SubjectAfter = "";
    let reminder_EmailContentAfter = "";
    //@ts-ignore
    reminder_startdate = reminderNotificationData?.data[0]?.startDate;
    //@ts-ignore
    reminder_frequency = reminderNotificationData?.data[0]?.occurance;
    //@ts-ignore
    reminder_Subject = reminderNotificationData?.data[0]?.subject;
    //@ts-ignore
    reminder_EmailContent = reminderNotificationData?.data[0]?.content;
    //commented for now
    //@ts-ignore
    // reminder_StartDateAfter = reminderNotificationData?.data[1]?.startDate;
    //@ts-ignore
    // reminder_frequencyAfter = reminderNotificationData?.data[1]?.occurance;
    //@ts-ignore
    // reminder_SubjectAfter = reminderNotificationData?.data[1]?.subject;
    //@ts-ignore
    //reminder_EmailContentAfter = reminderNotificationData?.data[1]?.content;
    //@ts-ignore
    setReminderStartDate(reminder_startdate);
    setReminderfrequency(reminder_frequency);
    setReminderSubject(reminder_Subject);
    setReminderEmailContent(reminder_EmailContent);
    //commented for now
    //@ts-ignore
    //setReminderStartDateAfter(reminder_StartDateAfter);
    /// setReminderfrequencyAfter(reminder_frequencyAfter);
    // setReminderSubjectAfter(reminder_SubjectAfter);
    // setReminderEmailContentAfter(reminder_EmailContentAfter);
    //for time line
    //  setactiveCalenderName(activecalendardata?.data[0]);
    //  setCalendarName(activecalendardata?.data[0]?.name);
  }, [reminderNotificationData, tabValue]);
  //Setting timeline's default data
  useMemo(() => {
    setactiveCalenderName(activecalendardata?.data[0]);
    setCalendarName(activecalendardata?.data[0]?.name);
  }, [activecalendardata]);
  //Tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    //validation
    if (navPrompt) {
      setTabChangeAlertMSG(
        "Any changes you have made will not be saved if you leave the page. "
      );
      setTabChangeAlert(true);
      setSavetabName(event.currentTarget.textContent);
      setSaveTabValue(newValue);
    } else {
      setTabValue(newValue);
      settabName(event.currentTarget.textContent);
    }
    console.log(event.currentTarget.textContent, "eeeeeeee");
  };
  const stayInSame = () => {
    setTabChangeAlert(false);
  };
  const moveToNext = () => {
    setTabChangeAlert(false);
    setTabValue(saveTabValue);
    settabName(saveTabName);
    setnavPrompt(false);
  };
  return (
    <>
      <PAMaster name={"Reminder Settings"} />
      <div
        style={{
          background: "#F1F1F1",
          height: "auto",
          minHeight: "100px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "20px",
            marginLeft: "25px",
            marginRight: "25px",
            height: "auto",
            marginBottom:"25px"
          }}
        >
          {/* <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              style={{
                color: "#3E8CB5",
                fontSize: "16px",
                fontFamily: "Arial",
                // marginTop: "5px",
                // margin: "25px",
                //padding: "10px",
              }}
            >
              Reminder
            </Typography>

            <Switch
              size="small"
              checked={reminderActiveStatus}
              onChange={handleReminderActiveStatus}
            />
          </div> */}
          <Grid container spacing={2}>
            <Grid item xs={12} md={2}>
              <div>
                {calNames && (
                  <ReminderTimelineFilter
                    calNames={calNames}
                    calendarName={calendarName}
                    setCalendarName={setCalendarName}
                    handleChangeCalendarName={handleChangeCalendarName}
                  />
                )}
              </div>
              <RemainderNotificationTabs
                tabValue={tabValue}
                handleChange={handleChange}
                handleReminderActiveStatus={handleReminderActiveStatus}
                reminderActiveStatus={reminderActiveStatus}
                setnavPrompt={setnavPrompt}
                activecalendardata={activecalendardata}
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <div>
                <ReminderNotificationTimeline
                  activeCalenderName={activeCalenderName}
                />
                <RemainderNotificationSchedules
                  reminderStartDate={reminderStartDate}
                  reminderfrequency={reminderfrequency}
                  reminderSubject={reminderSubject}
                  reminderEmailContent={reminderEmailContent}
                  reminderActiveStatus={reminderActiveStatus}
                  reminderStartDateAfter={reminderStartDateAfter}
                  reminderfrequencyAfter={reminderfrequencyAfter}
                  reminderSubjectAfter={reminderSubjectAfter}
                  reminderEmailContentAfter={reminderEmailContentAfter}
                  setReminderEmailContent={setReminderEmailContent}
                  handleReminderActiveStatus={handleReminderActiveStatus}
                  handleReminderStartDate={handleReminderStartDate}
                  handlereminderfrequency={handlereminderfrequency}
                  handleReminderSubject={handleReminderSubject}
                  handleReminderEmailContent={handleReminderEmailContent}
                  handleReminderStartDateAfter={handleReminderStartDateAfter}
                  handlereminderfrequencyAfter={handlereminderfrequencyAfter}
                  handleReminderSubjectAfter={handleReminderSubjectAfter}
                  handleReminderEmailContentAfter={
                    handleReminderEmailContentAfter
                  }
                  handleClickSaveButton={handleClickSaveButton}
                  selectedroleName={selectedroleName}
                  handleChangeSelectingRoles={handleChangeSelectingRoles}
                  selectedCategory={selectedCategory}
                  handleChangeSelectedCategory={handleChangeSelectedCategory}
                  names={names}
                  reminderNotificationData={reminderNotificationData}
                />
              </div>
            </Grid>
            <AlertDialogSuccess
              isAlertOpen={reminderDetailConfirmation}
              handleAlertClose={handleCloseDialog}
            >
              {reminderDetailConfirmationMSG}
            </AlertDialogSuccess>
            <Snackbar
              className={classes.customSnackbar}
              open={reminderDetailsave}
              autoHideDuration={3000}
              onClose={handleCloseSnackbar}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Alert
                className={classes.customAlert}
                onClose={handleCloseSnackbar}
                sx={{ width: "100%" }}
                icon={false}
              >
                <b> Changes were successfully saved.</b>
              </Alert>
            </Snackbar>
            <AlertYesNo
              isAlertOpen={tabChangeAlert}
              handleAlertIdClose={moveToNext}
              handleAlertClose={stayInSame}
            />
              {/* {tabChangeAlertMSG}
            </AlertYesNo> */}
          </Grid>
        </Box>
      </div>
    </>
  );
}
