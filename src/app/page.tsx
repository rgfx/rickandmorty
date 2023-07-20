import { getClient } from "../../gql/client";
import { gql } from "@apollo/client";
import Image from 'next/image'
import Link from 'next/link'
import Header from "../../components/header";

const query = gql`

query Query {
  characters {
    results {
      id
      name
      image
    }
  }
}`;

export default async function Page() {
  const { data } = await getClient().query({ query });
  return <main className="flex items-center flex-col p-5">
            <Header/>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-7">
                {data.characters.results.map((character: any) => (
                    <Link key={character.id} href={`/character/${character.id}`}>
                        <Image className="mb-2" src={character.image} alt="Picture of the author"  width={200} height={0} />
                        <h1 className="text-center">{character.name}</h1>
                    </Link>
                ))}
            </div>
        </main>
}

