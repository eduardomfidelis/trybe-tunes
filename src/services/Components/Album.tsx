import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import getMusics from '../musicsAPI';
import { AlbumType, SongType } from '../../types';
import MusicCard from './MusicCard';

function Album() {
  const { id } = useParams<{ id: string }>();
  const [albumInfo, setAlbumInfo] = useState<AlbumType | null>(null);
  const [songList, setSongList] = useState<SongType[]>();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const [albumData, ...MusicList] = await getMusics(id);
        setAlbumInfo(albumData);
        setSongList(MusicList);
        setIsLoading(false);
      };
      fetchData();
    }
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <h2 data-testid="artist-name">{albumInfo?.artistName}</h2>
          <h2 data-testid="album-name">{albumInfo?.collectionName}</h2>
          {songList?.map((song) => (
            <MusicCard
              key={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Album;
