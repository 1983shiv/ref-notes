### 1. What is React, and how does it differ from other JavaScript frameworks?

**Answer**: React is a JavaScript library for building user interfaces, focusing on reusable components. Unlike frameworks like Angular (full MVC) or Vue (two-way binding by default), React is:
- **Component-Based**: Builds UI as independent components.
- **Unidirectional Data Flow**: Simplifies state management.
- **Library, Not Framework**: Offers flexibility, integrates with other tools.

**Example**:
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function App() {
  return <h1>Hello, React!</h1>;
}

ReactDOM.render(<App />, document.getElementById('root'));
```
*Explanation*: A simple React app renders a component, showcasing its declarative nature.

**Differences**:
- **Angular**: Opinionated, includes routing, forms. React needs external libraries.
- **Vue**: Simpler learning curve, built-in reactivity. React uses explicit state.

---

### 2. Explain the Virtual DOM and how it improves performance.

**Answer**: The Virtual DOM is an in-memory representation of the real DOM. React updates the Virtual DOM, compares it with the previous version (diffing), and applies minimal changes to the real DOM. This:
- **Reduces DOM Operations**: Faster than direct manipulation.
- **Optimizes Updates**: Only changed nodes are updated.

**Example**:
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
*Explanation*: Clicking updates `count`, and React efficiently re-renders only the changed `<p>` tag via Virtual DOM diffing.

---

### 3. What are the key features of React?

**Answer**:
- **Components**: Reusable UI building blocks.
- **Virtual DOM**: Fast updates.
- **JSX**: HTML-like syntax in JavaScript.
- **Unidirectional Data Flow**: Predictable state.
- **Hooks**: State and lifecycle in functional components.
- **Ecosystem**: Tools like React Router, Redux.

**Example**:
```jsx
import React, { useState } from 'react';

function Toggle() {
  const [isOn, setIsOn] = useState(false);

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  );
}
```
*Explanation*: Demonstrates components, Hooks, and JSX.

---

### 4. What is JSX, and why is it used in React?

**Answer**: JSX is a syntax extension for JavaScript that looks like HTML. It’s used in React to:
- **Simplify UI Code**: Declarative and readable.
- **Integrate JS and HTML**: Combines logic with markup.
- **Compile to JS**: Transforms to `React.createElement`.

**Example**:
```jsx
import React from 'react';

function Greeting() {
  const name = 'Alice';
  return <h1>Hello, {name}!</h1>;
}
```
*Explanation*: JSX allows embedding `name` in markup, compiling to `React.createElement('h1', null, 'Hello, ', name, '!')`.

---

### 5. How do you create a React component?

**Answer**: Create a component as a function (preferred) or class that returns JSX. Functional components use Hooks for state/lifecycle.

**Example**:
```jsx
import React, { useState } from 'react';

function UserCard() {
  const [likes, setLikes] = useState(0);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Likes: {likes}</p>
      <button onClick={() => setLikes(likes + 1)}>Like</button>
    </div>
  );
}
```
*Explanation*: `UserCard` is a functional component with state, rendering a UI with interactive likes.

---

### 6. What is the difference between a functional component and a class component?

**Answer**:
- **Functional Component**: A JavaScript function returning JSX. Simpler, uses Hooks.
- **Class Component**: A class extending `React.Component`. Uses lifecycle methods, more verbose.

**Example (Functional)**:
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

**Example (Class)**:
```jsx
import React from 'react';

class Counter extends React.Component {
  state = { count: 0 };

  render() {
    return (
      <button onClick={() => this.setState({ count: this.state.count + 1 })}>
        {this.state.count}
      </button>
    );
  }
}
```
*Explanation*: Functional is concise with Hooks; class uses `this` and lifecycle methods.

---

### 7. What are props in React, and how do you pass them?

**Answer**: Props (properties) are read-only data passed from parent to child components to customize behavior or rendering.

**Example**:
```jsx
import React from 'react';

// Child Component
function Welcome({ name, greeting = 'Hello' }) {
  return <h1>{greeting}, {name}!</h1>;
}

// Parent Component
function App() {
  return (
    <div>
      <Welcome name="Alice" />
      <Welcome name="Bob" greeting="Hi" />
    </div>
  );
}
```
*Explanation*: `name` and `greeting` are passed as props to `Welcome`, rendering customized messages.

---

### 8. What is state in React, and how do you manage it?

**Answer**: State is mutable data internal to a component that triggers re-renders when updated. Manage it with:
- **Functional**: `useState` or `useReducer`.
- **Class**: `this.state` and `this.setState`.

**Example (Functional)**:
```jsx
import React, { useState } from 'react';

function TodoForm() {
  const [task, setTask] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Task:', task);
    setTask('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add task"
      />
      <button>Add</button>
    </form>
  );
}
```
*Explanation*: `task` state updates on input change, resetting on submit.

---

### 9. What is the difference between state and props?

**Answer**:
- **State**: Internal, mutable, managed by the component (e.g., `useState`).
- **Props**: External, read-only, passed from parent.

**Example**:
```jsx
import React, { useState } from 'react';

function User({ name }) { // Props
  const [age, setAge] = useState(20); // State

  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <button onClick={() => setAge(age + 1)}>Birthday</button>
    </div>
  );
}

function App() {
  return <User name="Alice" />;
}
```
*Explanation*: `name` (prop) is fixed; `age` (state) changes internally.

---

### 10. How do you handle events in React?

**Answer**: Attach event handlers (e.g., `onClick`) as props using camelCase. Handlers receive an event object and can update state or perform actions.

**Example**:
```jsx
import React, { useState } from 'react';

function Button() {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e) => {
    console.log('Clicked at:', e.clientX, e.clientY);
    setClicked(true);
  };

  return (
    <button onClick={handleClick}>
      {clicked ? 'Clicked!' : 'Click Me'}
    </button>
  );
}
```
*Explanation*: `onClick` triggers `handleClick`, updating state and logging coordinates.

---

### 11. What are the lifecycle methods in React class components?

**Answer**: Lifecycle methods are special methods in class components for running code at specific points:
- **Mounting**: `constructor`, `render`, `componentDidMount`.
- **Updating**: `render`, `componentDidUpdate`.
- **Unmounting**: `componentWillUnmount`.
- **Error Handling**: `static getDerivedStateFromError`, `componentDidCatch`.

**Example**:
```jsx
import React from 'react';

class Timer extends React.Component {
  state = { seconds: 0 };

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({ seconds: this.state.seconds + 1 });
    }, 1000);
  }

  componentDidUpdate() {
    console.log('Updated:', this.state.seconds);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div>Seconds: {this.state.seconds}</div>;
  }
}
```
*Explanation*: Demonstrates mounting (timer setup), updating (log), and unmounting (cleanup).

---

### 12. Explain the purpose of componentDidMount, componentDidUpdate, and componentWillUnmount.

**Answer**:
- **componentDidMount**: Runs once after component mounts. Ideal for initial setup (e.g., API calls, subscriptions).
- **componentDidUpdate**: Runs after state/props update. Used for side effects based on changes.
- **componentWillUnmount**: Runs before unmounting. Cleans up resources (e.g., timers, listeners).

**Example**:
```jsx
import React from 'react';

