import { useRef, useState } from "react";

import { createAccount } from "@/actions/create-account";
import { getAccounts } from "@/actions/get-accounts";
import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const useSelectAccount = (): [
  () => JSX.Element,
  () => Promise<unknown>
] => {
  const { data, isLoading } = getAccounts();
  const { isPending, mutate } = createAccount();

  const accountOptions = (data ?? []).map((account) => ({
    value: account.id,
    label: account.name,
  }));

  const handleCreateAccount = (name: string) => {
    mutate({ name });
  };

  const [promise, setPromise] = useState<{
    resolve: (value: string | undefined) => void;
  } | null>(null);

  const selectValue = useRef<string>();

  const confirm = () =>
    new Promise((resolve) => {
      setPromise({ resolve });
    });

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(selectValue.current);

    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(undefined);

    handleClose();
  };

  const ConfimationDialog = () => (
    <Dialog open={promise !== null}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select Account</DialogTitle>
          <DialogDescription>
            Please select an account to continue.
          </DialogDescription>
        </DialogHeader>
        <Select
          placeholder="Select an account"
          options={accountOptions}
          onCreate={handleCreateAccount}
          onChange={(value) => (selectValue.current = value)}
          disabled={isLoading || isPending}
        />
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  return [ConfimationDialog, confirm];
};
