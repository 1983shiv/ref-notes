# React Junior Developer Interview (Questions & Challenge)

The video, titled "React Junior Developer Interview (Questions & Challenge)" by Cosden Solutions, features a mock interview between the interviewer (Ter Cin) and a mid-level developer, Bogdan. The interview simulates a real-world scenario for a React junior developer role, typically requiring one to two years of experience.

The interview is designed as a conversation, aiming to understand Bogdan's thought process, understanding, and working style with React, rather than pressuring him for perfect answers. It consists of two main parts: a series of theoretical questions and a practical coding exercise. The assumed employer for this mock interview is Cosden Solutions.

***

## Part 1: Theoretical Questions

Here are the questions and discussions from the first part of the interview:

### 1. What is React and How Can You Best Describe It?

*   **Bogdan's Answer:** Bogdan describes React as **a JavaScript library for creating UI interfaces**.
*   **Discussion:** The interviewer agrees with this definition, noting that while opinions in the React community are often divided between seeing it as a framework or a library, Bogdan's classification as a library for building user interfaces is fair. They also contrast it with Next.js, which would be considered more of a framework.

### 2. What is JSX and What are its Benefits?

*   **Bogdan's Answer:** Bogdan explains that **JSX is essentially the templating language for React**, allowing developers to insert JavaScript directly inside HTML. He enjoys working with JSX due to the flexibility it offers by combining JavaScript and HTML.
*   **Discussion:** The interviewer elaborates on the historical context and benefits of JSX. Initially, React applications were written using direct function calls for HTML elements, which was considered "ugly" and easy to get lost in. **JSX was created to make React more accessible and familiar to developers** by allowing them to write code that looks and feels like HTML while still enabling the use of JavaScript logic. This approach offers "the best of both worlds," providing React's reactivity while maintaining a familiar HTML-like syntax. This design makes it easier for developers familiar with HTML and JavaScript to learn and contribute quickly.

### 3. What is the Virtual DOM and How Does React Use It? What are its Disadvantages?

*   **Bogdan's Answer:** Bogdan states that **React does not directly interact with the real Document Object Model (DOM)**. Instead, it uses a **Virtual DOM**, which is an in-memory representation. Once changes are finalised in the Virtual DOM, React then "injects everything into the real DOM". On re-renders, it checks references of functions and objects before rendering.
*   **Discussion:** The interviewer confirms Bogdan's understanding, explaining that the Virtual DOM is a **"visual representation of the Document Object Model"** (what the browser renders). React uses this Virtual DOM to efficiently determine **"what changed"** in the application's state. By comparing the current Virtual DOM with a previous snapshot, React can identify differences and make **"efficient updates"** to the real DOM, which is a primary reason for its creation.
*   **Disadvantage:** Bogdan suggests **performance** could be a disadvantage, especially with "computational heavy tasks" on the front end. The interviewer agrees, noting that **"everything in React has to go through the virtual Dom"**, which can lead to performance implications if there is a large amount of data or complex operations. They mention that concepts like "signals" (unrelated to React) are being explored to potentially bypass the Virtual DOM and directly manipulate HTML elements, as a response to some of its disadvantages.

### 4. What is the Difference Between Controlled and Uncontrolled Components/Inputs?

*   **Bogdan's Answer:** Bogdan was unable to answer this question directly.
*   **Discussion:** The interviewer provides a clear explanation:
    *   **Controlled Inputs:** These are inputs whose **value is managed by a piece of state within the component**. Whenever the input's value changes (e.g., through user typing), an `onChange` event handler updates the component's state, thereby controlling the input's displayed value.
        ```javascript
        // Example of a Controlled Input (React JavaScript)
        import React, { useState } from 'react';

        function ControlledInput() {
          const [inputValue, setInputValue] = useState('');

          const handleChange = (event) => {
            setInputValue(event.target.value);
          };

          return (
            <input
              type="text"
              value={inputValue} // The input's value is controlled by state
              onChange={handleChange} // Changes update the state
            />
          );
        }
        ```
    *   **Uncontrolled Inputs:** These are inputs where **no state is used to manage their value**. Instead, their value is accessed directly from the HTML element, typically using a `ref`, when needed (e.g., on form submission).
        ```javascript
        // Example of an Uncontrolled Input (React JavaScript)
        import React, { useRef } from 'react';

        function UncontrolledInput() {
          const inputRef = useRef(null);

          const handleSubmit = () => {
            alert('Input Value: ' + inputRef.current.value); // Value accessed directly from DOM via ref
          };

          return (
            <>
              <input type="text" ref={inputRef} /> {/* No state management */}
              <button onClick={handleSubmit}>Submit</button>
            </>
          );
        }
        ```

