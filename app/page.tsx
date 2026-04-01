import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-6xl mb-6 font-bold tracking-tight">Track Your Job Applications with Ease</h1>
            <p className="text-muted-foreground mb-10 text-xl">
              Never lose track of your applications again. Stay organized and on
              top of your job search with our intuitive application tracker.
            </p>
            <div className="flex flex-col gap-4 items-center">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 rounded-md">Start Tracking</button>
              <p>Free Forever. No Credit Card Required.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
