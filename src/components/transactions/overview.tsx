import { Label } from "../ui/label";

interface OverviewProps {
  accountTitle: string;
  balance: string;
}

const Overview: React.FC<OverviewProps> = (props) => {
  const { accountTitle, balance } = props;

  return (
    <div className="flex justify-between">
      <Label className="text-2xl">{accountTitle}</Label>
      <Label className="text-2xl">{balance}</Label>
    </div>
  );
};
export default Overview;
