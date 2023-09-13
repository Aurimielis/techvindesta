import styled from 'styled-components'
import Header from '../src/components/header/header'

const StyledPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;

  background-repeat: no-repeat;
  background-image: linear-gradient(to bottom, rgba(245, 246, 252, 0.77), rgba(2, 13, 24, 0.92)),
  url('https://images.unsplash.com/photo-1570106230673-3bab9f2f3c63?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
  background-size: cover;
  background-position: center;
`

const Container = styled.div`
  display: flex;
  width: 100vw;
  flex-flow: column;
  justify-content: center;
`

const StyledLink = styled.a`
  width: fit-content;
  margin: 2rem auto;
  font-size: 20px;
  padding-bottom: 1px;

  &:hover {
    border-bottom: 1px solid #000;
    padding-bottom: 0;
  }
`

function Maintenance() {
  return (
    <StyledPage>
      <Container>
        <Header
          header={"This page is under maintenance."}
          postheader={"Apologies for any inconvenience."}
        />
        <StyledLink href={'/'}>{'< Home'}</StyledLink>
      </Container>
    </StyledPage>
  )
}

export default Maintenance
