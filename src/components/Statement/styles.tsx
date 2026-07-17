import styled, { css, keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -320px 0;
  }
  100% {
    background-position: 320px 0;
  }
`;

export const Container = styled.section`
  width: 100%;
  min-height: clamp(300px, 48vw, 360px);
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: clamp(16px, 4vw, 16px);
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
  gap: clamp(14px, 5vw, 14px);
`;

const loadingBase = css`
  border-radius: 6px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.08) 20%,
    rgba(0, 0, 0, 0.15) 50%,
    rgba(0, 0, 0, 0.08) 80%
  );
  background-size: 320px 100%;
  animation: ${shimmer} 1.2s ease-in-out infinite;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LoadingLine = styled.div`
  ${loadingBase}
  width: min(100%, 260px);
  height: 14px;
`;

export const LoadingRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
`;

export const LoadingText = styled.div`
  ${loadingBase}
  width: min(100%, 140px);
  height: 14px;
`;

export const LoadingValue = styled.div`
  ${loadingBase}
  width: 90px;
  height: 14px;
`;

export const LoadingMessage = styled.span`
  font-size: clamp(13px, 3vw, 14px);
  color: #4f4f4f;
`;
