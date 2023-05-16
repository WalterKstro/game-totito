import { FC, ReactNode } from "react"

interface IProps {
    index:number,
    children?:ReactNode,
    handlerMarkPosition:(index:number)=>void
}
const Square:FC<IProps> = ({index,children,handlerMarkPosition}) => {
  return (
    <div 
      className="p-4  border-gray-500 border-2 rounded text-4xl grid place-content-center cursor-pointer"
      onClick={()=>handlerMarkPosition(index)}
      >{children}</div>
  )
}

export default Square