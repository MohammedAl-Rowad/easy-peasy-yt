import React, { useState } from 'react'
import { Input } from 'rsuite'

const BodyEditor = ({ body, setPostState }) => {
  const [txt, setTxt] = useState(body)

  return (
    <Input
      componentClass="textarea"
      value={txt}
      onChange={(val) => {
        setPostState({ body: val })
        setTxt(val)
      }}
      row={20}
      size="lg"
      style={{ marginBottom: 10, marginTop: 10 }}
      placeholder="Textarea"
    />
  )
}

export default BodyEditor
