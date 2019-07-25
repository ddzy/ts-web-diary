import styled, {
  createGlobalStyle,
} from 'styled-components';

// ** Global Style **
export const GlobalStyleSet = createGlobalStyle`
  .fixed-control-bar-star,
  .fixed-control-bar-collection {
    cursor: pointer;
    transition: color .3s ease;
  }
  .fixed-control-bar-star:hover,
  .fixed-control-bar-collection:hover {
    color: #40a9ff;
  }
  .fixed-control-bar-star-active,
  .fixed-control-bar-collection-active {
    color: #1890ff;
  }
`;


// ** 文章详情页 => 左侧固钉控制栏 **
export const FixedControlContainer = styled.div`
  width: 2.5rem;
  background-color: #fff;
  font-size: 1.25rem;
  text-align: center;
`;

export const FixedControlContent = styled.div``;

export const FixedControlList = styled.ul`
  margin: 0;
`;

export const FixedControlListItem = styled.li`
  height: 2.5rem;
  margin-top: 0.625rem;
  border-bottom: 1px solid #ccc;
  border-radius: 50%;
  color: #b2b2c2;
  &:nth-of-type(4) {
    font-size: 0.875rem;
    color: #999;
  }
  &:nth-of-type(7) {
    border-bottom: none;
  }
`;