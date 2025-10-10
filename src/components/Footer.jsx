export default function Footer(){
  return (
    <footer className="pt-12 pb-8 border-t border-white/6">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm">© {new Date().getFullYear()} Bon Voyage — Seamless exploration beyond boundaries.</p>
              <p className="text-xs text-txt2 mt-1">Built with ❤️ for explorers</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/about" className="text-sm hover:underline">About</a>
              <a href="/privacy" className="text-sm hover:underline">Privacy</a>
              <a href="/contact" className="text-sm hover:underline">Contact</a>
            </div>
          </div>
        </footer>
  )
}
