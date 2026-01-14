import React, { useState, useRef, useEffect } from 'react';
import { generateResponse } from '../services/geminiService';
import { Message } from '../types';

interface ChatWidgetProps {
  isOpen: boolean;
  toggleChat: () => void;
}

const STORAGE_KEY = 'facilco_chat_history';

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, toggleChat }) => {
  // Initialize messages from localStorage or default
  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      if (savedMessages) {
        return JSON.parse(savedMessages);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }

    return [
      {
        id: 'welcome',
        text: "Olá! Sou o assistente virtual da Facilco Engenharia. 🏗️\n\nPosso ajudar com:\n- Diagnóstico visual de danos (envie uma foto!)\n- Dúvidas sobre Normas (NRs)\n- Especificações de produtos\n\nComo posso ajudar sua obra hoje?",
        isUser: false,
        timestamp: Date.now()
      }
    ];
  });

  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Image State
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Save to localStorage whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.warn("Could not save chat history to localStorage:", error);
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      // Scroll to bottom when opening to show latest messages
      if (chatMessagesRef.current) {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
      }
    }
  }, [isOpen]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages, isTyping, selectedImage]);

  // Handle File Selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        // Extract strictly the base64 data part for the API
        // But keep the full string for preview
        setSelectedImage(base64String);
        setImageMimeType(file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImageMimeType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() && !selectedImage) return;

    const userText = inputText.trim();
    const currentImage = selectedImage;
    const currentMime = imageMimeType;

    // Create User Message
    const newMessage: Message = {
      id: Date.now().toString(),
      text: userText,
      isUser: true,
      timestamp: Date.now(),
      image: currentImage || undefined
    };

    setMessages(prev => [...prev, newMessage]);

    // Reset Input State immediately
    setInputText('');
    setSelectedImage(null);
    setImageMimeType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    setIsTyping(true);

    try {
      // Prepare Base64 for API (remove data:image/xxx;base64, prefix)
      let apiBase64: string | undefined = undefined;
      if (currentImage) {
        apiBase64 = currentImage.split(',')[1];
      }

      const responseText = await generateResponse(userText, apiBase64, currentMime || undefined);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isUser: false,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error generating response", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro ao processar sua solicitação.",
        isUser: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to generate and print PDF
  const generatePDF = (content: string, image?: string) => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Clean up content for print (remove the whatsapp button link)
    const cleanContent = window.marked ? window.marked.parse(content) : content;

    const date = new Date().toLocaleDateString('pt-BR');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Laudo Técnico - Facilco</title>
        <style>
          body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; padding: 40px; }
          .header { text-align: center; border-bottom: 3px solid #FFB400; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #1A1A1A; }
          .logo span { color: #FFB400; }
          .meta { font-size: 12px; color: #666; margin-top: 10px; }
          .content { background: #fff; padding: 20px; border: 1px solid #eee; }
          .content h2 { color: #1A1A1A; border-bottom: 1px solid #FFB400; padding-bottom: 10px; display: inline-block; }
          .content strong { color: #000; }
          .footer { margin-top: 50px; font-size: 10px; text-align: center; color: #999; border-top: 1px solid #eee; padding-top: 20px; }
          .warning { background: #fff3cd; color: #856404; padding: 10px; border: 1px solid #ffeeba; font-size: 11px; margin-top: 20px; }
          .image-evidence { text-align: center; margin: 20px 0; }
          .image-evidence img { max-width: 300px; border: 2px solid #FFB400; }
          @media print {
            body { -webkit-print-color-adjust: exact; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo"><i class="fas fa-industry"></i> FACILCO <span>ENGENHARIA</span></div>
          <div class="meta">Relatório Gerado em: ${date}</div>
        </div>

        ${image ? `
        <div class="image-evidence">
            <p style="font-size: 10px; font-weight: bold; text-transform: uppercase;">Evidência Fotográfica</p>
            <img src="${image}" alt="Evidência" />
        </div>
        ` : ''}

        <div class="content">
          ${cleanContent}
        </div>

        <div class="warning">
          <strong>Aviso Legal:</strong> Este documento é um pré-laudo preliminar gerado por inteligência artificial para fins de orçamento e identificação inicial de riscos. Não substitui um laudo técnico oficial assinado por um Engenheiro de Segurança do Trabalho (ART).
        </div>

        <div class="footer">
          Facilco Engenharia - Soluções Industriais e Corporativas<br>
          (19) 99622-3433 | engenharia@facilco.com.br
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const renderMessageContent = (msg: Message) => {
    const html = window.marked ? window.marked.parse(msg.text) : msg.text;

    // Check if it's a "Pré-Laudo"
    const isReport = msg.text.includes("PRÉ-LAUDO TÉCNICO PRELIMINAR");

    // Find the user image associated with this context (simple heuristic: previous message was user with image)
    // However, for simplicity, we pass undefined if we can't easily link it in this render function without context.
    // In a production app, we would link the reply to the original message ID.
    // Here we will check if the user sent an image in the PREVIOUS message index if this is a bot message.
    const msgIndex = messages.findIndex(m => m.id === msg.id);
    const prevMsg = msgIndex > 0 ? messages[msgIndex - 1] : null;
    const reportImage = prevMsg?.isUser && prevMsg?.image ? prevMsg.image : undefined;

    return (
      <div className="flex flex-col gap-2">
        {msg.image && (
          <div className="mb-2 rounded-lg overflow-hidden border border-gray-200">
            <img src={msg.image} alt="User upload" className="max-w-full h-auto max-h-48 object-cover" />
          </div>
        )}

        {msg.text && (
          msg.isUser
            ? <div>{msg.text}</div>
            : (
              <div className="relative">
                <div dangerouslySetInnerHTML={{ __html: html }} />
                {isReport && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => generatePDF(msg.text, reportImage)}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2 px-4 rounded transition shadow-sm uppercase tracking-wide"
                    >
                      <i className="fas fa-file-pdf"></i> Baixar PDF do Laudo (Oficial)
                    </button>
                    <p className="text-[10px] text-gray-400 text-center mt-2">
                      *Gera um documento para aprovação de budget.
                    </p>
                  </div>
                )}
              </div>
            )
        )}
      </div>
    );
  };

  // Add functionality to clear history
  const clearHistory = () => {
    if (confirm('Deseja limpar o histórico da conversa?')) {
      localStorage.removeItem(STORAGE_KEY);
      setMessages([{
        id: 'welcome',
        text: "Olá! Sou o assistente virtual da Facilco Engenharia. 🏗️\n\nPosso ajudar com:\n- Diagnóstico visual de danos (envie uma foto!)\n- Dúvidas sobre Normas (NRs)\n- Especificações de produtos\n\nComo posso ajudar sua obra hoje?",
        isUser: false,
        timestamp: Date.now()
      }]);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-24 right-6 bg-brand-dark text-brand-yellow p-4 rounded-full shadow-2xl hover:bg-gray-800 transition z-40 border-2 border-brand-yellow group ${isOpen ? 'hidden' : 'block'}`}
      >
        <i className="fas fa-robot text-2xl group-hover:scale-110 transition-transform"></i>
        <span className="absolute right-full top-1/2 -translate-y-1/2 mr-3 bg-white text-brand-dark px-3 py-1 rounded shadow-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Consultor IA & Vision 👁️
        </span>
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-96 max-w-[90vw] h-[600px] bg-white rounded-lg shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border border-gray-200 overflow-hidden font-sans ${isOpen ? 'translate-y-0' : 'translate-y-[120%]'}`}
      >

        {/* Chat Header */}
        <div className="bg-brand-dark p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-yellow rounded-full flex items-center justify-center text-brand-dark relative">
              <i className="fas fa-eye text-xl"></i>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
            </div>
            <div>
              <h3 className="font-bold text-sm font-display tracking-wider">Agente Facilco</h3>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-400">Online</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={clearHistory} className="text-gray-400 hover:text-white transition" title="Limpar Histórico">
              <i className="fas fa-trash-alt text-xs"></i>
            </button>
            <button onClick={toggleChat} className="text-gray-400 hover:text-white transition">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div id="chatMessages" ref={chatMessagesRef} className="flex-1 overflow-y-auto p-4 bg-gray-50 chat-scroll flex flex-col gap-3">
          {messages.map((msg) => (
            <div key={msg.id} className={`max-w-[85%] chat-message ${msg.isUser ? 'self-end' : 'self-start'}`}>
              <div className={`p-3 rounded-lg shadow-sm text-sm ${msg.isUser
                  ? 'bg-brand-dark text-white rounded-tr-none'
                  : 'bg-white border border-gray-100 text-gray-700 rounded-tl-none prose prose-sm max-w-none'
                }`}>
                {renderMessageContent(msg)}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="self-start max-w-[85%] chat-message">
              <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm border border-gray-100 flex gap-1 items-center h-10">
                <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce [animation-delay:-0.32s]"></div>
                <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce [animation-delay:-0.16s]"></div>
                <div className="w-2 h-2 bg-brand-yellow rounded-full animate-bounce"></div>
              </div>
            </div>
          )}

          {/* Quick Action: Analyze Problem */}
          {messages.length < 3 && !selectedImage && (
            <div className="self-center my-4">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-white border border-brand-yellow text-brand-dark hover:bg-brand-yellow hover:text-white transition rounded-full px-4 py-2 text-xs font-bold shadow-md flex items-center gap-2"
              >
                <i className="fas fa-camera text-brand-yellow group-hover:text-white"></i>
                Analisar meu Problema (Foto)
              </button>
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="p-4 bg-white border-t border-gray-100">

          {/* Image Preview */}
          {selectedImage && (
            <div className="mb-3 relative inline-block">
              <img src={selectedImage} alt="Preview" className="h-20 w-auto rounded border border-gray-300 shadow-sm" />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md hover:bg-red-600 transition"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          )}

          <form onSubmit={handleSendMessage} className="relative flex items-center gap-2">

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-gray-400 hover:text-brand-dark transition p-2"
              title="Analisar foto"
            >
              <i className="fas fa-camera"></i>
            </button>

            <input
              type="text"
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={selectedImage ? "Descreva o problema (opcional)..." : "Digite ou envie uma foto..."}
              className="flex-1 bg-gray-100 text-gray-800 text-sm rounded-full pl-4 pr-10 py-3 focus:outline-none focus:ring-2 focus:ring-brand-yellow transition"
              disabled={isTyping}
            />

            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-brand-yellow text-brand-dark rounded-full flex items-center justify-center hover:bg-yellow-500 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isTyping || (!inputText.trim() && !selectedImage)}
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </form>
          <p className="text-[10px] text-gray-400 text-center mt-2">IA com visão computacional.</p>
        </div>
      </div>
    </>
  );
};

export default ChatWidget;