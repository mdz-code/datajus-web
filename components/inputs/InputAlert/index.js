import Icon from '../../globals/Icons'

export default function InputAlert({ message, type }) {

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