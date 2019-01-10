import styled from 'styled-components';

export interface IExtraImgProps {
  extraBgImg: string;
};


export const ItemContentBox = styled.div`
  color: #999;
  font-size: 0.875rem;
`;

export const ContentTip = styled.div``;
export const ContentTipUserNameText = styled.span``;
export const ContentTipTimeText = styled.span``;
export const ContentTipTypeText = styled.span`
  &:hover {
    color: #1890ff;
  }
`;

export const ContentTitle = styled.h2``;
export const ContentTag = styled.div``;

export const ItemExtraBox = styled.div``;
export const ExtraImageShow = styled('div') <IExtraImgProps>`
  width: 5rem;
  height: 5rem;
  background-image: url(${(props) => props.extraBgImg});
  background-repeat: no-repeat;
  background-size: cover;
`;

