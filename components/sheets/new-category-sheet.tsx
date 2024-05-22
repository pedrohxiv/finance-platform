import { z } from "zod";

import { createCategory } from "@/actions/create-category";
import { CategoryForm } from "@/components/forms/category-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertCategorySchema } from "@/db/schema";
import { useNewCategorySheet } from "@/states/use-new-category-sheet";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategorySheet();

  const { isPending, mutate } = createCategory();

  const handleCreateCategory = (values: FormValues) => {
    mutate(values, { onSuccess: () => onClose() });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions.
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          defaultValues={{ name: "" }}
          onSubmit={handleCreateCategory}
          disabled={isPending}
        />
      </SheetContent>
    </Sheet>
  );
};
