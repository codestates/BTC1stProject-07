import React, { useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table, Tooltip } from 'antd';
import { useTransaction } from '../utils/store';

function Transaction() {

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
        {
            title: 'ChargedFee',
            dataIndex: 'charged_tx_fee',
            key: 'charged_tx_fee',
        },
        {
            title: 'ConsenTime',
            dataIndex: 'consensus_timestamp',
            key: 'consensus_timestamp',
        },
        {
            title: 'EntityId',
            dataIndex: 'entity_id',
            key: 'entity_id',
        },
        {
            title: 'MaxFee',
            dataIndex: 'max_fee',
            key: 'max_fee',
        },
        {
            title: 'Memo',
            dataIndex: 'memo_base64',
            key: 'memo_base64',
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
            title: 'Scheduled',
            dataIndex: 'scheduled',
            key: 'scheduled',
        },
        {
            title: 'ValidSec',
            dataIndex: 'valid_duration_seconds',
            key: 'valid_duration_seconds',
        },
    ];

    const databucket = [];
    const [transaction, setTransaction] = useTransaction((state) => [state.transaction, state.setTransaction]);

    const getTransactions = async () => {
        await axios.get('https://testnet.mirrornode.hedera.com/api/v1/transactions')
            .then(function (response) {
                // 성공 핸들링
                response.data.transactions.map((el) => {
                    //console.log('transactions', el.charged_tx_fee);
                    const obj = {
                        charged_tx_fee: el.charged_tx_fee,
                        consensus_timestamp: el.consensus_timestamp,
                        entity_id: el.entity_id,
                        max_fee: el.max_fee,
                        memo_base64: el.memo_base64,
                        name: el.name,
                        node: el.node,
                        nonce: el.nonce,
                        result: el.result,
                        scheduled: el.scheduled,
                        transaction_hash: el.transaction_hash,
                        transaction_id: el.transaction_id,
                        transfers: el.transfers,
                        valid_duration_seconds: el.valid_duration_seconds,
                        valid_start_timestamp: el.valid_start_timestamp
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                });
                console.log("databucket", databucket);
                setTransaction(databucket);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
            })
    };

    useEffect(() => {
        getTransactions();
    }, [])

    return (
        <div>
            <h1>Transaction-page</h1>
            <div>
                {/*<button onClick={updateTransaction}>updateTransaction</button>*/}
                <Table columns={columns} dataSource={transaction} scroll={{ x: 1300, y: 550 }} />
            </div>
        </div>
    );
}

export default Transaction;