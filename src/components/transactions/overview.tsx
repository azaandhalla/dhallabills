import { Label } from "../ui/label";
import { trpc } from "@/libs/trpc";

interface OverviewProps {
  accountId: string;
  //   transactions: Transaction[];
  balance: number;
  //   setBalance: (value: string) => void;
}

const Overview: React.FC<OverviewProps> = (props) => {
  const { accountId, balance } = props;

  const account = trpc.account.get.useQuery(accountId);

  //   useEffect(() => {
  //     setBalance(calculateBalance(transactions));
  //   }, [transactions, setBalance]);

  return (
    <div className="flex justify-between">
      <Label className="text-2xl">{account.data?.name}</Label>
      <Label className="text-2xl">{balance}</Label>
    </div>
  );
};
export default Overview;
