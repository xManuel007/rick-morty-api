import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
  };
  location: { name: string };
  created: string;
  image: string;
}

const CardDetails: React.FC = () => {
  const [character, setCharacter] = useState<Character | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        setCharacter(response.data);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  const getStatus = (): string => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    return  character.status === 'Alive' ? 'status Alive' : 'status Dead';
  }

  return (
    <div className='cardDetails'>
      <div className='cardDetails-container'>
        <div>
          <img src={character.image} alt={character.name}/>
        </div>
        <div className='cardDetails-info'>
          <div className='cardDetails-name'>{character.name} | {character.status} <div className={getStatus() }></div></div>
          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          {character.type && <p>Type: {character.type}</p>}
          <p>Origin: {character.origin.name}</p>
          <p>Actual Location: {character.location.name}</p>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
