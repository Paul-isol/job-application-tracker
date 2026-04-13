"use client";

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useState } from "react";
import { createJobApplication } from "@/lib/actions/job-applications";
import { Spinner } from "./ui/spinner";

interface JobAppCreateDialog {
    columnId: string;
    boardId: string;
}
const INITIAL_FORM_DATA = {
  company: "",
  position: "",
  location: "",
  salary: "",
  jobUrl: "",
  tag: "",
  description: "",
  note: "",
};
export default function CreateJobAppDialog({columnId, boardId}: JobAppCreateDialog){
    const [open, setOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()
      setIsSubmitting(true)

      try {
        const result = await createJobApplication({
          ...formData,
          columnId,
          boardId,
          tags: formData.tag.split(",").map((tag)=>tag.trim()).filter((tag)=>tag.length > 0)
        })

        if(!result.error){
          setFormData(INITIAL_FORM_DATA)
          setOpen(false)
        } else {
          console.error(result.error)
        }
      } catch(error){
        console.log(error)
      } finally {
        setIsSubmitting(false)
      }
    }
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="w-full h-11 border-dashed border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:border-slate-300 transition-all gap-2 font-medium shadow-sm">
              <Plus className="h-4 w-4" />
              <span>Add Job</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-slate-200 shadow-2xl">
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-xl font-bold text-slate-900">New Job Application</DialogTitle>
              <DialogDescription className="text-slate-500">
                Enter the details of the job opportunity to start tracking it.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="p-6 pt-4">
              <div className="space-y-5">
                {/* Row 1: Company & Position */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-[13px] font-semibold text-slate-700">Company <span className="text-red-500">*</span></Label>
                    <Input 
                        type="text" 
                        id="company" 
                        required 
                        placeholder="Google, Stripe, etc."
                        className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                        value={formData.company}
                        onChange={(e)=>setFormData({...formData, company: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="position" className="text-[13px] font-semibold text-slate-700">Position <span className="text-red-500">*</span></Label>
                    <Input 
                        type="text" 
                        id="position" 
                        required 
                        placeholder="Frontend Engineer"
                        className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                        value={formData.position}
                        onChange={(e)=>setFormData({...formData, position: e.target.value})}
                    />
                  </div>
                </div>

                {/* Row 2: Location & Salary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="location" className="text-[13px] font-semibold text-slate-700">Location</Label>
                    <Input 
                        type="text" 
                        id="location" 
                        placeholder="Remote / New York"
                        className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                        value={formData.location}
                        onChange={(e)=>setFormData({...formData, location: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="salary" className="text-[13px] font-semibold text-slate-700">Salary Range</Label>
                    <Input 
                        type="text" 
                        id="salary" 
                        placeholder="e.g. $120k - $150k"
                        className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all text-emerald-600 font-medium placeholder:font-normal placeholder:text-slate-400"
                        value={formData.salary}
                        onChange={(e)=>setFormData({...formData, salary: e.target.value})}
                    />
                  </div>
                </div>

                {/* Full Width: Job URL */}
                <div className="space-y-1.5">
                  <Label htmlFor="jobUrl" className="text-[13px] font-semibold text-slate-700">Listing URL</Label>
                  <Input 
                    type="url" 
                    id="jobUrl" 
                    placeholder="https://linkedin.com/jobs/..."
                    className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                    value={formData.jobUrl}
                    onChange={(e)=>setFormData({...formData, jobUrl: e.target.value})}
                  />
                </div>

                {/* Full Width: Tags */}
                <div className="space-y-1.5">
                  <Label htmlFor="tag" className="text-[13px] font-semibold text-slate-700">Tags</Label>
                  <Input
                    type="text"
                    id="tag"
                    placeholder="Separate with commas (e.g. Next.js, AI, Full-time)"
                    className="h-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all"
                    value={formData.tag}
                    onChange={(e)=>setFormData({...formData, tag: e.target.value})}
                  />
                </div>

                {/* Textareas */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="description" className="text-[13px] font-semibold text-slate-700">Brief Description</Label>
                    <Textarea
                        rows={3}
                        id="description"
                        placeholder="Key responsibilities or tech stack..."
                        className="resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all text-[13px]"
                        value={formData.description}
                        onChange={(e)=>setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="note" className="text-[13px] font-semibold text-slate-700">Personal Notes</Label>
                    <Textarea
                        rows={3}
                        id="note"
                        placeholder="Add your own thoughts or reminders..."
                        className="resize-none border-slate-200 focus:border-blue-400 focus:ring-blue-100 transition-all text-[13px]"
                        value={formData.note}
                        onChange={(e)=>setFormData({...formData, note: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <DialogFooter className="mt-8 pt-6 border-t border-slate-100">
                  <DialogClose asChild>
                      <Button variant="ghost" type="button" className="text-slate-500 hover:text-slate-900">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" disabled={isSubmitting} className="bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all px-8">
                    {isSubmitting ? <Spinner /> : "Create Application"}
                  </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
}