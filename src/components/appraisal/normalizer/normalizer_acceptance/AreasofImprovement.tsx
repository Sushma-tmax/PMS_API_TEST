import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/system';
import { TextField } from "@mui/material";
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
import { useNormalizerContext } from '../../../../context/normalizerContext';
import _ from 'lodash';


const TrainingRecommendations = styled("div")({
    // marginLeft: "25px",
    marginTop: '10px',
    color: "#717171",
    fontSize: '16px',
    fontFamily: "arial"
});

const Tf = styled('div')({
    // marginLeft: "25px",
    backgroundColor: "#f8f8f8",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
        color: "#333333",
        fontSize: "13px",
        fontWeight: "400",
        textTransform: "none",
        padding: "8px",
    },
});
const Contain = styled("div")({
    marginRight: "20px",
    marginTop: "10px",

});
const Typo3 = styled("div")({
    // marginLeft: "25px",
    // marginTop: '20px',
    color: "#717171",
    fontSize: "16px",
    fontFamily: "arial",
    paddingTop: "20px",
});
const Tf6 = styled("div")({
    // marginLeft: "58px",
    //  position: "absolute",
    //  marginTop: '305px',
    color: "#333333",
    fontSize: "13px",
    // opacity: 0.85,
    // padding: "8px",
});
const Tablecontainer = styled("div")({
    // marginLeft: "25px",
    marginRight: "32px",
    //position: "absolute",
    marginTop: "12px",
});

const Root = styled("div")`
  table {
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    // padding: 5px;
    background-color: #eaeced;
    fontsize: 12px;
    fontfamily: "Arial";
  }

  td {
    background-color: #ffffff;
    fontsize: 12px;
    fontfamily: "Arial";
  }
`;
const Pad = styled("div")({
    color: "#333333",
    fontFamily: "arial",
    fontSize: "14px",
    textAlign: "left",
    wordBreak: "break-word",
    padding: "6px 16px",
    lineHeight: "23px"
});

const NAreaofImprovementN = (props: any) => {

    const [comments, setComments] = useState('');
    const handleCommentsChange = (e: any) => {
        console.log(e);
        setComments(e.target.value)
    }
    // @ts-ignore
    const { appraiserAreaOfImprovement } = useNormalizerContext()
    const [filterData, setFilterData] = useState([]);
    const [showArea, setShowArea] = useState(false)

    const groupNAmeHandler = (name: any) => {
        if (name) {            
            let tempArea = name.filter((area: any) => {
                return area[0] !== "" && area[0] !== undefined
            })
            if (tempArea && tempArea?.length > 0) {
                setShowArea(true);
                setFilterData(name);
            } else {
                setShowArea(false);
            }
        }
    };
    useEffect(() => {
        const group = _.groupBy(appraiserAreaOfImprovement, "value");
        console.log(Object.entries(group), "ggggggg");

        const groupName = groupNAmeHandler(Object.entries(group));

        console.log(
            Object.entries(group).map((i: any) => {
                console.log(i);
                console.log(i, "000000000");
                console.log(
                    i[1].map((j: any) => {
                        console.log(j, "jjjjjjjjjj");

                        // console.log(j.description, j.comments,j.rating, 'group')
                    }),
                    "group"
                );
            }),
            "appraiserAreaOfImprovement"
        );
    }, [appraiserAreaOfImprovement]);
    return (
        <div>
          {showArea && (
            <>
              <Typo3>
                {" "}
                <b>Areas for Improvement</b>{" "}
            </Typo3>
            <Tf6>
                <Tablecontainer sx={{ width: "100%" }}>
                    <Root sx={{ width: "100%" }}>
                        <table>
                            <thead>
                                <tr>
                                    <th
                                        style={{
                                            textAlign: "center",

                                            fontWeight: "600",
                                            fontSize: "14px",
                                            color: "#3E8CB5",
                                            fontFamily: "arial",
                                            padding: "6px 16px"
                                        }}
                                    >
                                        Specific Areas
                                    </th>
                                    <th
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "600",
                                            fontSize: "14px",
                                            color: "#3E8CB5",
                                            fontFamily: "arial",
                                            padding: "6px 16px"
                                        }}
                                    >
                                        Specific Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterData &&
                                    filterData.map((i: any, index: any) => {
                                        return (
                                            <>
                                                <tr>
                                                    {/* <td width="5%" ><Pad2>{index + 1}</Pad2></td> */}
                                                    <td width="25%">
                                                        <Pad>{i[0]}</Pad>
                                                    </td>
                                                    <td>
                                                        {filterData &&
                                                            filterData.map((i: any, ix: any) => {
                                                                return i[1].map((j: any, jx: any) => {
                                                                    return j.specific_actions.map(
                                                                        (k: any, ix1: any) => {
                                                                            if (index === ix)
                                                                                return (
                                                                                    <Pad>
                                                                                        {/* {ix1 + 1}. */}
                                                                                        {k.value}
                                                                                        <br />
                                                                                    </Pad>
                                                                                );
                                                                        }
                                                                    );
                                                                });
                                                            })}
                                                    </td>
                                                </tr>
                                            </>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </Root>
                </Tablecontainer>
            </Tf6>
            </>
          )}
            {/* <TrainingRecommendations>
                <b>Normalizer Area of Improvement Justification</b>
            </TrainingRecommendations>
            <Contain>
                <Box>
                    <Tf>
                        <TextField fullWidth
                        placeholder='Add'
                            multiline
                            inputProps={{ maxLength: 256 }}
                            variant="standard"
                            InputProps={{
                                disableUnderline: true,
                            }}
                            size='small'
                            name="comments"
                            // value={normalizerAreaImprovementComments || ""}
                            onChange={e => handleCommentsChange(e)} />
                    </Tf>
                </Box>
            </Contain> */}

        </div>
    )
}
export default NAreaofImprovementN