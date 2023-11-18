import React, { useContext, createContext, Dispatch, useReducer, useMemo, useState } from "react";

interface State {
    userLogged: boolean,
    adminLogged: boolean,
    allUsers: Object,
    selectedPage: String,
    lang: String,
}

type dispathAction = { type: string; payload: any };
type globalDataType = [State, Dispatch<dispathAction>];
const GloalData = createContext<globalDataType | undefined>(undefined);

export const useGlobalData = () => {
    const context = useContext(GloalData);
    if (!context) {
        throw new Error("Must match with GlobalData");
    }
    return context;
};
const Init_state: State = {
    userLogged: false,
    adminLogged: false,
    allUsers: [],
    selectedPage: '',
    lang: 'en'
};

const reducer: (state: State, { type, payload }: dispathAction) => State = (
    state,
    { type, payload }
) => {
    return {
        ...state,
        [type]: payload,
    };
};

interface Providerprops {
    children: React.ReactNode;
}
const ProviderData: React.FC<Providerprops> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, Init_state);
    const [seletedPage, setSelectedPage] = useState('');

    return (
        <GloalData.Provider
            // @ts-ignore
            value={useMemo(() => [state, { dispatch }], [state])}
        >
            {children}
        </GloalData.Provider>
    );
};
export default ProviderData;
