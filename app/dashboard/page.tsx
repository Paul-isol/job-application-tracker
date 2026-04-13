import KanbanBoard from "@/components/Kanban-board"
import { getSession } from "@/lib/auth/auth"
import connectDb from "@/lib/db"
import { Board } from "@/lib/models"
import { Suspense } from "react"

async function getBoard(userId: string){
  "use cache"
  await connectDb();

  const boardDoc = await Board.findOne({
    userId,
    name: "Job Hunt",
  }).populate({
    path: "columns",
    populate: {
      path: "jobApplications",
    },
  });
  if (!boardDoc) return null;
  // Convert Mongoose document to a plain serializable object (removes IDs as objects)
  return JSON.parse(JSON.stringify(boardDoc));
}

async function DashboardPage(){
const session = await getSession();
const board = await getBoard(session?.user.id || "");

return (
  <div className="min-h-screen bg-[#fafafa]">
    <div className="container mx-auto p-8 pt-12">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
          Job Hunt
        </h1>
        <p className="text-slate-500 font-medium italic">
          Track your job applications
        </p>
      </div>
      <KanbanBoard board={board} />
    </div>
  </div>
);
}

export default async function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardPage />
    </Suspense>
  )
}
