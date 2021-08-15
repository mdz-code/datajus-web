import { InputStyle } from './style'
import { mask } from 'remask'
import { useState } from 'react/cjs/react.development'

import Icon from '../../globals/Icons'

export default function Input({ inputData, inputDataChanger, type, label, labelKey }) {

  const [inputValue, setInputValue] = useState('')

    function setMask(typeInput) {

      const maskPatterns = {
        cpf: '999.999.999-99',
        string: false
      }

      const needMask = maskPatterns[typeInput]

      if (!needMask) {

        return {
          need: false
        }

      }

      return {
        need: true,
        pattern: needMask

      }

    }

    const maskInfos = setMask(type)
    
    function onChangeInput(event) {
      let { value } = event.target
      const newData = inputData
      maskInfos.need === false ? newData[labelKey] = {...newData[labelKey], value: value} : newData[labelKey] = {...newData[labelKey], value: mask(value, maskInfos.pattern)}
      inputDataChanger(newData)
      console.log(newData)
      maskInfos.need === false ? value = value : value = mask(value, maskInfos.pattern)
      setInputValue(value)
    }

    const style = InputStyle['default']

    return(
      <div className="mx-4">
        {type !== 'secret' ? <InputMasked onChange={onChangeInput}  className={style} value={inputValue}/> : <InputSecret onChange={onChangeInput}  className={style} value={inputValue}/>}
      </div>
    )
  }

  function InputMasked({ onChange, className, value }) {

    return(
      <div>
        <input onChange={onChange}  className={className} value={value}/>
      </div>
    )

  }

  function InputSecret({ onChange, className, value }) {

    const [showPassword, setShowPassword] = useState(false)

    function onClickShowPassword() {
      setShowPassword(!showPassword)
    }

    return(
      <div className="relative w-full">
        <input onChange={onChange}  className={className} value={value} type={showPassword ? 'text' : 'password'}/>
        <button onClick={onClickShowPassword} className="absolute left-64 top-4">eye</button>
      </div>
    )

  }



