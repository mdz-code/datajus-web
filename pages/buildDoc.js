import { parseCookies } from 'nookies'
import Head from 'next/head'
import axios from 'axios'


import FormBody from '../components/forms/FormBody'
import Header from '../components/headers/Header'


export default function Home({ form }) {
  const { infos: infosAuth, data: dataAuth } = form

  return (
    <div className="flex flex-col  py-2 space-y-8">
      <Head>
        <title>Datajus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <Header/>
      <FormBody heading={infosAuth.heading} formArray={dataAuth} infosAuth={infosAuth}/>
    </div>
  )
}

export async function getServerSideProps(context) {
    const { onBoardingId, signerId } = await parseCookies(context)

    const responseForm = await axios({
        method: 'GET',
        url: `https://datajus-apis.herokuapp.com/getForm/${onBoardingId}`
      })

    return {
        props: {
          form: responseForm.data,
          signerId: signerId,
        } 
      }
}