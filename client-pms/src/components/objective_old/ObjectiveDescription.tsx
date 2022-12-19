import React , { useState } from "react";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { Box, Grid, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import {
  ADD_OBJECTIVE_DESCRIPTION, EDIT_OBJECTIVE_DESCRIPTION,
  VIEW_OBJECTIVE_DESCRIPTION,
} from "../../constants/routes/Routing";
import { Scrollbar } from "react-scrollbars-custom";
import Close from "../../assets/Images/Close.svg";
import Edit from "../../assets/Images/Edit.svg";
import Tooltip from "@mui/material/Tooltip";
import Addicon from "../../assets/Images/Addicon.svg";
import Viewicon from "../../assets/Images/Viewicon.svg";
import { useNavigate } from "react-router-dom";
import { AlertDialog } from "..";

//var h = window.innerHeight;
//console.log(h)

//const window {
// width: window.innerWidth,
// height: window.innerHeight,
//}

let box = document.querySelector(".our-find-part");
console.log(`height of ${box}`);
//let height = box.offsetTop;

//setTimeout(() => {
// let height = document.getElementById('objectiveDescription')!.offsetHeight;
//console.log(`new height is ${height}`)
//}, 5000);

const ObjectiveDescription = (props: any) => {
  const { objectiveDescriptionData, onDelete } = props;

  const navigate = useNavigate();
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

  return (
    <Box
      display="flex"
      alignItems="flex-start"
      flexDirection="column"
      p={1}
      margin="15px 0px"
      minHeight="calc(100vh - 200px)"
      height="auto"
      border={1.5}
      borderColor="#e0e0e0"
    >
      <Stack style={{ width: "100%" }} direction="column" spacing={1}>
        <div
          style={{ alignItems: "center", borderBottom: "1px solid #e0e0e0" }}
        >
          <p
            style={{
              color: "#004C75",
              fontSize: "20px",
              marginTop: "10px",
              marginLeft: "12px",
            }}
          >
            Objective Description
          </p>
        </div>
        <Scrollbar
          id="our-find-part"
          style={{ width: "auto", height: "150px" }}
        >
          <div>
            {objectiveDescriptionData &&
              objectiveDescriptionData.data.map((i: any) => {
                return (
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={0}
                    borderBottom="1px solid #e0e0e0"
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "15px",
                      }}
                    >
                     
                        {/*<span>
                      <FiberManualRecordIcon
                        sx={{ fontSize: "small", color: "gray" }}
                      />
                    </span>*/}
                        <span
                          style={{
                            borderRadius: "50%",
                            marginRight: "10px",
                            verticalAlign: "middle",
                            width: "6px",
                            height: "6px",
                            display: "inline-block",
                            background: "#939393",
                          }}
                        />
                         <p
                        style={{
                          color: "#333333",
                          fontSize: "15px",
                        }}
                      >
                        {i.description}
                      </p>
                    </div>

                    <div>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => navigate(`${EDIT_OBJECTIVE_DESCRIPTION}/${i._id}`)}>
                          <img src={Edit} alt="icon" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleClickOpen(i._id, i.description)}>
                          <img src={Close} alt="icon" />
                        </IconButton>
                      </Tooltip>
                      <AlertDialog
                      style={{maxWidth:"0px",minWidht:"50%"}}
                        isAlertOpen={open}
                        handleAlertOpen={() =>
                          handleClickOpen(i._id, i.description)
                        }
                        handleAlertClose={handleClickClose}
                        handleAlertIdClose={handleClickIdClose}
                        rowAlert={i}
                      >
                        Do you want to delete {description}?
                      </AlertDialog>
                    </div>
                  </Stack>
                );
              })}
          </div>
        </Scrollbar>
      </Stack>

      {/*{objectiveDescriptionData && objectiveDescriptionData.data.map((i: any) => {*/}
      {/*    return (*/}
      {/*        <Box p={1} color="black" fontSize="18px">*/}
      {/*            <span>  <FiberManualRecordIcon sx={{fontSize: "small", color: "gray"}}/> </span>*/}
      {/*            {i.description}*/}

      {/*            <IconButton>*/}
      {/*                < EditTwoTone fontSize="small"/>*/}
      {/*            </IconButton>*/}

      {/*            <IconButton>*/}
      {/*                <CancelOutlinedIcon fontSize="small"/>*/}
      {/*            </IconButton>*/}
      {/*        </Box>*/}

      {/*    )*/}
      {/*})}*/}

      {/*<Box p={1} bgcolor="background.paper" color="black" fontSize="18px">*/}
      {/*    <span>  <FiberManualRecordIcon sx={{fontSize: "small", color: "gray"}}/> </span>*/}
      {/*   */}
      {/*    <IconButton>*/}
      {/*        < EditTwoTone fontSize="small"/>*/}
      {/*    </IconButton>*/}

      {/*    <IconButton>*/}
      {/*        <CancelOutlinedIcon fontSize="small"/>*/}
      {/*    </IconButton>*/}
      {/*</Box>*/}

      {/*<Stack spacing={3}>*/}
      {/*    <Typography align="center">*/}
      {/*        <Button variant="outlined"*/}
      {/*                style={{*/}
      {/*                    borderColor: "#185f9e",*/}
      {/*                    textTransform: "none",*/}
      {/*                    color: "#185f9e",*/}
      {/*                    padding: "6px 8px",*/}
      {/*                    fontSize: "14px",*/}
      {/*                    width: "230px",*/}
      {/*                    borderRadius: 9,*/}
      {/*                    fontFamily: " Arial"*/}
      {/*                }}*/}
      {/*        >*/}
      {/*            <Link to={`${ADD_OBJECTIVE_DESCRIPTION}`}>*/}
      {/*                &#10011; Add objective description*/}
      {/*            </Link>*/}

      {/*        </Button>*/}
      {/*    </Typography>*/}
      {/*    <Typography align="center">*/}
      {/*        <Button variant="outlined"*/}
      {/*                style={{*/}
      {/*                    borderColor: "#185f9e",*/}
      {/*                    textTransform: "none",*/}
      {/*                    color: "#185f9e",*/}
      {/*                    padding: "6px 8px",*/}
      {/*                    fontSize: "14px",*/}
      {/*                    width: "230px",*/}
      {/*                    borderRadius: 9,*/}
      {/*                    fontFamily: " Arial"*/}
      {/*                }}*/}
      {/*        >*/}
      {/*            <Link to={`${VIEW_OBJECTIVE_DESCRIPTION}`}> &#128065; View Objective Description</Link>*/}

      {/*        </Button>*/}
      {/*    </Typography>*/}
      {/*</Stack>*/}
      <Typography align="center">
        <div>
          <Button
            variant="outlined"
            style={{
              borderColor: "#004C75",
              textTransform: "none",
              color: "#004C75",
              padding: "6px 8px",
              fontSize: "14px",
              width: "230px",
              borderRadius: 9,
              fontFamily: " Arial",
              margin: "20px",
              marginTop: "25px",
            }}
          >
            <Link to={`${ADD_OBJECTIVE_DESCRIPTION}`}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                style={{ fontFamily: "regular" }}
              >
                <div>
                  <img src={Addicon} alt="icon" />
                </div>
                <div>
                  Add Objective Description
                </div>
              </Stack>
            </Link>
          </Button>

          <Button
            variant="outlined"
            style={{
              borderColor: "#004C75",
              textTransform: "none",
              color: "#004C75",
              padding: "6px 8px",
              fontSize: "14px",
              width: "230px",
              borderRadius: 9,
              fontFamily: " Arial",
            }}
          >
            <Link to={`${VIEW_OBJECTIVE_DESCRIPTION}`}>
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                style={{ fontFamily: "regular" }}
              >
                <div>
                  <img src={Viewicon} alt="icon" />
                </div>
                <div>View Objective Description</div>
              </Stack>
            </Link>
          </Button>
        </div>
      </Typography>
    </Box>
  );
};

export default ObjectiveDescription;
