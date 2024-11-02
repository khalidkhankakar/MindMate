import { ChatRequestOptions, CreateMessage, Message } from 'ai';
import React from 'react'
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { ArrowUp, Send, Square } from 'lucide-react';


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


    const submitForm = () => {
        handleSubmit()
    }


    return (
        <form className='w-full flex items-end border-2 border-gray-400 flex-col focus:ring-1 focus:ring-black justify-end p-1 rounded-md'>
            <Textarea
                value={input}
                placeholder='Ask from MindMate...'
                className='flex-1 border-none outline-none font-lg placeholder:font-semibold placeholder:truncate '
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                rows={2}
                onKeyDown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        if (!isLoading) {
                            submitForm();
                        }
                    }
                }}
            />

            {
                isLoading ?

                    <Button
                        variant={'secondary'}
                        className='h-full bg-gray-300 '
                        onClick={(e) => {
                            e.preventDefault();
                            stop()
                        }}>

                        <Square size={19} className='text-black bg-black' />
                    </Button>

                    : <Button
                        variant={'secondary'}
                        className='h-full bg-gray-300 ' onClick={(e) => {
                            e.preventDefault();
                            submitForm()

                        }}>
                        <ArrowUp size={19} className='text-gray-500' />
                    </Button>
            }
        </form>
    )
}

export default ChatTextarea
