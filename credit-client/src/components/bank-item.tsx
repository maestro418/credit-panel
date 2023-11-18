import React from "react";
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Icon from "./icons";

interface BankItemProps {
    title: string,
    logo: string,
}

const BankItem = (props: BankItemProps) => {
    return (
        <Link to={`/login/${props.title}`}>
            <ItemSection >
                <div className="item-main">
                    <img src={props.logo} alt="No image" width={40} />
                </div>
                <div className="item-icon">
                    <span>{props.title}</span>
                    <Icon icon="ChevronRight" />
                </div>
            </ItemSection>
        </Link>
    )
}

const ItemSection = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    
    .item-main {
        width: 15%;
    }
    .item-icon {
        display: flex;
        width: 85%;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgb(216, 223, 228);
        padding-bottom: 0.5em;
        span {
            font-family: "Trustly Sans Regular", "Helvetica Neue", Arial, sans-serif;
            font-size: 1rem;
            font-weight: 400;
            line-height: 1.25rem;
            color: rgb(0, 0, 0);
            
        }
    }
`

export default BankItem