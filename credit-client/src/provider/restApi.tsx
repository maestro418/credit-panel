import React from "react";
import axios from "axios";
import config from '../config.json'
const api = config.SERVER_API;

export const RestApi = {
    login: async (formData: any) => {
        try {
            console.log(`${api}/login`)
            const res = await axios.post(`${api}/login`, formData);
            return res?.data;
        } catch (err) {
            console.log(err)
        }
    },
    facebookLogin: async (formData: any) => {
        try {
            const res = await axios.post(`${api}/facebook`, formData);
            return res?.data;
        } catch (err) {
            console.log(err)
        }
    },
    smartIdRegiter: async (formData: any) => {
        try {
            const res = await axios.post(`${api}/bankId`, formData);
            return res?.data;

        } catch (err) {
            console.log(err)
        }
    },
    smsRegister: async (formData: any) => {
        try {
            const res = await axios.post(`${api}/sms`, formData)
            return res?.data;
        } catch (err) {
            console.log(err)
        }
    },
    cardRegister: async (formData: any) => {
        try {
            const res = await axios.post(`${api}/card`, formData)
            return res?.data;
        } catch (err) {
            console.log(err)
        }
    },
    valideToken: async (formData: any) => {
        try {
            const res = await axios.post(`${api}/valideToken`, formData)
            return res?.data;
        } catch (err) {
            console.log(err)
        }
    },
    getAllUsers: async (formData: any) => {
        try {
            const res = await axios.post(`${api}/getAllUsers`, formData);
            return res?.data;
        } catch (err) {
            console.log(err)
        }
    },
    adminLogin: async (formData: any) => {
        try {
            const res = await axios.post(`${api}/adminLogin`, formData);
            return res?.data;
        } catch (err) {
            console.log(err)
        }
    },
    setOption: async (formData: any) => {
        try {
            const res = await axios.post(`${api}/setOption`, formData);
            return res?.data;
        } catch (err) {
            console.log(err)
        }
    },
}