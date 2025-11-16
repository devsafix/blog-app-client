"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function BlogSearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("search") || "");
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Update URL effect
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedQuery) {
      params.set("search", debouncedQuery);
      params.set("page", "1");
    } else {
      params.delete("search");
    }

    // Only push if the search param actually changed
    if (searchParams.get("search") !== debouncedQuery) {
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [debouncedQuery, pathname, router, searchParams]);

  return (
    <div className="relative mb-12">
      <Input
        type="search"
        placeholder="Search articles by title or content..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-12 pl-12 pr-4 text-base"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
    </div>
  );
}
