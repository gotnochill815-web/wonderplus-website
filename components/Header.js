import Link from 'next/link';

export default function Header(){
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/"><a className="brand">
          <img src="/images/logo/logo.svg" alt="Wonder+ Pipes" className="brand__logo" />
          <span className="brand__name">Wonder+ Pipes</span>
        </a></Link>

        <button className="nav-toggle" aria-controls="main-nav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="hamburger"></span>
        </button>

        <nav id="main-nav" className="nav">
          <ul className="nav__list">
            <li><Link href="/"><a>Home</a></Link></li>
            <li><Link href="/about"><a>About</a></Link></li>
            <li><Link href="/products"><a>Products</a></Link></li>
            <li><Link href="/contact"><a className="btn btn--outline">Contact</a></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
