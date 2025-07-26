import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return (
    <div>
      <h1>关于</h1>
      <p>这是一个使用TanStack Router和Rspack构建的示例应用</p>
    </div>
  )
} 