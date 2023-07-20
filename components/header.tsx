import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
    return (
        <Link href={`/`}>
            <Image src="/logo.png" alt="Picture of the author"  width={200} height={50} />
        </Link>
    )
}