export default function FormHeading({ children, title }) {
  
    return (
      <div className="space-y-2 mx-4">
        <h1 className="text-gray-800 text-xl font-bold">{title}</h1>
        <h2 className="text-gray-600 text-base" >{children}</h2>
      </div>
    )
  }