import React, {useState} from "react";
import { AuthenticatedTemplate, MsalAuthenticationTemplate,useIsAuthenticated } from '@azure/msal-react';
import { InteractionType } from "@azure/msal-browser";


type Props = {
    children: JSX.Element,
};


const ProtectedRoute = ({children }: Props) => {

    return (
        <>
            <AuthenticatedTemplate

            >
                {/*    // interactionType={InteractionType.Popup}*/}

                {children}

            </AuthenticatedTemplate>

        </>
    )

}


export default ProtectedRoute