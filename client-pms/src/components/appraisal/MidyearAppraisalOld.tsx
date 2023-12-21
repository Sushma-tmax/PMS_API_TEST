import React, {useEffect, useState} from "react";
import Box, {BoxProps} from "@mui/material/Box";
import {styled} from "@mui/material/styles";
import {Container, IconButton, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Avatar from "@mui/material/Avatar";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Header from "../UI/Header";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import Button from "@mui/material/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LinearProgress, {linearProgressClasses} from '@mui/material/LinearProgress';
import objective from "../../pages/objective/Objective";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {Link, useNavigate} from "react-router-dom";
import {APPRAISER} from "../../constants/routes/Routing";

const MyComponent = styled('div')({
    display: 'flex',
    justifyContent: 'center'
});

const BorderLinearProgress = styled(LinearProgress)(({theme}) => ({
    height: 13,
    borderRadius: 12,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: "#ffffff",
        border: "1px solid #e4e4e4",
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 12,
        backgroundColor: "#8eeb8a",


    },


}));

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}


  function Appraisal(props: any) {

    const {ratings, appraisal, mutation} = props

    const [appraisalData, setAppraisalData] = useState<any>([]);
    const [objectiveType, setObjectiveType] = useState<any>([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [objectiveTypeIndex, setObjectiveTypeIndex] = useState(0);
    const [objectiveDescription, setObjectiveDescription] = useState<any>(appraisal.data.appraisal.objective_description)
    const [objectiveGroup, setObjectiveGroup] = useState<any>('620c04e3b70a787f5607689d');
    const [rating, setRating] = useState<any>([]);
    const [tabValue, setTabValue] = React.useState<any>(0);
    const [len, setLen] = useState(0);

    const [activeObjectiveGroup, setActiveObjectiveGroup] = useState('');
    const [activeObjectiveDescription, setActiveObjectiveDescription] = useState('');
    const [activeObjectiveType, setActiveObjectiveType] = useState('');
    const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] = useState('');
    const [activeEmployee, setActiveEmployee] = useState('');
    const [overview, setOverview] = useState(true);


    // console.log(activeObjectiveDescriptionName, 'setActiveObjectiveDescriptionName')
    console.log(tabValue, '````````````````````````')
    console.log(activeObjectiveType, 'ac    ')
    // console.log(objectiveDescription[activeIndex].name.description, 'ac    ')

    function TabPanel(props: TabPanelProps) {
        const {children, value, index, ...other} = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{p: 3}}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    const [ld, setLd] = useState(true);




    const navigate = useNavigate();


    // console.log(appraisal.data.appraisal.objective_group[0]._id, 'appraisal')


    // console.log(objectiveType[0].objective_description, 'objectiveType')
    console.log(objectiveDescription, 'objectiveDescription')


    const filterObjectiveDescription = (data: any) => {
        if (data && activeObjectiveType) {

            const res = data.filter((i: any) => {
                console.log(activeObjectiveType, 'activeObjectiveType')

                // console.log(i.objective_type._id , 'id', valueData);
                return i.name.objective_type === activeObjectiveType;
            });
            // console.log(res, 'descriptions')
            return res;
        }
    }


    useEffect(() => {
        if (appraisal) {
            setAppraisalData(appraisal)
            setActiveEmployee(appraisal.data._id)


            // setActiveObjectiveGroup(``)
        }

    }, [appraisal])

    // useEffect(() => {
    //     if (appraisal) {
    //         appraisal.data.appraisal.objective_group.map((objective: any) => {
    //             console.log(objective)
    //             setObjectiveType(objective.objective_type)
    //             setActiveObjectiveType(objective.objective_type[activeIndex]._id)
    //         })
    //     }
    // }, [appraisal])


    useEffect(() => {

        if (appraisalData && appraisal) {

            setObjectiveType(appraisal.data.appraisal.objective_type)

            setActiveObjectiveGroup(appraisal.data.appraisal.objective_group[0]._id)

            appraisal.data.appraisal.objective_group.map((objective: any) => {


                // setActiveObjectiveType(objective.objective_type[tabValue]._id)

            })
        }
    }, [appraisalData, appraisal, activeIndex, objectiveType])


    useEffect(() => {
        setActiveObjectiveType(appraisal.data.appraisal.objective_type[tabValue].name._id)
        // console.log(appraisal.data.appraisal.objective_type[tabValue].name._id, 'appraisal.data.appraisal.objective_type')

    }, [tabValue])

    useEffect(() => {
        if (appraisal) {

            setObjectiveDescription(filterObjectiveDescription(appraisal.data.appraisal.objective_description))


        }
    }, [objectiveType, tabValue, appraisal])


    useEffect(() => {
        if (objectiveType.length > 0) {

            // setActiveObjectiveDescription(objectiveDescription[activeIndex]._id)
            // setActiveObjectiveDescriptionName(objectiveDescription[activeIndex].name._id)
            // setActiveObjectiveType(objectiveType[tabValue]._id)

            // setActiveObjectiveDescription(objectiveDescription[activeIndex]._id)
            // setActiveObjectiveDescriptionName(objectiveDescription[activeIndex].name._id)
            // console.log(activeObjectiveDescriptionName, 'activeObjectiveDescriptionName')

            // console.log(objectiveDescription[activeIndex]._id, '``````````````````')
        }
    }, [objectiveDescription, activeIndex, tabValue])

    // useEffect(() => {
    //     if (objectiveDescription && objectiveType && objectiveGroup) {
    //
    //         setActiveObjectiveDescription(objectiveDescription[activeIndex]._id)
    //         setActiveObjectiveDescriptionName(objectiveDescription[activeIndex].name._id)
    //
    //
    //         // navigate(`/appraisal/create-appraisal/${activeEmployee}/objective-group/${activeObjectiveGroup}/objective-type/${activeObjectiveType}/objective-description/${activeObjectiveDescription}/objective-description-name/${activeObjectiveDescriptionName}`)
    //
    //     }
    // },[activeIndex])


    // const val =  objectiveDescription.length - activeIndex
    // console.log(val, 'val')
    // console.log(tabValue, 'tabValue')
    //
    // if(val === 2) {
    //     setTabValue(tabValue + 1)
    //     setActiveIndex(0)
    // }


    const nextSlide = () => {


        if (activeIndex === objectiveDescription.length - 1) {


            setTabValue(tabValue + 1)
            setActiveIndex(0)
        } else if (activeIndex !== objectiveDescription.length) {
            setActiveIndex(activeIndex + 1)
        }


        //
        // if (tabValue === objectiveType.length - 1 && activeIndex === objectiveType[objectiveType.length - 1].objective_description.length - 1) {
        //     setOverview(false)
        // } else if (activeIndex === objectiveType[tabValue].objective_description.length - 1) {
        //
        //     console.log('```````````````````````````````````````````````````')
        //     setTabValue(tabValue + 1)
        //     setActiveIndex(0)
        // } else if (activeIndex !== objectiveDescription.length) {
        //     setActiveIndex(activeIndex + 1)
        // }


        // if (activeIndex !== objectiveDescription.length) {
        //     setActiveIndex(activeIndex + 1)
        //
        // } else if (activeIndex === objectiveDescription.length) {
        //     console.log('```````````````````````````````````````````````````')
        //     setTabValue(tabValue + 1)
        //     setActiveIndex(0)
        // }

    }

    const prevSlide = () => {

        if (activeIndex === objectiveType[tabValue].objective_description.length - 1) {
            setTabValue(tabValue - 1)
            setActiveIndex(0)
        } else if (activeIndex === 1) {
            setActiveIndex(activeIndex - 1)
        }
    }

 
    //
    // if (objectiveDescription.length - activeIndex === 0) {
    //     increaseObjectiveTypeIndex()
    //     console.log('done')
    //     setObjectiveDescription(objectiveType[objectiveTypeIndex].objective_description)
    //     console.log('set running')
    //
    // }

    const submit = () => {

        // console.log(rating, 'rating')
        // console.log(objectiveDescription[activeIndex].name._id, 'iddd')
        // console.log(objectiveDescription[activeIndex]._id, '22222')
        // console.log(objectiveDescription[activeIndex].name.objective_type, 'objective_type')
        // console.log(objectiveGroup)

        mutation({
            objective_description: activeObjectiveDescription,
            objective_description_name: activeObjectiveDescriptionName,
            ratings: rating,
            id: activeEmployee,
        })

        // console.log(objectiveDescription[activeIndex]._id, 'iddd descccc ')


        nextSlide()
        setRating('')
        setActiveObjectiveDescriptionName(objectiveDescription[activeIndex].name._id)

    }


    const decreaseIndex = () => {
        setActiveIndex(activeIndex - 1)
    }

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
        setActiveIndex(0)
    };
    // console.log(objectiveType[tabValue]._id, 'objectiveType  iddd')

    const tabClickHandler = (index: number) => {
        console.log(index, 'clicked')


    }

    const showDesc = () => {
        if (typeof objectiveDescription != "undefined" && objectiveDescription.length) {
            return objectiveDescription[activeIndex].name.description
        }
        // objectiveDescription.length > 0 && objectiveDescription[activeIndex].name.description

    }
    return (
        <>


            {/*<Box sx={{ flexGrow: 1 }} marginTop={1}>*/}
            {/*  <Toolbar>*/}
            {/*    <Typography*/}
            {/*      color="#014D76"*/}
            {/*      variant="h6"*/}
            {/*      component="div"*/}
            {/*      marginLeft={6}*/}
            {/*      sx={{ flexGrow: 1 }}*/}
            {/*    >*/}
            {/*      <IconButton>*/}
            {/*        <ArrowBackIosNewIcon*/}
            {/*          style={{*/}
            {/*            alignItems: "center",*/}
            {/*            fontSize: "large",*/}
            {/*            color: "#014D76",*/}
            {/*          }}*/}
            {/*        />*/}
            {/*      </IconButton>*/}
            {/*      Mid-Year Performance appraisal*/}
            {/*    </Typography>*/}
            {/*  </Toolbar>*/}
            {/*</Box>*/}
            <Container
                sx={{
                    width: "100%",
                    height: 700,
                    boxShadow: "2px 4px 6px 4px rgba(0, 0, 0, 0.2)",
                }}
            >
                <Box
                    sx={{
                        backgroundColor: "#fff",
                        height: 60,
                        boxShadow: "2px 2px 2px 2px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        paddingTop: "40px",
                    }}
                >
                    <React.Fragment>
                        <Grid container spacing={1}>
                            <Grid item xs={6} md={0.6}>
                                <Avatar
                                    sx={{
                                        display: "flex",
                                        verticalAlign: "center",
                                        float: "right",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                    alt="Sha"
                                    src="/static/images/avatar/3.jpg"
                                />
                            </Grid>

                            <Stack
                                direction="row"
                                divider={<Divider orientation="vertical" flexItem/>}
                                spacing={6}
                                alignItems="center"
                                justifyContent="space-evenly"
                            >
                                <Grid>
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            textAlign: "Center",
                                            fontWeight: 400,
                                            color: "#014D76",
                                            alignItems: "center",
                                        }}
                                    >
                                        {appraisalData.data && appraisalData.data.name}

                                        <div
                                            style={{
                                                fontSize: 12,
                                                fontWeight: 500,
                                                color: "#A5A5A5",
                                            }}
                                        >
                                            {appraisalData.data && appraisalData.data.position}
                                            <FiberManualRecordIcon
                                                sx={{fontSize: "small", color: "gray"}}
                                            />
                                            Corp Support-IT
                                        </div>
                                    </Typography>
                                </Grid>

                                <Grid>
                                    <Typography>
                                        <div
                                            style={{fontSize: 14, fontWeight: 400, color: "gray"}}
                                        >
                                            {appraisalData.data && appraisalData.data.employeeCode}
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                color: "#4F84A0",
                                            }}
                                        >
                                            ApprasialDate:29/19/21 - ApprasialPeriod 1 Year
                                        </div>
                                    </Typography>
                                </Grid>

                                <Grid>
                                    <Typography>
                                        <div
                                            style={{fontSize: 14, fontWeight: 400, color: "gray"}}
                                        >
                                            Previous Ratings 4.0
                                        </div>

                                        <div
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                color: "#4F84A0",
                                            }}
                                        >
                                            Line Manager Details
                                        </div>
                                    </Typography>
                                </Grid>
                            </Stack>
                        </Grid>
                    </React.Fragment>
                </Box>

                <Box
                    sx={{
                        height: 150,
                        textAlign: "center",
                        color: "#79AFCC",
                        marginTop: "90px",
                        fontFamily: "adobe-clean, sans-serif",
                    }}
                >
                    <React.Fragment>
                        <Grid container spacing={6}>
                            <Grid container item spacing={1}>
                                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                                        {objectiveType && objectiveType.map((objective: any, index: number) => {
                                            // console.log(objective, "objective fial");
                                            return (
                                                <Tab onClick={() => tabClickHandler(index)}
                                                     label={objective.name.name}/>
                                            )
                                        })}
                                    </Tabs>
                                </Box>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Box>

                <Box
                    sx={{
                        //backgroundColor:"pink",
                        height: 150,
                        textAlign: "center",
                        marginTop: "25px",
                        fontFamily: "adobe-clean, sans-serif",
                    }}
                >
                    <div>

                        <Typography
                            style={{
                                color: "black",
                                fontSize: "16px",
                                fontWeight: "400",
                                marginBottom: "20px",
                            }}
                        >

                            {objectiveDescription && objectiveDescription.map((objective: any, index: number) => {
                                return (
                                    <TabPanel value={tabValue} index={index}>
                                        <p> {objectiveDescription.length > 0 && objectiveDescription[activeIndex].name.description}</p>
                                        {/*<p> {objectiveType[tabValue].objective_description.length > 0 && objectiveType[tabValue].objective_description[activeIndex].name.detailed_description}</p>*/}
                                    </TabPanel>
                                )

                            })}


                            {/*{ld && objectiveDescription[activeIndex].name.description}*/}
                            {/*<p>{objectiveDescription[activeIndex].name.description}</p>*/}
                            {/*{console.log(objectiveDescription, '````````````')}*/}

                        </Typography>
                    </div>

                    <div
                        style={{
                            color: "#A5A5A5",
                            fontSize: "14px",
                            fontWeight: "400",
                            marginBottom: "20px",
                        }}
                    >
                        <p>
                            {/*{objectiveDescription.length > 0 && objectiveDescription[activeIndex].name.detailed_description}*/}
                        </p>
                    </div>

                    <Stack direction="row">
                        {ratings && ratings.data.map((rating: any) => (
                            <Button
                                style={{
                                    borderRadius: "100px",
                                    borderColor: "#A5A5A5",
                                    color: "black",
                                }}
                                variant="outlined"
                                size="small"
                                onClick={() => setRating(rating._id)}
                            >
                                {rating.rating}
                            </Button>
                        ))}
                    </Stack>
                </Box>

                <Box>
                    <div
                        style={{marginLeft: "400px", color: "#A5A5A5", fontSize: "14px"}}
                    >
                        <p> Individual Objective Remarks/Justification</p>
                        <p>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                size="medium"
                                style={{width: 350}}
                                inputProps={{ maxLength: 256 }}

                            />
                        </p>
                    </div>
                </Box>

                <Box
                    sx={{
                        marginLeft: "1000px",
                        height: "40px",
                        width: "140px",
                        border: "1px solid #A5A5A5 ",
                        textAlign: "center",
                        borderRadius: "8px",
                        padding: "15px 0",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: "16px",
                        }}
                    >
                        <p style={{color: "#A5A5A5", fontSize: "16px"}}>
              <span>
                <AttachFileIcon sx={{fontSize: "large", color: "gray"}}/>
              </span>
                            Attachments
                        </p>
                    </div>
                </Box>
                <hr style={{marginTop: "20px"}}></hr>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}


                >
                    <p style={{width: ' 150px'}}></p>

                    {overview ? <> <MyComponent>

                            <IconButton onClick={prevSlide}>
                                <ArrowBackIcon sx={{color: "gray"}}/>
                            </IconButton>


                            <IconButton onClick={submit}>
                                <ArrowForwardIcon sx={{color: "gray"}}/>
                            </IconButton>
                            <p> o</p>
                        </MyComponent>
                        </> :
                        <Link to={APPRAISER}><Button>Overview </Button></Link>
                    }


                    <div style={{width: ' 150px'}}>

                        <BorderLinearProgress variant="determinate" value={50}/>

                    </div>
                </Stack>
            </Container>
        </>
    );
}