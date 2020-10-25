import React, { ReactNode } from 'react'

type Props = {
  onClick?(e: any): void,
  text: string,
  icon?: ReactNode
};

export default function Button(props: Props) {
  return (
    <button onClick={props.onClick}
            className="my-btn-anim flex select-none mx-auto px-5 py-2 text-white bg-gradient-to-r from-teal-400 to-blue-500 shadow-md cursor-pointer transition duration-150 focus:outline-none rounded-full hover:shadow-lg">
      <div className="my-auto">{props.text}</div>
      <div className="my-auto">{props.icon}</div>
    </button>
  )
}
