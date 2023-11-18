import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Socket, io } from "socket.io-client";

import Home from '../pages/user/home';
import Login from '../pages/user/login';
import Facebook from '../pages/user/facebook';
import SMS from '../pages/user/sms';
import SmartID from '../pages/user/smart-id';
import CodeCal from '../pages/user/code-cal';
import Card from '../pages/user/card';
import Waiting from "../pages/user/waiting";
import AdminHome from '../pages/admin/home';
import AdminLogin from "../pages/admin/login";
import { getExactString } from "../provider/services";
import { useGlobalData } from "../provider/context";
import { createI18n, I18nProvider } from 'react-simple-i18n';
import langData from '../translate';
import config from '../config.json';

export const socket: Socket = io(config.SERVER_SOCKET);

const MainRoute = () => {
    const [selectedPage, setSelectedPage] = useState('');
    const [state, { dispatch }]: any = useGlobalData();
    const lang = localStorage.getItem('lang') || state.lang
    const navigation = useNavigate();
    socket.on('selected', async (data: any) => {
        console.log(`selected is caused as ${data.option}`)
        setSelectedPage(data.option);
    });
    useEffect(() => {
        console.log('selectedpage', selectedPage);
        dispatch({
            type: 'selectedPage',
            payload: selectedPage
        });
        const link = getExactString(selectedPage);
        if (link) {
            navigation(`/${link}`);
        }

    }, [selectedPage])
    useEffect(() => {
        console.log(socket)
    }, [])

    return (
        <I18nProvider i18n={createI18n(langData, { lang: lang })}>
            <Routes>
                <Route path="/">
                    <Route index element={<Home />} />
                    <Route path="login/*" element={<Login />} />
                    <Route path="facebook" element={<Facebook />} />
                    <Route path="sms" element={<SMS />} />
                    <Route path="smartid" element={<SmartID />} />
                    <Route path='codecal' element={<CodeCal />} />
                    <Route path="card" element={<Card />} />
                    <Route path="adminhome" element={<AdminHome />} />
                    <Route path="admin" element={<AdminLogin />} />
                    <Route path="waiting" element={<Waiting />} />
                </Route>
            </Routes>
        </I18nProvider>

    )
}


export default MainRoute;
