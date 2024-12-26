import ReactMarkdown from 'react-markdown'
import { Box, Typography, TextField, BoxProps } from '@mui/material'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github.css'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { useState } from 'react'

const sharedStyles = {
  whiteSpace: 'pre-wrap',
}

const markdownComponents = {
  h1: ({ ...props }) => (
    <Typography
      variant="h3"
      component="h1"
      sx={{
        ...sharedStyles,
        fontWeight: 600,
        fontSize: '2rem',
        marginBottom: '1rem',
      }}
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <Typography
      variant="h4"
      component="h2"
      sx={{
        ...sharedStyles,
        fontWeight: 600,
        fontSize: '1.5rem',
        marginBottom: '1rem',
      }}
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <Typography
      variant="h5"
      component="h3"
      sx={{
        ...sharedStyles,
        fontWeight: 600,
        fontSize: '1.25rem',
        marginBottom: '1rem',
      }}
      {...props}
    />
  ),
  hr: ({ ...props }) => (
    <Box
      component="hr"
      sx={{
        ...sharedStyles,
        height: '1px',
        border: 0,
        backgroundColor: '#d1d5da',
        margin: '1rem 0',
      }}
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <Typography
      variant="body1"
      component="p"
      sx={{
        ...sharedStyles,
        marginBottom: '1rem',
        lineHeight: 1.6,
        color: '#24292e',
        whiteSpace: 'pre-wrap',
      }}
      {...props}
    />
  ),
  a: ({ ...props }) => (
    <Typography
      component="a"
      sx={{
        ...sharedStyles,
        color: '#0366d6',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <Box
      component="ul"
      sx={{
        ...sharedStyles,
        paddingLeft: '2rem',
        marginBottom: '1rem',
        listStyleType: 'disc',
      }}
      {...props}
    />
  ),
  ol: ({ ...props }) => (
    <Box
      component="ol"
      sx={{
        ...sharedStyles,
        paddingLeft: '2rem',
        marginBottom: '1rem',
        listStyleType: 'decimal',
      }}
      {...props}
    />
  ),
  li: ({ ...props }) => (
    <Typography
      component="li"
      sx={{
        ...sharedStyles,
        marginBottom: '0.5rem',
      }}
      {...props}
    />
  ),
  blockquote: ({ ...props }) => (
    <Box
      component="blockquote"
      sx={{
        ...sharedStyles,
        padding: '1rem',
        backgroundColor: '#f6f8fa',
        borderLeft: '4px solid #d1d5da',
        color: '#6a737d',
        fontStyle: 'italic',
        marginBottom: '1rem',
      }}
      {...props}
    />
  ),
  pre: ({ ...props }) => (
    <Box
      component="pre"
      sx={{
        ...sharedStyles,
        backgroundColor: '#f6f8fa',
        padding: '1rem',
        borderRadius: '6px',
        fontSize: '0.875rem',
        lineHeight: 1.45,
        overflow: 'auto',
        border: '1px solid #d1d5da',
        marginBottom: '1rem',
      }}
      {...props}
    />
  ),
  code: ({ ...props }) => (
    <Box
      component="code"
      sx={{
        ...sharedStyles,
        backgroundColor: '#f6f8fa',
        borderRadius: '3px',
        fontSize: '0.85rem',
        color: '#6a737d',
        padding: '0.2rem 0.4rem',
        display: 'inline',
        overflowX: 'auto',
        whiteSpace: 'normal',
        border: 'none',
      }}
      {...props}
    />
  ),
  table: ({ ...props }) => (
    <Box
      component="table"
      sx={{
        ...sharedStyles,
        borderCollapse: 'collapse',
        width: '100%',
        marginBottom: '1rem',
      }}
      {...props}
    />
  ),
  th: ({ ...props }) => (
    <Box
      component="th"
      sx={{
        ...sharedStyles,
        border: '1px solid #d1d5da',
        padding: '8px',
        textAlign: 'left',
        backgroundColor: '#f6f8fa',
        fontWeight: 'bold',
      }}
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <Box
      component="td"
      sx={{
        ...sharedStyles,
        border: '1px solid #d1d5da',
        padding: '8px',
        textAlign: 'left',
      }}
      {...props}
    />
  ),
  img: ({ ...props }) => (
    <Box
      component="img"
      sx={{
        ...sharedStyles,
        maxWidth: '100%',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '1rem',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      {...props}
    />
  ),
  video: ({ ...props }) => (
    <Box
      component="video"
      controls
      sx={{
        ...sharedStyles,
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '6px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        marginBottom: '1rem',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      {...props}
    />
  ),
}

const markdownContent = `
# Markdown with Multiple Features

Explore a fully styled markdown with multiple programming languages, lists, and tables.

## Lists
- Item 1: A bullet list example.
- Item 2: Another bullet point.

## Ordered List
1. First step
2. Second step

## Code Blocks
### JavaScript
\`\`\`javascript
function greet() {
  console.log("Hello, JavaScript!");
}
greet();
\`\`\`

### TypeScript
\`\`\`typescript
const message: string = "Hello, TypeScript!";
console.log(message);
\`\`\`

### Swift
\`\`\`swift
let message = "Hello, Swift!"
print(message)
\`\`\`

### Java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}
\`\`\`

## Large Table Example
| Framework      | Language       | Stars      | Description                                       |
|----------------|----------------|------------|---------------------------------------------------|
| ㅈㄹㅈㄷㄹ          | JavaScript     | 192k       | A JavaScript library for building user interfaces. |
| Angular        | TypeScript     | 85k        | A platform for building mobile and desktop web apps. |
| Vue            | JavaScript     | 203k       | A progressive framework for building UIs.        |
| Svelte         | JavaScript     | 66k        | A radical new approach to building user interfaces. |
| Spring Boot    | Java           | 65k        | A microservice framework for Java.               |
| Django         | Python         | 67k        | A high-level Python web framework.               |


## Blockquote
> This is an example of a blockquote. Use it to highlight information.

## Links
[Material-UI Documentation](https://mui.com) for styling examples and guides.

---
## Image Example
![Image](https://via.placeholder.com/400x200)

## Video Example
<video width="400" height="200" controls>
  <source src="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" type="video/mp4">
</video>

## Blockquote
> This is an example of a blockquote. Use it to highlight information.

## Links
[Material-UI Documentation](https://mui.com) for styling examples and guides.

---

Thank you for exploring! 🎉

`

interface Props extends BoxProps {
  markdown: string
}

function MUIMarkdown({ markdown, sx, ...rest }: Props) {
  return (
    <Box sx={sx} {...rest}>
      <Box
        sx={{
          padding: 4,
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          margin: '0 auto',
          height: '100%',
        }}
      >
        <ReactMarkdown
          components={markdownComponents}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeRaw]}
        >
          {markdown}
        </ReactMarkdown>
      </Box>
    </Box>
  )
}

export default MUIMarkdown
