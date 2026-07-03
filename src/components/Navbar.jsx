import Container from "./Container";

export default function Navbar() {
  return (
    <nav className="py-6">
      <Container>
        <div className="flex justify-between items-center">

          <h1 className="text-2xl font-bold text-blue-600">
            CampusConnect
          </h1>

          <button className="text-sm font-medium">
            Login
          </button>

        </div>
      </Container>
    </nav>
  );
}