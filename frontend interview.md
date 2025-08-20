# "Senior Frontend Developer Interview Questions"

This document summarises the questions and answers discussed in the provided video transcript. Please note that **all code examples and step-by-step explanations are supplemental information provided by me to illustrate the concepts, and are not present in the original source material.** You may want to independently verify this information.

---

## 1. Tooling: Webpack

### Question: Can you tell me about your experience using Webpack? What is it used for?

**Answer:** Webpack is a **module bundler**. Its primary use is to combine several JavaScript files into a single one. This was historically necessary because browsers required a separate `<script>` tag for each JavaScript file, which is impractical for large applications with hundreds of files. Webpack bundles these files by parsing them based on imports and exports, putting them together into a single bundle. After bundling, various **optimisations** can be applied. The speaker has extensive experience setting up projects from scratch and configuring Webpack.

**Conceptual Code Example (Not from source): Webpack Basic Bundling**

Let's imagine a simple application with multiple JavaScript files that need to be bundled.

**`src/message.js`**
```javascript
// This code is not from the provided sources.
export const getGreeting = (name) => `Hello, ${name}!`;
```

**`src/app.js`**
```javascript
// This code is not from the provided sources.
import { getGreeting } from './message';

document.addEventListener('DOMContentLoaded', () => {
  const appDiv = document.getElementById('app');
  if (appDiv) {
    appDiv.textContent = getGreeting('Webpack User');
  }
});
```

**`webpack.config.js`**
```javascript
// This code is not from the provided sources.
const path = require('path');

module.exports = {
  entry: './src/app.js', // The main entry point of our application
  output: {
    filename: 'bundle.js', // The name of the output bundle
    path: path.resolve(__dirname, 'dist'), // The output directory
  },
  mode: 'development', // Or 'production' for optimized output
};
```

**Step-by-step explanation (Not from source):**

1.  **`src/message.js`** defines a simple utility function.
2.  **`src/app.js`** imports and uses this utility function, then attaches it to the DOM.
3.  **`webpack.config.js`** tells Webpack:
    *   `entry`: Where to start bundling (our main `app.js` file).
    *   `output`: Where to put the resulting bundle (`bundle.js` inside a `dist` folder).
    *   `mode`: Sets development or production specific optimisations.
4.  When you run Webpack (e.g., `npx webpack`), it will read `app.js`, see the import statement, pull in `message.js`, and combine them into `dist/bundle.js`. You would then link this single `bundle.js` in your HTML: `<script src="dist/bundle.js"></script>`.

---

### Question: Are you familiar with the term tree shaking?

**Answer:** Tree shaking, in the context of Webpack, is a process that occurs when the bundle is shipped to production. It **finds and eliminates unused code or parts of modules** that were imported but not actually used. The goal is to make the bundle as small as possible, leading to **better web performance**.

**Conceptual Code Example (Not from source): Webpack Tree Shaking**

Tree shaking works best with ES6 static imports.

**`src/utils.js`**
```javascript
// This code is not from the provided sources.
export const usefulFunction = () => console.log('This is useful.');
export const unusedFunction = () => console.log('This is not used.');
```

**`src/main.js`**
```javascript
// This code is not from the provided sources.
import { usefulFunction } from './utils';

usefulFunction(); // Only 'usefulFunction' is called
```

**`webpack.config.js`** (similar to before, `mode: 'production'`)
```javascript
// This code is not from the provided sources.
const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production', // Crucial for tree shaking
};
```

**Step-by-step explanation (Not from source):**

1.  `src/utils.js` exports two functions.
2.  `src/main.js` only imports and uses `usefulFunction`.
3.  When Webpack bundles this in `production` mode, it performs tree shaking. It analyses the `import` statements and usage. Because `unusedFunction` is imported but never called or referenced, Webpack will typically exclude it from the final `bundle.js`, making the bundle smaller.

### Question: Have you used tree shaking professionally in production? At any stage, can you give me an example of that?

**Answer:** As of Webpack version 5, **tree shaking comes by default**. This means Webpack will attempt to tree shake code every time it's used.

However, there's a critical caveat: tree shaking **only works with ES6 static imports**. If modules are imported using CommonJS `require` syntax or are dynamically imported, Webpack cannot effectively tree shake them. This is because CommonJS `require` statements are dynamic and evaluated at runtime, preventing Webpack from building a complete **dependency tree** at build time to determine what code can be safely removed.

---

### Question: What is a dependency graph and what is it used for in Webpack?

**Answer:** A dependency graph in Webpack is a **tree structure** that Webpack builds starting from your application's **entry point**. It recursively follows all `import` statements, going down through the file dependencies until it reaches the end. This graph serves as the main abstraction in Webpack for storing and understanding all modules.

Webpack uses the dependency graph to:
*   **Bundle individual files into a single bundle**.
*   **Transverse (traverse) the modules** to identify which ones need to be dropped (e.g., via tree shaking) or which ones are needed for production.

**Conceptual Explanation (Not from source): Dependency Graph Visualization**

Imagine your application as nodes (files/modules) and arrows (import statements) pointing from one node to another.

