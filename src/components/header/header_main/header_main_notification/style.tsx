import styled from 'styled-components';


export const NotificationWrapper = styled.div`
`;
export const NotificationMain = styled.div``;
export const MainNotificationMainlist = styled.ul`
  box-sizing: border-box;
  display: flex;
  padding: 0 2rem 0 8rem;
`;
export const MainNotificationMainListItem = styled.li`
  flex: 1;
  color: #8590a6;
  svg {
    width: 1.3rem;
    height: 1.3rem;
  };
  &:nth-of-type(1) {
    text-align: right;
  }
`;