import styled  from 'styled-components'
import * as React from 'react'

interface Props {
  children: React.ReactNode
}

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  padding: 3rem 1rem;
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
