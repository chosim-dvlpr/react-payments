import { css } from '@emotion/react';
import { MASTERCARD, VISA } from '../assets';
import { isRange } from '../util/isRange';
import { VALIDATION } from '../constants/validation';
import checkCardBrand from '../util/checkCardBrand';
import formatCardDisplayNumber from '../util/formatCardDisplayNumber';
import { CARD_DISPLAY_INDEX } from '../constants/cardInformation';

const cardContainerStyle = css({
  backgroundColor: '#333333',
  width: '212px',
  height: '132px',
  borderRadius: '4px',
  boxSizing: 'border-box',
  boxShadow: '3px 3px 5px 0px',
  padding: '8px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  margin: '0 auto',
});

const cardHeaderStyle = css({
  display: 'flex',
  justifyContent: 'space-between',
});

const cardIcStyle = css({
  backgroundColor: '#ddcd78',
  borderRadius: '4px',
  width: '36px',
  height: '22px',
});

const cardLogoStyle = css({
  width: '36px',
  height: '22px',
});

const cardContentStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const cardDetailStyle = css({
  height: '20px',
  color: '#ffffff',
  fontSize: '14px',
  lineHeight: '20px',
  letterSpacing: 'inherit',
  whiteSpace: 'pre-wrap',
});

const cardNumberGridStyle = css({
  display: 'grid',
  gap: '10px',
  gridTemplateColumns: 'repeat(4, 1fr)',
  justifyContent: 'center',
});

interface CardImageType {
  cardNumber: string[];
  cardPeriod: string[];
  cardOwner: string[];
}

interface CardImageTableType {
  masterCard: string;
  visa: string;
  domesticCard: string;
}

function CardImage({ cardNumber, cardPeriod, cardOwner }: CardImageType) {
  const getCardImage = () => {
    const cardImageTable: CardImageTableType = {
      masterCard: MASTERCARD,
      visa: VISA,
      domesticCard: '',
    };
    return cardImageTable[checkCardBrand(cardNumber)];
  };

  const imageUrl = getCardImage();

  const monthFormat = (month: string) => {
    const monthNumber = Number(month);
    if (month && !isRange(monthNumber, VALIDATION.singleDigit.min, VALIDATION.singleDigit.max)) {
      return '0'.repeat(2 - month.length) + month;
    }
    return month;
  };

  const periodFormat = (month: string, year: string) => {
    if (month) return [monthFormat(month), year].join('/');
  };

  return (
    <div css={cardContainerStyle}>
      {/* 헤더 */}
      <div css={cardHeaderStyle}>
        <div css={cardIcStyle}></div>
        {imageUrl && <img src={imageUrl} css={cardLogoStyle} />}
      </div>
      {/* 컨텐츠 */}
      <div css={cardContentStyle}>
        <div css={[cardDetailStyle, cardNumberGridStyle]}>
          {formatCardDisplayNumber(cardNumber, [CARD_DISPLAY_INDEX.third, CARD_DISPLAY_INDEX.fourth]).map(
            (numbers, index) => {
              return <p key={index}>{numbers}</p>;
            },
          )}
        </div>
        <p css={cardDetailStyle}>{periodFormat(cardPeriod[0], cardPeriod[1])}</p>
        <p css={cardDetailStyle}>{cardOwner}</p>
      </div>
    </div>
  );
}

export default CardImage;
