"use client"

import { usePathname } from "next/navigation";
import { LoginButton } from "./LoginButton";
import Link from "next/link";

export const Appbar = () => {
    const pathname = usePathname();

    const navItems = [
        { label: "Home", href: "/" },
        { label: "Dashboard", href: "/dashboard" },
        { label: "Profile", href: "/profile" },
    ];

    return (
        <div className="flex items-center justify-between border-b dark:border-b-neutral-800 p-4">
            <div className="font-semibold text-xl">LOGO</div>
            <div>
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`mx-2 text-neutral-600 dark:text-neutral-300 hover:underline underline-offset-4 ${
                            pathname === item.href ? "font-bold underline" : ""
                        }`}
                    >
                        {item.label}
                    </Link>
                ))}
            </div>
            <div>
                <LoginButton />
            </div>
        </div>
    )
}