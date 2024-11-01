import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import React from 'react'
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Send, Square } from 'lucide-react';


interface ChatTextareaProps {
    input: string,
    setInput: (value: string) => void,
    handleSubmit: (
        event?: {
            preventDefault?: () => void;
        },
        chatRequestOptions?: ChatRequestOptions
    ) => void,
    isLoading: boolean,
    stop: () => void
    append: (
        message: Message | CreateMessage,
        chatRequestOptions?: ChatRequestOptions
    ) => Promise<string | null | undefined>,
    messages: Array<Message>
}
const ChatTextarea = ({
    input,
    setInput,
    handleSubmit,
    isLoading,
    stop,
    append,
    messages,

}: ChatTextareaProps) => {


    const submitForm = ()=>{
        handleSubmit()
    }


    return (
        <form className=' w-full flex items-center '>
            <Textarea
                value={input}
                placeholder='Ask from MindMate...'
                className='flex-1 border-none '
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                rows={2}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();

                        if (isLoading) {
                            console.log('Please wait for the model to finish its response!');
                        } else {
                            submitForm();
                        }
                    }
                }}
            />

            {
                isLoading ?

                    <Button
                    className='h-full'
                    onClick={(e) => {
                        e.preventDefault();
                        stop()
                    }}>
                        <Square size={22} className='text-black bg-black' />
                    </Button>

                    : <Button
                    className='h-full' onClick={(e) => {
                        e.preventDefault();
                        submitForm()
                        
                    }}>
                        <Send size={22} />
                    </Button>
            }
        </form>
    )
}

export default ChatTextarea
