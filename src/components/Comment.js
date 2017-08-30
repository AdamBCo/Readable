import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { List, Image } from 'semantic-ui-react'


class Comment extends Component {
  render() {
    return (
      <List.Item>
        <Image avatar src='/assets/images/avatar/small/rachel.png' />
        <List.Content>
          <List.Header as='a'>Rachel</List.Header>
          <List.Description>Last seen watching <a><b>Arrested Development</b></a> just now.</List.Description>
        </List.Content>
      </List.Item>
    );
  }
}

export default connect()(Comment)
