import jwtAuthz, {AuthzScopes} from 'express-jwt-authz'

export const checkPermissions = (permissions: string | string[]) => {
    return jwtAuthz([permissions] as AuthzScopes , {
      customScopeKey: "permissions",
      checkAllScopes: true,
      failWithError: true
    });
  };


