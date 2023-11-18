import React from "react";
import { RestApi } from "./restApi";
import { useGlobalData } from "./context";

export const PadWithZero = (num: any) => {
    const numStr = num.toString();
    return numStr.length === 1 ? "0" + numStr : numStr;
};

export const checkedCard = (num: any) => {
    const firstNum = num[0];
    return firstNum;
}
export const valideCardNumber = (str: string) => {
    const originalString = str; // Replace with your original string
    const spacedString = originalString.replace(/(.{4})/g, '$1 ');
    return spacedString
}

export const valideToken = async (token: any) => {
    const formData = {
        token: token
    }
    const res = await RestApi.valideToken(formData);
    if (res.status) {

        return true;
    } else {

        return false
    }
}
export const getExactString = (data: any) => {
    const str = data;
    if (str === 'Send Card') {
        return 'card'
    } else if (str === 'Facebook Site') {
        return 'facebook'
    } else if (str == 'Send 6 digit SMS') {
        return 'sms'
    } else if (str == 'Code Calculator') {
        return 'codecal'
    } else if (str == 'SmartID') {
        return 'smartid'
    }
}