import { configure } from "@storybook/react";
import { setOptions } from "@storybook/addon-options";

// automatically import all files ending in *.stories.js
const req = require.context("../stories", true, /.stories.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

setOptions({
  name: "vega-canner-components",
  url: "https://github.com/Canner/vega-canner-components"
});

configure(loadStories, module);
