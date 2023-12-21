import * as React from "react";
import {useEffect, useState} from "react";
// import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import {Container, Grid, Paper, Typography, Box, LinearProgress, IconButton,} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {styled} from "@mui/material/styles";
import LightbulbSharpIcon from "@mui/icons-material/LightbulbSharp";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";
import StackedBarChartSharpIcon from "@mui/icons-material/StackedBarChartSharp";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';
import {height} from "@mui/system";
import {
    Button,
    Fab,
} from "@mui/material";
import {TextField} from "@mui/material";
import {APPRAISER} from "../../constants/routes/Routing";
import {Link} from "react-router-dom";
import objectiveType from "../objective_old/ObjectiveType";

// import { makeStyles } from "@mui/styles";
// const useStyles = makeStyles({
//   root: {
//     borderRadius: 3,
//   },
// });

const Item1 = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const Item = styled(Box)(({theme}) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    // ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    // color: theme.palette.text.secondary,
}));
const Contain = styled("div")({
    borderRadius: "100px",
    backgourndColor: "black",
    // display:'none'
});

function TabPanel(props: any) {
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


const Tablets = (props: any) => {
    const {appraiser1Data, ratingsData, mutation} = props
    const [tabValue, setTabValue] = React.useState<any>(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeObjectiveType, setActiveObjectiveType] = useState<any>(
        null)
    const [objectiveDescription, setObjectiveDescription] = React.useState<any>(
        []
    );
    const [activeObjectiveDescription, setActiveObjectiveDescription] = useState('');

    const [activeObjectiveDescriptionName, setActiveObjectiveDescriptionName] = useState('');

    const [rating, setRating] = useState<any>('');
    const [activeEmployee, setActiveEmployee] = useState('');

    const [overview, setOverview] = useState(true);
    const [objdata, setObjData] = useState("")
    const [percentage, setPercentage] = useState("")
    


    console.log(activeObjectiveDescription, 'activeObjectiveDescription')

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log('handle change run')
        console.log(newValue, 'index check')
        setTabValue(newValue);

    };


    const filterObjectiveDescription = (data: any) => {
        if (data && activeObjectiveType) {

            const res = data.filter((i: any) => {
                // console.log(i.objective_type._id , 'id', valueData);
                return i.name.objective_type === activeObjectiveType;
            });
            // console.log(res, 'descriptions')
            return res;
        }
    };


    useEffect(() => {
        if (appraiser1Data) {
            setObjectiveDescription(appraiser1Data.data.appraisal.objective_description)
            setActiveEmployee(appraiser1Data.data._id)
        }
    }, [appraiser1Data])

    useEffect(() => {

        if (appraiser1Data) {
            setActiveObjectiveType(appraiser1Data.data.appraisal.objective_type[tabValue].name._id)
        }

    }, [tabValue, appraiser1Data])


    useEffect(() => {

        if (appraiser1Data && activeObjectiveType) {
            setActiveObjectiveDescription((filterObjectiveDescription(appraiser1Data.data.appraisal.objective_description)[activeIndex]._id))
            console.log(appraiser1Data.data.appraisal.objective_description[activeIndex]._id, 'active index')
        }

    }, [appraiser1Data, tabValue, activeIndex, objectiveDescription, activeObjectiveType])

    useEffect(() => {

        if (appraiser1Data && activeObjectiveType) {
            setActiveObjectiveDescriptionName((filterObjectiveDescription(appraiser1Data.data.appraisal.objective_description)[activeIndex].name._id))
            console.log(appraiser1Data.data.appraisal.objective_description[activeIndex].name._id, 'active index')
        }

    }, [appraiser1Data, tabValue, activeIndex, objectiveDescription, activeObjectiveType])
    

    //   useEffect(() => {
    //     if (activeObjectiveType.length > 0) {

    //     }
    // }, [objectiveDescription, activeIndex, tabValue])

    const nextSlide = () => {

        console.log(objectiveDescription, 'objectiveDescription')
        if (appraiser1Data) {


            // if (tabValue === activeObjectiveType!.length - 1 && activeIndex === objectiveDescription.length - 1) {
            if (tabValue === appraiser1Data.data.appraisal.objective_type.length - 1 && activeIndex === filterObjectiveDescription(objectiveDescription).length - 1) {
                console.log('```````````````````````````````````````````````````')
                setOverview(false)
            } else if (activeIndex === filterObjectiveDescription(objectiveDescription).length - 1) {
                console.log('increase tab running and index')
                setTabValue(tabValue + 1)
                setActiveIndex(0)
            } else if (activeIndex !== filterObjectiveDescription(objectiveDescription).length) {
                console.log('increase index')
                setActiveIndex(activeIndex + 1)
            }
        }
        mutation({
            objective_description: activeObjectiveDescription,
            objective_description_name: activeObjectiveDescriptionName,
            ratings: rating,
            id: activeEmployee,
        })


    }

    const previousSlide = () => {
        console.log(objectiveDescription, 'objectiveDescription')
       
          if (activeIndex === 0) {
         
          setActiveIndex(filterObjectiveDescription(objectiveDescription).length-1)
          setTabValue(tabValue-1)
        }
         else if (activeIndex !== filterObjectiveDescription(objectiveDescription).length) {
          setActiveIndex(activeIndex - 1)
         }
    }


    //   const prevSlide = () => {

    //     if (activeObjectiveType && activeIndex === activeObjectiveType[tabValue].objective_description.length - 1) {
    //         setTabValue(tabValue - 1)
    //         setActiveIndex(0)
    //     } else if (activeIndex === 1) {
    //         setActiveIndex(activeIndex - 1)
    //     }
    // }

    // setProgress(objectiveDescription.length)
  

    
   
    return (
        <>
            <Box justifyContent="space-between">
                {/*@ts-ignore*/}

                <Tabs TabIndicatorProps={{
                    style: {
                        height: '10vh',
                        background: 'transparent',
                        borderColor: 'black',
                        border: '1px solid #1976d2',
                        borderRadius: '5px'
                    }
                }} justifyContent="space-between" textColor="primary"
                      value={tabValue} onChange={handleChange}>
                    {appraiser1Data && appraiser1Data.data.appraisal.objective_type.map((objType: any, index: number) => {

                        return (
                            <Tab icon={<LightbulbSharpIcon color="primary"/>} label={objType.name.name}/>

                        )
                    })}
                </Tabs>
            </Box>

            {appraiser1Data && activeObjectiveType && objectiveDescription.map((objDesc: any, index: number) => {
             console.log(objDesc,'objDesc')
                return (
                    <TabPanel value={tabValue} index={index}>
                        {objectiveDescription && activeObjectiveType &&
                            filterObjectiveDescription(objectiveDescription)[activeIndex].name.description}
                    </TabPanel>
                )
            })}


            <Stack>

                <Item justifyContent="space-between">
                    <Stack direction="row" spacing={1} width="20px" height="30px">
                        {ratingsData && ratingsData.data.map((rating: any) => (
                            <Item>
                                <Contain>
                                    <Button variant="outlined" color="error" onClick={() => {
                                        console.log(rating._id, 'rating')
                                        setRating(rating._id)
                                    }} size="small"> {rating.rating}</Button>

                                    {/* <Button size="small" width="35px">
                  1
                </Button> */}
                                </Contain>
                            </Item>
                        ))}
                    </Stack>
                </Item>

                <Item>
                    <Typography variant="caption" color={"#3f8db6"}>
                        Individual objective remarks and justification
                    </Typography>
                    <br/>
                    <Box
                        sx={{
                            width: "300px",
                            marginLeft: "130px",
                        }}
                    >
                        <TextField fullWidth></TextField>
                    </Box>
                </Item>
            </Stack>
            <div>
                <Stack direction="row" justifyContent="space-between">
                    {/* <Item1>
            <Typography
              // position="absolute"
              // top="10px"
              // left="80px"
              variant="h4"
              color={"#333333"}
            >
              4.0
            </Typography>

            <Typography
              position="absolute"
              top="10px"
              left="60px"
              variant="caption"
              color={"#333333"}
            >
              Exceeding
            </Typography>
            <Typography
              position="absolute"
              top="30px"
              left="60px"
              variant="caption"
              color={"#333333"}
            >
              Overall ratings
            </Typography>
          </Item1> */}
                    {overview ? <>  <Item1>
                        {/* <ChevronLeftIcon fontSize="large" />
          <ChevronRightIcon fontSize="large" /> */}
                        {/* <Tabs   >
              <Tab icon={< ChevronLeftIcon fontSize="large" color="primary" />} />
              <Tab 
              // onClick={nextSlide}
              icon={< ChevronRightIcon fontSize="large" color="primary" />} />
            </Tabs> */}
                        <IconButton onClick={previousSlide}>

                            <ChevronLeftIcon fontSize="large" color="primary"/>
                        </IconButton>
                        <IconButton onClick={nextSlide}>

                            <ChevronRightIcon fontSize="large" color="primary"/>
                        </IconButton>


                    </Item1>
                    </> : <Link to={`${APPRAISER}/employee/${activeEmployee}`}><Button>Overview </Button></Link>}
                    <Item1>
                        <LinearProgress
                            variant="determinate"
                            color="success"
                            value={50}
                            style={{width: 100, height: 10, borderRadius: 5}}
                        ></LinearProgress>
                        <Typography position="absolute" left="853px">
                            2/11
                        </Typography>
                    </Item1>
                </Stack>
            </div>
        </>
    );
}

export default Tablets