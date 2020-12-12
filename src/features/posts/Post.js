import React, { useState } from 'react'
import { Panel, Button, ButtonToolbar } from 'rsuite'
import BodyEditor from './BodyEditor'

const Post = ({
  post: { id, title, body, mode },
  idx,
  post,
  status,
  delPosts,
  initEditMode,
  patchPost,
}) => {
  const [postState, setPostState] = useState({ ...post })
  return (
    <Panel header={id} style={{ margin: 10 }} bordered>
      {mode === 'edit' ? (
        <BodyEditor body={postState.body} setPostState={setPostState} />
      ) : (
        body
      )}

      <ButtonToolbar>
        <Button
          loading={status === 'loading'}
          disabled={status === 'loading'}
          color="red"
          onClick={() => delPosts({ id })}
        >
          Delete
        </Button>
        <Button
          loading={status === 'loading'}
          disabled={status === 'loading'}
          color="orange"
          onClick={() => initEditMode({ idx })}
        >
          Edit
        </Button>
        {mode === 'edit' && (
          <Button
            loading={status === 'loading'}
            disabled={status === 'loading'}
            color="cyan"
            onClick={() => patchPost({ idx, newBody: postState.body, id })}
          >
            SAVE
          </Button>
        )}
      </ButtonToolbar>
    </Panel>
  )
}

export default Post
