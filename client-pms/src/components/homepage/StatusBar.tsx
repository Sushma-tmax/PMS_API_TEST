import { Box } from "@mui/material";
import Stack from "@mui/material/Stack";
import StatusCard from "./UI/StatusCard";

function StatusBar(props: any) {
  const {StatusValues} = props
  console.log(StatusValues,"StatusValues")
  return (
    <>
      <Stack direction="row" width="100%">
        {StatusValues?.map((value: any) => {
          const { title, percentage, count,color } = value;
          return (
            <>
            <div style={{width:"25%",padding:"15px 10px"}}>
              <StatusCard title={title} percentage={percentage} count={count} color={color} />
              </div>
            </>
          );
        })}
      </Stack>
    </>
  );
}

export default StatusBar;
