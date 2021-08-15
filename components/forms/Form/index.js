import { useState  } from 'react'
import Button from '../../buttons/Button'
import InputLabel from '../../inputs/InputLabel'

export default function Form({ formArray, infos }) {

  // console.log(infos)

  function customJSONKeyGenerator(labelName) {
    const rawWord = labelName.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const removePoints = rawWord.replace("-", "")

    const keyArray = removePoints.split(' ')
    keyArray[0] = keyArray[0].toLowerCase()
    return keyArray.join('')
  }

  function formArrayToState(data) {
    let responseObject = {}
    for (let formItem of data) {
      const keyLabel = customJSONKeyGenerator(formItem.label)
      responseObject[keyLabel] = {value: '', error: {status: false}, help: {status: false}}
    }
    return responseObject
  }

  const initialStateTemplate = formArrayToState(formArray)
  const [value, setValue] = useState(initialStateTemplate)

  
  
  return (
    <div className="flex flex-col items-center justify-center w-full space-y-8">
      {
          formArray.map((element, i) => {
            const labelKey = customJSONKeyGenerator(element.label)
            return (
              <div className="w-full" key={i}>
                <InputLabel labelKey={labelKey} label={element.label} type={element.type} data={value} dataChanger={setValue}/>
              </div>
            )
          })
        }
        <div 
        className="w-full space-y-4"
        > 
          <Button infos={infos} data={value} type="action">Próximo</Button>
        </div>
    </div>
  )

}