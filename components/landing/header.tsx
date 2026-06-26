import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 flex h-16 items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">Book</span>Reserve
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Iniciar sesión
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
