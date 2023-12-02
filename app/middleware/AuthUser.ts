import { useSession } from "next-auth/react";

export const dynamic = "force-dynamic";

const AuthUser = async (req) => {
  const { data: session } = useSession();

  if (!session) return false;
  return session.user;
};

export default AuthUser;
