import { Dispatch } from "redux";


export interface IInitialState {
  editorImageInfo: object,
};

const initialState: IInitialState = {
  editorImageInfo: {},
};


export const SAVE_EDITOR_IMAGE: string = 'SAVE_EDITOR_IMAGE';


export function saveEditorImage(
  data: any,
): { type: string, payload: any } {
  return {
    type: SAVE_EDITOR_IMAGE,
    payload: data,
  };
}


export function WriteReducer(
  state: IInitialState = initialState,
  action: { type: string, payload: any },
) {
  switch (action.type) {
    case SAVE_EDITOR_IMAGE:
      return {
        ...state,
        editorImageInfo: {
          ...state.editorImageInfo,
          ...action.payload,
        },
      };
    default:
      return state;
  }
}


export function reduxHandleEditorUpload(
  record: any,
  callback?: () => void,
) {
  return (dispatch: Dispatch) => {
    console.log(dispatch);
  }
}