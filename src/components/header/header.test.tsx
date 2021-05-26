import React from 'react'
import { Header } from './header'
import { render, act, fireEvent } from '@testing-library/react-native'

describe("<Header />", () => {
  it("should increment pints when the increment button is clicked", () => {
    const toggleDrinksSpy = jest.fn()
    const myHeader = render(<Header toggleDrinks={toggleDrinksSpy}/>)
    const button = myHeader.getByTestId("increment-drinks-button")

    act(() => {
      fireEvent.press(button)
    })

    expect(toggleDrinksSpy).toHaveBeenCalledWith("+")
  })
})