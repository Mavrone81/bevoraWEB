/* Bevora website — app composition. */
function App() {
  React.useEffect(() => {
    const id = setInterval(() => window.lucide && window.lucide.createIcons(), 120);
    setTimeout(() => clearInterval(id), 1200);
    return () => clearInterval(id);
  });
  return (
    <div>
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <StatsBand />
        <WhyBevora />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
