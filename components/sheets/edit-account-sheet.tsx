import { z } from "zod";

import { deleteAccount } from "@/actions/delete-account";
import { editAccount } from "@/actions/edit-account";
import { getAccount } from "@/actions/get-account";
import { AccountForm } from "@/components/forms/account-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { insertAccountSchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { useEditAccountSheet } from "@/states/use-edit-account-sheet";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const EditAccountSheet = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this account."
  );

  const { id, isOpen, onClose } = useEditAccountSheet();
  const { data, isLoading } = getAccount(id);
  const { isPending: editIsPending, mutate: editMutate } = editAccount(id);
  const { isPending: deleteIsPending, mutate: deleteMutate } =
    deleteAccount(id);

  const defaultValues = data ? { name: data.name } : { name: "" };

  const handleSubmit = (values: FormValues) => {
    editMutate(values, { onSuccess: () => onClose() });
  };

  const handleDelete = async () => {
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
            <SheetTitle>Edit Account</SheetTitle>
            <SheetDescription>Edit an existing account.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="space-y-4 pt-4">
              <Skeleton className="h-5 w-16 -mb-2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <AccountForm
              id={id}
              defaultValues={defaultValues}
              onSubmit={handleSubmit}
              onDelete={handleDelete}
              disabled={editIsPending || deleteIsPending}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
