import { thunk, action } from 'easy-peasy'
import axios from 'axios'

export const postsModel = {
  list: [],
  status: null,
  addPosts: action((state, payload) => {
    state.list.push(...payload)
  }),
  initEditMode: action((state, { idx }) => {
    state.list[idx].mode = 'edit'
  }),
  replacePost: action((state, { idx, data }) => {
    state.list[idx] = data
  }),
  removePost: action((state, payload) => {
    state.list = state.list.filter(({ id }) => id !== payload.id)
  }),
  setStatus: action((state, payload) => {
    state.status = payload
  }),
  fetchPosts: thunk(async (actions, payload) => {
    try {
      actions.setStatus('loading')
      const { data } = await axios.get(
        'https://jsonplaceholder.typicode.com/posts?_limit=5'
      )
      actions.addPosts(data)
      setTimeout(() => actions.setStatus('success'), 2000)
    } catch {
      actions.setStatus('failed')
    }
  }),
  delPosts: thunk(async (actions, { id }, helpers) => {
    try {
      // const state = helpers.getState()
      actions.setStatus('loading')
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      actions.removePost({ id })
      actions.setStatus('success')
    } catch {
      actions.setStatus('failed')
    }
  }),
  patchPost: thunk(async (actions, { id, newBody, idx }) => {
    try {
      actions.setStatus('loading')
      const { data } = await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        { body: newBody }
      )
      actions.setStatus('success')
      actions.replacePost({ idx, data })
    } catch {
      actions.setStatus('failed')
    }
  }),
}