class DataFetcher extends React.Component {
  state = { data: null };

  componentDidMount() {
    fetch('https://api.example.com/data')
      .then((res) => res.json())
      .then((data) => this.setState({ data }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      fetch(`https://api.example.com/data/${this.props.id}`)
        .then((res) => res.json())
        .then((data) => this.setState({ data }));
    }
  }

  componentWillUnmount() {
    console.log('Cleaning up...');
  }

  render() {
    return <div>{this.state.data || 'Loading...'}</div>;
  }
}
```
*Explanation*: Fetches data on mount, refetches on `id` change, logs on unmount.

---

### 13. What is the equivalent of componentDidMount in functional components?

**Answer**: Use `useEffect` with an empty dependency array (`[]`) to mimic `componentDidMount`. It runs once after mount.

**Example**:
```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/data')
      .then((res) => res.json())
      .then(setData);
  }, []); // Empty deps = runs once

  return <div>{data || 'Loading...'}</div>;
}
```
*Explanation*: `useEffect` fetches data on mount, equivalent to `componentDidMount`.

---

### 14. What are Pure Components, and when should you use them?

**Answer**: `React.PureComponent` is a class component that implements `shouldComponentUpdate` with a shallow prop/state comparison to prevent unnecessary re-renders. Use for performance optimization when props/state are unlikely to change.

**Example**:
```jsx
import React from 'react';

class Display extends React.PureComponent {
  render() {
    console.log('Rendering:', this.props.value);
    return <div>{this.props.value}</div>;
  }
}

class App extends React.Component {
  state = { count: 0 };

  render() {
    return (
      <div>
        <Display value="Static" />
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Count: {this.state.count}
        </button>
      </div>
    );
  }
}
```
*Explanation*: `Display` doesn’t re-render when `count` changes, as `value` is static.

**When to Use**: For components with stable props/state to avoid re-renders.

---

### 15. What are Higher-Order Components (HOCs), and how do you use them?

**Answer**: An HOC is a function that takes a component and returns a new component with enhanced functionality (e.g., data fetching, auth). It promotes reuse.

**Example**:
```jsx
import React, { useState, useEffect } from 'react';

// HOC
function withDataFetching(WrappedComponent, url) {
  return function EnhancedComponent(props) {
    const [data, setData] = useState(null);

    useEffect(() => {
      fetch(url)
        .then((res) => res.json())
        .then(setData);
    }, []);

    return <WrappedComponent data={data} {...props} />;
  };
}

// Component
function UserList({ data }) {
  return (
    <ul>
      {data ? data.map((user) => <li key={user.id}>{user.name}</li>) : 'Loading...'}
    </ul>
  );
}

// Usage
const EnhancedUserList = withDataFetching(UserList, 'https://api.example.com/users');

function App() {
  return <EnhancedUserList />;
}
```
*Explanation*: `withDataFetching` adds data fetching to `UserList`.

---

### 16. What are Render Props, and how do they differ from HOCs?

**Answer**: Render Props is a pattern where a component accepts a function prop that returns JSX, sharing logic. Unlike HOCs (wrap components), Render Props are more explicit and flexible.

**Example**:
```jsx
import React, { useState, useEffect } from 'react';

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return render(position);
}

function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h1>
          Mouse at: {x}, {y}
        </h1>
      )}
    />
  );
}
```
*Explanation*: `MouseTracker` shares `position` via `render`.

**Difference**:
- **HOC**: Wraps component, less explicit.
- **Render Props**: Passes logic via prop, more control.

---

### 17. What are Error Boundaries in React, and how do you implement them?

**Answer**: Error Boundaries catch JavaScript errors in child components, preventing app crashes. Implement with `componentDidCatch` and `static getDerivedStateFromError` in class components.

**Example**:
```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('Error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function BuggyComponent() {
  throw new Error('I crashed!');
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}
```
*Explanation*: `ErrorBoundary` catches `BuggyComponent`’s error, showing a fallback UI.

---

### 18. What is the significance of keys in React lists?

**Answer**: Keys are unique identifiers for list items, helping React track elements during updates to optimize rendering and prevent UI bugs.

**Example**:
```jsx
import React from 'react';

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

function App() {
  const todos = [
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build App' },
  ];
  return <TodoList todos={todos} />;
}
```
*Explanation*: `key={todo.id}` ensures React updates only changed items, not the entire list.

---

### 19. How do you conditionally render components in React?

**Answer**: Use JavaScript operators (`&&`, `||`, ternary) or `if` statements to render components based on conditions.

**Example**:
```jsx
import React, { useState } from 'react';

function LoginStatus() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? (
        <h1>Welcome back!</h1>
      ) : (
        <button onClick={() => setIsLoggedIn(true)}>Log In</button>
      )}
    </div>
  );
}
```
*Explanation*: Renders a greeting if `isLoggedIn`, otherwise a button.

---

### 20. What are Fragments in React, and why are they useful?

**Answer**: Fragments (`<React.Fragment>` or `<>`) group multiple elements without adding extra DOM nodes. They’re useful for cleaner markup and valid JSX (single parent rule).

**Example**:
```jsx
import React from 'react';

function ItemList() {
  return (
    <>
      <h1>Items</h1>
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
      </ul>
    </>
  );
}
```
*Explanation*: `<>...</>` groups `<h1>` and `<ul>` without a wrapper `<div>`, reducing DOM clutter.

---


### 1. What are React Hooks, and why were they introduced?

**Answer**: React Hooks are functions that let you use state and lifecycle features in functional components, avoiding class components. Introduced in React 16.8 (2019), they simplify code, improve reusability, and make logic sharing easier compared to class-based lifecycle methods and higher-order components.

**Why Introduced**:
- **Simpler Code**: Classes can be verbose and confusing (e.g., `this` binding).
- **Logic Reuse**: Hooks enable sharing stateful logic without HOCs or render props.
- **Functional Paradigm**: Aligns React with modern JavaScript’s functional style.

**Example**:
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
*Explanation*: `useState` replaces class state, making the component cleaner.

---

### 2. Explain the rules of using Hooks.

**Answer**: Hooks have strict rules to ensure predictable behavior:
1. **Only Call Hooks at the Top Level**: Don’t use Hooks inside loops, conditions, or nested functions.
2. **Only Call Hooks from Functional Components or Custom Hooks**: Not from regular JavaScript functions.
3. **Custom Hooks Must Start with "use"**: Naming convention for clarity (e.g., `useCustomHook`).

**Why?** React relies on the order of Hook calls to maintain state consistency.

**Example**:
```jsx
import React, { useState, useEffect } from 'react';

