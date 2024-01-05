import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import React, {useState} from 'react'
import {useCreateAzureBlobMutation} from './service/azureblob'

const AzureBlob = () => {

    const [name, setName] = useState<string>('');
    const [fileSelected, setFileSelected] = useState<any>('');
    const [sendItem] = useCreateAzureBlobMutation();
    const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
        const fileList = e.target.files;
        // if (!fileList) return;
        //@ts-ignore
        setName(fileList[0].name)
        // setFileSelected(fileList[0]);
        let reader = new FileReader();
        //@ts-ignore
        reader.readAsDataURL(fileList[0])
        reader.onload = (e) => {
            setFileSelected(e.target?.result)

        }
    };
    const handleSubmitClick = async () => {

        const newData = {
            // token:tokens,
            // newstitle: newsTitle,
            // newsdesc: convertedContent,
            newspic: fileSelected,
            newspicname: name

        };
        sendItem(newData)
        //         onSubmit(newData)
        console.log('click')
    };

    return (
        <div>
            <Grid xs={6} item>
                <Typography component="div" sx={{pb: 2}}>
                    <label style={{fontSize: "12px"}}>Attachments</label>
                    <Card elevation={0}>
                        <input
                            id="photo"
                            name="photo"
                            type="file"
                            multiple={false}
                            onChange={handleImageChange}
                        />
                    </Card>
                </Typography>
            </Grid>

            <Grid xs={12} item>
                <Typography component="div" sx={{pb: 2}}>
                    <div
                        // className={classes.rootButton}
                    >
                        <Button
                            variant="contained"
                            // className={classes.buttonSubmit}
                            size="small"
                            onClick={handleSubmitClick}
                        >
                            Submit
                        </Button>
                        <Button
                            // className={classes.buttonClear}
                            sx={{textTransform: "capitalize"}}
                            size="small"
                        >
                            Clear
                        </Button>
                    </div>
                </Typography>
            </Grid>

        </div>
    )
}

export default AzureBlob