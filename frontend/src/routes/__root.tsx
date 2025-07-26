import { Outlet, createRootRoute, Link } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className='flex flex-col h-screen justify-center items-center'>
      <header>
        <nav>
          <Link to="/">首页</Link> | <Link to="/about">关于</Link> | <Link to="/users">用户</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <p>© 2023 TanStack Router 示例</p>
      </footer>
    </div>
  ),
}) 