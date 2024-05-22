import NextAuth, { Account, Profile, User } from "next-auth"
import Google from "next-auth/providers/google"
import prisma from '@/db/index'



export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      
      return true; 
    },

    async jwt({
      token, account , user
    }){
      if(user){

      const existingUser = await prisma.users.findUnique({
        where: { email: user.email! },
        select: {
          id: true
        }
      });
      if(existingUser){ 
      
        token.id = existingUser.id
        token.oldUser = "true"
      }
      else {
       
        const data = await prisma.users.create({
          data: {
            email: user.email!,
          },
          select:{
            id:true
          }
        });
        token.oldUser = "false"
        token.id = data.id
      }
      
    } 
     
      return token
    }, 

    async session({session, token}){
      session.user.id = token.id
      session.user.email = token.oldUser
     
      return session;
    }
  }
})

