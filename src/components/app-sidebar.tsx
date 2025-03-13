"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import NewAccount from "./account/new";
import { trpc } from "@/libs/trpc";
import { Banknote } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  const { data: accounts } = trpc.account.getAll.useQuery();

  return (
    <Sidebar collapsible="none" className="h-lvh">
      <SidebarContent>
        <SidebarHeader className="border-b-[1px] border-gray-300">
          Dhalla&apos;s Bills
        </SidebarHeader>
        <SidebarGroupLabel>MANAGEMENT</SidebarGroupLabel>
        <SidebarGroup className="flex flex-row">
          <Collapsible defaultOpen className="group/collapsible w-full">
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger>BANKING</CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroup className="p-0 pl-2">
                <SidebarGroupContent>
                  <SidebarMenu>
                    {accounts?.map((account) => (
                      <SidebarMenuItem key={account.name}>
                        <SidebarMenuButton asChild>
                          <Link href={"/account/" + account.id}>
                            <Banknote />
                            <span>{account.name}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </CollapsibleContent>
          </Collapsible>
          <NewAccount />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