```
// This conceptual diagram is not from the provided sources.
                      (Entry Point: app.js)
                             |
                             | import
                             V
                         (ComponentA.js)
                        /             \
                       / import        \ import
                      V                 V
              (UtilityFunction1.js)   (ComponentB.js)
                                          |
                                          | import
                                          V
                                   (UtilityFunction2.js)
```

**Step-by-step explanation (Not from source):**

1.  Webpack starts at `app.js` (your entry point).
2.  It sees `app.js` imports `ComponentA.js`, so it adds `ComponentA.js` to the graph.
3.  It then looks at `ComponentA.js` and finds imports for `UtilityFunction1.js` and `ComponentB.js`, adding them to the graph.
4.  It continues this process for `ComponentB.js`, finding `UtilityFunction2.js`.
5.  This entire structure is the dependency graph, which Webpack uses to know the order and content of files it needs to bundle.

---

## 2. CSS-in-JS

### Question: Can you explain what CSS-in-JS is and can you give me an example, what are some use cases for CSS-in-JS?

**Answer:** CSS-in-JS emerged from the need to manage CSS styles dynamically within JavaScript applications, especially with increased interactivity. It allows developers to **write CSS directly inside JavaScript files**.

**Use Cases and Advantages:**
*   **Dynamic CSS:** CSS-in-JS enables the immediate change of CSS styles based on changes in a JavaScript state or variable. For instance, clicking a button can directly swap colours or apply styles based on JavaScript variables, which was not easily possible with static CSS files.
*   It leverages the dynamic nature of JavaScript for styling.
*   Webpack will process the CSS written in JS, extract it, build classes, and attach them to the HTML DOM at runtime.

**Conceptual Code Example (Not from source): Basic CSS-in-JS with Styled Components**

**`src/components/Button.js`**
```javascript
// This code is not from the provided sources.
import styled from 'styled-components'; // Or @emotion/styled

const StyledButton = styled.button`
  background-color: ${props => (props.primary ? 'blue' : 'gray')};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &:hover {
    opacity: 0.8;
  }
`;

export const MyButton = ({ primary, children }) => {
  return <StyledButton primary={primary}>{children}</StyledButton>;
};
```

**`src/App.js`**
```javascript
// This code is not from the provided sources.
import React, { useState } from 'react';
import { MyButton } from './components/Button';

function App() {
  const [isPrimary, setIsPrimary] = useState(false);

  const togglePrimary = () => {
    setIsPrimary(!isPrimary);
  };

  return (
    <div>
      <MyButton primary={isPrimary}>
        {isPrimary ? 'Primary Button' : 'Secondary Button'}
      </MyButton>
      <button onClick={togglePrimary}>Toggle Button Style</button>
    </div>
  );
}

export default App;
```

**Step-by-step explanation (Not from source):**

1.  **`StyledButton`**: We define a React component using `styled-components` (a popular CSS-in-JS library). The CSS is written directly as a tagged template literal.
2.  **Dynamic Styles**: The `background-color` is determined by a JavaScript prop (`props.primary`), showcasing how CSS can be dynamic.
3.  **`MyButton`**: A simple wrapper component that renders `StyledButton`.
4.  **`App.js`**: Uses `MyButton` and has a state `isPrimary` that can be toggled. When `isPrimary` changes, the `MyButton`'s `primary` prop changes, and its background colour updates dynamically, all driven by JavaScript.

---

### Question: What are some disadvantages of using CSS-in-JS?

**Answer:**
*   **Caching Issues:** Since styles are embedded within JavaScript files, they cannot be easily extracted and cached separately by the browser. Traditionally, static CSS files could be cached using HTTP headers (`Cache-Control`), preventing users from re-downloading them on subsequent visits. With CSS-in-JS, the styles become part of the larger JavaScript bundle, making the bundle bigger and non-cacheable. While Webpack can extract CSS at runtime and ship it separately, it's not as straightforward as with traditional CSS.
*   **Debugging Difficulty:** Debugging CSS becomes harder because the classes generated by Webpack are often unique hashes, making it difficult to understand why a certain element looks a particular way. Although some tooling exists to aid debugging, it's still less intuitive.
*   **Performance Impact (FCP & CLS):**
    *   **Decreased Performance due to no caching**: Leads to increased load times as CSS is always re-downloaded.
    *   **Cumulative Layout Shift (CLS):** CSS usually gets evaluated and applied first in the critical rendering path, which prevents a "flash" of unstyled content. With CSS-in-JS, the CSS is applied only after the JavaScript bundle is parsed, which can lead to layout shifts as the page loads, causing elements to move around. This can be mitigated by splitting CSS and using plain old CSS for stable grid elements while using CSS-in-JS for dynamic parts.
*   **Deep Component Tree:** When using libraries like styled-components, styling a native React element often involves creating an additional component (e.g., `StyledHeading`). In a large component tree, this can lead to a very deep component hierarchy, which makes **debugging harder** and can make **React re-rendering less efficient**, even though React is generally effective. The general rule is to keep the component tree as small as possible.

