// bookSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

const generateRandomCost = () => {
  return (Math.random() * (50 - 10) + 10).toFixed(2); // Generates a random cost between 10 and 50
};

export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
  try {
    const response = await fetch(`${API_BASE_URL}?q=javascript`);

    const data = await response.json();

    if (data.items) {
      return data.items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors
          ? item.volumeInfo.authors.join(", ")
          : "Unknown Author",
        imageLinks: item.volumeInfo.imageLinks || {}, // Include complete imageLinks object
        description: item.volumeInfo.description || "No description available",
        cost: generateRandomCost(), // Generate a random cost
      }));
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    throw new Error("Error fetching books.");
  }
});

export const fetchBookById = createAsyncThunk(
  "books/fetchBookById",
  async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      const data = await response.json();

      // Add a random cost to the book data
      const bookWithCost = {
        ...data,
        cost: generateRandomCost(),
      };

      return bookWithCost;
    } catch (error) {
      throw error;
    }
  }
);

const bookSlice = createSlice({
  name: "books",
  initialState: {
    items: [],
    loading: false,
    error: null,
    book: null,
    featuredBooks: [],
    latestBooks: [],
  },
  reducers: {
    setBooks: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setFeaturedBooks: (state) => {
      // Function to randomly select three books
      const getRandomBooks = (arr, num) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      };

      let featuredBooks = getRandomBooks(state.items, 3);

      state.featuredBooks = featuredBooks;
    },
    setLatestBooks: (state) => {
      // Function to randomly select three books
      const getRandomBooks = (arr, num) => {
        const shuffled = arr.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, num);
      };

      let latestBooks = getRandomBooks(state.items, 3);

      state.latestBooks = latestBooks;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error fetching books.";
      })
      .addCase(fetchBookById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.loading = false;
        state.book = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setBooks,
  setLoading,
  setError,
  setFeaturedBooks,
  setLatestBooks,
} = bookSlice.actions;
export default bookSlice.reducer;
