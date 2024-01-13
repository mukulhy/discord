"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { redirect } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";
const formSchema = z.object({
  name: z.string().min(2).max(50),
});

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const isModalOpen = isOpen && type == "createServer";

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data, status } = await axios.post("/api/servers", values);
      if (status == 200) {
        form.reset();
        onClose();
        redirect("/server");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent className="bg-gray-800">
        <DialogHeader className="flex items-center">
          <DialogTitle>Create Your Server</DialogTitle>
          <DialogDescription>
            Your server is where you and your friends can hangout.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center text-center">
          Upload your image component will be here.
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-inherit">Server Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter server name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal ;
