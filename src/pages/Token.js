import React, { useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table, Tooltip } from 'antd';
import { useToken } from '../utils/store';

function Token () {

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
                console.log("response.data.accounts", response.data.tokens);
                response.data.tokens.map((el) => {
                    //console.log('transactions', el.charged_tx_fee);
                    const obj = {
                        token_id: el.token_id,
                        symbol: el.symbol,
                        type: el.type,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                });
                console.log("databucket", databucket);
                setToken(databucket);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
            })
    };

    useEffect(() => {
        getToken();
    }, [])

    return (
        <div>
            <h1>Token-page</h1>
            <Table columns={columns} dataSource={token} scroll={{ x: 1300, y: 550 }} />
        </div>
    );
}

export default Token;