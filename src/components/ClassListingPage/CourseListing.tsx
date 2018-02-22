import "./index.scss";

import * as React from "react";
import StripeCheckout from "react-stripe-checkout";
import { CenturyTypes, StoryTypes } from "story-backend-utils";
import VisibilitySensor = require("react-visibility-sensor");

import { STRIPE_KEY } from "../../config";
import { StrandHeading } from "./StrandHeading";

import { PriceLabel } from "./PriceLabel";
import { BuyCourseRequested } from "../../core/actions/courses";
import { Link, Route } from "react-router-dom";

type Props = {
  scrollTo: (n: HTMLElement) => void;
  buy: (
    courseId: string,
    token?: string,
    discount?: StoryTypes.Discount
  ) => BuyCourseRequested;
  email: string;
  reload: () => any;
  course: StoryTypes.StoryCourseFields & CenturyTypes.Course;
  firstVisit: boolean;
  studyGroupId: string | undefined;
  thumbnail?: string;
  discount?: StoryTypes.Discount;
  visibilityChanged: (vis: boolean) => any;
};

export class CourseListingInner extends React.Component<
  Props & { owned: boolean; price: number; active: boolean }
> {
  node: HTMLElement | null = null;

  componentDidMount() {
    setTimeout(() => this.checkScroll(this.props.active), 500);
  }

  componentWillReceiveProps(nextProps: { active: boolean }) {
    // this.checkScroll(nextProps.active, this.props.active);
  }

  checkScroll(nextActive: boolean, lastActive = false) {
    if (nextActive && !lastActive && this.node !== null) {
      console.log("About to scroll");
      this.props.scrollTo(this.node);
    }
  }

  render() {
    let actionButton;
    if (this.props.owned) {
      actionButton = (
        <a
          href={
            this.props.firstVisit
              ? "https://app.century.tech/learn/my-path"
              : `https://app.century.tech/learn/study-groups/${
                  this.props.studyGroupId
                }`
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="action-button">Start course</button>
        </a>
      );
    } else if (this.props.price <= 0) {
      actionButton = (
        <div
          onClick={() =>
            this.props.buy(
              this.props.course._id,
              // don't bother sending a Stripe token if it's free
              undefined,
              // don't use up our discount unless the original price was non-zero
              this.props.course.price > 0 ? this.props.discount : undefined
            )
          }
        >
          <button className="action-button">Unlock Course</button>
        </div>
      );
    } else {
      actionButton = (
        <StripeCheckout
          token={t =>
            this.props.buy(this.props.course._id, t.id, this.props.discount)
          }
          name={"Story"}
          description={this.props.course.name}
          amount={this.props.price * 100}
          currency="GBP"
          zipCode={true}
          email={this.props.email}
          stripeKey={STRIPE_KEY}
        >
          <button className="action-button">
            Unlock Course (
            <PriceLabel
              price={this.props.course.price}
              discount={this.props.discount}
            />
            )
          </button>
        </StripeCheckout>
      );
    }

    return (
      <CourseListingWrapper {...this.props}>
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

            {this.props.active && actionButton}
          </div>
        </div>
      </CourseListingWrapper>
    );
  }
}

const CourseListingWrapper: React.StatelessComponent<
  Props & { active: boolean }
> = props => {
  const { children, active, course } = props;
  if (!active) {
    return <Link to={`/course/${course._id}`}>{children}</Link>;
  }
  return <div>{children}</div>;
};

export class CourseListing extends React.Component<Props> {
  render() {
    const owned = this.props.studyGroupId !== undefined;
    const price =
      this.props.course.price -
      (this.props.discount ? this.props.discount.value : 0);

    return (
      <Route path={`/course/${this.props.course._id}`}>
        {({ match, location }) => (
          <div className="listing-container">
            <VisibilitySensor
              onChange={this.props.visibilityChanged}
              offset={{ top: 100 }}
            />
            <CourseListingInner
              {...this.props}
              price={price}
              owned={owned}
              active={!!match}
            />
          </div>
        )}
      </Route>
      //  children={({ match }) => (
      //     <li className={match ? 'active' : ''}>
      //       <Link to={to} {...rest}/>
      //     </li>
      //   )}/>
    );
  }
}
