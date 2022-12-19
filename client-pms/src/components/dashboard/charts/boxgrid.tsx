import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: "center",

  color: theme.palette.text.secondary,
}));

function FormRow() {
  return (
    <React.Fragment>
      <Grid item xs={4} sx={{ width: "40px" }}>
        <Container>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            sx={{ bgcolor: "red" }}
          >
            HEADING
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ bgcolor: "#fecfd0 ", marginTop: -1, padding: 5 }}
          >
            20
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={4}>
        <Container sx={{ marginLeft: -8 }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            sx={{ bgcolor: "green" }}
          >
            HEADING
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ bgcolor: "lightgreen", marginTop: -1, padding: 5 }}
          >
            120
          </Typography>
        </Container>
      </Grid>
      <Grid item xs={4}>
        <Container sx={{ marginLeft: -16 }}>
          <Typography
            textAlign={"center"}
            gutterBottom
            component="div"
            sx={{ bgcolor: "#26a6c4 " }}
          >
            HEADING
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            textAlign={"center"}
            sx={{ bgcolor: "#c8edee", marginTop: -1, padding: 5 }}
          >
            20
          </Typography>
        </Container>
      </Grid>
    </React.Fragment>
  );
}

export default function NestedGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        <Grid container item spacing={3}>
          <FormRow />
        </Grid>
        
      </Grid>
    </Box>
  );
}
