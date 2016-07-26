import React from 'react';

import css from './FontAwesomeIcons.scss';

export default class FontAwesomeIcons extends React.Component {

  render() {
    return (
      <div className="container">
        <h2>Font Awesome icons work with both Bootstrap 3 and Bootstrap 4</h2>
        <h2>Font Awesome using the font-awesome-loader</h2>
        <div className={`row ${css.colItems}`}>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="fa fa-headphones" />
            <span className={css.text}>It.</span>
          </div>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="fa fa-glass" />
            <span className={css.text}>Just.</span>
          </div>
          <div className={`col-md-4 ${css.colItem}`}>
            <span className="fa fa-thumbs-up" />
            <span className={css.text}>Works.</span>
          </div>
        </div>
      </div>
    );
  }
}
