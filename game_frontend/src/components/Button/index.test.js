/* eslint-env jest */
import React from 'react'
import Button from 'components/Button'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

describe('<Button />', () => {
  it('renders correctly', () => {
    const tree = shallow(<Button />)
    expect(toJson(tree)).toMatchSnapshot()
  })
})
