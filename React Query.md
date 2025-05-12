## React Query
What?
A library for fetching data in a React Application.

Why?
1. Since React is a UI library, there is no specific pattern for data fetching.
2. useEffect hook for data fetching and useState hook to maintain component state like loading, error o resulting data.
3. If the data is needed throughout the app, we tend to use state management libraries.
4. Most of the state management libraries are good for working with client state. ex: "theme" for applicatoin or wether a model is open.
5. State management libraries are not great for working with asynchronous or server state.


**Client vs Server State**

- **Client State** : Persisted in your app memory and accessing or updating it is synchronous.
- **Server Sate** : 
  - Persisted remotely and requires asynchronous APIs for fetching or updating.
  - Has shared ownership
  - Data can be updated by someone else without your knowledge
  - UI data may not be in sync with the remote data
  - Challenging when you have to deal with caching, deduping multiple requests for the same data, updating stale data in the background, performance optimization etc.


### Course Content
- Basic Queries
- Poll Data
- RQ dev tools
- Create reusable query hook
- Query by ID
- Parallel queries
- Dynamic queries
- Dependent queries
- Infinite & paginated queries
- Update data using mutations
- Invalidate queries
- Optimistic updates
- Axios Interceptor

### Proejct Setup
1. New react project using CRA
2. Set up an API endpoint that serves mock data for use in our application.
3. Set up react router and a few routes in the application.
4. Fetch data the traditional way using useEffect and useState

```bash

git clone https://github.com/gopinav/React-Query-Tutorials/tree/master/react-query-starter

```

```js
"scripts": {
    "serve-json": "json-server --watch db.json --port 4000"
  }
```

```js

import { useState, useEffect } from 'react'
import axios from 'axios'

export const SuperHeroesPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/superheroes').then(res => {
      setData(res.data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
      <h2>Super Heroes Page</h2>
      {data.map(hero => {
        return <div>{hero.name}</div>
      })}
    </>
  )
}

```

### Fetching data with useQuery

```bash
npm i react-query
```

```js
import {QueryClientProvider, QueryClient} from 'react-query'

// wrap the entire app with QueryClientProvider in app.js

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            {/* .... */}
        </QueryClientProvider>
    )
}

// RQSuperHeros.page.js

import { useQuery} from "react-query"
import axios from "axios"

export const RQSuperHerosPage  = () => {
    const { isLoading, data } = useQuery("super-heros", () = > {
        return axios.get("http://localhost:4000/superheroes")
    })

    if(isLoading) {
        return <h2>Loading...</h2>
    }

    return (
        <>
            <h2>RQ Heroes</h2>
            {data?.data.map(hero => {
                return <div key={hero.name}>{hero.name}</div>
            })}
        </>
    )
}

// or
const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheroes")
}

export const RQSuperHerosPage  = () => {
    const { isLoading, data } = useQuery("super-heros", fetchSuperHeros)

    if(isLoading) {
        return ( <h2>Loading...</h2>)
    }

    return (
        <>
            <h2>RQ Heroes</h2>
            {data?.data.map(hero => {
                return <div key={hero.name}>{hero.name}</div>
            })}
        </>
    )
}

```

### Handling Query Error

```js
// old way

    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get('http://localhost:4000/superheroes')
        .then(res => {
            setData(res.data)
            setIsLoading(false)
        })
        .catch((error) => {
            setError(error.message)
            setLoading(false)
        })
    }, [])

    if (error) {
        return <h2>{error}</h2>
    }


// React query way:


const fetchSuperHeros = () => {
    return axios.get("http://localhost:4000/superheroes")
}

export const RQSuperHerosPage  = () => {
    const { isLoading, data, isError, error } = useQuery("super-heros", fetchSuperHeros)

    if(isLoading) {
        return ( <h2>Loading...</h2>)
    }

    if(isError) {
        return ( <h2>{error.message}</h2>)
    }

    return (
        <>
            <h2>RQ Heroes</h2>
            {data?.data.map(hero => {
                return <div key={hero.name}>{hero.name}</div>
            })}
        </>
    )
}
```


### React Query DevTools

```js
// app.js
import { ReactQueryDevtools } from "react-query/devtools"

function App() {
    return (
        <QueryClientProvider client={queryClient}>            
            <Routers>
                <Route path="/">
                    <HomePage />
                </Route>
                {/* app codes goes here */}
            </Routers>
            <ReactQueryDevtools initialOpen={false} position="bottom-right" />
        </QueryClientProvider>
    )
}

```


