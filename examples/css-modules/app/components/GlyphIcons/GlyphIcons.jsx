import React from 'react';

import css from './GlyphIcons.scss';

export default class GlyphIcons extends React.Component {

  render() {
    return (
      <div className="container">
        <h2>Glyphicons only work with Bootstrap 3. You won't see icons in Bootstrap 4</h2>
        <div className={`row ${css.colItems}`}>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="glyphicon glyphicon-headphones"/>
            <span className={css.text}>It.</span>
          </div>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="glyphicon glyphicon-glass"/>
            <span className={css.text}>Just.</span>
          </div>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="glyphicon glyphicon-thumbs-up"/>
            <span className={css.text}>Works.</span>
          </div>
        </div>
      </div>
    );
  }

}
