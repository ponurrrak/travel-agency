import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import Icon from '../Icon/Icon';
import styles from './ListItem.module.scss';

function ListItem(props) {
  return (
    <div className={styles.component}>
      <Icon name={props.icon} />
      {props.title ?
        (<span>{ReactHtmlParser(props.title)}</span>)
        :
        props.children
      }
    </div>
  );
}

ListItem.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default ListItem;
