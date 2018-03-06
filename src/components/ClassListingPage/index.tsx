import "./index.scss";

import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import { animateScroll } from "react-scroll";
import { CenturyTypes, StoryTypes } from "story-backend-utils";

import {
  AddVisibleCourse,
  ReloadAll,
  RemoveVisibleCourse
} from "../../core/actions/app";
import { BuyCourseRequested } from "../../core/actions/courses";
import { StateType } from "../../core/reducers";
import { DiscountChest } from "../Discount";
import { CourseListingRoute } from "./CourseListingRoute";
import { i18n } from "../../strings/i18n";

type StateProps =
  | { loaded: false }
  | {
      loaded: true;
      courseToStudyGroup: { [k: string]: string };
      courses: (CenturyTypes.Course & StoryTypes.StoryCourseFields)[];
      email: string;
      firstVisible?: CenturyTypes.Course & StoryTypes.StoryCourseFields;
      active?: CenturyTypes.Course & StoryTypes.StoryCourseFields;
      thumbnailMap: { [k: string]: string };
      activeDiscount?: StoryTypes.Discount;
    };

type Props = StateProps & {
  reload: () => ReloadAll;
  buy: (
    courseId: string,
    token?: string,
    discount?: StoryTypes.Discount
  ) => BuyCourseRequested;
  addVisible: (
    course: CenturyTypes.Course & StoryTypes.StoryCourseFields
  ) => AddVisibleCourse;
  removeVisible: (
    course: CenturyTypes.Course & StoryTypes.StoryCourseFields
  ) => RemoveVisibleCourse;
};

export class HomeComponent extends React.Component<
  Props & RouteComponentProps<{}>
> {
  node: HTMLElement | null = null;
  componentDidMount() {
    this.reload();
  }

  reload = () => {
    this.props.reload();
  };

  scrollTo = (n: HTMLElement) => {
    if (this.node !== null) {
      animateScroll.scrollTo(n.offsetTop - 100, {
        containerId: this.node.id,
        duration: 500
      });
    }
  };

  render(): JSX.Element {
    let content;
    let errorState = false;
    if (!this.props.loaded) {
      errorState = true;
      content = <div className="empty">{i18n`Courses Loading Text`}</div>;
    } else if (this.props.courses.length < 1) {
      errorState = true;
      content = <div className="empty">{i18n`No Courses Available Text`}</div>;
    } else {
      const {
        email,
        courses,
        courseToStudyGroup,
        thumbnailMap,
        activeDiscount,
        active,
        addVisible,
        removeVisible
      } = this.props;

      const normalCourseIds = Object.keys(courseToStudyGroup).filter(
        courseId => {
          // TODO: eww hacky hard-code. What is special about the how-to course?
          if (courseId === "5559662d-2eba-4279-b8e5-62aee12ad10c") return false;
          return true;
        }
      );
      content = courses.map(course => {
        const studyGroupId = courseToStudyGroup[course._id];
        return (
          <CourseListingRoute
            key={course._id}
            course={course}
            reload={this.reload}
            email={email}
            thumbnail={thumbnailMap[studyGroupId]}
            studyGroupId={studyGroupId}
            buy={this.props.buy}
            discount={activeDiscount}
            firstVisit={normalCourseIds.length < 2}
            specialCourse={normalCourseIds.indexOf(course._id) < 0}
            visibilityChanged={vis =>
              vis ? addVisible(course) : removeVisible(course)
            }
            scrollTo={this.scrollTo}
          />
        );
      });
    }

    return (
      <div
        className="app-content store"
        id="app-content"
        ref={n => (this.node = n)}
      >
        <div className={`container ${errorState ? "error" : ""}`}>
          {content}
          <DiscountChest />
        </div>
      </div>
    );
  }
}

const mapState = (state: StateType): StateProps => {
  // TODO: Move to selector
  const courseKeys = Object.keys(state.courses.meta.LOADED);
  const courses: (CenturyTypes.Course & StoryTypes.StoryCourseFields)[] = [];
  for (const k of courseKeys) {
    if (k in state.courses.century.LOADED) {
      courses.push({
        ...state.courses.century.LOADED[k],
        ...state.courses.meta.LOADED[k]
      });
    }
  }
  courses.sort((a, b) => (a.order || 0) - (b.order || 0));

  // TODO: move to selector
  if (
    state.user.details.state !== "LOADED" ||
    state.studyGroups.groups.state !== "LOADED"
  ) {
    return { loaded: false };
  }

  // TODO: move to selector
  const courseToStudyGroup: { [course: string]: string } = {};
  for (const k of Object.keys(state.studyGroups.groups.item)) {
    courseToStudyGroup[state.studyGroups.groups.item[k].course] = k;
  }

  // TODO: move to selector
  const email = state.user.details.item.contact.emails[0].address;

  return {
    loaded: true,
    courseToStudyGroup,
    email,
    courses,
    thumbnailMap: state.studyGroups.thumbnails,
    activeDiscount: state.discounts.active
  };
};

export const Home = withRouter(
  connect(mapState, {
    reload: () => new ReloadAll(),
    buy: (courseId: string, token?: string, discount?: StoryTypes.Discount) =>
      new BuyCourseRequested(courseId, token, discount),
    addVisible: (course: AddVisibleCourse["course"]) =>
      new AddVisibleCourse(course),
    removeVisible: (course: RemoveVisibleCourse["course"]) =>
      new RemoveVisibleCourse(course)
  })(HomeComponent)
);
