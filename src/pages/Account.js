import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table } from 'antd';
import { useAccount, useKeyword } from '../utils/store';
import LoadingIndicator from '../components/LoadingIndicator';

function Account() {
    const [isLoading, setIsLoading] = useState(true);
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
    const [keyword, setKeyword] = useKeyword((state) => [state.keyword, state.setKeyword]);

    const getAccount = async () => {
        if(keyword === []) {
            // No Keyword
            await axios.get('https://testnet.mirrornode.hedera.com/api/v1/accounts')
            .then(function (response) {
                // 성공 핸들링
                console.log("response.data.accounts", response.data.accounts);
                for(let i = 0; i < response.data.accounts.length; i++) {
                    const el = response.data.accounts[i];
                    const obj = {
                        key: i,
                        account: el.account,
                        balance: el.balance.balance,
                        timestamp: el.balance.timestamp,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                }
                console.log("databucket", databucket);
                setAccount(databucket);
                setIsLoading(false);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
                setAccount([]);
            })
        } else {
            // Search Keyword
            await axios.get('https://testnet.mirrornode.hedera.com/api/v1/accounts',{
                params: {
                    "account.id": keyword,
                }
            })
            .then(function (response) {
                // 성공 핸들링
                console.log("response.data.accounts", response.data.accounts);
                for(let i = 0; i < response.data.accounts.length; i++) {
                    const el = response.data.accounts[i];
                    const obj = {
                        key: i,
                        account: el.account,
                        balance: el.balance.balance,
                        timestamp: el.balance.timestamp,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                }
                console.log("databucket", databucket);
                setAccount(databucket);
                setIsLoading(false);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
                setAccount([]);
            })
        }

    };

    useEffect(() => {
        setAccount([]);
        setIsLoading(true);
        getAccount();
    }, [keyword])


    return (
        <div>
            <h1>Account-page</h1>
            {isLoading ? <LoadingIndicator /> : <Table columns={columns} dataSource={account} scroll={{ x: 1300, y: 550 }} />}
        </div>
    );
}

export default Account;