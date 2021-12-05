import React from 'react';
import styled from 'styled-components/native';

interface VotesProps {
  voteAverage?: number;
}

export const Votes: React.FC<VotesProps> = ({ voteAverage = 0 }) => {
  return (
    <StyledText>
      {voteAverage > 0 ? `⭐${voteAverage}/10` : 'Coming Soon'}
    </StyledText>
  );
};

const StyledText = styled.Text`
  font-size: 12px;
`;
