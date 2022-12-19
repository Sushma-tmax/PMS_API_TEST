import * as React from "react";
import { styled } from "@mui/system";
import Dropdownbutton2 from "../../appraisal_reviewer/Dropdownbutton2";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import Blueadd from "../../Reviewericons/Blueadd.svg";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

const Contain = styled("div")({
  marginRight: "20px",
  marginLeft: "25px",
  marginTop: "10px",
});
const TrainingRecommendations = styled("div")({
  marginLeft: "25px",
  marginTop: "10px",
  color: "#008E97",
  fontSize: "13px",
  opacity: 0.85,
});

const Tfbox = styled("div")({
  width: "400px",
  backgroundColor: "#FFFFFF",
  "& .MuiInputLabel-root": {
    color: "#333333",
    opacity: "0.5",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
  },
});
const Tf = styled("div")({
  fontSize: "13x",

  backgroundColor: "#FFFFFF",
  "& .MuiInputLabel-root": {
    color: "#333333",
    opacity: "0.5",
    fontSize: "13px",
    fontWeight: "400",
    textTransform: "none",
  },
});
const Containers = styled("div")({
  marginTop: 18,
  marginLeft: 12,
  marginRight: 16,
});
const Griditems1 = styled("div")({
  width: 400,
  border: "1px solid #ddd",
  height: 75,
});
const Griditems2 = styled("div")({
  width: 410,
  border: "1px solid #ddd",
  height: 75,
});
const Griditems3 = styled("div")({
  width: 430,
  border: "1px solid #ddd",
  height: 75,
});

export default function RTrecommandation() {
  return (
    <div>
      <TrainingRecommendations>
        Training Recommendation(s)
      </TrainingRecommendations>
      <Contain>
        <Grid container spacing={0}>
          <Griditems1>
            <Grid item>
              <Containers>
                <Box>
                  <Dropdownbutton2 />
                </Box>
              </Containers>
            </Grid>
          </Griditems1>
          <Griditems2>
            <Grid item>
              <Containers>
                <Box>
                  <Tf>
                    <TextField
                      fullWidth
                      label="Enter Training Name"
                      size="small"
                      inputProps={{ maxLength: 256 }}
                    ></TextField>
                  </Tf>
                </Box>
              </Containers>
            </Grid>
          </Griditems2>
          <Griditems3>
            <Grid item>
              <Containers>
                <Box>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Tfbox>
                      <TextField
                        fullWidth
                        label="Enter your Justification"
                        size="small"
                        inputProps={{ maxLength: 256 }}
                      ></TextField>
                    </Tfbox>
                    <div>
                      <img src={Blueadd} alt="icon" />
                    </div>
                  </Stack>
                </Box>
              </Containers>
            </Grid>
          </Griditems3>
        </Grid>
      </Contain>
    </div>
  );
}
