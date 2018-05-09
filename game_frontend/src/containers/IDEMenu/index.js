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
  
  :focus {
    outline: 0
  }
 
  :hover {
    filter: brightness(85%)
  }
    
   :active {
    filter: brightness(75%)
  }
  
`

const ZoomButton = styled.input`
  
  margin-left: 5%
  width: 10%

  :focus {
    outline: 0
  }
 
  :hover {
    filter: brightness(85%)
  }
    
   :active {
    filter: brightness(75%)
  }
  
`

export class IDEMenu extends Component {
  render () {
    return (
      <IDEMenuLayout>
        <ZoomButton type="button" onClick={this.props.zoomIn} />
        <ZoomButton type="button" onClick={this.props.zoomOut} />
        <PostCodeButton type='image' src={submit} id='post-code-button' onClick={this.props.postCode} />
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
