import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './TreeReply.css'
import TreeReply from './TreeReply'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TreeReply />
  </StrictMode>,
)
