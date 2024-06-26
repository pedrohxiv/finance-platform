"use client";

import { useEffect, useState } from "react";

import { EditAccountSheet } from "@/components/sheets/edit-account-sheet";
import { EditCategorySheet } from "@/components/sheets/edit-category-sheet";
import { EditTransactionSheet } from "@/components/sheets/edit-transaction-sheet";
import { NewAccountSheet } from "@/components/sheets/new-account-sheet";
import { NewCategorySheet } from "@/components/sheets/new-category-sheet";
import { NewTransactionSheet } from "@/components/sheets/new-transaction-sheet";

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
      <EditTransactionSheet />
      <NewAccountSheet />
      <NewCategorySheet />
      <NewTransactionSheet />
    </>
  );
};
