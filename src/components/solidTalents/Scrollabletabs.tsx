import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Bulb from "../appraisal/components/Icons/Bulb.svg";


const AntTabs = styled('div')({
    //borderBottom: '1px solid #e8e8e8',
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
        height: '40px',
        border: '1px solid blue',
        width:'183px !important',
        borderRadius: '5px'
    },
    '&.MuiButtonBase-root':{
      padding:'60px'
    },
    '&.MuiTabs-flexContainer': {
      height: '100px',
      backgroundColor: 'blue !important'
    },
    '&.MuiTabs-scroller': {
        height: '120px',
    }
});

const AntTab = styled('div')({
    //borderBottom: '1px solid #e8e8e8',
   
    '&.MuiButtonBase-root':{
      backgroundColor:'grey'
    },
    // '&.MuiTabs-flexContainer': {
    //   height: '100px',
    //   backgroundColor: 'blue !important'
    // },
});

const Tabcontainer = styled("div")({
    // marginTop: '-40px',
     //marginLeft: "230px",
    // marginRight: '280px',
    '& .MuiTabs-flexContainer': {
        height: '120px'
    },
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
        height: '115px',
        border: '1px solid rgb(60 139 181/50%)',
        width:'180px !important',
        borderRadius: '5px'
    },

    '& .MuiButtonBase-root': {
        textTransform: 'none',
        color: '#3C8BB5',
        width:'183px !important',
        marginLeft: '50px',
      fontSize:'14px',
        fontWeight: 400,
        // '&:active': {
        //     boxShadow: 'none',
        //     backgroundColor: 'none',
        //     borderColor: 'none',
        //   },
          '&:focus': {
            backgroundColor: 'none',
          },

    },
    '& .Mui-selected': {
        color: '#3C8BB5',
         '&:active': {
        boxShadow: 'none',
        backgroundColor: 'none',
        borderColor: 'none',
      },
    },
   

});



export default function Scrollabletabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ maxWidth: '680px',  marginTop: '50px', marginLeft: '100px' }}>
            <Tabcontainer>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons={false}
                    aria-label="scrollable prevent tabs example"


                >
                    
                    <Tab  icon={<img src={Bulb} alt='icon' />} label="Core Competencies" />
                    
                    <Tab icon={<img src={Bulb} alt='icon' />} label="Core Competencies " />
                    <Tab icon={<img src={Bulb} alt='icon' />} label="Core Competencies" />
                    <Tab icon={<img src={Bulb} alt='icon' />} label="Core Competencies" />
                    <Tab icon={<img src={Bulb} alt='icon' />} label="Core Competencies" />
                    <Tab icon={<img src={Bulb} alt='icon' />} label="Core Competencies" />
                    <Tab icon={<img src={Bulb} alt='icon' />} label="Core Competencies" />
                   
                </Tabs>
            </Tabcontainer>
        </Box>
    );
}
