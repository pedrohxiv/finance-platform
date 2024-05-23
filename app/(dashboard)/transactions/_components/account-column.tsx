import { useEditAccountSheet } from "@/states/use-edit-account-sheet";

type Props = {
  account: string;
  accountId: string;
};

export const AccountColumn = ({ account, accountId }: Props) => {
  const { onOpen } = useEditAccountSheet();

  const handleClick = () => {
    onOpen(accountId);
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center cursor-pointer hover:underline"
    >
      {account}
    </div>
  );
};
