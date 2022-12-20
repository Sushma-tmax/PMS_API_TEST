import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import Cancel from "@mui/icons-material/Cancel";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PAMaster from "../UI/PAMaster";
import { AlertDialog } from "..";
import dayjs from "dayjs";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";
import {
  BOX_GRID,
  EDIT_TEMPLATE,
  EDIT_TEMPLATE_1,
} from "../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  useGetNineboxQuery,
  useUpdateNineBoxMutation,
} from "../../service/ninebox/ninebox";
import { useContext, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useUpdateObjectiveTitleMutation } from "../../service";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Closeicon from "../../assets/Images/Closeicon.svg"
//prompt -------functions
const Text = styled("div")({
  "& .MuiInputBase-input": {
    fontSize: "14px",
    color: "#333333",
    fontFamily: "Arial",
    minHeight: "50px",
    background: "#f8f8f8",
    padding: "8px",
    borderRadius: "5px",
  },
});

const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
    background: "#C2C1C1 !important",
  },
});
export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {
      any: any;
    };
  }
  useEffect(() => {
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

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  const [positionHide, setpositionHide] = useState<any>(false);

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

export default function BoxGrid(props: any) {
  const [value, setValue] = React.useState(0);
  const [saveAlert, setSaveAlert] = useState(false);
  const [hideAlert, setHideAlert] = useState(false);
  const location: any = useLocation();
  const { value1 } = location?.state;
  //prompt ----functions
  const [navPrompt, setnavPrompt] = useState(false);
  // useEffect(() => {
  //   if (name !== '') {
  //     setnavPrompt(true)
  //   } else {
  //     setnavPrompt(false)
  //   }
  // }, [name]);
  console.log(navPrompt, "navPrompt");
  const formIsDirty = navPrompt; // Condition to trigger the prompt.
  usePrompt(
    "Please save the changes before you leave the page.",
    formIsDirty
  );
  //prompt ------functions

  const hideAlertHandler = () => {
    setTimeout(() => {
      setHideAlert(false);
    }, 3000);
  };

  useEffect(() => {
    setValue(value1?.value);
  }, [value1]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const { data } = useGetNineboxQuery("");
  const [updateNinebox] = useUpdateNineBoxMutation();
  const { id } = useParams();

  const [potentialDefinitionHigh, setPotentialDefinitionHigh] = useState("");
  const [potentialDefinitionModerate, setPotentialDefinitionModerate] =
    useState("");
  const [potentialDefinitionLow, setPotentialDefinitionLow] = useState("");

  const [performanceDefinitionHigh, setPerformanceDefinitionHigh] =
    useState("");
  const [performanceDefinitionMedium, setPerformanceDefinitionMedium] =
    useState("");
  const [performanceDefinitionLow, setPerformanceDefinitionLow] = useState("");

  const [performanceDefinitionHighRange, setPerformanceDefinitionHighRange] =
    useState("");
  const [
    performanceDefinitionMediumRange,
    setPerformanceDefinitionMediumRange,
  ] = useState("");
  const [performanceDefinitionLowRange, setPerformanceDefinitionLowRange] =
    useState("");

  const [performanceDefinitionHighFrom, setPerformanceDefinitionHighFrom] =
    useState("");
  const [performanceDefinitionMediumFrom, setPerformanceDefinitionMediumFrom] =
    useState("");
  const [performanceDefinitionLowFrom, setPerformanceDefinitionLowFrom] =
    useState("");

  const [performanceDefinitionHighTo, setPerformanceDefinitionHighTo] =
    useState("");
  const [performanceDefinitionMediumTo, setPerformanceDefinitionMediumTo] =
    useState("");
  const [performanceDefinitionLowTo, setPerformanceDefinitionLowTo] =
    useState("");

  const [formValues, setFormValues] = useState<any>([]);
  //   {
  //     title: "",
  //     definition: "",
  //     performance_level: "",
  //     potential_level: "",
  //   },
  // ])

  useEffect(() => {
    if (data) {
      let temp1 = data?.data?.map((i: any) => {
        let temp2 = i.box_9_definitions.map((j: any) => {
          return j;
        });
        setFormValues(temp2);
        return temp2;
      });
    }
  }, [data]);

  const handleFormChangeTitle = (e: any, i: any, index: any) => {
    console.log(e.target.name, i, index, "anyyyy");
    // const newFormValues = [...formValues];
    // newFormValues[index][e.target.name] = e.target.value;
    // setFormValues(newFormValues);

    const temp1 = formValues.map((j: any, index1: any) => {
      return i._id === j._id && e.target.name === "title"
        ? {
          ...j,
          title: e.target.value,
        }
        : j;
    });
    console.log(temp1, "temp1111");
    setFormValues(temp1);
  };
  const handleFormChangeDefinition = (e: any, i: any, index: any) => {
    console.log(e.target.name, i, index, "anyyyy");

    const temp1 = formValues.map((j: any, index1: any) => {
      return i._id === j._id && e.target.name === "definition"
        ? {
          ...j,
          definition: e.target.value,
        }
        : j;
    });
    console.log(temp1, "temp1111");
    setFormValues(temp1);
  };
  const handleFormChangePerformance = (e: any, i: any, index: any) => {
    console.log(e.target.name, i, index, "anyyyy");

    const temp1 = formValues.map((j: any, index1: any) => {
      return i._id === j._id && e.target.name === "performance_level"
        ? {
          ...j,
          performance_level: e.target.value,
        }
        : j;
    });
    console.log(temp1, "temp1111");
    setFormValues(temp1);
  };
  const handleFormChangePotential = (e: any, i: any, index: any) => {
    console.log(e.target.name, i, index, "anyyyy");

    const temp1 = formValues.map((j: any, index1: any) => {
      return i._id === j._id && e.target.name === "potential_level"
        ? {
          ...j,
          potential_level: e.target.value,
        }
        : j;
    });
    console.log(temp1, "temp1111");
    setFormValues(temp1);
  };

  const updateTitleHandler = () => {
    updateNinebox({
      potential_definitions: {
        high: potentialDefinitionHigh,
        moderate: potentialDefinitionModerate,
        low: potentialDefinitionLow,
      },
      performance_definitions: {
        high: performanceDefinitionHigh,
        medium: performanceDefinitionMedium,
        low: performanceDefinitionLow,
        high_range: performanceDefinitionHighRange,
        medium_range: performanceDefinitionMediumRange,
        low_range: performanceDefinitionLowRange,
        high_from: performanceDefinitionHighFrom,
        high_to: performanceDefinitionHighTo,
        medium_from: performanceDefinitionMediumFrom,
        medium_to: performanceDefinitionMediumTo,
        low_from: performanceDefinitionLowFrom,
        low_to: performanceDefinitionLowTo,
      },
      box_9_definitions: formValues,
      id,
    }).then((item: any) => {
      if (item.data.success === true) {
        setSaveAlert(true);
        setHideAlert(true);
        // hideAlertHandler();
        setOpen2(true);
        setnavPrompt(false);
      } else {
        setSaveAlert(false);
      }
    });
  };

  useEffect(() => {
    if (data) {
      setPotentialDefinitionHigh(data.data[0].potential_definitions.high);
      setPotentialDefinitionModerate(
        data.data[0].potential_definitions.moderate
      );
      setPotentialDefinitionLow(data.data[0].potential_definitions.low);

      setPerformanceDefinitionHigh(data.data[0].performance_definitions.high);
      setPerformanceDefinitionMedium(
        data.data[0].performance_definitions.medium
      );
      setPerformanceDefinitionLow(data.data[0].performance_definitions.low);
      setPerformanceDefinitionHighRange(
        data.data[0].performance_definitions.high_range
      );
      setPerformanceDefinitionMediumRange(
        data.data[0].performance_definitions.medium_range
      );
      setPerformanceDefinitionLowRange(
        data.data[0].performance_definitions.low_range
      );

      setPerformanceDefinitionHighFrom(
        data.data[0].performance_definitions.high_from
      );
      setPerformanceDefinitionMediumFrom(
        data.data[0].performance_definitions.medium_from
      );
      setPerformanceDefinitionLowFrom(
        data.data[0].performance_definitions.low_from
      );

      setPerformanceDefinitionHighTo(
        data.data[0].performance_definitions.high_to
      );
      setPerformanceDefinitionMediumTo(
        data.data[0].performance_definitions.medium_to
      );
      setPerformanceDefinitionLowTo(
        data.data[0].performance_definitions.low_to
      );
    }
  }, [data]);

  const [positionHide1, setpositionHide1] = useState<any>(false);

  useEffect(() => {
    if (id !== "") {
      setpositionHide1(false);
    } else {
    }
  }, [id]);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  // const handleClose2 = () => {
  //   setOpen(false);
  // };

  const handleClose3 = () => {
    setOpen2(false);
  };
  return (
    <>
      <PAMaster name={"Edit 9 Box Grid"} nav={`${BOX_GRID}`} secondName={"9 Box Grid"} />
      <Container
        sx={{
          maxWidth: "95% !important",
          height: "calc(100vh - 165px)",
          backgroundColor: "#fff",
          padding: "20px",
          position: "relative",
          //boxShadow:'2px 4px 6px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Stack direction="column">
          <div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <div>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label="basic tabs example"
                    >
                      <Tab
                        style={{
                          textTransform: "capitalize",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontFamily: "Arial",
                          fontWeight: "600",
                          paddingTop: "0px",
                          paddingBottom: "0px",
                        }}
                        label=" Potential Definitions"
                        {...a11yProps(0)}
                      />
                      <Tab
                        style={{
                          textTransform: "capitalize",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontFamily: "Arial",
                          fontWeight: "600",
                          paddingTop: "0px",
                          paddingBottom: "0px",
                        }}
                        label="Performance Definitions"
                        {...a11yProps(1)}
                      />
                      <Tab
                        style={{
                          textTransform: "capitalize",
                          color: "#3E8CB5",
                          fontSize: "14px",
                          fontFamily: "Arial",
                          fontWeight: "600",
                          paddingTop: "0px",
                          paddingBottom: "0px",
                        }}
                        label="9 Box Definitions"
                        {...a11yProps(2)}
                      />
                    </Tabs>
                  </div>
                  {/* <div
                    style={{
                      paddingLeft: "45%",
                      position: "absolute",
                      width: "40%",
                      paddingBottom: "10px",
                    }}
                  >
                    <Box>
                      {hideAlert && saveAlert === true && (
                        <Alert severity="info">Data saved successfully !</Alert>
                      )}
                    </Box>
                  </div> */}
                  {/* <div style={{ width: "50%" }}> */}
                    <Dialog
                      open={open2}
                      // onClose={handleClose2}
                      BackdropProps={{ style: { background: "#333333 !important", opacity: "10%" } }}
                      PaperProps={{
                        style: {
                          // borderColor:'blue',
                          //border:'1px solid',
                          boxShadow: "none",
                          borderRadius: "6px",
                          //marginTop: "155px",
                          maxWidth: "0px",
                          minWidth: "26%",
                          margin:"0px",
                          padding:"30px",
                          // display: "flex",
                          // justifyContent: "center",
                          // alignItems: "center",
                          // textAlign: "center",
                        },
                      }}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      {/* <DialogTitle
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                        id="alert-dialog-title"
                      >
                        <IconButton onClick={handleClose3}  >
                          <img src={Closeicon} alt="icon" />
                        </IconButton>
                      </DialogTitle> */}
                      <DialogContent>
                        <DialogContentText
                          id="alert-dialog-description"
                          style={{
                            color: "#333333",
                            fontSize: "14px",
                            fontFamily: "Arial",
                            // paddingBottom: "12px",
                            display: "flex",
                            justifyContent: "center",
                            textAlign: "center",
                            wordBreak: "break-word",
                            // height: "100px",
                            // width: "300px",
                            alignItems: "center",
                          }}
                        >
                          {hideAlert && saveAlert === true && (
                            <div>Changes have been saved.</div>
                          )}
                        </DialogContentText>
                      </DialogContent>
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
                            // marginRight: "10px",
                            color: "#3E8CB5",
                            width: "70px",
                            height: "35px",
                            background: "transparent",
                          }}
                          variant="outlined"
                          autoFocus
                          onClick={handleClose3}
                        >
                          Ok
                        </Button>
                      </DialogActions>
                    </Dialog>
                  {/* </div> */}
                  {/* <div style={{ width: "60%" }}>
                    <Link to={`${BOX_GRID}`} style={{ float: "right" }}>
                      <Button
                        style={{
                          borderRadius: "4px",
                          textTransform: "none",
                          backgroundColor: "#004D77",
                          fontSize: "15px",
                          fontFamily: "sans-serif",
                          padding: "5px 13px",
                        }}
                        variant="contained"
                        onClick={() => {
                          updateNinebox({
                            potential_definitions: {
                              high: potentialDefinitionHigh,
                              moderate: potentialDefinitionModerate,
                              low: potentialDefinitionLow,
                            },
                            performance_definitions: {
                              high: performanceDefinitionHigh,
                              medium: performanceDefinitionMedium,
                              low: performanceDefinitionLow,
                            },
                            id,
                          }).then((item: any) => {
                            if (item.data.success === true) {
                              setSaveAlert(true);
                              setHideAlert(true);
                              hideAlertHandler();
                            } else {
                              setSaveAlert(false);
                            }
                          });
                        }}
                      >
                        Save
                      </Button>
                    </Link>
                    <Link to={`${BOX_GRID}`}>
                      <Button
                        style={{
                          textTransform: "none",
                          fontSize: "14px",
                          borderRadius: 8,
                          borderColor: "#014D76",
                          color: "#014D76",
                          padding: "5px 13px",
                        }}
                        variant="outlined"
                      >
                        Cancel
                      </Button>
                    </Link>
                  </div> */}
                </Stack>
                {/*<Link to={`${BOX_GRID}/${data?.data[0]?._id}`}> Edit</Link>*/}
              </Box>
              <TabPanel value={value} index={0}>
                <TableContainer sx={{ paddingTop: "20px" }}>
                  <Scroll>
                    <Scrollbar
                      style={{ width: "100%", height: "calc(100vh - 335px)" }}
                    >
                      <Table size="small" aria-label="simple table">
                        <TableHead
                          style={{
                            position: "sticky",
                            zIndex: "1000",
                            top: "0px",
                          }}
                        >
                          <TableRow sx={{ bgcolor: "#eaeced" }}>
                            <TableCell
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                                width: "100px",
                              }}
                              align="center"
                            >
                              Category
                            </TableCell>
                            <TableCell
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="center"
                            >
                              Description
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            // sx={{
                            //   "&:last-child td, &:last-child th": { border: 0 },
                            // }}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                borderColor: "#lightgrey",
                              },
                            }}
                          >
                            <TableCell
                              width="10%"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              High
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              {/* {positionHide1 &&( */}
                              <Text>
                                <TextField
                                  style={{ cursor: "pointer" }}
                                  placeholder="Add"
                                  fullWidth
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={potentialDefinitionHigh}
                                  onChange={(e) => {
                                    setPotentialDefinitionHigh(e.target.value);
                                    setnavPrompt(true);
                                  }}
                                ></TextField>
                              </Text>
                              {/* )} */}
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                borderColor: "#lightgrey",
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              Moderate
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                  fullWidth
                                  multiline
                                  placeholder="Add"
                                  // rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  value={potentialDefinitionModerate}
                                  autoComplete="off"
                                  onChange={(e) => {
                                    setPotentialDefinitionModerate(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                ></TextField>
                              </Text>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                borderColor: "#lightgrey",
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              Low
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                  fullWidth
                                  multiline
                                  placeholder="Add"
                                  // rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  value={potentialDefinitionLow}
                                  autoComplete="off"
                                  onChange={(e) => {
                                    setPotentialDefinitionLow(e.target.value);
                                    setnavPrompt(true);
                                  }}
                                ></TextField>
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Scrollbar>
                  </Scroll>
                </TableContainer>{" "}
              </TabPanel>
              <TabPanel value={value} index={1}>
                <TableContainer sx={{ paddingTop: "20px" }}>
                  <Scroll>
                    <Scrollbar
                      style={{ width: "100%", height: "calc(100vh - 335px)" }}
                    >
                      <Table size="small" aria-label="simple table">
                        <TableHead
                          style={{
                            position: "sticky",
                            zIndex: "1000",
                            top: "0px",
                          }}
                        >
                          <TableRow sx={{ bgcolor: "#eaeced" }}>
                            <TableCell
                              width="30%"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                                width: "100px",
                              }}
                              align="center"
                            >
                              Category
                            </TableCell>
                            <TableCell
                              width="70%"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                                width: "100px",
                              }}
                              align="center"
                            >
                              Description
                            </TableCell>
                            {/* <TableCell
                              width="20%"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="left"
                            >
                              Performance Range
                            </TableCell> */}

                            <TableCell
                              width="20%"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="center"
                            >
                              From
                            </TableCell>
                            <TableCell
                              width="20%"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                              }}
                              align="center"
                            >
                              To
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                borderColor: "#lightgrey",
                              },
                            }}
                          >
                            <TableCell
                              width="10%"
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              High
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                  fullWidth
                                  placeholder="Add"
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionHigh}
                                  onChange={(e) => {
                                    setPerformanceDefinitionHigh(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>

                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingLeft: "0px",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                  fullWidth
                                  placeholder="Add"
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionHighFrom}
                                  onChange={(e) => {
                                    setPerformanceDefinitionHighFrom(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingLeft: "0px",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                 placeholder="Add"
                                  fullWidth
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionHighTo}
                                  onChange={(e) => {
                                    setPerformanceDefinitionHighTo(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                borderColor: "#lightgrey",
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              Moderate
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                  fullWidth
                                  placeholder="Add"
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionMedium}
                                  onChange={(e) => {
                                    setPerformanceDefinitionMedium(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingLeft: "0px",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                 placeholder="Add"
                                  fullWidth
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionMediumFrom}
                                  onChange={(e) => {
                                    setPerformanceDefinitionMediumFrom(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingLeft: "0px",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                 placeholder="Add"
                                  fullWidth
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionMediumTo}
                                  onChange={(e) => {
                                    setPerformanceDefinitionMediumTo(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>
                          </TableRow>

                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                borderColor: "#lightgrey",
                              },
                            }}
                          >
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              Low
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                 placeholder="Add"
                                  id="id"
                                  fullWidth
                                  multiline
                                  // rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionLow}
                                  onChange={(e) => {
                                    setPerformanceDefinitionLow(e.target.value);
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingLeft: "0px",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                 placeholder="Add"
                                  fullWidth
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionLowFrom}
                                  onChange={(e) => {
                                    setPerformanceDefinitionLowFrom(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>
                            <TableCell
                              sx={{
                                fontSize: "14px",
                                color: "#333333",
                                fontFamily: "Arial",
                                paddingLeft: "0px",
                              }}
                              align="left"
                            >
                              <Text>
                                <TextField
                                 placeholder="Add"
                                  fullWidth
                                  multiline
                                  //rows={2}
                                  inputProps={{ maxLength: 512 }}
                                  variant="standard"
                                  InputProps={{
                                    disableUnderline: true, // <== added this
                                  }}
                                  autoComplete="off"
                                  value={performanceDefinitionLowTo}
                                  onChange={(e) => {
                                    setPerformanceDefinitionLowTo(
                                      e.target.value
                                    );
                                    setnavPrompt(true);
                                  }}
                                />
                              </Text>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </Scrollbar>
                  </Scroll>
                </TableContainer>
              </TabPanel>

              <TabPanel value={value} index={2}>
                <TableContainer sx={{ paddingTop: "20px" }}>
                  <Scroll>
                    <Scrollbar
                      style={{ width: "100%", height: "calc(100vh - 335px)" }}
                    >
                      <Table
                        size="small"
                        stickyHeader
                        aria-label="simple table"
                      >
                        <TableHead sx={{ bgcolor: "#eaeced" }}>
                          <TableRow
                            sx={{
                              "& td, & th": {
                                borderColor: "#lightgrey",
                                bgcolor: "#eaeced",
                                //   whiteSpace:"nowrap"
                              },
                            }}
                          >
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                                bgcolor: "#eaeced",
                                width: "20%",
                              }}
                            >
                              9 Box Title
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                                bgcolor: "#eaeced",
                              }}
                            >
                              Description
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                                bgcolor: "#eaeced",
                              }}
                            >
                              Potential Level
                            </TableCell>
                            <TableCell
                              align="center"
                              sx={{
                                fontFamily: "Arial",
                                color: "#3E8CB5",
                                fontSize: "14px",
                                fontWeight: "600",
                                bgcolor: "#eaeced",
                              }}
                            >
                              Performance Level
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {formValues.map((formInput: any, index: any) => {
                            return (
                              <TableRow
                              // sx={{
                              //   "&:last-child td, &:last-child th": { border: 0 },
                              // }}
                              >
                                <TableCell
                                  align="left"
                                  width="20%"
                                  sx={{
                                    // padding: 2,
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    fontSize: "14px",
                                    // border: "1px solid #e0e0e0",
                                  }}
                                >
                                  <TextField
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        textTransform: "none",
                                        fontFamily: "Arial",
                                        fontSize: "14px",
                                        color: "#333333",
                                        backgroundColor: "#f8f8f8",
                                        padding: "8px",
                                        borderRadius: "5px",
                                      },
                                    }}
                                    id="outlined-basic"
                                    // placeholder="Potential Talents"
                                    placeholder="Add"
                                    size="small"
                                    multiline
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    inputProps={{ maxLength: 256 }}
                                    variant="standard"
                                    InputProps={{
                                      disableUnderline: true, // <== added this
                                    }}
                                    name="title"
                                    value={formInput.title}
                                    onChange={(e) => {
                                      handleFormChangeTitle(
                                        e,
                                        formInput,
                                        index
                                      );
                                      setnavPrompt(true);
                                    }}
                                  ></TextField>
                                </TableCell>
                                <TableCell
                                  align="left"
                                  width="55%"
                                  sx={{
                                    // padding: 2,
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    fontSize: "14px",
                                    // border: "1px solid #e0e0e0",
                                  }}
                                >
                                  <TextField
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        textTransform: "none",
                                        fontFamily: "Arial",
                                        fontSize: "14px",
                                        color: "#333333",
                                        backgroundColor: "#f8f8f8",
                                        padding: "8px",
                                        borderRadius: "5px",
                                      },
                                    }}
                                    id="outlined-basic"
                                    placeholder="Add"
                                    size="small"
                                    multiline
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    variant="standard"
                                    inputProps={{ maxLength: 256 }}
                                    InputProps={{
                                      disableUnderline: true, // <== added this
                                    }}
                                    name="definition"
                                    value={formInput.definition}
                                    onChange={(e) => {
                                      handleFormChangeDefinition(
                                        e,
                                        formInput,
                                        index
                                      );
                                      setnavPrompt(true);
                                    }}
                                  ></TextField>
                                </TableCell>

                                <TableCell
                                  align="left"
                                  // width="10%"
                                  sx={{
                                    // padding: 2,
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    fontSize: "14px",
                                    // border: "1px solid #e0e0e0",
                                  }}
                                >
                                  <TextField
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        textTransform: "none",
                                        fontFamily: "Arial",
                                        fontSize: "14px",
                                        color: "#333333",
                                        backgroundColor: "#f8f8f8",
                                        padding: "8px",
                                        borderRadius: "5px",
                                      },
                                    }}
                                    id="outlined-basic"
                                    disabled
                                    placeholder="Add"
                                    size="small"
                                    multiline
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    variant="standard"
                                    inputProps={{ maxLength: 256 }}
                                    InputProps={{
                                      disableUnderline: true, // <== added this
                                    }}
                                    name="potential_level"
                                    value={formInput.potential_level}
                                    onChange={(e) => {
                                      handleFormChangePotential(
                                        e,
                                        formInput,
                                        index
                                      );
                                      setnavPrompt(true);
                                    }}
                                  ></TextField>
                                </TableCell>
                                <TableCell
                                  align="left"
                                  // width="10%"
                                  sx={{
                                    // padding: 2,
                                    fontFamily: "Arial",
                                    color: "#333333",
                                    fontSize: "14px",
                                    // border: "1px solid #e0e0e0",
                                  }}
                                >
                                  <TextField
                                    sx={{
                                      "& .MuiInputBase-input": {
                                        textTransform: "none",
                                        fontFamily: "Arial",
                                        fontSize: "14px",
                                        color: "#333333",
                                        backgroundColor: "#f8f8f8",
                                        padding: "8px",
                                        borderRadius: "5px",
                                      },
                                    }}
                                    id="outlined-basic"
                                    placeholder="Add"
                                    disabled
                                    size="small"
                                    multiline
                                    autoComplete="off"
                                    style={{ width: "100%" }}
                                    variant="standard"
                                    inputProps={{ maxLength: 256 }}
                                    InputProps={{
                                      disableUnderline: true, // <== added this
                                    }}
                                    name="performance_level"
                                    value={formInput.performance_level}
                                    onChange={(e) => {
                                      handleFormChangePerformance(
                                        e,
                                        formInput,
                                        index
                                      );
                                      setnavPrompt(true);
                                    }}
                                  ></TextField>
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </Scrollbar>
                  </Scroll>
                </TableContainer>
              </TabPanel>
            </Box>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="center"
              spacing={2}
              paddingTop="35px"
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
                  width: "70px"
                }}
                variant="outlined"
                onClick={() => {
                  updateTitleHandler();
                }}
              >
                Save
              </Button>

              <Link to={`${BOX_GRID}`} state={{ from: true, name: `${value}` }}>
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
                    setnavPrompt(false);
                    setValue(value);
                  }}
                >
                  Cancel
                </Button>
              </Link>
            </Stack>
          </div>
        </Stack>
      </Container>
    </>
  );
}
