import React from 'react';
import { styled } from "@mui/material/styles";
import Tabcontents from './Tabcontents';
import Performancefeedbacksummary from './Performancefeedbacksummary';
import RTrecommandation from './RTrecommandation';
import Checkboxs from './Checkboxs';
import Footerbuttons from './Footerbuttons';
import Timeline from './Timeline';
import Timeline1 from './Timeline1';
import Timeline2 from './Timeline2';
const Container1 = styled("div")({
    background: "#fff",
    width: "1300px",
    marginLeft: "25px",
    marginTop: "10px",
    textTransform: 'none'
});
const Container2 = styled("div")({
    background: "#F2F9FA",
    width: "1300px",
    marginTop: "34px",
});
const Footer = styled("div")({
    marginLeft: "450px",
    marginTop: '60px',
    paddingBottom: '45px'
});

function Appraiser() {
    return (
        <div>
            <Container1>
                <Timeline2 />
            </Container1>


            <Container1>
                <Timeline1 />
            </Container1>

            

            <Container1>

                <Tabcontents />
                <Container2>
                    <Performancefeedbacksummary />
                    <RTrecommandation />
                    <Checkboxs />
                    <Footer>
                        <Footerbuttons />
                    </Footer>
                </Container2>

            </Container1>


        </div>
    )
}

export default Appraiser;