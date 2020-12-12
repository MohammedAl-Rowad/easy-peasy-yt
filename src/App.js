import { StoreProvider } from 'easy-peasy'
import 'rsuite/dist/styles/rsuite-default.css'
import store from './store'
import { Container, Header, Content } from 'rsuite'
import { Posts } from './features'

function App() {
  return (
    <StoreProvider store={store}>
      <Container style={{margin: 100}}>
        <Header></Header>
        <Content>
          <Posts />
        </Content>
      </Container>
    </StoreProvider>
  )
}

export default App
