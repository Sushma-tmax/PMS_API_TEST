import React from "react";
import Box from "@mui/material/Box";
import { Stack, styled } from "@mui/material";
import { useLoggedInUser } from "../../../hooks/useLoggedInUser";
import StatusBar from "../StatusBar";
import EmployeeRejection from "./EmployeeRejection";
import { useState, useEffect } from 'react';

const Dropdown = styled("div")({
  fontSize: "14px",
  fontColor: "#333333",
  fontFamily: "Arial",
});

function PerformanceRatingandEmpRejection(props: any) {
  const { data: user } = useLoggedInUser();
  console.log(user, "userinAppraiserDash")
  const { setstatusSort, completedCount, inprogressCount, inMediaton, range1, range2, range3, range4, StatusValues,TotalEmp,CompletedEmp,setValue,handleOnClickCard,navigationFrom,checklengthinRanges,checkAppraisalStatusC 
  ,checkAppraisalStatusIR,checkAppraisalStatusIM} = props;
  const SELECT_FOR_DASHBOARD = `employee_code,overall_rating,legal_full_name,first_name,position_long_description,grade,appraisal.appraiser_rating,reviewer.reviewer_rating,normalizer.normalizer_rating,appraisal.status,appraisal.appraiser_status,reviewer.reviewer_status,normalizer.normalizer_status,reviewer.rejection_count,appraisal.objective_description,reviewerIsDisabled`
  const [linkofAppraiser, setlinkofAppraiser] = React.useState<string>('');
  console.log(navigationFrom,"navigationFrom")
  useEffect(() => {
    if(navigationFrom === "Appraiser"){
      setlinkofAppraiser("/filteredtable")
    }else if(navigationFrom === "Reviewer"){
      setlinkofAppraiser("/filteredtableReviewer")
    }else if(navigationFrom === "Normalizer"){
      setlinkofAppraiser("/filteredtableNormalizer")
    }
  }, [navigationFrom])

  return (
    <>
      <div style={{ marginTop: "20px", position: "relative" }}>
        <Box
          sx={{
            flexGrow: 1,
            bgcolor: "#fff",
            marginLeft: "25px",
            marginRight: "25px",
          }}
        >
        <StatusBar StatusValues={StatusValues} setValue={setValue} handleOnClickCard={handleOnClickCard}/>

          <div style={{ marginTop: "30px",paddingBottom:"30px", }} >

            <EmployeeRejection
            checkAppraisalStatusCompleted={checkAppraisalStatusC("completed")}
            checkAppraisalStatusInmediation={checkAppraisalStatusIM("rejected")}
            checkAppraisalStatusRenormalization={checkAppraisalStatusIR("rejected")}
              checklengthinRangesL={checklengthinRanges(1,2.49)}
            checklengthinRangesA={checklengthinRanges(2.5,2.99)}
            checklengthinRangesG={checklengthinRanges(3,3.99)}
            checklengthinRangesH={checklengthinRanges(4,5)}
              completedCount={completedCount}
              inprogressCount={inprogressCount}
              inMediaton={inMediaton}
              range1={range1}
              range2={range2}
              range3={range3}
              range4={range4}
              TotalEmp={TotalEmp}
              CompletedEmp={CompletedEmp}
              linkofAppraiser={linkofAppraiser}
            />
          </div>
        </Box>
      </div>
    </>
  );
}

export default PerformanceRatingandEmpRejection;
