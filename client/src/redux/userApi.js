import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://movietime-p212.onrender.com/",
  }),
  tagTypes: ["collection"],
  endpoints: (builder) => ({
    // register user
    register: builder.mutation({
      query(user) {
        return {
          url: "authorization/register",
          method: "POST",
          body: user,
        };
      },
    }),
    // login user
    login: builder.mutation({
      query(user) {
        return {
          url: "authorization/login",
          method: "POST",
          body: user,
        };
      },
    }),
    // Get collection
    getCollection: builder.query({
      query: (token) => {
        return {
          url: "user/collection",
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        };
      },
      providesTags: ["collection"],
    }),
    // Add collection
    addLike: builder.mutation({
      query(args) {
        const { data, token } = args;
        return {
          url: "user/collection",
          method: "POST",
          body: data,
          headers: { Authorization: "Bearer " + token },
        };
      },
      invalidatesTags: ["collection"],
    }),
    addWatchLater: builder.mutation({
      query(args) {
        const { data, token } = args;
        return {
          url: "user/collection",
          method: "POST",
          body: data,
          headers: { Authorization: "Bearer " + token },
        };
      },
      invalidatesTags: ["collection"],
    }),
    // Delete collection
    removeLike: builder.mutation({
      query(args) {
        const { id, token } = args;
        return {
          url: `user/collection/${id}`,
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        };
      },
      invalidatesTags: ["collection"],
    }),
    // Delete collection
    removeWatchLater: builder.mutation({
      query(args) {
        const { id, token } = args;
        return {
          url: `user/collection/${id}`,
          method: "DELETE",
          headers: { Authorization: "Bearer " + token },
        };
      },
      invalidatesTags: ["collection"],
    }),
  }),
  // Add the cache headers
  refetchOnMountOrArgChange: false,
  refetchOnReconnect: false,
  refetchOnFocus: false,
  keepUnusedDataFor: 60 * 60 * 1000, // Keep data in the cache for 1 hour

});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetCollectionQuery,
  useAddLikeMutation,
  useAddWatchLaterMutation,
  useRemoveLikeMutation,
  useRemoveWatchLaterMutation
} = userApi;
