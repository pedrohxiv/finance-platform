import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatPercentage } from "@/lib/utils";

import { CategoryTooltip } from "./category-tooltip";

const COLORS = ["#0062FF", "#12C6FF", "#FF647F", "#FF9354"];

type Props = {
  data: { name: string; value: number }[];
};

export const PieVariant = ({ data }: Props) => {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="right"
          iconType="circle"
          content={({ payload }) => (
            <ul className="flex flex-col space-y-2">
              {payload?.map((entry, i) => (
                <li key={`item-${i}`} className="flex items-center space-x-2">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <div className="space-x-1">
                    <span className="text-sm text-muted-foreground">
                      {entry.value}
                    </span>
                    <span className="text-sm">
                      {formatPercentage(
                        (entry.payload?.value /
                          payload?.reduce(
                            (total, item) => total + item.payload?.value,
                            0
                          )) *
                          100
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          fill="#8884D8"
          dataKey="value"
          labelLine={false}
        >
          {data.map((_, i) => (
            <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};
