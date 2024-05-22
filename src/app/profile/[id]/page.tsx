import { auth } from "@/auth"

export default  async function page({params}:{params:{id:string}}) {
    const session = await auth()
    const isUser = session?.user?.id=== params.id;
   
    
    


  return (
    <div>
        {isUser && params.id}
        {!isUser && 
        <div>
            visiting {params.id}
        </div>}
    </div>

  )
}
