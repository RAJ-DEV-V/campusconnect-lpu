import Container from "./Container";

export default function Hero() {
  return (
    <Container>

      <section className="py-28 text-center">

        <h1 className="text-6xl font-bold">

          Connect with
          <span className="text-blue-600">
            {" "}LPU Students
          </span>

        </h1>

        <p className="mt-6 text-xl text-gray-600">

          Build your professional LinkedIn network with fellow students.

        </p>

        <button className="mt-10 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition">

          Continue with Google

        </button>

      </section>

    </Container>
  );
}