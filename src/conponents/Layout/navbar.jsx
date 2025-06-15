import React, { useState, useRef, useEffect } from "react";
import {Search, Menu, X, User, MessageCircle} from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import {getToken, removeToken} from "../../utilitis/sessionHelper.js";
import {useDispatch, useSelector} from "react-redux";
import {useLogoutMutation} from "../../redux/feature/auth/authAPI.js";
import {logoutUser} from "../../redux/feature/auth/authSlice.jsx";

function useOutsideClick(ref, callback) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback]);
}

const Navbar = () => {

    const [Logout]=useLogoutMutation()
    const {user}=useSelector((state) => state.auth);
    const token = getToken();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const userMenuRef = useRef();
    useOutsideClick(userMenuRef, () => setIsUserMenuOpen(false));

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const AdmindropdownMenu=[
        {label:"Dashboard",path:"/dashboard/admin"},
        {label:"Creat Post",path:"/dashboard/creat-post"},
        {label: " Your Articles",path:"/dashboard/your-articles"},
        {label: "All User",path:"/dashboard/all-user"},
    ]

    const UserDropdownMenu=[
        {label:"Profile",path:"/dashboard/profile"},
        {label: "All Comment" , path: "/dashboard/all-comment"},
    ]

    const DropdownMenu=user?.role === "admin" ? [...AdmindropdownMenu] : [...UserDropdownMenu]

    const Handlelogout=async ()=>{
        try {
            await Logout().unwrap()
            dispatch(logoutUser())
            removeToken()
            navigate('/login')
        }catch(error){
            console.log(error)
        }
    }


    return (
        <header className="bg-white shadow-md py-4 relative z-50">
            <div className="max-w-[1400px] mx-auto flex items-center justify-between px-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    <span className="text-gray-500">Morning</span>
                    <span className="text-black">Dispatch</span>
                </Link>

                {/* Search */}
                <div className="flex-1 mx-8 max-w-sm relative hidden md:block group">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100 transition-all duration-300 group-focus-within:bg-white"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4"/>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/news-article">News Articles</NavLink>

                    {token ? (
                        <div className="relative" ref={userMenuRef}>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="p-2 rounded-full hover:bg-gray-100 transition"
                            >
                                <User className="text-gray-700 cursor-pointer"/>
                            </button>

                            {isUserMenuOpen && (
                                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-md z-50 animate-fadeIn">
                                    <div className="px-4 py-2 border-b font-medium">My Account</div>
                                    <div className="flex flex-col">
                                        {DropdownMenu.map((item, index) => (
                                            <Link
                                                key={index}
                                                to={item.path}
                                                className="px-4 py-2 hover:bg-gray-100 text-sm"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                        <button onClick={Handlelogout} className="px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 cursor-pointer">
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/login">
                            <button className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-700 transition text-sm">
                               Login
                            </button>
                        </Link>
                    )}
                </nav>

                {/* Mobile Toggle */}
                <button className="md:hidden text-gray-700" onClick={toggleMobileMenu}>
                    {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4 space-y-6">
                    <button className="mb-4" onClick={toggleMobileMenu}>
                        <X size={24} className="text-gray-700"/>
                    </button>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-4 pr-10 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-100"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4"/>
                    </div>

                    <div className="space-y-4">
                        <MobileNavLink to="/" toggle={toggleMobileMenu}>Home</MobileNavLink>
                        <MobileNavLink to="/about" toggle={toggleMobileMenu}>About</MobileNavLink>
                        <MobileNavLink to="/news-article" toggle={toggleMobileMenu}>News Articles</MobileNavLink>

                        {token ? (
                            <>
                                {DropdownMenu.map((item, index) => (
                                    <MobileNavLink key={index} to={item.path} toggle={toggleMobileMenu}>
                                        {item.label}
                                    </MobileNavLink>
                                ))}
                                <button
                                    onClick={() => {
                                        Handlelogout
                                        toggleMobileMenu();
                                    }}
                                    className="w-full text-left text-red-600 hover:text-red-800 transition cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </>
                        ) : (
                            <Link to="/register">
                                <button
                                    className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-700 transition w-full">
                                    Sign In
                                </button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Backdrop Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 backdrop-brightness-50 bg-black/30 z-30"
                    onClick={toggleMobileMenu}
                ></div>
            )}
        </header>
    );
};

// Reusable nav link components
const NavLink = ({to, children}) => (
    <Link to={to} className="text-gray-700 hover:text-black transition duration-200">
        {children}
    </Link>
);

const MobileNavLink = ({to, children, toggle}) => (
    <Link to={to} onClick={toggle} className="block text-gray-700 hover:text-black transition">
        {children}
    </Link>
);


export default Navbar;