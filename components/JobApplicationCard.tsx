"use client";
import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { updateJobApplication } from "@/lib/actions/job-applications";

export default function JobApplicationCard({job, columns}:{job:JobApplication, columns:Column[]}){
    async function handleMove(columnId:string){
        try{
            await updateJobApplication(job._id.toString(), {columnId})
        }catch(error){
            console.error("Error moving job:", error)
        }
    }
    return (
        <div className="group relative">
            <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-slate-300 border-slate-100 bg-white cursor-pointer">
                <CardContent className="p-5">
                    <div className="flex flex-col gap-2.5">
                        {/* Status/Actions Header */}
                        <div className="flex items-start justify-between">
                            <div className="space-y-0.5 min-w-0 flex-1">
                                <h3 className="font-bold text-slate-800 leading-tight truncate text-[15px]" title={job.position}>
                                    {job.position}
                                </h3>
                                <div className="text-[13px] text-slate-500 font-medium">
                                    {job.company}
                                </div>
                            </div>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-400 hover:text-slate-600 hover:bg-slate-50 opacity-0 group-hover:opacity-100 transition-all rounded-md flex-shrink-0">
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-52 p-1.5 shadow-2xl border-slate-200">
                                    <DropdownMenuItem className="gap-2.5 cursor-pointer rounded-md py-2">
                                        <Edit2 className="h-4 w-4 text-slate-500" /> 
                                        <span className="font-medium">Edit Details</span>
                                    </DropdownMenuItem>
                                    {columns.length > 0 && (
                                        <>
                                            <div className="h-px bg-slate-100 my-1.5" />
                                            <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                                                Move to
                                            </div>
                                            {columns
                                                .filter((c) => c._id.toString() !== job.columnId?.toString())
                                                .map((column) => (
                                                    <DropdownMenuItem key={column._id.toString()} 
                                                        onClick={()=>handleMove(column._id)}
                                                        className="gap-2.5 cursor-pointer rounded-md py-2 text-slate-600 font-medium">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
                                                        <span>{column.name}</span>
                                                    </DropdownMenuItem>
                                                ))
                                            }
                                        </>
                                    )}
                                    <div className="h-px bg-slate-100 my-1.5" />
                                    <DropdownMenuItem className="gap-2.5 cursor-pointer rounded-md py-2 text-red-600 font-medium hover:bg-red-50 focus:bg-red-50">
                                        <Trash2 className="h-4 w-4" /> 
                                        <span>Delete</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {/* Description */}
                        {job.description && (
                            <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed h-[40px]">
                                {job.description}
                            </p>
                        )}

                        {/* Tags - Pill Style */}
                        <div className="flex flex-wrap gap-1.5 min-h-[22px]">
                            {job.tags && job.tags.length > 0 ? (
                                job.tags.map((tag, key) => (
                                    <span key={key} className="px-2.5 py-0.5 text-[11px] font-semibold bg-blue-50 text-blue-500 rounded-full">
                                        {tag}
                                    </span>
                                ))
                            ) : (
                                <div className="h-5" /> // Spacer
                            )}
                        </div>

                        {/* Footer: External Link icon in red like screenshot */}
                        <div className="pt-1 flex items-center">
                            {job.jobUrl && (
                                <a 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()} 
                                    href={job.jobUrl}
                                    className="text-red-400 hover:text-red-600 transition-colors"
                                    title="Open Job Link"
                                >
                                    <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
