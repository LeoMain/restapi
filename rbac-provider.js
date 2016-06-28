'use strict';

const Provider = require('./node_modules/koa-rbac/node_modules/rbac-a').Provider;

module.exports = class CustomProvider extends Provider {

  constructor(rules) {
    super();
    this._rules = rules || {};
  }

  getRoles(user) {
    const rules = this._rules || {};
    const cache = {};

    /**
     * @param roles ['admin']
     * @param userRoles 用户默认的 role
     * @param depth
     */
    return (function collect(roles, userRoles, depth) {
      for (let i = 0, iLen = roles.length; i < iLen; ++i) {
        cache[roles[i]] = cache[roles[i]] || depth;
      }

      for (let i = 0, iLen = roles.length; i < iLen; ++i) {
        if (cache[roles[i]] >= depth) {
          let role = rules['roles'] && rules['roles'][roles[i]];

          if (role) {
            if (Array.isArray(role['inherited'])) {
              userRoles[roles[i]] = collect(role['inherited'], {}, depth + 1);
            } else {
              userRoles[roles[i]] = null;
            }
          }
        }
      }

      return userRoles;
    })(user._doc.role && [user._doc.role] || [], {}, 1);
  }

  getPermissions(role) {
    return this._rules
      && this._rules['roles']
      && this._rules['roles'][role]
      && this._rules['roles'][role]['permissions'] || [];
  }

  getAttributes(role) {
    return this._rules
      && this._rules['roles']
      && this._rules['roles'][role]
      && this._rules['roles'][role]['attributes'] || [];
  }

};