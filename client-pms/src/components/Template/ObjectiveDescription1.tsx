import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from "@mui/material/Box";


export default function ObjectiveDescription() {
    return (
        <Box
        p={2}
        bgcolor="#fff"
        /* boxShadow=" 2px 4px 6px 4px rgba(0, 0, 0, 0.2)"*/
        height={500}
        border={1}
        borderColor="lightgrey"
        width={330}
        marginTop={2}
      >
      <div style={{ display: "flex", alignItems: "center" }}>
        <p
          style={{
            color: "#004C75",
            fontSize: "22px",
            fontFamily: " Arial, Helvetica, sans-serif",
            marginTop: "5px",
            margin: "10px",
          }}
        >
          Objective Description
        </p>
      </div>






        <FormGroup>
            <FormControlLabel style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}} control={<Checkbox defaultChecked />} label="All" />
            <FormControlLabel style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}}control={<Checkbox defaultChecked />} label="Knowledge Of the Job" />
            <FormControlLabel style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}} control={<Checkbox defaultChecked />} label="Quality of work" />
            <FormControlLabel style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}} control={<Checkbox defaultChecked />} label="Time Management" />
            <FormControlLabel style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}}control={<Checkbox defaultChecked />} label="Communication Skills" />
            <FormControlLabel style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}} control={<Checkbox defaultChecked />} label="Drive for results" />
            <FormControlLabel style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}} control={<Checkbox defaultChecked />} label="Fostering Innovations" />
            <FormControlLabel  style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}}control={<Checkbox defaultChecked />} label="Teamwork" />
            <FormControlLabel  style={{color: "#434545",fontFamily: " adobe-clean, sans-serif",}}control={<Checkbox defaultChecked />} label="Customer Focus" />
        </FormGroup> 
        </Box>
    )
};
