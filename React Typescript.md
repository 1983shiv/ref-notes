## React TypeScript

### Why TypeScript
- With static type checking, you get to learn about potential bugs as you're typing the code, than heading to the browser and figuring out at runtime.
- Provides a way to describe the shape of an object hence providing better documentation and autocomplete.
- Makes maintenance and refactoring of large code bases much easier.

### About the Course
You'll learn with examples, how to use TypeScript with React
it is no a course on TypeScript itself.
you have to know the fundametals of React

### Getting Started
```bash
npx create-react-app myapp-demo --template typescript
```

### Typing Props

```js
function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

```js
type GreetingProps = {
  name: string;
};

function Greeting({ name }: GreetingProps) {
  return <h1>Hello, {name}</h1>;
}
```

**important** : Use type when building app, use interface when building libraries or utility functions.

#### Why Typing Props Is Useful
- **Autocomplete**: Your editor helps you write correct props.
- **Validation**: TypeScript warns you if you forget a required prop or use the wrong type.
- **Readability**: Other developers (and you, later) can quickly see what a component needs.

```js
type GreetingProps = {
    name: string;
    messageCount: number,
    isLoggedIn: true,
    //   object prop
    name: {
        first: string,
        last: string
    },
    //   array props
    names: {
        first: string,
        last: string
    }[]
};

function Greeting(props: GreetingProps) {
  return (
    {props.names.map((name) => {
        return (
            <h2 key={name.first}>{name.first} - {name.last}</h2>
        )
    })}
  );
}

```

### Advanced Props

```js
type statusProps = {
    status: 'loading' | 'success' | 'error'
}

type HeadingProps = {
    children : string
}

type OscarProps = {
    children : React.ReactNode
}

export const Heading = (props: HeadingProps) => {
    return <h2>{props.children}</h2>
}

export const Oscar = (props: OscarProps) => {
    return <>{props.children}</>
}

function App() {
    return (
        <div className="App">
            <Status status="loading" />
            <Heading>Some text passed as children</Heading>
            <Oscar>
                <Heading>Some text passed as children</Heading>
            </Oscar>
        </div>
    )
}

```

### Optional Props
In below type props, messageCount is optional and it will not throw error, if you don't pass this props to component.

```js
type GreetingProps = {
    name: string;
    messageCount?: number,
    isLoggedIn: true
}

```

### Event Props
```js
type ButtonProps = {
    handleClick = () => void
}

export const Button = (props: ButtonProps) => {
    return <button onClick={props.handleClick}>Click</button>
}

```
Typing a Click Event Handler Prop

```js
type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

function CustomButton({ onClick }: ButtonProps) {
  return <button onClick={onClick}>Click Me</button>;
}

```

Breakdown:
- onClick is a function.
- It takes one argument: a React.MouseEvent specifically for HTMLButtonElement.
- The function returns void (nothing).

```js
type ButtonProps = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>, id: number) => void;
};

function CustomButton({ handleClick }: ButtonProps) {
  return <button onClick={(event) => handleClick(event, 1)}>Click Me</button>;
}

function App(){
    return (
        <CustomButton handleClick={(event, id) => { console.log('Button clicked', event, id)}} />
    )
}

```

Common Event Types in React (with TypeScript)
Event	            TypeScript Type
Mouse click	        React.MouseEvent<HTMLButtonElement>
Form submit	        React.FormEvent<HTMLFormElement>
Input change	    React.ChangeEvent<HTMLInputElement>
Keyboard event	    React.KeyboardEvent<HTMLInputElement>

```js
type InputProps = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function TextInput({ onChange }: InputProps) {
  return <input type="text" onChange={onChange} />;
}

```

Typing event props like this ensures that your event handlers receive the correct event object and that TypeScript can help you with things like .target.value.