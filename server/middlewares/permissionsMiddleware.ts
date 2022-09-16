import jwtAuthz, {AuthzScopes} from 'express-jwt-authz'

export const checkPermissions = (/*permissions: string | string[]*/) => {
    return jwtAuthz([/*permissions*/"get:users"] as AuthzScopes , {
      customScopeKey: "permissions",
      checkAllScopes: true,
      failWithError: true
    });
  };


