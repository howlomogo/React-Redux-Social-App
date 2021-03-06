export default function reducer(
  state = {
    loggedIn: false,
    userId: undefined,
    isEditingProfile: false
  }, action) {
    switch(action.type) {
      case 'LOG_IN': {
        // Check to see if the user exists with the correct password
        const activeUser = action.payload.list.find((user) => {
          return ((user.username === action.payload.username) && (user.password === action.payload.password));
        })
        if(activeUser === undefined) {
          // If user log in failed return -1 (-1 means noone logged in)
          return {
            loggedIn: false,
            userId: undefined
          };
        }
        else {
          return {
            loggedIn: true,
            userId: activeUser.id
          }
        }
      }

      // Log in through list page quickly
      case 'QUICK_LOG_IN': {
        // Check to see if the user exists
        const activeUser = action.payload.list.find((user) => {
          return user.id === action.payload.id;
        })

        if(activeUser === undefined) {
          // If user log in failed return -1 (-1 means noone logged in)
          return {
            loggedIn: false,
            userId: undefined
          };
        }
        else {
          return {
            loggedIn: true,
            userId: activeUser.id
          }
        }
      }

      case 'LOG_OUT': {
        return {
          loggedIn: false,
          userId: undefined,
          isEditingProfile: false
        }
      }

      // Can just have in login reducer for now
      case 'TOGGLE_PROFILE_EDITING': {
        return {
          ...state,
          isEditingProfile: !state.isEditingProfile
        }
      }
    }
  return state;
}
