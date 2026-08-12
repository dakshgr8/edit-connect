import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "./actions"

export default async function LoginPage(props: { searchParams: Promise<{ message?: string, next?: string }> }) {
  const searchParams = await props.searchParams
  return (
    <div className="min-h-screen bg-dot-grid flex items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-secondary opacity-50 blur-3xl rounded-full mix-blend-multiply pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-bold mb-6 hover:text-accent transition-colors">
          &larr; Back to home
        </Link>
        <Card className="shadow-[var(--shadow-sticker-featured)] -rotate-1 relative">
          <CardHeader>
            <CardTitle className="text-3xl">Welcome Back</CardTitle>
            <CardDescription>Log in to your EditConnect account.</CardDescription>
          </CardHeader>
          <CardContent>
            <form id="login-form" action={login} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="hello@editconnect.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-xs font-bold text-accent hover:underline">Forgot password?</Link>
                </div>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              
              {searchParams?.message && (
                <p className="text-sm font-bold text-destructive bg-destructive/10 p-3 rounded-lg border-2 border-destructive">
                  {searchParams.message}
                </p>
              )}
              
              {searchParams?.next && (
                <input type="hidden" name="next" value={searchParams.next} />
              )}
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button form="login-form" type="submit" className="w-full">
              Log In
            </Button>
            <p className="text-sm text-center text-muted-foreground w-full">
              Don't have an account?{" "}
              <Link href={`/signup${searchParams?.next ? `?next=${searchParams.next}` : ''}`} className="text-accent font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
