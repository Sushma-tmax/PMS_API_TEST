import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {
  AvatarPropsVariantOverrides,
  Container,
  TextField,
} from "@mui/material";
import { Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import EditTwoTone from "@mui/icons-material/EditTwoTone";
import { useNavigate } from "react-router-dom";
import { RATINGS_PAGE } from "../../../constants/routes/Routing";
import PAMaster from "../../UI/PAMaster";
import Close from "../../../assets/Images/Close.svg";
import Edit from "../../../assets/Images/Edit.svg";
import { AlertDialog } from "../..";
import Tooltip from "@mui/material/Tooltip";
import { Scrollbar } from "react-scrollbars-custom";
import { MASTER_NAV } from "../../../constants/routes/Routing";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";



const Scroll = styled("div")({
  "& .ScrollbarsCustom-Thumb": {
   background:"#C2C1C1 !important",
  },
  
});
interface IRatingsProps {
  onSubmit: (ratings: string) => void;
  onDelete: (id: string) => void;
  ratingsData: any;
}

const Ratings = (props: any) => {
  const { onSubmit, ratingsData, onDelete, onUpdate } = props;
  console.log(props);
  const [open, setOpen] = useState(false);
  const [newId, setNewId] = useState("");
  const [newRating, setNewRating] = useState("");
  console.log(newId, "id from modal");
  console.log(newRating, "name from modal");

  const handleClickOpen = (id: string, nameAlert: string) => {
    setOpen(true);
    setNewId(id);
    setNewRating(nameAlert);
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

  const [rating, setRating] = useState("");
  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {}, []);
  /*
  When we click on edit button we will setRatings = value of clicked ratings
  AFter click on edit we will setEdit = true
  If edit is true then save button will run edit mutation else it will add mutation
  */

  const saveHandler = () => {
    if (edit) {
      return onUpdate(rating);
    } else {
      return onSubmit(rating);
    }
  };

  const editClickHandler = (value: string, id: string) => {
    navigate(`${RATINGS_PAGE}/${id}`);
    setEdit(true);
    setRating(value);
  };
  return (
    <>
      <PAMaster name={"Ratings"} />
      <Container
        sx={{
          maxWidth: "96% !important",
          maxHeight: "470px",
          background: "#fff",
          // boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
          // marginTop: "15px",
        }}
      >
        <Stack spacing={5}>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
              paddingTop="80px"
            >
              <div style={{ paddingLeft: "1px" }}>
                <TextField
                  id="outlined-basic"
                  label="Enter Ratings "
                  value={rating}
                  variant="outlined"
                  style={{ width: 550 }}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>

              <div style={{ paddingLeft: "30px" }}>
                <Stack direction="row" spacing={2}>
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
                      saveHandler();
                      setRating("");
                    }}
                  >
                    Save
                  </Button>
                  <Link to={MASTER_NAV}>
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
                    Cancel
                  </Button>
                  </Link>
                </Stack>
              </div>
            </Stack>
          </Stack>
        </Stack>

        <h2
          style={{
            color: "#014D76",
            fontSize: "18px",
            fontWeight: "500",
          }}
        >
          Added Ratings
        </h2>

        <TableContainer style={{ paddingBottom: "65px" }}>
          <Scroll>
          <Scrollbar style={{ width: "100%", height: "240px" }}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ bgcolor: "#F7F9FB" }}>
                  {/* <TableCell
                    align="center"
                    sx={{
                      border: 1,
                      borderColor: "#ebe8e8",
                      color: "#005477",
                      fontSize: "13px",
                    }}
                  >
                    #
                  </TableCell> */}
                  <TableCell
                    align="center"
                    sx={{
                      border: 1,
                      borderColor: "#ebe8e8",
                      color: "#005477",
                      fontSize: "13px",
                    }}
                  >
                    Ratings
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      border: 1,
                      borderColor: "#ebe8e8",
                      color: "#005477",
                      fontSize: "13px",
                    }}
                  ></TableCell>

                  <TableCell
                    align="center"
                    sx={{
                      border: 1,
                      borderColor: "#ebe8e8",
                      color: "#005477",
                      fontSize: "13px",
                    }}
                  >
                    Action{" "}
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {ratingsData &&
                  ratingsData.data.map((row: any, index: number) => {
                    return (
                      <TableRow
                        key={row.symbol}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 1,
                            borderColor: "#ebe8e8",
                          },
                        }}
                      >
                        {/* <TableCell
                          align="center"
                          component="th"
                          scope="row"
                          width={20}
                          sx={{ border: 1, borderColor: "#ebe8e8" }}
                        >
                          {index + 1}
                        </TableCell> */}
                        <TableCell
                          align="center"
                          width={80}
                          sx={{ border: 1, borderColor: "#ebe8e8" }}
                        >
                          {row.rating}
                        </TableCell>
                        <TableCell
                          align="left"
                          width={850}
                          sx={{ border: 1, borderColor: "#ebe8e8" }}
                        ></TableCell>
                        <TableCell
                          align="center"
                          width={100}
                          sx={{ border: 1, borderColor: "#ebe8e8" }}
                        >
                          <>
                            <Tooltip title="Edit">
                              <IconButton
                                aria-label="EditIcon"
                                onClick={() =>
                                  editClickHandler(row.rating, row._id)
                                }
                              >
                                <img src={Edit} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                aria-label="CancelOutlinedIcon "
                                onClick={() =>
                                  handleClickOpen(row._id, row.rating)
                                }
                                // onClick={() => onDelete(row._id)}
                              >
                                <img src={Close} alt="icon" />
                              </IconButton>
                            </Tooltip>
                            <AlertDialog
                              isAlertOpen={open}
                              handleAlertOpen={() =>
                                handleClickOpen(row._id, row.rating)
                              }
                              handleAlertClose={handleClickClose}
                              handleAlertIdClose={handleClickIdClose}
                              rowAlert={row}
                            >
                              Are you sure you wish to delete this item?
                            </AlertDialog>
                          </>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Scrollbar>
          </Scroll>
        </TableContainer>
      </Container>
    </>
  );
};

export default Ratings;
