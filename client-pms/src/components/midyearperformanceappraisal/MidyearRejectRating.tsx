import * as React from "react";
import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import {
    MIDYEAR_CHECKBOX,
    MIDYEAR_PERFORMANCE,
    MIDYEAR_PERFORMANCE_REJECTED,
    MIDYEAR_REJECT_SAVE,
} from "../../constants/routes/Routing";
import {
    ArrowBackIosRounded,
    EditOutlined,
    RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { Button, Container, Stack, TextField } from "@mui/material";
import { grey } from "@mui/material/colors";
import { border, width, color, textAlign, borderColor } from "@mui/system";
import { table } from "console";
import { th } from "date-fns/locale";
import { text } from "express";
import { size } from "lodash";
import { Link, useParams } from "react-router-dom";
import Drawer from '@mui/material/Drawer';

import {
    useCreateEmployeeAppraisalMutation, useEmployeeRejectionMutation, useEmployeeRejectSaveMutation,
    useGetEmployeeAppraisalQuery,
    useGetEmployeeQuery,
    useGetObjectiveTitleQuery,
    useGetRatingScaleQuery, useReviewerRejectionMutation
} from "../../service";
import { useContext, useCallback } from 'react';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

//prompt -------functions

export function useBlocker(blocker: any, when = true) {
  const { navigator } = useContext(NavigationContext);
  //const navigator = React.useContext(UNSAFE_NavigationContext)
  interface navigator {
    block: {

      any: any
    }
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

const Item = styled("div")(({ theme }) => ({
    backgroundColor: "#f2f9fa",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "188px",
}));

const Item2 = styled("div")(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),

    color: theme.palette.text.secondary,
    height: "140px",
    margin: '2rem'
}));

const Root = styled("div")(
    ({ theme }) => `
table {
  // font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  border-collapse: collapse;
  width: 231%;
  
}

td,
th {
  border: 1px solid #e0e0e0;
  text-align: left;
  // padding: 6px;
 
}

th {
  background-color: #f2f9fa;
}
`
);

const Item1 = styled(Box)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Contain = styled("div")({
    "& .MuiButtonBase-root": {
        color: "#333333",
        backgroundColor: "#FFFFFF",
        height: "34px",
        width: "34px",
        boxShadow: "0px 0px 1px 1px #D4D4D4",
    },

    "& .MuiButton-root": {
        border: ` 1px solid `,
        borderColor: "#D4D4D4",
        minWidth: "0px",
        borderRadius: "50px",
        "&:focus": {
            // borderColor: '#3C8BB5',
        },
    },
});


