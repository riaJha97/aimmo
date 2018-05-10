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
  position: relative
  margin-left: 5%
  width: 10%
  top: 18%
`
const PostCodeButton = Button.extend`
  float: right
  position: relative
  top: 18%
  right: 5% 
`

const TestButton = Button.extend`
    position: relative
    float: left
    margin-left: 5%
    top: 10%
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 200%
`

export class IDEMenu extends Component {
  render () {
    return (
      <IDEMenuLayout>
        <TestButton secondary onClick={this.props.zoomIn}> + </TestButton>
        <TestButton secondary onClick={this.props.zoomOut}> - </TestButton>
        <PostCodeButton primary
          id='post-code-button'
          onClick={this.props.postCode} >
          Run Code
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
