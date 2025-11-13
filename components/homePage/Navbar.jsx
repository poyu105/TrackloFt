"use client"

import { Button, Link } from "@radix-ui/themes";
import { Menu, X } from "lucide-react";
import { useState } from "react"

export default function Navbar(){
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return(
        <>
            <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-blue-100 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                                Logo
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                                Tracklo
                            </span>
                        </div>
                        
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-700 hover:text-blue-600 transition">功能特色</a>
                            <a href="#how-it-works" className="text-gray-700 hover:text-blue-600 transition">運作方式</a>
                            <a href="#pricing" className="text-gray-700 hover:text-blue-600 transition">方案價格</a>
                            <Link href="/auth/login" variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                                登入
                            </Link>
                            <Link href="/auth/register" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">
                                免費試用
                            </Link>
                        </div>

                        <button 
                            className="md:hidden"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden bg-white border-t border-blue-100">
                        <div className="px-4 py-4 space-y-3">
                            <a href="#features" className="block text-gray-700 hover:text-blue-600">功能特色</a>
                            <a href="#how-it-works" className="block text-gray-700 hover:text-blue-600">運作方式</a>
                            <a href="#pricing" className="block text-gray-700 hover:text-blue-600">方案價格</a>
                            <Button variant="outline" className="w-full border-blue-500 text-blue-600 hover:bg-blue-50">登入</Button>
                            <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white">免費試用</Button>
                        </div>
                    </div>
                )}
            </nav>
        </>
    )
}