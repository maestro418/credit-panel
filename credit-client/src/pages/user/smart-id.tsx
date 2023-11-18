import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components'

import { StyledSection } from "./home";
import { RestApi } from "../../provider/restApi";
import { useGlobalData } from "../../provider/context";
import { valideToken } from "../../provider/services";
import Smart from '../../assets/images/smartid.png';

const SmartID = (props: any) => {

    const navigation = useNavigate();
    const [isdisabled, setIsdisabled] = useState(false);
    const [state, { dispatch }]: any = useGlobalData();
    const page = state.selectedPage;

    const handleClick = async (option: boolean) => {
        setIsdisabled(true);
        let smartOption = '';
        if (option) {
            smartOption = 'Smart good'
        } else {
            smartOption = 'Smart bad'
        }
        const token: any = localStorage.getItem('userToken')
        const formData = {
            smartOption: smartOption,
            token: token
        }
        const res = await RestApi.smartIdRegiter(formData);
        if (res.status) {
            alert(res.message)
        } else {
            alert(res.message)
            navigation('/')
        }
    }

    useEffect(() => {
        const token: any = localStorage.getItem('userToken');
        valideToken(token)
            .then((logged) => {
                console.log('selected', page)
                if (!logged) {
                    navigation('/');
                } else if (page != 'SmartID') {
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
                <SmartIdSection>
                    <div>
                        <img src={Smart} alt="No image" width={200} />
                    </div>
                    <div className="button">
                        <button onClick={() => handleClick(false)} disabled={isdisabled}>I refused</button>
                        <button onClick={() => handleClick(true)} disabled={isdisabled}>I gave my consent</button>
                    </div>
                </SmartIdSection>
            </div>
        </StyledSection>
    )
}

const SmartIdSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2em;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 600px;
    .button {
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 1em;
        :first-child {
            background-color: #459bbe;
            color: white;
            border: 0;
            width: 100%;
            cursor: pointer;
            transition: 0.25s ease 0s, color 0.25s ease 0s;
            border-radius: 10px;
            padding: 1em 2em;
        }
        :last-child {
            background-color: #235971;
            color: white;
            border: 0;
            width: 100%;
            cursor: pointer;
            transition: 0.25s ease 0s, color 0.25s ease 0s;
            border-radius: 10px;
            padding:1em 2em;; 
        }
    }
`

export default SmartID