'use client'

import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#1F8506',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#1F8506',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
}

export default function ChatBotWindow() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle={'Miki Smart Dapps'}
          botAvatar={'/favicon.png'}
          steps={[
            {
              id: '1',
              message: 'What number I am thinking?',
              trigger: '2',
            },
            {
              id: '2',
              options: [
                { value: 1, label: 'Number 1', trigger: '4' },
                { value: 2, label: 'Number 2', trigger: '3' },
                { value: 3, label: 'Number 3', trigger: '3' },
              ],
            },
            {
              id: '3',
              message: 'Wrong answer, try again.',
              trigger: '2',
            },
            {
              id: '4',
              message: 'Awesome! You are a telepath!',
              end: true,
            },
          ]}
        />
      </ThemeProvider>
    </>
  )
}
