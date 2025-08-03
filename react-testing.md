## React Testing Notes

Here’s a comprehensive Markdown cheat sheet with examples for Jest, Jest-DOM, Vitest, and React Testing Library. This covers the most common combinations of render, screen, fireEvent, beforeEach, beforeAll, expect, toBe, and more. You can use these as reference for unit, integration, and E2E-style tests.

### React Testing Cheat Sheet
1. Basic Setup
```js
// Import essentials
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for jest-dom matchers
import MyComponent from './MyComponent';
```
2. Test Structure
```js
describe('MyComponent', () => {
  beforeAll(() => {
    // Runs once before all tests
  });

  beforeEach(() => {
    // Runs before each test
    render(<MyComponent />);
  });

  afterEach(() => {
    // Cleanup if needed
  });

  afterAll(() => {
    // Runs once after all tests
  });

  test('renders a button', () => {
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

3. Render & Screen
```js
render(<MyComponent />);
const button = screen.getByRole('button');
const input = screen.getByPlaceholderText('Enter text');
const label = screen.getByText(/hello/i);
```

4. fireEvent
```js
fireEvent.click(screen.getByRole('button'));
fireEvent.change(screen.getByPlaceholderText('Enter text'), { target: { value: 'hello' } });
fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter', code: 'Enter' });
```

5. expect & Matchers
```js
expect(screen.getByText('Submit')).toBeInTheDocument();
expect(screen.getByRole('button')).toBeDisabled();
expect(screen.getByRole('button')).toHaveTextContent('Submit');
expect(screen.getByRole('textbox')).toHaveValue('hello');
expect(screen.queryByText('Not Found')).not.toBeInTheDocument();
expect(screen.getByTestId('custom-element')).toHaveClass('active');
```

6. Async Testing
```js
import { waitFor, findByText } from '@testing-library/react';

await waitFor(() => expect(screen.getByText('Loaded')).toBeInTheDocument());
const asyncElement = await screen.findByText('Loaded');
```

7. Vitest Syntax

```js
import { describe, it, expect, beforeEach } from 'vitest';

describe('MyComponent', () => {
  beforeEach(() => {
    render(<MyComponent />);
  });

  it('should render', () => {
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

8. Table of Common Combinations
## 8. Table of Common Combinations

| Setup        | Render | Query             | fireEvent       | Assertion                  |
|--------------|--------|-------------------|------------------|-----------------------------|
| `beforeEach` | `render` | `screen.getBy*`   | `fireEvent.*`    | `expect(...).toBe*`        |
| `beforeAll`  | `render` | `screen.query*`   | `fireEvent.*`    | `expect(...).not.toBe*`    |
| `test`/`it`  | `render` | `screen.find*`    | `fireEvent.*`    | `expect(...).toHave*`      |

9. E2E-style (with user-event)
```js
import userEvent from '@testing-library/user-event';

test('user types and submits', async () => {
  render(<MyComponent />);
  await userEvent.type(screen.getByRole('textbox'), 'hello');
  userEvent.click(screen.getByRole('button'));
  expect(screen.getByText('Submitted')).toBeInTheDocument();
});
```

10. Snapshot Testing
```js
import { render } from '@testing-library/react';

test('matches snapshot', () => {
  const { asFragment } = render(<MyComponent />);
  expect(asFragment()).toMatchSnapshot();
});
```

11. Custom Queries & Test IDs
```js
render(<MyComponent />);
expect(screen.getByTestId('my-element')).toBeVisible();
```

12. All-in-One Example
```js
describe('MyComponent', () => {
  beforeAll(() => {
    // setup
  });

  beforeEach(() => {
    render(<MyComponent />);
  });

  test('renders and interacts', () => {
    const btn = screen.getByRole('button', { name: /submit/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.getByText('Submitted')).toBeVisible();
  });
});
```

## TIP
- Use `screen` for queries.
- Use `fireEvent` or `userEvent` for interactions.
- Use `expect` with `jest-dom` matchers for assertions.
- Use `beforeEach` / `beforeAll` for setup.

---