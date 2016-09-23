- Before you go on, completely get on Redux, even if you aren't refactoring everything
- Try to create implict container components through connect, mapStateToProps, and mapDispatchToProps
- And extract actions to Action Creators

1. Presentational vs. Container Components + Redux
  - extract presentational then,
    - if a pres. component has too much responsibility, 
    extract a functional container that controls 
    the data and behavior of its child.
      - These child container components should deal with the store,
      freeing up both presentational components AND a master container
      component from dispatching and updating.
      - A way to do this is through the context (global vars) + provider OR
      - Redux-react provider.

2. Best way to pass Store down:
  -  Redux-react provider.
  -  mapStateToProps (maps redux store state to the props of the component)
  -  mapDispatchToProps (maps which method calls the store dispatch to the props of the component)
  -  If the container component merely handles grabbing props pertaining to the store, we can generate it on the fly
     using react-redux connect
     
  
Again, to recap, if you create this intermediate container components
that only take in props and the dispatch, and render a presentational component,
you can generate it on the fly.  


3. Action Creators:
- extract action functionality.
  - so if you wanted to increment an id upon adding a new record, you wouldn't want to do,
    that every place you're calling the dispatch.
  - Instead, you'd call the action creator with whatever args it needs, and it'll handle
    any necessary manipulations and then call the dispatch.
    
