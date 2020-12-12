import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Post from './Post'

import { FlexboxGrid, Button, List } from 'rsuite'

const Posts = () => {
  const posts = useStoreState(({ posts }) => posts.list)
  const status = useStoreState(({ posts }) => posts.status)

  const fetchPosts = useStoreActions(({ posts }) => posts.fetchPosts)
  const delPosts = useStoreActions(({ posts }) => posts.delPosts)
  const patchPost = useStoreActions(({ posts }) => posts.patchPost)
  const initEditMode = useStoreActions(({ posts }) => posts.initEditMode)

  return (
    <FlexboxGrid>
      <FlexboxGrid.Item colspan={24}>
        <Button
          loading={status === 'loading'}
          disabled={status === 'loading'}
          appearance="primary"
          block
          onClick={() => {
            fetchPosts()
          }}
        >
          Fetch posts
        </Button>
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}>
        {posts.map((post, idx) => (
          <List key={post.id}>
            <List.Item>
              <Post
                post={post}
                status={status}
                idx={idx}
                delPosts={delPosts}
                initEditMode={initEditMode}
                patchPost={patchPost}
              />
            </List.Item>
          </List>
        ))}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}></FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default Posts
