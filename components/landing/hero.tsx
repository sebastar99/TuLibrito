import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container mx-auto flex flex-col items-center gap-6 py-24 text-center md:py-32 px-4">
      <div className="flex flex-col items-center gap-4 w-full max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Sistema profesional de reservas de libros
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Gestiona reservas, catálogo y usuarios de tu biblioteca con una
          plataforma moderna, segura y fácil de usar.
        </p>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row">
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
