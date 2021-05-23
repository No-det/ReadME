import { createContext, useState } from "react";

export const SearchContext = createContext();

const SearchProvider = (props) => {
  const [searchResults, setSearchResults] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  return (
    <SearchContext.Provider
      value={{ searchResults, setSearchResults, isSearching, setIsSearching }}
    >
      {props.children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
