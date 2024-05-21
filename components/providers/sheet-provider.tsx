"use client";

import { useEffect, useState } from "react";

import { EditAccountSheet } from "@/components/sheets/edit-account-sheet";
import { EditCategorySheet } from "@/components/sheets/edit-category-sheet";
import { NewAccountSheet } from "@/components/sheets/new-account-sheet";
import { NewCategorySheet } from "@/components/sheets/new-category-sheet";

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
      <EditCategorySheet />
      <NewAccountSheet />
      <NewCategorySheet />
    </>
  );
};