function BadHookUsage() {
  // ❌ Wrong: Hook inside condition
  if (true) {
    const [count, setCount] = useState(0);
  }

  return <div>Error-prone code</div>;
}

function GoodHookUsage() {
  // ✅ Correct: Hooks at top level
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
*Explanation*: `GoodHookUsage` follows rules, ensuring React tracks state correctly.

---

### 3. What is useState, and how do you use it?

**Answer**: `useState` is a Hook that adds state to functional components. It returns a state variable and a setter function to update it. It’s used for managing local component state.

**Example**:
```jsx
import React, { useState } from 'react';

function TodoForm() {
  const [todo, setTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Todo:', todo);
    setTodo(''); // Reset input
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Add a todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}
```
*Explanation*: `todo` holds the input value, updated by `setTodo` on change. The form resets after submission.

---

### 4. What is useEffect, and how does it replace lifecycle methods?

**Answer**: `useEffect` handles side effects (e.g., data fetching, subscriptions) in functional components. It combines `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` from class components.

**How It Replaces Lifecycle**:
- **Mount**: Runs after render (like `componentDidMount`).
- **Update**: Runs on dependency changes (like `componentDidUpdate`).
- **Unmount**: Cleanup function runs before unmounting (like `componentWillUnmount`).

**Example**:
```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, []); // Empty deps: runs once on mount

  return <div>Seconds: {seconds}</div>;
}
```
*Explanation*: `useEffect` sets up an interval on mount and clears it on unmount, replacing lifecycle methods.

---

### 5. What is the purpose of the dependency array in useEffect?

**Answer**: The dependency array (`deps`) in `useEffect` controls when the effect runs. It lists variables the effect depends on. If a dependency changes, the effect re-runs; otherwise, it skips.

- **Empty Array (`[]`)**: Runs once on mount.
- **No Array**: Runs on every render.
- **With Dependencies**: Runs when listed values change.

**Example**:
```jsx
import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`https://api.example.com/users/${userId}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [userId]); // Re-run when userId changes

  return <div>{user ? user.name : 'Loading...'}</div>;
}
```
*Explanation*: The effect fetches user data only when `userId` changes, preventing unnecessary API calls.

---

### 6. What is useContext, and how do you use it for state management?

**Answer**: `useContext` accesses React’s Context API to share state across components without prop drilling. It’s used for global state (e.g., themes, user data).

**Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';

// Create Context
const ThemeContext = createContext();

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```
*Explanation*: `ThemeContext` shares `theme` and `setTheme` globally, accessed via `useContext` in `Toolbar`.

---

### 7. What is useReducer, and how does it differ from useState?

**Answer**: `useReducer` manages complex state logic with a reducer function, returning state and a dispatch function. Unlike `useState` (for simple state), `useReducer` is better for state transitions with multiple actions.

**Differences**:
- `useState`: Simple updates (e.g., `setCount(count + 1)`).
- `useReducer`: Structured updates via actions (e.g., `{ type: 'INCREMENT' }`).

**Example**:
```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Add</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Subtract</button>
    </div>
  );
}
```
*Explanation*: `useReducer` handles `count` with actions, cleaner than multiple `useState` calls.

---

### 8. What is useRef, and how do you use it?

**Answer**: `useRef` creates a mutable object (`current`) that persists across renders without causing re-renders. It’s used for DOM access, storing values, or tracking previous state.

**Example**:
```jsx
import React, { useRef, useEffect } from 'react';

function TextInput() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus(); // Auto-focus on mount
  }, []);

  return <input ref={inputRef} type="text" placeholder="Enter text" />;
}
```
*Explanation*: `inputRef` accesses the DOM input to focus it without triggering a re-render.

---

### 9. What is useMemo, and how does it optimize performance?

**Answer**: `useMemo` memoizes expensive calculations, recomputing only when dependencies change. It optimizes performance by preventing unnecessary computations during renders.

**Example**:
```jsx
import React, { useState, useMemo } from 'react';

function ExpensiveCalculation({ numbers }) {
  const [multiplier, setMultiplier] = useState(1);

  const sum = useMemo(() => {
    console.log('Calculating sum...');
    return numbers.reduce((acc, num) => acc + num, 0) * multiplier;
  }, [numbers, multiplier]);

  return (
    <div>
      <p>Sum: {sum}</p>
      <button onClick={() => setMultiplier(multiplier + 1)}>
        Increase Multiplier
      </button>
    </div>
  );
}
```
*Explanation*: `sum` recalculates only when `numbers` or `multiplier` changes, avoiding redundant work.

---

### 10. What is useCallback, and how does it differ from useMemo?

**Answer**: `useCallback` memoizes functions, returning the same function instance unless dependencies change. It’s used to prevent child components from re-rendering unnecessarily. Unlike `useMemo` (memoizes values), `useCallback` memoizes callbacks.

**Example**:
```jsx
import React, { useState, useCallback } from 'react';

function Child({ onClick }) {
  console.log('Child rendered');
  return <button onClick={onClick}>Click Me</button>;
}

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Button clicked');
  }, []); // Memoized function

  return (
    <div>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
```
*Explanation*: `useCallback` ensures `handleClick` doesn’t change, preventing `Child` re-renders when `count` updates.

**Difference**:
- `useMemo`: `const value = useMemo(() => computeValue(), [deps])`.
- `useCallback`: `const fn = useCallback(() => {...}, [deps])` (shorthand for `useMemo(() => fn, [deps])`).

---

### 11. How do you create a custom Hook in React?

**Answer**: A custom Hook is a function starting with `use` that encapsulates reusable logic using other Hooks. It promotes DRY code and modularity.

**Example**:
```jsx
import { useState, useEffect } from 'react';

// Custom Hook
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

// Usage
function App() {
  const { width, height } = useWindowSize();

  return (
    <div>
      <p>Window Size: {width} x {height}</p>
    </div>
  );
}
```
*Explanation*: `useWindowSize` abstracts window resize logic, reusable across components.

---

### 12. What is the purpose of useLayoutEffect?

**Answer**: `useLayoutEffect` is like `useEffect` but runs synchronously after DOM mutations, before the browser paints. It’s used for measurements or DOM updates that must happen before rendering.

**Example**:
```jsx
import React, { useLayoutEffect, useRef } from 'react';

function Tooltip() {
  const tooltipRef = useRef(null);

  useLayoutEffect(() => {
    const { current } = tooltipRef;
    const rect = current.getBoundingClientRect();
    if (rect.right > window.innerWidth) {
      current.style.left = `${window.innerWidth - rect.width}px`;
    }
  }, []);

  return (
    <div ref={tooltipRef} style={{ position: 'absolute', top: '10px', right: '10px' }}>
      Tooltip Content
    </div>
  );
}
```
*Explanation*: `useLayoutEffect` adjusts the tooltip’s position before painting, preventing flicker.

