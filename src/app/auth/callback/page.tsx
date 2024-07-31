"use client";

import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { checkAuthStatus } from "./action";

const CallbackPage = () => {
  const router = useRouter();
  const { user, isLoading: checkingAuth } = useKindeBrowserClient();
  const { data } = useQuery({
    queryKey: ["authCheck"],
    queryFn: async () => await checkAuthStatus(),
  });

  useEffect(() => {
    if (!checkingAuth) {
      if (data?.success && user) {
        router.push("/");
      } else if (!user) {
        router.push("/");
      }
    }
  }, [router, checkingAuth, user, data]);

  if (checkingAuth || !data?.success) {
    return (
      <div className='mt-20 w-full flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader className='w-10 h-10 animate-spin text-muted-foreground' />
          <h3 className='text-xl font-bold'>Redirecting...</h3>
          <p>Please wait...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default CallbackPage;
