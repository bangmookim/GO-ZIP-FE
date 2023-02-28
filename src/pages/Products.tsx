import { useState } from 'react';
import styled from 'styled-components';
import ADDRESS from 'libs/client/constants/address';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useToast from 'hooks/useToast';
import useQuery from 'react-query';

interface dataForm {
  house_type: string;
  city: string;
  town: string;
}

const Search = () => {
  const [data, setData] = useState<dataForm>({
    city: '',
    town: '',
    house_type: '',
  });
  const [myToast, sendToast] = useToast();
  const structure = ['원룸', '투룸', '아파트', '빌라', '오피스텔'];

  const cityHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      city: e.target.value === '--도 / 시--' ? '' : e.target.value,
      town: '',
    });
  };

  const townHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData({
      ...data,
      town: e.target.value,
    });
  };

  const searchByQuery = () => {
    const { city, town, house_type } = data;
    if (!city) return sendToast.city();

    console.log(data);
  };

  return (
    <Body id="search">
      <ToastContainer />
      <TopWrapper>
        <Title>고승유의 집 구하기</Title>
        <SelectWrap>
          <Select onChange={cityHandler} style={{ outline: 'none' }}>
            <option>--도 / 시--</option>
            {Object.keys(ADDRESS).map((v) => (
              <Option key={v}>{v}</Option>
            ))}
          </Select>
          <Select onChange={townHandler} style={{ outline: 'none' }}>
            <option>--구--</option>
            {ADDRESS[data.city] &&
              Object.values(ADDRESS[data.city]).map((v) => (
                <Option key={v}>{v}</Option>
              ))}
          </Select>
        </SelectWrap>
        <TypeWrapper>
          {structure.map((item, i) => {
            return (
              <RadioComp
                isFocus={item === data.house_type}
                htmlFor={`${item}_${i}`}
                key={`${item}_${i}`}
                onClick={() => {
                  setData({
                    ...data,
                    house_type: item,
                  });
                }}
              >
                {item}
                <input hidden value={item} type="radio" id={`${item}_${i}`} />
              </RadioComp>
            );
          })}
        </TypeWrapper>
        <SearchBtn onClick={searchByQuery}>검색</SearchBtn>
      </TopWrapper>
      <ProductsWrapper>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
        <SmallImgBox></SmallImgBox>
      </ProductsWrapper>
    </Body>
  );
};

export default Search;

const Body = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: auto;
`;

const SearchBtn = styled.div`
  width: 567px;
  padding: 10px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border: solid 1px gray;
  transition: ${({ theme }) => theme.transitionOption};
  color: ${({ theme }) => theme.background};
  background: ${({ theme }) => theme.color};

  :hover {
    background: ${({ theme }) => theme.pointColor};
    cursor: pointer;
  }
`;

const TypeWrapper = styled.div`
  display: flex;
  margin: 20px 0;
  gap: 20px;
`;

const SelectWrap = styled.div`
  margin: 10px 0 0;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
  height: 50px;
`;

const Option = styled.option`
  color: black;
`;

const Select = styled.select`
  color: ${({ theme }) => theme.color};
  width: 100px;
  height: 40px;
  text-align: center;
  background-color: inherit;
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.color};
  margin-bottom: 10px;
  font-weight: 600;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.8px;
  margin-bottom: 15px;
  margin-top: -25px;
`;

const TopWrapper = styled.div`
  display: flex;
  background: ${({ theme }) => theme.background};
  padding: 100px 0 40px 0;
  border-bottom: solid lightgray 1px;
  flex-direction: column;
  align-items: center;
`;

const ProductsWrapper = styled.div`
  color: ${({ theme }) => theme.color};
  background: ${({ theme }) => theme.background};
  padding: 50px;
  overflow-y: auto;
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
`;

const SmallImgBox = styled.div`
  height: 400px;
  border: 1px solid lightgray;
  border-radius: 3px;
  min-width: 350px;
`;

const RadioComp = styled.label<{ isFocus: boolean }>`
  font-size: 0.8rem;
  letter-spacing: -0.2px;
  width: 100px;
  height: 40px;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.isFocus ? props.theme.pointColor : props.theme.transparentColor};
  color: ${({ theme }) => theme.background};
  transition: ${({ theme }) => theme.transitionOption};
  border-radius: 3px;
  font-weight: 600;

  :hover {
    cursor: pointer;
  }
`;