---

### 13. What is state management in React, and why is it important?

**Answer**: State management handles data (state) that determines a component’s behavior and rendering. It’s crucial for:
- **Consistency**: Ensures predictable UI updates.
- **Scalability**: Manages complex apps with shared data.
- **Reactivity**: Drives dynamic interfaces.

**Example**:
```jsx
import React, { useState } from 'react';

function ShoppingCart() {
  const [items, setItems] = useState([]);

  const addItem = (item) => {
    setItems([...items, item]);
  };

  return (
    <div>
      <button onClick={() => addItem({ id: Date.now(), name: 'Product' })}>
        Add Item
      </button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
```
*Explanation*: `items` state manages the cart, updating the UI as items are added.

---

### 14. How do you lift state up in React?

**Answer**: Lifting state up moves state to a common parent component to share it among siblings, avoiding prop drilling.

**Example**:
```jsx
import React, { useState } from 'react';

function Parent() {
  const [name, setName] = useState('');

  return (
    <div>
      <Input name={name} setName={setName} />
      <Display name={name} />
    </div>
  );
}

function Input({ name, setName }) {
  return (
    <input
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder="Enter name"
    />
  );
}

function Display({ name }) {
  return <p>Hello, {name || 'Guest'}!</p>;
}
```
*Explanation*: `name` state lives in `Parent`, shared with `Input` and `Display`.

---

### 15. What is Context API, and how do you use it for state management?

**Answer**: The Context API provides a way to share state globally without prop drilling. It’s ideal for app-wide data (e.g., user, theme).

**Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({ name: 'Alice' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Profile />
    </UserContext.Provider>
  );
}

function Profile() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div>
      <p>User: {user.name}</p>
      <button onClick={() => setUser({ name: 'Bob' })}>Change User</button>
    </div>
  );
}
```
*Explanation*: `UserContext` shares `user` state, accessed by `Profile` via `useContext`.

---

### 16. What is Redux, and how does it work with React?

**Answer**: Redux is a predictable state container for managing global state. It uses a single store, actions, and reducers. With React, `react-redux` connects components to the store.

**How It Works**:
- **Store**: Holds app state.
- **Actions**: Describe changes (e.g., `{ type: 'ADD_ITEM' }`).
- **Reducers**: Update state based on actions.

**Example**:
```jsx
import { createStore } from 'redux';
import { Provider } from 'react-redux';

// Reducer
const initialState = { count: 0 };
function counterReducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// Store
const store = createStore(counterReducer);

function App() {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}
```
*Explanation*: `Provider` makes the Redux store available to `Counter`.

---

### 17. What are actions, reducers, and the store in Redux?

**Answer**:
- **Actions**: Objects describing events (e.g., `{ type: 'ADD', payload: 1 }`).
- **Reducers**: Pure functions that update state based on actions.
- **Store**: Single source of truth holding the app’s state.

**Example**:
```jsx
import { createStore } from 'redux';

// Action
const increment = () => ({ type: 'INCREMENT' });

// Reducer
const initialState = { count: 0 };
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    default:
      return state;
  }
}

// Store
const store = createStore(reducer);

// Dispatch
store.dispatch(increment());
console.log(store.getState()); // { count: 1 }
```
*Explanation*: Action triggers reducer to update the store’s state.

---

### 18. How do you connect a React component to Redux?

**Answer**: Use `react-redux`’s `useSelector` to read state and `useDispatch` to dispatch actions in functional components.

**Example**:
```jsx
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Add</button>
    </div>
  );
}
```
*Explanation*: `useSelector` gets `count` from the store; `useDispatch` sends actions to update it.

---

### 19. What is Redux Thunk, and how do you use it for async actions?

**Answer**: Redux Thunk is middleware allowing async logic in actions (e.g., API calls) by returning functions instead of objects.

**Example**:
```jsx
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Action
const fetchData = () => async (dispatch) => {
  dispatch({ type: 'FETCH_START' });
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  dispatch({ type: 'FETCH_SUCCESS', payload: data });
};

// Reducer
const initialState = { loading: false, data: null };
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    default:
      return state;
  }
}

// Store
const store = createStore(reducer, applyMiddleware(thunk));

// Dispatch
store.dispatch(fetchData());
```
*Explanation*: `fetchData` dispatches actions during async API calls, handled by Thunk.

---

### 20. What is Redux Saga, and how does it differ from Redux Thunk?

**Answer**: Redux Saga is middleware for complex async logic using ES6 generators, offering declarative effects. Unlike Thunk (returns functions), Saga uses sagas to manage side effects centrally.

**Differences**:
- **Thunk**: Simple, inline async (e.g., `async/await`).
- **Saga**: Structured, testable, handles complex flows (e.g., cancellations).

**Example**:
```jsx
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { call, put, takeEvery } from 'redux-saga/effects';

// Saga
function* fetchDataSaga() {
  try {
    const data = yield call(fetch, 'https://api.example.com/data');
    const json = yield call([data, 'json']);
    yield put({ type: 'FETCH_SUCCESS', payload: json });
  } catch (error) {
    yield put({ type: 'FETCH_ERROR' });
  }
}

function* rootSaga() {
  yield takeEvery('FETCH_DATA', fetchDataSaga);
}

// Reducer
const initialState = { data: null };
function reducer(state = initialState, action) {
  if (action.type === 'FETCH_SUCCESS') {
    return { ...state, data: action.payload };
  }
  return state;
}

// Store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// Dispatch
store.dispatch({ type: 'FETCH_DATA' });
```
*Explanation*: Saga handles async fetch declaratively, unlike Thunk’s imperative approach.

---

### 21. What is Zustand, and how does it compare to Redux?

**Answer**: Zustand is a lightweight state management library with a simple API, using Hooks for state access. Compared to Redux:
- **Simpler**: No boilerplate (actions/reducers).
- **Flexible**: Direct state updates.
- **Smaller**: Minimal bundle size.

**Example**:
```jsx
import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const { count, increment } = useStore();

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Add</button>
    </div>
  );
}
```
*Explanation*: Zustand’s `useStore` manages `count` with minimal code.

**Comparison**:
- **Redux**: Structured, scalable, but verbose.
- **Zustand**: Lightweight, great for smaller apps or rapid prototyping.

---

### 22. What is React Query, and how does it simplify data fetching?

**Answer**: React Query is a library for managing server-state (e.g., API data) with caching, refetching, and sync. It simplifies data fetching by handling loading, errors, and stale data automatically.

**Example**:
```jsx
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
}

