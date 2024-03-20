import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "./ui/badge";
import TodoTableActions from "./TodoTableActions";

interface IProp {
    id: string;
    title: string;
    body: string | null;
    completed: boolean;
    createAt: Date;
}

export function TodoTable({todos}:{todos:IProp[]}) {
    
    return (
        <Table>
            <TableCaption>A list of your recent todo.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Create At</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {todos?.map((ele:IProp) => (
                <TableRow key={ele?.id}>
                    <TableCell className="font-medium">{ele?.id}</TableCell>
                    <TableCell>{ele?.title}</TableCell>
                    <TableCell>
                        {ele?.completed ? <Badge>Completed</Badge> : <Badge variant={"secondary"}>Uncompleted</Badge>}
                    </TableCell>
                    <TableCell>
                        {ele?.createAt.getDate()} - {ele?.createAt.getMonth()+1} - {ele?.createAt.getFullYear()}
                    </TableCell>
                    <TableCell className="flex items-center justify-end gap-2">
                        <TodoTableActions ele={ele}/>
                    </TableCell>
                </TableRow>
            ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={4}>Total</TableCell>
                    <TableCell className="text-right">{todos.length}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}