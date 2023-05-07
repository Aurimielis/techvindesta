import Layout from '../src/components/layout/layout'
import Header from '../src/components/header/header'
import HidroDataTable from "../src/components/hidro-data-table/hidro-data-table";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const endpoint = "https://lambda.techvindesta.com/he-data/"

const BackBtn = styled.a`
  cursor: pointer;
  width: fit-content;
  position: absolute;
  top: 100px;

  svg {
    height: 1.4em;
  }
`

const Hidro = ({ data, table }) => {
  return (
    <Layout>
      <Header header={"Hidro Data 📈"} postheader={table} />
      <BackBtn href='/'>
        <FontAwesomeIcon icon={faChevronLeft} />
      </BackBtn>
      <HidroDataTable data={data} />
    </Layout>
  )
}

Hidro.getInitialProps = async (ctx) => {
  const table = ctx.query['table-name'] ?? 'TestHE'

  const res = await fetch(`${endpoint}${table}`)
  const data = await res.json()
  return { data, table }
}

export default Hidro
