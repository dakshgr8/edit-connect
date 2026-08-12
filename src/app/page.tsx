import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star, Scissors, Video, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden font-body">
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
            <Link href="/jobs" className="hover:text-accent transition-colors">Find Work</Link>
            <Link href="/editors" className="hover:text-secondary transition-colors">Hire Editors</Link>
            <Link href="#pricing" className="hover:text-tertiary transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" passHref>
              <Button variant="ghost" className="hidden md:inline-flex font-bold">Log in</Button>
            </Link>
            <Link href="/signup" passHref>
              <Button>
                Sign Up
                <div className="bg-white rounded-full p-0.5 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="text-accent" size={16} />
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 lg:py-16 px-6">
        {/* Massive Yellow Circle Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -left-64 -top-64 w-[800px] h-[800px] bg-tertiary rounded-full mix-blend-multiply opacity-50 blur-3xl"></div>
          <div className="absolute right-0 bottom-0 w-full h-full bg-dot-grid opacity-30 mask-image:linear-gradient(to_bottom,white,transparent)"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          
          {/* Left Text */}
          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border-2 border-foreground bg-white shadow-[var(--shadow-pop)] font-bold text-sm">
              <Star className="text-tertiary fill-tertiary" size={16} />
              <span>The #1 Marketplace for Video Editors</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-display font-extrabold leading-[0.95] tracking-tight">
              Turn Raw Footage Into <span className="text-secondary inline-block animate-wiggle">Pure Gold.</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Connect with top-tier video editors for YouTube, TikTok, and Commercials. No commissions. Just great talent.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 font-bold text-sm text-slate-700 pb-2">
              <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-green-200 border-2 border-foreground flex items-center justify-center text-green-700 text-xs">✓</div> Verified Portfolios</div>
              <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-green-200 border-2 border-foreground flex items-center justify-center text-green-700 text-xs">✓</div> 0% Commission</div>
              <div className="flex items-center gap-2"><div className="w-5 h-5 rounded-full bg-green-200 border-2 border-foreground flex items-center justify-center text-green-700 text-xs">✓</div> Fast Turnarounds</div>
            </div>
            
            <div className="flex flex-wrap gap-4 pt-1">
              <Link href="/editors">
                <Button size="lg" className="group text-lg h-14 bg-accent hover:bg-slate-800 text-white shadow-[var(--shadow-pop)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_var(--color-accent)] transition-all">
                  Hire a Professional
                  <div className="bg-white rounded-full p-1 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowRight className="text-accent" size={16} />
                  </div>
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="secondary" className="text-lg h-14 bg-white hover:bg-quaternary transition-all shadow-[var(--shadow-pop)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0px_black]">
                  Apply as Editor
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="pt-6 flex flex-col sm:flex-row sm:items-center gap-6 border-t-2 border-dashed border-foreground/20 max-w-lg">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-foreground bg-muted overflow-hidden relative shadow-[2px_2px_0px_black]" style={{ zIndex: 10 - i }}>
                    <Image src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i+10}&backgroundColor=e2e8f0`} alt="Avatar" fill unoptimized />
                  </div>
                ))}
              </div>
              <div className="font-bold">
                <div className="flex items-center gap-1 mb-1 text-tertiary">
                  <Star size={14} className="fill-tertiary" /><Star size={14} className="fill-tertiary" /><Star size={14} className="fill-tertiary" /><Star size={14} className="fill-tertiary" /><Star size={14} className="fill-tertiary" />
                </div>
                <p className="text-sm">Trusted by <span className="text-accent font-black">10,000+</span></p>
                <p className="text-xs text-muted-foreground">creators & brands globally.</p>
              </div>
            </div>
          </div>

          {/* Right Image/Graphic area */}
          <div className="relative w-full h-[500px] hidden lg:block">
            {/* Image container */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[450px] h-[450px] border-4 border-foreground bg-accent rounded-[100px_40px_100px_40px] overflow-hidden shadow-[12px_12px_0px_#1E293B] group">
              <Image 
                src="/hero-editor.jpg" 
                alt="Video Editor Illustration" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>

            {/* Floating Element 1 */}
            <div className="absolute top-12 right-[480px] bg-white border-2 border-foreground p-4 rounded-2xl shadow-[var(--shadow-pop)] animate-[bounce_4s_infinite]">
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
            <div className="absolute bottom-24 -right-4 bg-secondary text-white border-2 border-foreground px-6 py-3 rounded-full shadow-[var(--shadow-pop)] animate-[bounce_5s_infinite_reverse] rotate-6">
              <span className="font-bold font-display text-xl tracking-wide">MATCHED! 💥</span>
            </div>
          </div>

        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-white border-t-2 border-b-2 border-foreground relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-dot-grid opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-5xl font-display font-extrabold tracking-tight">How It Works</h2>
            <p className="text-xl text-muted-foreground">Three steps to your perfect edit.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting dashed line - visible on desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 border-t-4 border-dashed border-foreground/20 -z-10" />

            {[
              { step: 1, title: "Post a Project", desc: "Share your raw footage, style preferences, and budget.", color: "bg-tertiary", rotation: "-rotate-2" },
              { step: 2, title: "Match & Chat", desc: "Review editor portfolios and chat directly to find the perfect fit.", color: "bg-secondary", rotation: "rotate-2" },
              { step: 3, title: "Receive Magic", desc: "Download the final cut, pay securely, and publish.", color: "bg-quaternary", rotation: "-rotate-1" }
            ].map((item, idx) => (
              <div key={idx} className={`relative p-8 bg-white border-2 border-foreground rounded-2xl shadow-[var(--shadow-sticker)] transition-transform hover:scale-105 duration-300 ${item.rotation}`}>
                <div className={`w-16 h-16 ${item.color} rounded-full border-2 border-foreground flex items-center justify-center text-3xl font-bold font-display absolute -top-8 left-8 shadow-[var(--shadow-pop)]`}>
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold font-display mt-4 mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-5xl font-display font-extrabold tracking-tight">Simple Pricing</h2>
            <p className="text-xl text-muted-foreground">No hidden fees. No commission on jobs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
            {/* Basic Tier */}
            <div className="p-8 bg-white border-2 border-foreground rounded-3xl shadow-[var(--shadow-sticker)]">
              <h3 className="text-2xl font-display font-bold">Basic Client</h3>
              <div className="mt-4 mb-8">
                <span className="text-5xl font-black font-display">₹299</span>
                <span className="text-muted-foreground font-bold">/mo</span>
              </div>
              <ul className="space-y-4 font-medium mb-8">
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-accent" /> Post 5 Projects</li>
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-accent" /> Direct Chat</li>
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-accent" /> Standard Support</li>
              </ul>
              <Button variant="secondary" className="w-full">Get Started</Button>
            </div>

            {/* Pro Tier - Scaled up */}
            <div className="p-8 bg-accent text-white border-2 border-foreground rounded-3xl shadow-[12px_12px_0px_#1E293B] md:scale-105 relative z-10">
              <div className="absolute -top-6 -right-6 bg-tertiary text-foreground border-2 border-foreground px-4 py-2 rounded-full font-bold shadow-[var(--shadow-pop)] rotate-12 animate-wiggle">
                MOST POPULAR ⭐
              </div>
              <h3 className="text-2xl font-display font-bold text-tertiary">Pro Client</h3>
              <div className="mt-4 mb-8">
                <span className="text-5xl font-black font-display">₹999</span>
                <span className="font-bold text-white/80">/mo</span>
              </div>
              <ul className="space-y-4 font-medium mb-8">
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-tertiary" /> Unlimited Projects</li>
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-tertiary" /> Priority Support</li>
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-tertiary" /> Featured Listings</li>
              </ul>
              <Button className="w-full bg-tertiary text-foreground hover:bg-white">Upgrade to Pro</Button>
            </div>

            {/* Editor Tier */}
            <div className="p-8 bg-white border-2 border-foreground rounded-3xl shadow-[var(--shadow-sticker)]">
              <h3 className="text-2xl font-display font-bold">Editor Pro</h3>
              <div className="mt-4 mb-8">
                <span className="text-5xl font-black font-display">₹699</span>
                <span className="text-muted-foreground font-bold">/mo</span>
              </div>
              <ul className="space-y-4 font-medium mb-8">
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-secondary" /> Unlimited Applications</li>
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-secondary" /> Featured Profile</li>
                <li className="flex gap-2 items-center"><ArrowRight size={16} className="text-secondary" /> Verified Badge</li>
              </ul>
              <Button variant="secondary" className="w-full">Become an Editor</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
