import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/users/')({
  component: UserList,
})

function UserList() {
  // 模拟用户数据
  const users = [
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
  ]

  return (
    <div>
      <h1>用户列表</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <Link to="/users/$userId" params={{ userId: user.id.toString() }}>
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 