import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize scratch cards when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const canvasIds = ['scratchCanvas1', 'scratchCanvas2', 'scratchCanvas3', 'scratchCanvas4'];
  
  canvasIds.forEach(id => {
    const canvas = document.getElementById(id) as HTMLCanvasElement;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas size to match container
        const container = canvas.parentElement;
        if (container) {
          canvas.width = container.clientWidth;
          canvas.height = container.clientHeight;
          
          // Fill with gray overlay
          ctx.fillStyle = '#808080';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          let isDrawing = false;

          canvas.addEventListener('mousedown', () => isDrawing = true);
          canvas.addEventListener('mouseup', () => isDrawing = false);
          canvas.addEventListener('mousemove', (e) => {
            if (!isDrawing) return;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create larger scratch area
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      }
    }
  });
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);