import React from 'react';

import css from './Icons.scss';

export default class Icons extends React.Component {

  render() {
    return (
      <div className={`row ${css.colItems}`}>
        <div className={`col-md-4 ${css.colItem}`}>
          <span className="glyphicon glyphicon-headphones" />
          <span className={css.text}>It.</span>
        </div>
        <div className={`col-md-4 ${css.colItem}`}>
          <span className="glyphicon glyphicon-glass" />
          <span className={css.text}>Just.</span>
        </div>
        <div className={`col-md-4 ${css.colItem}`}>
          <span className="glyphicon glyphicon-thumbs-up" />
          <span className={css.text}>Works.</span>
        </div>
      </div>
    );
  }

}
