/* eslint-disable */
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Container, TextField, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import {
  useCreateObjectiveDescriptionMutation,
  useDeleteObjectiveDescriptionMutation,
  useGetObjectiveDescriptionQuery,
  useGetObjectiveTypeQuery,
} from "../../service";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import {
  ADD_LEVEL,
  ADD_OBJECTIVE_DESCRIPTION_1,
  OBJECTIVE,
  VIEW_OBJECTIVE_DESCRIPTION,
} from "../../constants/routes/Routing";
import PAMaster from "../UI/PAMaster";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import Typography from "@mui/material/Typography";
import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  MASTER_NAV,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";
import { AlertDialog } from "..";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import { Scrollbar } from "react-scrollbars-custom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Plus from "../../assets/Images/Plus.svg";
import { sortedLastIndex } from "lodash";

function createData(
  number: number,
  objectivedescription: any,
  detaileddescription: any,
  criteria: any,
  linktobojectivetype: any,
  action: any
) {
  return {
    number,
    objectivedescription,
    detaileddescription,
    criteria,
    linktobojectivetype,
    action,
  };
}

const rows = [
  createData(
    1,
    "Knowledge of the job",
    "The extent to which the employee applies the knowlwdge and skills involved in the current job (please use the JD as a reference)",
    "Rating",
    "Job competencies",
    <Button style={{
      borderRadius: "4px",
      textTransform: "none",
      fontSize: "15px",
      fontFamily: "sans-serif",
      padding: "2px 9px",

      borderColor: "#004C75",
      color: "#004C75",
    }}
    variant="outlined">Add</Button>
  ),
];
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  // backgroundColor:
  //   theme.palette.mode === "dark"
  //     ? "rgba(255, 255, 255, .05)"
  //     : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AddObjectiveDescription1 = (props: any) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const [show, setShow] = useState(false);
  const [index1, setIndex1] = useState<any>("");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const {
    onSubmit,
    defaultValue,
    errorObjectiveDescription1,
    errorObjectiveDescription2,
    data1,
  } = props;

  const [objectiveType, setObjectiveType] = React.useState("");
  const [criteria, setCriteria] = React.useState("Rating");
  const [description, setDescription] = React.useState("");
  const [detailedDescription, setDetailedDescription] = React.useState("");

  const [textfeildError, settextfeildError] = useState(false);
  const [newId, setNewId] = useState("");
  const [open1, setOpen1] = useState(false);

  const { data } = useGetObjectiveDescriptionQuery("");
  console.log(textfeildError, "textfeildError");

  const [activeLevel, setActiveLevel] = React.useState(0);

  const [level_1, setLevel_1] = useState<any>([{ behavioral_objective: "" }]);
  const [level_3, setLevel_3] = useState<any>([{ behavioral_objective: "" }]);
  const [level_2, setLevel_2] = useState<any>([{ behavioral_objective: "" }]);
  const [level_4, setLevel_4] = useState<any>([{ behavioral_objective: "" }]);

  const [level_1_definition, setLevel_1_definition] = useState<any>("");
  const [level_2_definition, setLevel_2_definition] = useState<any>("");
  const [level_3_definition, setLevel_3_definition] = useState<any>("");
  const [level_4_definition, setLevel_4_definition] = useState<any>("");

  const tabValue = ["Level1", "Level2", "Level3", "Level4"];
  const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
    setActiveLevel(newValue);
  };

  const errorHandler = () => {
    if (description !== "" && objectiveType !== "") {
      return settextfeildError(false), submitHandler();
    } else {
      return settextfeildError(true);
    }
  };
  const { name } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //   useEffect(() => {

  //   //  errorHandler ( () => {
  //   //   if (description !== "" && detailedDescription !== "") {
  //   //     return settextfeildError(false), submitHandler();
  //   //   } else {
  //   //     return settextfeildError(true);

  //   //   }

  //   // });

  //   errorHandler()
  // }, [description,detailedDescription, objectiveType]);

  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen1(true);
    setNewId(id);
    setDescription(nameAlert);
    console.log(description);
  };
  const handleClickClose = () => {
    setOpen1(false);
  };
  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      setOpen1(false);
      console.log(newId);
    }
  };

  useEffect(() => {
    if (defaultValue) {
      setDescription(defaultValue.data.description);
      setCriteria(defaultValue.data.criteria);
      setDetailedDescription(defaultValue.data.detailed_description);
      setObjectiveType(defaultValue.data.objective_type._id);
    }
  }, [defaultValue]);
  console.log(description);

  let navigate = useNavigate();

  const [createObjectiveDescription, { isSuccess, isError }] =
    useCreateObjectiveDescriptionMutation();

  const submitHandler = () => {
    // if (isError === false) {

    //   navigate(`${VIEW_OBJECTIVE_DESCRIPTION}`);
    // }

    onSubmit(objectiveType, criteria, description, detailedDescription);
    setDescription("");
    setDetailedDescription("");
    setObjectiveType("");
  };

  const [deleteDesc] = useDeleteObjectiveDescriptionMutation();
  const onDelete = (id: string) => {
    deleteDesc(id);
  };

  const ObjectiveTypeDropDown = () => {
    const handleSelectChange = (event: SelectChangeEvent) => {
      setObjectiveType(event.target.value as string);
    };

    return (
      <>
        {/* <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel
            style={{ marginTop: "-7px", fontSize: "14px" }}
            variant="outlined"
          >
            Select
          </InputLabel>

          <Select
            label="Select"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={objectiveType}
            onChange={handleSelectChange}
            style={{ height: "40px" }}
          >
            {data &&
              data.data.map((objectiveType: any) => {
                return [
                  <MenuItem
                    style={{ fontSize: "14px" }}
                    value={objectiveType._id}
                  >
                    {objectiveType.name}
                  </MenuItem>,
                ];
              })}
          </Select>
        </FormControl> */}
        <FormControl sx={{ m: 1, width: 200 }}>
          <TextField
            select
            label={objectiveType === "" ? "Select" : ""}
            id="outlined-select-select"
            variant="outlined"
            size="small"
            style={{ marginTop: "25px" }}
            value={objectiveType}
            error={!objectiveType && textfeildError}
            helperText={
              !objectiveType && textfeildError
                ? "*Objective type required."
                : " "
            }
            // onChange={handleSelectChange}
            onChange={(e: { target: { value: any } }) => {
              setObjectiveType(e.target.value);
            }}
          >
            {data1 &&
              data1.data.map((objectiveType: any) => {
                return [
                  <MenuItem
                    style={{ fontSize: "14px" }}
                    value={objectiveType._id}
                  >
                    {objectiveType.name}
                  </MenuItem>,
                ];
              })}
          </TextField>
        </FormControl>
      </>
    );
  };

  const Criteria = () => {
    const handleSelectChange = (event: SelectChangeEvent) => {
      setCriteria(event.target.value as string);
    };

    return (
      <>
        <Switch defaultChecked />
      </>
    );
  };

  console.log(data1);
  return (
    <>
      {/* <PAMaster name={"Performance Appraisal"} /> */}

      {/* <Typography
        style={{

          color: "#004C75",
          fontSize: "24px",
          // position:"absolute",
          // bottom:"507px",
          // left:"320px"
          paddingLeft: "24px",
          fontFamily: "regular",
        }}
        component="div"
        sx={{ flexGrow: 1 }}
      >
        <span style={{ marginRight: "8px" }}>
          <IconButton>
            <Link to={OBJECTIVE}>
              <img src={Leftarrow} alt="button" />
            </Link>
          </IconButton>
        </span>

        <label>Objective Description</label>
      </Typography> */}

      <div id="master">
        <Box sx={{ flexGrow: 1 }}>
          <Toolbar>
            <Typography
              style={{
                color: "#004C75",
                fontSize: "24px",
                fontFamily: "regular",
              }}
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <span style={{ marginRight: "4px" }}>
                <IconButton>
                  <Link to={OBJECTIVE}>
                    <img src={Leftarrow} alt="button" />
                  </Link>
                </IconButton>
              </span>

              <label> Objective Description</label>
            </Typography>
            <Button
              style={{
                textTransform: "none",
                color: "#004C75",
                fontSize: "16px",
                marginRight: "30px",
                fontWeight: "400",
              }}
            >
              <Link to="/"> Master</Link>
            </Button>
            <Button
              style={{
                textTransform: "none",
                color: "#004C75",
                fontSize: "16px",
                marginRight: "30px",
                fontWeight: "400",
              }}
              id="basic-button"
              color="inherit"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              Template
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to="/template/create-template"
                >
                  Create Template
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to={VIEW_TEMPLATE}
                >
                  View Template
                </Link>
              </MenuItem>
              {/* <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to="template/edit-template"
                >
                  Edit Template
                </Link>
              </MenuItem> */}
              <MenuItem onClick={handleClose}>
                <Link
                  style={{ color: "GrayText", fontSize: "14px" }}
                  to={CREATE_MAPPING}
                >
                 Create Employee Mapping
                </Link>
              </MenuItem>
            </Menu>
            <Link to={CREATE_CALENDER}>
              <Button
                style={{
                  textTransform: "none",
                  color: "#004C75",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Appraisal Calendar
              </Button>
            </Link>
          </Toolbar>
        </Box>
      </div>
      <Container
        sx={{
          maxWidth: "96% !important",
          height: "calc(100vh - 165px)",
          backgroundColor: "#fff",
          paddingTop: "10px",
        }}
      >
        {errorObjectiveDescription1 && (
          <Alert severity="error">
            Either text field must be empty or entered Objective Description
            already exists!
          </Alert>
        )}
        {errorObjectiveDescription2 && (
          <Alert severity="error">
            Either text field must be empty or entered Objective Description
            already exists!
          </Alert>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingBottom: "20px",
          }}
        >
          <Link to={ADD_OBJECTIVE_DESCRIPTION_1}>
            <Button
              style={{
                borderRadius: "4px",
                textTransform: "none",
                fontSize: "15px",
                fontFamily: "sans-serif",
                padding: "2px 9px",
  
                borderColor: "#004C75",
                color: "#004C75",
              }}
              variant="outlined"
            >
              Add
            </Button>
          </Link>
        </div>
        <div>
          <Typography style={{ width: "100%" }}>
            <TableContainer>
              <Table size="small" aria-label="simple table">
                {/* <TableHead>
                    <TableRow sx={{ bgcolor: "#F7F9FB" }}>
                      <TableCell
                        sx={{
                          fontFamily: "regular",
                          border: 1,
                          borderColor: "lightgrey",
                          color: "#004C75",
                          fontSize: "12px",
                          textAlign: "center",
                        }}
                      >
                        #
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "regular",
                          border: 1,
                          borderColor: "lightgrey",
                          color: "#004C75",
                          fontSize: "12px",
                        }}
                      >
                        Objective Type
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "regular",
                          border: 1,
                          borderColor: "lightgrey",
                          color: "#004C75",
                          fontSize: "12px",
                        }}
                      >
                        Objective Title
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          fontFamily: "regular",
                          border: 1,
                          borderColor: "lightgrey",
                          color: "#004C75",
                          fontSize: "12px",
                        }}
                      >
                        Add Levels
                      </TableCell>
                     
                      <TableCell
                        align="center"
                        sx={{
                          fontFamily: "regular",
                          border: 1,
                          borderColor: "lightgrey",
                          color: "#004C75",
                          fontSize: "12px",
                        }}
                      >
                        Action
                      </TableCell>
                    </TableRow>
                  </TableHead> */}
                <TableHead
                  style={{ position: "sticky", zIndex: "1000", top: "0px" }}
                >
                  <div style={{ backgroundColor: "#F7F9FB", display: "flex" }}>
                    <TableCell
                      sx={{
                        fontFamily: "regular",
                        border: 1,
                        borderColor: "lightgrey",
                        color: "#fff",
                        // fontSize: "12px",
                        // textAlign: "center",
                        width: "0.5%",
                      }}
                    ></TableCell>
                    <TableCell
                      sx={{
                        fontFamily: "regular",
                        border: 1,
                        borderColor: "lightgrey",
                        color: "#004C75",
                        fontSize: "12px",
                        textAlign: "center",
                        width: "0.5%",
                      }}
                    >
                      #
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontFamily: "regular",
                        border: 1,
                        borderColor: "lightgrey",
                        color: "#004C75",
                        fontSize: "12px",
                        width: "33.5%",
                      }}
                    >
                      Objective Type
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontFamily: "regular",
                        border: 1,
                        borderColor: "lightgrey",
                        color: "#004C75",
                        fontSize: "12px",
                        width: "33%",
                      }}
                    >
                      Objective Title
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        fontFamily: "regular",
                        border: 1,
                        borderColor: "lightgrey",
                        color: "#004C75",
                        fontSize: "12px",
                        width: "7%",
                      }}
                    >
                      Add Levels
                    </TableCell>

                    <TableCell
                      align="center"
                      sx={{
                        fontFamily: "regular",
                        border: 1,
                        borderColor: "lightgrey",
                        color: "#004C75",
                        fontSize: "12px",
                        width: "8%",
                      }}
                    >
                      Action
                    </TableCell>
                  </div>
                </TableHead>
                <Scrollbar
                  style={{ width: "100%", height: "calc(100vh - 292px)" }}
                >
                  {data &&
                    data.data.map((row: any, index: number) => (
                      <>
                        {/* <TableBody> */}
                        {/* <Accordion
                          expanded={expanded === "panel1"}
                          onChange={handleChange("panel1")}
                          // sx={{ marginTop: 3 }}
                        > */}
                        <AccordionSummary
                          aria-controls="panel1d-content"
                          id="panel1d-header"
                        >
                          <TableRow
                            key={row.number}
                            style={{ width: "100%", display: "inline-table" }}
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 1,
                                borderColor: "lightgrey",
                              },
                            }}
                          >
                            <ArrowForwardIosSharpIcon
                              onClick={() => {
                                setShow(!show);
                                setIndex1(index);
                              }}
                              sx={{ fontSize: "0.9rem" }}
                            />
                            <TableCell
                              component="th"
                              scope="row"
                              width="3%"
                              sx={{
                                border: 1,
                                borderColor: "lightgrey",
                                fontFamily: "regular",
                                color: "#33333",
                                opacity: "80%",
                                textAlign: "center",
                              }}
                            >
                              {index + 1}{" "}
                            </TableCell>
                            <TableCell
                              align="left"
                              width="38%"
                              sx={{
                                border: 1,
                                padding: 2,
                                borderColor: "lightgrey",
                                fontFamily: "regular",
                                color: "#33333",
                                opacity: "80%",
                                fontSize: "14px",
                              }}
                            >
                              <TextField
                                // select
                                id="outlined-basic"
                                variant="outlined"
                                fullWidth
                                // sx={{ marginTop: "25px" }}
                                value={row.objective_type.name}
                                size="small"
                                inputProps={{ maxLength: 256 }}

                              />
                            </TableCell>
                            <TableCell
                              align="left"
                              width="38%"
                              sx={{
                                border: 1,
                                padding: 1,
                                borderColor: "lightgrey",
                                fontFamily: "regular",
                                color: "#33333",
                                opacity: "80%",
                                fontSize: "14px",
                              }}
                            >
                              <TextField
                                // select
                                fullWidth
                                size="small"
                                multiline
                                value={row.objective_title.objective_title}
                                inputProps={{ maxLength: 256 }}

                              />
                            </TableCell>
                            <TableCell
                              align="left"
                              width="10%"
                              sx={{
                                border: 1,
                                padding: 1,
                                borderColor: "lightgrey",
                                fontFamily: "regular",
                                color: "#33333",
                                opacity: "80%",
                                fontSize: "14px",
                              }}
                            >
                              <Criteria />
                            </TableCell>

                            <TableCell
                              align="center"
                              sx={{
                                border: 1,
                                fontSize: "14px",
                                color: "#33333",
                                opacity: "80%",
                                borderColor: "lightgrey",
                              }}
                              width="20%"
                            >
                              <>
                                <Tooltip title="Edit">
                                  <Link
                                    to={`${ADD_OBJECTIVE_DESCRIPTION_1}/${row._id}`}
                                  >
                                    <IconButton>
                                      <img src={Edit} alt="icon" />
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                                <Tooltip title="Delete">
                                  <IconButton
                                    onClick={() =>
                                      handleClickOpen(
                                        row._id,
                                        row.objective_type.name
                                      )
                                    }
                                  >
                                    <img src={Close} alt="icon" />
                                  </IconButton>
                                </Tooltip>
                                <AlertDialog
                                  isAlertOpen={open1}
                                  handleAlertOpen={() =>
                                    handleClickOpen(
                                      row._id,
                                      row.objective_type.name
                                    )
                                  }
                                  handleAlertClose={handleClickClose}
                                  handleAlertIdClose={handleClickIdClose}
                                  rowAlert={row}
                                >
                                  All the details mapped with this description
                                  will be deleted. Are you sure to delete{" "}
                                  {description}?
                                </AlertDialog>
                              </>
                            </TableCell>
                          </TableRow>
                        </AccordionSummary>

                        {show && index1 === index && (
                          <AccordionDetails>
                            {
                              <Grid>
                                <Grid container>
                                  <Grid
                                    style={{
                                      borderRight: "1px solid lightgrey",
                                      height: "300px",
                                      paddingTop: "20px",
                                    }}
                                    item
                                    xs={2}
                                  >
                                    <Tabs
                                      orientation="vertical"
                                      variant="scrollable"
                                      value={activeLevel}
                                      onChange={handleChangeTabs}
                                      TabIndicatorProps={{
                                        style: {
                                          left: 0,
                                          borderColor: "divider",
                                        },
                                      }}
                                    >
                                      {tabValue.map((k: any) => {
                                        return (
                                          <Tab
                                            // key={k}
                                            label={k}
                                            // value={k}
                                            // onClick={() => handleTabChange(k)}
                                          />
                                        );
                                      })}
                                    </Tabs>
                                  </Grid>

                                  <Grid item xs={10}>
                                    <TabPanel value={activeLevel} index={0}>
                                      <div
                                        style={{
                                          paddingLeft: "30px",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        <p style={{ color: "#004C75" }}>
                                          Level definition
                                        </p>
                                        {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                                        <TextField
                                          // placeholder="Enter Level Definition"
                                          style={{ width: "95%" }}
                                          size="small"
                                          // multiline
                                          inputProps={{ maxLength: 256 }}

                                          onChange={(e) =>
                                            setLevel_1_definition(
                                              e.target.value
                                            )
                                          }
                                          value={row.level_1.level_definition}
                                        />
                                      </div>

                                      <div style={{ paddingLeft: "30px" }}>
                                        <p style={{ color: "#004C75" }}>
                                          Behavioral Objective
                                        </p>
                                        {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                    <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                                        {row &&
                                          row.level_1.behavioral_objective.map(
                                            (level: any, index: number) => {
                                              return (
                                                <>
                                                  <TextField
                                                    // placeholder="Enter Behavioral Objective"
                                                    style={{ width: "94%" }}
                                                    size="small"
                                                    multiline
                                                    inputProps={{ maxLength: 256 }}

                                                    key={index}
                                                    value={level}
                                                    name="level_1"
                                                  />
                                                </>
                                              );
                                            }
                                          )}
                                      </div>
                                    </TabPanel>

                                    <TabPanel value={activeLevel} index={1}>
                                      <div
                                        style={{
                                          paddingLeft: "30px",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        <p style={{ color: "#004C75" }}>
                                          Level definition
                                        </p>
                                        {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                                        <TextField
                                          // placeholder="Enter Level Definition"
                                          style={{ width: "95%" }}
                                          size="small"
                                          // multiline
                                          inputProps={{ maxLength: 256 }}

                                          onChange={(e: any) =>
                                            setLevel_2_definition(
                                              e.target.value
                                            )
                                          }
                                          value={row.level_2.level_definition}
                                        />
                                      </div>

                                      <div style={{ paddingLeft: "30px" }}>
                                        <p style={{ color: "#004C75" }}>
                                          Behavioral Objective
                                        </p>
                                        {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                    <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                                        {row &&
                                          row.level_2.behavioral_objective.map(
                                            (level: any, index: number) => {
                                              return (
                                                <>
                                                  <TextField
                                                    style={{ width: "94%" }}
                                                    size="small"
                                                    multiline
                                                    key={index}
                                                    value={level}
                                                    inputProps={{ maxLength: 256 }}

                                                    name="level_2"
                                                  />
                                                </>
                                              );
                                            }
                                          )}
                                      </div>
                                    </TabPanel>

                                    <TabPanel value={activeLevel} index={2}>
                                      <div
                                        style={{
                                          paddingLeft: "30px",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        <p style={{ color: "#004C75" }}>
                                          Level definition
                                        </p>
                                        {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                                        <TextField
                                          // placeholder="Enter Level Definition"
                                          style={{ width: "95%" }}
                                          size="small"
                                          // multiline
                                          inputProps={{ maxLength: 256 }}

                                          onChange={(e: any) =>
                                            setLevel_3_definition(
                                              e.target.value
                                            )
                                          }
                                          value={row.level_3.level_definition}
                                        />
                                      </div>

                                      <div style={{ paddingLeft: "30px" }}>
                                        <p style={{ color: "#004C75" }}>
                                          Behavioral Objective
                                        </p>
                                        {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                    <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                                        {row &&
                                          row.level_3.behavioral_objective.map(
                                            (level: any, index: number) => {
                                              return (
                                                <>
                                                  <TextField
                                                    style={{ width: "94%" }}
                                                    size="small"
                                                    multiline
                                                    key={index}
                                                    inputProps={{ maxLength: 256 }}

                                                    value={level}
                                                    name="level_3"
                                                  />
                                                </>
                                              );
                                            }
                                          )}
                                      </div>
                                    </TabPanel>

                                    <TabPanel value={activeLevel} index={3}>
                                      Item Four
                                      <div
                                        style={{
                                          paddingLeft: "30px",
                                          paddingBottom: "10px",
                                        }}
                                      >
                                        <p style={{ color: "#004C75" }}>
                                          Level definition
                                        </p>
                                        {/* <p style={{ fontSize:"14px" }}>Level definition</p> */}
                                        <TextField
                                          // placeholder="Enter Level Definition"
                                          style={{ width: "95%" }}
                                          size="small"
                                          // multiline
                                          inputProps={{ maxLength: 256 }}

                                          onChange={(e: any) =>
                                            setLevel_4_definition(
                                              e.target.value
                                            )
                                          }
                                          value={row.level_4.level_definition}
                                        />
                                      </div>
                                      <div style={{ paddingLeft: "30px" }}>
                                        <p style={{ color: "#004C75" }}>
                                          Behavioral Objective
                                        </p>
                                        {/* <p style={{ fontSize:"14px",paddingBottom:"10px"}}>1 Knowledge - Recall of basic Facts</p>
                    <p style={{ fontSize:"14px" }}>2 Enter Behavioral Objective</p> */}

                                        {row &&
                                          row.level_4.behavioral_objective.map(
                                            (level: any, index: number) => {
                                              return (
                                                <>
                                                  <TextField
                                                    // placeholder="Enter Behavioral Objective"
                                                    style={{ width: "94%" }}
                                                    size="small"
                                                    multiline
                                                    key={index}
                                                    value={level}
                                                    inputProps={{ maxLength: 256 }}

                                                    name="level_4"
                                                  />
                                                </>
                                              );
                                            }
                                          )}
                                      </div>
                                    </TabPanel>
                                  </Grid>
                                </Grid>
                              </Grid>
                            }
                          </AccordionDetails>
                        )}
                        {/* </Accordion> */}
                        {/* </TableBody> */}
                      </>
                    ))}
                </Scrollbar>
              </Table>
            </TableContainer>
          </Typography>
          {/*</AccordionSummary>*/}
          {/*<AccordionDetails>*/}
          {/*    <Grid>*/}
          {/*        <Grid container>*/}
          {/*            <Grid*/}
          {/*                style={{*/}
          {/*                    borderRight: "1px solid lightgrey",*/}
          {/*                    height: "300px",*/}
          {/*                    paddingTop: "20px",*/}
          {/*                }}*/}
          {/*                item*/}
          {/*                xs={2}*/}
          {/*            >*/}
          {/*                <Typography>*/}
          {/*                    <Stack*/}
          {/*                        direction="column"*/}
          {/*                        justifyContent="space-evenly"*/}
          {/*                        alignItems="flex-start"*/}
          {/*                        spacing={2}*/}
          {/*                        paddingLeft="80px"*/}
          {/*                    >*/}
          {/*                        <div>*/}
          {/*                            <Button*/}
          {/*                                style={{*/}
          {/*                                    borderRadius: "4px",*/}
          {/*                                    textTransform: "none",*/}
          {/*                                    backgroundColor: "#004D77",*/}
          {/*                                    fontSize: "14px",*/}
          {/*                                    fontFamily: "sans-serif",*/}
          {/*                                    padding: "4px 20px",*/}
          {/*                                }}*/}
          {/*                                variant="contained"*/}
          {/*                            >*/}
          {/*                                Level 1*/}
          {/*                            </Button>*/}
          {/*                        </div>*/}
          {/*                        <div>*/}
          {/*                            <Button*/}
          {/*                                style={{*/}
          {/*                                    borderRadius: "4px",*/}
          {/*                                    textTransform: "none",*/}
          {/*                                    backgroundColor: "#004D77",*/}
          {/*                                    fontSize: "14px",*/}
          {/*                                    fontFamily: "sans-serif",*/}
          {/*                                    padding: "4px 20px",*/}
          {/*                                }}*/}
          {/*                                variant="contained"*/}
          {/*                            >*/}
          {/*                                Level 2*/}
          {/*                            </Button>*/}
          {/*                        </div>*/}
          {/*                        <div>*/}
          {/*                            <Button*/}
          {/*                                style={{*/}
          {/*                                    borderRadius: "4px",*/}
          {/*                                    textTransform: "none",*/}
          {/*                                    backgroundColor: "#004D77",*/}
          {/*                                    fontSize: "14px",*/}
          {/*                                    fontFamily: "sans-serif",*/}
          {/*                                    padding: "4px 20px",*/}
          {/*                                }}*/}
          {/*                                variant="contained"*/}
          {/*                            >*/}
          {/*                                Level 3*/}
          {/*                            </Button>*/}
          {/*                        </div>*/}
          {/*                        <div>*/}
          {/*                            <Button*/}
          {/*                                style={{*/}
          {/*                                    borderRadius: "4px",*/}
          {/*                                    textTransform: "none",*/}
          {/*                                    backgroundColor: "#004D77",*/}
          {/*                                    fontSize: "14px",*/}
          {/*                                    fontFamily: "sans-serif",*/}
          {/*                                    padding: "4px 20px",*/}
          {/*                                }}*/}
          {/*                                variant="contained"*/}
          {/*                            >*/}
          {/*                                Level 4*/}
          {/*                            </Button>*/}
          {/*                        </div>*/}
          {/*                    </Stack>*/}
          {/*                </Typography>*/}
          {/*            </Grid>*/}

          {/*            <Grid item xs={10}>*/}
          {/*                <div*/}
          {/*                    style={{paddingLeft: "30px", paddingBottom: "10px"}}*/}
          {/*                >*/}
          {/*                    <p style={{color: "#004C75"}}>Level definition</p>*/}
          {/*                    <p style={{fontSize: "14px"}}>Level definition</p>*/}
          {/*                    /!* <TextField*/}
          {/*  placeholder="Enter Level Definition"*/}
          {/*  style={{ width: "95%" }}*/}
          {/*  size="small"*/}
          {/*  multiline*/}
          {/*/> *!/*/}
          {/*                </div>*/}

          {/*                <div style={{paddingLeft: "30px"}}>*/}
          {/*                    <p style={{color: "#004C75"}}>Behavioral Objective</p>*/}
          {/*                    <p style={{fontSize: "14px", paddingBottom: "10px"}}>*/}
          {/*                        1 Knowledge - Recall of basic Facts*/}
          {/*                    </p>*/}
          {/*                    <p style={{fontSize: "14px"}}>*/}
          {/*                        2 Enter Behavioral Objective*/}
          {/*                    </p>*/}
          {/*                    /!* <TextField*/}
          {/*  placeholder="Knowledge - Recall of basic Facts"*/}
          {/*  style={{ width: "94%" }}*/}
          {/*  size="small"*/}
          {/*  multiline*/}
          {/*/>*/}

          {/*<Tooltip title="Delete">*/}
          {/*  <IconButton*/}
          {/*  // onClick={() =>*/}
          {/*  //   handleClickOpen(*/}
          {/*  //     objectiveDescription._id,*/}
          {/*  //     objectiveDescription.description*/}
          {/*  //   )*/}
          {/*  // }*/}
          {/*  >*/}
          {/*    <img src={Close} alt="icon" />*/}
          {/*  </IconButton>*/}
          {/*</Tooltip> *!/*/}
          {/*                    <p></p>*/}
          {/*                    /!* <TextField*/}
          {/*  placeholder="Enter Behavioral Objective"*/}
          {/*  style={{ width: "94%" }}*/}
          {/*  size="small"*/}
          {/*  multiline*/}
          {/*/> *!/*/}
          {/*                </div>*/}
          {/*            </Grid>*/}
          {/*        </Grid>*/}
          {/*    </Grid>*/}
          {/*</AccordionDetails>*/}
          {/*</Accordion>*/}
        </div>

        {/* <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "20px",
          }}
        >
          <Button
            style={{
              borderRadius: "4px",
              textTransform: "none",
              backgroundColor: "#004D77",
              fontSize: "18px",
              fontFamily: "sans-serif",
              padding: "2px 25px",
            }}
            variant="contained"
          >
            Save
          </Button>
        </div> */}
      </Container>
    </>
  );
};

export default AddObjectiveDescription1;
