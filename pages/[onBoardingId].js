// OK ADD HEADING E SUBHEADING DINAMICO NAS PAGINAS
// OK TRABALHAR NA COMPONENTIZAÇÃO
// OK API DE CADASTRO DE CONTRATO
// OK SALVAR ID DO CONTRATO NOS COOKIES
// OK CHAMAR API DE RESGATAR CONTRATO
// MOSTRAR CONTRATO
// COMPONENTE DO ASSINADOR
// SALVAR ASSINATURA
// TELA DE CONFIRMAÇÃO
// TELA DE FEEDBACK
// DOWNLOAD CONTRACT
import { setCookie } from 'nookies'
import Head from 'next/head'
import axios from 'axios'


import FormBody from '../components/forms/FormBody'
import Header from '../components/headers/Header'


export default function Home({ form }) {
  const { infos: infosAuth, data: dataAuth } = form

  return (
    <div className="flex flex-col w-screen py-2 space-y-8">
      <Head>
        <title>Datajus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
      <Header/>
      <FormBody heading={infosAuth.heading} formArray={dataAuth} infosAuth={infosAuth}/>
    </div>
  )
}

export const getServerSideProps = async (context) => {

  const { onBoardingId } = context.query

  const authFormId = '244803ac-9960-4c3b-a62d-47ba7af2a3bd'

  const responseAuth = await axios({
    method: 'GET',
    url: `https://datajus-apis.herokuapp.com/getForm/${authFormId}`
  })

  setCookie(context, 'onBoardingId', onBoardingId)

  return {
    props: {
      form: responseAuth.data
    }
  }
}