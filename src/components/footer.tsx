interface FooterProps {
  className?: string;
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={`border-t border-gray-200 py-6 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="text-sm text-gray-500 text-center">
          <p>Copyright © 2025 Bigs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