function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://api.example.com/users');
      return res.json();
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```
*Explanation*: `useQuery` fetches and caches user data, handling states automatically.

---

### 23. What is React Router, and how do you use it?

**Answer**: React Router is a library for client-side routing in React apps, enabling navigation without page reloads.

**Example**:
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>Home Page</h1>;
}

function About() {
  return <h1>About Page</h1>;
}
```
*Explanation*: `BrowserRouter` wraps the app, `Routes` defines paths, and `Link` enables navigation.

---

### 24. How do you set up routing in a React application?

**Answer**: Install `react-router-dom`, wrap the app in `BrowserRouter`, and define routes using `Routes` and `Route`.

**Example**:
```jsx
// npm install react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function Profile() {
  return <h1>Profile</h1>;
}
```
*Explanation*: Routes map URLs to components, enabling navigation.

---

### 25. What is the difference between BrowserRouter and HashRouter?

**Answer**:
- **BrowserRouter**: Uses HTML5 history API for clean URLs (e.g., `/about`). Requires server config for SPAs.
- **HashRouter**: Uses URL hash for routing (e.g., `/#about`). Works without server setup, ideal for static hosting.

**Example (BrowserRouter)**:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
```

**Example (HashRouter)**:
```jsx
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </HashRouter>
  );
}
```
*Explanation*: `BrowserRouter` gives `/path`; `HashRouter` gives `/#path`.

---

### 26. How do you handle dynamic routing in React?

**Answer**: Use route parameters (e.g., `:id`) in `Route` paths and access them with `useParams`.

**Example**:
```jsx
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/user/:id" element={<UserProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

function UserProfile() {
  const { id } = useParams();

  return <h1>User ID: {id}</h1>;
}
```
*Explanation*: `:id` captures dynamic segments, accessed via `useParams`.

---

### 27. What is route guarding in React, and how do you implement it?

**Answer**: Route guarding restricts access to routes based on conditions (e.g., authentication). Implement with a wrapper component or `Navigate`.

**Example**:
```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

function ProtectedRoute({ isAuthenticated, children }) {
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  const isAuthenticated = false; // Example condition

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<h1>Login</h1>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <h1>Dashboard</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
```
*Explanation*: `ProtectedRoute` redirects unauthenticated users to `/login`.

---

### 28. How do you pass data between routes in React?

**Answer**: Use `useNavigate` to pass state via `navigate` or query params with `useLocation`.

**Example**:
```jsx
import { BrowserRouter, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/details', { state: { name: 'Alice' } })}>
      Go to Details
    </button>
  );
}

function Details() {
  const { state } = useLocation();

  return <h1>Hello, {state?.name || 'Guest'}!</h1>;
}
```
*Explanation*: `navigate` sends `state`, accessed in `Details` via `useLocation`.

---

### 29. What is lazy loading in React Router, and how do you implement it?

**Answer**: Lazy loading delays loading of components until needed, reducing initial bundle size. Use `React.lazy` and `Suspense`.

**Example**:
```jsx
import { BrowserRouter, Routes, Route, lazy, Suspense } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const About = lazy(() => import('./About'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```
*Explanation*: `lazy` loads components on-demand; `Suspense` shows a fallback during loading.

---

### 30. How do you handle 404 (Not Found) routes in React?

**Answer**: Use a catch-all `Route` with `path="*"` to render a 404 component.

**Example**:
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return <h1>404 - Page Not Found</h1>;
}
```
*Explanation*: `*` matches any undefined route, rendering `NotFound`.

---

### 31. How do you optimize performance in a React application?

**Answer**: Optimize by:
- **Memoization**: Use `React.memo`, `useMemo`, `useCallback`.
- **Lazy Loading**: Split code with `React.lazy`.
- **Avoid Re-renders**: Use keys, pure components.
- **Efficient State**: Minimize state updates.

**Example**:
```jsx
import React, { useMemo } from 'react';

