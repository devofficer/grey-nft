import Image from 'next/image';

function AssetView({ src, isAnimation, className, onClick, tokenId, isLargeView }) {
  const clickHandler = ev => {
    ev.stopPropagation();
    if (isLargeView) return;
    onClick && onClick();
  };

  return (
    <>
      {isAnimation ? (
        <video
          width='100%'
          height='100%'
          autoPlay
          loop
          muted={!isLargeView}
          controls={isLargeView}
          playsInline
          className={className}
          onClick={clickHandler}>
          <source src={src} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          width={isLargeView ? 1000 : 400}
          height={isLargeView ? 707 : 282}
          className={className}
          src={src}
          alt='asset'
          onClick={clickHandler}
        />
      )}
    </>
  );
}

export default AssetView;
