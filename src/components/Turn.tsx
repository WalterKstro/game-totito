import { FC } from "react"

interface IProps {
    turn:string,
}
const Turn:FC<IProps> = ({turn}) => {
  return (
    <span className="h-8 w-8 grid place-items-center rounded bg-gray-600 text-gray-300">{turn}</span>
  )
}

export default Turn