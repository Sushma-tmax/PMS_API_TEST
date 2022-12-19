import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
import Blueadd from './Reviewericons/Blueadd.svg';
import Blueminus from './Reviewericons/Blueminus.svg';
import Stack from '@mui/material/Stack';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveIcon from '@mui/icons-material/Remove';
import { useReviewerContext } from "../../context/reviewerContextContext";
import { useNormalizerContext } from '../../context/normalizerContext';


const Contain = styled("div")({
    marginRight: "20px",
    marginLeft: "25px",
    marginTop: "10px",

});
const TrainingRecommendations = styled("div")({
    marginLeft: "25px",
    marginTop: '10px',
    color: '#717171',
    fontSize: '16px',
    fontFamily:"arial"
});

const Tfbox = styled('div')({
    width: '400px',
    backgroundColor: '#FFFFFF',
    '& .MuiInputLabel-root': {
        color: '#333333',
        opacity: '0.5',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
    },
});
const Tf = styled('div')({
    fontSize: '13x',

    backgroundColor: '#FFFFFF',
    '& .MuiInputLabel-root': {
        color: '#333333',
        opacity: '0.5',
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
    },
});
const Containers = styled('div')({
    marginTop: 18,
    marginLeft: 12,
    marginRight: 16,
    width: "93%",
});
const Griditems1 = styled('div')({
    width: "33%", border: "1px solid #ddd", height: 75,
});
const Griditems2 = styled('div')({
    width: "33%", border: "1px solid #ddd", height: 75,
});
const Griditems3 = styled('div')({
    width: "33%", border: "1px solid #ddd", height: 75,
});

const Typo1 = styled("div")({

    marginTop: "-15px",
    fontSize: '13px',
    opacity: '0.5',
    fontWeight: '400',
    color: '#333333'

});

const RTrecommandation = (props: any) => {
    const { training1Data } = props

    // @ts-ignore
    const { trainingRecommendation, setTrainingRecommendation, trainingSelectValue, trainingRecommendationFormValues, setTrainingRecommendationFormValues
    } = useNormalizerContext()

    const [formValues, setFormValues] = useState([{ name: "", training_name: "", justification: "" }])

    const handleTrainingChange = (i: any, e: any) => {
        
        const newFormValues = [...formValues];
        //@ts-ignore
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);

    }

    const addFormFields = () => {
        setFormValues([...formValues, { name: "", training_name: "", justification: "" }])
    }

    const removeFormFields = (i: any) => {
        const newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    useEffect(() => {
        if (trainingRecommendation.length > 0) {
            setFormValues(() => {
                return trainingRecommendation.map((j: any) => {
                    return {
                        name: j.name._id,
                        training_name: j.training_name,
                        justification: j.justification,
                    };
                });
            });
        }
    }, [trainingRecommendation]);

    useEffect(() => {
        setTrainingRecommendationFormValues(formValues);
    }, [formValues]);

    return (
        <div>
            <TrainingRecommendations>
                 Training Recommendations Justification (Normalizer)
            </TrainingRecommendations>
            <Contain>

                {formValues.map((element, index) => (
                    <Grid container spacing={0}>
                        <Griditems1>
                            <Grid item>
                                <Containers>
                                    <Box>

                                        {/* <FormControl size='small' sx={{minWidth: 373, backgroundColor: '#FFFFFF',}}>
                                            <InputLabel><Typo1><p>Select</p></Typo1></InputLabel>
                                            <Select label="select"
                                                    name="name"
                                                    value={element.name || ""}
                                                    onChange={e => handleTrainingChange(index, e)}>
                                                {trainingSelectValue && trainingSelectValue.map((TrainingData: any) => {
                                                    return (
                                                        <MenuItem value={TrainingData.name._id}>
                                                            {TrainingData.name.title}
                                                        </MenuItem>
                                                    )

                                                })}
                                            </Select>
                                        </FormControl> */}

                                        <TextField
                                            select
                                            // fullWidth
                                            label="select"
                                            id="outlined-select-select"
                                            size="small"
                                            variant="standard"
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            name="name"
                                            value={element.name || ""}
                                            onChange={(e) => handleTrainingChange(index, e)}
                                        >
                                            {trainingSelectValue &&
                                                trainingSelectValue.map((TrainingData: any) => {
                                                    return (
                                                        <MenuItem value={TrainingData.name._id}>
                                                            {TrainingData.name.title}
                                                        </MenuItem>
                                                    );
                                                })}
                                        </TextField>

                                    </Box>
                                </Containers>
                            </Grid>
                        </Griditems1>
                        <Griditems2>
                            <Grid item>
                                <Containers>
                                    <Box>

                                        <Tf>
                                            <TextField fullWidth
                                                multiline
                                                label='Enter Training Name'
                                                size='small'
                                                name="training_name"
                                                variant="standard"
                                                InputProps={{
                                                    disableUnderline: true,
                                                }}
                                                value={element.training_name || ""}
                                                inputProps={{ maxLength: 500 }}

                                                onChange={e => handleTrainingChange(index, e)} />
                                        </Tf>
                                    </Box>

                                </Containers>
                            </Grid>
                        </Griditems2>
                        <Griditems3>
                            <Grid item>
                                <Containers>
                                    <Box>

                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={1}
                                        >
                                            <Tfbox>
                                                <TextField fullWidth
                                                    multiline
                                                    label='Enter your Justification'
                                                    size='small'
                                                    name="justification"
                                                    variant="standard"
                                                    InputProps={{
                                                        disableUnderline: true,
                                                    }}
                                                    id="outlined-select-select"
                                                    value={element.justification || ""}
                                                    inputProps={{ maxLength: 500 }}

                                                    onChange={e => handleTrainingChange(index, e)}></TextField>
                                            </Tfbox>
                                            {formValues.length - 1 === index && formValues.length < 6 &&
                                                (<IconButton onClick={() => addFormFields()}><img src={Blueadd}
                                                    alt='icon' /></IconButton>)
                                            }

                                            {formValues.length !== index + 1 &&

                                                (<IconButton onClick={() => removeFormFields(index)}><img
                                                    src={Blueminus} alt='icon' /></IconButton>)
                                            }

                                        </Stack>

                                    </Box>
                                </Containers>
                            </Grid>
                        </Griditems3>
                    </Grid>
                ))}
            </Contain>
        </div>
    );
}

export default RTrecommandation

