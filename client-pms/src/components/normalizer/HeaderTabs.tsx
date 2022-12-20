import * as React from 'react';
import {useEffect, useState} from 'react';
import Accordion01 from './Accordion01';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {styled} from "@mui/material/styles";
import Divider from '@mui/material/Divider';
import {useGetObjectiveTitleQuery} from "../../service";

const Tablet = styled("div")({
    marginLeft: "25px",
    marginTop: "10px",
    paddingBottom: '15px',
    color: '#3C8BB5',

});
const Typo1 = styled("div")({
    //position: "absolute",
    // marginLeft: "25px",
    // marginTop: "0px",
    fontSize: '20px',
});
const Typo2 = styled("div")({
    //position: "absolute",
    //marginLeft: "60px",
    // marginTop: "8px",
    fontSize: '15px',

});
const Panel = styled("div")({

    '&.MuiBox-root': {
        paddingTop: '0px',
    }


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
                <Box sx={{p: 3, paddingTop: '0px'}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


const HeaderTabs = (props: any) => {
    const {employee1Data, rating1Data} = props
    console.log(employee1Data, 'employee1Data')
    const [tabValue, setTabValue] = React.useState(0);
    const [activeObjectiveType, setActiveObjectiveType] = useState(null)
    const [activeObjectiveDescription, setActiveObjectiveDescription] = React.useState([]);


    const {data: objectiveTitleData, isLoading} = useGetObjectiveTitleQuery('')


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        console.log('handle change run')
        console.log(newValue, 'index check')
        setTabValue(newValue);

    };

    const findObjectiveTitleById = (id: any) => {
        if (objectiveTitleData) {
            console.log(id, 'objectiveTitleData')
            return objectiveTitleData.data.find((item: any) => item._id === id)
        }
    }


    useEffect(() => {

        if (employee1Data && objectiveTitleData) {
            setActiveObjectiveDescription(() => {
                return employee1Data.data.normalizer.objective_description.map((i: any) => {
                    return {
                        ...i,
                        objective_title: findObjectiveTitleById(i.name.objective_title),
                    }
                })
            })
        }
    }, [employee1Data, objectiveTitleData])

    console.log(activeObjectiveDescription, 'activeObjectiveDescription')

    useEffect(() => {

        if (employee1Data) {
            setActiveObjectiveType(employee1Data.data.normalizer.objective_type[tabValue].name._id)
        }

    }, [tabValue, employee1Data])


    const filterObjectiveDescription = (data: any) => {
        if (data && activeObjectiveType) {
            console.log(data, "data");
            const res = data.filter((i: any) => {
                // console.log(i.objective_type._id , 'id', valueData);
                return i.name.objective_type === activeObjectiveType;
            });
            // console.log(res, 'descriptions')
            return res;
        }
    };


    return (

        <Box sx={{width: '100%'}}>
            <Tablet>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
                        {employee1Data && employee1Data.data.normalizer.objective_type.map((objType: any, index: number) => {
                            return (

                                <Tab
                                    label={objType.name.name}/>

                            )
                        })}
                    </Tabs>
                </Box>
            </Tablet>

            <Stack
                direction="row"
                alignItems="center"
                marginLeft='25px'
                spacing={2}
            >
                <Typo1> 4.1 </Typo1>
                <Typo2>Exceeds Expectations</Typo2>
            </Stack>
            {employee1Data && activeObjectiveType && activeObjectiveDescription.map((objDesc: any, index: number) => {
                return (
                    <Panel>
                        <TabPanel value={tabValue} index={index}>
                            {activeObjectiveDescription && activeObjectiveType && objectiveTitleData &&
                                filterObjectiveDescription(activeObjectiveDescription).map((j: any) => {

                                    return (
                                        <Accordion01
                                            objective={j}
                                            rating2Data={rating1Data}
                                            appraisarObjectiveDescription={employee1Data.data.appraisal.objective_description}
                                            reviewerObjectiveDescription={employee1Data.data.reviewer.objective_description}

                                        />

                                    )
                                })}
                        </TabPanel>
                    </Panel>
                )
            })}

        </Box>

    );
}

export default HeaderTabs
