import Navbar from './components/Navbar.jsx';

export default function InApp({ children, title, description }) {
  return (
    <div className="h-full m-auto relative">
      <div>
        <Navbar title={title} description={description} />
        <div>{children}</div>
      </div>
    </div>
  );
}
