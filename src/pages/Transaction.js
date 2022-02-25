import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '../components/Table';

function Transaction() {

    const columns = [
        //"bytes",
        "charged_tx_fee",
        "consensus_timestamp",
        "entity_id",
        "max_fee",
        //"memo_base64",
        "name",
        "node",
        "nonce",
        //"parent_consensus_timestamp",
        "result",
        //"scheduled",
        "transaction_hash",
        "transaction_id",
        "transfers",
        //"valid_duration_seconds",
        //"valid_start_timestamp",
    ];

    const [transactions, setTransactions] = useState();

    const updateTransaction = async () => {
        await axios.get('https://testnet.mirrornode.hedera.com/api/v1/transactions')
            .then(function (response) {
                // 성공 핸들링
                console.log("response", response);
                console.log("response.data.transactions", response.data.transactions);
                setTransactions(response.data.transactions);
                console.log("transactions", transactions);
                columns.map((el) => {
                    console.log('columns', el);
                })
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
            })
            .then(function () {
                // 항상 실행되는 영역
                console.log('updateEvent');
            });
    }
    useEffect(() => {
        axios.get('https://testnet.mirrornode.hedera.com/api/v1/transactions')
            .then(function (response) {
                // 성공 핸들링
                console.log("response", response);
                console.log("response.data.transactions", response.data.transactions);
                setTransactions(response.data.transactions);
                console.log("transactions", transactions);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
            })
            .then(function () {
                // 항상 실행되는 영역
                console.log('updateEvent');
            });
    }, [])

    //const data = transactions.map((el) => ({
    //    bytes: el.bytes,
    //    charged_tx_fee: el.charged_tx_fee,
    //    consensus_timestamp: el.consensus_timestamp,
    //    entity_id: el.entity_id,
    //    max_fee: el.max_fee,
    //    memo_base64: el.memo_base64,
    //    name: el.name,
    //    node: el.node,
    //    nonce: el.nonce,
    //    parent_consensus_timestamp: el.parent_consensus_timestamp,
    //    result: el.result,
    //    scheduled: el.scheduled,
    //    transaction_hash: el.transaction_hash,
    //    transaction_id: el.transaction_id,
    //    transfers: el.transfers,
    //    valid_duration_seconds: el.valid_duration_seconds,
    //    valid_start_timestamp: el.valid_start_timestamp
    //}));

    return (
        <div>
            <h1>Transaction-page</h1>
            <div>
                <button onClick={updateTransaction}>updateTransaction</button>
                <table class="table">
                    <thead>
                        <tr>
                            {columns.map((el) => {
                                return (
                                    <th scope='col'> {el} </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {/*transactions.map((el) => {
                            return (
                                <tr key={el.transaction_hash}>
                                    <td>{el.charged_tx_fee}</td>
                                    <td>{el.consensus_timestamp}</td>
                                    <td>{el.entity_id}</td>
                                    <td>{el.max_fee}</td>
                                    <td>{el.name}</td>
                                    <td>{el.node}</td>
                                    <td>{el.nonce}</td>
                                    <td>{el.result}</td>
                                    <td>{el.transaction_hash}</td>
                                    <td>{el.transaction_id}</td>
                                    <td>{el.transfers}</td>
                                </tr>
                            );
                        })*/}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Transaction;