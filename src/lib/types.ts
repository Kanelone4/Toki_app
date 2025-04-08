export interface Author {
  id: string
  name: string
  avatar: string
}

export interface Comment {
  id: string
  author: Author
  content: string
  timestamp: string
}

export interface Post {
  id: string
  author: Author
  content: string
  image?: string
  likes: number
  comments: Comment[]
  timestamp: string
}
