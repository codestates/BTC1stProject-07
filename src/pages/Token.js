import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table } from 'antd';
import { useToken } from '../utils/store';
import LoadingIndicator from '../components/LoadingIndicator';

function Token() {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        {
            title: 'Token_id',
            dataIndex: 'token_id',
            key: 'token_id',
        },
        {
            title: 'Symbol',
            dataIndex: 'symbol',
            key: 'symbol',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
    ];

    const databucket = [];
    const [token, setToken] = useToken((state) => [state.token, state.setToken]);

    const getToken = async () => {
        await axios.get('https://testnet.mirrornode.hedera.com/api/v1/tokens')
            .then(function (response) {
                // 성공 핸들링
                for (let i = 0; i < response.data.tokens.length; i++) {
                    const el = response.data.tokens[i];
                    const obj = {
                        key: i,
                        token_id: el.token_id,
                        symbol: el.symbol,
                        type: el.type,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                };
                console.log("databucket", databucket);
                setToken(databucket);
                setIsLoading(false);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
            })
    };

    useEffect(() => {
        setIsLoading(true);
        getToken();
    }, [])

    return (
        <div>
            <h1>Token-page</h1>
            {isLoading ? <LoadingIndicator /> : <Table columns={columns} dataSource={token} scroll={{ x: 1300, y: 550 }} />}
        </div>
    );
}

export default Token;