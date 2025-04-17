# How to Contribute to Documentation

This guide explains how to contribute to the project documentation following the Divio Documentation Framework.

## Understanding the Documentation Structure

Our documentation follows the [Divio Documentation Framework](https://documentation.divio.com/), which organizes documentation into four distinct types:

1. **Tutorials**: Learning-oriented guides for beginners
2. **How-to Guides**: Task-oriented guides for specific problems
3. **Reference**: Technical descriptions of the system
4. **Explanation**: Background and context for deeper understanding

Before contributing, make sure you understand which type of documentation you're working on.

## Prerequisites

- Basic knowledge of Markdown
- Git installed on your machine
- Access to the project repository

## Steps to Contribute

### 1. Clone the Repository

```bash
git clone <repository-url>
cd next-dev
```

### 2. Create a New Branch

Create a branch for your documentation changes:

```bash
git checkout -b docs/your-documentation-topic
```

### 3. Locate the Right Directory

Place your documentation in the appropriate directory based on its type:

- Tutorials: `docs/tutorials/`
- How-to Guides: `docs/how-to-guides/`
- Reference: `docs/reference/`
- Explanation: `docs/explanation/`

### 4. Create or Edit Documentation Files

Create a new Markdown file or edit an existing one. Follow these guidelines:

#### File Naming

- Use kebab-case for filenames (e.g., `getting-started.md`, `api-endpoints.md`)
- Use descriptive names that clearly indicate the content

#### Markdown Structure

- Start with a clear title using a level 1 heading (`# Title`)
- Use appropriate heading levels (H2 for main sections, H3 for subsections, etc.)
- Include a brief introduction explaining the purpose of the document
- Use code blocks with appropriate language syntax highlighting
- Include screenshots or diagrams where helpful

#### Content Guidelines

For **Tutorials**:
- Focus on learning by doing
- Provide clear, step-by-step instructions
- Assume minimal prior knowledge
- Show immediate results for each step

For **How-to Guides**:
- Focus on solving specific problems
- Provide practical steps
- Assume some prior knowledge
- Be concise and task-oriented

For **Reference**:
- Focus on technical description
- Be comprehensive and accurate
- Structure content logically
- Use consistent formatting

For **Explanation**:
- Focus on providing context and background
- Explain concepts and design decisions
- Discuss alternatives and trade-offs
- Deepen understanding rather than providing practical steps

### 5. Update Index Files

If you've added a new document, make sure to update the corresponding index file:

- `docs/tutorials/index.md`
- `docs/how-to-guides/index.md`
- `docs/reference/index.md`
- `docs/explanation/index.md`

Add a link to your new document with a brief description.

### 6. Test Your Documentation

Before submitting your changes:

- Check for spelling and grammar errors
- Verify that all links work correctly
- Ensure code examples are correct and properly formatted
- Test any procedures or commands you've documented

### 7. Commit Your Changes

Commit your changes with a descriptive message:

```bash
git add .
git commit -m "docs: add guide for [your topic]"
```

### 8. Push Your Changes and Create a Pull Request

Push your branch to the remote repository:

```bash
git push origin docs/your-documentation-topic
```

Then create a pull request through the repository's web interface.

## Documentation Style Guide

### Language

- Use clear, concise language
- Write in the present tense
- Use active voice
- Address the reader directly using "you"
- Use gender-neutral language

### Formatting

- Use **bold** for emphasis
- Use *italics* for introducing new terms
- Use `code formatting` for code snippets, file names, and technical terms
- Use numbered lists for sequential steps
- Use bullet points for non-sequential items

### Code Blocks

For inline code, use single backticks:
```
`const example = "code";`
```

For code blocks, use triple backticks with the language specified:

````
```javascript
function example() {
  return "Hello, world!";
}
```
````

### Images

Place images in the `docs/assets` directory and reference them using relative paths:

```markdown
![Alt text](../assets/example-image.png)
```

Include descriptive alt text for accessibility.

## Documentation Review Process

After submitting your pull request:

1. A documentation reviewer will be assigned
2. They will check for technical accuracy, clarity, and adherence to guidelines
3. You may receive feedback requesting changes
4. Once approved, your documentation will be merged

## Need Help?

If you have questions about contributing to documentation:

- Check the [Documentation Index](../index.md) for guidance
- Reach out to the documentation team
- Ask questions in the project's communication channels

Thank you for helping improve our documentation!
