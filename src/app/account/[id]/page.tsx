import { AccountProvider } from "@/components/providers/AccountProvider";

const Account = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  return <AccountProvider accountId={id} />;
};

export default Account;
