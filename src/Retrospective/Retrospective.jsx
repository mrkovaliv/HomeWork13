import React from 'react';
import styles from './Retrospective.module.css';
import RetroColomn from './RetroColomn/RetroColomn'

class Retrospective extends React.Component {
  render() {
    return (
      <div className={styles['app-main']}>
        <RetroColomn title='Good things' color='#068E21' />
        <RetroColomn title='Bad things' color='#C62609' />
        <RetroColomn title='Action items' color='#0C2A99' />

      </div>
    );
  }

}

export default Retrospective;