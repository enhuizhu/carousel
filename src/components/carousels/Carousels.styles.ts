import styled from 'styled-components';

export const StyledImageContainer = styled.div`
  position: relative;
  overflow: hidden;
`;

export const StyledImage = styled.img<{ hasTransition?: boolean }>`
  position: absolute;
  ${({ hasTransition }) => hasTransition && `transition: all 0.5s;`}
`;

