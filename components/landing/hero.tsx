import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container relative mx-auto flex flex-col items-center gap-8 overflow-hidden px-4 py-24 text-center md:py-32">
      <div className="absolute left-1/2 top-10 -z-10 size-72 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400/30 via-sky-300/30 to-emerald-300/30 blur-3xl" />
      <div className="animate-soft-in flex w-full max-w-4xl flex-col items-center gap-5">
        <div className="rounded-full border border-white/70 bg-white/70 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur">
          Biblioteca digital moderna
        </div>
        <h1 className="bg-gradient-to-r from-slate-950 via-indigo-700 to-sky-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl">
          Sistema profesional de reservas de libros
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Gestiona reservas, catálogo y usuarios de tu biblioteca con una
          plataforma moderna, segura y fácil de usar.
        </p>
      </div>
      <div className="animate-soft-in flex flex-col gap-4 sm:flex-row">
        <Link href="/login">
          <Button size="lg">Comenzar ahora</Button>
        </Link>
        <Link href="/register">
          <Button variant="outline" size="lg">Crear cuenta</Button>
        </Link>
      </div>
    </section>
  );
}
