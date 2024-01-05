import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { useReviewerContext } from "../../../../context/reviewerContextContext";
import _ from "lodash";

const Typo1 = styled("div")({
  // marginLeft: "25px",
  //position: "absolute",
  marginTop: "20px",
  color: "#717171",
  fontSize: "16px",
  fontFamily: "arial",
});
const Tablecontainer = styled("div")({
  // marginLeft: "25px",
  // marginRight: "20px",
  //position: "absolute",
  marginTop: "10px",    
});
const Pad = styled("div")({
  // paddingLeft: '25px',
  // paddingRight: '50px',
  // paddingBottom: '10px',
  // marginTop: '-10px'
  color: "#333333",
  fontFamily: "arial",
  fontSize: "14px",
  wordBreak: "break-word",
  padding:"6px 16px",
  textAlign:"left",
  lineHeight:"23px"
});
const Pad0 = styled("div")({
  paddingLeft: "25px",
  paddingRight: "50px",
  paddingBottom: "10px",
});
const Pad1 = styled("div")({
  paddingLeft: "25px",
  textAlign: "center",
});
const Pad2 = styled("div")({
  paddingLeft: "10px",
  marginTop: "-40px",
  alignItems: "center",
  textAlign: "center",
});
const Pad3 = styled("div")({
  paddingLeft: "10px",
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

const Table11 = () => {
  // @ts-ignore
  const { appraiserAreaOfImprovement, setAppraiserAreaOfImprovement } =
    useReviewerContext();
  const [filterData, setFilterData] = useState([]);
  const [showArea, setShowArea] = useState(false)

  const groupNAmeHandler = (name: any) => {
    if (name) {
      let tempArea = name.filter((area:any) => {
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
     {showArea && ( <div>
        <Typo1>
          {" "}
          <b>Areas for Improvement (Appraiser) </b>
        </Typo1>
        <Tablecontainer >
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
                      padding:"6px 16px"
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
                      padding:"6px 16px"
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
                          <td >
                            {filterData &&
                              filterData.map((i: any, ix: any) => {
                                return i[1].map((j: any, jx: any) => {
                                  return j.specific_actions.map(
                                    (k: any, ix1: any) => {
                                      if (index === ix)
                                        return (
                                          <Pad>
                                            {/* {ix1+1}. */}
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
      </div>)}
    </div>
  );
};
export default Table11;
