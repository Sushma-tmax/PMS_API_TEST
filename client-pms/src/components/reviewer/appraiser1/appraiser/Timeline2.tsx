import * as React from 'react';
import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, {stepConnectorClasses} from '@mui/material/StepConnector';
import Greenplus from '../../Reviewericons/Greenplus.svg';

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
    fontWeight: 400
});
const Headings = styled("div")({
    fontSize: '11px',
    color: '#333333',
    fontWeight: 400,
    width: '100px',
    marginLeft: '23px'
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


const ColorlibConnector = styled(StepConnector)(({theme}) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 4,
        width: '147px',
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
const ColorlibStepIconRoot = styled('div')(({theme, ownerState}) => ({
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
    const {active, completed, className} = props;

    const icons = {
        // 1: <SettingsIcon />,
        // 2: <GroupAddIcon />,
        // 3: <VideoLabelIcon />,
        1: <img src={Greenplus} alt='icon'/>,
        2: <img src={Greenplus} alt='icon'/>,
        3: <img src={Greenplus} alt='icon'/>,
        4: <img src={Greenplus} alt='icon'/>,
        5: <img src={Greenplus} alt='icon'/>,


    };

    return (
        //@ts-ignore
        <ColorlibStepIconRoot ownerState={{completed, active}} className={className}>
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


const steps = [
    {label: 'Jun 1 - 20', description: 'Appraisal'},
    {label: 'Jun 1 - 30', description: 'Reviewer'},
    {label: 'Jun 20 - Jul 15', description: 'Normalizer'},
    {label: 'Jul 15 - Aug 30', description: 'F2F Meeting'},
    {label: 'Jul 15 - Aug 30', description: 'Employee Acknowledgment'},
    {label: 'Jul 15 - Sep 23', description: 'Mediation'},
    {label: 'Jul 15 - Sep 23', description: 'Re-normalization'},
    {label: 'Sep 23 - Sep 30', description: 'Closing'},

]


export default function Timeline2() {
    return (
        <Stack sx={{width: '100%'}} spacing={4}>
            <Timeline>
                Timeline
            </Timeline>
            <Steppercontent>
                <Stepper alternativeLabel activeStep={5} connector={<ColorlibConnector/>}>
                    {steps.map((step) => (
                        <Step key={step.label}>
                            <Stepperbutton>
                                <StepLabel StepIconComponent={ColorlibStepIcon}>
                                    <Labels>{step.label}</Labels>
                                    <Headings>{step.description}</Headings>
                                </StepLabel>

                            </Stepperbutton>
                        </Step>
                    ))}
                </Stepper>
            </Steppercontent>
        </Stack>
    );
}
