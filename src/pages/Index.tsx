
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  return (
    <div className="min-h-screen">
      <Navbar onSearch={handleSearch} />
      <Timeline />
    </div>
  );
};

export default Index;
