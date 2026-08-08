import { useState } from "react";
import { Plus, Trash2, ExternalLink, GripVertical } from "lucide-react";
import { useToast } from "../../../components/feedback/Toast";

const defaultPortfolios = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    description: "A modern dashboard for e-commerce analytics",
    link: "https://github.com/user/ecommerce-dashboard",
    image: null,
  },
  {
    id: 2,
    title: "Portfolio Website",
    description: "Personal portfolio built with React and Tailwind",
    link: "https://myportfolio.com",
    image: null,
  },
];

export default function PortfolioSection({ portfolios = defaultPortfolios, onChange }) {
  const { addToast } = useToast();
  const [items, setItems] = useState(portfolios);
  const [isEditing, setIsEditing] = useState(false);
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    link: "",
    image: null,
  });

  const handleAdd = () => {
    if (!newItem.title || !newItem.link) {
      addToast({
        variant: "error",
        title: "Missing Fields",
        description: "Title and link are required.",
      });
      return;
    }

    const item = {
      ...newItem,
      id: Date.now(),
    };
    const updatedItems = [...items, item];
    setItems(updatedItems);
    onChange?.(updatedItems);
    setNewItem({ title: "", description: "", link: "", image: null });
  };

  const handleRemove = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    onChange?.(updatedItems);
  };

  const handleAddItem = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  if (!isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Portfolio Projects</h3>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="group rounded-lg border bg-card p-4 transition-shadow hover:shadow-md"
            >
              <div className="aspect-video rounded-md bg-gray-100 mb-3 flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover rounded-md"
                  />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">
                    {item.title?.charAt(0)}
                  </span>
                )}
              </div>
              <h4 className="font-medium">{item.title}</h4>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {item.description}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Portfolio Projects</h3>
        <button
          onClick={() => setIsEditing(false)}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          Done
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="relative rounded-lg border bg-card p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                Item #{index + 1}
              </span>
              <button
                onClick={() => handleRemove(item.id)}
                className="rounded-md p-1 text-red-600 hover:bg-red-50"
                aria-label="Remove project"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <h4 className="font-medium">{item.title}</h4>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {item.description}
            </p>
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex items-center gap-1 text-sm text-primary-600"
            >
              <ExternalLink className="h-3 w-3" />
              {item.link}
            </a>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-dashed p-4">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Project Title"
            value={newItem.title}
            onChange={(e) => handleAddItem("title", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <textarea
            placeholder="Project Description"
            value={newItem.description}
            onChange={(e) => handleAddItem("description", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
            rows={3}
          />
          <input
            type="url"
            placeholder="Project Link (GitHub, Demo, etc.)"
            value={newItem.link}
            onChange={(e) => handleAddItem("link", e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 flex items-center gap-2 rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          <Plus className="h-4 w-4" />
          Add Project
        </button>
      </div>
    </div>
  );
}

