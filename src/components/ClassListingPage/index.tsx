import "./index.scss";
import { animateScroll } from "react-scroll";

import * as React from "react";
import { connect } from "react-redux";
import { CenturyTypes, StoryTypes } from "story-backend-utils";
import {
  ReloadAll,
  AddVisibleCourse,
  RemoveVisibleCourse
} from "../../core/actions/app";
import { DiscountChest } from "../Discount";

import {
  AllCoursesRequested,
  BuyCourseRequested
} from "../../core/actions/courses";
import { StudyGroupListRequested } from "../../core/actions/study_groups";
import { StateType } from "../../core/reducers";
import { CourseListing } from "./CourseListing";
import { withRouter, RouteComponentProps } from "react-router";

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
      console.log("Scrolling");
      animateScroll.scrollTo(n.offsetTop - 100, {
        containerId: this.node.id,
        duration: 500
      });
    }
  };

  render(): JSX.Element {
    // if (this.props.user.state !== "LOADED") return <div>Loading...</div>;
    // const org = this.props.user.item.profile.groups.organisations.find(
    //   o => o.organisation === STORY_ORGANISATION_ID
    // );
    let content;
    let errorState = false;
    if (!this.props.loaded) {
      errorState = true;
      content = <div className="empty">Loading...</div>;
    } else if (this.props.courses.length < 1) {
      errorState = true;
      content = (
        <div className="empty">
          No courses are currently available. Come back soon!
        </div>
      );
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

      content = courses.map((course, i) => {
        const studyGroupId = courseToStudyGroup[course._id];
        return (
          <CourseListing
            key={course._id}
            course={course}
            reload={this.reload}
            email={email}
            thumbnail={thumbnailMap[studyGroupId]}
            studyGroupId={studyGroupId}
            buy={this.props.buy}
            discount={activeDiscount}
            firstVisit={Object.keys(courseToStudyGroup).length < 2}
            visibilityChanged={vis =>
              vis ? addVisible(course) : removeVisible(course)
            }
            scrollTo={this.scrollTo}
            // active={active !== undefined && course._id === active._id}
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
        ...state.courses.meta.LOADED[k],
        ...state.courses.century.LOADED[k]
      });
    }
  }

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

  // TODO: move to selector
  // const firstVisible = courses.filter(
  //   c => state.courses.visible.indexOf(c._id) >= 0
  // )[0];
  // const active = firstVisible || courses[0];

  return {
    loaded: true,
    courseToStudyGroup,
    email,
    courses,
    // firstVisible,
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
