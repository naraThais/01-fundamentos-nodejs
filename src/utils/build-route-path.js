export function buildRoutePath(path) {
    const routeParameterRegex = /:([a-zA-Z0-9_-]+)/g;
    const pathWithParams = path.replace(
      routeParameterRegex,
      '(?<$1>[a-z0-9\\-_]+)'
    );
    const pathRegex = new RegExp(`^${pathWithParams}`);
    return pathRegex;
  }
  