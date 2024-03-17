const Navbar = () => {
    return (
        <div>
            <nav className=" p-4 text-white" style={{ backdropFilter: 'blur(20px)' }}>
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold">Base64Tool</span>
                    </div>
                </div>
            </nav>
        </div>
    )
}
export default Navbar