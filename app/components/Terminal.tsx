import React, { useState } from 'react'
import { useTheme } from "../contexts/ThemeContext";

const Terminal: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>(['Welcome to the portfolio terminal!', 'Type "help" for a list of commands.'])
  const { theme, toggleTheme } = useTheme();

  const clearTerminal = () => {
    setOutput(['Welcome to the portfolio terminal!', 'Type "help" for a list of commands.'])
  }

  const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase()
      let response: string

      switch (command) {
        case 'help':
          response = 'Available commands: about, skills, contact, cat about.txt, clear, toggleTheme'
          break
        case 'about':
          response = `Shivam Raj - Developer & Tech Enthusiast.
Currently a 12th-grade student with a deep passion for technology and building things on the web.`
          break
        case 'cat about.txt':
          response = `I am currently a 12th-grade student with a deep passion for technology and building things on the web. I completed my primary and secondary schooling (up to Class 10th) at Podar in Gaya. Over the years, I have learned languages like Python and have recently been heavily exploring "vibecoding," which I've found to be an incredibly productive way to develop applications as a student. When I am not writing code or managing cloud infrastructure, you can almost always find me listening to music.`
          break
        case 'skills':
          response = `
  → Python
  → Vercel
  → Supabase
  → Firebase
  → Render
  → Google Cloud
  → GitHub
  → Vibecoding
  → Claude & Google Antigravity
          `;
          break;
        case 'contact':
          response = 'Workflow managed by Todoist. Reach out via GitHub or email (add your email here).'
          break
        case 'clear':
          clearTerminal()
          response = ''
          break
        case 'toggletheme':
          toggleTheme()
          response = `Theme toggled to ${theme === 'dark' ? 'light' : 'dark'}.`
          break
        default:
          response = `Command not recognized: ${command}`
      }

      if (response) {
        setOutput(prevOutput => [...prevOutput, `$ ${input}`, response])
      }
      setInput('')
    }
  }

  return (
    <div className="bg-white/10 dark:bg-black/40 dark:text-green-400 text-gray-800 p-2 sm:p-4 h-full font-mono text-xs sm:text-sm overflow-hidden flex flex-col backdrop-blur-md">
      <div className="flex-1 overflow-y-auto mb-2 space-y-1">
        {output.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap">{line}</div>
        ))}
      </div>
      <div className="flex items-center">
        <span className="mr-2 font-bold">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleInput}
          className="bg-transparent outline-none flex-1 placeholder-gray-500 dark:placeholder-gray-400"
          autoFocus
          spellCheck="false"
        />
      </div>
    </div>
  )
}

export default Terminal
