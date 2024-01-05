import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from "@mui/material/Typography";



const steps = [
  'Jun 1 - 20 Appraiser',
  'Jun 1 - 30 Reviewer',
  'Jun 20 - Jul 15 Normalizer',
  'Jun 15 - Aug 30 F2F Meeting',
  'Jun 15 - Aug 30 Employee Acknowledgwment',
  'Jun 15 - Sep 23 Mediation',
  'Jun 15 - Sep 23 Re-normalizer',
  'Sep 23 - Sep 30 Normalizer',


];

export default function HorizontalLabelPositionBelowStepper() {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography
          variant="h5"
          align="left"
          sx={{ marginLeft: 0}}
          gutterBottom
          component="div"
        >
          {" "}
          Time line
        </Typography>
      <Stepper activeStep={4} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