const MidyearRejectRating = (props: any) => {

//prompt ------functions
const [navPrompt, setnavPrompt] = React.useState(false);
  
console.log(navPrompt, 'navPrompt')
const formIsDirty = navPrompt;
usePrompt('Please save the changes before you leave the page.', formIsDirty);
//prompt ------functions

    const { employeeData, ratingsData, objectiveTitleData } = props
    const { employee_id } = useParams()
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [objectiveDescription, setObjectiveDescription] = useState<any>([]);


    const [upDateNormalizer] = useEmployeeRejectionMutation()

    const [employeeSave] = useEmployeeRejectSaveMutation()

    console.log(isDrawerOpen)

    // const [upDateReviewer] = useReviewerRejectionMutation();

    // const {data: employeeData} = useGetEmployeeAppraisalQuery('6204935ebca89023952f2da9')


    console.log(employeeData, 'my test')
    const [activeObjectiveDescription, setActiveObjectiveDescription] = useState('')
    const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] = useState("");
    const [rating, setRating] = useState<any>("");
    const [updateMutation] = useCreateEmployeeAppraisalMutation()
    const [comments, setComments] = useState("");


    const findObjectiveTypeById = (id: any) => {
        if (employeeData) {
            return employeeData.data.reviewer.objective_type.find((item: any) => item.name._id === id)
        }
    }

    const findObjectiveTitleById = (id: any) => {
        if (objectiveTitleData) {
            console.log(id, "objectiveTitleData");
            return objectiveTitleData.data.find((item: any) => item._id === id);
        }
    };

    useEffect(() => {
        if (employeeData && objectiveTitleData) {
            setObjectiveDescription(() => {
                return employeeData.data.employee.objective_description.map(
                    (i: any) => {
                        return {
                            ...i,
                            objective_title: findObjectiveTitleById(i.name.objective_title),
                            objective_type: findObjectiveTypeById(i.name.objective_type)
                        };
                    }
                );
            });
        }
    }, [employeeData, objectiveTitleData]);


    const openDrawer = () => {
        setIsDrawerOpen(true)
    }
    const closeDrawer = () => {
        setIsDrawerOpen(false)
        setnavPrompt(true)
    }
    const ratingSubmitHandler = () => {
        closeDrawer()
        upDateNormalizer({
            objective_description: activeObjectiveDescription,
            objective_description_name: activeObjectiveDescriptionName,
            ratings: rating,
            comments: comments,
            employee_id,
        })
        setRating('')
        setnavPrompt(true)
    }
    const openDrawerHandler = (objective: any) => {
        openDrawer()
        setActiveObjectiveDescriptionName(objective.name._id)
        setActiveObjectiveDescription(objective._id)
        setComments(objective.comments)
        setRating(objective.ratings._id)
        setnavPrompt(true)
    }

    const acceptHandler = (objective: any, rating: any) => {
        // setActiveObjectiveDescriptionName(objective.name._id)
        // setActiveObjectiveDescription(objective._id)
        // setComments(objective.comments)
        // setRating(rating)

        // ratingSubmitHandler()
        updateMutation({
            objective_description: objective._id,
            objective_description_name: objective.name._id,
            ratings: rating,
            comments: comments,
            id: employee_id,
        })


    }

    console.log(ratingsData, 'rating')
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
                        <Link to={`${MIDYEAR_PERFORMANCE}/employee/${employee_id}`}>
                            <ArrowBackIosRounded
                                style={{ verticalAlign: "middle" }}
                                fontSize="large"
                            />
                        </Link>
                        Mid-Year Performance Appraisal
                    </h1>
                </Container>


                <Drawer
                    anchor={'right'}
                    open={isDrawerOpen}

                // sx={maxWidth: 300px}
                // onClose={toggleDrawer(anchor, false)}
                >
                    <p style={{
                        paddingLeft: "33px",
                        paddingTop: "10px",
                        paddingBottom: "10px",
                        backgroundColor: "#ebf2f4",
                        color: "#005477",
                        fontSize: "18px"
                    }}>Rejection Reason</p>

                    {/*@ts-ignore*/}
                    <Item2 justifyContent="space-between"
                        sx={{ width: "fitContent", padding: "0px" }}
                    >
                        <>
                            <p style={{ textAlign: "left", paddingLeft: "10px" }}>Your Score</p>
                            <Stack style={{paddingLeft: "10px"}} direction="row" spacing={1.7}>
                                {ratingsData &&
                                    ratingsData.data
                                        .slice()
                                        .sort(function (a: any, b: any) {
                                            return a.rating - b.rating;
                                        })
                                        .map((ratings: any, _id: any) => (
                                            <Item1
                                                sx={{
                                                    marginLeft: "2px",
                                                    padding: "0px",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Contain>
                                                    <Button

                                                        onClick={() => {
                                                            if (ratings)
                                                                setRating(ratings._id);
                                                            // ratingColorHandler(rating._id)
                                                            setnavPrompt(true)
                                                        }}

                                                        style={{
                                                            //@ts-ignore
                                                            borderColor: rating === ratings._id && "#3C8BB5",
                                                        }}
                                                        size="small"
                                                    >
                                                        {ratings.rating}
                                                    </Button>

                                                    {rating === ratings._id && (
                                                        <p style={{ color: "#3C8BB5", fontSize: "10px" }}>
                                                            {ratings.rating_scale}
                                                        </p>
                                                    )}

                                                </Contain>

                                                {/* <p style={{ color: "#3C8BB5", fontSize: "10px" }}>{ratings.rating_scale}</p> */}


                                            </Item1>
                                        ))}
                            </Stack>
                            <p style={{ textAlign: "left" }}>(Previous Rating)</p>


                        </>
                    </Item2>
                    <p style={{ paddingLeft: "33px" }}>Reason</p>
                    <TextField
                        style={{ paddingLeft: "33px", width: "75%" }}
                        // fullWidth
                        value={comments}
                        inputProps={{ maxLength: 256 }}

                        onChange={(e) => setComments(e.target.value)}
                    />
                    <p style={{ paddingLeft: "33px" }}>Attachments</p>
                    <div style={{ paddingLeft: "33px" }}>
                        <Button style={{
                            textTransform: "none",
                            borderColor: "#014D76",
                            fontFamily: "sans-serif",
                            maxWidth: "115px", backgroundColor: "transparent",
                            color: "#9cc4da"

                        }} variant="contained"> Upload File </Button>
                    </div>
                    <Stack
                        alignItems="left"
                        direction="row"
                        paddingLeft="33px"
                        paddingTop="20px"
                        spacing={2}
                    >

                        <Button style={{
                                    borderRadius: "4px",
                                    textTransform: "none",
                                    fontSize: "15px",
                                    fontFamily: "sans-serif",
                                    padding: "2px 9px",
                      
                                    borderColor: "#004C75",
                                    color: "#004C75",
                                  }}
                                  variant="outlined" onClick={ratingSubmitHandler}> Save </Button>
                        <Button style={{
                                    borderRadius: "4px",
                                    textTransform: "none",
                                    fontSize: "15px",
                                    fontFamily: "sans-serif",
                                    padding: "2px 9px",
                      
                                    borderColor: "#004C75",
                                    color: "#004C75",
                                  }}
                                  variant="outlined" onClick={closeDrawer}> Cancel </Button>
                    </Stack>


                </Drawer>


                <div style={{ backgroundColor: "#F1F1F1", }}>
                    <Container
                        sx={{
                            maxWidth: "96.5% !important",
                            // height: "1408px",
                            // height: "calc(100vh - 165px)",
                            background: "#fff",
                        }}
                    >
                        <div>{/* <Header /> */}</div>
                        <Box sx={{ flexGrow: 1, paddingBottom: "20px" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    {/*<Item>*/}
                                    {/*    <h2*/}
                                    {/*        style={{*/}
                                    {/*            color: "#004C75",*/}
                                    {/*            fontWeight: "400",*/}
                                    {/*            opacity: "0.9",*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        Sharaban Abdullah Rating*/}
                                    {/*    </h2>*/}
                                    {/*    <h2>4.5</h2>*/}
                                    {/*    <p*/}
                                    {/*        style={{*/}
                                    {/*            fontSize: "13px",*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        10-Jun-21*/}
                                    {/*    </p>*/}
                                    {/*    <h4 style={{fontWeight: "400"}}>Exceeds Expectations</h4>*/}
                                    {/*</Item>*/}
                                </Grid>
                                {/*<Grid item xs={4}>*/}
                                {/*    <Item1>*/}
                                {/*        <h2*/}
                                {/*            style={{*/}
                                {/*                color: "#004C75",*/}
                                {/*                fontWeight: "400",*/}
                                {/*                opacity: "0.9",*/}
                                {/*            }}*/}
                                {/*        >*/}
                                {/*            Your Rating*/}
                                {/*        </h2>*/}
                                {/*        <h2>3.0</h2>*/}
                                {/*        <p*/}
                                {/*            style={{*/}
                                {/*                fontSize: "13px",*/}
                                {/*            }}*/}
                                {/*        >*/}
                                {/*            Delivering*/}
                                {/*        </p>*/}
                                {/*    </Item1>*/}
                                {/*</Grid>*/}
                            </Grid>
                        </Box>

                        <Root sx={{ width: "43.3%" }}>
                            <table>
                                <thead
                                    style={{
                                        color: "#004C75",
                                        fontSize: "15px",
                                        fontWeight: "400",
                                        opacity: "0.9",
                                        height: "50px"
                                    }}
                                >
                                    <tr>
                                        <th
                                            style={{
                                                color: "#004C75",
                                                paddingLeft: "20px",
                                                borderBottom: "1px solid #fff",
                                                width: "18%"
                                            }}
                                        >
                                            <form>
                                                <select
                                                    style={{
                                                        fontWeight: "100",
                                                        fontFamily: "regular",
                                                        fontSize: "14px",
                                                        color: "#004C75",
                                                        border: "none",
                                                        background: "none",
                                                        // margin:"-5px"
                                                    }}
                                                >
                                                    <option value="Training Title">Objective Type</option>
                                                </select>
                                            </form>
                                        </th>
                                        <th
                                            style={{
                                                color: "#004C75",
                                                paddingLeft: "20px",
                                                borderBottom: "1px solid #fff",
                                                width: "18%"
                                            }}
                                        >
                                            <form>
                                                <select
                                                    style={{
                                                        fontWeight: "100",
                                                        fontFamily: "regular",
                                                        fontSize: "14px",
                                                        color: "#004C75",
                                                        border: "none",
                                                        background: "none",
                                                        // margin:"-5px"
                                                    }}
                                                >
                                                    <option value="Training Title">
                                                        Objective Description
                                                    </option>
                                                </select>
                                            </form>
                                        </th>
                                        <th
                                            style={{
                                                color: "#004C75",
                                                paddingLeft: "20px",
                                                borderBottom: "1px solid #fff",
                                                width: "18%"
                                            }}
                                        >
                                            <form>
                                                <select
                                                    style={{
                                                        fontWeight: "100",
                                                        fontFamily: "regular",
                                                        fontSize: "14px",
                                                        color: "#004C75",
                                                        border: "none",
                                                        background: "none",
                                                        // margin:"-5px"
                                                    }}
                                                >
                                                    <option value="Training Title"> Appraiser Rating</option>
                                                </select>
                                            </form>
                                        </th>
                                        <th
                                            style={{
                                                color: "#004C75",
                                                paddingLeft: "20px",
                                                borderBottom: "1px solid #fff",
                                                width: "22%"
                                            }}
                                        >
                                            <form>
                                                <select
                                                    style={{
                                                        fontWeight: "100",
                                                        fontFamily: "regular",
                                                        fontSize: "14px",
                                                        color: "#004C75",
                                                        border: "none",
                                                        background: "none",
                                                        // margin:"-5px"
                                                    }}
                                                >
                                                    <option value="Training Title">Employee Rating</option>
                                                </select>
                                            </form>
                                        </th>
                                        <th
                                            style={{
                                                color: "#004C75",
                                                paddingLeft: "20px",
                                                borderBottom: "1px solid #fff",
                                                width: "15%"
                                            }}
                                        >
                                            <form>
                                                <select
                                                    style={{
                                                        fontWeight: "100",
                                                        fontFamily: "regular",
                                                        fontSize: "14px",
                                                        color: "#004C75",
                                                        border: "none",
                                                        background: "none",
                                                        // margin:"-5px"
                                                    }}
                                                >

                                                    <option value="Training Title">Employee Action</option>
                                                </select>
                                            </form>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    style={{
                                        fontSize: "14px",
                                    }}
                                >
                                    {employeeData && objectiveTitleData && objectiveDescription.map((j: any) => {
                                        return (

                                            <>
                                                <tr>
                                                    <td
                                                        // rowSpan={3}
                                                        style={{
                                                            color: "#004C75",
                                                            paddingLeft: "20px",
                                                            fontFamily: "regular",
                                                            fontSize: "15px",
                                                        }}

                                                    >
                                                        {j.objective_type?.name?.name}
                                                    </td>
                                                    <td
                                                        style={{
                                                            paddingLeft: "20px",
                                                            opacity: "0.8",
                                                            fontSize: "14px",
                                                            fontFamily: "regular",
                                                        }}
                                                    >
                                                        {j?.name?.objectiveTitle}
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <p>
                                                                <h3
                                                                    style={{

                                                                        opacity: "0.7",
                                                                        fontSize: "14px",
                                                                        fontFamily: "regular",
                                                                    }}
                                                                >
                                                                    {
                                                                        employeeData && employeeData.data.normalizer.objective_description
                                                                            .filter(
                                                                                (i: any) => i.name._id === j.name._id
                                                                            )
                                                                            .map((k: any) => {
                                                                                if (k.ratings) return k.ratings.rating
                                                                            })[0]
                                                                    }
                                                                </h3>
                                                                <p
                                                                    style={{
                                                                        fontSize: "12px",

                                                                        opacity: "0.7",
                                                                        fontFamily: "regular",
                                                                    }}
                                                                >
                                                                    {/*Exceeding*/}
                                                                </p>
                                                            </p>

                                                            <h3
                                                                style={{
                                                                    fontSize: "12px",
                                                                    textDecoration: "underline",
                                                                    color: "#93DCFA",
                                                                    fontWeight: "200",
                                                                }}
                                                            >
                                                                Details
                                                            </h3>
                                                        </Stack>
                                                    </td>
                                                    <td style={{ textAlign: "center" }}>
                                                        <Stack
                                                            direction="row"
                                                            justifyContent="space-around"
                                                            alignItems="center"
                                                            spacing={2}
                                                        >
                                                            <p>
                                                                <h3
                                                                    style={{

                                                                        opacity: "0.7",
                                                                        fontSize: "14px",
                                                                        fontFamily: "regular",
                                                                    }}
                                                                >
                                                                    {j.ratings && j.ratings.rating}
                                                                </h3>
                                                                <p
                                                                    style={{
                                                                        fontSize: "12px",

                                                                        opacity: "0.7",
                                                                        fontFamily: "regular",
                                                                    }}
                                                                >
                                                                    {/*Exceeding*/}
                                                                </p>
                                                            </p>

                                                            <h3
                                                                style={{
                                                                    fontSize: "12px",
                                                                    textDecoration: "underline",
                                                                    color: "#93DCFA",
                                                                    fontWeight: "200",
                                                                }}
                                                            >
                                                                Details
                                                            </h3>
                                                        </Stack>
                                                    </td>
                                                    <td>
                                                        <>

                                                            {
                                                                <Button
                                                                    onClick={() => openDrawerHandler(j)}>Reject </Button>

                                                            }


                                                        </>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    })}


                                </tbody>
                            </table>

                        </Root>
                        <div
                            style={{
                                fontSize: "22px",
                                fontFamily: " Arial, Helvetica, sans-serif",
                                // margin: "30px",
                                // paddingLeft: "600px",
                                display: "flex",
                                alignItems: "center",
                                backgroundColor: "#FFFBF2",
                                justifyContent: "center",
                                // paddingTop: "33px",
                                height: "125px",
                                width: "100%",
                                // marginLeft: "auto",
                            }}
                        >
                            <Link to={`${MIDYEAR_PERFORMANCE_REJECTED}/employee/${employee_id}`}>
                                <Button
                                    style={{
                                        textTransform: "none",
                                        backgroundColor: "#FFA801",
                                        fontSize: "14px",
                                        fontFamily: "sans-serif",
                                        padding: "6px 30px",
                                        marginRight: "10px",
                                    }}
                                    variant="contained"
                                    onClick={() => {employeeSave(employee_id);
                                        setnavPrompt(false)}}

                                >
                                    SAVE
                                </Button>
                            </Link>
                            <Link to={`${MIDYEAR_PERFORMANCE}/employee/${employee_id}`}>
                                <Button
                                    style={{
                                        textTransform: "none",
                                        fontSize: "15px",
                                        color: "#FFA801",

                                        fontFamily: "sans-serif",
                                        borderColor: "#FFA801",
                                    }}
                                    variant="outlined"

                                >
                                    CANCEL
                                </Button>
                            </Link>
                        </div>
                    </Container>
                </div>
                {/* 
                <Link to={`${MIDYEAR_PERFORMANCE_REJECTED}/employee/${employee_id}`}>
                    <Button onClick={() => employeeSave(employee_id)}>Save </Button>
                </Link>

                <Link to={`${MIDYEAR_PERFORMANCE}/employee/${employee_id}`}>
                    <Button>Cancel </Button>
                </Link> */}
            </div>
        </React.Fragment>
    );
}

export default MidyearRejectRating
