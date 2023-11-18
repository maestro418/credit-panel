import React from "react";
import styled from "styled-components";

import BankItem from "../../components/bank-item";

import LhvLogo from '../../assets/images/lhv-logo.svg';
import FibankLogo from '../../assets/images/FI bank.jpg'
import InbankLogo from '../../assets/images/inbank.png'
import CoopLogo from '../../assets/images/coop.png'
import HolmbankLogo from '../../assets/images/holm.png'
import SwedbankLogo from '../../assets/images/Swed.jpg'
import SebbankLogo from '../../assets/images/sev.png';
import LuminorLogo from '../../assets/images/luminor.png';
import BigbankLogo from '../../assets/images/bigbank.jpg';
import InternetbankLogo from '../../assets/images/inernetbank.png';
import MainLogo from '../../assets/images/ikea.png'

const Home = () => {

    const banks = [
        {
            title: 'Swedbank',
            logo: SwedbankLogo
        },
        {
            title: 'SEB',
            logo: SebbankLogo
        },
        {
            title: 'Holm',
            logo: HolmbankLogo
        },
        {
            title: 'Luminor',
            logo: LuminorLogo
        },
        {
            title: 'Bigbank',
            logo: BigbankLogo
        },
        {
            title: 'Internet bank',
            logo: InternetbankLogo
        },
        {
            title: 'LHV',
            logo: LhvLogo
        },
        {
            title: 'FI bank',
            logo: FibankLogo
        },
        {
            title: 'Inbank',
            logo: InbankLogo
        },
        {
            title: 'Coop',
            logo: CoopLogo
        }
    ]
    return (
        <Section>
            <div className="panel">
                <div className="panel-main">
                    <div className="title">
                        <img src={MainLogo} alt="No image" width={200} />
                        <h1>1250+570 eurot Vali ülekande tegemiseks pank</h1>
                    </div>
                    <div className="main">
                        <div>
                            <span>Bankai</span>
                        </div>
                        {banks.map((item, index) => (
                            <BankItem title={item.title} logo={item.logo} key={index} />
                        ))}
                    </div>
                    <div className="end">
                        <span>Õnnitlused Rimi perele. Teie panga hallatavad ülekandetehingud on täiesti turvalised.</span>
                    </div>
                </div>
            </div>
        </Section>

    )
}

const Section = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    .panel {
        max-width: 400px;
        border: 1px solid rgb(216, 223, 228);
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        padding: 2em 5em;
        .panel-main {
            display: flex;
            flex-direction: column;
            gap: 1em;
            .title {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 100%;
                h1 {
                    font-family: "Trustly Sans Medium", "Helvetica Neue", Arial, sans-serif;
                    font-size: 1.75rem;
                    font-weight: 500;
                    line-height: 2rem;
                    color: rgb(0, 0, 0);
                    overflow-wrap: break-word;
                    text-align: center;
                }
            }
            .main{
                display:flex;
                flex-direction: column;
                gap: 1em;
                div:first-child {
                    span {
                        font-family: "Trustly Sans Regular", "Helvetica Neue", Arial, sans-serif;
                        font-size: 0.875rem;
                        font-weight: 400;
                        line-height: 1.125rem;
                        color: rgb(0, 0, 0);
                    }
                }
                
            }
            .end {
                text-align: center;
                span {
                    font-size: 10px;
                    font-weight: 800;
                }
            }
        }
        
    }
`
export const StyledSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    .panel {
        width: 400px;
        border: 1px solid rgb(216, 223, 228);
        display: flex;
        flex-direction:column;
        justify-content: center;
        align-items: center;
        padding: 3em 5em;
    }
   
`


export default Home;