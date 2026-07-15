import styled from "styled-components";

export const Container = styled.section`
  width: 100%;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: clamp(16px, 4vw, 24px);
  box-sizing: border-box;
`;

export const Heading = styled.h2`
  margin: 0;
  margin-bottom: clamp(16px, 4vw, 24px);
  font-size: clamp(22px, 5vw, 25px);
  line-height: 1.2;
  font-weight: 700;
`;

export const TransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(16px, 5vw, 34px);
`;