### Query Cache

How long unused/inactive data stays in memory before being garbage collected.
→ e.g., 5000 = cache is cleared after 5 seconds of inactivity.

```js
const { isLoading, data, isError, error, isFetching } = useQuery("super-heros", fetchSuperHeros, { cacheTime: 5000 })

// 5000 ms
```

### Stale Time

How long the data is considered "fresh" before it becomes "stale" and eligible for refetching.
→ e.g., 30000 = no refetching for 30s after last fetch.

```js
const { isLoading, data, isError, error, isFetching } = useQuery("super-heros", fetchSuperHeros, 
{ cacheTime: 5000,  staleTime: 30000 })

// cacheTime = 5000 ms or 5 seconds, 5 sec is default cacheTime
// staleTime = 30000 ms or 30 seconds, default staleTime is 0 seconds.
```

### Refetch Defaults

**refetchOnMount** (true | false | 'always'):
Controls if data should refetch when the component mounts.
→ true: refetches only if data is stale
→ false: never refetch on mount
→ 'always': always refetch, even if data is fresh


**refetchOnWindowFocus** (true | false | 'always'):
Controls if data refetches when the browser window regains focus.
→ true: refetch if data is stale
→ false: never refetch on focus
→ 'always': always refetch on focus

```js
const { isLoading, data, isError, error, isFetching } = useQuery("super-heros", fetchSuperHeros, 
{ cacheTime: 5000,  staleTime: 30000, refetchOnMount: true | false | 'always',  refetchOnWindowFocus: true | false | 'always'})

```

### Polling with React Query

**refetchInterval (Polling)**
refetchInterval (ms):
Enables automatic polling — React Query will refetch the query at the specified interval, regardless of focus or mount state.
→ e.g., refetchInterval: 5000 = fetch data every 5 seconds.

**refetchIntervalInBackground** (true/false):
If true, polling continues even when the window/tab is not in focus (useful for real-time apps).
→ Default is false (pauses polling in the background).


```js
const { isLoading, data, isError, error, isFetching } = useQuery("super-heros", fetchSuperHeros, 
{ 
    refetchInterval: 2000, // fetch every 2 seconds
    refetchIntervalInBackground: true // keep polling even in background 
})

```

### useQuery on click

If you want to trigger useQuery only when a button is clicked, you can use React Query’s enabled: false option and manually trigger the fetch using refetch.

🧠:
- enabled: false prevents the query from running on mount.
- refetch() manually triggers the query (e.g. on a button click).

This is great for:
- On-demand data fetching
- Search or filter actions
- Avoiding unnecessary API calls on page load

```js
const { isLoading, data, isError, error, isFetching, refetch } = useQuery("super-heros", fetchSuperHeros, 
{ 
    enabled: false
})

return (
    <>
        <h2>RQ Heroes</h2>
        <button onClick={refetch}>
            {isFetching ? 'Loading...' : 'Fetch Data'}
        </button>
        {data?.data.map(hero => {
            return <div key={hero.name}>{hero.name}</div>
        })}
    </>
);

```

### Success and Error Callbacks
In React Query, you can use onSuccess and onError callbacks inside useQuery to handle side effects when the query either succeeds or fails.

🧠 When to Use These:
- **onSuccess**: Great for triggering a toast, logging, or syncing external state after a successful fetch.
- **onError**: Useful for handling failures gracefully (e.g., showing error alerts, fallback UIs, or retry logic).

```js

const { data, isLoading, isError, error } = useQuery(
  "super-heros", 
  fetchSuperHeros,
  {
    onSuccess: (data) => {
      console.log('Fetched successfully!', data);
      // You can trigger toast notifications, set local state, etc.
    },
    onError: (error) => {
      console.error('Error while fetching:', error.message);
      // You can show an error toast or log it for debugging
    }
  }
);

// or

    const onSuccess = (data) => {
      console.log('Fetched successfully!', data);
    },

    const onError = (error) => {
      console.error('Error while fetching:', error.message);
    }

    const { data, isLoading, isError, error } = useQuery(
        "super-heros", 
        fetchSuperHeros,
        {
            onSuccess,      // as key and value are same, we can use ES6 shorthand for this.
            onError        
        }
    );

```

