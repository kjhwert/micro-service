import React, { ComponentProps } from 'react';
import styled from 'styled-components';
import priceUtils from '../../../utils/priceUtils';
import getCountRangeWithUnit from '../../../utils/countRangeUtils';
import IconStar from 'assets/IconStar';
import IconHeart from 'assets/IconHeart';
import CardScrap from '../../CardSubComponents/CardScrap';
import CardBadges from '../../CardSubComponents/CardBadges';

export type EventHorizontalCardProps = ComponentProps<typeof CardScrap> &
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

    onEventClick: (e: React.MouseEvent<HTMLDivElement>) => void;

    isVATVisible: boolean | undefined;
    isNewEvent: boolean | undefined;
    scrapIgnore?: boolean;
  };

const EventHorizontalCard = ({
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
  badges,
  isVATVisible = false,
  isNewEvent = false,
  scrapIgnore = false,
}: EventHorizontalCardProps) => {
  const hasEventStats = stats.totalReviewCount > 0 || stats.scrapCount > 0;

  return (
    <Layout onClick={onEventClick}>
      <ThumbnailSection>
        {isNewEvent && <IconNew>NEW</IconNew>}
        <img src={imageUrls.thumbnailUrl} width={80} height={80} className="rounded-br-[24px]" alt="thumbnail" />
        <div className="absolute right-0 bottom-0">
          <CardScrap isScrap={isScrap} onScrapClick={onScrapClick} scrapIgnore={scrapIgnore} />
        </div>
      </ThumbnailSection>
      <InfoSection>
        <InfoHospital>
          <span className="line-clamp-1">{hospitalName}</span>
          <img
            width={3}
            height={3}
            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMyIgaGVpZ2h0PSI0IiB2aWV3Qm94PSIwIDAgMyA0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8Y2lyY2xlIGN4PSIxLjUiIGN5PSIyIiByPSIxLjUiIGZpbGw9IiNFMEUwRTAiLz4KPC9zdmc+Cg=="
            alt="icon-round-dot"
          />
          <span className="line-clamp-1">{hospitalLandmark}</span>
        </InfoHospital>

        <section className="mt-[2px]">
          <h2 className="text-[14px] leading-[18px] font-semibold line-clamp-1">{eventName}</h2>
          <div className="flex gap-[6px] items-end mt-[2px]">
            <span className="font-semibold text-[16px] leading-[24px] text-[#121212]">
              {priceUtils.formatWithUnit(eventPrice, { isKoreanFormat: isKoreanPriceFormat })}
            </span>
            {isVATVisible && <span className="text-[11px] leading-[18px] text-[#bdbdbd]">VAT 포함</span>}
          </div>
        </section>

        {hasEventStats && (
          <section className="flex gap-[4px] mt-[4px]">
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

        <CardBadges badges={badges} exclusiveBadgeText={exclusiveBadgeText} reserveBadgeText={reserveBadgeText} />
      </InfoSection>
    </Layout>
  );
};

const Layout = styled.article`
  width: 100%;
  cursor: pointer;
  display: flex;
  gap: 12px;
`;

const ThumbnailSection = styled.section`
  position: relative;
  width: 80px;
  height: 80px;
`;

const InfoSection = styled.section``;

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
const InfoHospital = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  color: #757575;
  gap: 4px;
  margin-top: 3px;
  margin-bottom: 1px;
`;

export default EventHorizontalCard;
