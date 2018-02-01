import {
  REQUEST_ADD_TO_CLASS,
  AddToClassRequestAction,
  succeedAddToClassRequest,
  failAddToClassRequest
} from "../../actions/classes";
import { ActionsObservable } from "redux-observable";
import { Observable } from "rxjs";
import axios from "axios";
import { Action, Store } from "redux";
import { StoryServices } from "../../../config";
import { StateType } from "../../reducers";

// export const addToClass = (
//   action$: ActionsObservable<Action>,
//   store: Store<StateType>
// ) =>
//   action$
//     .ofType(REQUEST_ADD_TO_CLASS)
//     .flatMap((action: AddToClassRequestAction) => {
//       console.log("Adding to course again");
//       const user = store.getState().user;
//       if (user.state !== "LOADED")
//         return Observable.of(
//           failAddToClassRequest(action.classId, "User not loaded")
//         );

//       return axios
//         .put(
//           `${StoryServices.material}/user/${user.item._id}/class`,
//           { classId: action.classId, stripeToken: action.token },
//           {
//             headers: {
//               Authorization: `Bearer ${store.getState().auth.token}`
//             }
//           }
//         )
//         .then(
//           res =>
//             res.status === 200
//               ? succeedAddToClassRequest(action.classId)
//               : failAddToClassRequest(
//                   action.classId,
//                   res.data.message || res.statusText
//                 )
//         )
//         .catch(e => {
//           const message =
//             (e.response && e.response.data && e.response.data.message) ||
//             e.message;
//           console.log(e);
//           return failAddToClassRequest(action.classId, message);
//         });
//     });
