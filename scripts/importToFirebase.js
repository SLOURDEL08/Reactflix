const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyCHNsGf5xuq68J50r6OLqYD7c39M6mxXWo",
  authDomain: "reactflix-67820.firebaseapp.com",
  projectId: "reactflix-67820",
  storageBucket: "reactflix-67820.firebasestorage.app",
  messagingSenderId: "375987397800",
  appId: "1:375987397800:web:ce2ce269957315e93f8e9d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Vos données
const data = {
  movies: [
    {
      "id": 1,
      "title": "Inception",
      "slug": "inception",
      "type": "movie",
      "description": "Un voleur expérimenté dans l'art de l'extraction propose un dernier coup qui pourrait lui permettre de retrouver sa vie d'avant.",
      "releaseDate": "2010-07-16",
      "director": "Christopher Nolan",
      "cast": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page", "Tom Hardy"],
      "rating": 8.8,
      "duration": "2h 28min",
      "genres": ["Science Fiction", "Action", "Thriller"],
      "poster": "/content/movies/inception/poster.webp",
      "wallpaper1": "/content/movies/inception/wallpaper1.webp",
      "wallpaper2": "/content/movies/inception/wallpaper2.webp",
      "videoSrc": "/content/movies/inception/trailer.mp4",
      "titleImage": "/content/movies/inception/title.webp",
      "maturityRating": "PG-13",
      "language": "Anglais",
      "productionCompany": "Warner Bros."
    },
    {
    "id": 2,
    "title": "The Godfather",
    "slug": "the-godfather",
    "type": "movie",
    "description": "Le patriarche d'une dynastie du crime organise le transfert du contrôle de son empire à son fils.",
    "releaseDate": "1972-03-15",
    "director": "Francis Ford Coppola",
    "cast": ["Marlon Brando", "Al Pacino", "James Caan"],
    "rating": 9.2,
    "duration": "2h 55min",
    "genres": ["Crime", "Drame"],
    "poster": "/content/movies/godfather/poster.webp",
    "wallpaper1": "/content/movies/godfather/wallpaper1.webp",
    "wallpaper2": "/content/movies/godfather/wallpaper2.webp",
    "videoSrc": "/content/movies/godfather/trailer.mp4",
    "titleImage": "/content/movies/godfather/title.webp",
    "maturityRating": "R",
    "language": "Anglais, Italien",
    "productionCompany": "Paramount Pictures"
  },
  {
    "id": 3,
    "title": "Pulp Fiction",
    "slug": "pulp-fiction",
    "type": "movie",
    "description": "Les vies de deux tueurs, d'un boxeur, de la femme d'un gangster et d'un couple de braqueurs s'entremêlent.",
    "releaseDate": "1994-10-14",
    "director": "Quentin Tarantino",
    "cast": ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    "rating": 8.9,
    "duration": "2h 34min",
    "genres": ["Crime", "Drame"],
    "poster": "/content/movies/pulpfiction/poster.webp",
    "wallpaper1": "/content/movies/pulpfiction/wallpaper1.webp",
    "wallpaper2": "/content/movies/pulpfiction/wallpaper2.webp",
    "videoSrc": "/content/movies/pulpfiction/trailer.mp4",
    "titleImage": "/content/movies/pulpfiction/title.webp",
    "maturityRating": "R",
    "language": "Anglais",
    "productionCompany": "Miramax"
  },
  {
    "id": 4,
    "title": "Interstellar",
    "slug": "interstellar",
    "type": "movie",
    "description": "Un groupe d'explorateurs utilise un trou de ver pour traverser l'espace et sauver l'humanité.",
    "releaseDate": "2014-11-07",
    "director": "Christopher Nolan",
    "cast": ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    "rating": 8.6,
    "duration": "2h 49min",
    "genres": ["Science Fiction", "Aventure", "Drame"],
    "poster": "/content/movies/interstellar/poster.webp",
    "wallpaper1": "/content/movies/interstellar/wallpaper1.webp",
    "wallpaper2": "/content/movies/interstellar/wallpaper2.webp",
    "videoSrc": "/content/movies/interstellar/trailer.mp4",
    "titleImage": "/content/movies/interstellar/title.webp",
    "maturityRating": "PG-13",
    "language": "Anglais",
    "productionCompany": "Paramount Pictures"
  },
  {
    "id": 5,
    "title": "The Matrix",
    "slug": "the-matrix",
    "type": "movie",
    "description": "Un programmeur découvre que la réalité telle que nous la connaissons est une simulation.",
    "releaseDate": "1999-03-31",
    "director": "The Wachowskis",
    "cast": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    "rating": 8.7,
    "duration": "2h 16min",
    "genres": ["Science Fiction", "Action"],
    "poster": "/content/movies/matrix/poster.webp",
    "wallpaper1": "/content/movies/matrix/wallpaper1.webp",
    "wallpaper2": "/content/movies/matrix/wallpaper2.webp",
    "videoSrc": "/content/movies/matrix/trailer.mp4",
    "titleImage": "/content/movies/matrix/title.webp",
    "maturityRating": "R",
    "language": "Anglais",
    "productionCompany": "Warner Bros."
  },
  {
    "id": 6,
    "title": "The Shawshank Redemption",
    "slug": "the-shawshank-redemption",
    "type": "movie",
    "description": "L'histoire d'un banquier condamné à perpétuité pour un crime qu'il n'a pas commis, et son extraordinaire amitié avec un codétenu.",
    "releaseDate": "1994-09-23",
    "director": "Frank Darabont",
    "cast": ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    "rating": 9.3,
    "duration": "2h 22min",
    "genres": ["Drame"],
    "poster": "/content/movies/shaw/poster.webp",
    "wallpaper1": "/content/movies/shaw/wallpaper1.webp",
    "wallpaper2": "/content/movies/shaw/wallpaper2.webp",
    "videoSrc": "/content/movies/shaw/trailer.mp4",
    "titleImage": "/content/movies/shaw/title.webp",
    "maturityRating": "R",
    "language": "Anglais",
    "productionCompany": "Columbia Pictures"
  },
  {
    "id": 7,
    "title": "Gladiator",
    "slug": "gladiator",
    "type": "movie",
    "description": "Un général romain devenu esclave doit se venger de l'empereur corrompu qui a assassiné sa famille.",
    "releaseDate": "2000-05-05",
    "director": "Ridley Scott",
    "cast": ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"],
    "rating": 8.5,
    "duration": "2h 35min",
    "genres": ["Action", "Aventure", "Drame"],
    "poster": "/content/movies/gladiator/poster.webp",
    "wallpaper1": "/content/movies/gladiator/wallpaper1.webp",
    "wallpaper2": "/content/movies/gladiator/wallpaper2.webp",
    "videoSrc": "/content/movies/gladiator/trailer.mp4",
    "titleImage": "/content/movies/gladiator/title.webp",
    "maturityRating": "R",
    "language": "Anglais",
    "productionCompany": "DreamWorks Pictures"
  },
  {
    "id": 8,
    "title": "Le Silence des Agneaux",
    "slug": "le-silence-des-agneaux",
    "type": "movie",
    "description": "Une jeune recrue du FBI sollicite l'aide d'un tueur en série emprisonné pour arrêter un autre tueur en série.",
    "releaseDate": "1991-02-14",
    "director": "Jonathan Demme",
    "cast": ["Jodie Foster", "Anthony Hopkins", "Scott Glenn"],
    "rating": 8.6,
    "duration": "1h 58min",
    "genres": ["Crime", "Drame", "Thriller"],
    "poster": "/content/movies/silence/poster.webp",
    "wallpaper1": "/content/movies/silence/wallpaper1.webp",
    "wallpaper2": "/content/movies/silence/wallpaper2.webp",
    "videoSrc": "/content/movies/silence/trailer.mp4",
    "titleImage": "/content/movies/silence/title.webp",
    "maturityRating": "R",
    "language": "Anglais",
    "productionCompany": "Orion Pictures"
  },
  {
    "id": 9,
    "title": "Avatar",
    "slug": "avatar",
    "type": "movie",
    "description": "Un marine paraplégique envoyé sur la lune Pandora se retrouve déchiré entre suivre ses ordres et protéger le monde qu'il considère comme sa maison.",
    "releaseDate": "2009-12-18",
    "director": "James Cameron",
    "cast": ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver"],
    "rating": 7.8,
    "duration": "2h 42min",
    "genres": ["Action", "Aventure", "Fantaisie", "Science Fiction"],
    "poster": "/content/movies/avatar/poster.webp",
    "wallpaper1": "/content/movies/avatar/wallpaper1.webp",
    "wallpaper2": "/content/movies/avatar/wallpaper2.webp",
    "videoSrc": "/content/movies/avatar/trailer.mp4",
    "titleImage": "/content/movies/avatar/title.webp",
    "maturityRating": "PG-13",
    "language": "Anglais",
    "productionCompany": "20th Century Fox"
  },
  {
    "id": 10,
    "title": "Fight Club",
    "slug": "fight-club",
    "type": "movie",
    "description": "Un employé de bureau insomniaque et un fabriquant de savon charismatique forment un club de combat clandestin qui devient bien plus.",
    "releaseDate": "1999-10-15",
    "director": "David Fincher",
    "cast": ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"],
    "rating": 8.8,
    "duration": "2h 19min",
    "genres": ["Drame", "Thriller"],
    "poster": "/content/movies/fightclub/poster.webp",
    "wallpaper1": "/content/movies/fightclub/wallpaper1.webp",
    "wallpaper2": "/content/movies/fightclub/wallpaper2.webp",
    "videoSrc": "/content/movies/fightclub/trailer.mp4",
    "titleImage": "/content/movies/fightclub/title.webp",
    "maturityRating": "R",
    "language": "Anglais",
    "productionCompany": "20th Century Fox"
  }
  ],
  series: [
    {
      "id": 11,
      "title": "Breaking Bad",
      "slug": "breaking-bad",
      "type": "serie",
      "description": "Un professeur de chimie devient un baron de la drogue après avoir reçu un diagnostic de cancer.",
      "startYear": 2008,
      "endYear": 2013,
      "creator": "Vince Gilligan",
      "cast": ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
      "rating": 9.5,
      "seasons": 5,
      "episodes": 62,
      "genres": ["Crime", "Drame", "Thriller"],
      "poster": "/content/series/breakingbad/poster.webp",
      "wallpaper1": "/content/series/breakingbad/wallpaper1.webp",
      "wallpaper2": "/content/series/breakingbad/wallpaper2.webp",
      "videoSrc": "/content/series/breakingbad/trailer.mp4",
      "titleImage": "/content/series/breakingbad/title.webp",
      "maturityRating": "TV-MA",
      "language": "Anglais",
      "network": "AMC",
      "status": "Terminée",
      "episodeLength": "49min"
    }
    ,
  {
    "id": 12,
    "title": "Game of Thrones",
    "slug": "game-of-thrones",
    "type": "serie",
    "description": "Plusieurs familles nobles rivalisent pour le contrôle du Trône de Fer.",
    "startYear": 2011,
    "endYear": 2019,
    "creator": "David Benioff, D.B. Weiss",
    "cast": ["Emilia Clarke", "Kit Harington", "Peter Dinklage"],
    "rating": 9.3,
    "seasons": 8,
    "episodes": 73,
    "genres": ["Action", "Aventure", "Drame", "Fantaisie"],
    "poster": "/content/series/got/poster.webp",
    "wallpaper1": "/content/series/got/wallpaper1.webp",
    "wallpaper2": "/content/series/got/wallpaper2.webp",
    "videoSrc": "/content/series/got/trailer.mp4",
    "titleImage": "/content/series/got/title.webp",
    "maturityRating": "TV-MA",
    "language": "Anglais",
    "network": "HBO",
    "status": "Terminée",
    "episodeLength": "60min"
  },
  {
    "id": 13,
    "title": "Stranger Things",
    "slug": "stranger-things",
    "type": "serie",
    "description": "Des événements mystérieux se produisent dans une petite ville après la disparition d'un jeune garçon.",
    "startYear": 2016,
    "endYear": null,
    "creator": "The Duffer Brothers",
    "cast": ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
    "rating": 8.7,
    "seasons": 4,
    "episodes": 34,
    "genres": ["Drame", "Fantaisie", "Horreur"],
    "poster": "/content/series/strangerthings/poster.webp",
    "wallpaper1": "/content/series/strangerthings/wallpaper1.webp",
    "wallpaper2": "/content/series/strangerthings/wallpaper2.webp",
    "videoSrc": "/content/series/strangerthings/trailer.mp4",
    "titleImage": "/content/series/strangerthings/title.webp",
    "maturityRating": "TV-14",
    "language": "Anglais",
    "network": "Netflix",
    "status": "En cours",
    "episodeLength": "50min"
  },
  {
    "id": 14,
    "title": "The Crown",
    "slug": "the-crown",
    "type": "serie",
    "description": "L'histoire de la famille royale britannique à travers le règne d'Elizabeth II.",
    "startYear": 2016,
    "endYear": 2023,
    "creator": "Peter Morgan",
    "cast": ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
    "rating": 8.7,
    "seasons": 6,
    "episodes": 60,
    "genres": ["Biographie", "Drame", "Histoire"],
    "poster": "/content/series/thecrown/poster.webp",
    "wallpaper1": "/content/series/thecrown/wallpaper1.webp",
    "wallpaper2": "/content/series/thecrown/wallpaper2.webp",
    "videoSrc": "/content/series/thecrown/trailer.mp4",
    "titleImage": "/content/series/thecrown/title.webp",
    "maturityRating": "TV-MA",
    "language": "Anglais",
    "network": "Netflix",
    "status": "Terminée",
    "episodeLength": "58min"
  },
  {
    "id": 15,
    "title": "Black Mirror",
    "slug": "black-mirror",
    "type": "serie",
    "description": "Une série d'anthologie explorant les conséquences inattendues des nouvelles technologies.",
    "startYear": 2011,
    "endYear": null,
    "creator": "Charlie Brooker",
    "cast": ["Various"],
    "rating": 8.8,
    "seasons": 6,
    "episodes": 27,
    "genres": ["Science Fiction", "Thriller", "Drame"],
    "poster": "/content/series/blackmirror/poster.webp",
    "wallpaper1": "/content/series/blackmirror/wallpaper1.webp",
    "wallpaper2": "/content/series/blackmirror/wallpaper2.webp",
    "videoSrc": "/content/series/blackmirror/trailer.mp4",
    "titleImage": "/content/series/blackmirror/title.webp",
    "maturityRating": "TV-MA",
    "language": "Anglais",
    "network": "Netflix",
    "status": "En cours",
    "episodeLength": "60min"
  },
   {
    "id": 16,
    "title": "The Walking Dead",
    "slug": "the-walking-dead",
    "type": "serie",
    "description": "Un groupe de survivants tente de rester en vie dans un monde post-apocalyptique envahi par les zombies.",
    "startYear": 2010,
    "endYear": 2022,
    "creator": "Frank Darabont",
    "cast": ["Andrew Lincoln", "Norman Reedus", "Melissa McBride"],
    "rating": 8.2,
    "seasons": 11,
    "episodes": 177,
    "genres": ["Drame", "Horreur", "Thriller"],
    "poster": "/content/series/walkingdead/poster.webp",
    "wallpaper1": "/content/series/walkingdead/wallpaper1.webp",
    "wallpaper2": "/content/series/walkingdead/wallpaper2.webp",
    "videoSrc": "/content/series/walkingdead/trailer.mp4",
    "titleImage": "/content/series/walkingdead/title.webp",
    "maturityRating": "TV-MA",
    "language": "Anglais",
    "network": "AMC",
    "status": "Terminée",
    "episodeLength": "45min"
  },
  {
    "id": 17,
    "title": "The Witcher",
    "slug": "the-witcher",
    "type": "serie",
    "description": "Les aventures de Geralt de Riv, un chasseur de monstres mutant qui lutte pour trouver sa place dans un monde où les humains sont souvent plus méchants que les bêtes.",
    "startYear": 2019,
    "endYear": null,
    "creator": "Lauren Schmidt Hissrich",
    "cast": ["Henry Cavill", "Freya Allan", "Anya Chalotra"],
    "rating": 8.2,
    "seasons": 3,
    "episodes": 24,
    "genres": ["Action", "Aventure", "Fantaisie"],
    "poster": "/content/series/thewitcher/poster.webp",
    "wallpaper1": "/content/series/thewitcher/wallpaper1.webp",
    "wallpaper2": "/content/series/thewitcher/wallpaper2.webp",
    "videoSrc": "/content/series/thewitcher/trailer.mp4",
    "titleImage": "/content/series/thewitcher/title.webp",
    "maturityRating": "TV-MA",
    "language": "Anglais",
    "network": "Netflix",
    "status": "En cours",
    "episodeLength": "60min"
  },

    {
    "id": 18,
    "title": "Peaky Blinders",
    "slug": "peaky-blinders",
    "type": "serie",
    "description": "Une famille de gangsters de Birmingham étend son empire criminel dans l'Angleterre de l'après-Première Guerre mondiale.",
    "startYear": 2013,
    "endYear": 2022,
    "creator": "Steven Knight",
    "cast": ["Cillian Murphy", "Paul Anderson", "Helen McCrory"],
    "rating": 8.8,
    "seasons": 6,
    "episodes": 36,
    "genres": ["Crime", "Drame"],
    "poster": "/content/series/peakyblinders/poster.webp",
    "wallpaper1": "/content/series/peakyblinders/wallpaper1.webp",
    "wallpaper2": "/content/series/peakyblinders/wallpaper2.webp",
    "videoSrc": "/content/series/peakyblinders/trailer.mp4",
    "titleImage": "/content/series/peakyblinders/title.webp",
    "maturityRating": "TV-MA",
    "language": "Anglais",
    "network": "BBC",
    "status": "Terminée",
    "episodeLength": "60min"
  },

  {
    "id": 19,
    "title": "Westworld",
    "slug": "westworld",
    "type": "serie",
    "description": "Dans un parc d'attractions futuriste, des androïdes se rebellent contre leurs créateurs.",
    "startYear": 2016,
    "endYear": 2022,
    "creator": "Jonathan Nolan, Lisa Joy",
    "cast": ["Evan Rachel Wood", "Thandiwe Newton", "Jeffrey Wright"],
    "rating": 8.6,
    "seasons": 4,
    "episodes": 36,
    "genres": ["Drame", "Science Fiction", "Western"],
    "poster": "/content/series/westworld/poster.webp",
    "wallpaper1": "/content/series/westworld/wallpaper1.webp",
    "wallpaper2": "/content/series/westworld/wallpaper2.webp",
    "videoSrc": "/content/series/westworld/trailer.mp4",
    "titleImage": "/content/series/westworld/title.webp",
    "maturityRating": "TV-MA",
    "language": "Anglais",
    "network": "HBO",
    "status": "Terminée",
    "episodeLength": "60min"
  },
  {
    "id": 20,
    "title": "Dark",
    "slug": "dark",
    "type": "serie",
    "description": "La disparition d'enfants dans une petite ville allemande révèle les relations brisées et les vies doubles de quatre familles liées par un mystère s'étendant sur trois générations.",
    "startYear": 2017,
    "endYear": 2020,
    "creator": "Baran bo Odar, Jantje Friese",
    "cast": ["Louis Hofmann", "Oliver Masucci", "Jördis Triebel"],
    "rating": 8.8,
    "seasons": 6,
    "episodes": 26,
    "genres": ["Crime", "Drame", "Mystère", "Science Fiction"],
    "poster": "/content/series/dark/poster.webp",
    "wallpaper1": "/content/series/dark/wallpaper1.webp",
    "wallpaper2": "/content/series/dark/wallpaper2.webp",
    "videoSrc": "/content/series/dark/trailer.mp4",
    "titleImage": "/content/series/dark/title.webp",
    "maturityRating": "TV-MA",
    "language": "Allemand",
    "network": "Netflix",
    "status": "Terminée",
    "episodeLength": "60min"
  }
  ]
};

const importToFirebase = async () => {
  try {
    // Import des films un par un
    console.log('Début import films...');
    for (const movie of data.movies) {
      try {
        await setDoc(doc(db, 'movies', movie.slug), {
          ...movie,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log(`Film importé: ${movie.title}`);
      } catch (error) {
        console.error(`Erreur lors de l'import du film ${movie.title}:`, error);
      }
    }
    console.log('Import des films terminé');

    // Import des séries un par un
    console.log('Début import séries...');
    for (const serie of data.series) {
      try {
        await setDoc(doc(db, 'series', serie.slug), {
          ...serie,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log(`Série importée: ${serie.title}`);
      } catch (error) {
        console.error(`Erreur lors de l'import de la série ${serie.title}:`, error);
      }
    }
    console.log('Import des séries terminé');

    console.log('Import terminé avec succès!');
    process.exit(0);
  } catch (error) {
    console.error('Erreur lors de l\'import:', error);
    process.exit(1);
  }
};

// Exécuter l'import
importToFirebase();