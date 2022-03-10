import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { FiChevronLeft, FiEdit3, FiExternalLink, FiVolume1, FiVolume2, FiX } from 'react-icons/fi';
import { getVocabularyEntry, getVocabularyIds, VocabularyEntry } from '../data/vocabulary';
import { HStack } from '../shared/hstack';
import { Link } from '../shared/link';
import { pronounce } from '../utils/tts';

interface StaticProps {
  entry: VocabularyEntry;
}

const EntryPage: NextPage<StaticProps> = ({ entry }) => {
  const [pronouncing, setPronouncing] = React.useState(false);

  return (
    <>
      <Head>
        <title>{entry.translation} • Spelling Ukraine</title>
        <meta
          name="description"
          content={`&quot;${entry.translation}&quot; is the correct way to spell the Ukrainian word &quot;${entry.name}&quot; in English.`}
        />
      </Head>

      <div className="flex mb-8 space-x-4">
        <Link href="/">
          <HStack>
            <FiChevronLeft size={24} />
            <div>Go back</div>
          </HStack>
        </Link>

        <Link
          href={`https://github.com/Tyrrrz/SpellingUkraine/blob/master/data/vocabulary/${entry.id}.json`}
        >
          <HStack>
            <FiEdit3 />
            <div>Edit Information</div>
          </HStack>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-6xl font-bold tracking-wide">{entry.translation}</h2>
          <button
            className="mt-3"
            onClick={() => {
              if (pronouncing) return;
              setPronouncing(true);
              pronounce(entry.translation).finally(() => setPronouncing(false));
            }}
          >
            {pronouncing ? <FiVolume2 size={32} /> : <FiVolume1 size={32} />}
          </button>
        </div>

        <div className="text-4xl tracking-wide">
          <span>{entry.name}</span>
          <span> • </span>
          <span>{entry.category}</span>
        </div>
      </div>

      <div className="flex flex-wrap space-x-8">
        <div className="p-4 border-2 rounded">
          <div>Description</div>
          <div>{entry.description}</div>
        </div>

        <div className="p-4 border-2 rounded">
          <div>Incorrect Transliterations</div>
          <div>
            {entry.mistranslations.map((invalid) => (
              <div key={invalid} className="flex">
                <FiX className="text-red-600" /> {invalid}
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-2 rounded">
          <div>External links</div>
          <div>
            <div className="flex items-center space-x-1">
              <FiExternalLink />
              <Link href={`https://wiktionary.org/wiki/${entry.translation}`}>Wiktionary</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: getVocabularyIds().map((id) => ({
      params: { id }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = ({ params }) => {
  return {
    props: {
      entry: getVocabularyEntry(params?.id as string)
    }
  };
};

export default EntryPage;
