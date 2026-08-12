import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight, Star } from "lucide-react"

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-dot-grid py-24 px-6 md:px-12">
      <div className="max-w-6xl mx-auto space-y-24">
        
        {/* Header */}
        <section className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight text-foreground">
            Playful Geometric <span className="text-accent inline-block animate-wiggle">System</span>
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl">
            A stable grid with wild decoration. Memphis-inspired, bouncy, and tactile.
          </p>
        </section>

        {/* Buttons */}
        <section className="space-y-8">
          <h2 className="text-3xl font-display font-bold border-b-4 border-foreground pb-2 inline-block">
            Buttons
          </h2>
          <div className="flex flex-wrap gap-8 items-center">
            <Button size="lg" className="group">
              Primary Action
              <div className="bg-white rounded-full p-1 ml-2 transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight className="text-accent" />
              </div>
            </Button>
            <Button size="lg" variant="secondary">
              Secondary Outline
            </Button>
            <Button size="lg" variant="destructive">
              Destructive
            </Button>
            <Button size="default" variant="ghost">
              Ghost Button
            </Button>
          </div>
        </section>

        {/* Inputs */}
        <section className="space-y-8">
          <h2 className="text-3xl font-display font-bold border-b-4 border-foreground pb-2 inline-block">
            Inputs & Forms
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="hello@editconnect.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="error">Error State</Label>
              <Input id="error" type="text" placeholder="Invalid input..." aria-invalid="true" />
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-8">
          <h2 className="text-3xl font-display font-bold border-b-4 border-foreground pb-2 inline-block">
            Sticker Cards
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Standard Card</CardTitle>
                <CardDescription>A simple sticker card</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Content goes here. It feels tactile and bouncy.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full">Action</Button>
              </CardFooter>
            </Card>

            <Card className="shadow-[var(--shadow-sticker-featured)] -rotate-1 relative">
              <CardAction>
                <div className="bg-tertiary border-2 border-foreground rounded-full p-3 shadow-[var(--shadow-pop)] -mr-2 -mt-2 rotate-12">
                  <Star className="text-foreground fill-foreground" size={24} />
                </div>
              </CardAction>
              <CardHeader>
                <CardTitle>Featured Card</CardTitle>
                <CardDescription>Pink shadow, slight tilt</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This card stands out with a pink shadow and a decorative badge.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" variant="secondary" className="w-full">View Featured</Button>
              </CardFooter>
            </Card>

            {/* Blob Shape Card Demo */}
            <Card className="rounded-tl-[32px] rounded-br-[32px] rounded-tr-none rounded-bl-none">
              <CardHeader>
                <CardTitle>Blob Shape</CardTitle>
                <CardDescription>Custom border radius</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Mixing rounded and sharp corners for a leaf/blob effect.</p>
              </CardContent>
              <CardFooter>
                <Button size="sm" className="w-full group">
                  Go
                  <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

      </div>
    </div>
  )
}
