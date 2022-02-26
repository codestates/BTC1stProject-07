import styled from 'styled-components';

const HomeContainer = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    overflow: scroll;
`

const GoverningCouncilContainer = styled.img`
    margin: 1rem;
`

const AlgorithmsContainer = styled.img`
    margin: 1rem;
`

const MetricsContainer = styled.img`
    margin: 1rem;
`

function Home() {
    return (
        <HomeContainer>
            <GoverningCouncilContainer src='https://drive.google.com/uc?export=view&id=1tj1desXiUi_4aXjrY43tw989_IlZy3FA'/>
            <AlgorithmsContainer src='https://drive.google.com/uc?export=view&id=1-H9lX6uFn4Im-erRmaHTcPijz5Fs74BF'/>
            <MetricsContainer src='https://drive.google.com/uc?export=view&id=1uh_7lpepENghPbyNBxt1l-W7UtDlRsnS'/>
        </HomeContainer>
    );
}

export default Home;