import styled from 'styled-components';
import Header from '../src/components/header/header';

const StyledPage = styled.div`
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  padding: 3rem 1rem;
  width: 100%;
  height: 100vh;
`

export function Index() {
  return (
    <StyledPage>
      <div className="wrapper">
        <Container>
          <Header header="Techvindesta 🔋" preheader="Sveiki atvyke į" />
        </Container>
      </div>
    </StyledPage>
  );
}

export default Index;