function ExpensiveList({ items }) {
  const sortedItems = useMemo(() => {
    return [...items].sort();
  }, [items]);

  return (
    <ul>
      {sortedItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
```
*Explanation*: `useMemo` prevents re-sorting unless `items` changes.

---

### 32. What is code splitting, and how do you implement it in React?

**Answer**: Code splitting divides the app into smaller bundles, loaded on-demand to reduce initial load time. Use `React.lazy` and `Suspense`.

**Example**:
```jsx
import React, { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```
*Explanation*: `LazyComponent` loads only when rendered, shrinking the initial bundle.

---

### 33. What is memoization in React, and how do you use React.memo?

**Answer**: Memoization caches results to avoid redundant work. `React.memo` prevents component re-renders if props are unchanged.

**Example**:
```jsx
import React, { memo } from 'react';

const Child = memo(({ value }) => {
  console.log('Child rendered');
  return <div>{value}</div>;
});

function Parent() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Child value="Static" />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
```
*Explanation*: `Child` doesn’t re-render when `count` changes, as `value` is static.

---

### 34. How does useMemo help in optimizing performance?

**Answer**: `useMemo` memoizes values, recomputing only when dependencies change, avoiding expensive calculations.

**Example**:
```jsx
import React, { useState, useMemo } from 'react';

function Factorial({ number }) {
  const factorial = useMemo(() => {
    console.log('Calculating factorial...');
    let result = 1;
    for (let i = 1; i <= number; i++) result *= i;
    return result;
  }, [number]);

  return <div>Factorial of {number}: {factorial}</div>;
}
```
*Explanation*: `factorial` recomputes only if `number` changes.

---

### 35. How does useCallback help in optimizing performance?

**Answer**: `useCallback` memoizes functions, preventing new instances on re-renders, reducing child component re-renders.

**Example**:
```jsx
import React, { useState, useCallback } from 'react';

function Button({ onClick }) {
  console.log('Button rendered');
  return <button onClick={onClick}>Click</button>;
}

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div>
      <Button onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
```
*Explanation*: `handleClick` stays the same, preventing `Button` re-renders.

---

### 36. What is the purpose of the key prop in lists?

**Answer**: The `key` prop uniquely identifies list items, helping React efficiently update the DOM by tracking changes.

**Example**:
```jsx
import React from 'react';

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}
```
*Explanation*: `key={todo.id}` ensures React re-renders only changed items.

---

### 37. How do you avoid unnecessary re-renders in React?

**Answer**: Prevent re-renders by:
- Using `React.memo` for components.
- Memoizing values with `useMemo`.
- Memoizing functions with `useCallback`.
- Optimizing state updates.

**Example**:
```jsx
import React, { memo, useState, useCallback } from 'react';

const Child = memo(({ onClick }) => {
  console.log('Child rendered');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('Clicked');
  }, []);

  return (
    <div>
      <Child onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
    </div>
  );
}
```
*Explanation*: `memo` and `useCallback` prevent `Child` re-renders when `count` changes.

---

### 38. What is server-side rendering (SSR), and how does it improve performance?

**Answer**: SSR renders React components on the server, sending HTML to the client. It improves:
- **SEO**: Search engines see content.
- **Initial Load**: Faster first paint.
- **User Experience**: Content appears quicker.

**Example (Next.js)**:
```jsx
// pages/index.js
export async function getServerSideProps() {
  const data = await fetch('https://api.example.com/data').then((res) => res.json());
  return { props: { data } };
}

function Home({ data }) {
  return <div>{data.title}</div>;
}

export default Home;
```
*Explanation*: `getServerSideProps` fetches data server-side, rendering HTML before sending to the client.

---

### 39. What is static site generation (SSG) in Next.js, and how does it differ from SSR?

**Answer**: SSG pre-renders pages at build time, serving static HTML. Unlike SSR (renders on each request), SSG is faster for static content but less dynamic.

**Example (Next.js)**:
```jsx
// pages/index.js
export async function getStaticProps() {
  const data = await fetch('https://api.example.com/data').then((res) => res.json());
  return { props: { data } };
}

function Home({ data }) {
  return <div>{data.title}</div>;
}

export default Home;
```
*Explanation*: `getStaticProps` generates HTML at build time.

**Difference**:
- **SSG**: Build-time rendering, great for blogs.
- **SSR**: Request-time rendering, suits dynamic data.

---

### 40. How do you profile and debug performance issues in React?

**Answer**: Use:
- **React DevTools**: Profile components to spot slow renders.
- **Browser DevTools**: Measure network, rendering.
- **Why-Did-You-Render**: Detect unnecessary re-renders.

**Example**:
```jsx
// Install: npm install @welldone-software/why-did-you-render
import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

whyDidYouRender(React);

function Component({ staticProp }) {
  return <div>{staticProp}</div>;
}

Component.whyDidYouRender = true;
```
*Explanation*: Logs re-renders for debugging.

---

### 41. What is the Compound Component pattern, and how do you use it?

**Answer**: Compound Components share state implicitly via context, allowing flexible composition.

**Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';

const TabsContext = createContext();

function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  return (
    <button
      style={{ fontWeight: activeTab === index ? 'bold' : 'normal' }}
      onClick={() => setActiveTab(index)}
    >
      {children}
    </button>
  );
}

function Panel({ index, children }) {
  const { activeTab } = useContext(TabsContext);
  return activeTab === index ? <div>{children}</div> : null;
}

function App() {
  return (
    <Tabs>
      <Tab index={0}>Tab 1</Tab>
      <Tab index={1}>Tab 2</Tab>
      <Panel index={0}>Content 1</Panel>
      <Panel index={1}>Content 2</Panel>
    </Tabs>
  );
}
```
*Explanation*: `Tabs` shares state via context, coordinating `Tab` and `Panel`.

---

### 42. What is the Render Props pattern, and how does it work?

**Answer**: Render Props pass a function as a prop to share logic, allowing components to render dynamic content.

**Example**:
```jsx
import React, { useState } from 'react';

function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  return <div onMouseMove={handleMouseMove}>{render(position)}</div>;
}

function App() {
  return (
    <MouseTracker
      render={({ x, y }) => (
        <h1>
          Mouse at: {x}, {y}
        </h1>
      )}
    />
  );
}
```
*Explanation*: `MouseTracker` shares `position` via `render`, letting `App` define the UI.

---

### 43. What is the Provider Pattern, and how do you use it with Context API?

**Answer**: The Provider Pattern uses Context to share state globally, avoiding prop drilling.

**Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (name) => setUser({ name });

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

function Profile() {
  const { user, login } = useContext(AuthContext);

  return (
    <div>
      {user ? <p>Welcome, {user.name}</p> : <button onClick={() => login('Alice')}>Login</button>}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Profile />
    </AuthProvider>
  );
}
```
*Explanation*: `AuthProvider` shares `user` and `login` via `AuthContext`.

---

### 44. What is the Hooks pattern, and how do you create custom Hooks?

**Answer**: The Hooks pattern encapsulates reusable logic in functions starting with `use`. Custom Hooks combine built-in Hooks for modularity.

**Example**:
```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return { data, loading };
}

function App() {
  const { data, loading } = useFetch('https://api.example.com/data');

  return loading ? <div>Loading...</div> : <div>{data.title}</div>;
}
```
*Explanation*: `useFetch` abstracts API logic, reusable across components.

---

### 45. What is the Controlled vs. Uncontrolled component pattern?

**Answer**:
- **Controlled**: State-driven inputs, managed by React.
- **Uncontrolled**: DOM-driven inputs, managed via refs.

**Example (Controlled)**:
```jsx
import React, { useState } from 'react';

function Form() {
  const [value, setValue] = useState('');

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Controlled"
    />
  );
}
```

**Example (Uncontrolled)**:
```jsx
import React, { useRef } from 'react';

