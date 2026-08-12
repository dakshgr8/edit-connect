"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Scissors, Menu, X, ArrowRight } from "lucide-react"

export function PublicNav() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <nav className="border-b-2 border-foreground bg-white relative z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="bg-accent text-white p-2 rounded-lg border-2 border-foreground shadow-[2px_2px_0px_#1E293B]">
              <Scissors size={24} />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight">EditConnect</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-bold">
            <Link href="/jobs" className="hover:text-accent transition-colors">Find Work</Link>
            <Link href="/editors" className="hover:text-secondary transition-colors">Hire Editors</Link>
            <Link href="#pricing" className="hover:text-tertiary transition-colors">Pricing</Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" passHref>
              <Button variant="ghost" className="font-bold">Log in</Button>
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/signup" passHref>
              <Button size="sm" className="font-bold">Sign Up</Button>
            </Link>
            <Button variant="outline" size="icon" onClick={toggleMenu} className="shadow-[var(--shadow-pop)]">
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-white border-b-2 border-foreground shadow-[var(--shadow-sticker)] z-40 p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-4 font-bold text-lg">
            <Link href="/jobs" className="hover:text-accent transition-colors border-b-2 border-dashed border-border pb-4" onClick={closeMenu}>Find Work</Link>
            <Link href="/editors" className="hover:text-secondary transition-colors border-b-2 border-dashed border-border pb-4" onClick={closeMenu}>Hire Editors</Link>
            <Link href="#pricing" className="hover:text-tertiary transition-colors border-b-2 border-dashed border-border pb-4" onClick={closeMenu}>Pricing</Link>
            <Link href="/login" className="hover:text-quaternary transition-colors" onClick={closeMenu}>Log In</Link>
          </div>
        </div>
      )}
    </>
  )
}
