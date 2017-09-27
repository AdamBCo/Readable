export default function clientMiddleware(store) {

  return next => action => {

    const { promise, types, ...rest } = action;

    if (!promise) {
      return next(action);
    }

    let {dispatch} = store;

    const [REQUEST, SUCCESS, FAILURE] = types;

    dispatch({ ...rest, type: REQUEST });

    console.log(types);

    return promise.then(
        (result) => dispatch({ ...rest, result, type: SUCCESS }),
        (error) => dispatch({ ...rest, error, type: FAILURE })
      ).catch(error => {
        console.error('MIDDLEWARE ERROR:', error);
        dispatch({ ...rest, error, type: FAILURE });
      });
  };
}
