import React from 'react'
import { Route } from "react-router-dom";

export default function UnauthorizedRoutes({path, component, ...rest}) {
  return (
    <Route path={path} component={component} {...rest} />
  )
}
