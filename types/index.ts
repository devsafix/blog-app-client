export interface User {
  id: number;
  name: string;
  email: string;
  picture: string | null;
  status: string;
  phone: string | null;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  thumbnail: string | null;
  isFeatured: boolean;
  tags: string[];
  views: number;
  authorId: number;
  createdAt: string; // Dates will come as strings
  updatedAt: string;
  author: User;
}

// Type for the paginated response from our backend
export interface PostsResponse {
  data: Post[];
  pagination: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}
