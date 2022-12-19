import {Popover} from '@mui/material'
import React from 'react'
import Typography from "@mui/material/Typography";


const AttachmentPopup = (props: any) => {
    const {open, anchorEl, onClose, children, name, url, id} = props
    console.log(name?.filter((l:any) => l.objective_description === id), 'duck22')
    // console.log(name, 'duck22')
    return (
        <>
            <Popover
                id={"id"}
                open={open}
                anchorEl={anchorEl}
                onClose={onClose}
                // anchorOrigin={{
                //     vertical: "bottom",
                //     horizontal: "center",
                // }}
                // transformOrigin={{
                //     vertical: "top",
                //     horizontal: "center",
                // }}
                // PaperProps={{
                //     style: {
                //         backgroundColor: "transparent",
                //         boxShadow: "none",
                //         borderRadius: 0,
                //     },
                // }}
                // sx={{
                //     "& .MuiPopover-paper": {
                //         border: "1px solid #FFCF7A",
                //         backgroundColor: "#f8f8ff",
                //
                //     },
                // }}
            >
                {name?.filter((l:any) => l.objective_description === id).map((k:any) => <Typography > {k.name} </Typography> )}
            </Popover>
        </>


    )

}


export default AttachmentPopup