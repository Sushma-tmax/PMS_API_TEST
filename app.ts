import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './src/db/db';
import path from 'path'

import userRouter from './src/routes/userRoutes';
import objectiveRoute from "./src/routes/objectiveRoute";
import employeeRoute from "./src/routes/empoloyeeRoute";
import templateRoute from "./src/routes/templateRoute";
import trainingRoute from './src/routes/trainingRoute'
import ratingRoute from './src/routes/ratingRoute'
import ratingScaleRoute from './src/routes/ratingScaleRoutes'
import feedBackQuestionarieRoutes from './src/routes/feedBackQuestionarieRoutes'
import calenderRoutes  from './src/routes/calenderRoutes'
import appraisalCalenderRoutes  from './src/routes/appraisalCalenderRoutes'
import ratingValidation from './src/routes/ratingValidationRoutes'
import nineBoxRoute from "./src/routes/nineBoxRoute";
import azureImagesRoutes from './src/routes/azureImagesRoutes'
import dashboardColorRoutes from "./src/routes/dashboardColorRoutes";
import launchcalendarvalidationsRoutes from "./src/routes/launchcalendarvalidationsRoutes";

import { queryGraphApi } from './src/queryGraphAPI'
import asyncHandler from "./src/middleware/asyncHandler";
import {Request, Response} from "express";
import emailRoutes from "./src/routes/emailRoutes";
import bulkApiRoutes from "./src/routes/bulkApiRoutes";
import previousAppraisalRoutes from "./src/routes/previousAppraisalRoutes";
import reminderNotificationRoutes from "./src/routes/reminderNotificationRoutes";



const app = express();
// const port = 5000;

//serve client-pms/build from express
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, "../", 'build', 'index.html'));
// });


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}))
app.use(cookieParser('secret'));


app.use(cors({
    origin: '*'
}));

dotenv.config({path: __dirname + '/.env'});



 //connectDB('mongodb+srv://austy:oezUKzp7vEDAnDLM@cluster0.mzmcv.mongodb.net/PMS?retryWrites=true&w=majority');

// connectDB('mongodb://127.0.0.1:27017/pms');

 connectDB('mongodb+srv://augustya:brOlGGq5fjj5EL5z@cluster0.22mx4.mongodb.net/PMS?retryWrites=true&w=majority');
//connectDB('mongodb+srv://mongodb04:7CAV3kA65Td9xn9m@pmstest2cluster.cfpmcjd.mongodb.net/PMS?retryWrites=true&w=majority');

// connectDB('mongodb+srv://pms:yGMXa8yrjjnjydFc@cluster0.axzjq.mongodb.net/PMS?retryWrites=true&w=majority');
console.log(process.env.MONGO_URI);




const PORT = process.env.PORT || 5001;
console.log(PORT);


if (process.env.NODE_ENV === 'development') {
    app.use(morgan())

}
app.use('/api/v1/email', emailRoutes)
app.use('/api/v1/previous-appraisal', previousAppraisalRoutes)
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/objective', objectiveRoute)
app.use('/api/v1/employee', employeeRoute)
app.use('/api/v1/template', templateRoute)
app.use('/api/v1/training', trainingRoute)
app.use('/api/v1/ratings', ratingRoute)
app.use('/api/v1/ratingscale', ratingScaleRoute)
app.use('/api/v1/feedback-questionarie', feedBackQuestionarieRoutes)
app.use('/api/v1/calender', calenderRoutes)
app.use('/api/v1/appraisal-calender', appraisalCalenderRoutes)
app.use('/api/v1/rating-validation', ratingValidation)
app.use('/api/v1/ninebox', nineBoxRoute)
app.use('/api/v1/azure-images',azureImagesRoutes)
app.use('/api/v1/color', dashboardColorRoutes)
app.use('/api/v1/validations',launchcalendarvalidationsRoutes)
app.use('/api/v1/bulk', bulkApiRoutes)
app.use('/api/v1/reminderNotification',reminderNotificationRoutes)
const graphAPIQuery = asyncHandler(async (req: Request, res: Response) => {

    const {site, list,email} = req.body

    // const sharePointSite = await queryGraphApi(`/sites/${site}/lists/${list}/items?$expand=fields&$filter=fields/UserEmailID eq 'technomax@taqeef.com'`);
    // const sharePointSite = await queryGraphApi(`/sites/taqeef.sharepoint.com,3dd0a8d8-306f-405c-a5d5-a2ae444e509a,567818a8-260f-4101-838c-0fddd99e7954/lists/8fa1c37c-6d47-4413-96f4-dee36c3382a3/items?$expand=fields&$filter=fields/UserEmailID eq 'technomax@taqeef.com`);
    // const sharePointSite = await queryGraphApi(`/sites/taqeef.sharepoint.com,3dd0a8d8-306f-405c-a5d5-a2ae444e509a,567818a8-260f-4101-838c-0fddd99e7954/lists/8fa1c37c-6d47-4413-96f4-dee36c3382a3/items?$expand=fields&$filter=fields/UserEmailID eq 'technomax@taqeef.com'`);
    const sharePointSite = await queryGraphApi(site);
    // const sharePointSite = await queryGraphAxpi(`/sites/${site}/lists/${list}/items?$expand=fields`);
    res.json(sharePointSite)
})




app.get('/test', (req, res) => {
    res.json({
        msg: 'Working'
    })
});

app.post('/graph-api', graphAPIQuery);

app.use(express.static(path.join(__dirname, '../build')));




app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'))
    // res.sendFile(path.resolve(__dirname, '../../client-pms', 'index.html'))
})



app.listen(80, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});
