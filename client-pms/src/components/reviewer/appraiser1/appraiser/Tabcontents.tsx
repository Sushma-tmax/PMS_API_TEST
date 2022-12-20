import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from "@mui/material/styles";
import Divider from '@mui/material/Divider';

const Heading = styled("div")({
  fontSize: '14px',
  color: '#333333',
  marginLeft: '13.5px',
  paddingTop: '5px',

});
const Tablet = styled("div")({
  marginLeft: "25px",
  marginTop: "10px",
  color: '#3C8BB5',
     

});
const THead = styled("div")({
 color:'#3C8BB5',
  '& .MuiButtonBase-root': {
     textTransform:'none',    
     fontWeight:400
 },
});
const Description = styled("div")({
  fontSize: '13px',
  color: '#333333',
  opacity: 0.6,
  marginLeft: '13.5px',
  paddingBottom: '15px'
});
const Bgcolor = styled('div')({
  background: '#F2F6F8'
});
const Ratingbox = styled("div")({
  padding: "0px",
  paddingRight: '80px'
});
const Rating = styled("div")({
  marginTop: '-7px',
  fontSize: '20px'
});
const Comments = styled("div")({
  fontSize: '11px',
  marginTop: '-26px',
});
const Divide = styled('div')({
  marginTop: '3px',
  paddingbottom: "35px",
});

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Tabcontents() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tablet>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
         {/* <THead> <Tab label="Job Compentencies" {...a11yProps(0)} /></THead> */}
          <Tab label="Job Compentencies" {...a11yProps(0)} /> 
          <Tab label="Core Compentencies" {...a11yProps(1)} />
          <Tab label="Performance Feedback" {...a11yProps(2)} />
        </Tabs>
      </Box>
      </Tablet>
      <TabPanel value={value} index={0}>
        <div>

         
          <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box style={{ width: "940px" }} >
                <Heading><p>Drive for results</p></Heading>
                <Description><p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p></Description>
              </Box>
              <Ratingbox>
                <Box>
                  <Rating><p>5.0</p></Rating>
                  <Comments><p>Exceptional</p></Comments>
                </Box>
              </Ratingbox>
            </Stack>

          <Bgcolor>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box style={{ width: "940px" }} >
                <Heading><p>Fostering innovation</p></Heading>
                <Description><p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p></Description>
              </Box>
              <Ratingbox>
                <Box>
                  <Rating><p>3.0</p></Rating>
                  <Comments><p>Delivering</p></Comments>
                </Box>
              </Ratingbox>
            </Stack>

          </Bgcolor>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box style={{ width: "940px" }} >
              <Heading><p>Teamwork</p></Heading>
              <Description><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem has been the industry's  dummy text ever since the 1500s,</p></Description>
            </Box>
            <Ratingbox>
              <Box>
                <Rating><p>4.0</p></Rating>
                <Comments><p>Exceeding</p></Comments>
              </Box>
            </Ratingbox>
          </Stack>

          <Bgcolor>

            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >

              <Box style={{ width: "940px" }} >
                <Heading><p>Customer Focus</p></Heading>
                <Description><p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem  has been the industry's dummy text ever since the 1500s,</p></Description>
              </Box>
              <Ratingbox>
                <Box>
                  <Rating><p>4.0</p></Rating>
                  <Comments><p>Exceeding</p></Comments>
                </Box>
              </Ratingbox>

            </Stack>

          </Bgcolor>
        </div>
        <Divide><Divider /></Divide>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
