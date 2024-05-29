
import React from 'react'
import MiniCard from '@/components/MiniCard'
import {Checkbox} from "@nextui-org/checkbox";
import prisma from '@/db';
import {Input} from "@nextui-org/input";
import { getTherapists } from "@/actions/getTherapist"
import { Button } from '@nextui-org/button';
import dynamic from 'next/dynamic';

interface Therapist {
  id: string,
  sessionCost: string,
  sessionMode: string,
  profilePic: string,
  name: string, 
  meetDuration: string, 
  experience: string,
  stars: number
}

interface PageProps {
  sessionCost?: string,
  sessionMode?: string,
  meetDuration?: string, 
  experience?: string,
  stars?: string 
}

function cleanObject<T>(obj: T): T {
  for (const key in obj) {
    if (obj[key] === undefined || obj[key] === '') {
      delete obj[key];
    }
  }
  return obj;
}

 async function page({searchParams}:{searchParams:PageProps}) {
  
  //console.log('searchp',searchParams)
  let Object = {}
  const cleanedSearchParams = cleanObject(searchParams);
  if(cleanedSearchParams.stars)
  Object = {...cleanedSearchParams, stars: Number(searchParams?.stars)}
  else 
  Object = {...cleanedSearchParams}
 // console.log(Object)
  const therapists = await prisma?.therapists.findMany({
    where: {
      ...Object
    },
    select: {
      id: true,
      sessionCost: true,
      sessionMode: true,
      profilePic: true,
      name: true,
      meetDuration: true,
      experience: true,
      stars: true,
    },
  });
    
  return (
    <div className='flex sm:flex-row justify-center gap-2 flex-col h-full w-full '>
        <div className='hidden sm:flex flex-col mt-5' id='filters'>
            <h1 className='text-3xl w-full text-center'>Filters</h1>
            <form action={getTherapists}  className=' flex flex-col gap-2 bg-white p-2 rounded-md'>
             <Input className=' border-slate-950 border-1 rounded-md' name='sessionCost' type='text' placeholder='Enter each session cost'/>

             <Input name='sessionMode'  className=' border-slate-950 border-1 rounded-md' type='text' placeholder='Enter session mode'/>
               
                

             <Input name='meetDuration'  className=' border-slate-950 border-1 rounded-md' type="text" placeholder='Enter meet duration'/>

             <Input name='experience' className=' border-slate-950 border-1 rounded-md'
             type='text' placeholder='Enter experience'/>

             <Input name='stars' className=' border-slate-950 border-1 rounded-md' type="text" placeholder='Enter stars'/>
             <Button 
             type='submit'
             >
              Submit
             </Button>
            </form>
        </div>
        
        <div className='flex flex-col' id='result'>
          {therapists.map(therapist=>
           <MiniCard key={therapist.id}  therapist={therapist} />
          )}
        </div>
         
    </div>
  )
}

export default page