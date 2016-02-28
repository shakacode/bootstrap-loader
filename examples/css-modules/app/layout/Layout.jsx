import React from 'react';

import Jumbotron from '../components/Jumbotron/Jumbotron';
import GlyphIcons from '../components/GlyphIcons/GlyphIcons';
import FontAwesomeIcons from '../components/FontAwesomeIcons/FontAwesomeIcons';
import CardColumns from '../components/CardColumns/CardColumns';

import css from './Layout.scss';

export default class Layout extends React.Component {

  render() {
    return (
      <section className={css.layout}>
        <Jumbotron />
        <GlyphIcons />
        <FontAwesomeIcons />
        <CardColumns />
      </section>
    );
  }

}
