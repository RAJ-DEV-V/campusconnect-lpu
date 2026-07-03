export default function Stats() {
  const stats = [
    {
      title: "Students Joined",
      value: "600+",
      icon: "👥",
    },
    {
      title: "Connections Started",
      value: "1000+",
      icon: "🔗",
    },
    {
      title: "Growing Every Day",
      value: "🚀",
      icon: "📈",
    },
  ];

  return (
    <section className="mt-16">
      <div className="grid gap-6 md:grid-cols-3">

        {stats.map((stat) => (

          <div
            key={stat.title}
            className="rounded-2xl border border-white/40 bg-white/70 p-6 text-center shadow-lg backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-xl"
          >

            <div className="text-3xl">
              {stat.icon}
            </div>

            <h2 className="mt-3 text-3xl font-bold text-blue-600">
              {stat.value}
            </h2>

            <p className="mt-2 text-slate-600">
              {stat.title}
            </p>

          </div>

        ))}

      </div>
    </section>
  );
}