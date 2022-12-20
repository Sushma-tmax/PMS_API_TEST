import React from 'react';
import { styled } from "@mui/material/styles";
import { Stack, Typography } from '@mui/material';
import { useAppraisalContext } from "../../../context/appraiserOverviewContext";
import { useAppraiserRejectsNormalizerContext } from "../../../context/AppraiserRejectsNormalizer";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
const Tf1 = styled("div")({
    // marginLeft: "25px",
    // marginTop: "5px",
    backgroundColor: "rgb(255 255 255/70%)",

    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "13px",
        fontWeight: "400",
        textTransform: "none",
        opacity: 0.4,
    },
});
const Typo1 = styled("div")({
    marginLeft: "25px",
    //position: "absolute",
    marginTop: '15px',
    color: "#008E97",
    fontSize: '13px',
    opacity: '0.85'

});
const Tablecontainer = styled("div")({
    marginLeft: "25px",
    // position: "absolute",
    marginTop: '10px',

});
const Pad1 = styled("div")({
    display: "flex",
    justifyContent: "center",
});
const Pad2 = styled("div")({
    paddingRight: '48px',
    paddingLeft: '50px'
});


const Root = styled('div')`
  table {
    
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: center;
    padding: 7px;
  }

  th {
    background-color: #eaf2f5;
    fontsize:12px;
  }
  td{
    background-color: #f7fbfc;  
  }
`

const Table2 = () => {

    //@ts-ignore
    const { appraiserTrainingRecommendation, setAppraiserTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues } = useAppraiserRejectsNormalizerContext()

    console.log(appraiserTrainingRecommendation, 'trainingRecommendation')

    return (
        <div>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="baseline"
                spacing={2}


            >
                <Typo1>
                    Appraiser Training Recommendation(s)
                </Typo1>
                <Typo1 style={{ paddingRight: "10px" }}>
                    <input type="checkbox" />
                    <label >  Reject Appraiser Training Recommendation(s) </label>
                </Typo1>
            </Stack>
            <Tablecontainer>
                <Root sx={{ width: "99%" }}   >
                    <table   >
                        <thead>
                            <tr>
                                {/* <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8 }} >#</th> */}
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, width: '152px' }} >Training Category</th>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, width: '152px' }} >Training Name</th>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8 }} ><Pad1>Justification</Pad1></th>
                                <th style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8 }} ><Pad1>Normalizer Comment(s)</Pad1></th>

                            </tr>
                        </thead>
                        <tbody>

                            {appraiserTrainingRecommendation.map((item: any, index: any) => {
                                return (
                                    <tr style={{ fontWeight: '400', fontSize: '12px', color: '#707070', opacity: 0.8, lineHeight: '20px' }} >
                                        {/* <td width='3%' >1</td> */}
                                        <td width='20%'  >
                                            {item.name.title}
                                        </td>
                                        <td width='20%'>
                                            {item.training_name}
                                        </td>
                                        <td width='420' style={{ paddingLeft: '10px' }} >
                                            <Pad2>
                                                {item.justification}
                                            </Pad2>

                                        </td>
                                        <td>

                                            <Tf1>
                                                <Box>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        inputProps={{ maxLength: 500 }}


                                                    />
                                                </Box>
                                            </Tf1>
                                        </td>

                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </Root>
            </Tablecontainer>
        </div>
    )
}

export default Table2;
