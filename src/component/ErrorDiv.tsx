import React from 'react'

type Props = {
  text: string
};

export default function ErrorDiv(props: Props) {
  return (
    <div className="my-3 text-red-900 bg-red-300 border border-red-600 rounded px-4 py-2">
      {'Une erreur est survenue : ' + props.text}
    </div>
  )
}