### Data Transformation
In React Query, you can transform the fetched data using the select option inside useQuery. This is super helpful when you want to shape, filter, or map the data before it reaches your component.

🧠 Why Use select?
- Keeps your components clean — no need to transform inside JSX
- Makes memoization easier (React Query caches the transformed data)
- Great for filtering, mapping, grouping, or formatting

```js
const { data, isLoading, isError, error } = useQuery(
    "super-heros", 
    fetchSuperHeros,
    {
        onSuccess,      // as key and value are same, we can use ES6 shorthand for this.
        onError,
        select: (data) => {
            const superHeroNames = data.data.map((hero) => hero.name)
            return superHeroNames
        }  
            //   or
        select: (data) => {
            const superHeroNames = data.data.filter((hero) => hero.name === "shiv")
            return superHeroNames
        } 

        // or

        select: (data) => {
            const superHeroNames = data.data.reduce((acc, hero) => {
            acc.push(hero.name);
            return acc;
        )}
    }
);

return (
    <>
        <h2>RQ Heroes</h2>
        {data.map((hero) => {
            return <div key={hero.name}>{hero.name}</div>
        })}
    </>
);
```

### Custom Query Hook with react query
Creating a custom query hook with React Query is a great way to encapsulate your data-fetching logic, make your components cleaner, and promote reusability.

🔧 Why Use a Custom Hook?
✅ Reusable logic across components
✅ Clean separation of data concerns
✅ Centralized error/success handling
✅ Easier to unit test and maintain

Let’s say you’re fetching a list of super heroes. Instead of using useQuery directly in every component, you can wrap it in a custom hook:

🔹 hooks/useSuperHeroes.js
```js
import { useQuery } from 'react-query';
import axios from 'axios';

const fetchSuperHeroes = async () => {
  const response = await axios.get("http://localhost:4000/superheroes");
  return response.data;
};

export const useSuperHeroes = (onSuccess, onError) => {
  return useQuery("super-heros", fetchSuperHeros, {
    staleTime: 10000,
    cacheTime: 300000,
    onError,
    onSuccess
  });
};
```

// app.js
```js
const onSuccess = (data) => {
    console.log('Fetched successfully!', data);
},

const onError = (error) => {
    console.error('Error while fetching:', error.message);
}

const { data, isLoading, isError, error } = useSuperHeroes(onSuccess, onError)

if(isLoading) <h2> Loading ...</h2>
if(isError) <h2>{error.message}</h2>
return (
    <>
        <h2>Super Heroes</h2>
        {data.map((hero) => {
            return <div key={hero.name}>{hero.name}</div>
        })}
    </>
);

```

### Query by Id
If you want to fetch a specific item by its ID using React Query, you can create a custom hook like useSuperHero(id) to query that individual hero.

```js

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchSuperHero = async ({ queryKey }) => {
  const [_key, id] = queryKey;
  const response = await axios.get(`/api/super-heroes/${id}`);
  return response.data;
};

export const useSuperHero = (id) => {
  return useQuery(['super-hero', id], fetchSuperHero, {
    enabled: !!id, // ensures the query only runs if id is truthy
  });
};

```

```js

import React from 'react';
import { useParams } from "react-router-dom"
import { useSuperHero } from '../hooks/useSuperHero';

const HeroDetails = () => {
    const { heroId } = useParams()
    const { data, isLoading, isError, error } = useSuperHero(heroId);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div>
        <h2>{data.name}</h2>
        <p>Power: {data.power}</p>
        </div>
    );
};

export default HeroDetails;
```

### ✅ Parallel Queries in React Query
Parallel queries are used when you want to fetch multiple independent resources at the same time — and wait for all of them to complete.

🧠 When to Use Which?
✅ Use multiple useQuery if the number of queries is small and fixed.
✅ Use useQueries if you have:
    - A dynamic number of queries (e.g., loop over an array of IDs)
    - Need batch handling or more control

below we are using alias, like data: user => data as user and data: posts => data as posts
```js
const { data: user, isLoading: isUserLoading } = useQuery(['user', userId], () => fetchUser(userId));
const { data: posts, isLoading: isPostsLoading } = useQuery(['posts'], fetchPosts);
```
🧩 Method 2: useQueries (Array of Queries)
For better scalability or dynamic queries, use useQueries:

