'use client'

import ChatBot from 'react-simple-chatbot'

const steps = [
  {
    id: '1',
    message: 'Hello World',
    end: true,
  },
]

export default function Send() {
  return (
    <>
      <ChatBot steps={steps} />
    </>
  )
}