---

## 3. React Frameworks

### Question: What is a pure component in React?

**Answer:** A `PureComponent` was a type of class component in React used to **prevent unnecessary re-renders**. It would automatically compare the incoming props with the existing props using a shallow comparison, and if they were identical, it would skip the re-render cycle for that component.

However, with the advent of React Hooks, `PureComponent` is **less relevant today**. Hooks are by default "memorized" (referring to internal optimisations). For example, when using `useState`, React already checks if the new state value is the same as the current value; if it is, it prevents a re-render. This built-in behaviour largely negates the need for `PureComponent` when using functional components with hooks.

**Conceptual Code Example (Not from source): React PureComponent (Class Component)**

```javascript
// This code is not from the provided sources.
import React, { PureComponent } from 'react';

class MyDisplayComponent extends PureComponent {
  render() {
    console.log('MyDisplayComponent rendered');
    return (
      <div>
        <p>Value: {this.props.value}</p>
      </div>
    );
  }
}

class App extends React.Component {
  state = {
    counter: 0,
    message: "Hello"
  };

  componentDidMount() {
    // This will cause MyDisplayComponent to re-render only when 'counter' changes
    // If 'message' changes, MyDisplayComponent will NOT re-render because it's a PureComponent
    // and its 'value' prop (which is 'counter') didn't change.
    setInterval(() => {
      this.setState(prevState => ({
        counter: prevState.counter + 1,
        message: prevState.message // 'message' stays the same, won't trigger re-render of MyDisplayComponent
      }));
    }, 1000);

    // This will trigger a state update for 'message' every 2 seconds
    // MyDisplayComponent, being a PureComponent, will only re-render if 'counter' changes.
    // If it was a regular Component, it would re-render every time 'App' re-rendered.
    setInterval(() => {
      this.setState({
        message: "Hello " + Math.random().toFixed(2) // Updates 'message'
      });
    }, 2000);
  }

  render() {
    return (
      <div>
        <h1>App Counter: {this.state.counter}</h1>
        <p>App Message: {this.state.message}</p>
        <MyDisplayComponent value={this.state.counter} />
      </div>
    );
  }
}

export default App;
```

**Step-by-step explanation (Not from source):**

1.  **`MyDisplayComponent`** extends `PureComponent`. This means its `render` method will only be called if its `props` or `state` *actually change* (based on a shallow comparison).
2.  **`App` Component**:
    *   It has `counter` and `message` in its state.
    *   `MyDisplayComponent` receives `this.state.counter` as a prop.
    *   The first `setInterval` updates `counter` and `message` every second. `MyDisplayComponent` will re-render because its `value` prop (which is `counter`) changes.
    *   The second `setInterval` updates *only* `message` every two seconds. Since `MyDisplayComponent`'s `value` prop (which is `counter`) *does not change* during this update, `MyDisplayComponent` will **not re-render**, even though its parent (`App`) does. If `MyDisplayComponent` were a regular `React.Component`, it would re-render every time `App` re-rendered, potentially unnecessarily.

---

### Question: What is an error boundary component? What is it used for? Why do we have error boundary components in React?

**Answer:** Error Boundary components in React are used to **limit the impact of errors**. They help to:
*   **Localise errors:** If a component encounters an error (e.g., a data fetching error), wrapping it with an error boundary prevents the error from propagating up the component tree and breaking the entire application.
*   **Show a placeholder UI:** Instead of a completely broken user interface, an error boundary allows you to display a fallback UI or a placeholder for just the problematic component.
*   **Improve UI predictability:** By catching and managing errors gracefully, error boundaries contribute to a more predictable and stable user experience, preventing unexpected layout shifts or total UI destruction.

**Conceptual Code Example (Not from source): React Error Boundary**

**`src/components/ErrorBoundary.js`**
```javascript
// This code is not from the provided sources.
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{ border: '1px solid red', padding: '10px', margin: '10px', backgroundColor: '#ffe6e6' }}>
          <h3>Something went wrong in this component.</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

**`src/components/BuggyComponent.js`**
```javascript
// This code is not from the provided sources.
import React from 'react';

function BuggyComponent({ throwError }) {
  if (throwError) {
    throw new Error('I crashed!');
  }
  return <p>This component is working fine.</p>;
}

export default BuggyComponent;
```

**`src/App.js`**
```javascript
// This code is not from the provided sources.
import React, { useState } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import BuggyComponent from './components/BuggyComponent';

function App() {
  const [shouldCrash, setShouldCrash] = useState(false);

  const triggerCrash = () => {
    setShouldCrash(true);
  };

  return (
    <div>
      <h1>My Application</h1>
      <button onClick={triggerCrash}>Trigger Component Crash</button>

      <ErrorBoundary>
        <BuggyComponent throwError={shouldCrash} />
      </ErrorBoundary>

      <p>This part of the application remains functional.</p>
    </div>
  );
}

