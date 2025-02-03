const HeaderComponent = () => {
  return (
    <header className="app__header">
      <img
        src={
          'https://www.google.com/imgres?q=vite&imgurl=https%3A%2F%2Fant.ncc.asia%2Fwp-content%2Fuploads%2F2024%2F07%2Fimage-19-1024x614.png&imgrefurl=https%3A%2F%2Fant.ncc.asia%2Fhuong-dan-setup-vite-de-chay-du-an-react%2F&docid=2-XulHrdYvosVM&tbnid=wuHvqpWNtH8NuM&vet=12ahUKEwiakr6floyLAxVwZ_UHHe11NxgQM3oECBYQAA..i&w=1024&h=614&hcb=2&ved=2ahUKEwiakr6floyLAxVwZ_UHHe11NxgQM3oECBYQAA'
        }
        className="app__logo"
        alt="logo"
      />
      <p>
        Edit <code>src/layout/Layout.tsx</code> and save to reload.
      </p>
      <a className="app__link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <a className="app__link" href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          dfdf
        </a>
        <a className="app__link" href="https://vitest.dev/" target="_blank" rel="noopener noreferrer">
          dfdf
        </a>
      </p>
    </header>
  );
};

export default HeaderComponent;