### 5. What are Some Commonly Used Hooks in React?

*   **Bogdan's Answer:** Bogdan primarily mentions `useEffect` for data fetching and `useMemo` for performance optimisation and preventing unnecessary re-renders. He notes that these are "essential hooks" typically learned when starting out.
*   **Discussion:** The interviewer acknowledges Bogdan's choices.
    *   **`useEffect`**: While `useEffect` can be used for data fetching, the interviewer points out a common debate: for complex data fetching scenarios (handling loading, errors, race conditions, abort controllers), it's often better to use dedicated libraries like React Query. However, understanding `useEffect`'s lifecycle is still crucial for developers.
    *   **`useMemo`**: Used to memoise (cache) values to prevent re-computation on every re-render, thus improving performance.
    *   **`useCallback`**: Used to memoise functions. This is useful when passing functions as props to child components to prevent unnecessary re-renders of the child component, or when a function is a dependency of `useEffect` to avoid infinite loops.
    *   **`useState`**: The interviewer notes that `useState` is a fundamental and self-explanatory hook for managing component-level state, though Bogdan did not explicitly mention it, perhaps because it "doesn't feel like a hook" but more like a direct variable.

### 6. What is `useRef` and How Does It Work? How Does It Differ from `useState`?

*   **Bogdan's Answer:** Bogdan admits he has "never really touched `useRef`" and always defaulted to `useState`. He suggests he might have used it indirectly through libraries like MUI.
*   **Discussion:** The interviewer expresses surprise, highlighting common use cases for `useRef`:
    *   **Accessing DOM elements directly**: For example, to focus an input field on component mount (`inputRef.current.focus()`).
    *   **Interacting with third-party libraries**: Many libraries require a `ref` to expose their functionalities.
*   **Key Difference from `useState`**: The interviewer explains that while `useRef` can store values like `useState`, the crucial distinction is that **values stored in `useRef` are "nonreactive," meaning they "will not trigger a re-render of the component"** when updated. In contrast, `useState` values are reactive and trigger re-renders. This implies that if a `useRef` value is used in the component's render output, it might display an outdated value until a re-render is triggered by something else. However, within a function, a `useRef`'s value can be assigned and immediately accessed in the next line, unlike `useState` which requires a full re-render for the updated value to be available.
    ```javascript
    // Example: useRef vs useState (React JavaScript)
    import React, { useRef, useState } from 'react';

    function RefVsStateDemo() {
      // useState: Reactive, triggers re-renders
      const [countState, setCountState] = useState(0);

      // useRef: Non-reactive, does NOT trigger re-renders
      const countRef = useRef(0);

      const incrementState = () => {
        setCountState(prev => prev + 1);
      };

      const incrementRef = () => {
        countRef.current = countRef.current + 1;
        console.log('Ref value (in function):', countRef.current);
        // Note: The displayed value on screen will NOT update until a re-render is triggered by something else
      };

      return (
        <div>
          <h2>useState Counter: {countState}</h2>
          <button onClick={incrementState}>Increment useState</button>

          <h2>useRef Counter (displayed value might not update immediately): {countRef.current}</h2>
          <button onClick={incrementRef}>Increment useRef</button>
        </div>
      );
    }
    ```

### 7. What is Context and How Does It Work? What are the Issues with Prop Drilling? Provide a Use Case.

