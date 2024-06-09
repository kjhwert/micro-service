import IconHeart from 'assets/IconHeart';
// import scrapAnimation from 'assets/animations/scrap_thumbnail.json';
import React from 'react';
import styled from 'styled-components';
// import Lottie from 'react-lottie';

interface CardScrapProps {
  scrapIgnore?: boolean; // NOTE WEB M1 version 때문에 추가됨.
  isScrap: boolean;
  onScrapClick: (e: React.MouseEvent<HTMLImageElement>) => void;
}

const CardScrap = ({ isScrap, onScrapClick, scrapIgnore = false }: CardScrapProps) => {
  const [isScrapAnimationPlaying, setIsScrapAnimationPlaying] = React.useState(false);

  const handleScrapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    onScrapClick(e);

    if (scrapIgnore) {
      return;
    }

    if (!isScrap) {
      new Promise((resolve) => {
        setIsScrapAnimationPlaying(true);
        setTimeout(() => {
          resolve(true);
        }, 2000);
      }).then(() => {
        setIsScrapAnimationPlaying(false);
      });
    }
  };

  return (
    <IconScrap onClick={handleScrapClick}>
      {isScrap ? <IconHeart /> : <IconHeart.OnlyBorder />}
      {isScrapAnimationPlaying && (
        <div className="absolute">
          {/*<Lottie*/}
          {/*  options={{*/}
          {/*    loop: true,*/}
          {/*    autoplay: true,*/}
          {/*    animationData: scrapAnimation,*/}
          {/*  }}*/}
          {/*  height={51}*/}
          {/*  width={51}*/}
          {/*/>*/}
        </div>
      )}
    </IconScrap>
  );
};

const IconScrap = styled.div`
  min-width: 30px;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export default CardScrap;
