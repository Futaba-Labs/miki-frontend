import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#6F6FE2',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#6F6FE2',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};
const steps = [
  {
    id: '1',
    message: 'Hello World',
    end: true,
  },
];


function MikiAbstraction() {
  return (
    <div style={{ borderRadius: '10px', boxShadow: '0 0  50px rgba(255, 255, 255, 0.9)' }}>
    <ThemeProvider theme={theme}>
    <ChatBot steps={steps} />
  </ThemeProvider>
  </div>

  );
}

export default MikiAbstraction;
