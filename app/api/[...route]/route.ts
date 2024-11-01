import { handle } from 'hono/vercel';
import { convertToCoreMessages, streamText, Message } from 'ai';
import { Hono } from 'hono';
// import { streamText } from 'hono/streaming';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { saveChat } from '@/lib/db/queries';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});



const app = new Hono({
  strict: false
}).basePath('/api')


app.post('/chat', async (c) =>{
      const { id, messages, userId }: { id: string, messages: Array<Message>, userId?:string } = await c.req.json();
      const coreMessages = convertToCoreMessages(messages);
      const result = await streamText({
        model: groq('llama-3.1-70b-versatile'),
        system:
          'you are a friendly assistant! keep your responses concise and helpful.',
        messages: coreMessages,
        onStepFinish: async (step) => {

          if (userId) {
            try {
              await saveChat({chatId: id, messages:[...coreMessages, ...step.response.messages], userId})
            } catch (error) {
              console.error('Failed to create a chat', error)
            }
            console.log(JSON.stringify(step.response, null, 2))
          }
        },
      });
     return result.toDataStreamResponse({})
    }
)

app.post('/hello', (c) => c.text('Hello World'))


const handler = handle(app);
export { handler as GET, handler as POST, handler as DELETE, handler as PUT }
