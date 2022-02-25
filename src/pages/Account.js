import React, { useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table, Tooltip } from 'antd';
import { useAccount } from '../utils/store';

function Account() {

    const columns = [
        {
            title: 'Account',
            dataIndex: 'account',
            key: 'account',
        },
        {
            title: 'Balance',
            dataIndex: 'balance',
            key: 'balance',
        },
        {
            title: 'Timestamp',
            dataIndex: 'timestamp',
            key: 'timestamp',
        },
    ];

    const databucket = [];
    const [account, setAccount] = useAccount((state) => [state.account, state.setAccount]);

    const getAccount = async () => {
        await axios.get('https://testnet.mirrornode.hedera.com/api/v1/accounts')
            .then(function (response) {
                // 성공 핸들링
                console.log("response.data.accounts", response.data.accounts);
                response.data.accounts.map((el) => {
                    //console.log('transactions', el.charged_tx_fee);
                    const obj = {
                        account: el.account,
                        balance: el.balance.balance,
                        timestamp: el.balance.timestamp,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                });
                console.log("databucket", databucket);
                setAccount(databucket);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
            })
    };

    useEffect(() => {
        getAccount();
    }, [])


    return (
        <div>
            <h1>Account-page</h1>
            <Table columns={columns} dataSource={account} scroll={{ x: 1300, y: 550 }} />
        </div>
    );
}

export default Account;