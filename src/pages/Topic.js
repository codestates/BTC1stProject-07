import React, { useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table, Tooltip } from 'antd';
import { useTopic } from '../utils/store';

function Topic() {

    const databucket = [];
    const [topic, setTopic] = useTopic((state) => [state.topic, state.setTopic]);

    const getTopic = async () => {
        await axios.get('https://testnet.mirrornode.hedera.com/api/v1/topics')
            .then(function (response) {
                // 성공 핸들링
                console.log("response.data.accounts", response.data);
                /*response.data.accounts.map((el) => {
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
                setTopic(databucket);*/
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
            })
    };

    useEffect(() => {
        getTopic();
    }, [])

    return (
        <div>
            <h1>Topic-page</h1>
        </div>
    );
}

export default Topic;