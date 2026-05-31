import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Contact from './components/contact'; 
import Footer from './components/footer';  

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  );
}
export default App;