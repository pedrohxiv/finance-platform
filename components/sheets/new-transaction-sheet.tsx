import { z } from "zod";

import { createAccount } from "@/actions/create-account";
import { createCategory } from "@/actions/create-category";
import { createTransaction } from "@/actions/create-transaction";
import { getAccounts } from "@/actions/get-accounts";
import { getCategories } from "@/actions/get-categories";
import { TransactionForm } from "@/components/forms/transaction-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { insertTransactionSchema } from "@/db/schema";
import { useNewTransactionSheet } from "@/states/use-new-transaction-sheet";

const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;

export const NewTransactionSheet = () => {
  const { isOpen, onClose } = useNewTransactionSheet();

  const { isPending: accountIsPending, mutate: accountMutate } =
    createAccount();
  const { isPending: categoryIsPending, mutate: categoryMutate } =
    createCategory();
  const { isPending: transactionIsPending, mutate: transactionMutate } =
    createTransaction();
  const { data: accountsData, isLoading: accountsIsLoading } = getAccounts();
  const { data: categoriesData, isLoading: categoriesIsLoading } =
    getCategories();

  const accountOptions = (accountsData ?? []).map((account) => ({
    value: account.id,
    label: account.name,
  }));

  const categoryOptions = (categoriesData ?? []).map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleCreateAccount = (name: string) => {
    accountMutate({ name });
  };

  const handleCreateCategory = (name: string) => {
    categoryMutate({ name });
  };

  const handleCreateTransaction = (values: FormValues) => {
    transactionMutate(values, { onSuccess: () => onClose() });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Create a new transaction.</SheetDescription>
        </SheetHeader>
        {accountsIsLoading || categoriesIsLoading ? (
          <>
            <div className="space-y-6 pt-6">
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex flex-col gap-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-24 w-full" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full pb-4" />
          </>
        ) : (
          <TransactionForm
            onSubmit={handleCreateTransaction}
            disabled={
              accountIsPending || categoryIsPending || transactionIsPending
            }
            accountOptions={accountOptions}
            onCreateAccount={handleCreateAccount}
            categoryOptions={categoryOptions}
            onCreateCategory={handleCreateCategory}
          />
        )}
      </SheetContent>
    </Sheet>
  );
};
