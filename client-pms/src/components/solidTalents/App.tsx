import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import Tabletts from './Tabletts'
import Scrollabletabs from "./Scrollabletabs";

export default function LeftPositionedTimeline() {
    const [title, setTitle] = useState('');
    const [name, setName] = useState("");
    const [textfeildError, settextfeildError] = useState(false);
    //console.log(setName);
    const handleSubmit = (e: any) => {
        // e.preventDefault()
        settextfeildError(false)

        if (title == "") {
            //  console.log(title)
            settextfeildError(true)
        }

    };

    //const [textfeildError, settextfeildError] = useState(false);
    //console.log(setName);
    const errorHandler = () => {
        if (name === "") {
            return settextfeildError(true);
        } else {
            return settextfeildError(false);
    }
    };

    return (
        <div>

            {/* <TextField
                sx={{ position: 'absolute', marginTop: '5%', marginLeft: '40%' }}
                error={textfeildError}
                //helperText="Incorrect entry."
                helperText={textfeildError ? 'required' : " "}
                onChange={(e) => setTitle(e.target.value)}  >
            </TextField>

            <Button
                sx={{ position: 'absolute', marginTop: '10%', marginLeft: '40%' }}
                onClick={handleSubmit}
            >
                save
            </Button> */}


            {/* <TextField
                sx={{ position: 'absolute', marginTop: '15%', marginLeft: '40%' }}
                placeholder="Enter text"
                size="small"
                type="text"
                variant="outlined"
                value={name}
              
                error={!name && textfeildError}
                helperText={
                    !name && textfeildError ? "*Name required." : " "
                }
                onChange={(e) => setName(e.target.value)}
            />

            <Button
                style={{
                    position: 'absolute',
                    marginTop: '20%', marginLeft: '40%'
                }}
                variant="contained"
                onClick={() => {
                    errorHandler();
                }}
            >
                Save
            </Button> */}

             <Tabletts/>
             <Scrollabletabs/>
             
            {/* <TextField
        error={!title}
       value={title}
        helperText={!title ? 'required':" "}
        onChange={(e) => setTitle(e.target.value)}  >
      </TextField> */}

        </div>
    );
}
