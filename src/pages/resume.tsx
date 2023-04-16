import { type NextPage } from 'next'
import { signIn, signOut, useSession } from "next-auth/react";

interface Props {
  Text?: string,
}

const Resume: NextPage<Props> = ({}) => {
  const { data: sessionData } = useSession();

  console.log('sessionData', sessionData)

  return <div>
   <div>
   <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
   </div>
   <div>
    <h1>Nik Polovenko</h1>
   </div>
   <div>
    <h1>Resume</h1>
   </div>
   <div style={{border: 'solid 1px blue', width: '100vw'}}>
    
   </div>
  </div>
}

export default Resume