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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
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
  { color: "bg-[#00bcd4]", icon: <Calendar className="h-4 w-4" /> }, // Cyan
  { color: "bg-[#ab47bc]", icon: <CheckCircle2 className="h-4 w-4" /> }, // Purple
  { color: "bg-[#2ecc71]", icon: <Mic className="h-4 w-4" /> }, // Green
  { color: "bg-[#f1c40f]", icon: <Award className="h-4 w-4" /> }, // Yellow
  { color: "bg-red-500", icon: <XCircle className="h-4 w-4" /> },
];

export default function KanbanBoard({ board }: KanbanBoardProps) {
  const {columns, moveJob} = useBoards(board);
  const sortedColumns = [...columns].sort((a, b) => a.order - b.order) || [];

  return (
    <div className="h-[calc(100vh-160px)] overflow-x-auto overflow-y-hidden pb-4 custom-scrollbar">
      <div className="flex gap-6 h-full min-w-max px-1">
        {sortedColumns.map((col, key) => {
          const config = COLUMN_CONFIG[key] || {
            color: "bg-slate-500",
            icon: <Calendar1 className="h-4 w-4" />,
          };
          
          return (
            <div key={col._id.toString()} className="flex flex-col w-[340px] h-full bg-slate-50/30 rounded-xl border border-slate-100/50">
              {/* Column Header - Solid Style */}
              <div className={`${config.color} flex items-center justify-between p-4 rounded-t-xl`}>
                <div className="flex items-center gap-3">
                  <div className="text-white opacity-90">
                    {config.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-bold text-white text-sm tracking-wide">{col.name}</h2>
                    <span className="flex items-center justify-center h-5 w-5 rounded-full bg-white/20 text-white text-[10px] font-bold backdrop-blur-sm">
                      {col.jobApplications?.length || 0}
                    </span>
                  </div>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40 shadow-xl border-slate-200">
                    <DropdownMenuItem className="text-red-600 gap-2 cursor-pointer font-medium">
                      <Trash2 className="h-4 w-4" /> Delete Column
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Jobs Container */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4 custom-scrollbar pb-24">
                {col.jobApplications
                  ?.sort((a: JobApplication, b: JobApplication) => a.order - b.order)
                  .map((job: JobApplication) => (
                    <JobApplicationCard 
                      key={job._id.toString()} 
                      job={{...job, columnId: job.columnId || col._id}} 
                      columns={sortedColumns}
                    />
                  ))
                }
                
                {/* Styled "Add Job" Button matched to screenshot */}
                <div className="pt-2 px-1">
                    <CreateJobAppDialog boardId={board._id} columnId={col._id}/>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #cbd5e1;
        }
      `}</style>
    </div>
  );
}
