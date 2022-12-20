import { Grid } from '@mui/material';
import { Stack, Tab,Tabs , Box , Typography} from '@mui/material';
import { Divider } from '@mui/material';


const OverallStatus = () => {

  return (
    <>
    <Grid container spacing={2}>
                <Grid item xs={3}>
                    <p> Status</p>
                    <p>5 Employees</p>
                </Grid>
                <Grid item xs={9}>
                    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>

                        <p>
                            <Stack direction="row" spacing={2}>
                                <p>COMPLETED</p>
                                <p>3</p>
                                <p>50 %</p>

                            </Stack>
                        </p>
                        <p>
                            <Stack direction="row" spacing={2}>
                                <p>In Progress</p>
                                <p>1</p>
                                <p>20 %</p>

                            </Stack>
                        </p>

                        <p>
                            <Stack direction="row" spacing={2}>
                                <p>Not Started</p>
                                <p>2</p>
                                <p>30 %</p>

                            </Stack>
                        </p>


                    </Stack>
                </Grid>
            </Grid>
    </>

  )
}

export default OverallStatus
