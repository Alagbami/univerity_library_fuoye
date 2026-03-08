import { config } from "dotenv";
config({ path: "../.env.local" });
import { createBook } from "../lib/admin/actions/book";

(async () => {
  try {
    const res = await createBook({
      title: "Test",
      author: "Author",
      genre: "Genre",
      rating: 1,
      coverUrl: "url",
      coverColor: "#ffffff",
      description: "Desc long enough",
      totalCopies: 1,
      videoUrl: "url",
      summary: "Summary long enough",
    });
    console.log(res);
  } catch (e) {
    console.error("error", e);
  }
})();