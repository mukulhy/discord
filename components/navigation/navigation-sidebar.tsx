import { currentProfile } from "@/lib/current-profile";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import NavigationAction from "./navigation-action";
import { Separator } from "../ui/separator";
import { db } from "@/lib/db";
import NavigationItem from "./navigation-item";
import { ScrollArea } from "../ui/scroll-area";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../mode-toggle";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/");
  }

  const servers = await db.server.findMany({
    where: {
      profileId: profile.id,
    },
  });

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-500 rounded-md w-10 mx-auto" />

      <ScrollArea>
        {servers.map((server) => (
          <div key={server.id} className="mb-4">
            <NavigationItem
              id={server.id}
              name={server.name}
              imageUrl={server.imageUrl}
            />
          </div>
        ))}
      </ScrollArea>

      <div className="pb-3 mt-auto flex items-center flex-col gap-y-4">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: {
              avatarBox: "h-[48px] w-[48px]",
            },
          }}
        />
      </div>
    </div>
  );
};

export default NavigationSidebar;
