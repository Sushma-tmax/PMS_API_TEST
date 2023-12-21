import {
  Add,
  ArrowBackIosRounded,
  ArrowForwardIos,
  DeleteOutlineOutlined,
} from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputLabel from '@mui/material/InputLabel';
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Link, useParams } from "react-router-dom";
import {
  MIDYEAR_CHECKBOX,
  MIDYEAR_PERFORMANCE,
  MIDYEAR_REJECT_SAVE,
} from "../../constants/routes/Routing";
import React, { useEffect, useState } from "react";
import Delete from "../../assets/Images/Delete.svg";
import {useEmployeeRejectionMutation} from "../../service";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));



const MidyearRejectRating = (props: any) => {
  const { employeeData, ratingScaleData } = props
  const { employee_id } = useParams()
  const [rating1, setRating1] = React.useState<any>([])
  const [comments, setComments] = useState<any>([])   
  console.log(ratingScaleData, 'eeee')
  const [objectiveDescription, setObjectiveDescription] = useState<any>([])
  const [remove, setRemove] = React.useState(true);

  const deleteContent = () => {
    setRemove(false);
  };

  const [rejectEmployee] = useEmployeeRejectionMutation()

  //   const getObjectiveDescriptionId = (id:any) => {
  //  if (employeeData) {employeeData.data.rejected.find((item:any)=>{
  //    console.log(item.name._id,id,'iiii')
  //    return id === item.name._id;
  //  })
  // }
  //   }

  // useEffect(()=>{
  //   if (employeeData)
  //   setObjectiveDescription(()=> {
  //     const newDescription = employeeData.data.appraisal.objective_description.map((i:any)=>{
  //       return {
  //         ...i.name,
  //         rejectedId:getObjectiveDescriptionId(i.name._id)


  //       };
  //     })
  //     return newDescription;
  //   })
  // },[employeeData])

  // console.log(objectiveDescription,'oooooo')

 

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#F1F1F1", height: "900px" }}>
        <Container
          sx={{
            maxWidth: "96.5% !important",
            backgroundColor: "#ebf1f5",
          }}
        >
          <h1
            style={{
              color: "#004c75",
              fontWeight: "400",
              opacity: "0.9",
            }}
          >
            <Link to={MIDYEAR_CHECKBOX}>
              <ArrowBackIosRounded
                style={{ verticalAlign: "middle" }}
                fontSize="large"
              />
            </Link>
            Mid-Year Performance Appraisal
          </h1>
        </Container>
        <Container
          sx={{
            maxWidth: "96.5% !important",
            height: "820px",
            background: "#fff",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <Item style={{ textAlign: "left", fontSize: "20px" }}>
                  Rating <ArrowForwardIos style={{ verticalAlign: "middle" }} />
                  Reject
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item style={{ textAlign: "right", color: "#ade9f3" }}>
                  <Link to={MIDYEAR_CHECKBOX}>
                    <Add style={{ verticalAlign: "middle" }} /> Add
                  </Link>
                </Item>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
              {/* {remove && ( */}
              {employeeData && employeeData?.data?.employee?.objective_description?.map((i: any,index:any) => {
                console.log(i,'iiiiii')
                return (
                  <>
                    <Grid item xs={8}>
                      <Item>
                        <Grid item sx={{ height: "14px", width: "200%" }}>
                          <Tooltip title="Delete" onClick={deleteContent} >
                            <img src={Delete} alt="icon" />
                          </Tooltip>
                        </Grid>
                        <TableContainer style={{ border: "2px solid #f0f0f0" }}>
                          <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead
                              sx={{
                                backgroundColor: "#f7fafb",
                              }}
                            >

                              <TableRow>

                                <TableCell>
                                  <h3
                                    style={{
                                      color: "#014D76",
                                      fontWeight: "400",
                                      opacity: "0.9",
                                    }}
                                  >
                                    {i.name.objectiveTitle}
                                  </h3>
                                  <p>{i.name.description}</p>
                                </TableCell>
                                <TableCell align="right">
                                  <h5>Rating</h5>
                                  <p>3.0 Delivering</p>
                                </TableCell>

                              </TableRow>
                            </TableHead>
                            <TableBody>
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": { border: 0 },
                                  height: "200px",
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <p>
                                  <InputLabel>Your Ratings</InputLabel>
                                    <Select
                                      sx={{ width: "200px" }}                                      
                                      label="Your Rating"
                                      // value={rating}
                                      variant="standard"
                                      onChange={(e) => {
                                        setRating1(employeeData?.data?.employee?.objective_description?.map((previousState:any, ix: any)=> {
                                          return {
                                            ...previousState,
                                            rating:e.target.value
                                          }
                                          
                                        }))
                                        console.log(rating1,'ratinggggggggg')
                                      }}
                                    >
                                      {ratingScaleData && ratingScaleData.data.map((j: any, ix: any) => {
                                       
                                        return (
                                          <MenuItem value={j._id}>{j.rating}</MenuItem>
                                        );
                                        
                                      })}
                                    </Select>
                                  </p>
                                  <p>Your Comments</p>
                                  <p>
                                    <TextField
                                      sx={{ width: "500px" }}
                                      aria-label="empty textarea"
                                      variant="standard"
                                      multiline
                                      rows={4}
                                      inputProps={{ maxLength: 512 }}

                                      // value={rating1.comments.value}
                                      onChange={(e) => {
                                        setRating1(employeeData?.data?.employee?.objective_description?.map((previousState:any, ix: any)=> {
                                         if(ix === index) {
                                          return {
                                            ...previousState,
                                            comments:e.target.value
                                          }
                                          
                                        }
                                        return previousState
                                        
                                       }))
                                        console.log(rating1,'ratingg')
                                      }}
                                    />
                                  </p>
                                </TableCell>
                              </TableRow>
                              <TableRow
                                sx={{
                                  "&:last-child td, &:last-child th": { border: 0 },
                                }}
                              >
                                <TableCell component="th" scope="row">
                                  <p>Attachments</p>
                                  <p>
                                    <Button variant="outlined">Upload File</Button>
                                  </p>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Item>
                    </Grid>
                    {/* )} */}

                  </>
                )
              })}
              {/* <Grid item xs={8}>
                <Item>
                  <Grid item sx={{ height: "14px", paddingLeft: "98%" }}>
                    <Tooltip title="Delete">
                      <img src={Delete} alt="icon" />
                    </Tooltip>
                  </Grid>

                  <TableContainer style={{ border: "2px solid #f0f0f0" }}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                      <TableHead
                        sx={{
                          backgroundColor: "#f7fafb",
                        }}
                      >
                        <TableRow>
                          <TableCell>
                            <h3
                              style={{
                                color: "#014D76",
                                fontWeight: "400",
                                opacity: "0.9",
                              }}
                            >
                              Core Competencies
                            </h3>
                            <p>Fostering innovation</p>
                          </TableCell>
                          <TableCell align="right">
                            <h5>Rating</h5>
                            <p>3.0 Delivering</p>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                            height: "200px",
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <p>
                              <TextField
                                sx={{ width: "200px" }}
                                select
                                label="Your Rating"
                                defaultValue="5.0 Exceptional"
                                variant="standard"
                              />
                            </p>
                            <p>Your Comments</p>
                            <p>
                              <TextField
                                sx={{ width: "500px" }}
                                aria-label="empty textarea"
                                variant="standard"
                                multiline
                                rows={4}
                              />
                            </p>
                          </TableCell>
                        </TableRow>
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            <p>Attachments</p>
                            <p>
                              <Button variant="outlined">Upload File</Button>
                            </p>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Item>
              </Grid> */}
            </Grid>
          </Box>
          <div
            style={{
              fontSize: "22px",
              fontFamily: " Arial, Helvetica, sans-serif",

              paddingLeft: "10px",

              paddingTop: "33px",
              height: "75px",
              width: "818px",
            }}
          >
            <Link style={{ color: "#262626" }} to={MIDYEAR_REJECT_SAVE}>
              <Button style={{ marginRight: "10px" }} variant="contained">
                Save
              </Button>
            </Link>
            <Link to={`${MIDYEAR_PERFORMANCE}/employee/${employee_id}`}>
              <Button variant="outlined">Cancel</Button>
            </Link>
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default MidyearRejectRating
