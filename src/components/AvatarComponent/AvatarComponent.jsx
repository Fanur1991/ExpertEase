import { useMemo } from 'react';
import { Avatar } from 'antd';
import { API_URL as baseUrl } from '../../config';

const AvatarComponent = ({
  imageUrl,
  firstname,
  userData,
  imageClass,
  blindClass,
  characterClass,
}) => {
  const avatarCharacter = useMemo(() => {
    if (userData.user && userData.user.firstname) {
      return userData.user.firstname[0].toUpperCase();
    } else if (firstname && firstname.length > 0) {
      return firstname[0].toUpperCase();
    }
    return 'А';
  }, [firstname]);

  const renderAvatar = () => {
    if (imageUrl) {
      return (
        <img
          className={imageClass}
          src={
            imageUrl.startsWith('uploads') ? `${baseUrl}${imageUrl}` : imageUrl
          }
          alt="avatar"
        />
      );
    }
    return (
      <Avatar className={blindClass} alt="avatar">
        <span className={characterClass}>{avatarCharacter}</span>
      </Avatar>
    );
  };
  return renderAvatar();
};

export default AvatarComponent;
