import React, { ReactNode } from 'react'

type Props = {
  onClick?(e: any): void,
  text: string,
  icon?: ReactNode
  disabled?: boolean
};

export default function Button({ text, icon, ...props }: Props) {
  return (
    <button
      {...props}
      className="my-btn-anim flex select-none mx-auto px-5 py-2 text-white bg-gradient-to-r from-teal-400 to-blue-500 shadow-md cursor-pointer transition duration-150 focus:outline-none rounded-full hover:shadow-lg"
    >
      <div className="my-auto">{text}</div>
      <div className="my-auto">{icon}</div>
    </button>
  )
}
