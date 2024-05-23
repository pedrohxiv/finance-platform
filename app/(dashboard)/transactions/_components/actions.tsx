"use client";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { deleteTransaction } from "@/actions/delete-transaction";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useConfirm } from "@/hooks/use-confirm";
import { useEditTransactionSheet } from "@/states/use-edit-transaction-sheet";

type Props = {
  id: string;
};

export const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const { onOpen } = useEditTransactionSheet();

  const { isPending, mutate } = deleteTransaction(id);

  const handleDelete = async () => {
    const isConfirmed = await confirm();

    if (isConfirmed) {
      mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => onOpen(id)}
            className="cursor-pointer"
          >
            <Edit className="size-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            disabled={isPending}
            onClick={handleDelete}
            className="cursor-pointer text-destructive focus-visible:text-destructive focus-visible:bg-destructive/5"
          >
            <Trash className="size-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
