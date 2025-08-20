## Zustand Store Examples

Below are three similar Zustand store examples for common app features, each with usage instructions.

---

### 1. Counter Store

```ts
import { create } from "zustand";

type CounterStore = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useCounterStore = create<CounterStore>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

```

**Usage**
```ts
const { count, increment, decrement, reset } = useCounterStore();
increment(); // increases count
decrement(); // decreases count
reset();     // resets count to 0
```

**2. Shopping Cart Store**

```ts
import { create } from "zustand";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  clearCart: () => set({ items: [] }),
}));

// Usage
const { items, addItem, removeItem, clearCart } = useCartStore();
addItem({ id: 1, name: "Apple", price: 2, quantity: 3 });
removeItem(1);
clearCart();
```

**User Authentication Store**

```ts

import { create } from "zustand";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthStore = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

// Usage
const { user, login, logout } = useAuthStore();
login({ id: 1, name: "Alice", email: "alice@example.com" });
logout();
```

```ts
import { create } from "zustand";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (text: string) => void;
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  addTodo: (text: string) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: Date.now(),
          text,
          completed: false,
        },
      ],
    })),
  toggleTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ),
    })),
  removeTodo: (id: number) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));

```