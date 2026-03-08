import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import SearchBooks from "@/components/SearchBooks";
import { db } from "@/database/drizzle";
import { books, users } from "@/database/schema";
import { auth } from "@/auth";
import { desc } from "drizzle-orm";

const Home = async () => {
  const session = await auth();

  const latestBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <section className="mt-20">
        <h2 className="font-bebas-neue text-4xl text-dark-400 mb-6">
          Search Books
        </h2>
        <SearchBooks />
      </section>

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
