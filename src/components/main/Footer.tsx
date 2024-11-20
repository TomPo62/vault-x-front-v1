export default function Footer() {
  return (
    <footer className="flex text-primary flex-col items-center justify-center w-full h-24 bg-background">
      <p>© {new Date().getFullYear()} Veltyr</p>
    </footer>
  );
}
