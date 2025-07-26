import { createFileRoute } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/users/$userId')({
  component: UserDetail,
})

function UserDetail() {
  const { userId } = Route.useParams()
  
  // 实际应用中这里可能会从API获取用户数据
  const userData = {
    id: userId,
    name: `用户${userId}`,
    email: `user${userId}@example.com`,
  }

  return (
    <div>
      <h1>用户详情</h1>
      <p>ID: {userData.id}</p>
      <p>姓名: {userData.name}</p>
      <p>邮箱: {userData.email}</p>
      <div>
        <Link to="/users">返回用户列表</Link>
      </div>
    </div>
  )
} 