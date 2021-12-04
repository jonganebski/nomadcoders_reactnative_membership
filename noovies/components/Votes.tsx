import React from 'react';
import styled from 'styled-components/native';

interface VotesProps {
  voteAverage: number;
}

export const Votes: React.FC<VotesProps> = (props) => {
  return (
    <StyledText>
      {props.voteAverage > 0 ? `⭐${props.voteAverage}/10` : 'Coming Soon'}
    </StyledText>
  );
};

const StyledText = styled.Text`
  font-size: 12px;
`;
