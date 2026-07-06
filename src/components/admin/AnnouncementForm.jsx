import { useState } from "react";
import { createAnnouncement } from "../../services/announcementService";

export default function AnnouncementForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Announcement");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await createAnnouncement({
        title,
        description,
        category,
      });

      alert("✅ Announcement Published");

      setTitle("");
      setDescription("");
      setCategory("Announcement");
    } catch (err) {
      console.error(err);
      alert("Failed to publish.");
    }

    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-8 shadow"
    >
      <h2 className="mb-6 text-3xl font-bold">
        📢 New Announcement
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-4 w-full rounded-xl border p-4"
        required
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="mb-4 h-40 w-full rounded-xl border p-4"
        required
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="mb-6 w-full rounded-xl border p-4"
      >
        <option>Announcement</option>
        <option>Event</option>
        <option>Placement</option>
        <option>Material</option>
        <option>Achievement</option>
      </select>

      <button
        disabled={loading}
        className="rounded-xl bg-blue-600 px-8 py-3 text-white"
      >
        {loading ? "Publishing..." : "Publish"}
      </button>
    </form>
  );
}