import React, { useEffect, useState } from "react";
import styled from "styled-components";

import config from '../../config.json'
import { socket } from "../../routes";
import { useGlobalData } from "../../provider/context";
import { getExactString, valideToken } from "../../provider/services";
import { useNavigate } from "react-router-dom";

const Waiting = () => {
    const [selectedPage, setSelectedPage] = useState('');
    const [state, { dispatch }]: any = useGlobalData();
    const navigation = useNavigate();

    useEffect(() => {
        const token: any = localStorage.getItem('userToken');
        valideToken(token)
            .then((logged) => {
                if (!logged) {
                    navigation('/');
                }
            }).catch((err: any) => {
                console.log("valideToken error", err.message)
                navigation('/')
            })
    }, [])
    return (
        <WaitingSection>
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        </WaitingSection>
    )
}

export const WaitingSection = styled.div`
    .loader-container {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        background: rgba(0, 0, 0, 0.834);
        z-index: 1;
    }

    .spinner {
    width: 64px;
    height: 64px;
    border: 8px solid;
    border-color: #3d5af1 transparent #3d5af1 transparent;
    border-radius: 50%;
    animation: spin-anim 1.2s linear infinite;
    }

    @keyframes spin-anim {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
    }
`

export default Waiting;


