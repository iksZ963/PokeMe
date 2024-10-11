export const metadata = {
  title: 'PokeMe',
  description: 'Animate yourself as a Pokémon trainer!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <header className="bg-yellow-400 text-blue-900 py-4 text-center">
          <h1 className="text-3xl font-bold">PokeMe</h1>
        </header>
        <main className="flex-grow flex items-center justify-center p-4">
          {children}
        </main>
        <footer className="bg-blue-900 text-white py-4 text-center">
          <p>© 2024 PokeMe - All rights reserved</p>
        </footer>
      </body>
    </html>
  );
}
