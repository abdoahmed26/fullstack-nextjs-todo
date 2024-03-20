"use client"

import { Trash } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { deleteTodoListAction } from "@/actions/todoActions";
import EditTodoForm from "./EditTodoForm";

interface IProp {
    id: string;
    title: string;
    body: string | null;
    completed: boolean;
    createAt: Date;
}

export default function TodoTableActions ({ele}:{ele:IProp}) {
    const [load,setLoad] = useState<boolean>(false);
    const deleteTodo = async(id:string)=>{
        setLoad(true)
        await deleteTodoListAction(id)
        setLoad(false)
    }
    return (
        <>
            <EditTodoForm ele={ele}/>
            <Button size={"icon"} variant={"destructive"} onClick={()=>deleteTodo(ele.id)}>
                {load ? <span className="block w-4 h-4 border-2 border-gray-500 border-l-white rounded-full 
                animate-spin"></span> 
                : <Trash size={16}/>}
            </Button>
        </>
    );
}