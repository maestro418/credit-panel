import React, { useEffect } from "react";
import styled from 'styled-components'

import { StyledSection } from "./home";
import { useNavigate, } from "react-router-dom";
import { useGlobalData } from "../../provider/context";
import { valideToken } from "../../provider/services";

const CodeCal = (props: any) => {
    const navigation = useNavigate();
    const [state, { dispatch }]: any = useGlobalData();
    const page = state.selectedPage;
    useEffect(() => {
        const token: any = localStorage.getItem('userToken');
        valideToken(token)
            .then((logged) => {
                if (!logged) {
                    navigation('/');
                } else if (page != 'Code Calculator') {
                    navigation('/waiting')
                }
            }).catch((err: any) => {
                console.log("valideToken error", err.message)
                navigation('/')
            })
    }, [])
    return (
        <StyledSection>
            <div className="panel">
                <CodeCalSection>
                    <img src="https://rimiikampanija.xyz/assets/images/code_calc_old.png" alt="No image" width={350} />
                </CodeCalSection>
            </div>
        </StyledSection>

    )
}

const CodeCalSection = styled.div`
    display: flex;
    flex-direction:column;
    height: 600px;
    align-items: center;
    
`

export default CodeCal