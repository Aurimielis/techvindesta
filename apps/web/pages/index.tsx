import styled from 'styled-components';
import Header from '../src/components/header/header';
import Link from 'next/link';

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
  flex-direction: column;
  max-width: 1200px;
`

/**
 * This is the Home page
 * @constructor
 */
export function Index() {
  return (
    <StyledPage>
      <div className="wrapper">
        <Container>
          <Header header="Techvindesta 🔋" preheader="Sveiki atvyke į" />

          {/* Probs should remove that later when making it public  */}
          <Link href="/hidro">
            Hidro Data
          </Link>
        </Container>
      </div>
    </StyledPage>
  );
}

export default Index;