```js
import { useQueries } from 'react-query';

const results = useQueries({
  queries: [
    {
      queryKey: ['user', userId],
      queryFn: () => fetchUser(userId),
    },
    {
      queryKey: ['posts'],
      queryFn: fetchPosts,
    },
  ]
});


// or

// Where query are dynamic, means, we don't know which and how many ids are going to fetch
// like a UI is asking to User to select the 4 cards out of 9 available, so selection would be dynamic as we // 
// don't know what user will select.

<Switch>
    <Route path='/rq-dynamic-parallel'>
        <DynamicParallelPage heroIds={[1,4,6]} />
    </Route>
</Switch>

const fetchSuperHero = (heroId) => {
    return axios.get(`api/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroIds}) => {
    const queryResults = useQueries(
        heroIds.map((id) => {
            return {
                queryKey: ["super-hero", id],
                queryFn: () => fetchSuperHero(id)
            }
        })
    );
}

// Access results
const user = results[0].data;
const posts = results[1].data;
```


### 🔄 Dependent Queries in React Query
Dependent queries are useful when one query depends on the result of another — for example, you first fetch a user, then fetch that user’s projects.

React Query handles this with the enabled option in useQuery.

🧠 Key Concepts:
- enabled: !!userEmail: prevents the second query from running until the first one has valid data.
- Keeps everything reactive — once user is loaded, the dependent query fires automatically.

✅ Real-World Use Cases
- Fetch order details → then fetch shipping status
- Get logged-in user → then fetch permissions
- Get category → then fetch related products

```js
const { data: user, isLoading: userLoading } = useQuery(
  ['user', userId],
  () => fetchUser(userId)
);

const userEmail = user?.email;

const { data: projects, isLoading: projectsLoading } = useQuery(
  ['projects', userEmail],
  () => fetchProjectsByEmail(userEmail),
  {
    enabled: !!userEmail, // Only run this query if email exists
  }
);


```


### ⚡ Initial Query Data in React Query
You can use initialData to preload data in a query before the fetch happens — useful for:

- Instant UI rendering with cached/expected data
- Prefetching or passing server-fetched data to the client (like in SSR or Next.js)

```js
import { useQuery, useQueryClient } from "react-query"

const fetchSuperHero = (heroId) => {
    return axios.get(`api/superheroes/${heroId}`)
}

export const useSuperHeroData = (heroId) => {
    const queryClient = useQueryClient()
    return useQuery(['super-heroes', heroId], () => fetchSuperHero(heroId),
        {
            initialData: () => {
                const hero = queryClient.getQueryData('super-heroes')?.data?.find((hero) => hero.id === parseInt(heroId))
                if(hero){
                    return { data: hero}
                } else {
                    return undefined
                }        
            }
        }
    );
}



```


Paginated Queries
React Query makes it easy to implement pagination by using a page parameter in the query key and fetch function.

🧠 Key Options Explained:
- ['projects', page]: unique query key per page
- keepPreviousData: true: prevents blank UI while switching pages
- data.hasMore: a flag returned from your API to disable "Next" when done

```js
import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

const fetchColors = pageNumber => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      keepPreviousData: true
    }
  )

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>
        {data?.data.map(color => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          )
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber(page => page - 1)}
          disabled={pageNumber === 1}>
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber(page => page + 1)}
          disabled={pageNumber === 4}>
          Next Page
        </button>
      </div>
      {isFetching && 'Loading'}
    </>
  )
}