*   **Bogdan's Answer:** Bogdan explains that **`useContext` allows access to state "from the top level component"**, defining state at the very top and making it accessible to all child components. This **"essentially helps when you have to access the state from multiple child components without like using something called prop drilling"**.
*   **Issues with Prop Drilling:** Bogdan identifies prop drilling as a problem because it "can get ugly pretty quick," "annoying," and "messy" to pass state through many layers of components. He also notes that renaming or removing a component in the middle of the chain breaks the flow.
*   **Use Case:** Bogdan suggests **dark mode** as a perfect use case. The interviewer agrees, noting that dark mode is a "global thing that should be accessible in your entire application and it should also be updatable from any component." Context allows any component (e.g., from settings or a navbar) to access and update the same global state.
    ```javascript
    // Example: React Context for Dark Mode (React TypeScript)
    import React, { createContext, useContext, useState, ReactNode } from 'react';

    // 1. Define the Context's type
    interface ThemeContextType {
      theme: 'light' | 'dark';
      toggleTheme: () => void;
    }

    // 2. Create the Context
    const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

    // 3. Create a Provider Component
    interface ThemeProviderProps {
      children: ReactNode;
    }

    export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
      const [theme, setTheme] = useState<'light' | 'dark'>('light');

      const toggleTheme = () => {
        setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
      };

      return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    };

    // 4. Create a Custom Hook to consume the Context
    export const useTheme = () => {
      const context = useContext(ThemeContext);
      if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
      }
      return context;
    };

    // Example Usage:
    function ThemeSwitcher() {
      const { theme, toggleTheme } = useTheme();
      return (
        <button onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
      );
    }

    function DisplayTheme() {
      const { theme } = useTheme();
      return (
        <p style={{ backgroundColor: theme === 'dark' ? '#333' : '#fff', color: theme === 'dark' ? '#eee' : '#333' }}>
          Current theme: {theme}
        </p>
      );
    }

    // App structure:
    function App() {
      return (
        <ThemeProvider>
          <div style={{ padding: '20px', border: '1px solid #ccc' }}>
            <h1>My App</h1>
            <ThemeSwitcher />
            <DisplayTheme />
          </div>
        </ThemeProvider>
      );
    }
    // In this example, ThemeSwitcher and DisplayTheme components can access and update the theme without prop drilling.
    ```

### 8. What is State Management in React and When is It Useful?

*   **Bogdan's Answer:** Bogdan notes he has **"never really used" dedicated state management libraries** like MobX or Redux in his projects, as he "didn't really need to" in the use cases he encountered.
*   **Discussion:** The interviewer validates Bogdan's answer, stating that **"not all applications need it"** and it's possible to build "a big and complex application without State Management." Such libraries become useful when there are "specific features" requiring "a more robust Global state that context like wouldn't cut it".

### 9. What is the Recommended Way to Structure Your React Code (e.g., Components, Folder Structure)?

*   **Bogdan's Answer:** Bogdan suggests breaking down views from components, having a **`components` folder** (potentially categorised into "dumb components" for rendering and "more complex components" for logic), and a **`hooks` folder for custom hooks**.
*   **Discussion:** The interviewer agrees and expands on the benefits of such a structure:
    *   **Separation of Concerns:** Organising code promotes a clear division of responsibilities.
    *   **Maintainability and Readability:** A neat, structured application is easier to work with, understand, and maintain.
    *   **Onboarding:** It simplifies the process of onboarding new developers, as they can quickly find and understand the code, avoiding frustration and "impostor syndrome".
    *   **Predictability and Patterns:** A well-structured project allows developers to "immediately spot patterns" and "predict where things are going to be," making it easier to add new features without ambiguity.
    *   **Testability:** Proper component separation makes it "easier to test components".

### 10. What is a Good Way to Test Your React Applications?

