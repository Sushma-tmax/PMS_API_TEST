import Grid from "@mui/material/Grid";
import {ObjectiveDescription, ObjectiveGroup, ObjectiveType} from "../components";

const ObjectiveContainer = () => {
    return (
        <Grid container spacing={1}>
            <Grid container item spacing={3}>
                <Grid item xs={4}>
                    <ObjectiveGroup/>
                </Grid>
                <Grid item xs={4}>
                    <ObjectiveType/>
                </Grid>
                <Grid item xs={4}>
                    <ObjectiveDescription/>
                </Grid>
            </Grid>
        </Grid>
    );
};


export default ObjectiveContainer;