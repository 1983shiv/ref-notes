## Commonly asked React.js Low-Level Design (LLD) interview questions:

[𝟭. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗮 𝘁𝗼𝗮𝘀𝘁 𝗻𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝘀𝘆𝘀𝘁𝗲𝗺 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁? ](#𝘁𝗼𝗮𝘀𝘁-𝗻𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻-𝘀𝘆𝘀𝘁𝗲𝗺-𝗶𝗻-r𝗲𝗮𝗰𝘁)
 - Describe how to handle global notification state and display logic.
 - How would you queue multiple notifications, set timeouts, and avoid overlapping?
 - Would you use Context, Redux, or a custom event system?

𝟮. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗯𝘂𝗶𝗹𝗱 𝗮 𝗰𝗼𝗺𝗺𝗲𝗻𝘁 𝘁𝗵𝗿𝗲𝗮𝗱 𝗳𝗲𝗮𝘁𝘂𝗿𝗲 𝘄𝗶𝘁𝗵 𝗻𝗲𝘀𝘁𝗲𝗱 𝗿𝗲𝗽𝗹𝗶𝗲𝘀?
 - How would you structure and render recursive components for nested replies?
 - What approach would you take to optimize rendering and manage unique keys for updates?

𝟯. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗱𝗲𝘀𝗶𝗴𝗻 𝗮 𝗿𝗲𝘀𝗽𝗼𝗻𝘀𝗶𝘃𝗲 𝘀𝗶𝗱𝗲𝗯𝗮𝗿 𝗻𝗮𝘃𝗶𝗴𝗮𝘁𝗶𝗼𝗻 𝗰𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁?
 - Explain your strategy for mobile vs desktop responsiveness and conditional rendering.
 - How would you handle submenu toggling, animations, and route linking?

𝟰. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗮 𝘁𝗮𝗯 𝗰𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁 𝘄𝗶𝘁𝗵 𝗮𝗻𝗶𝗺𝗮𝘁𝗲𝗱 𝘀𝘄𝗶𝘁𝗰𝗵𝗶𝗻𝗴?
 - How would you structure tab data and state for dynamic tab rendering?
 - Would you use CSSTransition, Framer Motion, or CSS keyframes for animation?

𝟱. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗯𝘂𝗶𝗹𝗱 𝗮 𝗳𝗶𝗹𝘁𝗲𝗿𝗮𝗯𝗹𝗲 𝗮𝗻𝗱 𝘀𝗼𝗿𝘁𝗮𝗯𝗹𝗲 𝗱𝗮𝘁𝗮 𝘁𝗮𝗯𝗹𝗲?
 - How would you handle large data sets efficiently in a table with client- or server-side filtering?
 - Discuss how to modularize the table headers, pagination, and rows.

𝟲. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗱𝗲𝘀𝗶𝗴𝗻 𝗮 𝗳𝗮𝘃𝗼𝗿𝗶𝘁𝗲 / 𝗹𝗶𝗸𝗲 𝗯𝘂𝘁𝘁𝗼𝗻 𝘄𝗶𝘁𝗵 𝗼𝗽𝘁𝗶𝗺𝗶𝘀𝘁𝗶𝗰 𝘂𝗽𝗱𝗮𝘁𝗲𝘀?
 - How would you update the UI immediately before the server responds?
 - How would you roll back the UI if the API call fails?

𝟳. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝗮 𝗹𝗶𝘃𝗲 𝗰𝗵𝗮𝘁 𝗳𝗲𝗮𝘁𝘂𝗿𝗲 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁?
 - Describe your approach using WebSockets or polling.
 - How would you manage message state, loading indicators, and typing status?

𝟴. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗯𝘂𝗶𝗹𝗱 𝗮 𝗿𝗮𝘁𝗲 𝗹𝗶𝗺𝗶𝘁𝗲𝗿 𝗼𝗿 𝘁𝗵𝗿𝗼𝘁𝘁𝗹𝗶𝗻𝗴 𝗹𝗼𝗴𝗶𝗰 𝗳𝗼𝗿 𝗮 𝗯𝘂𝘁𝘁𝗼𝗻 𝗰𝗹𝗶𝗰𝗸?
 - How would you prevent multiple API hits on rapid user interaction?
 - Would you use lodash throttle, debounce, or custom logic?

𝟵. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗯𝘂𝗶𝗹𝗱 𝗮 𝗰𝗼𝗹𝗹𝗮𝗽𝘀𝗶𝗯𝗹𝗲 𝗔𝗖𝗖𝗢𝗥𝗗𝗜𝗢𝗡 𝗰𝗼𝗺𝗽𝗼𝗻𝗲𝗻𝘁?
 - Explain how you would manage active sections and transition effects.
 - Would you allow multiple open sections or single-active behavior?

𝟭𝟬. 𝗛𝗼𝘄 𝘄𝗼𝘂𝗹𝗱 𝘆𝗼𝘂 𝗶𝗺𝗽𝗹𝗲𝗺𝗲𝗻𝘁 𝘁𝗵𝗲𝗺𝗶𝗻𝗴 (𝗱𝗮𝗿𝗸 / 𝗹𝗶𝗴𝗵𝘁 𝗺𝗼𝗱𝗲) 𝗶𝗻 𝗮 𝗥𝗲𝗮𝗰𝘁 𝗮𝗽𝗽?
 - Describe how you'd store and apply the theme preference globally.
 - Would you use CSS variables, Context API, or a theming library?

[11. Generate Unique id with timestamp](#generate-unique-id-with-timestamp)



## T𝗼𝗮𝘀𝘁 𝗻𝗼𝘁𝗶𝗳𝗶𝗰𝗮𝘁𝗶𝗼𝗻 𝘀𝘆𝘀𝘁𝗲𝗺 𝗶𝗻 𝗥𝗲𝗮𝗰𝘁

Toast notifications are a fantastic small UI feature to build because they teach state, timing, and UX patterns. I'll walk you through a clear, beginner-friendly implementation in React (no external libs), explain the design choices, and show code you can copy/paste and run.

I'll cover:

* global notification state & display logic
* queueing multiple notifications, timeouts, and avoiding overlap
* when to use Context vs Redux vs a custom event system

---

# 1) The idea (in plain words)

A toast system needs:

* a single global place to **enqueue** new notifications,
* a component that **renders** currently visible notifications (positioned & stacked),
* automatic **timeouts** that hide toasts after X ms,
* a **queue** so you don't overwhelm the screen (e.g. show max 3 at once, hold others until slots free),
* optional actions like manual dismiss, pause-on-hover, and accessibility (ARIA live).

We'll implement this using React **Context + reducer** (good pattern for localized global state — easy, lightweight). If your app already uses Redux, you can implement the same reducer logic there.

---

# 2) Copy-paste example (single-file provider + demo usage)

Below is a complete example. Put it in a React project (e.g. `create-react-app`) as separate files or combine — I split it into logical pieces inside one snippet for clarity.

```jsx
// ToastProvider.js
import React, { createContext, useContext, useReducer, useCallback } from "react";

/* --- Types / constants --- */
const DEFAULT_MAX_VISIBLE = 3;
const ToastContext = createContext(null);

/* --- Reducer --- */
function reducer(state, action) {
  switch (action.type) {
    case "ENQUEUE": {
      const maxVisible = action.maxVisible ?? DEFAULT_MAX_VISIBLE;
      const visibleCount = state.toasts.filter((t) => t.status === "visible").length;
      const status = visibleCount < maxVisible ? "visible" : "queued";
      return { toasts: [...state.toasts, { ...action.toast, status }] };
    }

    case "REMOVE": {
      // find the removed toast (if any)
      const removedToast = state.toasts.find((t) => t.id === action.id);
      // remove it from the list
      const nextToasts = state.toasts.filter((t) => t.id !== action.id);
      // if removed toast was visible, promote first queued one (if exists)
      if (!removedToast) return { toasts: nextToasts };
      if (removedToast.status !== "visible") return { toasts: nextToasts };

      const queuedIndex = state.toasts.findIndex((t) => t.status === "queued");
      if (queuedIndex === -1) return { toasts: nextToasts };

      const toastToPromote = state.toasts[queuedIndex];
      // promote it (update its status to visible)
      return {
        toasts: nextToasts.map((t) =>
          t.id === toastToPromote.id ? { ...t, status: "visible" } : t
        ),
      };
    }

    case "CLEAR_ALL":
      return { toasts: [] };

    default:
      return state;
  }
}

/* --- Provider & hook --- */
export function ToastProvider({ children, maxVisible = DEFAULT_MAX_VISIBLE }) {
  const [state, dispatch] = useReducer(reducer, { toasts: [] });

  const enqueue = useCallback(
    ({ message, type = "info", duration = 4000 }) => {
      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
      dispatch({
        type: "ENQUEUE",
        toast: { id, message, type, duration },
        maxVisible,
      });
      return id;
    },
    [dispatch, maxVisible]
  );

  const remove = useCallback((id) => dispatch({ type: "REMOVE", id }), [dispatch]);
  const clearAll = useCallback(() => dispatch({ type: "CLEAR_ALL" }), [dispatch]);

  return (
    <ToastContext.Provider value={{ enqueue, remove, clearAll, toasts: state.toasts }}>
      {children}
      <ToastContainer toasts={state.toasts} remove={remove} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}

/* --- ToastContainer & Toast (render & timeout logic) --- */
function ToastContainer({ toasts, remove }) {
  const visible = toasts.filter((t) => t.status === "visible");
  return (
    <div className="toast-root" aria-live="polite" aria-atomic="true">
      {visible.map((t) => (
        <Toast key={t.id} toast={t} onRemove={() => remove(t.id)} />
      ))}
      {/* Simple styles injected for demo */}
      <style>{`
        .toast-root {
          position: fixed;
          top: 16px;
          right: 16px;
          width: 320px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 9999;
          pointer-events: none; /* allow clicks to pass where there is no toast */
        }
        .toast {
          pointer-events: auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
          padding: 10px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          animation: slideIn .22s ease forwards;
          border-left: 4px solid transparent;
        }
        .toast-info { border-left-color: #3b82f6; }
        .toast-success { border-left-color: #10b981; }
        .toast-error { border-left-color: #ef4444; }
        .toast-warning { border-left-color: #f59e0b; }
        .toast .text { margin-right: 8px; flex: 1; }
        .toast button.close {
          border: none;
          background: transparent;
          font-size: 18px;
          line-height: 1;
          cursor: pointer;
        }
        @keyframes slideIn {
          from { transform: translateX(20px); opacity: 0 }
          to   { transform: translateX(0); opacity: 1 }
        }
      `}</style>
    </div>
  );
}

function Toast({ toast, onRemove }) {
  React.useEffect(() => {
    if (!toast.duration || toast.duration <= 0) return;
    const t = setTimeout(() => onRemove(), toast.duration);
    return () => clearTimeout(t);
  }, [toast.id, toast.duration, onRemove]);

  return (
    <div className={`toast toast-${toast.type || "info"}`} role="status">
      <div className="text">{toast.message}</div>
      <button className="close" aria-label="Dismiss" onClick={onRemove}>
        ×
      </button>
    </div>
  );
}
```

Usage example in `App.js`:

```jsx
// App.js
import React from "react";
import { ToastProvider, useToast } from "./ToastProvider";

function DemoButtons() {
  const { enqueue } = useToast();
  return (
    <div style={{ padding: 24 }}>
      <button onClick={() => enqueue({ message: "Saved successfully!", type: "success" })}>
        Show success
      </button>
      <button
        onClick={() =>
          enqueue({ message: "Something went wrong — please retry.", type: "error", duration: 6000 })
        }
        style={{ marginLeft: 8 }}
      >
        Show error (6s)
      </button>
      <button
        onClick={() => {
          // simulate many toasts to show queueing
          for (let i = 1; i <= 7; i++) {
            enqueue({ message: `Queued notification ${i}`, type: "info", duration: 3000 + i * 200 });
          }
        }}
        style={{ marginLeft: 8 }}
      >
        Enqueue 7 toasts
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider maxVisible={3}>
      <DemoButtons />
    </ToastProvider>
  );
}
```

---

# 3) Walkthrough: how it works (step-by-step)

1. **Global state**: `ToastProvider` uses a `useReducer` to keep an array of toasts `[{ id, message, type, duration, status }]`. We expose `enqueue` and `remove` via context so any component can call `enqueue({ message, type, duration })`.

2. **Enqueue logic**: When enqueueing, the reducer checks how many `status === 'visible'` toasts are currently shown. If fewer than `maxVisible`, the new toast is given `status: 'visible'` and will render immediately; otherwise it’s given `status: 'queued'`.

3. **Rendering**: `ToastContainer` maps only `visible` toasts and renders a `Toast` component for each. CSS stacks them (column gap) and places the container `position: fixed; top: right`.

4. **Timeouts**: Each `Toast` uses `useEffect` to `setTimeout(remove, duration)`. When it times out, it dispatches `REMOVE`. If the removed toast was `visible`, the reducer promotes the first queued toast to `visible`.

5. **Avoiding overlap**: We avoid visual overlapping by stacking toasts in a column (CSS `gap`), and avoid logical overload by allowing at most `maxVisible` toasts simultaneously; extras are queued.

6. **Manual dismiss**: Each toast has a close button that calls `remove(id)` immediately.

7. **Promotion after removal**: When a visible toast is removed, the reducer finds the earliest `queued` toast and sets its `status` to `visible` so it will be rendered and get its own timeout.

---

# 4) Extra improvements / production ideas (short list)

* **Pause on hover**: pause timeout while hovered (requires tracking remaining time — doable inside each `Toast` with `Date.now()` and `clearTimeout` / restart with new delay).
* **Enter/exit animations**: use `react-transition-group` or `framer-motion` to animate both enter and exit. Right now removal unmounts instantly.
* **Prevent duplicates**: add an option to check for duplicate messages and either skip or replace existing.
* **Persistent toasts**: keep some toasts until user action (duration = 0).
* **Accessibility**: use `role="status"` and `aria-live="polite"` (we added `aria-live` on the container). Consider announcing with more control for screen readers.
* **Server / global events**: if you want to trigger toasts from non-React code or from outside the component tree, you could expose a small event emitter that calls `enqueue`. Or wrap the emitter in a simple module that forwards to the provider when mounted.
* **Styling**: themeable types, icons, and responsive sizes.

---

# 5) Which approach to choose? (Context vs Redux vs custom event system)

* **Context + reducer** (recommended for most apps):

  * Lightweight and local to UI logic.
  * Easy to add (`ToastProvider`) and access via `useToast`.
  * No other dependencies.

* **Redux**:

  * Use Redux if your app already uses it and you want toast state in global store (e.g., to persist toasts, track analytics, or trigger from deeply nested non-React parts that already dispatch Redux actions).
  * Otherwise this is overkill solely for toasts.

* **Custom event bus / emitter**:

  * Useful if you need to fire toasts from places where React context is inconvenient (e.g., from a plain JS library or service). Typical pattern: small emitter module (`events` or tiny pub/sub) with `on('toast', handler)` and `emit('toast', payload)`. The provider subscribes to that emitter and enqueues messages.
  * Slightly more complex and less “React-y”, but decouples producers from React.

Short answer: **Context + reducer** is the simplest and best for most cases. Use Redux only when your app already depends on it. Use an event emitter when non-React producers must fire toasts.

---

# 6) Quick checklist for a production-ready toast system

* [x] Stack toasts with CSS (no overlap)
* [x] Limit visible toasts (queue extras)
* [x] Auto-dismiss with timeout + manual close
* [x] Accessible (`aria-live`) announcements
* [x] Animations for enter/exit (optional)
* [x] Pause on hover (nice-to-have)
* [x] Prevent duplicates / grouping (optional)
* [x] Test: click a bunch of buttons, simulate slow UI, check screen-reader behavior

---

Further Enhancement:
* add pause-on-hover code,
* show a small TypeScript version with types,
* add exit animations using `react-transition-group` or `framer-motion`,
* or turn this into a small, reusable npm-style component file with props for styling.






## Generate Unique id with TimeStamp
The line of code:

```javascript
const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 9);
```

**Generates a unique ID string** by combining two elements:

---

### ✅ Breakdown:

1. **`Date.now().toString(36)`**

   * `Date.now()` returns the current timestamp in **milliseconds** since January 1, 1970.
   * `.toString(36)` converts that number to a **base-36 string**, using digits `0–9` and letters `a–z`.
   * This provides a time-based component that **increases over time**, helping with uniqueness and chronological ordering.

2. **`Math.random().toString(36).slice(2, 9)`**

   * `Math.random()` returns a float between 0 and 1 (e.g. `0.123456789`).
   * `.toString(36)` converts it into a base-36 string (e.g. `0.xxxxx...`).
   * `.slice(2, 9)` removes the `'0.'` and takes the next 7 characters, giving a **random string**.

---

### ✅ Example output:

```js
"l5x8g6s5h0z1wkp"
```

(Where `"l5x8g6s5h"` is time-based and `"0z1wkp"` is random.)

---

### ✅ Purpose:

This is a **simple way to create a fairly unique ID** for use in:

* Temporary keys
* Client-side object IDs
* Form field IDs
* Element identifiers

---

### ⚠️ Note:

It’s not cryptographically secure. For security-sensitive applications (like tokens or passwords), use stronger methods like `crypto.randomUUID()` or `crypto.getRandomValues()`.

Let me know if you want a reusable function or TypeScript version!
