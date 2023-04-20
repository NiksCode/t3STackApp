import { type NextPage } from 'next'
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from 'react';
import { api } from '~/utils/api';

interface Props {
  Text?: string,
}

const Resume: NextPage<Props> = ({}) => {
  const [userNameInput, setUserNameInput] = useState("");
  const util = api.useContext()
  const { data, isLoading, error } = api.example.getUser.useQuery()
  const { mutate } = api.example.createUserName.useMutation({onSuccess: async ()=> {
    await util.example.getUser.invalidate()
  }})

  const { data: resumeData } = api.resume.getResumeByUserName.useQuery({
    userName: data?.userName as string,
  }, {
    enabled: !!data?.userName,
  })

  return <div>
   <div>
   <button
        className="rounded-full bg-black/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={data ? () => void signOut() : () => void signIn()}
      >
        {data ? "Sign out" : "Sign in"}
      </button>
   </div>
   <div>
    {data?.userName ? <h1>{data?.userName}</h1> : 
    <div>
      <p>Please Input Your User Name</p>
      <input type="text" name="userMame" value={userNameInput} onChange={(e)=>setUserNameInput(e.target.value)} />
      <button type='submit' onClick={()=> mutate({userName: userNameInput})}>Submit</button>
    </div>
    }

   </div>

   {resumeData && (
   <div>

    <h1>Resume</h1>

   {
    resumeData.Jobs.map((job)=> (
      <div key={job.id}>
     <p>Title: {job.title}</p>
     <p>Description: {job.description}</p>
     <p>From: {job.yearFrom.toString()}</p>
     <p>To: {job.yearTo.toString()}</p>
      </div>
    )
    )
   }
    
    </div>
   ) }
  
  </div>
}

export default Resume