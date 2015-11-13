export default (module, disableProcessing) => {
  const loader = disableProcessing ? '-!' + module : module;
  return `require (${JSON.stringify(loader)});`;
};
