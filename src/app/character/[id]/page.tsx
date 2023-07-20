import { getClient } from "../../../../gql/client"
import { gql } from "@apollo/client";
import Image from 'next/image'
import Link from 'next/link'
import Header from "../../../../components/header";

const query = gql`

query Character($characterId: ID!) {
  character(id: $characterId) {
    id
    name
    gender
    status
    species
    image
    episode {
        id
        name
        air_date
    }
  }
}`;

export default async function CharacterWithId({ params } : any) {
    const { data } = await getClient().query({ query , variables: { characterId: params.id } });
    return (
        <main className="flex items-center flex-col p-7">
            <Header/>
            <div className="flex flex-col md:flex-row gap-4 mt-7">
                <Image className="mb-2 max-w-none" src={data.character.image} alt={`Picture of ${data.character.name}`}  width={400} height={0} />
                <ul className="list-none">
                    <li><b>Name: </b>{data.character.name}</li>
                    <li><b>Gender: </b>{data.character.gender}</li>
                    <li><b>Status: </b>{data.character.status}</li>
                    <li><b>Species: </b>{data.character.species}</li>
                </ul>
            </div>
            <h1 className="text-xl pt-10 text-teal-300">Found in following episodes</h1>
            <article className="flex flex-wrap gap-3 p-5">
                {data.character.episode.map((episode: any) => (
                    <Link className="border px-2 py-1 border-slate-600 rounded hover:border-slate-500" key={episode.id} href={`/episode/${episode.id}`}>
                        <div className="">{episode.name}</div>
                    </Link>
                ))}
            </article>
        </main>
    )
}