export default App;
```

**Step-by-step explanation (Not from source):**

1.  **`ErrorBoundary.js`**: This is a class component that implements `getDerivedStateFromError` (to update state when an error occurs) and `componentDidCatch` (to log error information). If `hasError` is true, it renders a fallback UI instead of its children.
2.  **`BuggyComponent.js`**: A simple component that can be made to throw an error based on a prop.
3.  **`App.js`**:
    *   The `BuggyComponent` is wrapped inside an `ErrorBoundary`.
    *   When the "Trigger Component Crash" button is clicked, `shouldCrash` becomes true, causing `BuggyComponent` to throw an error.
    *   Instead of the whole `App` crashing, the `ErrorBoundary` catches the error, displays its fallback UI, and the rest of the application (e.g., "This part of the application remains functional.") continues to work normally.

---

### Question: Are you familiar with the `useEffect` hook? Tell me more about how is it used. What would be some advantages and disadvantages of using `useEffect`?

**Answer:**
The `useEffect` hook is primarily used to **trigger "side effects"** in React functional components. Side effects are operations that interact with the outside world or have an impact beyond rendering the component's UI.

**Common Use Cases (Advantages):**
*   **Data fetching:** Making API calls to retrieve data from a backend.
*   **DOM manipulation:** Directly interacting with the DOM (e.g., adding event listeners, changing document title).
*   **Subscriptions:** Setting up and cleaning up subscriptions (e.g., to a WebSocket or an external store).
*   **Interacting with browser APIs:** For example, writing to `localStorage` or triggering analytics events when a state variable changes.
*   It executes **after the component re-renders**.

**Disadvantages:**
*   **Abuse and excessive re-renders:** The `useEffect` hook was initially widely abused, leading to developers using it for everything, even to change one state variable based on another.
*   If not used carefully, `useEffect` can trigger **too many re-renders**, as it runs after the component renders and can then cause another render. This can have a significant negative impact on application performance, especially since a parent component re-rendering also causes its child components to re-render.

---

### Question: Why can't we use an `async` function as a callback to `useEffect`?

**Answer:** You cannot directly use an `async` function as the callback to `useEffect` because an `async` function by default **returns a Promise**. The `useEffect` hook, however, specifically expects its callback to return either nothing (`undefined`) or a **cleanup function**.

**Purpose of Cleanup Function:**
*   The cleanup function is crucial for preventing resource leaks or unexpected behaviour. For example, if you attach an event handler (like an `onScroll` effect) inside `useEffect`, the cleanup function allows you to remove that handler when the component unmounts or before the effect re-runs. Without it, you would continuously attach new handlers, potentially "bloating the browser".

**Conflict with Async Functions:**
*   When `useEffect` receives a Promise instead of a cleanup function (or nothing), React doesn't know what to do with it, leading to a "linter warning" or error.

**Conceptual Code Example (Not from source): `useEffect` with Cleanup and Async Function Issue**

```javascript
// This code is not from the provided sources.
import React, { useEffect, useState } from 'react';

