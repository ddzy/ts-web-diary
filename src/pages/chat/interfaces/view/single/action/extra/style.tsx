import styled from 'styled-components';


export const ExtraWrapper = styled.div`
`;
export const ExtraMain = styled.div`
`;

// emoji区
export const ExtraMainEmoji = styled.div`
  font-size: 1.5rem;

  &:hover {
    i {
      color: #1da57a;
    }
  }

  i {
    cursor: pointer;
  }
`;

// 附加应用区
export const ExtraMainApplication = styled.div`
  font-size: 1.5rem;

  &:hover {
    i {
      color: #1da57a;
    }
  }
`;
export const ExtraMainApplicationContent = styled.div`
  color: #666;
  user-select: none;
`;
export const ExtraMainApplicationContentList = styled.ul``;
export const ExtraMainApplicationContentItem = styled.li`
  padding: 0.75rem 3.75rem;
  cursor: pointer;
  transition: all .3s ease;

  &:hover {
    background-color: #eaf8fe;
  }
`;