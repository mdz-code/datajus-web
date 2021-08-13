import Head from 'next/head'

import { useState  } from 'react'

export default function Home() {

  const [value, setValue] = useState({value: '', error: {status: false}, help: {status: false}})

  const functionFeedbackObject = {
    value: setValue
  }

  const valueFeedbackObject = {
    value: value
  }




  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 space-y-20">
        <InputLabel data={value.value} setData={setValue} error={value.error} help={value.help}/>
        <div className="w-full space-y-4"> 
          <Button feedbackValueObject={valueFeedbackObject} feedbackFunctionObject={functionFeedbackObject} type="action">Aviso</Button>
          <Button feedbackValueObject={valueFeedbackObject} feedbackFunctionObject={functionFeedbackObject}>Erro</Button>
        </div>


      </main>

    </div>
  )
}

function Button({ children, type, feedbackFunctionObject, feedbackValueObject }) {

  function setError(feedbackObject) {
    const inputFeedback = feedbackValueObject['value']
    const setFunction = feedbackFunctionObject['value']
    const newValue = {...inputFeedback, ...feedbackObject}
    
    console.log(newValue)
    setFunction(newValue)
  }


  function handlingClick() {
    const feedbackObject = type === 'action' ? {help: { status: true, message: 'Feedback de aviso' }, error: { status: false, message: 'Feedback de erro' }} : { help: { status: false, message: 'Feedback de aviso' }, error: { status: true, message: 'Feedback de erro' }}
    setError(feedbackObject)
  }

  return(
    <div className="w-full">
      <button onClick={handlingClick} className={type === 'action' ? "p-3 bg-blue-500 w-full text-white mx-4 rounded-lg" : "p-3 bg-blue-100 w-full text-blue-500 mx-4 rounded-lg" }>{children}</button>
    </div>
  )
}

// INPUTS
function Input() {

  return(
    <div className="w-full">
      <input placeholder="Placeholder" className="bg-gray-100 text-sm p-4 focus:outline-none w-full rounded-lg mx-4"/>
    </div>
  )
}

function InputLabel({ type, data, setData, error, help }) {

  return (
    <div className="w-full space-y-1">
      <label className="text-left mx-4">Field label</label>
      <Input/>

      {help.status && <InputAlert type='info' message="Este é um exemplo de aviso"/>}
      {error.status && <InputAlert type='error' message="Este é um exemplo de erro"/>}

    </div>
  )
}

function InputAlert({ message, type }) {

  const styleTypes = {
    info: "flex pt-2 text-blue-500 text-sm text-left mx-4 absolute",
    error: "flex pt-2 text-red-500 text-sm text-left mx-4 absolute"
  }

  return (
    <div>
      <h3 className={styleTypes[type]}>
        <Icon type={type}/>
        {message}
      </h3>
    </div>
  )
}

function Icon({ type }) {
  
  return (
    <div>
      { type === 'info' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        )
      }
      {
        type === 'error' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        )
      }
    </div>
  )
}