import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
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
  marginTop: "10px",
});

const Pad = styled("div")({
  color: "#333333",
  fontFamily: "arial",
  fontSize: "14px",
  wordBreak: "break-word",
  padding: "6px 16px",
  textAlign: "left",
  lineHeight: "23px"
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
    font-size: 12px;
    font-family: "Arial";
  }

  td {
    background-color: #ffffff;
    font-size: 12px;
    font-family: "Arial";
  }
`;

const Table11 = () => {
  // @ts-ignore
  const { appraiserAreaOfImprovement, setAppraiserAreaOfImprovement } =  useReviewerContext();
  const [filterData, setFilterData] = useState([]);
  const [showArea, setShowArea] = useState(false)

  const groupNameHandler = (name: any) => {
    if (name) {
      let tempArea = name.filter((area: any) => {
        console.log(area[1]?.[0], "areaa")
        if (area[1]?.[0]?.employee_comments !== "" || area[0] == "" || area[0] == undefined) {
          setShowArea(false);
        } else {
          setShowArea(true);
          setFilterData(name);
        }
        return area[0] !== "" && area[0] !== undefined
      })
    }
  };
  useEffect(() => {
    const group = _.groupBy(appraiserAreaOfImprovement, "value");
    const groupName = groupNameHandler(Object.entries(group));
  }, [appraiserAreaOfImprovement]);


  return (
    <div>
      {showArea && (<div>
        <Typo1>
          {" "}
          <b>Areas for Improvement </b>
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
