import axios from 'axios';
import { redirectToLogin } from "../utils/redirects";


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  maxRedirects: 0,
  headers: {
    Accept: "application/json",
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Check for a cancelled request
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // Handle unauthenticated errors
    if (error.response?.status === 401) {
      // Redirect to the login unless we are already there
      const redirected = redirectToLogin(false);
      if (redirected) return;
    }

    console.log(error);
    return Promise.reject(error);
  }
);

// Helper function to build API calls
const requestBuilder = ({
  method,
  url,
  userAuthToken,
  data,
  params,
  customHeader = {},
  responseType = null,
}) => {
  // Generate the cancel token
  const cancelTokenSource = axios.CancelToken.source();

  // Generate the instance
  const instanceOptions = {
    cancelToken: cancelTokenSource.token,
    method,
    url,
    responseType,
  };
  const headers = {
    Authorization: `Bearer ${userAuthToken}`,
  };

  if (userAuthToken) {
    instanceOptions.headers = {
      ...headers,
      ...customHeader,
    };
  }
  if (data) {
    instanceOptions.data = data;
  }
  if (params) {
    instanceOptions.params = params;
  }
  const axiosInstance = instance(instanceOptions);

  // Return the promise and the cancel function
  return {
    cancel: cancelTokenSource.cancel,
    request: axiosInstance,
  };
};

export default {
  auth: {
    login: ({ data }) =>
      requestBuilder({
        method: "POST",
        url: "/auth/signin",
        data,
      }),
    register: ({ data }) =>
      requestBuilder({
        method: "POST",
        url: "/auth/signup",
        data,
      }),
  },
  products: {
    getProducts: ({ userAuthToken, params }) =>
      requestBuilder({
        method: "GET",
        url: "/products",
        userAuthToken,
        params,
      }),
    getProduct: ({ userAuthToken, id }) =>
      requestBuilder({
        method: "GET",
        url: `/products/${id}`,
        userAuthToken,
      }),
    createProduct: ({ userAuthToken, data }) =>
      requestBuilder({
        method: "POST",
        url: "/products",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        userAuthToken,
        data,
      }),
    updateProduct: ({ userAuthToken, id, data }) =>
      requestBuilder({
        method: "PUT",
        url: `/products/${id}`,
        userAuthToken,
        data,
      }),
    deleteProduct: ({ userAuthToken, id }) =>
      requestBuilder({
        method: "DELETE",
        url: `/products/${id}`,
        userAuthToken,
      }),
  },
  purchases: {
    getAllPurchases: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/purchases",
        userAuthToken,
      }),
    getAllProductsPurchasesOfOneVendor: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/purchases/vendor",
        userAuthToken,
      }),
    getAllPurchasesOfOneUser: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/purchases/user",
        userAuthToken,
      }),
    getPurchaseById: ({ userAuthToken, id }) =>
      requestBuilder({
        method: "GET",
        url: `/purchases/${id}`,
        userAuthToken,
      }),
    createPurchase: ({ userAuthToken, data }) =>
      requestBuilder({
        method: "POST",
        url: "/purchases",
        userAuthToken,
        data,
      }),
  },
  vendors: {
    getVendors: ({ userAuthToken, params }) =>
      requestBuilder({
        method: "GET",
        url: "/vendors",
        userAuthToken,
        params,
      }),
  },
  settings:
  {
    getSettings: () =>
      requestBuilder({
        method: "GET",
        url: "/settings",
      }),
  },
  user: {
    getUser: ({ userAuthToken }) =>
      requestBuilder({
        method: "GET",
        url: "/user",
        userAuthToken,
      }),
    updateUser: ({ userAuthToken, data }) =>
      requestBuilder({
        method: "PUT",
        url: "/user",
        userAuthToken,
        data,
      }),
    cart: {
      getCart: ({ userAuthToken }) =>
        requestBuilder({
          method: "GET",
          url: "/cart",
          userAuthToken,
        }),
      addToCart: ({ userAuthToken, data }) =>
        requestBuilder({
          method: "POST",
          url: "/cart",
          userAuthToken,
          data,
        }),
      updateCart: ({ userAuthToken, data }) =>
        requestBuilder({
          method: "PUT",
          url: "/cart",
          userAuthToken,
          data,
        }),
      deleteFromCart: ({ userAuthToken, productId }) =>
        requestBuilder({
          method: "DELETE",
          url: `/cart/${productId}`,
          userAuthToken,
        }),
    },
    favorites: {
      getFavorites: ({ userAuthToken }) =>
        requestBuilder({
          method: "GET",
          url: "/favorites",
          userAuthToken,
        }),
      addToFavorites: ({ userAuthToken, productId }) =>
        requestBuilder({
          method: "GET",
          url: `/favorites/${productId}`,
          userAuthToken,
        }),
      deleteFromFavorites: ({ userAuthToken, productId }) =>
        requestBuilder({
          method: "DELETE",
          url: `/favorites/${productId}`,
          userAuthToken,
        }),
    }
  },
}
