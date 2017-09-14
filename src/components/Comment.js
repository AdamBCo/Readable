import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Image } from 'semantic-ui-react'


class Comment extends Component {

  render() {

    const { body, author } = this.props;

    return (
      <List.Item>
        <Image avatar src='/assets/images/avatar/small/rachel.png' />
        <List.Content>
          <List.Header as='a'>{author}</List.Header>
          <List.Description>{body}</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default connect()(Comment)
