import React from 'react';

import Jumbotron from '../components/Jumbotron/Jumbotron';
import Icons from '../components/Icons/Icons';

import css from './Layout.scss';

export default class Layout extends React.Component {

  render() {
    return (
      <section className={css.layout}>
        <Jumbotron />
        <Icons />
      </section>
    );
  }

}
