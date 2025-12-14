import Link from "next/link";

export default function NewsPage() {
    return (
        <div className="flex flex-col gap-4 text-black">
            This is new pages
            <li className="h-96 bg-amber-200">1</li>
            <li className="h-96 bg-amber-200">2</li>
            <li className="h-96 bg-amber-200">3</li>
            <li className="h-96 bg-amber-200">4</li>
            <li className="h-96 bg-amber-200">5</li>
            <li className="h-96 bg-amber-200">6</li>
            <Link href="/profile" scroll={false} className="text-white">Profile</Link>
        </div>
    )
}