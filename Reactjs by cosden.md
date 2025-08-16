### Data Fetching

learn about loading, handling error states, and even how to prevent race conditions using abort controllers.

```ts
import { useEffect, useRef, useState } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com';

interface Post {
    id: number;
    title: string;
}

export default function Demo() {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);

    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            abortControllerRef.current?.abort();
            abortControllerRef.current = new AbortController();

            setIsLoading(true);

            try {
                const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
                    signal: abortControllerRef.current?.signal,
                });
                const posts = (await response.json()) as Post[];
                setPosts(posts);
            } catch (e: any) {
                if (e.name === 'AbortError') {
                    console.log('Aborted');
                    return;
                }

                setError(e);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    if (error) {
        return <div>Something went wrong! Please try again.</div>;
    }

    return (
        <div className="tutorial">
            <h1 className="mb-4 text-2xl">Data Fething in React</h1>
            <button onClick={() => setPage(page + 1)}>
                Increase Page ({page})
            </button>
            {isLoading && <div>Loading...</div>}
            {!isLoading && (
                <ul>
                    {posts.map((post) => {
                        return <li key={post.id}>{post.title}</li>;
                    })}
                </ul>
            )}
        </div>
    );
}
```

### React Hook Form

```bash
npm i react-hook-form
npm i @hookform/resolvers
npm i zod

```

```ts
// .eslintrc.cjs
module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs'],
    parser: '@typescript-eslint/parser',
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
    },
};
```

```md
Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`

-   Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
-   Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
```

<!-- with zod validation -->
```ts
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

const App = () => {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        defaultValues: {
            email: 'test@email.com',
        },
        resolver: zodResolver(schema),
    });

    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            console.log(data);
        } catch (error) {
            setError('root', {
                message: 'This email is already taken',
            });
        }
    };

    return (
        <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
            <input {...register('email')} type="text" placeholder="Email" />
            {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
            )}
            <input
                {...register('password')}
                type="password"
                placeholder="Password"
            />
            {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
            )}
            <button disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Loading...' : 'Submit'}
            </button>
            {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>
            )}
        </form>
    );
};

export default App;
```

<!-- without zod validation -->
```ts
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields {
    email: string;
    password: string
}

const App = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@email.com",
    }
  });

//   const onSubmit: SubmitHandler<FormFields> = (data) => {
//     await new Promise((resolve) => setTimeout(resolve, 1000));
//       console.log(data);
//   };

const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      setError("root", {
        message: "This email is already taken",
      });
    }
  };

  return (
    <form className="tutorial gap-2" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email", {
        require: "Email is requierd",
        validate: (value) => {
            if(!value.include("@")){
                return "Email must contain @ symbol"
            }
            return true;
        }
      })} type="text" placeholder="Email" />
      {errors.email && (
        <div className="text-red-500">{errors.email.message}</div>
      )}
      <input {...register("password", {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters long",
        },
      })} type="password" placeholder="Password" />
      {errors.password && (
        <div className="text-red-500">{errors.password.message}</div>
      )}
      <button disabled={isSubmitting} type="submit">
        {isSubmitting ? "Loading..." : "Submit"}
      </button>
      {errors.root && <div className="text-red-500">{errors.root.message}</div>}
    </form>
  );
};

export default App;
```
