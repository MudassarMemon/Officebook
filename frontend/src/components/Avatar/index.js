export const BLANK =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const DEFAULT_AVATAR =
  "https://facespace-fs-seeds.s3.amazonaws.com/profile_pic_default1.jpg";

function Avatar({ src, alt, className, ...props }) {
  const handleError = (e) => {
    if (e.currentTarget.src !== DEFAULT_AVATAR) e.currentTarget.src = DEFAULT_AVATAR;
  };

  return (
    <img
      {...props}
      alt={alt}
      className={className ? `avatar ${className}` : "avatar"}
      src={src || BLANK}
      onError={handleError}
    />
  );
}

export default Avatar;
