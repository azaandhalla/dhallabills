import Papa, { ParseResult } from "papaparse";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { trpc } from "@/libs/trpc";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setTransactions } from "@/store/slices/transactionSlice";
import { Transaction } from "@prisma/client";

interface RawTransaction {
  [key: string]: string;
}

const UploadCsv: React.FC = () => {
  const params = useParams();
  const accountId = params.id as string;

  const dispatch = useDispatch<AppDispatch>();

  const [transactions, setCsvTransactions] = useState<
    Omit<Transaction, "id">[]
  >([]);

  const { mutateAsync } = trpc.transaction.createMany.useMutation();

  useEffect(() => {
    async function uploadTransactions() {
      const response = await mutateAsync({ transactions });
      dispatch(setTransactions(response));
    }

    if (transactions.length > 0) {
      uploadTransactions();
    }
  }, [transactions, mutateAsync, accountId, dispatch]);

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files?.item(0)) {
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        async complete(results: ParseResult<RawTransaction>) {
          const transactions: Omit<Transaction, "id">[] = [];
          results.data.forEach((transaction) => {
            transactions.push({
              accountId: accountId,
              description: transaction["Description"],
              amount: parseFloat(transaction["Amount"]),
              category: transaction["Category"] ? transaction["Category"] : "",
              date: new Date(transaction["Transaction Date"]),
              post: new Date(transaction["Post Date"]),
              type: transaction["Type"],
            });
          });

          return setCsvTransactions(transactions);
        },
      });
    }
  }

  return (
    <div>
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={changeHandler}
        style={{ display: "block", margin: "10px auto" }}
      />
    </div>
  );
};
export default UploadCsv;
