"use client";

import { useSearchParams } from "next/navigation";
import { FaPiggyBank } from "react-icons/fa";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

import { getSummary } from "@/actions/get-summary";
import { formatDateRange } from "@/lib/utils";

import { DataCard, DataCardSkeleton } from "./data-card";

export const DataGrid = () => {
  const { data, isLoading } = getSummary();

  const params = useSearchParams();

  const from = params.get("from") || undefined;
  const to = params.get("to") || undefined;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
        <DataCardSkeleton />
        <DataCardSkeleton />
        <DataCardSkeleton />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-2 mb-8">
      <DataCard
        title="Remaining"
        value={data?.remainingAmount}
        percentageChange={data?.remainingChange}
        icon={FaPiggyBank}
        dateRange={formatDateRange({ to, from })}
      />
      <DataCard
        title="Income"
        value={data?.incomeAmount}
        percentageChange={data?.incomeChange}
        icon={FaArrowTrendUp}
        variant="success"
        dateRange={formatDateRange({ to, from })}
      />
      <DataCard
        title="Expenses"
        value={data?.expensesAmount}
        percentageChange={data?.expensesChange}
        icon={FaArrowTrendDown}
        variant="danger"
        dateRange={formatDateRange({ to, from })}
      />
    </div>
  );
};
