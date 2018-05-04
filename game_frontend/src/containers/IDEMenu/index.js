import styled from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { actions } from 'features/Editor'
import submit from './run-code.svg'

const IDEMenuLayout = styled.nav`
  background-color: pink
  grid-area: ide-menu
`
const PostCodeButton = styled.input`
  float: right
  position: relative
  top: 18%
  right: 8%
`

export class IDEMenu extends Component {
  render () {
    return (
      <IDEMenuLayout>
        <PostCodeButton type='image' src={submit} id='post-code-button' onClick={this.props.postCode} />
      </IDEMenuLayout>
    )
  }
}

IDEMenu.propTypes = {
  postCode: PropTypes.func
}

const mapStateToProps = () => ({})

const mapDispatchToProps = {
  postCode: actions.postCodeRequest
}

export default connect(mapStateToProps, mapDispatchToProps)(IDEMenu)
