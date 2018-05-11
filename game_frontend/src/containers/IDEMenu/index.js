import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'features/Editor'
import Button from 'components/Button'

const IDEMenuLayout = styled.nav`
  background-color: pink
  grid-area: ide-menu
  padding-left: 20px
`
const ZoomButton = Button.extend`
  position: relative
  margin-left: 5%
  width: 10%
  top: 18%
`

const PostCodeButton = Button.extend`
  float: right
  position: relative
  width: 150px
  top: 10%
  right: 5%
  padding: 10px 8px 10px 8px
  height: 55%
  font-size: 20px
`

const TestButton = Button.extend`
    position: relative
    float: left
    font-size: 200%
`
export class IDEMenu extends Component {
  render () {
    return (
      <IDEMenuLayout>
        <TestButton secondary onClick={this.props.zoomIn}> + </TestButton>
        <TestButton secondary onClick={this.props.zoomOut}> &#8211; </TestButton>
        <PostCodeButton primary
          id='post-code-button'
          onClick={this.props.postCode} >
          Run Code &#8594;
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
