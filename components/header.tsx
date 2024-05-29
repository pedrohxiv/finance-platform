"use client";

import { ClerkLoaded, ClerkLoading, UserButton, useUser } from "@clerk/nextjs";
import { format, subDays } from "date-fns";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { useMedia } from "react-use";

import { getAccounts } from "@/actions/get-accounts";
import { getSummary } from "@/actions/get-summary";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, formatDateRange } from "@/lib/utils";

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

  const { data, isLoading: accountsIsLoading } = getAccounts();
  const { isLoading: summaryIsLoading } = getSummary();

  const isMobile = useMedia("(max-width: 1024px)", false);
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const accountId = params.get("accountId");
  const from = params.get("from") || "";
  const to = params.get("to") || "";

  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const paramState = {
    from: from ? new Date(from) : defaultFrom,
    to: to ? new Date(to) : defaultTo,
  };

  const [date, setDate] = useState<DateRange | undefined>(paramState);

  const handleClick = (href: string) => {
    router.push(href);

    setIsOpen(false);
  };

  const handleChange = (newValue: string) => {
    const query = { accountId: newValue, from, to };

    if (newValue === "all") {
      query.accountId = "";
    }

    const url = qs.stringifyUrl(
      { url: pathname, query },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const pushToUrl = (dateRange: DateRange | undefined) => {
    const query = {
      accountId,
      from: format(dateRange?.from || defaultFrom, "yyyy-MM-dd"),
      to: format(dateRange?.to || defaultTo, "yyyy-MM-dd"),
    };

    const url = qs.stringifyUrl(
      { url: pathname, query },
      { skipNull: true, skipEmptyString: true }
    );

    router.push(url);
  };

  const handleReset = () => {
    setDate(undefined);
    pushToUrl(undefined);
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
        <div className="flex fle-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2">
          <Select
            value={accountId || "all"}
            onValueChange={handleChange}
            disabled={accountsIsLoading || summaryIsLoading}
          >
            <SelectTrigger className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition">
              <SelectValue
                placeholder="Select account"
                className="cursor-pointer"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All accounts</SelectItem>
              {data?.map((account) => (
                <SelectItem
                  key={account.id}
                  value={account.id}
                  className="cursor-pointer"
                >
                  {account.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                disabled={accountsIsLoading || summaryIsLoading}
                size="sm"
                variant="outline"
                className="lg:w-auto w-full h-9 rounded-md px-3 font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus:ring-offset-0 focus:ring-transparent outline-none text-white focus:bg-white/30 transition"
              >
                <span>{formatDateRange(paramState)}</span>
                <ChevronDown className="ml-2 size-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-auto w-full p-0" align="start">
              <Calendar
                disabled={accountsIsLoading || summaryIsLoading}
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
              <div className="p-4 w-full flex items-center gap-x-2">
                <PopoverClose asChild>
                  <Button
                    onClick={handleReset}
                    disabled={!date?.from || !date?.to}
                    className="w-full"
                    variant="outline"
                  >
                    Reset
                  </Button>
                </PopoverClose>
                <PopoverClose asChild>
                  <Button
                    onClick={() => pushToUrl(date)}
                    disabled={!date?.from || !date?.to}
                    className="w-full"
                  >
                    Apply
                  </Button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
};
