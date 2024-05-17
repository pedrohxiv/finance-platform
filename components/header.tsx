"use client";

import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useMedia } from "react-use";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const routes = [
  { href: "/", label: "Overview" },
  { href: "/transactions", label: "Transactions" },
  { href: "/accounts", label: "Accounts" },
  { href: "/categories", label: "Categories" },
  { href: "/settings", label: "Settings" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { isLoaded, user } = useUser();

  const isMobile = useMedia("(max-width: 1024px)", false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);

    setIsOpen(false);
  };

  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <Link href="/">
              <div className="hidden lg:flex items-center">
                <Image
                  src="/logo.svg"
                  height={28}
                  width={28}
                  alt="Logo"
                  priority
                />

                <h1 className="font-semibold text-2xl text-white ml-2.5">
                  Finance
                </h1>
              </div>
            </Link>
            {isMobile ? (
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                  >
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="px-2">
                  <nav className="flex flex-col gap-y-2 pt-6">
                    {routes.map((route) => (
                      <Button
                        variant={
                          pathname === route.href ? "secondary" : "ghost"
                        }
                        className="w-full justify-start"
                        key={route.href}
                        onClick={() => handleClick(route.href)}
                      >
                        {route.label}
                      </Button>
                    ))}
                  </nav>
                </SheetContent>
              </Sheet>
            ) : (
              <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
                {routes.map((route) => (
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className={cn(
                      "w-full lg:w-auto justify-between font-normal hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition",
                      pathname === route.href
                        ? "bg-white/10 text-white"
                        : "bg-transparent"
                    )}
                    key={route.href}
                  >
                    <Link href={route.href}>{route.label}</Link>
                  </Button>
                ))}
              </nav>
            )}
          </div>
          <ClerkLoading>
            <Skeleton className="rounded-full size-7" />
          </ClerkLoading>
          <ClerkLoaded>
            <UserButton afterSignOutUrl="/" />
          </ClerkLoaded>
        </div>
        <div className="space-y-2 mb-4">
          <h2 className="font-medium text-2xl lg:text-4xl text-white">
            Welcome back{isLoaded ? ", " : " "}
            {user?.firstName}
          </h2>
          <p className="text-sm lg:text-base text-[#89B6FD]">
            This is your Financial Overview Report
          </p>
        </div>
      </div>
    </header>
  );
};
