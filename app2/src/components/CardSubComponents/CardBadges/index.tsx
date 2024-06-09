import IconExclusiveBadge from 'assets/IconExclusiveBadge';
import IconReserveBadge from 'assets/IconReserveBadge';
import React from 'react';

interface CardBadgesProps {
  badges?: string[];

  exclusiveBadgeText: string;
  reserveBadgeText: string;
}

const CardBadges = ({ badges = [], exclusiveBadgeText, reserveBadgeText }: CardBadgesProps) => {
  const hasBadge = (code: string) => {
    return badges.some((badge) => badge === code);
  };

  return (
    <section className="mt-[8px] flex items-center gap-[4px]">
      {hasBadge('SYSTEM_EXCLUSIVE') && (
        <div className="flex items-center py-[3px] px-[5px] border border-solid border-gray200 rounded-[2px] gap-[2px]">
          <IconExclusiveBadge />
          <span className="text-[11px] font-medium leading-[13px] text-[#121212]">{exclusiveBadgeText}</span>
        </div>
      )}
      {hasBadge('RESERVATION_MOBILE') && (
        <div className="flex items-center py-[3px] px-[5px] border border-solid border-gray200 rounded-[2px] gap-[2px]">
          <IconReserveBadge />
          <span className="text-[11px] font-medium leading-[13px] text-[#121212]">{reserveBadgeText}</span>
        </div>
      )}
    </section>
  );
};

export default CardBadges;
