import ReactDOM from 'react-dom/client';
import "../assets/tailwind.css"
import { App } from './App';

const rootContainer = document.createElement('div')
document.body.appendChild(rootContainer)

ReactDOM.createRoot(rootContainer).render(<App />)