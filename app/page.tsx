import { getTodoListAction } from "@/actions/todoActions";
import AddToForm from "@/components/AddToForm";
import { TodoTable } from "@/components/TodoTable";
import { auth } from "@clerk/nextjs";


export default async function Home() {
  const {userId} = auth();
  const todos = await getTodoListAction(userId);

  return (
    <main className="container">
      <div className="flex justify-end mb-2">
        <AddToForm userId={userId}/>
      </div>
      <TodoTable todos={todos}/>
    </main>
  );
}
