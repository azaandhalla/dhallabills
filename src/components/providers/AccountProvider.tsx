"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { setTransactions } from "@/store/slices/transactionSlice";
import Overview from "@/components/transactions/overview";
import UploadCsv from "@/components/transactions/uploadCsv";
import { DataTable } from "@/components/transactions/data-table";
import { columns } from "@/components/transactions/columns";
import { trpc } from "@/libs/trpc";

interface AccountProviderProps {
  accountId: string;
}

export const AccountProvider: React.FC<AccountProviderProps> = ({
  accountId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { transactions, balance } = useSelector(
    (state: RootState) => state.transactions
  );

  const { data: account } = trpc.account.get.useQuery(accountId);
  const { data, isLoading } = trpc.transaction.getAll.useQuery(accountId);

  useEffect(() => {
    if (data) {
      dispatch(setTransactions(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else if (!account) {
    return <div>Account not found</div>;
  }

  return (
    <div className="flex flex-col mx-16">
      <Overview accountTitle={account.name} balance={balance} />
      <UploadCsv />
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};
