import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

import { FlexboxGrid, Button, Panel, List, ButtonToolbar } from 'rsuite'

const Posts = () => {
  const posts = useStoreState(({ posts }) => posts.list)
  const status = useStoreState(({ posts }) => posts.status)

  const fetchPosts = useStoreActions(({ posts }) => posts.fetchPosts)
  const delPosts = useStoreActions(({ posts }) => posts.delPosts)

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
        {posts.map(({ id, title, body }) => (
          <List key={id}>
            <List.Item>
              <Panel header={title} style={{ margin: 10 }} bordered>
                {body}
                <ButtonToolbar>
                  <Button
                    loading={status === 'loading'}
                    disabled={status === 'loading'}
                    color="red"
                    onClick={() => delPosts({ id })}
                  >
                    Delete
                  </Button>
                </ButtonToolbar>
              </Panel>
            </List.Item>
          </List>
        ))}
      </FlexboxGrid.Item>
      <FlexboxGrid.Item colspan={24}></FlexboxGrid.Item>
    </FlexboxGrid>
  )
}

export default Posts
