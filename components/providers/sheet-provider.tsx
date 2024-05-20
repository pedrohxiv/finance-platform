"use client";

import { useEffect, useState } from "react";

import { EditAccountSheet } from "@/components/sheets/edit-account-sheet";
import { NewAccountSheet } from "@/components/sheets/new-account-sheet";

export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <EditAccountSheet />
      <NewAccountSheet />
    </>
  );
};
