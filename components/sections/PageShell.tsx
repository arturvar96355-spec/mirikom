import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileBar } from "./MobileBar";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <MobileBar />
    </>
  );
}
