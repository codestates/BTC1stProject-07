import './App.css';
import 'antd/dist/antd.min.css';
import './index.css';
import styled from 'styled-components';
import React from 'react';
import { useKeyword } from './utils/store';

import { Layout, Menu, Input } from 'antd';

import {
  Link,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/Home';
import Wallet from './pages/Wallet'
import Transaction from './pages/Transaction';
import Account from './pages/Account';
import Contract from './pages/Contract';
import Token from './pages/Token';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

const Logo = styled.img`
  //position: fixed;
  height: 5vh;
  margin-top: 1vh;
  float: left;
  width: 100%;
`

function App() {
  const [keyword, setKeyword] = useKeyword((state) => [state.keyword, state.setKeyword]);

  const onSearch = () => {
    console.log('keyword', keyword)
  }
  const searchKeyWord = (e) => {
    console.log('searchKeyWord...', e.target.value)
    setKeyword(e.target.value)
  }

  return (
    <div className="App">
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'row' }}>
          <Link to="/">
            <Logo src='https://drive.google.com/uc?export=view&id=12KTV8U6sVqekABC0ETTggZhFQLZn8Z7h' />
          </Link>
          <Search
            placeholder="Search by Transaction ID/Hash, Account ID, Contract ID, Topic ID, Hedera Token ID, or memo field"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={onSearch}
            style={{ height: '5vh', margin: '1vh', width: '65%' }}
            onChange={searchKeyWord}
          />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['']}
            style={{ width: '25%' }} >
            <Menu.Item key="1" >
              Wallet
              <Link to="/Wallet" />
            </Menu.Item>
            <Menu.Item key="2" >
              Transaction
              <Link to="/Transaction" />
            </Menu.Item>
            <Menu.Item key="3">
              Account
              <Link to="/Account" />
            </Menu.Item>
            <Menu.Item key="4">
              Contract
              <Link to="/Contract" />
            </Menu.Item>
            <Menu.Item key="5">
              Hedera Token
              <Link to="/Token" />
            </Menu.Item>
          </Menu>
        </Header>
        <Content className="site-layout" style={{ padding: '0 50px', marginTop: 64, display: 'flex', flexDirection: 'column' }}>
          <div className="site-layout-background" style={{ padding: 24, flex: '1 0 0' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Wallet" element={<Wallet />} />
              <Route path="/Transaction" element={<Transaction />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/Contract" element={<Contract />} />
              <Route path="/Token" element={<Token />} />
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>HedeRightNow ©2018 Created by Ant BTC_7</Footer>
      </Layout>
    </div>
  );
}

export default App;