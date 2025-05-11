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
**Client State** : Persisted in your app memory and accessing or updating it is synchronous.
**Server Sate** : 
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
npm i react-qery
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

