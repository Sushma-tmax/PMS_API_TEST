import {connect} from "mongoose";

async function connectDB(monog_uri): Promise<void> {

    try {
        // 4. Connect to MongoDB
        const con = await connect(monog_uri);
        console.log("MongoDB Connected...,");

    } catch (err) {
        // console.log(err);
        process.exit(1);
    }

}


export default connectDB