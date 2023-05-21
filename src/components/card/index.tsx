import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Character {
  id: number;
  name: string;
  species: string;
  status: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: { name: string };
  created: string;
  image: string;
}

const Card: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${currentPage}`);
        setCharacters(response.data.results);
        setTotalPages(response.data.info.pages);
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    const fetchCharactersFromPages = async (totalPages: number) => {
      const characterPromises = [];

      for (let page = 1; page <= totalPages; page++) {
        const promise = axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
        characterPromises.push(promise);
      }

      const characterResponses = await Promise.all(characterPromises);
      const allCharacters = characterResponses.flatMap((response) => response.data.results);
      console.log(allCharacters)
      return allCharacters;
    };

    fetchCharacters();
    fetchCharactersFromPages(totalPages);
  }, [currentPage, totalPages]);


  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <div className='card-grid'>
        {characters.map((character) => (
          <Link to={`/details/${character.id}`} key={character.id} className='card-container'>
            <img src={character.image} alt={character.name} />
            <div className='card-info'>
              <h2>{character.name}</h2>
            </div>
          </Link>
        ))}
      </div>
      <div className='pagination-buttons'>
        <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Card;
