import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'Gallery';
import LazySizes from 'react-lazysizes';

const IMAGES = () => {
  let images = [];

  for (let i = 0; i < 11; i++) {
    if (i % 3 === 0) {
      images.push(
        <LazySizes
          dataSizes="auto"
          width={128}
          height={240}
          src={`http://lorempixel.com/128/240/abstract/${i}/128-240`}
          dataSrcSet={{
            '256w': `http://lorempixel.com/256/480/abstract/${i}/256-480`,
            '512w': `http://lorempixel.com/512/960/abstract/${i}/512-960`,
            '1024w': `http://lorempixel.com/1024/1920/abstract/${i}/1024-1920`
          }}
          className="img-responsive blur-up"
          key={i}
        />
      );
    } else if (i % 5 === 0) {
      images.push(
        <LazySizes
        dataSizes="auto"
        width={128}
        height={128}
        src={`http://lorempixel.com/128/128/abstract/${i}/128-128`}
        dataSrcSet={{
          '256w': `http://lorempixel.com/256/256/abstract/${i}/256-256`,
          '512w': `http://lorempixel.com/512/512/abstract/${i}/512-512`,
          '1024w': `http://lorempixel.com/1024/1024/abstract/${i}/1024-1024`
        }}
        className="img-responsive blur-up"
        key={i}
      />
    );
    } else {
      images.push(
        <LazySizes
          dataSizes="auto"
          width={240}
          height={128}
          src={`http://lorempixel.com/240/128/abstract/${i}/240-128`}
          dataSrcSet={{
            '256w': `http://lorempixel.com/480/256/abstract/${i}/480-256`,
            '512w': `http://lorempixel.com/960/512/abstract/${i}/960-512`,
            '1024w': `http://lorempixel.com/1920/1024/abstract/${i}/1920-1024`
          }}
          className="img-responsive blur-up"
          key={i}
        />
      );
    }
  }
  return images;
};

ReactDOM.render(
  <Gallery media={IMAGES()} />,
  document.getElementById('gallery')
);