function MyComponent() {
  const [data, setData] = useState(null);
  const [scrollCount, setScrollCount] = useState(0);

  // --- Example 1: Correct useEffect with cleanup for event listeners ---
  useEffect(() => {
    const handleScroll = () => {
      setScrollCount(prev => prev + 1);
      console.log('Scrolled!');
    };

    window.addEventListener('scroll', handleScroll);

    // This is the cleanup function. It runs when the component unmounts
    // or before the effect re-runs (if dependencies change).
    return () => {
      console.log('Cleaning up scroll listener');
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  // --- Example 2: Incorrect useEffect with direct async function ---
  // This will cause a warning/error because async functions return Promises.
  useEffect(async () => { // Linter might warn: "Effect callbacks are synchronous to prevent race conditions"
    try {
      const response = await fetch('/api/data'); // Imagine this endpoint exists
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
    // Cannot return a Promise here, useEffect expects a cleanup function or nothing.
    // If you return `undefined` from an async function, it's still wrapped in a Promise.
  }, []);

  // --- Example 3: Correct way to use async logic inside useEffect ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/data');
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData(); // Call the async function here

    // No cleanup needed for a simple fetch that doesn't set up ongoing subscriptions.
    // If you had timeouts or subscriptions, you'd return a cleanup function here.
  }, []);

  return (
    <div style={{ height: '200vh', padding: '20px' }}>
      <h1>UseEffect Examples</h1>
      <p>Scrolls: {scrollCount}</p>
      <p>Data: {data ? JSON.stringify(data) : 'Loading...'}</p>
      {/* Scroll down to see scroll count increase */}
    </div>
  );
}

export default MyComponent;
```

**Step-by-step explanation (Not from source):**

1.  **Example 1 (Cleanup):**
    *   An `useEffect` hook adds a `scroll` event listener to the `window`.
    *   The `return` statement provides a **cleanup function** that removes the event listener. This is vital to prevent memory leaks if the component unmounts or the effect re-runs.
2.  **Example 2 (Incorrect Async):**
    *   This shows an `async` function directly as the `useEffect` callback.
    *   React will complain because `async` functions implicitly return a Promise, and `useEffect` expects a function or nothing, not a Promise.
3.  **Example 3 (Correct Async):**
    *   The `useEffect` callback is a **synchronous function**.
    *   Inside this synchronous callback, an **async IIFE (Immediately Invoked Function Expression) or a named `async` function is defined and then called immediately.** This allows you to use `await` syntax within the effect while still satisfying `useEffect`'s requirement for a synchronous return value (or a cleanup function).

---

### Question: When we have to deal with such requirements on the client side (fetching data, user authentication, general user settings affecting the whole app), what would be the best solution to handle State Management in this application and why?

**Answer:** For an application with backend data, authentication state, and global settings, the recommended state management approach is to **distribute state based on its requirements and scope**:

1.  **Backend Data:**
    *   Typically, data fetched from the backend can reside in **component state**.
    *   If the data is needed by only two or three components, you might **"lift it up"** to a common ancestor component. This might involve some "prop drilling" (passing props down through multiple layers), but it should be manageable.

2.  **Authentication State:**
    *   Authentication state (e.g., user roles, permissions) usually needs to be **globally available** to any component in the application.
    *   For this, **React Context** is highly suitable. It effectively "broadcasts" the state throughout the entire component tree, making it accessible wherever needed.

3.  **Global Settings with Non-Trivial State Transitions:**
    *   If global settings involve **complex transitions** (e.g., a user being premium/non-premium affecting multiple settings across the app), a **state machine** or a **reducer pattern** might be necessary.
    *   Tools like **Redux** or smaller, two-hand libraries can be used.
    *   Alternatively, the **`useReducer` hook combined with React Context** can also be an effective solution for managing such complex state.

**Conceptual Code Example (Not from source): Distributed State Management**

**`src/contexts/AuthContext.js` (Authentication State)**
```javascript
// This code is not from the provided sources.
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id: '123', name: 'John Doe', role: 'admin' } or null

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
```

**`src/contexts/SettingsReducer.js` (Complex Global Settings)**
```javascript
// This code is not from the provided sources.
import React, { createContext, useReducer, useContext } from 'react';

const SettingsContext = createContext(null);

const initialSettingsState = {
  theme: 'light',
  notificationsEnabled: true,
  premiumFeatures: false,
};

const settingsReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'TOGGLE_NOTIFICATIONS':
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    case 'SET_PREMIUM_STATUS':
      return { ...state, premiumFeatures: action.payload };
    // Potentially more complex logic here affecting multiple settings based on premium status
    case 'APPLY_PREMIUM_DEFAULTS':
      return {
        ...state,
        premiumFeatures: true,
        notificationsEnabled: true,
        // other premium-specific settings
      };
    default:
      return state;
  }
};

export const SettingsProvider = ({ children }) => {
  const [settings, dispatch] = useReducer(settingsReducer, initialSettingsState);

  return (
    <SettingsContext.Provider value={{ settings, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
```

**`src/App.js` (Combining Providers and Component State)**
```javascript
// This code is not from the provided sources.
import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { SettingsProvider, useSettings } from './contexts/SettingsReducer';

// Component using Auth Context
const AuthStatus = () => {
  const { user, login, logout } = useAuth();
  return (
    <div>
      {user ? (
        <p>Logged in as: {user.name} ({user.role}) <button onClick={logout}>Logout</button></p>
      ) : (
        <p>Not logged in <button onClick={() => login({ id: '1', name: 'Guest', role: 'viewer' })}>Login as Guest</button></p>
      )}
    </div>
  );
};

// Component using Settings Context
const AppSettings = () => {
  const { settings, dispatch } = useSettings();
  const { user } = useAuth(); // Can also combine contexts

  useEffect(() => {
    // Example of complex transition: If user becomes admin, enable premium features
    if (user && user.role === 'admin' && !settings.premiumFeatures) {
      dispatch({ type: 'SET_PREMIUM_STATUS', payload: true });
    }
  }, [user, settings.premiumFeatures, dispatch]); // Added dispatch to dependency array

  return (
    <div>
      <h3>Application Settings</h3>
      <p>Theme: {settings.theme} <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })}>Toggle</button></p>
      <p>Notifications: {settings.notificationsEnabled ? 'Enabled' : 'Disabled'} <button onClick={() => dispatch({ type: 'TOGGLE_NOTIFICATIONS' })}>Toggle</button></p>
      <p>Premium Features: {settings.premiumFeatures ? 'Active' : 'Inactive'}</p>
    </div>
  );
};

// Component with local data state
const DataDisplay = () => {
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    // Simulate fetching data for this component only
    const fetchData = async () => {
      // This is a placeholder for an actual API call
      return new Promise(resolve => setTimeout(() => resolve({ message: "Local data loaded!" }), 500));
    };

    fetchData().then(data => setLocalData(data));
  }, []);

  return (
    <div>
      <h3>Component-Specific Data</h3>
      <p>{localData ? localData.message : 'Loading local data...'}</p>
    </div>
  );
};


function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>
          <h2>State Management Demo</h2>
          <AuthStatus />
          <hr />
          <AppSettings />
          <hr />
          <DataDisplay />
        </div>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default App;
