import styled  from 'styled-components'
import * as React from 'react'

interface Props {
  children: React.ReactNode
}

const StyledContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  padding: 3rem 1rem;
  width: 100%;
  flex-direction: column;
  max-width: 1200px;
`
// Layout wrapper for the page
const Layout: React.FC<Props> = ({ children }) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  )
}

export default Layout
