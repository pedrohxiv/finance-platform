import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";

const SignInPage = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="flex items-center justify-center">
          <ClerkLoading>
            <Skeleton className="h-[454px] w-[400px] shadow-2xl" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
        </div>
      </div>
      <div className="h-full bg-blue-600 hidden lg:flex flex-col items-center justify-center">
        <Image src="/logo.svg" height={100} width={100} alt="Logo" priority />
        <h1 className="font-bold text-3xl text-white mt-4">Finance</h1>
      </div>
    </div>
  );
};

export default SignInPage;
