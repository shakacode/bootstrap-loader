import selectModules from './selectModules';

export default function(userModules, defaultModules) {
  if (!userModules) return false;

  if (userModules && typeof userModules === 'boolean') {
    return selectModules(defaultModules);
  }

  return selectModules(userModules);
}
