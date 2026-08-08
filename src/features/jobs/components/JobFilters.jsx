import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";

const categoryOptions = [
  "Technology",
  "Finance",
  "Healthcare",
  "Marketing",
  "Design",
  "Sales",
  "Operations",
  "Customer Service",
];

const experienceOptions = ["ENTRY", "MID", "SENIOR", "LEAD", "EXECUTIVE"];

export default function JobFilters({ filters, onChange, onReset }) {
  const [expandedSection, setExpandedSection] = useState("all");

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleFilterChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const handleToggleOption = (key, option) => {
    const current = filters[key] || [];
    const updated = current.includes(option)
      ? current.filter((item) => item !== option)
      : [...current, option];
    handleFilterChange(key, updated);
  };

  return (
    <div className="space-y-4">
      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        onClick={onReset}
      >
        Reset Filters
      </Button>

      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4 text-left"
          onClick={() => toggleSection("experience")}
        >
          <span className="font-medium">Experience Level</span>
          {expandedSection === "experience" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSection === "experience" && (
          <div className="border-t px-4 pb-4">
            {experienceOptions.map((level) => (
              <label
                key={level}
                className="flex items-center gap-2 py-2"
              >
                <input
                  type="checkbox"
                  checked={filters.experienceLevel?.includes(level) || false}
                  onChange={() =>
                    handleToggleOption("experienceLevel", level)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary-600"
                />
                <span className="text-sm">{level}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4 text-left"
          onClick={() => toggleSection("category")}
        >
          <span className="font-medium">Category</span>
          {expandedSection === "category" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSection === "category" && (
          <div className="border-t px-4 pb-4">
            {categoryOptions.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 py-2"
              >
                <input
                  type="checkbox"
                  checked={filters.category?.includes(category) || false}
                  onChange={() =>
                    handleToggleOption("category", category)
                  }
                  className="h-4 w-4 rounded border-gray-300 text-primary-600"
                />
                <span className="text-sm">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4 text-left"
          onClick={() => toggleSection("salary")}
        >
          <span className="font-medium">Salary Range</span>
          {expandedSection === "salary" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSection === "salary" && (
          <div className="border-t px-4 pb-4 space-y-3">
            <div>
              <label className="block text-sm">Min</label>
              <input
                type="number"
                placeholder="$0"
                value={filters.salaryMin || ""}
                onChange={(e) =>
                  handleFilterChange("salaryMin", e.target.value)
                }
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm">Max</label>
              <input
                type="number"
                placeholder="$200,000+"
                value={filters.salaryMax || ""}
                onChange={(e) =>
                  handleFilterChange("salaryMax", e.target.value)
                }
                className="mt-1 w-full rounded-md border px-3 py-2"
              />
            </div>
          </div>
        )}
      </div>

      <div className="border rounded-lg">
        <button
          className="flex w-full items-center justify-between p-4 text-left"
          onClick={() => toggleSection("type")}
        >
          <span className="font-medium">Job Type</span>
          {expandedSection === "type" ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
        {expandedSection === "type" && (
          <div className="border-t px-4 pb-4">
            {["FULL_TIME", "PART_TIME", "CONTRACT", "REMOTE"].map(
              (type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 py-2"
                >
                  <input
                    type="checkbox"
                    checked={filters.type?.includes(type) || false}
                    onChange={() => handleToggleOption("type", type)}
                    className="h-4 w-4 rounded border-gray-300 text-primary-600"
                  />
                  <Badge variant="default" size="sm">
                    {type}
                  </Badge>
                </label>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

