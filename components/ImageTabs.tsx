"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
export default function ImageTabs() {
    const [activeTab, setActiveTab] = useState("organize");
    return (
      <section className="border-t py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="flex gap-2 justify-center mb-8">
              <Button
                onClick={() => setActiveTab("organize")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "organize"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Organize Applications
              </Button>
              <Button
                onClick={() => setActiveTab("get-hired")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "get-hired"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Get Hired
              </Button>
              <Button
                onClick={() => setActiveTab("manage-boards")}
                className={`rounded-lg px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === "manage-boards"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Manage Boards
              </Button>
            </div>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-lg border border-gray-200 shadow-xl">
              {activeTab === "organize" && (
                <Image
                  src="/hero-images/hero1.png"
                  alt="hero-1"
                  width={1200}
                  height={800}
                />
              )}
              {activeTab === "get-hired" && (
                <Image
                  src="/hero-images/hero2.png"
                  alt="hero-1"
                  width={1200}
                  height={800}
                />
              )}
              {activeTab === "manage-boards" && (
                <Image
                  src="/hero-images/hero3.png"
                  alt="hero-1"
                  width={1200}
                  height={800}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
}