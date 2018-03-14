import * as actionTypes from '../actions/actionTypes';
const initialState = {
  isFetching: false,
  error: null,
  tasks: [],
  taskGroups: null
};

function tasksState(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_TASKS_LOADING:
      return { ...initialState, isFetching: true };
    case actionTypes.FETCH_TASKS_SUCCESS:
      return handleFetchTasksSuccess(state, action.response.data);
    case actionTypes.FETCH_TASKS_ERROR:
      return { ...state, isFetching: false, error: true };
    default:
      return state;
  }
}

function handleFetchTasksSuccess(state, data) {
  let taskGroups = {};
  let tasks = {};
  data.map(t => {
    tasks[t.id] = t;

    // task groups
    const taskKey = (t.shift + t.station).toLowerCase().replace(/\s/g, '');
    if (!taskGroups[taskKey]) {
      taskGroups[taskKey] = {
        shift: t.shift,
        station: t.station,
        taskIds: [t.id],
        assignedEmployees: t.assignedEmployees,
        total: 1,
        completed: {
          total: 0,
          taskIds: []
        },
        inprogress: {
          total: 0,
          taskIds: []
        },
        unassigned: {
          total: 0,
          taskIds: []
        },
        flagged: {
          total: 0,
          taskIds: []
        },
        pastdue: {
          total: 0,
          taskIds: []
        }
      }
    }
    else {
      taskGroups[taskKey].taskIds.push(t.id);
      taskGroups[taskKey].total++;
    }
    taskGroups[taskKey][t.status.toLowerCase()].taskIds.push(t.id);
    taskGroups[taskKey][t.status.toLowerCase()].total++;
  });

  return {
    ...state,
    isFetching: false,
    tasks,
    taskGroups
  };
}

export default tasksState;