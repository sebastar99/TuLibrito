export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <section className="mx-auto flex max-w-3xl flex-col items-center gap-6">
        <p className="rounded-full border px-4 py-1 text-sm font-medium text-muted-foreground">
          BookReserve
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          Sistema profesional de reservas de libros
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
          Base inicial lista para construir una aplicación limpia, escalable y
          preparada para Supabase.
        </p>
      </section>
    </main>
  );
}
