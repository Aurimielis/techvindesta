import styled from "styled-components";
import * as React from "react";

interface Props {
  header: string;
  preheader?: string;
  postheader?: string
}

const StyledContainer = styled.div`
  margin-top: 2.5rem;
`

const StyledHeader = styled.h1`
  font-size: 3rem;
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1;
`

const SubHeader = styled.span`
  display: block;
  font-size: 1.875rem;
  font-weight: 300;
  line-height: 2.25rem;
  margin-bottom: 0.5rem;
`

const Header: React.FC<Props> = ({ header, postheader, preheader }) => {
  return (
    <StyledContainer>
      {preheader && <SubHeader>{preheader}</SubHeader>}
      <StyledHeader>
        {header}
      </StyledHeader>
      {postheader && <SubHeader>{postheader}</SubHeader>}
    </StyledContainer>
  )
}

export default Header;