```

**Step-by-step explanation (Not from source):**

1.  **`AuthContext.js`**:
    *   Creates an `AuthContext` using `createContext`.
    *   `AuthProvider` uses `useState` for authentication data (`user`).
    *   `useAuth` is a custom hook to consume the context, providing `user`, `login`, and `logout` functions globally. This is suitable for `authentication` state as it needs to be available everywhere.
2.  **`SettingsReducer.js`**:
    *   Creates a `SettingsContext` and defines an `initialSettingsState` and a `settingsReducer`.
    *   `SettingsProvider` uses `useReducer` to manage the complex global settings state.
    *   `useSettings` is a custom hook to consume this context, providing `settings` and `dispatch` for complex state transitions. This is ideal for global settings with intricate logic.
3.  **`App.js`**:
    *   The `AuthProvider` and `SettingsProvider` components wrap the entire application, making their respective states available to all child components.
    *   **`AuthStatus`** component uses `useAuth` to display login status and provides login/logout buttons.
    *   **`AppSettings`** component uses `useSettings` to display and modify global settings. It also demonstrates how one context (Auth) can influence another (Settings) via `useEffect` for complex interdependent logic.
    *   **`DataDisplay`** component uses its own local `useState` and `useEffect` to fetch and display data that is only relevant to itself, adhering to the principle of keeping state as close as possible to where it's used for backend data unless truly needed elsewhere.

---

### Question: Could you explain the difference between essential and derived State?

**Answer:**
*   **Essential State:** This refers to state that **changes by itself, independently**, and cannot be calculated or derived from any other existing state. It is the fundamental piece of information.
*   **Derived State:** This is state that **can be calculated or computed based on the essential state**. It doesn't need to be stored explicitly in a state hook because it can always be re-computed when the essential state changes.

**Example:**
*   In a shopping cart component, the individual **items added to the cart** (e.g., product name, quantity, unit price) represent the **essential state**.
*   The **total cost** of the cart and the **VAT (Value Added Tax) amount** are **derived state**. These values can be calculated directly from the essential state (the individual items and their prices).

**Principle:** You should generally **keep as little state as possible**, primarily focusing on storing only the essential state in your React state hooks.

**Conceptual Code Example (Not from source): Essential vs. Derived State**

```javascript
// This code is not from the provided sources.
import React, { useState, useMemo } from 'react';

function ShoppingCart() {
  // Essential State: The items in the cart
  const [items, setItems] = useState([
    { id: 1, name: 'Laptop', price: 1200, quantity: 1 },
    { id: 2, name: 'Mouse', price: 25, quantity: 2 },
  ]);

  const VAT_RATE = 0.20; // 20% VAT (example)

  // Derived State: Calculated from essential state
  // Using useMemo to memoize the calculation for performance if items don't change
  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const vatAmount = useMemo(() => {
    return subtotal * VAT_RATE;
  }, [subtotal]);

  const total = useMemo(() => {
    return subtotal + vatAmount;
  }, [subtotal, vatAmount]);

  const addItem = () => {
    const newItem = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      price: Math.floor(Math.random() * 100) + 10,
      quantity: 1
    };
    setItems([...items, newItem]);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <h3>Items (Essential State):</h3>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - £{item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <button onClick={addItem}>Add Random Item</button>

      <h3>Summary (Derived State):</h3>
      <p>Subtotal: £{subtotal.toFixed(2)}</p>
      <p>VAT ({VAT_RATE * 100}%): £{vatAmount.toFixed(2)}</p>
      <p><strong>Total: £{total.toFixed(2)}</strong></p>
    </div>
  );
}

