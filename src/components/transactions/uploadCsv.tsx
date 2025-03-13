import Papa, { ParseResult } from "papaparse";
import { z } from "zod";
import { newTransactionSchema } from "@/libs/schema";
import { ChangeEvent } from "react";
import { useParams } from "next/navigation";

// interface UploadCsvProps {
// refetch: () => void;
// }

interface RawTransaction {
  [key: string]: string;
}

const UploadCsv: React.FC = () => {
  const params = useParams();
  const accountId = params.id as string;

  // const { mutateAsync: createTransaction } =
  //   trpc.transaction.createMany.useMutation();

  function changeHandler(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files?.item(0)) {
      Papa.parse(event.target.files[0], {
        header: true,
        skipEmptyLines: true,
        dynamicTyping: true,
        async complete(results: ParseResult<RawTransaction>) {
          const transactions: z.infer<typeof newTransactionSchema>[] = [];

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

          // await createTransaction(transactions).finally(() => {
          //   props.refetch();
          // });
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
