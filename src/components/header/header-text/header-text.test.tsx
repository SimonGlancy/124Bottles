import React from "react";
import { HeaderText } from "./header-text";
import { act, render } from "@testing-library/react-native";
import { PintProps } from "../../pint/pint.types";

describe("<HeaderText/>", () => {
  it("should render", () => {
    const itemProps = {
      name: "Lager",
      color: "blonde",
      pintSize: 100,
      onFinishPint: () => null,
    } as PintProps;

    const renderedComponent = render(
      <HeaderText finishedPints={[]} item={itemProps} />
    );

    expect(renderedComponent).toBeTruthy()
  });

  it("should display the expected information", async () => {
    const itemProps = {
      name: "Lager",
      color: "blonde",
      pintSize: 100,
      onFinishPint: () => null,
    } as PintProps;

    const finishedPint = {
      ...itemProps, 
      dateDrank: new Date()
    }

    const renderedComponent = render(
      <HeaderText finishedPints={[finishedPint]} item={itemProps} />
    );
      // findBy*  -> returns ONE match, and error if no matches
      // findAll -> returns ALL match, and error if no matches
      // queryBy* -> returns ALL matches as an array, and empty array if no matches
    const pintName = await renderedComponent.queryByTestId("pint-name")
    const pintNumber = await renderedComponent.queryByText("1")
   
    expect(pintName.props.children).toEqual("Lager")
    expect(pintNumber).toBeTruthy()
  })
});
