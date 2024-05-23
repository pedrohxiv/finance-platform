"use client";

import { Row } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { createTransactions } from "@/actions/create-transactions";
import { deleteTransactions } from "@/actions/delete-transactions";
import { getTransactions } from "@/actions/get-transactions";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { transactions } from "@/db/schema";
import { useSelectAccount } from "@/hooks/use-select-account";
import { useNewTransactionSheet } from "@/states/use-new-transaction-sheet";

import { columns } from "./_components/columns";
import { ImportCard } from "./_components/import-card";
import { UploadButton } from "./_components/upload-button";

enum VARIANTS {
  LIST = "LIST",
  IMPORT = "IMPORT",
}

const INITIAL_IMPORT_RESULTS = {
  data: [],
  errors: [],
  meta: {},
};

const TransactionsPage = () => {
  const [variant, setVariant] = useState<VARIANTS>(VARIANTS.LIST);
  const [importResults, setImportResults] = useState(INITIAL_IMPORT_RESULTS);

  const [ConfimationDialog, confirm] = useSelectAccount();

  const { onOpen } = useNewTransactionSheet();

  const { data, isLoading } = getTransactions();
  const { isPending, mutate: deleteMutate } = deleteTransactions();
  const { mutate: createMutate } = createTransactions();

  const handleUpload = (results: typeof INITIAL_IMPORT_RESULTS) => {
    setVariant(VARIANTS.IMPORT);
    setImportResults(results);
  };

  const handleCancelImport = () => {
    setVariant(VARIANTS.LIST);
    setImportResults(INITIAL_IMPORT_RESULTS);
  };

  const handleSubmitImport = async (
    values: (typeof transactions.$inferInsert)[]
  ) => {
    const accountId = await confirm();

    if (!accountId) {
      return toast.error("Please select an account to continue.");
    }

    const data = values.map((value) => ({
      ...value,
      accountId: accountId as string,
    }));

    createMutate(data, { onSuccess: () => handleCancelImport() });
  };

  const handleDelete = <TData extends { id: string }>(rows: Row<TData>[]) => {
    const ids = rows.map((row) => row.original.id);

    deleteMutate({ ids });
  };

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between mb-4">
            <Skeleton className="h-8 w-48" />
            <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-x-2">
              <Skeleton className="h-10 w-full lg:w-24" />
              <Skeleton className="h-10 w-full lg:w-32" />
            </div>
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

  if (variant === VARIANTS.IMPORT) {
    return (
      <>
        <ConfimationDialog />
        <ImportCard
          data={importResults.data}
          onCancel={handleCancelImport}
          onSubmit={handleSubmitImport}
        />
      </>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-x-2">
            <UploadButton onUpload={handleUpload} />
            <Button
              size="sm"
              className="w-full lg:w-auto"
              onClick={onOpen}
              disabled={isLoading || isPending}
            >
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
          </div>
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