```



### 🔁 Infinite Queries in React Query
Infinite queries are used when you want to load more data page by page — perfect for infinite scroll, "Load More" buttons, or lazy loading.

React Query provides this via the useInfiniteQuery hook.

```js
import { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesPage = () => {
  const { 
    isLoading,
    isError,
    error,
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(['colors'], fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    }
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map(color => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          )
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}

```


### Mutations

Mutations are used in React Query when you want to create, update, or delete data — anything that causes a side effect on the server.

You use the useMutation hook to handle these operations.
🧠 Summary
- useMutation() is for POST, PUT, PATCH, DELETE operations.
- Use queryClient.invalidateQueries() to refresh affected data.
- Supports onSuccess, onError, and onSettled callbacks for side effects.
- You can also use optimistic updates for instant UI feedback.

```js
import { useMutation, useQueryClient } from 'react-query'
const addSuperHero = hero => {
  return request({ url: '/superheroes', method: 'post', data: hero })
}

export const useAddSuperHeroData = () => {
  return useMutation(addSuperHero)
}

```

```js
const AddHeroForm = () => {
  // const { mutate, isLoading, isSuccess } = useAddSuperHeroData();
  // or
  const { mutate: addHero, isLoading, isSuccess } = useAddSuperHeroData();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newHero = {
      name: e.target.name.value,
      power: e.target.power.value,
    };
    // mutate(newHero); // triggers the POST request
    // or
    addHero(newHero)
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Hero Name" />
      <input name="power" placeholder="Super Power" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Adding...' : 'Add Hero'}
      </button>
      {isSuccess && <p>Hero added successfully!</p>}
    </form>
  );
};


```

### Query Invalidation

```js
import { useMutation, useQueryClient, useQueryClient } from 'react-query'

const addSuperHero = hero => {
  return request({ url: '/superheroes', method: 'post', data: hero })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onSuccess: () => {
      queryClient.invalidateQueries('super-heros')
      // here "super-heros" is the key that is used in useQuery method to fetch the data. so UI update with latest data. invalidateQueries will be a additional get request to update the UI data of given key: super-heros
    }
  })
}

```

### Handling Mutation Response

When you perform a mutation using useMutation, you can capture and handle the response (e.g., newly created item, status, or server message) easily in your component using the mutation result or callbacks.


```js
import { useMutation, useQueryClient, useQueryClient } from 'react-query'

const addSuperHero = hero => {
  return request({ url: '/superheroes', method: 'post', data: hero })
}

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onSuccess: (data) => {
      // queryClient.invalidateQueries('super-heros')
      queryClient.setQueryData('super-heros', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [...oldQueryData.data, data.data]
        }
      })
    }
  })
  // this way, it will not make additional get network call to update the UI and UI get update as well.
}

```

**Accessing the Response Directly**
```js
const mutation = useMutation(addHero);

const handleSubmit = async (e) => {
  e.preventDefault();
  const newHero = { name: 'Shiv', power: 'Speed coding' };
  
  const response = await mutation.mutateAsync(newHero); // Waits for result
  console.log('New hero added:', response); // Response from server
};

```

When to Use Which
- Use mutateAsync() if you want to handle success/failure with try/catch or async/await.
- Use onSuccess/onError inside useMutation for side effects or UI updates right after the mutation.

### ⚡ Optimistic Updates in React Query
Optimistic updates let you immediately update the UI before the server confirms the mutation — creating a snappy, real-time user experience.

React Query provides full support for this via the **onMutate**, **onError**, and **onSettled** mutation lifecycle callbacks.

```js
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()
  return useMutation(addSuperHero, {
    onMutate: async (newHero) => {
      await queryClient.cancleQueries('super-heroes')
      const prevHeroData = queryClient.getQueryData('super-heroes')
      queryClient.setQueryData('super-heroes', (oldQueryData) => {
        return {
          ...oldQueryData,
          data: [
            ...oldQueryData,
            { id: oldQueryData?.data?.length + 1, ...newHero}
          ]
        }
      }),
      return {
        prevHeroData
      }
      // this will update UI before making actual mutate call and update the data. if anything goes wrong, we can rollback with the help of return value of prevHeroData.
    },
    onError: (_error, _hero, context) => {
      queryClient.setQueryData('super-heroes', context.prevHeroData)
    },
    onSettled: () => {
      queryClient.invalidateQueries('super-heroes')
    }
  })
}

```

### 🔐 Axios Interceptors in React (and React Query)
Axios interceptors let you globally handle requests or responses, such as:

- Attaching auth tokens
- Logging or transforming responses
- Handling errors globally (e.g. redirecting on 401)


```js
// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.example.com',
});

// 🔐 Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('Unauthorized, redirecting...');
      // e.g., window.location = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

```

✅ Using with React Query
Use this Axios instance inside your React Query fetchers:


```js
import axiosInstance from '../utils/axiosInstance';

const fetchUsers = () => axiosInstance.get('/users').then(res => res.data);

const useUsers = () => {
  return useQuery(['users'], fetchUsers);
};

```