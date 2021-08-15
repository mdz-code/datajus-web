import { ButtonStyles } from './style'
import { setCookie } from 'nookies'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Button({ children, type="default", data, infos }) {
  // function setError(feedbackObject) {
  //   const inputFeedback = feedbackValueObject['value']
  //   const setFunction = feedbackFunctionObject['value']
  //   const newValue = {...inputFeedback, ...feedbackObject}
    
  //   console.log(newValue)
  //   setFunction(newValue)
  // }

  function createDTOAuth(data, infos) {
    return tidyRequestData(data)
  }

  function createDTODocBuild(data, infos) {
    let returnObject = {}
    returnObject['uid'] = infos.onBoardingId

    const customObject = tidyRequestData(data)
    returnObject['customObject'] = customObject

    return returnObject
  }

  const pathBuilRouter = {
    auth: 'buildDoc',
    createDocument: 'viewDoc'
  }


  const objectBuildDTO = {
    auth: createDTOAuth,
    createDocument: createDTODocBuild
  }

  const router = useRouter()

  
  function tidyRequestData(data) {
    let response = {}

    for (let item in data) {
      response[item] = data[item].value
    }

    return response
  }

  function getResponse(object) {
    const keys = Object.keys(object)
    
    return {
      key: keys[0],
      value: object[keys[0]]
    }
  }
    
  async function handlingClick(event) {
    event.preventDefault()
    const buildedDTOFunction = objectBuildDTO[infos.type]
    const objectDTO = buildedDTOFunction(data, infos)
    console.log(objectDTO)

    const { endpoint } = infos.api

    const response = await axios({
      method: 'POST',
      url: endpoint,
      data: objectDTO
    })

    const responseObject = getResponse(response.data)
    setCookie(null, responseObject.key, responseObject.value)

    const pathRouter = pathBuilRouter[infos.type]

    console.log(`🍪 setando nos cookies authUser = true e signerId = ${'signerId'}`)


    console.log('👩‍🌾 cadastrando assinador')
    router.push(pathRouter)
    // const feedbackObject = type === 'action' ? {help: { status: true, message: 'Feedback de aviso' }, error: { status: false, message: 'Feedback de erro' }} : { help: { status: false, message: 'Feedback de aviso' }, error: { status: true, message: 'Feedback de erro' }}
    // setError(feedbackObject),
  }

  const ButtonStyle = ButtonStyles[type]

  return(
    <div className="mx-4">
      <button onClick={handlingClick} className={ButtonStyle}>{children}</button>
    </div>
  )
}