"use client";

import { Row } from "@tanstack/react-table";
import { Plus } from "lucide-react";

import { deleteTransactions } from "@/actions/delete-transactions";
import { getTransactions } from "@/actions/get-transactions";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransactionSheet } from "@/states/use-new-transaction-sheet";

import { columns } from "./_components/columns";

const TransactionsPage = () => {
  const { onOpen } = useNewTransactionSheet();

  const { data, isLoading } = getTransactions();
  const { isPending, mutate } = deleteTransactions();

  const handleDelete = <TData extends { id: string }>(rows: Row<TData>[]) => {
    const ids = rows.map((row) => row.original.id);

    mutate({ ids });
  };

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between mb-4">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-full lg:w-32" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-y-2">
              <Skeleton className="h-10 w-full lg:w-96" />
              <Skeleton className="h-[500px] w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <Button size="sm" onClick={onOpen} disabled={isLoading || isPending}>
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={data || []}
            filterKey="payee"
            onDelete={handleDelete}
            disabled={isLoading || isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionsPage;
