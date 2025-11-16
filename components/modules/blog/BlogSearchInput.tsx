"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  initialSearch?: string;
};

export function BlogSearchInput({ initialSearch = "" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const [query, setQuery] = useState(initialSearch);
  const [debouncedQuery, setDebouncedQuery] = useState(initialSearch);

  console.log(debouncedQuery);

  // Debounce effect - wait 500ms after user stops typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(handler);
  }, [query]);

  // Update URL when debounced query changes
  useEffect(() => {
    if (debouncedQuery === initialSearch) return; // Avoid unnecessary navigation

    const params = new URLSearchParams();

    if (debouncedQuery) {
      params.set("search", debouncedQuery);
      params.set("page", "1"); // Reset to page 1 on new search
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }, [debouncedQuery, pathname, router, initialSearch]);

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    startTransition(() => {
      router.push(pathname);
    });
  };

  const isSearching = isPending || query !== debouncedQuery;

  return (
    <div className="mb-12">
      <div className="relative max-w-2xl mx-auto">
        <div className="relative">
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            {isSearching ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </div>

          {/* Input Field */}
          <Input
            type="search"
            placeholder="Search articles by title, content, or tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 pl-12 pr-24 text-base shadow-sm border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          />

          {/* Clear Button */}
          {query && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 gap-1 text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>

        {/* Search Tips */}
        {!query && (
          <p className="mt-3 text-sm text-gray-500 text-center">
            💡 Try searching for &quot;Next.js&quot;, &quot;React&quot;,
            &quot;TypeScript&quot; or any topic
          </p>
        )}

        {/* Active Search Indicator */}
        {query && (
          <div className="mt-3 flex items-center justify-center gap-2 text-sm">
            <span className="text-gray-600">
              Searching for:{" "}
              <span className="font-semibold text-gray-900">
                &quot;{query}&quot;
              </span>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
