import Input from '../Input'
import InputAlert from '../InputAlert'

export default function InputLabel({ label, type, data, dataChanger, labelKey }) {

    return (
      <div className="w-full space-y-1">
        <label className="w- full text-left mx-4">{label}</label>
        <Input labelKey={labelKey} inputData={data} inputDataChanger={dataChanger} typeInput={type} label={label} type={type}/>
      </div>
    )
}