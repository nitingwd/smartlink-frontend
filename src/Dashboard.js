import { useEffect, useState } from "react";
import API from "../api";

export default function Dashboard() {
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState({ title: "", url: "" });
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  // Fetch paginated links
  useEffect(() => {
    API.get(`/links?page=${page}&limit=5`)
      .then((res) => {
        setLinks(res.data.items);
        setTotal(res.data.total);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [page]);

  // Add new link
  const handleAddLink = (e) => {
    e.preventDefault();
    API.post("/links", newLink)
      .then((res) => {
        setLinks([...links, res.data]);
        setNewLink({ title: "", url: "" });
      })
      .catch((err) => console.error("POST error:", err));
  };

  // Delete link
  const handleDelete = (id) => {
    API.delete(`/links/${id}`)
      .then(() => setLinks(links.filter((link) => link.id !== id)))
      .catch((err) => console.error("DELETE error:", err));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">📊 Dashboard</h2>

      {/* Add Link Form */}
      <form onSubmit={handleAddLink} className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="url"
          placeholder="URL"
          value={newLink.url}
          onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Add Link
        </button>
      </form>

      {/* Link List */}
      <ul className="space-y-3">
        {links.map((link) => (
          <li
            key={link.id}
            className="bg-white shadow p-4 rounded border border-gray-200 flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold text-indigo-700">{link.title}</h3>
              <p className="text-sm text-gray-600">{link.url}</p>
            </div>
            <button
              onClick={() => handleDelete(link.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="flex gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Prev
        </button>
        <span>Page {page}</span>
        <button
          disabled={page * 5 >= total}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}
