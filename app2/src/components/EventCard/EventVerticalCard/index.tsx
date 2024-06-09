import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import IconStar from 'assets/IconStar';
import getCountRangeWithUnit from 'utils/countRangeUtils';
import priceUtils from 'utils/priceUtils';
import CardBadges from '../../CardSubComponents/CardBadges';
import CardScrap from '../../CardSubComponents/CardScrap';
import IconHeart from "assets/IconHeart";

type EventVerticalCardProps = ComponentProps<typeof CardScrap> &
  ComponentProps<typeof CardBadges> & {
    imageUrls: {
      thumbnailUrl: string;
    };
    hospitalName: string;
    hospitalLandmark: string;
    eventName: string;
    eventPrice: number;
    isKoreanPriceFormat: boolean;
    stats: {
      reviewAverage: number;
      totalReviewCount: number;
      scrapCount: number;
    };
    exclusiveBadgeText: string;
    reserveBadgeText: string;

    onEventClick: (e: React.MouseEvent<HTMLDivElement>) => void;

    isVATVisible: boolean | undefined;
    isNewEvent: boolean | undefined;
    eventComment?: string;
  };

const EventVerticalCard = ({
  imageUrls,
  isScrap,
  hospitalLandmark,
  hospitalName,
  eventName,
  eventPrice,
  isKoreanPriceFormat,
  stats,
  exclusiveBadgeText,
  reserveBadgeText,
  onScrapClick,
  onEventClick,
  scrapIgnore,
  badges,

  isVATVisible = false,
  isNewEvent = false,
  eventComment,
}: EventVerticalCardProps) => {
  const [isScrapAnimationPlaying, setIsScrapAnimationPlaying] = React.useState(false);

  const hasEventStats = stats.totalReviewCount > 0 || stats.scrapCount > 0;

  const handleScrapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();

    onScrapClick(e);

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
    <article className={`flex flex-col w-[140px] cursor-pointer`} onClick={onEventClick}>
      <section className="relative">
        {isNewEvent && <IconNew>NEW</IconNew>}
        <img
          className="rounded-br-[24px]"
          src={imageUrls.thumbnailUrl}
          alt="event-thumbnail"
          width={140}
          height={140}
        />
        <div className="absolute right-0 bottom-0">
          <CardScrap isScrap={isScrap} onScrapClick={onScrapClick} scrapIgnore={scrapIgnore} />
        </div>
      </section>

      <section className="flex items-center text-gray600 text-[10px] gap-[4px] mt-[14px]">
        <span className="line-clamp-1">{hospitalName}</span>
        <img
          width={3}
          height={3}
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMyIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgMyA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSIxLjUiIGN5PSIyIiByPSIxLjUiIGZpbGw9IiNFMEUwRTAiLz4KPC9zdmc+Cg=="
        />
        <span className="line-clamp-1">{hospitalLandmark}</span>
      </section>

      <section className="flex flex-col gap-[6px] mt-[2px]">
        <section>
          <h2 className="text-[14px] leading-[18px] font-semibold line-clamp-2">{eventName}</h2>
          <div className="flex gap-[6px] items-end mt-[6px]">
            <span className="font-semibold text-[16px] leading-[24px] text-[#121212]">
              {priceUtils.formatWithUnit(eventPrice, { isKoreanFormat: isKoreanPriceFormat })}
            </span>
            {isVATVisible && <span className="text-[11px] leading-[18px] text-[#bdbdbd]">VAT 포함</span>}
          </div>
        </section>

        {hasEventStats && (
          <section className="flex gap-[4px]">
            {stats.totalReviewCount > 0 && (
              <div className="flex items-center gap-[4px]">
                <IconStar />
                <div className="flex">
                  <span className="text-[12px] font-semibold leading-[18px]">{stats.reviewAverage}</span>
                  <span className="text-[11px] leading-[18px] text-[#424242]">
                    ({getCountRangeWithUnit(stats.totalReviewCount)})
                  </span>
                </div>
              </div>
            )}
            {stats.scrapCount > 0 && (
              <div className="flex items-center gap-[4px]">
                <IconHeart width={14} height={14} color="#E0E0E0" />
                <span className="text-[11px] leading-[18px] text-[#424242]">
                  {getCountRangeWithUnit(stats.scrapCount)}
                </span>
              </div>
            )}
          </section>
        )}

        {Boolean(eventComment) && (
          <section>
            <p className="text-[12px] leading-[16px] text-[#616161] line-clamp-2">{eventComment}</p>
          </section>
        )}
      </section>

      <CardBadges badges={badges} exclusiveBadgeText={exclusiveBadgeText} reserveBadgeText={reserveBadgeText} />
    </article>
  );
};

const IconNew = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 4px 6px;
  background-color: #ff2488;
  color: #ffffff;
  font-size: 10px;
  line-height: 13px;
  font-weight: 600;
  border-radius: 0 0 4px 0;
`;

const IconScrap = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  right: 0;
  bottom: 0;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.2);
`;

export default EventVerticalCard;
