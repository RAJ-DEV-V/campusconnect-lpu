import Container from "../Container";
import { Button } from "@/components/ui/button";
import Stats from "./Stats";
import { signInWithGoogle } from "../../services/auth";

export default function Hero() {
  return (
    <Container>
      <section className="py-32 text-center">

        <h1 className="text-6xl font-extrabold tracking-tight leading-tight">
          Build Your Professional

          <span className="block text-blue-600">
            Network at LPU
          </span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-600">
          Discover classmates, alumni and future collaborators.
          Grow your LinkedIn network with verified LPU students.
        </p>

        <Button
          size="lg"
          className="mt-10 rounded-xl px-8 py-6 text-base bg-black hover:bg-slate-900 transition-all duration-300 shadow-lg hover:scale-105"
          onClick={signInWithGoogle}
        >
          Continue with Google
        </Button>

        <Stats />
      </section>
    </Container>
  );
}