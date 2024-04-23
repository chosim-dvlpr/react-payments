import { CARD_NUMBER, CARD_OWNER, CARD_PERIOD, PERIOD } from '../constants/inputInformation';

export type CardDetailType = typeof CARD_NUMBER | typeof CARD_PERIOD | typeof CARD_OWNER;
export type informationSectionType = typeof CARD_NUMBER.type | typeof CARD_PERIOD.type | typeof CARD_OWNER.type;
export type InformationDetailType = 'number' | 'owner' | 'month' | 'year';

export const cardBrand = {
  visa: 'visa',
  masterCard: 'masterCard',
  domesticCard: 'domesticCard',
} as const;

type Union<T> = T[keyof T];

export type CardBrandType = Union<typeof cardBrand>;
export type PeriodType = typeof PERIOD;


export interface InputChangePropsType {
  value: string;
  index: number;
  inputSection?: InformationDetailType;
}