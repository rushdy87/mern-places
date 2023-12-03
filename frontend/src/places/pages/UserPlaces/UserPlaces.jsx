import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PlaceList from '../../components/PlaceList/PlaceList';
import { useHttpClient } from '../../../shared/hooks';
import {
  ErrorModal,
  LoadingSpinner,
} from '../../../shared/components/UIElements';

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { userId } = useParams();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { places } = await sendRequest(
          `http://localhost:3030/api/places/user/${userId}`
        );

        setLoadedPlaces(places.filter((place) => place.creator === userId));
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading ? (
        <LoadingSpinner asOverlay />
      ) : (
        <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />
      )}
    </>
  );
};

export default UserPlaces;
