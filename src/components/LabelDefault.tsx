interface LabelDefaultProps {
  id: string;
  name: string;
  isRequired?: boolean
}

export default function LabelDefault({ id, name, isRequired = false }: LabelDefaultProps) {
  return (
    <label
      htmlFor={id}
      className="block mb-1"
    >{name}{isRequired && <span className="text-red-500">*</span>}</label>
  )
}