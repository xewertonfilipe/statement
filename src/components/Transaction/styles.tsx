import styled from "styled-components";

export const TransactionWrapper = styled.article`
  display: flex;
  flex-direction: column;
  gap: clamp(6px, 2vw, 8px);
`;

export const MonthLabel = styled.h2`
  margin: 0;
  color: #47a138;
  text-transform: capitalize;
  font-size: clamp(12px, 2.8vw, 13px);
  font-weight: 500;
`;

export const TransactionType = styled.h3`
  margin: 0;
  flex-grow: 1;
  min-width: 0;
  font-size: clamp(14px, 3.4vw, 16px);
  line-height: 1.3;
  font-weight: 400;
  overflow-wrap: anywhere;
`;

export const TransactionDate = styled.time`
  white-space: nowrap;
  font-size: clamp(12px, 2.8vw, 13px);
  color: #8b8b8b;
`;

export const TransactionAmount = styled.p`
  margin: 0;
  font-size: clamp(14px, 3.4vw, 16px);
  line-height: 1.3;
  font-weight: 600;
`;

export const TransactionDivider = styled.div`
  width: min(100%, 180px);
  border-bottom: 1px solid #47a138;
`;

export const TransactionInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(12px, 4vw, 64px);

  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;
