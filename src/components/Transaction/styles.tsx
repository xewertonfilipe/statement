import styled from "styled-components";

export const TransactionWrapper = styled.article`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

export const MonthLabel = styled.h2`
    margin: 0;
    color: #47A138;
    text-transform: capitalize;
    font-size: 13px;
    font-weight: 500;
`;

export const TransactionType = styled.h3`
    margin: 0;
    flex-grow: 1;
    font-size: 16px;
    font-weight: 400;
`;

export const TransactionDate = styled.time`
    font-size: 13px;
    color: #8B8B8B;
`;

export const TransactionAmount = styled.p`
    margin: 0;
    font-size: 16px;
    font-weight: 600;
`;

export const TransactionDivider = styled.div`
    width: 180px;
    border-bottom: 1px solid #47A138;
`;

export const TransactionInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 64px;
`;