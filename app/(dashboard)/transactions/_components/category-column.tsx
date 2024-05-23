import { TriangleAlert } from "lucide-react";

import { cn } from "@/lib/utils";
import { useEditCategorySheet } from "@/states/use-edit-category-sheet";
import { useEditTransactionSheet } from "@/states/use-edit-transaction-sheet";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen: onOpenCategorySheet } = useEditCategorySheet();
  const { onOpen: onOpenTransactionSheet } = useEditTransactionSheet();

  const handleClick = () => {
    if (categoryId) {
      onOpenCategorySheet(categoryId);
    } else {
      onOpenTransactionSheet(id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-rose-500"
      )}
    >
      {!category && <TriangleAlert className="size-4 mr-2 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
};
