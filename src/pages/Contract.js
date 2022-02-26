import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table } from 'antd';
import { useContract, useKeyword } from '../utils/store';
import LoadingIndicator from '../components/LoadingIndicator';

function Contract() {
    const [isLoading, setIsLoading] = useState(true);
    const columns = [
        {
            title: 'Contract_id',
            dataIndex: 'contract_id',
            key: 'contract_id',
        },
        {
            title: 'Created_timestamp',
            dataIndex: 'created_timestamp',
            key: 'created_timestamp',
        },
        {
            title: 'Evm_address',
            dataIndex: 'evm_address',
            key: 'evm_address',
        },
        {
            title: 'File_id',
            dataIndex: 'file_id',
            key: 'file_id',
        },
        {
            title: 'Auto_renew_period',
            dataIndex: 'auto_renew_period',
            key: 'auto_renew_period',
        },
    ];

    const databucket = [];
    const [contract, setContract] = useContract((state) => [state.contract, state.setContract]);
    const [keyword] = useKeyword((state) => [state.keyword]);

    const getContract = async () => {
        console.log('keyword-len', keyword.length);
        console.log('keyword', keyword);
        if(keyword.length === 0) {
            // No Keyword
            await axios.get('https://testnet.mirrornode.hedera.com/api/v1/contracts')
            .then(function (response) {
                // 성공 핸들링
                console.log("response.data.contracts", response.data.contracts);
                for (let i = 0; i < response.data.contracts.length; i++) {
                    const el = response.data.contracts[i];
                    const obj = {
                        key: i,
                        contract_id: el.contract_id,
                        created_timestamp: el.created_timestamp,
                        evm_address: el.evm_address,
                        file_id: el.file_id,
                        auto_renew_period: el.auto_renew_period,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                };
                console.log("databucket", databucket);
                setContract(databucket);
                setIsLoading(false);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
                setContract([]);
            })
        } else {
            // Search Keyword
            await axios.get(`https://testnet.mirrornode.hedera.com/api/v1/contracts/${keyword}`)
            .then(function (response) {
                // 성공 핸들링
                console.log("response.data", response.data);
                console.log("contract_id", response.data.contract_id);
                //for (let i = 0; i < response.data.contracts.length; i++) {
                    const el = response.data;
                    const obj = {
                        key: 0,
                        contract_id: el.contract_id,
                        created_timestamp: el.created_timestamp,
                        evm_address: el.evm_address,
                        file_id: el.file_id,
                        auto_renew_period: el.auto_renew_period,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                //};
                console.log("databucket", databucket);
                setContract(databucket);
                setIsLoading(false);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
                setContract([]);
            })
        }
    };

    useEffect(() => {
        //setContract([]);
        setIsLoading(true);
        getContract();
    }, [keyword])

    return (
        <div>
            <h1>Contract-page</h1>
            {isLoading ? <LoadingIndicator /> : <Table columns={columns} dataSource={contract} scroll={{ x: 1300, y: 550 }} />}
        </div>
    );
}

export default Contract;