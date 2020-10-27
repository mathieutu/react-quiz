import React, { ReactNode } from 'react'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'

import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism'

SyntaxHighlighter.registerLanguage('js', js)
SyntaxHighlighter.registerLanguage('jsx', jsx)

delete prism.operator.background

export const CodeBlock = ({ code }: { code: string }) => (
  <SyntaxHighlighter showLineNumbers language="jsx" style={prism} customStyle={{ borderRadius: '0.5rem' }}>
    {code.trim()}
  </SyntaxHighlighter>
)

export const Code = ({ children }: { children: string }) => (
  <span className="bg-gray-200 text-gray-700 py-px rounded font-mono font-normal tracking-tighter">
    <span className="text-gray-400">`</span>{children}<span className="text-gray-400">`</span>
  </span>
)

export const Title = ({ children }: { children: ReactNode }) => (
  <h3 className="text-xl font-bold mb-3 mt-5 -ml-4">{children}</h3>
)

export const Hr = () => <hr className="my-8 mx-20" />
