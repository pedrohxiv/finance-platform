import { z } from "zod";

import { AccountForm } from "@/components/forms/account-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { createAccount } from "@/queries/create-account";
import { useNewAccountSheet } from "@/states/use-new-account-sheet";

const formSchema = insertAccountSchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccountSheet();
  const { isPending, mutate } = createAccount();

  const onSubmit = (values: FormValues) => {
    mutate(values, { onSuccess: () => onClose() });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transactions.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          defaultValues={{ name: "" }}
          onSubmit={onSubmit}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
