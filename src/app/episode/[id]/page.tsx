import { getClient } from "../../../../gql/client";
import { gql } from "@apollo/client";
import Image from 'next/image'
import Link from 'next/link'
import Header from "../../../../components/header";

const query = gql`

query Characters($ids: [ID!]!) {
  episodesByIds(ids: $ids) {
    id
    name
    characters {
      image
      id
      name
    }
  }
}`;

export default async function Page({ params } : any) {
  const { data } = await getClient().query({ query , variables: { ids: params.id } });
  const characters = data.episodesByIds[0].characters;

  const characterData = [];

  for (let i = 0; i < characters.length; i++) {
    characterData.push(characters[i]);
  }

  return <main className="flex items-center flex-col p-5">
            <Header/>
            <h1 className="text-xl py-10 text-teal-300">Espisode {data.episodesByIds[0].name} characters list</h1>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-5">
              {characterData.map(({id, image, name}) => (
                  <Link key={id} href={`/character/${id}`}>
                      <Image className="mb-2 object-cover" src={image} alt={`Picture of ${name}`}  width={100} height={100} />
                      <span>{name}</span>
                  </Link>
              ))}
            </div>
        </main>
}
