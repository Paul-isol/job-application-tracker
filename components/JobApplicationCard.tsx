"use client";
import { Column, JobApplication } from "@/lib/models/models.types";
import { Card, CardContent } from "./ui/card";
import { Edit2, ExternalLink, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  deleteJobApplication,
  updateJobApplication,
} from "@/lib/actions/job-applications";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Spinner } from "./ui/spinner";
import { Textarea } from "./ui/textarea";
import { useState } from "react";

export default function JobApplicationCard({
  job,
  columns,
}: {
  job: JobApplication;
  columns: Column[];
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    location: job.location || "",
    salary: job.salary || "",
    jobUrl: job.jobUrl || "",
    tags: job.tags?.join(", ") || "",
    description: job.description || "",
    columnId: job.columnId || "",
    notes: job.notes || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await updateJobApplication(job._id.toString(), {
        ...formData,
        tags: formData.tags.split(",").map((tag) => tag.trim()),
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating job:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete() {
    try {
      const result = await deleteJobApplication(job._id.toString());
      if (result.error) {
        console.error("Error deleting job:", result.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  }

  async function handleMove(columnId: string) {
    try {
      await updateJobApplication(job._id.toString(), { columnId });
    } catch (error) {
      console.error("Error moving job:", error);
    }
  }
  return (
    <>
      <div className="group relative">
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-[#E8E3D5] bg-white cursor-pointer rounded-[1.25rem]">
          <CardContent className="p-6">
            <div className="flex flex-col gap-3">
              {/* Status/Actions Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-1 min-w-0 flex-1">
                  <h3
                    className="font-serif font-semibold text-[#2C3D30] leading-tight truncate text-[18px]"
                    title={job.position}
                  >
                    {job.position}
                  </h3>
                  <div className="text-[14px] text-[#6B7B6B] font-medium tracking-wide">
                    {job.company}
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-[#A3B19B] hover:text-[#6B7B6B] hover:bg-[#F9F6F0] opacity-0 group-hover:opacity-100 transition-all rounded-full flex-shrink-0"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-52 p-1.5 shadow-xl border-[#E8E3D5] rounded-xl"
                  >
                    <DropdownMenuItem
                      className="gap-2.5 cursor-pointer rounded-lg py-2 hover:bg-[#F9F6F0]"
                      onClick={() => setIsEditing(true)}
                    >
                      <Edit2 className="h-4 w-4 text-[#8C9A81]" />
                      <span className="font-medium text-[#2C3D30]">Edit Details</span>
                    </DropdownMenuItem>
                    {columns.length > 0 && (
                      <>
                        <div className="h-px bg-[#E8E3D5] my-1.5" />
                        <div className="px-2.5 py-1 text-[10px] font-bold text-[#A3B19B] uppercase tracking-widest mb-1">
                          Move to
                        </div>
                        {columns
                          .filter(
                            (c) =>
                              c._id.toString() !== job.columnId?.toString(),
                          )
                          .map((column) => (
                            <DropdownMenuItem
                              key={column._id.toString()}
                              onClick={() => handleMove(column._id)}
                              className="gap-2.5 cursor-pointer rounded-lg py-2 text-[#6B7B6B] font-medium hover:bg-[#F9F6F0]"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-[#D4A373]" />
                              <span>{column.name}</span>
                            </DropdownMenuItem>
                          ))}
                      </>
                    )}
                    <div className="h-px bg-[#E8E3D5] my-1.5" />
                    <DropdownMenuItem
                      onClick={handleDelete}
                      className="gap-2.5 cursor-pointer rounded-lg py-2 text-[#E06D60] font-medium hover:bg-[#FDF3F2] focus:bg-[#FDF3F2]"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Description */}
              {job.description && (
                <p className="text-[13px] text-[#A3B19B] line-clamp-2 leading-relaxed h-[40px] font-light">
                  {job.description}
                </p>
              )}

              {/* Tags - Pill Style */}
              <div className="flex flex-wrap gap-2 min-h-[24px] mt-1">
                {job.tags && job.tags.length > 0 ? (
                  job.tags.map((tag, key) => (
                    <span
                      key={key}
                      className="px-3 py-1 text-[11px] font-medium bg-[#F1EFE7] text-[#6B7B6B] rounded-full tracking-wide border border-[#E8E3D5]"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <div className="h-6" /> // Spacer
                )}
              </div>

              {/* Footer: External Link icon aligned to aesthetic */}
              <div className="pt-2 flex items-center">
                {job.jobUrl && (
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    href={job.jobUrl}
                    className="text-[#D4A373] hover:text-[#C27B66] transition-colors"
                    title="Open Job Link"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-[#E8E3D5] shadow-2xl rounded-3xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-serif font-bold text-[#2C3D30]">
              Edit Job Application
            </DialogTitle>
            <DialogDescription className="text-[#6B7B6B]">
              Enter the details of the job opportunity to start tracking it.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate} className="p-6 pt-4">
            <div className="space-y-5">
              {/* Row 1: Company & Position */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="company"
                    className="text-[13px] font-semibold text-slate-700"
                  >
                    Company <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="company"
                    required
                    placeholder="Google, Stripe, etc."
                    className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="position"
                    className="text-[13px] font-semibold text-slate-700"
                  >
                    Position <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="position"
                    required
                    placeholder="Frontend Engineer"
                    className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Row 2: Location & Salary */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="location"
                    className="text-[13px] font-semibold text-slate-700"
                  >
                    Location
                  </Label>
                  <Input
                    type="text"
                    id="location"
                    placeholder="Remote / New York"
                    className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="salary"
                    className="text-[13px] font-semibold text-slate-700"
                  >
                    Salary Range
                  </Label>
                  <Input
                    type="text"
                    id="salary"
                    placeholder="e.g. $120k - $150k"
                    className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all text-emerald-600 font-medium placeholder:font-normal placeholder:text-slate-400"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Full Width: Job URL */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="jobUrl"
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Listing URL
                </Label>
                <Input
                  type="url"
                  id="jobUrl"
                  placeholder="https://linkedin.com/jobs/..."
                  className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                  value={formData.jobUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, jobUrl: e.target.value })
                  }
                />
              </div>

              {/* Full Width: Tags */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="tag"
                  className="text-[13px] font-semibold text-slate-700"
                >
                  Tags
                </Label>
                <Input
                  type="text"
                  id="tag"
                  placeholder="Separate with commas (e.g. Next.js, AI, Full-time)"
                  className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                />
              </div>

              {/* Textareas */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="description"
                    className="text-[13px] font-semibold text-slate-700"
                  >
                    Brief Description
                  </Label>
                  <Textarea
                    rows={3}
                    id="description"
                    placeholder="Key responsibilities or tech stack..."
                    className="resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all text-[13px]"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="note"
                    className="text-[13px] font-semibold text-slate-700"
                  >
                    Personal Notes
                  </Label>
                  <Textarea
                    rows={3}
                    id="note"
                    placeholder="Add your own thoughts or reminders..."
                    className="resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all text-[13px]"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <DialogFooter className="mt-8 pt-6 border-t border-[#E8E3D5]">
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="text-[#6B7B6B] hover:text-[#2C3D30]"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#8C9A81] text-white hover:bg-[#6e7a64] shadow-md transition-all px-8 rounded-xl"
              >
                {isSubmitting ? <Spinner /> : "Update Application"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
