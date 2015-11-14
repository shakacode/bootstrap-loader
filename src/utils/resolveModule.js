import resolve from 'resolve';

export default function(module) {
  try {
    let resolvedPath;
    resolve.sync(module, {
      packageFilter: (pkg, pathToModule) => {
        resolvedPath = pathToModule;
        return pkg;
      },
    });
    return resolvedPath;
  } catch (error) {
    return false;
  }
}