export default ShoppingCart;
```

**Step-by-step explanation (Not from source):**

1.  **`items` (Essential State):** This `useState` hook holds the array of product objects, which is the foundational data. It changes independently when items are added or removed.
2.  **`subtotal`, `vatAmount`, `total` (Derived State):** These are not stored in `useState`. Instead, they are calculated directly from the `items` array.
    *   `useMemo` is used to efficiently calculate these derived values. It ensures that the calculations only re-run if their dependencies (`items` or `subtotal`) change, preventing unnecessary re-calculations on every render.
3.  When a new item is added (`addItem` function), only the `items` essential state is updated. The derived states (`subtotal`, `vatAmount`, `total`) automatically re-compute based on the new `items` array.

---

### Question: What would be the disadvantages of placing State inside React Context?

**Answer:** The main disadvantage of placing state high up in React Context is that **any time that state changes, every component connected to that context will re-render**.

This can lead to:
*   **Unnecessary re-renders:** If a piece of state in context changes frequently but is only consumed by a small subset of components, all other components subscribed to that context will re-render unnecessarily, impacting performance.
*   **Performance degradation:** Overall, it can cause more re-renders across the application than necessary.

**Mitigation:**
*   If state changes independently and is consumed by different sets of components, it's beneficial to **split it into different React Contexts with different providers**. This way, components subscribe only to the specific parts of the state they need, leading to fewer overall re-renders.

**General Rule:** Always try to **keep state as close as possible to where it's being used**.

---

## 4. Testing React Applications

### Question: How would you go about testing a React application (mid-sized, no tests yet)?

**Answer:** When approaching a mid-sized React application with no existing tests, the recommended strategy involves a balanced approach using a **testing pyramid** of different test types:

1.  **End-to-End (E2E) Tests:**
    *   These are considered **one of the best tests to have in frontend development**.
    *   They **test features from the user's perspective**, making it very clear what functionality is being covered.
    *   A significant advantage is that they **allow refactoring the underlying code without having to change the tests**, as long as the external behaviour remains the same.
    *   These should cover the application's features.

2.  **Unit Tests:**
    *   Focus on **reusable components that contain logic**, such as input fields, buttons, or dropdowns.
    *   The speaker is **not a fan of unit testing everything** (e.g., pure components that just render an image), as it may not provide significant value and might just be done to hit code coverage targets.
    *   They are crucial for localizing bugs when E2E tests fail.

3.  **Integration Tests:**
    *   These should be chosen **strategically** for critical features or interactions between multiple units.

**Striking the Balance (Testing Pyramid):**
*   It's a "very, very good question" to balance these.
*   While E2E tests confirm feature functionality, if you *only* have E2E tests, it becomes **extremely hard to debug and pinpoint the exact location of a bug** when an E2E test fails.
*   **The more unit and integration tests you have, the easier it is to localize the bug boundary** during root cause analysis, saving hours of debugging.
*   There's no exact number, but the aim is to have a lot of unit tests, a lot of E2E tests to cover features, and strategic integration tests for critical features (like login or payments) based on product criticality.

**Conceptual Testing Approach (Not from source):**

**1. Unit Testing a Reusable Component (`src/components/Button.js` - example from CSS-in-JS above)**
Let's test the `MyButton` component with `@testing-library/react`.

**`src/__tests__/Button.test.js`**
```javascript
// This code is not from the provided sources.
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // For extended matchers

import { MyButton } from '../components/Button';

