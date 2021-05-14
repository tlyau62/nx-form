import { extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";
import * as customRules from "./custom";

const aggregateRules = {
  ...rules,
  ...customRules,
};

Object.keys(aggregateRules).forEach((rule) => {
  extend(rule, {
    ...aggregateRules[rule], // copies rule configuration
  });
});
