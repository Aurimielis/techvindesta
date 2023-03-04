import styled from 'styled-components';

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
          <div id="welcome">
            <h1>
              <span> Sveiki atvyke į</span>
              Techvindesta 🔋
            </h1>
          </div>
        </Container>
      </div>
    </StyledPage>
  );
}

export default Index;
