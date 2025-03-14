"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { trpc } from "@/libs/trpc";
import { Account } from "@prisma/client";

const NewAccount: React.FC = () => {
  const [open, setOpen] = useState(false);
  const utils = trpc.useUtils();
  const { mutateAsync: createAccount } = trpc.account.create.useMutation();

  const newAccountSchema = z.custom<Omit<Account, "id">>();

  const form = useForm<z.infer<typeof newAccountSchema>>({
    resolver: zodResolver(newAccountSchema),
    reValidateMode: "onBlur",
    // mode: "all",
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof newAccountSchema>) {
    await createAccount({ account: values });
    utils.account.getAll.invalidate();
    setOpen(false);
  }

  return (
    <div className="h-8 flex items-center">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger>
          <PlusIcon className="h-4 w-4" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Account</DialogTitle>
            {/* <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription> */}
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              id="new-account-form"
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Account Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    {/* <FormDescription>
                      This is your public display name.
                    </FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button form="new-account-form" type="submit">
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// const NewAccountForm = () => {
//   return <></>;
// };

export default NewAccount;
