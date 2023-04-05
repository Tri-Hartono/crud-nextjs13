import React from 'react';

export default function PostsDetail({ params }: { params: { postId: String } }) {
  return <div>post {params.postId[0]}</div>;
}
