import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import Greenplus from '../../../assets/appraiser/Reviewericons/Greenplus.svg';
import dayjs from 'dayjs';
import Verticalline from "../../reviewer/Dashboard/Reviewericons/Verticalline.svg";
import { current } from '@reduxjs/toolkit';
import { useState ,useEffect} from 'react';
// import moment from "moment";

// date_create: moment().format("DD-MM-YYYY hh:mm:ss")



const Timeline = styled("div")({
    fontSize: '20px',
    color: '#333333',
    marginLeft: '20px',
    paddingTop: '15px',

});
const Labels = styled("div")({
    fontSize: '9px',
    opacity: 0.64,
    color: '#707070',
    fontWeight: 400,


});
const Headings = styled("div")({
    fontSize: '11px',
    color: '#333333',
    fontWeight: 400,
    width: '100%',
    // marginLeft: '23px'
});

const Steppercontent = styled("div")({

    '& .MuiStepper-root': {

        marginBottom: "28px"
    },
});
const Stepperbutton = styled("div")({

    '& .MuiSvgIcon-root': {

        zIndex: '1'
    },
});


const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 4,
        width: '93%',
        marginLeft: '-12px'


    },
    // [`&.${stepConnectorClasses.active}`]: {
    //     [`& .${stepConnectorClasses.line}`]: {

    //         backgroundColor: '#F6C609'
    //     },
    // },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            //   backgroundImage:
            //     'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
            backgroundColor: '#00B050'
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 10,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));
//@ts-ignore
const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#FFFFFF',
    border: "1px solid #E5E5E5",
    zIndex: 1,
    color: '#fff',
    width: 18,
    height: 18,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {

        // border: "1px solid red",
        // boxShadow: "0px 0px 2px 2px #FEF0ED",
        //opacity: 0.13,

    }),
    ...(ownerState.completed && {
        // backgroundImage:
        //   'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        // backgroundColor:'#FFFFFF',
        // border: '1px solid ##008E97',
        //color: '#00B050'
    }),
}));

function ColorlibStepIcon(props: any) {
    const { active, completed, className } = props;


    const icons = {
        // 1: <SettingsIcon />,
        // 2: <GroupAddIcon />,
        // 3: <VideoLabelIcon />,
        1: <img src={Greenplus} alt='icon' />,
        2: <img src={Greenplus} alt='icon' />,
        3: <img src={Greenplus} alt='icon' />,
        4: <img src={Greenplus} alt='icon' />,
        5: <img src={Greenplus} alt='icon' />,
        6: <img src={Greenplus} alt='icon' />,

    };

    return (
        //@ts-ignore
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {/* @ts-ignore */}
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};



const Timeline1 = (props: any) => {
    const { calendarData } = props
    const [date , setDate] = useState('')
    console.log(calendarData, 'calendarData')
    
    const steps = [
        { label: `${dayjs(calendarData.data[0].start_date_appraiser).format('MMM    DD')} -${dayjs(calendarData.data[0].end_date_appraiser).format('MMM    DD')} `, description: 'Appraiser' },
        { label: `${dayjs(calendarData.data[0].start_date_reviewer).format('MMM    DD')} -${dayjs(calendarData.data[0].end_date_reviewer).format('MMM    DD')} `, description: 'Reviewer' },
        { label: `${dayjs(calendarData.data[0].start_date_normalizer).format('MMM    DD')} -${dayjs(calendarData.data[0].end_date_normalizer).format('MMM    DD')} `, description: 'Normalizer' },
        { label: `${dayjs(calendarData.data[0].start_date_F2FMeeting).format('MMM    DD')} -${dayjs(calendarData.data[0].end_date_F2FMeeting).format('MMM    DD')} `, description: 'F2F Meeting' },
        { label: `${dayjs(calendarData.data[0].start_date_employee_acknowledgement).format('MMM    DD')} -${dayjs(calendarData.data[0].end_date_employee_acknowledgement).format('MMM    DD')} `, description: 'Employee Acknowledgment' },
        { label: `${dayjs(calendarData.data[0].start_date_mediation).format('MMM    DD')} -${dayjs(calendarData.data[0].end_date_mediation).format('MMM    DD')} `, description: 'Mediation' },
        { label: `${dayjs(calendarData.data[0].start_date_re_normalization).format('MMM    DD')} -${dayjs(calendarData.data[0].end_date_re_normalization).format('MMM    DD')} `, description: 'Re-normalization' },
        { label: `${dayjs(calendarData.data[0].start_date_closing).format('MMM    DD')} -${dayjs(calendarData.data[0].end_date_closing).format('MMM    DD')} `, description: 'Closing' },

    ]

    const dateNow = () => {
        const showDate = new Date();
        const displayTodaysDate = (showDate.getMonth()+1)+'-'+showDate.getDate(); 
        return displayTodaysDate
    }
    
    useEffect(()=>{
       setDate(dateNow())
    },[date,dateNow])
    

    return (
        <Stack sx={{ width: '100%', }} spacing={4}>
            <Timeline>
                Timeline 
            </Timeline>
            <Steppercontent>
                <Stepper alternativeLabel activeStep={2} connector={<ColorlibConnector />}>
                    {/* {calendarData && calendarData.data.map((step: any, index: any) => {
                        console.log(step, 'sssssssssssssssssssss') */}
                    {calendarData && steps &&  steps.map((step: any, index: any) => {

                        return (


                            <Step key={index}>
                                <Stepperbutton>
                                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                                        <Labels>{step.label}</Labels>
                                        {/* <Labels>{dayjs(calendarData.data[0].start_date).format('MMM    DD')}&nbsp;
                                        -&nbsp;&nbsp;{dayjs(calendarData.data[0].end_date).format('MMM   DD')}</Labels> */}
                                        <Headings>{step.description}</Headings>
                                    </StepLabel>

                                </Stepperbutton>
                            </Step>
                        )
                    })}
                </Stepper>
                <div>
                    <img
                        style={{ position: "absolute", top: "20%", left: "62%" }}
                        src={Verticalline}
                        alt="icon"
                    />
                    <input
                        style={{
                            height: "20px",
                            width: "60px",
                            background: "#004C75",
                            color: "#F1F1F1",
                            position: "absolute",
                            top: "15%",
                            left: "62%",
                            textAlign: "center",
                            fontSize: "14px"
                        }}
                        
                        value={`${dayjs(date).format('MMM-DD')}`}
                        type="text"

                    ></input>
                </div>
            </Steppercontent>
        </Stack>
    );
}
export default Timeline1
