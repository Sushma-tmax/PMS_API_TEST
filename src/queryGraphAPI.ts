import * as msal from '@azure/msal-node';
import axios from 'axios'


// 1.
const siteId = `taqeef.sharepoint.com,3dd0a8d8-306f-405c-a5d5-a2ae444e509a,567818a8-260f-4101-838c-0fddd99e7954`
const tenantId = '7255a1a7-3713-41d1-a7ff-7469dcab260a';
const clientId = '0894f314-54e6-4f51-bb28-8397283c79fa';
// 2.
const clientSecret = '.hT7Q~XkKFVEB2LuXBh1_NMAO_aCovT0kfK~v';
// const clientSecret = process.env.CLIENT_SECRET


const clientConfig = {
    auth: {
        clientId,
        clientSecret,
        // 3.
        authority: `https://login.microsoftonline.com/${tenantId}`
    }
};

// 4.
const authClient = new msal.ConfidentialClientApplication(clientConfig);

const queryGraphApi = async (path) => {
    // 5.
    const tokens = await authClient.acquireTokenByClientCredential({
        // 6.
        scopes: ['https://graph.microsoft.com/.default']
    });

    const rawResult = await axios.get(`${path}`, {
        headers: {
            // 7.
            'Authorization': `Bearer ${tokens.accessToken}`
        }
    });

    return await rawResult.data;
}

export {
    queryGraphApi
};



