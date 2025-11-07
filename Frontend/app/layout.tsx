import './globals.css'
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className=" px-4 py-4 h-full w-screen" >
        <section className="w-full h-full flex flex-col justify-between ">
            <header className="bg-blue-300 h-20 flex items-center justify-center text-white border rounded-lg">
                <h1 className="font-bold text-2xl leading-tight tracking-tight"> movie_database</h1>
            </header>
            <div className="h-3/4">{children}</div>
            <footer className="bg-blue-300 h-16 flex items-center justify-center text-white border rounded-lg">
                <h1 className="font-bold text-lg leading-tight tracking-tight"> designed by deepanshu</h1>
            </footer>
        </section>
        </body>
        </html>
    );
}