import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left max-w-7xl">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">BookReserve</p>
          <p className="text-sm text-muted-foreground">
            Sistema de reservas de libros para bibliotecas.
          </p>
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Link href="/login" className="hover:text-foreground">
            Iniciar sesión
          </Link>
          <Link href="/register" className="hover:text-foreground">
            Crear cuenta
          </Link>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} BookReserve
        </p>
      </div>
    </footer>
  );
}
