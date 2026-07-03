import Container from "./Container";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 pt-6">
      <Container>
        <nav className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-6 py-4 shadow-lg backdrop-blur-xl">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white">
              C
            </div>

            <div>

              <h1 className="text-lg font-bold">
                CampusConnect
              </h1>

              <p className="text-xs text-slate-500">
                LPU Edition
              </p>

            </div>

          </div>

          {/* Navigation */}

          <div className="hidden gap-8 text-sm font-medium text-slate-600 md:flex">

            <a href="/" className="transition hover:text-blue-600">
              Home
            </a>

            <a href="/members" className="transition hover:text-blue-600">
              Members
            </a>

            <a href="#" className="transition hover:text-blue-600">
              About
            </a>

          </div>

          <Button>
            Sign In
          </Button>

        </nav>
      </Container>
    </header>
  );
}