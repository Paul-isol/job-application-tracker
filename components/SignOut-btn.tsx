"use client";

import { signOut } from "@/lib/auth/auth";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function SignOutBtn() {
    return (
        <Button onClick={async ()=> await signOut()} className="w-full text-left">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
        </Button>
    );
}