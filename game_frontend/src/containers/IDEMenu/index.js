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

export class IDEMenu extends Component {
  render () {
    return (
      <IDEMenuLayout>
        <Button
          id='post-code-button'
          onClick={this.props.postCode} >
          Post Code
        </Button>
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
