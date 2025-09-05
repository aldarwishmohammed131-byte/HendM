export default function Footer(){
  return (
    <footer className="mt-20 border-t border-base-border">
      <div className="container-xl py-10 text-sm text-base-sub flex flex-col md:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} HendM — Black × Gold Luxury</p>
        <p>Crafted with elegance</p>
      </div>
    </footer>
  );
}
