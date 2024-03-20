"use server";

import { todoFormValues } from '@/validation';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const prisma = new PrismaClient()

export const getTodoListAction = async(userId:string | null)=>{
    return await prisma.todo.findMany({
        where :{
            userId : userId as string,
        },
        orderBy:{
        createAt:'desc'
    }});
};

export const createTodoListAction = async(data:todoFormValues,userId:string|null)=>{
    await prisma.todo.create({
        data:{...data,userId : userId as string}
    })

    revalidatePath("/");
};

export const updateTodoListAction = async(data:todoFormValues,id:string)=>{
    await prisma.todo.update({
        data,
        where: {
            id,
        },
    })

    revalidatePath("/");
};

export const deleteTodoListAction = async(id:string)=>{
    await prisma.todo.delete({
        where: {
            id,
        },
    })

    revalidatePath("/");
};