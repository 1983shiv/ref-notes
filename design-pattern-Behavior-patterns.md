### Memento Pattern

The **Memento Pattern** is a behavioral design pattern that lets you capture and externalize an object's internal state so that the object can be restored to this state later, without violating encapsulation.  


It's commonly used for undo/redo functionality.

---

#### TypeScript Example

```ts
// EditorState (Memento)
class EditorState {
  constructor(private readonly content: string) {}
  getContent(): string {
    return this.content;
  }
}

// Editor (Originator)
class Editor {
  private content: string = "";

  createState(): EditorState {
    return new EditorState(this.content);
  }

  restore(state: EditorState): void {
    this.content = state.getContent();
  }

  getContent(): string {
    return this.content;
  }

  setContent(content: string): void {
    this.content = content;
  }
}

// History (Caretaker)
class History {
  private states: EditorState[] = [];

  push(state: EditorState): void {
    this.states.push(state);
  }

  pop(): EditorState | undefined {
    return this.states.pop();
  }
}

// Usage (Main)
const editor = new Editor();
const history = new History();

editor.setContent("a");
history.push(editor.createState());

editor.setContent("b");
history.push(editor.createState());

editor.setContent("c");
editor.restore(history.pop()!);

console.log(editor.getContent()); // Output: b

```

**How the Memento Pattern Works**
- Originator (Editor): The object whose state needs to be saved and restored.
- Memento (EditorState): Stores the internal state of the originator.
- Caretaker (History): Keeps track of the memento objects but never modifies them.

***In this example:***
- The editor's content is changed several times.
- Each time, the state is saved to history.
- When needed, the editor can restore its previous state from history (undo).

**Key Point:**
The memento pattern allows undo/redo functionality without exposing the internal details of the object.