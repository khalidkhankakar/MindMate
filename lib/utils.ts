import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const AI_MODELS: { name: string, id: string }[] = [
  {
    name: 'Llama 3.1 70B',
    id: 'llama-3.1-70b-versatile'
  },
  {
    name: 'Gemma 9B',
    id: 'gemma2-9b-it'
  },
  {
    name: 'Jasper',
    id: 'gemma-7b-it'
  },
  {
    name: 'Llama 3 Groq',
    id: 'llama3-groq-70b-8192-tool-use-preview'
  },
  {
    name: 'Llama 3.2 1B',
    id: 'llama-3.2-1b-preview'
  },
  {
    name: 'Llama 3.5 ',
    id: 'llama-3.2-11b-vision-preview'
  },

  {
    name: 'Llama 3.2 90B',
    id: 'llama-3.2-90b-vision-preview'
  }
  , {
    name: 'Mixtral',
    id: 'mixtral-8x7b-32768'
  }
]

export const DEFAULT_MODEL_ID = 'llama-3.1-70b-versatile'