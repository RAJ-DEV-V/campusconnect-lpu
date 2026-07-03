export default function Features() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-6xl px-6">

        <h2 className="mb-12 text-center text-4xl font-bold">
          Why CampusConnect?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">👥 Verified Students</h3>
            <p className="mt-3 text-slate-600">
              Connect with real LPU students.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">🔗 LinkedIn Networking</h3>
            <p className="mt-3 text-slate-600">
              Open profiles with one click.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">🔍 Smart Search</h3>
            <p className="mt-3 text-slate-600">
              Find students by branch and year.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow">
            <h3 className="text-xl font-semibold">📱 Responsive</h3>
            <p className="mt-3 text-slate-600">
              Works on desktop and mobile.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}