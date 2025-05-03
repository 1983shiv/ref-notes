## Course Structure
- Term and concepts to understand what is node.js
- Modules (user defined)
- Built in modules
- Node.js internals
- npm : Node Package Manager
- CLI tools
- Misc

## Prerequisities:
- Modern Javascript

## Term and concepts to understand what is node.js
### What is Node.js?

Node.js is an open-source, cross-platform Javascript runtime environment.

- **Open Source** : source code is publicly available for sharing and modification
- **Cross Platform** : Available on Mac, Windows and Linux
- **JavaScript runtime Environment** : ?

### Why learn Node.js?
- Build end to end javascript applications.
- A number of major companies like LinkedIn, NetFlix, Paypal have all migrated to node.js from other backend technologies.
- Full stack development is one of the most sought out skill sets by companies.
- Huge Community support.

### ECMAScript
**Going back in time...**
- In 1993, the first web browser with a user interface called Mosaic was released
- In 1994, the lead developers of Mosaic founded a company called Netscape and released a more polished browser called Netscape Navigator
- Web pages could only be static and there was no interactivity after a page was loaded.
- 1995, Netscape created a new scripting language called JavaScript


**The advent of Microsoft**
- In 1995, Microsoft debuted their browser Internet Explorer
- Microsoft realised that JavaScript fundamentally changed the user experiance of the web and wanted the same for internet explorer.
- But there was no specification to follow
- 1996, Microsoft reverse-engineered the Navigator interpreter to create its own scripting language called JScript
- The difference made it difficult for developers to make their websites work well in both browsers.
- "Best viewed in Netscape" and " Best viewed in Internet explorer" badges became common.


**Ecma International**
- In Nov 1998, Netscape submitted JavaScript to Ecma International
- It is an industry association dedicated to the standarization of information and communication systems
- Netscape wanted a standard specification that all browsers vendors could conform to as it would help keep other implementations consistent across browsers.
- For each new specification Ecma provides a standard specification and a committee.
- In case of JavaScript, the standard is called ECMA-262 and the committee that works on ECMA-262 is called Technical Committee 39(TC39)
- Ecma however decided to use the term "ECMAScript" to talk about the official language.
- The reason for this is because Oracle(who acquired Microsystem) owns the trademark for the term "JavaScript"
- ECMAScript refers to the standard language whereas JavaScript is what we use is practice and builds on top of ECMAScript.

**ECMAScript versoins**
- 1997 - ECMAScript 1
- 1998 - ECMAScript 2
- 1999 - ECMAScript 3
- xxxx - ECMAScript 4 never released
- 2009 - ECMAScript 5
- 2015 - ECMAScript 6(ES6) or (ECMAScript 2015)

One version every year since 2015

**ECMAScript summary**
- ECMA-262 is the language specification
- ECMAScript is the language taht implements ECMA-262
- JavaScript is basically ECMAScript at its core but builds on top of that.


### JavaScript Engine
JavaScript code we write cannot be understand by the computer.
A JavaScript engine is a program that converts javascript code that developers write into machine code that allows a computer to perform specific tasks
- JavaScript engines are typically developed by web browser vendor
    - V8 - Open source JavaScript engine developed by Google for Chrome