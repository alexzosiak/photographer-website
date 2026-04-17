import Link from 'next/link';



const PortfolioAlbum = (id: string, title: string, cover: string, album: string[],) => {

    return (
        <Link href={`/works/:${id}`}>
            <img src={cover} alt={title} />
            <h2>{title}</h2>
        </Link>
    )
}

export default PortfolioAlbum;