import React, {useEffect} from 'react';
import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import { styled } from "@mui/material/styles";
import Dropdownbutton from './Dropdownbutton';
import { TextField } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import ArrowForwardSharpIcon from '@mui/icons-material/ArrowForwardSharp';
import Divider from '@mui/material/Divider';
import Attachicon from './Reviewericons/Attach.svg';
import Left1 from '../Reviewericons/Left.svg';
import Right1 from '../Reviewericons/Right.svg';
import Greyplus from './Reviewericons/Greyplus.svg';
import Minus from './Reviewericons/Minus.svg';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useParams } from 'react-router-dom';
import { useNormalizerContext } from '../../context/normalizerContext';
import { useNormalizerRejectionMutation } from '../../service';


const Typo6 = styled("div")({

    marginTop: "-13px",
    fontSize: '14px',
    color: '#333333'

});

const Contain = styled("div")({
    background: "#F6F6F6",
    width: "1200px",
    height: "75px",
    marginLeft: "0px",
    marginTop: "10px",
    marginRight: "25px",
});
const Cont = styled("div")({
    marginTop: "5px",
    // marginLeft: "25px",
    // marginRight: "20px",
});
const Typo1 = styled("div")({
    marginTop: '10px',
    fontSize: '12px',
    color: '#7A7A7A'

});
const Typo2 = styled("div")({
    marginTop: "10px",
    fontSize: '17px',
    opacity: 0.8,
});
const Typo3 = styled("div")({
    marginTop: '10px',
    marginLeft: '20px',
    fontSize: '12px',
    color: '#7A7A7A'
});
const Typo4 = styled("div")({
    marginTop: '20px',
    marginLeft: '20px',
    color: "#004C75",
    fontSize: '12px',
    fontWeight: '400',
});
const Typo5 = styled("div")({
    marginTop: '20px',
    marginLeft: '20px',
    color: "#004C75",
    fontSize: '12px',
    fontWeight: '400',
});
const Tf = styled("div")({
    marginTop: '-25px',
    marginLeft: '20px',
});
const Cancel = styled("div")({
    '& .MuiButton-root': {
        color: '#004C75',
        fontSize: '16px',
        fontWeight: '400',
        textTransform: 'none',
    },
    '& .MuiButton-outlined': {
        border: '1px solid #004C75',
        borderRadius: '10px',
        width: '140px'
    }
});
const Left = styled("div")({
    '& .MuiButton-root': {
        color: '#3C8BB5',
    },
});
const Right = styled("div")({
    '& .MuiButton-root': {
        color: '#3C8BB5',
    },
});
const FooterStack = styled('div')({
    marginLeft: "-19px",
    marginRight: "-19px",
    marginTop: "50px",
    paddingBottom: '40px'

});
const Attach = styled("div")({
    marginTop: "20px",
    marginLeft: '20px',
    paddingBottom: '20px',
    '& .MuiButton-root': {
        color: '#333333',
        opacity: 0.6,
        fontSize: '13px',
        fontWeight: '400',
        textTransform: 'none',
    },
    '& .MuiButton-outlined': {
        border: '1px solid #858585',
        opacity: 0.6,
        width: '150px',
        height: '35px'
    }
});
const Attachicon1 = styled("div")({
    marginRight: "5px",
    marginTop: '5px',
    color: '#000000'
});
const Attachtext = styled("div")({
    marginRight: "40px",

});
const H1 = styled("div")({
    marginLeft: "20px",
    fontSize: '15px',
    marginTop: "5px",
    color: '#333333',
    fontWeight: '400'
});
const Selectbtn = styled("div")({
    marginLeft: "20px",
    fontSize: '15px',
    marginTop: "-15px",
});
const Rating1 = styled("div")({

    fontSize: '20px',
    marginLeft: 'auto',
    marginRight: '35px'
});
const Rating2 = styled("div")({
    marginLeft: "1030px",
    fontSize: '20px',
});
const Rating3 = styled("div")({
    marginLeft: "1005px",
    fontSize: '20px',
});
const Rating4 = styled("div")({
    marginLeft: "985px",
    fontSize: '20px',
});
const Divide = styled('div')({
    marginLeft: "-17px",
    marginRight: "-17px",
    marginTop: "-7px",
});

