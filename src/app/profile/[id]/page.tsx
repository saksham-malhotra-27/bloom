import { auth } from "@/auth"
import UserProfile from "@/components/UserProfile";

export default  async function page({params}:{params:{id:string}}) {
    const session = await auth()
    const isUser = session?.user?.id=== params.id;
   
    
    


  return (
    <div>

        {isUser && <UserProfile/>}








        {!isUser && 
        <div>
            visiting {params.id}
        </div>}
    </div>

  )
}
