import { auth } from "@/auth";
import UserProfile from "@/components/UserProfile";
import TherapistVisitProfile from "@/components/TherapistVisitProfile";
import UserVisitProfile from "@/components/UserVisitProfile";

export default async function page({ params }: { params: { id: string } }) {
  const session = await auth();
  const isUser = session?.user?.id === params.id;

  return (
    <div>
      {isUser && <UserProfile />}

      {!isUser && <UserVisitProfile userId={params.id} />}
    </div>
  );
}
