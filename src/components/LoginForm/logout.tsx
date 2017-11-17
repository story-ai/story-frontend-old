import * as React from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment
} from "semantic-ui-react";

export class LogoutPage extends React.Component<{}> {
  componentDidMount() {
    console.info("Logged out!");
  }
  render() {
    return <Redirect to="/login" />;
  }
}
