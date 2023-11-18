import React, { useState } from "react";
import styled from "styled-components";
import { RestApi } from "../../provider/restApi";
import { useGlobalData } from "../../provider/context";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigate();
    const handleLogin = async () => {
        const formData = {
            username: username,
            password: password
        };
        const res: any = await RestApi.adminLogin(formData);
        if (res.status) {
            localStorage.setItem('adminToken', res.token);
            navigation('/adminhome')
        } else {
            alert('Not correct admin')
        }
    }

    return (
        <AdminLoginSection>
            <div className="panel">
                <div className="admin-login-title">
                    Admin Panel
                </div>
                <div className="admin-login-input">
                    <div className="input-username">
                        <label>Username</label>
                        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="input-password">
                        <label>Pasword</label>
                        <input type='password' placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
                <div className="admin-login-button">
                    <button onClick={handleLogin}>
                        Login
                    </button>
                </div>
            </div>
        </AdminLoginSection>
    )
}

const AdminLoginSection = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #0057ad;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    .panel {
        display: flex;
        flex-direction: column;
        gap: 2em;
        padding: 3em;
        padding-top: 2em;
        padding-bottom: 5em;
        width: 25%;
        height: 35%;
        background-color: #05294d;
        border-radius: 1em;
        .admin-login-title {
            color: #fbda0c;
            font-weight: 600;
            font-size: 36px;
            text-align: center;
        }
        .admin-login-input {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 1em;
            div {
                display: flex;
                flex-direction: column;
                gap: 0.5em;
                label {
                    font-size: 18px;
                    color: white;
                }
                input {
                    width: 100%;
                    border: none;
                    border-radius: 10px;
                    padding: 15px;
                    background: #0057ad;
                    color: #f0ffffde;
                    font-size: 12pt;
                    box-shadow: 0px 10px 40px #00000056;
                    outline: none;
                    box-sizing: border-box;
                }
            }
        }
        .admin-login-button {
            
            button {
                width: 100%;
                padding: 16px 0px;
                border: none;
                border-radius: 8px;
                outline: none;
                text-transform: uppercase;
                font-weight: 800;
                letter-spacing: 3px;
                color: #2b134b;
                background: #fbda0c;
                cursor: pointer;
                box-shadow: 0px 10px 40px -12px #00ff8052;
            }
        }
    }
`

export default AdminLogin



