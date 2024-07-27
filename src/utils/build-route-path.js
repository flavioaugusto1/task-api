export function buildPathRoute(path) {
    const routeParametersPath = /:([a-zA-Z]+)/g;

    const pathWithParams = path.replaceAll(
        routeParametersPath,
        "(?<$1>[a-z0-9-_]+)",
    );

    const pathParams = new RegExp(`^${pathWithParams}`);

    return pathParams;
}
