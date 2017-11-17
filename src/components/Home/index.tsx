import * as React from "react";

interface HelloProps {
  readonly to?: string;
}

const Hello: React.StatelessComponent<HelloProps> = ({ to = "World" }) => (
  <div>Hello {to}!</div>
);

export class Home extends React.Component<{ to?: string }, {}> {
  render(): JSX.Element {
    return (
      <div>
        <div>
          <Hello to={this.props.to} />
        </div>
        <div>This is the home page!</div>
      </div>
    );
  }
}
