import Layout from '../src/components/layout/layout'
import Header from '../src/components/header/header'
import HidroDataTable from "../src/components/hidro-data-table/hidro-data-table";

const endpoint = "https://lambda.techvindesta.com/he-data/"

// const Hidro = ({ data, table }) => {
const Hidro = () => {
  return (
    <Layout>
      {/*<Header header={"Hidro Data 📈"} postheader={table} />*/}
      {/*<HidroDataTable data={data} />*/}
    </Layout>
  )
}

export default Hidro
