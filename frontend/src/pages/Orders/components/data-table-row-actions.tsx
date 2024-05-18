"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { taskSchema } from "../data/schema"
import { useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
}

export function DataTableRowActions<TData>({
    row
}: DataTableRowActionsProps<TData>) {
    const task = row.original
    const handleComplete = ()=>{
        if(task.status == "done") return toast.info("Task is already done")
        axios.get(`http://localhost:3010/markAsDone/${task.id}`).then(()=> location.reload()).catch(e=>console.log(e))
    }
    
    const handleCancel = ()=>{
        if(task.status == "canceled") return toast.info("Task is already Canceled")
        axios.get(`http://localhost:3010/cancel_order/${task.id}`).then(()=> location.reload()).catch(e=>console.log(e))
    }

    const handleDelete = ()=>{
    
        axios.delete(`http://localhost:3010/deleteOrder/${task.id}`).then(()=> location.reload()).catch(e=>console.log(e))
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
                >
                    <DotsHorizontalIcon className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={handleComplete}>Mark As Done</DropdownMenuItem>
                <DropdownMenuItem onClick={handleCancel}>Cancel</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleDelete}>
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )   
}