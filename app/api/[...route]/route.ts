import { handle } from 'hono/vercel';
import { convertToCoreMessages, streamText, Message } from 'ai';
import { Hono } from 'hono';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { deleteChatById, getAllChatsByUserId, saveChat } from '@/lib/db/queries';
import { revalidatePath } from 'next/cache';

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});



const app = new Hono({
  strict: false
}).basePath('/api')



app.post('/chat', async (c) => {
  const { id, messages, userId, model }: { id: string, messages: Array<Message>, userId?: string, model:string } = await c.req.json();
  const coreMessages = convertToCoreMessages(messages);
  const result = await streamText({
    model: groq(model),
    system:
      'you are a friendly assistant! keep your responses concise and helpful.',
    messages: coreMessages,
    onStepFinish: async (step) => {

      if (userId) {
        try {
          await saveChat({ chatId: id, messages: [...coreMessages, ...step.response.messages], userId })
        } catch (error) {
          throw error
        }
      }
    },
  });
  return result.toDataStreamResponse({})
}
)

app.delete('/chat/:id', async (c) => {
  const chatId = c.req.param("id");

  if (!chatId) {
    return c.json({ error: 'chatId is required' }, 400);
  }
  try {
    await deleteChatById({ id: chatId });
    revalidatePath(`/chat/${chatId}`);
    revalidatePath('/')
    return c.json({ message: 'Chat deleted successfully' }, 200);
  } catch (error) {
    return c.json({ error: 'Failed to delete chat' }, 500);
  }
})


app.get('/chat/:id', async (c) => {
  const userId = c.req.param("id");
  try {
    const chats = await getAllChatsByUserId({ userId })
    return c.json(chats)
  } catch (error) {
    throw error
  }
})


const handler = handle(app);
export { handler as GET, handler as POST, handler as DELETE, handler as PUT }
