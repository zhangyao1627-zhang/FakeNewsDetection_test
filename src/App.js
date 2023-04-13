import Header from "./components/header";
import Footer from "./components/footer";
import { Container } from "react-bootstrap"
function App() {
  return (
    <div>
        <Header/>
        <Container>
            <h1>Fake-News-Detection-System</h1>
        </Container>
        <Footer/>
    </div>
  );
}

export default App;
