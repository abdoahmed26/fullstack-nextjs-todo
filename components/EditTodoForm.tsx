"use client"

import { Button } from "@/components/ui/button";
import { Pen, Plus } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoFormValues, todoFormSchema } from "@/validation";
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react";
import { updateTodoListAction } from "@/actions/todoActions";

interface IProp {
    id: string;
    title: string;
    body: string | null;
    completed: boolean;
    createAt: Date;
}

export default function EditTodoForm ({ele}:{ele:IProp}) {
    const [load,setLoad] = useState<boolean>(false);
    const [open,setOpen] = useState<boolean>(false);

    const defaultValues: Partial<todoFormValues> = {
        title:ele.title,
        body:ele.body || "",
        completed:ele.completed,
    }
    
    const form = useForm<todoFormValues>({
        resolver: zodResolver(todoFormSchema),
        defaultValues,
        mode:"onChange",
    });
    
    const onSubmit = async(data:todoFormValues)=>{
        setLoad(true)
        await updateTodoListAction(data,ele.id)
        setLoad(false)
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="px-[12px] py-0">
                    <Pen size={16}/>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit this todo</DialogTitle>
                </DialogHeader>
                <div className="py-2">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="body"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Body</FormLabel>
                                    <FormControl>
                                        <Textarea
                                        placeholder="Enter Body"
                                        className="resize-none"
                                        {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        You can write a short description about your next todo.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                            />
                            <FormField
                            control={form.control}
                            name="completed"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                        <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            Completed
                                        </FormLabel>
                                        <FormDescription>
                                            Your to-do item will be uncompleted by default unless you checked it.
                                        </FormDescription>
                                    </div>
                                </FormItem>
                            )}
                            />
                            <DialogFooter>
                                <Button type="submit" disabled={load}>
                                    {load ? <> 
                                        <span className="block w-4 h-4 border-2 border-gray-500 border-l-white 
                                        rounded-full animate-spin mr-1"></span> Saving
                                    </>
                                    : "Save"}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}