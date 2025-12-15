import Link from "next/link";

export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-4 text-black">
            This is profile pages
            <li className="h-96 bg-amber-200">1</li>
            <li className="h-96 bg-amber-200">2</li>
            <li className="h-96 bg-amber-200">3</li>
            <li className="h-96 bg-amber-200">4</li>
            <li className="h-96 bg-amber-200">5</li>
            <li className="h-96 bg-amber-200">6</li>
            <Link href="/news" scroll={false} className="text-white">News</Link>
        </div>
    )
}