import {
  LoadingContainer,
  LoadingLine,
  LoadingMessage,
  LoadingRow,
  LoadingText,
  LoadingValue,
} from "./styles";

export const LoadingStatement = () => {
  return (
    <LoadingContainer role="status" aria-live="polite">
      <LoadingLine />
      <LoadingRow>
        <LoadingText />
        <LoadingValue />
      </LoadingRow>
      <LoadingRow>
        <LoadingText />
        <LoadingValue />
      </LoadingRow>
      <LoadingMessage>Carregando extrato...</LoadingMessage>
    </LoadingContainer>
  );
};
