import { format } from "date-fns";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

import { TransactionTooltip } from "./transaction-tooltip";

type Props = {
  data: { date: string; income: number; expenses: number }[];
};

export const LineVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          axisLine={false}
          tickLine={false}
          dataKey="date"
          tickFormatter={(value) => format(value, "dd MMM")}
          style={{ fontSize: "12px" }}
          tickMargin={16}
        />
        <Tooltip content={<TransactionTooltip />} />
        <Line
          dot={false}
          dataKey="income"
          stroke="#3B82F6"
          strokeWidth={2}
          className="drop-shadow-md"
        />
        <Line
          dot={false}
          dataKey="expenses"
          stroke="#F43F5E"
          strokeWidth={2}
          className="drop-shadow-md"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
