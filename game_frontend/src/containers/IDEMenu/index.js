import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'features/Editor'
import Button from 'components/Button'

const IDEMenuLayout = styled.nav`
  background-color: pink
  grid-area: ide-menu
`
const ZoomButton = Button.extend`
  margin-left: 5%
  width: 10% 
`
const PostCodeButton = Button.extend`
  float: right
  position: relative
  top: 18%
  right: 5% 
`

export class IDEMenu extends Component {
  render () {
    return (
      <IDEMenuLayout>
        <ZoomButton secondary onClick={this.props.zoomIn} />
        <ZoomButton secondary onClick={this.props.zoomOut} />
        <PostCodeButton primary
          id='post-code-button'
          onClick={this.props.postCode} >
          Post Code
        </PostCodeButton>
      </IDEMenuLayout>
    )
  }
}

IDEMenu.propTypes = {
  zoomIn: PropTypes.func,
  zoomOut: PropTypes.func,
  postCode: PropTypes.func
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  zoomIn: actions.zoomInRequest,
  zoomOut: actions.zoomOutRequest,
  postCode: actions.postCodeRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(IDEMenu)