function Form() {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
  };

  return (
    <div>
      <input ref={inputRef} placeholder="Uncontrolled" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
```
*Explanation*: Controlled uses state; uncontrolled uses DOM directly.

---

### 46. How do you implement the Observer pattern in React?

**Answer**: The Observer pattern notifies components of state changes, implemented with Context or event emitters.

**Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';

const NotificationContext = createContext();

function NotificationProvider({ children }) {
  const [message, setMessage] = useState('');

  const notify = (msg) => setMessage(msg);

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {message && <div>{message}</div>}
    </NotificationContext.Provider>
  );
}

function Button() {
  const { notify } = useContext(NotificationContext);

  return <button onClick={() => notify('Clicked!')}>Click Me</button>;
}

function App() {
  return (
    <NotificationProvider>
      <Button />
    </NotificationProvider>
  );
}
```
*Explanation*: `notify` triggers UI updates, acting as an observer.

---

### 47. What is the Container/Presentational pattern, and is it still relevant with Hooks?

**Answer**: Container components manage logic; Presentational components handle UI. With Hooks, it’s less rigid but still useful for separation of concerns.

**Example**:
```jsx
import React, { useState } from 'react';

// Presentational
function TodoList({ todos, toggleTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          onClick={() => toggleTodo(todo.id)}
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}

// Container
function TodoContainer() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn Hooks', completed: false },
  ]);

  const toggleTodo = (id) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return <TodoList todos={todos} toggleTodo={toggleTodo} />;
}
```
*Explanation*: `TodoContainer` handles state; `TodoList` renders UI. Hooks make containers simpler but pattern remains relevant.

---

### 48. How do you implement the Singleton pattern in React?

**Answer**: Singleton ensures one instance of a resource. In React, use Context or a module to share a single instance.

**Example**:
```jsx
// singleton.js
export const apiClient = {
  getData: async () => ({ data: 'Sample' }),
};

// App.jsx
import React from 'react';
import { apiClient } from './singleton';

function App() {
  const fetchData = async () => {
    const result = await apiClient.getData();
    console.log(result);
  };

  return <button onClick={fetchData}>Fetch</button>;
}
```
*Explanation*: `apiClient` is a single instance reused across the app.

---

### 49. What is the Flyweight pattern, and how does it apply to React?

**Answer**: Flyweight reuses objects to save memory. In React, memoization and shared state reduce redundant data.

**Example**:
```jsx
import React, { useMemo } from 'react';

function ItemList({ items }) {
  const sharedStyles = useMemo(() => ({
    color: 'blue',
    fontSize: '16px',
  }), []);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id} style={sharedStyles}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```
*Explanation*: `sharedStyles` is reused, minimizing memory for each item.

---

### 50. How do you use the Factory pattern in React?

**Answer**: Factory creates components based on input, promoting flexibility.

**Example**:
```jsx
import React from 'react';

function Button({ type, ...props }) {
  const ButtonTypes = {
    primary: (p) => <button style={{ background: 'blue' }} {...p} />,
    secondary: (p) => <button style={{ background: 'gray' }} {...p} />,
  };

  const Component = ButtonTypes[type] || ButtonTypes.primary;
  return <Component {...props} />;
}

function App() {
  return (
    <div>
      <Button type="primary">Primary</Button>
      <Button type="secondary">Secondary</Button>
    </div>
  );
}
```
*Explanation*: `Button` factory selects component based on `type`.

---

### 51. What are the best practices for testing React applications?

**Answer**:
- Test user behavior, not implementation.
- Use React Testing Library for DOM testing.
- Mock APIs for isolation.
- Test edge cases and async code.

**Example**:
```jsx
// See Q54 for detailed example
```

---

### 52. What is Jest, and how do you use it with React?

**Answer**: Jest is a testing framework for JavaScript, used with React for unit and integration tests.

**Example**:
```jsx
// Counter.test.js
import { render, screen } from '@testing-library/react';
import Counter from './Counter';

test('renders counter', () => {
  render(<Counter />);
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
});
```
*Explanation*: Jest runs the test, checking if `Counter` renders correctly.

---

### 53. What is React Testing Library, and how does it differ from Enzyme?

**Answer**:
- **React Testing Library**: Focuses on user behavior, testing DOM output.
- **Enzyme**: Tests component internals (state, props).

**Differences**:
- RTL encourages testing like a user.
- Enzyme allows shallow rendering, less realistic.

**Example**:
```jsx
// See Q54
```

---

### 54. How do you test React components using React Testing Library?

**Answer**: Use RTL to render components and query the DOM to simulate user interactions.

**Example**:
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}

test('increments counter', () => {
  render(<Counter />);
  const button = screen.getByText('Add');
  fireEvent.click(button);
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```
*Explanation*: RTL tests user interaction (click) and DOM updates.

---

### 55. How do you test React Hooks?

**Answer**: Use `@testing-library/react-hooks` to test custom Hooks in isolation.

**Example**:
```jsx
import { renderHook, act } from '@testing-library/react-hooks';
import { useCounter } from './useCounter';

function useCounter() {
  const [count, setCount] = React.useState(0);
  const increment = () => setCount(count + 1);
  return { count, increment };
}

test('increments counter', () => {
  const { result } = renderHook(() => useCounter());
  act(() => {
    result.current.increment();
  });
  expect(result.current.count).toBe(1);
});
```
*Explanation*: `renderHook` tests `useCounter` logic directly.

---

### 56. How do you mock API calls in React tests?

**Answer**: Use `jest.mock` or libraries like `msw` to mock APIs.

**Example**:
```jsx
import { render, screen, waitFor } from '@testing-library/react';
import User from './User';
import * as api from './api';

jest.mock('./api');

test('fetches user', async () => {
  api.fetchUser.mockResolvedValue({ name: 'Alice' });
  render(<User />);
  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
```
*Explanation*: Mocks `fetchUser` to return fake data.

---

### 57. How do you test React Router components?

**Answer**: Wrap components in `MemoryRouter` for testing navigation.

**Example**:
```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

test('renders home', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  );
  expect(screen.getByText('Home')).toBeInTheDocument();
});
```
*Explanation*: `MemoryRouter` simulates routing for tests.

---

### 58. What is snapshot testing, and how do you use it in React?

**Answer**: Snapshot testing captures component output and compares it to a stored snapshot.

**Example**:
```jsx
import { render } from '@testing-library/react';
import Button from './Button';

test('matches snapshot', () => {
  const { asFragment } = render(<Button>Click</Button>);
  expect(asFragment()).toMatchSnapshot();
});
```
*Explanation*: Jest saves the DOM structure, failing if it changes unexpectedly.

---

### 59. How do you test Redux-connected components?

**Answer**: Mock the store with `Provider` or test unconnected components.

**Example**:
```jsx
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Counter from './Counter';

test('renders counter', () => {
  const store = createStore(() => ({ count: 5 }));
  render(
    <Provider store={store}>
      <Counter />
    </Provider>
  );
  expect(screen.getByText('Count: 5')).toBeInTheDocument();
});
```
*Explanation*: `Provider` supplies a mock store for testing.

---

### 60. How do you test asynchronous code in React?

**Answer**: Use `waitFor` or `async/await` to handle async operations.

**Example**:
```jsx
import { render, screen, waitFor } from '@testing-library/react';
import User from './User';

test('fetches user', async () => {
  render(<User />);
  await waitFor(() => {
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });
});
```
*Explanation*: `waitFor` waits for async updates to complete.

---

### 61. What is Next.js, and how does it differ from Create React App?

**Answer**:
- **Next.js**: Framework for SSR, SSG, and API routes.
- **Create React App (CRA)**: Boilerplate for client-side React apps.

**Differences**:
- Next.js adds server-side features; CRA is client-only.
- Next.js has built-in routing; CRA needs React Router.

**Example (Next.js)**:
```jsx
// pages/index.js
export default function Home() {
  return <h1>Welcome to Next.js</h1>;
}
```

---

### 62. What is Gatsby, and when would you use it?

**Answer**: Gatsby is a static site generator using React, ideal for content-heavy sites (e.g., blogs). Use it for fast, SEO-friendly static sites.

**Example**:
```jsx
// gatsby-node.js
exports.createPages = async ({ actions }) => {
  const { createPage } = actions;
  createPage({
    path: '/hello',
    component: require.resolve('./src/pages/hello.js'),
  });
};
```

---

### 63. What is Storybook, and how do you use it for React components?

**Answer**: Storybook is a UI development tool for building and documenting components in isolation.

**Example**:
```jsx
// Button.stories.js
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
};

export const Primary = () => <Button>Click</Button>;
```
*Explanation*: Storybook displays `Button` variants.

---

### 64. What are styled-components, and how do you use them in React?

**Answer**: Styled-components is a CSS-in-JS library for styling React components.

**Example**:
```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: blue;
  color: white;
`;

function App() {
  return <Button>Click</Button>;
}
```
*Explanation*: Styles are scoped to `Button`.

---

### 65. What is Tailwind CSS, and how do you integrate it with React?

**Answer**: Tailwind CSS is a utility-first CSS framework. Integrate with PostCSS in React.

**Example**:
```jsx
// Install: npm install tailwindcss postcss autoprefixer
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {},
};

// src/index.css
@tailwind base;
@tailwind components;
@tailwind utilities;

// App.jsx
function App() {
  return <button className="bg-blue-500 text-white p-2">Click</button>;
}
```
*Explanation*: Tailwind classes style the button.

---

### 66. What is Material-UI, and how do you use it in React?

**Answer**: Material-UI (MUI) is a React component library implementing Material Design.

**Example**:
```jsx
import Button from '@mui/material/Button';

function App() {
  return <Button variant="contained">Click</Button>;
}
```
*Explanation*: MUI’s `Button` provides pre-styled UI.

---

### 67. What is Vite, and how does it compare to Webpack for React?

**Answer**:
- **Vite**: Fast build tool with native ES modules.
- **Webpack**: Flexible bundler, slower for large apps.

**Comparison**:
- Vite: Faster dev server, simpler config.
- Webpack: More plugins, complex setup.

**Example**:
```jsx
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

---

### 68. What is SWR, and how does it simplify data fetching in React?

**Answer**: SWR is a library for data fetching with caching and revalidation.

**Example**:
```jsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function User() {
  const { data, error } = useSWR('https://api.example.com/user', fetcher);

  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  return <div>{data.name}</div>;
}
```
*Explanation*: SWR handles fetching, caching, and errors.

---

### 69. What is React Helmet, and how do you use it for SEO?

**Answer**: React Helmet manages `<head>` tags for SEO (e.g., titles, meta).

**Example**:
```jsx
import { Helmet } from 'react-helmet';

function Page() {
  return (
    <div>
      <Helmet>
        <title>My Page</title>
        <meta name="description" content="SEO-friendly page" />
      </Helmet>
      <h1>Hello</h1>
    </div>
  );
}
```
*Explanation*: Helmet sets SEO metadata.

---

### 70. What is React DnD, and how do you implement drag-and-drop in React?

**Answer**: React DnD is a library for drag-and-drop interactions.

**Example**:
```jsx
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function DraggableItem() {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'item',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      Drag Me
    </div>
  );
}

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <DraggableItem />
    </DndProvider>
  );
}
```
*Explanation*: `useDrag` enables dragging; `DndProvider` sets up DnD.

---

### 71. How would you structure a large-scale React application?

**Answer**: Use a modular structure:
- **src/**:
  - **components/**: Reusable UI (e.g., `Button/`).
  - **pages/**: Route-based components.
  - **hooks/**: Custom Hooks.
  - **context/**: Global state.
  - **utils/**: Helpers.
  - **assets/**: Images, etc.

**Example**:
```
src/
  components/
    Button/
      Button.jsx
      Button.css
  pages/
    Home.jsx
  hooks/
    useFetch.js
  context/
    AuthContext.js
