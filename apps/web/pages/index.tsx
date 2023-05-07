import styled from 'styled-components';
import Header from '../src/components/header/header';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const StyledPage = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
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

  @media (min-width: 768px) {
    width: 50%;
  }
`

const StyledLink = styled.a`
  width: fit-content;
  margin-bottom: 15px;
  font-size: 20px;
  border-bottom: 1px solid #fff;

  &:hover {
    border-bottom-color: #222;
  }
`

const HeroImage = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 50%;
    height: 100vh;
    background-repeat: no-repeat;
    background-image: url('https://images.unsplash.com/photo-1615209853186-e4bd66602508?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3348&q=80');
    background-size: cover;
    background-position: center;
  }
`

/**
 * This is the Home page
 * @constructor
 */
export function Index() {
  return (
    <StyledPage>
      <Container>
        <Header header="Techvindesta 🔋" preheader="Sveiki atvyke į" />

        <StyledLink href="/hidro">
          Hidro Duomenys&nbsp;
          <FontAwesomeIcon icon={faArrowRight} />
        </StyledLink>
      </Container>
      <HeroImage></HeroImage>
    </StyledPage>
  );
}

export default Index;
