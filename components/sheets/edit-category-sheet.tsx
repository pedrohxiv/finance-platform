import { z } from "zod";

import { deleteCategory } from "@/actions/delete-category";
import { editCategory } from "@/actions/edit-category";
import { getCategory } from "@/actions/get-category";
import { CategoryForm } from "@/components/forms/category-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { insertCategorySchema } from "@/db/schema";
import { useConfirm } from "@/hooks/use-confirm";
import { useEditCategorySheet } from "@/states/use-edit-category-sheet";

const formSchema = insertCategorySchema.pick({ name: true });

type FormValues = z.infer<typeof formSchema>;

export const EditCategorySheet = () => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this category."
  );

  const { id, isOpen, onClose } = useEditCategorySheet();

  const { data, isLoading } = getCategory(id);
  const { isPending: editIsPending, mutate: editMutate } = editCategory(id);
  const { isPending: deleteIsPending, mutate: deleteMutate } =
    deleteCategory(id);

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
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Edit an existing category.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="space-y-4 pt-4">
              <Skeleton className="h-5 w-16 -mb-2" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          ) : (
            <CategoryForm
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
