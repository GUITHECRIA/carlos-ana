import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';

interface Step {
  id: number;
  type: 'welcome' | 'quiz' | 'drawing' | 'photo-upload' | 'love-meter' | 'scratch-photo';
  content: {
    title?: string;
    question?: string;
    options?: string[];
    correctAnswer?: string;
    image?: string;
  };
}

const steps: Step[] = [
  {
    id: 1,
    type: 'welcome',
    content: {
      title: 'Bem-vinda de volta, meu amor!'
    }
  },
  {
    id: 2,
    type: 'scratch-photo',
    content: {
      image: 'https://i.pinimg.com/736x/62/5b/c4/625bc476d3d9c1922ed63df130e7d9ef.jpg'
    }
  },
  {
    id: 3,
    type: 'quiz',
    content: {
      question: 'Quando foi nosso primeiro "encontro"?',
      options: ['7 de Julho', '1 de Abril', '2 de Outubro'],
      correctAnswer: '2 de Outubro'
    }
  },
  {
    id: 4,
    type: 'scratch-photo',
    content: {
      image: 'https://i.pinimg.com/736x/39/01/6a/39016a95e02b78722ef73c09106464af.jpg'
    }
  },
  {
    id: 5,
    type: 'drawing',
    content: {
      title: 'Faça um desenho especial'
    }
  },
  {
    id: 6,
    type: 'scratch-photo',
    content: {
      image: 'https://i.pinimg.com/736x/05/79/35/057935bb5dfea08b70116b8a30bb8518.jpg'
    }
  },
   {
    id: 7,
    type: 'quiz',
    content: {
      question: 'Qual foi o primeiro filme que a gente assitiu juntos ?',
        options:['Moana 2 ', 'Transformes','Meu malvado favorito 4'],
        correctAnswer:'Meu malvado favorito 4'
    }
  },
  {
    id: 8,
    type: 'photo-upload',
    content: {
      title: 'Adicione a Foto nossa que você mais ama'
    }
  },
  {
    id: 9,
    type: 'scratch-photo',
    content: {
      image: 'https://i.pinimg.com/736x/62/1c/79/621c79a44a62a3e585e35ca28a4fdf4e.jpg'
    }
  },
  {
    id: 10,
    type: 'quiz',
    content: {
      question: 'Quando é o aniversario da pessoa mais especial desse mundo?',
      options: ['30 de Novembro', '12 de Setembro','27 de Outubro'],
      correctAnswer: '27 de Outubro'
    }
  },
  {
    id: 11,
    type: 'scratch-photo',
    content: {
      image: 'https://i.pinimg.com/736x/d2/c1/cb/d2c1cbfd6305aada144e9418f610244c.jpg'
    }
  },
  {
    id: 12,
    type: 'love-meter',
    content: {
      title: 'O quanto você ama este belo rapaz?',
      image: 'https://i.pinimg.com/736x/56/aa/38/56aa38481d6b0f50c23504f88eb3f7ed.jpg'
    }
  },
  {
    id: 13,
    type: 'scratch-photo',
    content: {
      image: 'https://i.pinimg.com/736x/bc/1b/34/bc1b34c5e603c3274042af669c21e346.jpg'
    }
  },
  {
    id: 14,
    type: 'quiz',
    content: {
      question: 'Quem sempre tem razão?',
      options: ['Ana', 'Carlos', 'Gabi'],
      correctAnswer: 'Carlos'
    }
  }
];

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [loveLevel, setLoveLevel] = useState(50);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }

    if (scratchCanvasRef.current && steps[currentStep].type === 'scratch-photo') {
      const canvas = scratchCanvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [currentStep]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setLastPos({ x, y });
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.beginPath();
      ctx.moveTo(lastPos.x, lastPos.y);
      ctx.lineTo(x, y);
      ctx.stroke();
      setLastPos({ x, y });
    }
  };

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = scratchCanvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedAnswer(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const renderStep = (step: Step) => {
    switch (step.type) {
      case 'welcome':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-8">
              {step.content.title}
            </h1>
          </motion.div>
        );

      case 'scratch-photo':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md mx-auto"
          >
            <div className="relative w-full h-64 border-2 border-rose-200 rounded-lg overflow-hidden">
              <img
                src={step.content.image}
                alt="Hidden"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <canvas
                ref={scratchCanvasRef}
                width={400}
                height={256}
                onMouseMove={(e) => e.buttons === 1 && handleScratch(e)}
                onTouchMove={(e) => {
                  e.preventDefault();
                  const touch = e.touches[0];
                  const mouseEvent = new MouseEvent('mousemove', {
                    clientX: touch.clientX,
                    clientY: touch.clientY,
                    buttons: 1
                  });
                  e.currentTarget.dispatchEvent(mouseEvent);
                }}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none"
              />
            </div>
            <p className="mt-4 text-center text-gray-600">
              Raspe para revelar a foto
            </p>
          </motion.div>
        );

      case 'quiz':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {step.content.question}
            </h2>
            <div className="space-y-4">
              {step.content.options?.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full py-3 px-6 rounded-full transition-colors ${
                    selectedAnswer === option
                      ? 'bg-rose-500 text-white'
                      : 'bg-rose-100 hover:bg-rose-200 text-rose-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {selectedAnswer && (
              <p className="mt-4 text-center text-lg font-medium">
                {selectedAnswer === step.content.correctAnswer
                  ? '✨ Acertou Amooor! ✨'
                  : '❤️ Errou Anjinha ❤️'}
              </p>
            )}
          </motion.div>
        );

      case 'drawing':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {step.content.title}
            </h2>
            <div className="relative border-2 border-rose-200 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                width={400}
                height={300}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="bg-white w-full touch-none"
              />
            </div>
            <button
              onClick={clearCanvas}
              className="mt-4 px-4 py-2 bg-rose-100 text-rose-600 rounded-full hover:bg-rose-200 transition-colors"
            >
              Limpar Desenho
            </button>
          </motion.div>
        );

      case 'photo-upload':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {step.content.title}
            </h2>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              {uploadedImage && (
                <div className="mt-4">
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          </motion.div>
        );

      case 'love-meter':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md mx-auto"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {step.content.title}
            </h2>
            <div className="space-y-6">
              <img
                src={step.content.image}
                alt="Love"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={loveLevel}
                  onChange={(e) => setLoveLevel(parseInt(e.target.value))}
                  className="w-full h-2 bg-rose-200 rounded-lg appearance-none cursor-pointer"
                />
                <p className="text-center text-lg font-medium">
                  Nível de amor: {loveLevel}%
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <AnimatePresence mode="wait">
          {renderStep(steps[currentStep])}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Heart className="w-5 h-5" />
                <span>Finalizar</span>
              </>
            ) : (
              <>
                <span>Próximo</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default App;