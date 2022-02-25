import React, { useEffect } from 'react';
import axios from 'axios';
import 'antd/dist/antd.min.css';
import { Table, Tooltip } from 'antd';
import { useContract } from '../utils/store';

function Contract() {

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

    const getContract = async () => {
        await axios.get('https://testnet.mirrornode.hedera.com/api/v1/contracts')
            .then(function (response) {
                // 성공 핸들링
                console.log("response.data.contracts", response.data.contracts);
                response.data.contracts.map((el) => {
                    //console.log('transactions', el.charged_tx_fee);
                    const obj = {
                        contract_id: el.contract_id,
                        created_timestamp: el.created_timestamp,
                        evm_address: el.evm_address,
                        file_id: el.file_id,
                        auto_renew_period: el.auto_renew_period,
                    }
                    console.log('obj', obj);
                    databucket.push(obj);
                });
                console.log("databucket", databucket);
                setContract(databucket);
            })
            .catch(function (error) {
                // 에러 핸들링
                console.log("error", error);
            })
    };

    useEffect(() => {
        getContract();
    }, [])

    return (
        <div>
            <h1>Contract-page</h1>
            <Table columns={columns} dataSource={contract} scroll={{ x: 1300, y: 550 }} />
        </div>
    );
}

export default Contract;