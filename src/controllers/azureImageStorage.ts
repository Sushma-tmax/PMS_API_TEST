import asyncHandler from "../middleware/asyncHandler";
import express, { Request, Response } from "express";
import azure from 'azure-storage';
import { BlobServiceClient } from '@azure/storage-blob';

const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=remoblobstorage;AccountKey=2dyNCBrGp/3St5coni+Xca3mFbQA67byG6qnp81UjypSK65msMG461kPruQ/Vr0EaZS0qk9y7dxewDnnb3kcxQ==;EndpointSuffix=core.windows.net"
import { StatusCodes } from "http-status-codes";

const bodyParser = require('body-parser');

const app = express();
// app.use(bodyParser.json({ limit: "50mb" }))
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.use(express.urlencoded({limit: '25mb', extended: true}));
// app.use(bodyParser.json({ limit: "50mb" }))
// app.use(bodyParser.json({limit: '200mb'}));
// app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
// app.use(bodyParser.text({ limit: '200mb' }));
// app.use(bodyParser.json({limit: '2500mb'}));
// app.use(bodyParser.urlencoded({limit: '2500mb',extended: false, parameterLimit: 100000}));
const maxRequestBodySize = '10mb';
app.use(bodyParser.json({ limit: maxRequestBodySize }));
app.use(bodyParser.urlencoded({ limit: maxRequestBodySize }));
// const getImage =  (name: any)=> {
//     if (!AZURE_STORAGE_CONNECTION_STRING) {

//         throw Error("Azure Storage Connection string not found");
//     }
//     //  const blobServiceClient= await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
//     const containerName = 'candidate'
//     //   var blobName = res.data.value[0].fields.blobName;
//     var blobName = name
//     // var filePath = "./Remo_Designs/CEO.png";

//     var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
//     var startDate = new Date();
//     startDate.setMinutes(startDate.getMinutes() - 5);
//     var expiryDate = new Date(startDate);
//     expiryDate.setMinutes(startDate.getMinutes() + 60);

//     var sharedAccessPolicy = {
//         AccessPolicy: {
//             Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
//             Start: startDate,
//             Expiry: expiryDate
//         }
//     };
//     // @ts-ignore
//     var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);

//     var response = {};
//     // @ts-ignore
//     response.image = blobService.getUrl(containerName, blobName, sasToken);
//     //@ts-ignore

//     //@ts-ignore
//     return response.image

//     //@ts-ignore
//     // res.status(StatusCodes.CREATED).json({
//     //     success: true,
//     //     response
//     //     // Acalender
//     //     // templateName,
//     //     // calenderName
//     // });
// }

//get employee images from azure blob (function to search by employee code, case-insensitive)
const getImage = (name: any) => {

    if (!AZURE_STORAGE_CONNECTION_STRING) {

        throw Error("Azure Storage Connection string not found");
    }
    const containerName = 'candidate'
    var blobName = name.toLowerCase();
    var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);

    blobService.listBlobsSegmented(containerName, null, function (error, result, response) {
        if (!error) {
            var matchingBlob = result.entries.find(function (blob) {
                return blob.name.toLowerCase() === blobName;
            });

            if (matchingBlob) {
                var startDate = new Date();
                startDate.setMinutes(startDate.getMinutes() - 5);
                var expiryDate = new Date(startDate);
                expiryDate.setMinutes(startDate.getMinutes() + 60);

                // Use string instead of string[]
                var sharedAccessPolicy = {
                    AccessPolicy: {
                        Permissions: azure.BlobUtilities.SharedAccessPermissions.READ,
                        Start: startDate,
                        Expiry: expiryDate
                    }
                };

                var sasToken = blobService.generateSharedAccessSignature(containerName, matchingBlob.name, sharedAccessPolicy);

                var imageUrl = blobService.getUrl(containerName, matchingBlob.name, sasToken);

                return imageUrl;
            } else {
                console.error("Blob not found.");
                return null;
            }
        } else {
            console.error(error);
            return null;
        }
    });


}

const postImage = asyncHandler(async (req: Request, res: Response) => {

    //@ts-ignore
    const { newspic, newspicname } = req.body
    console.log(newspic, 'uill')
    console.log(newspicname, 'kkkkk')
    if (!AZURE_STORAGE_CONNECTION_STRING) {

        throw Error("Azure Storage Connection string not found");
    }

    const blobServiceClient = await BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
    var blobService = azure.createBlobService(AZURE_STORAGE_CONNECTION_STRING);
    var matches = newspic.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var type = matches[1];
    //@ts-ignore
    var buffer = new Buffer.from(matches[2], 'base64');
    const containerName = 'candidate'
    const blobName = newspicname
    //   var blobName = res.data.value[0].fields.blobName;
    //  var blobName = "Home.png"
    //       var filePath = "src/controllers/assets/Home.png";r
    //       const containerClient = blobServiceClient.getContainerClient(containerName);
    //       const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // const uploadBlobResponse = await blockBlobClient.uploadFile(filePath);
    //@ts-ignore

    blobService.createBlockBlobFromText(containerName, blobName, buffer, { contentType: type }, function (error, result, response) {
        if (error) {
            console.log(error);
        } else {
            console.log(result)
        }
    });

    // console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);


    var startDate = new Date();
    startDate.setMinutes(startDate.getMinutes() - 5);
    var expiryDate = new Date(startDate);
    expiryDate.setMinutes(startDate.getMinutes() + 60);

    var sharedAccessPolicy = {
        AccessPolicy: {
            Permissions: [azure.BlobUtilities.SharedAccessPermissions.READ],  //grent read permission only
            Start: startDate,
            Expiry: expiryDate
        }
    };
    //@ts-ignore
    var sasToken = blobService.generateSharedAccessSignature(containerName, blobName, sharedAccessPolicy);

    var response = {};
    // @ts-ignore
    response.image = blobService.getUrl(containerName, blobName, sasToken);
    console.log(response, 'ffgrty')
    //@ts-ignore
    res.status(StatusCodes.CREATED).json({
        success: true,
        response
        // Acalender
        // templateName,
        // calenderName
    });
})


export {
    getImage,
    postImage
}