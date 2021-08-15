import FormHeading from '../FormHeading'
import Form from '../Form'


export default function FormBody({formArray, infosAuth, heading}) {

    const { title, subtitle } = heading
  
    return (
      <main className="w-full space-y-8">
          <FormHeading title={title}>{subtitle}</FormHeading>
          <Form formArray={formArray} infos={infosAuth} />
      </main>
    )
  
  }