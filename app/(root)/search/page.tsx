import SearchBooks from "@/components/SearchBooks";

const SearchPage = () => {
  return (
    <div className="mt-20 px-4 md:px-0">
      <h1 className="font-bebas-neue text-5xl text-dark-400 mb-8">
        Search Books
      </h1>
      <SearchBooks />
    </div>
  );
};

export default SearchPage;