```

---

### 72. How would you handle authentication in a React app?

**Answer**: Use Context for auth state, protect routes, and store tokens securely.

**Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (token) => {
    localStorage.setItem('token', token);
    setUser({ token });
  };

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
}
```

---

### 73. How would you implement pagination in a React app?

**Answer**: Fetch paginated data and update UI based on page state.

**Example**:
```jsx
import React, { useState, useEffect } from 'react';

function PaginatedList() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://api.example.com/data?page=${page}`)
      .then((res) => res.json())
      .then(setData);
  }, [page]);

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
    </div>
  );
}
```

---

### 74. How would you handle form validation in React?

**Answer**: Use libraries like `react-hook-form` or manage state manually.

**Example**:
```jsx
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'Email is required' })}
        placeholder="Email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

---

### 75. How would you implement a search functionality in React?

**Answer**: Filter data based on user input.

**Example**:
```jsx
import React, { useState } from 'react';

function Search() {
  const [query, setQuery] = useState('');
  const items = ['Apple', 'Banana', 'Orange'];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <ul>
        {filteredItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

### 76. How would you optimize a slow-rendering React component?

**Answer**: Profile with DevTools, then:
- Memoize with `useMemo`, `useCallback`, `React.memo`.
- Split into smaller components.
- Lazy load data or components.

**Example**:
```jsx
import React, { useMemo } from 'react';

function SlowComponent({ data }) {
  const processedData = useMemo(() => {
    return data.map((item) => ({ ...item, computed: item.value * 2 }));
  }, [data]);

  return (
    <ul>
      {processedData.map((item) => (
        <li key={item.id}>{item.computed}</li>
      ))}
    </ul>
  );
}
```

---

### 77. How would you implement dark mode in a React app?

**Answer**: Use Context and CSS variables for theme switching.

**Example**:
```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}

function App() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  );
}

// index.css
.light {
  --bg: white;
  --text: black;
}

.dark {
  --bg: black;
  --text: white;
}

body {
  background: var(--bg);
  color: var(--text);
}
```

---

### 78. How would you handle internationalization (i18n) in React?

**Answer**: Use libraries like `react-i18next`.

**Example**:
```jsx
import { useTranslation } from 'react-i18next';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('es')}>
        Switch to Spanish
      </button>
    </div>
  );
}

// i18n.js
i18next.init({
  resources: {
    en: { translation: { welcome: 'Welcome' } },
    es: { translation: { welcome: 'Bienvenido' } },
  },
});
```

---

### 79. How would you implement real-time updates in React (e.g., WebSockets)?

**Answer**: Use WebSockets with `socket.io` or native APIs.

**Example**:
```jsx
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('https://example.com');

function Chat() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => socket.off('message');
  }, []);

  return (
    <ul>
      {messages.map((msg, i) => (
        <li key={i}>{msg}</li>
      ))}
    </ul>
  );
}
```

---

### 80. How would you migrate a class component to a functional component with Hooks?

**Answer**: Replace state with `useState`, lifecycle methods with `useEffect`, and remove `this`.

**Example (Class)**:
```jsx
class Counter extends React.Component {
  state = { count: 0 };

  componentDidMount() {
    document.title = `Count: ${this.state.count}`;
  }

  componentDidUpdate() {
    document.title = `Count: ${this.state.count}`;
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Add
        </button>
      </div>
    );
  }
}
```

**Example (Functional)**:
```jsx
import React, { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  );
}
```
*Explanation*: `useState` replaces `state`; `useEffect` handles lifecycle.

---

This covers all 80 questions with practical, real-world examples, optimized for clarity and brevity while addressing React v18 and modern practices as of April 2025. Let me know if you need deeper dives into any topic!