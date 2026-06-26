const technologies = [
  { name: "Next.js 15", description: "Framework React de última generación" },
  { name: "React 19", description: "Biblioteca UI moderna y performante" },
  { name: "Supabase", description: "Backend como servicio con base de datos" },
  { name: "TailwindCSS", description: "Framework CSS para diseño rápido" },
  { name: "shadcn/ui", description: "Componentes UI reutilizables y accesibles" },
  { name: "TypeScript", description: "Tipado estático para mayor seguridad" },
];

export function Technologies() {
  return (
    <section className="container mx-auto py-24 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Tecnologías utilizadas
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Construido con las mejores herramientas del ecosistema moderno.
        </p>
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="flex flex-col gap-2 rounded-lg border p-6"
          >
            <h3 className="font-semibold">{tech.name}</h3>
            <p className="text-sm text-muted-foreground">{tech.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
