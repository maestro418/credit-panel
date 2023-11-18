import React, { useContext, useState } from "react";
import styled from "styled-components";


import { Modal } from "./modal";
import { useGlobalData } from "../provider/context";
import { useI18n } from "react-simple-i18n";


const CustomModal = ({ onClose }: { onClose: () => void }) => {

    const [state, { dispatch }]: any = useGlobalData();
    const [selectedLanguage, setSeclectedLanguage] = useState(`${state.lang}`);
    const { t } = useI18n();
    const languages = [
        { value: "", text: "Options" },
        { value: "en", text: "English" },
        { value: "tr", text: "Turkish" },
        { value: "es", text: "Spanish" }
    ];
    const handleLogin = () => {
        dispatch({
            type: 'lang',
            payload: selectedLanguage
        })
        localStorage.setItem('lang', selectedLanguage);
        onClose()
    }
    return (
        <Modal show={true} onClose={onClose} closeOverlay={true} isDefault>

            <h1>{t('admin.modalTitle')}</h1>
            <select value={selectedLanguage} onChange={(e) => setSeclectedLanguage(e.target.value)}>
                {languages.map((item: any, index: any) => (
                    <option value={item.value} key={index}>{item.text}</option>
                ))}
            </select>
            <button onClick={handleLogin}>
                {t('admin.modalBtn')}
            </button>

        </Modal>
    )
}


export default CustomModal;