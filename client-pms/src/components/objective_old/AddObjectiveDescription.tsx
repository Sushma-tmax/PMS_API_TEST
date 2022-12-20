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
import {
  useCreateObjectiveDescriptionMutation,
  useGetObjectiveTypeQuery,
} from "../../service";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate } from "react-router-dom";
import {
  OBJECTIVE,
  VIEW_OBJECTIVE_DESCRIPTION,
} from "../../constants/routes/Routing";
import PAMaster from "../UI/PAMaster";
import { Scrollbar } from "react-scrollbars-custom";
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

export default function AddObjectiveDescription(props: any) {
  const {
    onSubmit,
    defaultValue,
    errorObjectiveDescription1,
    errorObjectiveDescription2,
    data1,
  } = props;
  const { data, isLoading } = useGetObjectiveTypeQuery("");

  const [objectiveType, setObjectiveType] = React.useState("");
  const [criteria, setCriteria] = React.useState("Rating");
  const [description, setDescription] = React.useState("");
  const [detailedDescription, setDetailedDescription] = React.useState("");

  const [textfeildError, settextfeildError] = useState(false);
  console.log(textfeildError, "textfeildError");
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

  const [createObjectiveDescription, { isSuccess,isError }] =
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
            
            label={objectiveType === "" ? "Select": ""}
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
        <FormControl sx={{ m: 1, width: 150 }}>
          <TextField size="small" value="Rating"  inputProps={{ maxLength: 256 }}
 />
        </FormControl>
      </>
    );
  };

  console.log(data);
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
            Either text field must be empty or entered Objective Description already exists!
          </Alert>
        )}
        {errorObjectiveDescription2 && (
          <Alert severity="error">
            Either text field must be empty or entered Objective Description already exists!
          </Alert>
        )}
        <TableContainer sx={{ marginTop: 3 }}>
          <Scrollbar style={{ width: "100%", height: "420px" }}>
            <Table size="small" aria-label="simple table">
              <TableHead style={{position:"sticky" ,zIndex:"1000", top:"0px"}}>
                <TableRow sx={{ bgcolor: "#F7F9FB" }}>
                  <TableCell
                    sx={{
                      fontFamily: "regular",
                      border: 1,
                      borderColor: "lightgrey",
                      color: "#004C75",
                      fontSize: "12px",
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
                    Objective description
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
                    Detailed description
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
                    Criteria
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
                    Link to objective type
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
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.number}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 1,
                        borderColor: "lightgrey",
                      },
                    }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      sx={{
                        border: 1,
                        borderColor: "lightgrey",
                        fontFamily: "regular",
                        color: "#33333",
                        opacity: "80%",
                      }}
                    >
                      {row.number}{" "}
                    </TableCell>
                    <TableCell
                      align="left"
                      width={250}
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
                        id="outlined-basic"
                        variant="outlined"
                        sx={{ marginTop: "25px" }}
                        value={description}
                        size="small"
                        inputProps={{ maxLength: 512 }}

                        onChange={(e) => setDescription(e.target.value)}
                        error={!description && textfeildError}
                        helperText={
                          !description && textfeildError
                            ? "*Description required."
                            : " "
                        }
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      width={550}
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
                        size="small"
                        multiline
                        fullWidth
                        value={detailedDescription}
                        inputProps={{ maxLength: 512 }}

                        onChange={(e) => setDetailedDescription(e.target.value)}
                      />
                    </TableCell>
                    <TableCell
                      align="left"
                      width={150}
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
                      align="left"
                      width={200}
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
                      <ObjectiveTypeDropDown />
                    </TableCell>
                    <TableCell
                      align="center"
                      width={130}
                      sx={{
                        border: 1,
                        padding: 1,
                        borderColor: "lightgrey",
                      }}
                    >
                      <>
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
                          onClick={() => {
                            errorHandler();

                            // submitHandler();
                          }}
                        >
                          Add
                        </Button>
                      </>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </Container>
    </>
  );
}
