import { useState } from 'react';
import './App.css';
import './reset.css';
import InputGroup from './components/InputGroup';
import CardImage from './components/CardImage';
import { css } from '@emotion/react';
import { InformationDetailType } from './types/card';
import { CardNumberType, CardOwnerType, CardPeriodType } from './types/state';
import validateInput from './validations/validateInput';
import { PERIOD } from './constants/inputInformation';

const appContainerStyle = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  padding: '31px',
  gap: '45px',
  width: '376px',
});

const appStyle = css({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const appInputStyle = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
});

interface HandleCardInputType {
  value: string;
  index: number;
  inputSection: InformationDetailType;
}

interface HandleCardErrorType {
  isError: boolean;
  inputSection: InformationDetailType;
  message: string;
  index: number;
}

function App() {
  const [cardNumber, setCardNumber] = useState<CardNumberType>({
    data: ['', '', '', ''],
    errorMessage: '',
  });
  const [cardPeriod, setCardPeriod] = useState<CardPeriodType>({
    data: { month: '', year: '' },
    errorMessage: '',
  });
  const [cardOwner, setCardOwner] = useState<CardOwnerType>({ data: '', errorMessage: '' });

  const [isError, setIsError] = useState({
    number: [false, false, false, false],
    month: false,
    year: false,
    owner: false,
  });

  const handleCardNumber = (value: string, index: number) => {
    setCardNumber((prevState) => {
      const { data } = prevState;
      const updatedState = [...data];
      updatedState[index] = value;
      return { ...prevState, data: updatedState };
    });
  };

  const handleCardPeriod = (value: string, index: number) => {
    setCardPeriod((prevState) => {
      const { data } = prevState;
      const updatedState = { ...data };
      updatedState[PERIOD[index]] = value;
      return { ...prevState, data: updatedState };
    });
  };

  const handleCardOwner = (value: string) => {
    setCardOwner((prevState) => {
      return { ...prevState, data: value };
    });
  };

  const setStateFunctions = {
    number: handleCardNumber,
    month: handleCardPeriod,
    year: handleCardPeriod,
    owner: handleCardOwner,
  };

  const handleCardInput = ({ value, index, inputSection }: HandleCardInputType) => {
    const setStateFunction = setStateFunctions[inputSection];
    setStateFunction(value, index);
  };

  const setErrorFunctions = {
    number: setCardNumber,
    month: setCardPeriod,
    year: setCardPeriod,
    owner: setCardOwner,
  };

  const handleCardError = ({ isError, inputSection, message, index }: HandleCardErrorType) => {
    setIsError((prevState) => {
      if (inputSection === 'number') {
        const updatedState = [...prevState.number];
        updatedState[index] = isError;
        return { ...prevState, number: updatedState };
      }
      prevState[inputSection] = isError;
      return { ...prevState, [inputSection]: isError };
    });

    const setErrorFunction = setErrorFunctions[inputSection];
    setErrorFunction((prevState: any) => {
      return { ...prevState, errorMessage: message };
    });
  };

  const handleInputChange = ({ value, index, inputSection }: HandleCardInputType) => {
    const { isError, message } = validateInput(value, inputSection);
    handleCardInput({ value, index, inputSection });
    handleCardError({ isError, inputSection, message, index });
  };

  return (
    <div css={appStyle}>
      <div css={appContainerStyle}>
        <CardImage cardNumber={cardNumber.data} cardPeriod={cardPeriod.data} cardOwner={cardOwner.data} />
        <form css={appInputStyle}>
          <InputGroup
            onInputChange={(value: string, index: number) =>
              handleInputChange({ value, index, inputSection: 'number' })
            }
            informationSection="number"
            isError={isError.number}
            errorMessage={cardNumber.errorMessage}
          />
          <InputGroup
            onInputChange={(value: string, index: number, inputSection?: InformationDetailType) => {
              if (inputSection) handleInputChange({ value, index, inputSection });
            }}
            informationSection="period"
            isError={[isError.month, isError.year]}
            errorMessage={cardPeriod.errorMessage}
          />
          <InputGroup
            onInputChange={(value: string, index: number) => handleInputChange({ value, index, inputSection: 'owner' })}
            informationSection="owner"
            isError={[isError.owner]}
            errorMessage={cardOwner.errorMessage}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
