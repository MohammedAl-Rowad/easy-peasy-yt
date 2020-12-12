import { createStore } from 'easy-peasy'
import { postsModel } from '../features'

const models = {
  posts: postsModel,
}

const store = createStore(models)

export default store
