import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';
import ScoreCard from './ScoreCard';

function Scores() {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  const cards = window.screen.width < 768? 2 : 3
  return (
    <div style={{ padding: `1rem ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={cards}
        gutter={20}
        leftChevron={<button className='font-bold'>{'<'}</button>}
        rightChevron={<button className='font-bold'>{'>'}</button>}
        outsideChevron
        chevronWidth={chevronWidth}
        infiniteLoop={true}
      >
        <ScoreCard/>
        <ScoreCard/>
        <ScoreCard/>
        <ScoreCard/>
      </ItemsCarousel>
    </div>
  );
}

export default Scores