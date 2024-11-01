import Image from 'next/image'
import { Markdown } from "./markdown"

interface DisplayMessagesProps {
  role: string,
  ModelContent: string,
  userContent:string
}
const DisplayMessages = ({ role, userContent ,ModelContent}: DisplayMessagesProps) => {

  return (
    <div
      className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={` rounded-lg p-3 ${role === 'user'
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-secondary-foreground'
          }`}
      >
        {role === 'assistant' && (
          <Image src={'/logo.png'} width={100} height={100} alt='logo' className='my-2' />
        )}
        {role === 'user' ?
          <p>{userContent}</p>
          :
          <Markdown>{ModelContent as string}</Markdown>
        }
      </div>
    </div>


  )
}

export default DisplayMessages
