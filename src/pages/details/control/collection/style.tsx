import styled from 'styled-components';


// 固钉栏 收藏 气泡框
export const CollectionPopContentContainer = styled.div``;

export const CollectionsPopShowList = styled.ul``;

export const CollectionsPopShowListItem = styled.li`
  margin-top: 0.625rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  line-height: 1.875rem;
  background-color: #f6f6f6;
  cursor: pointer;
  color: #888;
  font-size: 0.875rem;
  text-align: center;
  transition: background-color .3s ease,
              color .3s ease;
  &:hover {
    border-color: #1da57a;
    color: #1da57a;
  }
`;

export const CollectionPopFormBox = styled.div``;