import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star, Scissors, Video, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-hidden font-body">
      {/* Navigation */}
      <nav className="border-b-2 border-foreground bg-white relative z-20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-accent text-white p-2 rounded-lg border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">
              <Scissors size={24} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">EditConnect</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-bold">
            <Link href="#" className="hover:text-accent transition-colors">Find Work</Link>
            <Link href="#" className="hover:text-secondary transition-colors">Hire Editors</Link>
            <Link href="#" className="hover:text-tertiary transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="hidden md:inline-flex font-bold">Log in</Button>
            <Button>
              Sign Up
              <div className="bg-white rounded-full p-0.5 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="text-accent" size={16} />
              </div>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-6">
        {/* Massive Yellow Circle Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -left-64 -top-64 w-[800px] h-[800px] bg-tertiary rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-full h-full bg-dot-grid opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Left Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground bg-white shadow-[var(--shadow-pop)] font-bold text-sm">
              <Star className="text-tertiary fill-tertiary" size={16} />
              <span>The #1 Marketplace for Video Editors</span>
            </div>
            
            <h1 className="text-6xl lg:text-7xl font-display font-extrabold leading-[0.95] tracking-tight">
              Turn Raw Footage Into <span className="text-secondary inline-block animate-wiggle">Pure Gold.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Connect with top-tier video editors for YouTube, TikTok, and Commercials. No commissions. Just great talent.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="group text-lg h-14">
                Hire a Professional
                <div className="bg-white rounded-full p-1 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="text-accent" />
                </div>
              </Button>
              <Button size="lg" variant="secondary" className="text-lg h-14 bg-white hover:bg-quaternary transition-colors">
                Apply as Editor
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-8 flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-12 h-12 rounded-full border-2 border-foreground bg-muted overflow-hidden relative">
                    <Image src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="Avatar" layout="fill" />
                  </div>
                ))}
              </div>
              <div className="font-bold text-sm">
                <p>Join 10,000+ creators</p>
                <p className="text-accent">already making magic.</p>
              </div>
            </div>
          </div>

          {/* Right Image/Graphic area */}
          <div className="relative w-full h-[600px] hidden lg:block">
            {/* Blob shape image container */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] border-2 border-foreground bg-accent rounded-[100px_40px_100px_40px] overflow-hidden shadow-[12px_12px_0px_#1E293B] group">
              {/* Using a placeholder gradient for the image to simulate video editing software */}
              <div className="w-full h-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-x-8 bottom-8 h-32 bg-foreground/90 rounded-2xl border-2 border-white/20 p-4 flex flex-col justify-between backdrop-blur-sm group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex gap-2">
                    <div className="w-16 h-8 bg-quaternary rounded-full border-2 border-black" />
                    <div className="w-32 h-8 bg-tertiary rounded-full border-2 border-black" />
                    <div className="w-8 h-8 bg-secondary rounded-full border-2 border-black" />
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-quaternary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Element 1 */}
            <div className="absolute top-12 right-[450px] bg-white border-2 border-foreground p-4 rounded-2xl shadow-[var(--shadow-pop)] animate-[bounce_4s_infinite]">
              <div className="flex gap-3 items-center">
                <div className="bg-tertiary p-2 rounded-full border-2 border-foreground">
                  <Video size={20} className="text-foreground" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-muted-foreground">New Project</p>
                  <p className="font-bold">YouTube Vlog Edit</p>
                </div>
              </div>
            </div>

            {/* Floating Element 2 */}
            <div className="absolute bottom-24 -right-8 bg-secondary text-white border-2 border-foreground px-6 py-3 rounded-full shadow-[var(--shadow-pop)] animate-[bounce_5s_infinite_reverse] rotate-6">
              <span className="font-bold font-display text-xl tracking-wide">MATCHED! 💥</span>
            </div>
          </div>

        </div>
      </section>
    </main>
  )
}
