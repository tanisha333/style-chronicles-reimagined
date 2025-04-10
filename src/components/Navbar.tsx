
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface NavbarProps {
  onSearch: (query: string) => void;
}

const Navbar = ({ onSearch }: NavbarProps) => {
  const [expandedSearch, setExpandedSearch] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  const toggleSearch = () => {
    setExpandedSearch(!expandedSearch);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container flex items-center justify-between h-16 px-4">
        <h1 className="text-2xl font-display font-bold text-primary">
          Style Chronicles
        </h1>

        <form onSubmit={handleSearch} className="hidden md:flex items-center space-x-2 relative flex-1 max-w-xl mx-auto">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              placeholder="Search jeans, vintage looks, 90s fashion..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-secondary/50 focus:bg-secondary transition-all"
            />
          </div>
          <Button type="submit" size="sm" className="rounded-full absolute right-1 top-1/2 transform -translate-y-1/2">
            Search
          </Button>
        </form>
        
        <div className="md:hidden">
          {expandedSearch ? (
            <form onSubmit={handleSearch} className="absolute inset-x-0 top-0 px-4 py-3 bg-background/95 flex items-center">
              <Button type="button" variant="ghost" size="sm" onClick={toggleSearch} className="mr-2">
                <Search className="h-5 w-5 rotate-90" />
              </Button>
              <Input
                name="search"
                placeholder="Search styles..."
                className="flex-1 rounded-full bg-secondary/50"
                autoFocus
              />
              <Button type="submit" size="sm" className="ml-2 rounded-full">
                Search
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={toggleSearch}>
              <Search className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