describe('MyButton', () => {
  test('renders with default (secondary) style', () => {
    render(<MyButton>Click Me</MyButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    // In a real test, you might check for specific styles if using a CSS-in-JS library
    // For styled-components, you could inspect computed styles or test for className
    // expect(button).toHaveStyle('background-color: gray'); // This requires a more complex setup or a different library
  });

  test('renders with primary style when primary prop is true', () => {
    render(<MyButton primary>Primary Button</MyButton>);
    const button = screen.getByRole('button', { name: /primary button/i });
    // expect(button).toHaveStyle('background-color: blue');
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn(); // Mock function
    render(<MyButton onClick={handleClick}>Clickable</MyButton>);
    const button = screen.getByRole('button', { name: /clickable/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

**Step-by-step explanation (Not from source):**

1.  **Setup**: Imports `render`, `screen`, `fireEvent` from `@testing-library/react` and the component to be tested.
2.  **`describe` block**: Groups related tests for `MyButton`.
3.  **`test` cases**:
    *   First test checks if the button renders correctly with its text.
    *   Second test checks rendering based on props (e.g., `primary`).
    *   Third test uses `jest.fn()` to create a mock function and `fireEvent.click` to simulate a click, then asserts that the mock function was called. This verifies the button's interactive logic.

**2. End-to-End Testing (Conceptual with Cypress)**
E2E tests simulate user journeys.

**`cypress/integration/auth.spec.js`**
```javascript
// This code is not from the provided sources.
// This is a conceptual example for Cypress, not actual executable code without Cypress setup.
describe('Authentication Flow', () => {
  it('allows a user to log in and view their dashboard', () => {
    cy.visit('/login'); // Visit the login page
    cy.get('input[name="username"]').type('testuser'); // Type username
    cy.get('input[name="password"]').type('password123'); // Type password
    cy.get('button[type="submit"]').click(); // Click login button
    cy.url().should('include', '/dashboard'); // Assert URL changes to dashboard
    cy.contains('Welcome, testuser!').should('be.visible'); // Assert dashboard content is visible
  });

  it('shows an error for invalid credentials', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.contains('Invalid credentials').should('be.visible'); // Assert error message
  });
});
```

**Step-by-step explanation (Not from source):**

1.  **Visit page**: `cy.visit('/login')` navigates the browser to the login page.
2.  **Interact with elements**: `cy.get().type()` and `cy.get().click()` simulate user input and clicks.
3.  **Assertions**: `cy.url().should()` and `cy.contains().should()` verify that the application behaves as expected (e.g., navigates to the dashboard, displays correct messages).

---

### Question: What is code coverage? What would be the appropriate amount of code coverage in your opinion in a frontend application?

**Answer:**
*   **Code Coverage:** It represents the **amount of code that actually executes when tests are run**. While often described as "the amount of code we cover with tests," it more accurately refers to the code that is *exercised* by the tests.
*   **Appropriate Code Coverage for Frontend:**
    *   It's generally **more tricky** to achieve high code coverage in the frontend than in the backend.
    *   The speaker suggests aiming for **around 60-70%** whenever possible.
    *   Going **under 60%** can make tests quite unpredictable and unusable because a significant portion of the codebase remains untested, making it hard to trust the tests or diagnose failures.
    *   Going **over 80-90%** is often considered **overkill** and may not provide much additional value for the effort invested in writing marginal tests.

---

### Question: In your last team or company, what was the code coverage you were aiming for and how did it go for you?

**Answer:**
*   In some past roles, particularly in the **finance industry**, there was a company rule to aim for around **95% code coverage**.
*   This high target often led to writing **many tests that made "literally no sense"**. It required excluding certain files (like type declarations) and created a situation where, despite claims of Test-Driven Development (TDD), people largely wrote tests *before pushing their Pull Requests* rather than truly driving development with tests. The speaker advises being "really careful with these measures".
*   The speaker has also worked in teams that "didn't wrote any test at all," which led to a "disaster".
*   The **perfect balance** for frontend code coverage, based on experience, is **60-70%**. For backend applications, a slightly higher target of **80-90% (or even 95%) is more doable** because backend code is often more functional and easier to unit test or modularize compared to frontend code.

---

## 5. Web Performance

### Question: Can you explain FCP? What are the causes of a bad FCP score?

**Answer:**
*   **FCP (First Contentful Paint):** This metric measures the **time it takes from when a user hits the enter button in their browser until the first piece of content is displayed** on the screen. It indicates when the user first sees *anything* appear on the page.

**Causes of a Bad FCP Score:**
*   **Large Client-Side Rendered JavaScript Bundle:** If an application relies heavily on client-side rendering (e.g., a large React bundle), it takes a long time for the browser to parse and interpret all the JavaScript before anything can be displayed.
*   **Lack of CDN, Compression, or Caching:** If assets (like JavaScript, CSS, images) are not served from a Content Delivery Network (CDN), are not compressed, or are not properly cached, it takes much longer to download them, delaying the first paint.
*   **Too much CSS in the HTML header:** Browsers must interpret and apply all CSS in the header before they can start incrementally rendering the HTML and moving on to JavaScript. A large amount of blocking CSS can significantly prolong the FCP.

---

### Question: Let's suppose you take charge of a front-end application, run Lighthouse for example, and realize it has a very low FCP score. How would you go about fixing it?

**Answer:** If an application has a low FCP score (indicating slow initial rendering), the approach to fixing it would involve a series of steps:

1.  **Verify the Score:** First, run a couple of analyses (e.g., with Lighthouse) to ensure the FCP score is consistently low and legitimate.

2.  **CDN, Caching, and Compression:**
    *   The **easiest and often most beneficial** first step is to implement a **Content Delivery Network (CDN)** if one isn't already in place.
    *   Ensure that **caching and compression** (e.g., Gzip or Brotli) are enabled for assets. This significantly reduces download times.

3.  **Bundle Inspection and Optimisation:**
    *   **Inspect the JavaScript bundle** to identify any unused parts or libraries that are adding excessive size. Remove unnecessary code if possible.

4.  **Code Splitting:**
    *   If the bundle is still too large, **code splitting** is a critical next step. This involves breaking the main JavaScript bundle into smaller "chunks" that are loaded only when needed for a specific page or component.
    *   It's important to **focus on critical pages** (e.g., high-traffic landing pages) in consultation with product managers, as not all pages may require equally fast loading.
    *   Techniques include using **Webpack's built-in code splitting features** and **React.lazy** for component-level splitting.
    *   Additionally, some JavaScript can be **deferred or asynchronously loaded**.

---

### Question: Have you considered, and when do you consider, something like server-side rendering? Let's suppose this is a React client-side rendered application, and you've gone with all the optimizations and still, because of the size of the application, the FCP is way too slow. Would you consider server-side rendering? Would that improve the situation or not?

**Answer:** Yes, **Server-Side Rendering (SSR)** can definitely improve the FCP situation when done well.

**How SSR Improves FCP:**
*   SSR addresses the FCP issue by **shipping already rendered HTML to the client immediately**. This means the user sees something on the screen almost instantly, as the browser doesn't have to wait for a large JavaScript bundle to be downloaded, parsed, and executed before rendering the initial content.

**Considerations and When to Use SSR:**
*   **Increased Complexity:** SSR adds **significant complexity** to the codebase. There are cases where teams have rushed into SSR and then had to roll it back due to unforeseen issues.
*   **Product Sensitivity:** SSR is most beneficial when the product is **highly sensitive to loading speed** or **SEO (Search Engine Optimization)**.
    *   **E-commerce sites** or **media/newspaper websites** are prime candidates for SSR because fast loading and strong SEO are crucial for their business models.
*   **When Not to Use SSR:**
    *   For applications where loading speed or SEO are not primary concerns, such as a **SaaS (Software as a Service) application** (e.g., accounting software), there is typically **little value in server-side rendering**. In such cases, sticking with client-side rendering (CSR) is often preferable due to its simpler architecture.

Therefore, while SSR can dramatically improve FCP, the decision to implement it should be carefully weighed against the added complexity and the specific needs and goals of the product.