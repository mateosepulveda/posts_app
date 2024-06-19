import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = 'http://localhost:5000/api/posts';

export const getPosts = createAsyncThunk('data/getPosts', async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw Error('Failed to get posts');
  }
});

export const addPost = createAsyncThunk('data/addPost', async (postData) => {
  try {
    const response = await axios.post(apiUrl, postData);
    return response.data;
  } catch (error) {
    throw Error('Failed to add post');
  }
});

export const deletePost = createAsyncThunk('data/deletePost', async (postId) => {
  try {
    await axios.delete(`${apiUrl}/${postId}`);
    return postId;
  } catch (error) {
    throw Error('Failed to delete post');
  }
});

const initialState = {
  data: [],
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPosts.pending, (state) => {
      state.error = null;
    });

    builder.addCase(getPosts.fulfilled, (state, action) => {
      state.data = action.payload;
    });

    builder.addCase(getPosts.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(addPost.pending, (state) => {
      state.error = null;
    });

    builder.addCase(addPost.fulfilled, (state, action) => {
      state.data.push(action.payload);
    });

    builder.addCase(addPost.rejected, (state, action) => {
      state.error = action.error.message;
    });

    builder.addCase(deletePost.pending, (state) => {
      state.error = null;
    })
    
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.data = state.data.filter((post) => post.id !== action.payload);
    })

    builder.addCase(deletePost.rejected, (state, action) => {
      state.error = action.error.message;
    });
  },
});

export default dataSlice.reducer;
