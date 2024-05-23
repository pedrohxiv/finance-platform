import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const options = ["amount", "date", "payee"];

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
};

export const TableHeadSelect = ({
  columnIndex,
  selectedColumns,
  onChange,
}: Props) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={currentSelection || ""}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none border-none bg-transparent capitalize",
          currentSelection && "text-blue-500"
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip" className="cursor-pointer">
          Skip
        </SelectItem>
        {options.map((option, index) => (
          <SelectItem
            key={index}
            value={option}
            disabled={
              Object.values(selectedColumns).includes(option) &&
              selectedColumns[`column_${columnIndex}`] !== option
            }
            className="capitalize cursor-pointer"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
