import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table } from 'antd';
import { useTransaction, useKeyword } from '../utils/store';
import LoadingIndicator from '../components/LoadingIndicator';

function Transaction() {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        {
            title: 'TxHash',
            dataIndex: 'transaction_hash',
            key: 'transaction_hash',
            ellipsis: {
                showTitle: false,
            },
        },
        {
            title: 'TxId',
            dataIndex: 'transaction_id',
            key: 'transaction_id',
        },
        /*{
            title: 'ChargedFee',
            dataIndex: 'charged_tx_fee',
            key: 'charged_tx_fee',
        },*/
        {
            title: 'TransfersLen',
            dataIndex: 'transferslen',
            key: 'transferslen',
        },
        /*{
            title: 'Transfers',
            dataIndex: 'transfers',
            key: 'transfers',
        },*/
        {
            title: 'ConsenTime',
            dataIndex: 'consensus_timestamp',
            key: 'consensus_timestamp',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Node',
            dataIndex: 'node',
            key: 'node',
        },
        {
            title: 'Nonce',
            dataIndex: 'nonce',
            key: 'nonce',
        },
        {
            title: 'Result',
            dataIndex: 'result',
            key: 'result',
        },
        {
            title: 'Memo',
            dataIndex: 'memo_base64',
            key: 'memo_base64',
            ellipsis: {
                showTitle: false,
            },
        },
    ];

    const databucket = [];
    const [transaction, setTransaction] = useTransaction((state) => [state.transaction, state.setTransaction]);
    const [keyword] = useKeyword((state) => [state.keyword]);

    const getTransactions = async () => {
        if(keyword === []) {
            // No Keyword
            await axios.get('https://testnet.mirrornode.hedera.com/api/v1/transactions')
            .then(function (response) {
                // 성공 핸들링
                for (let i = 0; i < response.data.transactions.length; i++) {
                    const el = response.data.transactions[i];
                    const obj = {
                        key: i,
                        //charged_tx_fee: el.charged_tx_fee,
                        consensus_timestamp: el.consensus_timestamp,
                        memo_base64: el.memo_base64,
                        name: el.name,
                        node: el.node,
                        nonce: el.nonce,
                        result: el.result,
                        transaction_hash: el.transaction_hash,
                        transaction_id: el.transaction_id,
                        transferslen: el.transfers.length,
                        //transfers: el.transfers[0].account + el.transfers[0].amount,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                };
                console.log("databucket", databucket);
                setTransaction(databucket);
                setIsLoading(false);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
                setTransaction([]);
            })
        } else {
            // Search Keyword
            await axios.get('https://testnet.mirrornode.hedera.com/api/v1/transactions', {
                params: {
                    "account.id" : keyword,
                }
            })
            .then(function (response) {
                // 성공 핸들링
                for (let i = 0; i < response.data.transactions.length; i++) {
                    const el = response.data.transactions[i];
                    const obj = {
                        key: i,
                        //charged_tx_fee: el.charged_tx_fee,
                        consensus_timestamp: el.consensus_timestamp,
                        memo_base64: el.memo_base64,
                        name: el.name,
                        node: el.node,
                        nonce: el.nonce,
                        result: el.result,
                        transaction_hash: el.transaction_hash,
                        transaction_id: el.transaction_id,
                        transferslen: el.transfers.length,
                        //transfers: el.transfers[0].account + el.transfers[0].amount,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                };
                console.log("databucket", databucket);
                setTransaction(databucket);
                setIsLoading(false);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
                setTransaction([]);
            })
        }
    }


    useEffect(() => {
        setTransaction([]);
        setIsLoading(true);
        getTransactions();
    }, [keyword])

    return (
        <div>
            <h1>Transaction-page</h1>
            <div>
                {isLoading ? <LoadingIndicator /> : <Table columns={columns} dataSource={transaction} scroll={{ x: 1300, y: 550 }} />}
            </div>
        </div>
    );
}

export default Transaction;