*   **Bogdan's Answer:** Bogdan states that in his past work, they **"were only using Cypress for like end to end tests"**. He describes Cypress as its own application that runs a browser window, executes test files, and "checks the values inside your DOM" against defined test values to ensure proper rendering and data presence. This helps confirm that "if you change something that if you test break you know that the code that you introduced might have had some breaking changes".
*   **Discussion:** The interviewer validates Bogdan's emphasis on Cypress and end-to-end (E2E) tests.
    *   **Value of Testing:** Tests "not only to validate that your code is working currently but that whatever changes you make in the future does not break your code." Well-designed tests provide "absolute certainty" that shipped code hasn't introduced regressions.
    *   **Cypress (End-to-End/Integration Testing):** The interviewer adds that Cypress tests the application "as a user would," by "actually clicks and types and does all the things the user would," giving insight into how the app truly behaves.
    *   **Unit Testing:** The interviewer also mentions **unit testing**, where "individual components" are tested to ensure they "behave exactly in the same way" (e.g., a button's `onClick` function is correctly called). However, they note that unit testing "isn't as common as end to end tests" in many projects, and sometimes "it's a bit redundant" as E2E tests can cover enough, though unit tests do have their specific use cases.

### 11. What are the React Dev Tools and What Can You Use Them For?

*   **Bogdan's Answer:** Bogdan identifies them as a **Chrome extension** and mentions using them to **"see the component tree"** and trace "weird behaviors" or errors in rendering.
*   **Discussion:** The interviewer confirms these uses and adds a key application: **performance debugging**. Developers use React Dev Tools to:
    *   Analyse **performance issues**.
    *   **Profile rendering**: See "how long each [component] takes to render" and "how many times each component is rendering".
    *   Understand **reasons for re-renders**: Get a "basic kind of overview" of what caused a component to re-render.
    *   **Validate fixes**: Record performance before and after a fix to confirm improvements.

***

## Part 2: Coding Exercise

The second part of the interview is a "technical interview" with a small code challenge. Bogdan uses VS Code with Live Share to work on the interviewer's machine.

### Challenge Requirements:

Create a simple React application that displays a list of countries and their capitals with the following features:
1.  The list of countries and capitals should be **fetched from an API**.
2.  The list should be displayed on the `CountriesPage` component.
3.  Each country should be displayed in a **separate component**.
4.  The user should be able to **filter the list by Capital**.

### API Endpoints and Provided Helpers:

*   **Base URL**: `https://restcountries.com/v3.1/`.
*   **Fetch All Countries**: Use the `/all` endpoint (`https://restcountries.com/v3.1/all`).
*   **Filter by Capital**: Use the `/capital/{capital}` endpoint (`https://restcountries.com/v3.1/capital/london`).
*   **`SelectInput` Component**: A pre-built component from `component/ui` to handle filtering. It accepts an `onChange` function that provides the selected `value` as a string.
*   **`filterableCapitals`**: A list of capitals to be used as options for filtering.
*   **`CapitalType`**: A helper type for `filterableCapitals`.
*   **`Country` Interface**: An interface for the country data received from the API (for TypeScript).

### Step-by-Step Implementation and Discussion:

Bogdan is asked to walk through his thought process and explain his decisions.

#### 1. Initial Setup: State and Fetching All Countries

*   **Bogdan's Approach:**
    *   Creates a state variable for `countries` using `useState` and types it as an array of `Country` objects.
    *   Uses a `useEffect` hook to perform data fetching when the component mounts.
    *   Defines an `async` function `fetchData` *inside* the `useEffect` to avoid infinite loops and uses `await fetch()` to get the response, then `await response.json()` to parse the data, and finally `setCountries()`.
    *   Calls `fetchData()` immediately within the `useEffect`.
*   **Interviewer's Validation:** The interviewer confirms that the `fetchData` function is correctly set up with `async/await` and that defining it inside `useEffect` (or using an IIFE) prevents infinite re-renders by not adding it to the dependency array. They confirm that 250 countries are successfully fetched and available.

    ```typescript
    // Initial Setup and Fetching (simplified from original for clarity, focus on core logic)
    import React, { useState, useEffect } from 'react';

    // Assume Country interface is defined elsewhere as per source
    // interface Country {
    //   name: { common: string };
    //   capital: string[]; // Capital is an array of strings in the API response
    //   // ... other properties from API
    // }

    const BASE_URL = "https://restcountries.com/v3.1"; // As provided in source

    function CountriesPage() {
      const [countries, setCountries] = useState<Country[]>([]);

      useEffect(() => {
        const fetchAllCountries = async () => {
          try {
            const response = await fetch(`${BASE_URL}/all`); // Fetch all countries
            const parsedData: Country[] = await response.json(); // Parse as JSON
            setCountries(parsedData); // Set the countries state
          } catch (error) {
            console.error("Error fetching countries:", error);
          }
        };

        fetchAllCountries(); // Call the async function
      }, []); // Empty dependency array means it runs once on mount

      return (
        <div>
          {/* Countries will be rendered here */}
          {countries.map(country => (
            <div key={country.name.common}> {/* Good practice: use unique key like name */}
              <p>{country.name.common} - {country.capital?. || 'N/A'}</p> {/* Capital is an array */}
            </div>
          ))}
        </div>
      );
    }
    ```

#### 2. Displaying the List and Key Prop Discussion

*   **Bogdan's Approach:** Bogdan initially maps over the `countries` array and renders a `div` or `p` element for each, displaying `country.name.common` and `country.capital`. He initially uses `index` as the `key` prop.
*   **Key Prop Discussion:**
    *   The interviewer explains that while `index` works to silence React warnings, it's generally **not recommended as a `key` prop when the list items can change order, be added, or removed**. If the list of countries is filtered (as required by the challenge), the indexes will no longer consistently map to the same countries. This would cause React to "completely destroy all of them and then rebuild it," negating the purpose of keys (which is efficient reconciliation).
    *   **Solution:** The interviewer suggests using a **unique and stable identifier** from the data itself, such as `country.name.common` (country common name) or `country.capital`. Bogdan updates his code to use `country.name.common` as the key, which is validated as a good improvement.

#### 3. Displaying Each Country in a Separate Component

*   **Bogdan's Approach:** Bogdan creates a new functional component called `CountryCard`. He passes the `country` object as a prop to `CountryCard` and destructures it inside. He also correctly types the props using an interface `CountryCardProps` which extends the `Country` interface directly.
*   **Interviewer's Validation:** The interviewer agrees with creating a separate component and the naming convention `CountryCard` (to differentiate it as a UI component). They confirm the correct way to pass and type the props. After refactoring, the application continues to render correctly with no console errors.

    ```typescript
    // CountryCard Component (React TypeScript)
    import React from 'react';

    // Assume Country interface is defined elsewhere as per source
    // interface Country {
    //   name: { common: string };
    //   capital: string[];
    // }

    // Define props interface for CountryCard
    interface CountryCardProps {
      country: Country; // The prop 'country' is of type Country
    }

    const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
      return (
        <div>
          <p>
            <strong>{country.name.common}</strong> - {country.capital?. || 'N/A'} {/* Access nested properties and handle potential undefined capital */}
          </p>
        </div>
      );
    };

    export default CountryCard;

    // Inside CountriesPage component, render like this:
    // ...
    import CountryCard from './CountryCard'; // Assuming CountryCard.tsx is in the same directory

    // ... inside CountriesPage render method
    {countries.map(country => (
      <CountryCard key={country.name.common} country={country} /> {/* Pass country object as prop */}
    ))}
    ```

#### 4. Filtering the List by Capital

This was the most complex part of the coding challenge.

*   **Bogdan's Initial Approach:**
    *   Introduces a `SelectInput` component (provided) and attempts to use `filterableCapitals` to populate its options.
    *   Creates a new state variable `selectedCapital` to hold the currently selected capital.
    *   Defines a separate `handleFilterChange` (or similar) `async` function that would fetch data specifically for the selected capital using the `/capital/{value}` endpoint and then `setCountries`. He attempts to call this `fetchData` function from `SelectInput`'s `onChange`.
*   **Interviewer's Solution and Best Practice:**
    *   The interviewer guides Bogdan towards a more common and efficient React pattern: **managing data fetching within a single `useEffect` that reacts to changes in the filter state**.
    *   **Single `useEffect` for Fetching:** Instead of creating a new fetch function for filtering, the existing `useEffect` (which fetches all countries) should be modified. It should now depend on the `selectedCapital` state.
    *   **Dynamic URL Construction:** Inside this `useEffect`, the URL for the API call is constructed dynamically. If a `capital` is selected, the `/capital/{capital}` endpoint is used; otherwise, the `/all` endpoint is used.
    *   **`onChange` for State Update Only:** The `onChange` handler for the `SelectInput` component simply updates the `selectedCapital` state. This change then automatically triggers the `useEffect` to re-run and fetch the appropriate data.
    *   **Casting for TypeScript:** The interviewer notes that the `value` received by `SelectInput`'s `onChange` is a `string`, which needs to be cast as `CapitalType` to satisfy TypeScript when setting the `selectedCapital` state.
    *   **Benefits:** This approach leads to cleaner code, avoids repetition, and leverages React's reactive system effectively. However, it also highlights a potential downside of `useEffect` – understanding its dependencies and effects can become complex in components with many side effects.

    ```typescript
    // Final CountriesPage Component (React TypeScript)
    import React, { useState, useEffect } from 'react';
    import CountryCard from './CountryCard'; // Assuming CountryCard.tsx is in the same directory
    // Assume SelectInput and filterableCapitals are provided as per source
    // Assume CapitalType is provided as per source

    const BASE_URL = "https://restcountries.com/v3.1";

    // Example of provided SelectInput (simplified for illustration, actual component is imported)
    // function SelectInput({ onChange, options, placeholder }: { onChange: (value: string) => void; options: { value: string; label: string }[]; placeholder?: string; }) {
    //   return (
    //     <select onChange={(e) => onChange(e.target.value)}>
    //       {placeholder && <option value="">{placeholder}</option>}
    //       {options.map(option => (
    //         <option key={option.value} value={option.value}>{option.label}</option>
    //       ))}
    //     </select>
    //   );
    // }

    // Mock provided filterableCapitals (actual list is much longer)
    const filterableCapitals = ['London', 'Paris', 'Berlin'];
    type CapitalType = 'London' | 'Paris' | 'Berlin' | ''; // Example type

    function CountriesPage() {
      const [countries, setCountries] = useState<Country[]>([]);
      const [selectedCapital, setSelectedCapital] = useState<CapitalType>(''); // New state for selected capital

      useEffect(() => {
        const fetchCountries = async () => {
          try {
            // Dynamically construct the URL based on selectedCapital
            const url = selectedCapital
              ? `${BASE_URL}/capital/${selectedCapital}`
              : `${BASE_URL}/all`;

            const response = await fetch(url);
            const parsedData: Country[] = await response.json();
            setCountries(parsedData);
          } catch (error) {
            console.error("Error fetching countries:", error);
            setCountries([]); // Clear countries on error
          }
        };

        fetchCountries();
        // The useEffect now depends on selectedCapital.
        // Any change to selectedCapital will re-run this effect and fetch new data.
      }, [selectedCapital]);

      const handleCapitalChange = (value: string) => {
        // The onChange handler simply updates the state.
        // The useEffect above will react to this state change.
        setSelectedCapital(value as CapitalType); // Cast to CapitalType for type safety
      };

      return (
        <div>
          <h2>Countries and Capitals</h2>
          {/* Select Input for filtering */}
          <SelectInput
            onChange={handleCapitalChange} // Handler only sets state
            options={filterableCapitals.map(capital => ({ value: capital, label: capital }))}
            placeholder="Filter by Capital"
          />

          <div style={{ marginTop: '20px' }}>
            {countries.length > 0 ? (
              countries.map(country => (
                <CountryCard key={country.name.common} country={country} />
              ))
            ) : (
              <p>No countries found or loading...</p>
            )}
          </div>
        </div>
      );
    }

    export default CountriesPage;
    ```

### Interview Conclusion and Feedback:

Despite some initial challenges and a different approach to filtering, the interviewer commends Bogdan for his performance, stating he "did really well" and "accomplished all of these goals". The discussion around the filtering mechanism highlights the importance of understanding React's lifecycle and dependency arrays for `useEffect`. The interviewer praises Bogdan's reasoning and problem-solving skills throughout the mock interview.