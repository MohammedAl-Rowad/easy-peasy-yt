import { thunk, action } from 'easy-peasy'
import axios from 'axios'

export const postsModel = {
  list: [],
  status: null,
  addPosts: action((state, payload) => {
    state.list.push(...payload)
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
  delPosts: thunk(async (actions, { id }) => {
    try {
      actions.setStatus('loading')
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      actions.removePost({ id })
      actions.setStatus('success')
    } catch {
      actions.setStatus('failed')
    }
  }),
}
