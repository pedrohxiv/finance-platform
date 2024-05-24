import { z } from "zod";

import { createAccount } from "@/actions/create-account";
import { createCategory } from "@/actions/create-category";
import { deleteTransaction } from "@/actions/delete-transaction";
import { editTransaction } from "@/actions/edit-transaction";
import { getAccounts } from "@/actions/get-accounts";
import { getCategories } from "@/actions/get-categories";
import { getTransaction } from "@/actions/get-transaction";
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
import { useConfirm } from "@/hooks/use-confirm";
import { useEditTransactionSheet } from "@/states/use-edit-transaction-sheet";

const formSchema = insertTransactionSchema.omit({ id: true });

type FormValues = z.infer<typeof formSchema>;

export const EditTransactionSheet = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const { id, isOpen, onClose } = useEditTransactionSheet();

  const { isPending: editIsPending, mutate: editMutate } = editTransaction(id);
  const { isPending: deleteIsPending, mutate: deleteMutate } =
    deleteTransaction(id);
  const { isPending: createAccountIsPending, mutate: createAccountMutate } =
    createAccount();
  const { isPending: createCategoryIsPending, mutate: createCategoryMutate } =
    createCategory();
  const { data: accountsData, isLoading: accountsIsLoading } = getAccounts();
  const { data: categoriesData, isLoading: categoriesIsLoading } =
    getCategories();
  const { data: transactionData, isLoading: transactionIsLoading } =
    getTransaction(id);

  const accountOptions = (accountsData ?? []).map((account) => ({
    value: account.id,
    label: account.name,
  }));

  const categoryOptions = (categoriesData ?? []).map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const defaultValues = transactionData
    ? {
        accountId: transactionData.accountId,
        categoryId: transactionData.categoryId,
        amount: transactionData.amount.toString(),
        date: transactionData.date
          ? new Date(transactionData.date)
          : new Date(),
        payee: transactionData.payee,
        notes: transactionData.notes,
      }
    : {
        accountId: "",
        categoryId: "",
        amount: "",
        date: new Date(),
        payee: "",
        notes: "",
      };

  const handleCreateAccount = (name: string) => {
    createAccountMutate({ name });
  };

  const handleCreateCategory = (name: string) => {
    createCategoryMutate({ name });
  };

  const handleUpdateTransaction = (values: FormValues) => {
    editMutate(values, { onSuccess: () => onClose() });
  };

  const handleDeleteTransaction = async () => {
    const isConfirmed = await confirm();

    if (isConfirmed) {
      deleteMutate(undefined, { onSuccess: () => onClose() });
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Transaction</SheetTitle>
            <SheetDescription>Edit an existing transaction.</SheetDescription>
          </SheetHeader>
          {accountsIsLoading || categoriesIsLoading || transactionIsLoading ? (
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
              id={id}
              defaultValues={defaultValues}
              onSubmit={handleUpdateTransaction}
              onDelete={handleDeleteTransaction}
              disabled={
                editIsPending ||
                deleteIsPending ||
                createAccountIsPending ||
                createCategoryIsPending
              }
              accountOptions={accountOptions}
              onCreateAccount={handleCreateAccount}
              categoryOptions={categoryOptions}
              onCreateCategory={handleCreateCategory}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
