import "./index.scss";

import * as React from "react";

import { CourseButton, CourseButtonProps } from "./CourseButton";
import { StrandHeading } from "./StrandHeading";

export type CourseListingProps = {
  scrollTo: (n: HTMLElement) => void;
  reload: () => any;
  thumbnail?: string;
  visibilityChanged: (vis: boolean) => any;
  active: boolean;
} & CourseButtonProps;

export class CourseListing extends React.Component<CourseListingProps> {
  node: HTMLElement | null = null;

  componentDidMount() {
    setTimeout(() => this.checkScroll(this.props.active), 500);
  }

  checkScroll(nextActive: boolean, lastActive = false) {
    if (nextActive && !lastActive && this.node !== null) {
      this.props.scrollTo(this.node);
    }
  }

  render() {
    return (
      <div>
        <div
          ref={n => (this.node = n)}
          className={`course-listing ${this.props.owned && "bought"} ${this
            .props.active && "active"}`}
        >
          <div className="picture">
            <i
              className={this.props.owned ? "" : "locked"}
              style={
                this.props.thumbnail
                  ? {
                      backgroundImage: `url(${this.props.thumbnail}`
                    }
                  : {}
              }
            />
          </div>
          <div className="content ">
            <h2>{this.props.course.name}</h2>

            {this.props.active && (
              <div className="detail">
                <div className="courses">
                  <h3>Courses Covered</h3>

                  <ul>
                    {this.props.course.strands.map(strand => (
                      <StrandHeading
                        bought={this.props.owned}
                        key={strand.id}
                        item={strand}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {this.props.active && <CourseButton {...this.props} />}
          </div>
        </div>
      </div>
    );
  }
}
