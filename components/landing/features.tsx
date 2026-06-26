import { BookOpen, Clock, Shield, Users } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Catálogo completo",
    description:
      "Explora y busca libros con filtros avanzados por autor, categoría y disponibilidad.",
  },
  {
    icon: Clock,
    title: "Reservas en tiempo real",
    description:
      "Sistema de reservas automático que gestiona la disponibilidad de libros.",
  },
  {
    icon: Shield,
    title: "Seguridad y roles",
    description:
      "Control de acceso con roles de administrador y usuario para proteger datos.",
  },
  {
    icon: Users,
    title: "Gestión de usuarios",
    description:
      "Panel administrativo para gestionar usuarios, reservas y contenido del sistema.",
  },
];

export function Features() {
  return (
    <section className="container mx-auto py-24 px-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Características principales
        </h2>
        <p className="max-w-2xl text-muted-foreground">
          Todo lo que necesitas para gestionar una biblioteca moderna.
        </p>
      </div>
      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="flex flex-col items-center gap-4 rounded-lg border p-6 text-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
                <Icon className="size-6 text-primary" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
