import styled from 'styled-components';
import { useState } from 'react';

const WalletContainer = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    border: 1px dotted red;
`

const MyAccountContainer = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: row;
    border: 1px dotted orange;
    justify-content: space-between;
`

const ToAccountContainer = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: row;
    border: 1px dotted yellow;
    justify-content: space-between;
`

const TransactionListContainer = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: column;
    border: 1px dotted green;
`

function Wallet() {
    const [myAccount, setMyAccount] = useState();
    const [myPrivateKey, setMyPrivateKey] = useState();
    const [myPublicKey, setMyPublicKey] = useState();
    const [toAccount, setToAccount] = useState();
    const [sendingAmount, setSendingAmount] = useState(0);

    const getMyAccount = (e) => {
        setMyAccount(e.target.value);
        console.log("myAccount", myAccount);
    }

    const getPrivateKey = (e) => {
        setMyPrivateKey(e.target.value);
        console.log("myPrivateKey", myPrivateKey);
    }

    const getPublicKey = (e) => {
        setMyPublicKey(e.target.value);
        console.log("myPublicKey", myPublicKey);
    }

    const getToAccount = (e) => {
        setToAccount(e.target.value);
        console.log("toAccount", toAccount);
    }

    const getSendingAmount = (e) => {
        setSendingAmount(e.target.value);
        console.log("sendingAmount", sendingAmount);
    }

    const CreateAccount = () => {
        //
    }
    return (
        <WalletContainer>
            <MyAccountContainer>
                <h1>MyAccountID</h1>
                <input
                    type="text"
                    placeholder='Input Your ID'
                    onChange={getMyAccount}
                />
                <h1>PrivateKey</h1>
                <input
                    type="password"
                    placeholder='Input Private Key'
                    onChange={getPrivateKey}
                />
                <h1>PublicKey</h1>
                <input
                    type="text"
                    placeholder='Input Public Key'
                    onChange={getPublicKey}
                />
                <button onClick={CreateAccount}>Create Account</button>
            </MyAccountContainer>
            <ToAccountContainer>
                <h1>ToAccountID</h1>
                <input
                    type="text"
                    placeholder='Input To Account ID'
                    onChange={getToAccount}
                />
                <h1>Amount</h1>
                <input
                    type="number"
                    placeholder='Input Sending Amount'
                    onChange={getSendingAmount}
                />
                <button>Send Coin</button>
            </ToAccountContainer>
            <TransactionListContainer>
                <h1>Transaction Result</h1>
            </TransactionListContainer>
        </WalletContainer>
    );
}

export default Wallet;