import validid from "validid";
import moment from "moment";

export const hkid = {
  validate(value) {
    return validid.hkid(value);
  },
};

export const chinese = {
  validate(value) {
    return /^\p{Script=Han}*$/u.test(value);
  },
};

export const date = {
  params: ["format"],
  validate(value, { format }) {
    return moment(value, format, true).isValid();
  },
};
