import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "../../../hooks/useDebounce";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";

export default function JobSearchHeader({
  onSearch,
  onFilterChange,
  isLoading,
}) {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    onSearch(debouncedSearch);
  }, [debouncedSearch, onSearch]);

  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <Input
          type="search"
          placeholder="Job title, keywords, or company"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10"
          leftIcon={Search}
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        className="mt-4 w-full sm:w-auto"
        loading={isLoading}
        onClick={() => onSearch(searchValue)}
      >
        Search Jobs
      </Button>
    </div>
  );
}

