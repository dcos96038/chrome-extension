import ReactDOM from 'react-dom/client';
import { App } from './App';
import "../assets/tailwind.css"

const rootContainer = document.createElement('div')
document.body.appendChild(rootContainer)

ReactDOM.createRoot(rootContainer).render(<App />)