import React from 'react';
import './CastandCrew';

function CastAndCrew({ cast }) {
  return (
    <div className="cast-member">
      <h3>{cast.characterName}</h3>
      <p>Actor: {cast.name}</p>
      <img 
        src={cast.url} 
        alt={`Portrait of ${cast.name}`} 
        style={{ width: '200px', borderRadius: '10px' }} 
      />
    </div>
  );
}

// Sample data objects for multiple cast members
const castMembers = [
  {
    userId: 1,
    movieId: 31,
    name: "Chris Evans",
    characterName: "Steve Rogers / Captain America",
    url: "https://image.tmdb.org/t/p/original/3bOGNsHlrswhyW79uvIHH1V43JI.jpg",
  },
  {
    userId: 2,
    movieId: 32,
    name: "Scarlett Johansson",
    characterName: "Natasha Romanoff / Black Widow",
    url: "https://image.tmdb.org/t/p/original/6NsMbJXRlDZuDzatN2akFdGuTvx.jpg",
  },
  {
    userId: 3,
    movieId: 33,
    name: "Monique Ganderton",
    characterName: "Stunt Coordinator",
    url: "https://image.tmdb.org/t/p/original/kBhk7VQr42ge3g5iuLXsbpgWeIa.jpg",
  },
  {
     userId: 4,
     movieId: 34,
     name: "Ryan Reynolds",
     characterName: "Wade Wilson / Deadpool / Juggernaut (voice)",
     url: "https://image.tmdb.org/t/p/original/6m3hkkHmKkD4MUJhng7ojE7MLKC.jpg",
  },
  {
     userId: 5,
     movieId: 35,
     name: "Annabel Wood",
     characterName: "Stunts",
     url: "https://image.tmdb.org/t/p/original/kTj0L6pwmQX2p7N50VIbxug5l31.jpg",
  },
  {
     userId: 6,
     movieId: 36,
     name: "Atlin Mitchell",
     characterName: "Stunts",
     url: "https://image.tmdb.org/t/p/original/70EdXAk1YUPwIWfZMk1IJt011wc.jpg",
  },
  {
     userId: 7,
     movieId: 37,
     name: "Tom Hardy",
     characterName: "Eddie Brock / Venom",
     url: "https://image.tmdb.org/t/p/original/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg",
  },
  {
     userId: 8,
     movieId: 38,
     name: "Christina Petrou",
     characterName: "Stunt Double",
     url: "https://image.tmdb.org/t/p/original/dC7JHx7Q9qKa4YqdCZVvqYTUTSP.jpg",
  },
  {
    userId: 9,
    movieId: 39,
    name: "Paul Mescal",
    characterName: "Lucius Verus / Hanno",
    url:  "https://image.tmdb.org/t/p/original/pKqoQEWFygvEJeiBfLmmO3vM5Fs.jpg", 
  },
  {
    userId: 10,
    movieId: 40,
    name: "Aurélia Agel",
    characterName: "Stunts Double",
    url:  "https://image.tmdb.org/t/p/original/65jldkmfDloJqJzmWSfmk2ex2J0.jpg", 
  },
  {
    userId: 11,
    movieId: 41,
    name: "Christian Bale",
    characterName: "Bruce Wayne",
    url: "https://image.tmdb.org/t/p/original/7Pxez9J8fuPd2Mn9kex13YALrCQ.jpg",
  },
  {
    userId: 12,
    movieId: 42,
    name: "Jessie Graff",
    characterName: "Stunt",
    url: "https://image.tmdb.org/t/p/original/ePoVxfGq9LUj8RJ9FfmViNFqcBB.jpg",
  },
  {
    userId: 13,
    movieId: 43,
    name: "Ana de la Reguera",
    characterName: "Adela",
    url: "https://image.tmdb.org/t/p/original/nEacV1wuUHV6eUyErGBhniJ85JY.jpg",
  },
  {
    userId: 14,
    movie: 44,
    name: "Natalie Padilla",
    characterName: "Stunt Double",
    url: "https://image.tmdb.org/t/p/original/fhIRdqmjYC4sTZyRGrHwBCwnnqm.jpg",
  },
  {
    userId: 15,
    movie: 45,
    name: "Timothée Chalamet",
    characterName: "Paul Atreides",
    url: "https://image.tmdb.org/t/p/original/BE2sdjpgsa2rNTFa66f7upkaOP.jpg",
  },
  {
    userId: 16,
    movie: 46,
    name: "Lauren Okadigbo",
    characterName: "Stunt Double",
    url: "https://image.tmdb.org/t/p/original/3NCpgx7ymqjBStqDFNgl8jkk1ld.jpg",
  },
  {
    userId: 17,
    movie: 47,
    name: "Jamie Foxx",
    characterName: "Joe Gardner (voice)",
    url: "https://image.tmdb.org/t/p/original/zD8Nsy4Xrghp7WunwpCj5JKBPeU.jpg",
  },
  {
    userId: 18,
    movie: 48,
    name: "John Mulaney",
    characterName: "Joe Gardner (voice)",
    url: "https://image.tmdb.org/t/p/original/nYa0D4nwtw95p4G9WzkmEoIM1NA.jpg",
  }
];

// Using the component to render each cast member
function App() {
  return (
    <div className="App">
      {castMembers.map((castMember, index) => (
        <CastAndCrew key={index} cast={castMember} />
      ))}
    </div>
  );
}

export default App;
