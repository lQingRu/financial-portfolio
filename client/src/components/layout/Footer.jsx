import '../../styles/Footer.css';

export default function Footer() {
  return (
    <footer className=" grid grid-cols-12 ">
      <div className="col-span-6 col-start-4 py-5">
        <p className="copyright">
          © {new Date().getFullYear()} My Financial
          Portfolio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