const Accordion01 = (props: any) => {
    // @ts-ignore 
    const { ratingData, empData } = useNormalizerContext()
    const { employee_id } = useParams()
    const [upDateNormalizer] = useNormalizerRejectionMutation()
    const [rating, setRating] = React.useState("")
    const [rating1, setRating1] = useState('')
    const [objDescId, setObjDescId] = useState('')
    const [objDescNameId, setObjDescNameId] = useState('')
    const [comments, setComments] = useState('')
    const { objective, rating2Data,appraisarObjectiveDescription,reviewerObjectiveDescription } = props
    const [expanded, setExpanded] = React.useState<any>(false);
    console.log(rating, 'rating')
    //
    // const idHandler = () => {
    //
    //     setObjDescId(objective._id)
    //     setObjDescNameId(objective.name._id)
    //     setRating1(rating)
    //     setComments("")
    //
    //     upDateNormalizerHandler()
    //
    // }

    const upDateNormalizerHandler = () => {

        upDateNormalizer({
            ratings: rating,
            comments: comments,
            objective_description_name: objDescNameId,
            objective_description: objective._id,
            employee_id
        })


    }

    useEffect(() => {
        if(objective.ratings)
        setRating(objective.ratings._id)

    },[objective])

    // const handleChange =
    // (panel: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    //   setExpanded(isExpanded ? panel : false);
    // };

    return (
        <div>
            <Cont>
                <Accordion
                    sx={{
                        boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)",
                        marginTop: '15px', paddingTop: '0px'
                    }}

                // expanded={expanded === `${objective._id}`}
                // onChange={handleChange(objective._id)}
                >
                    <>
                        <AccordionSummary
                            expandIcon={expanded ? <img src={Minus} alt='icon' /> : <img src={Greyplus} alt='icon' />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            onClick={() => setExpanded(!expanded)}
                        >

                            <H1>

                                {objective?.name?.objectiveTitle}
                            </H1>


                        </AccordionSummary>
                        {expanded && (
                            <AccordionDetails style={{
                                height : "calc(100vh - 100px)"}} >
                                <Divide> <Divider /> </Divide>
                                <div>
                                <Contain>
                                    <Box>
                                        <Stack
                                            direction="row"
                                            width='100%'
                                            marginLeft='20px'
                                            spacing={3}
                                            alignItems='center'
                                            display='flex'
                                        >
                                            <div>
                                                <Typo1>Appraiser rating</Typo1> {appraisarObjectiveDescription.filter((i:any) => i.name._id === objective.name._id).map((k:any) => k.ratings.rating)[0]}
                                                <Typo1>Reviewer rating</Typo1> {reviewerObjectiveDescription.filter((i:any) => i.name._id === objective.name._id).map((k:any) => k.ratings.rating)[0]}
                                            </div>
                                            <div>
                                                <Typo2>
                                                    {/* {objective.ratings.rating} */}
                                                </Typo2>
                                            </div>
                                        </Stack>
                                        <Typo3>He has the depth knowledge about the job which we are assigning to his, he is doing more efforts to learn about the job,which is making him strong.</Typo3>

                                        {objective.level_1_isChecked &&

                                            <Typography
                                                style={{
                                                    borderBottom: "1px solid lightgrey",
                                                    marginLeft: "5px",
                                                    marginRight: "5px",
                                                    width: "240px",
                                                }}
                                            >


                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        paddingLeft: "5px",
                                                        paddingTop: "20px",
                                                    }}
                                                >
                                                    {/* <input
                                    type="checkbox"
                                    style={{
                                      height: "17px",
                                      width: "17px",
                                    }}
                                  /> */}
                                                    <span
                                                        style={{
                                                            paddingLeft: "7px",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                    Level 1
                                  </span>
                                                </div>

                                                <p
                                                    style={{
                                                        paddingLeft: "13px",
                                                        fontSize: "12px",
                                                        opacity: "75%",
                                                    }}
                                                >
                                                    {objective.name.level_1.level_definition}
                                                </p>

                                                {objective.name.level_1.behavioral_objective.map((i: any) => {
                                                    return (
                                                        <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {i}
                                                        </p>
                                                    )
                                                })}
                                            </Typography>}

                                        {objective.level_2_isChecked &&
                                            <Typography
                                                style={{
                                                    borderBottom: "1px solid lightgrey",
                                                    marginLeft: "5px",
                                                    marginRight: "5px",
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        paddingLeft: "5px",
                                                        paddingTop: "20px",
                                                    }}
                                                >
                                                    {/* <input
                                    type="checkbox"
                                    style={{
                                      height: "17px",
                                      width: "17px",
                                    }}
                                  /> */}
                                                    <span
                                                        style={{
                                                            paddingLeft: "7px",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                    Level 2
                                  </span>
                                                </div>
                                                <p
                                                    style={{
                                                        paddingLeft: "13px",
                                                        fontSize: "12px",
                                                        opacity: "75%",
                                                    }}
                                                >
                                                    {objective.name.level_2.level_definition}
                                                </p>

                                                {objective.name.level_2.behavioral_objective.map((i: any) => {
                                                    return (
                                                        <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {i}
                                                        </p>
                                                    )
                                                })}
                                            </Typography>}
                                        {objective.level_2_isChecked &&
                                            <Typography
                                                style={{
                                                    //   borderBottom: "1px solid lightgrey",
                                                    marginLeft: "5px",
                                                    marginRight: "5px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        paddingLeft: "5px",
                                                        paddingTop: "20px",
                                                    }}
                                                >
                                                    {/* <input
                                    type="checkbox"
                                    style={{
                                      height: "17px",
                                      width: "17px",
                                    }}
                                  /> */}
                                                    <span
                                                        style={{
                                                            paddingLeft: "7px",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                    Level 3
                                  </span>
                                                </div>
                                                <p
                                                    style={{
                                                        paddingLeft: "13px",
                                                        fontSize: "12px",
                                                        opacity: "75%",
                                                    }}
                                                >
                                                    {objective.name.level_3.level_definition}
                                                </p>

                                                {objective.name.level_3.behavioral_objective.map((i: any) => {
                                                    return (
                                                        <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {i}
                                                        </p>
                                                    )
                                                })}
                                            </Typography>}

                                        {objective.level_4_isChecked &&
                                            <Typography
                                                style={{
                                                    //   borderBottom: "1px solid lightgrey",
                                                    marginLeft: "5px",
                                                    marginRight: "5px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        paddingLeft: "5px",
                                                        paddingTop: "20px",
                                                    }}
                                                >
                                                    {/* <input
                                    type="checkbox"
                                    style={{
                                      height: "17px",
                                      width: "17px",
                                    }}
                                  /> */}
                                                    <span
                                                        style={{
                                                            paddingLeft: "7px",
                                                            fontSize: "14px",
                                                        }}
                                                    >
                                    Level 4
                                  </span>
                                                </div>
                                                <p
                                                    style={{
                                                        paddingLeft: "13px",
                                                        fontSize: "12px",
                                                        opacity: "75%",
                                                    }}
                                                >
                                                    {objective.name.level_4.level_definition}
                                                </p>

                                                {objective.name.level_4.behavioral_objective.map((i: any) => {
                                                    return (
                                                        <p
                                                            style={{
                                                                paddingLeft: "37px",
                                                                fontSize: "12px",
                                                                opacity: "75%",
                                                            }}
                                                        >
                                                            {i}
                                                        </p>
                                                    )
                                                })}
                                            </Typography>}
                                    </Box>
                                </Contain>
                                </div>
                                <div  style={{
                                                                paddingTop: "310px"
                                                            }}> 
                                <Typo4 >
                                    <p  > Change Rating to</p>
                                </Typo4>
                                <Selectbtn>
                                    {/* <Dropdownbutton  rating3Data = {rating2Data}/> */}
                                    <div>

                                        <FormControl variant="standard" sx={{ minWidth: 140 }}>
                                            <InputLabel><Typo6><p>Choose Rating</p></Typo6></InputLabel>

                                            <Select
                                                value={rating}
                                                onChange={(e) => {
                                                    setRating(e.target.value)
                                                    upDateNormalizer({
                                                        ratings: e.target.value,
                                                        objective_id: objective._id,
                                                        objective_description_name: objective.name._id,
                                                        objective_description: objective._id,
                                                        employee_id
                                                    })
                                                }}>
                                                {ratingData && ratingData.data.map((j: any, index: any) => {
                                                    return (
                                                        <MenuItem value={j._id}>{j.rating}</MenuItem>
                                                    )
                                                })}
                                            </Select>

                                        </FormControl>




                                    </div>
                                </Selectbtn>
                                <Typo5>
                                    <p>Your Comments</p>
                                </Typo5>
                                <br />
                                <Tf >
                                    <TextField fullWidth multiline
                                                  inputProps={{ maxLength: 512 }}
 
                                     value={comments}
                                     onChange={(e) => setComments(e.target.value)}></TextField>
                                </Tf>
                                <Attach>
                                    <Button
                                        variant="outlined"
                                        size="small"
                                    >
                                        <Attachicon1><img src={Attachicon} alt='icon' /></Attachicon1>
                                        <Attachtext>Attachments</Attachtext>
                                    </Button>
                                </Attach>
                                </div>
                            </AccordionDetails>
                        )}
                    </>



                </Accordion>



                {/* <Accordion sx={{ boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)", marginTop: '15px' }} >
                    <AccordionSummary
                        expandIcon={<img src={Greyplus} alt='icon' />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <H1>
                            Quality of Work
                        </H1>
                        <Rating2> 5.0</Rating2>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                            laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)", marginTop: '15px' }} >
                    <AccordionSummary
                        expandIcon={<img src={Greyplus} alt='icon' />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <H1>Time management</H1>
                        <Rating3>4.0</Rating3>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                            laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{ boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.1)", marginTop: '15px' }} >
                    <AccordionSummary
                        expandIcon={<img src={Greyplus} alt='icon' />}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header"
                    >
                        <H1>Communication Skills</H1>
                        <Rating4>5.0</Rating4>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
                            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
                            laoreet.
                        </Typography>
                    </AccordionDetails>
                </Accordion> */}

                {/* <FooterStack>
                    <Stack direction="row"
                        justifyContent="space-between"
                        alignItems="center"  >
                        <Left> <Button size="large"><img src={Left1} alt='icon' /></Button></Left>
                        <Cancel>
                            <Button
                                variant="outlined"
                                size="large"
                            >
                                Cancel
                            </Button>
                        </Cancel>
                        <Right> <Button size="large"><img src={Right1} alt='icon' /></Button></Right>
                    </Stack>
                </FooterStack> */}
            </Cont>
        </div>
    )
}

export default Accordion01;
