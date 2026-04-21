"use client";

import { Board, JobApplication } from "@/lib/models/models.types";
import {
  Calendar,
  CheckCircle2,
  Mic,
  Award,
  XCircle,
  Calendar1,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import CreateJobAppDialog from "./CreateJobDialog";
import JobApplicationCard from "./JobApplicationCard";
import { useBoards } from "@/hooks/useBoards";

interface KanbanBoardProps {
  board: Board;
}

interface ColConfig {
  color: string;
  icon: React.ReactNode;
}

const COLUMN_CONFIG: Array<ColConfig> = [
  { color: "bg-[#8C9A81] text-white", icon: <Calendar className="h-4 w-4" /> }, // Sage
  {
    color: "bg-[#D4A373] text-white",
    icon: <CheckCircle2 className="h-4 w-4" />,
  }, // Ochre
  { color: "bg-[#C27B66] text-white", icon: <Mic className="h-4 w-4" /> }, // Terracotta
  { color: "bg-[#A3B19B] text-white", icon: <Award className="h-4 w-4" /> }, // Lighter Sage
  { color: "bg-[#E0A98B] text-white", icon: <XCircle className="h-4 w-4" /> }, // Peach/Sand
];

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const { columns, moveJob } = useBoards(board);
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order) || [];

  return (
    <div className="h-[calc(100vh-160px)] overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar">
      <div className="flex gap-6 h-full min-w-max px-2 pt-2">
        {sortedColumns.map((col, key) => {
          const config = COLUMN_CONFIG[key] || {
            color: "bg-[#6B7B6B] text-white",
            icon: <Calendar1 className="h-4 w-4" />,
          };

          return (
            <div
              key={col._id.toString()}
              className="flex flex-col w-[340px] h-full"
            >
              {/* Column Header - Floating Pill Style */}
              <div
                className={`${config.color} flex items-center justify-between py-3 px-5 rounded-[2rem] shadow-sm mb-4 mx-1`}
              >
                <div className="flex items-center gap-3">
                  <div className="opacity-90">{config.icon}</div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-serif font-medium text-base tracking-wide">
                      {col.name}
                    </h2>
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-white/25 text-white text-[10px] font-bold backdrop-blur-sm">
                      {col.jobApplications?.length || 0}
                    </span>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/15 rounded-full transition-colors"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-40 shadow-xl border-[#E8E3D5] rounded-xl"
                  >
                    <DropdownMenuItem className="text-red-700/80 gap-2 cursor-pointer font-medium">
                      <Trash2 className="h-4 w-4" /> Delete Column
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Jobs Container */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-1 space-y-4 custom-scrollbar pb-24">
                {col.jobApplications
                  ?.sort(
                    (a: JobApplication, b: JobApplication) => a.order - b.order,
                  )
                  .map((job: JobApplication) => (
                    <JobApplicationCard
                      key={job._id.toString()}
                      job={{ ...job, columnId: job.columnId || col._id }}
                      columns={sortedColumns}
                    />
                  ))}

                <div className="pt-2">
                  <CreateJobAppDialog boardId={board._id} columnId={col._id} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e8e3d5;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4a373;
        }
      `}</style>
    </div>
  );
}
