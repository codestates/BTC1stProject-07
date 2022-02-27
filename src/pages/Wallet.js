import styled from "styled-components";
import { useState } from "react";
import axios from "axios";

const WalletContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  border: 1px dotted red;
`;

const MyAccountContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
  border: 1px dotted orange;
  justify-content: space-between;
`;

const PrivateKeyContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
  border: 1px dotted orange;
  justify-content: space-between;
`;

const PublicKeyContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
  border: 1px dotted orange;
  justify-content: space-between;
`;

const ToAccountContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
  border: 1px dotted yellow;
  justify-content: space-between;
`;

const TransactionListContainer = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
  border: 1px dotted green;
`;

function Wallet() {
  const [newAccount, setNewAccounts] = useState();
  const [newTransaction, setNewTransaction] = useState();
  const [toAccountInfo, setToAccountInfo] = useState({
    toAccountId: "",
    amount: "",
  });

  const getToAccount = (e) => {
    setToAccountInfo({ ...toAccountInfo, [e.target.name]: e.target.value });
    console.log("toAccount", toAccountInfo);
  };

  const createAccount = async () => {
    await axios
      .post("http://localhost:3030/accountNew")
      .then((response) => {
        setNewAccounts(response.data);
        console.log("response.data", response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const sendHbar = async () => {
    await axios
      .post("http://localhost:3030/transactionNew", {
        toAccountId: toAccountInfo.toAccountId,
        amount: toAccountInfo.amount,
      })
      .then((response) => {
        setNewTransaction(response.data);
        console.log("response.data", response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <WalletContainer>
      <MyAccountContainer>
        <b>MyAccountId : {newAccount && newAccount.newAccountId}</b>
        <button onClick={createAccount}>Create Account</button>
      </MyAccountContainer>
      <PrivateKeyContainer>
        <b>privateKey : {newAccount && newAccount.privateKey}</b>
      </PrivateKeyContainer>
      <PublicKeyContainer>
        <b>publicKey : {newAccount && newAccount.publicKey}</b>
      </PublicKeyContainer>
      <ToAccountContainer>
        <h3>ToAccountID</h3>
        <input
          id="toAccountId"
          name="toAccountId"
          type="text"
          placeholder="Input To Account ID"
          onChange={getToAccount}
        />
        <h3>Amount</h3>
        <input
          id="amount"
          name="amount"
          type="number"
          placeholder="Input Sending Amount"
          onChange={getToAccount}
        />
        <button onClick={sendHbar}>Send Hbar</button>
      </ToAccountContainer>
      <TransactionListContainer>
        <h1>Transaction Result</h1>
        <b align="left">
          Transaction Hash: {newTransaction && newTransaction.transactionHash}
        </b>
        <b align="left">
          To Account Balance:{" "}
          {newTransaction && newTransaction.newAccountBalance}
        </b>
        <b align="left">
          From Account Balance:{" "}
          {newTransaction && newTransaction.clientAccountBalance}
        </b>
        <b align="left">
          Status: {newTransaction && newTransaction.tranStatus}
        </b>
      </TransactionListContainer>
    </WalletContainer>
  );
}

export default Wallet;
