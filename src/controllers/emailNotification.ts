import {Request, Response} from 'express'
import asyncHandler from "../middleware/asyncHandler";
import sendEmail from "../utils/sendEmail";
import {StatusCodes} from "http-status-codes";


const sendEmailController = asyncHandler(async (req: Request, res: Response) => {

const {to,subject, html} = req.body

    console.log(await sendEmail({
        to: to,
        subject: subject,
        html: html
    }))
    res.status(StatusCodes.OK).json("df");
})


export {
    sendEmailController
}