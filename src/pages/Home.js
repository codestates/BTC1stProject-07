import styled from 'styled-components';

const HomeContainer = styled.div`
    border: 1px solid blue;
    height: 100%;
    display: flex;
    flex-direction: row;
`

const LastestBlocksContainer = styled.div`
    border: 1px solid black;
    margin: 1rem;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
`

const LastestTransactionsContainer = styled.div`
    border: 1px solid black;
    margin: 1rem;
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
`

function Home() {

    return (
        <HomeContainer>
            <LastestBlocksContainer>
                LastestBlocks
            </LastestBlocksContainer>
            <LastestTransactionsContainer>
                LastestTransactions
            </LastestTransactionsContainer>
        </HomeContainer>
    );
}

export default Home;