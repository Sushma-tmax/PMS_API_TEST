/* eslint-disable */
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Container } from "@mui/material";
import PAMaster from "../UI/PAMaster";
import { useGetObjectiveDescriptionQuery } from "../../service";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Scrollbar } from "react-scrollbars-custom";
import { OBJECTIVE } from "../../constants/routes/Routing";
import { Link } from "react-router-dom";
import Leftarrow from "../../assets/Images/Leftarrow.svg";
import Typography from "@mui/material/Typography";
import { AlertDialog } from "..";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import {
  CREATE_CALENDER,
  CREATE_MAPPING,
  MASTER_NAV,
  VIEW_TEMPLATE,
} from "../../constants/routes/Routing";

export default function ViewObjectiveDescription(props: any) {
  const { onDelete, data } = props;
  const { onUpdate } = props;
  const [newId, setNewId] = useState("");
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");

  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setDescription(nameAlert);
    console.log(description);
  };

  const handleClickClose = () => {
    setOpen(false);
  };

  const handleClickIdClose = () => {
    if (newId) {
      onDelete(newId);
      setOpen(false);
      console.log(newId);
    }
  };
  const { name } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl); <!-- Need to fix This bcz 2 variable name 43 line number --!>
  const opentemplate = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {/* <PAMaster name={"Performance Appraisal"} /> */}
      {/* <Typography
        style={{
          color: "#004C75",
          fontSize: "24px",
          // position:"absolute",
          //     bottom:"507px",
          //     left:"320px"
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
              open={opentemplate}
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
          width: "100%",
          height: "calc(100vh - 165px)",
          backgroundColor: "#fff",
          paddingTop: "30px",
          // boxShadow: '2px 4px 6px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        <TableContainer>
          <Scrollbar style={{ width: "100%", height: "calc(100vh - 232px)" }}>
            <Table size="small" aria-label="simple table">
              <TableHead
                style={{ position: "sticky", zIndex: "1000", top: "0px" }}
              >
                <TableRow sx={{ bgcolor: "#F7F9FB" }}>
                  <TableCell
                    sx={{
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
                {data &&
                  data.data.map((objectiveDescription: any, index: number) => (
                    <TableRow
                      key={objectiveDescription._id}
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
                        width="2%"
                        sx={{
                          border: 1,
                          borderColor: "lightgrey",
                          fontSize: "14px",
                          color: "#33333",
                        }}
                      >
                        {index + 1}
                      </TableCell>
                      <TableCell
                        align="left"
                        width="20%"
                        sx={{
                          border: 1,
                          borderColor: "lightgrey",
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                        }}
                      >
                        {objectiveDescription.description}
                      </TableCell>
                      <TableCell
                        align="left"
                        width="38%"
                        sx={{
                          border: 1,
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          borderColor: "lightgrey",
                        }}
                      >
                        {objectiveDescription.detailed_description}
                      </TableCell>
                      <TableCell
                        align="left"
                        width="6%"
                        sx={{
                          border: 1,
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          borderColor: "lightgrey",
                        }}
                      >
                        {objectiveDescription.criteria}
                      </TableCell>
                      <TableCell
                        align="left"
                        width="19%"
                        sx={{
                          border: 1,
                          fontSize: "14px",
                          color: "#33333",
                          opacity: "80%",
                          borderColor: "lightgrey",
                        }}
                      >
                        {objectiveDescription.objective_type.name}
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
                      >
                        <>
                          <Tooltip title="Edit">
                            <IconButton
                              onClick={() => onUpdate(objectiveDescription._id)}
                            >
                              <img src={Edit} alt="icon" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              onClick={() =>
                                handleClickOpen(
                                  objectiveDescription._id,
                                  objectiveDescription.description
                                )
                              }
                            >
                              <img src={Close} alt="icon" />
                            </IconButton>
                          </Tooltip>
                          <AlertDialog
                            isAlertOpen={open}
                            handleAlertOpen={() =>
                              handleClickOpen(
                                objectiveDescription._id,
                                objectiveDescription.description
                              )
                            }
                            handleAlertClose={handleClickClose}
                            handleAlertIdClose={handleClickIdClose}
                            rowAlert={objectiveDescription}
                          >
                            All the details mapped with this description will be
                            deleted. Are you sure to delete {description}?
                          </AlertDialog>
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
