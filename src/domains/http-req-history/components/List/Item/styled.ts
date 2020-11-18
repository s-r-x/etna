import styled from "styled-components";

export const Container = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.07);
  padding: 10px;
  padding-bottom: 0;
`;
export const TopStats = styled.div`
  display: flex;
`;
export const ResponseTime = styled.div`
  margin: 0 10px;
`;
export const RequestDate = styled.div`
  margin: 0 10px;
`;
export const Actions = styled.div`
  margin-left: 15px;
`;
export const RequestUrl = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
`;
export const UrlAndActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;
