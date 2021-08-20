import { ButtonStyles } from './style'
import { setCookie } from 'nookies'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function Button({ children, type="default", data, infos }) {

  const objectRequestHandling = {
    auth: handlingClick,
    createDocument: handlingClick,
    modal: modalClick,
    signature: sigin,
    download: downloadClick
  }

  const router = useRouter()

  async function downloadClick() {
    console.log(data)
    console.log("🕵️ Download Contratado agora")

  }


  async function modalClick(event) {
    event.preventDefault()
    const value = data['value']
    const setValue = data['setValue']
    setValue(!value)
  }

  async function sigin() {
    const dto = { ...data, type: 'font'}
    const endpoint = 'https://datajus-apis.herokuapp.com/storeSignatures'

    const response = await axios({
      method: 'POST',
      url: endpoint,
      data: dto
    })
    console.log(dto)
    console.log(response.data)


    console.log("🖋️ assinando documento")
  }


  // CALL API

  function tidyRequestData(data) {
    let response = {}

    for (let item in data) {
      response[item] = data[item].value
    }

    return response
  }

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

  const objectBuildDTO = {
    auth: createDTOAuth,
    createDocument: createDTODocBuild
  }

  const pathBuilRouter = {
    auth: 'buildDoc',
    createDocument: 'viewDoc'
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
  }

  const ButtonStyle = ButtonStyles[type]

  const functionClick = objectRequestHandling[infos.type]

  return(
    <div className="mx-4">
      <button onClick={functionClick} className={ButtonStyle}>{children}</button>
    </div>
  )
}