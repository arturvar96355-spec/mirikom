import { PageShell } from "@/components/sections/PageShell";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <PageShell>
      <section className="container-x pb-32 pt-44 text-center">
        <p className="font-mono text-sm text-volt">ERROR 404</p>
        <h1 className="h-display mt-4 text-6xl md:text-9xl">Не туда свернули</h1>
        <p className="mt-6 text-chrome/70">Такой страницы нет. Вернёмся на главную.</p>
        <div className="mt-8"><Button href="/">На главную</Button></div>
      </section>
    </PageShell>
  );
}
