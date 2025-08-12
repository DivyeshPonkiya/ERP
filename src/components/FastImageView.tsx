import React, {memo, useState} from 'react';
import FastImage from 'react-native-fast-image';
interface FastImageViewProps {
  source?: any | object;
  style?: any | object;
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center';
  setPhotoLoad?: (loaded: boolean) => void;
}

const FastImageView: React.FC<FastImageViewProps> = ({
  source,
  style,
  resizeMode = 'cover',
  setPhotoLoad,
}) => {
  const [errorImage, setErrorImage] = useState('');
  const imageShow = errorImage ? errorImage : source;

  return (
    <FastImage
      style={style}
      source={{
        uri: imageShow,
        priority: FastImage.priority.normal,
      }}
      resizeMode={resizeMode}
      onLoadStart={() => {
        setPhotoLoad?.(true);
      }}
      onLoadEnd={() => {
        setPhotoLoad?.(false);
      }}
      onError={() => {
        setErrorImage('');
      }}
    />
  );
};

export default memo(FastImageView);
