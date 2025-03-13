"use client";

import { useEffect } from "react";
import type { Transaction } from "@prisma/client";
import { DataTable } from "@/components/transactions/data-table";
import { columns } from "@/components/transactions/columns";
import UploadCsv from "@/components/transactions/uploadCsv";
import { useParams } from "next/navigation";
import Overview from "@/components/transactions/overview";
import { RootState, AppDispatch } from "./state";
import { useSelector, useDispatch } from "react-redux";
import { fetchTransactions } from "./state";

const Account: React.FC = () => {
  const params = useParams();
  const accountId = params.id as string;

  const { transactions, balance } = useSelector(
    (state: RootState) => state.transactions
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    // Fetch transactions from API on component mount
    dispatch(fetchTransactions({ accountId }));
  }, [dispatch, accountId]);

  // const { data, refetch } = trpc.transaction.getAll.useQuery(accountId, {
  //   refetchInterval: false,
  //   refetchOnReconnect: false,
  //   refetchOnWindowFocus: false,
  // });

  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  // const [balance, setBalance] = useState<string>("0.00");

  // useEffect(() => {
  //   if (data) {
  //     setTransactions(data);
  //   }
  // }, [data]);

  return (
    <div className="flex flex-col">
      <Overview
        accountId={accountId}
        balance={balance}
        // setBalance={setBalance}
      />
      <UploadCsv />
      <DataTable columns={columns} data={transactions} />
    </div>
  );
};

export function calculateBalance(transactions: Transaction[]) {
  let balance: number = 0;

  transactions.forEach((item) => {
    if (item.type == "Sale") {
      balance += item.amount;
    }
  });

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(balance);
}

export default Account;
