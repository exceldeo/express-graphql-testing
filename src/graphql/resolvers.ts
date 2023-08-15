import bookData from "../data/books/books";
import userData from "../data/users/users";
import paginate from "../utils/pagination";
import { PaginationInput } from "./types/pagination";

const resolvers = {
  Query: {
    book: ({ id }: { id: string }) => bookData.getBookById(id),
    books: async (parent: any, args: { pagination: PaginationInput }) => {
      const { pagination } = args;

      // Panggil fungsi getBooks() dari bookData
      const allBooks = await bookData.getBooks({
        offset: (pagination.page - 1) * pagination.limit,
        limit: pagination.limit,
      });

      // Gunakan fungsi paginate untuk menghasilkan data yang dipaginasi
      const paginatedBooks = paginate(
        allBooks,
        pagination.page,
        pagination.limit
      );

      return paginatedBooks;
    },
    // ...lainnya
  },
};

export default resolvers;
