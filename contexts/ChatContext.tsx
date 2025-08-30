
import React, { createContext, useState, useEffect, useCallback, ReactNode, useRef } from 'react';
import { Person } from '../types.ts';
import { GoogleGenAI, Chat } from '@google/genai';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatContextType {
  person: Person | null;
  isOpen: boolean;
  messages: Message[];
  isLoading: boolean;
  proactivePrompt: string | null;
  toggleChat: () => void;
  sendMessage: (message: string) => Promise<void>;
  triggerProactivePrompt: (message: string) => void;
  acceptProactivePrompt: () => void;
  dismissProactivePrompt: () => void;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode; person: Person | null }> = ({ children, person }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [proactivePrompt, setProactivePrompt] = useState<string | null>(null);
  const chatRef = useRef<Chat | null>(null);
  const isInitialized = useRef(false);

  // Effect to reset the chat state ONLY when the person changes.
  useEffect(() => {
    setIsOpen(false);
    setMessages([]);
    setProactivePrompt(null);
    chatRef.current = null;
    isInitialized.current = false;
  }, [person]);

  const initializeChat = useCallback(async () => {
    if (isInitialized.current) return;

    setIsLoading(true);
    isInitialized.current = true;

    const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
    if (!apiKey) {
      setMessages([{ role: 'model', text: 'The AI assistant is not available. API key is not configured.' }]);
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const personContext = person
        ? `You are an expert AI assistant for ${person.name}, a ${person.title}. Your role is to answer questions from potential recruiters or collaborators concisely and professionally based ONLY on their portfolio information. If a question is outside this scope, politely decline.
          Portfolio Info:
          - About: ${person.about}
          - Core Skills: ${person.coreSkills.join(', ')}
          - Expertise: ${person.expertise.map(e => e.name).join(', ')}
          - Projects: ${[...person.workExperience, ...person.volunteerActivities].map(p => `${p.title}: ${p.description}`).join('; ')}`
        : `You are a helpful AI assistant for the OLAK interactive portfolio, which showcases Olabode Ilesanmi and Aisha Kadir. Olabode is a Technical Executive Assistant & Developer. Aisha is a Creative Designer. Your role is to help visitors navigate the portfolio.`;
      
      const systemInstruction = `${personContext} Start the conversation by introducing yourself and offering help.`;

      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { systemInstruction },
      });
    } catch (error) {
      console.error("Failed to initialize AI chat:", error);
      setMessages([{ role: 'model', text: 'Failed to initialize AI assistant.' }]);
    } finally {
      setIsLoading(false);
    }
  }, [person]);

  useEffect(() => {
    // This effect handles sending the initial greeting message when the chat is opened manually.
    if (isOpen && messages.length === 0) {
      const sendInitialMessage = async () => {
        if (!isInitialized.current) {
          await initializeChat();
        }
        const initialMessageText = person
          ? `Hello! I'm ${person.name.split(' ')[0]}'s AI assistant. How can I help you learn more about their skills and experience?`
          : `Hello! I'm the AI assistant for the OLAK portfolio. Ask me about Olabode or Aisha.`;
        setMessages([{ role: 'model', text: initialMessageText }]);
      };
      sendInitialMessage();
    }
  }, [isOpen, person, messages.length, initializeChat]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (proactivePrompt) {
      setProactivePrompt(null); // Dismiss prompt if user opens/closes chat manually
    }
  }, [proactivePrompt]);

  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || !chatRef.current) return;

    const userMessage: Message = { role: 'user', text: messageText };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await chatRef.current.sendMessage({ message: messageText });
      const modelMessage: Message = { role: 'model', text: response.text };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Error sending message to Gemini:", error);
      const errorMessage: Message = { role: 'model', text: 'Sorry, I encountered an error. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const triggerProactivePrompt = useCallback((message: string) => {
    if (!isOpen) {
      setProactivePrompt(message);
    }
  }, [isOpen]);
  
  const dismissProactivePrompt = useCallback(() => {
    setProactivePrompt(null);
  }, []);

  const acceptProactivePrompt = useCallback(() => {
    if (!proactivePrompt) return;

    const openWithProactiveMessage = async () => {
      if (!isInitialized.current) {
        await initializeChat();
      }
      // Set the proactive message as the first and only message in the chat history
      setMessages([{ role: 'model', text: proactivePrompt }]);
      setIsOpen(true);
      setProactivePrompt(null);
    };

    openWithProactiveMessage();
  }, [proactivePrompt, initializeChat]);

  const value = { person, isOpen, messages, isLoading, proactivePrompt, toggleChat, sendMessage, triggerProactivePrompt, acceptProactivePrompt, dismissProactivePrompt };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
