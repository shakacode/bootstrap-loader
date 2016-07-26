import React from 'react';

import css from './CardColumns.scss';

export default class CardColumns extends React.Component {
  render() {
    return (
      <div className="container">
        <h2>Card Columns example (only applies to Bootstrap 4) and you need postcss</h2>
        <div className="card-columns">
          <div className="card">
            <div className="card-block">
              <h4 className="card-title">
                Card title that wraps to a new line
              </h4>
              <p className="card-text">
                This is a longer card with supporting text
                below as a natural lead-in to additional content.
                This content is a little bit longer.
              </p>
            </div>
          </div>
          <div className="card card-block">
            <blockquote className="card-blockquote">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer posuere erat a ante.
              </p>
              <footer>
                <small className="text-muted">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>
          <div className={`card ${css.pinkCard}`}>
            <div className="card-block">
              <h4 className="card-title">Card title</h4>
              <p className="card-text">
                This card has supporting text below as a
                natural lead-in to additional content.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
          <div className="card card-block card-inverse card-primary text-xs-center">
            <blockquote className="card-blockquote">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer posuere erat.
              </p>
              <footer>
                <small>
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>
          <div className="card card-block text-xs-center">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">
              This card has supporting text below as a
              natural lead-in to additional content.
            </p>
            <p className="card-text">
              <small className="text-muted">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
          <div className="card">
            <blockquote className="card-blockquote">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer posuere erat a ante.
              </p>
              <footer>
                <small className="text-muted">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>
          <div className="card card-block text-xs-right">
            <blockquote className="card-blockquote">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer posuere erat a ante.
              </p>
              <footer>
                <small className="text-muted">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>
          <div className="card card-block">
            <h4 className="card-title">Card title</h4>
            <p className="card-text">
              This is a wider card with supporting text below
              as a natural lead-in to additional content.
              This card has even longer content than the
              first to show that equal height action.
            </p>
            <p className="card-text">
              <small className="text-muted">
                Last updated 3 mins ago
              </small>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
